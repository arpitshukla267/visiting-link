"use client";

import React from "react";
import { motion } from "motion/react";
import { ShieldCheck, Route, Headphones } from "lucide-react";
import { image } from "motion/react-m";

const CORAL = "#FF6B58";
const BG = "#0A0A0A";
const SURFACE = "#141414";
const IMAGE_BG = "#1A1A1A";
const BORDER = "#262626";
const INK = "#F5F5F5";
const MUTED = "#9A9A9A";

const PROMISES = [
  {
    image: "/images/no-scam.png",
    icon: ShieldCheck,
    title: "No online scams",
    description:
      "Clear scope, transparent pricing, and verified milestones at every stage — so you always know what you're paying for and what you're getting.",
  },
  {
    image: "/images/end-to-end.png",
    icon: Route,
    title: "End-to-end delivery",
    description:
      "From discovery to deployment, we own the full path. What we promise in the brief is what ships — on time, tested, and ready to use.",
  },
  {
    image: "/images/after-sell.png",
    icon: Headphones,
    title: "After-sell support",
    description:
      "Launch day isn't goodbye. We stay available for fixes, updates, and guidance so your product keeps working long after it goes live.",
  },
] as const;

const HEADING =
  "We build trust the same way we build products — with clarity and care.";

// Card slides in from the left, staggered left → right by index
const cardVariants = {
  hidden: { opacity: 0, x: -70 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.65,
      delay: i * 0.18,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

// Inner content rises bottom → top, kicking in just after its card settles
const contentVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay: i * 0.18 + 0.28,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

export const CompanyStatement: React.FC = React.memo(() => {
  const words = HEADING.split(" ");

  return (
    <section
      id="company-statement-section"
      className="w-full overflow-hidden border-b py-12 md:py-24"
      style={{ backgroundColor: BG, borderColor: BORDER }}
    >
      {/* ============ MOBILE ============ */}
      <div className="px-4 md:hidden">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em]"
          style={{ color: CORAL }}
        >
          Our promises
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-2xl font-medium leading-tight tracking-tight"
          style={{ color: INK }}
        >
          {HEADING}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-3 text-sm leading-relaxed"
          style={{ color: MUTED }}
        >
          Every engagement comes with commitments we stand behind. No vague
          handoffs, no disappearing acts — just honest work from start to
          finish.
        </motion.p>

        {/* Horizontal swipe strip — keeps each promise to one screen-width card
            instead of three full-height blocks stacked vertically */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="-mx-4 mt-7 flex snap-x snap-mandatory gap-3.5 overflow-x-auto px-4 pb-2 [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: "none" }}
        >
          {PROMISES.map((promise, index) => (
            <article
              key={promise.title}
              className="w-[70%] shrink-0 snap-start overflow-hidden rounded-2xl border"
              style={{ borderColor: BORDER, backgroundColor: SURFACE }}
            >
              <div className="aspect-square w-full overflow-hidden">
                <img
                  src={promise.image}
                  alt=""
                  className="block h-full w-full object-cover"
                />
              </div>

              <div className="p-5">
                <span
                  className="font-mono text-sm font-semibold tracking-[0.15em]"
                  style={{ color: CORAL }}
                >
                  0{index + 1}
                </span>

                <h3 className="mt-2 text-base font-bold" style={{ color: INK }}>
                  {promise.title}
                </h3>

                <p className="mt-1.5 text-[13px] leading-relaxed" style={{ color: MUTED }}>
                  {promise.description}
                </p>
              </div>
            </article>
          ))}

          {/* Trailing spacer so the last card can reach a comfortable snap
              position without hugging the screen edge */}
          <div className="w-px shrink-0" aria-hidden />
        </motion.div>

        {/* Progress dots — decorative hint that there's more to swipe */}
        <div className="mt-4 flex items-center justify-center gap-1.5">
          {PROMISES.map((promise, index) => (
            <span
              key={promise.title}
              className="h-1.5 rounded-full"
              style={{ width: index === 0 ? 16 : 6, backgroundColor: BORDER }}
              aria-hidden
            />
          ))}
        </div>
      </div>

      {/* ============ DESKTOP ============ */}
      <div className="mx-auto hidden max-w-[90vw] px-12 md:block">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em]"
            style={{ color: CORAL }}
          >
            Our promises
          </motion.p>

          <h2
            id="company-core-statement"
            className="text-2xl font-medium leading-tight tracking-tight md:text-4xl"
            style={{ color: INK }}
          >
            {words.map((word, i) => (
              <motion.span
                key={`${word}-${i}`}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{
                  duration: 0.5,
                  delay: 0.045 * i,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block"
              >
                {word}
                {i !== words.length - 1 ? "\u00A0" : ""}
              </motion.span>
            ))}
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 text-sm leading-relaxed md:text-[15px]"
            style={{ color: MUTED }}
          >
            Every engagement comes with commitments we stand behind. No vague
            handoffs, no disappearing acts — just honest work from start to
            finish.
          </motion.p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-5 max-w-5xl">
          {PROMISES.map((promise, index) => {
            const Icon = promise.icon;

            return (
              <motion.article
                key={promise.title}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={cardVariants}
                className="overflow-hidden rounded-2xl border"
                style={{ borderColor: BORDER, backgroundColor: SURFACE }}
              >
                {/* Graphic */}
                <div
                  className="relative h-[250px] w-[350px] overflow-hidden "
                  style={{ backgroundColor: IMAGE_BG }}
                >
                  <img
                    src={promise.image}
                    alt=""
                    className="h-[350px] w-[350px] object-cover transition-transform duration-700 ease-out hover:scale-[1.02]"
                  />
                </div>

                {/* Content — rises bottom to top after the card lands */}
                <motion.div
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  variants={contentVariants}
                  className="p-3 md:p-5"
                >
                  <div className="mb-4 flex items-center gap-3">
                    {/* <span
                      className="flex h-8 w-8 items-center justify-center rounded-full"
                      style={{ backgroundColor: `${CORAL}18` }}
                    >
                      <Icon className="h-4 w-4" style={{ color: CORAL }} />
                    </span> */}

                    <span
                      className="font-mono text-md font-semibold tracking-[0.15em]"
                      style={{ color: CORAL }}
                    >
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="text-base font-bold md:text-lg" style={{ color: INK }}>
                    {promise.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed" style={{ color: MUTED }}>
                    {promise.description}
                  </p>
                </motion.div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
});