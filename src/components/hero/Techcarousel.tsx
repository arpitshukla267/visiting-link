interface TechCarouselProps {
    /** Set true once the particle wordmark has finished forming. */
    visible?: boolean;
  }
  
  const ITEMS = [
    {
      name: 'Next.js',
      svg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4}>
          <circle cx="12" cy="12" r="9.3" />
          <path d="M8.3 8.2 16 17.8M15 8.2v7.6" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      name: 'React',
      svg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.3}>
          <circle cx="12" cy="12" r="1.9" fill="currentColor" stroke="none" />
          <ellipse cx="12" cy="12" rx="9.5" ry="4" />
          <ellipse cx="12" cy="12" rx="9.5" ry="4" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="9.5" ry="4" transform="rotate(120 12 12)" />
        </svg>
      ),
    },
    {
      name: 'Node.js',
      svg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinejoin="round">
          <path d="M12 2 21 7v10l-9 5-9-5V7z" />
        </svg>
      ),
    },
    {
      name: 'MongoDB',
      svg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4}>
          <path d="M12 2c3 3.5 4.5 7 4.5 10.5A4.5 4.5 0 0 1 12 17a4.5 4.5 0 0 1-4.5-4.5C7.5 9 9 5.5 12 2Z" />
          <path d="M12 17v5" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      name: 'TypeScript',
      svg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4}>
          <rect x="3" y="3" width="18" height="18" rx="2.5" />
          <path d="M8 12h4M10 12v5" strokeLinecap="round" />
          <path
            d="M14.5 16.3c.4.5 1 .8 1.7.8 1 0 1.8-.5 1.8-1.4 0-2-3.4-1.2-3.4-3.3 0-.9.8-1.5 1.8-1.5.7 0 1.3.3 1.6.8"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      name: 'Figma',
      svg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4}>
          <path d="M9 2h4a3 3 0 0 1 0 6H9z" />
          <path d="M9 8h4a3 3 0 0 1 0 6H9z" />
          <path d="M9 14h3a3 3 0 1 1-3 3z" />
          <circle cx="15.5" cy="17" r="2.5" />
        </svg>
      ),
    },
    {
      name: 'AWS',
      svg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4}>
          <path d="M3 15.5c4 2.3 14 2.3 18 0" strokeLinecap="round" />
          <path
            d="M17.5 14.2c1.3.2 2.5.6 3.5 1.2-.4-1.2-.9-2.6-1.6-3.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7 12V6.5a2.5 2.5 0 0 1 5 0M7 12a2.2 2.2 0 0 0 4.3.7M12 6.5V12a2.3 2.3 0 0 0 4.4.9"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      name: 'Vercel',
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
          <path d="M12 3 22 20H2Z" />
        </svg>
      ),
    },
  ];
  
  /**
   * Pure-CSS marquee: duplicates the item list once and animates a
   * translateX(-50%) loop, so there is no JS animation cost at runtime.
   *
   * `visible` gates the whole strip's entrance — pass `formed` from Hero
   * so it only fades in once the particle wordmark has finished
   * assembling, matching the eyebrow/tagline reveal timing.
   *
   * The marquee keyframes are defined in the inline <style> below rather
   * than tailwind.config, since Tailwind doesn't support ad-hoc custom
   * keyframes without a config edit — this keeps the component
   * drop-in/self-contained. Tailwind's arbitrary `animate-[...]` value
   * just references the keyframe name, so the browser resolves it from
   * this inline rule same as it would from a stylesheet.
   */
  export default function TechCarousel({ visible = false }: TechCarouselProps) {
    const track = [...ITEMS, ...ITEMS];
  
    return (
      <div
        className={`relative flex flex-shrink-0 items-center gap-7 overflow-hidden border-t border-white/[0.09] bg-gradient-to-b from-black/0 to-black/50 py-[22px] mt-auto transition-opacity duration-[1100ms] ease-out delay-200 motion-reduce:duration-[.01ms] ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
      >
  
        <div className="flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent_0,#000_8%,#000_92%,transparent_100%)] [-webkit-mask-image:linear-gradient(90deg,transparent_0,#000_8%,#000_92%,transparent_100%)]">
          <div className="flex w-max gap-14 animate-[techScroll_32s_linear_infinite] motion-reduce:animate-none">
            {track.map((item, i) => (
              <div
                key={`${item.name}-${i}`}
                className="flex items-center gap-2.5 whitespace-nowrap text-sm font-medium text-[#9a9793] opacity-70"
              >
                <span className="h-[18px] w-[18px] flex-shrink-0 opacity-85 [&>svg]:h-full [&>svg]:w-full">
                  {item.svg}
                </span>
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        </div>
  
        <style>{`
          @keyframes techScroll {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
        `}</style>
      </div>
    );
  }