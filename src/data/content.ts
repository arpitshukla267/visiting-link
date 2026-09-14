import { ServiceItem, TimelineQuality, Testimonial } from '../types';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'brand-digital-design',
    number: '01',
    title: 'Brand & Digital Design',
    tagline: 'Identity, Interfaces & Visual Systems',
    description:
      'Interfaces, visual identity and company collateral designed around how people actually experience your business.',
    detailedScope: [
      'UI/UX Design — user research, wireframes & prototypes, and reusable design systems',
      'Graphic Design — visual systems including brand identity, social media, and marketing creatives',
      'Company Profiles — polished overviews covering company background, leadership & team, and capabilities'
    ],
    deliverables: [
      'UI/UX Design',
      'Graphic Design',
      'Company Profiles'
    ],
    focusAreas: ['User Research', 'Design Systems', 'Brand Identity', 'Capability Presentation']
  },
  {
    id: 'software-development',
    number: '02',
    title: 'Software Development',
    tagline: 'Business Systems Built to Run Your Operations',
    description:
      'Custom software that tracks leads, closes sales, handles billing, and automates the way your business actually runs.',
    detailedScope: [
      'CRM — contact management, pipeline tracking, and reporting to keep every relationship in one place',
      'Sales Software — quotes & proposals, order management, and team dashboards to help your team close faster',
      'Invoice & Billing Software — recurring invoices, payment tracking, and tax handling to get you paid on time',
      'Custom Software — internal tools, workflow automation, and legacy integration built around your business'
    ],
    deliverables: [
      'CRM',
      'Sales Software',
      'Invoice & Billing Software',
      'Custom Software'
    ],
    focusAreas: ['Pipeline Tracking', 'Automated Billing', 'Workflow Automation', 'Legacy Integration']
  },
  {
    id: 'web-apps-prototypes',
    number: '03',
    title: 'Web Apps & Prototypes',
    tagline: 'Applications, Dashboards & Product Prototypes',
    description:
      'Powerful browser-based applications and clickable prototypes that turn ideas into testable, deployable products.',
    detailedScope: [
      'Web Applications — user accounts & permissions, real-time data, and scalable architecture built around your needs',
      'Business Dashboards — live metrics, custom charts, and role-based views that turn data into useful insights',
      'Interactive Prototypes — interactive flows, client demos, and usability testing to validate ideas before development',
      'Cloud Deployment — production deployment, server configuration, and performance setup for reliable online access'
    ],
    deliverables: [
      'Web Applications',
      'Business Dashboards',
      'Interactive Prototypes',
      'Cloud Deployment'
    ],
    focusAreas: ['Scalable Architecture', 'Real-Time Data', 'Usability Testing', 'Reliable Deployment']
  },
  {
    id: 'ai-automation',
    number: '04',
    title: 'AI & Automation Solutions',
    tagline: 'Intelligent Features & Automated Workflows',
    description:
      'AI-driven features and automation that remove manual work and connect the tools your business already relies on.',
    detailedScope: [
      'AI Integration — LLM integration, recommendation engines, and data pipelines added into your existing product',
      'Chatbots — support bots, lead qualification, and multi-channel deploy to handle conversations automatically',
      'Automation — workflow triggers, task scheduling, and cross-tool syncing to remove manual work from repetitive processes',
      'API Integrations — third-party APIs, webhooks, and data sync connecting the tools you already use'
    ],
    deliverables: [
      'AI Integration',
      'Chatbots',
      'Automation',
      'API Integrations'
    ],
    focusAreas: ['LLM Integration', 'Automated Support', 'Workflow Triggers', 'Third-Party Sync']
  }
];

export const TIMELINE_QUALITIES: TimelineQuality[] = [
  {
    id: 'quality-1',
    number: '01',
    title: 'Clear Thinking',
    description: 'We understand the requirement, audience and objective before starting the work.',
    details: 'Every engagement begins with listening and dissecting core business goals. We eliminate ambiguity early, ensuring every technical and visual choice serves a measurable purpose.'
  },
  {
    id: 'quality-2',
    number: '02',
    title: 'Thoughtful Design',
    description: 'Every visual decision is made around clarity, usability and consistency.',
    details: 'We reject decorative noise in favor of functional elegance. Hierarchy, spatial balance, and restrained typography guide users naturally through every screen.'
  },
  {
    id: 'quality-3',
    number: '03',
    title: 'Reliable Development',
    description: 'We build responsive, scalable and performance-focused digital experiences.',
    details: 'Underneath our minimal aesthetics is rock-solid engineering. Clean TypeScript architectures, optimized bundle sizes, and fast server responses ensure long-term stability.'
  },
  {
    id: 'quality-4',
    number: '04',
    title: 'Attention to Detail',
    description: 'Small details matter, from spacing and typography to interactions and final polish.',
    details: 'True craft lives in the margins: sub-millisecond interaction feedback, balanced letter-spacing, optical alignment, and seamless responsive behaviors across every screen.'
  },
  {
    id: 'quality-5',
    number: '05',
    title: 'Long-Term Value',
    description: 'The goal is not just to deliver a project, but to create something useful for the business.',
    details: 'We design and engineer assets that age gracefully. We build maintainable systems that empower your team to scale without technical debt or visual erosion.'
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 'test-1',
    quote: 'VisitingLink transformed how our clients encounter our firm online. The clarity of their web development and identity strategy gave our brand an unmatched level of credibility.',
    clientName: 'Marcus Vance',
    clientPosition: 'Managing Director',
    company: 'Vance & Associates Architecture',
    serviceCategory: 'Web Development & Identity'
  },
  {
    id: 'test-2',
    quote: 'The visual assets and graphics developed for our product launch were exceptionally clean, disciplined, and cohesive. They delivered exactly what we needed without unnecessary friction.',
    clientName: 'Elena Rostova',
    clientPosition: 'Head of Product',
    company: 'Kroma Technology Labs',
    serviceCategory: 'Graphics & Brand Assets'
  },
  {
    id: 'test-3',
    quote: 'Our VisitingLink presence system consolidated dozens of disconnected channels into a single, high-converting digital gateway. The attention to detail is evident on every level.',
    clientName: 'Julian Sterling',
    clientPosition: 'Chief Executive Officer',
    company: 'Sterling Capital Group',
    serviceCategory: 'VisitingLink Digital Solutions'
  },
  {
    id: 'test-4',
    quote: 'Working with them feels like having an elite in-house digital studio. They understand that real impact comes from restraint, precision, and reliable code.',
    clientName: 'Sophie Moreau',
    clientPosition: 'Brand Director',
    company: 'Atelier Monochrome',
    serviceCategory: 'Web Architecture & Design'
  }
];
