"use client";

import { AboutPage } from "@/views/AboutPage";
import { useAppNavigation } from "@/hooks/useAppNavigation";

export default function AboutClient() {
  const nav = useAppNavigation();

  return (
    <AboutPage
      onNavigateHome={nav.navigateToHome}
      onNavigateContact={() => nav.navigateToContact()}
    />
  );
}
