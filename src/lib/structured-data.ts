/**
 * Structured data (JSON-LD) generators for VisitingLink SEO.
 *
 * Uses only real company information — no fabricated reviews,
 * ratings, awards, or social profiles.
 */

const SITE_URL = "https://visitinglink.com";
const COMPANY_NAME = "VisitingLink";
const COMPANY_EMAIL = "info.visitinglink@gmail.com";
const COMPANY_PHONE = "+919236553585";
const COMPANY_LOGO = `${SITE_URL}/logo.png`;

/* ------------------------------------------------------------------ */
/*  Organization + LocalBusiness                                       */
/* ------------------------------------------------------------------ */

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: COMPANY_NAME,
    url: SITE_URL,
    logo: COMPANY_LOGO,
    email: COMPANY_EMAIL,
    telephone: COMPANY_PHONE,
    description:
      "VisitingLink is a technology and digital solutions company specialising in custom web development, UI/UX and graphic design, CRM and business software, web applications, and AI-powered automation for growing businesses.",
    sameAs: [],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Jhansi",
      addressRegion: "Uttar Pradesh",
      addressCountry: "IN",
    },
    founder: {
      "@type": "Person",
      name: "Jitesh Singh",
      jobTitle: "CEO & Founder",
    },
    foundingDate: "2018",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: COMPANY_PHONE,
      email: COMPANY_EMAIL,
      contactType: "customer service",
      availableLanguage: ["English", "Hindi"],
    },
  };
}

/* ------------------------------------------------------------------ */
/*  WebSite                                                            */
/* ------------------------------------------------------------------ */

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: COMPANY_NAME,
    url: SITE_URL,
    description:
      "VisitingLink — technology and digital solutions company offering custom web development, UI/UX design, graphic design, CRM software, web applications, and AI-powered automation.",
  };
}

/* ------------------------------------------------------------------ */
/*  BreadcrumbList                                                     */
/* ------------------------------------------------------------------ */

export function breadcrumbJsonLd(
  items: { name: string; href: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.href}`,
    })),
  };
}

/* ------------------------------------------------------------------ */
/*  Service (for /services page)                                       */
/* ------------------------------------------------------------------ */

export function servicesJsonLd() {
  const categories = [
    {
      name: "Brand & Digital Design",
      description:
        "Research-driven design for interfaces, visual identity, and corporate collateral — crafted around how people actually experience your business.",
      services: [
        {
          name: "UI/UX Design",
          description:
            "Research-driven interface design that improves usability, reduces bounce rates, and guides users toward conversion.",
        },
        {
          name: "Graphic Design",
          description:
            "Brand-aligned visual design — from logos and social media graphics to print-ready marketing materials.",
        },
        {
          name: "Company Profiles",
          description:
            "Professional company profile documents that communicate leadership, capabilities, and brand credibility.",
        },
        {
          name: "Website & UI Design",
          description:
            "Responsive website design focused on visual clarity, fast load times, and measurable lead generation.",
        },
      ],
    },
    {
      name: "Software & CRM Development",
      description:
        "Custom business software — CRM platforms, sales tools, billing systems, and workflow engines — engineered to streamline operations.",
      services: [
        {
          name: "CRM Development",
          description:
            "Custom CRM software that centralises contacts, tracks sales pipelines, and generates actionable reports.",
        },
        {
          name: "Sales Software",
          description:
            "Sales management tools built to accelerate quoting, order processing, and team performance tracking.",
        },
        {
          name: "Invoice & Billing Software",
          description:
            "Billing software that automates invoicing, manages recurring payments, and handles multi-currency tax compliance.",
        },
        {
          name: "Custom Software Development",
          description:
            "Bespoke business software — internal tools, workflow engines, and integrations designed around your operations.",
        },
      ],
    },
    {
      name: "Web Development & Applications",
      description:
        "High-performance web applications, interactive dashboards, and clickable prototypes — built to turn ideas into deployable products.",
      services: [
        {
          name: "Custom Web Development",
          description:
            "High-performance business websites built with Next.js and TypeScript, optimised for Core Web Vitals and SEO.",
        },
        {
          name: "Web Applications",
          description:
            "Full-stack web applications with secure user authentication, real-time data, and scalable cloud architecture.",
        },
        {
          name: "Business Dashboards",
          description:
            "Interactive analytics dashboards that turn raw data into clear, role-based business intelligence.",
        },
        {
          name: "Cloud Deployment & Prototyping",
          description:
            "Clickable prototypes for stakeholder validation, plus production-grade cloud deployment and monitoring.",
        },
      ],
    },
    {
      name: "AI & Automation Solutions",
      description:
        "AI-powered features and workflow automation that eliminate manual work and connect the tools your business already relies on.",
      services: [
        {
          name: "AI Integration",
          description:
            "Embed AI-powered features — language models, recommendation engines, and smart data pipelines — into your existing product.",
        },
        {
          name: "Chatbots",
          description:
            "Conversational AI chatbots for customer support, lead qualification, and multi-channel engagement.",
        },
        {
          name: "Automation",
          description:
            "Workflow automation that eliminates repetitive tasks through triggers, scheduling, and cross-platform syncing.",
        },
        {
          name: "API Integrations",
          description:
            "Connect your tech stack — payment gateways, CRMs, ERPs, and SaaS tools — through secure API integrations.",
        },
      ],
    },
  ];

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: COMPANY_NAME,
    url: SITE_URL,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "VisitingLink Services",
      itemListElement: categories.map((category) => ({
        "@type": "OfferCatalog",
        name: category.name,
        description: category.description,
        itemListElement: category.services.map((service) => ({
          "@type": "Service",
          name: service.name,
          description: service.description,
          provider: {
            "@type": "Organization",
            name: COMPANY_NAME,
          },
        })),
      })),
    },
  };
}
