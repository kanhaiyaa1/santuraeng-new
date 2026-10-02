import { routing } from '@/i18n/routing';

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://santuraeng.com').replace(/\/$/, '');

function localizedUrl(locale: string, pathname: string) {
  const prefix = locale === routing.defaultLocale ? '' : `/${locale}`;
  const path = pathname === '/' ? '' : pathname;
  // Next.js serves "/de", not "/de/", so only the bare root keeps a trailing slash.
  return `${siteUrl}${prefix + path || '/'}`;
}

/**
 * Builds a self-referencing canonical plus hreflang alternates (including x-default)
 * for a given pathname (e.g. "/", "/products", "/products/widget-100").
 */
export function buildAlternates(pathname: string, currentLocale: string) {
  const languages: Record<string, string> = {};

  for (const locale of routing.locales) {
    languages[locale] = localizedUrl(locale, pathname);
  }

  languages['x-default'] = localizedUrl(routing.defaultLocale, pathname);

  return {
    canonical: localizedUrl(currentLocale, pathname),
    languages
  };
}

/**
 * Alternates for a country landing page: the same page in every locale, plus regional
 * hreflang tags (e.g. "ar-SA", "fr-CA") pointing at the matching language version.
 */
export function buildCountryAlternates(pathname: string, currentLocale: string, regions: { tag: string; locale: string }[]) {
  const alternates = buildAlternates(pathname, currentLocale);
  for (const r of regions) alternates.languages[r.tag] = localizedUrl(r.locale, pathname);
  return alternates;
}

export { siteUrl };
