import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { buildAlternates, siteUrl } from '@/lib/seo';
import { SITE } from '@/lib/site';
import { btnPrimary } from '@/lib/ui';
import WhatsAppLink from '@/components/WhatsAppLink';
import ProductGallery from '@/components/products/ProductGallery';

type Props = { params: { locale: string } };
type Row = { label: string; value: string };

const SLUG = 'polyisocyanurate-insulation';
const PATH = `/products/${SLUG}`;

// Photo from the old site's Polyisocyanurate page (usage rights to be confirmed by the client; see docs/image-inventory.md).
// No PIR pipe section photo on file: the pipe section is shown as a line drawing. Alt text: pirPage.gallery.
const GALLERY = ['/images/insulation/polyisocyanurate/pir-polyisocyanurate-insulation-board.jpg'];

// Thickness for R = 2.5 m²K/W on a flat surface (thickness = R × λ). Names: pirPage.compareNames, same order.
// Calcium silicate uses a low-temperature λ (~0.060); the brief's 0.070 suits higher mean temperatures.
const COMPARE = [
  { lambda: 0.022, mm: 55 },
  { lambda: 0.033, mm: 83 },
  { lambda: 0.035, mm: 88 },
  { lambda: 0.038, mm: 95 },
  { lambda: 0.038, mm: 95 },
  { lambda: 0.06, mm: 150 }
] as const;
const COMPARE_MAX = 150;

// From the brief: ASTM C610 (perlite), BS 4841-2 (withdrawn, replaced by EN 13165) and FM 4450 / 4470
// (manufacturer roof-deck approvals) are left out; BS 476-7 is the test behind "Class 1 surface spread of flame".
const STANDARDS = ['EN 14308', 'EN 13165', 'ASTM C591', 'ASTM E84', 'BS 476-7', 'ISO 4898'] as const;

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'pirPage' });
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

export default async function PolyisocyanurateInsulationPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'pirPage' });
  const categories = await getTranslations({ locale, namespace: 'productCategories' });
  const common = await getTranslations({ locale, namespace: 'common' });
  const nav = await getTranslations({ locale, namespace: 'nav' });
  const productPage = await getTranslations({ locale, namespace: 'productPage' });

  const faq = t.raw('faq') as { q: string; a: string }[];
  const gallery = t.raw('gallery') as string[];
  const compareNames = t.raw('compareNames') as string[];
  const forms = t.raw('forms') as { form: string; text: string; sizes: string }[];
  const specRows = t.raw('specRows') as { label: string; pir: string; pur: string }[];
  const standards = t.raw('standards') as string[];
  const applications = t.raw('applications') as { title: string; items: string[] }[];
  const pageUrl = buildAlternates(PATH, locale).canonical;
  const rfqHref = { pathname: '/rfq', query: { category: SLUG } } as const;
  const fmtLambda = new Intl.NumberFormat(locale, { minimumFractionDigits: 3, maximumFractionDigits: 3 });
  const fmtInt = new Intl.NumberFormat(locale);

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: t('h1'),
      description: t('metaDescription'),
      url: pageUrl,
      image: GALLERY.map((src) => `${siteUrl}${src}`),
      category: categories(`items.${SLUG}.name`),
      material: 'Polyisocyanurate (PIR) rigid foam',
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

  const related = [
    { href: '/products/polystyrene-insulation', name: categories('items.polystyrene-insulation.name'), text: t('relatedPolystyrene') },
    { href: '/products/mineral-wool', name: categories('items.mineral-wool.name'), text: t('relatedMineralWool') },
    { href: '/products/calcium-silicate', name: categories('items.calcium-silicate.name'), text: t('relatedCalsil') },
    { href: '/products/insulation-pins', name: categories('items.insulation-pins.name'), text: t('relatedPins') },
    { href: '/products/glass-fibre-sheets', name: categories('items.glass-fibre-sheets.name'), text: t('relatedGlassFibre') }
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

      {/* Thickness comparison (key selling point) */}
      <section className="bg-surface-alt py-16" aria-labelledby="pir-thickness">
        <div className="mx-auto max-w-5xl px-6">
          <h2 id="pir-thickness" className={h2}>{t('compareTitle')}</h2>
          <p className="mt-3 max-w-3xl text-ink-body">{t('compareIntro')}</p>
          <div className="mt-8 rounded-lg border border-line bg-white p-6 sm:p-8">
            <div className="hidden grid-cols-[minmax(0,12rem)_minmax(0,1fr)] gap-4 pb-3 text-xs font-semibold uppercase tracking-wide text-ink-muted sm:grid">
              <span>{t('colMaterial')}</span>
              <span>{t('colThickness')}</span>
            </div>
            <ul className="space-y-5">
              {COMPARE.map((c, i) => {
                const isPir = i === 0;
                return (
                  <li key={compareNames[i]} className="grid gap-2 sm:grid-cols-[minmax(0,12rem)_minmax(0,1fr)] sm:items-center sm:gap-4">
                    <div className="min-w-0">
                      <span className={`block text-sm ${isPir ? 'font-bold text-ink' : 'font-semibold text-ink'}`}>{compareNames[i]}</span>
                      <span className="block text-xs text-ink-muted">λ <span dir="ltr">{fmtLambda.format(c.lambda)}</span> {t('lambdaUnit')}</span>
                    </div>
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="h-6 min-w-0 flex-1 overflow-hidden rounded bg-surface-alt">
                        <div
                          className={`h-full rounded ${isPir ? 'bg-brand-500' : 'bg-ink-muted/40'}`}
                          style={{ width: `${(c.mm / COMPARE_MAX) * 100}%` }}
                          aria-hidden="true"
                        />
                      </div>
                      <span className={`w-20 shrink-0 text-end text-sm ${isPir ? 'font-bold text-brand-500' : 'text-ink'}`}>
                        ~<span dir="ltr">{fmtInt.format(c.mm)}</span> {t('mmUnit')}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <p className="mt-6 max-w-4xl border-s-4 border-brand-500 ps-4 text-lg font-semibold leading-relaxed text-ink">{t('compareNote')}</p>
          <p className="mt-3 max-w-4xl text-sm text-ink-muted">{t('compareCalc')}</p>
        </div>
      </section>

      {/* Product forms */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className={h2}>{t('formsTitle')}</h2>
        <p className="mt-3 max-w-3xl text-ink-body">{t('formsIntro')}</p>
        <div className="mt-6 overflow-x-auto rounded-lg border border-line">
          <table className="w-full min-w-[40rem] divide-y divide-line bg-white">
            <thead className="bg-surface-alt">
              <tr>
                <th scope="col" className={th}>{t('colForm')}</th>
                <th scope="col" className={th}>{t('colDescription')}</th>
                <th scope="col" className={th}>{t('colSizes')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {forms.map((r) => (
                <tr key={r.form}>
                  <th scope="row" className={rowTh}>{r.form}</th>
                  <td className={td}>{r.text}</td>
                  <td className={td}>{r.sizes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Pipe section details */}
      <section className="bg-surface-alt py-16">
        <div className="mx-auto grid max-w-6xl items-start gap-10 px-6 lg:grid-cols-5">
          <div className="min-w-0 lg:col-span-3">
            <h2 className={h2}>{t('pipeTitle')}</h2>
            <p className="mt-3 text-ink-body">{t('pipeIntro')}</p>
            <div className="mt-6 overflow-x-auto rounded-lg border border-line">
              <table className="w-full divide-y divide-line bg-white">
                <tbody className="divide-y divide-line">
                  {(t.raw('pipeRows') as Row[]).map((r) => (
                    <tr key={r.label}>
                      <th scope="row" className={`w-2/5 ${rowTh}`}>{r.label}</th>
                      <td className={td}>{r.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <figure className="min-w-0 rounded-lg border border-line bg-white p-6 lg:col-span-2">
            <svg viewBox="0 0 240 180" role="img" aria-labelledby="pir-pipe-drawing" className="mx-auto h-auto w-full max-w-xs text-ink">
              <title id="pir-pipe-drawing">{t('drawingAlt')}</title>
              {/* Upper half shell, lifted to show the split */}
              <path d="M40 80 A80 80 0 0 1 200 80 L165 80 A45 45 0 0 0 75 80 Z" transform="translate(0 -8)" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="2" />
              {/* Lower half shell */}
              <path d="M40 92 A80 80 0 0 0 200 92 L165 92 A45 45 0 0 1 75 92 Z" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="2" />
              {/* Pipe */}
              <circle cx="120" cy="86" r="40" fill="none" stroke="currentColor" strokeWidth="3" />
              <circle cx="120" cy="86" r="33" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 3" />
            </svg>
            <figcaption className="mt-4 text-center text-sm text-ink-muted">{t('drawingCaption')}</figcaption>
          </figure>
        </div>
      </section>

      {/* PIR vs PUR */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <h2 className={h2}>{t('specTitle')}</h2>
        <div className="mt-6 overflow-x-auto rounded-lg border border-line">
          <table className="w-full min-w-[40rem] divide-y divide-line bg-white">
            <thead className="bg-surface-alt">
              <tr>
                <th scope="col" className={th}>{t('colProperty')}</th>
                <th scope="col" className={th}>{t('colPir')}</th>
                <th scope="col" className={th}>{t('colPur')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {specRows.map((r) => (
                <tr key={r.label}>
                  <th scope="row" className={rowTh}>{r.label}</th>
                  <td className={td}>{r.pir}</td>
                  <td className={td}>{r.pur}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 border-s-2 border-brand-500 ps-3 text-sm text-ink-body">{t('specNote')}</p>
      </section>

      {/* Advantages + cautions + standards */}
      <section className="bg-surface-alt py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-2">
          <div className="min-w-0">
            <h2 className={h2}>{t('advantagesTitle')}</h2>
            <ul className="mt-6 space-y-3">
              {(t.raw('advantages') as string[]).map((a) => (
                <li key={a} className="flex gap-3 leading-relaxed text-ink-body">{bullet}<span>{a}</span></li>
              ))}
            </ul>
          </div>
          <div className="min-w-0">
            <div className="rounded-lg border-s-4 border-brand-500 bg-white p-6">
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
        <div className="mx-auto max-w-6xl px-6">
          <h2 className={h2}>{t('supplyTitle')}</h2>
          <div className="mt-6 max-w-4xl space-y-4 leading-relaxed text-ink-body">
            {(t.raw('supply') as string[]).map((p) => <p key={p}>{p}</p>)}
          </div>
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
        </div>
      </section>
    </main>
  );
}
