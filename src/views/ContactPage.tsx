"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { ProjectInquiry } from '../types';

interface ContactPageProps {
  onNavigateHome: () => void;
  initialService?: string;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  onNavigateHome,
  initialService = 'VisitingLink',
}) => {
  const [formData, setFormData] = useState<ProjectInquiry>({
    name: '',
    email: '',
    company: '',
    service: initialService,
    budgetRange: '$5k – $15k',
    timeframe: '1 – 2 Months',
    details: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, service: initialService }));
  }, [initialService]);

  const servicesList = [
    'VisitingLink',
    'Web Development',
    'Graphics',
    'Combined Digital Suite',
  ];
  const budgetOptions = ['$3k – $5k', '$5k – $15k', '$15k – $30k', '$30k+'];
  const timeframeOptions = ['Immediate (< 1 mo)', '1 – 2 Months', '2 – 4 Months', 'Flexible'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 600);
  };

  return (
    <div className="w-full bg-white text-[#111111] min-h-screen">
      {/* Header band */}
      <section className="relative bg-[#0A0A0C] text-white pt-28 pb-20 md:pb-28 overflow-hidden">
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-[0.03] pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 600 400" fill="none" aria-hidden>
            <circle cx="500" cy="100" r="200" stroke="white" strokeWidth="1" />
            <circle cx="500" cy="100" r="120" stroke="white" strokeWidth="1" />
            <line x1="0" y1="350" x2="600" y2="350" stroke="white" strokeWidth="1" />
            <line x1="300" y1="0" x2="300" y2="400" stroke="white" strokeWidth="1" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 md:px-12">
          <button
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors cursor-pointer mb-12"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight leading-[1.08]">
              {submitted ? 'Thank you' : "Let's talk about your project"}
            </h1>
            <p className="mt-5 text-lg text-neutral-400 leading-relaxed">
              {submitted
                ? `We've received your inquiry and will respond to ${formData.email} within one business day.`
                : 'Tell us what you are building. We review every inquiry personally and respond within 24 hours.'}
            </p>
          </motion.div>
        </div>
      </section>

      {submitted ? (
        <section className="py-24 md:py-32">
          <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div className="w-16 h-16 border-2 border-[#111111] mx-auto flex items-center justify-center">
                <div className="w-3 h-3 bg-[#111111]" />
              </div>
              <p className="text-[#666666] max-w-md mx-auto leading-relaxed">
                A principal at VisitingLink will review your brief and follow up
                with next steps. In the meantime, feel free to explore our work.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <button
                  onClick={onNavigateHome}
                  className="px-8 py-4 bg-[#111111] text-white text-sm font-medium hover:bg-[#333333] transition-colors cursor-pointer"
                >
                  Return home
                </button>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      email: '',
                      company: '',
                      service: initialService,
                      budgetRange: '$5k – $15k',
                      timeframe: '1 – 2 Months',
                      details: '',
                    });
                  }}
                  className="px-8 py-4 border border-[#E5E7EB] text-sm font-medium hover:border-black transition-colors cursor-pointer"
                >
                  Send another inquiry
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      ) : (
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-16 lg:gap-24">
              {/* Direct channels */}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="space-y-12"
              >
                <div>
                  <h2 className="text-xl font-medium tracking-tight mb-3">Email</h2>
                  <a
                    href="mailto:hello@visitinglink.studio"
                    className="text-[#666666] hover:text-[#111111] transition-colors text-lg"
                  >
                    hello@visitinglink.studio
                  </a>
                </div>

                <div>
                  <h2 className="text-xl font-medium tracking-tight mb-3">Studio</h2>
                  <p className="text-[#666666] leading-relaxed">
                    San Francisco, California
                    <br />
                    Working with clients globally
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-medium tracking-tight mb-3">Availability</h2>
                  <p className="text-[#666666] leading-relaxed">
                    Currently accepting new projects for Q2 2026.
                    <br />
                    Typical response time: under 24 hours.
                  </p>
                </div>

                <div className="pt-8 border-t border-[#F0F0F0]">
                  <p className="text-sm text-[#888888] leading-relaxed">
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
                  <p className="text-sm text-[#777777] mb-3">Service of interest</p>
                  <div className="grid grid-cols-2 gap-2">
                    {servicesList.map((svc) => (
                      <button
                        type="button"
                        key={svc}
                        onClick={() => setFormData({ ...formData, service: svc })}
                        className={`py-3 px-4 text-sm font-medium border text-left transition-all cursor-pointer ${
                          formData.service === svc
                            ? 'border-[#111111] bg-[#111111] text-white'
                            : 'border-[#E5E7EB] text-[#444444] hover:border-[#111111]'
                        }`}
                      >
                        {svc}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-0 py-3 border-0 border-b border-[#E5E7EB] text-[#111111] placeholder:text-[#BBBBBB] focus:outline-none focus:border-black transition-colors bg-transparent"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      required
                      placeholder="Email address"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-0 py-3 border-0 border-b border-[#E5E7EB] text-[#111111] placeholder:text-[#BBBBBB] focus:outline-none focus:border-black transition-colors bg-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <input
                      type="text"
                      placeholder="Company (optional)"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-0 py-3 border-0 border-b border-[#E5E7EB] text-[#111111] placeholder:text-[#BBBBBB] focus:outline-none focus:border-black transition-colors bg-transparent"
                    />
                  </div>
                  <div>
                    <select
                      value={formData.budgetRange}
                      onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                      className="w-full px-0 py-3 border-0 border-b border-[#E5E7EB] text-[#111111] bg-transparent focus:outline-none focus:border-black transition-colors cursor-pointer"
                    >
                      {budgetOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          Budget: {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-[#777777] mb-3">Timeline</p>
                  <div className="flex flex-wrap gap-2">
                    {timeframeOptions.map((time) => (
                      <button
                        type="button"
                        key={time}
                        onClick={() => setFormData({ ...formData, timeframe: time })}
                        className={`py-2 px-4 text-sm border transition-all cursor-pointer ${
                          formData.timeframe === time
                            ? 'border-[#111111] bg-[#111111] text-white'
                            : 'border-[#E5E7EB] text-[#555555] hover:border-[#111111]'
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
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    className="w-full px-0 py-3 border-0 border-b border-[#E5E7EB] text-[#111111] placeholder:text-[#BBBBBB] focus:outline-none focus:border-black transition-colors resize-none bg-transparent"
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group inline-flex items-center gap-3 px-10 py-4 bg-[#111111] text-white text-sm font-medium hover:bg-[#333333] transition-colors disabled:opacity-50 cursor-pointer"
                  >
                    <span>{isSubmitting ? 'Sending...' : 'Send inquiry'}</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
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
