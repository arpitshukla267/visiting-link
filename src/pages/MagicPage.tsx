import React, { useEffect, useRef, useCallback, useState } from 'react';

const TOTAL_FRAMES = 500;
const INITIAL_PRELOAD_COUNT = 80;

export const MagicPage: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  // In-memory array of loaded Image objects (index 0 = frame 1)
  const images = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));

  // Loading state
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);

  // Frame tracking refs for smooth scroll interpolation
  const displayedFrame = useRef<number>(1);
  const targetFrame = useRef<number>(1);
  const rafId = useRef<number>(0);
  const preloadedUpTo = useRef<number>(0);

  // Helper for frame image URLs (tries /frames2/ then /frames/)
  const getFrameUrl = useCallback((index: number) => {
    const pad = String(index).padStart(4, '0');
    return `/frames2/frame_${pad}.webp`;
  }, []);

  // Load single image with error safety to prevent uncaught rejections
  const loadImage = useCallback((index: number): Promise<HTMLImageElement | null> => {
    return new Promise((resolve) => {
      if (images.current[index - 1]) {
        resolve(images.current[index - 1]!);
        return;
      }
      const img = new Image();
      img.decoding = 'async';
      img.src = getFrameUrl(index);
      img.onload = () => {
        images.current[index - 1] = img;
        resolve(img);
      };
      img.onerror = () => {
        // Fallback try /frames/ if /frames2/ fails
        const fallbackImg = new Image();
        fallbackImg.decoding = 'async';
        fallbackImg.src = `/frames/frame_${String(index).padStart(4, '0')}.webp`;
        fallbackImg.onload = () => {
          images.current[index - 1] = fallbackImg;
          resolve(fallbackImg);
        };
        fallbackImg.onerror = () => {
          resolve(null);
        };
      };
    });
  }, [getFrameUrl]);

  // Find exact frame or closest loaded frame so canvas NEVER shows black screen
  const getClosestImage = useCallback((targetIdx: number): HTMLImageElement | null => {
    const exact = images.current[targetIdx - 1];
    if (exact) return exact;

    // Search outward for closest loaded image
    for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
      const prev = images.current[targetIdx - 1 - offset];
      if (prev) return prev;
      const next = images.current[targetIdx - 1 + offset];
      if (next) return next;
    }
    return null;
  }, []);

  // Draw frame on canvas with aspect ratio cover
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;

    const clampedIndex = Math.min(TOTAL_FRAMES, Math.max(1, frameIndex));
    const img = getClosestImage(clampedIndex);
    if (!img) return;

    const cw = canvas.width;
    const ch = canvas.height;

    const imgAspect = img.naturalWidth / img.naturalHeight;
    const canvasAspect = cw / ch;

    let dw: number, dh: number, dx: number, dy: number;

    if (canvasAspect > imgAspect) {
      dw = cw;
      dh = cw / imgAspect;
      dx = 0;
      dy = (ch - dh) / 2;
    } else {
      dw = ch * imgAspect;
      dh = ch;
      dx = (cw - dw) / 2;
      dy = 0;
    }

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, dx, dy, dw, dh);
  }, [getClosestImage]);

  // Resize canvas for high DPI
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const w = window.innerWidth;
    const h = window.innerHeight;

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctxRef.current = ctx;
    }

    drawFrame(Math.round(displayedFrame.current));
  }, [drawFrame]);

  // ─── PHASE 1: Initial preload of first 80 frames with loader ───
  useEffect(() => {
    let cancelled = false;

    const preloadInitial = async () => {
      const batchSize = 10;
      let loaded = 0;

      for (let start = 1; start <= INITIAL_PRELOAD_COUNT; start += batchSize) {
        if (cancelled) return;
        const end = Math.min(start + batchSize - 1, INITIAL_PRELOAD_COUNT);
        const batch: Promise<HTMLImageElement | null>[] = [];
        for (let i = start; i <= end; i++) {
          batch.push(loadImage(i));
        }

        const results = await Promise.all(batch);
        loaded += results.filter(Boolean).length;
        preloadedUpTo.current = Math.max(preloadedUpTo.current, end);

        if (!cancelled) {
          setLoadProgress(Math.round((loaded / INITIAL_PRELOAD_COUNT) * 100));
        }
      }

      if (!cancelled) {
        setIsLoading(false);
      }
    };

    preloadInitial();
    return () => { cancelled = true; };
  }, [loadImage]);

  // ─── PHASE 2: Background preload remaining frames (81 to 500) ───
  useEffect(() => {
    if (isLoading) return;

    let cancelled = false;

    const preloadRemaining = async () => {
      const batchSize = 8;
      for (let start = INITIAL_PRELOAD_COUNT + 1; start <= TOTAL_FRAMES; start += batchSize) {
        if (cancelled) return;
        const end = Math.min(start + batchSize - 1, TOTAL_FRAMES);
        const batch: Promise<HTMLImageElement | null>[] = [];
        for (let i = start; i <= end; i++) {
          batch.push(loadImage(i));
        }
        await Promise.all(batch);
        preloadedUpTo.current = Math.max(preloadedUpTo.current, end);
      }
    };

    preloadRemaining();
    return () => { cancelled = true; };
  }, [isLoading, loadImage]);

  // ─── PHASE 3: Direct Scroll-Driven Frame Engine ───
  useEffect(() => {
    if (isLoading) return;

    resizeCanvas();
    drawFrame(1);

    window.addEventListener('resize', resizeCanvas);

    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;

      const fraction = Math.min(1, Math.max(0, scrollTop / maxScroll));
      targetFrame.current = 1 + fraction * (TOTAL_FRAMES - 1);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    let lastDrawnFrame = -1;

    const renderLoop = () => {
      const target = targetFrame.current;
      const current = displayedFrame.current;
      const diff = target - current;

      if (Math.abs(diff) > 0.001) {
        displayedFrame.current += diff * 0.09;
      } else {
        displayedFrame.current = target;
      }

      const frameToRender = Math.min(
        TOTAL_FRAMES,
        Math.max(1, Math.round(displayedFrame.current))
      );

      if (frameToRender !== lastDrawnFrame) {
        lastDrawnFrame = frameToRender;
        drawFrame(frameToRender);
      }

      rafId.current = requestAnimationFrame(renderLoop);
    };

    rafId.current = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId.current);
    };
  }, [isLoading, resizeCanvas, drawFrame]);

  // ─── Loading Screen ───
  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center gap-8">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-2 border-white/10 rounded-full" />
          <div
            className="absolute inset-0 border-2 border-transparent border-t-white rounded-full animate-spin"
            style={{ animationDuration: '0.8s' }}
          />
        </div>

        <div className="w-64 flex flex-col items-center gap-3">
          <div className="w-full h-[2px] bg-white/10 overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-300 ease-out"
              style={{ width: `${loadProgress}%` }}
            />
          </div>
          <span className="text-white/50 text-xs font-mono tracking-widest uppercase">
            {loadProgress}%
          </span>
        </div>
      </div>
    );
  }

  // ─── Main Canvas ───
  return (
    <div className="relative w-full h-[600vh] bg-black">
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
        <canvas ref={canvasRef} className="block w-full h-full" />
      </div>
    </div>
  );
};
