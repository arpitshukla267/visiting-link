"use client";

import React from "react";
import Link from "next/link";
import { Poppins } from "next/font/google";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const CANVA_SANS = "'Canva Sans', 'Segoe UI', Arial, sans-serif";

const CTA_LABEL = "Get Started"; // change button text here
const CTA_HREF = "/contact"; // change button link here

// Soft black fade in each corner of the video (blends it into the black bg).
// Increase the alpha values / sizes for a stronger fade.
const CORNER_FADES = [
  { pos: "left-0 top-0", origin: "0% 0%" },
  { pos: "right-0 top-0", origin: "100% 0%" },
  { pos: "bottom-0 left-0", origin: "0% 100%" },
  { pos: "bottom-0 right-0", origin: "100% 100%" },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "0px 0px -10% 0px" },
  transition: { duration: 0.7, ease: EASE, delay },
});

export const NoWebsite: React.FC = () => {
  return (
    <section
      id="no-website"
      className="
        relative w-full overflow-hidden bg-black px-4 pt-12 text-white md:pt-14

        before:pointer-events-none before:absolute before:inset-0 before:z-20 before:mix-blend-screen
        before:bg-[radial-gradient(ellipse_42%_36%_at_100%_0%,rgba(249,115,22,0.20)_0%,rgba(234,88,12,0.11)_40%,transparent_75%)]

        after:pointer-events-none after:absolute after:inset-0 after:z-20 after:mix-blend-screen
        after:bg-[radial-gradient(ellipse_42%_36%_at_0%_100%,rgba(251,146,60,0.26)_0%,rgba(249,115,22,0.14)_38%,rgba(194,65,12,0.05)_58%,transparent_78%)]
      "
    >
      <div className="relative z-10 mx-auto max-w-[1232px] text-center">
        <motion.h2
          {...fadeUp()}
          style={{ fontFamily: CANVA_SANS }}
          className="text-[clamp(1.75rem,3.6vw,2.75rem)] font-bold leading-tight"
        >
          Build Your Online Presence with us
        </motion.h2>

        <motion.p
          {...fadeUp(0.1)}
          className={`${poppins.className} mx-auto mt-4 max-w-[830px] text-[clamp(0.95rem,1.65vw,1.25rem)] font-light leading-tight`}
        >
          You provide the idea; we provide the expertise to help you build a
          professional website, online store, or digital platform, even from
          scratch.
        </motion.p>

        {/* CTA button */}
        <motion.div
          {...fadeUp(0.2)}
          className="mt-5 flex justify-center md:mt-8"
        >
          <Link
            href={CTA_HREF}
            className={`${poppins.className} group inline-flex h-12 w-[220px] cursor-pointer items-center justify-between rounded-full bg-white py-1.5 pr-1.5 text-[15px] font-semibold text-[#111111] transition-colors duration-200 hover:bg-[#F0F0F0]`}
          >
            <span className="flex h-9 w-9 items-center opacity-0 justify-center rounded-full bg-[#111111] text-white transition-transform duration-200 group-hover:translate-x-0.5">
              <ArrowRight className="h-[18px] w-[18px]" strokeWidth={2.5} />
            </span>
            <span>{CTA_LABEL}</span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#111111] text-white transition-transform duration-200 group-hover:translate-x-0.5">
              <ArrowRight className="h-[18px] w-[18px]" strokeWidth={2.5} />
            </span>
          </Link>
        </motion.div>

        {/* Video — centered, smaller */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.15 }}
          className="relative mx-auto mt-6 w-full max-w-[90vw] overflow-hidden md:mt-2 md:max-w-[60vw]"
        >
          <video
            src="/no_website.mp4"
            aria-label="Person at a laptop building their online presence"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            draggable={false}
            className="relative -left-5 block"
            style={{
              // crop: 5px off the right edge, 10px off the bottom
              width: "calc(100% + 10px)",
              maxWidth: "none",
              marginBottom: "-10px",
              height: "auto",
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent 0%, #000 8%)",
              maskImage: "linear-gradient(to bottom, transparent 0%, #000 8%)",
            }}
          />

          {/* Corner fades */}
          {CORNER_FADES.map((c) => (
            <div
              key={c.pos}
              aria-hidden
              className={`pointer-events-none absolute h-[55%] w-[35%] ${c.pos}`}
              style={{
                background: `radial-gradient(circle at ${c.origin}, #000 0%, rgba(0,0,0,0.75) 30%, rgba(0,0,0,0.3) 55%, transparent 75%)`,
              }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default NoWebsite;
