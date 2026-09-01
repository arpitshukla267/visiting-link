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
const FADE_OUT_MS = 700;

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
  const [isFadingOut, setIsFadingOut] = useState(false);
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

  // Keep the Lottie running; only the failsafe handles a broken file.
  useEffect(() => {
    if (!dotLottie) return;

    dotLottie.play();

    const failsafeTimer = window.setTimeout(() => {
      setLoadProgress(100);
    }, LOTTIE_FAILSAFE_MS);

    return () => {
      window.clearTimeout(failsafeTimer);
    };
  }, [dotLottie]);

  // Start fading once content is ready — don't wait for the Lottie to finish first.
  useEffect(() => {
    if (!framesReady || isReady || isFadingOut) return;

    setLoadProgress(100);
    setIsFadingOut(true);
  }, [framesReady, isReady, isFadingOut]);

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
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: isFadingOut ? 0 : 1 }}
              transition={{ duration: FADE_OUT_MS / 1000, ease: [0.16, 1, 0.3, 1] }}
              onAnimationComplete={() => {
                if (isFadingOut) setIsReady(true);
              }}
            >
              <DotLottieReact
                src={LOTTIE_SOURCE}
                autoplay
                loop={!isReady}
                dotLottieRefCallback={setDotLottie}
                className="h-48 w-48 md:h-64 md:w-64"
                aria-label="Loading VisitingLink"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {isReady ? children : null}
    </LoadingContext.Provider>
  );
}

export { TOTAL_FRAMES };
