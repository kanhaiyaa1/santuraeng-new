import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { buildAlternates } from '@/lib/seo';
import { btnPrimary, btnSecondary } from '@/lib/ui';
import { PRODUCT_CATEGORIES, categoryHref, type ProductCategory } from '@/content/product-categories';

/** Metadata for a "Coming soon" category page: noindex until real content is added. */
export async function categoryMetadata(category: ProductCategory, locale: string): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'productCategories' });
  const name = t(`items.${category.slug}.name`);
  const alternates = buildAlternates(`/products/${category.slug}`, locale);
  return {
    title: { absolute: t('metaTitle', { name }) },
    description: t('metaDescription', { name }),
    alternates,
    robots: { index: false, follow: true }
  };
}

export default async function CategoryPlaceholder({ category, locale }: { category: ProductCategory; locale: string }) {
  const t = await getTranslations({ locale, namespace: 'productCategories' });
  const nav = await getTranslations({ locale, namespace: 'nav' });
  const productPage = await getTranslations({ locale, namespace: 'productPage' });
  const name = t(`items.${category.slug}.name`);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: nav('home'), item: buildAlternates('/', locale).canonical },
      { '@type': 'ListItem', position: 2, name: nav('products'), item: buildAlternates('/products', locale).canonical },
      { '@type': 'ListItem', position: 3, name, item: buildAlternates(`/products/${category.slug}`, locale).canonical }
    ]
  };

  return (
    <main className="bg-surface-alt pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="border-b border-line bg-white">
        <nav aria-label={productPage('breadcrumb')} className="mx-auto max-w-6xl px-6 py-3 text-sm text-ink-muted">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link href="/" className="hover:text-brand-500">{nav('home')}</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/products" className="hover:text-brand-500">{nav('products')}</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="font-medium text-ink">{name}</li>
          </ol>
        </nav>
      </div>

      <section className="border-b border-line bg-white">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <span className="rounded-full border border-line bg-surface-alt px-3 py-1 text-xs font-semibold text-ink-body">{t('comingSoon')}</span>
          <h1 className="mt-4 border-s-4 border-brand-500 ps-5 text-3xl font-bold tracking-tight text-ink sm:text-5xl">{name}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-ink-body">{t(`items.${category.slug}.description`)}</p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 pt-10">
        <section className="rounded-lg border border-line bg-white p-8">
          <h2 className="text-xl font-bold text-ink">{t('comingSoonTitle')}</h2>
          <p className="mt-2 max-w-2xl text-ink-body">{t('comingSoonText')}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href={{ pathname: '/rfq', query: { category: category.slug } }} className={btnPrimary}>{nav('rfq')}</Link>
            <Link href="/products" className={btnSecondary}>← {t('back')}</Link>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg font-bold text-ink">{t('otherCategories')}</h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCT_CATEGORIES.filter((c) => c.slug !== category.slug).map((c) => (
              <li key={c.slug}>
                <Link href={categoryHref(c)} className="block rounded-md border border-line bg-white px-4 py-3 text-sm font-semibold text-ink hover:border-brand-500 hover:text-brand-500">
                  {t(`items.${c.slug}.name`)}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
