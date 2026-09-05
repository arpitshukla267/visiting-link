"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight, ChevronDown } from 'lucide-react';
import { getScrollY } from '@/components/SmoothScroll';

interface NavbarProps {
  currentPage: string;
  onNavigateHome: () => void;
  onNavigateService: (serviceId: string) => void;
  onNavigatePage: (page: string) => void;
  onNavigateContact: (preselectedService?: string) => void;
}

const MOBILE_SERVICES = [
  { id: 'visitinglink', label: 'VisitingLink' },
  { id: 'web-development', label: 'Web Development' },
  { id: 'graphics', label: 'Graphics & Identity' },
] as const;

function isPastHeroSection() {
  const track = document.getElementById('hero-scroll-track');
  if (!track) return getScrollY() > 30;
  const viewport = window.innerHeight;
  const trackBottom = track.offsetTop + track.offsetHeight;
  return getScrollY() >= trackBottom - viewport * 0.15;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigateHome,
  onNavigateService,
  onNavigatePage,
  onNavigateContact,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const isHomePage = currentPage === 'home';

  useEffect(() => {
    const handleScroll = () => {
      // Home: stay transparent for the full hero; scrolled style only after hero ends.
      // Other pages: unchanged — bg after a small scroll threshold.
      if (isHomePage) {
        setIsScrolled(isPastHeroSection());
        return;
      }
      setIsScrolled(window.scrollY > 30);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    const lenis = (
      window as Window & {
        __lenis?: { on: (e: string, fn: () => void) => () => void };
      }
    ).__lenis;
    const unsubLenis = lenis?.on('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      unsubLenis?.();
    };
  }, [isHomePage]);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileServicesOpen(false);
  };

  const handlePageNav = (page: string) => {
    closeMobileMenu();
    setServicesDropdownOpen(false);
    onNavigatePage(page);
  };

  const handleServiceNav = (serviceId: string) => {
    closeMobileMenu();
    setServicesDropdownOpen(false);
    onNavigateService(serviceId);
  };

  const isTransparentPage = isHomePage || currentPage === 'about';
  const navThemeDark = isTransparentPage && !isScrolled && !mobileMenuOpen;

  const navLinkClass = (active: boolean) =>
    `text-[13px] font-medium uppercase tracking-widest transition-colors duration-200 cursor-pointer ${
      active
        ? navThemeDark
          ? 'text-white'
          : 'text-[#111111]'
        : navThemeDark
          ? 'text-white/80 hover:text-white'
          : 'text-[#666666] hover:text-black'
    }`;

  return (
    <>
      <header
        id="main-navbar"
        className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-300 ${
          isScrolled || !isTransparentPage || mobileMenuOpen
            ? 'border-b border-[#F0F0F0] bg-white/95 py-4 shadow-[0_1px_3px_rgba(0,0,0,0.02)] backdrop-blur-md'
            : 'bg-transparent py-5 md:py-6'
        }`}
      >
        <div className="mx-auto flex h-12 max-w-7xl items-center justify-between px-4 md:px-12">
          <button
            onClick={() => {
              onNavigateHome();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            id="brand-logo-link"
            className="group flex cursor-pointer items-center gap-3 text-left focus:outline-none"
          >
            <div className="flex items-center justify-center  overflow-hidden transition-all duration-300 ">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={navThemeDark ? "/logo.png" : "/visitinglink-logo-black.png"}
                alt="VisitingLink"
                className={`${navThemeDark ? "h-12" : "h-9"} w-auto object-contain transition-all duration-300`}
              />
            </div>
          </button>

          <nav
            id="desktop-nav-menu"
            className="hidden items-center space-x-8 md:flex"
          >
            <button
              onClick={() => handlePageNav('/')}
              className={navLinkClass(currentPage === 'home')}
            >
              Home
            </button>

            <button
              onClick={() => handlePageNav('services')}
              className={navLinkClass(currentPage === 'services')}
            >
              Services
            </button>

            <button
              onClick={() => handlePageNav('work')}
              className={navLinkClass(currentPage === 'work')}
            >
              Work
            </button>

            <button
              onClick={() => handlePageNav('about')}
              className={navLinkClass(currentPage === 'about')}
            >
              About
            </button>

            <button
              onClick={() => onNavigateContact()}
              className={navLinkClass(currentPage === 'contact')}
            >
              Contact
            </button>
          </nav>

          <div className="hidden items-center md:flex">
            <a
              id="navbar-cta-button"
              href="https://social-offer.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex cursor-pointer items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all duration-200 ${
                navThemeDark
                  ? 'bg-white text-[#111111] hover:bg-[#F0F0F0]'
                  : 'bg-[#111111] text-white hover:bg-[#333333]'
              }`}
            >
              <span>Company Profile</span>
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          <button
            id="mobile-menu-toggle-button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
            className={`cursor-pointer p-2 transition-colors duration-200 md:hidden ${
              navThemeDark && !mobileMenuOpen ? 'text-white' : 'text-[#111111]'
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
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-x-0 top-0 z-[55] flex max-h-[100dvh] flex-col bg-[#FAFAFA] pt-[4.5rem] shadow-[0_8px_32px_rgba(0,0,0,0.1)] md:hidden"
            >       

              <nav className="flex-1 overflow-y-auto px-6">
                <button
                  type="button"
                  onClick={() => {
                    closeMobileMenu();
                    onNavigateHome();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`flex w-full cursor-pointer items-center border-b border-[#E8E8E8] py-4 text-left text-base font-semibold transition-colors ${
                    currentPage === 'home'
                      ? 'text-[#111111]'
                      : 'font-medium text-[#444444] hover:text-[#111111]'
                  }`}
                >
                  Home
                </button>

                {[
                  { label: 'Services', page: 'services' },
                  { label: 'Work', page: 'work' },
                  { label: 'About', page: 'about' },
                  { label: 'Contact', page: 'contact' },
                ].map((item) => (
                  <button
                    key={item.page}
                    type="button"
                    onClick={() =>
                      item.page === 'contact'
                        ? (closeMobileMenu(), onNavigateContact())
                        : handlePageNav(item.page)
                    }
                    className={`flex w-full cursor-pointer items-center border-b border-[#E8E8E8] py-4 text-left text-base transition-colors ${
                      currentPage === item.page
                        ? 'font-semibold text-[#111111]'
                        : 'font-medium text-[#444444] hover:text-[#111111]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>

              <div className="border-t border-[#E8E8E8] p-6">
                <a
                  id="mobile-menu-cta-button"
                  href="https://social-offer.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMobileMenu}
                  className="flex w-full cursor-pointer items-center justify-center gap-2 bg-[#111111] py-4 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-[#333333]"
                >
                  <span>Company Profile</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
