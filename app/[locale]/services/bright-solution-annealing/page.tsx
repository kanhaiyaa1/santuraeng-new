import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { buildAlternates, siteUrl } from '@/lib/seo';
import { breadcrumbJsonLd } from '@/lib/page';
import { SITE } from '@/lib/site';
import { btnPrimary } from '@/lib/ui';
import { LINING_ANCHOR } from '@/lib/products';
import { getProduct, type LiningType, type Product } from '@/content/products';
import WhatsAppLink from '@/components/WhatsAppLink';

type Props = { params: { locale: string } };
type Item = { title: string; text: string };

const SLUG = 'bright-solution-annealing';
const PATH = `/services/${SLUG}`;

// Temperatures and cooling are language-neutral data; the notes come from the translation file.
const ALLOYS = [
  { key: 'ss304', grade: 'SS304 / 304L', temp: '1040–1120', cooling: 'waterOrAir' },
  { key: 'ss309', grade: 'SS309', temp: '1040–1120', cooling: 'waterOrAir' },
  { key: 'ss310', grade: 'SS310 / 310S', temp: '1040–1120', cooling: 'waterOrAir' },
  { key: 'ss316', grade: 'SS316 / 316L', temp: '1040–1120', cooling: 'waterOrAir' },
  { key: 'ss321', grade: 'SS321', temp: '1040–1120', cooling: 'waterOrAir' },
  { key: 'ma253', grade: '253MA', temp: '1050–1150', cooling: 'water' },
  { key: 'a800', grade: 'Alloy 800 / 800H', temp: '1100–1175', cooling: 'water' },
  { key: 'in601', grade: 'Inconel 601', temp: '1150–1200', cooling: 'water' },
  { key: 'in625', grade: 'Inconel 625', temp: '1150–1230', cooling: 'water' }
] as const;

const LININGS: LiningType[] = ['brick', 'castable', 'double', 'ceramic', 'fibres'];
const EXAMPLE_PRODUCTS = [
  'sepl-06-split-y-anchors',
  'sepl-07-v-anchors',
  'sepl-10-y-anchors-flat',
  'sepl-24-fiber-stud-anchors',
  'sepl-27-melt-extract-needles',
  'sepl-28-cold-drawn-needles-straight'
];

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'bsaPage' });
  const alternates = buildAlternates(PATH, locale);
  return {
    title: { absolute: t('metaTitle') },
    description: t('metaDescription'),
    alternates,
    openGraph: { title: t('metaTitle'), description: t('metaDescription'), url: alternates.canonical, locale, type: 'website' }
  };
}

export default async function BrightSolutionAnnealingPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'bsaPage' });
  const tp = await getTranslations({ locale, namespace: 'products' });
  const common = await getTranslations({ locale, namespace: 'common' });
  const nav = await getTranslations({ locale, namespace: 'nav' });
  const productPage = await getTranslations({ locale, namespace: 'productPage' });

  const faq = t.raw('faq') as { q: string; a: string }[];
  const pageUrl = buildAlternates(PATH, locale).canonical;
  const examples = EXAMPLE_PRODUCTS.map(getProduct).filter((p): p is Product => p !== undefined);
  const rfqHref = { pathname: '/rfq', query: { service: SLUG } } as const;

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: t('h1'),
      serviceType: 'Bright solution annealing',
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
    await breadcrumbJsonLd(locale, PATH, t('h1'))
  ];

  const h2 = 'text-2xl font-bold tracking-tight text-ink sm:text-3xl';
  const card = 'rounded-lg border border-line bg-white p-6';
  const th = 'px-4 py-3 text-start text-xs font-semibold uppercase tracking-wide text-ink-muted';

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

      {/* 1. Hero */}
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

      {/* 2. What it is */}
      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <h2 className={h2}>{t('whatTitle')}</h2>
          <div className="mt-6 space-y-4 leading-relaxed text-ink-body">
            {(t.raw('what') as string[]).map((p) => <p key={p}>{p}</p>)}
          </div>
          <p className="mt-6 border-s-2 border-brand-500 ps-3 font-semibold text-ink">{t('bothOffered')}</p>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-line bg-surface-alt lg:col-span-2">
          <Image src="/images/miscellaneous/steel-wire-coil-inventory-industrial-warehouse-santura.webp" alt="" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
        </div>
      </section>

      {/* 3. Why it matters */}
      <section className="bg-surface-alt py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className={h2}>{t('whyTitle')}</h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-ink-body">{t('whyIntro')}</p>
          <ul className="mt-8 grid gap-5 md:grid-cols-3">
            {(t.raw('risks') as Item[]).map((r) => (
              <li key={r.title} className="rounded-lg border border-line border-s-2 border-s-brand-500 bg-white p-6">
                <h3 className="font-bold text-ink">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-body">{r.text}</p>
              </li>
            ))}
          </ul>
          <div className="mt-8 max-w-3xl space-y-4 leading-relaxed text-ink-body">
            {(t.raw('whyResult') as string[]).map((p) => <p key={p}>{p}</p>)}
          </div>
        </div>
      </section>

      {/* 4. Alloy table */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className={h2}>{t('tableTitle')}</h2>
        <div className="mt-6 overflow-x-auto rounded-lg border border-line">
          <table className="w-full min-w-[44rem] divide-y divide-line bg-white">
            <thead className="bg-surface-alt">
              <tr>
                <th scope="col" className={th}>{t('colAlloy')}</th>
                <th scope="col" className={th}>{t('colTemp')}</th>
                <th scope="col" className={th}>{t('colCooling')}</th>
                <th scope="col" className={th}>{t('colNotes')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {ALLOYS.map((a) => (
                <tr key={a.key}>
                  <th scope="row" dir="ltr" className="whitespace-nowrap px-4 py-3 text-start text-sm font-semibold text-ink">{a.grade}</th>
                  <td dir="ltr" className="whitespace-nowrap px-4 py-3 text-start text-sm text-ink-body">{a.temp}</td>
                  <td className="px-4 py-3 text-sm text-ink-body">{t(`cooling.${a.cooling}`)}</td>
                  <td className="px-4 py-3 text-sm text-ink-body">{t(`notes.${a.key}`)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 max-w-4xl text-sm leading-relaxed text-ink-muted">{t('tableNote')}</p>
      </section>

      {/* 5. Industries */}
      <section className="bg-surface-alt py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className={h2}>{t('industriesTitle')}</h2>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {(t.raw('industries') as { name: string; text: string }[]).map((i) => (
              <li key={i.name} className={card}>
                <h3 className="font-bold text-ink">{i.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-body">{i.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 6. Verification */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className={h2}>{t('verifyTitle')}</h2>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {(t.raw('verify') as Item[]).map((v) => (
            <li key={v.title} className={card}>
              <h3 className="font-bold text-ink">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-body">{v.text}</p>
            </li>
          ))}
        </ul>
        <Link href="/quality#micro-etching" className="mt-6 inline-block text-sm font-semibold text-brand-500 hover:text-brand-600">
          {t('verifyQualityLink')} →
        </Link>
      </section>

      {/* 7. Products */}
      <section className="bg-surface-alt py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className={h2}>{t('productsTitle')}</h2>
          <ul className="mt-8 grid gap-5 md:grid-cols-3">
            {(t.raw('productGroups') as Item[]).map((g) => (
              <li key={g.title} className={card}>
                <h3 className="font-bold text-ink">{g.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-body">{g.text}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-xs font-semibold uppercase tracking-wider text-ink-muted">{t('productCategoriesLabel')}</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {LININGS.map((l) => (
              <li key={l}>
                <Link href={`/refractory-anchors#${LINING_ANCHOR[l]}`} className="block rounded-md border border-line bg-white px-3 py-2 text-sm font-semibold text-ink hover:border-brand-500 hover:text-brand-500">
                  {tp(`linings.${l}`)}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-ink-muted">{t('productExamplesLabel')}</p>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {examples.map((p) => (
              <li key={p.slug}>
                <Link href={`/products/${p.slug}`} className="flex items-center gap-3 rounded-md border border-line bg-white px-4 py-3 text-sm hover:border-brand-500">
                  <span className="shrink-0 whitespace-nowrap font-semibold text-brand-500" dir="ltr">{p.code}</span>
                  <span className="font-semibold text-ink">{p.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 8. FAQ */}
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

      {/* 9. CTA */}
      <section className="bg-surface-alt py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="rounded-lg border border-line border-s-4 border-s-brand-500 bg-white px-8 py-12 sm:px-12">
            <h2 className={h2}>{t('ctaTitle')}</h2>
            <p className="mt-3 max-w-2xl text-ink-body">{t('ctaText')}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={rfqHref} className={btnPrimary}>{t('ctaRfq')}</Link>
              <WhatsAppLink>{common('whatsapp')}</WhatsAppLink>
            </div>
            <Link href="/contact" className="mt-5 inline-block text-sm font-semibold text-brand-500 hover:text-brand-600">
              {t('ctaContact')} →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
