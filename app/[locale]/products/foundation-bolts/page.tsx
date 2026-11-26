import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { buildAlternates, siteUrl } from '@/lib/seo';
import { PHASE1_COUNTRIES, SITE } from '@/lib/site';
import { getCountry } from '@/content/countries';
import { btnPrimary } from '@/lib/ui';
import WhatsAppLink from '@/components/WhatsAppLink';
import ProductGallery from '@/components/products/ProductGallery';

type Props = { params: { locale: string } };
type Item = { title: string; text: string };

const SLUG = 'foundation-bolts';
const PATH = `/products/${SLUG}`;
const IMG = '/images/fabrication/foundation-bolts';

// Workshop photos of Santura foundation bolts (old site page "Foundation bolts"). Alt texts: fbPage.gallery, same order.
const GALLERY = [
  `${IMG}/foundation-bolts-pipe-sleeves-galvanized-upright.jpg`,
  `${IMG}/foundation-bolts-anchor-plates-galvanized.jpg`,
  `${IMG}/foundation-bolts-pipe-sleeves-tagged.jpg`,
  `${IMG}/foundation-bolts-pipe-sleeves-galvanized-laid-out.jpg`,
  `${IMG}/foundation-bolts-galvanized-bulk-stock.jpg`,
  `${IMG}/foundation-bolts-pipe-sleeves-closeup.jpg`,
  `${IMG}/foundation-bolts-anchor-plates-pipe-sleeves-batch.jpg`
];

// Line drawings of each bolt type (no photos of L, J, U or all-thread bolts on file yet).
const thread = (x: number, y1: number, y2: number) =>
  Array.from({ length: Math.floor((y2 - y1) / 5) }, (_, i) => (
    <line key={`${x}-${i}`} x1={x - 4} y1={y1 + i * 5 + 3} x2={x + 4} y2={y1 + i * 5} strokeWidth="1.5" />
  ));
const nut = (x: number, y: number) => <rect x={x - 9} y={y} width="18" height="7" rx="1" fill="currentColor" stroke="none" />;

const DRAWINGS: Record<string, ReactNode> = {
  l: (
    <>
      <path d="M40 8 V100 H68" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      {thread(40, 8, 34)}
      {nut(40, 38)}
    </>
  ),
  j: (
    <>
      <path d="M40 8 V88 A14 14 0 0 0 68 88 V78" strokeWidth="5" strokeLinecap="round" />
      {thread(40, 8, 34)}
      {nut(40, 38)}
    </>
  ),
  u: (
    <>
      <path d="M24 8 V84 A16 16 0 0 0 56 84 V8" strokeWidth="5" strokeLinecap="round" />
      {thread(24, 8, 30)}
      {thread(56, 8, 30)}
      <rect x="10" y="34" width="60" height="6" fill="currentColor" stroke="none" opacity="0.35" />
    </>
  ),
  plate: (
    <>
      <path d="M40 8 V98" strokeWidth="5" strokeLinecap="round" />
      {thread(40, 8, 34)}
      {nut(40, 38)}
      <rect x="20" y="98" width="40" height="8" fill="currentColor" stroke="none" />
    </>
  ),
  rod: (
    <>
      <path d="M40 8 V108" strokeWidth="5" strokeLinecap="round" />
      {thread(40, 8, 108)}
      {nut(40, 22)}
      {nut(40, 90)}
    </>
  )
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'fbPage' });
  const alternates = buildAlternates(PATH, locale);
  const gallery = t.raw('gallery') as string[];
  return {
    title: { absolute: t('metaTitle') },
    description: t('metaDescription'),
    alternates,
    openGraph: {
      title: t('metaTitle'),
      description: t('metaDescription'),
      url: alternates.canonical,
      locale,
      type: 'website',
      images: [{ url: GALLERY[0], alt: gallery[0] }]
    }
  };
}

export default async function FoundationBoltsPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'fbPage' });
  const categories = await getTranslations({ locale, namespace: 'productCategories' });
  const countries = await getTranslations({ locale, namespace: 'countries' });
  const common = await getTranslations({ locale, namespace: 'common' });
  const nav = await getTranslations({ locale, namespace: 'nav' });
  const productPage = await getTranslations({ locale, namespace: 'productPage' });

  const faq = t.raw('faq') as { q: string; a: string }[];
  const types = t.raw('types') as { key: string; title: string; size: string; text: string; uses: string }[];
  const specRows = t.raw('specRows') as { label: string; value: string }[];
  const gallery = t.raw('gallery') as string[];
  const pageUrl = buildAlternates(PATH, locale).canonical;
  const rfqHref = { pathname: '/rfq', query: { category: SLUG } } as const;

  // One link per country page; Belgium and Canada have two language versions, prefer the visitor's language.
  const countryLinks = PHASE1_COUNTRIES.filter((c) => getCountry(c.slug)).filter((c, _, all) => {
    const same = all.filter((o) => o.slug === c.slug);
    return (same.find((o) => o.locale === locale) ?? same[0]) === c;
  });

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: t('h1'),
      description: t('metaDescription'),
      url: pageUrl,
      image: GALLERY.map((src) => `${siteUrl}${src}`),
      category: categories(`items.${SLUG}.name`),
      material: 'IS 2062, ASTM A36, ASTM F1554, ASTM A307, ASTM A193 B7, SS304, SS316',
      brand: { '@type': 'Brand', name: 'Santura Engineering' },
      manufacturer: { '@type': 'Organization', name: SITE.legalName, url: siteUrl }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } }))
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: nav('home'), item: buildAlternates('/', locale).canonical },
        { '@type': 'ListItem', position: 2, name: nav('products'), item: buildAlternates('/products', locale).canonical },
        { '@type': 'ListItem', position: 3, name: t('h1'), item: pageUrl }
      ]
    }
  ];

  const h2 = 'text-2xl font-bold tracking-tight text-ink sm:text-3xl';
  const card = 'rounded-lg border border-line bg-white p-6';
  const th = 'px-4 py-3 text-start text-xs font-semibold uppercase tracking-wide text-ink-muted';
  const textLink = 'inline-block text-sm font-semibold text-brand-500 hover:text-brand-600';
  const chip = 'inline-flex items-center gap-2 rounded-md border border-line bg-white px-3 py-1.5 text-sm text-ink hover:border-brand-500';

  const related = [
    { href: '/products/industrial-stanchions', name: categories('items.industrial-stanchions.name'), text: t('relatedStanchions') },
    { href: '/products/pipe-guides-sleeves', name: categories('items.pipe-guides-sleeves.name'), text: t('relatedPipeGuides') },
    { href: '/products/fasteners', name: categories('items.fasteners.name'), text: t('relatedFasteners') },
    { href: '/refractory-anchors', name: categories('items.refractory-anchors.name'), text: t('relatedAnchors') }
  ];

  return (
    <main className="bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="border-b border-line bg-white">
        <nav aria-label={productPage('breadcrumb')} className="mx-auto max-w-6xl px-6 py-3 text-sm text-ink-muted">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link href="/" className="hover:text-brand-500">{nav('home')}</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/products" className="hover:text-brand-500">{nav('products')}</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="font-medium text-ink">{t('h1')}</li>
          </ol>
        </nav>
      </div>

      {/* Hero with photo gallery */}
      <section className="border-b border-line bg-surface-alt">
        <div className="mx-auto grid max-w-6xl items-start gap-10 px-6 py-16 sm:py-20 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-500">{t('eyebrow')}</p>
            <h1 className="mt-4 border-s-4 border-brand-500 ps-5 text-3xl font-bold tracking-tight text-ink sm:text-5xl">{t('h1')}</h1>
            <p className="mt-6 text-lg leading-relaxed text-ink-body">{t('subheading')}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={rfqHref} className={btnPrimary}>{t('ctaRfq')}</Link>
              <WhatsAppLink>{common('whatsapp')}</WhatsAppLink>
            </div>
          </div>
          <ProductGallery images={GALLERY} alt={gallery[0]} alts={gallery} label={productPage('gallery')} />
        </div>
      </section>

      {/* Overview */}
      <section className="mx-auto max-w-4xl px-6 py-16">
        <h2 className={h2}>{t('overviewTitle')}</h2>
        <div className="mt-6 space-y-4 leading-relaxed text-ink-body">
          {(t.raw('overview') as string[]).map((p) => <p key={p}>{p}</p>)}
        </div>
      </section>

      {/* Types */}
      <section className="bg-surface-alt py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className={h2}>{t('typesTitle')}</h2>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {types.map((d) => (
              <li key={d.key} className="flex gap-5 rounded-lg border border-line border-t-4 border-t-brand-500 bg-white p-6">
                <svg viewBox="0 0 80 120" className="h-28 w-16 shrink-0 text-brand-500" fill="none" stroke="currentColor" aria-hidden="true">
                  {DRAWINGS[d.key]}
                </svg>
                <div className="min-w-0">
                  <h3 className="text-lg font-bold text-ink">{d.title}</h3>
                  {d.size && <p className="mt-1 text-sm font-semibold text-brand-500">{d.size}</p>}
                  <p className="mt-3 text-sm leading-relaxed text-ink-body">{d.text}</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{d.uses}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Materials and finishes */}
      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-2">
        <div>
          <h2 className={h2}>{t('materialsTitle')}</h2>
          <dl className="mt-6 divide-y divide-line rounded-lg border border-line">
            {(t.raw('materials') as Item[]).map((m) => (
              <div key={m.title} className="p-5">
                <dt className="font-bold text-ink" dir="auto">{m.title}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-ink-body">{m.text}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div>
          <h2 className={h2}>{t('finishesTitle')}</h2>
          <dl className="mt-6 divide-y divide-line rounded-lg border border-line">
            {(t.raw('finishes') as Item[]).map((f) => (
              <div key={f.title} className="p-5">
                <dt className="font-bold text-ink">{f.title}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-ink-body">{f.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Specifications */}
      <section className="bg-surface-alt py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className={h2}>{t('specTitle')}</h2>
          <div className="mt-6 overflow-x-auto rounded-lg border border-line">
            <table className="w-full min-w-[28rem] divide-y divide-line bg-white">
              <thead className="bg-surface-alt">
                <tr>
                  <th scope="col" className={th}>{t('colProperty')}</th>
                  <th scope="col" className={th}>{t('colRange')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {specRows.map((r) => (
                  <tr key={r.label}>
                    <th scope="row" className="w-1/3 px-4 py-3 text-start align-top text-sm font-semibold text-ink">{r.label}</th>
                    <td className="px-4 py-3 align-top text-sm leading-relaxed text-ink-body">{r.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 border-s-2 border-brand-500 ps-3 text-sm text-ink-body">{t('specNote')}</p>
        </div>
      </section>

      {/* Applications */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className={h2}>{t('applicationsTitle')}</h2>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {(t.raw('applications') as Item[]).map((a) => (
            <li key={a.title} className={card}>
              <h3 className="font-bold text-ink">{a.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-body">{a.text}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* What we supply */}
      <section className="bg-surface-alt py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className={h2}>{t('supplyTitle')}</h2>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {(t.raw('supply') as Item[]).map((o) => (
              <li key={o.title} className="rounded-lg border border-line border-s-2 border-s-brand-500 bg-white p-6">
                <h3 className="font-bold text-ink">{o.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-body">{o.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Related products + countries */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className={h2}>{t('relatedTitle')}</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {related.map((r) => (
            <Link key={r.href} href={r.href} className={`${card} block hover:border-brand-500`}>
              <span className="block font-bold text-ink">{r.name}</span>
              <span className="mt-2 block text-sm leading-relaxed text-ink-body">{r.text}</span>
              <span className={`mt-3 ${textLink}`}>→</span>
            </Link>
          ))}
        </div>

        <h3 className="mt-12 text-lg font-bold text-ink">{t('countriesTitle')}</h3>
        <p className="mt-2 max-w-3xl text-sm text-ink-body">{t('countriesText')}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {countryLinks.map((c) => (
            <li key={c.slug}>
              <Link href={`/${c.slug}`} locale={c.locale === locale ? undefined : c.locale} hrefLang={c.locale} className={chip}>
                <span className={`fi fi-${c.code.toLowerCase()} rounded-sm`} aria-hidden="true" />
                {countries(`names.${c.code}`)}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* FAQ */}
      <section className="bg-surface-alt py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className={h2}>{t('faqTitle')}</h2>
          <div className="mt-6 divide-y divide-line rounded-lg border border-line bg-white">
            {faq.map((f) => (
              <details key={f.q} className="group p-5 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-start justify-between gap-4 font-semibold text-ink">
                  {f.q}
                  <span className="mt-0.5 shrink-0 text-brand-500 transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                </summary>
                <p className="mt-3 leading-relaxed text-ink-body">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="rounded-lg border border-line border-s-4 border-s-brand-500 bg-white px-8 py-12 sm:px-12">
            <h2 className={h2}>{t('ctaTitle')}</h2>
            <p className="mt-3 max-w-2xl text-ink-body">{t('ctaText')}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={rfqHref} className={btnPrimary}>{t('ctaRfq')}</Link>
              <WhatsAppLink>{common('whatsapp')}</WhatsAppLink>
            </div>
            <Link href="/contact" className={`mt-5 ${textLink}`}>{t('ctaContact')} →</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
