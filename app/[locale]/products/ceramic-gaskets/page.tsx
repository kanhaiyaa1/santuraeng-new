import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { buildAlternates, siteUrl } from '@/lib/seo';
import { SITE } from '@/lib/site';
import { getProduct } from '@/content/products';
import { btnPrimary } from '@/lib/ui';
import WhatsAppLink from '@/components/WhatsAppLink';
import ProductGallery from '@/components/products/ProductGallery';

type Props = { params: { locale: string } };

const SLUG = 'ceramic-gaskets';
const PATH = `/products/${SLUG}`;
const IMG = '/images/insulation/ceramic-gaskets';
const SEPL24 = getProduct('sepl-24-fiber-stud-anchors');

// Photos from the old site's Gaskets page: industrial (non-ceramic) gaskets only. No ceramic fibre rope, tape or
// tadpole photos on file yet; usage rights to be confirmed by the client. Alt texts: cgPage.gallery, same order.
const GALLERY = [
  `${IMG}/industrial-gaskets-assorted-spiral-wound.jpg`,
  `${IMG}/non-asbestos-gaskets-flange.jpg`,
  `${IMG}/gasket-sheet-black.jpg`
];

// Ready-cut compressed fibre gasket dimensions (mm) from the old site's Gaskets page (ASME B16.21 pattern).
const CLASSES = ['150', '300', '400', '600', '900'] as const;
const DIMENSIONS: { nps: string; id: string; od: (string | null)[] }[] = [
  { nps: '1/2"', id: '21.4', od: ['47.6', '54.0', '54.0', '54.0', '63.5'] },
  { nps: '3/4"', id: '27.0', od: ['57.2', '66.7', '66.7', '66.7', '69.9'] },
  { nps: '1"', id: '33.3', od: ['66.7', '73.0', '73.0', '73.0', '79.4'] },
  { nps: '1-1/4"', id: '42.1', od: ['76.2', '82.6', '82.6', '82.6', '88.9'] },
  { nps: '1-1/2"', id: '48.4', od: ['85.7', '95.3', '95.3', '95.3', '98.0'] },
  { nps: '2"', id: '60.3', od: ['104.8', '111.1', '111.1', '111.1', '142.0'] },
  { nps: '2-1/2"', id: '73.0', od: ['123.8', '130.2', '130.2', '130.2', '165.0'] },
  { nps: '3"', id: '88.9', od: ['136.5', '149.2', '149.2', '149.2', '168.0'] },
  { nps: '3-1/2"', id: '101.6', od: ['161.9', '165.1', '161.9', '161.9', null] },
  { nps: '4"', id: '114.3', od: ['174.6', '181.0', '177.8', '193.7', '206.0'] }
];

const STANDARDS = ['ASTM C892', 'ISO 10635', 'EN 1094-1', 'ASME B16.20', 'ASME B16.21', 'DIN 28091'] as const;

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'cgPage' });
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

export default async function CeramicGasketsPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'cgPage' });
  const categories = await getTranslations({ locale, namespace: 'productCategories' });
  const common = await getTranslations({ locale, namespace: 'common' });
  const nav = await getTranslations({ locale, namespace: 'nav' });
  const productPage = await getTranslations({ locale, namespace: 'productPage' });

  const faq = t.raw('faq') as { q: string; a: string }[];
  const gallery = t.raw('gallery') as string[];
  const ceramic = t.raw('ceramic') as { name: string; text: string; sizes: string }[];
  const conventional = t.raw('conventional') as { name: string; material: string; temp: string; text: string }[];
  const specs = t.raw('specRows') as { label: string; value: string }[];
  const standards = t.raw('standards') as string[];
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
      material: 'Ceramic fibre (alumino-silicate), non-asbestos fibre, PTFE, flexible graphite, stainless steel',
      brand: { '@type': 'Brand', name: 'Santura Engineering' },
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
  const td = 'px-4 py-3 align-top text-sm leading-relaxed text-ink-body';
  const textLink = 'inline-block text-sm font-semibold text-brand-500 hover:text-brand-600';
  const bullet = <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" aria-hidden="true" />;

  const related = [
    { href: '/products/mineral-wool', name: categories('items.mineral-wool.name'), text: t('relatedMineralWool') },
    { href: '/products/insulation-pins', name: categories('items.insulation-pins.name'), text: t('relatedPins') },
    { href: '/refractory-anchors', name: categories('items.refractory-anchors.name'), text: t('relatedAnchors') },
    ...(SEPL24 ? [{ href: `/products/${SEPL24.slug}`, name: `${SEPL24.code} ${SEPL24.name}`, text: t('relatedSepl24') }] : []),
    { href: '/products/observation-peep-doors', name: categories('items.observation-peep-doors.name'), text: t('relatedDoors') }
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

      {/* Ceramic fibre products */}
      <section className="bg-surface-alt py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className={h2}>{t('ceramicTitle')}</h2>
          <p className="mt-3 max-w-3xl text-ink-body">{t('ceramicIntro')}</p>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {ceramic.map((c) => (
              <li key={c.name} className="flex flex-col rounded-lg border border-line border-t-4 border-t-brand-500 bg-white p-6">
                <h3 className="font-bold text-ink">{c.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-body">{c.text}</p>
                <p className="mt-4 border-t border-line pt-3 text-xs font-semibold text-brand-500">{c.sizes}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Conventional gaskets */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className={h2}>{t('convTitle')}</h2>
        <p className="mt-3 max-w-3xl text-ink-body">{t('convIntro')}</p>
        <div className="mt-6 overflow-x-auto rounded-lg border border-line">
          <table className="w-full min-w-[44rem] divide-y divide-line bg-white">
            <thead className="bg-surface-alt">
              <tr>
                <th scope="col" className={th}>{t('colType')}</th>
                <th scope="col" className={th}>{t('colMaterial')}</th>
                <th scope="col" className={th}>{t('colMaxTemp')}</th>
                <th scope="col" className={th}>{t('colUse')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {conventional.map((c) => (
                <tr key={c.name}>
                  <th scope="row" className="px-4 py-3 text-start align-top text-sm font-semibold text-ink">{c.name}</th>
                  <td className={td}>{c.material}</td>
                  <td className={`${td} whitespace-nowrap`}>{c.temp}</td>
                  <td className={td}>{c.text}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Specifications */}
      <section className="bg-surface-alt py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className={h2}>{t('specTitle')}</h2>
          <div className="mt-6 overflow-x-auto rounded-lg border border-line">
            <table className="w-full min-w-[28rem] divide-y divide-line bg-white">
              <tbody className="divide-y divide-line">
                {specs.map((r) => (
                  <tr key={r.label}>
                    <th scope="row" className="w-1/3 px-4 py-3 text-start align-top text-sm font-semibold text-ink">{r.label}</th>
                    <td className={td}>{r.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 border-s-2 border-brand-500 ps-3 text-sm text-ink-body">{t('specNote')}</p>
        </div>
      </section>

      {/* Ready-cut gasket dimensions */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <h2 className={h2}>{t('dimTitle')}</h2>
        <p className="mt-3 max-w-3xl text-ink-body">{t('dimIntro')}</p>
        <div className="mt-6 overflow-x-auto rounded-lg border border-line" dir="ltr">
          <table className="w-full min-w-[40rem] divide-y divide-line bg-white text-sm">
            <thead className="bg-surface-alt">
              <tr>
                <th scope="col" rowSpan={2} className={th}>{t('colNps')}</th>
                <th scope="col" rowSpan={2} className={th}>{t('colId')}</th>
                <th scope="colgroup" colSpan={CLASSES.length} className={`${th} text-center`}>{t('colOd')}</th>
              </tr>
              <tr>
                {CLASSES.map((c) => (
                  <th key={c} scope="col" className={th}>{t('colClass', { cls: c })}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line tabular-nums">
              {DIMENSIONS.map((r) => (
                <tr key={r.nps}>
                  <th scope="row" className="whitespace-nowrap px-4 py-2.5 text-start font-semibold text-ink">{r.nps}</th>
                  <td className="px-4 py-2.5 text-ink-body">{r.id}</td>
                  {r.od.map((v, i) => (
                    <td key={CLASSES[i]} className="px-4 py-2.5 text-ink-body">{v ?? '–'}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 border-s-2 border-brand-500 ps-3 text-sm text-ink-body">{t('dimNote')}</p>
      </section>

      {/* Standards */}
      <section className="bg-surface-alt py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className={h2}>{t('standardsTitle')}</h2>
          <div className="mt-6 overflow-hidden rounded-lg border border-line">
            <table className="w-full divide-y divide-line bg-white">
              <tbody className="divide-y divide-line">
                {STANDARDS.map((code, i) => (
                  <tr key={code}>
                    <th scope="row" dir="ltr" className="whitespace-nowrap px-4 py-3 text-start align-top text-sm font-semibold text-ink">{code}</th>
                    <td className="px-4 py-3 align-top text-sm text-ink-body">{standards[i]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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

      {/* What we supply */}
      <section className="bg-surface-alt py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className={h2}>{t('supplyTitle')}</h2>
          <div className="mt-6 space-y-4 leading-relaxed text-ink-body">
            {(t.raw('supply') as string[]).map((p) => <p key={p}>{p}</p>)}
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className={h2}>{t('relatedTitle')}</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
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
