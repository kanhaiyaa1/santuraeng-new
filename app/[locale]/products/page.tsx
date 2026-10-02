import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { buildAlternates } from '@/lib/seo';
import { LINING_ORDER, PRODUCTS } from '@/content/products';
import { LINING_ANCHOR } from '@/lib/products';
import ProductCard from '@/components/products/ProductCard';
import ProductFilter, { type FilterGroup } from '@/components/products/ProductFilter';

type Props = { params: { locale: string } };

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'products.meta' });
  const alternates = buildAlternates('/products', locale);

  return {
    title: { absolute: t('title') },
    description: t('description'),
    alternates,
    openGraph: { title: t('title'), description: t('description'), url: alternates.canonical, locale, type: 'website' }
  };
}

const CATEGORY_INTRO_KEYS = { brick: 'brick', castable: 'castable', double: 'double', ceramic: 'ceramic' } as const;

export default async function ProductsPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'products' });
  const categories = await getTranslations({ locale, namespace: 'categories' });
  const nav = await getTranslations({ locale, namespace: 'nav' });

  const groups: FilterGroup[] = LINING_ORDER.map((lining) => {
    const items = PRODUCTS.filter((p) => p.lining === lining);
    const intro =
      lining === 'washers' || lining === 'fibres'
        ? t(`liningIntro.${lining}`)
        : categories(`items.${CATEGORY_INTRO_KEYS[lining]}.description`);
    return {
      key: lining,
      anchor: LINING_ANCHOR[lining],
      label: t(`linings.${lining}`),
      intro,
      count: items.length,
      content: (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((p) => (
            <li key={p.slug}>
              <ProductCard product={p} />
            </li>
          ))}
        </ul>
      )
    };
  });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: nav('home'), item: buildAlternates('/', locale).canonical },
      { '@type': 'ListItem', position: 2, name: nav('products'), item: buildAlternates('/products', locale).canonical }
    ]
  };

  return (
    <main className="bg-slate-50 pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="bg-navy-950 text-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <p className="text-sm font-semibold tracking-wide text-brand-500">{t('eyebrow')}</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">{t('title')}</h1>
          <p className="mt-4 max-w-2xl text-lg text-navy-100">{t('intro')}</p>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-6 pt-10">
        <ProductFilter groups={groups} allLabel={t('all')} filterLabel={t('filterLabel')} />
      </div>
    </main>
  );
}

