import { ServiceItem, TimelineQuality, Testimonial } from '../types';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'visitinglink',
    number: '01',
    title: 'VisitingLink',
    tagline: 'Digital Identity & Smart Presence Solutions',
    description:
      'Digital solutions designed to help businesses establish and strengthen their online presence.',
    detailedScope: [
      'Smart centralized identity hubs connecting all brand touchpoints',
      'Custom domain mapping with enterprise DNS and SSL provisioning',
      'Dynamic business profile architectures with rich interaction layers',
      'Actionable audience analytics, link telemetry, and conversion tracking',
      'Frictionless customer contact funnels and integrated lead routing'
    ],
    deliverables: [
      'Configured Identity Platform',
      'Custom Domain Architecture',
      'Engagement Analytics Dashboard',
      'Interactive Contact Channels'
    ],
    focusAreas: ['Brand Discoverability', 'Unified Presence', 'Digital Conversion', 'Streamlined Access']
  },
  {
    id: 'web-development',
    number: '02',
    title: 'Web Development',
    tagline: 'High-Performance Web Architecture & Engineering',
    description:
      'Modern, responsive and scalable websites and web applications built around real business requirements.',
    detailedScope: [
      'Bespoke web applications built with TypeScript, React, and modern full-stack architectures',
      'Ultra-responsive interfaces tuned for rapid load speeds and pristine Core Web Vitals',
      'Scalable database design, RESTful/GraphQL API engineering, and secure infrastructure',
      'Headless CMS integrations enabling autonomous content workflows for marketing teams',
      'Search engine architecture optimization and strict accessibility (WCAG AA) compliance'
    ],
    deliverables: [
      'Production Web Application / Site',
      'Modular Component System',
      'Optimized Content Management Setup',
      'Complete Deployment & CI/CD Pipeline'
    ],
    focusAreas: ['Speed & Performance', 'Responsive Architecture', 'Scalable Codebase', 'Accessibility']
  },
  {
    id: 'graphics',
    number: '03',
    title: 'Graphics',
    tagline: 'Refined Visual Systems & Digital Design',
    description:
      'Professional visual assets, creative design and digital graphics that maintain a consistent brand identity.',
    detailedScope: [
      'Comprehensive brand identity systems, typographic pairings, and strict design guidelines',
      'High-impact marketing assets, digital publication collateral, and social identity kits',
      'Precision user interface design, design system tokens, and interactive component libraries',
      'Custom vector iconography, editorial graphic styling, and visual asset production',
      'Presentation decks, brand pitch systems, and interactive digital style guides'
    ],
    deliverables: [
      'Brand Identity System & Guidelines',
      'Digital Asset & Marketing Kit',
      'Figma Component Library & UI Tokens',
      'Vector Graphics & Iconography Suite'
    ],
    focusAreas: ['Visual Consistency', 'Brand Distinction', 'Design Systems', 'Editorial Polish']
  },
  {
    id: 'ui-ux',
    number: '04',
    title: 'UI/UX',
    tagline: 'Product Interfaces & Experience Design',
    description:
      'Interfaces and experiences designed around how people actually use your product — from first research to polished, usable screens.',
    detailedScope: [
      'User research, journey mapping, and clarity on goals before design begins',
      'Wireframes and interactive prototypes to validate flows early',
      'Design systems, UI tokens, and reusable component libraries in Figma',
      'Interaction design for navigation, forms, feedback, and micro-interactions',
      'Usability testing and iteration based on real user behaviour'
    ],
    deliverables: [
      'Research Summary & User Flows',
      'Wireframes & Clickable Prototypes',
      'Figma UI Kit & Design System',
      'Handoff-Ready Screen Designs'
    ],
    focusAreas: ['Clarity', 'Usability', 'Consistency', 'Conversion']
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
