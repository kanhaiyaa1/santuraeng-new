import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { buildAlternates, buildCountryAlternates } from '@/lib/seo';
import { PRODUCTS } from '@/content/products';
import { COUNTRIES } from '@/content/countries';
import { SERVICES } from '@/content/services';

type Alternates = ReturnType<typeof buildAlternates>;

// One entry per locale for every page, with the same alternates the page itself declares.
function entries(build: (locale: string) => Alternates): MetadataRoute.Sitemap {
  return routing.locales.map((locale) => {
    const { canonical, languages } = build(locale);
    return { url: canonical, lastModified: new Date(), alternates: { languages } };
  });
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ['/', '/products', '/refractory-anchors', '/rfq', '/about', '/quality', '/contact', '/privacy-policy', '/disclaimer'];
  // "Coming soon" products are noindex, so they stay out of the sitemap.
  const productPaths = PRODUCTS.filter((p) => !p.comingSoon).map((p) => `/products/${p.slug}`);
  // Only services with real content are indexable; the rest are noindex placeholders.
  const servicePaths = SERVICES.filter((s) => s.hasContent).map((s) => `/services/${s.slug}`);

  return [
    ...[...staticPaths, ...productPaths, ...servicePaths].flatMap((path) => entries((locale) => buildAlternates(path, locale))),
    ...COUNTRIES.flatMap((c) =>
      entries((locale) => buildCountryAlternates(`/${c.slug}`, locale, c.hreflang))
    )
  ];
}
