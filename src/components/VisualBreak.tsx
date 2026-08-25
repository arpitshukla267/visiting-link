import React from "react";
import { motion } from "motion/react";
import { CompassRadarMark } from "./ui/TechnicalDoodles";
import { ScrollAssembleTypography } from "./ui/ScrollAssembleTypography";

export const VisualBreak: React.FC = () => {
  return (
    <section
      id="visual-break-section"
      className="w-full bg-[#111111] text-white py-24 md:py-32 overflow-hidden border-b border-[#222222] relative"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-12"
        >
          {/* Header Row with Statement and Concentric Compass/Radar Technical Mark */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
            <ScrollAssembleTypography
              phrase="From the first idea to the final pixel, we care about how everything comes together."
              className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight leading-[1.2] text-white max-w-2xl"
              startColor="rgba(255, 255, 255, 0.25)"
              endColor="rgba(255, 255, 255, 1)"
              startAt="start 95%"
              endAt="end 50%"
              tracking="0.12em"
            />

            {/* Concentric Circle / Compass Technical Mark */}
            {/* <div className="self-end md:self-auto">
              <CompassRadarMark />
            </div> */}
          </div>

          {/* Minimalist Editorial Trio Pillars */}
          <div className="pt-10 border-t border-[#2a2a2a] grid grid-cols-1 sm:grid-cols-3 gap-8 text-left">
            <div>
              <p className="text-xs sm:text-sm text-neutral-300 font-normal leading-relaxed">
                Refined visual spacing, typographic harmony, and sub-pixel
                alignment throughout the entire user journey.
              </p>
            </div>

            <div>
              <p className="text-xs sm:text-sm text-neutral-300 font-normal leading-relaxed">
                Lightweight architectures with rapid response times and
                resilient, zero-bloat codebases.
              </p>
            </div>

            <div>
              <p className="text-xs sm:text-sm text-neutral-300 font-normal leading-relaxed">
                Every component and visual element is anchored directly to
                tangible, measurable business goals.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
