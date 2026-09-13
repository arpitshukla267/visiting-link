"use client";

import dynamic from "next/dynamic";
import { HeroFrameProvider } from "@/components/HeroFrameContext";
import { CompanyStatement } from "@/components/CompanyStatement";
import { WhatWeDoSection } from "@/components/ServicesSection";
import { VisualBreak } from "@/components/Future-banner";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import SelectedWorkSection from "@/components/SelectedWorkSection";
import { StaggeredSections } from "@/components/StaggeredSections";
import { useAppNavigation } from "@/hooks/useAppNavigation";
import { useServiceModal } from "@/components/AppShell";
import { useStartupReady } from "@/components/StartupLoader";
import Hero from "@/components/hero/Hero";
import styles from "@/components/hero/Hero.module.css";
import TechCarousel from "@/components/hero/Techcarousel";
import Gif from "@/components/Gif";

const HowWeWorkSection = dynamic(
  () => import("@/components/HowWeWorkSection"),
  { ssr: false },
);

// Scoped to the Hero only — the rest of the site keeps the global
// Poppins font set in the root layout.
export default function HomePage() {
  const nav = useAppNavigation();
  const { openServiceDetail } = useServiceModal();
  const { isReady } = useStartupReady();

  if (!isReady) return null;

  const sections = [
    <WhatWeDoSection
      key="services"
      onSelectService={openServiceDetail}
      onNavigateService={nav.navigateToService}
      onNavigateContact={nav.navigateToContact}
      onNavigatePage={nav.navigateToPage}
    />,
    <HowWeWorkSection key="how" />,
    <CompanyStatement key="promises" />,
    <VisualBreak key="break" />,
    <SelectedWorkSection key="work" />,
    // <TestimonialsSection key="testimonials" />,
  ];

  return (
    <HeroFrameProvider>
      <Hero />
      <Gif />
      <div className="relative z-10">
        <div className="overflow-visible bg-white">
          <StaggeredSections sections={sections} />
        </div>
      </div>
    </HeroFrameProvider>
  );
}