"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  HERO_SERVICES_END_FILE,
  HERO_SERVICES_ENTER_FILE,
} from "@/lib/heroFrames";
import {
  getHeroFileFrame,
  subscribeHeroFrame,
} from "@/components/HeroFrameContext";

function easeOutCubic(value: number) {
  return 1 - Math.pow(1 - value, 3);
}

function servicesRevealProgress(fileFrame: number) {
  if (fileFrame < HERO_SERVICES_ENTER_FILE) return 0;
  if (fileFrame >= HERO_SERVICES_END_FILE) return 1;

  const t =
    (fileFrame - HERO_SERVICES_ENTER_FILE) /
    (HERO_SERVICES_END_FILE - HERO_SERVICES_ENTER_FILE);

  return easeOutCubic(t);
}

export function HeroServicesReveal({ children }: { children: ReactNode }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [isDocked, setIsDocked] = useState(false);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    let docked = false;

    const applyFrame = (fileFrame: number) => {
      const shouldDock = fileFrame >= HERO_SERVICES_END_FILE;

      if (shouldDock) {
        if (!docked) {
          docked = true;
          panel.style.transform = "";
          panel.style.willChange = "";
          setIsDocked(true);
        }
        return;
      }

      setIsDocked(false);
      const progress = servicesRevealProgress(fileFrame);

      if (fileFrame < HERO_SERVICES_ENTER_FILE) {
        panel.style.transform = "translate3d(0, 100%, 0)";
        panel.style.willChange = "transform";
        return;
      }

      const slidePercent = 100 - progress * 100;
      panel.style.transform = `translate3d(0, ${slidePercent}%, 0)`;
      panel.style.willChange = "transform";
    };

    applyFrame(getHeroFileFrame());
    return subscribeHeroFrame(() => applyFrame(getHeroFileFrame()));
  }, []);

  return (
    <div
      ref={panelRef}
      className={`z-[15] w-full bg-white ${
        isDocked
          ? "relative -mt-[100vh]"
          : "fixed inset-x-0 bottom-0 shadow-[0_-24px_80px_rgba(0,0,0,0.12)]"
      }`}
      style={isDocked ? undefined : { transform: "translate3d(0, 100%, 0)" }}
    >
      {children}
    </div>
  );
}
