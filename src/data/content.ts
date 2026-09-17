import { ServiceItem, TimelineQuality, Testimonial } from '../types';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'brand-digital-design',
    number: '01',
    title: 'Brand & Digital Design',
    tagline: 'Identity, Interfaces & Visual Systems',
    description:
      'Research-driven design for interfaces, visual identity, and corporate collateral — crafted around how people actually experience your business.',
    detailedScope: [
      'UI/UX Design — user research and personas, wireframes and interactive prototypes, and scalable design systems',
      'Graphic Design — logo and brand identity design, social media creative packages, and print-ready marketing collateral',
      'Company Profiles — professional documents covering company overview, leadership and team profiles, and service capabilities'
    ],
    deliverables: [
      'UI/UX Design',
      'Graphic Design',
      'Company Profiles',
      'Website Design'
    ],
    focusAreas: ['User Research', 'Design Systems', 'Brand Identity', 'Capability Presentation']
  },
  {
    id: 'software-development',
    number: '02',
    title: 'Software Development',
    tagline: 'Business Systems Built to Run Your Operations',
    description:
      'Custom business software — CRM platforms, sales tools, billing systems, and workflow engines — engineered to streamline the way your business operates.',
    detailedScope: [
      'CRM Development — contact and pipeline management, quotation building, and role-based access control for centralised customer relationships',
      'Sales Software — automated quotes and proposals, order lifecycle management, and team performance dashboards',
      'Invoice & Billing Software — recurring and scheduled invoices, multi-currency tax automation, and payment tracking with audit trails',
      'Custom Software — internal operations tools, process and workflow automation, and custom database architecture'
    ],
    deliverables: [
      'CRM Development',
      'Sales Software',
      'Invoice & Billing Software',
      'Custom Software Development'
    ],
    focusAreas: ['Pipeline Tracking', 'Automated Billing', 'Workflow Automation', 'Legacy Integration']
  },
  {
    id: 'web-apps-prototypes',
    number: '03',
    title: 'Web Apps & Prototypes',
    tagline: 'Applications, Dashboards & Product Prototypes',
    description:
      'High-performance web applications, interactive dashboards, and clickable prototypes — built to turn ideas into testable, deployable products.',
    detailedScope: [
      'Web Applications — secure user authentication, real-time data synchronisation, and scalable RESTful and GraphQL API architecture',
      'Business Dashboards — live KPI and metrics tracking, custom data visualisation charts, and role-based dashboard views',
      'Interactive Prototypes — clickable user flows, stakeholder demos, and usability testing to validate ideas before full development',
      'Cloud Deployment — production-grade infrastructure setup, server configuration, and uptime and performance monitoring'
    ],
    deliverables: [
      'Custom Web Development',
      'Web Applications',
      'Business Dashboards',
      'Cloud Deployment & Prototyping'
    ],
    focusAreas: ['Scalable Architecture', 'Real-Time Data', 'Usability Testing', 'Reliable Deployment']
  },
  {
    id: 'ai-automation',
    number: '04',
    title: 'AI & Automation Solutions',
    tagline: 'Intelligent Features & Automated Workflows',
    description:
      'AI-powered features and workflow automation — from language model integration and chatbots to API connections — that eliminate manual work across your business.',
    detailedScope: [
      'AI Integration — LLM and language model integration, recommendation engine development, and automated data pipelines added into your existing product',
      'Chatbots — customer support automation, lead qualification chatbots, and multi-channel deployment across web and WhatsApp',
      'Automation — event-driven workflow triggers, recurring task scheduling, and cross-platform data syncing to remove manual repetitive processes',
      'API Integrations — third-party API development, webhook configuration, and bi-directional data synchronisation connecting your tech stack'
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
