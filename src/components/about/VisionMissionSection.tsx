"use client";

import React from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { Quote } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Small fade-up wrapper for scroll-triggered entrances               */
/* ------------------------------------------------------------------ */

function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Eyebrow — "— LABEL —"                                              */
/* ------------------------------------------------------------------ */

function EyebrowDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center gap-4">
      <span className="h-px w-8 bg-black/15 md:w-12" />
      <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-black/40">
        {label}
      </span>
      <span className="h-px w-8 bg-black/15 md:w-12" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Vision / Mission card                                              */
/* ------------------------------------------------------------------ */

type Accent = "blue" | "purple";

const accentStyles: Record<
  Accent,
  { text: string; line: string; halo: string }
> = {
  blue: {
    text: "text-blue-600",
    line: "bg-blue-500",
    halo: "bg-blue-300/50",
  },
  purple: {
    text: "text-violet-600",
    line: "bg-violet-500",
    halo: "bg-violet-300/50",
  },
};

function VisionMissionCard({
  accent,
  label,
  headingLines,
  description,
  quote,
  imageSrc,
  imageAlt,
  delay = 0,
}: {
  accent: Accent;
  label: string;
  /** Exactly the lines you want rendered — keep this to 2 entries max. */
  headingLines: string[];
  description: string;
  quote: string;
  imageSrc: string;
  imageAlt: string;
  delay?: number;
}) {
  const styles = accentStyles[accent];

  return (
    <FadeUp
      delay={delay}
      className="relative w-full min-w-0 rounded-3xl border border-black/5 bg-gradient-to-b from-white to-[#F7F7FC] p-5 shadow-[0_20px_45px_-25px_rgba(30,20,90,0.25)] sm:p-6 md:p-9"
    >
      <div className="flex min-w-0 items-start gap-4 sm:gap-5 md:gap-7">
        {/* Circular image with soft halo */}
        <div className="relative shrink-0">
          <div
            className={`absolute -inset-2 rounded-full ${styles.halo} blur-lg`}
          />
          <div className="relative h-20 w-20 overflow-hidden rounded-full ring-4 ring-white sm:h-24 sm:w-24 md:h-28 md:w-28">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes="112px"
              className="object-cover"
            />
          </div>
        </div>

        {/* Label + heading — gets the remaining width, min-w-0 lets it shrink instead of overflowing */}
        <div className="min-w-0 flex-1 pt-1">
          <div className="flex items-center gap-2">
            <span className={`h-px w-4 shrink-0 ${styles.line}`} />
            <span
              className={`text-[11px] font-semibold uppercase tracking-[0.22em] ${styles.text}`}
            >
              {label}
            </span>
          </div>

          <h3 className="mt-2 text-[22px] font-medium leading-[1.15] tracking-tight text-[#0B0B0B] sm:text-[26px] md:text-[28px]">
            {headingLines.map((line, i) => (
              <React.Fragment key={i}>
                {line}
                {i < headingLines.length - 1 && <br />}
              </React.Fragment>
            ))}
          </h3>
        </div>
      </div>

      {/* Description */}
      <p className="mt-6 text-[15px] leading-6 text-[#5B5B66] md:text-base md:leading-7">
        {description}
      </p>

      {/* Quote */}
      <div className="mt-7 flex items-start gap-4">
        <Quote
          className={`h-7 w-7 shrink-0 ${styles.text}`}
          fill="currentColor"
          strokeWidth={0}
        />
        <span className="mt-1 w-px self-stretch bg-black/10" />
        <p className="text-sm italic leading-6 text-[#6B6B76] md:text-[15px] md:leading-7">
          {quote}
        </p>
      </div>
    </FadeUp>
  );
}

/* ------------------------------------------------------------------ */
/*  Section                                                            */
/* ------------------------------------------------------------------ */

export const VisionMissionSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F5F6FC] via-[#F8F8FD] to-[#FBFBFE] py-16 md:py-24">
      {/* Decorative background blobs */}
      <div className="pointer-events-none absolute -left-24 top-4 h-72 w-72 rounded-full bg-indigo-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-52 h-64 w-64 rounded-full bg-purple-200/30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-blue-100/40 blur-3xl" />

      {/* Decorative dot grid, top right */}
      <div
        className="pointer-events-none absolute right-8 top-6 hidden h-32 w-32 opacity-50 md:block"
        style={{
          backgroundImage:
            "radial-gradient(circle, #C7C7D6 1px, transparent 1px)",
          backgroundSize: "14px 14px",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1360px] px-4 md:px-8">
        {/* Header */}
        <FadeUp className="text-center">
          <EyebrowDivider label="Our Direction" />

          <h2 className="mt-4 text-4xl font-semibold md:font-extrabold tracking-tight text-[#0B0B0B] md:text-5xl">
            Our{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
              Vision
            </span>{" "}
            &{" "}
            <span className="bg-gradient-to-r from-violet-600 to-purple-500 bg-clip-text text-transparent">
              Mission
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-base text-[#6B6B76]">
            Guided by purpose. Driven by impact. Building a more connected,
            digital future.
          </p>
        </FadeUp>

        {/* Cards */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 md:gap-9">
          <VisionMissionCard
            accent="blue"
            label="Our Vision"
            headingLines={["A More Connected", "Tomorrow"]}
            description="To be a global technology partner, empowering businesses and people with innovative digital solutions that create meaningful opportunities and a more connected, inclusive future."
            quote="We envision a world where technology bridges gaps and creates new possibilities for everyone."
            imageSrc="/images/vision.webp"
            imageAlt="A person standing on a mountain peak, representing our vision"
            delay={0}
          />

          <VisionMissionCard
            accent="purple"
            label="Our Mission"
            headingLines={["Build, Solve,", "Scale"]}
            description="To deliver innovative, reliable, and user-centric digital solutions that solve real-world challenges, help businesses grow, and create lasting value through technology, collaboration, and continuous improvement."
            quote="We are on a mission to turn ideas into impact — one solution, one partner, one success story at a time."
            imageSrc="/images/mission.webp"
            imageAlt="A rocket launching, representing our mission"
            delay={0.1}
          />
        </div>

        {/* Footer divider */}
        <FadeUp delay={0.2} className="mt-14">
          <EyebrowDivider label="Technology for a brighter tomorrow" />
        </FadeUp>
      </div>
    </section>
  );
};