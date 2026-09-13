"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import {
  PenTool,
  Code2,
  LayoutDashboard,
  Bot,
  Plus,
  Check,
  ArrowUpRight,
} from "lucide-react";

/* -----------------------------------------------------------------------
 * "What We Do" — dark editorial services overview.
 *
 * Replaces ServicesSection.tsx. The outer row list (number / title+
 * capabilities / arrow, hairline dividers) is the original "What We Do"
 * draft moved onto a deep black background. What's new here: expanding a
 * row no longer shows a decorative preview — it reveals that bundle's
 * individual services as full cards built the same way ServicesSection's
 * ServiceCard is (icon chip, title, one-line description, checklist,
 * Explore affordance), just condensed and re-themed for black. So the
 * card *anatomy* is reused, not just the row list.
 *
 * Only one bundle is open at a time — an accordion, not four independent
 * toggles — since that's the reading order that makes sense for a
 * numbered list. No new dependencies: same motion/react + lucide-react
 * already used across the site. Every other section is untouched.
 * --------------------------------------------------------------------- */

const EASE = [0.16, 1, 0.3, 1] as const;

type Accent = {
  color: string;
  iconBg: string;
};

interface InnerService {
  title: string;
  description: string;
  checklist: string[];
}

interface WhatWeDoItem {
  number: string;
  title: string;
  services: InnerService[];
  Icon: React.FC<{ className?: string; strokeWidth?: number }>;
  accent: Accent;
}

/* Same restrained accent family as the rest of the site, tuned to sit on
 * black: full-strength for icons/ticks, low-alpha for icon-chip fills. */
const ACCENTS = {
  design: { color: "#A78BFA", iconBg: "rgba(167,139,250,0.14)" },
  software: { color: "#818CF8", iconBg: "rgba(129,140,248,0.14)" },
  webapp: { color: "#E0B84D", iconBg: "rgba(224,184,77,0.14)" },
  ai: { color: "#4ADE80", iconBg: "rgba(74,222,128,0.14)" },
} as const satisfies Record<string, Accent>;

const WHAT_WE_DO: WhatWeDoItem[] = [
  {
    number: "01",
    title: "Brand & Digital Design",
    Icon: PenTool,
    accent: ACCENTS.design,
    services: [
      {
        title: "UI/UX Design",
        description: "Interfaces designed around how people actually use your product.",
        checklist: ["User research", "Wireframes & prototypes", "Design systems"],
      },
      {
        title: "Graphic Design",
        description: "Visual systems that make your business recognizable.",
        checklist: ["Brand identity", "Social media", "Marketing creatives"],
      },
      {
        title: "Company Profiles",
        description: "A polished overview of who you are and what you deliver.",
        checklist: ["Company overview", "Leadership & team", "Capabilities"],
      },
      // {
      //   title: "Website Design",
      //   description: "Marketing sites built to convert, not just look good.",
      //   checklist: ["Landing pages", "Responsive layouts", "CMS integration"],
      // },
    ],
  },
  {
    number: "02",
    title: "Software Development",
    Icon: Code2,
    accent: ACCENTS.software,
    services: [
      {
        title: "CRM",
        description: "Track leads, deals and customer relationships in one place.",
        checklist: ["Contact management", "Pipeline tracking", "Reporting"],
      },
      {
        title: "Sales Software",
        description: "Tools that help your team close faster.",
        checklist: ["Quotes & proposals", "Order management", "Team dashboards"],
      },
      {
        title: "Invoice & Billing Software",
        description: "Get paid on time with automated billing.",
        checklist: ["Recurring invoices", "Payment tracking", "Tax handling"],
      },
      {
        title: "Custom Software",
        description: "Bespoke systems built around how your business actually runs.",
        checklist: ["Internal tools", "Workflow automation", "Legacy integration"],
      },
    ],
  },
  {
    number: "03",
    title: "Web Apps & Prototypes",
    Icon: LayoutDashboard,
    accent: ACCENTS.webapp,
    services: [
      {
        title: "Web Applications",
        description: "Powerful browser-based applications built around your business needs.",
        checklist: ["User accounts & permissions", "Real-time data", "Scalable architecture"],
      },
      {
        title: "Business Dashboards",
        description: "Clear, interactive dashboards that turn your data into useful insights.",
        checklist: ["Live metrics", "Custom charts", "Role-based views"],
      },
      // {
      //   title: "Working Products",
      //   description: "Turn your idea into a working product that you can test and showcase.",
      //   checklist: ["Core features", "Rapid development", "User feedback"],
      // },
      {
        title: "Interactive Prototypes",
        description: "Clickable product concepts to test ideas before full development.",
        checklist: ["Interactive flows", "Client demos", "Usability testing"],
      },
      {
        title: "Cloud Deployment",
        description: "Deploy and configure your web applications for reliable online access.",
        checklist: ["Production deployment", "Server configuration", "Performance setup"],
      },
    ],
  },
  {
    number: "04",
    title: "AI & Automation Solutions",
    Icon: Bot,
    accent: ACCENTS.ai,
    services: [
      {
        title: "AI Integration",
        description: "Bring intelligent features into your existing product.",
        checklist: ["LLM integration", "Recommendation engines", "Data pipelines"],
      },
      {
        title: "Chatbots",
        description: "Handle support and sales conversations automatically.",
        checklist: ["Support bots", "Lead qualification", "Multi-channel deploy"],
      },
      {
        title: "Automation",
        description: "Remove the manual work from repetitive processes.",
        checklist: ["Workflow triggers", "Task scheduling", "Cross-tool syncing"],
      },
      {
        title: "API Integrations",
        description: "Connect the tools you already use.",
        checklist: ["Third-party APIs", "Webhooks", "Data sync"],
      },
    ],
  },
];

function SectionIntro() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: EASE }}
      className="max-w-3xl"
    >
      <div className="flex items-center gap-3">
        <span className="h-px w-6 bg-white/40" />
        <span className="text-xs font-medium uppercase tracking-[0.18em] text-[#8F8F8F]">
          What we do
        </span>
      </div>

      <h2 className="mt-5 text-3xl font-medium leading-[1.1] tracking-tight text-[#F5F5F2] md:text-5xl lg:text-[56px]">
        We turn business ideas into digital products that work.
      </h2>

      <p className="mt-5 max-w-xl text-sm font-normal leading-relaxed text-[#8F8F8F] md:text-lg">
        From your first idea to a complete digital product, we design, build
        and scale the technology your business needs.
      </p>
    </motion.div>
  );
}

/* ---------------------------------------------------------------------
 * Inner service card — same anatomy as ServicesSection's ServiceCard
 * (icon chip / title / description / checklist / Explore), condensed to
 * sit inside an expanded row and re-themed for the black section. No
 * photo panel: with four of these per bundle and no per-service imagery
 * to draw on, the checklist + description carry the content instead.
 * ------------------------------------------------------------------- */
function InnerServiceCard({
  service,
  accent,
  Icon,
  index,
}: {
  service: InnerService;
  accent: Accent;
  Icon: React.FC<{ className?: string; strokeWidth?: number }>;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.35, delay: index * 0.05, ease: EASE }}
      className="group flex flex-col rounded-2xl border border-[#1E1E1E] bg-[#111111] p-5 transition-colors duration-300 hover:border-[color:var(--card-accent)] md:p-6"
      style={{ ["--card-accent" as string]: accent.color }}
    >
      <div
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
        style={{ background: accent.iconBg }}
      >
        <Icon className="h-4 w-4" strokeWidth={1.8} style={{ color: accent.color }} />
      </div>

      <h4 className="mt-4 text-sm md:text-[15px] font-medium md:font-semibold leading-tight md:leading-normal md:tracking-tight text-[#F5F5F2] md:text-base">
        {service.title}
      </h4>

      <p className="mt-1.5 text-xs leading-relaxed text-[#8F8F8F] md:text-[13px]">
        {service.description}
      </p>

      <ul className="mt-4 flex flex-1 flex-col gap-1.5">
        {service.checklist.map((point) => (
          <li
            key={point}
            className="flex items-start gap-1.5 text-[12px] leading-snug text-[#B8B8B8] md:text-[13px]"
          >
            <Check
              className="mt-[1px] h-3 w-3 flex-shrink-0"
              style={{ color: accent.color }}
              strokeWidth={2.5}
            />
            {point}
          </li>
        ))}
      </ul>

      {/* <span
        className="mt-5 inline-flex items-center gap-1 self-start text-xs font-medium text-[#F5F5F2] transition-colors duration-300 group-hover:text-[color:var(--card-accent)]"
      >
        Explore
        <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span> */}
    </motion.div>
  );
}

function ServiceRow({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: WhatWeDoItem;
  index: number;
  isOpen: boolean;
  onToggle: (index: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const { Icon, accent } = item;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.05, ease: EASE }}
      className="group border-t border-[#1C1C1C] first:border-t-0"
    >
      <button
        type="button"
        onClick={() => onToggle(index)}
        aria-expanded={isOpen}
        className="flex w-full items-center gap-5 py-7 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A] md:gap-8 md:py-9 hover:cursor-pointer"
      >
        {/* Large service number — left */}
        <span
          className="w-9 shrink-0 text-2xl font-light leading-none tabular-nums transition-colors duration-300 md:w-16 md:text-4xl"
          style={{ color: isOpen ? accent.color : "#3A3A3A" }}
        >
          {item.number}
        </span>

        {/* Icon chip — visible on mobile only */}
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full md:hidden"
          style={{ background: accent.iconBg, color: accent.color }}
        >
          <Icon className="h-4 w-4" strokeWidth={1.8} />
        </span>

        {/* Title + capability names */}
        <div className="min-w-0 flex-1">
          <h3 className="text-md line-clamp-1 font-medium tracking-tight text-[#F5F5F2] md:line-clamp-none md:text-2xl">
            {item.title}
          </h3>
          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-[#767676] md:mt-2 md:line-clamp-none md:text-sm">
            {item.services.map((s) => s.title).join(" · ")}
          </p>
        </div>

        {/* Expand / collapse indicator — right */}
        <span
          className="ml-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 md:h-12 md:w-12"
          style={{
            borderColor: isOpen ? accent.color : "#242424",
            background: isOpen ? accent.iconBg : "transparent",
          }}
        >
          <Plus
            className="h-4 w-4 transition-transform duration-300 md:h-5 md:w-5"
            style={{
              color: isOpen ? accent.color : "#F5F5F2",
              transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
            }}
            strokeWidth={1.8}
          />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="services"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 gap-3 pb-8 pl-0 pr-0 sm:grid-cols-2 sm:pl-[3.75rem] sm:pr-1 md:gap-4 md:pb-10 lg:grid-cols-4 lg:pl-24 lg:pr-0">
              {item.services.map((service, i) => (
                <InnerServiceCard
                  key={service.title}
                  service={service}
                  accent={accent}
                  Icon={Icon}
                  index={i}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export const WhatWeDoSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      id="what-we-do"
      className="w-full border-b border-[#161616] bg-[#0A0A0A] py-20 md:py-32"
    >
      <div className="mx-auto max-w-[90vw] px-2 md:px-12">
        <SectionIntro />

        <div className="mt-14 md:mt-20">
          {WHAT_WE_DO.map((item, idx) => (
            <ServiceRow
              key={item.title}
              item={item}
              index={idx}
              isOpen={openIndex === idx}
              onToggle={handleToggle}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeDoSection;