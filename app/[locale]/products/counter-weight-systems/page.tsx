import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { buildAlternates, siteUrl } from '@/lib/seo';
import { SITE } from '@/lib/site';
import { btnPrimary, btnSecondary } from '@/lib/ui';
import WhatsAppLink from '@/components/WhatsAppLink';
import ProductGallery from '@/components/products/ProductGallery';

type Props = { params: { locale: string } };
type Item = { title: string; text: string };

const SLUG = 'counter-weight-systems';
const PATH = `/products/${SLUG}`;
// Only photo on file (client-supplied, 320 px). More photos needed: lever arms, bushings, clevises, installed systems.
const PHOTO = '/images/fabrication/counter-weight-systems/counter-weight-lever-arm-dead-weight-stacks-galvanized.jpg';
// Alt texts: cwPage.photoAlt, cwPage.photo2Alt.
const PHOTOS = [PHOTO, '/images/fabrication/counter-weight-systems/counter-weight-lever-arm-dead-weight-workshop.jpg'];
const LINDE_CERT = '/documents/certificates/linde-engineering-approved-supplier-counter-weight-system.pdf';

// Numbered markers on the "how it works" diagram; labels are cwPage.diagram[n-1].
const MARKERS = [
  { n: 1, x: 70, y: 196 },
  { n: 2, x: 70, y: 96 },
  { n: 3, x: 70, y: 52 },
  { n: 4, x: 160, y: 20 },
  { n: 5, x: 160, y: 84 },
  { n: 6, x: 214, y: 86 },
  { n: 7, x: 118, y: 124 }
];

function HowItWorksDiagram({ label }: { label: string }) {
  return (
    <svg viewBox="0 0 320 250" role="img" aria-label={label} className="h-auto w-full text-brand-500" fill="none" stroke="currentColor">
      <title>{label}</title>
      {/* furnace roof and firebox */}
      <rect x="20" y="120" width="180" height="120" fill="currentColor" stroke="none" opacity="0.07" />
      <path d="M20 120 H200" strokeWidth="6" opacity="0.45" />
      {/* reformer tube */}
      <rect x="44" y="140" width="16" height="96" rx="3" strokeWidth="3" />
      {/* hanger rod */}
      <path d="M52 140 V60" strokeWidth="3" />
      {/* yoke */}
      <path d="M40 60 H64 M52 60 V46" strokeWidth="4" />
      {/* lever arm */}
      <path d="M52 46 L268 30" strokeWidth="7" strokeLinecap="round" />
      {/* fulcrum frame */}
      <path d="M150 42 L136 118 M150 42 L164 118 M128 118 H172" strokeWidth="4" />
      <circle cx="150" cy="40" r="6" fill="currentColor" stroke="none" />
      {/* dead weight */}
      <path d="M268 30 V64" strokeWidth="3" />
      <rect x="248" y="64" width="40" height="44" rx="2" fill="currentColor" stroke="none" opacity="0.8" />
      {/* expansion arrow */}
      <path d="M78 160 V224 M72 216 L78 226 L84 216" strokeWidth="2" opacity="0.6" />
      {MARKERS.map((m) => (
        <g key={m.n}>
          <circle cx={m.x + 16} cy={m.y} r="9" fill="white" strokeWidth="2" />
          <text x={m.x + 16} y={m.y + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill="currentColor" stroke="none">{m.n}</text>
        </g>
      ))}
    </svg>
  );
}

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'cwPage' });
  const alternates = buildAlternates(PATH, locale);
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
      images: [{ url: PHOTO, alt: t('photoAlt') }]
    }
  };
}

export default async function CounterWeightPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'cwPage' });
  const categories = await getTranslations({ locale, namespace: 'productCategories' });
  const services = await getTranslations({ locale, namespace: 'services' });
  const common = await getTranslations({ locale, namespace: 'common' });
  const nav = await getTranslations({ locale, namespace: 'nav' });
  const productPage = await getTranslations({ locale, namespace: 'productPage' });

  const linde = { code: SITE.linde.supplierCode, period: SITE.linde.period };
  const faq = (t.raw('faq') as { q: string; a: string }[]).map((f) => ({ q: f.q, a: f.a.replace('{code}', linde.code).replace('{period}', linde.period) }));
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
      image: PHOTOS.map((src) => `${siteUrl}${src}`),
      category: categories(`items.${SLUG}.name`),
      material: 'Carbon steel, cast iron, SS 410S, Graphalloy bushings, grade 8.8 fasteners',
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
    { href: '/products/pipe-guides-sleeves', name: categories('items.pipe-guides-sleeves.name'), text: t('relatedPipeGuides') },
    { href: '/products/support-plates', name: categories('items.support-plates.name'), text: t('relatedSupportPlates') },
    { href: '/refractory-anchors', name: categories('items.refractory-anchors.name'), text: t('relatedAnchors') },
    { href: '/services/stud-welding-solutions', name: services('items.stud-welding-solutions.name'), text: t('relatedSwText') },
    { href: '/services/pmi-testing', name: services('items.pmi-testing.name'), text: t('relatedPmiText') }
  ];

  const lindeBox = (
    <div className="rounded-lg border border-line border-s-4 border-s-brand-500 bg-white p-6">
      <p className="text-xs font-semibold uppercase tracking-wider text-brand-500">{t('lindeEyebrow')}</p>
      <h2 className="mt-2 text-xl font-bold text-ink">{t('lindeTitle')}</h2>
      <p className="mt-3 text-sm leading-relaxed text-ink-body">{t('lindeText', linde)}</p>
      <dl className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{t('lindeCodeLabel')}</dt>
          <dd className="mt-1 font-semibold text-ink" dir="ltr">{linde.code}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{t('lindePeriodLabel')}</dt>
          <dd className="mt-1 font-semibold text-ink" dir="ltr">{linde.period}</dd>
        </div>
      </dl>
      <p className="mt-4 text-xs leading-relaxed text-ink-muted">{t('lindeNote')}</p>
      <a href={LINDE_CERT} target="_blank" rel="noopener" className={`mt-4 ${btnSecondary}`}>{t('lindeCert')}</a>
    </div>
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

      {/* Hero */}
      <section className="border-b border-line bg-surface-alt">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 sm:py-20 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-500">{t('eyebrow')}</p>
            <h1 className="mt-4 border-s-4 border-brand-500 ps-5 text-3xl font-bold tracking-tight text-ink sm:text-5xl">{t('h1')}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-ink-body">{t('subheading')}</p>
            <p className="mt-5 inline-flex items-center gap-2 rounded-md border border-line bg-white px-3 py-2 text-sm font-semibold text-ink">
              <span className="h-2 w-2 shrink-0 rounded-full bg-brand-500" aria-hidden="true" />
              {t('lindeBadge', linde)}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={rfqHref} className={btnPrimary}>{t('ctaRfq')}</Link>
              <WhatsAppLink>{common('whatsapp')}</WhatsAppLink>
            </div>
          </div>
          <figure className="lg:col-span-2">
            <div className="mx-auto max-w-sm">
              <ProductGallery images={PHOTOS} alt={t('photoAlt')} alts={[t('photoAlt'), t('photo2Alt')]} label={productPage('gallery')} />
            </div>
            <figcaption className="mx-auto mt-2 max-w-sm text-sm text-ink-muted">{t('photoCaption')}</figcaption>
          </figure>
        </div>
      </section>

      {/* What it is + how it works */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <h2 className={h2}>{t('whatTitle')}</h2>
            <div className="mt-6 space-y-4 leading-relaxed text-ink-body">
              {(t.raw('what') as string[]).map((p) => <p key={p}>{p}</p>)}
            </div>
            <h3 className="mt-10 text-xl font-bold text-ink">{t('howTitle')}</h3>
            <ol className="mt-4 space-y-3">
              {(t.raw('how') as string[]).map((s, i) => (
                <li key={s} className="flex gap-3 text-sm leading-relaxed text-ink-body">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-500 text-xs font-bold text-white">{i + 1}</span>
                  <span>{s}</span>
                </li>
              ))}
            </ol>
          </div>
          <figure className="self-start rounded-lg border border-line bg-surface-alt p-5 lg:col-span-2">
            <HowItWorksDiagram label={t('diagramAlt')} />
            <figcaption>
              <ol className="mt-4 grid gap-1.5 text-sm text-ink-body sm:grid-cols-2 lg:grid-cols-1">
                {(t.raw('diagram') as string[]).map((d, i) => (
                  <li key={d} className="flex gap-2">
                    <span className="w-5 shrink-0 font-bold text-brand-500">{i + 1}</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ol>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Santura's construction + Linde */}
      <section className="bg-surface-alt py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className={h2}>{t('buildTitle')}</h2>
            <p className="mt-4 leading-relaxed text-ink-body">{t('buildIntro')}</p>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {(t.raw('build') as Item[]).map((b) => (
                <li key={b.title} className={card}>
                  <h3 className="font-bold text-ink">{b.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-body">{b.text}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-5 self-start lg:sticky lg:top-24">
            {lindeBox}
            <p className="rounded-lg border border-line bg-white p-5 text-sm leading-relaxed text-ink-body">{t('petron')}</p>
          </div>
        </div>
      </section>

      {/* Components */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className={h2}>{t('componentsTitle')}</h2>
        <ol className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {(t.raw('components') as Item[]).map((c, i) => (
            <li key={c.title} className="rounded-lg border border-line border-t-4 border-t-brand-500 bg-white p-6">
              <span className="text-sm font-bold text-brand-500">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-1 font-bold text-ink">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-body">{c.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Applications */}
      <section className="bg-surface-alt py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className={h2}>{t('applicationsTitle')}</h2>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {(t.raw('applications') as Item[]).map((a) => (
              <li key={a.title} className={card}>
                <h3 className="font-bold text-ink">{a.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-body">{a.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Why quality matters */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className={h2}>{t('whyTitle')}</h2>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {(t.raw('why') as Item[]).map((w) => (
            <li key={w.title} className="rounded-lg border border-line border-s-2 border-s-brand-500 bg-white p-6">
              <h3 className="font-bold text-ink">{w.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-body">{w.text}</p>
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
                  <th scope="col" className={th}>{t('colComponent')}</th>
                  <th scope="col" className={th}>{t('colSpec')}</th>
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
