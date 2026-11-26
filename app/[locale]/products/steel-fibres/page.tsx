import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { buildAlternates, siteUrl } from '@/lib/seo';
import { SITE } from '@/lib/site';
import { btnPrimary } from '@/lib/ui';
import { PRODUCTS } from '@/content/products';
import WhatsAppLink from '@/components/WhatsAppLink';
import ProductGallery from '@/components/products/ProductGallery';

type Props = { params: { locale: string } };
type TypeCard = { name: string; process: string; text: string };

const SLUG = 'steel-fibres';
const PATH = `/products/${SLUG}`;

// Umbrella page for SEPL-27 to 30. Each fibre keeps its own product page; this page summarises and compares.
const FIBRES = PRODUCTS.filter((p) => p.lining === 'fibres');

// Product photos already used on the SEPL pages. Alt texts: sfPage.gallery, same order.
const GALLERY = FIBRES.flatMap((p) => p.images);

// Approximate melting ranges (solidus–liquidus) of the main grades; values not translated.
const MELTING = [
  { grade: 'AISI 304', range: '1400–1450 °C' },
  { grade: 'AISI 310', range: '1400–1450 °C' },
  { grade: 'AISI 446', range: '1425–1510 °C' }
] as const;

// From the brief, IS 15141 is left out until its scope is confirmed.
const STANDARDS = ['ASTM A820 / A820M', 'EN 14889-1'] as const;

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'sfPage' });
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

export default async function SteelFibresPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'sfPage' });
  const categories = await getTranslations({ locale, namespace: 'productCategories' });
  const services = await getTranslations({ locale, namespace: 'services' });
  const common = await getTranslations({ locale, namespace: 'common' });
  const nav = await getTranslations({ locale, namespace: 'nav' });
  const productPage = await getTranslations({ locale, namespace: 'productPage' });

  const faq = t.raw('faq') as { q: string; a: string }[];
  const gallery = t.raw('gallery') as string[];
  const types = t.raw('types') as TypeCard[];
  const compareRows = t.raw('compareRows') as { label: string; values: string[] }[];
  const guideRows = t.raw('guideRows') as { label: string; melt: string; cold: string }[];
  const grades = t.raw('grades') as { grade: string; text: string }[];
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
      material: 'Stainless steel (AISI 304, 310, 446), low carbon steel',
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
  const rowTh = 'px-4 py-3 text-start align-top text-sm font-semibold text-ink';
  const td = 'px-4 py-3 align-top text-sm leading-relaxed text-ink-body';
  const textLink = 'inline-block text-sm font-semibold text-brand-500 hover:text-brand-600';
  const bullet = <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" aria-hidden="true" />;

  const related = [
    { href: '/refractory-anchors', name: categories('items.refractory-anchors.name'), text: t('relatedAnchors') },
    { href: '/products/calcium-silicate', name: categories('items.calcium-silicate.name'), text: t('relatedCalsil') },
    { href: '/services/pickling-and-passivation', name: services('items.pickling-and-passivation.name'), text: t('relatedPickling') },
    { href: '/products/insulation-pins', name: categories('items.insulation-pins.name'), text: t('relatedPins') }
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

      {/* Overview + processes */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className={h2}>{t('overviewTitle')}</h2>
        <div className="mt-4 max-w-4xl space-y-4 leading-relaxed text-ink-body">
          {(t.raw('overview') as string[]).map((p) => <p key={p}>{p}</p>)}
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {(t.raw('processes') as { title: string; text: string }[]).map((pr) => (
            <article key={pr.title} className="rounded-lg border border-line border-t-4 border-t-brand-500 bg-white p-6">
              <h3 className="text-xl font-bold text-ink">{pr.title}</h3>
              <p className="mt-3 leading-relaxed text-ink-body">{pr.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* The four SEPL fibres */}
      <section className="bg-surface-alt py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className={h2}>{t('typesTitle')}</h2>
          <p className="mt-3 max-w-3xl text-ink-body">{t('typesIntro')}</p>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {FIBRES.map((p, i) => (
              <li key={p.slug} className={`${card} flex flex-col`}>
                <p className="text-sm font-semibold tracking-wide text-brand-500">{p.code}</p>
                <h3 className="mt-1 font-bold text-ink">{types[i]?.name}</h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-ink-muted">{types[i]?.process}</p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-body">{types[i]?.text}</p>
                <Link href={`/products/${p.slug}`} className={`mt-4 ${textLink}`}>{t('typeLink', { code: p.code ?? '' })} →</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Comparison table */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className={h2}>{t('compareTitle')}</h2>
        <div className="mt-6 overflow-x-auto rounded-lg border border-line">
          <table className="w-full min-w-[48rem] divide-y divide-line bg-white">
            <thead className="bg-surface-alt">
              <tr>
                <th scope="col" className={th}>{t('colProperty')}</th>
                {FIBRES.map((p, i) => (
                  <th key={p.slug} scope="col" className={th}>
                    <Link href={`/products/${p.slug}`} className="hover:text-brand-500">{p.code}</Link>
                    <span className="mt-0.5 block font-normal normal-case tracking-normal">{types[i]?.name}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {compareRows.map((r) => (
                <tr key={r.label}>
                  <th scope="row" className={rowTh}>{r.label}</th>
                  {r.values.map((v, i) => <td key={i} className={td}>{v}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 border-s-2 border-brand-500 ps-3 text-sm text-ink-body">{t('compareNote')}</p>
      </section>

      {/* Melt extract vs cold drawn */}
      <section className="bg-surface-alt py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className={h2}>{t('guideTitle')}</h2>
          <div className="mt-6 overflow-x-auto rounded-lg border border-line">
            <table className="w-full min-w-[36rem] divide-y divide-line bg-white">
              <thead className="bg-surface-alt">
                <tr>
                  <th scope="col" className={th}>{t('colCriterion')}</th>
                  <th scope="col" className={th}>{t('colMelt')}</th>
                  <th scope="col" className={th}>{t('colCold')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {guideRows.map((r) => (
                  <tr key={r.label}>
                    <th scope="row" className={rowTh}>{r.label}</th>
                    <td className={td}>{r.melt}</td>
                    <td className={td}>{r.cold}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Grades + melting ranges */}
      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-5">
        <div className="min-w-0 lg:col-span-3">
          <h2 className={h2}>{t('gradesTitle')}</h2>
          <ul className="mt-6 space-y-4">
            {grades.map((g) => (
              <li key={g.grade} className="flex gap-3 leading-relaxed text-ink-body">
                {bullet}
                <span><strong className="font-semibold text-ink">{g.grade}</strong>: {g.text}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="min-w-0 lg:col-span-2">
          <h3 className="text-xl font-bold text-ink">{t('meltingTitle')}</h3>
          <div className="mt-4 overflow-x-auto rounded-lg border border-line">
            <table className="w-full divide-y divide-line bg-white">
              <thead className="bg-surface-alt">
                <tr>
                  <th scope="col" className={th}>{t('colGrade')}</th>
                  <th scope="col" className={th}>{t('colMelting')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {MELTING.map((m) => (
                  <tr key={m.grade}>
                    <th scope="row" className={rowTh}><span dir="ltr">{m.grade}</span></th>
                    <td className={td}><span dir="ltr">{m.range}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 border-s-2 border-brand-500 ps-3 text-sm text-ink-body">{t('meltingNote')}</p>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-surface-alt py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className={h2}>{t('benefitsTitle')}</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {(t.raw('benefits') as string[]).map((b) => (
              <li key={b} className="flex gap-3 leading-relaxed text-ink-body">{bullet}<span>{b}</span></li>
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

      {/* Supply + standards */}
      <section className="bg-surface-alt py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-5">
          <div className="min-w-0 lg:col-span-3">
            <h2 className={h2}>{t('supplyTitle')}</h2>
            <div className="mt-6 space-y-4 leading-relaxed text-ink-body">
              {(t.raw('supply') as string[]).map((p) => <p key={p}>{p}</p>)}
            </div>
          </div>
          <div className="min-w-0 lg:col-span-2">
            <h2 className={h2}>{t('standardsTitle')}</h2>
            <div className="mt-6 overflow-x-auto rounded-lg border border-line">
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
            <p className="mt-4 text-sm text-ink-muted">{t('standardsNote')}</p>
          </div>
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
