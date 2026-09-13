'use client';

import { useEffect, useRef, useState } from 'react';

export default function CrmShowcase() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect(); // once revealed, keep it revealed
        }
      },
      { threshold: 0.25 } // 25% section visible hote hi trigger
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-black py-20 sm:py-28 flex items-center justify-center overflow-hidden"
    >
      <div
        className={`
          w-[85%]
          rounded-2xl
          overflow-hidden
          shadow-[0_0_60px_rgba(255,255,255,0.08)]

          transition-all
          duration-[1200ms]
          ease-[cubic-bezier(0.16,1,0.3,1)]

          ${
            visible
              ? 'scale-100 opacity-100'
              : 'scale-50 opacity-0'
          }
        `}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/visitinglink_professional_crm_build.gif"
          alt="VisitingLink Professional CRM Build"
          className="w-full h-auto block"
        />
      </div>
    </section>
  );
}