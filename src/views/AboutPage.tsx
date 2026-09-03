"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "motion/react";
import { Users, Code, Palette, Globe, Terminal } from "lucide-react";
import Image from "next/image";
import {
  JourneySection,
  type Milestone,
} from "@/components/about/JourneySection";
import AboutTeamSection from "@/components/about/FounderSection";
import { VisionMissionSection } from "@/components/about/VisionMissionSection";
import { EightYearsSection } from "@/components/about/Eightyearssection";

interface AboutPageProps {
  onNavigateHome: () => void;
  onNavigateContact: (serviceName?: string) => void;
}

/* ────────────────────────────────────────────────────────────────
   ANIMATED COUNTER COMPONENT (Scroll triggered count-up)
──────────────────────────────────────────────────────────────── */
const AnimatedCounter: React.FC<{
  value: number;
  suffix?: string;
  label: string;
  sublabel?: string;
}> = ({ value, suffix = "+", label, sublabel }) => {
  const COUNT_STEP = 40;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const end = value;
    const duration = 1400; // ms
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Cubic ease-out
      const eased = 1 - Math.pow(1 - progress, 3);
      const steppedValue =
        progress >= 1
          ? end
          : Math.min(end, Math.floor((eased * end) / COUNT_STEP) * COUNT_STEP);
      setDisplayValue(steppedValue);

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      } else {
        setDisplayValue(end);
      }
    };

    let frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [isInView, value]);

  return (
    <div ref={ref} className="flex flex-col">
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-medium tracking-tight text-[#111111] sm:text-5xl lg:text-6xl">
          {displayValue}
        </span>
        <span className="text-xl font-medium text-[#888888] sm:text-3xl">
          {suffix}
        </span>
      </div>
      <span className="mt-1 md:mt-2 text-sm font-medium text-[#666666]">
        {label}
      </span>
      {sublabel && (
        <span className="mt-0.5 text-xs md:text-sm text-[#999999]">
          {sublabel}
        </span>
      )}
    </div>
  );
};

/* ────────────────────────────────────────────────────────────────
   STAGGER FADE IN HELPER
──────────────────────────────────────────────────────────────── */
const FadeIn: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "none";
}> = ({ children, className = "", delay = 0, direction = "up" }) => {
  const yOffset = direction === "up" ? 28 : direction === "down" ? -28 : 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const StoryTextReveal: React.FC<{
  text: string;
  delay?: number;
  className?: string;
}> = ({ text, delay = 0, className = "" }) => {
  return (
    <span className={className}>
      {text.split(" ").map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{
            duration: 0.45,
            delay: delay + index * 0.025,
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

/* ────────────────────────────────────────────────────────────────
   JOURNEY — data-driven milestones
──────────────────────────────────────────────────────────────── */
const JOURNEY_MILESTONES: Milestone[] = [
  {
    year: "2018",
    icon: Palette,
    title: "Brand & identity",
    description:
      "We started by shaping how businesses look and feel — logos, visual systems, and the first digital touchpoints clients remember.",
  },
  {
    year: "2020",
    icon: Code,
    title: "Web & technology",
    description:
      "Custom websites and software followed. We moved from surface design into engineering products that actually worked in the real world.",
  },
  {
    year: "2022",
    icon: Users,
    title: "Scale & creative network",
    description:
      "Five hundred clients in, we built a network of designers and creators — different disciplines, one shared standard of craft.",
  },
  {
    year: "2024",
    icon: Globe,
    title: "The VisitingLink platform",
    description:
      "Eight years of lessons became one product: a simpler way for people and businesses to represent themselves online.",
  },
  {
    year: "Now",
    icon: Terminal,
    title: "Building what's next",
    description:
      "Today we're growing the ecosystem — more developers, more creators, and technology built for the long term.",
  },
];

/* ────────────────────────────────────────────────────────────────
   MAIN ABOUT PAGE COMPONENT
──────────────────────────────────────────────────────────────── */
export const AboutPage: React.FC<AboutPageProps> = ({
  onNavigateHome,
  onNavigateContact,
}) => {
  return (
    <div className="overflow-x-hidden bg-white text-[#111111] selection:bg-black selection:text-white max-w-[100vw]">
      {/* ─────────────────────────────────────────────────────────
          SECTION 01 — HERO / OUR EXPERIENCE
      ───────────────────────────────────────────────────────── */}
      {/* ================= DESKTOP HERO ================= */}
      <section className="relative hidden min-h-screen overflow-hidden bg-[#050506] text-white md:block">
        {/* Background artwork */}
        <Image
          src="/images/about.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Content */}
        <div className="relative z-10 mx-auto flex min-h-screen max-w-[95vw] items-center px-6">
          <div className="w-full max-w-[50vw]">
            <FadeIn delay={0.1}>
              <h1 className="text-6xl font-semibold tracking-[0.03em]">
                We build
                <br />
                <span className="text-white/65">digital</span>
                <br />
                experiences.
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="mt-8 max-w-[510px] text-sm font-normal leading-7 text-white/65 md:text-base">
                For over 8 years, we’ve been designing brands, building digital
                experiences and engineering technology that helps ambitious
                ideas move forward.
              </p>
            </FadeIn>

            {/* Stats */}
            <FadeIn delay={0.3} className="mt-10">
              <div className="w-[80%] border-t border-white/20 pt-6">
                <div className="grid w-full grid-cols-2 gap-x-12 gap-y-7 md:grid-cols-4 md:gap-x-10">
                  <div>
                    <div className="text-2xl font-medium tracking-tight md:text-3xl">
                      08<span className="text-white/40">+</span>
                    </div>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-white/45">
                      Years
                    </p>
                  </div>

                  <div>
                    <div className="text-2xl font-medium tracking-tight md:text-3xl">
                      900<span className="text-white/40">+</span>
                    </div>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-white/45">
                      Clients
                    </p>
                  </div>

                  <div>
                    <div className="text-2xl font-medium tracking-tight md:text-3xl">
                      100<span className="text-white/40">+</span>
                    </div>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-white/45">
                      Creators
                    </p>
                  </div>

                  <div>
                    <div className="text-2xl font-medium tracking-tight md:text-3xl">
                      120<span className="text-white/40">+</span>
                    </div>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-white/45">
                      Brands
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ================= MOBILE HERO ================= */}
      <section className="relative min-h-[100svh] overflow-hidden bg-[#050506] text-white md:hidden">
        {/* Background */}
        <Image
          src="/images/about-mobile.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* readability gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/80" />

        {/* subtle bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

        {/* Content */}
        <div className="relative z-10 flex min-h-[100svh] flex-col justify-end px-6 pb-10">
          <FadeIn delay={0.15}>
            <div className="flex items-start gap-3">
              {/* small accent line */}
              <div className="mt-1 h-12 w-px bg-white/40" />

              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/45">
                  About VisitingLink
                </p>

                <p className="mt-3 max-w-[310px] text-[15px] leading-6 text-white/75">
                  For over 8 years, we’ve been designing brands, building
                  digital experiences and engineering technology that helps
                  ambitious ideas move forward.
                </p>
              </div>
            </div>
          </FadeIn>

          {/* bottom meta */}
          <FadeIn delay={0.3} className="mt-8">
            <div className="flex items-center justify-between border-t border-white/15 pt-4">
              <span className="text-[10px] uppercase tracking-[0.16em] text-white/40">
                Since 2018
              </span>

              <span className="text-[10px] uppercase tracking-[0.16em] text-white/40">
                Digital · Technology
              </span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
          SECTION 02 — PEOPLE / FOUNDER
      ───────────────────────────────────────────────────────── */}
      <AboutTeamSection
        founder={{
          eyebrow: "Built by People",
          headline: "Meet Our Founder",
          founderName: "Mr. Jitesh Singh",
          founderTitle: "CEO & Founder",
          yearsLabel: "8 Years of Digital Innovation",
          words:
            "VisitingLink began with a clear purpose: in a fast-evolving digital world, every individual, brand, and ambitious idea deserves a clear, powerful presence. Over 8 years of designing products and engineering technology, we built a culture rooted in clarity, precision, and relentless curiosity.",
          onNavigateContact: () => onNavigateContact(),
        }}
      />

      {/* ─────────────────────────────────────────────────────────
         SECTION 03 — OUR STORY (8 years)
      ───────────────────────────────────────────────────────── */}
      <EightYearsSection />

      {/* ─────────────────────────────────────────────────────────
          SECTION 04 — OUR JOURNEY
      ───────────────────────────────────────────────────────── */}
      <div className="h-full">
        <JourneySection
          className="h-full"
          headline="From first brand to a bigger platform."
          intro="What started as client work — identities, websites, products — became the foundation for something we wanted to build ourselves."
          milestones={JOURNEY_MILESTONES}
        />
      </div>

      {/* ─────────────────────────────────────────────────────────
          SECTION 05 — VISION + MISSION
      ───────────────────────────────────────────────────────── */}

      <VisionMissionSection />

    </div>
  );
};
