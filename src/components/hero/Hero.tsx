'use client';

import { useEffect, useRef, useState } from 'react';
import { Montserrat } from 'next/font/google';

import ParticleWordmark from './Particlewordmark';
import TechCarousel from './Techcarousel';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
});

// Keep this in sync with SCROLL_TRIGGER_PX in ParticleWordmark, so the
// headline/tagline/carousel start revealing right as the particle
// dismantle kicks off.
const SCROLL_REVEAL_START_PX = 24;

// How much scroll distance the headline/carousel take to travel from
// "just appearing at 15% from the bottom" to "fully settled". This is
// a real scroll-linked scrub tied to scroll *within the hero section*,
// not a timed CSS transition.
const SCROLL_REVEAL_RANGE_PX = 380;

// Total height of the hero section, in vh. Because the inner content is
// `sticky`, the section stays pinned on screen for this entire scroll
// distance before the next section is allowed to appear — this is what
// stops the next section from showing up right after the reveal
// finishes. 100vh of that is the pinned viewport itself; the remaining
// (HERO_TOTAL_VH - 100) is extra "hold" scroll after everything has
// settled, before the hero finally scrolls away.
const HERO_TOTAL_VH = 160;

const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

export default function Hero() {
  const [formed, setFormed] = useState(false);
  const [progress, setProgress] = useState(0); // 0 = hidden/bottom, 1 = settled
  const sectionRef = useRef<HTMLElement | null>(null);
  const formedRef = useRef(formed);

  useEffect(() => {
    formedRef.current = formed;
    // the moment the particle mark finishes forming, snap progress to
    // whatever the current scroll position already implies — in case
    // the user scrolled a little during the ~3s formation itself.
    if (formed) recompute();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formed]);

  function recompute() {
    if (!formedRef.current) {
      setProgress(0);
      return;
    }
    const section = sectionRef.current;
    if (!section) return;

    // Scroll distance consumed since the section's top edge reached the
    // top of the viewport — this is what actually drives the reveal,
    // rather than raw window.scrollY, so it stays correct regardless of
    // whatever content sits above the hero on the page.
    const rect = section.getBoundingClientRect();
    const scrolledIntoSection = clamp(-rect.top, 0, section.offsetHeight);

    const raw =
      (scrolledIntoSection - SCROLL_REVEAL_START_PX) / SCROLL_REVEAL_RANGE_PX;
    setProgress(clamp(raw, 0, 1));
  }

  // Scroll-linked reveal: progress is recalculated straight off scroll
  // position on every scroll frame, so the headline/carousel move in
  // lockstep with the scrollbar exactly like any other scroll-triggered
  // section — not via a fixed-duration transition.
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReduced) {
      setProgress(1);
      return;
    }

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
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // Small helper so a given element's reveal can start a touch later
  // than `progress` itself (e.g. tagline trailing the headline) while
  // still finishing at the exact same point.
  const offsetProgress = (delay: number) =>
    clamp((progress - delay) / (1 - delay), 0, 1);

  // Headline and carousel share the exact same progress value with NO
  // offset, so they move as one rigid block: the gap between them
  // never changes while scrolling — when the headline reaches center,
  // the carousel is exactly at the bottom.
  const blockStyle = (p: number): React.CSSProperties => ({
    transform: `translateY(${(1 - p) * 35}vh)`,
    opacity: p,
    willChange: 'transform, opacity',
  });

  const showHint = formed && progress <= 0.001;

  return (
    <section
      ref={sectionRef}
      className="
        relative w-full
        bg-[#010102]
        bg-[radial-gradient(ellipse_50%_55%_at_110%_-5%,rgba(59,130,246,0.28)_0%,rgba(124,58,237,0.20)_35%,transparent_72%),radial-gradient(ellipse_65%_55%_at_0%_100%,rgba(236,72,153,0.25)_0%,rgba(168,85,247,0.18)_35%,transparent_72%),radial-gradient(ellipse_50%_40%_at_75%_80%,rgba(59,130,246,0.10),transparent_70%)]
      "
      style={{ height: `${HERO_TOTAL_VH}vh` }}
    >
      {/* Sticky viewport — pins the whole hero (particles, headline,
          carousel) to the screen for the full HERO_TOTAL_VH scroll
          distance, so the next section can't creep in early. Once the
          user has scrolled past that distance, this naturally unsticks
          and the page continues to the next section as normal. */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* Particle wordmark — forms dead-center, dismantles + flies off-screen on scroll */}
        <ParticleWordmark
          text="VisitingLink"
          onFormed={() => setFormed(true)}
        />

        <div className="relative z-10 flex h-full flex-col">
          
          {/* Hero copy — true center, no vertical offset */}
          <div className="flex flex-1 flex-col items-center justify-center px-5 text-center">
            {/* Headline — position/opacity are a direct function of
                scroll (via `progress`), travelling up from 15% of the
                viewport height as the user scrolls. */}
            <h1
              style={blockStyle(progress)}
              className={`
                ${montserrat.className}
                max-w-[820px]
                text-[36px] leading-[1.15]
                font-semibold tracking-[-0.01em]
                sm:text-[48px]
                lg:text-[64px]

                bg-gradient-to-b
                from-white
                via-[#c7c7c7]
                to-[#3a3a3a]
                bg-clip-text
                text-transparent
              `}
            >
              We Design & Build Business Softwares.
            </h1>

            {/* Tagline — same scroll-scrub, starts a touch after the
                headline (8% into its travel) but finishes at the same
                point, so it trails slightly. */}
            <p
              style={blockStyle(offsetProgress(0.08))}
              className={`
                ${montserrat.className}
                mt-6
                max-w-[660px]
                text-[16px] leading-[1.6]
                font-medium tracking-[0.005em]
                sm:text-[19px]
                lg:text-[21px]

                bg-gradient-to-b
                from-[#e5e5e5]
                via-[#a8a8a8]
                to-[#555555]
                bg-clip-text
                text-transparent
              `}
            >
              From business websites and e-commerce platforms to CRM systems and custom software.
            </p>
          </div>

          {/* Scroll hint — shown once the mark has formed, until the user starts scrolling */}
          <div
            className={`
              ${montserrat.className}
              absolute bottom-8 left-1/2 -translate-x-1/2
              flex flex-col items-center gap-2
              text-xs font-medium tracking-[0.15em] text-[#8a8a8a]
              transition-opacity duration-500 ease-out
              ${showHint ? 'opacity-70' : 'opacity-0'}
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

          {/* Tech carousel — part of the same sticky block as the
              headline, sharing the SAME `progress` (no offset), so
              both move as one unit and the spacing between them stays
              constant. Because it's inside the sticky wrapper, it
              stays pinned at the bottom of the screen for the full
              hold duration, then scrolls away together with everything
              else once the hero finally unsticks. */}
          <div style={blockStyle(progress)} className="mt-auto">
            <TechCarousel />
          </div>
        </div>
      </div>
    </section>
  );
}