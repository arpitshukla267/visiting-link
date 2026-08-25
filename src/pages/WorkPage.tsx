import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { WORK_PROJECTS } from '../data/pages';

interface WorkPageProps {
  onNavigateHome: () => void;
  onNavigateContact: (serviceName?: string) => void;
}

type FilterKey = 'all' | 'web' | 'identity' | 'graphics';

const FILTER_OPTIONS: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'All work' },
  { key: 'web', label: 'Web' },
  { key: 'identity', label: 'Identity' },
  { key: 'graphics', label: 'Graphics' },
];

export const WorkPage: React.FC<WorkPageProps> = ({
  onNavigateHome,
  onNavigateContact,
}) => {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');
  const gridRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: gridRef,
    offset: ['start end', 'end start'],
  });
  const gridY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const filtered =
    activeFilter === 'all'
      ? WORK_PROJECTS
      : WORK_PROJECTS.filter((p) => p.discipline === activeFilter);

  return (
    <div className="w-full bg-white text-[#111111]">
      {/* Hero */}
      <section className="pt-28 pb-16 md:pb-24 border-b border-[#F0F0F0]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <button
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2 text-sm text-[#666666] hover:text-black transition-colors cursor-pointer mb-12"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight leading-[1.08] max-w-3xl">
              Selected work
            </h1>
            <p className="mt-6 text-lg text-[#666666] leading-relaxed max-w-xl">
              A sample of recent projects across web development, digital
              identity, and visual systems.
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-12 flex flex-wrap gap-2"
          >
            {FILTER_OPTIONS.map((opt) => (
              <button
                key={opt.key}
                onClick={() => setActiveFilter(opt.key)}
                className={`px-5 py-2.5 text-sm font-medium transition-all cursor-pointer ${
                  activeFilter === opt.key
                    ? 'bg-[#111111] text-white'
                    : 'text-[#666666] hover:text-[#111111] border border-[#E5E7EB] hover:border-[#111111]'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Project grid */}
      <section ref={gridRef} className="py-16 md:py-24">
        <motion.div
          style={{ y: gridY }}
          className="max-w-7xl mx-auto px-6 md:px-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#F0F0F0]">
            {filtered.map((project, idx) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group bg-white p-8 md:p-12 hover:bg-[#FAFAFA] transition-colors"
              >
                <div className="flex items-start justify-between mb-8">
                  <div
                    className="w-12 h-1 transition-all duration-300 group-hover:w-20"
                    style={{ backgroundColor: project.accent }}
                  />
                  <span className="text-sm text-[#999999]">{project.year}</span>
                </div>

                <h2 className="text-2xl md:text-3xl font-medium tracking-tight mb-2">
                  {project.name}
                </h2>
                <p className="text-sm text-[#888888] mb-6">{project.category}</p>

                <p className="text-[#555555] leading-relaxed mb-8">
                  {project.description}
                </p>

                <div className="pt-6 border-t border-[#F0F0F0] flex items-center justify-between">
                  <span className="text-sm font-medium text-[#111111]">
                    {project.outcome}
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#CCCCCC] group-hover:text-[#111111] group-hover:translate-x-1 transition-all duration-200" />
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-[#111111] text-white border-t border-[#222222]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight">
              Have a project in mind?
            </h2>
            <p className="mt-3 text-neutral-400 max-w-md">
              We would like to hear about it. Every inquiry gets a personal
              response.
            </p>
          </div>
          <button
            onClick={() => onNavigateContact()}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-[#111111] text-sm font-medium hover:bg-[#F0F0F0] transition-colors cursor-pointer shrink-0"
          >
            <span>Get in touch</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>
      </section>
    </div>
  );
};
