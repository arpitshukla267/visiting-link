"use client";

import React, { memo, useEffect, useMemo, useRef } from "react";
import { Manrope, Poppins } from "next/font/google";
import Image from "next/image";
import { Check, MessageCircle } from "lucide-react";
import {
  SOLUTIONS,
  type SolutionData,
  type SolutionKey,
} from "@/data/solutionsData";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});
const headingFont = manrope.className;

const WHATSAPP_NUMBER = "919236553585";
const waLink = (text: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

const btnPrimary =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-[#111111] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#333333] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2 cursor-pointer";
const btnSecondary =
  "inline-flex items-center justify-center gap-2 rounded-lg border border-[#DCDCDC] bg-white px-6 py-3.5 text-sm font-semibold text-[#111111] transition-colors hover:bg-[#F5F5F5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2 cursor-pointer";

const PAGE_CSS = `
@keyframes vl-fade-up {
  from { opacity: 0; transform: translate3d(0, 16px, 0); }
  to { opacity: 1; transform: translate3d(0, 0, 0); }
}
.vl-fade-up { animation: vl-fade-up .6s cubic-bezier(.22,.61,.36,1) both; }

@keyframes vl-logo-scroll {
  from { transform: translate3d(0, 0, 0); }
  to { transform: translate3d(-50%, 0, 0); }
}
.vl-logo-track { animation: vl-logo-scroll 40s linear infinite; will-change: transform; }
.vl-logo-marquee.is-paused .vl-logo-track { animation-play-state: paused; }

.vl-defer { contain: layout paint; }

@media (prefers-reduced-motion: reduce) {
  .vl-fade-up, .vl-logo-track { animation: none; }
}
`;

type Navigate = (serviceName?: string, category?: string) => void;

interface SolutionPageProps {
  type: SolutionKey;
  onNavigateContact: Navigate;
  onNavigateHome?: () => void;
}

/**
 * Default: 100vw on phone, 90vw on desktop.
 * `legacy` keeps the old 1520px container (used by the payment partners section).
 */
const Container: React.FC<{
  children: React.ReactNode;
  className?: string;
  legacy?: boolean;
}> = ({ children, className = "", legacy = false }) => (
  <div
    className={`mx-auto w-full px-5 md:px-8 ${
      legacy ? "max-w-[1520px]" : "max-w-[100vw] md:max-w-[90vw]"
    } ${className}`}
  >
    {children}
  </div>
);

/* ------------------------------ sections ------------------------------ */

const Hero = memo(function Hero({ d }: { d: SolutionData["hero"] }) {
  return (
    <section className="bg-white">
      <Container className="py-10 lg:flex lg:min-h-[calc(100vh-5rem)] lg:items-center">
        <div className="grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-8">
          <div className="vl-fade-up">
            <h1
              className={`${poppins.className} text-[40px] font-normal leading-[1.1] tracking-[-0.01em] text-[#111111] sm:text-6xl lg:text-7xl`}
            >
              {d.title}
            </h1>
            <p className="mt-8 max-w-[34rem] text-base leading-[1.7] text-[#111111] md:text-xl">
              {d.text}
            </p>
          </div>

          <div
            className="vl-fade-up relative"
            style={{ animationDelay: "0.15s" }}
          >
            <Image
              src={d.image}
              alt={d.imageAlt}
              width={1200}
              height={900}
              priority
              className="h-full w-full"
            />
          </div>
        </div>
      </Container>
    </section>
  );
});

const Partners = memo(function Partners({
  d,
}: {
  d: NonNullable<SolutionData["partners"]>;
}) {
  const ref = useRef<HTMLDivElement>(null);

  // pause the marquee while it is off-screen
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => el.classList.toggle("is-paused", !entry.isIntersecting),
      { rootMargin: "100px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="vl-defer py-10 md:py-16">
      <Container legacy>
        <h2
          className={`${poppins.className} text-center text-3xl font-normal tracking-tight text-[#111111] sm:text-5xl`}
        >
          {d.heading}
        </h2>
      </Container>

      <div
        ref={ref}
        className="vl-logo-marquee mt-8 overflow-hidden md:mt-12"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
        }}
      >
        <div className="vl-logo-track flex w-max">
          {[0, 1].map((g) => (
            <div
              key={g}
              className="flex shrink-0 items-center"
              aria-hidden={g === 1 || undefined}
            >
              {d.logos.map((logo) => (
                <div
                  key={`${g}-${logo.name}`}
                  className="flex h-24 w-40 shrink-0 items-center justify-center md:h-36 md:w-80"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={logo.src}
                    alt={g === 0 ? logo.name : ""}
                    decoding="async"
                    draggable={false}
                    className="max-h-full w-auto max-w-full object-contain"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

const Included = memo(function Included({
  ownership,
  items,
}: {
  ownership: SolutionData["ownership"];
  items: SolutionData["included"];
}) {
  return (
    <section id="included" className="vl-defer py-10 md:py-16">
      <Container>
        <h2
          className={`${poppins.className} text-center text-3xl font-normal leading-tight text-[#111111] sm:text-4xl lg:text-[44px]`}
        >
          {ownership.light}{" "}
          <strong className="font-bold">{ownership.bold}</strong>
        </h2>

        <div className="mt-10 bg-[#FBFBFA] p-4 md:mt-14 md:p-12">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {items.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="rounded-2xl border border-[#EDEDEA] bg-white p-6 shadow-[0_2px_14px_rgba(0,0,0,0.04)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F2F2EF] text-[#111111] shadow-sm">
                  <Icon className="h-5 w-5" />
                </div>
                <h3
                  className={`${headingFont} mt-4 text-lg font-bold text-[#111111]`}
                >
                  {title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-[#555555]">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
});

const Steps = memo(function Steps({
  title,
  steps,
}: {
  title: string;
  steps: SolutionData["steps"];
}) {
  return (
    <section className="vl-defer py-12 md:py-20">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2
            className={`${headingFont} text-3xl font-bold leading-[1.08] tracking-[-0.03em] text-[#111111] sm:text-5xl`}
          >
            {title}
          </h2>
          <p
            className={`${poppins.className} mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#666666] sm:text-lg`}
          >
            A clear process, so you always know what happens next.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-10 px-2 md:grid-cols-3 md:gap-8 md:px-10">
          {steps.map((s, i) => (
            <div key={s.title}>
              <div
                className={`${headingFont} text-5xl font-bold tracking-tight text-[#D6D6D1]`}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3
                className={`${poppins.className} mt-4 text-xl font-semibold text-[#111111]`}
              >
                {s.title}
              </h3>
              <p
                className={`${poppins.className} mt-2 max-w-sm text-[15px] leading-relaxed text-[#666666]`}
              >
                {s.text}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
});

const Costs = memo(function Costs({
  d,
}: {
  d: NonNullable<SolutionData["costs"]>;
}) {
  return (
    <section className="vl-defer py-12 md:py-16">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <h2
            className={`${poppins.className} text-4xl font-bold leading-[1.1] tracking-tight text-[#111111] sm:text-5xl lg:text-6xl`}
          >
            {d.heading}
          </h2>
          <p
            className={`${poppins.className} mx-auto mt-5 max-w-[34rem] text-lg leading-relaxed text-[#111111] md:text-xl`}
          >
            {d.subtitle}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 items-start gap-6 md:mt-16 md:grid-cols-3 md:gap-8">
          {d.cards.map((c) => (
            <Image
              key={c.src}
              src={c.src}
              alt={c.alt}
              width={760}
              height={820}
              sizes="(min-width: 768px) 33vw, 100vw"
              className="h-auto w-full"
            />
          ))}
        </div>
      </Container>
    </section>
  );
});

const Plans = memo(function Plans({
  tiers,
  note,
  name,
  category,
  onNavigateContact,
}: {
  tiers: SolutionData["tiers"];
  note?: string;
  name: string;
  category: string;
  onNavigateContact: Navigate;
}) {
  return (
    <section id="plans" className="vl-defer py-8 md:py-12">
      <Container>
        <div className="bg-[#F7F7F5] p-5 md:p-10">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            {tiers.map((tier) => {
              const featured = Boolean(tier.badge);
              const wa = waLink(
                `Hello VisitingLink team, I am interested in the ${tier.title} ${name} package. Please share the details and commercial proposal.`,
              );
              return (
                <div
                  key={tier.id}
                  className={`relative flex flex-col rounded-2xl bg-white p-7 ${
                    featured
                      ? "border-2 border-[#111111]"
                      : "border border-[#E5E5E2]"
                  }`}
                >
                  {tier.badge && (
                    <span className="absolute -top-3 right-6 rounded-full bg-[#111111] px-3 py-1 text-xs font-semibold text-white">
                      {tier.badge}
                    </span>
                  )}
                  <h3
                    className={`${headingFont} text-xl font-bold tracking-tight`}
                  >
                    {tier.title}
                  </h3>
                  <p className="mt-1 text-sm text-[#777777]">{tier.forWho}</p>

                  <dl className="mt-5 rounded-xl bg-[#F7F7F5] p-4 text-sm">
                    <div className="flex justify-between gap-4">
                      <dt className="text-[#777777]">Best for</dt>
                      <dd className="text-right font-medium">{tier.best}</dd>
                    </div>
                  </dl>

                  <ul className="mt-5 flex-1 space-y-3 text-sm text-[#333333]">
                    {tier.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2.5">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-7 space-y-3">
                    <button
                      onClick={() =>
                        onNavigateContact(`${name} - ${tier.title}`, category)
                      }
                      className={`${featured ? btnPrimary : btnSecondary} w-full`}
                    >
                      Request a proposal
                    </button>
                    <a
                      href={wa}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 text-sm font-medium text-emerald-700 hover:underline"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Chat on WhatsApp
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {note && (
            <p className="mt-8 text-center text-sm text-[#777777]">{note}</p>
          )}
        </div>
      </Container>
    </section>
  );
});

/** Full-width video with a small icon at the bottom-right. Plays only while on screen. */
const VideoBanner = memo(function VideoBanner({
  video,
}: {
  video: NonNullable<SolutionData["video"]>;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="vl-defer relative mt-8 md:mt-12">
      <video
        ref={ref}
        src={video.src}
        poster={video.poster}
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        className="aspect-video w-full object-cover"
      />

      {/* Icon: bottom-right, 4% right se aur 4% bottom se */}
      <div className="absolute bottom-[13%] right-[7%] flex h-10 w-10 rounded-full items-center justify-center bg-white p-2 sm:h-12 sm:w-12 md:h-16 md:w-16 md:p-3">
        <Image
          src="/icon.png"
          alt="VisitingLink"
          width={60}
          height={60}
          className="h-full w-full object-contain"
        />
      </div>
    </section>
  );
});

/* -------------------------------- page -------------------------------- */

export const SolutionPage: React.FC<SolutionPageProps> = ({
  type,
  onNavigateContact,
}) => {
  const d = useMemo(() => SOLUTIONS[type] ?? SOLUTIONS.ecommerce, [type]);

  useEffect(() => {
    try {
      sessionStorage.setItem("last_source_page", d.key);
    } catch {}
  }, [d.key]);

  return (
    <div
      className={`${poppins.className} w-full bg-white pt-20 text-[#111111] selection:bg-black selection:text-white`}
    >
      <style>{PAGE_CSS}</style>

      <Hero d={d.hero} />
      {d.partners && <Partners d={d.partners} />}
      <Included ownership={d.ownership} items={d.included} />
      <Steps title={d.stepsTitle} steps={d.steps} />
      {d.costs && <Costs d={d.costs} />}
      <Plans
        tiers={d.tiers}
        note={d.tiersNote}
        name={d.name}
        category={d.category}
        onNavigateContact={onNavigateContact}
      />
      {d.video && <VideoBanner video={d.video} />}
    </div>
  );
};

export default SolutionPage;
