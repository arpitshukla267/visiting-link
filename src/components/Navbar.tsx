import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight, ChevronDown } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  onNavigateHome: () => void;
  onNavigateService: (serviceId: string) => void;
  onNavigatePage: (page: string) => void;
  onNavigateContact: (preselectedService?: string) => void;
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

  const isHomePage = currentPage === 'home';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePageNav = (page: string) => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    onNavigatePage(page);
  };

  const navThemeDark = isHomePage && !isScrolled;

  return (
    <>
      <header
        id="main-navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || !isHomePage
            ? "bg-white/95 backdrop-blur-md border-b border-[#F0F0F0] py-4 shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
            : "bg-transparent py-5 md:py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-12">
          <button
            onClick={() => {
              onNavigateHome();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            id="brand-logo-link"
            className="group flex items-center gap-3 focus:outline-none cursor-pointer text-left"
          >
            <span
              className={`text-lg font-semibold tracking-tight transition-colors duration-300 ${
                navThemeDark ? "text-white" : "text-[#111111]"
              }`}
            >
              VisitingLink
            </span>
          </button>

          <nav
            id="desktop-nav-menu"
            className="hidden md:flex items-center space-x-8"
          >
              <button
                onClick={() => handlePageNav("/")}
                className={`text-[13px] font-medium uppercase tracking-widest transition-colors duration-200 cursor-pointer ${
                  currentPage === "work"
                    ? navThemeDark
                      ? "text-white"
                      : "text-[#111111]"
                    : navThemeDark
                      ? "text-white/80 hover:text-white"
                      : "text-[#666666] hover:text-black"
                }`}
              >
                Home
              </button>
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >

              <button
                onClick={() => {
                  if (isHomePage) {
                    const target = document.getElementById("services");
                    if (target) target.scrollIntoView({ behavior: "smooth" });
                  } else {
                    onNavigateHome();
                    setTimeout(() => {
                      const target = document.getElementById("services");
                      if (target) target.scrollIntoView({ behavior: "smooth" });
                    }, 100);
                  }
                }}
                className={`text-[13px] font-medium uppercase tracking-widest transition-colors duration-200 inline-flex items-center gap-1.5 cursor-pointer ${
                  navThemeDark
                    ? "text-white/80 hover:text-white"
                    : "text-[#666666] hover:text-black"
                }`}
              >
                <span>Services</span>
                <ChevronDown className="w-3 h-3 opacity-60" />
              </button>

              <AnimatePresence>
                {servicesDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full -left-4 w-64 pt-2 z-50"
                  >
                    <div className="bg-white border border-[#E5E7EB] p-3 shadow-xl space-y-1">
                      <button
                        onClick={() => {
                          setServicesDropdownOpen(false);
                          onNavigateService("visitinglink");
                        }}
                        className={`w-full text-left p-2.5 transition-colors cursor-pointer ${
                          currentPage === "visitinglink"
                            ? "bg-[#FAFAFA]"
                            : "hover:bg-[#FAFAFA]"
                        }`}
                      >
                        <div className="text-xs font-semibold text-[#111111]">
                          01 — VisitingLink
                        </div>
                        <div className="text-[11px] text-[#777777]">
                          Digital Identity Gateway
                        </div>
                      </button>

                      <button
                        onClick={() => {
                          setServicesDropdownOpen(false);
                          onNavigateService("web-development");
                        }}
                        className={`w-full text-left p-2.5 transition-colors cursor-pointer ${
                          currentPage === "web-development"
                            ? "bg-[#FAFAFA]"
                            : "hover:bg-[#FAFAFA]"
                        }`}
                      >
                        <div className="text-xs font-semibold text-[#111111]">
                          02 — Web Development
                        </div>
                        <div className="text-[11px] text-[#777777]">
                          High-Performance Platforms
                        </div>
                      </button>

                      <button
                        onClick={() => {
                          setServicesDropdownOpen(false);
                          onNavigateService("graphics");
                        }}
                        className={`w-full text-left p-2.5 transition-colors cursor-pointer ${
                          currentPage === "graphics"
                            ? "bg-[#FAFAFA]"
                            : "hover:bg-[#FAFAFA]"
                        }`}
                      >
                        <div className="text-xs font-semibold text-[#111111]">
                          03 — Graphics & Identity
                        </div>
                        <div className="text-[11px] text-[#777777]">
                          Refined Visual Systems
                        </div>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={() => handlePageNav("work")}
              className={`text-[13px] font-medium uppercase tracking-widest transition-colors duration-200 cursor-pointer ${
                currentPage === "work"
                  ? navThemeDark
                    ? "text-white"
                    : "text-[#111111]"
                  : navThemeDark
                    ? "text-white/80 hover:text-white"
                    : "text-[#666666] hover:text-black"
              }`}
            >
              Work
            </button>

            <button
              onClick={() => handlePageNav("magic")}
              className={`text-[13px] font-medium uppercase tracking-widest transition-colors duration-200 cursor-pointer ${
                currentPage === "magic"
                  ? navThemeDark
                    ? "text-white"
                    : "text-[#111111]"
                  : navThemeDark
                    ? "text-white/80 hover:text-white"
                    : "text-[#666666] hover:text-black"
              }`}
            >
              Magic
            </button>

            <button
              onClick={() => handlePageNav("about")}
              className={`text-[13px] font-medium uppercase tracking-widest transition-colors duration-200 cursor-pointer ${
                currentPage === "about"
                  ? navThemeDark
                    ? "text-white"
                    : "text-[#111111]"
                  : navThemeDark
                    ? "text-white/80 hover:text-white"
                    : "text-[#666666] hover:text-black"
              }`}
            >
              About
            </button>

            <button
              onClick={() => onNavigateContact()}
              className={`text-[13px] font-medium uppercase tracking-widest transition-colors duration-200 cursor-pointer ${
                currentPage === "contact"
                  ? navThemeDark
                    ? "text-white"
                    : "text-[#111111]"
                  : navThemeDark
                    ? "text-white/80 hover:text-white"
                    : "text-[#666666] hover:text-black"
              }`}
            >
              Contact
            </button>
          </nav>

          <div className="hidden md:flex items-center">
            <button
              id="navbar-cta-button"
              onClick={() => onNavigateContact()}
              className={`group flex items-center gap-2 px-6 py-2.5 text-xs font-semibold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                navThemeDark
                  ? "bg-white text-[#111111] hover:bg-[#F0F0F0]"
                  : "bg-[#111111] text-white hover:bg-[#333333]"
              }`}
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          <button
            id="mobile-menu-toggle-button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className={`md:hidden p-2 transition-colors duration-200 cursor-pointer ${
              navThemeDark ? "text-white" : "text-[#111111]"
            }`}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu-drawer"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 pb-12 flex flex-col justify-between md:hidden"
          >
            <div className="flex flex-col gap-4">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigateHome();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="text-2xl font-medium text-[#111111] hover:text-[#666666] transition-colors py-2 border-b border-[#F0F0F0] text-left cursor-pointer"
              >
                Home
              </button>

              <div className="py-2 border-b border-[#F0F0F0] space-y-2">
                <span className="text-sm text-[#888888] block mb-2">
                  Services
                </span>
                <div className="pl-2 space-y-2">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onNavigateService("visitinglink");
                    }}
                    className="block text-lg font-medium text-[#111111] hover:text-[#666666] text-left cursor-pointer"
                  >
                    VisitingLink
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onNavigateService("web-development");
                    }}
                    className="block text-lg font-medium text-[#111111] hover:text-[#666666] text-left cursor-pointer"
                  >
                    Web Development
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onNavigateService("graphics");
                    }}
                    className="block text-lg font-medium text-[#111111] hover:text-[#666666] text-left cursor-pointer"
                  >
                    Graphics & Identity
                  </button>
                </div>
              </div>

              <button
                onClick={() => handlePageNav("work")}
                className="text-2xl font-medium text-[#111111] hover:text-[#666666] transition-colors py-2 border-b border-[#F0F0F0] text-left cursor-pointer"
              >
                Work
              </button>

              <button
                onClick={() => handlePageNav("magic")}
                className="text-2xl font-medium text-[#111111] hover:text-[#666666] transition-colors py-2 border-b border-[#F0F0F0] text-left cursor-pointer"
              >
                Magic
              </button>

              <button
                onClick={() => handlePageNav("about")}
                className="text-2xl font-medium text-[#111111] hover:text-[#666666] transition-colors py-2 border-b border-[#F0F0F0] text-left cursor-pointer"
              >
                About
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigateContact();
                }}
                className="text-2xl font-medium text-[#111111] hover:text-[#666666] transition-colors py-2 border-b border-[#F0F0F0] text-left cursor-pointer"
              >
                Contact
              </button>
            </div>

            <div className="space-y-6 pt-6">
              <button
                id="mobile-menu-cta-button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigateContact();
                }}
                className="w-full flex items-center justify-center gap-2 py-4 bg-[#111111] text-white font-medium text-sm tracking-wider uppercase hover:bg-[#333333] transition-colors cursor-pointer"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <div className="text-xs text-[#888888] space-y-1">
                <p>VisitingLink — Digital Services Studio</p>
                <p>hello@visitinglink.studio</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
