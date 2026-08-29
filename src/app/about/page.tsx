"use client";

import { AboutPage } from "@/views/AboutPage";
import { useAppNavigation } from "@/hooks/useAppNavigation";

export default function About() {
  const nav = useAppNavigation();

  return (
    <AboutPage
      onNavigateHome={nav.navigateToHome}
      onNavigateContact={() => nav.navigateToContact()}
    />
  );
}
