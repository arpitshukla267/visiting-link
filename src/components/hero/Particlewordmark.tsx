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
 * shape once, then holds — it never dismantles. Assigned particles keep a
 * small continuous jitter after forming so the mark still feels alive.
 *
 * Self-contained: owns its own rAF loop, resize handling, DPR cap,
 * IntersectionObserver visibility pause, and prefers-reduced-motion check.
 * No external animation/3D dependencies — plain Canvas 2D only.
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
    const DRIFT_MS = 900; // free drift before the wordmark starts gathering
    const GATHER_MS = 2600; // gather duration once it starts
    const MAX_STAGGER_MS = 450; // per-particle head start/delay spread
    const TOTAL_FORM_MS = DRIFT_MS + GATHER_MS + MAX_STAGGER_MS + 250; // + settle buffer

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

    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    // Assigned particles form the legible wordmark. Ambient particles
    // roam the full canvas forever, before and after formation, so the
    // field always feels like it covers the whole screen. The ambient
    // count is kept low and unobtrusive so the scene doesn't feel busy
    // before the wordmark assembles; the assigned count is a little
    // higher so the larger glyph (matching the reference) still reads
    // as a dense, legible mark rather than a sparse outline.
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
      // as the reference (a large, confident wordmark) at any viewport.
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
      // sits in the upper-middle of the full hero canvas, leaving room
      // below for the copy and tech carousel that sit on top of it
      octx.fillText(text, W / 2, H * (isMobile ? 0.4 : 0.36));

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
        alpha: assigned ? rand(0.5, 0.9) : rand(0.12, 0.3),
        warm: Math.random() < 0.07,
        assigned,
        x: 0,
        y: 0,
      };
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

    // ease in/out, used for the one-time gather transition
    function ease(t: number) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    // one-shot: 0 while drifting, eases to 1 as it gathers, then holds at
    // 1 forever — the wordmark never dismantles once formed
    function formAmountFor(p: Particle) {
      const t = (simTime - DRIFT_MS - p.startOffset) / GATHER_MS;
      if (t <= 0) return 0;
      if (t >= 1) return 1;
      return ease(t);
    }

    function drawParticle(p: Particle, x: number, y: number, alphaMul = 1) {
      c.beginPath();
      c.fillStyle = p.warm
        ? `rgba(201,169,124, ${p.alpha * alphaMul})`
        : `rgba(245,243,238, ${p.alpha * alphaMul})`;
      c.arc(x, y, p.r, 0, Math.PI * 2);
      c.fill();
    }

    function renderStatic() {
      // reduced-motion: draw the fully formed wordmark once, ambient
      // particles at their resting anchor, no animation loop
      c.clearRect(0, 0, W, H);
      for (const p of particles) {
        if (p.assigned) drawParticle(p, p.targetX, p.targetY);
        else drawParticle(p, p.anchorX, p.anchorY);
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

      c.clearRect(0, 0, W, H);
      for (const p of particles) {
        const driftX =
          p.anchorX + Math.sin(simTime * p.driftFx + p.phaseX) * p.driftAmpX;
        const driftY =
          p.anchorY + Math.cos(simTime * p.driftFy + p.phaseY) * p.driftAmpY;

        if (!p.assigned) {
          // ambient particles roam the full screen forever, unaffected
          // by the wordmark forming
          p.x = driftX;
          p.y = driftY;
        } else {
          const form = formAmountFor(p);
          // once formed, particles keep a small continuous orbit + noise
          // around their target point so the mark never looks frozen —
          // amplitude fades in only as the particle finishes gathering
          const orbitX = Math.sin(simTime * 0.0009 + p.phaseX) * 1.6;
          const orbitY = Math.cos(simTime * 0.0011 + p.phaseY) * 1.6;
          const noiseX = Math.sin(simTime * 0.0021 + p.phaseX * 2) * 0.9;
          const noiseY = Math.cos(simTime * 0.0024 + p.phaseY * 2) * 0.9;
          const wobbleX = (orbitX + noiseX) * form;
          const wobbleY = (orbitY + noiseY) * form;
          p.x = driftX + (p.targetX - driftX) * form + wobbleX;
          p.y = driftY + (p.targetY - driftY) * form + wobbleY;
        }

        // gentle twinkle on assigned particles once formed, so the mark
        // reads as alive rather than static
        const twinkle = p.assigned
          ? 0.82 + 0.18 * Math.sin(simTime * 0.0026 + p.phaseX + p.phaseY)
          : 1;
        drawParticle(p, p.x, p.y, twinkle);
      }

      rafId = requestAnimationFrame(frame);
    }

    function start() {
      if (rafId !== null) return;
      lastTs = null;
      rafId = requestAnimationFrame(frame);
    }

    resize();

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

    return () => {
      destroyed = true;
      if (rafId !== null) cancelAnimationFrame(rafId);
      io.disconnect();
      window.removeEventListener('resize', onResize);
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