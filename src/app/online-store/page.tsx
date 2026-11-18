import type { Metadata } from "next";
import OnlineStoreClient from "./OnlineStoreClient";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Get Your Online Store — 100% Owned, On Your Server | VisitingLink",
  description:
    "Launch an affordable, high-converting online store hosted on your own server. Full control without developers, zero platform cuts, Store Magic Links for IG/FB/X ads, and seamless payment gateways.",
  alternates: {
    canonical: "https://visitinglink.com/online-store",
  },
  openGraph: {
    title: "Get Your Online Store — 100% Owned, On Your Server | VisitingLink",
    description:
      "Affordable, self-hosted e-commerce stores with full control, zero developer dependency, Store Magic Links for social ads, and top payment gateways.",
    url: "https://visitinglink.com/online-store",
  },
  twitter: {
    title: "Get Your Online Store — 100% Owned, On Your Server | VisitingLink",
    description:
      "Affordable, self-hosted e-commerce stores with full control, zero developer dependency, Store Magic Links for social ads, and top payment gateways.",
  },
};

export default function OnlineStoreRoute() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", href: "/" },
              { name: "Online Store", href: "/online-store" },
            ])
          ),
        }}
      />
      <OnlineStoreClient />
    </>
  );
}
