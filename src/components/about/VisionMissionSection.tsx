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
      <span className="h-px w-8 bg-white/20 md:w-12" />
      <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/50">
        {label}
      </span>
      <span className="h-px w-8 bg-white/20 md:w-12" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Accent colors (orange = Vision, amber = Mission)                   */
/* ------------------------------------------------------------------ */

type Accent = "orange" | "amber";

const accentStyles: Record<Accent, { text: string; halo: string }> = {
  orange: {
    text: "text-orange-500",
    halo: "bg-orange-500/30",
  },
  amber: {
    text: "text-amber-500",
    halo: "bg-amber-500/30",
  },
};

/* ------------------------------------------------------------------ */
/*  Vision / Mission card                                              */
/* ------------------------------------------------------------------ */

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
      className="relative flex w-full min-w-0 flex-col rounded-3xl border border-white/10 bg-gradient-to-b from-[#161616] to-[#0B0B0B] p-6 text-left shadow-[0_20px_45px_-25px_rgba(0,0,0,0.9)] sm:p-8 md:p-10"
    >
      {/* Top row: image on left, label + heading on right */}
      <div className="flex items-center gap-5 sm:gap-7">
        <div className="relative shrink-0">
          <div
            className={`absolute -inset-3 rounded-full ${styles.halo} blur-xl`}
          />
          <div className="relative h-24 w-24 overflow-hidden rounded-full ring-4 ring-white/90 sm:h-28 sm:w-28 md:h-32 md:w-32">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes="128px"
              className="object-cover"
            />
          </div>
        </div>

        <div className="min-w-0">
          {/* Label with leading dash */}
          <div className={`flex items-center gap-2 ${styles.text}`}>
            <span className="h-px w-4 bg-current" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] sm:text-[12px]">
              {label}
            </span>
          </div>

          <h3 className="mt-2 text-[22px] font-medium leading-tight tracking-tight text-white sm:text-[26px] md:text-[30px]">
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
      <p className="mt-7 max-w-full text-[15px] leading-7 text-white/60 md:text-[16px]">
        {description}
      </p>

      {/* Quote */}
      <div className="mt-7 flex w-full items-start gap-4 text-left">
        <Quote
          className={`h-7 w-7 shrink-0 ${styles.text}`}
          fill="currentColor"
          strokeWidth={0}
        />
        <span className="mt-1 w-px self-stretch bg-white/15" />
        <p className="text-sm italic leading-6 text-white/70 md:text-[15px] md:leading-7">
          &ldquo;{quote}&rdquo;
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
    <section className="relative overflow-hidden bg-black py-16 md:py-24">
      {/* Decorative background blobs */}
      <div className="pointer-events-none absolute -left-24 top-4 h-72 w-72 rounded-full bg-orange-500/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-52 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-orange-400/10 blur-3xl" />

      {/* Decorative dot grid, top right */}
      <div
        className="pointer-events-none absolute right-8 top-6 hidden h-32 w-32 opacity-40 md:block"
        style={{
          backgroundImage:
            "radial-gradient(circle, #5A5A5A 1px, transparent 1px)",
          backgroundSize: "14px 14px",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1360px] px-4 md:px-8">
        {/* Header */}
        <FadeUp className="text-center">
          <h2 className="text-4xl font-semibold tracking-tight text-white md:text-5xl md:font-extrabold">
            Our{" "}
            <span className="bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">
              Vision
            </span>{" "}
            &{" "}
            <span className="bg-gradient-to-r from-amber-500 to-orange-400 bg-clip-text text-transparent">
              Mission
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-base text-white/60">
            Guided by purpose. Driven by impact. Building a more connected,
            digital future.
          </p>
        </FadeUp>

        {/* Cards */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 md:gap-9">
          <VisionMissionCard
            accent="orange"
            label="Our Vision"
            headingLines={["A More Connected", "Tomorrow"]}
            description="To be a global technology partner, empowering businesses and people with innovative digital solutions that create meaningful opportunities and a more connected, inclusive future."
            quote="We envision a world where technology bridges gaps and creates new possibilities for everyone."
            imageSrc="/images/vision.webp"
            imageAlt="A person standing on a mountain peak, representing our vision"
            delay={0}
          />

          <VisionMissionCard
            accent="orange"
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
