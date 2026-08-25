import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';

export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001
  });

  const [percentage, setPercentage] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      const pct = Math.round(latest * 100);
      setPercentage(pct);
      setIsVisible(latest > 0.03);
    });
  }, [scrollYProgress]);

  return (
    <>
      {/* Top Locomotive Scroll Line */}
      <motion.div
        id="locomotive-scroll-line"
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-[#111111] z-[100] origin-left pointer-events-none"
      />

      {/* Floating Minimal Locomotive Coordinates Telemetry */}
      {/* {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-6 right-6 z-40 hidden sm:flex items-center gap-3 px-3 py-1.5 bg-white/90 backdrop-blur-md border border-[#E5E7EB] text-[10px] font-mono tracking-widest text-[#111111] shadow-[0_2px_8px_rgba(0,0,0,0.04)] pointer-events-none select-none"
        >
          <span className="w-1.5 h-1.5 bg-[#111111] animate-pulse" />
          <span>SCROLL // {percentage.toString().padStart(2, '0')}%</span>
        </motion.div>
      )} */}
    </>
  );
};
