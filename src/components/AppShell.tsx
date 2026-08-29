"use client";

import React, { createContext, useContext, useState } from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ServiceDetailModal } from "@/components/ServiceDetailModal";
import { ServiceItem } from "@/types";
import { useAppNavigation } from "@/hooks/useAppNavigation";
import { StartupLoaderProvider } from "@/components/StartupLoader";
import { SmoothScroll } from "@/components/SmoothScroll";

interface ServiceModalContextValue {
  openServiceDetail: (service: ServiceItem) => void;
}

const ServiceModalContext = createContext<ServiceModalContextValue | null>(null);

export function useServiceModal() {
  const ctx = useContext(ServiceModalContext);
  if (!ctx) {
    throw new Error("useServiceModal must be used within AppShell");
  }
  return ctx;
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const nav = useAppNavigation();
  const [selectedServiceDetail, setSelectedServiceDetail] =
    useState<ServiceItem | null>(null);

  const handleInquireFromDetailModal = (serviceName: string) => {
    setSelectedServiceDetail(null);
    nav.navigateToContact(serviceName);
  };

  return (
    <SmoothScroll>
      <StartupLoaderProvider>
        <ServiceModalContext.Provider
          value={{ openServiceDetail: setSelectedServiceDetail }}
        >
          <div className="relative flex min-h-screen flex-col bg-white text-[#111111] selection:bg-black selection:text-white">
            <CustomCursor />
            <ScrollProgress />
            <Navbar
              currentPage={nav.currentPage}
              onNavigateHome={nav.navigateToHome}
              onNavigateService={nav.navigateToService}
              onNavigatePage={nav.navigateToPage}
              onNavigateContact={nav.navigateToContact}
            />
            <main key={pathname} className="flex-1">
              {children}
            </main>
            <Footer
              onNavigateContact={nav.navigateToContact}
              onNavigateService={nav.navigateToService}
              onNavigatePage={nav.navigateToPage}
            />
            <ServiceDetailModal
              service={selectedServiceDetail}
              onClose={() => setSelectedServiceDetail(null)}
              onInquireService={handleInquireFromDetailModal}
            />
          </div>
        </ServiceModalContext.Provider>
      </StartupLoaderProvider>
    </SmoothScroll>
  );
}
