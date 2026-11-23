"use client";

import React, { useEffect, useRef, useState } from "react";
import { Poppins } from "next/font/google";
import { animate, motion, useInView, useReducedMotion } from "motion/react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* Edit the numbers / labels here */
const STATS = [
  { value: 900, suffix: "+", label: "Custom Projects Delivered" },
  { value: 200, suffix: "+", label: "Brands Served" },
  { value: 2, suffix: "M+", label: "People Reached" },
];

/* Counts from 0 to `to` the first time it scrolls into view */
const CountUp: React.FC<{ to: number; suffix?: string; duration?: number }> = ({
  to,
  suffix = "",
  duration = 2,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduceMotion = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      setValue(to);
      return;
    }
    const controls = animate(0, to, {
      duration,
      ease: EASE,
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, duration, reduceMotion]);

  return (
    <span ref={ref}>
      <span aria-hidden="true">
        {value}
        {suffix}
      </span>
      <span className="sr-only">
        {to}
        {suffix}
      </span>
    </span>
  );
};

export const Stats: React.FC = () => {
  return (
    <section
      id="stats"
      className={`${poppins.className} bg-black px-4 py-14 text-white md:py-20`}
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 0.7, ease: EASE }}
        className="mb-7 text-center text-[clamp(1.5rem,2.1vw,1.75rem)] font-normal"
      >
        Trusted by Businesses Across Industries.
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
        className="mx-auto flex max-w-[845px] justify-between gap-4  px-5 py-6 md:pl-[18px] md:pr-[30px]"
      >
        {STATS.map((stat) => (
          <div key={stat.label} className="min-w-0">
            <div className="text-[clamp(1.5rem,2.6vw,2rem)] font-semibold leading-none">
              <CountUp to={stat.value} suffix={stat.suffix} />
            </div>
            <p className="mt-5 text-[clamp(0.7rem,1.1vw,0.95rem)] font-normal text-[#b9b9b9]">
              {stat.label}
            </p>
          </div>
        ))}
      </motion.div>

      {/* Golden accent line */}
      <div
        aria-hidden="true"
        className="mx-auto mt-12 h-[2px] w-[min(250px,60vw)] md:mt-[44px]"
        style={{
          background:
            "linear-gradient(90deg, rgba(200,134,26,0) 0%, rgba(214,148,30,0.95) 50%, rgba(200,134,26,0) 100%)",
          boxShadow: "0 0 14px rgba(214,148,30,0.35)",
        }}
      />
    </section>
  );
};

export default Stats;
