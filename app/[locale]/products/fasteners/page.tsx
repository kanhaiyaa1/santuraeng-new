import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { buildAlternates, siteUrl } from '@/lib/seo';
import { SITE } from '@/lib/site';
import { btnPrimary } from '@/lib/ui';
import WhatsAppLink from '@/components/WhatsAppLink';
import ProductGallery from '@/components/products/ProductGallery';

type Props = { params: { locale: string } };
type TypeRow = { type: string; text: string };

// Fasteners are a SUPPLY line (sourced, not made by Santura). Copy must never call Santura a fastener manufacturer.
const SLUG = 'fasteners';
const PATH = `/products/${SLUG}`;
const IMG = '/images/fasteners';

// Photos from the old site's fastener pages (usage rights to be confirmed by the client; see docs/image-inventory.md).
// Alt texts: fsPage.gallery, same order.
const GALLERY = [
  `${IMG}/b7-studs/b7-stud-bolts-threaded-rods-alloy-steel.jpg`,
  `${IMG}/hex-bolts/hex-bolts-zinc-plated-group.jpg`,
  `${IMG}/general/hexagon-nuts-heavy-black-steel.jpg`,
  `${IMG}/general/flange-nuts-serrated-stainless-steel-a2.jpg`,
  `${IMG}/hex-bolts/hex-flange-bolt-zinc-plated.jpg`,
  `${IMG}/general/carriage-bolts-zinc-plated-pair.jpg`,
  `${IMG}/general/button-head-socket-bolts-black-oxide.jpg`,
  `${IMG}/general/assorted-fasteners-zinc-plated.jpg`
];

// Standards per row, same order as fsPage.bolts / nuts / washers. Codes are not translated.
// Brief standards that were wrong or unverifiable (e.g. IS 3063 for jam nuts, DIN 7380, ASTM A193 B8S for duplex) are left out.
const BOLT_STD = [
  'ASTM A307, A325 · ISO 4014/4017 · DIN 931/933 · IS 1363/1364',
  'ASTM A193 B7 / B7M with A194 2H / 2HM nuts',
  'Made to pipe size',
  'DIN 580 · ASTM A489',
  'DIN 6921',
  'DIN 603 · ASTM A307',
  'ISO 4762 · DIN 912 · DIN 7991 · ASTM A574 · IS 2269',
  'ISO 7380',
  'DIN 464 · to drawing',
  'DIN 608',
  'To drawing'
] as const;
const NUT_STD = [
  'ISO 4032 · DIN 934 · IS 1363/1364',
  'ASTM A194 2H / 2HM · DIN 6915',
  'ISO 4035 · DIN 439',
  'ISO 7040 / 10511 · DIN 982 / 985',
  'DIN 6923',
  'DIN 928 (square) · DIN 929 (hex)',
  'DIN 557',
  'DIN 1587',
  'DIN 582'
] as const;
const WASHER_STD = ['ISO 7089 · DIN 125 · ASTM F436 · IS 2016', 'DIN 127 · IS 3063', 'DIN 6797 / 6798', 'DIN 434 / 435 · IS 5372 / 5374'] as const;

// Grade codes per material, same order as fsPage.materials.
const MAT_GRADES = [
  'ASTM A307 Gr. A/B · ISO 898-1 Class 4.6–12.9',
  'ASTM A193 B7 / A194 2H',
  'ASTM A193 B7M / A194 2HM',
  'ASTM A193 B8 / A194 8',
  'ASTM A193 B8M / A194 8M',
  'ASTM A193 B8T / B8C',
  'UNS S31803 / S32205',
  'Alloy 600 (ASTM B166) · Alloy 625 (ASTM B446)',
  'Alloy 400 (ASTM B164) · K-500 (ASTM B865)',
  'Alloy C-276 (ASTM B574)'
] as const;

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'fsPage' });
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

export default async function FastenersPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'fsPage' });
  const categories = await getTranslations({ locale, namespace: 'productCategories' });
  const common = await getTranslations({ locale, namespace: 'common' });
  const nav = await getTranslations({ locale, namespace: 'nav' });
  const productPage = await getTranslations({ locale, namespace: 'productPage' });

  const faq = t.raw('faq') as { q: string; a: string }[];
  const gallery = t.raw('gallery') as string[];
  const materials = t.raw('materials') as { name: string; use: string }[];
  const ranges = t.raw('rangeRows') as { item: string; size: string; grade: string; finish: string }[];
  const applications = t.raw('applications') as { title: string; items: string[] }[];
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
      material: 'Carbon steel, alloy steel (B7), stainless steel, duplex, nickel alloys',
      seller: { '@type': 'Organization', name: SITE.legalName, url: siteUrl }
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
  const rowTh = 'px-4 py-3 text-start align-top text-sm font-semibold text-ink';
  const td = 'px-4 py-3 align-top text-sm leading-relaxed text-ink-body';
  const codeTd = 'px-4 py-3 align-top text-sm leading-relaxed text-ink-body';
  const textLink = 'inline-block text-sm font-semibold text-brand-500 hover:text-brand-600';
  const bullet = <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" aria-hidden="true" />;

  const typeTable = (title: string, rows: TypeRow[], std: readonly string[]) => (
    <div className="min-w-0">
      <h3 className="text-xl font-bold text-ink">{title}</h3>
      <div className="mt-4 overflow-x-auto rounded-lg border border-line">
        <table className="w-full min-w-[40rem] divide-y divide-line bg-white">
          <thead className="bg-surface-alt">
            <tr>
              <th scope="col" className={th}>{t('colType')}</th>
              <th scope="col" className={th}>{t('colDescription')}</th>
              <th scope="col" className={th}>{t('colStandards')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rows.map((r, i) => (
              <tr key={r.type}>
                <th scope="row" className={rowTh}>{r.type}</th>
                <td className={td}>{r.text}</td>
                <td className={codeTd}><span dir="ltr">{std[i]}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const related = [
    { href: '/refractory-anchors', name: categories('items.refractory-anchors.name'), text: t('relatedAnchors') },
    { href: '/products/steel-fibres', name: categories('items.steel-fibres.name'), text: t('relatedFibres') },
    { href: '/products/insulation-pins', name: categories('items.insulation-pins.name'), text: t('relatedPins') },
    { href: '/products/foundation-bolts', name: categories('items.foundation-bolts.name'), text: t('relatedFoundation') },
    { href: '/products/counter-weight-systems', name: categories('items.counter-weight-systems.name'), text: t('relatedCw') }
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

      {/* Hero */}
      <section className="border-b border-line bg-surface-alt">
        <div className="mx-auto grid max-w-6xl items-start gap-10 px-6 py-16 sm:py-20 lg:grid-cols-2">
          <div className="min-w-0">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-500">{t('eyebrow')}</p>
            <h1 className="mt-4 border-s-4 border-brand-500 ps-5 text-3xl font-bold tracking-tight text-ink sm:text-5xl">{t('h1')}</h1>
            <p className="mt-6 text-lg leading-relaxed text-ink-body">{t('subheading')}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {(t.raw('badges') as string[]).map((b) => (
                <li key={b} className="rounded-full border border-line bg-white px-3 py-1 text-sm text-ink">{b}</li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={rfqHref} className={btnPrimary}>{t('ctaRfq')}</Link>
              <WhatsAppLink>{common('whatsapp')}</WhatsAppLink>
            </div>
          </div>
          <div className="min-w-0">
            <ProductGallery images={GALLERY} alt={gallery[0]} alts={gallery} label={productPage('gallery')} />
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className={h2}>{t('overviewTitle')}</h2>
        <div className="mt-4 max-w-4xl space-y-4 leading-relaxed text-ink-body">
          {(t.raw('overview') as string[]).map((p) => <p key={p}>{p}</p>)}
        </div>
      </section>

      {/* Why source from Santura */}
      <section className="bg-surface-alt py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className={h2}>{t('whyTitle')}</h2>
          <ol className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {(t.raw('why') as { title: string; text: string }[]).map((w, i) => (
              <li key={w.title} className={card}>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-500 text-sm font-bold text-white" aria-hidden="true">{i + 1}</span>
                <h3 className="mt-4 font-bold text-ink">{w.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-body">{w.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Product range */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className={h2}>{t('rangeTitle')}</h2>
        <p className="mt-3 max-w-3xl text-ink-body">{t('rangeIntro')}</p>
        <div className="mt-8 grid gap-10">
          {typeTable(t('boltsTitle'), t.raw('bolts') as TypeRow[], BOLT_STD)}
          {typeTable(t('nutsTitle'), t.raw('nuts') as TypeRow[], NUT_STD)}
          {typeTable(t('washersTitle'), t.raw('washers') as TypeRow[], WASHER_STD)}
        </div>
      </section>

      {/* Standard sizes, grades and finishes */}
      <section className="bg-surface-alt py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className={h2}>{t('sizesTitle')}</h2>
          <p className="mt-3 max-w-3xl text-ink-body">{t('sizesIntro')}</p>
          <div className="mt-6 overflow-x-auto rounded-lg border border-line">
            <table className="w-full min-w-[44rem] divide-y divide-line bg-white">
              <thead className="bg-surface-alt">
                <tr>
                  <th scope="col" className={th}>{t('colProduct')}</th>
                  <th scope="col" className={th}>{t('colSize')}</th>
                  <th scope="col" className={th}>{t('colGrade')}</th>
                  <th scope="col" className={th}>{t('colFinish')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {ranges.map((r) => (
                  <tr key={r.item}>
                    <th scope="row" className={rowTh}>{r.item}</th>
                    <td className={td}>{r.size}</td>
                    <td className={td}>{r.grade}</td>
                    <td className={td}>{r.finish}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* B7 stud bolts: featured */}
      <section className="mx-auto max-w-6xl px-6 py-16" aria-labelledby="fs-b7">
        <div className="rounded-lg border border-line border-t-4 border-t-brand-500 bg-white p-6 sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-500">{t('b7Eyebrow')}</p>
          <h2 id="fs-b7" className={`mt-2 ${h2}`}>{t('b7Title')}</h2>
          <p className="mt-3 max-w-3xl text-ink-body">{t('b7Intro')}</p>
          <div className="mt-6 overflow-x-auto rounded-lg border border-line">
            <table className="w-full divide-y divide-line bg-white">
              <tbody className="divide-y divide-line">
                {(t.raw('b7Rows') as { label: string; value: string }[]).map((r) => (
                  <tr key={r.label}>
                    <th scope="row" className={`w-1/3 ${rowTh}`}>{r.label}</th>
                    <td className={td}>{r.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 border-s-2 border-brand-500 ps-3 text-sm text-ink-body">{t('b7Note')}</p>
        </div>
      </section>

      {/* Materials */}
      <section className="bg-surface-alt py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className={h2}>{t('materialsTitle')}</h2>
          <p className="mt-3 max-w-3xl text-ink-body">{t('materialsIntro')}</p>
          <div className="mt-6 overflow-x-auto rounded-lg border border-line">
            <table className="w-full min-w-[44rem] divide-y divide-line bg-white">
              <thead className="bg-surface-alt">
                <tr>
                  <th scope="col" className={th}>{t('colMaterial')}</th>
                  <th scope="col" className={th}>{t('colGrades')}</th>
                  <th scope="col" className={th}>{t('colUse')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {materials.map((m, i) => (
                  <tr key={m.name}>
                    <th scope="row" className={rowTh}>{m.name}</th>
                    <td className={codeTd}><span dir="ltr">{MAT_GRADES[i]}</span></td>
                    <td className={td}>{m.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Quality and documentation */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <h2 className={h2}>{t('qualityTitle')}</h2>
        <div className="mt-6 overflow-x-auto rounded-lg border border-line">
          <table className="w-full divide-y divide-line bg-white">
            <tbody className="divide-y divide-line">
              {(t.raw('qualityRows') as { label: string; value: string }[]).map((r) => (
                <tr key={r.label}>
                  <th scope="row" className={`w-1/3 ${rowTh}`}>{r.label}</th>
                  <td className={td}>{r.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Applications */}
      <section className="bg-surface-alt py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className={h2}>{t('applicationsTitle')}</h2>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {applications.map((a) => (
              <li key={a.title} className={card}>
                <h3 className="font-bold text-ink">{a.title}</h3>
                <ul className="mt-3 space-y-2">
                  {a.items.map((it) => (
                    <li key={it} className="flex gap-2 text-sm leading-relaxed text-ink-body">{bullet}<span>{it}</span></li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Related */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className={h2}>{t('relatedTitle')}</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {related.map((r) => (
            <Link key={r.href} href={r.href} className={`${card} block hover:border-brand-500`}>
              <span className="block font-bold text-ink">{r.name}</span>
              <span className="mt-2 block text-sm leading-relaxed text-ink-body">{r.text}</span>
              <span className={`mt-3 ${textLink}`}>→</span>
            </Link>
          ))}
        </div>
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
          <p className="mt-6 text-xs text-ink-muted">{t('trademarkNote')}</p>
        </div>
      </section>
    </main>
  );
}
