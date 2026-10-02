import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { buildAlternates, siteUrl } from '@/lib/seo';
import { SITE, whatsappUrl } from '@/lib/site';
import { PRODUCTS, getProduct, type Product } from '@/content/products';
import { alloySummary, imageAltKind, productTitle, relatedProducts, truncate } from '@/lib/products';
import ProductGallery from '@/components/products/ProductGallery';
import AlloyTable from '@/components/products/AlloyTable';

type Props = { params: { locale: string; slug: string } };

export const dynamicParams = false;

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

async function altFor(p: Product, locale: string) {
  const t = await getTranslations({ locale, namespace: 'productPage' });
  const title = productTitle(p);
  const alloys = alloySummary(p);
  const kind = imageAltKind(p);
  return alloys ? t(`imageAlt.${kind}`, { title, alloys }) : t(`imageAlt.${kind}Plain`, { title });
}

export async function generateMetadata({ params: { locale, slug } }: Props): Promise<Metadata> {
  const product = getProduct(slug);
  if (!product) return {};
  const t = await getTranslations({ locale, namespace: 'productPage' });
  const products = await getTranslations({ locale, namespace: 'products' });
  const title = productTitle(product);
  const kind = imageAltKind(product);
  const description = truncate(t(`metaDescription.${kind}`, { title, lining: products(`linings.${product.lining}`) }));
  const alternates = buildAlternates(`/products/${slug}`, locale);

  return {
    title: { absolute: t('metaTitle', { title }) },
    description,
    alternates,
    robots: product.comingSoon ? { index: false, follow: true } : undefined,
    openGraph: {
      title: t('metaTitle', { title }),
      description,
      url: alternates.canonical,
      locale,
      type: 'website',
      images: product.images[0] ? [{ url: product.images[0], alt: await altFor(product, locale) }] : undefined
    }
  };
}

export default async function ProductPage({ params: { locale, slug } }: Props) {
  const product = getProduct(slug);
  if (!product) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'productPage' });
  const tp = await getTranslations({ locale, namespace: 'products' });
  const nav = await getTranslations({ locale, namespace: 'nav' });
  const common = await getTranslations({ locale, namespace: 'common' });

  const title = productTitle(product);
  const alt = await altFor(product, locale);
  const related = relatedProducts(product);
  const pageUrl = buildAlternates(`/products/${slug}`, locale).canonical;
  const plainDescription = product.description
    .map((b) => (b.type === 'paragraph' ? b.text : b.items.join('; ')))
    .join(' ');

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: title,
      ...(product.code ? { sku: product.code, mpn: product.code } : {}),
      description: truncate(plainDescription || t('comingSoonText'), 500),
      image: product.images.map((src) => `${siteUrl}${src}`),
      category: tp(`linings.${product.lining}`),
      ...(alloySummary(product, 20) ? { material: alloySummary(product, 20) } : {}),
      brand: { '@type': 'Brand', name: 'Santura Engineering' },
      manufacturer: { '@type': 'Organization', name: SITE.legalName, url: siteUrl }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: nav('home'), item: buildAlternates('/', locale).canonical },
        { '@type': 'ListItem', position: 2, name: nav('products'), item: buildAlternates('/products', locale).canonical },
        { '@type': 'ListItem', position: 3, name: title, item: pageUrl }
      ]
    }
  ];

  const rfqHref = { pathname: '/rfq', query: { product: product.code ?? product.slug } } as const;

  return (
    <main className="bg-slate-50 pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="border-b border-slate-200 bg-white">
        <nav aria-label={t('breadcrumb')} className="mx-auto max-w-6xl px-6 py-3 text-sm text-slate-500">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-navy-700">{nav('home')}</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/products" className="hover:text-navy-700">{nav('products')}</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="font-medium text-navy-900">{title}</li>
          </ol>
        </nav>
      </div>

      <div className="mx-auto grid max-w-6xl gap-10 px-6 pt-10 lg:grid-cols-3">
        <article className="lg:col-span-2">
          <header>
            {product.code && <p className="text-sm font-semibold tracking-wide text-brand-500">{product.code}</p>}
            <h1 className="mt-1 text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">{title}</h1>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-navy-100 px-3 py-1 text-xs font-medium text-navy-700">{tp(`linings.${product.lining}`)}</span>
              <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-medium text-slate-700">{t(`sections.${product.section}`)}</span>
              {product.comingSoon && (
                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">{tp('comingSoon')}</span>
              )}
            </div>
          </header>

          <div className="mt-8">
            <ProductGallery images={product.images} alt={alt} label={t('gallery')} />
          </div>

          {product.comingSoon ? (
            <section className="mt-10 rounded-xl border border-amber-200 bg-amber-50 p-6">
              <h2 className="text-lg font-bold text-amber-900">{t('comingSoonTitle')}</h2>
              <p className="mt-2 text-amber-900/80">{t('comingSoonText')}</p>
            </section>
          ) : (
            <section className="mt-10" aria-labelledby="description-title">
              <h2 id="description-title" className="text-xl font-bold text-navy-900">{t('description')}</h2>
              {locale !== 'en' && <p className="mt-2 text-sm italic text-slate-500">{t('technicalEnglish')}</p>}
              <div lang="en" dir="ltr" className="mt-4 space-y-4 text-left leading-relaxed text-slate-700">
                {product.description.map((b, i) =>
                  b.type === 'paragraph' ? (
                    <p key={i}>{b.text}</p>
                  ) : (
                    <ul key={i} className="list-disc space-y-2 ps-6">
                      {b.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )
                )}
              </div>
            </section>
          )}

          <section className="mt-10">
            <dl className="grid gap-4 rounded-xl border border-slate-200 bg-white p-6 sm:grid-cols-3">
              {product.code && (
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">{t('code')}</dt>
                  <dd className="mt-1 font-semibold text-navy-900">{product.code}</dd>
                </div>
              )}
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">{t('lining')}</dt>
                <dd className="mt-1 font-semibold text-navy-900">{tp(`linings.${product.lining}`)}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">{t('section')}</dt>
                <dd className="mt-1 font-semibold text-navy-900">{t(`sections.${product.section}`)}</dd>
              </div>
            </dl>
          </section>

          {!product.comingSoon && (
            <section className="mt-10" aria-labelledby="alloys-title">
              <h2 id="alloys-title" className="text-xl font-bold text-navy-900">
                {product.material ? t('material') : t('alloys')}
              </h2>
              <div className="mt-4">
                <AlloyTable product={product} />
              </div>
              {(product.alloys.length > 0 || product.alloyTable.length > 0) && (
                <p className="mt-3 text-xs text-slate-500">
                  {t('alloyLegend')} · {t('otherAlloys')}
                </p>
              )}
            </section>
          )}

          <section className="mt-12 rounded-2xl bg-gradient-to-br from-navy-700 to-navy-900 p-8 text-white">
            <h2 className="text-2xl font-bold">{t('rfqTitle')}</h2>
            <p className="mt-2 text-navy-100">{t('rfqText', { title })}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={rfqHref} className="rounded-md bg-brand-500 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-600">
                {t('rfqButton')}
              </Link>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-[#25D366] px-6 py-3 text-sm font-semibold text-navy-950 hover:brightness-95"
              >
                {common('whatsapp')}
              </a>
            </div>
          </section>
        </article>

        {related.length > 0 && (
          <aside aria-labelledby="related-title" className="lg:col-span-1">
            <div className="rounded-xl border border-slate-200 bg-white p-5 lg:sticky lg:top-24">
              <h2 id="related-title" className="text-lg font-bold text-navy-900">{t('related')}</h2>
              <p className="text-sm text-slate-500">{tp(`linings.${product.lining}`)}</p>
              <ul className="mt-4 divide-y divide-slate-100">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link href={`/products/${r.slug}`} className="flex items-center gap-3 py-3 hover:text-navy-700">
                      <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md border border-slate-200 bg-white">
                        {r.images[0] && <Image src={r.images[0]} alt="" fill sizes="56px" className="object-contain p-1" />}
                      </span>
                      <span className="min-w-0">
                        {r.code && <span className="block text-xs font-semibold text-navy-600">{r.code}</span>}
                        <span className="block truncate text-sm font-medium text-navy-900">{r.name}</span>
                        {r.comingSoon && <span className="text-xs text-amber-700">{tp('comingSoon')}</span>}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        )}
      </div>
    </main>
  );
}
