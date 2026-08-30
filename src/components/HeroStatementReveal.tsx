"use client";

import type { ReactNode } from "react";

export function HeroStatementReveal({ children }: { children: ReactNode }) {
  return (
    <div className="relative z-10 w-full">
      {children}
    </div>
  );
}
