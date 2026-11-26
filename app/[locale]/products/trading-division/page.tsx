import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { buildAlternates, siteUrl } from '@/lib/seo';
import { SITE } from '@/lib/site';
import { btnPrimary } from '@/lib/ui';
import WhatsAppLink from '@/components/WhatsAppLink';
import ProductGallery from '@/components/products/ProductGallery';
import GradeReference, { type GradeFamilyRow } from '@/components/products/GradeReference';

type Props = { params: { locale: string } };
type Row = { label: string; value: string };
type Section = { title: string; text: string; rows: Row[] };

// Trading Division = SUPPLY of mill-certified stainless steel sections (sourced from mills, not made by Santura).
// Copy must never say Santura manufactures or produces these sections.
const SLUG = 'trading-division';
const PATH = `/products/${SLUG}`;
const IMG = '/images/trading-division';

// Section ids, order and photos. Texts: tdPage.sections, same order.
// Bar, flat and angle photos come from the old site's trading page; usage rights to be confirmed (see docs/image-inventory.md).
const SECTIONS = [
  { id: 'wire-rod-coils', image: '/images/company/steel-wire-coil-bulk-storage-industrial-warehouse-santura.webp' },
  { id: 'hexagonal-bars', image: `${IMG}/stainless-steel-hexagonal-bright-bars.jpg` },
  { id: 'square-bars', image: `${IMG}/stainless-steel-square-bars.jpg` },
  { id: 'flat-bars', image: `${IMG}/stainless-steel-hrap-flat-bars.jpg` },
  { id: 'angles', image: `${IMG}/stainless-steel-hrap-angles.jpg` },
  { id: 'psq-bars', image: `${IMG}/stainless-steel-psq-pump-shaft-bars.jpg` },
  { id: 'hot-rolled-bars', image: `${IMG}/stainless-steel-hot-rolled-bars.jpg` }
] as const;
// Extra stock photos (wire rod coils, equal angle); alt texts follow the section alts in tdPage.gallery.
const EXTRA = [`${IMG}/stainless-steel-wire-rod-coils.jpg`, `${IMG}/stainless-steel-equal-angle-section.jpg`];
const GALLERY = [...SECTIONS.map((s) => s.image), ...EXTRA];
// Full-width banners unique to this page (stock images; usage rights to be confirmed). Alt: tdPage.heroAlt; the chrome
// "STAINLESS STEEL" lettering is decorative because the catalogue heading below it says the same.
const HERO_BANNER = `${IMG}/steelmaking-history-to-modern-steel-plant-banner.jpg`;
const CHROME_BANNER = `${IMG}/stainless-steel-chrome-text-banner.jpg`;

// Wire rod grades as listed on the old site (typo "d16L" corrected to 316L).
const WIRE_ROD_GRADES = {
  astm: '201, 202, 204Cu, 301, 302, 303, 304, 304Cu, 304HC, 304L, 304H, 310, 310S, 312, 314, 316, 316L, 316LN, 316Ti, 316LCu, 321, 410, 420, 430, 430L, 904L',
  en: '1.4301, 1.4306, 1.4307, 1.4310, 1.4401, 1.4404, 1.4567, 1.4841, 1.4842, 1.4541, 1.4845, 1.4570, 1.4571, 1.4578, 1.4597, 1.4362, 1.4370, 1.4016',
  electrode: 'ER304, ER304L, ER307, ER307Si, ER308, ER308L, ER308LSi, ER310, ER316, ER316L, ER316LSi, ER347, ER347Si, ER309L, ER430, ER420'
} as const;

// HRAP flat bars: width (mm) and thickness range (mm), from the old site.
const FLAT_SIZES = [
  ['25', '5–12'], ['30', '5–12'], ['32', '5–12'], ['35', '5–12'], ['40', '5–25'], ['45', '5–25'], ['50', '5–30'], ['55', '5–30'],
  ['60', '5–30'], ['65', '5–30'], ['70', '5–30'], ['75', '5–50'], ['80', '5–30'], ['90', '5–30'], ['100', '5–50']
] as const;

// HRAP equal angles: size (mm) and available thicknesses (mm), from the old site.
const ANGLE_SIZES = [
  ['20 × 20', '3'], ['25 × 25', '3, 4, 5, 6'], ['30 × 30', '3, 4, 5'], ['32 × 32', '3, 4, 5, 6'], ['35 × 35', '3, 4, 5'],
  ['38.1 × 38.1', '3.17, 4.76, 6.35'], ['40 × 40', '3, 4, 5, 6'], ['45 × 45', '3, 4, 5, 6'], ['50 × 50', '3, 4, 5, 6, 9.52'],
  ['60 × 60', '5, 6, 7, 8'], ['63 × 63', '5, 6, 9.52'], ['65 × 65', '5, 6, 7, 8'], ['70 × 70', '6, 7, 8, 9, 10'], ['75 × 75', '6, 7, 8, 9, 10, 12']
] as const;

const HOT_ROLLED_SIZES =
  '13, 14, 16, 17, 18, 18.5, 20, 20.5, 22, 22.5, 23, 24, 25, 26, 28, 30, 32, 33.5, 34, 36, 37.5, 40, 42, 45, 47, 50, 53, 56, 58, 60, 63, 65, 68, 70, 73, 75, 78, 80, 83, 85, 90, 100, 105, 118, 130, 140, 150';

// Marketplace listings found in the old site's structured data. TradeIndia: only a product listing is known, not a company profile.
const EXTERNAL = [
  { key: 'indiamart', href: 'https://www.indiamart.com/santuraengineering/' },
  { key: 'tradeindia', href: 'https://www.tradeindia.com/products/refractory-anchors-339292.html' }
] as const;

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'tdPage' });
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
      images: [{ url: GALLERY[1], alt: gallery[1] }]
    }
  };
}

export default async function TradingDivisionPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'tdPage' });
  const categories = await getTranslations({ locale, namespace: 'productCategories' });
  const common = await getTranslations({ locale, namespace: 'common' });
  const nav = await getTranslations({ locale, namespace: 'nav' });
  const productPage = await getTranslations({ locale, namespace: 'productPage' });

  const faq = t.raw('faq') as { q: string; a: string }[];
  const gallery = t.raw('gallery') as string[];
  const sections = t.raw('sections') as Section[];
  const gradeRows = t.raw('gradeRows') as GradeFamilyRow[];
  const markets = t.raw('markets') as { region: string; text: string }[];
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
      material: 'Stainless steel (200, 300 and 400 series)',
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
  const textLink = 'inline-block text-sm font-semibold text-brand-500 hover:text-brand-600';
  const bullet = <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" aria-hidden="true" />;

  const related = [
    { href: '/refractory-anchors', name: categories('items.refractory-anchors.name'), text: t('relatedAnchors') },
    { href: '/products/steel-fibres', name: categories('items.steel-fibres.name'), text: t('relatedFibres') },
    { href: '/products/fasteners', name: categories('items.fasteners.name'), text: t('relatedFasteners') },
    { href: '/products/insulation-accessories', name: categories('items.insulation-accessories.name'), text: t('relatedAccessories') }
  ];

  const specTable = (rows: Row[]) => (
    <div className="mt-6 overflow-x-auto rounded-lg border border-line">
      <table className="w-full divide-y divide-line bg-white">
        <tbody className="divide-y divide-line">
          {rows.map((r) => (
            <tr key={r.label}>
              <th scope="row" className={`w-2/5 ${rowTh}`}>{r.label}</th>
              <td className={td}>{r.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const sizeTable = (cols: [string, string], rows: readonly (readonly [string, string])[]) => (
    <div className="mt-6 overflow-x-auto rounded-lg border border-line">
      <table className="w-full min-w-[20rem] divide-y divide-line bg-white">
        <thead className="bg-surface-alt">
          <tr>
            <th scope="col" className={th}>{cols[0]}</th>
            <th scope="col" className={th}>{cols[1]}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {rows.map(([a, b]) => (
            <tr key={a}>
              <th scope="row" dir="ltr" className={`whitespace-nowrap text-start ${rowTh}`}>{a}</th>
              <td className={td}><span dir="ltr">{b}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // Extra content below the spec table, per section id.
  const extra: Partial<Record<(typeof SECTIONS)[number]['id'], JSX.Element>> = {
    'wire-rod-coils': (
      <div className="mt-6 rounded-lg border border-line bg-white p-6">
        <h4 className="font-bold text-ink">{t('wireGradesTitle')}</h4>
        <dl className="mt-3 space-y-3 text-sm leading-relaxed text-ink-body">
          <div><dt className="font-semibold text-ink">{t('wireGradesAstm')}</dt><dd dir="ltr" className="text-start">{WIRE_ROD_GRADES.astm}</dd></div>
          <div><dt className="font-semibold text-ink">{t('wireGradesEn')}</dt><dd dir="ltr" className="text-start">{WIRE_ROD_GRADES.en}</dd></div>
          <div><dt className="font-semibold text-ink">{t('wireGradesElectrode')}</dt><dd dir="ltr" className="text-start">{WIRE_ROD_GRADES.electrode}</dd></div>
        </dl>
        <p className="mt-3 text-sm text-ink-muted">{t('wireGradesNote')}</p>
      </div>
    ),
    'flat-bars': sizeTable([t('colWidth'), t('colThicknessRange')], FLAT_SIZES),
    angles: sizeTable([t('colAngleSize'), t('colAngleThickness')], ANGLE_SIZES),
    'hot-rolled-bars': (
      <div className="mt-6 rounded-lg border border-line bg-white p-6">
        <h4 className="font-bold text-ink">{t('hotRolledSizesTitle')}</h4>
        <p dir="ltr" className="mt-2 text-start text-sm leading-relaxed text-ink-body">{HOT_ROLLED_SIZES}</p>
      </div>
    )
  };

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

      {/* Full-width banner hero (layout unique to this page) */}
      <div className="relative h-44 w-full overflow-hidden border-b border-line sm:h-64 lg:h-auto lg:aspect-[4/1]">
        <Image src={HERO_BANNER} alt={t('heroAlt')} fill priority sizes="100vw" className="object-cover object-[72%_center] lg:object-center" />
      </div>

      {/* Hero card, overlapping the banner */}
      <section className="relative px-4 sm:px-6">
        <div className="mx-auto -mt-10 max-w-6xl rounded-lg border border-line border-t-4 border-t-brand-500 bg-white p-6 shadow-sm sm:-mt-20 sm:p-10">
          <div className="grid gap-10 lg:grid-cols-3">
            <div className="min-w-0 lg:col-span-2">
              <p className="text-sm font-semibold uppercase tracking-wider text-brand-500">{t('eyebrow')}</p>
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-5xl">{t('h1')}</h1>
              <p className="mt-5 text-lg leading-relaxed text-ink-body">{t('subheading')}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={rfqHref} className={btnPrimary}>{t('ctaRfq')}</Link>
                <WhatsAppLink>{common('whatsapp')}</WhatsAppLink>
              </div>
            </div>
            <ul className="min-w-0 space-y-3 border-line lg:border-s lg:ps-8">
              {(t.raw('badges') as string[]).map((b) => (
                <li key={b} className="flex items-center gap-3 text-ink">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-500" aria-hidden="true">
                    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M3 8.5l3 3 7-7" /></svg>
                  </span>
                  <span className="font-medium">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Overview + photo gallery */}
      <section className="mx-auto grid max-w-6xl items-start gap-10 px-6 py-16 lg:grid-cols-2">
        <div className="min-w-0">
          <h2 className={h2}>{t('overviewTitle')}</h2>
          <div className="mt-4 space-y-4 leading-relaxed text-ink-body">
            {(t.raw('overview') as string[]).map((p) => <p key={p}>{p}</p>)}
          </div>
        </div>
        <div className="min-w-0">
          <ProductGallery images={GALLERY} alt={gallery[0]} alts={gallery} label={productPage('gallery')} />
        </div>
      </section>

      {/* Chrome "STAINLESS STEEL" banner, full width, opening the catalogue */}
      <div className="border-y border-line bg-white px-4 py-6 sm:py-8">
        <div className="relative mx-auto aspect-[960/130] w-full max-w-4xl">
          <Image src={CHROME_BANNER} alt="" fill sizes="(min-width: 896px) 896px, 100vw" className="object-contain" />
        </div>
      </div>

      {/* Catalogue: sticky index (desktop) + product sections with wide image headers */}
      <div className="mx-auto max-w-6xl px-6 py-16 lg:grid lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-12">
        <nav aria-label={t('jumpLabel')} className="min-w-0 lg:sticky lg:top-24 lg:self-start">
          <p className="hidden text-xs font-semibold uppercase tracking-wider text-ink-muted lg:block">{t('jumpLabel')}</p>
          <ol className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-2 lg:mx-0 lg:mt-4 lg:block lg:space-y-1 lg:overflow-visible lg:px-0 lg:pb-0">
            {SECTIONS.map((s, i) => (
              <li key={s.id} className="shrink-0">
                <a
                  href={`#${s.id}`}
                  className="flex items-center gap-3 whitespace-nowrap rounded-md border border-line px-3 py-2 text-sm text-ink hover:border-brand-500 hover:text-brand-500 lg:whitespace-normal lg:border-0 lg:border-s-2 lg:border-line lg:rounded-none lg:py-1.5"
                >
                  <span className="font-mono text-xs text-brand-500">{String(i + 1).padStart(2, '0')}</span>
                  <span>{sections[i]?.title}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="mt-10 min-w-0 space-y-16 lg:mt-0">
          {SECTIONS.map((s, i) => {
            const sec = sections[i];
            if (!sec) return null;
            return (
              <section key={s.id} id={s.id} aria-labelledby={`${s.id}-title`} className="scroll-mt-24">
                <div className="relative aspect-[21/9] overflow-hidden rounded-lg border border-line bg-surface-alt">
                  <Image src={s.image} alt={gallery[i] ?? sec.title} fill sizes="(min-width: 1024px) 800px, 100vw" className="object-cover" />
                  <span className="absolute start-4 top-4 rounded-md bg-white px-2.5 py-1 font-mono text-sm font-semibold text-brand-500 shadow-sm">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 id={`${s.id}-title`} className="mt-6 text-2xl font-bold tracking-tight text-ink">{sec.title}</h3>
                <p className="mt-3 leading-relaxed text-ink-body">{sec.text}</p>
                {specTable(sec.rows)}
                {extra[s.id]}
              </section>
            );
          })}
        </div>
      </div>

      {/* Grade reference (reusable component) */}
      <section className="mx-auto max-w-6xl border-t border-line px-6 py-16">
        <GradeReference
          title={t('gradesTitle')}
          intro={t('gradesIntro')}
          note={t('gradesNote')}
          colFamily={t('colFamily')}
          colGrades={t('colGrades')}
          colProperties={t('colProperties')}
          rows={gradeRows}
        />
      </section>

      {/* Markets */}
      <section className="bg-surface-alt py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className={h2}>{t('marketsTitle')}</h2>
          <p className="mt-3 max-w-3xl text-ink-body">{t('marketsIntro')}</p>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {markets.map((m) => (
              <li key={m.region} className={card}>
                <h3 className="font-bold text-ink">{m.region}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-body">{m.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Applications */}
      <section className="mx-auto max-w-6xl px-6 py-16">
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
      </section>

      {/* Why source + find us on */}
      <section className="bg-surface-alt py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-3">
          <div className="min-w-0 lg:col-span-2">
            <h2 className={h2}>{t('whyTitle')}</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {(t.raw('why') as string[]).map((w) => (
                <li key={w} className="flex gap-3 leading-relaxed text-ink-body">{bullet}<span>{w}</span></li>
              ))}
            </ul>
          </div>
          <aside className="min-w-0 rounded-lg border border-line bg-white p-6" aria-labelledby="td-find">
            <h2 id="td-find" className="text-lg font-bold text-ink">{t('findTitle')}</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-body">{t('findText')}</p>
            <ul className="mt-4 space-y-2">
              {EXTERNAL.map((e) => (
                <li key={e.key}>
                  <a href={e.href} target="_blank" rel="noopener noreferrer" className={textLink}>
                    {t(`find.${e.key}`)} ↗<span className="sr-only"> {t('newTab')}</span>
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      {/* Related */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className={h2}>{t('relatedTitle')}</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
        </div>
      </section>
    </main>
  );
}
