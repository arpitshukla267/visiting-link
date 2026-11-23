"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Globe, Menu, ShoppingBag, Users, X } from "lucide-react";
import { getScrollY } from "@/components/SmoothScroll";

interface NavbarProps {
  currentPage: string;
  onNavigateHome: () => void;
  onNavigateService: (serviceId: string) => void;
  onNavigatePage: (page: string) => void;
  onNavigateContact: (preselectedService?: string) => void;
}

const NAV_ITEMS = [
  { label: "Overview", href: "/", key: "home" },
  { label: "Solutions", href: "/solutions", key: "services" },
  { label: "Our Story", href: "/about", key: "about" },
  { label: "Let's Talk", href: "/contact", key: "contact" },
];

const SOLUTION_ITEMS = [
  {
    href: "/solutions/ecommerce",
    label: "E-commerce",
    text: "Your own online store with admin panel",
    icon: ShoppingBag,
  },
  {
    href: "/solutions/informative",
    label: "Informative",
    text: "Professional business website",
    icon: Globe,
  },
  {
    href: "/solutions/crm",
    label: "CRM",
    text: "Track leads and customers in one place",
    icon: Users,
  },
];

const PAY_HREF = "https://rzp.io/rzp/3nrpooT";

function isPastHeroSection() {
  const track = document.getElementById("hero-scroll-track");
  if (!track) return getScrollY() > 30;
  const viewport = window.innerHeight;
  const trackBottom = track.offsetTop + track.offsetHeight;
  return getScrollY() >= trackBottom - viewport * 0.15;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false); // desktop dropdown
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false); // mobile accordion

  const pathname = usePathname();
  const solutionsRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  const isHomePage = currentPage === "home";
  const isSolutionsActive =
    pathname.startsWith("/solutions") || currentPage === "services";
  // /solutions aur /solutions/slug dono pe /about wali style
  const isSolutionsPage = pathname.startsWith("/solutions");

  useEffect(() => {
    const handleScroll = () => {
      if (isHomePage) {
        setIsScrolled(isPastHeroSection());
        return;
      }
      setIsScrolled(window.scrollY > 30);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    const lenis = (
      window as Window & {
        __lenis?: { on: (e: string, fn: () => void) => () => void };
      }
    ).__lenis;
    const unsubLenis = lenis?.on("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      unsubLenis?.();
    };
  }, [isHomePage]);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileMenuOpen]);

  // page badalte hi dropdown aur mobile menu band
  useEffect(() => {
    setSolutionsOpen(false);
    setMobileMenuOpen(false);
  }, [pathname]);

  // desktop dropdown: bahar click ya Escape pe band
  useEffect(() => {
    if (!solutionsOpen) return;
    const onDown = (e: MouseEvent | TouchEvent) => {
      if (!solutionsRef.current?.contains(e.target as Node)) {
        setSolutionsOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSolutionsOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown, { passive: true });
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [solutionsOpen]);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  const showSolutions = () => {
    clearTimeout(closeTimer.current);
    setSolutionsOpen(true);
  };
  // chhota delay, taaki mouse trigger se panel tak jaate waqt menu band na ho
  const hideSolutions = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setSolutionsOpen(false), 120);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const isTransparentPage =
    isHomePage || currentPage === "about" || isSolutionsPage;
  const navThemeDark = isTransparentPage && !isScrolled && !mobileMenuOpen;

  const navLinkClass = (active: boolean) =>
    `text-[13px] font-medium uppercase tracking-widest text-nowrap transition-colors duration-200 cursor-pointer ${
      active
        ? navThemeDark
          ? "text-white"
          : "text-white"
        : navThemeDark
          ? "text-white/80 hover:text-white"
          : "text-white/80 hover:text-white"
    }`;

  const payButtonClass =
    "inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-full bg-gradient-to-r from-[#b8d4ec] via-[#cfe6d8] to-[#e4fbc0] px-6 py-2.5 text-[15px] font-bold text-black transition-all duration-200 hover:brightness-105";

  return (
    <>
      <header
        id="main-navbar"
        className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-300 ${
          (currentPage === "about" || isSolutionsPage) &&
          !isScrolled &&
          !mobileMenuOpen
            ? "bg-black py-4"
            : isScrolled || !isTransparentPage || mobileMenuOpen
              ? "bg-black/30 py-4 shadow-[0_1px_3px_rgba(0,0,0,0.02)] backdrop-blur-2xl"
              : "bg-transparent py-5 md:py-6"
        }`}
      >
        <div className="mx-auto grid h-12 max-w-8xl grid-cols-2 items-center px-4 md:grid-cols-3 md:px-12">
          {/* Logo — left */}
          <Link
            href="/"
            id="brand-logo-link"
            className="group flex cursor-pointer items-center gap-3 text-left focus:outline-none justify-self-start"
            aria-label="VisitingLink Home"
          >
            <div className="flex items-center justify-center overflow-hidden transition-all duration-300">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png"
                alt="VisitingLink Logo"
                className="h-12 w-auto object-contain transition-all duration-300"
              />
            </div>
          </Link>

          {/* Nav links — center */}
          <nav
            id="desktop-nav-menu"
            aria-label="Main Navigation"
            className="hidden items-center justify-self-center space-x-8 md:flex"
          >
            {NAV_ITEMS.map((item) =>
              item.key === "services" ? (
                <div
                  key={item.key}
                  ref={solutionsRef}
                  className="relative"
                  onMouseEnter={showSolutions}
                  onMouseLeave={hideSolutions}
                  onFocus={showSolutions}
                  onBlur={(e) => {
                    if (
                      !solutionsRef.current?.contains(e.relatedTarget as Node)
                    ) {
                      hideSolutions();
                    }
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setSolutionsOpen((o) => !o)}
                    aria-expanded={solutionsOpen}
                    aria-haspopup="menu"
                    className={`flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 ${navLinkClass(
                      isSolutionsActive || solutionsOpen,
                    )}`}
                  >
                    {item.label}
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform duration-200 ${
                        solutionsOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* pt-4 ka gap isi wrapper ke andar hai, isliye hover toot-ta nahi */}
                  <div
                    className={`absolute left-1/2 top-full w-80 -translate-x-1/2 pt-4 transition-[opacity,transform] duration-150 ease-out ${
                      solutionsOpen
                        ? "pointer-events-auto translate-y-0 opacity-100"
                        : "pointer-events-none -translate-y-1 opacity-0"
                    }`}
                  >
                    <ul
                      role="menu"
                      className="rounded-2xl border border-white/10 bg-black/85 p-2 shadow-[0_16px_48px_rgba(0,0,0,0.5)] backdrop-blur-2xl"
                    >
                      {SOLUTION_ITEMS.map(
                        ({ href, label, text, icon: Icon }) => (
                          <li key={href} role="none">
                            <Link
                              href={href}
                              role="menuitem"
                              tabIndex={solutionsOpen ? 0 : -1}
                              className={`flex items-start gap-3 rounded-xl p-3 normal-case tracking-normal transition-colors hover:bg-white/10 focus-visible:bg-white/10 focus-visible:outline-none ${
                                pathname === href ? "bg-white/10" : ""
                              }`}
                            >
                              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white">
                                <Icon className="h-4 w-4" />
                              </span>
                              <span>
                                <span className="block text-sm font-semibold text-white">
                                  {label}
                                </span>
                                <span className="mt-0.5 block text-xs leading-snug text-white/60">
                                  {text}
                                </span>
                              </span>
                            </Link>
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.key}
                  href={item.href}
                  className={navLinkClass(currentPage === item.key)}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          {/* Button — right */}
          <div className="hidden items-center justify-self-end gap-3 md:flex">
            <a
              id="navbar-pay-now-button"
              href={PAY_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className={payButtonClass}
            >
              Pay Now
            </a>
          </div>

          {/* Mobile toggle — right */}
          <button
            id="mobile-menu-toggle-button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
            className={`justify-self-end cursor-pointer p-2 transition-colors duration-200 md:hidden ${
              navThemeDark && !mobileMenuOpen ? "text-white" : "text-white"
            }`}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeMobileMenu}
              className="fixed inset-0 z-40 bg-black/30 md:hidden"
            />

            <motion.aside
              id="mobile-menu-drawer"
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-x-0 top-0 z-[55] flex max-h-[100dvh] flex-col bg-black pt-[4.5rem] shadow-[0_8px_32px_rgba(0,0,0,0.1)] md:hidden"
            >
              <nav
                aria-label="Mobile Navigation"
                className="flex-1 overflow-y-auto px-6"
              >
                {NAV_ITEMS.map((item) =>
                  item.key === "services" ? (
                    <div key={item.key} className="border-b border-[#E8E8E8]">
                      <button
                        type="button"
                        onClick={() => setMobileSolutionsOpen((o) => !o)}
                        aria-expanded={mobileSolutionsOpen}
                        className={`flex w-full cursor-pointer items-center justify-between py-4 text-left text-base transition-colors ${
                          isSolutionsActive
                            ? "font-semibold text-white"
                            : "font-medium text-white/50 hover:text-white"
                        }`}
                      >
                        {item.label}
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-200 ${
                            mobileSolutionsOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      <div
                        className={`grid transition-[grid-template-rows] duration-200 ease-out ${
                          mobileSolutionsOpen
                            ? "grid-rows-[1fr]"
                            : "grid-rows-[0fr]"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <ul className="space-y-1 pb-3 pl-3">
                            {SOLUTION_ITEMS.map(
                              ({ href, label, icon: Icon }) => (
                                <li key={href}>
                                  <Link
                                    href={href}
                                    onClick={closeMobileMenu}
                                    tabIndex={mobileSolutionsOpen ? 0 : -1}
                                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-[15px] transition-colors ${
                                      pathname === href
                                        ? "bg-white/10 font-semibold text-white"
                                        : "text-white/60 hover:text-white"
                                    }`}
                                  >
                                    <Icon className="h-4 w-4" />
                                    {label}
                                  </Link>
                                </li>
                              ),
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link
                      key={item.key}
                      href={item.href}
                      onClick={closeMobileMenu}
                      className={`flex w-full cursor-pointer items-center border-b border-[#E8E8E8] py-4 text-left text-base transition-colors ${
                        currentPage === item.key
                          ? "font-semibold text-white"
                          : "font-medium text-white/50 hover:text-white"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ),
                )}
              </nav>

              <div className="border-t border-[#E8E8E8] p-6">
                <a
                  id="mobile-menu-cta-button"
                  href={PAY_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMobileMenu}
                  className={`${payButtonClass} w-full py-3.5`}
                >
                  Pay Now
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
