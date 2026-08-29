"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { SquareCrossMark } from "./ui/TechnicalDoodles";

interface WordRevealProps {
  word: string;
  idx: number;
  total: number;
  progress: any;
  rangeStart?: number;
  rangeEnd?: number;
  className?: string;
}

const ScrollWordReveal: React.FC<WordRevealProps> = ({
  word,
  idx,
  total,
  progress,
  rangeStart = 0,
  rangeEnd = 0.75,
  className = "",
}) => {
  // Compute start and end fractions for word-by-word illumination within the given range
  const span = rangeEnd - rangeStart;
  const start = rangeStart + (idx / total) * span;
  const end = start + (1 / total) * span * 1.2;

  const opacity = useTransform(progress, [start, end], [0.18, 1]);
  const y = useTransform(progress, [start, end], [6, 0]);

  return (
    <motion.span
      style={{
        opacity,
        y,
        display: "inline-block",
      }}
      className={`mr-[0.28em] last:mr-0 transition-colors duration-150 font-normal ${className}`}
    >
      {word}
    </motion.span>
  );
};

// Helper to split a sentence into reveal-ready words
const RevealParagraph: React.FC<{
  text: string;
  progress: any;
  rangeStart: number;
  rangeEnd: number;
  className?: string;
}> = ({ text, progress, rangeStart, rangeEnd, className }) => {
  const words = text.split(" ");
  return (
    <p className={className}>
      {words.map((word, idx) => (
        <ScrollWordReveal
          key={idx}
          word={word}
          idx={idx}
          total={words.length}
          progress={progress}
          rangeStart={rangeStart}
          rangeEnd={rangeEnd}
        />
      ))}
    </p>
  );
};

export const CompanyStatement: React.FC = React.memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Locomotive Scroll Progress for Word Reveal
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 50%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const statementWords = [
    "We",
    "combine",
    "strategy,",
    "design",
    "and",
    "technology",
    "to",
    "create",
    "digital",
    "work",
    "that",
    "feels",
    "clear,",
    "purposeful",
    "and",
    "built",
    "to",
    "last.",
  ];

  const paragraph1 =
    "In a digital landscape filled with transient trends and visual clutter, we prioritize lasting utility. We believe the most effective digital systems are intuitive, engineered with precision, and stripped of unnecessary noise.";

  const paragraph2 =
    "Every line of code, spatial layout, and brand asset is deliberately structured to give our partners a distinct, authoritative market presence. We don't chase what's trending — we build what compounds: systems that stay legible, scalable, and true to their purpose long after launch.";

  const paragraph3 =
    "This is craft treated as discipline, not decoration — every decision made with the next five years in mind, not just the next release.";

  return (
    <section
      ref={containerRef}
      id="company-statement-section"
      className="w-full bg-white py-24 md:py-32 border-b border-[#F0F0F0] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="space-y-10">
          

          {/* Main Editorial Statement with Word-by-Word Scroll Illumination (Apple/Stripe Style) */}
          <h2
            id="company-core-statement"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-normal leading-[1.25] tracking-tight max-w-4xl"
          >
            {statementWords.map((word, idx) => (
              <ScrollWordReveal
                key={idx}
                word={word}
                idx={idx}
                total={statementWords.length}
                progress={smoothProgress}
                rangeStart={0.15}
                rangeEnd={0.4}
                className="text-[#111111]"
              />
            ))}
          </h2>

          {/* Secondary Editorial Commentary — sequential word-by-word reveal */}
          <div className="pt-10 border-t border-[#F0F0F0] space-y-5 max-w-3xl">
            <RevealParagraph
              text={paragraph1}
              progress={smoothProgress}
              rangeStart={0.35}
              rangeEnd={0.5}
              className="text-base sm:text-lg text-[#333333] font-medium leading-relaxed"
            />
            <RevealParagraph
              text={paragraph2}
              progress={smoothProgress}
              rangeStart={0.45}
              rangeEnd={0.6}
              className="text-sm sm:text-base text-[#666666] font-normal leading-relaxed"
            />
            <RevealParagraph
              text={paragraph3}
              progress={smoothProgress}
              rangeStart={0.55}
              rangeEnd={0.7}
              className="text-sm sm:text-base text-[#888888] font-normal leading-relaxed"
            />
          </div>
        </div>
      </div>
    </section>
  );
});
