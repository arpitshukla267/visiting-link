"use client";

import { useRouter, usePathname } from "next/navigation";
import { ROUTES, getCurrentPage } from "@/lib/routes";

export function useAppNavigation() {
  const router = useRouter();
  const pathname = usePathname();

  return {
    currentPage: getCurrentPage(pathname),
    navigateToHome: () => router.push(ROUTES.home),
    navigateToPage: (page: string) => {
      if (page === "home" || page === "/") {
        router.push(ROUTES.home);
        return;
      }
      router.push(`/${page.replace(/^\//, "")}`);
    },
    navigateToService: (serviceId: string) =>
      router.push(ROUTES.service(serviceId)),
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
