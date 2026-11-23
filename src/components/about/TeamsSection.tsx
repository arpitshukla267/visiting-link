"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";

/* ------------------------------------------------------------------ */
/*  Shared fade-in wrapper                                             */
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
/*  Social icons (X + in, same as the reference design)                */
/* ------------------------------------------------------------------ */

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function InIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Meet the Team — grid (founder + co-founder first, then the team)   */
/* ------------------------------------------------------------------ */

export type TeamMember = {
  name: string;
  role: string;
  photoUrl?: string;
  /** Zoom on the photo (1 = no zoom). Only set where needed. */
  imageScale?: number;
  socials?: { linkedin?: string; twitter?: string };
};

export type TeamSectionProps = {
  headline?: string;
  intro?: string;
  members?: TeamMember[];
};

const defaultMembers: TeamMember[] = [
  {
    name: "Geetanjali Shakya",
    role: "Founder & CFO",
    photoUrl: "/team/9.webp",
    imageScale: 1.1,
  },
  {
    name: "Jitesh Singh",
    role: "Co-Founder & Head of Operations",
    photoUrl: "/team/11.webp",
  },
  {
    name: "Sandeep Soni",
    role: "Customer Relation Manager",
    photoUrl: "/team/3.webp",
  },
  {
    name: "Ansh Katariya",
    role: "Creative & Design Co-ordinator",
    photoUrl: "/team/10.webp",
  },
  {
    name: "Arpit Shukla",
    role: "Senior Full Stack Developer",
    photoUrl: "/team/6.webp",
  },
  {
    name: "Nipurn Patel",
    role: "Senior Graphic Designer",
    photoUrl: "/team/5.webp",
  },
  {
    name: "Hargun",
    role: "Social Media Manager",
    photoUrl: "/team/4.webp",
  },
  {
    name: "Chitranshi",
    role: "Brand Ambassador",
    photoUrl: "/team/2.webp",
  },
  {
    name: "Sameera",
    role: "Marketing",
    photoUrl: "/team/1.webp",
  },
  {
    name: "Manav Jha",
    role: "Video Editor",
    photoUrl: "/team/7.webp",
  },
  {
    name: "Abhiuday Verma",
    role: "Video Editor",
    photoUrl: "/team/8.png",
  },
  {
    name: "Tanya Tiwari",
    role: "Sales Executive",
    photoUrl: "/images/tanya.jpeg",
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
    <FadeIn delay={(index % 3) * 0.08}>
      <article>
        <div className="aspect-square overflow-hidden rounded-3xl">
          {member.photoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={member.photoUrl}
              alt={member.name}
              draggable={false}
              decoding="async"
              className="h-full w-full object-cover object-top"
              style={
                member.imageScale
                  ? {
                      transform: `scale(${member.imageScale})`,
                      transformOrigin: "top",
                    }
                  : undefined
              }
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm text-[#9A9A96]">
              No photo
            </div>
          )}
        </div>

        <div className="mt-3.5 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-lg font-normal leading-tight tracking-tight text-[#14171F] md:text-xl">
              {member.name}
            </p>
            <p className="mt-1.5 text-xs text-[#3A3E47] md:text-[13px]">
              {member.role}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3.5 text-[#14171F]">
            <a
              href={member.socials?.twitter ?? "#"}
              target="_blank"
              rel="noreferrer"
              aria-label={`${member.name} on X`}
              className="transition-opacity hover:opacity-60"
            >
              <XIcon className="h-[15px] w-[15px]" />
            </a>
            <a
              href={member.socials?.linkedin ?? "#"}
              target="_blank"
              rel="noreferrer"
              aria-label={`${member.name} on LinkedIn`}
              className="transition-opacity hover:opacity-60"
            >
              <InIcon className="h-[15px] w-[15px]" />
            </a>
          </div>
        </div>
      </article>
    </FadeIn>
  );
}

export function TeamSection({
  headline = "Meet the team behind VisitingLink",
  intro = "A small team of creators, developers, and designers bringing VisitingLink to life — with care, precision, and attention to every detail.",
  members = defaultMembers,
}: TeamSectionProps) {
  return (
    <section
      id="team"
      className="bg-white py-12 md:py-20"
      aria-label="Meet the team"
    >
      <div className="mx-auto w-full max-w-[92vw] md:max-w-[90vw] md:px-6">
        <FadeIn>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-10">
            <h2 className="max-w-[15ch] text-4xl font-medium leading-[1.12] tracking-[-0.035em] text-[#14171F] md:text-5xl">
              {headline}
            </h2>
            <p className="text-xs leading-relaxed text-[#2B2F38] md:mt-6 md:w-[270px] md:shrink-0">
              {intro}
            </p>
          </div>
        </FadeIn>

        <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 md:mt-16 lg:grid-cols-3">
          {members.map((member, index) => (
            <TeamMemberCard
              key={`${member.name}-${member.role}`}
              member={member}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Default export (founder section removed)                           */
/* ------------------------------------------------------------------ */

export type AboutTeamSectionProps = {
  team?: TeamSectionProps;
};

export default function AboutTeamSection({ team }: AboutTeamSectionProps) {
  return <TeamSection {...team} />;
}
