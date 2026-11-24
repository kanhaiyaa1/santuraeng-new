import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { buildAlternates, siteUrl } from '@/lib/seo';
import { SITE } from '@/lib/site';
import { btnPrimary } from '@/lib/ui';
import { getProduct, type Product } from '@/content/products';
import WhatsAppLink from '@/components/WhatsAppLink';

type Props = { params: { locale: string } };
type Item = { title: string; text: string };

const SLUG = 'stud-welding-solutions';
const PATH = `/services/${SLUG}`;
const PROCESSES = ['da', 'sc', 'cd'] as const;

// Welding method per product, from the product catalogue (dev-reference.md).
const METHOD_PRODUCTS = {
  da: [
    'sepl-06-split-y-anchors',
    'sepl-08-corrugated-bullhorn-anchors',
    'sepl-10-y-anchors-flat',
    'sepl-11-flat-sectioned-anchors',
    'sepl-13-corrugated-v-round-anchors',
    'sepl-16-shear-connectors',
    'sepl-18-strip-corrugated-anchors',
    'sepl-20-dual-pin-anchors'
  ],
  sc: ['sepl-23-slit-stud-anchors'],
  cd: ['sepl-24-fiber-stud-anchors', 'sepl-25-threaded-studs'],
  manual: ['sepl-07-v-anchors', 'sepl-09-corrugated-h-anchors', 'sepl-14-multipurpose-anchors'],
  screw: ['sepl-21-v-anchor-with-nut', 'sepl-22-screw-on-anchors']
} as const;

const STANDARDS = [
  { key: 'd11', code: 'AWS D1.1' },
  { key: 'd16', code: 'AWS D1.6' },
  { key: 'iso', code: 'EN ISO 14555' },
  { key: 'c54', code: 'AWS C5.4' }
] as const;

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'swPage' });
  const alternates = buildAlternates(PATH, locale);
  return {
    title: { absolute: t('metaTitle') },
    description: t('metaDescription'),
    alternates,
    openGraph: { title: t('metaTitle'), description: t('metaDescription'), url: alternates.canonical, locale, type: 'website' }
  };
}

export default async function StudWeldingPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'swPage' });
  const services = await getTranslations({ locale, namespace: 'services' });
  const categories = await getTranslations({ locale, namespace: 'productCategories' });
  const common = await getTranslations({ locale, namespace: 'common' });
  const nav = await getTranslations({ locale, namespace: 'nav' });
  const productPage = await getTranslations({ locale, namespace: 'productPage' });

  const faq = t.raw('faq') as { q: string; a: string }[];
  const rows = t.raw('compareRows') as { label: string; da: string; sc: string; cd: string }[];
  const pageUrl = buildAlternates(PATH, locale).canonical;
  const rfqHref = { pathname: '/rfq', query: { service: SLUG } } as const;
  const productsFor = (slugs: readonly string[]) => slugs.map(getProduct).filter((p): p is Product => p !== undefined);

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: t('h1'),
      serviceType: 'Stud welding of refractory anchors',
      description: t('metaDescription'),
      url: pageUrl,
      areaServed: 'Worldwide',
      provider: { '@type': 'Organization', name: SITE.legalName, url: siteUrl, telephone: SITE.phone.tel, email: SITE.generalEmail }
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
        { '@type': 'ListItem', position: 2, name: t('h1'), item: pageUrl }
      ]
    }
  ];

  const h2 = 'text-2xl font-bold tracking-tight text-ink sm:text-3xl';
  const card = 'rounded-lg border border-line bg-white p-6';
  const th = 'px-4 py-3 text-start text-xs font-semibold uppercase tracking-wide text-ink-muted';
  const textLink = 'inline-block text-sm font-semibold text-brand-500 hover:text-brand-600';
  const chip = 'inline-flex items-center gap-2 rounded-md border border-line bg-white px-3 py-1.5 text-sm hover:border-brand-500';

  return (
    <main className="bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="border-b border-line bg-white">
        <nav aria-label={productPage('breadcrumb')} className="mx-auto max-w-6xl px-6 py-3 text-sm text-ink-muted">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link href="/" className="hover:text-brand-500">{nav('home')}</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="font-medium text-ink">{t('h1')}</li>
          </ol>
        </nav>
      </div>

      {/* Hero */}
      <section className="border-b border-line bg-surface-alt">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-500">{t('eyebrow')}</p>
          <h1 className="mt-4 max-w-4xl border-s-4 border-brand-500 ps-5 text-3xl font-bold tracking-tight text-ink sm:text-5xl">{t('h1')}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-ink-body">{t('subheading')}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={rfqHref} className={btnPrimary}>{t('ctaHero')}</Link>
            <WhatsAppLink>{common('whatsapp')}</WhatsAppLink>
          </div>
        </div>
      </section>

      {/* What it is */}
      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <h2 className={h2}>{t('whatTitle')}</h2>
          <div className="mt-6 space-y-4 leading-relaxed text-ink-body">
            {(t.raw('what') as string[]).map((p) => <p key={p}>{p}</p>)}
          </div>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-line bg-surface-alt lg:col-span-2">
          <Image src="/images/miscellaneous/industrial-refractory-anchor-santura.webp" alt="" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
        </div>
      </section>

      {/* Process comparison */}
      <section className="bg-surface-alt py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className={h2}>{t('compareTitle')}</h2>
          <div className="mt-6 overflow-x-auto rounded-lg border border-line">
            <table className="w-full min-w-[44rem] divide-y divide-line bg-white">
              <thead className="bg-surface-alt">
                <tr>
                  <th scope="col" className={th}>{t('colFeature')}</th>
                  {PROCESSES.map((p) => (
                    <th key={p} scope="col" className={`${th} ${p === 'da' ? 'text-brand-500' : ''}`}>{t(`processes.${p}`)}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {rows.map((r) => (
                  <tr key={r.label}>
                    <th scope="row" className="px-4 py-3 text-start align-top text-sm font-semibold text-ink">{r.label}</th>
                    {PROCESSES.map((p) => (
                      <td key={p} className="px-4 py-3 align-top text-sm leading-relaxed text-ink-body">{r[p]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 max-w-4xl border-s-2 border-brand-500 ps-3 text-sm font-semibold text-ink">{t('compareNote')}</p>
        </div>
      </section>

      {/* Why weld quality matters */}
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

      {/* Products by method */}
      <section className="bg-surface-alt py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className={h2}>{t('productsTitle')}</h2>
          <div className="mt-8 space-y-4">
            {(Object.keys(METHOD_PRODUCTS) as (keyof typeof METHOD_PRODUCTS)[]).map((m) => (
              <div key={m} className={`${card} grid gap-4 md:grid-cols-3`}>
                <div>
                  <h3 className="font-bold text-ink">{t(`methods.${m}.title`)}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-body">{t(`methods.${m}.text`)}</p>
                </div>
                <ul className="flex flex-wrap content-start gap-2 md:col-span-2">
                  {productsFor(METHOD_PRODUCTS[m]).map((p) => (
                    <li key={p.slug}>
                      <Link href={`/products/${p.slug}`} className={chip}>
                        <span className="whitespace-nowrap font-semibold text-brand-500" dir="ltr">{p.code}</span>
                        <span className="text-ink">{p.name}</span>
                      </Link>
                    </li>
                  ))}
                  {m === 'cd' && (
                    <li>
                      <Link href="/products/insulation-pins" className={chip}>
                        <span className="text-ink">{categories('items.insulation-pins.name')}</span>
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-ink-muted">{t('alloysLine')}</p>
        </div>
      </section>

      {/* What we supply + standards */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className={h2}>{t('offerTitle')}</h2>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {(t.raw('offer') as Item[]).map((o) => (
            <li key={o.title} className={card}>
              <h3 className="font-bold text-ink">{o.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-body">{o.text}</p>
            </li>
          ))}
        </ul>

        <h2 className={`mt-14 ${h2}`}>{t('standardsTitle')}</h2>
        <div className="mt-6 overflow-x-auto rounded-lg border border-line">
          <table className="w-full min-w-[32rem] divide-y divide-line bg-white">
            <thead className="bg-surface-alt">
              <tr>
                <th scope="col" className={th}>{t('colStandard')}</th>
                <th scope="col" className={th}>{t('colCovers')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {STANDARDS.map((s) => (
                <tr key={s.key}>
                  <th scope="row" dir="ltr" className="whitespace-nowrap px-4 py-3 text-start text-sm font-semibold text-ink">{s.code}</th>
                  <td className="px-4 py-3 text-sm text-ink-body">{t(`standards.${s.key}`)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-8 rounded-lg border-s-4 border-brand-500 bg-surface-alt p-6">
          <h3 className="font-bold text-ink">{t('etchTitle')}</h3>
          <p className="mt-2 max-w-4xl text-sm leading-relaxed text-ink-body">{t('etchText')}</p>
          <Link href="/quality#micro-etching" className="mt-3 inline-block text-sm font-semibold text-brand-500 hover:text-brand-600">
            {t('etchLink')} →
          </Link>
        </div>
      </section>

      {/* Related services */}
      <section className="bg-surface-alt py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className={h2}>{t('relatedTitle')}</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {(
              [
                ['bright-solution-annealing', 'relatedBsaText'],
                ['pickling-and-passivation', 'relatedPpText'],
                ['pmi-testing', 'relatedPmiText']
              ] as const
            ).map(([slug, key]) => (
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
        <div className="mt-6 divide-y divide-line rounded-lg border border-line">
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
