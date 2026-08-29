"use client";

import React from "react";
import { motion } from "motion/react";
import { Check, ArrowUpRight, Code2, PenTool, IdCard } from "lucide-react";
import { SERVICES_DATA } from "../data/content";
import { ServiceItem } from "../types";
import { FilmstripScroller } from "@/components/ui/featuredfilmstrip";

interface ServicesSectionProps {
  onSelectService: (service: ServiceItem) => void;
  onNavigateService: (serviceId: string) => void;
  onNavigateContact: (serviceName?: string) => void;
}

/* -------------------------------------------------------------------------
 * Card copy is authored per the brief (title / description / checklist
 * differ from the generic SERVICES_DATA fields). Each entry is matched back
 * to a real record in SERVICES_DATA (by title keyword) purely so the
 * existing "Explore" -> onNavigateService(id) wiring keeps working. If no
 * match is found the card still renders but falls back to a slugified id.
 * ------------------------------------------------------------------------- */
type AccentKey = "web" | "graphics" | "visitinglink";

interface ServiceCardCopy {
  title: string;
  description: string;
  checklist: string[];
  matchKeyword: string;
  accent: AccentKey;
  Icon: React.FC<{ className?: string; strokeWidth?: number }>;
}

const CARD_COPY: ServiceCardCopy[] = [
  {
    title: "Web Development",
    description: "From a simple website to a complete digital product.",
    checklist: [
      "Informative websites",
      "Business websites",
      "E-commerce",
      "Web applications",
      "Custom software",
    ],
    matchKeyword: "web",
    accent: "web",
    Icon: Code2,
  },
  {
    title: "Graphics Designing",
    description: "Visual systems that make your business recognizable.",
    checklist: [
      "Brand identity",
      "Social media",
      "Marketing creatives",
      "Print materials",
      "UI visuals",
    ],
    matchKeyword: "graphic",
    accent: "graphics",
    Icon: PenTool,
  },
  {
    title: "VisitingLink",
    description: "A smarter digital identity for your business.",
    checklist: [
      "Digital visiting card",
      "Smart profile",
      "QR code",
      "Contact sharing",
      "Social links",
    ],
    matchKeyword: "visitinglink",
    accent: "visitinglink",
    Icon: IdCard,
  },
];

/* Accent tokens — soft, restrained, one per service. Used only for the icon
 * chip, checklist ticks and tiny visual details; cards stay light neutral. */
const ACCENTS: Record<
  AccentKey,
  { bg: string; iconBg: string; icon: string; tick: string; ring: string }
> = {
  web: {
    bg: "#FAFAFC",
    iconBg: "#EEF0FC",
    icon: "#6366F1",
    tick: "#6366F1",
    ring: "#E4E6FA",
  },
  graphics: {
    bg: "#FAFCFA",
    iconBg: "#EAF7F0",
    icon: "#2FA36B",
    tick: "#2FA36B",
    ring: "#DFF3E8",
  },
  visitinglink: {
    bg: "#FCFBF7",
    iconBg: "#FBF2DC",
    icon: "#B8860B",
    tick: "#C9971F",
    ring: "#F4E8C7",
  },
};

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

const resolveServiceId = (keyword: string, fallbackTitle: string) => {
  const match = SERVICES_DATA.find((s) =>
    s.title.toLowerCase().includes(keyword.toLowerCase()),
  );
  return match?.id ?? slugify(fallbackTitle);
};

/* ---------------------------------------------------------------------------
 * Visual collages — grayscale/neutral with a single accent thread, CSS/SVG
 * only, no stock imagery. Sized to sit in the RIGHT column of the lower
 * card area, next to the checklist rather than beneath it.
 * ------------------------------------------------------------------------- */

const DotGrid: React.FC = () => (
  <svg aria-hidden="true" className="absolute inset-0 h-full w-full opacity-[0.4]">
    <defs>
      <pattern id="services-dot-grid" width="12" height="12" patternUnits="userSpaceOnUse">
        <circle cx="1" cy="1" r="1" fill="#D9D9D9" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#services-dot-grid)" />
  </svg>
);

const WebDevVisual: React.FC<{ accent: (typeof ACCENTS)["web"] }> = ({ accent }) => (
  <div className="relative flex h-full w-full items-center justify-center overflow-hidden p-3">
    <DotGrid />
    {/* Browser frame, slightly rotated */}
    <div
      className="relative z-10 w-[86%] rotate-[-2deg] rounded-md border bg-white shadow-[0_6px_20px_rgba(17,17,17,0.06)]"
      style={{ borderColor: accent.ring }}
    >
      <div className="flex items-center gap-1 border-b px-2 py-1.5" style={{ borderColor: "#F0F0F0" }}>
        <span className="h-1 w-1 rounded-full" style={{ background: accent.icon }} />
        <span className="h-1 w-1 rounded-full bg-[#E2E2E2]" />
        <span className="h-1 w-1 rounded-full bg-[#E2E2E2]" />
        <span className="ml-1.5 h-1.5 w-14 rounded-full bg-[#F0F0F0]" />
      </div>
      <div className="space-y-1 p-2.5">
        <div className="h-2 w-3/5 rounded-full bg-[#111111]" />
        <div className="h-1.5 w-4/5 rounded-full bg-[#E5E5E5]" />
        <div className="mt-1.5 grid grid-cols-3 gap-1">
          <div className="h-5 rounded-sm" style={{ background: accent.iconBg }} />
          <div className="h-5 rounded-sm bg-[#F5F5F5]" />
          <div className="h-5 rounded-sm bg-[#111111]" />
        </div>
      </div>
    </div>
    {/* Phone, layered in front */}
    <div
      className="absolute bottom-2 right-3 z-20 w-[26%] rotate-[3deg] rounded-lg border bg-white p-1 shadow-[0_6px_20px_rgba(17,17,17,0.08)]"
      style={{ borderColor: accent.ring }}
    >
      <div className="mx-auto mb-1 h-0.5 w-3 rounded-full bg-[#E5E5E5]" />
      <div className="h-9 rounded-sm" style={{ background: accent.iconBg }} />
      <div className="mt-1 h-1 w-4/5 rounded-full bg-[#E5E5E5]" />
    </div>
    {/* Code chip */}
    <div className="absolute left-2 top-2 z-20 rounded-md border border-[#E2E2E2] bg-white px-1.5 py-1 font-mono text-[8px] text-[#888888] shadow-sm">
      <span style={{ color: accent.icon }}>&lt;/&gt;</span>
    </div>
  </div>
);

const GraphicsVisual: React.FC<{ accent: (typeof ACCENTS)["graphics"] }> = ({ accent }) => (
  <div className="relative flex h-full w-full items-center justify-center overflow-hidden p-3">
    <DotGrid />
    <div
      className="relative z-10 flex w-[48%] rotate-[-3deg] flex-col justify-between rounded-md border bg-white p-2.5 shadow-[0_6px_20px_rgba(17,17,17,0.06)]"
      style={{ borderColor: accent.ring }}
    >
      <span className="font-mono text-[8px] uppercase tracking-widest text-[#AAAAAA]">Aa</span>
      <span className="text-2xl font-semibold leading-none text-[#111111]">Aa</span>
      <div className="mt-1.5 flex gap-1">
        <span className="h-3 w-3 rounded-full bg-[#111111]" />
        <span className="h-3 w-3 rounded-full" style={{ background: accent.icon }} />
        <span className="h-3 w-3 rounded-full border border-[#D9D9D9] bg-white" />
      </div>
    </div>
    <div
      className="absolute bottom-3 right-2 z-20 flex w-[44%] rotate-[2deg] flex-col justify-between rounded-md border bg-[#111111] p-2.5 shadow-[0_6px_20px_rgba(17,17,17,0.1)]"
      style={{ borderColor: accent.ring }}
    >
      <div className="h-1.5 w-1/2 rounded-full bg-white/70" />
      <div className="my-1.5 flex items-end gap-1">
        <span className="h-6 w-1 bg-white/80" />
        <span className="h-3.5 w-1" style={{ background: accent.icon }} />
        <span className="h-8 w-1 bg-white/90" />
      </div>
    </div>
    <div className="absolute left-2 top-2 z-20 flex items-center gap-1 rounded-md border border-[#E2E2E2] bg-white px-1.5 py-1 shadow-sm">
      <span className="h-2 w-2 rounded-sm bg-[#111111]" />
      <span className="h-2 w-2 rounded-sm" style={{ background: accent.icon }} />
    </div>
  </div>
);

const VisitingLinkVisual: React.FC<{ accent: (typeof ACCENTS)["visitinglink"] }> = ({ accent }) => (
  <div className="relative flex h-full w-full items-center justify-center overflow-hidden p-3">
    <DotGrid />
    <div
      className="relative z-10 w-[42%] rotate-[-2deg] rounded-xl border bg-white p-2 shadow-[0_6px_20px_rgba(17,17,17,0.06)]"
      style={{ borderColor: accent.ring }}
    >
      <div className="mx-auto mb-1 h-0.5 w-4 rounded-full bg-[#E5E5E5]" />
      <div className="mx-auto mb-1 h-5 w-5 rounded-full" style={{ background: accent.iconBg }} />
      <div className="mx-auto mb-1 h-1 w-3/4 rounded-full bg-[#111111]" />
      <div className="mx-auto h-1 w-1/2 rounded-full bg-[#E5E5E5]" />
    </div>
    <div
      className="absolute bottom-2 right-2 z-20 grid w-[34%] rotate-[3deg] grid-cols-4 gap-[2px] rounded-md border bg-white p-2 shadow-[0_6px_20px_rgba(17,17,17,0.06)]"
      style={{ borderColor: accent.ring }}
    >
      {Array.from({ length: 16 }).map((_, i) => (
        <span
          key={i}
          className="aspect-square rounded-[1px]"
          style={{
            background: [0, 1, 2, 4, 6, 9, 11, 13, 14, 15].includes(i)
              ? "#111111"
              : "#F0F0F0",
          }}
        />
      ))}
    </div>
    <div
      className="absolute left-2 top-2 z-20 flex items-center gap-1 rounded-full border bg-white px-2 py-1 font-mono text-[8px] text-[#888888] shadow-sm"
      style={{ borderColor: accent.ring }}
    >
      <span className="h-1 w-1 rounded-full" style={{ background: accent.icon }} />
      Share
    </div>
  </div>
);

const VISUALS: Record<AccentKey, React.FC<{ accent: (typeof ACCENTS)[AccentKey] }>> = {
  web: WebDevVisual,
  graphics: GraphicsVisual,
  visitinglink: VisitingLinkVisual,
};

interface ServiceCardProps {
  card: ServiceCardCopy;
  idx: number;
  onSelectService: (service: ServiceItem) => void;
  onNavigateService: (serviceId: string) => void;
  animate?: boolean;
  className?: string;
  uniformMobileHeight?: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  card,
  idx,
  onSelectService,
  onNavigateService,
  animate = true,
  className = "",
  uniformMobileHeight = false,
}) => {
  const accent = ACCENTS[card.accent];
  const Visual = VISUALS[card.accent];
  const Icon = card.Icon;
  const serviceId = resolveServiceId(card.matchKeyword, card.title);
  const fullServiceRecord = SERVICES_DATA.find((s) => s.id === serviceId);

  const cardContent = (
    <>
      <div>
        <div
          className="flex h-10 w-10 items-center justify-center rounded-lg"
          style={{ background: accent.iconBg }}
        >
          <span style={{ color: accent.icon }}>
            <Icon className="h-5 w-5" strokeWidth={1.8} />
          </span>
        </div>

        <h3
          className={`mt-5 text-2xl font-semibold tracking-tight text-[#111111] md:text-[26px] ${
            uniformMobileHeight ? "min-h-[3.5rem] leading-tight" : ""
          }`}
        >
          {card.title}
        </h3>

        <p
          className={`mt-2 text-sm leading-relaxed text-[#666666] md:text-[15px] ${
            uniformMobileHeight ? "min-h-[2.75rem]" : ""
          }`}
        >
          {card.description}
        </p>
      </div>

      <div
        className={`mt-7 flex gap-4 ${
          uniformMobileHeight
            ? "min-h-0 flex-1 items-stretch"
            : "flex-1 items-stretch"
        }`}
      >
        <ul className="flex w-[46%] flex-shrink-0 flex-col justify-center gap-2.5">
          {card.checklist.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 text-[13px] leading-snug text-[#444444]"
            >
              <Check
                className="mt-[1px] h-3.5 w-3.5 flex-shrink-0"
                style={{ color: accent.tick }}
                strokeWidth={2.5}
              />
              {item}
            </li>
          ))}
        </ul>

        <div
          className={`relative w-[54%] flex-shrink-0 overflow-hidden rounded-xl border transition-transform duration-300 group-hover:scale-[1.03] ${
            uniformMobileHeight ? "h-full min-h-[9.5rem]" : "aspect-square"
          }`}
          style={{ borderColor: accent.ring, background: "#FFFFFF" }}
        >
          <Visual accent={accent} />
        </div>
      </div>

      <button
        className={`inline-flex items-center gap-1.5 self-start text-sm font-medium text-[#111111] ${
          uniformMobileHeight ? "mt-auto shrink-0 pt-5" : "mt-7"
        }`}
        onClick={(e) => {
          e.stopPropagation();
          onNavigateService(serviceId);
        }}
      >
        Explore
        <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </button>
    </>
  );

  const sharedClassName = `group flex h-full cursor-pointer flex-col rounded-2xl border border-[#EBEBEB] p-7 transition-colors duration-300 hover:border-[#D0D0D0] hover:shadow-[0_10px_30px_rgba(17,17,17,0.05)] md:p-8 ${
    uniformMobileHeight ? "h-[500px]" : ""
  } ${className}`;

  if (!animate) {
    return (
      <div
        id={`service-card-${serviceId}`}
        onClick={() => {
          onNavigateService(serviceId);
          if (fullServiceRecord) onSelectService(fullServiceRecord);
        }}
        className={sharedClassName}
        style={{ background: accent.bg }}
      >
        {cardContent}
      </div>
    );
  }

  return (
    <motion.div
      id={`service-card-${serviceId}`}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.65,
        delay: 0.12 * idx,
        ease: [0.16, 1, 0.3, 1],
      }}
      onClick={() => {
        onNavigateService(serviceId);
        if (fullServiceRecord) onSelectService(fullServiceRecord);
      }}
      className={sharedClassName}
      style={{ background: accent.bg }}
    >
      {cardContent}
    </motion.div>
  );
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectService,
  onNavigateService,
  onNavigateContact,
}) => {
  const sectionHeader = (
    <>
      <h2 className="text-3xl font-medium leading-[1.08] tracking-tight text-[#111111] md:text-5xl lg:text-[56px]">
        Everything you need to build your digital presence.
      </h2>
      <p className="mt-4 max-w-xl text-sm font-normal leading-relaxed text-[#666666] md:mt-5 md:text-lg">
        From visual identity to websites and smart digital products, we bring
        design and technology together under one roof.
      </p>
    </>
  );

  return (
    <section
      id="services"
      className="w-full border-b border-[#F0F0F0] bg-white py-12 md:py-32"
    >
      <div className="mx-auto max-w-[90vw] px-0 md:px-12">
        {/* Desktop header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 hidden max-w-3xl md:block"
        >
          {sectionHeader}
        </motion.div>

        {/* Desktop cards */}
        <div className="hidden gap-5 md:grid md:grid-cols-3 md:gap-6">
          {CARD_COPY.map((card, idx) => (
            <ServiceCard
              key={card.title}
              card={card}
              idx={idx}
              onSelectService={onSelectService}
              onNavigateService={onNavigateService}
            />
          ))}
        </div>

        {/* Mobile: sticky heading + filmstrip cards */}
        <div className="-mx-6 md:hidden">
          <FilmstripScroller
            vhPerCard={50}
            stickyClassName="bg-white px-6 pb-6 pt-24"
            titleClassName="max-w-3xl"
            title={sectionHeader}
            trackGutterClassName="-mx-6"
            slideClassName="flex w-screen shrink-0 items-center justify-center px-4"
            slideKeys={CARD_COPY.map((card) => card.title)}
            slides={CARD_COPY.map((card, idx) => (
              <div key={card.title} className="mx-auto h-[500px] w-full max-w-sm">
                <ServiceCard
                  card={card}
                  idx={idx}
                  onSelectService={onSelectService}
                  onNavigateService={onNavigateService}
                  animate={false}
                  uniformMobileHeight
                  className="h-full w-full"
                />
              </div>
            ))}
          />
        </div>

        {/* Combined Scope Inquire Strip — unchanged from prior implementation */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 p-6 md:p-8 bg-[#FAFAFA] border border-[#F0F0F0] rounded-xl flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left"
        >
          <div>
            <div className="flex items-center gap-2 justify-center sm:justify-start mb-1">
              <span className="w-1.5 h-1.5 bg-[#111111]" />
              <p className="text-sm font-medium text-[#111111]">
                Need an integrated multi-discipline engagement?
              </p>
            </div>
            <p className="text-xs text-[#666666]">
              We architect unified packages combining VisitingLink identity,
              custom web engineering, and brand graphics.
            </p>
          </div>
          <button
            id="combined-services-inquiry-btn"
            onClick={() => onNavigateContact("Combined Digital Suite")}
            className="whitespace-nowrap px-6 py-3 bg-[#111111] text-white text-xs font-medium tracking-widest uppercase rounded-full hover:bg-[#333333] transition-colors cursor-pointer"
          >
            Inquire Combined Scope
          </button>
        </motion.div>
      </div>
    </section>
  );
};