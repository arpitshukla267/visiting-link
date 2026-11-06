export type ImageFit = "contain" | "cover";

export interface WorkProject {
  id: string;
  name: string;
  category: string;
  description: string;
  summary: string;
  outcome: string;
  year: string;
  discipline: "web" | "graphics" | "identity" | "uiux";
  accent: string;
  image: string;
  /** Card image background color (any CSS color). Default: #FFFFFF */
  imageBg?: string;
  /** "contain" = full image visible, "cover" = fills the card. Default: contain */
  imageFit?: ImageFit;
  url: string;
}

export const WORK_PROJECTS: WorkProject[] = [
  {
    id: "videha-overseas-crm",
    name: "Videha Overseas CRM",
    category: "Enterprise CRM & Business Operations",
    description:
      "A full-stack enterprise CRM and business operations platform managing leads, quotation building, multi-currency billing, inventory, and role-based access.",
    summary:
      "Enterprise CRM for leads, quotations, multi-currency billing and role-based access.",
    outcome: "Built centralized CRM and business operations system",
    year: "2026",
    discipline: "web",
    accent: "#0284C7",
    image: "/images/videha-crm.png",
    imageBg: "#FFFFFF",
    imageFit: "cover",
    url: "",
  },

  {
    id: "loomstone",
    name: "Loomstone",
    category: "Rugs, carpets & flooring export platform",
    description:
      "An elegant international platform for a global supplier of rugs, carpets, and flooring solutions, presenting collections, craftsmanship, and custom offerings with a refined, visually rich experience built for global buyers.",
    summary:
      "International platform for a rugs, carpets and flooring supplier, built for global buyers.",
    outcome: "Created a global-facing showcase for rugs and flooring solutions",
    year: "2026",
    discipline: "web",
    accent: "#8A6A4F",
    image: "/loomstone.png",
    imageBg: "#FFFCF4",
    imageFit: "contain",
    url: "",
  },

  {
    id: "himvarsha",
    name: "Himvarsha Foods",
    category: "Spice brand & e-commerce platform",
    description:
      "A complete digital presence for a premium spice brand, combining product discovery, category-led navigation, brand storytelling, recipes, and content publishing into a polished customer experience.",
    summary:
      "Premium spice brand storefront with product discovery, recipes and brand storytelling.",
    outcome: "Built a unified digital storefront for the brand",
    year: "2026",
    discipline: "web",
    accent: "#8B2E2E",
    image: "/images/himvarsha.webp",
    imageBg: "#FFFFFF",
    imageFit: "cover",
    url: "https://www.himvarshafoods.com/",
  },

  {
    id: "sandora",
    name: "Sandora",
    category: "Construction materials platform",
    description:
      "A modern digital platform for an engineered sand and construction materials brand, bringing products, processing technology, bulk supply, sustainability, and enquiry flows together in one experience.",
    summary:
      "Digital platform for engineered sand and construction materials with bulk enquiry flows.",
    outcome:
      "Created a digital platform for product discovery and bulk enquiries",
    year: "2026",
    discipline: "web",
    accent: "#C47A2C",
    image: "/images/sandora.webp",
    imageBg: "#FFFFFF",
    imageFit: "cover",
    url: "https://www.sandora.in/",
  },

  {
    id: "conbell",
    name: "Conbell",
    category: "Automotive components & B2B manufacturing platform",
    description:
      "A professional B2B platform for an automotive parts manufacturer supplying large OEMs and automobile companies, showcasing component capabilities, manufacturing strengths, quality standards, and streamlined enquiry flows for industrial buyers.",
    summary:
      "B2B platform for an automotive parts manufacturer supplying large OEMs and auto companies.",
    outcome:
      "Built a credible digital presence for automotive supply partnerships",
    year: "2026",
    discipline: "web",
    accent: "#1F3A5F",
    image: "/conbell.png",
    imageBg: "#0B1C30",
    imageFit: "contain",
    url: "",
  },

  {
    id: "videha",
    name: "Videha Overseas",
    category: "Export & B2B business platform",
    description:
      "A conversion-focused export platform built to present agricultural products, private-label capabilities, quality standards, and global supply operations while making buyer enquiries and quotation requests effortless.",
    summary:
      "Export platform showcasing agri products, private-label capabilities and quick buyer enquiries.",
    outcome: "Built a global-facing B2B export presence",
    year: "2026",
    discipline: "web",
    accent: "#1B4D3E",
    image: "/images/videha.webp",
    imageBg: "#FFFFFF",
    imageFit: "cover",
    url: "https://www.videhaoverseas.com/",
  },
];
