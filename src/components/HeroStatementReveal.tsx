"use client";

import type { ReactNode } from "react";
import {
  HERO_STATEMENT_END_FILE,
  HERO_STATEMENT_ENTER_FILE,
} from "@/lib/heroFrames";
import { useHeroFileFrame } from "@/components/HeroFrameContext";

function easeOutCubic(value: number) {
  return 1 - Math.pow(1 - value, 3);
}

export function HeroStatementReveal({ children }: { children: ReactNode }) {
  const { fileFrame } = useHeroFileFrame();
  const isStarted = fileFrame >= HERO_STATEMENT_ENTER_FILE;
  const isDocked = fileFrame >= HERO_STATEMENT_END_FILE;
  const progress = isDocked
    ? 1
    : isStarted
      ? easeOutCubic(
          (fileFrame - HERO_STATEMENT_ENTER_FILE) /
            (HERO_STATEMENT_END_FILE - HERO_STATEMENT_ENTER_FILE),
        )
      : 0;

  return (
    <div
      className={`z-[15] w-full ${
        isDocked ? "relative -mt-[70vh]" : "fixed inset-x-0 bottom-0"
      }`}
      style={{
        transform: isDocked
          ? undefined
          : `translateY(${100 - progress * 70}%)`,
        visibility: isStarted ? "visible" : "hidden",
        pointerEvents: progress > 0.05 || isDocked ? "auto" : "none",
      }}
    >
      <div
        className={`bg-white shadow-[0_-28px_80px_rgba(0,0,0,0.22)] ${
          isDocked
            ? "overflow-visible"
            : "min-h-[100dvh] max-h-[100dvh] overflow-y-auto overflow-x-hidden"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
