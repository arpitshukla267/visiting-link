"use client";

import dynamic from "next/dynamic";
import { HeroFrameProvider } from "@/components/HeroFrameContext";
import { CompanyStatement } from "@/components/CompanyStatement";
import { WhatWeDoSection } from "@/components/ServicesSection";
import { VisualBreak } from "@/components/Future-banner";
import SelectedWorkSection from "@/components/SelectedWorkSection";
import { StaggeredSections } from "@/components/StaggeredSections";
import { useAppNavigation } from "@/hooks/useAppNavigation";
import { useServiceModal } from "@/components/AppShell";
import { useStartupReady } from "@/components/StartupLoader";
import Hero from "@/components/sections/Hero";
import TechCarousel from "@/components/hero/Techcarousel";
import Gif from "@/components/Gif";
import FloatingContactButtons from "@/components/FloatingContactButtons";
import Stats from "@/components/sections/Stats";
import NoWebsite from "@/components/sections/NoWebsite";
import Solutions from "@/components/sections/Solutions";
import OnlineStore from "@/components/sections/OnlineStore";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Cta from "@/components/hero/Cta";
import { TeamSection } from "@/components/about/TeamsSection";

const HowWeWorkSection = dynamic(
  () => import("@/components/HowWeWorkSection"),
  { ssr: false },
);

// Scoped to the Hero only — the rest of the site keeps the global
// Poppins font set in the root layout.
export default function HomeClient() {
  const nav = useAppNavigation();
  const { openServiceDetail } = useServiceModal();
  const { isReady } = useStartupReady();

  if (!isReady) return null;

  const sections = [
    <WhatWeDoSection key="services" />,
    <HowWeWorkSection key="how" />,
    <CompanyStatement key="promises" />,
    <SelectedWorkSection key="work" />,
    <VisualBreak key="break" />,
  ];

  return (
    <HeroFrameProvider>
      <FloatingContactButtons />
      <Hero />
      <Stats />
      <NoWebsite />
      <WhatWeDoSection key="services" />
      <Solutions />
      <OnlineStore />
      <WhyChooseUs />
      <HowWeWorkSection key="how" />
      <Cta />
      {/* <div className="relative z-10">
        <div className="overflow-visible bg-white">
          <StaggeredSections sections={sections} />
        </div>
      </div> */}
    </HeroFrameProvider>
  );
}
