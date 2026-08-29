"use client";

import { VisitingLinkPage } from "@/views/VisitingLinkPage";
import { useAppNavigation } from "@/hooks/useAppNavigation";

export default function VisitingLinkServicePage() {
  const nav = useAppNavigation();

  return (
    <VisitingLinkPage
      onNavigateHome={nav.navigateToHome}
      onNavigateService={nav.navigateToService}
      onNavigateContact={nav.navigateToContact}
    />
  );
}
