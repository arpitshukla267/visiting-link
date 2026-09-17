import type { Metadata } from "next";
import ServicesClient from "./ServicesClient";
import { breadcrumbJsonLd, servicesJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title:
    "Services — Web Development, Custom Software, UI/UX Design & AI Solutions",
  description:
    "Explore VisitingLink's full service range: custom web development, CRM and business software, UI/UX and graphic design, web applications, business dashboards, and AI-powered automation.",
  alternates: {
    canonical: "https://visitinglink.com/services",
  },
  openGraph: {
    title:
      "Services — Web Development, Custom Software, UI/UX Design & AI Solutions | VisitingLink",
    description:
      "Custom web development, CRM and business software, UI/UX and graphic design, web applications, business dashboards, and AI-powered automation.",
    url: "https://visitinglink.com/services",
  },
  twitter: {
    title:
      "Services — Web Development, Custom Software, UI/UX Design & AI Solutions | VisitingLink",
    description:
      "Custom web development, CRM and business software, UI/UX and graphic design, web applications, business dashboards, and AI-powered automation.",
  },
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", href: "/" },
              { name: "Services", href: "/services" },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(servicesJsonLd()),
        }}
      />
      <ServicesClient />
    </>
  );
}
