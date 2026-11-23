"use client";

import { useRouter } from "next/navigation";
import SolutionPage from "@/components/solutions/SolutionPage";
import type { SolutionKey } from "@/data/solutionsData";

export default function SolutionsClient({ type }: { type: SolutionKey }) {
  const router = useRouter();

  const onNavigateContact = (service?: string, category?: string) => {
    const q = new URLSearchParams();
    if (service) q.set("service", service);
    if (category) q.set("category", category);
    router.push(`/contact?${q.toString()}`);
  };

  return <SolutionPage type={type} onNavigateContact={onNavigateContact} />;
}
