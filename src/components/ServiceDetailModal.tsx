"use client";

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, ArrowRight } from 'lucide-react';
import { ServiceItem } from '../types';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onInquireService: (serviceName: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onInquireService,
}) => {
  if (!service) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 12 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-2xl bg-white border border-[#E5E7EB] p-6 sm:p-10 shadow-2xl overflow-hidden"
        >
          {/* Header Bar */}
          <div className="flex items-start justify-between border-b border-[#F0F0F0] pb-6">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-1.5 h-1.5 bg-[#111111]" />
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#999999]">
                  SPECIFICATION // {service.number}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-medium text-[#111111] tracking-tight mt-1">
                {service.title}
              </h3>
              <p className="text-xs font-medium uppercase tracking-wider text-[#666666] mt-1">
                {service.tagline}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[#777777] hover:text-black hover:bg-[#F5F5F5] transition-colors cursor-pointer"
              aria-label="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="py-6 space-y-6 max-h-[60vh] overflow-y-auto pr-2">
            <div>
              <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#999999] mb-2">
                OVERVIEW
              </h4>
              <p className="text-sm sm:text-base text-[#333333] font-normal leading-relaxed">
                {service.description}
              </p>
            </div>

            {/* Scope Details */}
            <div>
              <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#999999] mb-3">
                INCLUDED CAPABILITIES & SCOPE
              </h4>
              <ul className="space-y-2.5">
                {service.detailedScope.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-[#555555]">
                    <span className="mt-1 w-3.5 h-3.5 bg-[#FAFAFA] border border-[#E5E7EB] flex items-center justify-center shrink-0">
                      <div className="w-1.5 h-1.5 bg-[#111111]" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Deliverables */}
            <div>
              <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#999999] mb-3">
                KEY DELIVERABLES
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {service.deliverables.map((deliv, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-[#FAFAFA] border border-[#EEEEEE] text-xs font-medium text-[#222222]"
                  >
                    • {deliv}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-6 border-t border-[#F0F0F0] flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-3 text-xs font-semibold tracking-wider uppercase text-[#666666] hover:text-black transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onInquireService(service.title);
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#111111] text-white text-xs font-semibold tracking-wider uppercase hover:bg-[#333333] transition-colors cursor-pointer"
            >
              <span>Inquire About {service.title}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
