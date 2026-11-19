import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { buildAlternates } from '@/lib/seo';
import { PRODUCT_CATEGORIES, categoryHref } from '@/content/product-categories';

// Product category overview. The SEPL refractory anchor listing lives at /refractory-anchors.
type Props = { params: { locale: string } };

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'productCategories' });
  const alternates = buildAlternates('/products', locale);
  return {
    title: { absolute: t('overviewMetaTitle') },
    description: t('overviewMetaDescription'),
    alternates,
    openGraph: { title: t('overviewMetaTitle'), description: t('overviewMetaDescription'), url: alternates.canonical, locale, type: 'website' }
  };
}

export default async function ProductsOverviewPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'productCategories' });
  const nav = await getTranslations({ locale, namespace: 'nav' });

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: nav('home'), item: buildAlternates('/', locale).canonical },
        { '@type': 'ListItem', position: 2, name: nav('products'), item: buildAlternates('/products', locale).canonical }
      ]
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: PRODUCT_CATEGORIES.map((c, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: t(`items.${c.slug}.name`),
        url: buildAlternates(categoryHref(c), locale).canonical
      }))
    }
  ];

  return (
    <main className="bg-surface-alt pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="border-b border-line bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-500">{nav('products')}</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-ink sm:text-5xl">{t('overviewTitle')}</h1>
          <p className="mt-4 max-w-2xl text-lg text-ink-body">{t('overviewIntro')}</p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 pt-10">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCT_CATEGORIES.map((c) => (
            <li key={c.slug}>
              <Link
                href={categoryHref(c)}
                className={`flex h-full flex-col rounded-lg border bg-white p-5 transition hover:border-brand-500 hover:shadow-md ${
                  c.hasContent ? 'border-line border-s-4 border-s-brand-500' : 'border-line'
                }`}
              >
                <span className="flex items-start justify-between gap-3">
                  <span className="font-bold text-ink">{t(`items.${c.slug}.name`)}</span>
                  {!c.hasContent && <span className="shrink-0 text-xs text-ink-muted">{t('comingSoon')}</span>}
                </span>
                <span className="mt-2 text-sm leading-relaxed text-ink-body">{t(`items.${c.slug}.description`)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
