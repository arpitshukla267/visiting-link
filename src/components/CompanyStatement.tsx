"use client";

import React from "react";
import { motion } from "motion/react";
import { ShieldCheck, Route, Headphones } from "lucide-react";

const CORAL = "#FF6B58";

const PROMISES = [
  {
    icon: ShieldCheck,
    title: "No online scams",
    description:
      "Clear scope, transparent pricing, and verified milestones at every stage — so you always know what you're paying for and what you're getting.",
  },
  {
    icon: Route,
    title: "End-to-end delivery",
    description:
      "From discovery to deployment, we own the full path. What we promise in the brief is what ships — on time, tested, and ready to use.",
  },
  {
    icon: Headphones,
    title: "After-sell support",
    description:
      "Launch day isn't goodbye. We stay available for fixes, updates, and guidance so your product keeps working long after it goes live.",
  },
] as const;

export const CompanyStatement: React.FC = React.memo(() => {
  return (
    <section
      id="company-statement-section"
      className="w-full overflow-hidden border-b border-[#F0F0F0] bg-white py-16 md:py-24"
    >
      <div className="mx-auto max-w-[95vw] px-4 md:max-w-[90vw] md:px-12">
        <div className="max-w-2xl">
          <p
            className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em]"
            style={{ color: CORAL }}
          >
            Our promises
          </p>
          <h2
            id="company-core-statement"
            className="text-2xl font-bold leading-tight tracking-tight text-[#111111] md:text-4xl"
          >
            We build trust the same way we build products — with clarity and care.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[#666666] md:text-[15px]">
            Every engagement comes with commitments we stand behind. No vague
            handoffs, no disappearing acts — just honest work from start to
            finish.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-5">
          {PROMISES.map((promise, index) => {
            const Icon = promise.icon;
            return (
              <motion.article
                key={promise.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="rounded-2xl border border-[#F0F0F0] bg-[#FAFAFA] p-6 md:p-7"
              >
                <div
                  className="mb-4 flex h-10 w-10 items-center justify-center rounded-full"
                  style={{ backgroundColor: `${CORAL}18` }}
                >
                  <Icon className="h-5 w-5" style={{ color: CORAL }} />
                </div>
                <h3 className="text-base font-bold text-[#111111] md:text-lg">
                  {promise.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#666666]">
                  {promise.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
});
