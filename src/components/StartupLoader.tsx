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
  DotLottieReact,
  type DotLottie,
} from "@lottiefiles/dotlottie-react";
import {
  preloadAllHeroFrames,
  preloadRemainingHeroFrames,
  TOTAL_FRAMES,
} from "@/lib/heroFrames";

const LOTTIE_SOURCE = "/lottiefile/Horse%20Run.lottie";
const LOTTIE_FAILSAFE_MS = 10000;

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
  const bootStarted = useRef(false);
  const [dotLottie, setDotLottie] = useState<DotLottie | null>(null);

  const [framesReady, setFramesReady] = useState(false);
  const [lottieEnded, setLottieEnded] = useState(false);
  const [isReady, setIsReady] = useState(false);
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
          { maxDurationMs: 4000 },
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

  // Prepare the hero frames in the background if Home is visited later.
  useEffect(() => {
    if (pathname === "/" && initialPathname.current !== "/") {
      preloadRemainingHeroFrames();
    }
  }, [pathname]);

  // Start the Lottie only once and let its own content determine the
  // animation duration. The failsafe only handles a broken animation file.
  useEffect(() => {
    if (!dotLottie) return;
    let finished = false;
    const finishLottie = () => {
      if (finished) return;
      finished = true;
      setLottieEnded(true);
      setLoadProgress(100);
    };

    dotLottie.addEventListener("complete", finishLottie);
    dotLottie.addEventListener("loadError", finishLottie);
    dotLottie.play();

    const failsafeTimer = window.setTimeout(finishLottie, LOTTIE_FAILSAFE_MS);

    return () => {
      dotLottie.removeEventListener("complete", finishLottie);
      dotLottie.removeEventListener("loadError", finishLottie);
      window.clearTimeout(failsafeTimer);
    };
  }, [dotLottie]);

  useEffect(() => {
    if (!framesReady || !lottieEnded || isReady) return;

    setLoadProgress(100);
    requestAnimationFrame(() => setIsReady(true));
  }, [framesReady, lottieEnded, isReady]);

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
            className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-white"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <DotLottieReact
              src={LOTTIE_SOURCE}
              autoplay
              loop={false}
              dotLottieRefCallback={setDotLottie}
              className="h-48 w-48 md:h-64 md:w-64"
              aria-label="Loading VisitingLink"
            />
          </motion.div>
        )}
      </AnimatePresence>
      {isReady ? children : null}
    </LoadingContext.Provider>
  );
}

export { TOTAL_FRAMES };
