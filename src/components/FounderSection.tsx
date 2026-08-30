"use client";

import { type ReactNode } from "react";
import { motion } from "motion/react";
import {
  Code,
  Users,
  Palette,
  ArrowUpRight,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Shared fade-in wrapper (kept local so this file is self-contained) */
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
      initial={{ opacity: 0, y: 16 }}
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
/*  01 — Meet the Founder                                              */
/* ------------------------------------------------------------------ */

export type FounderSectionProps = {
  eyebrow?: string;
  headline?: string;
  story?: string;
  founderName?: string;
  founderTitle?: string;
  yearsLabel?: string;
  stats?: { icon: "code" | "users" | "palette"; value: string; label: string }[];
  ctaLabel?: string;
  onNavigateContact?: () => void;
};

const STAT_ICONS = { code: Code, users: Users, palette: Palette } as const;

export function FounderSection({
  eyebrow = "Meet the founder",
  headline = "Built on craft, vision, and eight years of curiosity.",
  story = "VisitingLink began with a clear purpose: in a fast-evolving digital world, every individual, brand, and ambitious idea deserves a clear, powerful presence. Over 8 years of designing products and engineering technology, we built a culture rooted in clarity, precision, and relentless curiosity.",
  founderName = "Founder & Director",
  founderTitle = "VisitingLink Leadership",
  yearsLabel = "8 Years of Digital Innovation",
  stats = [
    { icon: "code", value: "100+", label: "Developers" },
    { icon: "users", value: "100+", label: "Creators" },
    { icon: "palette", value: "100+", label: "Designers" },
  ],
  ctaLabel = "Let's build what's next",
  onNavigateContact = () => {},
}: FounderSectionProps) {
  return (
    <section className="border-b border-[#F0F0F0] bg-white py-24 md:py-32" aria-label="Meet the founder">
      <div className="mx-auto w-full max-w-[95vw] md:max-w-[90vw] px-4 md:px-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left: Founder portrait card */}
          <div className="lg:col-span-5">
            <FadeIn>
              <div className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-neutral-200 bg-[#0A0A0A] shadow-xl">
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-overlay transition-opacity duration-500 group-hover:opacity-20"
                  style={{
                    backgroundImage: "radial-gradient(#FFFFFF 1px, transparent 1px)",
                    backgroundSize: "22px 22px",
                  }}
                />
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
                <div className="absolute inset-0 z-10 bg-gradient-to-br from-white/[0.04] to-transparent" />

                <div className="relative z-20 flex h-full flex-col justify-between p-8">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium tracking-wide text-neutral-300">
                      Founder &amp; Directors
                    </span>
                    <span className="h-2.5 w-2.5 rounded-full bg-white" />
                  </div>

                  <div>
                    <p className="mb-1 text-sm text-neutral-400">{founderTitle}</p>
                    <h3 className="text-xl font-semibold text-white sm:text-2xl">
                      {founderName}
                    </h3>
                    <p className="mt-1 text-sm text-neutral-400">{yearsLabel}</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right: Story + stats + CTA */}
          <div className="flex flex-col justify-between lg:col-span-7">
            <div>
              <FadeIn>
                <p className="text-sm font-medium tracking-wide text-[#9A9A96]">{eyebrow}</p>
                <h2 className="mt-3 text-3xl font-semibold leading-tight text-[#111111] md:text-4xl">
                  {headline}
                </h2>
              </FadeIn>

              <FadeIn delay={0.1}>
                <p className="mb-8 mt-6 text-lg font-normal leading-relaxed text-[#333333] sm:text-xl">
                  {story}
                </p>
              </FadeIn>

              {/* Stat cards */}
              <FadeIn delay={0.2} className="my-8 border-t border-[#F0F0F0] pt-8">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                  {stats.map((stat) => {
                    const Icon = STAT_ICONS[stat.icon];
                    return (
                      <div
                        key={stat.label}
                        className="rounded-xl border border-[#E5E7EB] bg-[#FAFAFA] p-5 transition-colors hover:border-[#111111]/40"
                      >
                        <Icon className="mb-3 h-5 w-5 text-[#111111]" strokeWidth={1.75} />
                        <div className="text-2xl font-semibold text-[#111111]">{stat.value}</div>
                        <div className="mt-1 text-sm text-[#666666]">{stat.label}</div>
                      </div>
                    );
                  })}
                </div>

                <p className="mt-6 text-sm text-[#666666]">
                  Different skills. Different perspectives. One bigger vision.
                </p>
              </FadeIn>
            </div>

            <FadeIn delay={0.3} className="pt-6">
              <button
                onClick={() => onNavigateContact()}
                className="group inline-flex cursor-pointer items-center gap-2 rounded-lg bg-[#111111] px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#333333]"
              >
                <span>{ctaLabel}</span>
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </button>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  02 — Meet the Team                                                 */
/* ------------------------------------------------------------------ */

export type TeamMember = {
  name: string;
  role: string;
  initials?: string;
  photoUrl?: string;
  socials?: { github?: string; linkedin?: string; twitter?: string };
};

export type TeamSectionProps = {
  eyebrow?: string;
  headline?: string;
  intro?: string;
  members: TeamMember[];
  footnote?: string;
};

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join("");
}

function TeamMemberCard({ member, index }: { member: TeamMember; index: number }) {
  return (
    <FadeIn delay={Math.min(index, 6) * 0.06}>
      <div className="group rounded-xl border border-[#E5E7EB] bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#111111]/40 hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
        <div className="mb-4 flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-[#E5E7EB] bg-[#FAFAFA] transition-colors group-hover:border-[#111111]/40">
          {member.photoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={member.photoUrl} alt={member.name} className="h-full w-full object-cover" />
          ) : (
            <span className="text-sm font-semibold text-[#111111]">
              {member.initials ?? getInitials(member.name)}
            </span>
          )}
        </div>

        <h4 className="text-base font-semibold text-[#111111]">{member.name}</h4>
        <p className="mt-0.5 text-sm text-[#6B6B68]">{member.role}</p>

        {member.socials && (
          <div className="mt-4 flex items-center gap-3 border-t border-[#F0F0F0] pt-4">
            {member.socials.linkedin && (
              <a
                href={member.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label={`${member.name} on LinkedIn`}
                className="text-[#9A9A96] transition-colors hover:text-[#111111]"
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
                className="text-[#9A9A96] transition-colors hover:text-[#111111]"
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
                className="text-[#9A9A96] transition-colors hover:text-[#111111]"
              >
                <Twitter className="h-4 w-4" strokeWidth={1.75} />
              </a>
            )}
          </div>
        )}
      </div>
    </FadeIn>
  );
}

const defaultMembers: TeamMember[] = [
  { name: "Founder & CEO", role: "Vision & Strategy" },
  { name: "Creative Director", role: "Brand & Design" },
  { name: "Lead Engineer", role: "Platform & Architecture" },
  { name: "Head of Product", role: "Product Strategy" },
  { name: "Design Lead", role: "UI / UX" },
  { name: "Growth Lead", role: "Marketing & Growth" },
  { name: "Senior Developer", role: "Frontend Engineering" },
  { name: "Client Partner", role: "Client Relations" },
];

export function TeamSection({
  eyebrow = "The people behind it",
  headline = "Meet the team",
  intro = "Developers, designers, and creators working as one team behind every project we ship.",
  members = defaultMembers,
  footnote = "300+ people across three disciplines — and growing.",
}: TeamSectionProps) {
  return (
    <section className="border-b border-[#F0F0F0] bg-white py-24 md:py-32" aria-label="Meet the team">
      <div className="mx-auto w-full max-w-[90vw] px-6 md:px-12">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium tracking-wide text-[#9A9A96]">{eyebrow}</p>
          <h2 className="mt-3 text-3xl font-semibold leading-tight text-[#111111] md:text-4xl">
            {headline}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#5D5D5A] md:text-lg">{intro}</p>
        </FadeIn>

        <div className="mt-16 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {members.map((member, index) => (
            <TeamMemberCard key={`${member.name}-${member.role}`} member={member} index={index} />
          ))}
        </div>

        {footnote && (
          <FadeIn delay={0.2}>
            <p className="mt-12 text-center text-sm text-[#666666]">{footnote}</p>
          </FadeIn>
        )}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Combined wrapper — Founder, then Team                              */
/* ------------------------------------------------------------------ */

export type AboutTeamSectionProps = {
  founder?: FounderSectionProps;
  team?: TeamSectionProps;
};

export default function AboutTeamSection({ founder, team }: AboutTeamSectionProps) {
  return (
    <>
      <FounderSection {...founder} />
      <TeamSection members={team?.members ?? defaultMembers} {...team} />
    </>
  );
}