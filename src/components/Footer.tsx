"use client";

import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { usePathname } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onNavigateContact: (serviceName?: string) => void;
  onNavigateService: (serviceId: string) => void;
  onNavigatePage: (page: string) => void;
}

const FooterWordmark: React.FC<{ play: boolean; routeKey: string }> = ({ play, routeKey }) => (
  <div className="overflow-hidden w-full flex justify-center items-end mt-4 md:mt-5">
    <motion.p
        key={routeKey}
        initial={{ y: '100%', opacity: 0 }}
        animate={play ? { y: 0, opacity: 1 } : { y: '100%', opacity: 0 }}
        transition={{
          y: { duration: 2.4, ease: [0.22, 1, 0.36, 1] },
          opacity: { duration: 2, ease: [0.22, 1, 0.36, 1] },
        }}
        className="text-[clamp(3.5rem,16vw,12rem)] font-semibold tracking-tighter leading-[0.85] text-center bg-gradient-to-r from-white/20 via-white/8 to-transparent bg-clip-text text-transparent select-none pointer-events-none whitespace-nowrap block [text-box-trim:trim-end] [text-box-edge:text-bottom]"
      >
        VisitingLink
    </motion.p>
  </div>
);

export const Footer: React.FC<FooterProps> = ({
  onNavigateContact,
  onNavigateService,
  onNavigatePage,
}) => {
  const pathname = usePathname();
  const footerRef = useRef<HTMLElement>(null);
  const isFooterFullyInView = useInView(footerRef, { amount: 1, once: false });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer ref={footerRef} id="main-footer" className="relative z-20 w-full bg-[#111111] text-white border-t border-[#222222] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-10 pb-0">
        {/* Top row */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5 pb-8 border-b border-[#222222]">
          <p className="text-[#888888] text-xs max-w-xs leading-relaxed">
            Creative technology studio — digital solutions, web platforms, and graphic systems.
          </p>
          <button
            onClick={() => onNavigateContact()}
            className="shrink-0 bg-white text-[#111111] px-6 py-2.5 text-[11px] font-semibold uppercase tracking-widest hover:bg-[#F0F0F0] transition-colors cursor-pointer"
          >
            Start a Project
          </button>
        </div>

        {/* Nav grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-7 border-b border-[#222222]">
          <div className="space-y-2.5">
            <h4 className="text-[11px] font-medium text-[#555555] uppercase tracking-wider">Pages</h4>
            <ul className="space-y-1.5">
              {[
                { label: 'About', page: 'about' },
                { label: 'Work', page: 'work' },
                { label: 'Contact', page: 'contact' },
              ].map((item) => (
                <li key={item.page}>
                  <button
                    onClick={() => onNavigatePage(item.page)}
                    className="text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2.5">
            <h4 className="text-[11px] font-medium text-[#555555] uppercase tracking-wider">Services</h4>
            <ul className="space-y-1.5">
              {[
                { label: 'VisitingLink', id: 'visitinglink' },
                { label: 'Web Development', id: 'web-development' },
                { label: 'Graphics', id: 'graphics' },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      onNavigateService(item.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer inline-flex items-center gap-1"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="w-2.5 h-2.5 text-[#555555]" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2.5">
            <h4 className="text-[11px] font-medium text-[#555555] uppercase tracking-wider">Studio</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              San Francisco, CA
              <br />
              Global delivery
            </p>
          </div>

          <div className="space-y-2.5">
            <h4 className="text-[11px] font-medium text-[#555555] uppercase tracking-wider">Connect</h4>
            <a
              href="mailto:hello@visitinglink.studio"
              className="text-xs text-neutral-400 hover:text-white transition-colors underline decoration-neutral-700 underline-offset-2 block"
            >
              hello@visitinglink.studio
            </a>
            <div className="flex items-center gap-3 text-xs text-[#666666]">
              {['X', 'LinkedIn', 'GitHub'].map((s) => (
                <a key={s} href="#" className="hover:text-white transition-colors">
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>

        <FooterWordmark play={isFooterFullyInView} routeKey={pathname} />

      </div>
    </footer>
  );
};
