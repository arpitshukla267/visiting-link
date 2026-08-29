"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data/content';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isPaused, setIsPaused] = useState(false);

  const nextTestimonial = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
  }, []);

  const prevTestimonial = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextTestimonial();
    }, 9000);
    return () => clearInterval(interval);
  }, [currentIndex, isPaused, nextTestimonial]);

  const current = TESTIMONIALS_DATA[currentIndex];

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 20 : -20,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -20 : 20,
      opacity: 0,
    }),
  };

  return (
    <section
      id="testimonials"
      className="w-full overflow-hidden border-b border-[#F0F0F0] bg-white py-16 sm:py-20 md:py-32"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="mx-auto max-w-5xl px-5 sm:px-6 md:px-12">
        <div className="mb-10 flex flex-col gap-6 sm:mb-14 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <motion.h2
              id="testimonials-section-heading"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-2xl font-medium leading-tight tracking-tight text-[#111111] sm:text-3xl md:text-[40px]"
            >
              Client perspectives.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-3 text-sm font-normal leading-relaxed text-[#666666] sm:mt-4 sm:text-base"
            >
              Direct accounts from founders, product leaders, and managing directors.
            </motion.p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              id="prev-testimonial-btn"
              onClick={prevTestimonial}
              aria-label="Previous Perspective"
              className="flex h-10 w-10 cursor-pointer items-center justify-center border border-[#E5E7EB] text-[#111111] transition-all duration-200 hover:border-[#111111] hover:bg-[#111111] hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              id="next-testimonial-btn"
              onClick={nextTestimonial}
              aria-label="Next Perspective"
              className="flex h-10 w-10 cursor-pointer items-center justify-center border border-[#E5E7EB] text-[#111111] transition-all duration-200 hover:border-[#111111] hover:bg-[#111111] hover:text-white"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="relative flex min-h-[280px] flex-col justify-between sm:min-h-[300px] md:min-h-[240px]">
          <div className="mb-4 h-5 w-5 border-l-2 border-t-2 border-[#111111] opacity-40 sm:mb-6 sm:h-6 sm:w-6" />

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6 sm:space-y-8"
            >
              <p className="max-w-4xl text-lg font-normal leading-relaxed tracking-tight text-[#111111] sm:text-xl md:text-2xl lg:text-[26px]">
                &ldquo;{current.quote}&rdquo;
              </p>

              <div className="flex flex-col gap-4 border-t border-[#F0F0F0] pt-5 sm:flex-row sm:items-center sm:justify-between sm:pt-6">
                <div>
                  <h4 className="text-sm font-medium text-[#111111] sm:text-base">
                    {current.clientName}
                  </h4>
                  <p className="mt-0.5 text-xs text-[#777777]">
                    {current.clientPosition}, {current.company}
                  </p>
                </div>

                <span className="self-start rounded-none border border-[#EEEEEE] bg-[#FAFAFA] px-3 py-1 text-[10px] font-mono uppercase tracking-[0.2em] text-[#888888] sm:self-auto">
                  {current.serviceCategory}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-6 flex flex-wrap items-center gap-2 sm:mt-8">
            {TESTIMONIALS_DATA.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => {
                  setDirection(idx > currentIndex ? 1 : -1);
                  setCurrentIndex(idx);
                }}
                aria-label={`Go to perspective ${idx + 1}`}
                className={`h-[2px] cursor-pointer transition-all duration-300 ${
                  idx === currentIndex ? 'w-8 bg-[#111111]' : 'w-3 bg-[#E5E7EB] hover:bg-[#999999]'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
