"use client";

import React, { memo, useEffect, useRef, useState } from "react";
import { Manrope } from "next/font/google";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ClipboardList,
  IndianRupee,
  LayoutDashboard,
  LayoutTemplate,
  Lock,
  MessageCircle,
  PackagePlus,
  Plus,
  Server,
  ShoppingBag,
  X,
  Zap,
} from "lucide-react";
import Image from "next/image";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});
const headingFont = manrope.className;

interface OnlineStorePageProps {
  onNavigateHome: () => void;
  onNavigateContact: (serviceName?: string, category?: string) => void;
}

const WHATSAPP_NUMBER = "919236553585";
const waLink = (text: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
const WHATSAPP_STORE_URL = waLink(
  "Hello VisitingLink! I want to launch an independent online store on my own server with full control. Please share consultation details.",
);

// Place each official logo in /public/partners/ using the file names below.
const WORKING_PARTNERS = [
  { name: "Razorpay", logo: "/gateway/razorpay.webp" },
  { name: "GoKwik", logo: "/gateway/gokwik.webp" },
  { name: "PayU", logo: "/gateway/payu.webp" },
  { name: "Stripe", logo: "/gateway/stripe.webp" },
  { name: "Cashfree Payments", logo: "/gateway/cashfree.webp" },
  { name: "PhonePe", logo: "/gateway/phonepe.webp" },
  { name: "Amazon Pay", logo: "/gateway/amazonpay.webp" },
  { name: "Zoho Payments", logo: "/gateway/ZohoPayments.webp" },
  { name: "Instamojo", logo: "/gateway/instamojo.webp" },
  { name: "Shiprocket", logo: "/gateway/shiprocket.webp" },
];

const AUDIENCES = [
  "First-time founders",
  "Local retailers",
  "D2C brands",
  "Exporters and wholesalers",
];

const INCLUDED = [
  {
    icon: LayoutTemplate,
    title: "Your own online storefront",
    text: "A fast, branded website where customers browse products, view details and place orders. Built around your logo, colours and catalogue.",
  },
  {
    icon: LayoutDashboard,
    title: "Admin dashboard",
    text: "A simple backend to run the store. Change banners, set up discounts and see daily sales without touching code.",
  },
  {
    icon: PackagePlus,
    title: "Product management",
    text: "Add products, upload images, create variants and update prices yourself, whenever you want.",
  },
  {
    icon: ClipboardList,
    title: "Order management",
    text: "See every incoming order, update its status, print shipping labels and keep customers informed over WhatsApp and email.",
  },
  {
    icon: IndianRupee,
    title: "Payments and shipping setup",
    text: "We help with gateway KYC and connect your courier partner. Provider approval and transaction charges apply.",
  },
  {
    icon: Server,
    title: "Hosted on your own server",
    text: "Your store runs on a cloud server under your name. You own the code, the customer data and the content.",
  },
];

const COMPARISON = [
  {
    label: "Monthly platform fee",
    closed: "A subscription that rises as you grow",
    ours: "None. You only pay for your own server",
  },
  {
    label: "Fees on each sale",
    closed: "0.5% to 2% of every order, plus gateway charges",
    ours: "0% from us. Only your gateway’s own charges apply",
  },
  {
    label: "Features and add-ons",
    closed: "Reviews, SEO and discounts need paid monthly apps",
    ours: "Core features are built in with no per-app rent",
  },
  {
    label: "Your data and code",
    closed: "Kept on their servers, and accounts can be paused",
    ours: "On your server, under your name, with full code handover",
  },
  {
    label: "Daily changes",
    closed: "Theme or app conflicts often need a developer",
    ours: "A visual dashboard built for business owners",
  },
  {
    label: "Support",
    closed: "Help articles and support tickets",
    ours: "Setup, KYC help and a live 1-on-1 walkthrough",
  },
];

const GLOBAL_MARKETS = [
  {
    code: "IN",
    country: "India",
    currency: "INR",
    symbol: "₹",
    samplePrice: "4,499",
    taxText: "Inclusive of all GST",
    deliveryText: "Express dispatch across 27,000+ pin codes",
    gateways: "UPI, Cards, NetBanking, COD",
    flag: "🇮🇳",
  },
  {
    code: "US",
    country: "United States",
    currency: "USD",
    symbol: "$",
    samplePrice: "59.00",
    taxText: "Tax calculated at checkout",
    deliveryText: "DHL / FedEx Priority Worldwide",
    gateways: "Apple Pay, Google Pay, Visa, Amex",
    flag: "🇺🇸",
  },
  {
    code: "EU",
    country: "Europe",
    currency: "EUR",
    symbol: "€",
    samplePrice: "54.00",
    taxText: "VAT handled automatically",
    deliveryText: "Euro-zone tracked courier network",
    gateways: "iDEAL, Sofort, Klarna, PayPal, Cards",
    flag: "🇪🇺",
  },
  {
    code: "AE",
    country: "UAE",
    currency: "AED",
    symbol: "AED",
    samplePrice: "219.00",
    taxText: "5% VAT included",
    deliveryText: "Aramex Gulf express network",
    gateways: "Apple Pay, Cards, Cash on Delivery",
    flag: "🇦🇪",
  },
  {
    code: "GB",
    country: "United Kingdom",
    currency: "GBP",
    symbol: "£",
    samplePrice: "48.00",
    taxText: "20% UK VAT calculated",
    deliveryText: "Royal Mail / DPD tracked delivery",
    gateways: "Apple Pay, PayPal, Klarna, Cards",
    flag: "🇬🇧",
  },
];

const MAGIC_TABS = {
  ig: {
    tab: "Instagram",
    title: "From Instagram bio or story straight to checkout",
    text: "Link from your Reels, bio or story into a mobile-first checkout. The customer’s phone number auto-fills and UPI apps open in one tap.",
    source: "via Instagram",
  },
  fb: {
    tab: "Facebook",
    title: "Facebook feed and carousel ads that convert",
    text: "Server-side conversion events track purchases accurately, even where browsers block cookies, so Meta can find your best buyers.",
    source: "via Facebook",
  },
  x: {
    tab: "X",
    title: "Buy links inside posts and sponsored campaigns",
    text: "Drop a direct product link into a thread or promoted post. Full UTM tracking shows exactly how much revenue each post brings in.",
    source: "via X",
  },
} as const;
type MagicKey = keyof typeof MAGIC_TABS;
const MAGIC_KEYS = Object.keys(MAGIC_TABS) as MagicKey[];

const MAGIC_POINTS = [
  "Loads in under a second on mobile",
  "Coupon codes applied from the link, like ?coupon=INSTA20",
  "Product and variant pre-selected",
  "Revenue tracked for every campaign",
];

const PRICING_BULLETS = [
  "Your branded storefront",
  "Admin panel access",
  "Self-managed products",
  "Order management",
  "Payment gateway integration",
  "Launch assistance",
];

const PRICING_INCLUDES = [
  "Front-end online store",
  "Admin panel and backend",
  "Product upload and management",
  "Order management features",
  "Payment gateway integration setup",
];

const COST_PILLARS = [
  {
    title: "Store build",
    tag: "One-time",
    text: "We design, build and launch your store once. After that, it is yours.",
    points: [
      "Custom design that matches your brand",
      "Payment gateway and courier integration",
      "Store Magic Link™ ad funnels",
      "1-on-1 training for you and your team",
      "Full source code handover",
    ],
  },
  {
    title: "Cloud server",
    tag: "Billed by the provider",
    text: "Your own account with DigitalOcean, AWS or Cloudways. We add no markup.",
    points: [
      "Roughly ₹500 to ₹1,500 a month, scaling with traffic",
      "Dedicated CPU and RAM, not shared hosting",
      "CDN caching and free SSL certificates",
      "Billed straight to your company card",
    ],
  },
  {
    title: "Annual maintenance",
    tag: "Optional",
    text: "Renew only if you want us to keep the technical side looked after.",
    points: [
      "Daily automated offsite backups",
      "Security patches and malware scans",
      "Gateway and courier API updates",
      "Priority help when something breaks",
    ],
  },
];

const BUSINESS_TIERS = [
  {
    id: "boutique",
    title: "Starter",
    forWho: "For small shops and new sellers",
    best: "Small catalogues, Instagram sellers",
    badge: undefined as string | undefined,
    highlights: [
      "Up to 100 products",
      "Limited customization with ready-made themes",
      "Payment gateway integration",
      "Admin panel to manage products and orders",
      "Hosted on your own server",
    ],
  },
  {
    id: "growth",
    title: "Growth",
    forWho: "For growing stores that need more reach",
    best: "Growing brands with regular orders",
    badge: "Most popular" as string | undefined,
    highlights: [
      "Everything in Starter",
      "Higher product limit and more customization",
      "SMS gateway connected",
      "WhatsApp API connected",
      "Order and customer management panel",
    ],
  },
  {
    id: "enterprise",
    title: "Enterprise",
    forWho: "For large and custom stores",
    best: "Large catalogues, custom requirements",
    badge: undefined as string | undefined,
    highlights: [
      "Everything in Growth",
      "Unlimited products",
      "Fully custom design",
      "Advanced integrations and custom features",
      "Dedicated account manager",
    ],
  },
].map((t) => ({
  ...t,
  waUrl: waLink(
    `Hello VisitingLink team, I am interested in the ${t.title} package. Please share the details and commercial proposal.`,
  ),
}));

const STEPS = [
  {
    n: "01",
    title: "Tell us about your business",
    text: "Share what you sell, your branding and the features you need.",
  },
  {
    n: "02",
    title: "We set up your store",
    text: "We configure the storefront, admin panel, catalogue structure and agreed integrations.",
  },
  {
    n: "03",
    title: "Manage and start selling",
    text: "Get your admin access, add your products and take your first orders.",
  },
];

const FAQS = [
  {
    q: "Will the online store be mine?",
    a: "Yes. Your store is deployed on a cloud server registered under your name. You own the code, the customer database, the order records and every file, and no company can pause your account or raise your fees.",
  },
  {
    q: "Can I add products myself later?",
    a: "Yes. Adding products, uploading images, changing prices, running sales and tracking inventory all happen from a visual dashboard. You never need a developer for day-to-day work, and we walk you and your team through it on a live call.",
  },
  {
    q: "Is the payment gateway included?",
    a: "Gateway integration is included and we guide you through KYC. The gateway provider decides approval, and their transaction charges apply to each payment. We take no cut of your sales.",
  },
  {
    q: "Are domain and hosting included?",
    a: "We handle domain mapping, SSL and server setup. The server is billed directly by the cloud provider at cost, usually ₹500 to ₹1,500 a month, and the domain is registered in your name.",
  },
  {
    q: "Who is this package for?",
    a: "Founders, local retailers, D2C brands and MSMEs who want their own store without a big custom build or a platform subscription that grows with every sale.",
  },
  {
    q: "What does the cost include?",
    a: "There are three parts. A one-time build cost for design and launch, the cloud server billed directly by the provider, and an optional annual maintenance plan covering patches, backups and priority support.",
  },
  {
    q: "What is a Store Magic Link?",
    a: "It is a direct link for your Instagram bio, ads, X posts or WhatsApp broadcasts. It opens a fast checkout with the product and variant already chosen, the coupon applied and UPI or card payment ready.",
  },
  {
    q: "Can I accept international payments?",
    a: "Yes. We set up multi-currency pricing and gateways such as Stripe, PayPal and PayGlocal next to Indian processors like Razorpay and Cashfree. The store shows prices in the buyer’s currency and generates export invoices.",
  },
];

const HERO_BARS = [30, 45, 35, 62, 52, 90];

const btnPrimary =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-[#111111] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#333333] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2 cursor-pointer";
const btnSecondary =
  "inline-flex items-center justify-center gap-2 rounded-lg border border-[#DCDCDC] bg-white px-6 py-3.5 text-sm font-semibold text-[#111111] transition-colors hover:bg-[#F5F5F5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2 cursor-pointer";

/**
 * One static stylesheet for the whole page (rendered once, never changes):
 *  - hero entrance animation in pure CSS (no JS animation library on the main thread)
 *  - marquee animation, GPU-friendly, paused when off-screen / hovered / reduced motion
 *  - content-visibility so below-the-fold sections skip layout & paint until near the viewport
 */
const PAGE_CSS = `
@keyframes vl-fade-up {
  from { opacity: 0; transform: translate3d(0, 16px, 0); }
  to { opacity: 1; transform: translate3d(0, 0, 0); }
}
.vl-fade-up { animation: vl-fade-up .6s cubic-bezier(.22,.61,.36,1) both; }

@keyframes vl-marquee {
  from { transform: translate3d(0, 0, 0); }
  to { transform: translate3d(-50%, 0, 0); }
}
.vl-marquee-track {
  animation: vl-marquee 32s linear infinite;
  will-change: transform;
  backface-visibility: hidden;
}
.vl-marquee:hover .vl-marquee-track,
.vl-marquee.is-paused .vl-marquee-track { animation-play-state: paused; }

/* content-visibility can itself cause scroll jank when section heights are
   estimated, so use plain containment: it limits layout/paint scope per section. */
.vl-defer {
  contain: layout paint;
}

@media (prefers-reduced-motion: reduce) {
  .vl-fade-up { animation: none; }
  .vl-marquee-track { animation: none; }
}
`;

const Container: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => (
  <div className={`mx-auto w-full max-w-[100vw] md:max-w-[90vw] px-6 md:px-10 ${className}`}>
    {children}
  </div>
);

const SectionHead: React.FC<{ title: string; subtitle?: string }> = ({
  title,
  subtitle,
}) => (
  <div className="mx-auto max-w-3xl text-center">
    <h2
      className={`${headingFont} text-3xl font-bold leading-[1.08] tracking-[-0.03em] text-[#111111] sm:text-5xl`}
    >
      {title}
    </h2>
    {subtitle && (
      <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#666666] sm:text-lg">
        {subtitle}
      </p>
    )}
  </div>
);

/* ------------------------------------------------------------------ */
/* Static sections: memoised so they never re-render                   */
/* ------------------------------------------------------------------ */

const Hero = memo(function Hero() {
  return (
    <section className="bg-[#F7F7F5]">
      <Container className="pb-20 pt-4 md:pt-16">
        <div className="grid grid-cols-1 items-center gap-x-14 gap-y-8 lg:grid-cols-12 lg:gap-y-0">
          {/* Heading + description */}
          <div className="vl-fade-up lg:col-span-6 lg:col-start-1 lg:row-start-1 lg:self-end">
            <h1
              className={`${headingFont} mt-6 text-4xl font-bold leading-[1.02] tracking-[-0.035em] text-[#111111] sm:text-6xl md:text-7xl`}
            >
              Your business deserves a store.
              <span className="block text-[#8A8A86]">Not a big bill.</span>
            </h1>
            <p className="mt-6 max-w-xl text-sm md:text-lg leading-relaxed text-[#555555]">
              Start selling with your own eCommerce website, product catalogue
              and admin panel. It runs on your own server, so there are no
              monthly platform fees and no cut taken from your sales.
            </p>
          </div>

          {/* Image: below description on mobile, right column on desktop */}
          <div
            className="vl-fade-up relative lg:col-span-6 lg:col-start-7 lg:row-span-2 lg:row-start-1"
            style={{ animationDelay: "0.15s" }}
          >
            <Image
              src="/images/your_brand_store.webp"
              alt="Your brand store"
              width={900}
              height={700}
              priority
              className="h-auto w-full scale-110"
            />
          </div>

          {/* CTAs: below image on mobile, left column on desktop */}
          <div className="vl-fade-up lg:col-span-6 lg:col-start-1 lg:row-start-2 lg:self-start">
            <div className="flex flex-wrap items-center gap-3 lg:mt-8">
              <a href="#pricing" className={btnPrimary}>
                Get your online store
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#included" className={btnSecondary}>
                Explore what’s included
              </a>
            </div>
            <p className="mt-5 text-sm text-[#777777]">
              One-time setup. You own your store. Made for startups and MSMEs.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
});

const AudienceStrip = memo(function AudienceStrip() {
  return (
    <section className="border-b border-[#EEEEEA]">
      <Container className="flex flex-col gap-4 py-8 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-[#777777]">A practical starting point for</p>
        <ul className="flex flex-wrap gap-x-10 gap-y-3 text-sm font-semibold text-[#111111]">
          {AUDIENCES.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
      </Container>
    </section>
  );
});

const Included = memo(function Included() {
  return (
    <section id="included" className="vl-defer py-24">
      <Container>
        <SectionHead
          title="All the essentials to start selling online."
          subtitle="We set up the store. You focus on your products, customers and business."
        />
        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {INCLUDED.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-2xl border border-[#E8E8E5] bg-white p-7"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F2F2EF] text-[#111111]">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-[#111111]">
                {title}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[#666666]">
                {text}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
});

const OwnVsRent = memo(function OwnVsRent() {
  return (
    <section className="vl-defer bg-[#F7F7F5] py-24">
      <Container>
        <SectionHead
          title="Why rent when you can own?"
          subtitle="Closed platforms look cheap at the start, then add app fees, transaction cuts and developer bills. Here is how owning your store compares."
        />
        <div className="mt-14 overflow-x-auto">
          <div className="min-w-[680px] overflow-hidden rounded-2xl border border-[#E5E5E2] bg-white">
            <div className="grid grid-cols-12 border-b border-[#EEEEEA] bg-[#FAFAF9] text-sm font-semibold">
              <div className="col-span-3 p-5 text-[#777777]" />
              <div className="col-span-4 p-5 text-[#555555]">
                Shopify and closed platforms
              </div>
              <div className="col-span-5 p-5 text-[#111111]">
                VisitingLink store
              </div>
            </div>
            {COMPARISON.map((row, i) => (
              <div
                key={row.label}
                className={`grid grid-cols-12 text-sm ${i !== 0 ? "border-t border-[#EEEEEA]" : ""}`}
              >
                <div className="col-span-3 p-5 font-semibold text-[#111111]">
                  {row.label}
                </div>
                <div className="col-span-4 flex items-start gap-2.5 p-5 text-[#666666]">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-[#B5B5B0]" />
                  <span>{row.closed}</span>
                </div>
                <div className="col-span-5 flex items-start gap-2.5 p-5 text-[#111111]">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  <span>{row.ours}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
});

/* ------------------------------------------------------------------ */
/* Interactive sections: state lives locally so only they re-render    */
/* ------------------------------------------------------------------ */

const GlobalMarkets = memo(function GlobalMarkets() {
  const [code, setCode] = useState(GLOBAL_MARKETS[0].code);
  const activeMarket =
    GLOBAL_MARKETS.find((m) => m.code === code) ?? GLOBAL_MARKETS[0];

  const details = [
    {
      title: "Currency",
      text: `Shown in ${activeMarket.currency}, converted automatically with live exchange rates.`,
    },
    {
      title: "Shipping",
      text: `${activeMarket.deliveryText}. Tracking is sent by WhatsApp and email.`,
    },
    { title: "Payments accepted", text: activeMarket.gateways },
    {
      title: "Packaging",
      text: "The best box size is suggested for each order and the shipping label is printed for you.",
    },
  ];

  return (
    <section className="vl-defer py-24">
      <Container>
        <SectionHead
          title="Grow around the world."
          subtitle="Sell across borders with local currency, tax handling and courier labels already set up."
        />

        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {GLOBAL_MARKETS.map((m) => {
            const active = activeMarket.code === m.code;
            return (
              <button
                key={m.code}
                onClick={() => setCode(m.code)}
                aria-pressed={active}
                className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] ${
                  active
                    ? "border-[#111111] bg-[#111111] text-white"
                    : "border-[#E0E0DC] bg-white text-[#444444] hover:border-[#111111]"
                }`}
              >
                <span>{m.flag}</span>
                <span>{m.country}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-12">
          <div className="relative overflow-hidden rounded-2xl border border-[#E8E8E5] bg-white lg:col-span-5 [container-type:inline-size]">
            <Image
              src="/images/product_card.webp"
              alt="Product card showing a folded cream sweater"
              width={1536}
              height={1820}
              className="h-auto w-full"
            />
          
            {/* Country name, under "Price for shoppers in" */}
            <p
              key={`country-${activeMarket.code}`}
              className="absolute left-[4.8%] top-[70%] text-[2.9cqw] font-semibold leading-none text-[#111111]"
            >
              {activeMarket.flag} {activeMarket.country}
            </p>
          
            {/* Price in the selected currency, above "Inclusive of all taxes" */}
            <p
              key={`price-${activeMarket.code}`}
              className={`${headingFont} absolute bottom-[26%] right-[4.8%] text-[4.6cqw] font-semibold leading-none tracking-tight text-[#111111]`}
            >
              {activeMarket.symbol} {activeMarket.samplePrice}
            </p>
          </div>

          <div className="grid gap-5 lg:col-span-7">
            {details.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-[#E8E8E5] bg-[#FAFAF9] p-6"
              >
                <h3 className="text-base font-semibold">{item.title}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-[#666666]">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
});

const MagicLink = memo(function MagicLink() {
  const [tab, setTab] = useState<MagicKey>("ig");
  const magic = MAGIC_TABS[tab];

  return (
    <section className="vl-defer bg-[#F7F7F5] py-24">
      <Container>
        <SectionHead
          title="Store Magic Link™ turns ad clicks into sales."
          subtitle="Shoppers skip the cart and land on a pre-filled, one-tap checkout. No heavy homepage, no hunting for the product."
        />

        <div className="mt-14 grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <div className="inline-flex rounded-lg border border-[#E0E0DC] bg-white p-1">
              {MAGIC_KEYS.map((key) => (
                <button
                  key={key}
                  onClick={() => setTab(key)}
                  aria-pressed={tab === key}
                  className={`rounded-md px-5 py-2 text-sm font-semibold transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] ${
                    tab === key
                      ? "bg-[#111111] text-white"
                      : "text-[#666666] hover:text-black"
                  }`}
                >
                  {MAGIC_TABS[key].tab}
                </button>
              ))}
            </div>

            <h3
              className={`${headingFont} mt-8 text-2xl font-bold leading-tight tracking-tight sm:text-3xl`}
            >
              {magic.title}
            </h3>
            <p className="mt-3 max-w-lg text-base leading-relaxed text-[#555555]">
              {magic.text}
            </p>

            <ul className="mt-6 space-y-3 text-[15px] text-[#333333]">
              {MAGIC_POINTS.map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-emerald-600" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-center lg:col-span-6">
            <div className="w-full max-w-[340px] rounded-[2.5rem] border-[10px] border-[#111111] bg-white p-5 shadow-xl">
              <div className="flex items-center justify-between border-b border-[#EEEEEA] pb-3 text-xs text-[#777777]">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  {magic.source}
                </span>
                <span className="rounded-full bg-[#F2F2EF] px-2.5 py-0.5 font-medium text-[#333333]">
                  Magic Link
                </span>
              </div>

              <div className="mt-4 flex gap-3 rounded-xl bg-[#FAFAF9] p-3">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-[#EDEDEA]">
                  <ShoppingBag className="h-6 w-6 text-[#999999]" />
                </div>
                <div>
                  <p className="text-sm font-semibold">
                    Signature Ceramic Dripper Set
                  </p>
                  <p className="mt-0.5 text-xs text-[#777777]">
                    Matte black with a free filter pack
                  </p>
                  <p className="mt-1 text-sm font-bold">
                    ₹1,899{" "}
                    <span className="text-xs font-normal text-[#999999] line-through">
                      ₹2,499
                    </span>
                  </p>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between text-xs">
                <span className="text-emerald-700">
                  Coupon SOCIALOFFER applied
                </span>
                <span className="font-semibold text-emerald-700">-₹600</span>
              </div>

              <div className="mt-4 space-y-2 text-sm">
                <div className="flex items-center justify-between rounded-lg border-2 border-[#111111] p-3 font-semibold">
                  <span>UPI (GPay, PhonePe, Paytm)</span>
                  <Check className="h-4 w-4" />
                </div>
                <div className="rounded-lg border border-[#E5E5E2] p-3 text-[#555555]">
                  Credit or debit card
                </div>
                <div className="rounded-lg border border-[#E5E5E2] p-3 text-[#555555]">
                  Cash on delivery
                </div>
              </div>

              <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#111111] py-3 text-sm font-semibold text-white">
                <Zap className="h-4 w-4 fill-white" />
                Pay ₹1,899
              </button>
              <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-[#888888]">
                <Lock className="h-3 w-3 text-emerald-600" />
                Encrypted checkout with direct bank settlement
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
});

const PricingBand = memo(function PricingBand({
  onNavigateContact,
}: {
  onNavigateContact: (serviceName?: string, category?: string) => void;
}) {
  return (
    <section id="pricing" className="vl-defer bg-[#111111] py-24 text-white">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2
              className={`${headingFont} text-4xl font-bold leading-[1.05] tracking-[-0.03em] sm:text-5xl`}
            >
              Don’t spend your starting capital just to get started online.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
              Get a ready-to-launch eCommerce foundation without committing to
              an expensive custom build or a complicated platform subscription
              from day one.
            </p>
            <ul className="mt-8 grid max-w-xl grid-cols-1 gap-x-8 gap-y-3 text-[15px] text-white/90 sm:grid-cols-2">
              {PRICING_BULLETS.map((t) => (
                <li key={t} className="flex items-center gap-2.5">
                  <Check className="h-4 w-4 shrink-0 text-emerald-400" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-3xl bg-white p-8 text-[#111111]">
              <p className="text-sm font-semibold text-emerald-700">
                Online store launch package
              </p>
              <p
                className={`${headingFont} mt-3 text-4xl font-bold tracking-tight sm:text-5xl`}
              >
                ₹20,000 – ₹23,000
              </p>
              <p className="mt-2 text-sm text-[#777777]">
                One-time setup price. The final quote depends on your
                requirements.
              </p>
              <ul className="mt-6 divide-y divide-[#EEEEEA] border-t border-[#EEEEEA] text-[15px]">
                {PRICING_INCLUDES.map((t) => (
                  <li key={t} className="flex items-center gap-3 py-3.5">
                    <Check className="h-4 w-4 shrink-0 text-emerald-600" />
                    {t}
                  </li>
                ))}
              </ul>
              <button
                onClick={() =>
                  onNavigateContact(
                    "Online Store Launch Package",
                    "Get Your Online Store"
                  )
                }
                className={`${btnPrimary} mt-4 w-full`}
              >
                Discuss your store
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
});

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

// Estimate: Shopify Basic (~₹3,200/mo) + ~3 paid apps (~₹5,000/mo) + 2% transaction fee.
// VisitingLink: server only (~₹800/mo) with no transaction fee from us.
const OWN_ANNUAL = 9600;

const SavingsCalculator = memo(function SavingsCalculator() {
  const [orders, setOrders] = useState(400);
  const [aov, setAov] = useState(1500);

  const monthlyRevenue = orders * aov;
  const shopifyAnnual = Math.round(
    (3200 + 5000) * 12 + monthlyRevenue * 0.02 * 12,
  );
  const savings = Math.max(0, shopifyAnnual - OWN_ANNUAL);

  return (
    <div className="hidden md:block mt-8 rounded-3xl border border-[#E5E5E2] bg-[#F7F7F5] p-8 md:p-12">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
        <div>
          <h3
            className={`${headingFont} text-2xl font-bold tracking-tight sm:text-3xl`}
          >
            See how much you could save compared to Shopify
          </h3>
          <p className="mt-3 text-[15px] leading-relaxed text-[#666666]">
            Shopify charges a plan fee, up to 2% per transaction and paid
            monthly apps. Move the sliders to estimate your yearly saving.
          </p>

          <div className="mt-8 space-y-6">
            <div>
              <div className="mb-2 flex justify-between text-sm">
                <label htmlFor="orders" className="text-[#555555]">
                  Monthly orders
                </label>
                <strong>{orders}</strong>
              </div>
              <input
                id="orders"
                type="range"
                min="50"
                max="3000"
                step="50"
                value={orders}
                onChange={(e) => setOrders(Number(e.target.value))}
                className="w-full cursor-pointer accent-[#111111]"
              />
            </div>
            <div>
              <div className="mb-2 flex justify-between text-sm">
                <label htmlFor="aov" className="text-[#555555]">
                  Average order value
                </label>
                <strong>{inr(aov)}</strong>
              </div>
              <input
                id="aov"
                type="range"
                min="500"
                max="6000"
                step="100"
                value={aov}
                onChange={(e) => setAov(Number(e.target.value))}
                className="w-full cursor-pointer accent-[#111111]"
              />
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-[#111111] p-8 text-white">
          <p className="text-sm text-white/60">Estimated savings in one year</p>
          <p
            className={`${headingFont} mt-2 text-5xl font-extrabold tracking-tight text-emerald-400 tabular-nums`}
          >
            {inr(savings)}
          </p>
          <div className="mt-6 grid grid-cols-2 gap-4 border-t border-white/10 pt-5 text-sm">
            <div>
              <p className="text-white/50">Shopify with apps</p>
              <p className="mt-1 font-semibold tabular-nums">
                {inr(shopifyAnnual)}
              </p>
            </div>
            <div>
              <p className="text-white/50">Your own server</p>
              <p className="mt-1 font-semibold">About {inr(OWN_ANNUAL)}</p>
            </div>
          </div>
          <p className="mt-5 text-xs leading-relaxed text-white/50">
            An estimate based on a Basic plan, three paid apps and a 2%
            transaction fee. Your actual costs will vary.
          </p>
        </div>
      </div>
    </div>
  );
});

const CostBreakdown = memo(function CostBreakdown() {
  return (
    <section className="vl-defer py-24">
      <Container>
        <SectionHead
          title="Three costs. All of them clear."
          subtitle="No hidden fees and no revenue cuts. Here is exactly what you pay for and who you pay."
        />

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {COST_PILLARS.map((p) => (
            <div
              key={p.title}
              className="flex flex-col rounded-2xl border border-[#E8E8E5] bg-white p-7"
            >
              <span className="w-fit rounded-full bg-[#F2F2EF] px-3 py-1 text-xs font-medium text-[#444444]">
                {p.tag}
              </span>
              <h3 className="mt-4 text-xl font-semibold">{p.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[#666666]">
                {p.text}
              </p>
              <ul className="mt-5 space-y-3 border-t border-[#EEEEEA] pt-5 text-sm text-[#333333]">
                {p.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <SavingsCalculator />
      </Container>
    </section>
  );
});

const STEP_PX = 208; // item width 144px (w-36) + gap 64px (gap-16)
const STEP_MS = 2000; // time between steps
const SLIDE_MS = 600; // slide animation duration
const COPIES = 3; // enough items to fill very wide screens

const Partners = memo(function Partners() {
  const ref = useRef<HTMLDivElement>(null);

  // Pause the animation while off-screen
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
    <section className="vl-defer md:py-20">
      <Container>
        <h2
          className={`${headingFont} text-center text-2xl font-bold tracking-tight text-[#111111] sm:text-4xl`}
        >
          Our Working Partners
        </h2>
      </Container>

      <div
        ref={ref}
        className="vl-logo-marquee mt-12 overflow-hidden"
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
              className="flex shrink-0 items-center "
              aria-hidden={g === 1 || undefined}
            >
              {WORKING_PARTNERS.map((partner) => (
                <div
                  key={`${g}-${partner.name}`}
                  className="flex h-24 w-40 shrink-0 items-center justify-center md:h-36 md:w-64"
                >
                  <img
                    src={partner.logo}
                    alt={g === 0 ? partner.name : ""}
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

const Plans = memo(function Plans({
  onNavigateContact,
}: {
  onNavigateContact: (serviceName?: string, category?: string) => void;
}) {
  return (
    <section id="choose-business" className="vl-defer bg-[#F7F7F5] py-24">
      <Container>
        <SectionHead
          title="Choose according to your business."
          subtitle="Three packages for different stages of growth. Each one is built on your own server."
        />

        <div className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {BUSINESS_TIERS.map((tier) => {
            const featured = Boolean(tier.badge);
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
                      onNavigateContact(
                        `Online Store - ${tier.title}`,
                        "Get Your Online Store"
                      )
                    }
                    className={`${featured ? btnPrimary : btnSecondary} w-full`}
                  >
                    Request a proposal
                  </button>
                  <a
                    href={tier.waUrl}
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

        <p className="mt-8 text-center text-sm text-[#777777]">
          SMS and WhatsApp API charges are not included. They are billed
          directly by the provider.
        </p>
      </Container>
    </section>
  );
});

const Steps = memo(function Steps() {
  return (
    <section className="vl-defer py-24">
      <Container>
        <SectionHead
          title="From idea to online store in 3 steps."
          subtitle="A clear process, so you always know what happens next."
        />
        <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          {STEPS.map((s) => (
            <div key={s.n}>
              <div
                className={`${headingFont} text-5xl font-bold tracking-tight text-[#D6D6D1]`}
              >
                {s.n}
              </div>
              <h3 className="mt-4 text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 max-w-sm text-[15px] leading-relaxed text-[#666666]">
                {s.text}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
});

const Faq = memo(function Faq() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [imgHeight, setImgHeight] = useState<number | null>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const openRef = useRef<number | null>(null);

  openRef.current = openFaq;

  // Measure only on mount, font load and window resize (never while FAQs animate)
  useEffect(() => {
    const measure = () => {
      if (openRef.current !== null || !rightRef.current) return;
      setImgHeight(rightRef.current.offsetHeight);
    };

    measure();
    document.fonts?.ready.then(measure);
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <section className="vl-defer bg-[#F7F7F5] py-24">
      <Container>
        <div className="flex flex-col items-start gap-12 lg:flex-row lg:gap-14">
          {/* Left: image, desktop only (40%), fixed to closed-state height */}
          <div
            className="relative hidden w-full shrink-0 overflow-hidden rounded-3xl lg:block lg:w-[40%]"
            style={{ height: imgHeight ?? 560 }}
          >
            <Image
              src="/images/faqs.webp"
              alt="Frequently asked questions"
              fill
              sizes="(min-width: 1024px) 40vw, 0px"
              className="object-cover"
            />
          </div>

          {/* Right: heading + FAQs (60%) */}
          <div ref={rightRef} className="w-full lg:flex-1">
            <h2
              className={`${headingFont} text-center text-3xl font-bold tracking-tight text-[#111111] sm:text-4xl lg:text-left`}
            >
              Frequently Asked Questions
            </h2>

            <div className="mt-8 border-t border-[#E3E3DF] lg:mt-10">
              {FAQS.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div key={faq.q} className="border-b border-[#E3E3DF]">
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${index}`}
                      className="flex w-full items-center justify-between gap-6 py-6 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111]"
                    >
                      <span className="text-base font-semibold text-[#111111]">
                        {faq.q}
                      </span>
                      <Plus
                        className={`h-5 w-5 shrink-0 text-[#111111] transition-transform duration-200 ${
                          isOpen ? "rotate-45" : ""
                        }`}
                      />
                    </button>
                    {/* CSS grid-rows trick: smooth open/close with no JS layout animation */}
                    <div
                      id={`faq-panel-${index}`}
                      role="region"
                      className={`grid transition-[grid-template-rows] duration-200 ease-out ${
                        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p
                          className={`pb-6 pr-10 text-[15px] leading-relaxed text-[#555555] transition-opacity duration-200 ${
                            isOpen ? "opacity-100" : "opacity-0"
                          }`}
                        >
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
});

const FinalCta = memo(function FinalCta({
  onNavigateContact,
}: {
  onNavigateContact: (serviceName?: string, category?: string) => void;
}) {
  return (
    <section className="vl-defer py-20">
      <Container>
        <div className="flex flex-col justify-between gap-8 rounded-3xl bg-[#111111] p-10 text-white md:flex-row md:items-center md:p-14">
          <div className="max-w-xl">
            <h2
              className={`${headingFont} text-3xl font-bold tracking-[-0.03em] sm:text-4xl`}
            >
              Ready to take your business online?
            </h2>
            <p className="mt-3 text-white/70">
              Tell us what you want to sell. We’ll help you plan your online
              store.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() =>
                onNavigateContact(
                  "Online Store Planning",
                  "Get Your Online Store"
                )
              }
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-white px-6 py-3.5 text-sm font-semibold text-[#111111] transition-colors hover:bg-[#EDEDED] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#111111] cursor-pointer"
            >
              Talk to Visitinglink
              <ArrowUpRight className="h-4 w-4" />
            </button>
            <a
              href={WHATSAPP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-white/25 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer"
            >
              <MessageCircle className="h-4 w-4" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
});

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export const OnlineStorePage: React.FC<OnlineStorePageProps> = ({
  onNavigateContact,
}) => {
  useEffect(() => {
    try {
      sessionStorage.setItem("last_source_page", "online-store");
    } catch {}
  }, []);

  return (
    <div className="w-full bg-white pb-6 pt-20 text-[#111111] selection:bg-black selection:text-white">
      <style>{PAGE_CSS}</style>

      <Hero />
      <AudienceStrip />
      <Included />
      <OwnVsRent />
      <GlobalMarkets />
      <MagicLink />
      <PricingBand onNavigateContact={onNavigateContact} />
      <CostBreakdown />
      <Partners />
      <Plans onNavigateContact={onNavigateContact} />
      <Steps />
      <Faq />
      <FinalCta onNavigateContact={onNavigateContact} />
    </div>
  );
};
