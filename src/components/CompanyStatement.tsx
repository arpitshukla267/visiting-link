"use client";

import React from "react";
import { motion } from "motion/react";
import { ShieldCheck, Route, Headphones } from "lucide-react";

const CORAL = "#FF6B58";

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
      className="w-full overflow-hidden border-b border-[#F0F0F0] bg-white py-16 md:py-24"
    >
      <div className="mx-auto max-w-[95vw] px-4 md:max-w-[90vw] md:px-12">
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
            className="text-2xl font-medium leading-tight tracking-tight text-[#111111] md:text-4xl"
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
            className="mt-4 text-sm leading-relaxed text-[#666666] md:text-[15px]"
          >
            Every engagement comes with commitments we stand behind. No vague
            handoffs, no disappearing acts — just honest work from start to
            finish.
          </motion.p>
        </div>
        
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-5">
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
                className="overflow-hidden rounded-2xl border border-[#F0F0F0] bg-white"
              >
                {/* Graphic */}
                <div className="relative aspect-[5/3] w-full overflow-hidden bg-[#FAFAFA]">
                  <img
                    src={promise.image}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-[1.02]"
                  />
                </div>

                {/* Content — rises bottom to top after the card lands */}
                <motion.div
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  variants={contentVariants}
                  className="p-6 md:p-7"
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

                  <h3 className="text-base font-bold text-[#111111] md:text-lg">
                    {promise.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-[#666666]">
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
