import React, { useEffect, useRef, useCallback, useState } from 'react';

const TOTAL_FRAMES = 200;
const PRELOAD_COUNT = 100;

export const MagicPage: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  // All images stored as a flat array in memory (index 0 = frame 1)
  const images = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));

  // Loading state
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);

  // Frame tracking refs for cinematic interpolation
  const displayedFrame = useRef<number>(1);
  const targetFrame = useRef<number>(1);
  const rafId = useRef<number>(0);
  const preloadedUpTo = useRef(0);

  // ─── Frame URL helper ───
  const getFrameUrl = useCallback((index: number) => {
    return `/frames/frame_${String(index).padStart(4, '0')}.webp`;
  }, []);

  // ─── Load a single frame as a Promise ───
  const loadImage = useCallback((index: number): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
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
      img.onerror = reject;
    });
  }, [getFrameUrl]);

  // ─── Draw a frame onto the canvas (cover mode) ───
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;

    // Clamp frame index to valid range
    const clampedIndex = Math.min(TOTAL_FRAMES, Math.max(1, frameIndex));
    const img = images.current[clampedIndex - 1];
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
  }, []);

  // ─── Resize canvas for High DPI ───
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

  // ─── PHASE 1: Initial preload of first 100 frames with loader screen ───
  useEffect(() => {
    let cancelled = false;

    const preload = async () => {
      const batchSize = 8;
      let loaded = 0;

      for (let start = 1; start <= PRELOAD_COUNT; start += batchSize) {
        if (cancelled) return;
        const end = Math.min(start + batchSize - 1, PRELOAD_COUNT);
        const batch: Promise<HTMLImageElement>[] = [];
        for (let i = start; i <= end; i++) {
          batch.push(loadImage(i));
        }

        const results = await Promise.allSettled(batch);
        loaded += results.filter(r => r.status === 'fulfilled').length;
        preloadedUpTo.current = Math.max(preloadedUpTo.current, end);

        if (!cancelled) {
          setLoadProgress(Math.round((loaded / PRELOAD_COUNT) * 100));
        }
      }

      if (!cancelled) {
        setIsLoading(false);
      }
    };

    preload();

    return () => { cancelled = true; };
  }, [loadImage]);

  // ─── PHASE 2: Background preload remaining frames (101-200) ───
  useEffect(() => {
    if (isLoading) return;

    let cancelled = false;

    const preloadRemaining = async () => {
      const batchSize = 6;
      for (let start = PRELOAD_COUNT + 1; start <= TOTAL_FRAMES; start += batchSize) {
        if (cancelled) return;
        const end = Math.min(start + batchSize - 1, TOTAL_FRAMES);
        const batch: Promise<HTMLImageElement>[] = [];
        for (let i = start; i <= end; i++) {
          batch.push(loadImage(i));
        }
        await Promise.allSettled(batch);
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

    // Update target frame directly based on scroll position
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;

      const fraction = Math.min(1, Math.max(0, scrollTop / maxScroll));
      targetFrame.current = 1 + fraction * (TOTAL_FRAMES - 1);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // ── Cinematic Inertia Animation Loop (60 FPS) ──
    let lastDrawnFrame = -1;

    const renderLoop = () => {
      const target = targetFrame.current;
      const current = displayedFrame.current;
      const diff = target - current;

      // Smooth liquid inertia (0.09 easing factor)
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
    <div className="relative w-full h-[500vh] bg-black">
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
        <canvas ref={canvasRef} className="block w-full h-full" />
      </div>
    </div>
  );
};
