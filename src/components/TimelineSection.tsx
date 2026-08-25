import React, { useRef, useState, useLayoutEffect, useCallback } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { TIMELINE_QUALITIES } from "../data/content";

// Build a wavy cubic-bezier path THROUGH fixed node points.
// Nodes stay exactly where they are (same x for all) — only the
// control points bulge left/right, giving a decorative sine-like curve
// without ever moving the actual dot position.
function buildWavyPath(
  points: { x: number; y: number }[],
  amplitude: number,
): string {
  if (points.length < 2) return "";
  let d = `M ${points[0].x},${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p1 = points[i];
    const p2 = points[i + 1];
    const dy = p2.y - p1.y;
    const offset = Math.sin(i * Math.PI + Math.PI / 2) * amplitude;
    const cp1x = p1.x + offset;
    const cp1y = p1.y + dy * 0.33;
    const cp2x = p2.x + offset;
    const cp2y = p1.y + dy * 0.66;
    d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`;
  }
  return d;
}

// Measures the REAL rendered length of an SVG path string (off-screen).
function measurePathLength(d: string): number {
  if (!d) return 0;
  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  const path = document.createElementNS(svgNS, "path");
  path.setAttribute("d", d);
  svg.style.position = "absolute";
  svg.style.visibility = "hidden";
  svg.style.width = "0";
  svg.style.height = "0";
  svg.appendChild(path);
  document.body.appendChild(svg);
  const length = path.getTotalLength();
  document.body.removeChild(svg);
  return length;
}

// Given all points, returns the fraction (0-1) of the TOTAL path length
// at which each node actually sits — used so reveal timing matches the
// real drawn line, not just an even idx/total split.
function computeArrivalFractions(
  points: { x: number; y: number }[],
  amplitude: number,
): number[] {
  if (points.length < 2) return points.map(() => 0);
  const fullPath = buildWavyPath(points, amplitude);
  const totalLength = measurePathLength(fullPath);
  if (totalLength === 0) return points.map((_, i) => i / (points.length - 1));

  const fractions: number[] = [0];
  let cumulative = 0;
  for (let i = 0; i < points.length - 1; i++) {
    const dy = points[i + 1].y - points[i].y;
    const offset = Math.sin(i * Math.PI + Math.PI / 2) * amplitude;
    const p1 = points[i];
    const p2 = points[i + 1];
    const cp1x = p1.x + offset;
    const cp1y = p1.y + dy * 0.33;
    const cp2x = p2.x + offset;
    const cp2y = p1.y + dy * 0.66;
    const d = `M ${p1.x},${p1.y} C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`;
    cumulative += measurePathLength(d);
    fractions.push(cumulative / totalLength);
  }
  // Clamp to [0, 1] — floating point can push the last value slightly over 1
  return fractions.map((f) => Math.min(Math.max(f, 0), 0.95));
}

interface TimelineItemProps {
  quality: (typeof TIMELINE_QUALITIES)[0];
  arriveAt: number;
  nextArriveAt: number;
  scrollYProgress: any;
  isEven: boolean;
  nodeRef: (el: HTMLDivElement | null) => void;
}

const ProgressiveTimelineItem: React.FC<TimelineItemProps> = ({
  quality,
  arriveAt,
  nextArriveAt,
  scrollYProgress,
  isEven,
  nodeRef,
}) => {
  // Reveal window: starts exactly when the drawn line reaches this node,
  // ends a short, snappy moment later (never before arrival).
  const gap = Math.max(nextArriveAt - arriveAt, 0.02);
const revealEnd = Math.min(arriveAt + 0.035, 1);
  const nodeScale = useTransform(
    scrollYProgress,
    [arriveAt, revealEnd],
    [0.5, 1],
  );
  const nodeOpacity = useTransform(
    scrollYProgress,
    [arriveAt, revealEnd],
    [0, 1],
  );
  const nodeBg = useTransform(
    scrollYProgress,
    [arriveAt, revealEnd],
    ["#D1D5DB", "#111111"],
  );

  const cardBorder = useTransform(
    scrollYProgress,
    [arriveAt, revealEnd, nextArriveAt + 0.02],
    ["#EEEEEE", "#D4D4D8", "#EEEEEE"],
  );

  const cardOpacity = useTransform(
    scrollYProgress,
    [arriveAt, revealEnd],
    [0, 1],
  );
  const cardY = useTransform(scrollYProgress, [arriveAt, revealEnd], [28, 0]);
  const cardScale = useTransform(
    scrollYProgress,
    [arriveAt, revealEnd],
    [0.96, 1],
  );

  return (
    <div
      id={`timeline-item-${quality.number}`}
      className={`relative flex flex-col md:flex-row items-start ${
        isEven ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* Content Column */}
      <div
        className={`w-full md:w-1/2 pl-12 md:pl-0 ${
          isEven ? "md:pl-14 text-left" : "md:pr-14 md:text-right"
        }`}
      >
        <motion.div
          style={{
            borderColor: cardBorder,
            opacity: cardOpacity,
            y: cardY,
            scale: cardScale,
          }}
          className="bg-white border rounded-2xl p-8 md:p-9 transition-colors duration-300 shadow-[0_2px_12px_rgba(0,0,0,0.02)]"
        >
          <h3 className="text-lg sm:text-xl font-medium text-[#111111] tracking-tight mb-2">
            {quality.number} — {quality.title}
          </h3>
          <p className="text-sm text-[#444444] font-medium leading-relaxed mb-2">
            {quality.description}
          </p>
          <p className="text-xs sm:text-sm text-[#777777] font-normal leading-relaxed">
            {quality.details}
          </p>
        </motion.div>
      </div>

      {/* Node — always pinned to the center line, at the box's top corner. Same for every box. */}
      <div
        ref={nodeRef}
        className="absolute left-4 md:left-1/2 -translate-x-1/2 top-7 z-10 flex items-center justify-center"
      >
        <motion.div
          style={{ scale: nodeScale, opacity: nodeOpacity }}
          className="w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-[0_0_0_4px_#FAFAFA]"
        >
          <motion.div
            style={{ backgroundColor: nodeBg }}
            className="w-2 h-2 rounded-full"
          />
        </motion.div>
      </div>

      <div className="hidden md:block md:w-1/2" />
    </div>
  );
};

const WAVE_AMPLITUDE_DESKTOP = 46;

export const TimelineSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [pathD, setPathD] = useState("");
  const [svgSize, setSvgSize] = useState({ width: 0, height: 0 });
  const [arrivalFractions, setArrivalFractions] = useState<number[]>([]);

  const total = TIMELINE_QUALITIES.length;
  

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const trackRect = track.getBoundingClientRect();
    const points = nodeRefs.current.filter(Boolean).map((el) => {
      const r = el!.getBoundingClientRect();
      return {
        x: r.left - trackRect.left + r.width / 2,
        y: r.top - trackRect.top + r.height / 2,
      };
    });
    if (points.length < 2) return;

    const isDesktop = window.innerWidth >= 768;
    const amplitude = isDesktop ? WAVE_AMPLITUDE_DESKTOP : 0;

    setPathD(buildWavyPath(points, amplitude));
    setSvgSize({ width: trackRect.width, height: trackRect.height });
    setArrivalFractions(computeArrivalFractions(points, amplitude));
  }, []);

  useLayoutEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    return () => {
      window.removeEventListener("resize", measure);
      ro.disconnect();
    };
  }, [measure]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 65%", "end 80%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    restDelta: 0.001,
  });

  const hasFractions = arrivalFractions.length === total;

  return (
    <section
      ref={containerRef}
      id="approach"
      className="w-full bg-[#FAFAFA] py-24 md:py-32 border-b border-[#F0F0F0] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-16 md:mb-20 max-w-2xl">
          <motion.h2
            id="approach-section-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-4xl md:text-[40px] font-medium text-[#111111] tracking-tight leading-tight"
          >
            How we work.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 text-base sm:text-lg text-[#666666] font-normal leading-relaxed"
          >
            Five foundational qualities and standards that guide every phase of
            our collaboration.
          </motion.p>
        </div>

        <div ref={trackRef} className="relative">
          {svgSize.width > 0 && (
            <svg
              className="absolute inset-0 pointer-events-none overflow-visible"
              width={svgSize.width}
              height={svgSize.height}
              viewBox={`0 0 ${svgSize.width} ${svgSize.height}`}
            >
              <path
                d={pathD}
                fill="none"
                stroke="#E5E7EB"
                strokeWidth={1.5}
                strokeLinecap="round"
              />
              <motion.path
                d={pathD}
                fill="none"
                stroke="#111111"
                strokeWidth={1.5}
                strokeLinecap="round"
                style={{ pathLength: smoothProgress }}
              />
            </svg>
          )}

          <div className="space-y-12 md:space-y-24">
            {TIMELINE_QUALITIES.map((quality, idx) => (
              <ProgressiveTimelineItem
                key={quality.id}
                quality={quality}
                isEven={idx % 2 === 0}
                arriveAt={hasFractions ? arrivalFractions[idx] : idx / total}
                nextArriveAt={
                  hasFractions
                    ? (arrivalFractions[idx + 1] ?? 1)
                    : (idx + 1) / total
                }
                scrollYProgress={smoothProgress}
                nodeRef={(el) => (nodeRefs.current[idx] = el)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
