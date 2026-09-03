"use client";

import React, { useRef } from "react";
import { motion, useInView } from "motion/react";

const revealEase = [0.16, 1, 0.3, 1] as const;

const lineVariants = {
  hidden: { y: 28, opacity: 0 },
  visible: (delay: number) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, delay, ease: revealEase },
  }),
};

export const VisualBreak: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.35 });

  return (
    <section
      ref={sectionRef}
      id="visual-break-section"
      className="w-full overflow-hidden border-b border-[#222222] bg-[#111111] text-white"
    >
      <div className="relative w-full overflow-hidden">
        <div
          className="relative aspect-[16/12] w-full bg-cover bg-center md:aspect-[2.6/1]"
          style={{
            backgroundImage: "url('/images/future-banner.webp')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/15 to-transparent" />

          <div className="absolute top-1/2 left-2 z-10 w-[88%] -translate-y-1/2 sm:w-[70%] md:left-[6%] md:w-[50%] lg:w-[42%]">
            <div className="overflow-hidden">
              <motion.h2
                custom={0.05}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={lineVariants}
                className="text-2xl font-semibold leading-[1.1] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[58px] pb-1"
              >
                Ideas are just the beginning.
              </motion.h2>
            </div>

            <div className="mt-1 overflow-hidden">
              <motion.h2
                custom={0.2}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={lineVariants}
                className="text-2xl font-semibold leading-[1.1] tracking-tight text-[#22d3ee] sm:text-4xl md:text-5xl lg:text-[58px]"
              >
                We build what comes next.
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.7, delay: 0.38, ease: revealEase }}
              className="mt-5 max-w-md text-sm leading-relaxed text-white/70 md:mt-6 md:text-base"
            >
              From concept to launch, we turn ambitious ideas into products
              people actually use — thoughtfully designed, carefully built.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
};
