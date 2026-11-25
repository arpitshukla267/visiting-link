"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Instagram, Linkedin, Mail } from "lucide-react";

interface FooterProps {
  onNavigateContact: (serviceName?: string) => void;
  onNavigateService: (serviceId: string) => void;
  onNavigatePage: (page: string) => void;
}

const CONTACT_EMAIL = "info.visitinglink@gmail.com";
const CONTACT_PHONE_DISPLAY = "+91 92365 53585";
const CONTACT_PHONE_E164 = "919236553585";
const WHATSAPP_URL = `https://wa.me/${CONTACT_PHONE_E164}`;

// Same 4 links as the navbar
const PAGE_LINKS = [
  { label: "Overview", href: "/" },
  { label: "Solutions", href: "/solutions" },
  { label: "Our Story", href: "/about" },
  { label: "Let's Talk", href: "/contact" },
];

const SERVICE_LINKS = [
  { label: "Brand & Digital Design", href: "/services" },
  { label: "Software Development", href: "/services" },
  { label: "Web Apps & Prototypes", href: "/services" },
  { label: "AI & Automation Solutions", href: "/services" },
  { label: "Get Your Online Store", href: "/online-store" },
];

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

// TODO: apni real profile links yahan daalo
const SOCIAL_LINKS: {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { label: "Instagram", href: "https://www.instagram.com/", icon: Instagram },
  { label: "LinkedIn", href: "https://www.linkedin.com/", icon: Linkedin },
  { label: "X", href: "https://x.com/", icon: XIcon },
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

/** Row of round social icon buttons */
function SocialRow({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#333333] text-[#999999] transition-colors duration-200 hover:border-white hover:text-white"
        >
          <Icon className="h-3.5 w-3.5" />
        </a>
      ))}
    </div>
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
            className="h-auto w-[140px] object-contain brightness-0 invert -ml-4"
            priority
          />
        </Link>

        <p className="mb-8 max-w-sm text-sm leading-6 text-[#888888]">
          Creative technology company building digital experiences, web
          platforms, and software systems for ambitious businesses.
        </p>

        {/* Contact + social */}
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

          <SocialRow className="mt-2" />
        </div>

        {/* Pages + Location side by side */}
        <div className="grid grid-cols-2 gap-x-4 py-8">
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

          <div>
            <h4 className="mb-4 text-[10px] font-medium uppercase tracking-[0.18em] text-[#555555]">
              Location
            </h4>
            <p className="text-sm leading-6 text-[#999999]">
              Rise, Jhansi,
              <br />
              Uttar Pradesh, India
              <br />
              <span className="text-[#666666]">
                Global Delivery & Digital Services
              </span>
            </p>
          </div>
        </div>

        {/* Mobile Studio Location */}
        <div className="border-t border-[#242424] py-6">
          <h4 className="mb-2 text-[10px] font-medium uppercase tracking-[0.18em] text-[#555555]">
            Location
          </h4>
          <p className="text-sm leading-6 text-[#999999]">
            Rise, Jhansi, Uttar Pradesh, India
            <br />
            <span className="text-[#666666]">
              Global Delivery & Digital Services
            </span>
          </p>
        </div>

        {/* Bottom meta */}
        <div className="flex justify-center border-t border-[#242424] pt-5 text-[10px] uppercase tracking-[0.14em] text-[#555555]">
          <p className="flex items-center gap-1.5">
            <Image
              src="/icon.png"
              alt="VisitingLink"
              width={14}
              height={14}
              className="h-[14px] w-[14px] object-contain"
            />
            <span>
              {new Date().getFullYear()} VisitingLink. All rights reserved.
            </span>
          </p>
        </div>
      </div>

      {/* ============ DESKTOP ============ */}
      <div className="mx-auto hidden max-w-[95vw] px-6 pt-12 md:block md:px-12 md:pt-16">
        <div className="grid gap-12 border-b border-[#242424] pb-12 md:grid-cols-[1.5fr_1fr_1fr_1.4fr] lg:gap-16 md:pb-16">
          {/* Col 1: logo, description */}
          <div>
            <Link
              href="/"
              className="mb-5 block w-fit cursor-pointer"
              aria-label="VisitingLink Home"
            >
              <Image
                src="/logo.png"
                alt="VisitingLink Logo"
                width={180}
                height={50}
                className="h-auto w-[150px] object-contain brightness-0 invert md:w-[175px] -ml-8 lg:-ml-4"
                priority
              />
            </Link>

            <p className="max-w-sm text-sm leading-6 text-[#888888]">
              Creative technology studio building digital experiences, web
              platforms, and visual systems for ambitious businesses.
            </p>
          </div>

          {/* Col 2: quick links */}
          <nav aria-label="Desktop Footer Quick Links">
            <h4 className="mb-4 text-[10px] font-medium uppercase tracking-[0.18em] text-[#555555]">
              Quick Links
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

          {/* Col 3: info */}
          <div>
            <h4 className="mb-4 text-[10px] font-medium uppercase tracking-[0.18em] text-[#555555]">
              Info
            </h4>

            <p className="text-sm leading-6 text-[#999999]">
              Rise, Jhansi
              <br />
              Uttar Pradesh, India
              <br />
              <span className="text-[#666666]">Global delivery</span>
            </p>
          </div>

          {/* Col 4: contact */}
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

            {/* Social links, right below contact */}
            <SocialRow className="mt-5" />
          </div>
        </div>

        {/* BOTTOM META */}
        <div className="flex justify-center border-t border-[#242424] py-5 text-[10px] uppercase tracking-[0.14em] text-[#555555]">
          <p className="flex items-center gap-1.5">
            <Image
              src="/icon.png"
              alt="VisitingLink"
              width={14}
              height={14}
              className="h-[14px] w-[14px] object-contain"
            />
            <span>
              {new Date().getFullYear()} VisitingLink. All rights reserved.
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};
