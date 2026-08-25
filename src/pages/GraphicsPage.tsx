import React, { useState, useRef } from "react";
import { motion } from "motion/react";
import {
  ArrowRight,
  ArrowLeft,
  Palette,
  Layout,
  Eye,
  Check,
  ChevronDown,
  PenTool,
  Sparkles,
  Layers,
} from "lucide-react";
import { SERVICES_DATA } from "../data/content";

interface GraphicsPageProps {
  onNavigateHome: () => void;
  onNavigateService: (serviceId: string) => void;
  onNavigateContact: (serviceName?: string) => void;
}

/* ================================================================== */
/*  Fonts + keyframes — same type system as the studio's other pages    */
/*  (Space Grotesk / Inter / JetBrains Mono) plus this page's own       */
/*  motion vocabulary: a bezier path drawing itself, anchor points      */
/*  landing in sequence, swatches fading up like pulled Pantone chips.  */
/* ================================================================== */
function PageStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap');

      .gx-font-display { font-family: 'Space Grotesk', sans-serif; }
      .gx-font-mono { font-family: 'JetBrains Mono', monospace; }
      .gx-root { font-family: 'Inter', sans-serif; }

      .gx-draw {
        stroke-dasharray: 1;
        stroke-dashoffset: 1;
        animation: gx-draw-path 2.4s cubic-bezier(0.65,0,0.35,1) forwards;
      }
      @keyframes gx-draw-path { to { stroke-dashoffset: 0; } }

      .gx-anchor {
        opacity: 0;
        animation: gx-pop 0.4s ease-out forwards;
      }
      @keyframes gx-pop {
        0% { opacity: 0; transform: scale(0.4); }
        100% { opacity: 1; transform: scale(1); }
      }

      .gx-readout {
        opacity: 0;
        animation: gx-fade 0.6s ease-out forwards;
      }
      @keyframes gx-fade { to { opacity: 1; } }

      .gx-marquee-track {
        width: max-content;
        animation: gx-marquee 34s linear infinite;
      }
      @keyframes gx-marquee {
        from { transform: translateX(0); }
        to { transform: translateX(-50%); }
      }

      @media (prefers-reduced-motion: reduce) {
        .gx-draw { animation: none; stroke-dashoffset: 0; }
        .gx-anchor, .gx-readout { animation: none !important; opacity: 1 !important; transform: none !important; }
        .gx-marquee-track { animation: none; }
      }
    `}</style>
  );
}

/* ================================================================== */
/*  Signature moment — an artboard with rulers and crop marks, on      */
/*  which a bezier mark draws itself stroke by stroke, anchor points    */
/*  landing as it goes, ending on a coordinate readout. This is the     */
/*  one thing on the page a design studio's own hero should be: the     */
/*  pen tool at work, not a stock 3D shape.                             */
/* ================================================================== */
function ArtboardSignature() {
  const rulerH =
    "repeating-linear-gradient(90deg, rgba(17,17,17,0.32) 0 1px, transparent 1px 8px)";
  const rulerV =
    "repeating-linear-gradient(180deg, rgba(17,17,17,0.32) 0 1px, transparent 1px 8px)";

  return (
    <div className="relative">
      {/* crop marks */}
      {[
        "top-0 left-0 -translate-x-3 -translate-y-3",
        "top-0 right-0 translate-x-3 -translate-y-3",
        "bottom-0 left-0 -translate-x-3 translate-y-3",
        "bottom-0 right-0 translate-x-3 translate-y-3",
      ].map((pos, i) => (
        <div key={i} className={`absolute ${pos} w-3 h-3 pointer-events-none`}>
          <div className="absolute inset-0 border-t border-l border-[#111111]/40" />
        </div>
      ))}

      <div className="border border-[#E5E7EB] bg-white">
        <div className="h-4 w-full" style={{ backgroundImage: rulerH }} />
        <div className="flex">
          <div className="w-4 shrink-0" style={{ backgroundImage: rulerV }} />

          <div className="flex-1 p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="gx-font-mono text-[10px] uppercase tracking-widest text-[#999999] inline-flex items-center gap-1.5">
                <PenTool className="w-3 h-3" />
                mark.svg — 240×240 — 1x
              </span>
              <span className="w-2 h-2 rounded-full bg-[#111111]/30" />
            </div>

            <svg viewBox="0 0 240 240" className="w-full h-auto">
              <path
                d="M50,160 C50,90 90,50 155,50 C155,100 122,128 85,128 C122,128 172,148 172,196"
                fill="none"
                stroke="#111111"
                strokeWidth="3"
                strokeLinecap="round"
                pathLength={1}
                className="gx-draw"
              />
              {[
                { cx: 50, cy: 160, d: "0.05s" },
                { cx: 155, cy: 50, d: "1.0s" },
                { cx: 85, cy: 128, d: "1.6s" },
                { cx: 172, cy: 196, d: "2.3s" },
              ].map((a, i) => (
                <circle
                  key={i}
                  cx={a.cx}
                  cy={a.cy}
                  r="5"
                  fill="white"
                  stroke="#111111"
                  strokeWidth="1.5"
                  className="gx-anchor"
                  style={{ animationDelay: a.d }}
                />
              ))}
            </svg>

            <div
              className="gx-font-mono text-[10px] text-[#999999] gx-readout"
              style={{ animationDelay: "2.35s" }}
            >
              X: 172&nbsp;&nbsp;Y: 196&nbsp;&nbsp;·&nbsp;&nbsp;4
              anchors&nbsp;&nbsp;·&nbsp;&nbsp;1 path
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  Stat block — numeric ones count up on view, non-numeric ones fade.  */
/* ================================================================== */
function Stat({
  value,
  suffix = "",
  label,
  animate = true,
}: {
  value?: number;
  suffix?: string;
  label: string;
  animate?: boolean;
}) {
  const [display, setDisplay] = useState(animate ? 0 : (value ?? 0));
  const started = useRef(false);

  return (
    <motion.div
      onViewportEnter={() => {
        if (started.current || !animate || value === undefined) return;
        started.current = true;
        const start = performance.now();
        const duration = 1.1;
        const step = (t: number) => {
          const p = Math.min(1, (t - start) / (duration * 1000));
          setDisplay(Math.round(value * (1 - Math.pow(1 - p, 3)) * 10) / 10);
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }}
      viewport={{ once: true, margin: "-60px" }}
    >
      <span className="text-3xl sm:text-4xl gx-font-mono font-medium text-[#111111] block tabular-nums">
        {
          value !== undefined
            ? display
            : label /* non-numeric fallback handled by caller */
        }
        {value !== undefined ? suffix : ""}
      </span>
    </motion.div>
  );
}

/* ================================================================== */
/*  Specimen mock — replaces a generic project screenshot. Shows a      */
/*  swatch strip and a type sample, the two things every identity        */
/*  system actually ships.                                              */
/* ================================================================== */
function SpecimenMock({ accent }: { accent: string }) {
  return (
    <div className="w-full h-full bg-white border border-[#E5E7EB] relative overflow-hidden">
      {[
        "top-0 left-0",
        "top-0 right-0",
        "bottom-0 left-0",
        "bottom-0 right-0",
      ].map((pos, i) => (
        <div key={i} className={`absolute ${pos} w-2.5 h-2.5`}>
          <div className="absolute inset-0.5 border-t border-l border-[#111111]/25" />
        </div>
      ))}
      <div className="p-5 flex flex-col h-full justify-between">
        <div>
          <span className="gx-font-display text-5xl font-medium text-[#111111] leading-none">
            Aa
          </span>
          <div className="mt-3 h-px w-full bg-[#E5E7EB]" />
        </div>
        <div className="flex items-end gap-2 mt-6">
          {[accent, "#111111", "#E5E7EB", "#FAFAFA"].map((c, i) => (
            <div key={i} className="flex-1">
              <div
                className="h-10 border border-[#E5E7EB]"
                style={{ background: c }}
              />
              <span className="gx-font-mono text-[9px] text-[#999999] block mt-1 truncate">
                {c}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  3D tilt wrapper for the work showcase                               */
/* ================================================================== */
function TiltCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [rot, setRot] = useState({ x: 0, y: 0 });

  return (
    <div style={{ perspective: 1200 }} className={className}>
      <motion.div
        ref={ref}
        onMouseMove={(e) => {
          const el = ref.current;
          if (!el) return;
          const rect = el.getBoundingClientRect();
          const px = (e.clientX - rect.left) / rect.width - 0.5;
          const py = (e.clientY - rect.top) / rect.height - 0.5;
          setRot({ y: px * 12, x: -py * 12 });
        }}
        onMouseLeave={() => setRot({ x: 0, y: 0 })}
        animate={{ rotateX: rot.x, rotateY: rot.y }}
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
/*  Page                                                                 */
/* ================================================================== */
export const GraphicsPage: React.FC<GraphicsPageProps> = ({
  onNavigateHome,
  onNavigateService,
  onNavigateContact,
}) => {
  const service = SERVICES_DATA.find((s) => s.id === "graphics")!;
  const [activeSystemTab, setActiveSystemTab] = useState<
    "typography" | "identity" | "components"
  >("typography");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const clients = [
    "KROMA TECHNOLOGY LABS",
    "HALYARD CAPITAL",
    "PRISM ROBOTICS",
    "FERNLAND & CO.",
    "OBELISK MEDIA",
    "TIDEWATER GOODS",
  ];
  const clientDots = [
    "#FF4B2B",
    "#2B4CFF",
    "#0BA95B",
    "#FFB400",
    "#7C3AED",
    "#111111",
  ];

  const capabilities = [
    {
      icon: Palette,
      title: "Brand identity systems",
      desc: "Marks, wordmarks, and color/type tokens engineered to hold up from a 16px favicon to a keynote screen.",
    },
    {
      icon: Layout,
      title: "Editorial & layout",
      desc: "Pitch decks, whitepapers, and reports built with real typographic hierarchy — not a template with your logo swapped in.",
    },
    {
      icon: PenTool,
      title: "Iconography & illustration",
      desc: "Custom vector icon sets and diagrammatic illustration matched to how your product actually works, not stock metaphors.",
    },
    {
      icon: Sparkles,
      title: "Presentation & pitch collateral",
      desc: "Investor decks and launch materials built to survive being presented by someone other than you.",
    },
  ];

  const process = [
    {
      n: "01",
      title: "Discovery & audit",
      desc: "We inventory every asset you already have — old decks, half-finished logos, brand debt — and the voice you actually want.",
    },
    {
      n: "02",
      title: "Concept & direction",
      desc: "Two or three genuinely distinct visual directions, explored in mood, type, and color, before we commit to one.",
    },
    {
      n: "03",
      title: "System build",
      desc: "A full token system — type scale, color, iconography, component patterns — documented in a Figma library your team can use unsupervised.",
    },
    {
      n: "04",
      title: "Launch & handoff",
      desc: "Export-ready assets, usage guidelines, and a live handoff session so nothing sits in a folder no one opens.",
    },
  ];

  const projects = [
    {
      name: "Kroma Technology Labs",
      category: "Full identity system, Series A launch",
      stat: "$12M raised on the deck",
      accent: "#FF4B2B",
    },
    {
      name: "Halyard Capital",
      category: "Investor pitch & presentation system",
      stat: "14-slide deck, zero redesigns",
      accent: "#2B4CFF",
    },
    {
      name: "Prism Robotics",
      category: "Iconography & product diagrams",
      stat: "64 icons, one token set",
      accent: "#0BA95B",
    },
  ];

  const faqs = [
    {
      q: "What assets are included in a full Brand Identity System?",
      a: "We deliver primary and secondary logo marks, responsive favicon formats, exact typographic hierarchy scales, color token palettes (RGB, CMYK, HEX, HSL), vector iconography sets, and a comprehensive Figma design guidelines file.",
    },
    {
      q: "Do you create pitch decks and presentation collateral?",
      a: "Yes. We design high-stakes keynote decks, investor pitch presentations, product launch collateral, and executive whitepapers with editorial typographic precision.",
    },
    {
      q: "Can our engineers directly consume your design tokens and Figma files?",
      a: "Absolutely. We organize Figma libraries with standardized auto-layout, named design tokens, export-ready SVG components, and Tailwind-compatible utility mappings.",
    },
    {
      q: "Do you provide print-ready materials or strictly digital assets?",
      a: "While our core focus is digital excellence, all vector brand marks and editorial layouts are engineered in print-ready high-DPI PDF and vector formats suitable for physical production.",
    },
  ];

  return (
    <div className="gx-root w-full bg-white text-[#111111]">
      <PageStyles />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-24 pb-6 border-b border-[#F0F0F0] flex items-center justify-between">
        <button
          onClick={onNavigateHome}
          className="inline-flex items-center gap-2 text-xs gx-font-mono uppercase tracking-[0.15em] text-[#666666] hover:text-black transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Overview</span>
        </button>
        <div className="text-[11px] gx-font-mono text-[#999999] tracking-widest hidden sm:block">
          SPECIFICATION // 03 — GRAPHIC SYSTEMS
        </div>
      </div>

      {/* ============================================================ */}
      {/*  HERO — artboard signature moment                              */}
      {/* ============================================================ */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pt-16 pb-20 border-b border-[#F0F0F0]">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 items-center">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-3 h-3 bg-[#111111]" />
              <span className="text-xs gx-font-mono uppercase tracking-[0.2em] text-[#888888]">
                {service.number} // VISUAL PRACTICE
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="gx-font-display text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-[#111111] leading-[1.08]"
            >
              {service.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-4 text-xl sm:text-2xl text-[#666666] font-normal tracking-tight"
            >
              {service.tagline}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-6 text-base sm:text-lg text-[#555555] leading-relaxed max-w-2xl"
            >
              We create disciplined visual identities, vector design systems,
              and digital graphic assets designed to convey authority,
              distinctiveness, and long-term elegance.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <button
                onClick={() => onNavigateContact("Graphics & Brand Identity")}
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#111111] text-white text-xs font-semibold uppercase tracking-widest hover:bg-[#333333] transition-colors cursor-pointer"
              >
                <span>Commission Visual Systems</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  const el = document.querySelector("#design-system-spec");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-6 py-4 border border-[#E5E7EB] text-xs font-semibold uppercase tracking-widest text-[#111111] hover:border-black transition-colors cursor-pointer"
              >
                Inspect Design System ↓
              </button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <ArtboardSignature />
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  SOCIAL PROOF MARQUEE                                          */}
      {/* ============================================================ */}
      <div className="overflow-hidden border-b border-[#F0F0F0] bg-[#FAFAFA] py-6">
        <div className="gx-marquee-track flex items-center gap-14">
          {[...clients, ...clients].map((c, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2.5 gx-font-mono text-xs tracking-[0.15em] text-[#888888] whitespace-nowrap"
            >
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: clientDots[i % clientDots.length] }}
              />
              {c}
            </span>
          ))}
        </div>
      </div>

      {/* ============================================================ */}
      {/*  METRICS                                                       */}
      {/* ============================================================ */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 border-b border-[#F0F0F0]">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          <div>
            <Stat value={100} suffix="%" label="" />
            <span className="text-xs text-[#777777] uppercase tracking-wider mt-1 block">
              Vector Precision
            </span>
          </div>
          <div>
            <Stat value={40} suffix="+" label="" />
            <span className="text-xs text-[#777777] uppercase tracking-wider mt-1 block">
              Component System Tokens
            </span>
          </div>
          <div>
            <Stat value={0} suffix=".0" label="" />
            <span className="text-xs text-[#777777] uppercase tracking-wider mt-1 block">
              Visual Clutter Ratio
            </span>
          </div>
          <div>
            <span className="text-3xl sm:text-4xl gx-font-mono font-medium text-[#111111] block">
              Figma
            </span>
            <span className="text-xs text-[#777777] uppercase tracking-wider mt-1 block">
              Native Auto-Layout Kit
            </span>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  CAPABILITIES                                                  */}
      {/* ============================================================ */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-20 border-b border-[#F0F0F0]">
        <span className="text-[10px] gx-font-mono uppercase tracking-[0.2em] text-[#888888] block mb-2">
          WHAT WE ACTUALLY DELIVER
        </span>
        <h2 className="gx-font-display text-2xl sm:text-3xl font-semibold text-[#111111] tracking-tight mb-12 max-w-xl">
          Four disciplines, one system
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {capabilities.map((cap, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: idx * 0.06 }}
              className="p-7 bg-[#FAFAFA] border border-[#E5E7EB]"
            >
              <cap.icon
                className="w-4 h-4 text-[#111111] mb-4"
                strokeWidth={1.75}
              />
              <h3 className="text-base font-semibold text-[#111111] mb-2">
                {cap.title}
              </h3>
              <p className="text-sm text-[#666666] leading-relaxed">
                {cap.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/*  STICKY PROCESS TIMELINE                                       */}
      {/* ============================================================ */}
      <section className="border-b border-[#F0F0F0] bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <span className="text-[10px] gx-font-mono uppercase tracking-[0.2em] text-[#888888] block mb-4">
                HOW WE WORK
              </span>
              <h2 className="gx-font-display text-3xl sm:text-4xl font-semibold text-[#111111] tracking-tight leading-tight">
                Four stages.
                <br />
                Nothing skipped.
              </h2>
              <p className="mt-5 text-sm text-[#666666] leading-relaxed max-w-xs">
                Every identity system moves through the same sequence, with a
                review at each handoff.
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
                className="flex gap-6 p-7 bg-white border border-[#E5E7EB]"
              >
                <span className="gx-font-mono text-sm text-[#999999] pt-1 shrink-0">
                  {step.n}
                </span>
                <div>
                  <h3 className="text-base font-semibold text-[#111111] mb-1.5">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[#666666] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  WORK SHOWCASE                                                 */}
      {/* ============================================================ */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-20 border-b border-[#F0F0F0]">
        <div className="flex items-center gap-2.5 mb-12">
          <Eye className="w-4 h-4 text-[#888888]" strokeWidth={1.75} />
          <h2 className="gx-font-display text-2xl sm:text-3xl font-semibold text-[#111111] tracking-tight">
            A few marks worth a second look
          </h2>
        </div>

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
                    transform: "translateZ(24px)",
                    transformStyle: "preserve-3d",
                  }}
                  className="h-52 mb-5"
                >
                  <SpecimenMock accent={project.accent} />
                </div>
                <h3 className="text-lg font-medium text-[#111111]">
                  {project.name}
                </h3>
                <p className="text-sm text-[#666666] mt-1">
                  {project.category}
                </p>
                <p
                  className="text-sm mt-3 gx-font-mono"
                  style={{ color: project.accent }}
                >
                  {project.stat}
                </p>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/*  CASE STUDY                                                    */}
      {/* ============================================================ */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-20 border-b border-[#F0F0F0]">
        <div className="max-w-3xl mb-12">
          <span className="text-[10px] gx-font-mono uppercase tracking-[0.2em] text-[#888888] block mb-2">
            03 // PROVEN DEPLOYMENT
          </span>
          <h2 className="gx-font-display text-2xl sm:text-3xl font-semibold text-[#111111] tracking-tight">
            How Kroma Technology Labs redefined their product brand
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#FAFAFA] border border-[#E5E7EB] p-8 md:p-10">
          <div>
            <span className="text-xs gx-font-mono uppercase text-[#888888] block mb-2">
              The Challenge
            </span>
            <p className="text-sm text-[#555555] leading-relaxed">
              Their early-stage graphics lacked visual discipline, leading to
              inconsistent marketing decks, unclear product schematics, and a
              fragmented identity across web and mobile.
            </p>
          </div>
          <div>
            <span className="text-xs gx-font-mono uppercase text-[#888888] block mb-2">
              The Solution
            </span>
            <p className="text-sm text-[#555555] leading-relaxed">
              Constructed a complete visual design token system, custom
              iconography set, and investor-ready presentation toolkit in Figma.
            </p>
          </div>
          <div>
            <span className="text-xs gx-font-mono uppercase text-[#888888] block mb-2">
              The Outcome
            </span>
            <p className="text-sm text-[#555555] leading-relaxed">
              Closed their $12M Series A round with universal stakeholder praise
              for executive clarity and pristine brand polish.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  DELIVERABLES                                                  */}
      {/* ============================================================ */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-20 border-b border-[#F0F0F0]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5">
            <span className="text-[10px] gx-font-mono uppercase tracking-[0.2em] text-[#888888] block mb-2">
              DELIVERABLES BREAKDOWN
            </span>
            <h2 className="gx-font-display text-2xl sm:text-3xl font-semibold text-[#111111] tracking-tight mb-4">
              Complete Visual Asset Package
            </h2>
            <p className="text-xs sm:text-sm text-[#666666] leading-relaxed mb-6">
              We deliver complete Figma libraries, vector SVGs, publication
              templates, and export documentation ready for marketing,
              engineering, and print production.
            </p>
            <button
              onClick={() => onNavigateContact("Graphics & Brand Identity")}
              className="w-full sm:w-auto px-8 py-4 bg-[#111111] text-white text-xs font-semibold uppercase tracking-widest hover:bg-[#333333] transition-colors cursor-pointer"
            >
              Start Graphics Project
            </button>
          </div>

          <div className="lg:col-span-7 space-y-3">
            {service.detailedScope.map((item, idx) => (
              <div
                key={idx}
                className="p-5 bg-white border border-[#E5E7EB] flex items-start gap-4"
              >
                <div className="w-5 h-5 bg-[#FAFAFA] border border-[#E5E7EB] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-[#111111]" />
                </div>
                <div>
                  <span className="text-xs gx-font-mono uppercase text-[#999999] block mb-0.5">
                    SPEC 0{idx + 1}
                  </span>
                  <p className="text-xs sm:text-sm text-[#222222] font-medium leading-relaxed">
                    {item}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  DESIGN SYSTEM INSPECTOR                                       */}
      {/* ============================================================ */}
      <section
        id="design-system-spec"
        className="max-w-7xl mx-auto px-6 md:px-12 py-20 border-b border-[#F0F0F0]"
      >
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <span className="text-[10px] gx-font-mono uppercase tracking-[0.2em] text-[#888888] block mb-1 inline-flex items-center gap-1.5">
              <Layers className="w-3 h-3" />
              DESIGN SYSTEM SPECIFICATION
            </span>
            <h2 className="gx-font-display text-2xl sm:text-3xl font-semibold text-[#111111] tracking-tight">
              Interactive System Components
            </h2>
          </div>

          <div className="flex items-center border border-[#E5E7EB] p-1 bg-[#FAFAFA]">
            {(["typography", "identity", "components"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveSystemTab(tab)}
                className={`px-4 py-2 text-xs gx-font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                  activeSystemTab === tab
                    ? "bg-[#111111] text-white shadow-xs"
                    : "text-[#666666] hover:text-black"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-[#FAFAFA] border border-[#E5E7EB] p-8 md:p-12">
          {activeSystemTab === "typography" && (
            <div className="space-y-8">
              <div className="flex items-center justify-between pb-4 border-b border-[#E5E7EB]">
                <span className="text-xs gx-font-mono uppercase text-[#888888]">
                  Typographic Scale Hierarchy (1.25 Ratio)
                </span>
                <span className="text-xs gx-font-mono text-[#111111]">
                  Space Grotesk / Inter & Mono
                </span>
              </div>

              <div className="space-y-6">
                <div>
                  <span className="text-[10px] gx-font-mono uppercase text-[#999999] block mb-1">
                    Display Headings — 56px / Semibold / -0.03em tracking
                  </span>
                  <div className="gx-font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#111111]">
                    Clarity across every dimension.
                  </div>
                </div>

                <div>
                  <span className="text-[10px] gx-font-mono uppercase text-[#999999] block mb-1">
                    Section Subheading — 24px / Medium / -0.02em tracking
                  </span>
                  <div className="text-xl sm:text-2xl font-medium tracking-tight text-[#333333]">
                    Visual systems anchored to deliberate business strategy.
                  </div>
                </div>

                <div>
                  <span className="text-[10px] gx-font-mono uppercase text-[#999999] block mb-1">
                    Body Reading — 16px / Regular / 1.6 line-height
                  </span>
                  <p className="text-sm sm:text-base text-[#666666] leading-relaxed max-w-3xl">
                    Every graphic mark, color token, and layout guideline is
                    documented in exhaustive detail to maintain mathematical
                    consistency across all web, product, and print applications.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeSystemTab === "identity" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#E5E7EB]">
                <span className="text-xs gx-font-mono uppercase text-[#888888]">
                  Brand Color System Tokens
                </span>
                <span className="text-xs gx-font-mono text-[#111111]">
                  High-Contrast Minimal Neutrals
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 bg-white border border-[#E5E7EB] space-y-2">
                  <div className="h-16 bg-[#111111]" />
                  <div className="text-xs gx-font-mono font-medium">
                    #111111
                  </div>
                  <div className="text-[10px] text-[#888888]">
                    Primary Noir Text & Marks
                  </div>
                </div>
                <div className="p-4 bg-white border border-[#E5E7EB] space-y-2">
                  <div className="h-16 bg-[#FAFAFA] border border-[#EEEEEE]" />
                  <div className="text-xs gx-font-mono font-medium">
                    #FAFAFA
                  </div>
                  <div className="text-[10px] text-[#888888]">
                    Neutral Surface Background
                  </div>
                </div>
                <div className="p-4 bg-white border border-[#E5E7EB] space-y-2">
                  <div className="h-16 bg-[#E5E7EB]" />
                  <div className="text-xs gx-font-mono font-medium">
                    #E5E7EB
                  </div>
                  <div className="text-[10px] text-[#888888]">
                    Structural Sub-Pixel Borders
                  </div>
                </div>
                <div className="p-4 bg-white border border-[#E5E7EB] space-y-2">
                  <div className="h-16 bg-[#FFFFFF] border border-[#EEEEEE]" />
                  <div className="text-xs gx-font-mono font-medium">
                    #FFFFFF
                  </div>
                  <div className="text-[10px] text-[#888888]">
                    Pure Canvas Base
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSystemTab === "components" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#E5E7EB]">
                <span className="text-xs gx-font-mono uppercase text-[#888888]">
                  Interactive Component Tokens
                </span>
                <span className="text-xs gx-font-mono text-[#111111]">
                  Sharp Geometric Alignment
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-6 bg-white border border-[#E5E7EB] text-center space-y-3">
                  <span className="text-xs gx-font-mono text-[#888888] block">
                    Primary Button
                  </span>
                  <div className="inline-block px-6 py-3 bg-[#111111] text-white text-xs font-semibold uppercase tracking-wider">
                    Engage Studio
                  </div>
                </div>

                <div className="p-6 bg-white border border-[#E5E7EB] text-center space-y-3">
                  <span className="text-xs gx-font-mono text-[#888888] block">
                    Metadata Badge
                  </span>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FAFAFA] border border-[#E5E7EB] text-[10px] gx-font-mono uppercase text-[#666666]">
                    <span className="w-1.5 h-1.5 bg-[#111111]" />
                    <span>STATUS // VERIFIED</span>
                  </div>
                </div>

                <div className="p-6 bg-white border border-[#E5E7EB] text-center space-y-3">
                  <span className="text-xs gx-font-mono text-[#888888] block">
                    Secondary Outline
                  </span>
                  <div className="inline-block px-6 py-3 border border-[#111111] text-xs font-semibold uppercase tracking-wider text-[#111111]">
                    Learn More
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ============================================================ */}
      {/*  TESTIMONIAL                                                   */}
      {/* ============================================================ */}
      <section className="bg-[#111111] py-24">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <span className="text-xs gx-font-mono uppercase tracking-[0.2em] text-white/40 block mb-8">
            CLIENT NOTE
          </span>
          <p className="gx-font-display text-2xl sm:text-3xl text-white leading-snug">
            Investors kept the deck after the meeting. That doesn't happen with
            a template.
          </p>
          <div className="mt-8 gx-font-mono text-sm text-white/45">
            — Priya Ramaswamy, Founder, Kroma Technology Labs
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  FAQ                                                           */}
      {/* ============================================================ */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 py-20 border-b border-[#F0F0F0]">
        <h2 className="gx-font-display text-2xl sm:text-3xl font-semibold text-[#111111] tracking-tight mb-8">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-[#E5E7EB] bg-white transition-colors"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
              >
                <span className="text-sm sm:text-base font-medium text-[#111111]">
                  {faq.q}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-[#666666] transition-transform duration-200 ${
                    openFaq === idx ? "rotate-180 text-black" : ""
                  }`}
                />
              </button>
              {openFaq === idx && (
                <div className="px-6 pb-6 text-xs sm:text-sm text-[#666666] leading-relaxed border-t border-[#F5F5F5] pt-4">
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
      <section className="bg-[#111111] py-28">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <h2 className="gx-font-display text-4xl sm:text-5xl font-semibold text-white tracking-tight leading-tight">
            Let's give it a mark
            <br />
            worth keeping.
          </h2>
          <button
            onClick={() => onNavigateContact("Graphics & Brand Identity")}
            className="inline-flex items-center gap-3 mt-10 px-9 py-4 bg-white text-[#111111] text-xs font-semibold uppercase tracking-widest hover:bg-neutral-200 transition-colors cursor-pointer"
          >
            <span>Commission Visual Systems</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  NEXT SERVICE                                                  */}
      {/* ============================================================ */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-[10px] gx-font-mono uppercase tracking-[0.2em] text-[#888888] block mb-1">
            EXPLORE FIRST DISCIPLINE
          </span>
          <h3 className="text-xl font-medium text-[#111111]">
            01 — VisitingLink & Digital Identity
          </h3>
        </div>
        <button
          onClick={() => onNavigateService("visitinglink")}
          className="px-8 py-4 bg-[#111111] text-white text-xs font-semibold uppercase tracking-widest hover:bg-[#333333] transition-colors cursor-pointer inline-flex items-center gap-2"
        >
          <span>Go to VisitingLink</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </section>
    </div>
  );
};
