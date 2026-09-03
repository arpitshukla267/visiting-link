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
    navigateToContact: (serviceName?: string) => {
      if (serviceName) {
        router.push(
          `${ROUTES.contact}?service=${encodeURIComponent(serviceName)}`,
        );
      } else {
        router.push(ROUTES.contact);
      }
    },
  };
}
