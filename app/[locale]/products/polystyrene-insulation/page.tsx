import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { buildAlternates, siteUrl } from '@/lib/seo';
import { SITE } from '@/lib/site';
import { btnPrimary } from '@/lib/ui';
import WhatsAppLink from '@/components/WhatsAppLink';
import ProductGallery from '@/components/products/ProductGallery';

type Props = { params: { locale: string } };
type FormRow = { form: string; text: string; sizes: string };

const SLUG = 'polystyrene-insulation';
const PATH = `/products/${SLUG}`;
const IMG = '/images/insulation/polystyrene';

// Photos from the old site's Polystyrene page (usage rights to be confirmed by the client; see docs/image-inventory.md).
// No XPS photos on file. Alt texts: psPage.gallery, same order.
const GALLERY = [
  `${IMG}/polystyrene-eps-insulation-boards.jpg`,
  `${IMG}/pipe-insulation-foil-faced-sections.jpg`,
  `${IMG}/polystyrene-pipe-sections-insulation.jpg`,
  `${IMG}/pipe-insulation-half-shells-polystyrene.jpg`
];

// IS 10146 (polyethylene for food contact, not XPS) and BS 3837 (withdrawn, replaced by EN 13163) from the brief are left out.
const STANDARDS = ['ASTM C578', 'IS 4671', 'EN 13163', 'EN 13164', 'ASTM E84', 'ASTM C177 / C518'] as const;

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'psPage' });
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

export default async function PolystyreneInsulationPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'psPage' });
  const categories = await getTranslations({ locale, namespace: 'productCategories' });
  const common = await getTranslations({ locale, namespace: 'common' });
  const nav = await getTranslations({ locale, namespace: 'nav' });
  const productPage = await getTranslations({ locale, namespace: 'productPage' });

  const faq = t.raw('faq') as { q: string; a: string }[];
  const gallery = t.raw('gallery') as string[];
  const specRows = t.raw('specRows') as { label: string; eps: string; xps: string }[];
  const densityRows = t.raw('densityRows') as { density: string; strength: string; use: string }[];
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
      material: 'Expanded polystyrene (EPS), extruded polystyrene (XPS)',
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
  const rowTh = 'px-4 py-3 text-start align-top text-sm font-semibold text-ink';
  const td = 'px-4 py-3 align-top text-sm leading-relaxed text-ink-body';
  const textLink = 'inline-block text-sm font-semibold text-brand-500 hover:text-brand-600';
  const bullet = <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" aria-hidden="true" />;

  const formsTable = (title: string, rows: FormRow[]) => (
    <div className="min-w-0">
      <h3 className="text-xl font-bold text-ink">{title}</h3>
      <div className="mt-4 overflow-x-auto rounded-lg border border-line">
        <table className="w-full min-w-[36rem] divide-y divide-line bg-white">
          <thead className="bg-surface-alt">
            <tr>
              <th scope="col" className={th}>{t('colForm')}</th>
              <th scope="col" className={th}>{t('colDescription')}</th>
              <th scope="col" className={th}>{t('colSizes')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rows.map((r) => (
              <tr key={r.form}>
                <th scope="row" className={rowTh}>{r.form}</th>
                <td className={td}>{r.text}</td>
                <td className={td}>{r.sizes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const related = [
    { href: '/products/insulation-pins', name: categories('items.insulation-pins.name'), text: t('relatedPins') },
    { href: '/products/mineral-wool', name: categories('items.mineral-wool.name'), text: t('relatedMineralWool') },
    { href: '/products/calcium-silicate', name: categories('items.calcium-silicate.name'), text: t('relatedCalsil') },
    { href: '/products/glass-fibre-sheets', name: categories('items.glass-fibre-sheets.name'), text: t('relatedGlassFibre') },
    { href: '/products/polyisocyanurate-insulation', name: categories('items.polyisocyanurate-insulation.name'), text: t('relatedPir') }
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

      {/* Overview: EPS and XPS */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className={h2}>{t('overviewTitle')}</h2>
        <div className="mt-4 max-w-4xl space-y-4 leading-relaxed text-ink-body">
          {(t.raw('overview') as string[]).map((p) => <p key={p}>{p}</p>)}
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {(t.raw('types') as { title: string; tag: string; text: string }[]).map((ty) => (
            <article key={ty.title} className="rounded-lg border border-line border-t-4 border-t-brand-500 bg-white p-6">
              <h3 className="text-xl font-bold text-ink">{ty.title}</h3>
              <p className="mt-1 text-sm font-semibold text-brand-500">{ty.tag}</p>
              <p className="mt-3 leading-relaxed text-ink-body">{ty.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Product forms */}
      <section className="bg-surface-alt py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className={h2}>{t('formsTitle')}</h2>
          <p className="mt-3 max-w-3xl text-ink-body">{t('formsIntro')}</p>
          <div className="mt-8 grid gap-10">
            {formsTable(t('epsFormsTitle'), t.raw('epsForms') as FormRow[])}
            {formsTable(t('xpsFormsTitle'), t.raw('xpsForms') as FormRow[])}
          </div>
        </div>
      </section>

      {/* Specifications: EPS vs XPS */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <h2 className={h2}>{t('specTitle')}</h2>
        <div className="mt-6 overflow-x-auto rounded-lg border border-line">
          <table className="w-full min-w-[40rem] divide-y divide-line bg-white">
            <thead className="bg-surface-alt">
              <tr>
                <th scope="col" className={th}>{t('colProperty')}</th>
                <th scope="col" className={th}>{t('colEps')}</th>
                <th scope="col" className={th}>{t('colXps')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {specRows.map((r) => (
                <tr key={r.label}>
                  <th scope="row" className={rowTh}>{r.label}</th>
                  <td className={td}>{r.eps}</td>
                  <td className={td}>{r.xps}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 border-s-2 border-brand-500 ps-3 text-sm text-ink-body">{t('specNote')}</p>
      </section>

      {/* EPS density guide */}
      <section className="bg-surface-alt py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className={h2}>{t('densityTitle')}</h2>
          <p className="mt-3 max-w-3xl text-ink-body">{t('densityIntro')}</p>
          <div className="mt-6 overflow-x-auto rounded-lg border border-line">
            <table className="w-full min-w-[36rem] divide-y divide-line bg-white">
              <thead className="bg-surface-alt">
                <tr>
                  <th scope="col" className={th}>{t('colDensity')}</th>
                  <th scope="col" className={th}>{t('colStrength')}</th>
                  <th scope="col" className={th}>{t('colBestFor')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {densityRows.map((r) => (
                  <tr key={r.density}>
                    <th scope="row" className={`whitespace-nowrap ${rowTh}`}>{r.density}</th>
                    <td className={`whitespace-nowrap ${td}`}>{r.strength}</td>
                    <td className={td}>{r.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 border-s-2 border-brand-500 ps-3 text-sm text-ink-body">{t('densityNote')}</p>
        </div>
      </section>

      {/* Advantages + cautions + standards */}
      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-2">
        <div className="min-w-0">
          <h2 className={h2}>{t('advantagesTitle')}</h2>
          <ul className="mt-6 space-y-3">
            {(t.raw('advantages') as string[]).map((a) => (
              <li key={a} className="flex gap-3 leading-relaxed text-ink-body">{bullet}<span>{a}</span></li>
            ))}
          </ul>
        </div>
        <div className="min-w-0">
          <div className="rounded-lg border-s-4 border-brand-500 bg-surface-alt p-6">
            <h3 className="font-bold text-ink">{t('cautionsTitle')}</h3>
            <ul className="mt-3 space-y-2">
              {(t.raw('cautions') as string[]).map((c) => (
                <li key={c} className="flex gap-2 text-sm leading-relaxed text-ink-body">{bullet}<span>{c}</span></li>
              ))}
            </ul>
          </div>
          <h2 className={`mt-10 ${h2}`}>{t('standardsTitle')}</h2>
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

      {/* What we supply */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className={h2}>{t('supplyTitle')}</h2>
        <div className="mt-6 max-w-4xl space-y-4 leading-relaxed text-ink-body">
          {(t.raw('supply') as string[]).map((p) => <p key={p}>{p}</p>)}
        </div>
      </section>

      {/* Related */}
      <section className="bg-surface-alt py-16">
        <div className="mx-auto max-w-6xl px-6">
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
