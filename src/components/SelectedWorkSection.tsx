"use client";

import { FeatureFilmstrip } from "./ui/featuredfilmstrip";
import { WORK_PROJECTS } from "@/data/pages";

const FALLBACK_ARTWORK =
  "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=1200&q=80";

const PROJECT_ARTWORKS: Record<string, string> = {
  vance:
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
  northline:
    "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80",
  marrow:
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80",
  sterling:
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80",
  kroma:
    "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&q=80",
};

const workItems = WORK_PROJECTS.slice(0, 5).map((p, i) => ({
  num: `0${i + 1}`,
  title: p.name,
  tagline: p.category,
  description: p.description,
  image: PROJECT_ARTWORKS[p.id] ?? FALLBACK_ARTWORK,
}));

export default function SelectedWorkSection() {
  return (
    <FeatureFilmstrip
      items={workItems}
      title={
        <div>
          <p className="mb-1 font-mono text-xs uppercase tracking-[0.2em] text-[#888888]">
            05 — Selected work
          </p>
          <h2 className="text-2xl font-medium tracking-tight md:text-4xl">
            Digital experiences, built with intention.
          </h2>
        </div>
      }
    />
  );
}
