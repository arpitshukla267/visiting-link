"use client";

import { type ReactNode, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import {
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  Linkedin,
  Github,
  Twitter,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Shared fade-in wrapper (still used for Team section)               */
/* ------------------------------------------------------------------ */

function FadeIn({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
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
/*  Scroll-reveal word — each word rises from the bottom in sequence   */
/* ------------------------------------------------------------------ */

function ScrollRevealWord({
  word,
  index,
  progress,
}: {
  word: string;
  index: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const start = index * 0.14;
  const revealEnd = start + 0.12;
  const travelEnd = start + 0.42;

  const y = useTransform(progress, [start, travelEnd], [320, 0]);
  const opacity = useTransform(progress, [start, revealEnd], [0, 1]);

  return (
    <motion.span
      style={{ y, opacity }}
      className="mr-[0.28em] inline-block will-change-transform last:mr-0"
    >
      {word}
    </motion.span>
  );
}

/* ------------------------------------------------------------------ */
/*  01 — Meet the Founder                                              */
/* ------------------------------------------------------------------ */

export type FounderSectionProps = {
  eyebrow?: string;
  headline?: string;
  founderName?: string;
  founderTitle?: string;
  yearsLabel?: string;
  photoUrl?: string;
  words?: string;
  ctaLabel?: string;
  onNavigateContact?: () => void;
};

export function FounderSection({
  eyebrow = "Built by people",
  headline = "Meet our founder",
  founderName = "Jitesh Singh",
  founderTitle = "Founder, VisitingLink",
  yearsLabel,
  photoUrl = "/images/founder.PNG",
  words = "I started this doing logo work out of a spare room, mostly for people I already knew. Eight years on, the team's bigger and the work has changed shape a few times, but the reason hasn't — I still want the things we build to keep working long after anyone's paying attention to them.",
  ctaLabel = "Get in touch",
  onNavigateContact = () => {},
}: FounderSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start start"],
  });

  const headlineY = useTransform(scrollYProgress, [0, 1], [300, 0]);
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);

  const imageY = useTransform(scrollYProgress, [0.2, 1], [400, 0]);
  const imageOpacity = useTransform(scrollYProgress, [0.25, 0.5], [0, 1]);

  const contentY = useTransform(scrollYProgress, [0.35, 1], [300, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0.4, 0.65], [0, 1]);

  const headlineWords = headline.trim().split(/\s+/);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-10 md:py-14"
      aria-label="Meet the founder"
    >
      <div className="mx-auto grid w-full max-w-[90vw] md:max-w-[85vw] grid-cols-1 items-center gap-12 px-0 md:px-6 lg:grid-cols-12 lg:gap-16">
        <div className="text-left lg:col-span-7">
          <div className="relative">
            {/* {eyebrow ? (
              <p className="text-base font-normal text-[#6B6B68]">{eyebrow}</p>
            ) : null} */}

            <motion.h2
              style={{ y: headlineY, opacity: headlineOpacity }}
              className="mt-4 flex max-w-3xl flex-wrap items-baseline justify-center bg-gradient-to-t from-white via-[#A8A8A8] to-[#111111]/40 bg-clip-text text-center text-4xl font-bold leading-none text-transparent transform-gpu md:justify-start md:text-left md:text-6xl"
            >
              {headlineWords.map((word, index) => (
                <ScrollRevealWord
                  key={`${word}-${index}`}
                  word={word}
                  index={index}
                  progress={scrollYProgress}
                />
              ))}
            </motion.h2>
          </div>

            {/* Mobile image — medium speed */}
            <motion.div
              style={{ y: imageY, opacity: imageOpacity }}
              className="block transform-gpu md:hidden w-full lg:col-span-5"
            >
              <div className="mx-auto mt-6 aspect-[4/5] w-full max-w-[300px] overflow-hidden rounded-md lg:ml-auto">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photoUrl}
                  alt={founderName}
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </div>
            </motion.div>

            {/* Name + words — slowest */}
            <motion.div
              style={{ y: contentY, opacity: contentOpacity }}
              className="mt-8 max-w-[60ch] transform-gpu md:mt-4"
            >
              <p className="text-lg text-center md:text-left font-normal leading-relaxed text-[#333333]">
                {words}
              </p>
              <div className="flex flex-col items-center md:items-start gap-1 mt-4 md:mt-6">
                <p className="text-2xl md:text-3xl font-bold text-[#111111] tracking-tight">
                  {founderName}
                </p>
                <p className="text-sm md:text-base font-medium uppercase tracking-wide text-[#FF5A1F]">
                  {founderTitle}
                </p>
                  {yearsLabel ? `  ${yearsLabel}` : ""}
              </div>

            </motion.div>

            {/* CTA — same slow speed as content */}
            <motion.div
              style={{ y: contentY, opacity: contentOpacity }}
              className="mt-4 transform-gpu md:mt-8"
            >
              <button
                onClick={() => onNavigateContact()}
                className="group  md:inline-flex flex flex-nowrap cursor-pointer items-center gap-2 rounded-md border border-[#111111] px-6 py-3 text-sm font-normal text-[#111111] transition-colors hover:bg-[#111111] hover:text-white mx-auto md:mx-0"
              >
                <span>{ctaLabel}</span>
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-1" />
              </button>
            </motion.div>
          </div>

          {/* Desktop image — medium speed */}
          <motion.div
            style={{ y: imageY, opacity: imageOpacity }}
            className="hidden w-full transform-gpu lg:col-span-5 md:block"
          >
            <div className="mx-auto aspect-[4/5] w-full max-w-[420px] overflow-hidden rounded-md lg:ml-auto">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photoUrl}
                alt={founderName}
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
          </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  02 — Meet the Team — unchanged (same carousel as before)          */
/* ------------------------------------------------------------------ */

export type TeamMember = {
  name: string;
  role: string;
  photoUrl?: string;
  socials?: { github?: string; linkedin?: string; twitter?: string };
};

export type TeamSectionProps = {
  eyebrow?: string;
  headline?: string;
  intro?: string;
  members: TeamMember[];
};

const defaultMembers: TeamMember[] = [
  {
    name: "Jitesh Singh",
    role: "Founder",
    photoUrl:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=85",
  },
  {
    name: "Creative Director",
    role: "Brand & Design",
    photoUrl:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=800&q=85",
  },
  {
    name: "Lead Engineer",
    role: "Platform & Architecture",
    photoUrl:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=85",
  },
  {
    name: "Head of Product",
    role: "Product Strategy",
    photoUrl:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=85",
  },
  {
    name: "Design Lead",
    role: "UI / UX",
    photoUrl:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=800&q=85",
  },
  {
    name: "Growth Lead",
    role: "Marketing & Growth",
    photoUrl:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=85",
  },
  {
    name: "Senior Developer",
    role: "Frontend Engineering",
    photoUrl:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=85",
  },
  {
    name: "Client Partner",
    role: "Client Relations",
    photoUrl:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=85",
  },
];

function TeamMemberCard({
  member,
  index,
}: {
  member: TeamMember;
  index: number;
}) {
  return (
    <FadeIn
      delay={Math.min(index, 6) * 0.05}
      className="w-[200px] shrink-0 snap-start sm:w-[220px]"
    >
      <div className="aspect-[3/4] w-full overflow-hidden rounded-md bg-[#F5F5F3]">
        {member.photoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={member.photoUrl}
            alt={member.name}
            className="h-full w-full object-cover "
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-[#9A9A96]">
            No photo
          </div>
        )}
      </div>

      <p className="mt-3 text-base font-normal text-[#111111]">{member.name}</p>
      <p className="mt-0.5 text-sm text-[#9A9A96]">{member.role}</p>

      {member.socials && (
        <div className="mt-2 flex items-center gap-3">
          {member.socials.linkedin && (
            <a
              href={member.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label={`${member.name} on LinkedIn`}
              className="text-[#C9C9C5] transition-colors hover:text-[#111111]"
            >
              <Linkedin className="h-4 w-4" strokeWidth={1.75} />
            </a>
          )}
          {member.socials.github && (
            <a
              href={member.socials.github}
              target="_blank"
              rel="noreferrer"
              aria-label={`${member.name} on GitHub`}
              className="text-[#C9C9C5] transition-colors hover:text-[#111111]"
            >
              <Github className="h-4 w-4" strokeWidth={1.75} />
            </a>
          )}
          {member.socials.twitter && (
            <a
              href={member.socials.twitter}
              target="_blank"
              rel="noreferrer"
              aria-label={`${member.name} on Twitter`}
              className="text-[#C9C9C5] transition-colors hover:text-[#111111]"
            >
              <Twitter className="h-4 w-4" strokeWidth={1.75} />
            </a>
          )}
        </div>
      )}
    </FadeIn>
  );
}

export function TeamSection({
  eyebrow = "The people behind it",
  headline = "Meet the team",
  intro = "Developers, designers, and creators working together behind every project we ship.",
  members = defaultMembers,
}: TeamSectionProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const cardWidth = el.firstElementChild
      ? (el.firstElementChild as HTMLElement).offsetWidth + 20
      : 220;
    el.scrollBy({ left: direction * cardWidth * 2, behavior: "smooth" });
  };

  return (
    <section className="bg-white py-12 md:pb-22" aria-label="Meet the team">
      <div className="mx-auto w-full max-w-[90vw] md:max-w-[85vw]">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <FadeIn>
            <p className="text-base font-normal text-[#6B6B68]">{eyebrow}</p>
            <h2 className="mt-2 text-2xl font-medium text-[#111111] md:text-3xl">
              {headline}
            </h2>
            <p className="mt-2 max-w-[46ch] text-base text-[#5D5D5A]">
              {intro}
            </p>
          </FadeIn>

          <FadeIn delay={0.1} className="hidden items-center gap-2 sm:flex">
            <button
              onClick={() => scrollByCard(-1)}
              aria-label="Scroll left"
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[#E5E5E5] transition-colors hover:border-[#111111]"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => scrollByCard(1)}
              aria-label="Scroll right"
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[#E5E5E5] transition-colors hover:border-[#111111]"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </FadeIn>
        </div>

        <div
          ref={scrollerRef}
          className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {members.map((member, index) => (
            <TeamMemberCard
              key={`${member.name}-${member.role}`}
              member={member}
              index={index}
            />
          ))}
        </div>

        <div className="mt-6 flex items-center gap-2 sm:hidden">
          <button
            onClick={() => scrollByCard(-1)}
            aria-label="Scroll left"
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[#E5E5E5] transition-colors hover:border-[#111111]"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => scrollByCard(1)}
            aria-label="Scroll right"
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[#E5E5E5] transition-colors hover:border-[#111111]"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Combined wrapper                                                    */
/* ------------------------------------------------------------------ */

export type AboutTeamSectionProps = {
  founder?: FounderSectionProps;
  team?: TeamSectionProps;
};

export default function AboutTeamSection({
  founder,
  team,
}: AboutTeamSectionProps) {
  return (
    <>
      <FounderSection {...founder} />
      <TeamSection members={team?.members ?? defaultMembers} {...team} />
    </>
  );
}
