"use client";

import { useRouter, usePathname } from "next/navigation";
import { ROUTES, getCurrentPage } from "@/lib/routes";

export function useAppNavigation() {
  const router = useRouter();
  const pathname = usePathname();

  return {
    currentPage: getCurrentPage(pathname),
    navigateToHome: () => {
      if (pathname !== ROUTES.home) {
        router.push(ROUTES.home);
      }
    },
    navigateToPage: (page: string) => {
      const targetPath =
        page === "home" || page === "/"
          ? ROUTES.home
          : `/${page.replace(/^\//, "")}`;
      if (pathname !== targetPath) {
        router.push(targetPath);
      }
    },
    navigateToService: (serviceId: string) => {
      const targetPath = ROUTES.service(serviceId);
      if (pathname !== targetPath) {
        router.push(targetPath);
      }
    },
    navigateToContact: (serviceName?: string, category?: string) => {
      const params = new URLSearchParams();
      if (serviceName) params.set("service", serviceName);
      if (category) params.set("category", category);
      const query = params.toString();
      router.push(query ? `${ROUTES.contact}?${query}` : ROUTES.contact);
    },
  };
}
