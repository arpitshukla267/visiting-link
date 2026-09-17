import type { Metadata } from "next";
import { Montserrat_Alternates, Poppins } from "next/font/google";
import { AppShell } from "@/components/AppShell";
import {
  organizationJsonLd,
  websiteJsonLd,
} from "@/lib/structured-data";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const montserratAlt = Montserrat_Alternates({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  variable: "--font-montserrat-alt",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://visitinglink.com"),
  title: {
    default:
      "VisitingLink — Technology & Digital Solutions | Web Development, Design & Custom Software",
    template: "%s | VisitingLink",
  },
  description:
    "VisitingLink is a technology and digital solutions company specialising in custom web development, UI/UX and graphic design, CRM and business software, web applications, and AI-powered automation for growing businesses.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon-144x144.png", sizes: "144x144", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon.png", sizes: "any", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "VisitingLink",
    url: "https://visitinglink.com",
    title:
      "VisitingLink — Technology & Digital Solutions | Web Development, Design & Custom Software",
    description:
      "VisitingLink is a technology and digital solutions company specialising in custom web development, UI/UX and graphic design, CRM and business software, web applications, and AI-powered automation for growing businesses.",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "VisitingLink Logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title:
      "VisitingLink — Technology & Digital Solutions | Web Development, Design & Custom Software",
    description:
      "Technology and digital solutions company specialising in custom web development, UI/UX and graphic design, CRM and business software, web applications, and AI-powered automation.",
    images: ["/logo.png"],
  },
  alternates: {
    canonical: "https://visitinglink.com",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd()),
          }}
        />
      </head>
      <body
        className={`${poppins.className} ${montserratAlt.variable} antialiased`}
        suppressHydrationWarning
      >
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}