"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  TrendingUp,
  Gift,
  UtensilsCrossed,
  Building2,
  Laptop,
  Smartphone,
  LogIn,
  Star,
  X,
  Check,
} from "lucide-react";
import Image from "next/image";
import { WORK_PROJECTS } from "../data/pages";

interface WorkPageProps {
  onNavigateHome: () => void;
  onNavigateContact: (serviceName?: string) => void;
}

type FilterKey =
  | "all"
  | "web-development"
  | "graphic-designing"
  | "company-profile"
  | "ui-ux";

const FILTER_OPTIONS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "web-development", label: "Web Development" },
  { key: "graphic-designing", label: "Graphic Designing" },
  { key: "company-profile", label: "Company Profile" },
  { key: "ui-ux", label: "UI/UX" },
];

/* -----------------------------------------------------------------------
 * Case study data — for client projects where a public URL can't be
 * shared. Keyed by project.id from WORK_PROJECTS. If a project's id has
 * a matching entry here, clicking it opens the modal instead of the url.
 * --------------------------------------------------------------------- */
interface CaseStudySection {
  heading: string;
  items: string[];
}

interface CaseStudy {
  projectId: string;
  tagline: string;
  projectType: string;
  role: string;
  technology: string;
  overview: string;
  sections: CaseStudySection[];
  techStack: { label: string; value: string }[];
  screenshots: string[];
  confidentialityNote: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    projectId: "videha-overseas-crm",
    tagline: "Enterprise CRM & Business Operations Platform",
    projectType: "Internal Enterprise CRM",
    role: "Full-Stack Development",
    technology: "Next.js, TypeScript, Tailwind CSS, Node.js, Express, MongoDB, Mongoose",
    overview:
      "A full-stack CRM and business operations platform managing the complete customer lifecycle — from leads and quotations to orders, billing, finance, suppliers and shipments. Built around backend reliability, data integrity, role-based access control, scalable MongoDB usage and real-world business workflows.",
    sections: [
      {
        heading: "Core Modules",
        items: [
          "Lead Management",
          "Customer Management",
          "Quotation Management",
          "Order Management",
          "Billing & Invoice Management",
          "Finance & Reporting",
          "Supplier Management",
          "Shipment Management",
          "Documents & Activities",
          "CSV Import & Export",
          "Role-Based Access Control (RBAC)",
        ],
      },
      {
        heading: "Inbuilt Quotation Builder",
        items: [
          "Create quotations directly inside the CRM — no external tools or manual documents needed",
          "Add, edit and reorder line items with quantity, pricing and tax handling",
          "Auto-calculated totals, discounts and multi-currency support built into the same flow",
          "Generate ready-to-share quotation PDFs directly from the builder",
          "Quotations convert seamlessly into Orders, carrying line-item data forward without re-entry",
        ],
      },
      {
        heading: "Business Flow",
        items: [
          "Lead → Customer → Quotation → Order → Billing → Payment → Shipment → Delivery",
          "Order and billing states remain independent — an order can be Delivered while billing is Partially Paid",
          "Delivery never automatically marks an invoice as paid",
        ],
      },
      {
        heading: "MongoDB & Backend Reliability",
        items: [
          "Atomic updates ($inc, $set) for safe numeric and field updates",
          "Transactions for operations that must succeed or fail together",
          "Indexes on frequently searched/filtered fields — email, phone, customer code, supplier code, status, dates",
          "Unique constraints and duplicate-key handling for concurrent-write protection",
        ],
      },
      {
        heading: "Customer & Supplier Deduplication",
        items: [
          "Priority-based entity resolution for manual creation and CSV imports",
          "Matching by ID/code, normalized email, normalized phone, or company + name",
          "Values normalized before comparison (e.g. ABC@TEST.COM → abc@test.com)",
          "Ambiguous matches are flagged instead of silently creating duplicates",
        ],
      },
      {
        heading: "CSV Import System",
        items: [
          "Upload → Column Detection → Field Mapping → Preview & Validation → Existing Record Matching → Import",
          "Column aliases, field mapping, validation and duplicate detection",
          "Bulk import and CSV export support",
        ],
      },
      {
        heading: "Order & Billing",
        items: [
          "Order status: Draft, Confirmed, Processing, Shipped, Delivered, Cancelled",
          "Billing status: Pending, Partially Paid, Paid, Overdue, Void",
          "Tracks Total, Amount Paid, and Amount Due (Total − Amount Paid)",
          "Invoice PDFs reflect current payment state while retaining original transaction currency",
        ],
      },
      {
        heading: "Multi-Currency Finance",
        items: [
          "Tracks Original Amount, Original Currency, Exchange Rate Snapshot, and Reporting Amount in INR",
          "Finance reporting aggregates INR values only — avoids mixed-currency calculation errors",
        ],
      },
      {
        heading: "Role-Based Access Control",
        items: [
          "Authorization: User → Role → Permissions → Module / Action",
          "Permissions control View, Create, Edit and Delete per module",
          "Visibility rules restrict records by ownership, department or team scope",
        ],
      },
      {
        heading: "Concurrent Editing Protection",
        items: [
          "Revision/version-based optimistic concurrency control on important records",
          "A stale revision save is rejected with a conflict instead of silently overwriting newer data",
        ],
      },
    ],
    techStack: [
      { label: "Frontend", value: "Next.js, TypeScript, Tailwind CSS" },
      {
        label: "Backend",
        value:
          "Node.js, Express, REST APIs, Service-based architecture, Validation, RBAC",
      },
      {
        label: "Database",
        value:
          "MongoDB, Mongoose, Indexes, Atomic Updates, Transactions, Unique Constraints",
      },
      {
        label: "Data Management",
        value:
          "CSV Import/Export, Field Mapping, Validation, Entity Resolution, Duplicate Prevention",
      },
    ],
    screenshots: [
      "/crm/dashboard.webp",
      "/crm/orders.webp",
      "/crm/bills.webp",
      "/crm/reports.webp",
      "/crm/suppliers.webp",
      "/crm/quotations.webp",
      "/crm/quotation-builder.webp",
      "/crm/customers.webp",
      "/crm/leads.webp",
      "/crm/followups.webp",
      "/crm/RBAC.webp",
    ],
    confidentialityNote:
      "Live demo unavailable due to client confidentiality. Screenshots use redacted/sample data.",
  },
];

function getCaseStudy(projectId: string) {
  return CASE_STUDIES.find((cs) => cs.projectId === projectId);
}

/* -------------------------------------------------------------------- */

function CaseStudyModal({
  caseStudy,
  projectName,
  coverImage,
  onClose,
}: {
  caseStudy: CaseStudy;
  projectName: string;
  coverImage: string;
  onClose: () => void;
}) {
  const [showAllScreenshots, setShowAllScreenshots] = useState(false);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);

  useEffect(() => {
    const scrollY = window.scrollY;

    const originalBodyOverflow = document.body.style.overflow;
    const originalBodyPosition = document.body.style.position;
    const originalBodyTop = document.body.style.top;
    const originalBodyWidth = document.body.style.width;
    const originalHtmlOverflow = document.documentElement.style.overflow;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    return () => {
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.overflow = originalBodyOverflow;
      document.body.style.position = originalBodyPosition;
      document.body.style.top = originalBodyTop;
      document.body.style.width = originalBodyWidth;
      window.scrollTo(0, scrollY);
    };
  }, []);

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const el = e.currentTarget;
    el.scrollTop += e.deltaY;
  };

  const MAX_VISIBLE = 3;
  const visibleScreenshots = caseStudy.screenshots.slice(0, MAX_VISIBLE);
  const remainingCount = caseStudy.screenshots.length - MAX_VISIBLE;

  const openPreview = (index: number) => setPreviewIndex(index);
  const closePreview = () => setPreviewIndex(null);
  const showNext = () =>
    setPreviewIndex((i) =>
      i === null ? null : (i + 1) % caseStudy.screenshots.length,
    );
  const showPrev = () =>
    setPreviewIndex((i) =>
      i === null
        ? null
        : (i - 1 + caseStudy.screenshots.length) % caseStudy.screenshots.length,
    );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm md:p-8"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative flex h-[92vh] w-full max-w-6xl overflow-hidden rounded-2xl bg-white shadow-2xl flex-col md:flex-row"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/90 text-[#666666] shadow-sm transition-colors hover:bg-[#111111] hover:text-white"
          aria-label="Close case study"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Left — cover image + screenshots grid */}
        <div
          onWheel={handleWheel}
          className="w-full md:w-[45%] h-64 md:h-full shrink-0 overflow-y-auto bg-[#F7F7F7] p-4 md:p-6"
          style={{ overscrollBehavior: "contain" }}
        >
          <div className="flex flex-col gap-3">
            {/* Cover image — full width, on top */}
            <div className="relative w-full overflow-hidden rounded-xl bg-[#EDEDED] h-92">
              <Image
                src={coverImage}
                alt={projectName}
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                className="object-cover"
              />
            </div>

            {/* Screenshots — 2-column grid below, capped at 3 + "more" tile */}
            {caseStudy.screenshots.length > 0 ? (
              <div className="grid grid-cols-2 gap-3">
                {visibleScreenshots.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => openPreview(i)}
                    className="group relative h-32 w-full overflow-hidden rounded-xl bg-[#EDEDED] md:h-36 cursor-pointer"
                  >
                    <Image
                      src={src}
                      alt={`${projectName} screenshot ${i + 1}`}
                      fill
                      sizes="(max-width: 768px) 50vw, 22vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </button>
                ))}

                {/* 4th tile — "+N more" overlay, opens all-screenshots modal */}
                {remainingCount > 0 && (
                  <button
                    type="button"
                    onClick={() => setShowAllScreenshots(true)}
                    className="relative h-32 w-full overflow-hidden rounded-xl bg-[#EDEDED] md:h-36 cursor-pointer"
                  >
                    {caseStudy.screenshots[MAX_VISIBLE] && (
                      <Image
                        src={caseStudy.screenshots[MAX_VISIBLE]}
                        alt={`${projectName} more screenshots`}
                        fill
                        sizes="(max-width: 768px) 50vw, 22vw"
                        className="object-cover"
                      />
                    )}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/55 text-white">
                      <span className="text-lg font-medium">
                        +{remainingCount} more
                      </span>
                    </div>
                  </button>
                )}
              </div>
            ) : (
              <div className="flex h-32 items-center justify-center rounded-xl bg-[#EFEFEF] text-sm text-[#999999]">
                More screenshots coming soon
              </div>
            )}
          </div>
        </div>

        {/* Right — case study content, independently scrollable */}
        <div
          onWheel={handleWheel}
          className="flex-1 min-h-0 overflow-y-auto px-6 py-8 md:px-10 md:py-10"
          style={{ overscrollBehavior: "contain" }}
        >
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#999999]">
            Case Study
          </p>
          <h2 className="mt-3 text-2xl font-medium tracking-tight text-[#111111] md:text-3xl">
            {projectName}
          </h2>
          <p className="mt-2 text-[15px] text-[#666666]">{caseStudy.tagline}</p>

          {/* Meta grid */}
          <div className="mt-6 grid grid-cols-1 gap-4 border-y border-[#F0F0F0] py-6 sm:grid-cols-3">
            <div>
              <p className="text-xs uppercase tracking-wide text-[#999999]">
                Project Type
              </p>
              <p className="mt-1 text-sm text-[#111111]">
                {caseStudy.projectType}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-[#999999]">
                Role
              </p>
              <p className="mt-1 text-sm text-[#111111]">{caseStudy.role}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-[#999999]">
                Technology
              </p>
              <p className="mt-1 text-sm text-[#111111]">
                {caseStudy.technology}
              </p>
            </div>
          </div>

          {/* Overview */}
          <p className="mt-6 leading-relaxed text-[#444444]">
            {caseStudy.overview}
          </p>

          {/* Sections */}
          <div className="mt-8 space-y-8">
            {caseStudy.sections.map((section) => (
              <div key={section.heading}>
                <h3 className="text-sm font-medium tracking-tight text-[#111111]">
                  {section.heading}
                </h3>
                <ul className="mt-3 space-y-2">
                  {section.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm leading-relaxed text-[#666666]"
                    >
                      <Check
                        className="mt-[3px] h-3.5 w-3.5 flex-shrink-0 text-[#111111]"
                        strokeWidth={2.5}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Tech stack */}
          <div className="mt-8 border-t border-[#F0F0F0] pt-6">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-[#999999]">
              Technical Stack
            </p>
            <div className="space-y-2">
              {caseStudy.techStack.map((t) => (
                <p key={t.label} className="text-sm leading-relaxed">
                  <span className="font-medium text-[#111111]">
                    {t.label}:{" "}
                  </span>
                  <span className="text-[#666666]">{t.value}</span>
                </p>
              ))}
            </div>
          </div>

          {/* Confidentiality note */}
          <p className="mt-8 rounded-lg bg-[#FAFAFA] px-4 py-3 text-xs leading-relaxed text-[#999999]">
            {caseStudy.confidentialityNote}
          </p>
        </div>
      </motion.div>

      {/* All-screenshots modal */}
      <AnimatePresence>
        {showAllScreenshots && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[1100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
            onClick={(e) => {
              e.stopPropagation();
              setShowAllScreenshots(false);
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[85vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl md:p-8"
            >
              <button
                onClick={() => setShowAllScreenshots(false)}
                className="absolute right-5 top-5 z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-[#F5F5F5] text-[#666666] transition-colors hover:bg-[#111111] hover:text-white"
                aria-label="Close screenshots"
              >
                <X className="h-4 w-4" />
              </button>

              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#999999]">
                All Screenshots
              </p>
              <h3 className="mt-2 text-xl font-medium tracking-tight text-[#111111]">
                {projectName}
              </h3>

              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {caseStudy.screenshots.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => {
                      setShowAllScreenshots(false);
                      openPreview(i);
                    }}
                    className="group relative h-32 w-full overflow-hidden rounded-xl bg-[#EDEDED] cursor-pointer"
                  >
                    <Image
                      src={src}
                      alt={`${projectName} screenshot ${i + 1}`}
                      fill
                      sizes="33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full-preview lightbox */}
      <AnimatePresence>
        {previewIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[1200] flex items-center justify-center bg-black/90 p-4"
            onClick={(e) => {
              e.stopPropagation();
              closePreview();
            }}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                closePreview();
              }}
              className="absolute right-5 top-5 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              aria-label="Close preview"
            >
              <X className="h-5 w-5" />
            </button>

            {caseStudy.screenshots.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    showPrev();
                  }}
                  className="absolute left-4 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:left-8"
                  aria-label="Previous screenshot"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    showNext();
                  }}
                  className="absolute right-4 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:right-8"
                  aria-label="Next screenshot"
                >
                  <ArrowRight className="h-5 w-5" />
                </button>
              </>
            )}

            <motion.div
              key={previewIndex}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative h-[80vh] w-full max-w-5xl"
            >
              <Image
                src={caseStudy.screenshots[previewIndex]}
                alt={`${projectName} screenshot ${previewIndex + 1} full preview`}
                fill
                sizes="90vw"
                className="object-contain"
              />
            </motion.div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 text-xs text-white">
              {previewIndex + 1} / {caseStudy.screenshots.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* -------------------------------------------------------------------- */

export const WorkPage: React.FC<WorkPageProps> = ({
  onNavigateHome,
  onNavigateContact,
}) => {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const [activeCaseStudy, setActiveCaseStudy] = useState<{
    caseStudy: CaseStudy;
    projectName: string;
    coverImage: string;
  } | null>(null);

  const filtered =
    activeFilter === "all"
      ? WORK_PROJECTS
      : WORK_PROJECTS.filter((project) => {
          if (activeFilter === "web-development") {
            return project.discipline === "web";
          }

          if (activeFilter === "graphic-designing") {
            return project.discipline === "graphics";
          }

          if (activeFilter === "company-profile") {
            return project.discipline === "identity";
          }

          if (activeFilter === "ui-ux") {
            return project.discipline === "uiux";
          }

          return true;
        });

  const handleProjectClick = (project: (typeof WORK_PROJECTS)[number]) => {
    const caseStudy = getCaseStudy(project.id);
    if (caseStudy) {
      setActiveCaseStudy({
        caseStudy,
        projectName: project.name,
        coverImage: project.image,
      });
      return;
    }
    window.open(project.url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="w-full bg-white text-[#111111]">
      {/* Hero */}
      <section className="md:pt-24 pt-16 pb-10 border-b border-[#F0F0F0]">
        <div className="max-w-[95vw] md:max-w-[90vw] mx-auto px-4 md:px-12">
          <button
            onClick={onNavigateHome}
            className="inline-flex opacity-0 items-center gap-2 text-sm text-[#666666] hover:text-black transition-colors cursor-pointer mb-10"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div>
              <h1 className="text-4xl sm:text-5xl font-medium md:font-semibold tracking-tight leading-[1.1] max-w-xl">
                Real Projects.
                <br />
                <span className="text-[#B5B5B5]">Measurable Impact.</span>
              </h1>
              <p className="mt-5 text-[#777777] leading-relaxed max-w-md">
                A selection of websites, applications and digital experiences
                we&apos;ve built for forward-thinking brands.
              </p>
            </div>
          </div>

          {/* Filters */}
          <div className="md:mt-10 mt-6 flex flex-wrap gap-2 hidden">
            {FILTER_OPTIONS.map((opt) => (
              <button
                key={opt.key}
                onClick={() => {
                  if (opt.key === "company-profile") {
                    window.open(
                      "https://social-offer.vercel.app/",
                      "_blank",
                      "noopener,noreferrer",
                    );
                    return;
                  }
                  setActiveFilter(opt.key);
                }}
                className={`px-5 py-2 text-sm font-medium rounded-full transition-all cursor-pointer ${
                  activeFilter === opt.key
                    ? "bg-[#111111] text-white"
                    : "text-[#666666] border border-[#E5E7EB] hover:border-[#111111] hover:text-[#111111]"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Project grid */}
      <section className="md:py-14 py-8">
        <div className="max-w-[95vw] md:max-w-[90vw] mx-auto md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filtered.map((project, idx) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.45,
                  delay: idx * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group cursor-pointer"
                onClick={() => handleProjectClick(project)}
              >
                {/* Image section - rounded top */}
                <div className="relative h-80 overflow-hidden rounded-t-2xl bg-[#f3f3f3]">
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />

                  {/* subtle overlay */}
                  <div className="absolute inset-0 bg-black/[0.03] transition-colors duration-500 group-hover:bg-black-0" />
                </div>

                {/* Content section - rounded bottom */}
                <div className="rounded-b-2xl border border-t-0 border-[#EFEFEF] md:px-6 px-4 md:py-5 py-3 flex items-center justify-between bg-white group-hover:bg-[#FAFAFA] transition-colors">
                  <div>
                    <p className="text-[15px] font-medium text-[#111111]">
                      {project.name}
                    </p>
                    <p className="text-sm text-[#999999] mt-0.5">
                      {project.category}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[#111111] shrink-0 ml-4">
                    {getCaseStudy(project.id) ? "View Case Study" : "View Project"}
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-28 bg-[#111111] text-white border-t border-[#222222]">
        <div className="max-w-[95vw] md:max-w-[90vw] mx-auto px-4 md:px-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight">
              Have a project in mind?
            </h2>
            <p className="mt-3 text-neutral-400 max-w-md">
              We would like to hear about it. Every inquiry gets a personal
              response.
            </p>
          </div>
          <button
            onClick={() => onNavigateContact()}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-[#111111] text-sm font-medium hover:bg-[#F0F0F0] transition-colors cursor-pointer shrink-0 rounded-full"
          >
            <span>Get in touch</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>
      </section>

      {/* Case study modal */}
      <AnimatePresence>
        {activeCaseStudy && (
          <CaseStudyModal
            caseStudy={activeCaseStudy.caseStudy}
            projectName={activeCaseStudy.projectName}
            coverImage={activeCaseStudy.coverImage}
            onClose={() => setActiveCaseStudy(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};