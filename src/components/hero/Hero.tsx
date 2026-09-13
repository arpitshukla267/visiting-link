'use client';

import { useState } from 'react';
import { Montserrat } from 'next/font/google';

import ParticleWordmark from './Particlewordmark';
import TechCarousel from './Techcarousel';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
});

export default function Hero() {
  const [formed, setFormed] = useState(false);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[radial-gradient(ellipse_120%_90%_at_50%_28%,#0b0b0c_0%,#050505_55%,#000_100%)]">
      
      {/* Particle wordmark */}
      <ParticleWordmark
        text="VisitingLink"
        onFormed={() => setFormed(true)}
      />

      <div className="relative z-10 flex min-h-screen flex-col">
        
        {/* Hero copy */}
        <div
          className="
            flex flex-1 flex-col items-center justify-center
            px-5 text-center
            translate-y-[7vh]
            sm:translate-y-[12vh]
          "
        >
          {/* Headline */}
          <h1
            className={`
              ${montserrat.className}
              max-w-[700px]
              text-[30px] leading-[1.2]
              font-semibold tracking-[-0.005em]
              sm:text-[38px]
              lg:text-[46px]

              bg-gradient-to-b
              from-white
              via-[#dcdcdc]
              to-[#999999]
              bg-clip-text
              text-transparent

              transition-all
              duration-[1100ms]
              ease-[cubic-bezier(0.16,1,0.3,1)]

              ${
                formed
                  ? 'translate-y-0 opacity-100 [clip-path:inset(0_0_0_0)]'
                  : 'translate-y-[18%] opacity-0 [clip-path:inset(0_0_100%_0)]'
              }
            `}
          >
            Digital design &amp; software development
          </h1>

          {/* Tagline */}
          <p
            className={`
              ${montserrat.className}
              mt-5
              max-w-[620px]
              text-[15px] leading-[1.6]
              font-medium tracking-[0.005em]
              sm:text-[17px]
              lg:text-[18px]

              bg-gradient-to-b
              from-[#e5e5e5]
              via-[#bdbdbd]
              to-[#858585]
              bg-clip-text
              text-transparent

              transition-all
              duration-[1100ms]
              delay-[400ms]
              ease-[cubic-bezier(0.16,1,0.3,1)]

              ${
                formed
                  ? 'translate-y-0 opacity-100 [clip-path:inset(0_0_0_0)]'
                  : 'translate-y-[18%] opacity-0 [clip-path:inset(0_0_100%_0)]'
              }
            `}
          >
            We design and build digital solutions for growing businesses.
          </p>
        </div>

        {/* Tech carousel */}
        <TechCarousel visible={formed} />
      </div>
    </section>
  );
}