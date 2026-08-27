export const ROUTES = {
  home: '/',
  about: '/about',
  work: '/work',
  contact: '/contact',
  magic: '/magic',
  service: (id: string) => `/service/${id}`,
} as const;

export type ServiceId = 'visitinglink' | 'web-development' | 'graphics';

export function getCurrentPage(pathname: string): string {
  if (pathname === ROUTES.about) return 'about';
  if (pathname === ROUTES.work) return 'work';
  if (pathname === ROUTES.contact) return 'contact';
  if (pathname === ROUTES.magic) return 'magic';
  if (pathname.startsWith('/service/')) {
    return pathname.replace('/service/', '');
  }
  return 'home';
}
