"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { 
  Globe, 
  Share2, 
  Briefcase, 
  Building2, 
  Sparkles, 
  Smartphone,
  FileText,
  Code,
  Palette,
  Zap,
  Network,
  Compass,
  Layers,
  ArrowUpRight
} from "lucide-react";

/**
 * Animated Counter component for numbers in statistics section with refined typography
 */
export const AnimatedCounter: React.FC<{
  value: number;
  suffix?: string;
  duration?: number;
  label: string;
  dark?: boolean;
}> = ({ value, suffix = "+", duration = 2, label, dark = false }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = value;
    const totalMs = duration * 1000;
    const incrementTime = 20;
    const steps = totalMs / incrementTime;
    const stepValue = (end - start) / steps;

    const timer = setInterval(() => {
      start += stepValue;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return (
    <div ref={ref} className="flex flex-col">
      <div className="flex items-baseline gap-1">
        <span className={`text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight font-sans ${dark ? 'text-white' : 'text-[#111111]'}`}>
          {count}
        </span>
        <span className="text-2xl sm:text-3xl md:text-4xl font-light text-[#FF6B58]">
          {suffix}
        </span>
      </div>
      <span className={`mt-2 text-xs sm:text-sm font-medium tracking-widest uppercase ${dark ? 'text-neutral-400' : 'text-[#666666]'}`}>
        {label}
      </span>
    </div>
  );
};

/**
 * Editorial Hero Graphic — Technical radar matrix & interactive signal node
 */
export const HeroEditorialGraphic: React.FC = () => {
  return (
    <div className="relative w-full aspect-[4/3] max-w-md mx-auto flex items-center justify-center p-4">
      {/* Background Subtle Pulsing Grid */}
      <div className="absolute inset-0 border border-[#E5E7EB] rounded-2xl bg-[#FAFAFA] overflow-hidden flex items-center justify-center">
        <svg className="w-full h-full opacity-40" viewBox="0 0 400 300" fill="none">
          <pattern id="heroGrid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#111111" strokeWidth="0.5" strokeDasharray="2 2" />
          </pattern>
          <rect width="400" height="300" fill="url(#heroGrid)" />
          
          {/* Concentric Circles */}
          <circle cx="200" cy="150" r="110" stroke="#111111" strokeWidth="0.8" strokeDasharray="3 3" />
          <circle cx="200" cy="150" r="70" stroke="#FF6B58" strokeWidth="1" />
          <circle cx="200" cy="150" r="30" stroke="#111111" strokeWidth="0.8" />
          
          {/* Animated Radar Line */}
          <motion.line
            x1="200" y1="150" x2="310" y2="150"
            stroke="#FF6B58" strokeWidth="1.5"
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "200px 150px" }}
          />

          {/* Coordinate Hairlines */}
          <line x1="40" y1="150" x2="360" y2="150" stroke="#111111" strokeWidth="0.5" strokeDasharray="4 4" />
          <line x1="200" y1="40" x2="200" y2="260" stroke="#111111" strokeWidth="0.5" strokeDasharray="4 4" />

          {/* Floating Data Markers */}
          <g transform="translate(140, 90)">
            <rect width="50" height="20" rx="3" fill="#111111" />
            <text x="25" y="13" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontFamily="sans-serif">8 YEARS</text>
          </g>

          <g transform="translate(230, 190)">
            <rect width="70" height="20" rx="3" fill="#FF6B58" />
            <text x="35" y="13" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontFamily="sans-serif">ECOSYSTEM</text>
          </g>
        </svg>

        {/* Central Core Signal */}
        <div className="absolute z-10 w-16 h-16 rounded-full bg-white border border-[#E5E7EB] shadow-md flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-[#111111] flex items-center justify-center text-white">
            <Compass className="w-4 h-4 text-[#FF6B58] animate-spin" style={{ animationDuration: "10s" }} />
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Foundation Interactive Visual Graphic — Demonstrates 5 core pillars of building
 */
export const FoundationGraphic: React.FC = () => {
  const pillars = [
    { title: "Creating Brands", desc: "Identity & Visual Language", icon: Palette },
    { title: "Designing Experiences", desc: "User Journeys & UI Design", icon: Sparkles },
    { title: "Building Tech", desc: "Web Platforms & Systems", icon: Code },
    { title: "Solving Challenges", desc: "Business Strategy & Logic", icon: Zap },
    { title: "Ideas into Reality", desc: "End-to-End Execution", icon: Layers },
  ];

  return (
    <div className="my-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {pillars.map((item, idx) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
            className="p-5 rounded-xl border border-[#F0F0F0] bg-[#FAFAFA] hover:border-[#111111] transition-all group"
          >
            <div className="w-9 h-9 rounded-lg bg-white border border-[#E5E7EB] text-[#111111] flex items-center justify-center mb-4 group-hover:border-[#FF6B58] group-hover:text-[#FF6B58] transition-colors">
              <Icon className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-medium text-[#111111] mb-1 group-hover:text-[#FF6B58] transition-colors">
              {item.title}
            </h4>
            <p className="text-xs text-[#666666] leading-relaxed">
              {item.desc}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
};

/**
 * Disconnected Identity Graphic — Horizontal / Vertical sequence of floating elements merging into VisitingLink
 */
export const DisconnectedIdentityGraphic: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "end 35%"],
  });

  const convergence = useTransform(scrollYProgress, [0.1, 0.7], [0, 1]);
  const nodeOffset1 = useTransform(convergence, [0, 1], [-50, 0]);
  const nodeOffset2 = useTransform(convergence, [0, 1], [50, 0]);
  const opacityDisconnected = useTransform(convergence, [0, 0.7], [1, 0.3]);
  const opacityUnified = useTransform(convergence, [0.4, 1], [0, 1]);
  const scaleCentral = useTransform(convergence, [0.3, 1], [0.9, 1.05]);

  const items = [
    { label: "Contact details", icon: Smartphone },
    { label: "Website", icon: Globe },
    { label: "Social Profiles", icon: Share2 },
    { label: "Portfolio", icon: Briefcase },
    { label: "Business Presence", icon: Building2 },
  ];

  return (
    <div ref={containerRef} className="my-10 py-10 px-4 border border-[#E5E7EB] rounded-2xl bg-[#FAFAFA] overflow-hidden shadow-sm">
      <div className="max-w-3xl mx-auto text-center mb-8">
        <motion.div style={{ opacity: opacityDisconnected }} className="text-xs font-mono tracking-widest text-[#FF6B58] uppercase mb-1 font-medium">
          BEFORE VISITINGLINK — DISCONNECTED PRESENCE
        </motion.div>
        <motion.div style={{ opacity: opacityUnified }} className="text-xs font-mono tracking-widest text-[#111111] uppercase mb-1 font-medium">
          WITH VISITINGLINK — UNIFIED IDENTITY HUB
        </motion.div>
      </div>

      <div className="relative min-h-[340px] flex items-center justify-center">
        {/* SVG Hairline Connecting Network */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 600 340">
          <g stroke="#E5E7EB" strokeWidth="1" strokeDasharray="4 4">
            <line x1="100" y1="70" x2="300" y2="170" />
            <line x1="500" y1="70" x2="300" y2="170" />
            <line x1="90" y1="270" x2="300" y2="170" />
            <line x1="510" y1="270" x2="300" y2="170" />
            <line x1="300" y1="40" x2="300" y2="170" />
          </g>
          <motion.circle
            cx="300"
            cy="170"
            r="100"
            fill="none"
            stroke="#FF6B58"
            strokeWidth="1.5"
            style={{ opacity: opacityUnified, scale: scaleCentral }}
          />
        </svg>

        {/* Central VisitingLink Hub */}
        <motion.div
          style={{ scale: scaleCentral, opacity: opacityUnified }}
          className="absolute z-20 w-36 h-36 rounded-full bg-[#111111] text-white flex flex-col items-center justify-center p-4 shadow-xl border border-[#FF6B58]"
        >
          <Sparkles className="w-5 h-5 text-[#FF6B58] mb-1 animate-pulse" />
          <span className="text-xs font-medium tracking-wider uppercase">VisitingLink</span>
          <span className="text-[10px] text-neutral-400 font-mono mt-0.5">Central Hub</span>
        </motion.div>

        {/* 5 Converging Floating Elements */}
        <div className="relative z-10 w-full h-full max-w-2xl grid grid-cols-1 sm:grid-cols-3 gap-6 items-center justify-items-center">
          <motion.div style={{ x: nodeOffset1, y: nodeOffset1 }} className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-[#E5E7EB] bg-white shadow-sm">
            <Smartphone className="w-4 h-4 text-[#FF6B58]" />
            <span className="text-xs font-medium text-[#111111]">{items[0].label}</span>
          </motion.div>

          <motion.div style={{ y: nodeOffset1 }} className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-[#E5E7EB] bg-white shadow-sm">
            <Globe className="w-4 h-4 text-[#FF6B58]" />
            <span className="text-xs font-medium text-[#111111]">{items[1].label}</span>
          </motion.div>

          <motion.div style={{ x: nodeOffset2, y: nodeOffset1 }} className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-[#E5E7EB] bg-white shadow-sm">
            <Share2 className="w-4 h-4 text-[#FF6B58]" />
            <span className="text-xs font-medium text-[#111111]">{items[2].label}</span>
          </motion.div>

          <motion.div style={{ x: nodeOffset1, y: nodeOffset2 }} className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-[#E5E7EB] bg-white shadow-sm">
            <Briefcase className="w-4 h-4 text-[#FF6B58]" />
            <span className="text-xs font-medium text-[#111111]">{items[3].label}</span>
          </motion.div>

          <motion.div style={{ x: nodeOffset2, y: nodeOffset2 }} className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-[#E5E7EB] bg-white shadow-sm sm:col-span-2 sm:col-start-2 justify-self-center">
            <Building2 className="w-4 h-4 text-[#FF6B58]" />
            <span className="text-xs font-medium text-[#111111]">{items[4].label}</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

/**
 * Expanding System Graphic for Section 5: Central VisitingLink identity expanding into 6 connected facets
 */
export const ExpandingSystemGraphic: React.FC = () => {
  const facets = [
    { title: "Contact", desc: "Phone, Email, Direct Channels", icon: Smartphone },
    { title: "Business", desc: "Company info, Services, Booking", icon: Building2 },
    { title: "Website", desc: "Custom Domain, Web Presence", icon: Globe },
    { title: "Social", desc: "All Social Media Networks", icon: Share2 },
    { title: "Portfolio", desc: "Work, Case Studies, Media", icon: Briefcase },
    { title: "Information", desc: "Bio, Documents, Resources", icon: FileText },
  ];

  return (
    <div className="my-10 p-6 md:p-8 rounded-2xl bg-white border border-[#E5E7EB] shadow-sm">
      <div className="text-center max-w-md mx-auto mb-8">
        <span className="px-3 py-1 bg-[#FF6B58]/10 text-[#FF6B58] text-xs font-mono rounded-full font-medium">
          CONNECTED ECOSYSTEM
        </span>
        <h4 className="text-lg md:text-xl font-medium tracking-tight mt-3 text-[#111111]">
          One Central Identity Expanding Everywhere
        </h4>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {facets.map((facet, idx) => {
          const Icon = facet.icon;
          return (
            <motion.div
              key={facet.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.06 }}
              className="p-5 rounded-xl border border-[#F0F0F0] bg-[#FAFAFA] hover:border-[#111111] transition-all group"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-[#111111] text-white flex items-center justify-center group-hover:bg-[#FF6B58] transition-colors">
                  <Icon className="w-4 h-4" />
                </div>
                <h5 className="font-medium text-sm text-[#111111]">
                  {facet.title}
                </h5>
              </div>
              <p className="text-xs text-[#666666] leading-relaxed">
                {facet.desc}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

/**
 * Next Chapter Graphic for Section 6 — Dark Technical Ecosystem Node Matrix
 */
export const DarkEcosystemGraphic: React.FC = () => {
  return (
    <div className="w-full py-6 flex items-center justify-center">
      <svg className="w-full max-w-2xl h-48 text-white/20" viewBox="0 0 600 200" fill="none">
        {/* Network Connection Lines */}
        <line x1="100" y1="100" x2="250" y2="60" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="250" y1="60" x2="400" y2="140" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="400" y1="140" x2="500" y2="80" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="100" y1="100" x2="400" y2="140" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />

        {/* Nodes */}
        <g transform="translate(100, 100)">
          <circle r="20" fill="#111111" stroke="#FF6B58" strokeWidth="1.5" />
          <text x="0" y="4" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontFamily="sans-serif">100+ DEV</text>
        </g>

        <g transform="translate(250, 60)">
          <circle r="20" fill="#111111" stroke="#FF6B58" strokeWidth="1.5" />
          <text x="0" y="4" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontFamily="sans-serif">100+ CRE</text>
        </g>

        <g transform="translate(400, 140)">
          <circle r="20" fill="#111111" stroke="#FF6B58" strokeWidth="1.5" />
          <text x="0" y="4" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontFamily="sans-serif">TECH</text>
        </g>

        <g transform="translate(500, 80)">
          <circle r="20" fill="#111111" stroke="#FF6B58" strokeWidth="1.5" />
          <text x="0" y="4" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontFamily="sans-serif">CONNECT</text>
        </g>
      </svg>
    </div>
  );
};
