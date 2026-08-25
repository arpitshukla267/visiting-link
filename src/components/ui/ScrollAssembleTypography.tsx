import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";

interface LetterAssembleProps {
  char: string;
  charIndex: number;
  totalChars: number;
  progress: any;
  startColor: string;
  endColor: string;
  tracking: string;
}

const KineticAssembleChar: React.FC<LetterAssembleProps> = ({
  char,
  charIndex,
  totalChars,
  progress,
  startColor,
  endColor,
  tracking,
}) => {
  const seed1 = Math.sin(charIndex * 997 + 13);
  const seed2 = Math.cos(charIndex * 613 + 7);
  const seed3 = Math.sin(charIndex * 331 + 41);

  const initialY = 24 + Math.abs(seed1) * 32;
  const initialX = seed2 * 35;
  const initialRotate = seed3 * 16;
  const initialScale = 0.65 + Math.abs(seed1) * 0.25;

  // stagger window based on this char's position in the FULL phrase
  const startWindow = (charIndex / totalChars) * 0.55;
  const endWindow = startWindow + 0.35;

  const y = useTransform(progress, [startWindow, endWindow], [initialY, 0]);
  const x = useTransform(progress, [startWindow, endWindow], [initialX, 0]);
  const rotate = useTransform(
    progress,
    [startWindow, endWindow],
    [initialRotate, 0],
  );
  const scale = useTransform(
    progress,
    [startWindow, endWindow],
    [initialScale, 1],
  );
  const opacity = useTransform(
    progress,
    [Math.max(startWindow - 0.05, 0), startWindow + 0.15, endWindow],
    [0.1, 0.7, 1],
  );
  const color = useTransform(
    progress,
    [startWindow, endWindow],
    [startColor, endColor],
  );

  return (
    <motion.span
      style={{
        display: "inline-block",
        y,
        x,
        rotate,
        scale,
        opacity,
        color,
        marginRight: tracking,
        transformOrigin: "50% 100%",
        willChange: "transform, opacity",
      }}
      className="select-none last:mr-0"
    >
      {char}
    </motion.span>
  );
};

export interface ScrollAssembleTypographyProps {
  phrase: string;
  className?: string;
  startColor?: string;
  endColor?: string;
  startAt?: string;
  endAt?: string;
  tracking?: string;
}

export const ScrollAssembleTypography: React.FC<
  ScrollAssembleTypographyProps
> = ({
  phrase,
  className = "",
  startColor = "rgba(150, 150, 150, 0.4)",
  endColor = "rgba(17, 17, 17, 1)",
  startAt = "start 95%",
  endAt = "end 55%",
  tracking = "0.2em",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: [startAt, endAt] as any,
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    restDelta: 0.001,
  });

  // split into words first, then chars — words never break mid-way
  const words = phrase.split(" ");
  const totalChars = phrase.length; // includes spaces, keeps stagger continuous across words

  let runningIndex = 0;

  return (
    <div
      ref={containerRef}
      className={`relative z-10 flex flex-wrap ${className}`}
    >
      {words.map((word, wIdx) => {
        const wordSpans = word.split("").map((char) => {
          const el = (
            <KineticAssembleChar
              key={runningIndex}
              char={char}
              charIndex={runningIndex}
              totalChars={totalChars}
              progress={smoothProgress}
              startColor={startColor}
              endColor={endColor}
              tracking={tracking}
            />
          );
          runningIndex += 1;
          return el;
        });
        runningIndex += 1; // account for the space after this word
        return (
          <span
            key={wIdx}
            className="inline-flex whitespace-nowrap mr-[0.28em]"
          >
            {wordSpans}
          </span>
        );
      })}
    </div>
  );
};
