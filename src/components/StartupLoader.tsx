"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import {
  preloadAllHeroFrames,
  preloadRemainingHeroFrames,
  TOTAL_FRAMES,
} from "@/lib/heroFrames";

const SPLASH_VIDEO = "/visitinglink-splash-screen.mp4";
const MAX_SPLASH_MS = 8000;

interface LoadingContextValue {
  framesReady: boolean;
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

export function StartupLoaderProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const videoRef = useRef<HTMLVideoElement>(null);

  const [framesReady, setFramesReady] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      if (isHome) {
        await preloadAllHeroFrames(
          (loaded, total) => {
            if (!cancelled) {
              setLoadProgress(Math.round((loaded / total) * 90));
            }
          },
          { maxDurationMs: MAX_SPLASH_MS },
        );

        if (!cancelled) {
          preloadRemainingHeroFrames();
        }
      } else {
        setLoadProgress(60);
        await (document.fonts?.ready ?? Promise.resolve());
      }

      if (cancelled) return;

      await (document.fonts?.ready ?? Promise.resolve());
      if (cancelled) return;

      setFramesReady(true);
      setLoadProgress((p) => Math.max(p, 92));
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [isHome]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const markVideoDone = () => {
      setVideoEnded(true);
      setLoadProgress((p) => Math.max(p, 96));
    };

    const playVideo = async () => {
      try {
        video.currentTime = 0;
        await video.play();
      } catch {
        markVideoDone();
      }
    };

    playVideo();

    video.addEventListener("ended", markVideoDone);
    video.addEventListener("error", markVideoDone);

    const fallbackTimer = window.setTimeout(markVideoDone, MAX_SPLASH_MS);

    return () => {
      video.removeEventListener("ended", markVideoDone);
      video.removeEventListener("error", markVideoDone);
      window.clearTimeout(fallbackTimer);
    };
  }, []);

  useEffect(() => {
    if (!framesReady || !videoEnded || isReady) return;

    setLoadProgress(100);
    requestAnimationFrame(() => setIsReady(true));
  }, [framesReady, videoEnded, isReady]);

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
            key="startup-splash"
            className="fixed inset-0 z-[200] overflow-hidden bg-black"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <video
              ref={videoRef}
              className="h-full w-full object-cover"
              src={SPLASH_VIDEO}
              muted
              playsInline
              preload="auto"
              aria-label="VisitingLink splash screen"
            />
          </motion.div>
        )}
      </AnimatePresence>
      {isReady ? children : null}
    </LoadingContext.Provider>
  );
}

export { TOTAL_FRAMES };
