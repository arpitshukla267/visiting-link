"use client";

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ArrowRight, Mail } from "lucide-react";
import { ProjectInquiry } from "../types";

interface ContactPageProps {
  onNavigateHome: () => void;
  initialService?: string;
}

const CONTACT_EMAIL = "info.visitinglink@gmail.com";
const CONTACT_PHONE_DISPLAY = "+91 92365 53585";
const CONTACT_PHONE_E164 = "919236553585";
const WHATSAPP_URL = `https://wa.me/${CONTACT_PHONE_E164}`;

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export const ContactPage: React.FC<ContactPageProps> = ({
  onNavigateHome,
  initialService = "VisitingLink",
}) => {
  const [formData, setFormData] = useState<ProjectInquiry>({
    name: "",
    email: "",
    company: "",
    service: initialService,
    budgetRange: "",
    timeframe: "1 – 2 Months",
    details: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, service: initialService }));
  }, [initialService]);

  const servicesList = [
    "Company Profile",
    "VisitingLink",
    "Web Development",
    "Graphics",
    "UI/UX",
    "Combined Digital Suite",
  ];
  const budgetPresets = [
    "₹25,000 – ₹50,000",
    "₹50,000 – ₹1,00,000",
    "₹1,00,000 – ₹3,00,000",
    "₹3,00,000+",
  ];
  const timeframeOptions = [
    "Immediate (< 1 mo)",
    "1 – 2 Months",
    "2 – 4 Months",
    "Flexible",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 600);
  };

  return (
    <div className="min-h-screen w-full bg-white text-[#111111]">
      {/* Header band */}
      <section className="relative overflow-hidden bg-[#0A0A0C] pb-20 pt-28 text-white md:pb-28">
        <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 opacity-[0.03]">
          <svg
            className="h-full w-full"
            viewBox="0 0 600 400"
            fill="none"
            aria-hidden
          >
            <circle
              cx="500"
              cy="100"
              r="200"
              stroke="white"
              strokeWidth="1"
            />
            <circle
              cx="500"
              cy="100"
              r="120"
              stroke="white"
              strokeWidth="1"
            />
            <line
              x1="0"
              y1="350"
              x2="600"
              y2="350"
              stroke="white"
              strokeWidth="1"
            />
            <line
              x1="300"
              y1="0"
              x2="300"
              y2="400"
              stroke="white"
              strokeWidth="1"
            />
          </svg>
        </div>
         
        <div className="opacity-0 relative max-w-7xl mx-auto px-6 md:px-12">
          <button
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors cursor-pointer mb-12"
          >
            <span>Back</span>
          </button>
        </div>

        <div className="relative mx-auto max-w-7xl px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl font-medium leading-[1.08] tracking-tight sm:text-5xl md:text-6xl">
              {submitted ? "Thank you" : "Let's talk about your project"}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-neutral-400">
              {submitted
                ? `We've received your inquiry and will respond to ${formData.email} within one business day.`
                : "Tell us what you are building. We review every inquiry personally and respond within 24 hours."}
            </p>
          </motion.div>
        </div>
      </section>

      {submitted ? (
        <section className="py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-6 text-center md:px-12">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center border-2 border-[#111111]">
                <div className="h-3 w-3 bg-[#111111]" />
              </div>
              <p className="mx-auto max-w-md leading-relaxed text-[#666666]">
                A principal at VisitingLink will review your brief and follow up
                with next steps. In the meantime, feel free to explore our work.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
                <button
                  onClick={onNavigateHome}
                  className="cursor-pointer bg-[#111111] px-8 py-4 text-sm font-medium text-white transition-colors hover:bg-[#333333]"
                >
                  Return home
                </button>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: "",
                      email: "",
                      company: "",
                      service: initialService,
                      budgetRange: "",
                      timeframe: "1 – 2 Months",
                      details: "",
                    });
                  }}
                  className="cursor-pointer border border-[#E5E7EB] px-8 py-4 text-sm font-medium transition-colors hover:border-black"
                >
                  Send another inquiry
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      ) : (
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-6 md:px-12">
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1.4fr] lg:gap-24">
              {/* Direct channels */}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="space-y-12"
              >
                <div>
                  <h2 className="mb-4 text-xl font-medium tracking-tight">
                    Contact
                  </h2>
                  <div className="space-y-3">
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="group flex items-center gap-3 text-lg text-[#666666] transition-colors hover:text-[#111111]"
                    >
                      <Mail className="h-5 w-5 shrink-0 text-[#888888] transition-colors group-hover:text-[#111111]" />
                      <span>{CONTACT_EMAIL}</span>
                    </a>
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 text-lg text-[#666666] transition-colors hover:text-[#111111]"
                    >
                      <WhatsAppIcon className="h-5 w-5 shrink-0 text-[#888888] transition-colors group-hover:text-[#111111]" />
                      <span>{CONTACT_PHONE_DISPLAY}</span>
                    </a>
                  </div>
                </div>

                <div>
                  <p className="leading-relaxed text-[#666666]">
                    Currently accepting new projects.
                    <br />
                    Typical response time: under 24 hours.
                  </p>
                </div>

                <div className="border-t border-[#F0F0F0] pt-8">
                  <p className="text-sm leading-relaxed text-[#888888]">
                    All inquiries are treated confidentially. We never share
                    project details or use your information for marketing.
                  </p>
                </div>
              </motion.div>

              {/* Form */}
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                onSubmit={handleSubmit}
                className="space-y-8"
              >
                <div>
                  <p className="mb-3 text-sm text-[#777777]">
                    Service of interest
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {servicesList.map((svc) => (
                      <button
                        type="button"
                        key={svc}
                        onClick={() =>
                          setFormData({ ...formData, service: svc })
                        }
                        className={`cursor-pointer px-4 py-3 text-left text-sm font-medium border transition-all ${
                          formData.service === svc
                            ? "border-[#111111] bg-[#111111] text-white"
                            : "border-[#E5E7EB] text-[#444444] hover:border-[#111111]"
                        }`}
                      >
                        {svc}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full border-0 border-b border-[#E5E7EB] bg-transparent px-0 py-3 text-[#111111] placeholder:text-[#BBBBBB] transition-colors focus:border-black focus:outline-none"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      required
                      placeholder="Email address"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full border-0 border-b border-[#E5E7EB] bg-transparent px-0 py-3 text-[#111111] placeholder:text-[#BBBBBB] transition-colors focus:border-black focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <input
                      type="text"
                      placeholder="Company (optional)"
                      value={formData.company}
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
                      className="w-full border-0 border-b border-[#E5E7EB] bg-transparent px-0 py-3 text-[#111111] placeholder:text-[#BBBBBB] transition-colors focus:border-black focus:outline-none"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Budget in ₹ (optional)"
                      value={formData.budgetRange ?? ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          budgetRange: e.target.value,
                        })
                      }
                      className="w-full border-0 border-b border-[#E5E7EB] bg-transparent px-0 py-3 text-[#111111] placeholder:text-[#BBBBBB] transition-colors focus:border-black focus:outline-none"
                    />
                    <div className="mt-3 flex flex-wrap gap-2">
                      {budgetPresets.map((preset) => (
                        <button
                          type="button"
                          key={preset}
                          onClick={() =>
                            setFormData({ ...formData, budgetRange: preset })
                          }
                          className={`cursor-pointer border px-3 py-1.5 text-xs transition-all ${
                            formData.budgetRange === preset
                              ? "border-[#111111] bg-[#111111] text-white"
                              : "border-[#E5E7EB] text-[#555555] hover:border-[#111111]"
                          }`}
                        >
                          {preset}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <p className="mb-3 text-sm text-[#777777]">Timeline</p>
                  <div className="flex flex-wrap gap-2">
                    {timeframeOptions.map((time) => (
                      <button
                        type="button"
                        key={time}
                        onClick={() =>
                          setFormData({ ...formData, timeframe: time })
                        }
                        className={`cursor-pointer border px-4 py-2 text-sm transition-all ${
                          formData.timeframe === time
                            ? "border-[#111111] bg-[#111111] text-white"
                            : "border-[#E5E7EB] text-[#555555] hover:border-[#111111]"
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your project — goals, current situation, and what success looks like"
                    value={formData.details}
                    onChange={(e) =>
                      setFormData({ ...formData, details: e.target.value })
                    }
                    className="w-full resize-none border-0 border-b border-[#E5E7EB] bg-transparent px-0 py-3 text-[#111111] placeholder:text-[#BBBBBB] transition-colors focus:border-black focus:outline-none"
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group inline-flex cursor-pointer items-center gap-3 bg-[#111111] px-10 py-4 text-sm font-medium text-white transition-colors hover:bg-[#333333] disabled:opacity-50"
                  >
                    <span>{isSubmitting ? "Sending..." : "Send inquiry"}</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </button>
                </div>
              </motion.form>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
