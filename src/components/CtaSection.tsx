import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Mail, Clock } from 'lucide-react';

interface CtaSectionProps {
  onNavigateContact: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onNavigateContact }) => {
  return (
    <section
      id="contact"
      className="w-full bg-[#111111] text-white py-28 md:py-36 overflow-hidden relative border-t border-[#222222]"
    >
      <div className="max-w-5xl mx-auto px-6 md:px-12 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-8 max-w-3xl flex flex-col items-center"
        >
          {/* Main Headline */}
          <h2
            id="cta-section-heading"
            className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-white leading-[1.1]"
          >
            Have a project in mind?
          </h2>

          {/* Supporting Text */}
          <p
            id="cta-section-subtext"
            className="text-base sm:text-lg md:text-xl text-neutral-300 font-normal leading-relaxed max-w-xl mx-auto"
          >
            Let's create something thoughtful, useful and built around your goals.
          </p>

          {/* Primary CTA Button */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              id="cta-start-conversation-btn"
              onClick={onNavigateContact}
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-4 bg-white text-[#111111] text-sm font-medium tracking-wide transition-all duration-200 hover:bg-[#F0F0F0] active:scale-[0.99] cursor-pointer"
            >
              <span>Start a Conversation</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </div>

          {/* Minimalist Contact details */}
          <div className="pt-10 border-t border-[#2a2a2a] w-full flex flex-wrap items-center justify-center gap-8 text-xs text-[#888888]">
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-[#666666]" />
              <span className="font-mono">hello@visitinglink.studio</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#666666]" />
              <span>Response within 24 hours</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
