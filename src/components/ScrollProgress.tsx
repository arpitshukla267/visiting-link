"use client";

import { motion, useScroll, useTransform } from "motion/react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div
      id="locomotive-scroll-line"
      style={{ scaleX }}
      className="pointer-events-none fixed top-0 left-0 right-0 z-[100] h-[2px] origin-left bg-[#111111] will-change-transform"
    />
  );
}
