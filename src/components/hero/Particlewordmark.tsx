'use client';

import { useEffect, useRef } from 'react';
import styles from './Hero.module.css';

interface ParticleWordmarkProps {
  /** Word rendered by the particle system. */
  text?: string;
  /** Optional extra className on the wrapper. */
  className?: string;
  /** Called exactly once, when the wordmark finishes assembling. */
  onFormed?: () => void;
}

/**
 * Full-bleed particle field for the hero. A faint ambient field of
 * particles drifts across the whole canvas continuously; a subset is
 * assigned to sampled points of the wordmark glyph and eases into that
 * shape once, then holds — dead-centered in the viewport.
 *
 * Once formed, a small amount of scroll (a trigger, not a scrub) kicks
 * off a fixed-duration (~2.8s) two-phase dismantle:
 *
 *  1. RELEASE (fast, ~first 28% of the duration) — assigned particles
 *     let go of the glyph shape all at once and drop back into their
 *     own ambient drift.
 *  2. EXIT (spread across the full duration) — every particle that
 *     isn't one of the ~100 survivors gets its own randomized delay and
 *     window within the dismantle, during which it flies outward past
 *     the edge of the canvas while fading to fully transparent. Delays
 *     are front-loaded (a chunk vanish almost immediately, the rest
 *     trickle out in a steady stream), so the particle count visibly
 *     drops fast at first and then steadily thins out — never an
 *     abrupt jump-cut.
 *
 * The ~100 survivors never exit — they simply release from the glyph
 * (if they were part of it) and settle into a dim, steady glow at their
 * own random anchor point, scattered across the whole canvas.
 *
 * Everything is driven by a single tweened progress value (not actual
 * scroll distance), so the whole thing always takes the same smooth
 * ~2.8s regardless of how fast or far the user scrolls, and reverses
 * cleanly (particles drift back in / the mark reforms) if they scroll
 * back up before it settles.
 *
 * Self-contained: owns its own rAF loop, resize handling, DPR cap,
 * scroll tracking, IntersectionObserver visibility pause, and
 * prefers-reduced-motion check. No external animation/3D dependencies —
 * plain Canvas 2D only.
 */
export default function ParticleWordmark({
  text = 'VisitingLink',
  className,
  onFormed,
}: ParticleWordmarkProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // keep the latest callback without forcing the animation effect to
  // re-run whenever the parent re-renders with a new inline function
  const onFormedRef = useRef(onFormed);
  useEffect(() => {
    onFormedRef.current = onFormed;
  }, [onFormed]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // narrow to non-null locals so TS keeps them typed inside closures below
    const wrapperEl = wrapper;
    const canvasEl = canvas;
    const c = ctx;

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // ---- tunables -----------------------------------------------------
    const DPR = Math.min(window.devicePixelRatio || 1, 1.5);
    const DRIFT_MS = 200; // free drift before the wordmark starts gathering
    const GATHER_MS = 2600; // gather duration once it starts
    const MAX_STAGGER_MS = 450; // per-particle head start/delay spread
    const TOTAL_FORM_MS = DRIFT_MS + GATHER_MS + MAX_STAGGER_MS + 250; // + settle buffer
    const SCROLL_TRIGGER_PX = 24; // how little scroll is needed to trigger dismantle
    const DISMANTLE_TWEEN_MS = 2500; // slower overall dismantle/reform (was 2800)
    const RELEASE_FRACTION = 0.5; // glyph release now spread over half the tween,
                                   // instead of a fast 36% burst — feels gradual
                                   // rather than "snap then wait"
    const KEEP_COUNT = 100; // particles that remain visible (dim, scattered) once fully dismantled
    const EXIT_BURST_CHANCE = 0.32; // fewer particles vanish immediately (was 0.32) —
                                     // most now join the steady trickle instead
    const EXIT_DELAY_MAX = 0.6; // exits spread later across the timeline (was 0.6)
    const EXIT_WINDOW_MIN = 0.2; // each particle's own fly-out+fade takes longer (was 0.2)
    const EXIT_WINDOW_MAX = 0.35; // (was 0.35)

    type Particle = {
      anchorX: number;
      anchorY: number;
      driftFx: number;
      driftFy: number;
      driftAmpX: number;
      driftAmpY: number;
      phaseX: number;
      phaseY: number;
      targetX: number;
      targetY: number;
      startOffset: number; // ms, staggers when this particle begins gathering
      r: number;
      alpha: number;
      restAlpha: number; // alpha a survivor settles to once fully dismantled
      willExit: boolean; // true if this particle flies off-screen on dismantle
      exitDelay: number; // 0-1, tween-fraction offset before this particle starts exiting
      exitWindow: number; // 0-1, tween-fraction duration of this particle's own fly-out+fade
      exitX: number; // off-canvas destination
      exitY: number;
      warm: boolean;
      assigned: boolean;
      x: number;
      y: number;
    };

    let W = 0;
    let H = 0;
    let particles: Particle[] = [];
    let targets: { x: number; y: number }[] = [];
    let rafId: number | null = null;
    let lastTs: number | null = null;
    let simTime = 0;
    let visible = true;
    let destroyed = false;
    let announcedFormed = false;

    // dismantle state: a binary target (0 = formed, 1 = dismantled) set by
    // a small scroll trigger, plus a progress value tweened toward it at a
    // fixed speed — this drives everything below, so the whole sequence
    // always takes the same smooth duration no matter how the user scrolls.
    let dismantleTarget = 0;
    let dismantleProgress = 0;

    const rand = (a: number, b: number) => a + Math.random() * (b - a);
    const clamp = (v: number, min: number, max: number) =>
      Math.min(max, Math.max(min, v));

    // Assigned particles form the legible wordmark. Ambient particles
    // roam the full canvas forever, before and after formation, so the
    // field always feels like it covers the whole screen. The ambient
    // count is kept low and unobtrusive so the scene doesn't feel busy
    // before the wordmark assembles; the assigned count is a little
    // higher so the larger glyph still reads as a dense, legible mark
    // rather than a sparse outline.
    function pickCounts() {
      const isMobile = window.innerWidth < 768;
      const cores =
        (navigator as Navigator & { hardwareConcurrency?: number })
          .hardwareConcurrency || 4;
      const isLowPower = cores <= 4;

      if (isMobile) {
        return { assigned: isLowPower ? 850 : 1050, ambient: isLowPower ? 60 : 60 };
      }
      return { assigned: isLowPower ? 2200 : 3000, ambient: isLowPower ? 160 : 240 };
    }

    function sampleGlyphPoints() {
      const off = document.createElement('canvas');
      off.width = W;
      off.height = H;
      const octx = off.getContext('2d');
      if (!octx) return [];

      const isMobile = window.innerWidth < 768;

      // Size the glyph by target width rather than a flat font-size
      // guess, so it reliably spans the same proportion of the hero
      // at any viewport.
      const targetWidth = W * (isMobile ? 0.84 : 0.66);
      let fontSize = isMobile ? 90 : 170;
      octx.font = `700 ${fontSize}px Manrope, sans-serif`;
      const measured = octx.measureText(text).width || targetWidth;
      fontSize = fontSize * (targetWidth / measured);
      fontSize = Math.max(isMobile ? 44 : 90, Math.min(fontSize, isMobile ? 110 : 210));

      octx.fillStyle = '#fff';
      octx.textAlign = 'center';
      octx.textBaseline = 'middle';
      octx.font = `700 ${fontSize}px Manrope, sans-serif`;
      // dead-center of the hero canvas
      octx.fillText(text, W / 2, H * 0.5);

      const step = isMobile ? 2.4 : 1.9;
      const img = octx.getImageData(0, 0, W, H).data;
      const pts: { x: number; y: number }[] = [];
      for (let y = 0; y < H; y += step) {
        for (let x = 0; x < W; x += step) {
          const idx = (Math.floor(y) * W + Math.floor(x)) * 4 + 3;
          if (img[idx] > 120) pts.push({ x, y });
        }
      }
      return pts;
    }

    function makeParticle(assigned: boolean, target?: { x: number; y: number }): Particle {
      const alpha = assigned ? rand(0.5, 0.9) : rand(0.12, 0.3);
      return {
        anchorX: rand(0, W),
        anchorY: rand(0, H),
        driftFx: rand(0.00025, 0.0007),
        driftFy: rand(0.0002, 0.0006),
        driftAmpX: rand(18, 46),
        driftAmpY: rand(14, 36),
        phaseX: rand(0, Math.PI * 2),
        phaseY: rand(0, Math.PI * 2),
        targetX: target ? target.x : 0,
        targetY: target ? target.y : 0,
        startOffset: rand(0, MAX_STAGGER_MS),
        r: assigned ? rand(0.6, 1.4) : rand(0.5, 1.2),
        alpha,
        restAlpha: 0, // assigned below, after the full pool is built
        willExit: false, // assigned below
        exitDelay: 0,
        exitWindow: 0.3,
        exitX: 0,
        exitY: 0,
        warm: Math.random() < 0.07,
        assigned,
        x: 0,
        y: 0,
      };
    }

    function assignExit(p: Particle) {
      // Direction outward from canvas center through the particle's own
      // resting anchor, extended well past the edge of the canvas — so
      // exiting particles visibly fly off in a natural-looking direction
      // rather than converging on one spot.
      const cx = W / 2;
      const cy = H / 2;
      let dx = p.anchorX - cx;
      let dy = p.anchorY - cy;
      let len = Math.hypot(dx, dy);
      if (len < 1) {
        const angle = rand(0, Math.PI * 2);
        dx = Math.cos(angle);
        dy = Math.sin(angle);
        len = 1;
      }
      // small random angular jitter so exits don't look perfectly radial
      const jitter = rand(-0.35, 0.35);
      const cos = Math.cos(jitter);
      const sin = Math.sin(jitter);
      const ux = (dx / len) * cos - (dy / len) * sin;
      const uy = (dx / len) * sin + (dy / len) * cos;
      const dist = Math.max(W, H) * rand(0.9, 1.35);
      p.exitX = cx + ux * dist;
      p.exitY = cy + uy * dist;

      // Front-loaded stagger: a chunk of particles vanish almost
      // immediately once dismantle starts, the rest trickle out in a
      // steady stream across the remaining duration — giving a fast
      // initial thin-out followed by a smooth, continuous drain rather
      // than everything leaving on a fixed clock tick.
      if (Math.random() < EXIT_BURST_CHANCE) {
        p.exitDelay = rand(0, 0.04);
      } else {
        p.exitDelay = rand(0.04, EXIT_DELAY_MAX);
      }
      p.exitWindow = rand(EXIT_WINDOW_MIN, EXIT_WINDOW_MAX);
    }

    function buildParticles() {
      targets = sampleGlyphPoints();
      const shuffled = targets.slice().sort(() => Math.random() - 0.5);
      const { assigned: assignedCount, ambient: ambientCount } = pickCounts();
      const count = Math.min(assignedCount, shuffled.length || 1);

      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push(makeParticle(true, shuffled[i]));
      }
      for (let i = 0; i < ambientCount; i++) {
        particles.push(makeParticle(false));
      }

      // Randomly select the small handful of particles that survive a
      // full dismantle, scattered across the whole canvas — everyone
      // else gets an exit assigned and eventually flies off-screen.
      // Survivors that were part of the wordmark are dimmed to an
      // ambient-level alpha so the leftover field reads as background.
      const keepCount = Math.min(KEEP_COUNT, particles.length);
      const idxPool = particles.map((_, i) => i);
      for (let i = idxPool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [idxPool[i], idxPool[j]] = [idxPool[j], idxPool[i]];
      }
      const keepSet = new Set(idxPool.slice(0, keepCount));
      particles.forEach((p, i) => {
        if (keepSet.has(i)) {
          p.willExit = false;
          p.restAlpha = p.assigned ? rand(0.12, 0.3) : p.alpha;
        } else {
          p.willExit = true;
          p.restAlpha = 0;
          assignExit(p);
        }
      });
    }

    function updateScrollTrigger() {
      dismantleTarget = window.scrollY > SCROLL_TRIGGER_PX ? 1 : 0;
    }

    function resize() {
      const rect = wrapperEl.getBoundingClientRect();
      W = Math.max(1, Math.round(rect.width));
      H = Math.max(1, Math.round(rect.height));
      canvasEl.width = W * DPR;
      canvasEl.height = H * DPR;
      canvasEl.style.width = `${W}px`;
      canvasEl.style.height = `${H}px`;
      c.setTransform(DPR, 0, 0, DPR, 0, 0);
      buildParticles();
    }

    // ease in/out, used for the gather transition, the glyph release,
    // and each particle's own exit fly-out/fade
    function ease(t: number) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    // one-shot: 0 while drifting, eases to 1 as it gathers, then holds at
    // 1 forever once formed — release/exit are handled separately below
    function formAmountFor(p: Particle) {
      const t = (simTime - DRIFT_MS - p.startOffset) / GATHER_MS;
      if (t <= 0) return 0;
      if (t >= 1) return 1;
      return ease(t);
    }

    function drawParticle(p: Particle, x: number, y: number, alpha: number) {
      if (alpha <= 0.002) return;
      c.beginPath();
      c.fillStyle = p.warm
        ? `rgba(201,169,124, ${alpha})`
        : `rgba(245,243,238, ${alpha})`;
      c.arc(x, y, p.r, 0, Math.PI * 2);
      c.fill();
    }

    function renderStatic() {
      // reduced-motion: draw the fully formed wordmark once, ambient
      // particles at their resting anchor, no animation loop, no dismantle
      c.clearRect(0, 0, W, H);
      for (const p of particles) {
        if (p.assigned) drawParticle(p, p.targetX, p.targetY, p.alpha);
        else drawParticle(p, p.anchorX, p.anchorY, p.alpha);
      }
    }

    function frame(ts: number) {
      if (destroyed) return;
      if (!visible) {
        rafId = null;
        return;
      }
      if (lastTs === null) lastTs = ts;
      const dt = ts - lastTs;
      lastTs = ts;
      simTime += dt;

      if (!announcedFormed && simTime >= TOTAL_FORM_MS) {
        announcedFormed = true;
        onFormedRef.current?.();
      }

      // advance the dismantle tween toward its target at a fixed speed —
      // this always takes the same ~DISMANTLE_TWEEN_MS regardless of how
      // much was scrolled, and only ever engages once fully formed.
      if (announcedFormed) {
        const step = dt / DISMANTLE_TWEEN_MS;
        if (dismantleProgress < dismantleTarget) {
          dismantleProgress = clamp(dismantleProgress + step, 0, dismantleTarget);
        } else if (dismantleProgress > dismantleTarget) {
          dismantleProgress = clamp(dismantleProgress - step, dismantleTarget, 1);
        }
      }
      const rawProgress = dismantleProgress; // 0 (formed) -> 1 (dismantled)
      const releaseT = ease(clamp(rawProgress / RELEASE_FRACTION, 0, 1));

      c.clearRect(0, 0, W, H);
      for (const p of particles) {
        const driftX =
          p.anchorX + Math.sin(simTime * p.driftFx + p.phaseX) * p.driftAmpX;
        const driftY =
          p.anchorY + Math.cos(simTime * p.driftFy + p.phaseY) * p.driftAmpY;

        let baseX: number;
        let baseY: number;
        let twinkleAmt = 1;

        if (!p.assigned) {
          // ambient particles' baseline is just their own drift — they
          // never had a glyph shape to release from
          baseX = driftX;
          baseY = driftY;
        } else {
          const form = formAmountFor(p);
          const effectiveForm = form * (1 - releaseT);
          const orbitX = Math.sin(simTime * 0.0009 + p.phaseX) * 1.6;
          const orbitY = Math.cos(simTime * 0.0011 + p.phaseY) * 1.6;
          const noiseX = Math.sin(simTime * 0.0021 + p.phaseX * 2) * 0.9;
          const noiseY = Math.cos(simTime * 0.0024 + p.phaseY * 2) * 0.9;
          const wobbleX = (orbitX + noiseX) * effectiveForm;
          const wobbleY = (orbitY + noiseY) * effectiveForm;
          baseX = driftX + (p.targetX - driftX) * effectiveForm + wobbleX;
          baseY = driftY + (p.targetY - driftY) * effectiveForm + wobbleY;

          // gentle twinkle on assigned particles while still gathered,
          // fading to a steady value as they release from the glyph
          const twinkle =
            0.82 + 0.18 * Math.sin(simTime * 0.0026 + p.phaseX + p.phaseY);
          twinkleAmt = twinkle * (1 - releaseT) + releaseT;
        }

        let x = baseX;
        let y = baseY;
        let alpha: number;

        if (p.willExit) {
          // this particle's own fly-out + fade window, staggered within
          // the overall dismantle so particles leave in a continuous,
          // front-loaded stream rather than all together
          const localT = clamp(
            (rawProgress - p.exitDelay) / p.exitWindow,
            0,
            1
          );
          const exitEase = ease(localT);
          x = baseX + (p.exitX - baseX) * exitEase;
          y = baseY + (p.exitY - baseY) * exitEase;
          const baseAlpha = p.alpha * twinkleAmt;
          alpha = baseAlpha * (1 - exitEase);
        } else {
          // survivor: releases from the glyph (if it was part of one)
          // and settles into a dim, steady glow at its own anchor point
          alpha = (p.alpha + (p.restAlpha - p.alpha) * releaseT) * twinkleAmt;
        }

        p.x = x;
        p.y = y;
        drawParticle(p, x, y, alpha);
      }

      rafId = requestAnimationFrame(frame);
    }

    function start() {
      if (rafId !== null) return;
      lastTs = null;
      rafId = requestAnimationFrame(frame);
    }

    resize();
    updateScrollTrigger();

    if (prefersReduced) {
      renderStatic();
      announcedFormed = true;
      onFormedRef.current?.();
    } else {
      start();
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !prefersReduced) start();
      },
      { threshold: 0.1 }
    );
    io.observe(wrapperEl);

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        resize();
        if (prefersReduced) renderStatic();
      }, 160);
    };
    window.addEventListener('resize', onResize);

    const onScroll = () => {
      updateScrollTrigger();
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      destroyed = true;
      if (rafId !== null) cancelAnimationFrame(rafId);
      io.disconnect();
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll);
      clearTimeout(resizeTimer);
    };
  }, [text]);

  return (
    <div
      ref={wrapperRef}
      className={`${styles.particleLayer} ${className || ''}`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className={styles.wordmarkCanvas} />
    </div>
  );
}