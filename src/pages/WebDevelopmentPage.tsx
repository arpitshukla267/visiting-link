import React, { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  ChevronDown,
  ExternalLink,
} from "lucide-react";
import { SERVICES_DATA } from "../data/content";

interface WebDevelopmentPageProps {
  onNavigateHome: () => void;
  onNavigateService: (serviceId: string) => void;
  onNavigateContact: (serviceName?: string) => void;
}

/* ================================================================== */
/*  Fonts + keyframes — injected once. Space Grotesk for display,       */
/*  Inter for body, JetBrains Mono for every code / terminal / label    */
/*  moment. The mono face isn't a caption font here — it's the voice    */
/*  of the whole page, because the subject is code.                     */
/* ================================================================== */
function PageStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap');

      .wd-font-display { font-family: 'Space Grotesk', sans-serif; }
      .wd-font-mono { font-family: 'JetBrains Mono', monospace; }
      .wd-root { font-family: 'Inter', sans-serif; }

      .wd-caret {
        display: inline-block;
        width: 7px;
        height: 14px;
        margin-left: 2px;
        background: #6EE7C8;
        vertical-align: text-bottom;
        animation: wd-blink 1s steps(1) infinite;
      }
      @keyframes wd-blink { 50% { opacity: 0; } }

      .wd-marquee-track {
        width: max-content;
        animation: wd-marquee 32s linear infinite;
      }
      @keyframes wd-marquee {
        from { transform: translateX(0); }
        to { transform: translateX(-50%); }
      }

      @media (prefers-reduced-motion: reduce) {
        .wd-marquee-track { animation: none; }
        .wd-caret { animation: none; }
      }
    `}</style>
  );
}

/* ================================================================== */
/*  Signature moment — a terminal that types out a real build log.      */
/*  This is the one thing on the page that could only be a web-dev      */
/*  studio's hero: the artifact developers actually stare at.           */
/* ================================================================== */
const TERMINAL_LINES = [
  "$ npm run build",
  "",
  "✓ compiling routes",
  "✓ optimizing images    12.4MB → 0.6MB",
  "✓ type-checking        0 errors",
  "✓ build complete in 0.94s",
  "",
  "Route (app)                     Size",
  "○ /                              4.1 kB",
  "○ /work                          2.8 kB",
  "○ /contact                       1.9 kB",
  "",
  "Ready — ship it →",
];

function TypewriterTerminal() {
  const [visibleChars, setVisibleChars] = useState(0);
  const fullText = TERMINAL_LINES.join("\n");

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      setVisibleChars(fullText.length);
      return;
    }

    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setVisibleChars(i);
      if (i >= fullText.length) clearInterval(id);
    }, 16);
    return () => clearInterval(id);
  }, [fullText]);

  const lines = fullText.slice(0, visibleChars).split("\n");

  const colorFor = (line: string) => {
    if (line.startsWith("$")) return "#6EE7C8";
    if (line.startsWith("✓")) return "#8A9099";
    if (line.startsWith("Ready")) return "#FFB454";
    return "#EDEDEA";
  };

  return (
    <div className="w-full rounded-md overflow-hidden bg-[#101317] border border-white/10 shadow-[0_40px_90px_-35px_rgba(0,0,0,0.75)]">
      <div className="h-9 flex items-center gap-2 px-4 bg-[#0B0D10] border-b border-white/10">
        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]/70" />
        <span className="ml-3 text-[11px] tracking-wide text-white/40 wd-font-mono">
          build.log
        </span>
      </div>
      <div className="p-5 sm:p-6 wd-font-mono text-[12.5px] sm:text-[13px] leading-[1.75] min-h-[280px]">
        {lines.map((line, i) => (
          <div
            key={i}
            style={{ color: colorFor(line) }}
            className="whitespace-pre"
          >
            {line || "\u00A0"}
          </div>
        ))}
        <span className="wd-caret" />
      </div>
    </div>
  );
}

/* ================================================================== */
/*  Client marquee — quiet social proof, mono wordmarks drifting past.  */
/* ================================================================== */
function ClientMarquee() {
  const clients = [
    "VANCE & ASSOCIATES",
    "NORTHLINE FREIGHT",
    "MARROW STUDIO",
    "HELIX LABS",
    "PORTAGE & CO.",
    "GRAYWATER",
    "KESTREL SYSTEMS",
    "OARLOCK",
  ];
  const loop = [...clients, ...clients];

  return (
    <div className="overflow-hidden border-y border-[#E7E7E4] bg-[#F7F7F5] py-6">
      <div className="wd-marquee-track flex items-center gap-16">
        {loop.map((c, i) => (
          <span
            key={i}
            className="wd-font-mono text-xs tracking-[0.18em] text-[#9A9FA6] whitespace-nowrap"
          >
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ================================================================== */
/*  Stat counter — counts up once when it scrolls into view.            */
/* ================================================================== */
function StatCounter({
  value,
  suffix = "",
  label,
  duration = 1.1,
}: {
  value: number;
  suffix?: string;
  label: string;
  duration?: number;
}) {
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  return (
    <motion.div
      onViewportEnter={() => {
        if (started.current) return;
        started.current = true;
        const start = performance.now();
        const step = (t: number) => {
          const p = Math.min(1, (t - start) / (duration * 1000));
          const eased = 1 - Math.pow(1 - p, 3);
          setDisplay(Math.round(value * eased));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }}
      viewport={{ once: true, margin: "-80px" }}
    >
      <span className="wd-font-display text-4xl sm:text-5xl font-semibold text-white block tabular-nums">
        {display}
        {suffix}
      </span>
      <span className="text-sm text-white/45 mt-2 block wd-font-mono tracking-wide">
        {label}
      </span>
    </motion.div>
  );
}

/* ================================================================== */
/*  3D tilt wrapper — used on the project cards. Tracks the cursor and  */
/*  tilts the card in real perspective space, springs back on leave.    */
/* ================================================================== */
function TiltCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({ rotateX: 0, rotateY: 0 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setStyle({ rotateY: px * 14, rotateX: -py * 14 });
  };

  const handleLeave = () => setStyle({ rotateX: 0, rotateY: 0 });

  return (
    <div style={{ perspective: 1200 }} className={className}>
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        animate={{ rotateX: style.rotateX, rotateY: style.rotateY }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        style={{ transformStyle: "preserve-3d" }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ================================================================== */
/*  Code editor mock — replaces the generic browser-frame mock. Every   */
/*  project card shows a believable file tab and three lines of code    */
/*  tinted with that project's accent, echoing the terminal above.      */
/* ================================================================== */
function CodeEditorMock({ accent }: { accent: string }) {
  const lines = [
    { text: "import { Hero } from './hero'", c: "#7B818A" },
    { text: "export default function Page() {", c: "#EDEDEA" },
    { text: '  return <Hero accent="brand" />', c: accent },
    { text: "}", c: "#EDEDEA" },
  ];

  return (
    <div className="w-full h-full rounded-md overflow-hidden bg-[#101317] border border-white/10">
      <div className="h-7 flex items-center gap-1.5 px-3 bg-[#0B0D10] border-b border-white/10">
        <span className="w-2 h-2 rounded-full bg-white/15" />
        <span className="w-2 h-2 rounded-full bg-white/15" />
        <span className="w-2 h-2 rounded-full bg-white/15" />
        <span className="ml-2 text-[10px] wd-font-mono text-white/30">
          page.tsx
        </span>
      </div>
      <div className="p-4 wd-font-mono text-[11px] leading-[1.95]">
        {lines.map((l, i) => (
          <div key={i} style={{ color: l.c }} className="whitespace-pre">
            <span className="text-white/20 mr-3">{i + 1}</span>
            {l.text}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ================================================================== */
/*  Page                                                                 */
/* ================================================================== */
export const WebDevelopmentPage: React.FC<WebDevelopmentPageProps> = ({
  onNavigateHome,
  onNavigateService,
  onNavigateContact,
}) => {
  const service = SERVICES_DATA.find((s) => s.id === "web-development")!;
  const [activeStackTab, setActiveStackTab] = useState<
    "frontend" | "backend" | "performance"
  >("frontend");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const stackDetails = {
    frontend: [
      {
        name: "TypeScript",
        desc: "Strict type safety, zero runtime errors, crystal-clear maintainability.",
      },
      {
        name: "React 19 & Vite",
        desc: "Modular component architecture with instantaneous builds and fast loads.",
      },
      {
        name: "Tailwind CSS v4",
        desc: "Zero runtime overhead, mathematical spacing systems, and fluid responsive design.",
      },
      {
        name: "Motion / Framer",
        desc: "Hardware-accelerated layout transitions and scroll-driven kinematics.",
      },
    ],
    backend: [
      {
        name: "Node.js & Express",
        desc: "Lightweight REST APIs, secure token auth, and cloud proxy architectures.",
      },
      {
        name: "PostgreSQL / Firestore",
        desc: "Scalable relational schemas or real-time document stores.",
      },
      {
        name: "Serverless Edge Functions",
        desc: "Distributed compute closer to users for sub-50ms execution.",
      },
      {
        name: "Automated CI/CD",
        desc: "Zero-downtime deployment pipelines with automated linting & build verification.",
      },
    ],
    performance: [
      {
        name: "100 Core Web Vitals",
        desc: "Tuned for sub-0.8s Largest Contentful Paint (LCP) and zero Layout Shift (CLS).",
      },
      {
        name: "Edge Asset Compression",
        desc: "Modern WebP/AVIF media delivery and minified asset bundles.",
      },
      {
        name: "WCAG 2.1 AA A11y",
        desc: "Keyboard navigability, optical contrast ratios, and screen-reader semantics.",
      },
      {
        name: "SEO Architecture",
        desc: "Structured schema.org metadata, dynamic OpenGraph previews, and clean sitemaps.",
      },
    ],
  };

  const capabilities = [
    {
      title: "Architecture & engineering",
      desc: "Component systems, data models, and API contracts designed to survive scope changes, not just the first release.",
    },
    {
      title: "Interface & motion",
      desc: "Interaction design that earns its animation — page-load sequences, scroll choreography, and hover states with real purpose.",
    },
    {
      title: "Performance & infrastructure",
      desc: "Edge-deployed, cache-tuned, and load-tested, so the site behaves the same at 10 visitors and 10,000.",
    },
    {
      title: "Content & growth systems",
      desc: "Headless CMS wiring, structured metadata, and analytics instrumentation your team can act on from day one.",
    },
  ];

  const process = [
    {
      n: "01",
      title: "Discovery & audit",
      desc: "We read the existing site, the analytics, and the complaints — technical debt, drop-off points, and everything your team already knows is broken.",
    },
    {
      n: "02",
      title: "System architecture",
      desc: "Component structure, data flow, and content model get mapped before a single pixel is designed, so the build doesn't fight itself later.",
    },
    {
      n: "03",
      title: "Build & iterate",
      desc: "Weekly shippable increments in a staging environment you can click through — not a black box that appears six weeks later.",
    },
    {
      n: "04",
      title: "Launch & monitor",
      desc: "Production deploy with rollback plans, uptime monitoring, and a two-week hypercare window before we hand you the keys.",
    },
  ];

  const projects = [
    {
      name: "Vance & Associates",
      category: "Architecture practice, rebuilt platform",
      stat: "LCP 4.2s → 0.48s",
      accent: "#7C6CF2",
    },
    {
      name: "Northline Freight",
      category: "Logistics dashboard & booking flow",
      stat: "3.1x faster quote turnaround",
      accent: "#4FD1C5",
    },
    {
      name: "Marrow Studio",
      category: "Headless commerce storefront",
      stat: "61% mobile conversion lift",
      accent: "#FFB454",
    },
  ];

  const faqs = [
    {
      q: "Do you build custom full-stack web applications or only marketing websites?",
      a: "We engineer both. From bespoke marketing platforms with headless CMS integration to high-concurrency SaaS applications, customer portals, and internal business tools.",
    },
    {
      q: "Will our team be able to update site copy and media easily?",
      a: "Yes. We configure intuitive headless CMS solutions (such as Sanity, Strapi, or headless WordPress) so your non-technical team can edit copy, launch blog posts, and manage products without touching code.",
    },
    {
      q: "What is your standard engineering timeline?",
      a: "A typical bespoke web project takes between 3 to 6 weeks from initial architecture discovery to final production deployment and QA testing.",
    },
    {
      q: "How do you handle hosting, security, and ongoing maintenance?",
      a: "We deploy to world-class cloud infrastructure (Google Cloud Run, Vercel, or AWS) with automated SSL, daily backups, and offer structured ongoing SLA retainers.",
    },
  ];

  return (
    <div className="wd-root w-full bg-white text-[#101214]">
      <PageStyles />

      {/* ============================================================ */}
      {/*  HERO — dark, terminal as the signature moment                 */}
      {/* ============================================================ */}
      <section className="relative bg-[#0B0D10] overflow-hidden pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <button
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors cursor-pointer mb-16"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to overview</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_440px] gap-12 items-center">
            <div className="max-w-2xl">
              <motion.span
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="wd-font-mono text-xs tracking-[0.18em] text-[#6EE7C8] block mb-5"
              >
                WEB DEVELOPMENT
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                className="wd-font-display text-5xl sm:text-6xl md:text-[4.2rem] font-semibold tracking-tight text-white leading-[1.03]"
              >
                {service.title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.75,
                  delay: 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="mt-6 text-lg sm:text-xl text-neutral-300 leading-relaxed max-w-xl"
              >
                We build ultra-fast, responsive, and robust web applications
                crafted with clean code, modern TypeScript frameworks, and
                architecture that holds up under real traffic.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.75,
                  delay: 0.24,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="mt-10 flex flex-wrap items-center gap-5"
              >
                <button
                  onClick={() => onNavigateContact("Web Development")}
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-[#101214] text-sm font-medium hover:bg-neutral-200 transition-colors cursor-pointer"
                >
                  <span>Commission a project</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </button>
                <button
                  onClick={() => {
                    const el = document.querySelector("#projects");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-sm font-medium text-white border-b border-white/50 hover:border-white pb-1 transition-colors cursor-pointer"
                >
                  See the work ↓
                </button>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.3,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <TypewriterTerminal />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SOCIAL PROOF MARQUEE                                          */}
      {/* ============================================================ */}
      <ClientMarquee />

      {/* ============================================================ */}
      {/*  ANIMATED STATS                                                */}
      {/* ============================================================ */}
      <section className="bg-[#0B0D10] py-20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-2 sm:grid-cols-4 gap-10">
          <StatCounter
            value={100}
            suffix="/100"
            label="Lighthouse performance"
          />
          <StatCounter value={40} suffix="+" label="Products shipped" />
          <StatCounter
            value={99}
            suffix=".9%"
            label="Uptime across deployments"
          />
          <StatCounter
            value={18}
            suffix=" days"
            label="Average time to launch"
          />
        </div>
      </section>

      {/* ============================================================ */}
      {/*  CAPABILITIES                                                  */}
      {/* ============================================================ */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24">
        <h2 className="wd-font-display text-2xl sm:text-3xl font-semibold text-[#101214] tracking-tight mb-12 max-w-xl">
          What we actually do
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {capabilities.map((cap, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: idx * 0.06 }}
              className="p-7 bg-[#FAFAF8] border border-[#E7E7E4]"
            >
              <h3 className="text-base font-semibold text-[#101214] mb-2">
                {cap.title}
              </h3>
              <p className="text-sm text-[#63666C] leading-relaxed">
                {cap.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/*  STICKY PROCESS TIMELINE                                       */}
      {/* ============================================================ */}
      <section className="border-t border-[#E7E7E4] bg-[#FAFAF8]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <span className="wd-font-mono text-xs tracking-[0.18em] text-[#9A9FA6] block mb-4">
                HOW WE BUILD
              </span>
              <h2 className="wd-font-display text-3xl sm:text-4xl font-semibold text-[#101214] tracking-tight leading-tight">
                Four stages.
                <br />
                No black box.
              </h2>
              <p className="mt-5 text-sm text-[#63666C] leading-relaxed max-w-xs">
                Every project moves through the same sequence, in the same
                order, with a review at each handoff.
              </p>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-3">
            {process.map((step, idx) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="flex gap-6 p-7 bg-white border border-[#E7E7E4]"
              >
                <span className="wd-font-mono text-sm text-[#4FD1C5] pt-1 shrink-0">
                  {step.n}
                </span>
                <div>
                  <h3 className="text-base font-semibold text-[#101214] mb-1.5">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[#63666C] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  DELIVERABLES                                                  */}
      {/* ============================================================ */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-20 border-t border-[#E7E7E4]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5">
            <h2 className="wd-font-display text-2xl sm:text-3xl font-semibold text-[#101214] tracking-tight mb-4">
              What's in the package
            </h2>
            <p className="text-sm text-[#63666C] leading-relaxed mb-6">
              Every web project is built modularly with documented source code,
              comprehensive responsive styling, and complete ownership
              transferred upon launch.
            </p>
            <button
              onClick={() => onNavigateContact("Web Development")}
              className="w-full sm:w-auto px-8 py-4 bg-[#101214] text-white text-sm font-medium hover:bg-[#2A2C2F] transition-colors cursor-pointer"
            >
              Start a project
            </button>
          </div>

          <div className="lg:col-span-7 space-y-3">
            {service.detailedScope.map((item, idx) => (
              <div
                key={idx}
                className="p-5 bg-white border border-[#E7E7E4] flex items-start gap-4"
              >
                <div className="w-5 h-5 bg-[#FAFAF8] border border-[#E7E7E4] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-[#101214]" />
                </div>
                <p className="text-sm text-[#222222] font-medium leading-relaxed">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  PROJECTS — 3D tilt showcase                                   */}
      {/* ============================================================ */}
      <section id="projects" className="bg-[#0B0D10] py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="wd-font-display text-3xl sm:text-4xl font-semibold text-white tracking-tight mb-12 max-w-xl">
            A few builds worth pointing at
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((project, idx) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <TiltCard className="group cursor-pointer">
                  <div
                    style={{
                      transform: "translateZ(30px)",
                      transformStyle: "preserve-3d",
                    }}
                    className="h-56 mb-5"
                  >
                    <CodeEditorMock accent={project.accent} />
                  </div>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-medium text-white">
                        {project.name}
                      </h3>
                      <p className="text-sm text-neutral-400 mt-1">
                        {project.category}
                      </p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-neutral-500 group-hover:text-white transition-colors shrink-0 mt-1" />
                  </div>
                  <p
                    className="text-sm mt-3 wd-font-mono"
                    style={{ color: project.accent }}
                  >
                    {project.stat}
                  </p>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  CASE STUDY DEEP-DIVE                                          */}
      {/* ============================================================ */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-20 border-b border-[#E7E7E4]">
        <h2 className="wd-font-display text-2xl sm:text-3xl font-semibold text-[#101214] tracking-tight max-w-2xl mb-12">
          How Vance & Associates rebuilt their architecture firm's platform
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#FAFAF8] border border-[#E7E7E4] p-8 md:p-10">
          <div>
            <span className="text-sm font-medium text-[#101214] block mb-2">
              The challenge
            </span>
            <p className="text-sm text-[#555555] leading-relaxed">
              Their legacy WordPress site suffered from 4.2-second load times,
              broken mobile viewports, and an inability to showcase high-res
              architectural renders efficiently.
            </p>
          </div>
          <div>
            <span className="text-sm font-medium text-[#101214] block mb-2">
              The solution
            </span>
            <p className="text-sm text-[#555555] leading-relaxed">
              Engineered a bespoke React + TypeScript platform with responsive
              fluid typography, progressive asset streaming, and a headless
              portfolio engine.
            </p>
          </div>
          <div>
            <span className="text-sm font-medium text-[#101214] block mb-2">
              The outcome
            </span>
            <p className="text-sm text-[#555555] leading-relaxed">
              LCP dropped from 4.2s to 0.48s — a 90% speedup — resulting in a
              74% increase in commercial project RFP submissions.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  STACK                                                         */}
      {/* ============================================================ */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-20 border-b border-[#E7E7E4]">
        <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
          <h2 className="wd-font-display text-2xl sm:text-3xl font-semibold text-[#101214] tracking-tight">
            The stack behind every build
          </h2>

          <div className="flex items-center border border-[#E7E7E4] p-1 bg-[#FAFAF8]">
            {(["frontend", "backend", "performance"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveStackTab(tab)}
                className={`px-4 py-2 text-xs wd-font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                  activeStackTab === tab
                    ? "bg-[#101214] text-white"
                    : "text-[#666666] hover:text-black"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {stackDetails[activeStackTab].map((item, idx) => (
            <div key={idx} className="p-6 bg-[#FAFAF8] border border-[#E7E7E4]">
              <span className="text-base font-semibold text-[#101214] block mb-2">
                {item.name}
              </span>
              <p className="text-sm text-[#666666] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/*  TESTIMONIAL                                                   */}
      {/* ============================================================ */}
      <section className="bg-[#0B0D10] py-24">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <span className="wd-font-mono text-xs tracking-[0.18em] text-[#6EE7C8] block mb-8">
            CLIENT NOTE
          </span>
          <p className="wd-font-display text-2xl sm:text-3xl text-white leading-snug">
            They shipped in five weeks what our last agency couldn't deliver in
            five months — and the site hasn't gone down once.
          </p>
          <div className="mt-8 wd-font-mono text-sm text-white/45">
            — Dana Voss, Principal, Vance & Associates
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  FAQ                                                           */}
      {/* ============================================================ */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 py-20 border-b border-[#E7E7E4]">
        <h2 className="wd-font-display text-2xl sm:text-3xl font-semibold text-[#101214] tracking-tight mb-8">
          Frequently asked questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-[#E7E7E4] bg-white transition-colors"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
              >
                <span className="text-sm sm:text-base font-medium text-[#101214]">
                  {faq.q}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-[#666666] transition-transform duration-200 ${
                    openFaq === idx ? "rotate-180 text-black" : ""
                  }`}
                />
              </button>
              {openFaq === idx && (
                <div className="px-6 pb-6 text-sm text-[#666666] leading-relaxed border-t border-[#F5F5F5] pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/*  CLOSING CTA — bookends the hero                               */}
      {/* ============================================================ */}
      <section className="bg-[#0B0D10] py-28">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <h2 className="wd-font-display text-4xl sm:text-5xl font-semibold text-white tracking-tight leading-tight">
            Let's build something
            <br />
            that holds.
          </h2>
          <button
            onClick={() => onNavigateContact("Web Development")}
            className="group inline-flex items-center gap-3 mt-10 px-9 py-4 bg-white text-[#101214] text-sm font-medium hover:bg-neutral-200 transition-colors cursor-pointer"
          >
            <span>Commission a project</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  NEXT SERVICE                                                  */}
      {/* ============================================================ */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 flex flex-col sm:flex-row items-center justify-between gap-6">
        <h3 className="text-xl font-medium text-[#101214]">
          Next up — Graphics & visual systems
        </h3>
        <button
          onClick={() => onNavigateService("graphics")}
          className="px-8 py-4 bg-[#101214] text-white text-sm font-medium hover:bg-[#2A2C2F] transition-colors cursor-pointer inline-flex items-center gap-2"
        >
          <span>Go to graphics</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </section>
    </div>
  );
};
