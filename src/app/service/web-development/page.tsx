"use client";

import { WebDevelopmentPage } from "@/views/WebDevelopmentPage";
import { useAppNavigation } from "@/hooks/useAppNavigation";

export default function WebDevelopmentServicePage() {
  const nav = useAppNavigation();

  return (
    <WebDevelopmentPage
      onNavigateHome={nav.navigateToHome}
      onNavigateService={nav.navigateToService}
      onNavigateContact={nav.navigateToContact}
    />
  );
}
