"use client";

import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type RefObject,
} from "react";
import { motion, useInView } from "motion/react";
import type { LucideIcon } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type JourneyMilestone = {
  year: string;
  title: string;
  description: string;
  icon?: LucideIcon;
};

/** @deprecated Use JourneyMilestone — kept for AboutPage compatibility */
export type Milestone = JourneyMilestone;

export type JourneySectionProps = {
  eyebrow?: string;
  headline: string;
  intro: string;
  closingLine?: string;
  milestones: JourneyMilestone[];
  /** @deprecated No longer rendered */
  onBack?: () => void;
  className?: string;
};

type Variant = "desktop" | "tablet" | "mobile";
type Side = "below" | "above" | "right" | "left";

type PathConfig = {
  viewBox: string;
  width: number;
  height: number;
  d: string;
  connector: number;
};

/* ------------------------------------------------------------------ */
/*  Smooth cubic-bezier paths — no sharp L/Q joins                     */
/* ------------------------------------------------------------------ */

const PATHS: Record<Variant, PathConfig> = {
  desktop: {
    viewBox: "0 0 1600 900",
    width: 3600,
    height: 900,
    connector: 58,
    d: "M 40,450 C 240,450 280,310 460,310 C 640,310 680,450 800,450 C 920,450 960,590 1140,590 C 1320,590 1360,450 1560,450",
  },
  tablet: {
    viewBox: "0 0 1100 780",
    width: 1100,
    height: 780,
    connector: 76,
    d: "M 30,390 C 190,390 220,280 380,280 C 540,280 570,390 680,390 C 790,390 820,500 980,500 C 1140,500 1070,390 1070,390",
  },
  mobile: {
    viewBox: "0 0 520 1500",
    width: 520,
    height: 1500,
    connector: 48,
    d: "M 64,80 L 64,1420",
  },
};

const SIDE_ORDER: Record<Variant, Side[]> = {
  desktop: ["below", "above", "below", "above", "below"],
  tablet: ["below", "above", "below", "above", "below"],
  mobile: ["right", "right", "right", "right", "right"],
};

/* ------------------------------------------------------------------ */
/*  Breakpoint detection                                               */
/* ------------------------------------------------------------------ */

function useVariant(): Variant {
  const [variant, setVariant] = useState<Variant>("desktop");

  useEffect(() => {
    const mqMobile = window.matchMedia("(max-width: 767px)");
    const mqTablet = window.matchMedia("(min-width: 768px) and (max-width: 1199px)");

    const update = () => {
      if (mqMobile.matches) setVariant("mobile");
      else if (mqTablet.matches) setVariant("tablet");
      else setVariant("desktop");
    };

    update();
    mqMobile.addEventListener("change", update);
    mqTablet.addEventListener("change", update);
    return () => {
      mqMobile.removeEventListener("change", update);
      mqTablet.removeEventListener("change", update);
    };
  }, []);

  return variant;
}

function getSide(variant: Variant, index: number): Side {
  const order = SIDE_ORDER[variant];
  return order[index % order.length];
}

/* ------------------------------------------------------------------ */
/*  Map SVG viewBox coordinates → container pixel positions            */
/* ------------------------------------------------------------------ */

function useSvgPositions(
  svgRef: RefObject<SVGSVGElement | null>,
  containerRef: RefObject<HTMLDivElement | null>,
  points: { x: number; y: number }[],
) {
  const [positions, setPositions] = useState<{ left: number; top: number }[]>([]);
  const pointsKey = points.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join("|");

  useLayoutEffect(() => {
    const svg = svgRef.current;
    const container = containerRef.current;
    if (!svg || !container || points.length === 0) {
      setPositions([]);
      return;
    }

    const measure = () => {
      const ctm = svg.getScreenCTM();
      if (!ctm) return;

      const cRect = container.getBoundingClientRect();
      const next = points.map((p) => {
        const pt = svg.createSVGPoint();
        pt.x = p.x;
        pt.y = p.y;
        const screen = pt.matrixTransform(ctm);
        return {
          left: screen.x - cRect.left,
          top: screen.y - cRect.top,
        };
      });

      setPositions((prev) => {
        if (
          prev.length === next.length &&
          prev.every(
            (p, i) =>
              Math.abs(p.left - next[i].left) < 0.5 &&
              Math.abs(p.top - next[i].top) < 0.5,
          )
        ) {
          return prev;
        }
        return next;
      });
    };

    measure();
    const raf = requestAnimationFrame(measure);

    const ro = new ResizeObserver(measure);
    ro.observe(container);
    window.addEventListener("resize", measure);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [pointsKey, points, svgRef, containerRef]);

  return positions;
}

function connectorEnd(
  p: { x: number; y: number },
  side: Side,
  length: number,
): { x: number; y: number } {
  switch (side) {
    case "below":
      return { x: p.x, y: p.y + length };
    case "above":
      return { x: p.x, y: p.y - length };
    case "right":
      return { x: p.x + length, y: p.y };
    case "left":
      return { x: p.x - length, y: p.y };
  }
}

/* ------------------------------------------------------------------ */
/*  Dotted connector line (SVG)                                        */
/* ------------------------------------------------------------------ */

function DottedConnector({
  from,
  to,
  animate,
  delay = 0,
}: {
  from: { x: number; y: number };
  to: { x: number; y: number };
  animate: boolean;
  delay?: number;
}) {
  return (
    <motion.line
      x1={from.x}
      y1={from.y}
      x2={to.x}
      y2={to.y}
      stroke="#C9C9C5"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeDasharray="2 8"
      initial={{ opacity: 0 }}
      animate={animate ? { opacity: 1 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Milestone card anchored to dot via dotted connector                */
/* ------------------------------------------------------------------ */

function MilestoneCard({
  milestone,
  side,
  index,
  variant,
}: {
  milestone: JourneyMilestone;
  side: Side;
  index: number;
  variant: Variant;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });
  const Icon = milestone.icon;

  const isVertical = side === "below" || side === "above";
  const slideY =
    side === "below" ? 14 : side === "above" ? -14 : 0;
  const slideX =
    side === "right" ? 14 : side === "left" ? -14 : 0;

  const alignClass =
    side === "below"
      ? "items-center"
      : side === "above"
        ? "items-center"
        : side === "right"
          ? "flex-row items-center"
          : "flex-row-reverse items-center";

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: slideY, x: slideX }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{
        duration: 0.55,
        delay: index * 0.07,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`flex shrink-0 flex-col border border-[#E5E5E2] bg-white px-4 py-4 shadow-[0_2px_14px_rgba(0,0,0,0.04)] ${
        variant === "desktop"
          ? "w-[200px] sm:w-[215px]"
          : variant === "tablet"
            ? "w-[148px] sm:w-[160px]"
            : "w-[250px]"
      } ${isVertical ? "" : "max-w-[calc(100vw-6rem)]"}`}
    >
      <div className={`flex gap-2.5 ${alignClass}`}>
        {Icon && (
          <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-[#E5E5E2] bg-[#FAFAF8]">
            <Icon className="h-3.5 w-3.5 text-[#111111]" strokeWidth={1.75} />
          </span>
        )}
        <p className="text-[11px] font-semibold tracking-wide text-[#9A9A96]">
          {milestone.year}
        </p>
      </div>
      <h4 className="mt-2.5 text-[14px] font-semibold leading-snug text-[#111111] sm:text-[15px]">
        {milestone.title}
      </h4>
      <p className="mt-1.5 text-[12.5px] leading-relaxed text-[#6B6B68] sm:text-[13px]">
        {milestone.description}
      </p>
    </motion.article>
  );
}

function MilestoneAnchor({
  milestone,
  position,
  side,
  index,
  variant,
}: {
  milestone: JourneyMilestone;
  position: { left: number; top: number };
  side: Side;
  index: number;
  variant: Variant;
}) {
  const isBelow = side === "below";
  const isAbove = side === "above";
  const isRight = side === "right";
  const isLeft = side === "left";

  const transform = isBelow
    ? "translate(-50%, 0)"
    : isAbove
      ? "translate(-50%, -100%)"
      : isRight
        ? "translate(0, -50%)"
        : "translate(-100%, -50%)";

  const flexDir = isBelow
    ? "flex-col"
    : isAbove
      ? "flex-col-reverse"
      : isRight
        ? "flex-row"
        : "flex-row-reverse";

  return (
    <div
      className={`absolute z-10 flex ${flexDir} items-center`}
      style={{
        left: position.left,
        top: position.top,
        transform,
      }}
    >
      <MilestoneCard milestone={milestone} side={side} index={index} variant={variant} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Path graphic + overlays                                            */
/* ------------------------------------------------------------------ */

function JourneyTimeline({ milestones }: { milestones: JourneyMilestone[] }) {
  const variant = useVariant();
  const { viewBox, width, height, d, connector } = PATHS[variant];
  const timelineRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineInView = useInView(timelineRef, {
    once: true,
    amount: 0.35,
    margin: "0px 0px -10% 0px",
  });
  const [points, setPoints] = useState<{ x: number; y: number }[]>([]);

  useLayoutEffect(() => {
    const el = pathRef.current;
    if (!el) return;

    const measure = () => {
      const total = el.getTotalLength();
      const n = milestones.length;
      const fractions =
        n === 1 ? [0.5] : milestones.map((_, i) => 0.04 + (i / (n - 1)) * 0.92);
      setPoints(
        fractions.map((f) => {
          const p = el.getPointAtLength(f * total);
          return { x: p.x, y: p.y };
        }),
      );
    };

    measure();
    const raf = requestAnimationFrame(measure);
    return () => cancelAnimationFrame(raf);
  }, [variant, milestones.length, d]);

  const anchorPoints = useMemo(
    () => points.map((p, i) => connectorEnd(p, getSide(variant, i), connector)),
    [points, variant, connector],
  );
  const anchorPositions = useSvgPositions(svgRef, containerRef, anchorPoints);

  const minHeight =
    variant === "mobile" ? 760 : variant === "tablet" ? 560 : 520;

  return (
    <div
      ref={containerRef}
      className={`relative mx-auto ${
        variant === "desktop"
          ? "w-screen max-w-[100vw]"
          : variant === "mobile"
            ? "w-[95vw] max-w-none"
            : "w-full"
      }`}
      style={{
        minHeight,
        aspectRatio: variant === "mobile" ? `${width} / ${height}` : undefined,
        maxWidth: variant === "desktop" ? "90vw" : variant === "mobile" ? "100vw" : "100%",
      }}
    >
      <div ref={timelineRef} className="absolute inset-0">
      <svg
        ref={svgRef}
        viewBox={viewBox}
        className={`absolute inset-0 ${
          variant === "mobile" ? "h-full" : "h-screen"
        } w-full overflow-visible`}
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        {/* Static track */}
        <path
          d={d}
          fill="none"
          stroke="#E8E8E5"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="2 12"
        />

        {/* Color fill — draws in when the timeline enters the viewport */}
        <motion.path
          ref={pathRef}
          d={d}
          fill="none"
          stroke="#111111"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="2 12"
          initial={{ pathLength: 0 }}
          animate={timelineInView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
        />

        {points.map((p, i) => {
          const side = getSide(variant, i);
          const end = connectorEnd(p, side, connector);
          return (
            <DottedConnector
              key={`line-${milestones[i].year}`}
              from={p}
              to={end}
              animate={timelineInView}
              delay={0.15 + i * 0.06}
            />
          );
        })}

        {points.map((p, i) => (
          <motion.g
            key={`dot-${milestones[i].year}-${milestones[i].title}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={timelineInView ? { opacity: 1, scale: 1 } : {}}
            transition={{
              duration: 0.45,
              delay: 0.2 + i * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <circle cx={p.x} cy={p.y} r={12} fill="white" stroke="#CFCFCA" strokeWidth={2} />
            <circle cx={p.x} cy={p.y} r={4.5} fill="#111111" />
          </motion.g>
        ))}
      </svg>
      </div>

      {anchorPositions.map((pos, i) =>
        pos ? (
          <MilestoneAnchor
            key={`card-${milestones[i].year}-${milestones[i].title}`}
            milestone={milestones[i]}
            position={pos}
            side={getSide(variant, i)}
            index={i}
            variant={variant}
          />
        ) : null,
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section wrapper                                                    */
/* ------------------------------------------------------------------ */

export function JourneySection({
  headline,
  intro,
  closingLine,
  milestones,
  className = "",
}: JourneySectionProps) {
  return (
    <section
      className={`h-full border-b border-[#F0F0F0] bg-white py-14 pb-10 md:py-22 md:pb-48 ${className}`}
      aria-label="Our journey"
    >
      <div className="mx-auto w-full max-w-[90vw] px-0">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold leading-tight text-[#111111] md:text-4xl">
            {headline}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#5D5D5A] md:text-lg">{intro}</p>
        </div>
      </div>

      <div className="mt-16 overflow-x-clip overflow-y-visible md:mt-24 lg:relative lg:left-1/2 lg:w-screen lg:max-w-[100vw] lg:-translate-x-1/2">
        <JourneyTimeline milestones={milestones} />
      </div>

      {closingLine && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-20 max-w-xl px-6 text-center text-base font-medium leading-relaxed text-[#111111] md:mt-24 md:text-lg"
        >
          {closingLine}
        </motion.p>
      )}
    </section>
  );
}
