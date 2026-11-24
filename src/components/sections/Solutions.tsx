"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Poppins } from "next/font/google";
import { motion, useReducedMotion } from "motion/react";

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
  href: string;
};

const CARDS: SolutionCard[] = [
  {
    id: "organic-store",
    alt: "Organic Store website",
    image: "/solutions/1.jpeg",
    href: "/contact",
  },
  {
    id: "jewelry-shop",
    alt: "Jewelry Shop website",
    image: "/solutions/2.jpeg",
    href: "/contact",
  },
  {
    id: "boutique-fashion",
    alt: "Boutique & Fashion website",
    image: "/solutions/3.jpeg",
    href: "/contact",
  },
  {
    id: "retail-trading",
    alt: "Retail & Trading website",
    image: "/solutions/9.jpeg",
    href: "/contact",
  },
  {
    id: "retail-trading",
    alt: "Retail & Trading website",
    image: "/solutions/4.jpeg",
    href: "/contact",
  },
  {
    id: "retail-trading",
    alt: "Retail & Trading website",
    image: "/solutions/7.jpeg",
    href: "/contact",
  },
  {
    id: "retail-trading",
    alt: "Retail & Trading website",
    image: "/solutions/8.jpeg",
    href: "/contact",
  },
  {
    id: "retail-trading",
    alt: "Retail & Trading website",
    image: "/solutions/10.jpeg",
    href: "/contact",
  },
];

/* Two identical sets side by side; the track slides by -50% = one full set,
   so the loop is seamless. Each set is wider than the viewport (6 cards > 4). */
const COPIES = [0, 1];

/*
 * --per  : how many cards are visible at once (4 on desktop, 2 on mobile)
 * --gap  : space between cards
 * --vw   : width of the visible carousel window
 * Change --per below if you want a different count.
 */
const CAROUSEL_CSS = `
.sol-marquee {
  --gap: 25px;
  --per: 2;
  --vw: min(92vw, 1400px);
  --card-w: calc((var(--vw) - (var(--per) - 1) * var(--gap)) / var(--per));
  width: var(--vw);
}
@media (min-width: 768px) {
  .sol-marquee {
    --gap: 20px;
    --per: 4;
    --vw: min(88vw, 1400px);
  }
}
.sol-item {
  width: calc(var(--card-w) + var(--gap));
  padding-right: var(--gap);
  flex-shrink: 0;
}
@keyframes sol-marquee {
  from { transform: translate3d(0, 0, 0); }
  to { transform: translate3d(-50%, 0, 0); }
}
.sol-track {
  animation: sol-marquee 35s linear infinite;
  will-change: transform;
}
.sol-marquee:hover .sol-track,
.sol-marquee:focus-within .sol-track {
  animation-play-state: paused;
}
@media (prefers-reduced-motion: reduce) {
  .sol-track { animation: none; }
}
`;

/* --------------------------------- Component -------------------------------- */
export const Solutions: React.FC = () => {
  const reduceMotion = useReducedMotion();

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
          className="mx-auto max-w-[980px] text-[clamp(1.9rem,3.7vw,3.25rem)] font-normal leading-[1.3] tracking-tight"
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

      {/* Single-line sliding carousel (4 visible at a time) */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 0.8, ease: EASE }}
        className="sol-marquee mx-auto mt-10 overflow-hidden pb-8 pt-1 md:mt-12"
      >
        <div className="sol-track flex w-max">
          {COPIES.map((c) => {
            const isOriginal = c === 0;
            return (
              <div
                key={c}
                className="flex shrink-0"
                aria-hidden={!isOriginal || undefined}
              >
                {CARDS.map((card) => (
                  <div key={`${c}-${card.id}`} className="sol-item">
                    <Link
                      href={card.href}
                      aria-label={isOriginal ? card.alt : undefined}
                      tabIndex={isOriginal ? 0 : -1}
                      draggable={false}
                      className="group relative block aspect-[231/322] overflow-hidden rounded-[18px] bg-neutral-200 shadow-[0_12px_30px_-14px_rgba(0,0,0,0.35)] lg:rounded-[22px]"
                    >
                      <Image
                        src={card.image}
                        alt={isOriginal ? card.alt : ""}
                        fill
                        sizes="(min-width: 768px) 22vw, 46vw"
                        quality={90}
                        draggable={false}
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </Link>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};

export default Solutions;
