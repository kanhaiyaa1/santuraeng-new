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
type Drawn = Item & { key: string; alt: string };

const SLUG = 'industrial-stanchions';
const PATH = `/products/${SLUG}`;
const IMG = '/images/fabrication/stanchions';

// Workshop photos of Santura stanchions (old site page "Industrial Stanchions"). Alt texts: stPage.gallery, same order.
const GALLERY = [
  `${IMG}/industrial-stanchions-galvanized-batch.jpg`,
  `${IMG}/industrial-stanchion-with-arms-galvanized.jpg`,
  `${IMG}/industrial-stanchion-base-plate-render.jpg`,
  `${IMG}/industrial-stanchion-tee-joint-weld-closeup.jpg`,
  `${IMG}/industrial-stanchion-galvanized-single.jpg`,
  `${IMG}/industrial-stanchions-galvanized-workshop-batch.jpg`
];

// PLACEHOLDER IMAGES: line drawings for each stanchion configuration and base type, with descriptive alt text
// (stPage.types[].alt, stPage.bases[].alt). Replace with photos when the client sends them.
const ball = (cx: number, cy: number) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="6" fill="currentColor" stroke="none" />;
const rail = (y: number) => <path key={`r${y}`} d={`M10 ${y} H110`} strokeWidth="2.5" opacity="0.4" />;
const post = (balls: number[]) => (
  <>
    <path d="M60 12 V104" strokeWidth="5" strokeLinecap="round" />
    {balls.map(rail)}
    {balls.map((y) => ball(60, y))}
    <rect x="46" y="104" width="28" height="5" fill="currentColor" stroke="none" />
  </>
);

const TYPE_DRAWINGS: Record<string, ReactNode> = {
  single: post([16]),
  double: post([16, 58]),
  three: post([16, 46, 76]),
  raked: (
    <>
      <path d="M60 12 V104" strokeWidth="5" strokeLinecap="round" />
      <path d="M12 44 L108 -4 M12 86 L108 38" strokeWidth="2.5" opacity="0.4" />
      {ball(60, 20)}
      {ball(60, 62)}
      <path d="M20 109 H46 V104 H74" strokeWidth="2" opacity="0.4" />
      <rect x="46" y="104" width="28" height="5" fill="currentColor" stroke="none" />
    </>
  )
};

const BASE_DRAWINGS: Record<string, ReactNode> = {
  flat: (
    <>
      <path d="M60 10 V86" strokeWidth="5" />
      <rect x="38" y="86" width="44" height="6" fill="currentColor" stroke="none" />
      <path d="M10 98 H110" strokeWidth="3" opacity="0.4" />
    </>
  ),
  side: (
    <>
      <path d="M30 6 V110" strokeWidth="8" opacity="0.4" />
      <rect x="34" y="52" width="6" height="36" fill="currentColor" stroke="none" />
      <path d="M40 70 H60 M60 10 V100" strokeWidth="5" />
    </>
  ),
  collar: (
    <>
      <path d="M60 10 V92" strokeWidth="5" />
      <rect x="51" y="68" width="18" height="24" strokeWidth="3" />
      <rect x="20" y="92" width="80" height="10" fill="currentColor" stroke="none" opacity="0.4" />
    </>
  ),
  cored: (
    <>
      <rect x="14" y="70" width="92" height="40" fill="currentColor" stroke="none" opacity="0.2" />
      <rect x="52" y="70" width="16" height="30" fill="currentColor" stroke="none" opacity="0.35" />
      <path d="M60 10 V96" strokeWidth="5" />
    </>
  ),
  angle: (
    <>
      <path d="M14 96 H92 V110" strokeWidth="6" opacity="0.4" />
      <path d="M60 10 V82" strokeWidth="5" />
      <path d="M48 82 H72 V96" strokeWidth="4" />
    </>
  )
};

function Drawing({ children, label, className }: { children: ReactNode; label: string; className: string }) {
  return (
    <svg viewBox="0 0 120 114" role="img" aria-label={label} className={className} fill="none" stroke="currentColor">
      <title>{label}</title>
      {children}
    </svg>
  );
}

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'stPage' });
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

export default async function StanchionsPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'stPage' });
  const categories = await getTranslations({ locale, namespace: 'productCategories' });
  const services = await getTranslations({ locale, namespace: 'services' });
  const common = await getTranslations({ locale, namespace: 'common' });
  const nav = await getTranslations({ locale, namespace: 'nav' });
  const productPage = await getTranslations({ locale, namespace: 'productPage' });

  const faq = t.raw('faq') as { q: string; a: string }[];
  const gallery = t.raw('gallery') as string[];
  const specRows = t.raw('specRows') as { label: string; value: string }[];
  const standards = t.raw('standards') as { code: string; text: string }[];
  const pageUrl = buildAlternates(PATH, locale).canonical;
  const rfqHref = { pathname: '/rfq', query: { category: SLUG } } as const;

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: t('h1'),
      description: t('metaDescription'),
      url: pageUrl,
      image: GALLERY.map((src) => `${siteUrl}${src}`),
      category: categories(`items.${SLUG}.name`),
      material: 'IS 2062, ASTM A36, SS304, SS316, aluminium',
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
    { href: '/products/pipe-guides-sleeves', name: categories('items.pipe-guides-sleeves.name'), text: t('relatedPipeGuides') }
  ];
  const relatedServices = [
    ['pmi-testing', 'relatedPmiText'],
    ['pickling-and-passivation', 'relatedPpText']
  ] as const;

  const list = (items: Item[]) => (
    <dl className="mt-6 divide-y divide-line rounded-lg border border-line bg-white">
      {items.map((m) => (
        <div key={m.title} className="p-5">
          <dt className="font-bold text-ink">{m.title}</dt>
          <dd className="mt-1 text-sm leading-relaxed text-ink-body">{m.text}</dd>
        </div>
      ))}
    </dl>
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
          <h3 className="font-bold text-ink">{t('weldedTitle')}</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-body">{t('weldedText')}</p>
        </aside>
      </section>

      {/* Stanchion configurations */}
      <section className="bg-surface-alt py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className={h2}>{t('typesTitle')}</h2>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {(t.raw('types') as Drawn[]).map((d) => (
              <li key={d.key} className="rounded-lg border border-line border-t-4 border-t-brand-500 bg-white p-6">
                <div className="flex h-36 items-center justify-center rounded-md bg-surface-alt p-3">
                  <Drawing label={d.alt} className="h-full w-full text-brand-500">{TYPE_DRAWINGS[d.key]}</Drawing>
                </div>
                <h3 className="mt-4 text-lg font-bold text-ink">{d.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-body">{d.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Base types */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className={h2}>{t('basesTitle')}</h2>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {(t.raw('bases') as Drawn[]).map((b) => (
            <li key={b.key} className={card}>
              <div className="flex h-28 items-center justify-center rounded-md bg-surface-alt p-3">
                <Drawing label={b.alt} className="h-full w-full text-brand-500">{BASE_DRAWINGS[b.key]}</Drawing>
              </div>
              <h3 className="mt-4 font-bold text-ink">{b.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-body">{b.text}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Specifications */}
      <section className="bg-surface-alt py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className={h2}>{t('specTitle')}</h2>
          <div className="mt-6 overflow-x-auto rounded-lg border border-line">
            <table className="w-full min-w-[28rem] divide-y divide-line bg-white">
              <thead className="bg-surface-alt">
                <tr>
                  <th scope="col" className={th}>{t('colSpec')}</th>
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

      {/* Materials and finishes */}
      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-2">
        <div>
          <h2 className={h2}>{t('materialsTitle')}</h2>
          {list(t.raw('materials') as Item[])}
        </div>
        <div>
          <h2 className={h2}>{t('finishesTitle')}</h2>
          {list(t.raw('finishes') as Item[])}
        </div>
      </section>

      {/* Compliance */}
      <section className="bg-surface-alt py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className={h2}>{t('standardsTitle')}</h2>
          <div className="mt-6 overflow-x-auto rounded-lg border border-line">
            <table className="w-full min-w-[28rem] divide-y divide-line bg-white">
              <thead className="bg-surface-alt">
                <tr>
                  <th scope="col" className={th}>{t('colStandard')}</th>
                  <th scope="col" className={th}>{t('colCovers')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {standards.map((s) => (
                  <tr key={s.code}>
                    <th scope="row" dir="ltr" className="whitespace-nowrap px-4 py-3 text-start align-top text-sm font-semibold text-ink">{s.code}</th>
                    <td className="px-4 py-3 align-top text-sm leading-relaxed text-ink-body">{s.text}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 border-s-2 border-brand-500 ps-3 text-sm text-ink-body">{t('standardsNote')}</p>
        </div>
      </section>

      {/* Components */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className={h2}>{t('componentsTitle')}</h2>
        <p className="mt-3 max-w-3xl text-ink-body">{t('componentsIntro')}</p>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {(t.raw('components') as Item[]).map((c) => (
            <li key={c.title} className="rounded-lg border border-line border-s-2 border-s-brand-500 bg-white p-5">
              <h3 className="font-bold text-ink">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-body">{c.text}</p>
            </li>
          ))}
        </ul>
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
          <div className="mt-6 grid gap-5 md:grid-cols-3">
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
            <Link href="/quality" className={`${card} block hover:border-brand-500`}>
              <span className="block font-bold text-ink">{nav('quality')}</span>
              <span className="mt-2 block text-sm leading-relaxed text-ink-body">{t('relatedQualityText')}</span>
              <span className={`mt-3 ${textLink}`}>→</span>
            </Link>
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
