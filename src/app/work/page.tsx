import type { Metadata } from "next";
import WorkClient from "./WorkClient";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Our Work — Web Development & Software Projects",
  description:
    "Explore real-world projects engineered by VisitingLink, including e-commerce platforms, B2B export portals, construction platforms, and enterprise CRM solutions.",
  alternates: {
    canonical: "https://visitinglink.com/work",
  },
  openGraph: {
    title: "Our Work — Web Development & Software Projects | VisitingLink",
    description:
      "Explore real-world projects engineered by VisitingLink, including e-commerce platforms, B2B export portals, and enterprise CRM solutions.",
    url: "https://visitinglink.com/work",
  },
  twitter: {
    title: "Our Work — Web Development & Software Projects | VisitingLink",
    description:
      "Explore real-world projects engineered by VisitingLink, including e-commerce platforms, B2B export portals, and enterprise CRM solutions.",
  },
};

export default function Work() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", href: "/" },
              { name: "Work", href: "/work" },
            ])
          ),
        }}
      />
      <WorkClient />
    </>
  );
}
