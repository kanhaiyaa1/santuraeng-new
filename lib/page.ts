import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { buildAlternates } from '@/lib/seo';

/** Metadata for a simple page whose namespace has metaTitle / metaDescription keys. */
export async function pageMetadata(locale: string, namespace: string, pathname: string): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace });
  const alternates = buildAlternates(pathname, locale);
  const title = t('metaTitle');
  const description = t('metaDescription');
  return {
    title: { absolute: title },
    description,
    alternates,
    openGraph: { title, description, url: alternates.canonical, locale, type: 'website' }
  };
}

/** BreadcrumbList JSON-LD for Home → page. */
export async function breadcrumbJsonLd(locale: string, pathname: string, name: string) {
  const nav = await getTranslations({ locale, namespace: 'nav' });
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: nav('home'), item: buildAlternates('/', locale).canonical },
      { '@type': 'ListItem', position: 2, name, item: buildAlternates(pathname, locale).canonical }
    ]
  };
}

/** Long-form date in the page language ("26 June 2027" in English). */
export function formatDate(iso: string, locale: string) {
  return new Intl.DateTimeFormat(locale === 'en' ? 'en-GB' : locale, { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(iso));
}
