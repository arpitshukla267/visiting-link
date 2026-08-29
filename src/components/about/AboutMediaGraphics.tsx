"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Play, Pause, Sparkles, Smartphone, Globe, Share2, Briefcase, Building2, ImageOff } from "lucide-react";

/**
 * Editorial Video Banner component with ambient loop, error fallback, and play/pause control
 */
export const EditorialVideoPlayer: React.FC<{
  videoSrc?: string;
  posterSrc: string;
  alt: string;
  className?: string;
  overlayOpacity?: number;
}> = ({ videoSrc, posterSrc, alt, className = "", overlayOpacity = 0.3 }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const [imgError, setImgError] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className={`relative overflow-hidden rounded-2xl border border-[#E5E7EB] bg-[#FAFAFA] group ${className}`}>
      {videoSrc && !videoError ? (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster={posterSrc}
          onError={() => setVideoError(true)}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        >
          <source src={videoSrc} type="video/mp4" onError={() => setVideoError(true)} />
          <img src={posterSrc} alt={alt} onError={() => setImgError(true)} className="w-full h-full object-cover" />
        </video>
      ) : !imgError ? (
        <img
          src={posterSrc}
          alt={alt}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div className="w-full h-full bg-[#111111] text-white flex flex-col items-center justify-center p-6 text-center">
          <Sparkles className="w-6 h-6 text-[#FF6B58] mb-2" />
          <span className="text-xs font-mono tracking-widest uppercase text-neutral-400">{alt}</span>
        </div>
      )}

      {/* Dark Overlay */}
      <div
        className="absolute inset-0 bg-black pointer-events-none transition-opacity duration-300"
        style={{ opacity: overlayOpacity }}
      />

      {videoSrc && !videoError && (
        <button
          onClick={togglePlay}
          className="absolute bottom-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20 flex items-center justify-center hover:bg-black/90 transition-all cursor-pointer"
          aria-label={isPlaying ? "Pause video" : "Play video"}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
        </button>
      )}
    </div>
  );
};

/**
 * Editorial Photo Card with fallback handling
 */
export const EditorialPhotoCard: React.FC<{
  src: string;
  alt: string;
  caption?: string;
  aspect?: string;
  className?: string;
}> = ({ src, alt, caption, aspect = "aspect-[4/3]", className = "" }) => {
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative overflow-hidden rounded-2xl border border-[#E5E7EB] bg-[#FAFAFA] group ${className}`}>
      <div className={`w-full overflow-hidden ${aspect}`}>
        {!hasError ? (
          <img
            src={src}
            alt={alt}
            onError={() => setHasError(true)}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-[#111111] text-white flex flex-col items-center justify-center p-6 text-center">
            <Sparkles className="w-6 h-6 text-[#FF6B58] mb-2" />
            <span className="text-xs font-mono tracking-widest uppercase text-neutral-400">{alt}</span>
          </div>
        )}
      </div>
      {caption && (
        <div className="p-4 border-t border-[#F0F0F0] bg-white">
          <p className="text-xs text-[#666666] font-mono tracking-wide">{caption}</p>
        </div>
      )}
    </div>
  );
};

/**
 * Disconnected Identity Photo Nodes Sequence for Section 3
 */
export const DisconnectedIdentityMediaGraphic: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "end 35%"],
  });

  const convergence = useTransform(scrollYProgress, [0.1, 0.7], [0, 1]);
  const nodeOffset1 = useTransform(convergence, [0, 1], [-40, 0]);
  const nodeOffset2 = useTransform(convergence, [0, 1], [40, 0]);
  const opacityDisconnected = useTransform(convergence, [0, 0.7], [1, 0.3]);
  const opacityUnified = useTransform(convergence, [0.4, 1], [0, 1]);
  const scaleCentral = useTransform(convergence, [0.3, 1], [0.9, 1.05]);

  const items = [
    {
      label: "Contact details",
      icon: Smartphone,
      img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400&q=80",
    },
    {
      label: "Website",
      icon: Globe,
      img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80",
    },
    {
      label: "Social Profiles",
      icon: Share2,
      img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=400&q=80",
    },
    {
      label: "Portfolio",
      icon: Briefcase,
      img: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=400&q=80",
    },
    {
      label: "Business Presence",
      icon: Building2,
      img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80",
    },
  ];

  return (
    <div ref={containerRef} className="my-10 py-10 px-4 border border-[#E5E7EB] rounded-2xl bg-[#FAFAFA] overflow-hidden shadow-sm">
      <div className="max-w-3xl mx-auto text-center mb-8">
        <motion.div style={{ opacity: opacityDisconnected }} className="text-xs font-mono tracking-widest text-[#FF6B58] uppercase mb-1 font-medium">
          BEFORE VISITINGLINK — DISCONNECTED PRESENCE
        </motion.div>
        <motion.div style={{ opacity: opacityUnified }} className="text-xs font-mono tracking-widest text-[#111111] uppercase mb-1 font-medium">
          WITH VISITINGLINK — UNIFIED IDENTITY HUB
        </motion.div>
      </div>

      <div className="relative min-h-[380px] flex items-center justify-center">
        {/* SVG Hairline Network */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 600 380">
          <g stroke="#E5E7EB" strokeWidth="1" strokeDasharray="4 4">
            <line x1="100" y1="80" x2="300" y2="190" />
            <line x1="500" y1="80" x2="300" y2="190" />
            <line x1="90" y1="300" x2="300" y2="190" />
            <line x1="510" y1="300" x2="300" y2="190" />
            <line x1="300" y1="40" x2="300" y2="190" />
          </g>
          <motion.circle
            cx="300"
            cy="190"
            r="110"
            fill="none"
            stroke="#FF6B58"
            strokeWidth="1.5"
            style={{ opacity: opacityUnified, scale: scaleCentral }}
          />
        </svg>

        {/* Central VisitingLink Core Node */}
        <motion.div
          style={{ scale: scaleCentral, opacity: opacityUnified }}
          className="absolute z-20 w-40 h-40 rounded-full bg-[#111111] text-white flex flex-col items-center justify-center p-4 shadow-xl border border-[#FF6B58]"
        >
          <Sparkles className="w-5 h-5 text-[#FF6B58] mb-1 animate-pulse" />
          <span className="text-xs font-medium tracking-wider uppercase">VisitingLink</span>
          <span className="text-[10px] text-neutral-400 font-mono mt-0.5">Central Hub</span>
        </motion.div>

        {/* 5 Converging Photo Nodes */}
        <div className="relative z-10 w-full h-full max-w-2xl grid grid-cols-1 sm:grid-cols-3 gap-6 items-center justify-items-center">
          {items.map((item, idx) => {
            const isSpan = idx === 4;
            return (
              <motion.div
                key={item.label}
                style={{
                  x: idx % 2 === 0 ? nodeOffset1 : nodeOffset2,
                  y: idx < 3 ? nodeOffset1 : nodeOffset2,
                }}
                className={`flex items-center gap-3 p-2.5 rounded-xl border border-[#E5E7EB] bg-white shadow-sm overflow-hidden max-w-[200px] ${
                  isSpan ? "sm:col-span-2 sm:col-start-2 justify-self-center" : ""
                }`}
              >
                <img
                  src={item.img}
                  alt={item.label}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                  className="w-10 h-10 rounded-lg object-cover"
                />
                <span className="text-xs font-medium text-[#111111]">{item.label}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
