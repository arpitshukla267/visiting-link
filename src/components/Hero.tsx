"use client";

import { useCallback, useEffect, useRef, type CSSProperties } from "react";
import { useReducedMotion } from "motion/react";
import {
  TOTAL_FRAMES,
  HERO_INTRO_EXIT_FILE,
  HERO_MID_START_FILE,
  HERO_MID_END_FILE,
  HERO_CONNECT_START_FILE,
  HERO_CONNECT_END_FILE,
  getCachedFrame,
  getFileNumberForIndex,
  prefetchHeroFramesAround,
} from "@/lib/heroFrames";
import { getScrollY } from "@/components/SmoothScroll";
import { useStartupReady } from "@/components/StartupLoader";
import { useHeroFileFrame } from "@/components/HeroFrameContext";

/** Scroll track scales with frame count so the last frame aligns with track end. */
const SCROLL_TRACK_VH_DESKTOP = Math.round(TOTAL_FRAMES * (360 / 565));
const SCROLL_TRACK_VH_MOBILE = Math.round(TOTAL_FRAMES * (200 / 565));
const HERO_BG = "#F8F8F8";

/**
 * Mobile frame size control — change MOBILE_FRAME_FIT only.
 * Desktop cover behavior is unchanged.
 *
 * "contain"   — full frame fits inside the mobile viewport
 * "height60"  — locked to 60% of screen height (sides may crop)
 * "height70"  — locked to 70% of screen height
 * "height80"  — locked to 80% of screen height
 * "height90"  — locked to 90% of screen height
 * "vh80"      — locked to 80vh height
 *
 * From the final frames the mobile fit smoothly eases to the shift target
 * (whether the starting fit is larger or smaller).
 */
type MobileFrameFit =
  | "contain"
  | "height50"
  | "height60"
  | "height70"
  | "height80"
  | "height90"
  | "vh80";
const MOBILE_FRAME_FIT: MobileFrameFit = "height90";
const MOBILE_FIT_SHIFT_START = HERO_CONNECT_START_FILE;
const MOBILE_FIT_SHIFT_END = HERO_CONNECT_END_FILE;
const MOBILE_FIT_SHIFT_TARGET: MobileFrameFit = "height50";
  
const CONNECT_EMAIL = "info.visitinglink@gmail.com";

const TAGLINE_1 = {
  line: "Turn imagination into something people can experience.",
  desc: "We translate bold ideas into interfaces, products, and moments your audience can feel — not just see.",
};

const TAGLINE_2 = {
  line: "Where ideas take shape, and experiences come alive.",
  desc: "From first sketch to final launch, we shape digital worlds that move with clarity, craft, and purpose.",
};

function layoutCover(
  cw: number,
  ch: number,
  imgAspect: number,
): { dw: number; dh: number; dx: number; dy: number } {
  const canvasAspect = cw / ch;
  if (canvasAspect > imgAspect) {
    const dw = cw;
    const dh = cw / imgAspect;
    return { dw, dh, dx: 0, dy: (ch - dh) / 2 };
  }
  const dh = ch;
  const dw = ch * imgAspect;
  return { dw, dh, dx: (cw - dw) / 2, dy: 0 };
}

function layoutContain(
  boxW: number,
  boxH: number,
  imgAspect: number,
  offsetX = 0,
  offsetY = 0,
): { dw: number; dh: number; dx: number; dy: number } {
  const boxAspect = boxW / boxH;
  if (boxAspect > imgAspect) {
    const dh = boxH;
    const dw = boxH * imgAspect;
    return {
      dw,
      dh,
      dx: offsetX + (boxW - dw) / 2,
      dy: offsetY,
    };
  }
  const dw = boxW;
  const dh = boxW / imgAspect;
  return {
    dw,
    dh,
    dx: offsetX,
    dy: offsetY + (boxH - dh) / 2,
  };
}

function heightRatioForFit(mode: MobileFrameFit): number | null {
  switch (mode) {
    case "contain":
      return null;
    case "vh80":
      return 0.8;
    case "height50":
      return 0.5;
    case "height60":
      return 0.6;
    case "height70":
      return 0.7;
    case "height80":
      return 0.8;
    case "height90":
      return 0.9;
  }
}

function layoutMobileFrame(
  mode: MobileFrameFit,
  cw: number,
  ch: number,
  imgAspect: number,
): { dw: number; dh: number; dx: number; dy: number } {
  const ratio = heightRatioForFit(mode);
  if (ratio == null) {
    return layoutContain(cw, ch, imgAspect);
  }

  // Lock height ratio — sides may crop on landscape frames
  const dh = ch * ratio;
  const dw = dh * imgAspect;

  return {
    dw,
    dh,
    dx: (cw - dw) / 2,
    dy: (ch - dh) / 2,
  };
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

/** Smoothly blend MOBILE_FRAME_FIT → shift target across the final hero frames. */
function layoutMobileFrameAtFile(
  fileNum: number,
  cw: number,
  ch: number,
  imgAspect: number,
): { dw: number; dh: number; dx: number; dy: number } {
  const from = layoutMobileFrame(MOBILE_FRAME_FIT, cw, ch, imgAspect);
  const to = layoutMobileFrame(MOBILE_FIT_SHIFT_TARGET, cw, ch, imgAspect);

  if (fileNum <= MOBILE_FIT_SHIFT_START) return from;
  if (fileNum >= MOBILE_FIT_SHIFT_END) return to;

  const raw =
    (fileNum - MOBILE_FIT_SHIFT_START) /
    (MOBILE_FIT_SHIFT_END - MOBILE_FIT_SHIFT_START);
  const t = easeOutCubic(Math.min(1, Math.max(0, raw)));

  return {
    dw: lerp(from.dw, to.dw, t),
    dh: lerp(from.dh, to.dh, t),
    dx: lerp(from.dx, to.dx, t),
    dy: lerp(from.dy, to.dy, t),
  };
}

function frameIndexFromScrollFraction(
  fraction: number,
  _isMobile: boolean,
): number {
  const clamped = Math.min(1, Math.max(0, fraction));
  return Math.min(
    TOTAL_FRAMES,
    Math.max(1, Math.round(1 + clamped * (TOTAL_FRAMES - 1))),
  );
}

function isMobileViewport() {
  return typeof window !== "undefined" && window.innerWidth < 768;
}

function connectRestY() {
  return isMobileViewport() ? 18 : 14;
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function easeInCubic(t: number) {
  return t * t * t;
}

function introProgress(fileFrame: number) {
  if (fileFrame <= 1) return 0;
  if (fileFrame >= HERO_INTRO_EXIT_FILE) return 1;
  return (fileFrame - 1) / (HERO_INTRO_EXIT_FILE - 1);
}

function introMotion(fileFrame: number) {
  const raw = introProgress(fileFrame);
  const eased = easeOutCubic(raw);
  return {
    overlay: 0.85 * (1 - eased),
    opacity: 1 - eased,
    translateY: -eased * 38,
    blur: eased * 6,
    scale: 1 - eased * 0.04,
  };
}

function midMotion(fileFrame: number) {
  if (fileFrame < HERO_MID_START_FILE || fileFrame > HERO_MID_END_FILE) {
    return { opacity: 0, translateY: 40, overlay: 0, blur: 8, scale: 0.96 };
  }

  const span = HERO_MID_END_FILE - HERO_MID_START_FILE;
  const t = (fileFrame - HERO_MID_START_FILE) / span;
  const enterEnd = 0.22;
  const exitStart = 0.78;

  if (t < enterEnd) {
    const p = easeOutCubic(t / enterEnd);
    return {
      opacity: p,
      translateY: (1 - p) * 40,
      overlay: 0.72 * p,
      blur: (1 - p) * 8,
      scale: 0.96 + p * 0.04,
    };
  }

  if (t > exitStart) {
    const p = easeInCubic((t - exitStart) / (1 - exitStart));
    return {
      opacity: 1 - p,
      translateY: -p * 38,
      overlay: 0.72 * (1 - p),
      blur: p * 6,
      scale: 1 - p * 0.04,
    };
  }

  return { opacity: 1, translateY: 0, overlay: 0.72, blur: 0, scale: 1 };
}

/** Frames 355–375: rise from bottom and settle; stay put after. */
function connectMotion(fileFrame: number) {
  const restY = connectRestY();

  if (fileFrame < HERO_CONNECT_START_FILE) {
    return { opacity: 0, translateY: 56, overlay: 0, scale: 0.96 };
  }

  if (fileFrame >= HERO_CONNECT_END_FILE) {
    return { opacity: 1, translateY: restY, overlay: 1, scale: 1 };
  }

  const span = HERO_CONNECT_END_FILE - HERO_CONNECT_START_FILE;
  const p = easeOutCubic((fileFrame - HERO_CONNECT_START_FILE) / span);

  return {
    opacity: p,
    translateY: (1 - p) * 56 + p * restY,
    overlay: p,
    scale: 0.96 + p * 0.04,
  };
}

function HeroTagline({
  eyebrow,
  line,
  desc,
  style,
}: {
  eyebrow: string;
  line: string;
  desc: string;
  style: CSSProperties;
}) {
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
      style={style}
    >
      <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/50">
        {eyebrow}
      </p>
      <h2 className="max-w-4xl bg-gradient-to-br from-white via-[#F5F0FF] to-[#FF8A78]/90 bg-clip-text text-3xl font-medium leading-[1.14] tracking-tight text-transparent sm:text-4xl md:text-5xl lg:text-[52px]">
        {line}
      </h2>
      <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/55 sm:text-base">
        {desc}
      </p>
    </div>
  );
}

function HeroConnectCta({
  style,
  interactive,
}: {
  style: CSSProperties;
  interactive: boolean;
}) {
  return (
    <div
      className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center"
      style={{
        ...style,
        pointerEvents: interactive ? "auto" : "none",
      }}
    >
      <a
        href={`mailto:${CONNECT_EMAIL}`}
        className="group inline-flex cursor-pointer items-center gap-3 rounded-full border border-white/25 bg-white/15 px-6 py-4 backdrop-blur-md transition-colors hover:bg-white/25 md:gap-5 md:px-16 md:py-8"
        aria-label={`Email ${CONNECT_EMAIL}`}
      >
        <h2
          className="text-3xl uppercase tracking-wide text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] md:text-5xl"
          style={{
            fontFamily: "var(--font-montserrat-alt)",
            fontWeight: 600,
          }}
        >
          L<span className="text-2xl md:text-4xl">et&apos;s</span> C
          <span className="text-2xl md:text-4xl">onnect</span>
        </h2>
        <span
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/25 bg-white text-black transition-transform duration-200 group-hover:translate-x-0.5 md:h-11 md:w-11"
          aria-hidden
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.25}
            stroke="currentColor"
            className="h-4 w-4 md:h-6 md:w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
          </svg>
        </span>
      </a>
    </div>
  );
}

export function Hero() {
  const trackRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const frameRef = useRef(1);
  const { fileFrame, setFileFrame } = useHeroFileFrame();
  const prefersReducedMotion = useReducedMotion();
  const { framesReady } = useStartupReady();

  const intro = introMotion(fileFrame);
  // const mid = midMotion(fileFrame);
  // const connect = connectMotion(fileFrame);

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;

    const img = getCachedFrame(index);
    if (!img?.complete || !img.naturalWidth) {
      // Keep scrolling smooth while a frame is still loading
      prefetchHeroFramesAround(index, 10);
      return;
    }

    const cw = canvas.clientWidth;
    const ch = canvas.clientHeight;
    const imgAspect = img.naturalWidth / img.naturalHeight;
    const isMobile = cw < 768;
    const fileNum = getFileNumberForIndex(index);

    const { dw, dh, dx, dy } = isMobile
      ? layoutMobileFrameAtFile(fileNum, cw, ch, imgAspect)
      : layoutCover(cw, ch, imgAspect);

    ctx.fillStyle = HERO_BG;
    ctx.fillRect(0, 0, cw, ch);
    ctx.drawImage(img, dx, dy, dw, dh);
    prefetchHeroFramesAround(index, 8);
  }, []);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Cap DPR on mobile — biggest canvas cost during scroll redraws
    const isMobile = window.innerWidth < 768;
    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.25 : 1.75);
    const w = window.innerWidth;
    const h = window.innerHeight;

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    const track = trackRef.current;
    if (track) {
      const trackVh =
        w < 768 ? SCROLL_TRACK_VH_MOBILE : SCROLL_TRACK_VH_DESKTOP;
      track.style.height = `${trackVh}vh`;
    }

    const ctx = canvas.getContext("2d", { alpha: false });
    if (ctx) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = isMobile ? "medium" : "high";
      ctxRef.current = ctx;
    }

    drawFrame(frameRef.current);
  }, [drawFrame]);

  const setFrame = useCallback(
    (nextFrame: number) => {
      const fileNum = getFileNumberForIndex(nextFrame);
      if (nextFrame !== frameRef.current) {
        frameRef.current = nextFrame;
        drawFrame(nextFrame);
      }
      setFileFrame(fileNum);
    },
    [drawFrame, setFileFrame],
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
    const isMobile = window.innerWidth < 768;
    const nextFrame = frameIndexFromScrollFraction(fraction, isMobile);

    setFrame(nextFrame);

    const trackBottom = track.offsetTop + track.offsetHeight;
    const pastHero = getScrollY() >= trackBottom - viewport * 0.15;
    const heroEl = heroSectionRef.current;
    if (heroEl) {
      heroEl.style.opacity = pastHero ? "0" : "1";
      heroEl.style.visibility = pastHero ? "hidden" : "visible";
    }
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
        ref={heroSectionRef}
        id="hero-section"
        className={`pointer-events-none fixed inset-0 bg-[#F8F8F8] transition-opacity duration-300 z-0`}
      >
        <canvas
          ref={canvasRef}
          className="block h-full w-full shadow-none"
          aria-hidden
        />

        <div className="absolute inset-0 z-10 overflow-hidden">
          {/* Intro — tagline 1 exits by frame 70 */}
          <div
            className="absolute inset-0 bg-black transition-none"
            style={{ opacity: intro.overlay }}
          />

          <HeroTagline
            eyebrow="VisitingLink Studio"
            line={TAGLINE_1.line}
            desc={TAGLINE_1.desc}
            style={{
              opacity: intro.opacity,
              transform: `translate3d(0, ${intro.translateY}vh, 0) scale(${intro.scale})`,
              willChange: "transform, opacity",
            }}
          />

          {/* Mid — tagline 2 enters from bottom at 157, exits at 300 */}
          {/*
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20 transition-none"
            style={{ opacity: mid.overlay }}
          />

          <HeroTagline
            eyebrow="Creative process"
            line={TAGLINE_2.line}
            desc={TAGLINE_2.desc}
            style={{
              opacity: mid.opacity,
              transform: `translate3d(0, ${mid.translateY}vh, 0) scale(${mid.scale})`,
              willChange: "transform, opacity",
            }}
          />
          */}

          {/* Connect — frames 355–375; gradient overlay, settles and stays */}
          {/*
          <div
            className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/85 transition-none"
            style={{ opacity: connect.overlay }}
          />

          <HeroConnectCta
            interactive={connect.opacity > 0.4}
            style={{
              opacity: connect.opacity,
              transform: `translate3d(0, ${connect.translateY}vh, 0) scale(${connect.scale})`,
              willChange: "transform, opacity",
            }}
          />
          */}

        </div>
      </div>

      <div
        ref={trackRef}
        id="hero-scroll-track"
        className="pointer-events-none relative z-[2] w-full"
        style={{ height: `${SCROLL_TRACK_VH_MOBILE}vh` }}
      />
    </>
  );
}
