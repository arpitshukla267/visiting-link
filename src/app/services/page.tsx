"use client";

import { ServicesSection } from "@/components/ServicesSection";
import { useAppNavigation } from "@/hooks/useAppNavigation";
import { useServiceModal } from "@/components/AppShell";
import { useStartupReady } from "@/components/StartupLoader";

export default function ServicesPage() {
  const nav = useAppNavigation();
  const { openServiceDetail } = useServiceModal();
  const { isReady } = useStartupReady();

  if (!isReady) return null;

  return (
    <div className="mt-6 min-h-screen bg-white pt-20 md:pt-4">
      <ServicesSection
        layout="grid"
        onSelectService={openServiceDetail}
        onNavigateService={nav.navigateToService}
        onNavigateContact={nav.navigateToContact}
        onNavigatePage={nav.navigateToPage}
      />
    </div>
  );
}
