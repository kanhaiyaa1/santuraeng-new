import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { buildAlternates, buildCountryAlternates } from '@/lib/seo';
import { PRODUCTS } from '@/content/products';
import { COUNTRIES } from '@/content/countries';

type Alternates = ReturnType<typeof buildAlternates>;

// One entry per locale for every page, with the same alternates the page itself declares.
function entries(build: (locale: string) => Alternates): MetadataRoute.Sitemap {
  return routing.locales.map((locale) => {
    const { canonical, languages } = build(locale);
    return { url: canonical, lastModified: new Date(), alternates: { languages } };
  });
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ['/', '/products', '/rfq', '/about', '/quality', '/contact', '/privacy-policy', '/disclaimer'];
  // "Coming soon" products are noindex, so they stay out of the sitemap.
  const productPaths = PRODUCTS.filter((p) => !p.comingSoon).map((p) => `/products/${p.slug}`);

  return [
    ...[...staticPaths, ...productPaths].flatMap((path) => entries((locale) => buildAlternates(path, locale))),
    ...COUNTRIES.flatMap((c) =>
      entries((locale) => buildCountryAlternates(`/${c.slug}`, locale, c.hreflang))
    )
  ];
}
