"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { motion, useInView } from "motion/react";

const CORAL = "#FF6B58";
const INK = "#0A0A0A";
const MUTED = "#6E6E6E";
const HAIRLINE = "#EAEAEA";

interface StepLabelPosition {
  leftOffset?: number;
  topOffset?: number;
  translateX?: string;
  translateY?: string;
  width?: number;
}

interface StepWatermarkPosition {
  top?: string;
  left?: string;
  right?: string;
  fontSize?: string;
  opacity?: number;
}

interface Step {
  id: string;
  number: string;
  title: string | readonly string[];
  desc: string;
  pathAt: number;
  label: StepLabelPosition;
  watermark: StepWatermarkPosition;
}

const STEPS: Step[] = [
  {
    id: "discover",
    number: "1",
    title: ["Project Discovery", "Call"],
    desc: "We align on scope, business goals, target audience, and core technical requirements.",
    pathAt: 0.15,
    label: {
      leftOffset: 0,
      topOffset: 5,
      translateX: "-80%",
      translateY: "40px",
      width: 190,
    },
    watermark: {
      top: "-3rem",
      right: "5%",
      fontSize: "7rem",
      opacity: 0.12,
    },
  },
  {
    id: "design",
    number: "2",
    title: "UX Architecture & Planning",
    desc: "Wireframes, user flows, and a design system blueprint before a single line of code.",
    pathAt: 0.4,
    label: {
      leftOffset: -2,
      topOffset: 5,
      translateX: "12%",
      translateY: "-170px",
      width: 200,
    },
    watermark: {
      top: "-4rem",
      right: "0",
      fontSize: "7rem",
      opacity: 0.1,
    },
  },
  {
    id: "build",
    number: "3",
    title: ["Engineering & ","Development"],
    desc: "Clean, high-performance code with interface design systems built to scale.",
    pathAt: 0.654,
    label: {
      leftOffset: 0,
      topOffset: 5,
      translateX: "-10%",
      translateY: "40px",
      width: 210,
    },
    watermark: {
      top: "-4rem",
      right: "5%",
      fontSize: "7rem",
      opacity: 0.12,
    },
  },
  {
    id: "launch",
    number: "4",
    title: ["Deployment &", "Delivery"],
    desc: "Production deployment, live monitoring, handoff documentation, and ongoing support.",
    pathAt: 0.88,
    label: {
      leftOffset: -4,
      topOffset: 5,
      translateX: "40%",
      translateY: "38px",
      width: 200,
    },
    watermark: {
      top: "-4rem",
      right: "5%",
      fontSize: "7rem",
      opacity: 0.12,
    },
  },
];

const VB_W = 1100;
const VB_H = 520;

const CURVE_PATH = `
  M 0 330

  C 55 315, 115 460, 200 445

  C 350 430, 360 250, 470 260

  C 565 265, 585 390, 650 390

  C 735 390, 820 130, 900 60

  C 960 -5, 1040 -10, 1100 -30
`;

interface PathPoint {
  x: number;
  y: number;
}

function usePathPoints(pathD: string, fractions: number[]) {
  const pathRef = useRef<SVGPathElement>(null);
  const pointsRef = useRef<PathPoint[]>([]);
  const pathLengthRef = useRef(0);
  const [, bump] = React.useReducer((n: number) => n + 1, 0);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const len = path.getTotalLength();
    pathLengthRef.current = len;
    pointsRef.current = fractions.map((f) => {
      const pt = path.getPointAtLength(len * f);
      return { x: pt.x, y: pt.y };
    });
    bump();
  }, [pathD, fractions]);

  return {
    pathRef,
    points: pointsRef.current,
    pathLength: pathLengthRef.current,
  };
}

function renderStepTitle(title: string | readonly string[]) {
  if (Array.isArray(title)) {
    return title.map((line, i) => (
      <React.Fragment key={line}>
        {i > 0 && <br />}
        {line}
      </React.Fragment>
    ));
  }
  return title;
}

export default function HowWeWorkSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const curveRef = useRef<HTMLDivElement>(null);
  const isCurveInView = useInView(curveRef, {
    once: true,
    amount: 0.75,
    margin: "0px 0px -10% 0px",
  });

  const mobileTimelineRef = useRef<HTMLDivElement>(null);
  const isMobileTimelineInView = useInView(mobileTimelineRef, {
    once: true,
    amount: 0.3,
    margin: "0px 0px -10% 0px",
  });

  const fractions = useMemo(() => STEPS.map((s) => s.pathAt), []);
  const { pathRef, points, pathLength } = usePathPoints(CURVE_PATH, fractions);
  const dashLength = pathLength || 1400;

  const handleContactClick = () => {
    const contact = document.querySelector("#contact");
    if (contact) contact.scrollIntoView({ behavior: "smooth" });
    else window.location.href = "/contact";
  };

  return (
    <section
      ref={sectionRef}
      id="approach"
      className="relative w-full overflow-hidden bg-white py-16 md:min-h-screen md:py-32 [content-visibility:auto]"
    >
      <div className="mx-auto max-w-[95vw] md:max-w-[90vw] px-4 md:px-12">
        {/* Mobile — vertical process timeline */}
        <div className="md:hidden">
          <p
            className="mb-2 text-[11px] font-semibold uppercase tracking-[0.24em]"
            style={{ color: CORAL }}
          >
            Studio operation across the world
          </p>
          <h2
            className="mb-3 text-2xl font-semibold leading-[1.15] tracking-[-0.02em]"
            style={{ color: INK }}
          >
            We have best team and best process
          </h2>
          <p className="mb-10 text-sm leading-relaxed" style={{ color: MUTED }}>
            We combine clear thinking, thoughtful design and precise technology
            to turn ambitious ideas into digital experiences that work.
          </p>

          <div ref={mobileTimelineRef} className="relative">
            {STEPS.map((step, index) => {
              const isLast = index === STEPS.length - 1;
              return (
                <div key={`mob-${step.id}`} className="relative flex gap-4">
                  {/* Rail: numbered marker + connecting segment */}
                  <div className="flex flex-shrink-0 flex-col items-center">
                    <motion.span
                      initial={{ scale: 0.6, opacity: 0 }}
                      animate={
                        isMobileTimelineInView
                          ? { scale: 1, opacity: 1 }
                          : { scale: 0.6, opacity: 0 }
                      }
                      transition={{
                        duration: 0.4,
                        delay: index * 0.22,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="flex h-9 w-9 items-center justify-center rounded-full border-2 bg-white text-[13px] font-bold"
                      style={{ borderColor: CORAL, color: CORAL }}
                    >
                      {step.number}
                    </motion.span>
                    {!isLast && (
                      <span
                        className="mt-1 w-px flex-1 overflow-hidden"
                        style={{ minHeight: 64, backgroundColor: HAIRLINE }}
                      >
                        <motion.span
                          className="block w-full origin-top"
                          style={{ height: "100%", backgroundColor: CORAL }}
                          initial={{ scaleY: 0 }}
                          animate={
                            isMobileTimelineInView
                              ? { scaleY: 1 }
                              : { scaleY: 0 }
                          }
                          transition={{
                            duration: 0.5,
                            delay: index * 0.22 + 0.25,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        />
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className={`relative min-w-0 flex-1 ${isLast ? "pb-0" : "pb-9"}`}>
                    <span
                      className="pointer-events-none absolute -top-3 right-0 select-none font-semibold leading-none"
                      style={{ fontSize: "3.75rem", opacity: 0.06, color: INK }}
                      aria-hidden
                    >
                      {step.number}
                    </span>
                    <h4
                      className="relative mb-1.5 pt-1 text-[15px] font-semibold leading-snug tracking-[-0.01em]"
                      style={{ color: INK }}
                    >
                      {renderStepTitle(step.title)}
                    </h4>
                    <p className="relative max-w-[85%] text-[13px] leading-relaxed" style={{ color: MUTED }}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            type="button"
            onClick={handleContactClick}
            className="mt-4 inline-flex w-full cursor-pointer items-center justify-center rounded-full px-7 py-3.5 text-sm font-medium text-white shadow-md transition-all duration-200 hover:brightness-95 active:scale-[0.98]"
            style={{
              backgroundColor: CORAL,
              boxShadow: `0 8px 24px ${CORAL}40`,
            }}
          >
            Get Started
          </button>
        </div>

        {/* Desktop — unchanged curve layout */}
        <div className="relative hidden min-h-[480px] w-full sm:min-h-[520px] md:block">
          <div className="relative z-20 mb-10 max-w-md lg:absolute lg:-top-16 lg:left-0 lg:mb-0">
            <p
              className="mb-3 text-[11px] font-semibold uppercase tracking-[0.24em]"
              style={{ color: CORAL }}
            >
              Studio operation across the world
            </p>
            <h2
              className="mb-5 text-3xl font-semibold leading-[1.1] tracking-[-0.025em] md:text-4xl lg:text-[42px]"
              style={{ color: INK }}
            >
              We have best team
              <br />
              and best process
            </h2>
            <p className="mb-8 text-sm leading-relaxed md:text-[15px]" style={{ color: MUTED }}>
              We combine clear thinking, thoughtful design and precise technology
              to turn ambitious ideas into digital experiences that work.
            </p>
            <button
              type="button"
              onClick={handleContactClick}
              className="inline-flex cursor-pointer items-center justify-center rounded-full px-7 py-3.5 text-sm font-medium text-white shadow-md transition-all duration-200 hover:brightness-95 active:scale-[0.98]"
              style={{
                backgroundColor: CORAL,
                boxShadow: `0 8px 24px ${CORAL}40`,
              }}
            >
              Get Started
            </button>
          </div>

          <div className="relative h-[360px] w-full md:h-[400px] lg:h-[480px]">
            <div
              className="pointer-events-none absolute right-[2%] top-[14%] z-0 h-64 w-64 rounded-full opacity-30 md:h-80 md:w-80"
              style={{ background: "radial-gradient(circle, #B8D4F0 0%, transparent 70%)" }}
              aria-hidden
            />

            <div ref={curveRef} className="relative h-[420px] w-full lg:h-[500px]">
              <svg
                viewBox={`0 0 ${VB_W} ${VB_H}`}
                className="absolute inset-0 h-full w-full overflow-visible"
                preserveAspectRatio="none"
                aria-hidden
              >
                <defs>
                  <linearGradient
                    id="processCurve"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor={CORAL} stopOpacity="0.25" />
                    <stop offset="8%" stopColor={CORAL} stopOpacity="1" />
                    <stop offset="92%" stopColor={CORAL} stopOpacity="1" />
                    <stop offset="100%" stopColor={CORAL} stopOpacity="0.25" />
                  </linearGradient>
                </defs>

                <path ref={pathRef} d={CURVE_PATH} fill="none" stroke="none" />

                <motion.path
                  d={CURVE_PATH}
                  fill="none"
                  stroke="url(#processCurve)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray={dashLength}
                  initial={{ strokeDashoffset: dashLength }}
                  animate={
                    isCurveInView
                      ? { strokeDashoffset: 0 }
                      : { strokeDashoffset: dashLength }
                  }
                  transition={{
                    duration: 2.2,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{ willChange: isCurveInView ? "stroke-dashoffset" : "auto" }}
                />

                {points.map((point, index) => (
                  <g key={STEPS[index].id}>
                    <circle cx={point.x} cy={point.y} r="14" fill="white" />
                    <circle cx={point.x} cy={point.y} r="5" fill="#A1A1AA" />
                  </g>
                ))}
              </svg>

              {points.map((point, index) => {
                const step = STEPS[index];
                const { label, watermark } = step;
                const left = (point.x / VB_W) * 100 + (label.leftOffset ?? 0);
                const top = (point.y / VB_H) * 100 + (label.topOffset ?? 0);

                return (
                  <div
                    key={`label-${step.id}`}
                    className="absolute"
                    style={{
                      left: `${left}%`,
                      top: `${top}%`,
                      width: label.width ?? 190,
                      transform: `translate(${label.translateX ?? "-15%"}, ${label.translateY ?? "40px"})`,
                    }}
                  >
                    <span
                      className="pointer-events-none absolute select-none font-semibold leading-none"
                      style={{
                        top: watermark.top ?? "-4rem",
                        left: watermark.left,
                        right: watermark.right ?? "0",
                        fontSize: watermark.fontSize ?? "7rem",
                        opacity: watermark.opacity ?? 0.12,
                        color: INK,
                      }}
                      aria-hidden
                    >
                      {step.number}
                    </span>

                    <div className="relative text-left">
                      <h4
                        className="mb-2 text-sm font-semibold leading-snug tracking-[-0.01em] sm:text-[15px]"
                        style={{ color: INK }}
                      >
                        {renderStepTitle(step.title)}
                      </h4>
                      <p className="text-[11px] leading-relaxed sm:text-xs" style={{ color: MUTED }}>
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}