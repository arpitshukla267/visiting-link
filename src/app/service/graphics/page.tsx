"use client";

import { GraphicsPage } from "@/views/GraphicsPage";
import { useAppNavigation } from "@/hooks/useAppNavigation";

export default function GraphicsServicePage() {
  const nav = useAppNavigation();

  return (
    <GraphicsPage
      onNavigateHome={nav.navigateToHome}
      onNavigateService={nav.navigateToService}
      onNavigateContact={nav.navigateToContact}
    />
  );
}
