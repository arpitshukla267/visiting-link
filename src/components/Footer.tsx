"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "motion/react";
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

const FooterWordmark: React.FC<{
  play: boolean;
  routeKey: string;
}> = ({ play, routeKey }) => (
  <div className="flex w-full justify-center overflow-hidden px-4 py-6 md:px-8 md:py-8">
    <motion.p
      key={routeKey}
      initial={{ y: "100%", opacity: 0 }}
      animate={play ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
      transition={{
        y: {
          duration: 1.5,
          ease: [0.22, 1, 0.36, 1],
        },
        opacity: {
          duration: 1.2,
          ease: [0.22, 1, 0.36, 1],
        },
      }}
      className="pointer-events-none select-none whitespace-nowrap text-center text-[clamp(2.75rem,13.5vw,8.5rem)] font-semibold leading-[0.85] tracking-[-0.065em] text-[#3a3a3a]"
    >
      VisitingLink
    </motion.p>
  </div>
);

export const Footer: React.FC<FooterProps> = ({
  onNavigateContact,
  onNavigateService,
  onNavigatePage,
}) => {
  const pathname = usePathname();
  const footerRef = useRef<HTMLElement>(null);

  const isFooterInView = useInView(footerRef, {
    amount: 1,
    once: true,
  });

  return (
    <footer
      ref={footerRef}
      id="main-footer"
      className="relative z-20 w-full overflow-hidden border-t border-[#242424] bg-[#111111] text-white"
    >
      <div className="mx-auto max-w-[95vw] px-6 pt-8 md:px-12 md:pt-12">
        {/* TOP */}
        <div className="flex flex-col gap-8 border-b border-[#242424] pb-8 md:flex-row md:items-end md:justify-between md:pb-10">
          {/* Logo + intro */}
          <div className="max-w-md">
            <button
              onClick={() => onNavigatePage("home")}
              className="mb-5 block cursor-pointer"
              aria-label="VisitingLink Home"
            >
              <Image
                src="/logo.png"
                alt="VisitingLink"
                width={180}
                height={50}
                className="h-auto w-[150px] object-contain brightness-0 invert md:w-[175px]"
                priority
              />
            </button>

            <p className="max-w-sm text-sm leading-6 text-[#888888]">
              Creative technology studio building digital experiences, web
              platforms, and visual systems for ambitious businesses.
            </p>
          </div>

          {/* CTA */}
          <button
            onClick={() => onNavigateContact()}
            className="group inline-flex w-fit cursor-pointer items-center gap-5 bg-white px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#111111] transition-all duration-300 hover:bg-[#e8e8e8]"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* LINKS */}
        <div className="grid grid-cols-2 md:flex justify-between gap-x-8 gap-y-8 border-b border-[#242424] py-8 sm:grid-cols-2 md:grid-cols-4 md:gap-10 md:py-10">
          {/* Pages */}
          <div>
            <h4 className="mb-4 text-[10px] font-medium uppercase tracking-[0.18em] text-[#555555]">
              Pages
            </h4>

            <ul className="space-y-2.5">
              {[
                { label: "Services", page: "services" },
                { label: "About", page: "about" },
                { label: "Work", page: "work" },
                { label: "Contact", page: "contact" },
              ].map((item) => (
                <li key={item.page}>
                  <button
                    onClick={() => onNavigatePage(item.page)}
                    className="cursor-pointer text-sm text-[#999999] transition-colors duration-200 hover:text-white"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4 text-[10px] font-medium uppercase tracking-[0.18em] text-[#555555]">
              Services
            </h4>

            <ul className="space-y-2.5">
              {[
                {
                  label: "Visiting Link",
                  id: "visitinglink",
                },
                {
                  label: "Company Profile",
                  id: "company-profile",
                },
                {
                  label: "Web Development",
                  id: "web-development",
                },
                {
                  label: "Graphics",
                  id: "graphics",
                },
                {
                  label: "UI/UX Design",
                  id: "uiux",
                },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      onNavigateService(item.id);
                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });
                    }}
                    className="group inline-flex cursor-pointer items-center gap-1.5 text-sm text-[#999999] transition-colors duration-200 hover:text-white"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="h-3 w-3 text-[#555555] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Studio */}
          {/* <div>
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
          </div> */}

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

            {/* <div className="mt-4 flex items-center gap-4 text-xs text-[#666666]">
              {["X", "LinkedIn", "GitHub"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="transition-colors duration-200 hover:text-white"
                >
                  {social}
                </a>
              ))}
            </div> */}
          </div>
        </div>

        {/* BOTTOM META */}
        <div className="flex flex-row items-center justify-center gap-3 py-5 text-[10px] uppercase tracking-[0.14em] text-[#555555] ">
          <p>© {new Date().getFullYear()} VisitingLink</p>

          {/* <p>Creative Technology Studio</p> */}
        </div>
      </div>

      {/* LARGE WORDMARK */}
      {/* <FooterWordmark play={isFooterInView} routeKey={pathname} /> */}
    </footer>
  );
};
