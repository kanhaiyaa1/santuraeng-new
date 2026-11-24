import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { buildAlternates, siteUrl } from '@/lib/seo';
import { SITE } from '@/lib/site';
import { btnPrimary } from '@/lib/ui';
import WhatsAppLink from '@/components/WhatsAppLink';
import ProductGallery from '@/components/products/ProductGallery';

type Props = { params: { locale: string } };
type Item = { title: string; text: string };
type Drawn = Item & { key: string; alt: string; size?: string };

const SLUG = 'pipe-guides-sleeves';
const PATH = `/products/${SLUG}`;
const IMG = '/images/fabrication/pipe-guides';

// Workshop photos (old site pages "Pipe guides" and "Pipe Ring Sleeves"). Alt texts: pgPage.gallery, same order.
const GALLERY = [
  `${IMG}/pipe-guides-fired-heater-galvanized-batch.jpg`,
  `${IMG}/pipe-guide-fired-heater-flanged-cone.jpg`,
  `${IMG}/pipe-guides-fired-heater-galvanized-stock.jpg`,
  `${IMG}/pipe-ring-sleeves-stainless-steel-stock-wall.jpg`,
  `${IMG}/pipe-ring-sleeve-split-open-ss310.jpg`,
  `${IMG}/pipe-ring-sleeves-stainless-steel-marked-closeup.jpg`,
  `${IMG}/pipe-ring-sleeves-stainless-steel-stacked.jpg`,
  `${IMG}/pipe-ring-sleeves-stainless-steel-coiled.jpg`,
  `${IMG}/pipe-ring-sleeves-stainless-steel-nested.jpg`,
  `${IMG}/pipe-ring-sleeve-render.jpg`,
  `${IMG}/pipe-ring-sleeve-split-render.jpg`
];

// PLACEHOLDER IMAGES: line drawings for each guide and sleeve type, with descriptive alt text
// (pgPage.guides[].alt, pgPage.sleeves[].alt). Replace with photos when the client sends them.
const pipe = (y: number, r = 14) => <circle cx="60" cy={y} r={r} strokeWidth="4" />;
const DRAWINGS: Record<string, ReactNode> = {
  spider: (
    <>
      <circle cx="60" cy="50" r="32" strokeWidth="4" />
      {pipe(50)}
      <path d="M60 18 V36 M60 64 V82 M28 50 H46 M74 50 H92" strokeWidth="3" />
      <path d="M20 96 H100" strokeWidth="6" opacity="0.4" />
      <path d="M60 82 V96" strokeWidth="4" />
    </>
  ),
  ubolt: (
    <>
      {pipe(46, 18)}
      <path d="M38 88 V46 A22 22 0 0 1 82 46 V88" strokeWidth="4" />
      <rect x="22" y="80" width="76" height="8" fill="currentColor" stroke="none" />
      <path d="M14 96 H106" strokeWidth="6" opacity="0.4" />
    </>
  ),
  structural: (
    <>
      {pipe(52, 20)}
      <path d="M30 20 V88 M90 20 V88" strokeWidth="6" />
      <path d="M30 20 H44 M90 20 H76" strokeWidth="4" />
      <path d="M14 94 H106" strokeWidth="6" opacity="0.4" />
    </>
  ),
  slide: (
    <>
      {pipe(40, 20)}
      <path d="M44 60 H76 V72 H44 Z" strokeWidth="3" />
      <rect x="30" y="72" width="60" height="5" fill="currentColor" stroke="none" opacity="0.5" />
      <path d="M14 82 H106" strokeWidth="6" opacity="0.4" />
      <path d="M20 92 H36 M84 92 H100 M28 88 L20 92 L28 96 M92 88 L100 92 L92 96" strokeWidth="2" />
    </>
  ),
  tube: (
    <>
      <path d="M14 10 V96" strokeWidth="6" opacity="0.4" />
      <path d="M20 30 H96 M20 60 H96" strokeWidth="3" />
      {[30, 60].map((y) => [44, 76].map((x) => <circle key={`${x}-${y}`} cx={x} cy={y} r="9" strokeWidth="3" fill="white" />))}
      <path d="M96 20 V80" strokeWidth="5" />
    </>
  ),
  floor: (
    <>
      <rect x="10" y="40" width="40" height="22" fill="currentColor" stroke="none" opacity="0.2" />
      <rect x="70" y="40" width="40" height="22" fill="currentColor" stroke="none" opacity="0.2" />
      <path d="M50 34 V68 M70 34 V68" strokeWidth="4" />
      <path d="M56 8 V100 M64 8 V100" strokeWidth="3" />
    </>
  ),
  shell: (
    <>
      <path d="M30 8 V100" strokeWidth="6" opacity="0.4" />
      <path d="M16 40 H74 M16 66 H74" strokeWidth="4" />
      <rect x="22" y="32" width="6" height="42" fill="currentColor" stroke="none" />
      <path d="M8 50 H110 M8 56 H110" strokeWidth="2.5" />
    </>
  ),
  anchor: (
    <>
      <rect x="10" y="20" width="100" height="68" fill="currentColor" stroke="none" opacity="0.15" />
      <circle cx="60" cy="54" r="20" strokeWidth="5" fill="white" />
      <path d="M40 54 L24 40 M80 54 L96 40 M60 34 V22 M60 74 V86" strokeWidth="3" />
    </>
  )
};

function Drawing({ kind, label }: { kind: string; label: string }) {
  return (
    <svg viewBox="0 0 120 104" role="img" aria-label={label} className="h-full w-full text-brand-500" fill="none" stroke="currentColor">
      <title>{label}</title>
      {DRAWINGS[kind]}
    </svg>
  );
}

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'pgPage' });
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

export default async function PipeGuidesPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'pgPage' });
  const categories = await getTranslations({ locale, namespace: 'productCategories' });
  const services = await getTranslations({ locale, namespace: 'services' });
  const common = await getTranslations({ locale, namespace: 'common' });
  const nav = await getTranslations({ locale, namespace: 'nav' });
  const productPage = await getTranslations({ locale, namespace: 'productPage' });

  const faq = t.raw('faq') as { q: string; a: string }[];
  const gallery = t.raw('gallery') as string[];
  const specRows = t.raw('specRows') as { label: string; value: string }[];
  const pageUrl = buildAlternates(PATH, locale).canonical;
  const rfqHref = { pathname: '/rfq', query: { category: SLUG } } as const;

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: t('h1'),
      description: t('metaDescription'),
      url: pageUrl,
      image: GALLERY.slice(0, 6).map((src) => `${siteUrl}${src}`),
      category: categories(`items.${SLUG}.name`),
      material: 'IS 2062, ASTM A36, SS304, SS310, SS316, Alloy 800H, HK40',
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

  const related = [
    { href: '/products/support-plates', name: categories('items.support-plates.name'), text: t('relatedSupportPlates') },
    { href: '/products/foundation-bolts', name: categories('items.foundation-bolts.name'), text: t('relatedFoundationBolts') },
    { href: '/products/industrial-stanchions', name: categories('items.industrial-stanchions.name'), text: t('relatedStanchions') },
    { href: '/refractory-anchors', name: categories('items.refractory-anchors.name'), text: t('relatedAnchors') }
  ];
  const relatedServices = [
    ['pmi-testing', 'relatedPmiText'],
    ['pickling-and-passivation', 'relatedPpText'],
    ['stud-welding-solutions', 'relatedSwText']
  ] as const;

  const typeCards = (items: Drawn[], cols: string) => (
    <ul className={`mt-8 grid gap-5 sm:grid-cols-2 ${cols}`}>
      {items.map((d) => (
        <li key={d.key} className="rounded-lg border border-line border-t-4 border-t-brand-500 bg-white p-6">
          <div className="flex h-32 items-center justify-center rounded-md bg-surface-alt p-3">
            <Drawing kind={d.key} label={d.alt} />
          </div>
          <h3 className="mt-4 text-lg font-bold text-ink">{d.title}</h3>
          {d.size && <p className="mt-1 text-sm font-semibold text-brand-500">{d.size}</p>}
          <p className="mt-2 text-sm leading-relaxed text-ink-body">{d.text}</p>
        </li>
      ))}
    </ul>
  );

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
      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className={h2}>{t('overviewTitle')}</h2>
          <div className="mt-6 space-y-4 leading-relaxed text-ink-body">
            {(t.raw('overview') as string[]).map((p) => <p key={p}>{p}</p>)}
          </div>
        </div>
        <aside className="self-start rounded-lg border-s-4 border-brand-500 bg-surface-alt p-6">
          <h3 className="font-bold text-ink">{t('madeTitle')}</h3>
          <ul className="mt-3 space-y-3 text-sm leading-relaxed text-ink-body">
            {(t.raw('made') as string[]).map((m) => <li key={m}>{m}</li>)}
          </ul>
        </aside>
      </section>

      {/* Pipe guide types */}
      <section className="bg-surface-alt py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className={h2}>{t('guidesTitle')}</h2>
          {typeCards(t.raw('guides') as Drawn[], 'lg:grid-cols-3')}
        </div>
      </section>

      {/* Ring sleeve types */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className={h2}>{t('sleevesTitle')}</h2>
        {typeCards(t.raw('sleeves') as Drawn[], 'lg:grid-cols-3')}
      </section>

      {/* Materials */}
      <section className="bg-surface-alt py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className={h2}>{t('materialsTitle')}</h2>
          <dl className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {(t.raw('materials') as Item[]).map((m) => (
              <div key={m.title} className="rounded-lg border border-line border-s-2 border-s-brand-500 bg-white p-6">
                <dt className="font-bold text-ink">{m.title}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-ink-body">{m.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Specifications */}
      <section className="mx-auto max-w-4xl px-6 py-16">
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
      </section>

      {/* Applications */}
      <section className="bg-surface-alt py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className={h2}>{t('applicationsTitle')}</h2>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {(t.raw('applications') as Item[]).map((a) => (
              <li key={a.title} className={card}>
                <h3 className="font-bold text-ink">{a.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-body">{a.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* What we supply */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className={h2}>{t('supplyTitle')}</h2>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {(t.raw('supply') as Item[]).map((o) => (
            <li key={o.title} className="rounded-lg border border-line border-s-2 border-s-brand-500 bg-white p-6">
              <h3 className="font-bold text-ink">{o.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-body">{o.text}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Related products + services */}
      <section className="bg-surface-alt py-16">
        <div className="mx-auto max-w-6xl px-6">
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
          <h3 className="mt-12 text-lg font-bold text-ink">{t('servicesTitle')}</h3>
          <div className="mt-4 grid gap-5 md:grid-cols-3">
            {relatedServices.map(([slug, key]) => (
              <Link key={slug} href={`/services/${slug}`} className={`${card} block hover:border-brand-500`}>
                <span className="block font-bold text-ink">{services(`items.${slug}.name`)}</span>
                <span className="mt-2 block text-sm leading-relaxed text-ink-body">{t(key)}</span>
                <span className={`mt-3 ${textLink}`}>→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-6 py-16">
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
      </section>

      {/* CTA */}
      <section className="bg-surface-alt py-16">
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
