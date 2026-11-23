import {
  BarChart3,
  Bell,
  ClipboardList,
  FileText,
  Globe,
  IndianRupee,
  LayoutDashboard,
  MessageCircle,
  PackagePlus,
  Search,
  Server,
  Smartphone,
  Store,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";

export type SolutionKey = "ecommerce" | "informative" | "crm";

export interface SolutionData {
  key: SolutionKey;
  /** used in WhatsApp / contact messages */
  name: string;
  category: string;
  hero: { title: string; text: string; image: string; imageAlt: string };
  /** optional: logo marquee. Section is hidden if omitted */
  partners?: { heading: string; logos: { name: string; src: string }[] };
  ownership: { light: string; bold: string };
  included: { title: string; text: string; icon: LucideIcon }[];
  stepsTitle: string;
  steps: { title: string; text: string }[];
  /** optional: 3 illustrated cost cards (text is part of each image) */
  costs?: {
    heading: string;
    subtitle: string;
    cards: { src: string; alt: string }[];
  };
  tiers: {
    id: string;
    title: string;
    forWho: string;
    best: string;
    badge?: string;
    highlights: string[];
  }[];
  tiersNote?: string;
  /** optional: full-width video at the end of the page, no text on top */
  video?: { src: string; poster?: string };
}

const PAYMENT_LOGOS = [
  { name: "Razorpay", src: "/gateway/razorpay.webp" },
  { name: "GoKwik", src: "/gateway/gokwik.webp" },
  { name: "PayU", src: "/gateway/payu.webp" },
  { name: "Stripe", src: "/gateway/stripe.webp" },
  { name: "Cashfree Payments", src: "/gateway/cashfree.webp" },
  { name: "PhonePe", src: "/gateway/phonepe.webp" },
  { name: "Amazon Pay", src: "/gateway/amazonpay.webp" },
  { name: "Zoho Payments", src: "/gateway/ZohoPayments.webp" },
  { name: "Instamojo", src: "/gateway/instamojo.webp" },
  { name: "Shiprocket", src: "/gateway/shiprocket.webp" },
];

const OWNERSHIP = {
  light: "Your Platform. Your Code.",
  bold: "Your Ownership.",
};
const VIDEO = { src: "/videos/visitinglink.mp4" };

export const SOLUTIONS: Record<SolutionKey, SolutionData> = {
  /* ------------------------------ ECOMMERCE ------------------------------ */
  ecommerce: {
    key: "ecommerce",
    name: "Online Store",
    category: "Get Your Online Store",
    hero: {
      title: "Your business deserves a store, not high costs.",
      text: "Build a self-coded eCommerce platform with product catalog and admin panel for full control, ownership, and no external fees.",
      image: "/solutions/ecommerce_hero.png",
      imageAlt: "Your brand store",
    },
    partners: { heading: "Our Payment Partners", logos: PAYMENT_LOGOS },
    ownership: OWNERSHIP,
    included: [
      {
        icon: Store,
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
    ],
    stepsTitle: "From idea to online store in 3 steps.",
    steps: [
      {
        title: "Tell us about your business",
        text: "Share what you sell, your branding and the features you need.",
      },
      {
        title: "We set up your store",
        text: "We configure the storefront, admin panel, catalogue structure and agreed integrations.",
      },
      {
        title: "Manage and start selling",
        text: "Get your admin access, add your products and take your first orders.",
      },
    ],
    costs: {
      heading: "Three costs. All of them clear",
      subtitle:
        "No hidden fees, no revenue cuts. Here is exactly what you pay for and who you pay.",
      cards: [
        {
          src: "/solutions/ecommerce_feature_1.png",
          alt: "Store build: one-time. We design, build and launch your store once. After that, it is yours.",
        },
        {
          src: "/solutions/ecommerce_feature_2.png",
          alt: "Cloud server: billed by the provider. Your own account with DigitalOcean, AWS or Cloudways. We add no markup.",
        },
        {
          src: "/solutions/ecommerce_feature_3.png",
          alt: "Annual maintenance: optional. Renew only if you want us to keep the technical side looked after.",
        },
      ],
    },
    tiers: [
      {
        id: "starter",
        title: "Starter",
        forWho: "For small shops and new sellers",
        best: "Small catalogues, Instagram sellers",
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
        badge: "Most popular",
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
        highlights: [
          "Everything in Growth",
          "Unlimited products",
          "Fully custom design",
          "Advanced integrations and custom features",
          "Dedicated account manager",
        ],
      },
    ],
    tiersNote:
      "SMS and WhatsApp API charges are not included. They are billed directly by the provider.",
    video: { src:"/solutions/ecommerce_vid.mp4"},
  },

  /* ----------------------------- INFORMATIVE ----------------------------- */
  informative: {
    key: "informative",
    name: "Business Website",
    category: "Get Your Business Website",
    hero: {
      title: "Your business deserves a website, not high costs.",
      text: "A fast, professional website that explains what you do, shows your work and brings enquiries straight to your phone. Built once, owned by you.",
      image: "/images/your_brand_website.webp",
      imageAlt: "Your business website",
    },
    ownership: OWNERSHIP,
    included: [
      {
        icon: Globe,
        title: "Custom business website",
        text: "Home, About, Services and Contact pages designed around your brand, ready for customers to find and trust.",
      },
      {
        icon: Smartphone,
        title: "Mobile-first design",
        text: "Loads fast and reads well on every phone, tablet and desktop.",
      },
      {
        icon: Search,
        title: "SEO basics",
        text: "Clean structure, meta tags and sitemap so Google can understand and list your pages.",
      },
      {
        icon: FileText,
        title: "Easy content updates",
        text: "Edit text, images and blog posts yourself from a simple panel. No developer needed.",
      },
      {
        icon: MessageCircle,
        title: "Enquiry and WhatsApp forms",
        text: "Contact forms and WhatsApp buttons that send leads straight to you.",
      },
      {
        icon: Server,
        title: "Hosted under your name",
        text: "Domain, SSL and hosting set up in your name, with the full code handed over.",
      },
    ],
    stepsTitle: "From idea to live website in 3 steps.",
    steps: [
      {
        title: "Share your business details",
        text: "Tell us about your services, brand and the pages you need.",
      },
      {
        title: "We design and build",
        text: "We create the design, write the structure and build every page.",
      },
      {
        title: "Review and go live",
        text: "You review, we refine, and the website goes live on your domain.",
      },
    ],
    tiers: [
      {
        id: "basic",
        title: "Basic",
        forWho: "For new businesses",
        best: "Simple presence, few pages",
        highlights: [
          "Up to 5 pages",
          "Ready-made design with your branding",
          "Contact form",
          "Basic SEO",
          "Hosted on your own server",
        ],
      },
      {
        id: "business",
        title: "Business",
        forWho: "For established businesses",
        best: "Services, portfolios, blogs",
        badge: "Most popular",
        highlights: [
          "Everything in Basic",
          "Up to 12 pages",
          "Blog and content panel",
          "WhatsApp and analytics connected",
          "Speed optimisation",
        ],
      },
      {
        id: "custom",
        title: "Custom",
        forWho: "For brands with specific needs",
        best: "Unique design, multi-language",
        highlights: [
          "Everything in Business",
          "Fully custom design",
          "Multi-language pages",
          "Advanced integrations",
          "Dedicated account manager",
        ],
      },
    ],
    video: VIDEO,
  },

  /* -------------------------------- CRM --------------------------------- */
  crm: {
    key: "crm",
    name: "CRM System",
    category: "Get Your CRM",
    hero: {
      title: "Your customers deserve a system, not a spreadsheet.",
      text: "Track leads, follow-ups and customers in one CRM built around how your team actually works, running on your own server.",
      image: "/images/your_brand_crm.webp",
      imageAlt: "Your CRM dashboard",
    },
    ownership: OWNERSHIP,
    included: [
      {
        icon: Users,
        title: "Lead and customer records",
        text: "Every enquiry and customer in one place with notes, history and ownership.",
      },
      {
        icon: Workflow,
        title: "Custom pipelines",
        text: "Stages that match your sales process, with simple drag-and-drop movement.",
      },
      {
        icon: Bell,
        title: "Follow-up reminders",
        text: "Never miss a call back. Tasks and reminders go to the right person on time.",
      },
      {
        icon: MessageCircle,
        title: "WhatsApp and email",
        text: "Message customers from the CRM and keep the full conversation on record.",
      },
      {
        icon: BarChart3,
        title: "Reports and dashboards",
        text: "See team performance, conversions and revenue without exporting to Excel.",
      },
      {
        icon: Server,
        title: "Your server, your data",
        text: "Hosted under your name with role-based access and full code handover.",
      },
    ],
    stepsTitle: "From idea to working CRM in 3 steps.",
    steps: [
      {
        title: "Map your process",
        text: "We learn how your team handles leads and customers today.",
      },
      {
        title: "We build your CRM",
        text: "Pipelines, fields, roles and integrations are configured to match.",
      },
      {
        title: "Train and launch",
        text: "Your team gets live training and starts using the CRM.",
      },
    ],
    tiers: [
      {
        id: "essential",
        title: "Essential",
        forWho: "For small teams",
        best: "Up to 5 users, simple pipeline",
        highlights: [
          "Lead and customer records",
          "One sales pipeline",
          "Tasks and reminders",
          "Basic reports",
          "Hosted on your own server",
        ],
      },
      {
        id: "team",
        title: "Team",
        forWho: "For growing sales teams",
        best: "Multiple users and pipelines",
        badge: "Most popular",
        highlights: [
          "Everything in Essential",
          "Multiple pipelines",
          "WhatsApp and email connected",
          "Role-based access",
          "Advanced dashboards",
        ],
      },
      {
        id: "enterprise",
        title: "Enterprise",
        forWho: "For large or custom needs",
        best: "Custom modules, integrations",
        highlights: [
          "Everything in Team",
          "Custom modules and workflows",
          "API and third-party integrations",
          "Data migration",
          "Dedicated account manager",
        ],
      },
    ],
    tiersNote:
      "SMS and WhatsApp API charges are not included. They are billed directly by the provider.",
    video: VIDEO,
  },
};

export const SOLUTION_KEYS = Object.keys(SOLUTIONS) as SolutionKey[];
