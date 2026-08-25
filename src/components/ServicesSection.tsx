import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { SERVICES_DATA } from "../data/content";
import { ServiceItem } from "../types";
import { ScrollAssembleTypography } from "./ui/ScrollAssembleTypography";

interface ServicesSectionProps {
  onSelectService: (service: ServiceItem) => void;
  onNavigateService: (serviceId: string) => void;
  onNavigateContact: (serviceName?: string) => void;
}

/* ---------- Word-by-word scroll reveal, safe for multi-line paragraphs ---------- */
interface WordRevealProps {
  word: string;
  idx: number;
  total: number;
  progress: any;
}

const ScrollWordReveal: React.FC<WordRevealProps> = ({
  word,
  idx,
  total,
  progress,
}) => {
  const start = (idx / total) * 0.75;
  const end = start + (1 / total) * 0.9;

  const opacity = useTransform(progress, [start, end], [0.18, 1]);
  const y = useTransform(progress, [start, end], [6, 0]);

  return (
    <motion.span
      style={{ opacity, y, display: "inline-block" }}
      className="mr-[0.28em] last:mr-0 font-normal"
    >
      {word}
    </motion.span>
  );
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectService,
  onNavigateService,
  onNavigateContact,
}) => {
  const headingRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: descProgress } = useScroll({
    target: headingRef,
    offset: ["start 80%", "end 50%"],
  });
  const smoothDescProgress = useSpring(descProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const descriptionWords =
    "We operate across three core creative technology disciplines, providing specialized focus with unified brand cohesion.".split(
      " ",
    );

  return (
    <section
      id="services"
      className="w-full bg-white py-24 md:py-32 border-b border-[#F0F0F0]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Heading */}
        <div ref={headingRef} className="max-w-3xl mb-14 md:mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 bg-[#111111]" />
            <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#888888]">
              CORE PRACTICE AREAS
            </span>
          </div>

          {/* Default: tracking 0.2em, jaldi trigger */}
          <ScrollAssembleTypography
            phrase="Services built around your goals."
            className="text-4xl font-medium"
            startAt="start 95%"
            endAt="end 50%"
            tracking="0.15em"
          />

          {/* Late trigger, tighter tracking */}
          <ScrollAssembleTypography
            phrase="Crafted with precision"
            className="text-3xl font-semibold"
            startAt="start 95%"
            endAt="end 50%"
            tracking="0.15em"
          />

          <ScrollAssembleTypography
            phrase="We operate across three core creative technology disciplines, providing specialized focus with unified brand cohesion."
            className="mt-4 text-base text-[#666666] font-normal leading-relaxed"
            startAt="start 95%"
            endAt="end 50%"
            tracking="0.15em"
          />
        </div>

        {/* 3 Core Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SERVICES_DATA.map((service, idx) => (
            <motion.div
              key={service.id}
              id={`service-card-${service.id}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.6,
                delay: 0.1 * idx,
                ease: [0.16, 1, 0.3, 1],
              }}
              onClick={() => onNavigateService(service.id)}
              className="rounded-xl border border-[#EFEFEF] p-8 md:p-9 hover:border-[#D4D4D8] hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all duration-300 group cursor-pointer bg-white flex flex-col justify-between"
            >
              <div>
                {/* Service Number Tag */}
                <span className="inline-block text-[10px] font-mono font-medium tracking-widest text-[#999999] uppercase mb-6">
                  {service.number}
                </span>

                {/* Service Title */}
                <h3 className="text-xl font-medium text-[#111111] mb-2 tracking-tight group-hover:text-black transition-colors">
                  {service.title}
                </h3>

                {/* Tagline */}
                <p className="text-[11px] font-medium uppercase tracking-widest text-[#888888] mb-4">
                  {service.tagline}
                </p>

                {/* Description */}
                <p className="text-[#666666] text-sm leading-relaxed mb-2 font-normal">
                  {service.description}
                </p>

                {/* Extra professional context line */}
                <p className="text-[#999999] text-xs leading-relaxed mb-6 font-normal">
                  Scoped around clear outcomes, realistic timelines, and close
                  collaboration from first draft to final delivery.
                </p>

                {/* Deliverables snippet pills */}
                <div className="pt-4 border-t border-[#F5F5F5] flex flex-wrap gap-1.5">
                  {service.focusAreas.slice(0, 3).map((area, areaIdx) => (
                    <span
                      key={areaIdx}
                      className="inline-block text-[10px] font-medium text-[#555555] bg-[#FAFAFA] border border-[#EEEEEE] rounded-full px-2.5 py-0.5"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Combined Scope Inquire Strip */}
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
