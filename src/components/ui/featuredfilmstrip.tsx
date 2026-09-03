"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

export type FeatureItem = {
  num: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  url: string;
};

export type FilmstripScrollerProps = {
  slides: ReactNode[];
  slideKeys?: (string | number)[];
  title?: ReactNode;
  titleClassName?: string;
  vhPerCard?: number;
  className?: string;
  stickyClassName?: string;
  slideClassName?: string;
  trackClassName?: string;
  trackGutterClassName?: string;
};

export function FilmstripScroller({
  slides,
  slideKeys,
  title,
  titleClassName,
  vhPerCard = 45,
  className,
  stickyClassName,
  slideClassName = "w-screen shrink-0 px-5 flex items-center justify-center",
  trackClassName,
  trackGutterClassName = "-mx-5 md:-mx-10",
}: FilmstripScrollerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 420,
    damping: 40,
    mass: 0.25,
    restDelta: 0.001,
  });

  const maxShiftPercent =
    slides.length > 1 ? ((slides.length - 1) / slides.length) * 100 : 0;

  const trackX = useTransform(
    smoothProgress,
    [0, 1],
    ["0%", `-${maxShiftPercent}%`],
  );

  return (
    <div
      ref={containerRef}
      className={cn("relative", className)}
      style={{ height: `${slides.length * vhPerCard}vh` }}
    >
      <div
        className={cn(
          "sticky top-0 flex h-[100svh] flex-col",
          stickyClassName ?? "bg-background px-5 pb-6 pt-20 md:px-10",
        )}
      >
        {title && (
          <div className={cn("mb-4 shrink-0", titleClassName)}>{title}</div>
        )}

        <div
          className={cn(
            "flex min-h-0 flex-1 items-center overflow-hidden",
            trackGutterClassName,
          )}
        >
          <motion.div
            style={{
              x: trackX,
              translateZ: 0,
              backfaceVisibility: "hidden",
            }}
            className={cn("flex will-change-transform", trackClassName)}
          >
            {slides.map((slide, i) => (
              <div
                key={slideKeys?.[i] ?? i}
                className={slideClassName}
              >
                {slide}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

type FeatureFilmstripProps = {
  items: FeatureItem[];
  title?: ReactNode;
  vhPerCard?: number;
  className?: string;
};

export function FeatureFilmstrip({
  items,
  title,
  vhPerCard = 45,
  className,
}: FeatureFilmstripProps) {
  return (
    <FilmstripScroller
      title={title}
      vhPerCard={vhPerCard}
      className={className}
      slideKeys={items.map((item) => item.num)}
      slideClassName="w-screen shrink-0 px-5 md:w-[45vw] md:px-3 flex items-center justify-center"
      slides={items.map((item, i) => (
        <div key={item.num} className="w-full">
          <div className="md:hidden flex h-[470px] w-full max-w-sm flex-col overflow-hidden rounded-2xl bg-card shadow-[0_14px_36px_-6px_rgba(0,0,0,0.08)] sm:h-[480px]">
            <div className="relative h-[220px] w-full shrink-0 overflow-hidden bg-secondary sm:h-[200px]">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
                sizes="90vw"
                loading={i < 2 ? "eager" : "lazy"}
                priority={i === 0}
              />
            </div>

            <div className="flex min-h-0 flex-1 flex-col justify-between overflow-hidden bg-card p-5 sm:p-6">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-semibold text-accent">
                    {item.num}
                  </span>
                  <span className="h-1 w-1 rounded-full bg-border" />
                  <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
                    {item.tagline}
                  </span>
                </div>

                <h3 className="mt-2 text-lg font-semibold tracking-tight text-foreground">
                  {item.title}
                </h3>

                <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                  {item.description}
                </p>
              </div>

              <div className="pt-3">
                <Link
                  href={`/contact?service=${encodeURIComponent(item.title)}&additionalRequirement=${encodeURIComponent(`Enquiry for ${item.title} service`)}`}
                  className="group/btn inline-flex items-center gap-2 text-xs font-semibold text-accent transition-colors hover:text-primary"
                >
                  Request Quotation
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>

          <div className="group relative hidden aspect-[18/14] w-full max-h-[75vh] overflow-hidden rounded-2xl bg-card shadow-[0_14px_36px_-6px_rgba(0,0,0,0.08)] md:block">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              sizes="45vw"
              loading={i < 2 ? "eager" : "lazy"}
              priority={i === 0}
            />

            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-6 lg:p-7">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-semibold text-accent">
                  {item.num}
                </span>
                <span className="h-1 w-1 rounded-full bg-white/40" />
                <span className="text-[11px] font-mono uppercase tracking-wider text-white/70">
                  {item.tagline}
                </span>
              </div>

              <h3 className="mt-2 text-xl font-semibold tracking-tight text-white lg:text-2xl">
                {item.title}
              </h3>

              <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-white/75">
                {item.description}
              </p>

              <div className="pt-3">
                <Link
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn inline-flex items-center gap-2 text-xs font-semibold text-white transition-colors hover:text-accent"
                >
                  View Project
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    />
  );
}
