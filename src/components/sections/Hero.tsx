"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, type PanInfo } from "motion/react";

/* -------------------------------------------------------------------------- */
/*  Hero background — constant (does not change with the carousel)            */
/* -------------------------------------------------------------------------- */
const HERO_BG = {
  type: "video" as "video" | "image",
  src: "/hero/hero_vid.mp4",
  poster: undefined as string | undefined,
};

/* -------------------------------------------------------------------------- */
/*  Cards — edit this list to change the sliding carousel                      */
/*  `card` = preview image shown in the cards row                              */
/* -------------------------------------------------------------------------- */
type HeroCardData = {
  id: string;
  card: string;
  alt: string;
};

const CARDS: HeroCardData[] = [
  {
    id: "hero-1",
    card: "/work/videha.webp",
    alt: "Wellness center website preview",
  },
  {
    id: "hero-2",
    card: "/work/loomstone.webp",
    alt: "Academic lessons website preview",
  },
  {
    id: "hero-3",
    card: "/work/crm.jpg",
    alt: "Online store website preview",
  },
  {
    id: "hero-4",
    card: "/work/conbell.webp",
    alt: "Creative agency website preview",
  },
  {
    id: "hero-5",
    card: "/work/allservoz.png",
    alt: "Online store website preview",
  },
  {
    id: "hero-6",
    card: "/work/krishnayan.webp",
    alt: "Online store website preview",
  },
];

const AUTO_SLIDE_MS = 2000; // next card comes to centre every 2 seconds
const SWIPE_DISTANCE = 50; // px
const SWIPE_VELOCITY = 400; // px/s

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const COOPER_FONT = "'Cooper BT', 'Cooper Black', 'Cooper Std', Georgia, serif";
const IMPACT_FONT =
  "Impact, Haettenschweiler, 'Arial Narrow Bold', 'Arial Black', sans-serif";
const CARD_STEP = 106; // % of card width between card centres
const CARD_OFFSETS = [-2, -1, 0, 1, 2]; // -2 / 2 are hidden "staging" slots
// Arc shape, indexed by |offset| (0 = centre, 1 = side, 2 = hidden staging)
const CARD_TILT = [0, 7, 14]; // deg  — centre card is always 0
const CARD_DROP = [0, 9, 26]; // % of card height pushed down

const mod = (a: number, n: number) => ((a % n) + n) % n;

/* ------------------------------ Background layer ------------------------------ */
const HeroBackground: React.FC = () => (
  <div className="absolute inset-0" aria-hidden>
    {HERO_BG.type === "video" ? (
      <video
        className="h-full w-full object-cover opacity-70"
        src={HERO_BG.src}
        poster={HERO_BG.poster}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
    ) : (
      <Image
        src={HERO_BG.src}
        alt=""
        fill
        sizes="100vw"
        quality={85}
        priority
        draggable={false}
        className="object-cover"
      />
    )}
  </div>
);

/* ---------------------------------- Card ---------------------------------- */
const HeroCard: React.FC<{
  slide: HeroCardData;
  offset: number;
  onSelect: () => void;
}> = ({ slide, offset, onSelect }) => {
  const isActive = offset === 0;
  const isVisible = Math.abs(offset) <= 1;

  return (
    <motion.button
      type="button"
      onClick={isActive ? undefined : onSelect}
      aria-label={isActive ? `Current: ${slide.alt}` : `Show ${slide.alt}`}
      aria-current={isActive}
      tabIndex={isVisible && !isActive ? 0 : -1}
      initial={false}
      animate={{
        x: `${offset * CARD_STEP}%`,
        // curved (arc) layout: centre card is flat, side cards tilt + drop down
        y: `${CARD_DROP[Math.min(Math.abs(offset), 2)]}%`,
        rotate: Math.sign(offset) * CARD_TILT[Math.min(Math.abs(offset), 2)],
        scale: isActive ? 1 : Math.abs(offset) === 1 ? 0.92 : 0.84,
        opacity: isVisible ? 1 : 0,
        filter: isActive ? "brightness(1)" : "brightness(0.5)",
      }}
      transition={{ duration: 0.75, ease: EASE }}
      style={{
        transformPerspective: 1400,
        zIndex: isActive ? 10 : 5 - Math.abs(offset),
      }}
      className={`absolute inset-0 block select-none overflow-hidden rounded-xl bg-[#111] shadow-[0_20px_60px_rgba(0,0,0,0.55)] ring-1 ring-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white ${
        isActive
          ? "cursor-default"
          : isVisible
            ? "cursor-pointer"
            : "pointer-events-none"
      }`}
    >
      <Image
        src={slide.card}
        alt={slide.alt}
        fill
        sizes="(min-width: 768px) 47vw, 78vw"
        quality={85}
        draggable={false}
        className="object-fill"
      />
    </motion.button>
  );
};

/* ---------------------------------- Hero ---------------------------------- */
export const Hero: React.FC = () => {
  // `pos` is unbounded so cards keep a stable identity while sliding;
  // the real card index is derived with mod().
  const [pos, setPos] = useState(0);
  const n = CARDS.length;
  const dragged = useRef(false);

  const go = useCallback((delta: number) => setPos((p) => p + delta), []);

  // Auto-slide: every 2s the next card comes to the centre.
  // The timer restarts whenever `pos` changes (auto, swipe or click).
  useEffect(() => {
    const t = window.setTimeout(() => setPos((p) => p + 1), AUTO_SLIDE_MS);
    return () => window.clearTimeout(t);
  }, [pos]);

  // Swipe gesture
  const handlePanStart = () => {
    dragged.current = true;
  };
  const handlePanEnd = (_e: unknown, info: PanInfo) => {
    const { x } = info.offset;
    const vx = info.velocity.x;
    if (x < -SWIPE_DISTANCE || vx < -SWIPE_VELOCITY) go(1);
    else if (x > SWIPE_DISTANCE || vx > SWIPE_VELOCITY) go(-1);
    // let the trailing click event pass before re-enabling card clicks
    window.setTimeout(() => {
      dragged.current = false;
    }, 0);
  };

  return (
    <section id="hero" className="relative overflow-hidden bg-black text-white">
      {/* Constant background media (first viewport), fading into black below */}
      <div className="absolute inset-x-0 top-0 h-[100svh] min-h-[640px]">
        <HeroBackground />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-black"
        />
      </div>

      {/* Headline */}
      <div className="relative z-10 flex h-[100svh] min-h-[640px] flex-col items-center justify-center px-6 py-20 text-center">
        <div className="relative isolate flex flex-col items-center">
          {/* Oval black gradient, sized to the content only */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-x-[14%] -inset-y-[35%] -z-10 rounded-[50%]"
            style={{
              background:
                "radial-gradient(ellipse closest-side, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 55%, rgba(0,0,0,0.01) 90%, rgba(0,0,0,0) 100%)",
            }}
          />
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            style={{ fontFamily: COOPER_FONT }}
            className="max-w-[860px] text-[clamp(2rem,4.4vw,4.5rem)] font-normal leading-[1.08] tracking-tight"
          >
            We Build Custom<br/> Software Solutions for<br/> your business...
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.12 }}
            style={{ fontFamily: "'Poppins', sans-serif" }}
            className="mt-6 max-w-[900px] text-[clamp(0.95rem,1.4vw,1.5rem)] font-normal leading-snug text-white"
          >
            From professional websites to online stores and custom software,<br/> we
            build digital solutions around your vision.
          </motion.p>
        </div>
      </div>

      {/* Cards row */}
      <div className="relative z-10 mt-[10svh] pb-16 md:pb-24">
        <div className="relative">
          {/* OUR WORK — sits behind the cards */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 z-0 flex -translate-y-[70%] justify-center"
          >
           <div
             aria-hidden
             className="pointer-events-none absolute inset-x-0 top-0 z-0 flex -translate-y-[70%] justify-center overflow-hidden"
           >
             <motion.span
               initial={{ y: 80, opacity: 0 }}
               whileInView={{ y: 0, opacity: 1 }}
               viewport={{ once: true, amount: 0.3 }}
               transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
               style={{ fontFamily: IMPACT_FONT }}
               className="select-none whitespace-nowrap text-[clamp(3.5rem,13vw,15rem)] font-normal uppercase leading-none tracking-[0.12em] text-white/[0.14]"
             >
               Our Work
             </motion.span>
           </div>
          </div>

          {/* Swipeable carousel */}
          <motion.div
            onPanStart={handlePanStart}
            onPanEnd={handlePanEnd}
            style={{ touchAction: "pan-y" }}
            className="relative z-10 mx-auto aspect-[16/10] w-[78vw] cursor-grab active:cursor-grabbing md:w-[min(47vw,900px)]"
          >
            {CARD_OFFSETS.map((o) => {
              const v = pos + o;
              const slide = CARDS[mod(v, n)];
              return (
                <HeroCard
                  key={v}
                  slide={slide}
                  offset={o}
                  onSelect={() => {
                    if (dragged.current) return;
                    go(o);
                  }}
                />
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
