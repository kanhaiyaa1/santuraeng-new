import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { buildAlternates, siteUrl } from '@/lib/seo';
import { SITE } from '@/lib/site';
import { btnPrimary } from '@/lib/ui';
import WhatsAppLink from '@/components/WhatsAppLink';

type Props = { params: { locale: string } };
type Item = { title: string; text: string };

const SLUG = 'pmi-testing';
const PATH = `/services/${SLUG}`;

const STANDARDS = [
  { key: 'rp578', code: 'API RP 578' },
  { key: 'e1476', code: 'ASTM E1476' },
  { key: 'specs', code: 'ASTM A240 · A276 · A484' }
] as const;

// Nominal compositions from the ASTM material specifications (language-neutral data).
const ALLOYS = [
  { grade: 'SS304', elements: 'Cr, Ni', composition: 'Cr 17.5–19.5 · Ni 8.0–10.5' },
  { grade: 'SS309 / 309S', elements: 'Cr, Ni', composition: 'Cr 22–24 · Ni 12–15' },
  { grade: 'SS310 / 310S', elements: 'Cr, Ni', composition: 'Cr 24–26 · Ni 19–22' },
  { grade: 'SS316', elements: 'Cr, Ni, Mo', composition: 'Cr 16–18 · Ni 10–14 · Mo 2–3' },
  { grade: 'SS321', elements: 'Cr, Ni, Ti', composition: 'Cr 17–19 · Ni 9–12 · Ti stabilised' },
  { grade: 'SS347', elements: 'Cr, Ni, Nb', composition: 'Cr 17–19 · Ni 9–13 · Nb stabilised' },
  { grade: '253MA', elements: 'Cr, Ni, Si', composition: 'Cr 20–22 · Ni 10–12 · Si 1.4–2.0' },
  { grade: 'Alloy 800 / 800H', elements: 'Ni, Cr, Fe', composition: 'Ni 30–35 · Cr 19–23 · Fe ≥ 39.5' },
  { grade: 'Inconel 601', elements: 'Ni, Cr', composition: 'Ni 58–63 · Cr 21–25 · Al 1.0–1.7' },
  { grade: 'Inconel 625', elements: 'Ni, Cr, Mo, Nb', composition: 'Ni ≥ 58 · Cr 20–23 · Mo 8–10 · Nb 3.15–4.15' }
] as const;

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'pmiPage' });
  const alternates = buildAlternates(PATH, locale);
  return {
    title: { absolute: t('metaTitle') },
    description: t('metaDescription'),
    alternates,
    openGraph: { title: t('metaTitle'), description: t('metaDescription'), url: alternates.canonical, locale, type: 'website' }
  };
}

export default async function PmiTestingPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'pmiPage' });
  const services = await getTranslations({ locale, namespace: 'services' });
  const common = await getTranslations({ locale, namespace: 'common' });
  const nav = await getTranslations({ locale, namespace: 'nav' });
  const productPage = await getTranslations({ locale, namespace: 'productPage' });

  const faq = t.raw('faq') as { q: string; a: string }[];
  const pageUrl = buildAlternates(PATH, locale).canonical;
  const rfqHref = { pathname: '/rfq', query: { service: SLUG } } as const;

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: t('h1'),
      serviceType: 'Positive material identification (PMI) testing',
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
          <Image src="/images/miscellaneous/steel-wire-alloy-quality-testing-santura.webp" alt="" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
        </div>
      </section>

      {/* Why it matters */}
      <section className="bg-surface-alt py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className={h2}>{t('whyTitle')}</h2>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {(t.raw('why') as Item[]).map((w) => (
              <li key={w.title} className="rounded-lg border border-line border-s-2 border-s-brand-500 bg-white p-6">
                <h3 className="font-bold text-ink">{w.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-body">{w.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Methods */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className={h2}>{t('methodsTitle')}</h2>
        <ul className="mt-8 grid gap-5 md:grid-cols-3">
          {(t.raw('methods') as Item[]).map((m) => (
            <li key={m.title} className={card}>
              <h3 className="font-bold text-ink">{m.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-body">{m.text}</p>
            </li>
          ))}
        </ul>
        <div className="mt-6 rounded-lg border border-brand-500/30 bg-brand-50 p-5">
          <h3 className="font-bold text-ink">{t('limitationTitle')}</h3>
          <p className="mt-1 text-sm leading-relaxed text-ink-body">{t('limitationText')}</p>
        </div>
      </section>

      {/* Standards */}
      <section className="bg-surface-alt py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className={h2}>{t('standardsTitle')}</h2>
          <div className="mt-6 overflow-x-auto rounded-lg border border-line">
            <table className="w-full min-w-[36rem] divide-y divide-line bg-white">
              <thead className="bg-surface-alt">
                <tr>
                  <th scope="col" className={th}>{t('colStandard')}</th>
                  <th scope="col" className={th}>{t('colCovers')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {STANDARDS.map((s) => (
                  <tr key={s.key}>
                    <th scope="row" dir="ltr" className="whitespace-nowrap px-4 py-3 text-start align-top text-sm font-semibold text-ink">{s.code}</th>
                    <td className="px-4 py-3 text-sm leading-relaxed text-ink-body">{t(`standards.${s.key}`)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Alloys */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className={h2}>{t('alloysTitle')}</h2>
        <div className="mt-6 overflow-x-auto rounded-lg border border-line">
          <table className="w-full min-w-[40rem] divide-y divide-line bg-white">
            <thead className="bg-surface-alt">
              <tr>
                <th scope="col" className={th}>{t('colGrade')}</th>
                <th scope="col" className={th}>{t('colElements')}</th>
                <th scope="col" className={th}>{t('colComposition')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {ALLOYS.map((a) => (
                <tr key={a.grade}>
                  <th scope="row" dir="ltr" className="whitespace-nowrap px-4 py-3 text-start text-sm font-semibold text-ink">{a.grade}</th>
                  <td dir="ltr" className="whitespace-nowrap px-4 py-3 text-start text-sm text-ink-body">{a.elements}</td>
                  <td dir="ltr" className="px-4 py-3 text-start text-sm text-ink-body">{a.composition}</td>
                </tr>
              ))}
              <tr>
                <th scope="row" className="whitespace-nowrap px-4 py-3 text-start text-sm font-semibold text-ink">{t('carbonSteel')}</th>
                <td dir="ltr" className="px-4 py-3 text-start text-sm text-ink-body">Fe</td>
                <td className="px-4 py-3 text-sm text-ink-body">{t('carbonSteelComposition')}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 max-w-4xl text-sm leading-relaxed text-ink-muted">{t('alloysNote')}</p>
      </section>

      {/* When + Documentation */}
      <section className="bg-surface-alt py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <h2 className={h2}>{t('whenTitle')}</h2>
            <ol className="mt-6 space-y-4">
              {(t.raw('when') as Item[]).map((w, i) => (
                <li key={w.title} className="flex gap-4 rounded-lg border border-line bg-white p-5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-500 text-sm font-bold text-white">{i + 1}</span>
                  <span>
                    <span className="block font-bold text-ink">{w.title}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-ink-body">{w.text}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <div className="lg:col-span-2">
            <h2 className={h2}>{t('docsTitle')}</h2>
            <ul className="mt-6 space-y-3">
              {(t.raw('docs') as string[]).map((d) => (
                <li key={d} className="flex gap-3 leading-relaxed text-ink-body">
                  <span className="text-brand-500" aria-hidden="true">✓</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
            <Link href="/quality" className={`mt-6 ${textLink}`}>{t('qualityLink')} →</Link>
          </div>
        </div>
      </section>

      {/* Related services */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className={h2}>{t('relatedTitle')}</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <Link href="/services/bright-solution-annealing" className={`${card} block hover:border-brand-500`}>
            <span className="block font-bold text-ink">{services('items.bright-solution-annealing.name')}</span>
            <span className="mt-2 block text-sm leading-relaxed text-ink-body">{t('relatedBsaText')}</span>
            <span className={`mt-3 ${textLink}`}>→</span>
          </Link>
          <Link href="/services/pickling-and-passivation" className={`${card} block hover:border-brand-500`}>
            <span className="block font-bold text-ink">{services('items.pickling-and-passivation.name')}</span>
            <span className="mt-2 block text-sm leading-relaxed text-ink-body">{t('relatedPpText')}</span>
            <span className={`mt-3 ${textLink}`}>→</span>
          </Link>
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
