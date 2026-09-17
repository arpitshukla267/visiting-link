"use client";

import { WhatWeDoSection } from "@/components/ServicesSection";
import { useAppNavigation } from "@/hooks/useAppNavigation";
import { useServiceModal } from "@/components/AppShell";
import { useStartupReady } from "@/components/StartupLoader";

export default function ServicesClient() {
  const nav = useAppNavigation();
  const { openServiceDetail } = useServiceModal();
  const { isReady } = useStartupReady();

  if (!isReady) return null;

  return (
    <div className="">
      <h1 className="sr-only">Web Development, Software & Design Services</h1>
      <WhatWeDoSection key="services" />
    </div>
  );
}
