"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "motion/react";
import { Users, Code, Palette, Globe, Terminal } from "lucide-react";
import Image from "next/image";
import { JourneySection, type Milestone } from "@/components/about/JourneySection";
import AboutTeamSection from "@/components/about/FounderSection";
import { VisionMissionSection } from "@/components/about/VisionMissionSection";

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
            For over 8 years, we’ve been designing brands, building digital
            experiences and engineering technology that helps ambitious ideas
            move forward.
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
         SECTION 02 — OUR STORY
      ───────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#f8f8f7] text-[#111111]">
        {/* Subtle black / white gradient atmosphere */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-[15%] top-[5%] h-[500px] w-[500px] rounded-full bg-black/[0.035] blur-[120px]" />

          <div className="absolute right-[-10%] top-[20%] h-[600px] w-[600px] rounded-full bg-black/[0.06] blur-[150px]" />

          <div className="absolute bottom-[-25%] left-[25%] h-[500px] w-[700px] rounded-full bg-white blur-[130px]" />

          <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-transparent to-black/[0.025]" />
        </div>

        <div className="relative z-10 mx-auto max-w-[95vw] px-4 py-12 md:px-12 md:py-20">
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-6 lg:gap-12">
            {/* LEFT — CONTENT */}
            <FadeIn>
              <div className="max-w-full">
                <h2 className="text-4xl font-medium leading-[1.08] tracking-[-0.035em] md:text-5xl lg:text-4xl">
                  <StoryTextReveal text="Eight years of building" />
                  <br />
                  <StoryTextReveal
                    text="what comes"
                    delay={0.08}
                  />
                  <span className="text">
                    <StoryTextReveal text="next." delay={0.16} />
                  </span>
                </h2>

                <div className="mt-6 max-w-[540px] space-y-3">
                  <p className="text-base leading-7 text-black/60 md:text-lg">
                    <StoryTextReveal text="We started with a simple idea — help businesses build a stronger presence in the digital world." />
                  </p>

                  <p className="text-base leading-7 text-black/60 md:text-lg">
                    <StoryTextReveal
                      text="What began with branding and design gradually grew into websites, technology, digital products and a wider network of people who share the same obsession with making things better."
                      delay={0.08}
                    />
                  </p>

                  <p className="text-base leading-7 text-black/60 md:text-lg">
                    <StoryTextReveal
                      text="Today, we bring all of that experience together to help ambitious ideas take shape, scale and move forward."
                      delay={0.16}
                    />
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* RIGHT — IMAGE */}
            <FadeIn delay={0.15}>
              <div className="relative mx-auto md:h-[55vh] max-h-[600px] min-h-[300px] md:min-h-[420px] w-full overflow-hidden rounded-[2px]">
                <Image
                  src="/images/story.webp"
                  alt="Visitinglink"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
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

<VisionMissionSection />
      {/* <section className="border-b border-[#F0F0F0] bg-[#FAFAFA] py-20 md:py-28">
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
      </section> */}

      {/* ─────────────────────────────────────────────────────────
          SECTION 04 — PEOPLE / FOUNDER
      ───────────────────────────────────────────────────────── */}
      <AboutTeamSection
        founder={{
          eyebrow: "Built by People",
          headline: "Driven by Experience.",
          founderName: "Built on Craft & Vision",
          founderTitle: "VisitingLink Leadership",
          yearsLabel: "8 Years of Digital Innovation",
          words:
            "VisitingLink began with a clear purpose: in a fast-evolving digital world, every individual, brand, and ambitious idea deserves a clear, powerful presence. Over 8 years of designing products and engineering technology, we built a culture rooted in clarity, precision, and relentless curiosity.",
          onNavigateContact: () => onNavigateContact(),
        }}
      />
    </div>
  );
};
