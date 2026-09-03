"use client";

import React, { memo, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { ServiceItem } from "../types";

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onInquireService: (serviceName: string) => void;
}

const MODAL_TRANSITION = {
  duration: 0.28,
  ease: [0.22, 1, 0.36, 1] as const,
};

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = memo(
  ({ service, onClose, onInquireService }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
    }, []);

    useEffect(() => {
      if (!service) return;

      const lenis = (window as Window & { __lenis?: any }).__lenis;
      if (lenis) lenis.stop();

      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.overflow = previousOverflow;
        if (lenis) lenis.start();
      };
    }, [service]);

    if (!mounted) return null;

    return createPortal(
      <AnimatePresence mode="wait">
        {service ? (
          <div
            key={service.id}
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-4 sm:p-6"
            data-lenis-prevent
          >
            <motion.button
              type="button"
              aria-label="Close"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={MODAL_TRANSITION}
              onClick={onClose}
              className="fixed inset-0 cursor-default bg-[#111111]/50 backdrop-blur-[2px]"
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="service-modal-title"
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.99 }}
              transition={MODAL_TRANSITION}
              className="relative z-10 flex w-full max-w-2xl transform-gpu flex-col overflow-hidden bg-white shadow-[0_30px_80px_-20px_rgba(0,0,0,0.35)]"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-6 px-7 pt-8 sm:px-10 sm:pt-10">
                <div className="flex items-baseline gap-4">
                  <span className="text-[13px] font-medium text-[#C7C2BA] tabular-nums">
                    {service.number}
                  </span>
                  <div>
                    <h3
                      id="service-modal-title"
                      className="text-[26px] font-medium leading-[1.1] tracking-tight text-[#111111] sm:text-[32px]"
                    >
                      {service.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-[#8A8A8A]">
                      {service.tagline}
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="-mr-1 -mt-1 shrink-0 cursor-pointer rounded-full p-2 text-[#9A9A9A] transition-colors hover:bg-[#F5F5F5] hover:text-[#111111]"
                  aria-label="Close"
                >
                  <X className="h-[18px] w-[18px]" strokeWidth={1.75} />
                </button>
              </div>

              {/* Body */}
              <div
                className="mt-7 max-h-[56vh] overflow-y-auto overscroll-contain px-7 pb-2 sm:px-10"
                data-lenis-prevent
              >
                <p className="max-w-[52ch] text-[15px] leading-relaxed text-[#3A3A3A]">
                  {service.description}
                </p>

                <div className="mt-8 border-t border-[#EFEDE9] pt-6">
                  <p className="mb-4 text-sm text-[#8A8A8A]">What's covered</p>
                  <ul className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
                    {service.detailedScope.map((item) => (
                      <li
                        key={item}
                        className="border-l-2 border-[#EFEDE9] py-0.5 pl-3.5 text-sm leading-snug text-[#4A4A4A]"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-7 border-t border-[#EFEDE9] pt-6 pb-6">
                  <p className="mb-4 text-sm text-[#8A8A8A]">What you get</p>
                  <div className="flex flex-wrap gap-2">
                    {service.deliverables.map((deliv) => (
                      <span
                        key={deliv}
                        className="rounded-full border border-[#EFEDE9] bg-[#FAF9F7] px-3.5 py-1.5 text-[13px] font-medium text-[#333333]"
                      >
                        {deliv}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex flex-col-reverse gap-3 border-t border-[#EFEDE9] px-7 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-10">
                <button
                  type="button"
                  onClick={onClose}
                  className="cursor-pointer text-sm font-medium text-[#8A8A8A] transition-colors hover:text-[#111111]"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => onInquireService(service.title)}
                  className="cursor-pointer bg-[#111111] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#FF6B58]"
                >
                  Start with this service
                </button>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>,
      document.body,
    );
  },
);

ServiceDetailModal.displayName = "ServiceDetailModal";
