import React from "react";
import { motion } from "motion/react";

/**
 * Ambient depth field for the home hero — drifting orbs and a slow-moving
 * perspective grid that sits beneath the circuit traces.
 */
export const HeroAmbientField: React.FC = () => {
  const orbs = [
    { size: 420, x: "18%", y: "30%", delay: 0, duration: 14 },
    { size: 320, x: "72%", y: "55%", delay: 2, duration: 18 },
    { size: 260, x: "55%", y: "18%", delay: 4, duration: 16 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Perspective grid */}
      <motion.div
        animate={{ backgroundPosition: ["0px 0px", "0px 48px"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 45%, black 20%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 70% at 50% 45%, black 20%, transparent 75%)",
        }}
      />

      {/* Drifting light orbs */}
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            background:
              "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)",
          }}
          animate={{
            x: [0, i % 2 === 0 ? 30 : -24, 0],
            y: [0, i % 2 === 0 ? -20 : 28, 0],
            opacity: [0.5, 0.9, 0.5],
          }}
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Horizontal scan line */}
      <motion.div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
        animate={{ top: ["20%", "80%", "20%"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
};

/**
 * Technical Circuit-Trace Line-Art for Hero.
 *
 * Design note: earlier pass ran traces straight through the headline/copy
 * and used a dashed "blueprint" stroke + background grid — read as a
 * diagram sitting on top of the page instead of ambient texture behind it.
 * This version keeps every trace inside the margins (top strip + the two
 * side columns), well clear of the centered text block, and turns the
 * intensity down so it's felt more than seen.
 */
export const HeroCircuitTrace: React.FC = () => {
  const traces = [
    // top-left corner, stays above y=140 — clears the headline entirely
    {
      d: "M 0 40 L 140 40 L 190 90 L 340 90",
      drawDuration: 1.8,
      drawDelay: 0.2,
      pulseDuration: 5.5,
      pulseDelay: 0.6,
    },
    // top-right corner
    {
      d: "M 1440 60 L 1280 60 L 1230 110 L 1080 110",
      drawDuration: 1.8,
      drawDelay: 0.35,
      pulseDuration: 6,
      pulseDelay: 1.4,
    },
    // left edge, mid-height — sits in the empty gutter left of the text column
    {
      d: "M 0 480 L 90 480 L 130 520 L 130 620",
      drawDuration: 1.6,
      drawDelay: 0.5,
      pulseDuration: 5,
      pulseDelay: 2.1,
    },
    // right edge, mid-height
    {
      d: "M 1440 500 L 1350 500 L 1310 540 L 1310 640",
      drawDuration: 1.6,
      drawDelay: 0.65,
      pulseDuration: 5.3,
      pulseDelay: 0.9,
    },
    // bottom edge, well below the CTA row / scroll cue
    {
      d: "M 0 860 L 160 860 L 200 890",
      drawDuration: 1.4,
      drawDelay: 0.8,
      pulseDuration: 4.6,
      pulseDelay: 1.8,
    },
    {
      d: "M 1440 870 L 1260 870 L 1220 900",
      drawDuration: 1.4,
      drawDelay: 0.9,
      pulseDuration: 4.8,
      pulseDelay: 2.4,
    },
  ];

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 900"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id="pulse-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <filter id="pulse-blur" x="-300%" y="-300%" width="700%" height="700%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>

      {/* Traces — plain hairlines, no dash pattern, low opacity, no glow filter
          (the earlier glow filter is what made them read as bold diagram lines) */}
      {traces.map((t, i) => (
        <motion.path
          key={`trace-${i}`}
          d={t.d}
          stroke="rgba(255,255,255,0.14)"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            duration: t.drawDuration,
            ease: [0.16, 1, 0.3, 1],
            delay: t.drawDelay,
          }}
        />
      ))}

      {/* Traveling current pulses — small, soft, easy to miss on purpose */}
      {traces.map((t, i) => (
        <motion.g
          key={`pulse-${i}`}
          style={{ offsetPath: `path("${t.d}")` } as React.CSSProperties}
          initial={{ offsetDistance: "0%", opacity: 0 }}
          animate={{ offsetDistance: "100%", opacity: [0, 0.9, 0.9, 0] }}
          transition={{
            offsetDistance: {
              duration: t.pulseDuration,
              delay: t.drawDuration + t.drawDelay + t.pulseDelay,
              repeat: Infinity,
              ease: "linear",
            },
            opacity: {
              duration: t.pulseDuration,
              delay: t.drawDuration + t.drawDelay + t.pulseDelay,
              repeat: Infinity,
              ease: "linear",
              times: [0, 0.08, 0.9, 1],
            },
          }}
        >
          <circle r="5" fill="url(#pulse-glow)" filter="url(#pulse-blur)" />
          <circle r="1.2" fill="#ffffff" opacity="0.8" />
        </motion.g>
      ))}
    </svg>
  );
};

/**
 * Dashed Square-and-Cross Technical Mark for Intro / Company Statement
 */
export const SquareCrossMark: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  return (
    <div
      className={`relative w-14 h-14 md:w-16 md:h-16 flex items-center justify-center shrink-0 ${className}`}
    >
      <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full opacity-60 hover:opacity-100 transition-opacity duration-300"
      >
        {/* Outer dashed bounding square */}
        <rect
          x="6"
          y="6"
          width="52"
          height="52"
          stroke="#111111"
          strokeWidth="1"
          strokeDasharray="4 3"
        />
        {/* Inner solid framing square */}
        <rect
          x="18"
          y="18"
          width="28"
          height="28"
          stroke="#111111"
          strokeWidth="0.8"
        />
        {/* Center Crosshair */}
        <line
          x1="32"
          y1="2"
          x2="32"
          y2="62"
          stroke="#111111"
          strokeWidth="0.75"
          strokeDasharray="2 2"
        />
        <line
          x1="2"
          y1="32"
          x2="62"
          y2="32"
          stroke="#111111"
          strokeWidth="0.75"
          strokeDasharray="2 2"
        />
        {/* Center Target Point */}
        <circle cx="32" cy="32" r="2" fill="#111111" />
        {/* Corner alignment brackets */}
        <path d="M 2 8 L 2 2 L 8 2" stroke="#111111" strokeWidth="1.2" />
        <path d="M 56 2 L 62 2 L 62 8" stroke="#111111" strokeWidth="1.2" />
        <path d="M 62 56 L 62 62 L 56 62" stroke="#111111" strokeWidth="1.2" />
        <path d="M 8 62 L 2 62 L 2 56" stroke="#111111" strokeWidth="1.2" />
      </svg>
    </div>
  );
};

/**
 * Concentric-Circle / Compass Radar Technical Mark for Black Visual Break Section
 */
export const CompassRadarMark: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  return (
    <div
      className={`relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center shrink-0 ${className}`}
    >
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full opacity-40 hover:opacity-75 transition-opacity duration-300"
      >
        {/* Outer Dashed Compass Ring */}
        <circle
          cx="60"
          cy="60"
          r="54"
          stroke="#ffffff"
          strokeWidth="1"
          strokeDasharray="3 4"
        />
        {/* Second Concentric Ring */}
        <circle cx="60" cy="60" r="40" stroke="#ffffff" strokeWidth="0.8" />
        {/* Third Concentric Ring */}
        <circle
          cx="60"
          cy="60"
          r="24"
          stroke="#ffffff"
          strokeWidth="0.8"
          strokeDasharray="2 3"
        />
        {/* Inner Core Ring */}
        <circle cx="60" cy="60" r="8" stroke="#ffffff" strokeWidth="1" />
        {/* Center Target Dot */}
        <circle cx="60" cy="60" r="2" fill="#ffffff" />

        {/* Orthogonal Axis Lines */}
        <line
          x1="60"
          y1="2"
          x2="60"
          y2="118"
          stroke="#ffffff"
          strokeWidth="0.8"
          strokeDasharray="4 4"
        />
        <line
          x1="2"
          y1="60"
          x2="118"
          y2="60"
          stroke="#ffffff"
          strokeWidth="0.8"
          strokeDasharray="4 4"
        />

        {/* Diagonal 45-degree ticks */}
        <line
          x1="22"
          y1="22"
          x2="30"
          y2="30"
          stroke="#ffffff"
          strokeWidth="1"
        />
        <line
          x1="98"
          y1="22"
          x2="90"
          y2="30"
          stroke="#ffffff"
          strokeWidth="1"
        />
        <line
          x1="98"
          y1="98"
          x2="90"
          y2="90"
          stroke="#ffffff"
          strokeWidth="1"
        />
        <line
          x1="22"
          y1="98"
          x2="30"
          y2="90"
          stroke="#ffffff"
          strokeWidth="1"
        />

        {/* Cardinal Markers */}
        <text
          x="56"
          y="14"
          fill="rgba(255,255,255,0.7)"
          fontSize="7"
          fontFamily="monospace"
        >
          N
        </text>
        <text
          x="108"
          y="63"
          fill="rgba(255,255,255,0.7)"
          fontSize="7"
          fontFamily="monospace"
        >
          E
        </text>
        <text
          x="57"
          y="114"
          fill="rgba(255,255,255,0.7)"
          fontSize="7"
          fontFamily="monospace"
        >
          S
        </text>
        <text
          x="6"
          y="63"
          fill="rgba(255,255,255,0.7)"
          fontSize="7"
          fontFamily="monospace"
        >
          W
        </text>
      </svg>
    </div>
  );
};
