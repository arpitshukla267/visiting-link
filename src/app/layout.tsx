import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { AppShell } from "@/components/AppShell";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "VisitingLink — Digital Services Studio",
  description:
    "Web development, graphics, and digital identity — engineered with clarity and precision.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="lenis lenis-smooth">
      <body className={`${poppins.className} antialiased`}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
