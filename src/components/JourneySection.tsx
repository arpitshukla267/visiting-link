"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { ArrowLeft, type LucideIcon } from "lucide-react";

export type Milestone = {
  year: string;
  icon: LucideIcon;
  title: string;
  description: string;
};

export type JourneySectionProps = {
  eyebrow?: string;
  headline: string;
  intro: string;
  closingLine?: string;
  milestones: Milestone[];
  onBack?: () => void;
};

function MilestoneRow({
  milestone,
  index,
  isActive,
  isPast,
  onActivate,
}: {
  milestone: Milestone;
  index: number;
  isActive: boolean;
  isPast: boolean;
  onActivate: (index: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-40% 0px -40% 0px", amount: 0 });
  const Icon = milestone.icon;

  useEffect(() => {
    if (isInView) onActivate(index);
  }, [isInView, index, onActivate]);

  return (
    <motion.div
      ref={ref}
      animate={{
        backgroundColor: isActive ? "#111111" : "rgba(17,17,17,0)",
      }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="border-t border-[#E8E8E5] first:border-t-0"
    >
      <div className="grid grid-cols-[4.5rem_1fr] gap-5 px-6 py-8 md:grid-cols-[6rem_1fr] md:gap-8 md:px-12 md:py-10">
        <div className="pt-1">
          <motion.p
            animate={{
              color: isActive ? "#FFFFFF" : isPast ? "#6B6B68" : "#C4C4C4",
            }}
            transition={{ duration: 0.35 }}
            className="text-sm font-medium tabular-nums md:text-base"
          >
            {milestone.year}
          </motion.p>
        </div>

        <div className="flex gap-4 md:gap-5">
          <motion.span
            animate={{
              borderColor: isActive ? "#FFFFFF" : "#E5E7EB",
              backgroundColor: isActive ? "#FFFFFF" : "#FFFFFF",
              color: isActive ? "#111111" : "#111111",
              opacity: isActive ? 1 : isPast ? 0.7 : 0.45,
            }}
            transition={{ duration: 0.35 }}
            className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center border"
          >
            <Icon className="h-[18px] w-[18px]" strokeWidth={1.6} />
          </motion.span>

          <div className="min-w-0 flex-1">
            <motion.h3
              animate={{
                color: isActive ? "#FFFFFF" : "#111111",
                opacity: isActive ? 1 : isPast ? 0.65 : 0.4,
              }}
              transition={{ duration: 0.35 }}
              className="text-lg font-medium md:text-xl"
            >
              {milestone.title}
            </motion.h3>
            <motion.p
              animate={{
                color: isActive ? "#D4D4D4" : "#5D5D5A",
                opacity: isActive ? 1 : isPast ? 0.65 : 0.4,
              }}
              transition={{ duration: 0.35 }}
              className="mt-2 text-sm leading-relaxed md:text-base"
            >
              {milestone.description}
            </motion.p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function JourneySection({
  eyebrow = "Our journey",
  headline,
  intro,
  closingLine,
  milestones,
  onBack,
}: JourneySectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const progress =
    milestones.length <= 1 ? 100 : (activeIndex / (milestones.length - 1)) * 100;

  return (
    <section className="border-b border-[#F0F0F0] bg-white" aria-label="Our journey">
      <div className="mx-auto w-full max-w-[90vw] py-20 md:py-28">
        <div className="grid grid-cols-1 gap-12 px-6 md:px-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
            <div className="flex items-start gap-4">
              {onBack && (
                <button
                  type="button"
                  onClick={onBack}
                  aria-label="Go back"
                  className="mt-0.5 flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center border border-[#E5E7EB] bg-white text-[#111111] transition-colors hover:border-[#111111]"
                >
                  <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
                </button>
              )}

              <div>
                <p className="text-sm font-medium text-[#888888]">{eyebrow}</p>
                <h2 className="mt-3 text-2xl font-semibold leading-snug text-[#111111] md:text-3xl">
                  {headline}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-[#555555] md:text-lg">
                  {intro}
                </p>
              </div>
            </div>

            <div className="mt-10 hidden lg:block">
              <div className="h-px w-full bg-[#E8E8E5]">
                <motion.div
                  className="h-full origin-left bg-[#111111]"
                  animate={{ scaleX: progress / 100 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
              <p className="mt-3 text-sm text-[#888888]">
                {milestones[activeIndex]?.year} · {milestones[activeIndex]?.title}
              </p>
            </div>
          </div>

          <div className="w-full lg:col-span-8">
            <div className="-mx-6 border-b border-[#E8E8E5] md:-mx-12">
              {milestones.map((milestone, index) => (
                <MilestoneRow
                  key={`${milestone.year}-${milestone.title}`}
                  milestone={milestone}
                  index={index}
                  isActive={activeIndex === index}
                  isPast={index < activeIndex}
                  onActivate={setActiveIndex}
                />
              ))}
            </div>

            {closingLine && (
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="mt-10 border-l-2 border-[#111111] pl-5 text-base font-medium leading-relaxed text-[#111111] md:text-lg"
              >
                {closingLine}
              </motion.p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
