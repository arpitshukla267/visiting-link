"use client";

import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Mail, Clock } from 'lucide-react';

interface CtaSectionProps {
  onNavigateContact: () => void;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export const CtaSection: React.FC<CtaSectionProps> = ({ onNavigateContact }) => {
  return (
    <section
      id="contact"
      className="w-full bg-[#111111] text-white py-28 md:py-36 overflow-hidden relative border-t border-[#222222]"
    >
      {/* Background depth: soft radial glow + faint grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            'radial-gradient(600px circle at 50% 0%, rgba(255,255,255,0.06), transparent 70%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="max-w-5xl mx-auto px-6 md:px-12 text-center flex flex-col items-center relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={containerVariants}
          className="space-y-8 max-w-3xl flex flex-col items-center"
        >
          {/* Eyebrow */}
          <motion.span
            variants={itemVariants}
            className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#777777]"
          >
            Let's talk
          </motion.span>

          {/* Main Headline */}
          <motion.h2
            id="cta-section-heading"
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight leading-[1.1] bg-gradient-to-b from-white to-[#a3a3a3] bg-clip-text text-transparent"
          >
            Have a project in mind?
          </motion.h2>

          {/* Supporting Text */}
          <motion.p
            id="cta-section-subtext"
            variants={itemVariants}
            className="text-base sm:text-lg md:text-xl text-neutral-300 font-normal leading-relaxed max-w-xl mx-auto"
          >
            Let's create something thoughtful, useful and built around your goals.
          </motion.p>

          {/* Primary CTA Button */}
          <motion.div
            variants={itemVariants}
            className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              id="cta-start-conversation-btn"
              onClick={onNavigateContact}
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-4 bg-white text-[#111111] text-sm font-medium tracking-wide rounded-full transition-all duration-300 hover:bg-[#F0F0F0] hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] active:scale-[0.97] cursor-pointer"
            >
              <span>Start a Conversation</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </button>
          </motion.div>

          {/* Minimalist Contact details */}
          <motion.div
            variants={itemVariants}
            className="pt-10 border-t border-[#2a2a2a] w-full flex flex-wrap items-center justify-center gap-8 text-xs text-[#888888]"
          >
            <a
              href="mailto:hello@visitinglink.studio"
              className="flex items-center gap-2 transition-colors duration-200 hover:text-white"
            >
              <Mail className="w-3.5 h-3.5 text-[#666666]" />
              <span className="font-mono">hello@visitinglink.studio</span>
            </a>
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#666666]" />
              <span>Response within 24 hours</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};