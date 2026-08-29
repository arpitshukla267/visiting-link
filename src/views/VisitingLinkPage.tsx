"use client";

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ArrowLeft, Globe, Shield, Activity, Share2, Layers, Check, ChevronDown } from 'lucide-react';
import { SERVICES_DATA } from '../data/content';

interface VisitingLinkPageProps {
  onNavigateHome: () => void;
  onNavigateService: (serviceId: string) => void;
  onNavigateContact: (serviceName?: string) => void;
}

export const VisitingLinkPage: React.FC<VisitingLinkPageProps> = ({
  onNavigateHome,
  onNavigateService,
  onNavigateContact
}) => {
  const service = SERVICES_DATA.find((s) => s.id === 'visitinglink')!;
  const [activeTab, setActiveTab] = useState<'architecture' | 'features' | 'telemetry'>('architecture');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: 'Can we connect our own domain name (e.g., link.ourbrand.com)?',
      a: 'Yes, fully. VisitingLink includes zero-downtime custom DNS mapping, automatic enterprise SSL certificate generation, and edge CDN routing worldwide.'
    },
    {
      q: 'How does VisitingLink compare to standard link aggregators?',
      a: 'Unlike generic third-party bio links with noisy branding and slow scripts, VisitingLink is engineered as a bespoke, ultra-fast proprietary digital gateway completely owned by your company, with strict privacy and sub-100ms load times.'
    },
    {
      q: 'Can we update content and profiles dynamically without code changes?',
      a: 'Yes. We deliver a lightweight client management dashboard that lets your marketing and operations team update active links, team members, featured releases, and inquiry channels in real time.'
    },
    {
      q: 'How does lead capture and CRM integration work?',
      a: 'Direct webhook routing can feed inbound inquiries straight into your existing CRM (HubSpot, Salesforce, Notion, or custom email alerts) with complete UTM attribution.'
    }
  ];

  return (
    <div className="w-full bg-white text-[#111111] pt-24 pb-20">
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 border-b border-[#F0F0F0] flex items-center justify-between">
        <button
          onClick={onNavigateHome}
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.15em] text-[#666666] hover:text-black transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Overview</span>
        </button>
        <div className="text-[11px] font-mono text-[#999999] tracking-widest hidden sm:block">
          SPECIFICATION // 01 — DIGITAL IDENTITY
        </div>
      </div>

      {/* Hero Header Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pt-16 pb-20 border-b border-[#F0F0F0]">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-3 h-3 bg-[#111111]" />
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#888888]">
              {service.number} // PROPRIETARY PLATFORM
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-[#111111] leading-[1.08]"
          >
            {service.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-4 text-xl sm:text-2xl text-[#666666] font-normal tracking-tight"
          >
            {service.tagline}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-6 text-base sm:text-lg text-[#555555] leading-relaxed max-w-2xl"
          >
            VisitingLink centralizes your brand touchpoints, executive credentials, interactive funnels, and enterprise links into a single, high-performing digital ecosystem designed for authoritative credibility.
          </motion.p>

          {/* Primary Action Row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <button
              onClick={() => onNavigateContact('VisitingLink Digital Identity')}
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#111111] text-white text-xs font-semibold uppercase tracking-widest hover:bg-[#333333] transition-colors cursor-pointer"
            >
              <span>Commission VisitingLink</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                const el = document.querySelector('#architecture-spec');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-4 border border-[#E5E7EB] text-xs font-semibold uppercase tracking-widest text-[#111111] hover:border-black transition-colors cursor-pointer"
            >
              Explore Specifications ↓
            </button>
          </motion.div>
        </div>

        {/* Key Operational Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-16 pt-12 border-t border-[#F0F0F0]">
          <div>
            <span className="text-3xl sm:text-4xl font-mono font-medium text-[#111111] block">
              &lt; 90ms
            </span>
            <span className="text-xs text-[#777777] uppercase tracking-wider mt-1 block">
              Edge Global TTFB
            </span>
          </div>
          <div>
            <span className="text-3xl sm:text-4xl font-mono font-medium text-[#111111] block">
              100%
            </span>
            <span className="text-xs text-[#777777] uppercase tracking-wider mt-1 block">
              Custom Domain Routing
            </span>
          </div>
          <div>
            <span className="text-3xl sm:text-4xl font-mono font-medium text-[#111111] block">
              +280%
            </span>
            <span className="text-xs text-[#777777] uppercase tracking-wider mt-1 block">
              Funnel Conversion Lift
            </span>
          </div>
          <div>
            <span className="text-3xl sm:text-4xl font-mono font-medium text-[#111111] block">
              0.00
            </span>
            <span className="text-xs text-[#777777] uppercase tracking-wider mt-1 block">
              Third-Party Tracker Bloat
            </span>
          </div>
        </div>
      </section>

      {/* Interactive System Simulator / Architecture Preview */}
      <section id="architecture-spec" className="max-w-7xl mx-auto px-6 md:px-12 py-20 border-b border-[#F0F0F0]">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#888888] block mb-1">
              SYSTEM ARCHITECTURE
            </span>
            <h2 className="text-2xl sm:text-3xl font-medium text-[#111111] tracking-tight">
              Interactive System Inspector
            </h2>
          </div>

          {/* Interactive Mode Tabs */}
          <div className="flex items-center border border-[#E5E7EB] p-1 bg-[#FAFAFA]">
            {(['architecture', 'features', 'telemetry'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                  activeTab === tab
                    ? 'bg-[#111111] text-white shadow-xs'
                    : 'text-[#666666] hover:text-black'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Interactive Diagram / Simulation */}
          <div className="lg:col-span-7 bg-[#FAFAFA] border border-[#E5E7EB] p-8 md:p-10 flex flex-col justify-between">
            {activeTab === 'architecture' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-[#E5E7EB]">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-[#111111]" />
                    <span className="text-xs font-mono font-medium">link.yourdomain.com</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 border border-emerald-200">
                    DNS ACTIVE // SSL VERIFIED
                  </span>
                </div>

                <div className="bg-white border border-[#E5E7EB] p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#111111] text-white flex items-center justify-center font-mono font-bold">
                      VL
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-[#111111]">Enterprise Brand Gateway</div>
                      <div className="text-xs text-[#777777]">San Francisco, CA • Global Distribution</div>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <div className="p-3 bg-[#FAFAFA] border border-[#EEEEEE] flex items-center justify-between text-xs font-medium text-[#111111]">
                      <span>Primary Product Platform</span>
                      <span>&rarr;</span>
                    </div>
                    <div className="p-3 bg-[#FAFAFA] border border-[#EEEEEE] flex items-center justify-between text-xs font-medium text-[#111111]">
                      <span>Direct Executive Booking & Calendar</span>
                      <span>&rarr;</span>
                    </div>
                    <div className="p-3 bg-[#FAFAFA] border border-[#EEEEEE] flex items-center justify-between text-xs font-medium text-[#111111]">
                      <span>Press Kit & Investor Brief 2026</span>
                      <span>&rarr;</span>
                    </div>
                  </div>
                </div>

                <div className="text-xs text-[#777777] font-mono">
                  • Fully rendered in static SSR edge layers with sub-millisecond route dispatching.
                </div>
              </div>
            )}

            {activeTab === 'features' && (
              <div className="space-y-4">
                <div className="text-xs font-mono uppercase text-[#888888]">Core Capability Modules</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    'Dynamic Card Layouts',
                    'Direct Calendly / Cal.com Sync',
                    'Encrypted Inbound Lead Forms',
                    'Audio & Media Embeds',
                    'Social Proof & Verified Badges',
                    'Multi-Team Role Governance'
                  ].map((feat, idx) => (
                    <div key={idx} className="p-3.5 bg-white border border-[#E5E7EB] text-xs font-medium text-[#222222] flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#111111]" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'telemetry' && (
              <div className="space-y-5">
                <div className="flex items-center justify-between text-xs font-mono pb-3 border-b border-[#E5E7EB]">
                  <span>LIVE CONVERSION LOGS</span>
                  <span className="text-emerald-600">STREAMING</span>
                </div>
                <div className="space-y-2 font-mono text-[11px] text-[#444444]">
                  <div className="p-2.5 bg-white border border-[#E5E7EB] flex justify-between">
                    <span>/calendar-booking (Executive)</span>
                    <span className="text-[#111111] font-semibold">14.2% CR</span>
                  </div>
                  <div className="p-2.5 bg-white border border-[#E5E7EB] flex justify-between">
                    <span>/deck-download (Investors)</span>
                    <span className="text-[#111111] font-semibold">28.4% CR</span>
                  </div>
                  <div className="p-2.5 bg-white border border-[#E5E7EB] flex justify-between">
                    <span>/direct-inquiry (Sales)</span>
                    <span className="text-[#111111] font-semibold">9.1% CR</span>
                  </div>
                </div>
                <p className="text-xs text-[#777777]">
                  Privacy-first analytics compliant with GDPR/CCPA with zero cookie banners required.
                </p>
              </div>
            )}
          </div>

          {/* Right: Deliverables List & Specifications */}
          <div className="lg:col-span-5 bg-white border border-[#E5E7EB] p-8 md:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Layers className="w-4 h-4 text-[#111111]" />
                <span className="text-xs font-mono uppercase tracking-widest text-[#999999]">
                  PACKAGE DELIVERABLES
                </span>
              </div>
              <h3 className="text-xl font-medium text-[#111111] mb-6">
                What's Delivered in the Scope
              </h3>

              <ul className="space-y-3.5">
                {service.detailedScope.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#444444]">
                    <span className="w-4 h-4 bg-[#FAFAFA] border border-[#E5E7EB] flex items-center justify-center shrink-0 mt-0.5">
                      <div className="w-1.5 h-1.5 bg-[#111111]" />
                    </span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-[#F0F0F0]">
              <button
                onClick={() => onNavigateContact('VisitingLink Digital Identity')}
                className="w-full py-3.5 bg-[#111111] text-white text-xs font-semibold uppercase tracking-widest hover:bg-[#333333] transition-colors cursor-pointer text-center"
              >
                Request Proposal for VisitingLink
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-20 border-b border-[#F0F0F0]">
        <div className="max-w-3xl mb-12">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#888888] block mb-2">
            01 // PROVEN DEPLOYMENT
          </span>
          <h2 className="text-2xl sm:text-3xl font-medium text-[#111111] tracking-tight">
            How Sterling Capital Unified 14 Portfolios with VisitingLink
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#FAFAFA] border border-[#E5E7EB] p-8 md:p-10">
          <div>
            <span className="text-xs font-mono uppercase text-[#888888] block mb-2">The Challenge</span>
            <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
              Managing disparate social channels, fragmented executive links, and unbranded bio pages resulted in lost investor leads and brand dilution.
            </p>
          </div>
          <div>
            <span className="text-xs font-mono uppercase text-[#888888] block mb-2">The Solution</span>
            <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
              Engineered a customized VisitingLink identity network on link.sterlingcapital.com with synchronized partner credentials and automated calendar routing.
            </p>
          </div>
          <div>
            <span className="text-xs font-mono uppercase text-[#888888] block mb-2">The Outcome</span>
            <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
              +310% increase in verified partner meetings scheduled and a 42% decrease in investor drop-off across mobile traffic.
            </p>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 py-20 border-b border-[#F0F0F0]">
        <h2 className="text-2xl sm:text-3xl font-medium text-[#111111] tracking-tight mb-8">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-[#E5E7EB] bg-white transition-colors"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
              >
                <span className="text-sm sm:text-base font-medium text-[#111111]">
                  {faq.q}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-[#666666] transition-transform duration-200 ${
                    openFaq === idx ? 'rotate-180 text-black' : ''
                  }`}
                />
              </button>
              {openFaq === idx && (
                <div className="px-6 pb-6 text-xs sm:text-sm text-[#666666] leading-relaxed border-t border-[#F5F5F5] pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Next Service Navigation Strip */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#888888] block mb-1">
            EXPLORE NEXT DISCIPLINE
          </span>
          <h3 className="text-xl font-medium text-[#111111]">
            02 — Web Development & Architecture
          </h3>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => onNavigateService('web-development')}
            className="px-8 py-4 bg-[#111111] text-white text-xs font-semibold uppercase tracking-widest hover:bg-[#333333] transition-colors cursor-pointer inline-flex items-center gap-2"
          >
            <span>Go to Web Development</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>
    </div>
  );
};
