"use client";

import { useEffect, useRef, useState } from "react";
import { Montserrat } from "next/font/google";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ParticleWordmark from "./Particlewordmark";
import TechCarousel from "./Techcarousel";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

/**
 * Timeline (0 → 1) while the hero is pinned:
 *   0.00 – 0.30  particles assemble
 *   0.30 – 0.40  hold
 *   0.40 – 0.68  particles scatter
 *   0.50 – 0.80  CTA + button + carousel come in (overlaps scatter)
 *   0.80 – 1.00  settled, then unpin
 * Particle phases live in Particlewordmark.tsx.
 */
const REVEAL_START = 0.5;
const REVEAL_END = 0.8;

// Section height. Pinned scroll distance = (HERO_TOTAL_VH - 100)vh.
const HERO_TOTAL_VH = 300;

const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

// initial (hidden) look; after mount it's updated directly on the DOM
const HIDDEN: React.CSSProperties = {
  transform: "translate3d(0, 8vh, 0)",
  opacity: 0,
  willChange: "transform, opacity",
};

export default function Cta() {
  // Only two booleans live in React state and they flip rarely, so scrolling
  // does NOT re-render this component (or the carousel) every frame.
  const [showHint, setShowHint] = useState(true);
  const [interactive, setInteractive] = useState(false);

  const sectionRef = useRef<HTMLElement | null>(null);
  const progressRef = useRef(0);

  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subRef = useRef<HTMLParagraphElement | null>(null);
  const btnRef = useRef<HTMLDivElement | null>(null);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const targets: [React.RefObject<HTMLElement | null>, number][] = [
      [titleRef, 0],
      [subRef, 0.1],
      [btnRef, 0.2],
      [carouselRef, 0.3],
    ];

    const applyProgress = (progress: number) => {
      progressRef.current = progress;

      const reveal = clamp(
        (progress - REVEAL_START) / (REVEAL_END - REVEAL_START),
        0,
        1,
      );
      for (const [ref, delay] of targets) {
        const el = ref.current;
        if (!el) continue;
        const p = clamp((reveal - delay) / (1 - delay), 0, 1);
        el.style.opacity = String(p);
        el.style.transform = `translate3d(0, ${(1 - p) * 8}vh, 0)`;
      }

      // setState with the same value bails out, so this is cheap
      setShowHint(progress < 0.02);
      setInteractive(reveal > 0.6);
    };

    if (reduced) {
      applyProgress(1);
      return;
    }

    // live read: always correct, even if content above shifts.
    // Only transform/opacity are written, so this doesn't force a reflow.
    const recompute = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const scrollable = section.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;
      applyProgress(clamp(-rect.top / scrollable, 0, 1));
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        recompute();
      });
    };

    recompute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#010102]"
      style={{ height: `${HERO_TOTAL_VH}vh` }}
    >
      {/* Gradients live on the pinned div, so the glow stays fixed on screen
          while pinned, and only 100vh is painted instead of the whole section */}
      <div
        className="
          sticky top-0 h-screen w-full overflow-hidden
          bg-[radial-gradient(ellipse_50%_55%_at_110%_-5%,rgba(59,130,246,0.28)_0%,rgba(124,58,237,0.20)_35%,transparent_72%),radial-gradient(ellipse_65%_55%_at_0%_100%,rgba(236,72,153,0.25)_0%,rgba(168,85,247,0.18)_35%,transparent_72%),radial-gradient(ellipse_50%_40%_at_75%_80%,rgba(59,130,246,0.10),transparent_70%)]
        "
      >
        <ParticleWordmark text="VisitingLink" progressRef={progressRef} />

        <div className="relative z-10 flex h-full flex-col ">
          <div className="flex flex-1 flex-col items-center justify-center px-5 text-center">
            <h1
              ref={titleRef}
              style={HIDDEN}
              className={`
                ${montserrat.className}
                max-w-[900px]
                text-[36px] leading-[1.15]
                font-semibold tracking-[-0.01em]
                sm:text-[52px]
                lg:text-[68px]
                bg-gradient-to-b from-white via-[#c7c7c7] to-[#3a3a3a]
                bg-clip-text text-transparent
              `}
            >
              Let&apos;s create your<br/> business identity.
            </h1>

            <p
              ref={subRef}
              style={HIDDEN}
              className={`
                ${montserrat.className}
                mt-6 max-w-[660px]
                text-[16px] leading-[1.6]
                font-medium tracking-[0.005em]
                sm:text-[19px] lg:text-[21px]
                bg-gradient-to-b from-[#e5e5e5] via-[#a8a8a8] to-[#555555]
                bg-clip-text text-transparent
              `}
            >
              From business websites and e-commerce platforms to CRM systems and
              custom software.
            </p>

            <div
              ref={btnRef}
              style={{
                ...HIDDEN,
                pointerEvents: interactive ? "auto" : "none",
              }}
              className="mt-8"
            >
              <Link
                href="/contact"
                tabIndex={interactive ? 0 : -1}
                className={`
                  ${montserrat.className} group inline-flex items-center gap-3 rounded-full bg-transparent py-1.5 pl-7 pr-1.5 text-[14px] font-semibold uppercase tracking-wider text-white transition-colors border-[1px] border-white duration-200 hover:text-black hover:bg-[#e8e8e8] sm:text-[15px]
                `}
              >
                <span>Let&apos;s Talk</span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white transition-transform duration-300 group-hover:translate-x-0.5">
                  <ArrowRight className="h-[18px] w-[18px]" strokeWidth={2.5} />
                </span>
              </Link>
            </div>
          </div>

          {/* Scroll hint, only before any scrolling */}
          <div
            className={`
              ${montserrat.className}
              absolute bottom-8 left-1/2 -translate-x-1/2
              flex flex-col items-center gap-2
              text-xs font-medium tracking-[0.15em] text-[#8a8a8a]
              transition-opacity duration-500 ease-out
              ${showHint ? "opacity-70" : "opacity-0"}
            `}
            aria-hidden="true"
          >
            <span>SCROLL</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 animate-bounce"
            >
              <path d="M12 4v16M6 14l6 6 6-6" />
            </svg>
          </div>

          <div ref={carouselRef} style={HIDDEN} className="mt-auto">
            <TechCarousel />
          </div>
        </div>
      </div>
    </section>
  );
}
