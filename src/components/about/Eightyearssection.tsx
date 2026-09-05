"use client";

import React from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";

const viewportEase = [0.16, 1, 0.3, 1] as const;

function RevealBlock({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: 28, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
        transition={{ duration: 0.7, delay, ease: viewportEase }}
      >
        {children}
      </motion.div>
    </div>
  );
}

function Heading() {
  return (
    <h2 className="text-4xl font-medium leading-[1.18] tracking-[-0.035em] text-black md:text-5xl lg:text-5xl">
      <RevealBlock delay={0}>Eight years of building</RevealBlock>
      <RevealBlock delay={0.08}>what comes next.</RevealBlock>
    </h2>
  );
}

function Paragraphs() {
  return (
    <div className="mt-6 max-w-[540px] space-y-3">
      <RevealBlock delay={0.18}>
        <p className="text-base leading-7 text-[#222222] md:text-lg">
          We started with a simple idea — help businesses build a stronger
          presence in the digital world.
        </p>
      </RevealBlock>

      <RevealBlock delay={0.26}>
        <p className="text-base leading-7 text-[#222222] md:text-lg">
          What began with branding and design gradually grew into websites,
          technology, digital products and a wider network of people who share
          the same obsession with making things better.
        </p>
      </RevealBlock>

      <RevealBlock delay={0.34}>
        <p className="text-base leading-7 text-[#222222] md:text-lg">
          Today, we bring all of that experience together to help ambitious
          ideas take shape, scale and move forward.
        </p>
      </RevealBlock>
    </div>
  );
}

export function EightYearsSection() {
  const sectionRef = React.useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["18vh", "0vh"]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#FEFEFE] py-16 text-black"
    >
      <div className="relative mx-auto max-w-[95vw] md:max-w-[85vw] px-6 md:px-12">
        {/* ── DESKTOP (md and up): unchanged — image as base layer,
             text absolutely overlaid on top, left-aligned. ── */}
        <div className="hidden md:block">
          <div className="relative h-[70vh] w-full">
            <motion.div
              className="absolute inset-0"
              style={{ y: imageY, opacity: 1 }}
            >
              <Image
                src="/images/8-years.webp"
                alt=""
                fill
                priority
                sizes="100vw"
                className="object-contain object-right"
              />
            </motion.div>
          </div>

          <div className="absolute inset-0 z-10 flex items-center">
            <div className="max-w-[570px]">
              <Heading />
              <Paragraphs />
            </div>
          </div>
        </div>

        {/* ── MOBILE (below md): heading → image → content, stacked.
             Image aligned left (object-left) instead of center. ── */}
        <div className="md:hidden">
          <Heading />

          <div className="relative mt-8 h-[42vh] w-full">
            <motion.div
              className="absolute inset-0"
              style={{ y: imageY, opacity: 1 }}
            >
              <Image
                src="/images/8-years.webp"
                alt=""
                fill
                priority
                sizes="100vw"
                className="object-cover object-right"
              />
            </motion.div>
          </div>

          <div className="mt-16">
            <Paragraphs />
          </div>
        </div>
      </div>
    </section>
  );
}

export default EightYearsSection;
