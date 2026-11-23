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
const CANVA_SANS = "'Canva Sans', 'Segoe UI', Arial, sans-serif";

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
    image: "/solutions/organic-store.jpg",
    href: "/services",
  },
  {
    id: "jewelry-shop",
    alt: "Jewelry Shop website",
    image: "/solutions/jewelry-shop.jpg",
    href: "/services",
  },
  {
    id: "boutique-fashion",
    alt: "Boutique & Fashion website",
    image: "/solutions/boutique-fashion.jpg",
    href: "/services",
  },
  {
    id: "retail-trading",
    alt: "Retail & Trading website",
    image: "/solutions/retail-trading.jpg",
    href: "/services",
  },
  {
    id: "business-entrepreneur",
    alt: "Business & Entrepreneur website",
    image: "/solutions/business-entrepreneur.jpg",
    href: "/services",
  },
  {
    id: "legal-professional",
    alt: "Legal & Professional website",
    image: "/solutions/legal-professional.jpg",
    href: "/services",
  },
];

/**
 * Track = 2 halves, each half = 2 copies of the card set.
 * Animating the track by -50% loops seamlessly, and each half is
 * wider than the viewport so there is never an empty gap.
 */
const HALVES = [0, 1];
const COPIES_PER_HALF = [0, 1];

const CAROUSEL_CSS = `
@keyframes sol-marquee {
  from { transform: translate3d(0, 0, 0); }
  to { transform: translate3d(-50%, 0, 0); }
}
.sol-track {
  animation: sol-marquee 45s linear infinite;
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
      className={`${poppins.className} relative isolate overflow-hidden bg-white px-4 py-8 text-[#111] md:py-12`}
    >
      <style>{CAROUSEL_CSS}</style>

      {/* Glowy pink gradient at the top-left, floating gently up and down */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-0"
      >
        {/* Top-left: soft pink / violet */}
        <motion.div
          className="absolute -top-[260px] left-[-25%] h-[620px] w-[min(760px,90vw)] will-change-transform"
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
          style={{ fontFamily: CANVA_SANS }}
          className="mx-auto max-w-[980px] text-[clamp(1.9rem,3.7vw,3.25rem)] font-bold leading-[1.1] tracking-tight"
        >
          Successfully implemented in various Business categories.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
          className="mx-auto mt-4 max-w-[900px] text-[clamp(0.95rem,1.5vw,1.25rem)] font-normal leading-snug text-[#555]"
        >
          Profession-specific websites, company profiles and online stores,
          designed and built by our developers and designers for your industry,
          your customers and your goals.
        </motion.p>
      </div>

      {/* Infinite sliding cards carousel */}
      <div
        className="sol-marquee mt-10 overflow-hidden pb-6 pt-1 md:mt-12"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)",
        }}
      >
        <div className="sol-track flex w-max">
          {HALVES.map((h) => (
            <div key={h} className="flex shrink-0">
              {COPIES_PER_HALF.map((c) => {
                const isOriginal = h === 0 && c === 0;
                return (
                  <div
                    key={c}
                    className="flex shrink-0 gap-3 pr-3"
                    aria-hidden={!isOriginal || undefined}
                  >
                    {CARDS.map((card) => (
                      <div
                        key={`${h}-${c}-${card.id}`}
                        className="w-[calc((85vw-3.75rem)/6)] min-w-[180px] shrink-0"
                      >
                        <Link
                          href={card.href}
                          aria-label={isOriginal ? card.alt : undefined}
                          tabIndex={isOriginal ? 0 : -1}
                          draggable={false}
                          className="group relative block aspect-[251/322] overflow-hidden rounded-[18px] bg-neutral-200 shadow-[0_12px_30px_-14px_rgba(0,0,0,0.35)]"
                        >
                          <Image
                            src={card.image}
                            alt={isOriginal ? card.alt : ""}
                            fill
                            sizes="(min-width: 768px) 14vw, 240px"
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solutions;
