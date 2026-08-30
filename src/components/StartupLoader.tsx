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
const MAX_SPLASH_MS = 4000;

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
  const initialPathname = useRef(pathname);
  const previousPathname = useRef(pathname);
  const bootStarted = useRef(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [framesReady, setFramesReady] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [routeLoading, setRouteLoading] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  useEffect(() => {
    if (bootStarted.current) return;
    bootStarted.current = true;
    let cancelled = false;

    const run = async () => {
      if (initialPathname.current === "/") {
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
  }, []);

  // If the app was opened on another route, prepare Home frames in the
  // background when it is visited without replaying the startup loader.
  useEffect(() => {
    if (pathname === "/" && initialPathname.current !== "/") {
      preloadRemainingHeroFrames();
    }
  }, [pathname]);

  // Reuse the startup splash as a transition loader for every route change.
  useEffect(() => {
    if (previousPathname.current === pathname || !isReady) return;

    previousPathname.current = pathname;
    setRouteLoading(true);
    setLoadProgress(0);

    const fallbackTimer = window.setTimeout(() => {
      setLoadProgress(100);
      setRouteLoading(false);
    }, MAX_SPLASH_MS);

    return () => {
      window.clearTimeout(fallbackTimer);
    };
  }, [isReady, pathname]);

  useEffect(() => {
    if (!routeLoading) return;

    const video = videoRef.current;
    if (!video) return;

    let finished = false;
    const finishTransition = () => {
      if (finished) return;
      finished = true;
      setLoadProgress(100);
      setRouteLoading(false);
    };

    video.currentTime = 0;
    video.addEventListener("ended", finishTransition);
    void video.play().catch(finishTransition);

    return () => {
      video.removeEventListener("ended", finishTransition);
    };
  }, [routeLoading]);

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
        {(!isReady || routeLoading) && (
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
