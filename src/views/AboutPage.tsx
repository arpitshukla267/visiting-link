"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { ScrollAssembleTypography } from '../components/ui/ScrollAssembleTypography';
import {
  ABOUT_HERO_IMAGE,
  ABOUT_HERO_STATS,
  ABOUT_CHAPTERS,
  ABOUT_VISION,
  ABOUT_MISSION,
  ABOUT_CLOSING,
  AboutChapter,
} from '../data/pages';

interface AboutPageProps {
  onNavigateHome: () => void;
  onNavigateContact: () => void;
}

/* ── Section graphics ───────────────────────────────────────────── */

const ClientsGraphic: React.FC<{ dark?: boolean }> = ({ dark }) => {
  const stroke = dark ? '#333' : '#E5E7EB';
  const fill = dark ? '#fff' : '#111';
  const muted = dark ? '#555' : '#CCC';
  return (
    <svg className="w-full h-full" viewBox="0 0 360 360" fill="none" aria-hidden>
      {Array.from({ length: 5 }).map((_, row) =>
        Array.from({ length: 5 }).map((_, col) => (
          <rect
            key={`${row}-${col}`}
            x={40 + col * 56}
            y={40 + row * 56}
            width={44}
            height={44}
            stroke={stroke}
            fill={row === 2 && col === 2 ? fill : row + col > 4 ? (dark ? '#222' : '#F5F5F5') : 'none'}
          />
        ))
      )}
      <motion.circle
        cx="180" cy="180" r="6"
        fill={fill}
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.3 }}
      />
      <text x="180" y="330" textAnchor="middle" fill={muted} fontSize="11" fontFamily="Poppins, sans-serif">900+</text>
    </svg>
  );
};

const DesignersGraphic: React.FC<{ dark?: boolean }> = ({ dark }) => {
  const stroke = dark ? '#444' : '#E5E7EB';
  const dot = dark ? '#fff' : '#111';
  const nodes = [[180,60],[300,120],[300,240],[180,300],[60,240],[60,120]];
  return (
    <svg className="w-full h-full" viewBox="0 0 360 360" fill="none" aria-hidden>
      <circle cx="180" cy="180" r="130" stroke={stroke} />
      <circle cx="180" cy="180" r="80" stroke={stroke} />
      {nodes.map(([cx, cy], i) => (
        <g key={i}>
          <line x1="180" y1="180" x2={cx} y2={cy} stroke={stroke} />
          <circle cx={cx} cy={cy} r="10" fill={i % 2 === 0 ? dot : (dark ? '#333' : '#DDD')} />
        </g>
      ))}
      <circle cx="180" cy="180" r="14" fill={dot} />
    </svg>
  );
};

const DevelopersGraphic: React.FC = () => (
  <svg className="w-full h-full" viewBox="0 0 360 360" fill="none" aria-hidden>
    <rect x="40" y="40" width="280" height="200" stroke="#333" fill="#1a1a1a" />
    <rect x="40" y="40" width="280" height="28" fill="#222" />
    <circle cx="56" cy="54" r="4" fill="#555" />
    <circle cx="70" cy="54" r="4" fill="#555" />
    <circle cx="84" cy="54" r="4" fill="#555" />
    {['const team = 100;', 'build(product);', 'deploy(scale);', 'return impact;'].map((line, i) => (
      <text key={i} x="56" y={90 + i * 28} fill={i === 0 ? '#fff' : '#666'} fontSize="13" fontFamily="monospace">{line}</text>
    ))}
    <motion.rect
      x="40" y="260" width="0" height="60" fill="#fff" fillOpacity="0.08"
      animate={{ width: 280 }}
      transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      style={{ originX: 0 }}
    />
    <rect x="40" y="260" width="280" height="60" stroke="#333" />
    <text x="180" y="298" textAnchor="middle" fill="#888" fontSize="11" fontFamily="Poppins, sans-serif">100+ developers</text>
  </svg>
);

const BrandsGraphic: React.FC<{ dark?: boolean }> = ({ dark }) => {
  const stroke = dark ? '#444' : '#E5E7EB';
  const accent = dark ? '#fff' : '#111';
  return (
    <svg className="w-full h-full" viewBox="0 0 360 360" fill="none" aria-hidden>
      {[[60,80,120,60],[200,60,120,60],[60,200,120,60],[200,200,120,60]].map(([x,y,w,h], i) => (
        <g key={i}>
          <rect x={x} y={y} width={w} height={h} stroke={stroke} fill={dark ? '#1a1a1a' : '#FAFAFA'} />
          <rect x={x+12} y={y+14} width={w*0.6} height={6} fill={i===0?accent:(dark?'#444':'#E5E7EB')} />
          <rect x={x+12} y={y+28} width={w*0.4} height={4} fill={dark?'#333':'#F0F0F0'} />
        </g>
      ))}
      <motion.path
        d="M 120 140 L 180 180 L 240 140 M 120 260 L 180 220 L 240 260"
        stroke={accent} strokeWidth="1.5" fill="none"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
        viewport={{ once: true }} transition={{ duration: 1.2 }}
      />
      <circle cx="180" cy="180" r="8" fill={accent} />
    </svg>
  );
};

const RecordGraphic: React.FC<{ dark?: boolean }> = ({ dark }) => {
  const bars = [80, 120, 160, 210, 270];
  const fills = dark ? ['#333','#444','#555','#777','#fff'] : ['#E5E7EB','#CCC','#999','#555','#111'];
  return (
    <svg className="w-full h-full" viewBox="0 0 360 360" fill="none" aria-hidden>
      <line x1="40" y1="300" x2="320" y2="300" stroke={dark?'#333':'#E5E7EB'} />
      {bars.map((h, i) => (
        <motion.rect
          key={i}
          x={56 + i * 52}
          y={300 - h}
          width={36}
          height={h}
          fill={fills[i]}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          style={{ originY: 1 }}
        />
      ))}
      <motion.path
        d="M 74 220 L 126 180 L 178 140 L 230 90 L 282 30"
        stroke={dark ? '#fff' : '#111'} strokeWidth="1.5" fill="none"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
        viewport={{ once: true }} transition={{ duration: 1.4, delay: 0.3 }}
      />
    </svg>
  );
};

const VisionGraphic: React.FC = () => (
  <svg className="w-full h-full" viewBox="0 0 360 360" fill="none" aria-hidden>
    <rect x="0" y="0" width="360" height="360" fill="#FAFAFA" />
    <circle cx="180" cy="180" r="100" stroke="#E5E7EB" />
    <circle cx="180" cy="180" r="50" fill="#111" />
    {['Devs','Creators','Ideas','Direction'].map((label, i) => {
      const angle = (i * 90 - 90) * (Math.PI / 180);
      const cx = 180 + Math.cos(angle) * 140;
      const cy = 180 + Math.sin(angle) * 140;
      return (
        <g key={label}>
          <line x1="180" y1="180" x2={cx} y2={cy} stroke="#E5E7EB" />
          <rect x={cx - 36} y={cy - 16} width="72" height="32" fill="#fff" stroke="#111" />
          <text x={cx} y={cy + 5} textAnchor="middle" fill="#111" fontSize="11" fontFamily="Poppins, sans-serif">{label}</text>
        </g>
      );
    })}
  </svg>
);

const MissionGraphic: React.FC = () => (
  <svg className="w-full h-full" viewBox="0 0 360 360" fill="none" aria-hidden>
    <circle cx="60" cy="180" r="28" stroke="#111" strokeWidth="1.5" />
    <text x="60" y="185" textAnchor="middle" fill="#111" fontSize="11" fontFamily="Poppins, sans-serif">0</text>
    <motion.path
      d="M 88 180 C 140 180, 140 100, 200 100 S 260 180, 300 180"
      stroke="#111" strokeWidth="1.5" fill="none"
      initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
      viewport={{ once: true }} transition={{ duration: 1.4 }}
    />
    <polygon points="300,172 312,180 300,188" fill="#111" />
    <rect x="272" y="152" width="56" height="56" fill="#111" />
    <text x="300" y="186" textAnchor="middle" fill="#fff" fontSize="11" fontFamily="Poppins, sans-serif">Real</text>
    <rect x="40" y="260" width="280" height="48" stroke="#E5E7EB" fill="#FAFAFA" />
    <text x="180" y="290" textAnchor="middle" fill="#666" fontSize="11" fontFamily="Poppins, sans-serif">idea → build → launch</text>
  </svg>
);

const ClosingGraphic: React.FC = () => {
  const stats = [
    { label: '900+', sub: 'clients' },
    { label: '100+', sub: 'designers' },
    { label: '120+', sub: 'brands' },
    { label: '100+', sub: 'devs' },
  ];
  return (
    <svg className="w-full max-w-lg mx-auto" viewBox="0 0 400 120" fill="none" aria-hidden>
      {stats.map((s, i) => (
        <g key={s.sub} transform={`translate(${i * 100}, 0)`}>
          <circle cx="50" cy="50" r="40" stroke="#333" />
          <text x="50" y="48" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="500" fontFamily="Poppins, sans-serif">{s.label}</text>
          <text x="50" y="66" textAnchor="middle" fill="#666" fontSize="10" fontFamily="Poppins, sans-serif">{s.sub}</text>
        </g>
      ))}
    </svg>
  );
};

const CHAPTER_GRAPHICS: Record<string, React.ReactNode> = {
  legacy: <ClientsGraphic />,
  designers: <DesignersGraphic />,
  developers: <DevelopersGraphic />,
  brands: <BrandsGraphic />,
  record: <RecordGraphic />,
};

/* ── Shared components ──────────────────────────────────────────── */

const ChapterSection: React.FC<{
  chapter: AboutChapter;
  index: number;
}> = ({ chapter, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 90%', 'end 60%'] });
  const opacity = useTransform(scrollYProgress, [0, 0.35], [0.4, 1]);
  const y = useTransform(scrollYProgress, [0, 0.35], [20, 0]);

  const isDark = chapter.dark;
  const bg = isDark ? 'bg-[#111111] text-white' : 'bg-white text-[#111111]';
  const muted = isDark ? 'text-neutral-400' : 'text-[#666666]';
  const border = isDark ? 'border-[#222222]' : 'border-[#F0F0F0]';
  const graphic = CHAPTER_GRAPHICS[chapter.id];

  return (
    <section ref={ref} className={`py-12 md:py-16 border-b ${border} ${bg}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className={`grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-12 items-center ${index % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''}`}>
          <motion.div
            style={{ opacity, y }}
            className="relative aspect-[4/3] max-w-xs sm:max-w-sm mx-auto lg:mx-0 w-full"
          >
            {chapter.id === 'developers' ? <DevelopersGraphic /> : graphic}
          </motion.div>

          <motion.div style={{ opacity, y }}>
            <p className={`text-xs font-medium mb-2 ${isDark ? 'text-neutral-500' : 'text-[#888888]'}`}>
              {chapter.eyebrow}
            </p>
            <h2 className="text-2xl md:text-4xl font-medium tracking-tight leading-[1.1] mb-5">
              {chapter.headline}
            </h2>
            <div className={`space-y-3 text-sm md:text-base leading-relaxed ${muted}`}>
              {chapter.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
            </div>
            {chapter.pullQuote && (
              <blockquote className={`mt-5 text-lg md:text-xl font-medium tracking-tight leading-snug border-l-2 pl-4 ${isDark ? 'border-white text-white' : 'border-[#111111] text-[#111111]'}`}>
                {chapter.pullQuote}
              </blockquote>
            )}
            {chapter.highlights && (
              <div className="mt-5 space-y-2">
                {chapter.highlights.map((line) => (
                  <p key={line} className={`text-base md:text-lg font-medium tracking-tight ${isDark ? 'text-white' : 'text-[#111111]'}`}>
                    {line}
                  </p>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const FadeIn: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({
  children, className = '', delay = 0,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

/* ── Page ─────────────────────────────────────────────────────── */

export const AboutPage: React.FC<AboutPageProps> = ({
  onNavigateHome,
  onNavigateContact,
}) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(heroProgress, [0, 1], [0, 80]);
  const heroOpacity = useTransform(heroProgress, [0, 0.85], [1, 0]);
  const bgScale = useTransform(heroProgress, [0, 1], [1, 1.06]);
  const bgY = useTransform(heroProgress, [0, 1], ['0%', '10%']);

  return (
    <div className="w-full bg-white text-[#111111]">
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative bg-[#0A0A0C] text-white pt-28 pb-28 md:pb-36 overflow-hidden min-h-[85vh] md:min-h-[90vh] flex items-end"
      >
        <motion.div style={{ scale: bgScale, y: bgY }} className="absolute inset-0 z-0" aria-hidden>
          <img src={ABOUT_HERO_IMAGE} alt="" className="absolute inset-0 w-full h-full object-cover object-[65%_center] md:object-right" />
        </motion.div>
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{ background: 'linear-gradient(105deg, rgba(10,10,12,0.97) 0%, rgba(10,10,12,0.88) 38%, rgba(10,10,12,0.55) 62%, rgba(10,10,12,0.25) 100%)' }}
        />
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#0A0A0C] via-transparent to-[#0A0A0C]/60 pointer-events-none" />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
          <button
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors cursor-pointer mb-14"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>

          <div className="max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl md:text-7xl font-medium tracking-tight leading-[1.06]"
            >
              Built Before.
              <br />
              <span className="text-white/40">Built for What&apos;s Next.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="mt-6 text-lg md:text-xl text-neutral-400 leading-relaxed max-w-xl"
            >
              We&apos;ve spent years building brands, working with people, solving problems and delivering ideas.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22 }}
            className="mt-14 md:mt-16 grid grid-cols-3 gap-4 md:gap-8 max-w-md"
          >
            {ABOUT_HERO_STATS.map((stat) => (
              <div key={stat.label} className="border-l border-white/20 pl-4">
                <div className="text-2xl md:text-4xl font-medium tracking-tight">{stat.value}</div>
                <div className="mt-0.5 text-xs text-neutral-500">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mt-10 md:mt-12 text-lg md:text-xl text-white font-medium"
          >
            Now, we&apos;re building something bigger.
          </motion.p>
        </motion.div>
      </section>

      {/* Kinetic statement */}
      <section className="py-14 md:py-20 border-b border-[#F0F0F0]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <ScrollAssembleTypography
            phrase="Every project taught us something. Every client made us better. Every challenge became part of what we are building today."
            className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight leading-[1.2] max-w-4xl"
            startColor="rgba(180, 180, 180, 0.5)"
            endColor="rgba(17, 17, 17, 1)"
            tracking="0.03em"
          />
        </div>
      </section>

      {/* Chapters — each with a graphic */}
      {ABOUT_CHAPTERS.map((chapter, i) => (
        <ChapterSection key={chapter.id} chapter={chapter} index={i} />
      ))}

      {/* Vision */}
      <section className="py-12 md:py-16 border-b border-[#F0F0F0] bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <FadeIn>
              <p className="text-xs font-medium text-[#888888] mb-2">{ABOUT_VISION.title}</p>
              <h2 className="text-2xl md:text-4xl font-medium tracking-tight leading-[1.1] mb-4">
                {ABOUT_VISION.headline}
              </h2>
              <div className="space-y-3 text-[#666666] text-sm md:text-base leading-relaxed">
                {ABOUT_VISION.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </FadeIn>
            <FadeIn delay={0.1} className="aspect-[4/3] max-w-sm mx-auto lg:mx-0 w-full">
              <VisionGraphic />
            </FadeIn>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[#E5E7EB] mt-10">
            {ABOUT_VISION.pillars.map((pillar, idx) => (
              <FadeIn key={pillar} delay={idx * 0.06}>
                <div className="bg-white p-5 md:p-6 h-full">
                  <p className="text-base md:text-lg font-medium tracking-tight leading-snug">{pillar}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-12 md:py-16 border-b border-[#F0F0F0]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <FadeIn className="aspect-[4/3] max-w-sm mx-auto lg:mx-0 w-full order-2 lg:order-1">
              <MissionGraphic />
            </FadeIn>
            <FadeIn delay={0.08} className="order-1 lg:order-2">
              <p className="text-xs font-medium text-[#888888] mb-2">{ABOUT_MISSION.title}</p>
              <h2 className="text-2xl md:text-4xl font-medium tracking-tight leading-[1.1] mb-4">
                {ABOUT_MISSION.headline}
              </h2>
              <div className="space-y-3 text-[#666666] text-sm md:text-base leading-relaxed">
                {ABOUT_MISSION.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="py-14 md:py-20 bg-[#111111] text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <FadeIn>
            <h2 className="text-2xl md:text-4xl font-medium tracking-tight leading-[1.1] mb-8">
              {ABOUT_CLOSING.title}
            </h2>
          </FadeIn>

          <FadeIn delay={0.08} className="mb-8">
            <ClosingGraphic />
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto mb-8">
            {ABOUT_CLOSING.stats.map((stat, idx) => (
              <FadeIn key={stat} delay={idx * 0.05}>
                <p className="text-neutral-400 text-sm md:text-base">{stat}</p>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.15}>
            <p className="text-xl md:text-2xl font-medium tracking-tight mb-6">{ABOUT_CLOSING.tagline}</p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-xs text-neutral-500 mb-8">
              {ABOUT_CLOSING.footer.map((line) => <span key={line}>{line}</span>)}
            </div>
          </FadeIn>

          <FadeIn delay={0.25}>
            <button
              onClick={onNavigateContact}
              className="group inline-flex items-center gap-3 px-7 py-3.5 bg-white text-[#111111] text-sm font-medium hover:bg-[#F0F0F0] transition-colors cursor-pointer"
            >
              <span>Start a conversation</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </FadeIn>
        </div>
      </section>
    </div>
  );
};
