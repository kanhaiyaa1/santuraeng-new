import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { siteUrl } from '@/lib/seo';

// Static routes only. Extend with product slugs / country pages from Supabase once that data exists.
const staticPaths = ['', '/products', '/rfq'];

export default function sitemap(): MetadataRoute.Sitemap {
  return staticPaths.map((path) => {
    const languages: Record<string, string> = {};

    for (const locale of routing.locales) {
      const prefix = locale === routing.defaultLocale ? '' : `/${locale}`;
      languages[locale] = `${siteUrl}${prefix}${path}`;
    }

    return {
      url: languages[routing.defaultLocale],
      lastModified: new Date(),
      alternates: { languages }
    };
  });
}
