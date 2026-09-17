import type { Metadata } from "next";
import AboutClient from "./AboutClient";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "About VisitingLink — Our Story, Team & Vision",
  description:
    "Learn about VisitingLink — a technology and digital services company with 8+ years of experience, 900+ clients, and a team of designers and developers building web, software, and design solutions.",
  alternates: {
    canonical: "https://visitinglink.com/about",
  },
  openGraph: {
    title: "About VisitingLink — Our Story, Team & Vision",
    description:
      "A technology and digital services company with 8+ years of experience, 900+ clients, and a team building web, software, and design solutions.",
    url: "https://visitinglink.com/about",
  },
  twitter: {
    title: "About VisitingLink — Our Story, Team & Vision",
    description:
      "A technology and digital services company with 8+ years of experience, 900+ clients, and a team building web, software, and design solutions.",
  },
};

export default function About() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", href: "/" },
              { name: "About", href: "/about" },
            ])
          ),
        }}
      />
      <AboutClient />
    </>
  );
}
