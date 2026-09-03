export const ROUTES = {
  home: "/",
  about: "/about",
  work: "/work",
  contact: "/contact",
  services: "/services",
  service: (id: string) => `/services`,
} as const;

export type ServiceId = "visitinglink" | "web-development" | "graphics";

export function getCurrentPage(pathname: string): string {
  if (pathname === ROUTES.about) return "about";
  if (pathname === ROUTES.work) return "work";
  if (pathname === ROUTES.contact) return "contact";
  if (pathname === ROUTES.services || pathname.startsWith("/services")) return "services";
  return "home";
}
