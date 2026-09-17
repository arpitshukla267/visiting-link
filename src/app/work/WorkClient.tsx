"use client";

import { WorkPage } from "@/views/WorkPage";
import { useAppNavigation } from "@/hooks/useAppNavigation";

export default function WorkClient() {
  const nav = useAppNavigation();

  return (
    <WorkPage
      onNavigateHome={nav.navigateToHome}
      onNavigateContact={nav.navigateToContact}
    />
  );
}
