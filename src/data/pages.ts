export interface Work_Project {
  id: string;
  name: string;
  category: string;
  description: string;
  outcome: string;
  year: string;
  discipline: "web" | "identity" | "graphics";
  accent: string;
  image: string;
  url: string;
}

export const WORK_PROJECTS = [
  {
    id: "himvarsha",
    name: "Himvarsha Foods",
    category: "Spice brand & e-commerce platform",
    description:
      "A complete digital presence for a premium spice brand, combining product discovery, category-led navigation, brand storytelling, recipes, and content publishing into a polished customer experience.",
    outcome: "Built a unified digital storefront for the brand",
    year: "2026",
    discipline: "web",
    accent: "#8B2E2E",
    image: "/images/himvarsha.webp",
    url: "https://www.himvarshafoods.com/",
  },

  {
    id: "videha",
    name: "Videha Overseas",
    category: "Export & B2B business platform",
    description:
      "A conversion-focused export platform built to present agricultural products, private-label capabilities, quality standards, and global supply operations while making buyer enquiries and quotation requests effortless.",
    outcome: "Built a global-facing B2B export presence",
    year: "2026",
    discipline: "web",
    accent: "#1B4D3E",
    image: "/images/videha.webp",
    url: "https://www.videhaoverseas.com/",
  },

  {
    id: "sandora",
    name: "Sandora",
    category: "Construction materials platform",
    description:
      "A modern digital platform for an engineered sand and construction materials brand, bringing products, processing technology, bulk supply, sustainability, and enquiry flows together in one experience.",
    outcome:
      "Created a digital platform for product discovery and bulk enquiries",
    year: "2026",
    discipline: "web",
    accent: "#C47A2C",
    image: "/images/sandora.webp",
    url: "https://www.sandora.in/",
  },
];

export const ABOUT_HERO_IMAGE =
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80";

export const ABOUT_HERO_STATS = [
  { value: "900+", label: "clients" },
  { value: "100+", label: "designers" },
  { value: "120+", label: "brands" },
];

export interface AboutChapter {
  id: string;
  eyebrow: string;
  headline: string;
  paragraphs: string[];
  highlights?: string[];
  pullQuote?: string;
  dark?: boolean;
}

export const ABOUT_CHAPTERS: AboutChapter[] = [
  {
    id: "legacy",
    eyebrow: "A Legacy of Creating",
    headline: "900+ Clients",
    paragraphs: [
      "Our previous businesses gave us the opportunity to work with 900+ clients across different industries and markets.",
      "Every project taught us something.",
      "Every client made us better.",
      "And every challenge became part of what we are building today.",
    ],
  },
  {
    id: "designers",
    eyebrow: "100+ Designers. One Creative Mindset.",
    headline: "100+ Designers",
    paragraphs: [
      "Over the years, we have worked with and managed a network of 100+ designers.",
      "Different people. Different skills. Different perspectives.",
    ],
    pullQuote: "Great work happens when talent moves in the same direction.",
  },
  {
    id: "developers",
    eyebrow: "Now, We're Building the Next Chapter.",
    headline: "100+ Developers",
    paragraphs: [
      "The next milestone isn't just another number. It is a team.",
      "A technology ecosystem built around people who can design, develop, solve and execute.",
      "Our ambition is to bring together 100+ developers under one vision and create the capacity to build products at a completely different scale.",
    ],
    dark: true,
  },
  {
    id: "brands",
    eyebrow: "120+ Brands. One Digital Perspective.",
    headline: "120+ Brands",
    paragraphs: [
      "We have worked with 120+ brands across digital marketing.",
      "That experience taught us something simple:",
    ],
    highlights: [
      "Technology gets attention.",
      "Design creates connection.",
      "Execution creates growth.",
    ],
  },
  {
    id: "record",
    eyebrow: "The Next Record",
    headline: "We've done it once. Now we're building it again.",
    paragraphs: [
      "900+ clients was our previous benchmark.",
      "We don't want to simply repeat the number. We want to create a new one.",
      "A bigger team. Bigger ideas. Bigger execution.",
      "And a new record that becomes part of our story.",
    ],
  },
];

export const ABOUT_VISION = {
  title: "Our Vision",
  headline: "Build something that outlives the project.",
  paragraphs: [
    "We are building more than an agency.",
    "We are building a creative and technology ecosystem where designers, developers and digital experts work together to turn ambitious ideas into reality.",
    "Our long-term vision is simple:",
  ],
  pillars: [
    "100+ Developers.",
    "100+ Creators.",
    "Thousands of Ideas.",
    "One Direction.",
  ],
};

export const ABOUT_MISSION = {
  title: "Our Mission",
  headline: "Make ambitious ideas possible.",
  paragraphs: [
    "We believe great ideas shouldn't fail because people don't know how to build them.",
    "Our mission is to create the people, technology and systems required to take an idea from zero to something real.",
    "We want to make world-class design and technology accessible to businesses of every size.",
    "And keep building until the numbers become history.",
  ],
};

export const ABOUT_CLOSING = {
  title: "This Is Only the Beginning.",
  stats: [
    "900+ clients behind us.",
    "100+ designers we've worked with.",
    "120+ brands we've helped digitally.",
    "100+ developers we're building toward.",
  ],
  tagline: "The next chapter starts here.",
  footer: [
    "Built with experience.",
    "Driven by vision.",
    "Designed for the future.",
  ],
};
