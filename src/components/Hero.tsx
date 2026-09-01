"use client";

import { useCallback, useEffect, useRef, type CSSProperties } from "react";
import { useReducedMotion } from "motion/react";
import {
  TOTAL_FRAMES,
  HERO_INTRO_EXIT_FILE,
  HERO_MID_START_FILE,
  HERO_MID_END_FILE,
  getCachedFrame,
  getFileNumberForIndex,
} from "@/lib/heroFrames";
import { getScrollY } from "@/components/SmoothScroll";
import { useStartupReady } from "@/components/StartupLoader";
import { useHeroFileFrame } from "@/components/HeroFrameContext";

const SCROLL_TRACK_VH = 300;

const TAGLINE_1 = {
  line: "Turn imagination into something people can experience.",
  desc: "We translate bold ideas into interfaces, products, and moments your audience can feel — not just see.",
};

const TAGLINE_2 = {
  line: "Where ideas take shape, and experiences come alive.",
  desc: "From first sketch to final launch, we shape digital worlds that move with clarity, craft, and purpose.",
};

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
  const mid = midMotion(fileFrame);

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
    const nextFrame = Math.min(
      TOTAL_FRAMES,
      Math.max(1, Math.round(1 + fraction * (TOTAL_FRAMES - 1))),
    );

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
        className="pointer-events-none fixed inset-0 z-0 bg-[#0A0A0C] transition-opacity duration-300"
        aria-hidden
      >
        <canvas ref={canvasRef} className="block h-full w-full" />

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
              transform: `translateY(${intro.translateY}vh) scale(${intro.scale})`,
              filter: `blur(${intro.blur}px)`,
            }}
          />

          {/* Mid — tagline 2 enters from bottom at 388, exits at 560 */}
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
              transform: `translateY(${mid.translateY}vh) scale(${mid.scale})`,
              filter: `blur(${mid.blur}px)`,
            }}
          />

        </div>
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
