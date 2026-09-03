"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
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
  | "company-profile";

const FILTER_OPTIONS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "web-development", label: "Web Development" },
  { key: "graphic-designing", label: "Graphic Designing" },
  { key: "company-profile", label: "Company Profile" },
];

// type Project = {
//   id: string;
//   name: string;
//   category: string;
//   url: string;
//   image: string;
//   filters: FilterKey[];
// };

// const PROJECTS: Project[] = [
//   {
//     id: "videha-overseas",
//     name: "Videha Overseas",
//     category: "International Food Export",
//     url: "https://www.videhaoverseas.com/",
//     image:
//       "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1400&q=85",
//     filters: ["web-development"],
//   },
//   {
//     id: "sandora",
//     name: "Sandora",
//     category: "Digital Commerce Platform",
//     url: "https://www.sandora.in/",
//     image:
//       "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1400&q=85",
//     filters: ["web-development"],
//   },
//   {
//     id: "himvarsha",
//     name: "Himvarsha",
//     category: "Food & Beverage Brand",
//     url: "https://www.himvarshafoods.com/",
//     image:
//       "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1400&q=85",
//     filters: ["web-development"],
//   },
// ];

export const WorkPage: React.FC<WorkPageProps> = ({
  onNavigateHome,
  onNavigateContact,
}) => {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");

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
  
          return true;
        });

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
              <h1 className="text-4xl sm:text-5xl font-medium tracking-tight leading-[1.1] max-w-xl">
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
          <div className="md:mt-10 mt-6 flex flex-wrap gap-2">
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
        <div className="max-w-[95vw] md:max-w-[90vw] mx-auto px-4 md:px-12">
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
                onClick={() =>
                  window.open(project.url, "_blank", "noopener,noreferrer")
                }
              >
                {/* Image section - rounded top */}
                <div className="relative h-72 overflow-hidden rounded-t-2xl bg-[#f3f3f3]">
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
                <div className="rounded-b-2xl border border-t-0 border-[#EFEFEF] px-6 py-5 flex items-center justify-between bg-white group-hover:bg-[#FAFAFA] transition-colors">
                  <div>
                    <p className="text-[15px] font-medium text-[#111111]">
                      {project.name}
                    </p>
                    <p className="text-sm text-[#999999] mt-0.5">
                      {project.category}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[#111111] shrink-0 ml-4">
                    View Project
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
    </div>
  );
};
