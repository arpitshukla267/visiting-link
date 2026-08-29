"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { preloadAllHeroFrames, TOTAL_FRAMES } from "@/lib/heroFrames";

interface LoadingContextValue {
  /** All hero frames are decoded in memory */
  framesReady: boolean;
  /** Startup loader dismissed — site is interactive */
  isReady: boolean;
  loadProgress: number;
}

const LoadingContext = createContext<LoadingContextValue>({
  framesReady: false,
  isReady: false,
  loadProgress: 0,
});

export function useStartupReady() {
  return useContext(LoadingContext);
}

const MIN_LOADER_MS = 600;

export function StartupLoaderProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [framesReady, setFramesReady] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const startedAt = performance.now();

    const run = async () => {
      if (isHome) {
        await preloadAllHeroFrames((loaded, total) => {
          if (!cancelled) {
            setLoadProgress(Math.round((loaded / total) * 92));
          }
        });
      } else {
        setLoadProgress(60);
        await (document.fonts?.ready ?? Promise.resolve());
      }

      if (cancelled) return;
      setFramesReady(true);
      setLoadProgress(96);

      await (document.fonts?.ready ?? Promise.resolve());

      if (cancelled) return;

      const elapsed = performance.now() - startedAt;
      const remaining = Math.max(0, MIN_LOADER_MS - elapsed);
      await new Promise((r) => setTimeout(r, remaining));

      if (cancelled) return;
      setLoadProgress(100);

      requestAnimationFrame(() => {
        if (!cancelled) setIsReady(true);
      });
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [isHome]);

  useEffect(() => {
    document.body.style.overflow = isReady ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isReady]);

  const value = useMemo(
    () => ({ framesReady, isReady, loadProgress }),
    [framesReady, isReady, loadProgress],
  );

  return (
    <LoadingContext.Provider value={value}>
      <AnimatePresence mode="wait">
        {!isReady && (
          <motion.div
            key="startup-loader"
            className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#0A0A0C]"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="mb-2 text-lg font-semibold tracking-tight text-white">
              VisitingLink
            </p>
            {isHome && (
              <p className="mb-6 text-[11px] uppercase tracking-[0.2em] text-white/40">
                Loading experience
              </p>
            )}
            <div className="h-[2px] w-52 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full origin-left bg-white"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: loadProgress / 100 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              />
            </div>
            {isHome && (
              <p className="mt-3 font-mono text-[10px] text-white/35">
                {loadProgress}%
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      {isReady ? children : null}
    </LoadingContext.Provider>
  );
}

export { TOTAL_FRAMES };
