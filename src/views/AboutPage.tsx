"use client";

import React, { useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import {
  ArrowUpRight,
  Image as ImageIcon,
  Video as VideoIcon,
} from "lucide-react";

interface AboutPageProps {
  onNavigateHome: () => void;
  onNavigateContact: (serviceName?: string) => void;
}

/* ────────────────────────────────────────────────────────────────
   SHARED PRIMITIVES
   Monochrome tokens (used throughout, no color accent):
   ink        #111110   headings
   body       #62625F   paragraph text
   muted      #9A9A97   captions / eyebrows
   line       #E3E3E0   hairlines on light sections
   soft       #F6F6F4   light section background
   dark       #0A0A0A   dark section background
   darkLine   rgba(255,255,255,.12)
   darkBody   #A4A4A1
──────────────────────────────────────────────────────────────── */

/** Fades and rises an element into place once it enters the viewport. */
const FadeIn: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "none";
}> = ({ children, className = "", delay = 0, direction = "up" }) => {
  const yOffset = direction === "up" ? 22 : direction === "down" ? -22 : 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/** Reveals a set of lines one at a time with a clipped upward wipe — used for the hero headline. */
const StaggerLines: React.FC<{ lines: string[]; className?: string }> = ({
  lines,
  className = "",
}) => (
  <div className={className}>
    {lines.map((line, i) => (
      <div key={line} className="overflow-hidden">
        <motion.div
          initial={{ y: "110%" }}
          animate={{ y: "0%" }}
          transition={{
            duration: 0.9,
            delay: 0.15 + i * 0.12,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {line}
        </motion.div>
      </div>
    ))}
  </div>
);

/** Small numbered eyebrow used to mark each chapter of the company story. */
const SectionEyebrow: React.FC<{
  index: string;
  title: string;
  dark?: boolean;
}> = ({ index, title, dark }) => (
  <div className="flex items-center gap-3 mb-5">
    <span
      className={`text-xs font-mono tracking-[0.2em] ${dark ? "text-neutral-500" : "text-[#9A9A97]"}`}
    >
      {index}
    </span>
    <span className={`h-px w-10 ${dark ? "bg-white/20" : "bg-[#D9D9D6]"}`} />
    <span
      className={`text-xs font-mono font-medium tracking-[0.2em] uppercase ${
        dark ? "text-neutral-400" : "text-[#6B6B68]"
      }`}
    >
      {title}
    </span>
  </div>
);

/** A tiny gray SVG data-uri used so <img>/<video poster> tags always render, even before real assets exist. */
const placeholderFill = (hex: string) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"><rect width="100%" height="100%" fill="${hex}"/></svg>`,
  )}`;

/**
 * Marks a spot reserved for a real photo or clip. Ships as an actual <img>/<video> element
 * (swap the `src` prop for the final asset) with a visible label so it's obvious what belongs there.
 */
const MediaPlaceholder: React.FC<{
  type?: "image" | "video";
  label: string;
  aspect?: string;
  dark?: boolean;
  className?: string;
}> = ({
  type = "image",
  label,
  aspect = "aspect-[4/3]",
  dark = false,
  className = "",
}) => {
  const bg = dark ? "#161615" : "#F1F1EF";
  const border = dark ? "border-white/10" : "border-[#E4E4E1]";
  const stripe = dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.035)";
  const chipBg = dark
    ? "bg-white/[0.06] border-white/10"
    : "bg-white border-[#E4E4E1]";
  const chipText = dark ? "text-neutral-400" : "text-[#6B6B68]";
  const captionText = dark ? "text-neutral-500" : "text-[#9A9A97]";

  return (
    <figure className={`m-0 ${className}`}>
      <div
        className={`relative w-full ${aspect} overflow-hidden border ${border}`}
        style={{ backgroundColor: bg }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(135deg, ${stripe} 0px, ${stripe} 1px, transparent 1px, transparent 16px)`,
          }}
        />
        {type === "image" ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={placeholderFill(dark ? "#161615" : "#F1F1EF")}
            alt={label}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            poster={placeholderFill(dark ? "#161615" : "#F1F1EF")}
            muted
            loop
            playsInline
          />
        )}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={`flex items-center gap-2 rounded-full border px-4 py-2 ${chipBg}`}
          >
            {type === "image" ? (
              <ImageIcon
                className={`w-3.5 h-3.5 ${chipText}`}
                strokeWidth={1.5}
              />
            ) : (
              <VideoIcon
                className={`w-3.5 h-3.5 ${chipText}`}
                strokeWidth={1.5}
              />
            )}
            <span
              className={`text-[10px] font-mono uppercase tracking-widest ${chipText}`}
            >
              {type === "image" ? "Image" : "Video"}
            </span>
          </div>
        </div>
      </div>
      <figcaption
        className={`mt-2.5 text-[11px] font-mono uppercase tracking-wide ${captionText}`}
      >
        {label}
      </figcaption>
    </figure>
  );
};

/** Counts up to `value` once in view. No decoration — just the number and its label. */
const AnimatedCounter: React.FC<{
  value: number;
  suffix?: string;
  label: string;
  dark?: boolean;
}> = ({ value, suffix = "", label, dark = false }) => {
  const [display, setDisplay] = useState(0);
  const [started, setStarted] = useState(false);

  const run = () => {
    if (started) return;
    setStarted(true);
    const duration = 1100;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(value * eased));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  return (
    <motion.div
      onViewportEnter={run}
      viewport={{ once: true, margin: "-100px" }}
      className="flex flex-col items-start"
    >
      <span
        className={`text-4xl md:text-6xl font-medium tracking-tight tabular-nums ${
          dark ? "text-white" : "text-[#111110]"
        }`}
      >
        {display}
        {suffix}
      </span>
      <span
        className={`mt-2 text-xs md:text-sm font-mono uppercase tracking-widest ${
          dark ? "text-neutral-500" : "text-[#9A9A97]"
        }`}
      >
        {label}
      </span>
    </motion.div>
  );
};

/* ────────────────────────────────────────────────────────────────
   PAGE
──────────────────────────────────────────────────────────────── */

export const AboutPage: React.FC<AboutPageProps> = ({
  onNavigateHome,
  onNavigateContact,
}) => {
  // A single hairline that fills down the left edge of the page as the reader scrolls —
  // the page's one signature motif: a line that connects every chapter, top to bottom.
  const { scrollYProgress: pageProgress } = useScroll();
  const railScale = useTransform(pageProgress, [0, 1], [0, 1]);

  return (
    <div className="w-full bg-white text-[#111110] overflow-x-hidden selection:bg-black selection:text-white">
      {/* Scroll rail — white line, difference-blended so it reads correctly on light and dark sections alike */}
      <div className="hidden lg:block fixed left-10 top-0 bottom-0 w-px z-40 bg-black/10">
        <motion.div
          style={{ scaleY: railScale }}
          className="w-full h-full origin-top bg-white mix-blend-difference"
        />
      </div>

      {/* ─────────────────────────────────────────────────────────
          TOP BAR
      ───────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-sm border-b border-[#F0F0EF]">
        <div className="max-w-[90vw] mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
          <button
            onClick={onNavigateHome}
            className="text-sm font-medium tracking-tight text-[#111110] hover:text-[#5A5A57] transition-colors cursor-pointer"
          >
            VisitingLink
          </button>
          <button
            onClick={() => onNavigateContact()}
            className="hidden sm:inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-[#6B6B68] hover:text-[#111110] transition-colors cursor-pointer"
          >
            Start a conversation
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* ─────────────────────────────────────────────────────────
          1. HERO
      ───────────────────────────────────────────────────────── */}
      <section className="relative bg-white pt-16 pb-20 md:pt-24 md:pb-28 border-b border-[#F0F0EF]">
        <div className="max-w-[90vw] mx-auto px-6 md:px-12 lg:pl-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-end">
            <div className="lg:col-span-7">
              <FadeIn>
                <span className="text-xs font-mono font-medium tracking-[0.2em] text-[#9A9A97] uppercase">
                  About VisitingLink
                </span>
              </FadeIn>

              <h1 className="mt-5 text-4xl sm:text-5xl md:text-6xl lg:text-[4.75rem] font-medium tracking-tight leading-[1.06] text-[#111110]">
                <StaggerLines
                  lines={[
                    "Eight years of experience.",
                    "A legacy in digital & technology.",
                  ]}
                />
                <div className="overflow-hidden">
                  <motion.span
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{
                      duration: 0.9,
                      delay: 0.4,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="block text-[#8C8C89]"
                  />
                </div>
              </h1>

              <FadeIn delay={0.3}>
                <p className="mt-6 text-lg md:text-xl text-[#5D5D5A] max-w-xl leading-relaxed font-normal">
                  For the last 8 years, we have been building in the digital
                  world.
                </p>
              </FadeIn>
            </div>

            <div className="lg:col-span-5">
              <FadeIn delay={0.35}>
                <MediaPlaceholder
                  type="video"
                  label="Team / studio reel — 4:3"
                  aspect="aspect-[4/3]"
                />
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
        2. OUR FOUNDATION
      ───────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-32 border-b border-[#F0F0EF] bg-white">
        <div className="max-w-[90vw] mx-auto px-6 md:px-12 lg:pl-24">
          <FadeIn>
            <SectionEyebrow index="01" title="Our foundation" />
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-[#111110] mb-12 max-w-3xl">
              Built before VisitingLink.
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-8 items-start">
            {[
              {
                index: "01",
                heading: "Brand & identity.",
                copy: "Creating brands and designing digital experiences — the visual language businesses use to be recognized and remembered.",
                label: "Branding & identity work — case study 01",
              },
              {
                index: "02",
                heading: "Technology & engineering.",
                copy: "Building websites and technology, solving business challenges, and helping ideas become working products.",
                label: "Web & product engineering — case study 02",
              },
            ].map((item, idx) => (
              <FadeIn
                key={item.heading}
                delay={idx * 0.12}
                className="flex flex-col h-full"
              >
                <MediaPlaceholder label={item.label} aspect="aspect-[16/10]" />
                <div className="mt-6">
                  <span className="text-xs font-mono tracking-widest text-[#9A9A97]">
                    {item.index}
                  </span>
                  <h3 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-[#111110] leading-snug">
                    {item.heading}
                  </h3>
                  <p className="mt-3 text-base md:text-lg text-[#5D5D5A] leading-relaxed font-normal max-w-md">
                    {item.copy}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

          <div className="mt-16 pt-10 border-t border-[#F0F0EF] max-w-3xl space-y-3">
            <FadeIn delay={0.1}>
              <p className="text-lg md:text-xl text-[#5D5D5A] font-normal">
                Every project taught us something.
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-lg md:text-xl text-[#5D5D5A] font-normal">
                Every challenge made us better.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <p className="text-xl md:text-2xl text-[#111110] font-medium tracking-tight pt-2">
                And every experience became part of the foundation we are
                building today.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
          3. THE JOURNEY
      ───────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-32 border-b border-[#F0F0EF] bg-[#FAFAF9]">
        <div className="max-w-[90vw] mx-auto px-6 md:px-12 lg:pl-24">
          <FadeIn className="max-w-3xl mb-14">
            <SectionEyebrow index="02" title="The journey" />
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-[#111110]">
              From digital experience to a bigger vision.
            </h2>
            <p className="mt-4 text-base md:text-lg text-[#5D5D5A] leading-relaxed font-normal">
              Over the years, VisitingLink worked with businesses,
              professionals, entrepreneurs and brands across different
              industries.
            </p>
          </FadeIn>

          {/* Three fragments coming from different places — a visual stand-in for a fragmented digital identity */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <FadeIn delay={0.05}>
              <MediaPlaceholder
                label="Client identity, fragment 01"
                aspect="aspect-[3/4]"
              />
            </FadeIn>
            <FadeIn delay={0.15} className="sm:mt-8">
              <MediaPlaceholder
                label="Client identity, fragment 02"
                aspect="aspect-[3/4]"
              />
            </FadeIn>
            <FadeIn delay={0.25}>
              <MediaPlaceholder
                label="Client identity, fragment 03"
                aspect="aspect-[3/4]"
              />
            </FadeIn>
          </div>

          <div className="mt-16 max-w-3xl mx-auto text-center space-y-4">
            <FadeIn delay={0.1}>
              <p className="text-xl md:text-2xl text-[#6B6B68] font-normal">
                Everything was disconnected.
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-xl md:text-2xl text-[#6B6B68] font-normal">
                We believed there had to be a simpler way.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <p className="text-2xl md:text-4xl font-medium text-[#111110] tracking-tight pt-2">
                One place to represent everything about you.
              </p>
            </FadeIn>
            <FadeIn delay={0.4}>
              <p className="text-base md:text-lg font-mono text-[#111110] font-medium tracking-wider uppercase pt-2">
                That idea became VisitingLink.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
          4. EXPERIENCE & NUMBERS
      ───────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-32 border-b border-[#F0F0EF] bg-white">
        <div className="max-w-[90vw] mx-auto px-6 md:px-12 lg:pl-24">
          <FadeIn className="mb-12">
            <SectionEyebrow index="03" title="Experience & achievements" />
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-[#111110] max-w-3xl">
              Valuable experience shaping what we build.
            </h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <MediaPlaceholder
              label="Studio / workspace — wide banner, 21:9"
              aspect="aspect-[21/9]"
              className="mb-10"
            />
          </FadeIn>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 p-8 md:p-12 border border-[#E3E3E0]">
            <AnimatedCounter value={8} suffix="+" label="Years of experience" />
            <AnimatedCounter value={900} suffix="+" label="Clients" />
            <AnimatedCounter value={100} suffix="+" label="Designers" />
            <AnimatedCounter value={120} suffix="+" label="Brands" />
          </div>

          <FadeIn delay={0.2} className="mt-12 max-w-2xl">
            <div className="space-y-1.5 text-base md:text-lg text-[#5D5D5A] font-normal leading-relaxed border-l border-[#D9D9D6] pl-6">
              <p>Every number represents real work.</p>
              <p>Real challenges.</p>
              <p>Real people.</p>
              <p className="text-[#111110] font-medium">
                And valuable experience that continues to shape what we build
                today.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
          5. WHAT WE'RE BUILDING NOW
      ───────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-32 border-b border-[#F0F0EF] bg-[#FAFAF9]">
        <div className="max-w-[90vw] mx-auto px-6 md:px-12 lg:pl-24">
          <FadeIn className="max-w-3xl mb-12">
            <SectionEyebrow index="04" title="What we're building now" />
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-[#111110]">
              More than a digital visiting card.
            </h2>
            <div className="mt-4 space-y-1 text-lg md:text-xl text-[#5D5D5A] leading-relaxed">
              <p>VisitingLink started with a simple purpose:</p>
              <p className="font-medium text-[#111110]">
                To make sharing your identity easier.
              </p>
              <p>But our vision goes beyond that.</p>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <MediaPlaceholder
              type="video"
              label="Product walkthrough — wide banner, 21:9"
              aspect="aspect-[21/9]"
              className="mb-12"
            />
          </FadeIn>

          <FadeIn delay={0.2} className="text-center max-w-2xl mx-auto">
            <p className="text-xl md:text-3xl font-medium text-[#111110] tracking-tight leading-snug">
              &ldquo;We are building a smarter way for people and businesses to
              represent themselves digitally.&rdquo;
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
          6. THE NEXT CHAPTER — dark section
      ───────────────────────────────────────────────────────── */}
      <section className="py-24 md:py-36 bg-[#0A0A0A] text-white border-b border-white/10">
        <div className="max-w-[90vw] mx-auto px-6 md:px-12 lg:pl-24">
          <FadeIn className="max-w-3xl mb-14">
            <SectionEyebrow index="05" title="The next chapter" dark />
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-white leading-tight">
              The next chapter is bigger.
            </h2>
            <p className="mt-4 text-lg md:text-xl text-neutral-400 leading-relaxed font-normal">
              Our previous journey helped us build experience.
              <br />
              <span className="text-white font-medium">
                Now, we are using that experience to build the future.
              </span>
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {[
              {
                tag: "01 / Ecosystem",
                title: "100+ developers",
                copy: "A growing technology ecosystem focused on building, solving and innovating.",
              },
              {
                tag: "02 / Creativity",
                title: "100+ creators",
                copy: "Bringing together creative minds with different skills and perspectives.",
              },
              {
                tag: "03 / Product",
                title: "Bigger technology",
                copy: "Creating products and digital experiences built for the next generation.",
              },
              {
                tag: "04 / Identity",
                title: "Bigger connections",
                copy: "Helping people and businesses create opportunities through better digital identity.",
              },
            ].map((item, i) => (
              <FadeIn key={item.title} delay={0.1 + i * 0.1}>
                <div className="border border-white/10 hover:border-white/30 transition-colors group overflow-hidden h-full flex flex-col">
                  <MediaPlaceholder
                    dark
                    label={`${item.title} — supporting visual`}
                    aspect="aspect-[16/9]"
                    className="[&_figcaption]:hidden"
                  />
                  <div className="p-8">
                    <span className="text-xs font-mono text-neutral-500 tracking-widest">
                      {item.tag}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-medium tracking-tight text-white mt-2 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-neutral-400 text-base md:text-lg leading-relaxed font-normal">
                      {item.copy}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
          7. OUR VISION
      ───────────────────────────────────────────────────────── */}
      <section className="py-24 md:py-36 border-b border-[#F0F0EF] bg-white">
        <div className="max-w-[90vw] mx-auto px-6 md:px-12 lg:pl-24">
          <FadeIn className="mb-6">
            <SectionEyebrow index="06" title="Our vision" />
          </FadeIn>

          <FadeIn delay={0.1}>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-medium tracking-tight leading-[1.05] text-[#111110] max-w-4xl mb-10">
              Build technology that connects people.
            </h2>
          </FadeIn>

          <FadeIn delay={0.15}>
            <MediaPlaceholder
              label="Vision — wide banner, 21:9"
              aspect="aspect-[21/9]"
              className="mb-14"
            />
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8 border-t border-[#F0F0EF]">
            <div className="lg:col-span-6 space-y-4">
              <FadeIn delay={0.2}>
                <p className="text-xl md:text-2xl text-[#111110] font-medium leading-relaxed">
                  We believe technology should do more than look impressive.
                </p>
              </FadeIn>
              <FadeIn delay={0.3}>
                <ul className="space-y-2 text-lg md:text-xl text-[#5D5D5A] font-normal pt-2">
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#111110]" />
                    <span>It should solve problems.</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#111110]" />
                    <span>Create opportunities.</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#111110]" />
                    <span>And make life easier.</span>
                  </li>
                </ul>
              </FadeIn>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <FadeIn delay={0.4}>
                <p className="text-lg md:text-xl text-[#5D5D5A] leading-relaxed font-normal">
                  Our vision is to build a powerful digital ecosystem where
                  technology, creativity and people come together to create
                  meaningful solutions.
                </p>
              </FadeIn>
              <FadeIn delay={0.5}>
                <div className="p-6 border border-[#111110] bg-[#111110] text-white">
                  <p className="text-xl md:text-2xl font-medium tracking-tight">
                    We are not just building a product.
                    <br />
                    <span className="text-neutral-400">
                      We are building for what comes next.
                    </span>
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
          8. OUR MISSION
      ───────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-32 border-b border-[#F0F0EF] bg-[#FAFAF9]">
        <div className="max-w-[90vw] mx-auto px-6 md:px-12 lg:pl-24">
          <FadeIn className="max-w-3xl mb-12">
            <SectionEyebrow index="07" title="Our mission" />
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-[#111110]">
              Make ambitious ideas possible.
            </h2>
            <p className="mt-4 text-lg md:text-xl text-[#5D5D5A] leading-relaxed font-normal">
              Great ideas should not fail because people don&rsquo;t have the
              right technology, systems or expertise to bring them to life.
            </p>
          </FadeIn>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { tag: "01", title: "For individuals.", invert: false },
              { tag: "02", title: "For entrepreneurs.", invert: false },
              { tag: "03", title: "For businesses.", invert: false },
              { tag: "04", title: "And for the future.", invert: true },
            ].map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.1}>
                <div
                  className={`border overflow-hidden flex flex-col h-full ${
                    item.invert
                      ? "bg-[#111110] border-[#111110] text-white"
                      : "bg-white border-[#E3E3E0]"
                  }`}
                >
                  <MediaPlaceholder
                    dark={item.invert}
                    label={item.title}
                    aspect="aspect-[4/3]"
                    className="[&_figcaption]:hidden"
                  />
                  <div className="p-5">
                    <span
                      className={`text-xs font-mono font-medium ${
                        item.invert ? "text-neutral-500" : "text-[#9A9A97]"
                      }`}
                    >
                      {item.tag}
                    </span>
                    <h3
                      className={`text-xl md:text-2xl font-medium tracking-tight mt-1 ${
                        item.invert ? "text-white" : "text-[#111110]"
                      }`}
                    >
                      {item.title}
                    </h3>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────
          9. CLOSING
      ───────────────────────────────────────────────────────── */}
      <section className="py-24 md:py-36 bg-[#0A0A0A] text-white text-center relative overflow-hidden">
        <div className="max-w-[90vw] mx-auto px-6 md:px-12 relative z-10">
          <FadeIn>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-medium tracking-tight leading-[1.08] mb-8 text-white">
              This is only the beginning.
            </h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm font-mono text-neutral-400 mb-10">
              <span className="px-3 py-1.5 border border-white/15">
                8 years
              </span>
              <span className="text-neutral-700">•</span>
              <span className="px-3 py-1.5 border border-white/15">
                900+ clients
              </span>
              <span className="text-neutral-700">•</span>
              <span className="px-3 py-1.5 border border-white/15">
                100+ designers
              </span>
              <span className="text-neutral-700">•</span>
              <span className="px-3 py-1.5 border border-white/15">
                120+ brands
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-xl md:text-2xl font-medium text-neutral-300 mb-8">
              And now, we&rsquo;re building the next chapter.
            </p>
          </FadeIn>

          <FadeIn
            delay={0.3}
            className="max-w-xl mx-auto space-y-2 text-lg md:text-xl text-neutral-400 font-normal mb-10"
          >
            <p className="text-white font-medium">A bigger vision.</p>
            <p>Smarter technology.</p>
            <p>Better connections.</p>
            <p className="text-white font-medium">
              And a future that is still being written.
            </p>
          </FadeIn>

          <FadeIn delay={0.4} className="mb-12">
            <div className="inline-block p-5 border border-white/10 text-xs md:text-sm font-mono tracking-wider text-neutral-300 space-y-1">
              <p>Built from experience.</p>
              <p>Driven by technology.</p>
              <p className="text-white font-medium">
                Designed for what&rsquo;s next.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.5} className="mb-12">
            <span className="text-3xl sm:text-5xl md:text-7xl font-bold tracking-tighter text-white/15 select-none block">
              VISITINGLINK
            </span>
          </FadeIn>

          <FadeIn delay={0.6}>
            <button
              onClick={() => onNavigateContact()}
              className="group inline-flex items-center gap-3 px-7 py-3.5 bg-white text-[#111110] text-xs font-medium uppercase tracking-wider hover:bg-neutral-200 transition-all cursor-pointer"
            >
              <span>Start a conversation</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </FadeIn>
        </div>
      </section>
    </div>
  );
};
