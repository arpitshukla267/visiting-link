import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title:
    "VisitingLink — Technology & Digital Solutions | Web Development, Design & Custom Software",
  description:
    "VisitingLink is a technology and digital solutions company specialising in custom web development, UI/UX and graphic design, CRM and business software, web applications, and AI-powered automation for growing businesses.",
  alternates: {
    canonical: "https://visitinglink.com",
  },
  openGraph: {
    title:
      "VisitingLink — Technology & Digital Solutions | Web Development, Design & Custom Software",
    description:
      "Technology and digital solutions company specialising in custom web development, UI/UX and graphic design, CRM and business software, web applications, and AI-powered automation.",
    url: "https://visitinglink.com",
  },
  twitter: {
    title:
      "VisitingLink — Technology & Digital Solutions | Web Development, Design & Custom Software",
    description:
      "Technology and digital solutions company specialising in custom web development, UI/UX and graphic design, CRM and business software, web applications, and AI-powered automation.",
  },
};

export default function HomePage() {
  return <HomeClient />;
}