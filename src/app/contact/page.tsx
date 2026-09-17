import type { Metadata } from "next";
import { Suspense } from "react";
import ContactClient from "./ContactClient";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Contact VisitingLink — Start Your Web, Software or Design Project",
  description:
    "Get in touch with VisitingLink to start your website development, custom web application, software/CRM project, UI/UX design, or graphic design project. We review every inquiry and respond within 24 hours.",
  alternates: {
    canonical: "https://visitinglink.com/contact",
  },
  openGraph: {
    title: "Contact VisitingLink — Start Your Web, Software or Design Project",
    description:
      "Start your website, custom web application, CRM, UI/UX design, or graphic design project with VisitingLink. Prompt 24-hour response.",
    url: "https://visitinglink.com/contact",
  },
  twitter: {
    title: "Contact VisitingLink — Start Your Web, Software or Design Project",
    description:
      "Start your website, custom web application, CRM, UI/UX design, or graphic design project with VisitingLink.",
  },
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", href: "/" },
              { name: "Contact", href: "/contact" },
            ])
          ),
        }}
      />
      <Suspense fallback={null}>
        <ContactClient />
      </Suspense>
    </>
  );
}
