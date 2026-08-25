import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data/content';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length);
  };

  // Subtle auto-advance every 9 seconds, paused on hover
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextTestimonial();
    }, 9000);
    return () => clearInterval(interval);
  }, [currentIndex, isPaused]);

  const current = TESTIMONIALS_DATA[currentIndex];

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 24 : -24,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -24 : 24,
      opacity: 0,
    }),
  };

  return (
    <section
      id="testimonials"
      className="w-full bg-white py-24 md:py-32 border-b border-[#F0F0F0] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 md:mb-20 gap-6">
          <div>
            <motion.h2
              id="testimonials-section-heading"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl sm:text-4xl md:text-[40px] font-medium text-[#111111] tracking-tight leading-tight"
            >
              Client perspectives.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 text-base text-[#666666] font-normal leading-relaxed"
            >
              Direct accounts from founders, product leaders, and managing directors.
            </motion.p>
          </div>

          {/* Minimalist Slider Controls */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              id="prev-testimonial-btn"
              onClick={prevTestimonial}
              aria-label="Previous Perspective"
              className="w-10 h-10 border border-[#E5E7EB] flex items-center justify-center text-[#111111] hover:border-[#111111] hover:bg-[#111111] hover:text-white transition-all duration-200 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              id="next-testimonial-btn"
              onClick={nextTestimonial}
              aria-label="Next Perspective"
              className="w-10 h-10 border border-[#E5E7EB] flex items-center justify-center text-[#111111] hover:border-[#111111] hover:bg-[#111111] hover:text-white transition-all duration-200 cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Editorial Testimonial Display */}
        <div className="relative min-h-[300px] md:min-h-[240px] flex flex-col justify-between">
          <div className="w-6 h-6 border-l-2 border-t-2 border-[#111111] mb-6 opacity-40" />

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8"
            >
              {/* Quote Text */}
              <p className="text-xl sm:text-2xl md:text-[26px] text-[#111111] font-normal leading-relaxed tracking-tight max-w-4xl">
                "{current.quote}"
              </p>

              {/* Client Info */}
              <div className="pt-6 border-t border-[#F0F0F0] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-base font-medium text-[#111111]">
                    {current.clientName}
                  </h4>
                  <p className="text-xs text-[#777777] mt-0.5">
                    {current.clientPosition}, {current.company}
                  </p>
                </div>

                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#888888] bg-[#FAFAFA] border border-[#EEEEEE] px-3 py-1 self-start sm:self-auto">
                  {current.serviceCategory}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Progress Indicator */}
          <div className="flex items-center gap-2 mt-8">
            {TESTIMONIALS_DATA.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => {
                  setDirection(idx > currentIndex ? 1 : -1);
                  setCurrentIndex(idx);
                }}
                aria-label={`Go to perspective ${idx + 1}`}
                className={`h-[2px] transition-all duration-300 cursor-pointer ${
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
