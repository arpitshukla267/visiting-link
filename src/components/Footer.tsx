"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Mail } from "lucide-react";

interface FooterProps {
  onNavigateContact: (serviceName?: string) => void;
  onNavigateService: (serviceId: string) => void;
  onNavigatePage: (page: string) => void;
}

const CONTACT_EMAIL = "info.visitinglink@gmail.com";
const CONTACT_PHONE_DISPLAY = "+91 92365 53585";
const CONTACT_PHONE_E164 = "919236553585";
const WHATSAPP_URL = `https://wa.me/${CONTACT_PHONE_E164}`;

const PAGE_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  // { label: "Founders", href: "/about#founders" },
  { label: "Contact", href: "/contact" },
];

const SERVICE_LINKS = [
  { label: "Brand & Digital Design", href: "/services" },
  { label: "Software Development", href: "/services" },
  { label: "Web Apps & Prototypes", href: "/services" },
  { label: "AI & Automation Solutions", href: "/services" },
];

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export const Footer: React.FC<FooterProps> = () => {
  const footerRef = useRef<HTMLElement>(null);

  return (
    <footer
      ref={footerRef}
      id="main-footer"
      className="relative z-20 w-full overflow-hidden border-t border-[#242424] bg-[#111111] text-white"
    >
      {/* ============ MOBILE ============ */}
      <div className="px-6 pb-6 pt-10 md:hidden">
        {/* Logo + intro */}
        <Link
          href="/"
          className="mb-5 block cursor-pointer"
          aria-label="VisitingLink Home"
        >
          <Image
            src="/logo.png"
            alt="VisitingLink Logo"
            width={180}
            height={50}
            className="h-auto w-[140px] object-contain brightness-0 invert"
            priority
          />
        </Link>

        <p className="mb-6 max-w-sm text-sm leading-6 text-[#888888]">
          Creative technology company building digital experiences, web
          platforms, and software systems for ambitious businesses.
        </p>

        {/* CTA */}
        <Link
          href="/contact"
          className="mb-8 flex w-full cursor-pointer items-center justify-center gap-3 bg-white px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#111111] active:bg-[#e8e8e8]"
        >
          <span>Start a Project</span>
          <ArrowUpRight className="h-4 w-4" />
        </Link>

        {/* Contact */}
        <div className="flex flex-col gap-3.5 border-y border-[#242424] py-6">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="flex items-center gap-3 text-sm text-[#cccccc]"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#333333]">
              <Mail className="h-3.5 w-3.5 text-[#999999]" />
            </span>
            <span className="break-all">{CONTACT_EMAIL}</span>
          </a>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-sm text-[#cccccc]"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#333333]">
              <WhatsAppIcon className="h-3.5 w-3.5 text-[#999999]" />
            </span>
            <span>{CONTACT_PHONE_DISPLAY}</span>
          </a>
        </div>

        {/* Link groups */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 py-8">
          <nav aria-label="Footer Pages Navigation">
            <h4 className="mb-4 text-[10px] font-medium uppercase tracking-[0.18em] text-[#555555]">
              Pages
            </h4>
            <ul className="space-y-3">
              {PAGE_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="cursor-pointer text-sm text-[#999999] active:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer Services Navigation">
            <h4 className="mb-4 text-[10px] font-medium uppercase tracking-[0.18em] text-[#555555]">
              Services
            </h4>
            <ul className="space-y-3">
              {SERVICE_LINKS.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="cursor-pointer text-left text-sm text-[#999999] active:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Mobile Studio Location */}
        <div className="border-t border-[#242424] py-6">
          <h4 className="mb-2 text-[10px] font-medium uppercase tracking-[0.18em] text-[#555555]">
            Studio Location
          </h4>
          <p className="text-sm leading-6 text-[#999999]">
            Rise, Jhansi, Uttar Pradesh, India
            <br />
            <span className="text-[#666666]">Global Delivery & Digital Services</span>
          </p>
        </div>

        {/* Bottom meta */}
        <div className="flex justify-center border-t border-[#242424] pt-5 text-[10px] uppercase tracking-[0.14em] text-[#555555]">
          <p>© {new Date().getFullYear()} VisitingLink. All rights reserved.</p>
        </div>
      </div>

      {/* ============ DESKTOP ============ */}
      <div className="mx-auto hidden max-w-[95vw] px-6 pt-8 md:block md:px-12 md:pt-12">
        {/* TOP */}
        <div className="flex flex-col gap-8 border-b border-[#242424] pb-8 md:flex-row md:items-end md:justify-between md:pb-10">
          {/* Logo + intro */}
          <div className="max-w-md">
            <Link
              href="/"
              className="mb-5 block cursor-pointer"
              aria-label="VisitingLink Home"
            >
              <Image
                src="/logo.png"
                alt="VisitingLink Logo"
                width={180}
                height={50}
                className="h-auto w-[150px] object-contain brightness-0 invert md:w-[175px]"
                priority
              />
            </Link>

            <p className="max-w-sm text-sm leading-6 text-[#888888]">
              Creative technology studio building digital experiences, web
              platforms, and visual systems for ambitious businesses.
            </p>
          </div>

          {/* CTA */}
          <Link
            href="/contact"
            className="group inline-flex w-fit cursor-pointer items-center gap-5 bg-white px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#111111] transition-all duration-300 hover:bg-[#e8e8e8]"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* LINKS */}
        <div className="grid grid-cols-2 md:flex justify-between gap-x-8 gap-y-8 border-b border-[#242424] py-8 sm:grid-cols-2 md:grid-cols-4 md:gap-10 md:py-10">
          {/* Pages */}
          <nav aria-label="Desktop Footer Pages">
            <h4 className="mb-4 text-[10px] font-medium uppercase tracking-[0.18em] text-[#555555]">
              Pages
            </h4>

            <ul className="space-y-2.5">
              {PAGE_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="cursor-pointer text-sm text-[#999999] transition-colors duration-200 hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <nav aria-label="Desktop Footer Services">
            <h4 className="mb-4 text-[10px] font-medium uppercase tracking-[0.18em] text-[#555555]">
              Services
            </h4>

            <ul className="space-y-2.5">
              {SERVICE_LINKS.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="group inline-flex cursor-pointer items-center gap-1.5 text-sm text-[#999999] transition-colors duration-200 hover:text-white"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="h-3 w-3 text-[#555555] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Studio */}
          <div>
            <h4 className="mb-4 text-[10px] font-medium uppercase tracking-[0.18em] text-[#555555]">
              Studio
            </h4>

            <p className="text-sm leading-6 text-[#999999]">
              Rise, Jhansi
              <br />
              Uttar Pradesh, India
              <br />
              <span className="text-[#666666]">Global delivery</span>
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-[10px] font-medium uppercase tracking-[0.18em] text-[#555555]">
              Contact
            </h4>

            <div className="space-y-3">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="group flex items-start gap-2.5 text-sm text-[#999999] transition-colors duration-200 hover:text-white"
              >
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#666666] transition-colors group-hover:text-white" />
                <span className="break-all underline decoration-[#333333] underline-offset-4">
                  {CONTACT_EMAIL}
                </span>
              </a>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2.5 text-sm text-[#999999] transition-colors duration-200 hover:text-white"
              >
                <WhatsAppIcon className="h-4 w-4 shrink-0 text-[#666666] transition-colors group-hover:text-white" />
                <span>{CONTACT_PHONE_DISPLAY}</span>
              </a>
            </div>
          </div>
        </div>

        {/* BOTTOM META */}
        <div className="flex flex-row items-center justify-center gap-3 py-5 text-[10px] uppercase tracking-[0.14em] text-[#555555]">
          <p>© {new Date().getFullYear()} VisitingLink. Creative Technology Company.</p>
        </div>
      </div>
    </footer>
  );
};