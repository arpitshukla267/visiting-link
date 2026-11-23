import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SolutionsClient from "@/components/solutions/SolutionsClient";
import {
  SOLUTIONS,
  SOLUTION_KEYS,
  type SolutionKey,
} from "@/data/solutionsData";

type Props = { params: Promise<{ slug: string }> };

// teeno pages build time pe ban jayenge, baaki slug par 404
export const dynamicParams = false;

export function generateStaticParams() {
  return SOLUTION_KEYS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const d = SOLUTIONS[slug as SolutionKey];
  if (!d) return {};
  return {
    title: `${d.name} | VisitingLink`,
    description: d.hero.text,
  };
}

export default async function SolutionRoute({ params }: Props) {
  const { slug } = await params;
  if (!SOLUTION_KEYS.includes(slug as SolutionKey)) notFound();
  return <SolutionsClient type={slug as SolutionKey} />;
}
