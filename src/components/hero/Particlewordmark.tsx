"use client";

import { useEffect, useRef } from "react";
import type { MutableRefObject } from "react";
import styles from "./Hero.module.css";

interface ParticleWordmarkProps {
  text?: string;
  className?: string;
  /** Scroll progress 0 → 1. A ref (not state) so scrolling never re-renders React. */
  progressRef: MutableRefObject<number>;
}

/**
 * Timeline (keep in sync with Cta.tsx):
 *   0.00 – 0.30  particles assemble into the wordmark
 *   0.30 – 0.40  hold
 *   0.40 – 0.68  particles scatter
 */
const ASSEMBLE_END = 0.3;
const SCATTER_START = 0.4;
const SCATTER_END = 0.68;

const ALPHA_LEVELS = 10;

export default function ParticleWordmark({
  text = "VisitingLink",
  className,
  progressRef,
}: ParticleWordmarkProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const wrapperEl = wrapper;
    const canvasEl = canvas;
    const c = ctx;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // ---- tunables -----------------------------------------------------
    const DPR = Math.min(window.devicePixelRatio || 1, 1.25);
    const MAX_STAGGER_MS = 450;
    const SMOOTH_MS = 140;
    const RELEASE_FRACTION = 0.5;
    const KEEP_COUNT = 100;
    const EXIT_BURST_CHANCE = 0.32;
    const EXIT_DELAY_MAX = 0.6;
    const EXIT_WINDOW_MIN = 0.2;
    const EXIT_WINDOW_MAX = 0.35;

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
      startOffset: number;
      r: number;
      alpha: number;
      restAlpha: number;
      willExit: boolean;
      exitDelay: number;
      exitWindow: number;
      exitX: number;
      exitY: number;
      warm: boolean;
      assigned: boolean;
      x: number;
      y: number;
    };

    let W = 0;
    let H = 0;
    let particles: Particle[] = [];
    let rafId: number | null = null;
    let lastTs: number | null = null;
    let simTime = 0;
    let visible = true;
    let destroyed = false;
    let shown = progressRef.current;

    // pre-built fill styles + reusable buckets (no per-frame allocations)
    const bucketStyles: string[] = [];
    for (let w = 0; w < 2; w++) {
      for (let i = 0; i < ALPHA_LEVELS; i++) {
        const a = ((i + 0.5) / ALPHA_LEVELS).toFixed(3);
        bucketStyles.push(
          w === 1 ? `rgba(201,169,124,${a})` : `rgba(245,243,238,${a})`,
        );
      }
    }
    const buckets: Particle[][] = bucketStyles.map(() => []);

    const rand = (a: number, b: number) => a + Math.random() * (b - a);
    const clamp = (v: number, min: number, max: number) =>
      Math.min(max, Math.max(min, v));

    function pickCounts() {
      const isMobile = window.innerWidth < 768;
      const cores =
        (navigator as Navigator & { hardwareConcurrency?: number })
          .hardwareConcurrency || 4;
      const isLowPower = cores <= 4;

      if (isMobile) {
        return {
          assigned: isLowPower ? 1100 : 1400,
          ambient: isLowPower ? 70 : 90,
        };
      }
      return {
        assigned: isLowPower ? 1800 : 2400,
        ambient: isLowPower ? 120 : 180,
      };
    }

    function sampleGlyphPoints() {
      const off = document.createElement("canvas");
      off.width = W;
      off.height = H;
      const octx = off.getContext("2d", { willReadFrequently: true });
      if (!octx) return [];

      const isMobile = window.innerWidth < 768;

      const targetWidth = W * (isMobile ? 0.84 : 0.66);
      let fontSize = isMobile ? 90 : 170;
      octx.font = `700 ${fontSize}px Manrope, sans-serif`;
      const measured = octx.measureText(text).width || targetWidth;
      fontSize = fontSize * (targetWidth / measured);
      fontSize = Math.max(
        isMobile ? 44 : 90,
        Math.min(fontSize, isMobile ? 110 : 210),
      );

      octx.fillStyle = "#fff";
      octx.textAlign = "center";
      octx.textBaseline = "middle";
      octx.font = `700 ${fontSize}px Manrope, sans-serif`;
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

    function makeParticle(
      assigned: boolean,
      target?: { x: number; y: number },
    ): Particle {
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
        restAlpha: 0,
        willExit: false,
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
      const jitter = rand(-0.35, 0.35);
      const cos = Math.cos(jitter);
      const sin = Math.sin(jitter);
      const ux = (dx / len) * cos - (dy / len) * sin;
      const uy = (dx / len) * sin + (dy / len) * cos;
      const dist = Math.max(W, H) * rand(0.9, 1.35);
      p.exitX = cx + ux * dist;
      p.exitY = cy + uy * dist;

      p.exitDelay =
        Math.random() < EXIT_BURST_CHANCE
          ? rand(0, 0.04)
          : rand(0.04, EXIT_DELAY_MAX);
      p.exitWindow = rand(EXIT_WINDOW_MIN, EXIT_WINDOW_MAX);
    }

    function buildParticles() {
      const targets = sampleGlyphPoints();
      // Fisher–Yates shuffle
      const shuffled = targets.slice();
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      const { assigned: assignedCount, ambient: ambientCount } = pickCounts();
      const count = Math.min(assignedCount, shuffled.length || 1);

      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push(makeParticle(true, shuffled[i]));
      }
      for (let i = 0; i < ambientCount; i++) {
        particles.push(makeParticle(false));
      }

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

    function resize(force = false) {
      const rect = wrapperEl.getBoundingClientRect();
      const nextW = Math.max(1, Math.round(rect.width));
      const nextH = Math.max(1, Math.round(rect.height));

      // Mobile URL-bar show/hide changes height slightly and fires `resize`
      // mid-scroll. Rebuilding everything there = jank. Skip small changes.
      if (
        !force &&
        particles.length &&
        nextW === W &&
        Math.abs(nextH - H) < 140
      ) {
        return;
      }

      W = nextW;
      H = nextH;
      canvasEl.width = W * DPR;
      canvasEl.height = H * DPR;
      canvasEl.style.width = `${W}px`;
      canvasEl.style.height = `${H}px`;
      c.setTransform(DPR, 0, 0, DPR, 0, 0);
      buildParticles();
    }

    function ease(t: number) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function paint() {
      const gather = clamp(shown / ASSEMBLE_END, 0, 1);
      const rawProgress = clamp(
        (shown - SCATTER_START) / (SCATTER_END - SCATTER_START),
        0,
        1,
      );
      const releaseT = ease(clamp(rawProgress / RELEASE_FRACTION, 0, 1));

      for (let i = 0; i < buckets.length; i++) buckets[i].length = 0;

      for (let n = 0; n < particles.length; n++) {
        const p = particles[n];

        // already flown out + faded → nothing to compute or draw
        let exitEase = 0;
        if (p.willExit) {
          const localT = clamp(
            (rawProgress - p.exitDelay) / p.exitWindow,
            0,
            1,
          );
          if (localT >= 1) continue;
          exitEase = ease(localT);
        }

        const driftX =
          p.anchorX + Math.sin(simTime * p.driftFx + p.phaseX) * p.driftAmpX;
        const driftY =
          p.anchorY + Math.cos(simTime * p.driftFy + p.phaseY) * p.driftAmpY;

        let baseX = driftX;
        let baseY = driftY;
        let twinkleAmt = 1;

        if (p.assigned) {
          const lag = (p.startOffset / MAX_STAGGER_MS) * 0.4;
          const form = ease(clamp((gather - lag) / 0.6, 0, 1));
          const effectiveForm = form * (1 - releaseT);

          // wobble only matters while the particle is forming a glyph
          let wobbleX = 0;
          let wobbleY = 0;
          if (effectiveForm > 0.001) {
            const orbitX = Math.sin(simTime * 0.0009 + p.phaseX) * 1.6;
            const orbitY = Math.cos(simTime * 0.0011 + p.phaseY) * 1.6;
            const noiseX = Math.sin(simTime * 0.0021 + p.phaseX * 2) * 0.9;
            const noiseY = Math.cos(simTime * 0.0024 + p.phaseY * 2) * 0.9;
            wobbleX = (orbitX + noiseX) * effectiveForm;
            wobbleY = (orbitY + noiseY) * effectiveForm;
          }
          baseX = driftX + (p.targetX - driftX) * effectiveForm + wobbleX;
          baseY = driftY + (p.targetY - driftY) * effectiveForm + wobbleY;

          const twinkle =
            0.82 + 0.18 * Math.sin(simTime * 0.0026 + p.phaseX + p.phaseY);
          twinkleAmt = twinkle * (1 - releaseT) + releaseT;
        }

        let x = baseX;
        let y = baseY;
        let alpha: number;

        if (p.willExit) {
          x = baseX + (p.exitX - baseX) * exitEase;
          y = baseY + (p.exitY - baseY) * exitEase;
          alpha = p.alpha * twinkleAmt * (1 - exitEase);
        } else {
          alpha = (p.alpha + (p.restAlpha - p.alpha) * releaseT) * twinkleAmt;
        }

        if (alpha <= 0.004) continue;

        p.x = x;
        p.y = y;
        const level = Math.min(ALPHA_LEVELS - 1, (alpha * ALPHA_LEVELS) | 0);
        buckets[(p.warm ? ALPHA_LEVELS : 0) + level].push(p);
      }

      // one path + one fill per alpha bucket (~20 fills instead of 2500+)
      c.clearRect(0, 0, W, H);
      const TAU = Math.PI * 2;
      for (let b = 0; b < buckets.length; b++) {
        const list = buckets[b];
        if (!list.length) continue;
        c.fillStyle = bucketStyles[b];
        c.beginPath();
        for (let i = 0; i < list.length; i++) {
          const p = list[i];
          c.moveTo(p.x + p.r, p.y);
          c.arc(p.x, p.y, p.r, 0, TAU);
        }
        c.fill();
      }
    }

    function frame(ts: number) {
      if (destroyed) return;
      if (!visible) {
        rafId = null;
        return;
      }
      if (lastTs === null) lastTs = ts;
      const dt = Math.min(ts - lastTs, 64);
      lastTs = ts;
      simTime += dt;

      const target = progressRef.current;
      shown += (target - shown) * (1 - Math.exp(-dt / SMOOTH_MS));
      if (Math.abs(target - shown) < 0.0004) shown = target;

      paint();
      rafId = requestAnimationFrame(frame);
    }

    function start() {
      if (rafId !== null) return;
      lastTs = null;
      rafId = requestAnimationFrame(frame);
    }

    resize(true);

    let reducedTick = false;
    const repaintStill = () => {
      if (reducedTick) return;
      reducedTick = true;
      requestAnimationFrame(() => {
        reducedTick = false;
        shown = progressRef.current;
        paint();
      });
    };

    if (prefersReduced) {
      repaintStill();
      window.addEventListener("scroll", repaintStill, { passive: true });
    } else {
      start();
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !prefersReduced) start();
      },
      { threshold: 0.01 },
    );
    io.observe(wrapperEl);

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        resize();
        if (prefersReduced) repaintStill();
      }, 200);
    };
    window.addEventListener("resize", onResize);

    return () => {
      destroyed = true;
      if (rafId !== null) cancelAnimationFrame(rafId);
      io.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", repaintStill);
      clearTimeout(resizeTimer);
    };
  }, [text, progressRef]);

  return (
    <div
      ref={wrapperRef}
      className={`${styles.particleLayer} ${className || ""}`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className={styles.wordmarkCanvas} />
    </div>
  );
}
