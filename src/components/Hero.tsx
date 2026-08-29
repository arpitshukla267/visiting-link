"use client";

import { useCallback, useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { TOTAL_FRAMES, getCachedFrame } from "@/lib/heroFrames";
import { getScrollY } from "@/components/SmoothScroll";
import { useStartupReady } from "@/components/StartupLoader";

const SCROLL_TRACK_VH = 200;

export function Hero() {
  const trackRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const frameRef = useRef(1);
  const prefersReducedMotion = useReducedMotion();
  const { framesReady } = useStartupReady();

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;

    const img = getCachedFrame(index);
    if (!img?.complete || !img.naturalWidth) return;

    const cw = canvas.clientWidth;
    const ch = canvas.clientHeight;
    const imgAspect = img.naturalWidth / img.naturalHeight;
    const canvasAspect = cw / ch;

    let dw: number;
    let dh: number;
    let dx: number;
    let dy: number;

    if (canvasAspect > imgAspect) {
      dw = cw;
      dh = cw / imgAspect;
      dx = 0;
      dy = (ch - dh) / 2;
    } else {
      dw = ch * imgAspect;
      dh = ch;
      dx = (cw - dw) / 2;
      dy = 0;
    }

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, dx, dy, dw, dh);
  }, []);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (ctx) {
      ctx.scale(dpr, dpr);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctxRef.current = ctx;
    }

    drawFrame(frameRef.current);
  }, [drawFrame]);

  const setFrame = useCallback(
    (nextFrame: number) => {
      if (nextFrame === frameRef.current) return;
      frameRef.current = nextFrame;
      drawFrame(nextFrame);
    },
    [drawFrame],
  );

  const updateFrameFromScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const trackTop = track.offsetTop;
    const trackHeight = track.offsetHeight;
    const viewport = window.innerHeight;
    const scrollable = Math.max(1, trackHeight - viewport);
    const scrolled = Math.min(
      scrollable,
      Math.max(0, getScrollY() - trackTop),
    );
    const fraction = scrolled / scrollable;
    const nextFrame = Math.min(
      TOTAL_FRAMES,
      Math.max(1, Math.round(1 + fraction * (TOTAL_FRAMES - 1))),
    );

    setFrame(nextFrame);
  }, [setFrame]);

  useEffect(() => {
    if (!framesReady) return;

    resizeCanvas();
    setFrame(1);
    updateFrameFromScroll();

    if (prefersReducedMotion) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        updateFrameFromScroll();
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", resizeCanvas);

    const lenis = (
      window as Window & {
        __lenis?: { on: (e: string, fn: () => void) => () => void };
      }
    ).__lenis;
    const unsubLenis = lenis?.on("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resizeCanvas);
      unsubLenis?.();
    };
  }, [
    framesReady,
    prefersReducedMotion,
    resizeCanvas,
    setFrame,
    updateFrameFromScroll,
  ]);

  if (!framesReady) return null;

  return (
    <>
      <div
        id="hero-section"
        className="pointer-events-none fixed inset-0 z-0 bg-[#0A0A0C]"
        aria-hidden
      >
        <canvas ref={canvasRef} className="block h-full w-full" />
      </div>

      <div
        ref={trackRef}
        id="hero-scroll-track"
        className="relative z-[2] w-full"
        style={{ height: `${SCROLL_TRACK_VH}vh` }}
      />
    </>
  );
}
