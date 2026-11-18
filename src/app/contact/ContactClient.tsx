"use client";

import { useSearchParams } from "next/navigation";
import { ContactPage } from "@/views/ContactPage";
import { useAppNavigation } from "@/hooks/useAppNavigation";

export default function ContactClient() {
  const nav = useAppNavigation();
  const searchParams = useSearchParams();
  const serviceParam = searchParams.get("service") ?? undefined;
  const categoryParam = searchParams.get("category") ?? undefined;
  const initialService = serviceParam ?? (categoryParam ? undefined : "VisitingLink");

  return (
    <ContactPage
      onNavigateHome={nav.navigateToHome}
      initialService={initialService}
      initialCategory={categoryParam}
    />
  );
}
