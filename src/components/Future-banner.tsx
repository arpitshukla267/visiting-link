"use client";

import React from "react";
import { motion } from "motion/react";
import { ScrollAssembleTypography } from "./ui/ScrollAssembleTypography";

export const VisualBreak: React.FC = () => {
  return (
    <section
      id="visual-break-section"
      className="w-full bg-[#111111] text-white overflow-hidden border-b border-[#222222]"
    >
      {/* Full-width Banner — no max-w/px wrapper, so the image runs edge-to-edge */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="relative w-full overflow-hidden"
      >
        {/* Banner Image — shorter than before (2.6:1 instead of 2.15:1) */}
        <div
          className="relative aspect-16/12 md:aspect-[2.6/1] w-full bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/future-banner.webp')",
          }}
        >
          {/* Subtle dark overlay on left for typography */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />

          {/* Text block */}
          <div className="absolute left-4 md:left-[6%] top-1/2 -translate-y-1/2 w-[46%] md:w-[42%] lg:w-[40%]">

            {/*
              Both lines now go through ScrollAssembleTypography — that's
              what fixes the "don't match" complaint: same font rendering,
              same tracking/leading, same assemble motion for both, so
              they read as one cohesive heading instead of two different
              techniques stitched together.

              Note on the gradient: a true multi-stop CSS gradient
              (bg-clip-text) needs the actual text color to be transparent
              so the background can show through — but this component sets
              each character's `color` itself via startColor/endColor, and
              forcing that transparent from outside is fragile without
              seeing its internals (it could silently break in a way
              that's hard to debug). Instead, line 2 uses the same
              scroll-color-reveal mechanic as line 1, just animating into
              a solid neon cyan instead of white — same technique, same
              motion, distinct color. That's what actually gives a
              guaranteed, cohesive result rather than a gradient that
              might not render at all.
            */}
            <ScrollAssembleTypography
              phrase="Ideas are just the beginning."
              className="
                text-lg
                sm:text-4xl
                md:text-5xl
                lg:text-[58px]
                font-semibold
                tracking-tight
                leading-[1.1]
              "
              startColor="rgba(255,255,255,0.18)"
              endColor="rgba(255,255,255,1)"
              startAt="start 110%"
              endAt="end 75%"
              tracking="0.0em"
            />

            <ScrollAssembleTypography
              phrase="We build what comes next."
              className="
                mt-1
                text-lg
                sm:text-4xl
                md:text-5xl
                lg:text-[58px]
                font-semibold
                tracking-tight
                leading-[1.1]
              "
              startColor="rgba(34,211,238,0.2)"
              endColor="#22d3ee"
              startAt="start 110%"
              endAt="end 75%"
              tracking="0.0em"
            />

            <p className="mt-6 max-w-md text-xs md:text-base text-white/55 leading-relaxed">
              From concept to launch, we turn ambitious ideas into products
              people actually use — thoughtfully designed, carefully built.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};