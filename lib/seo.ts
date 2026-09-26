import { routing } from '@/i18n/routing';

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://santuraeng.com').replace(/\/$/, '');

/**
 * Builds a self-referencing canonical plus hreflang alternates (including x-default)
 * for a given pathname (e.g. "/", "/products", "/products/widget-100").
 */
export function buildAlternates(pathname: string, currentLocale: string) {
  const languages: Record<string, string> = {};

  for (const locale of routing.locales) {
    const prefix = locale === routing.defaultLocale ? '' : `/${locale}`;
    languages[locale] = `${siteUrl}${prefix}${pathname}`;
  }

  languages['x-default'] = `${siteUrl}${pathname}`;

  const canonicalPrefix = currentLocale === routing.defaultLocale ? '' : `/${currentLocale}`;

  return {
    canonical: `${siteUrl}${canonicalPrefix}${pathname}`,
    languages
  };
}

export { siteUrl };
