"use client";

import React from "react";
import { motion } from "motion/react";
import Image from "next/image";

const WordReveal: React.FC<{
  text: string;
  className?: string;
  delay?: number;
}> = ({ text, className = "", delay = 0 }) => {
  const words = text.split(" ");

  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.035,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mr-[0.28em] inline-block"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
};

export const VisionMissionSection: React.FC = () => {
  return (
    <section className="bg-white pt-16 pb-8 md:py-20">
      <div className="mx-auto w-full max-w-[90vw]">

        {/* =====================================================
            VISION — CONTENT LEFT / IMAGE RIGHT
        ===================================================== */}
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14 lg:gap-20">

          {/* LEFT — CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="max-w-[600px]"
          >
            <p className="text-sm font-medium text-[#8A8A8A]">
              Our Vision
            </p>

            <h2 className="mt-4 text-2xl font-medium leading-[1.15] tracking-[-0.025em] text-[#0B0B0B] md:text-3xl lg:text-4xl">
              <WordReveal text="Technology should connect people — not just impress them." />
            </h2>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: 0.2,
              }}
              className="mt-6 space-y-4"
            >
              <p className="text-base leading-6 text-[#4A4A4A] md:text-[17px] md:leading-7">
                <WordReveal
                  text="We care about systems that solve real problems, open real opportunities, and stay useful long after launch day. Most software gets built for a demo — a pitch, a screenshot, a launch tweet. We build for the Tuesday afternoon eight months later, when someone actually needs it to work."
                  delay={0.05}
                />
              </p>

              <p className="text-base leading-6 text-[#4A4A4A] md:text-[17px] md:leading-7">
                <WordReveal
                  text="That's shaped every decision we've made — from the first logo we designed in 2018 to the platform we run today. Every client who's stayed with us for years didn't stay because we impressed them once. They stayed because the thing kept working."
                  delay={0.1}
                />
              </p>
            </motion.div>

            {/* Timeline mini stats */}
            {/* <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: 0.35,
              }}
              className="mt-6 flex items-center gap-8 border-t border-black/10 pt-4"
            >
              <div>
                <p className="text-xl font-medium tracking-tight md:text-2xl">
                  2018
                </p>

                <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-black/40">
                  Started
                </p>
              </div>

              <div className="h-7 w-px bg-black/10" />

              <div>
                <p className="text-xl font-medium tracking-tight md:text-2xl">
                  Today
                </p>

                <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-black/40">
                  Still building
                </p>
              </div>
            </motion.div> */}
          </motion.div>

          {/* RIGHT — IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative h-[48vh] min-h-[360px] max-h-[520px] overflow-hidden rounded-[4px] bg-[#eeeeec]"
          >
            <Image
              src="/images/vision.webp"
              alt="VisitingLink team"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>
        </div>


        {/* =====================================================
            MISSION — IMAGE LEFT / CONTENT RIGHT
        ===================================================== */}
        <div className="mt-20 grid items-center gap-10 md:mt-28 md:grid-cols-2 md:gap-14 lg:gap-20">

          {/* LEFT — IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative h-[48vh] min-h-[360px] max-h-[520px] overflow-hidden rounded-[4px] bg-[#eeeeec]"
          >
            <Image
              src="/images/mission.webp"
              alt="VisitingLink digital product"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>

          {/* RIGHT — CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="max-w-[600px]"
          >
            <p className="text-sm font-medium text-[#8A8A8A]">
              Our Mission
            </p>

            <h2 className="mt-4 text-2xl font-medium leading-[1.15] tracking-[-0.025em] text-[#0B0B0B] md:text-3xl lg:text-4xl">
              <WordReveal text="Give ambitious ideas the structure to survive." />
            </h2>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: 0.2,
              }}
              className="mt-6 space-y-4"
            >
              <p className="text-base leading-6 text-[#4A4A4A] md:text-[17px] md:leading-7">
                <WordReveal
                  text="Good ideas fail when the tools, team, or technology isn't there. We've seen founders with a genuinely good product lose momentum because their site couldn't keep up, or because updating it meant waiting on a developer who'd moved on to another client."
                  delay={0.05}
                />
              </p>

              <p className="text-base leading-6 text-[#4A4A4A] md:text-[17px] md:leading-7">
                <WordReveal
                  text="So we build the ecosystem — design, engineering, and platform — so those ideas can actually ship, and keep shipping. Not a one-time delivery, but something a founder can keep shaping themselves, long after we've handed it over."
                  delay={0.1}
                />
              </p>
            </motion.div>

            {/* Closing statement */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: 0.35,
              }}
              className="mt-6 border-l border-black/20 pl-5"
            >
              <p className="text-base font-medium leading-6 text-[#111111] md:text-[17px] md:leading-7">
                <WordReveal text="We're not chasing trends. We're building things that still make sense five years from now." delay={0.05} />
              </p>
            </motion.div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};