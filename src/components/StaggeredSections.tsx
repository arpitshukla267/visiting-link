"use client";

import { useEffect, useState, type ReactNode } from "react";
import { motion } from "motion/react";
import { useStartupReady } from "@/components/StartupLoader";

const STAGGER_MS = 140;

function RevealSection({
  children,
  index,
}: {
  children: ReactNode;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.55,
        delay: index * 0.04,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggeredSections({ sections }: { sections: ReactNode[] }) {
  const { isReady } = useStartupReady();
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (!isReady) {
      setVisibleCount(0);
      return;
    }

    setVisibleCount(1);
    if (sections.length <= 1) return;

    let current = 1;
    const id = window.setInterval(() => {
      current += 1;
      setVisibleCount(current);
      if (current >= sections.length) {
        window.clearInterval(id);
      }
    }, STAGGER_MS);

    return () => window.clearInterval(id);
  }, [isReady, sections.length]);

  if (!isReady) return null;

  return (
    <>
      {sections.slice(0, visibleCount).map((section, i) => (
        <RevealSection key={i} index={i}>
          {section}
        </RevealSection>
      ))}
    </>
  );
}
