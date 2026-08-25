export interface WorkProject {
  id: string;
  name: string;
  category: string;
  description: string;
  outcome: string;
  year: string;
  discipline: 'web' | 'identity' | 'graphics';
  accent: string;
}

export const WORK_PROJECTS: WorkProject[] = [
  {
    id: 'vance',
    name: 'Vance & Associates',
    category: 'Architecture practice platform',
    description:
      'A complete digital rebuild for a mid-size architecture firm — portfolio galleries, project inquiry flows, and a content system their team manages without developers.',
    outcome: 'LCP reduced from 4.2s to 0.48s',
    year: '2025',
    discipline: 'web',
    accent: '#111111',
  },
  {
    id: 'northline',
    name: 'Northline Freight',
    category: 'Logistics operations dashboard',
    description:
      'Custom booking and quote management platform replacing a patchwork of spreadsheets and legacy tools used across three regional offices.',
    outcome: '3.1× faster quote turnaround',
    year: '2025',
    discipline: 'web',
    accent: '#333333',
  },
  {
    id: 'marrow',
    name: 'Marrow Studio',
    category: 'Headless commerce storefront',
    description:
      'Performance-first e-commerce experience with modular product storytelling, integrated inventory sync, and a mobile checkout rebuilt from scratch.',
    outcome: '61% mobile conversion lift',
    year: '2024',
    discipline: 'web',
    accent: '#555555',
  },
  {
    id: 'sterling',
    name: 'Sterling Capital Group',
    category: 'VisitingLink identity gateway',
    description:
      'Executive presence hub consolidating investor relations, team profiles, and deal-room access behind a single branded entry point.',
    outcome: 'Unified 12 channels into one gateway',
    year: '2025',
    discipline: 'identity',
    accent: '#111111',
  },
  {
    id: 'kroma',
    name: 'Kroma Technology Labs',
    category: 'Product launch visual system',
    description:
      'Full brand identity for a hardware startup — logo architecture, product photography direction, launch deck, and a 40-page guidelines document.',
    outcome: 'Cohesive launch across 6 touchpoints',
    year: '2024',
    discipline: 'graphics',
    accent: '#0BA95B',
  },
  {
    id: 'atelier',
    name: 'Atelier Monochrome',
    category: 'Design system & web presence',
    description:
      'Editorial website and component library for a luxury interiors studio, built around restrained typography and a custom CMS workflow.',
    outcome: 'Team publishes updates in under 5 minutes',
    year: '2024',
    discipline: 'graphics',
    accent: '#666666',
  },
];

export const ABOUT_HERO_IMAGE =
  'https://i.pinimg.com/736x/cb/37/b7/cb37b7d7664f1cefbb2340c4c406137a.jpg';

export const ABOUT_HERO_STATS = [
  { value: '900+', label: 'clients' },
  { value: '100+', label: 'designers' },
  { value: '120+', label: 'brands' },
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
    id: 'legacy',
    eyebrow: 'A Legacy of Creating',
    headline: '900+ Clients',
    paragraphs: [
      'Our previous businesses gave us the opportunity to work with 900+ clients across different industries and markets.',
      'Every project taught us something.',
      'Every client made us better.',
      'And every challenge became part of what we are building today.',
    ],
  },
  {
    id: 'designers',
    eyebrow: '100+ Designers. One Creative Mindset.',
    headline: '100+ Designers',
    paragraphs: [
      'Over the years, we have worked with and managed a network of 100+ designers.',
      'Different people. Different skills. Different perspectives.',
    ],
    pullQuote: 'Great work happens when talent moves in the same direction.',
  },
  {
    id: 'developers',
    eyebrow: "Now, We're Building the Next Chapter.",
    headline: '100+ Developers',
    paragraphs: [
      "The next milestone isn't just another number. It is a team.",
      'A technology ecosystem built around people who can design, develop, solve and execute.',
      'Our ambition is to bring together 100+ developers under one vision and create the capacity to build products at a completely different scale.',
    ],
    dark: true,
  },
  {
    id: 'brands',
    eyebrow: '120+ Brands. One Digital Perspective.',
    headline: '120+ Brands',
    paragraphs: [
      'We have worked with 120+ brands across digital marketing.',
      'That experience taught us something simple:',
    ],
    highlights: [
      'Technology gets attention.',
      'Design creates connection.',
      'Execution creates growth.',
    ],
  },
  {
    id: 'record',
    eyebrow: 'The Next Record',
    headline: "We've done it once. Now we're building it again.",
    paragraphs: [
      '900+ clients was our previous benchmark.',
      "We don't want to simply repeat the number. We want to create a new one.",
      'A bigger team. Bigger ideas. Bigger execution.',
      'And a new record that becomes part of our story.',
    ],
  },
];

export const ABOUT_VISION = {
  title: 'Our Vision',
  headline: 'Build something that outlives the project.',
  paragraphs: [
    'We are building more than an agency.',
    'We are building a creative and technology ecosystem where designers, developers and digital experts work together to turn ambitious ideas into reality.',
    'Our long-term vision is simple:',
  ],
  pillars: [
    '100+ Developers.',
    '100+ Creators.',
    'Thousands of Ideas.',
    'One Direction.',
  ],
};

export const ABOUT_MISSION = {
  title: 'Our Mission',
  headline: 'Make ambitious ideas possible.',
  paragraphs: [
    "We believe great ideas shouldn't fail because people don't know how to build them.",
    'Our mission is to create the people, technology and systems required to take an idea from zero to something real.',
    'We want to make world-class design and technology accessible to businesses of every size.',
    'And keep building until the numbers become history.',
  ],
};

export const ABOUT_CLOSING = {
  title: 'This Is Only the Beginning.',
  stats: [
    '900+ clients behind us.',
    "100+ designers we've worked with.",
    "120+ brands we've helped digitally.",
    "100+ developers we're building toward.",
  ],
  tagline: 'The next chapter starts here.',
  footer: ['Built with experience.', 'Driven by vision.', 'Designed for the future.'],
};
