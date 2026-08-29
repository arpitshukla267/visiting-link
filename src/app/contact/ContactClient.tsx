"use client";

import { useSearchParams } from "next/navigation";
import { ContactPage } from "@/views/ContactPage";
import { useAppNavigation } from "@/hooks/useAppNavigation";

export default function ContactClient() {
  const nav = useAppNavigation();
  const searchParams = useSearchParams();
  const initialService = searchParams.get("service") ?? "VisitingLink";

  return (
    <ContactPage
      onNavigateHome={nav.navigateToHome}
      initialService={initialService}
    />
  );
}
