import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { HeroCircuitTrace, HeroAmbientField } from "./ui/TechnicalDoodles";

interface HeroProps {
  onNavigateContact: () => void;
  onExploreServices: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onNavigateContact,
  onExploreServices,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const gridOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.3]);

  return (
    <section
      ref={containerRef}
      id="hero-section"
      className="relative min-h-[92vh] md:min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#0A0A0C]"
    >
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
      >
        {/* Drifting ambient orbs + perspective grid */}
        <HeroAmbientField />

        {/* Slow-rotating radial depth */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] md:w-[1100px] h-[600px] md:h-[750px] opacity-40"
          style={{
            background:
              "conic-gradient(from 180deg at 50% 50%, transparent 0deg, rgba(255,255,255,0.04) 60deg, transparent 120deg, rgba(255,255,255,0.03) 200deg, transparent 280deg, rgba(255,255,255,0.05) 340deg, transparent 360deg)",
          }}
        />

        {/* Central soft glow */}
        <motion.div
          animate={{ opacity: [0.35, 0.55, 0.35], scale: [1, 1.05, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] md:w-[900px] h-[500px] md:h-[650px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-700/20 via-neutral-950/30 to-transparent blur-3xl"
        />

        <motion.div style={{ opacity: gridOpacity }}>
          <HeroCircuitTrace />
        </motion.div>

        {/* Vignette + bottom fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-[#0A0A0C]/20 to-[#0A0A0C]/85" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#0A0A0C_100%)] opacity-70" />
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity }}
        className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 pt-32 pb-20 text-center flex flex-col items-center"
      >
        <motion.h1
          id="hero-headline"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-medium text-white tracking-tight leading-[1.08] max-w-4xl"
        >
          Digital experiences built to move businesses forward.
        </motion.h1>

        <motion.p
          id="hero-subtext"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 md:mt-8 text-base sm:text-lg md:text-xl text-neutral-300 font-normal leading-relaxed max-w-xl text-balance"
        >
          We combine digital solutions, development and creative design to help
          businesses build a stronger online presence.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-5 sm:gap-8 w-full sm:w-auto"
        >
          <button
            id="hero-primary-cta"
            onClick={onNavigateContact}
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-[#111111] text-sm font-medium tracking-wide transition-all duration-200 hover:bg-[#F0F0F0] active:scale-[0.99] cursor-pointer"
          >
            <span>Let's Work Together</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </button>

          <button
            id="hero-secondary-cta"
            onClick={onExploreServices}
            className="group text-sm font-medium text-white border-b border-white/80 hover:border-white pb-1 transition-all duration-200 cursor-pointer inline-flex items-center gap-1.5"
          >
            <span>Explore Services</span>
            <span className="text-xs transition-transform duration-200 group-hover:translate-y-0.5">
              ↓
            </span>
          </button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2 text-white/50 hover:text-white/80 cursor-pointer transition-colors"
        onClick={onExploreServices}
      >
        <span className="text-[10px] font-medium tracking-[0.2em] uppercase font-mono">
          Scroll
        </span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </motion.div>
    </section>
  );
};
