import type { Metadata } from "next";
import { Montserrat_Alternates, Poppins } from "next/font/google";
import { AppShell } from "@/components/AppShell";
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.className} ${montserratAlt.variable} antialiased`}
        suppressHydrationWarning
      >
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
