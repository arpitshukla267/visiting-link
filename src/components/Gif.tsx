'use client';

import { useEffect, useRef, useState } from 'react';

export default function CrmShowcase() {
  const [visible, setVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const videoWrapperRef = useRef<HTMLDivElement | null>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const rafRef = useRef<number | null>(null);
  const pendingPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [visible]);

  // Cache the bounding rect instead of reading it on every mousemove.
  useEffect(() => {
    const updateRect = () => {
      if (videoWrapperRef.current) {
        rectRef.current = videoWrapperRef.current.getBoundingClientRect();
      }
    };

    updateRect();
    window.addEventListener('scroll', updateRect, { passive: true });
    window.addEventListener('resize', updateRect);

    return () => {
      window.removeEventListener('scroll', updateRect);
      window.removeEventListener('resize', updateRect);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = rectRef.current;
    if (!rect) return;

    pendingPos.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };

    // Throttle DOM writes to one per animation frame — avoids layout
    // thrashing and keeps movement smooth even right after a scroll.
    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(() => {
      if (cursorRef.current) {
        const { x, y } = pendingPos.current;
        cursorRef.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      }
      rafRef.current = null;
    });
  };

  const handleMouseEnter = () => {
    if (videoWrapperRef.current) {
      rectRef.current = videoWrapperRef.current.getBoundingClientRect();
    }
    setIsHovering(true);
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-black py-20 sm:py-28 flex items-center justify-center overflow-hidden"
    >
      <div
        className={`
          md:w-[85%]
          w-full px-4 md:px-0
          rounded-2xl
          overflow-hidden
          shadow-[0_0_60px_rgba(255,255,255,0.08)]

          transition-all
          duration-[1200ms]
          ease-[cubic-bezier(0.16,1,0.3,1)]

          ${visible ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}
        `}
      >
        <div
          ref={videoWrapperRef}
          className="relative w-full"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={() => setIsHovering(false)}
          onMouseMove={handleMouseMove}
          onClick={togglePlay}
          style={{ cursor: isHovering ? 'none' : 'auto' }}
        >
          <video
            ref={videoRef}
            src="/visitinglink_professional_crm_build.mp4"
            className="w-full h-auto block"
            muted
            playsInline
            loop
          />

          {/* Custom cursor pill */}
          <div
            ref={cursorRef}
            className="pointer-events-none absolute left-0 top-0 z-10 flex items-center gap-2 whitespace-nowrap rounded-full bg-white px-4 py-2 text-sm font-medium text-black"
            style={{
              opacity: isHovering ? 1 : 0,
              willChange: 'transform',
            }}
          >
            {isPlaying ? (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <rect x="2" y="1" width="3" height="10" fill="black" />
                <rect x="7" y="1" width="3" height="10" fill="black" />
              </svg>
            ) : (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 1l9 5-9 5V1z" fill="black" />
              </svg>
            )}
            <span>{isPlaying ? 'Pause video' : 'Play video'}</span>
          </div>
        </div>
      </div>
    </section>
  );
}