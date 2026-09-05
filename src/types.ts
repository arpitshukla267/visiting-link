export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  detailedScope: string[];
  deliverables: string[];
  focusAreas: string[];
}

export interface TimelineQuality {
  id: string;
  number: string;
  title: string;
  description: string;
  details: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  clientName: string;
  clientPosition: string;
  company: string;
  serviceCategory: string;
}

export interface ProjectInquiry {
  name: string;
  email: string;
  company?: string;
  service: string;
  budgetRange?: string;
  timeframe: string;
  details: string;
}
