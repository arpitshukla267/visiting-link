"use client";

import { FeatureFilmstrip } from "./ui/featuredfilmstrip";
import { WORK_PROJECTS } from "../data/pages";

const workItems = WORK_PROJECTS.slice(0, 5).map((p, i) => ({
  num: `0${i + 1}`,
  title: p.name,
  tagline: p.category,
  description: p.description,
  image: p.image,
  url: p.url,
}));

export default function SelectedWorkSection() {
  return (
    <div className="mx-auto max-w-7xl md:max-w-[90vw] px- sm:px-6 lg:px-8">
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
    </div>
  );
}
