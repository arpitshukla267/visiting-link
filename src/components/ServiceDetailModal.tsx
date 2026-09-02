"use client";

import React, { memo, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { X, ArrowRight } from "lucide-react";
import { ServiceItem } from "../types";

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onInquireService: (serviceName: string) => void;
}

const MODAL_TRANSITION = {
  duration: 0.22,
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

      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.overflow = previousOverflow;
      };
    }, [service]);

    if (!mounted) return null;

    return createPortal(
      <AnimatePresence mode="wait">
        {service ? (
          <div
            key={service.id}
            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4 sm:p-6"
          >
            <motion.button
              type="button"
              aria-label="Close modal backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={MODAL_TRANSITION}
              onClick={onClose}
              className="fixed inset-0 cursor-default bg-black/60"
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="service-modal-title"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={MODAL_TRANSITION}
              className="relative z-10 w-full max-w-2xl transform-gpu overflow-hidden border border-[#E5E7EB] bg-white p-6 shadow-2xl sm:p-10"
            >
              <div className="flex items-start justify-between border-b border-[#F0F0F0] pb-6">
                <div>
                  <div className="mb-1.5 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 bg-[#111111]" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#999999]">
                      SPECIFICATION // {service.number}
                    </span>
                  </div>
                  <h3
                    id="service-modal-title"
                    className="mt-1 text-2xl font-medium tracking-tight text-[#111111] sm:text-3xl"
                  >
                    {service.title}
                  </h3>
                  <p className="mt-1 text-xs font-medium uppercase tracking-wider text-[#666666]">
                    {service.tagline}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="cursor-pointer p-2 text-[#777777] transition-colors hover:bg-[#F5F5F5] hover:text-black"
                  aria-label="Close Modal"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="max-h-[60vh] space-y-6 overflow-y-auto overscroll-contain py-6 pr-2">
                <div>
                  <h4 className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#999999]">
                    OVERVIEW
                  </h4>
                  <p className="text-sm font-normal leading-relaxed text-[#333333] sm:text-base">
                    {service.description}
                  </p>
                </div>

                <div>
                  <h4 className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[#999999]">
                    INCLUDED CAPABILITIES & SCOPE
                  </h4>
                  <ul className="space-y-2.5">
                    {service.detailedScope.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-sm text-[#555555]"
                      >
                        <span className="mt-1 flex h-3.5 w-3.5 shrink-0 items-center justify-center border border-[#E5E7EB] bg-[#FAFAFA]">
                          <span className="h-1.5 w-1.5 bg-[#111111]" />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[#999999]">
                    KEY DELIVERABLES
                  </h4>
                  <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {service.deliverables.map((deliv) => (
                      <div
                        key={deliv}
                        className="border border-[#EEEEEE] bg-[#FAFAFA] p-3 text-xs font-medium text-[#222222]"
                      >
                        • {deliv}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center justify-between gap-4 border-t border-[#F0F0F0] pt-6 sm:flex-row">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full cursor-pointer px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[#666666] transition-colors hover:text-black sm:w-auto"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onInquireService(service.title);
                  }}
                  className="inline-flex w-full cursor-pointer items-center justify-center gap-2 bg-[#111111] px-7 py-3.5 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-[#333333] sm:w-auto"
                >
                  <span>Inquire About {service.title}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
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
