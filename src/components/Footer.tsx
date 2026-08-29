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
  <div className="mt-2 flex w-full items-end justify-center overflow-hidden py-2 md:mt-3">
    <motion.p
      key={routeKey}
      initial={{ y: '100%', opacity: 0 }}
      animate={play ? { y: 0, opacity: 1 } : { y: '100%', opacity: 0 }}
      transition={{
        y: { duration: 1.4, ease: [0.22, 1, 0.36, 1] },
        opacity: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
      }}
      className="pointer-events-none w-[90vw] select-none whitespace-nowrap text-center text-[clamp(2.75rem,13.5vw,8.5rem)] font-semibold leading-[0.85] tracking-tighter text-[#3a3a3a]"
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
  const isFooterInView = useInView(footerRef, { amount: 1, once: true });

  return (
    <footer ref={footerRef} id="main-footer" className="relative z-20 w-full overflow-hidden border-t border-[#222222] bg-[#111111] text-white">
      <div className="mx-auto max-w-7xl px-6 pb-2 pt-6 md:px-12 md:pt-10">
        <div className="flex flex-col items-start justify-between gap-4 border-b border-[#222222] pb-5 sm:flex-row sm:items-center">
          <p className="max-w-xs text-xs leading-relaxed text-[#888888]">
            Creative technology studio — digital solutions, web platforms, and graphic systems.
          </p>
          <button
            onClick={() => onNavigateContact()}
            className="shrink-0 cursor-pointer bg-white px-6 py-2.5 text-[11px] font-semibold uppercase tracking-widest text-[#111111] transition-colors hover:bg-[#F0F0F0]"
          >
            Start a Project
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 border-b border-[#222222] py-5 md:grid-cols-4 md:gap-6 md:py-7">
          <div className="space-y-2">
            <h4 className="text-[11px] font-medium uppercase tracking-wider text-[#555555]">Pages</h4>
            <ul className="space-y-1.5">
              {[
                { label: 'About', page: 'about' },
                { label: 'Work', page: 'work' },
                { label: 'Contact', page: 'contact' },
              ].map((item) => (
                <li key={item.page}>
                  <button
                    onClick={() => onNavigatePage(item.page)}
                    className="cursor-pointer text-xs text-neutral-400 transition-colors hover:text-white"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="text-[11px] font-medium uppercase tracking-wider text-[#555555]">Services</h4>
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
                    className="inline-flex cursor-pointer items-center gap-1 text-xs text-neutral-400 transition-colors hover:text-white"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="h-2.5 w-2.5 text-[#555555]" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="text-[11px] font-medium uppercase tracking-wider text-[#555555]">Studio</h4>
            <p className="text-xs leading-relaxed text-neutral-400">
              San Francisco, CA
              <br />
              Global delivery
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-[11px] font-medium uppercase tracking-wider text-[#555555]">Connect</h4>
            <a
              href="mailto:hello@visitinglink.studio"
              className="block text-xs text-neutral-400 underline decoration-neutral-700 underline-offset-2 transition-colors hover:text-white"
            >
              hello@visitinglink.studio
            </a>
            <div className="flex items-center gap-3 text-xs text-[#666666]">
              {['X', 'LinkedIn', 'GitHub'].map((s) => (
                <a key={s} href="#" className="transition-colors hover:text-white">
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>

        <FooterWordmark play={isFooterInView} routeKey={pathname} />
      </div>
    </footer>
  );
};
