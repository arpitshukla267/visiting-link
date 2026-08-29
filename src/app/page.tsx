"use client";

import dynamic from "next/dynamic";
import { Hero } from "@/components/Hero";
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
    <CompanyStatement key="statement" />,
    <ServicesSection
      key="services"
      onSelectService={openServiceDetail}
      onNavigateService={nav.navigateToService}
      onNavigateContact={nav.navigateToContact}
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
    <>
      <Hero />
      <div className="relative z-10 -mt-[5vh]">
        <div className="overflow-visible bg-white shadow-[0_-28px_80px_rgba(0,0,0,0.22)]">
          <StaggeredSections sections={sections} />
        </div>
      </div>
    </>
  );
}
