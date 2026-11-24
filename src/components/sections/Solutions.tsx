"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { motion, useAnimationFrame, useReducedMotion } from "motion/react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ------------------------------ Data (edit me) ------------------------------ */
type SolutionCard = {
  id: string;
  alt: string; // screen-reader only (not shown)
  image: string; // the full card image (title, preview, arrow all baked in)
};

const CARDS: SolutionCard[] = [
  {
    id: "organic-store",
    alt: "Organic Store website",
    image: "/solutions/1.jpeg",
  },
  {
    id: "jewelry-shop",
    alt: "Jewelry Shop website",
    image: "/solutions/2.jpeg",
  },
  {
    id: "boutique-fashion",
    alt: "Boutique & Fashion website",
    image: "/solutions/3.jpeg",
  },
  {
    id: "retail-trading-1",
    alt: "Retail & Trading website",
    image: "/solutions/9.jpeg",
  },
  {
    id: "retail-trading-2",
    alt: "Retail & Trading website",
    image: "/solutions/7.jpeg",
  },
  {
    id: "retail-trading-3",
    alt: "Retail & Trading website",
    image: "/solutions/8.jpeg",
  },
  {
    id: "retail-trading-4",
    alt: "Retail & Trading website",
    image: "/solutions/10.jpeg",
  },
];

/* Two identical sets side by side; the track wraps by exactly one set width,
   so the loop is seamless. Each set is wider than the viewport (7 cards > 5). */
const COPIES = [0, 1];

const AUTO_SECONDS = 35; // time for the carousel to travel one full set

/*
 * --per  : how many cards are visible at once (5 on desktop, 2 on mobile)
 * --gap  : space between cards
 * --vw   : width of the visible carousel window (95vw)
 * Both ends fade out using mask-image.
 */
const CAROUSEL_CSS = `
.sol-marquee {
  --gap: 28px;
  --per: 2;
  --vw: 95vw;
  --card-w: calc((var(--vw) - (var(--per) - 1) * var(--gap)) / var(--per));
  width: var(--vw);
  max-width: 95vw;
  -webkit-mask-image: linear-gradient(to right, transparent 0, #000 8%, #000 92%, transparent 100%);
  mask-image: linear-gradient(to right, transparent 0, #000 8%, #000 92%, transparent 100%);
}
@media (min-width: 768px) {
  .sol-marquee {
    --gap: 32px;
    --per: 5;
    --vw: min(95vw, 1600px);
    -webkit-mask-image: linear-gradient(to right, transparent 0, #000 10%, #000 90%, transparent 100%);
    mask-image: linear-gradient(to right, transparent 0, #000 10%, #000 90%, transparent 100%);
  }
}
.sol-item {
  width: calc(var(--card-w) + var(--gap));
  padding-right: var(--gap);
  flex-shrink: 0;
}
`;

/* --------------------------------- Component -------------------------------- */
export const Solutions: React.FC = () => {
  const reduceMotion = useReducedMotion();

  const trackRef = useRef<HTMLDivElement>(null);
  const setRef = useRef<HTMLDivElement>(null);

  const x = useRef(0); // current translateX (px), kept in (-setW, 0]
  const setW = useRef(0); // width of one full set of cards
  const dragging = useRef(false);
  const hovering = useRef(false);
  const vel = useRef(0); // inertia velocity (px/ms)

  const startX = useRef(0);
  const startOffset = useRef(0);
  const lastX = useRef(0);
  const lastT = useRef(0);

  // Measure one set's width (updates on resize)
  useEffect(() => {
    const el = setRef.current;
    if (!el) return;
    const measure = () => {
      setW.current = el.getBoundingClientRect().width;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Auto-slide + inertia + seamless wrap
  useAnimationFrame((_t, delta) => {
    const w = setW.current;
    if (!w || !trackRef.current) return;

    if (!dragging.current) {
      if (Math.abs(vel.current) > 0.02) {
        // fling momentum after a swipe
        x.current += vel.current * delta;
        vel.current *= Math.pow(0.95, delta / 16);
      } else {
        vel.current = 0;
        if (!hovering.current && !reduceMotion) {
          x.current -= (w / (AUTO_SECONDS * 1000)) * delta;
        }
      }
    }

    // wrap into (-w, 0]
    x.current = x.current % w;
    if (x.current > 0) x.current -= w;

    trackRef.current.style.transform = `translate3d(${x.current}px, 0, 0)`;
  });

  /* ------------------------------ Swipe / drag ------------------------------ */
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    dragging.current = true;
    vel.current = 0;
    startX.current = e.clientX;
    startOffset.current = x.current;
    lastX.current = e.clientX;
    lastT.current = performance.now();
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    x.current = startOffset.current + (e.clientX - startX.current);

    const now = performance.now();
    const dt = now - lastT.current;
    if (dt > 0) {
      const v = (e.clientX - lastX.current) / dt; // px/ms
      vel.current = vel.current * 0.7 + v * 0.3;
    }
    lastX.current = e.clientX;
    lastT.current = now;
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    dragging.current = false;
    // if the finger paused before lifting, don't fling
    if (performance.now() - lastT.current > 80) vel.current = 0;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  return (
    <section
      id="solutions"
      className={`${poppins.className} relative isolate overflow-hidden bg-white px-4 py-16 text-[#111] md:py-24`}
    >
      <style>{CAROUSEL_CSS}</style>

      {/* Glowy pink gradient at the top-left, floating gently up and down */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-0"
      >
        {/* Top-left: soft pink / violet */}
        <motion.div
          className="absolute -top-[260px] left-[-50%] md:left-[-25%] h-[620px] w-[min(760px,90vw)] will-change-transform"
          style={{
            background:
              "radial-gradient(ellipse closest-side, rgba(236,72,153,0.20) 0%, rgba(168,85,247,0.10) 48%, rgba(168,85,247,0.03) 72%, transparent 100%)",
          }}
          animate={reduceMotion ? undefined : { y: [0, 36, 0] }}
          transition={{ duration: 9, ease: "easeInOut", repeat: Infinity }}
        />
      </div>

      {/* Heading */}
      <div className="mx-auto w-[85vw] text-center">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mx-auto max-w-[100vw] md:max-w-[980px] text-[clamp(1.5rem,3.7vw,3.25rem)] font-normal leading-[1.3] tracking-tight"
        >
          Successfully implemented in various Business categories.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
          className="mx-auto mt-8 max-w-[900px] text-[clamp(0.95rem,1.5vw,1.25rem)] font-normal leading-snug text-[#555]"
        >
          Profession-specific websites, company profiles and online stores,
          designed and built by our developers and designers for your industry,
          your customers and your goals.
        </motion.p>
      </div>

      {/* Sliding carousel: auto-scroll + swipe/drag */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 0.8, ease: EASE }}
        className="sol-marquee mx-auto mt-10 overflow-hidden pb-8 pt-1 md:mt-12"
      >
        <div
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onPointerEnter={(e) => {
            if (e.pointerType === "mouse") hovering.current = true;
          }}
          onPointerLeave={(e) => {
            if (e.pointerType === "mouse") hovering.current = false;
          }}
          onDragStart={(e) => e.preventDefault()}
          style={{ touchAction: "pan-y" }}
          className="cursor-grab select-none active:cursor-grabbing"
        >
          <div ref={trackRef} className="flex w-max will-change-transform">
            {COPIES.map((c) => {
              const isOriginal = c === 0;
              return (
                <div
                  key={c}
                  ref={isOriginal ? setRef : undefined}
                  className="flex shrink-0"
                  aria-hidden={!isOriginal || undefined}
                >
                  {CARDS.map((card, i) => (
                    <div key={`${c}-${i}`} className="sol-item">
                      <div className="group relative block aspect-[231/322] overflow-hidden rounded-[18px] bg-neutral-200 shadow-[0_12px_30px_-14px_rgba(0,0,0,0.35)] lg:rounded-[22px]">
                        <Image
                          src={card.image}
                          alt={isOriginal ? card.alt : ""}
                          fill
                          sizes="(min-width: 768px) 19vw, 46vw"
                          quality={90}
                          draggable={false}
                          className="pointer-events-none object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Solutions;
