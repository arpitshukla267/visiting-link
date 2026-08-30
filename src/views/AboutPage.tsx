"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "motion/react";
import { Users, Code, Palette, Globe, Terminal } from "lucide-react";
import Image from "next/image";
import { JourneySection, type Milestone } from "@/components/JourneySection";
import { FounderSection } from "@/components/FounderSection";

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
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = value;
    const duration = 1400; // ms
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Cubic ease-out
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.floor(eased * end));

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setDisplayValue(end);
      }
    };

    requestAnimationFrame(tick);
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
      <span className="mt-1 md:mt-2 text-sm font-medium text-[#666666]">{label}</span>
      {sublabel && (
        <span className="mt-0.5 text-xs md:text-sm text-[#999999]">{sublabel}</span>
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
      <section className="relative bg-white max-w-[95vw] md:max-w-[90vw] mx-auto pt-28 pb-10 md:pt-36 md:pb-28 border-b border-[#F0F0F0]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-16 items-center">
          {/* Left Column: Heading, Paragraph, Statistics */}
          <div className="lg:col-span-7 max-w-[90vw] mx-auto px-2 md:px-12 lg:pl-12 lg:pr-0 w-full">
            <FadeIn>
              <h1 className="text-3xl font-semibold leading-tight text-[#111111] sm:text-5xl lg:text-6xl">
                8 Years of Experience.
                <span className="mt-1 md:mt-2 block text-xl font-normal text-[#888888] sm:text-3xl lg:text-4xl">
                  A Legacy in Digital &amp; Technology.
                </span>
              </h1>
            </FadeIn>
      
            <FadeIn delay={0.15}>
              <p className="mt-4 md:mt-6 text-base md:text-lg sm:text-xl text-[#555555] font-normal leading-relaxed max-w-2xl">
                For the last 8 years, we have been building in the digital
                world — creating brands, designing digital experiences,
                building technology and helping ambitious ideas become reality.
              </p>
            </FadeIn>
      
            {/* Statistics Grid (4 Large Stats) */}
            <FadeIn delay={0.25} className="mt-4 md:mt-12 pt-6 md:pt-10 border-t border-[#F0F0F0]">
              <div className="grid grid-cols-4 sm:grid-cols-4 gap-4 md:gap-8">
                <AnimatedCounter value={8} suffix="+" label="Years" sublabel="of Experience" />
                <AnimatedCounter value={900} suffix="+" label="Clients" sublabel="Worldwide" />
                <AnimatedCounter value={100} suffix="+" label="Designers" sublabel="In Network" />
                <AnimatedCounter value={120} suffix="+" label="Brands" sublabel="Built &amp;  Scaled" />
              </div>
            </FadeIn>
          </div>
      
          {/* Right Column: Full-bleed image, edge to edge, no padding */}
          <div className="lg:col-span-5 relative h-[400px] sm:h-[500px] lg:h-full lg:min-h-[600px] w-full overflow-hidden">
            <FadeIn delay={0.2} direction="up" className="absolute inset-0 w-full h-full">
              <Image
                src="/about.png"
                alt="Digital and technology illustration"
                fill
                className="object-cover"
                priority
              />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
          SECTION 02 — OUR JOURNEY
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
          SECTION 03 — VISION + MISSION
      ───────────────────────────────────────────────────────── */}
      <section className="border-b border-[#F0F0F0] bg-[#FAFAFA] py-20 md:py-28">
        <div className="mx-auto max-w-[95vw] md:max-w-[90vw] px-4 md:px-12">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-20">
            <FadeIn>
              <p className="text-sm font-medium text-[#888888]">Vision</p>
              <h2 className="mt-3 text-2xl font-semibold leading-snug text-[#111111] md:text-3xl">
                Technology should connect people — not just impress them.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-[#555555] md:text-lg">
                We care about systems that solve real problems, open real
                opportunities, and stay useful long after launch day.
              </p>
              <ul className="mt-8 space-y-3 border-t border-[#E8E8E5] pt-8 text-base text-[#333333] md:text-lg">
                <li className="flex gap-3">
                  <span className="text-[#9A9A97]">—</span>
                  <span>Solve problems that matter</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#9A9A97]">—</span>
                  <span>Create room for new opportunities</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#9A9A97]">—</span>
                  <span>Make complex things feel simple</span>
                </li>
              </ul>
            </FadeIn>

            <FadeIn delay={0.1}>
              <p className="text-sm font-medium text-[#888888]">Mission</p>
              <h2 className="mt-3 text-2xl font-semibold leading-snug text-[#111111] md:text-3xl">
                Give ambitious ideas the structure to survive.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-[#555555] md:text-lg">
                Good ideas fail when the tools, team, or technology isn&rsquo;t
                there. We build the ecosystem — design, engineering, and
                platform — so those ideas can actually ship.
              </p>
              <blockquote className="mt-8 border-l-2 border-[#111111] pl-5">
                <p className="text-base font-medium leading-relaxed text-[#111111] md:text-lg">
                  We&rsquo;re not chasing trends. We&rsquo;re building things
                  that still make sense five years from now.
                </p>
              </blockquote>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
          SECTION 04 — PEOPLE / FOUNDER
      ───────────────────────────────────────────────────────── */}
      <FounderSection
        eyebrow="Built by People"
        headline="Driven by Experience."
        founderName="Built on Craft & Vision"
        founderTitle="VisitingLink Leadership"
        yearsLabel="8 Years of Digital Innovation"
        story="VisitingLink began with a clear purpose: in a fast-evolving digital world, every individual, brand, and ambitious idea deserves a clear, powerful presence. Over 8 years of designing products and engineering technology, we built a culture rooted in clarity, precision, and relentless curiosity."
        onNavigateContact={() => onNavigateContact()}
      />
    </div>
  );
};
