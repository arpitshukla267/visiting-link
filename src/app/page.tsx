"use client";

import dynamic from "next/dynamic";
import { Hero } from "@/components/Hero";
import { HeroFrameProvider } from "@/components/HeroFrameContext";
import { HeroStatementReveal } from "@/components/HeroStatementReveal";
import { CompanyStatement } from "@/components/CompanyStatement";
import { ServicesSection } from "@/components/ServicesSection";
import { VisualBreak } from "@/components/Future-banner";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { CtaSection } from "@/components/CtaSection";
import SelectedWorkSection from "@/components/SelectedWorkSection";
import { StaggeredSections } from "@/components/StaggeredSections";
import { useAppNavigation } from "@/hooks/useAppNavigation";
import { useServiceModal } from "@/components/AppShell";
import { useStartupReady } from "@/components/StartupLoader";

const HowWeWorkSection = dynamic(
  () => import("@/components/HowWeWorkSection"),
  { ssr: false },
);

export default function HomePage() {
  const nav = useAppNavigation();
  const { openServiceDetail } = useServiceModal();
  const { isReady } = useStartupReady();

  if (!isReady) return null;

  const sections = [
    <ServicesSection
      key="services"
      onSelectService={openServiceDetail}
      onNavigateService={nav.navigateToService}
      onNavigateContact={nav.navigateToContact}
      onNavigatePage={nav.navigateToPage}
    />,
    <HowWeWorkSection key="how" />,
    <SelectedWorkSection key="work" />,
    <VisualBreak key="break" />,
    <TestimonialsSection key="testimonials" />,
    <CtaSection
      key="cta"
      onNavigateContact={() => nav.navigateToContact("New Project Inquiry")}
    />,
  ];

  return (
    <HeroFrameProvider>
      <Hero />
      <HeroStatementReveal>
        <CompanyStatement />
      </HeroStatementReveal>
      <div className="relative z-10">
        <div className="overflow-visible bg-white">
          <StaggeredSections sections={sections} />
        </div>
      </div>
    </HeroFrameProvider>
  );
}
