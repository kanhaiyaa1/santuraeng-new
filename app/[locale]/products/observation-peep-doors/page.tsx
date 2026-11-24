import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { buildAlternates, siteUrl } from '@/lib/seo';
import { PHASE1_COUNTRIES, SITE } from '@/lib/site';
import { getCountry } from '@/content/countries';
import { btnPrimary } from '@/lib/ui';
import WhatsAppLink from '@/components/WhatsAppLink';

type Props = { params: { locale: string } };
type Item = { title: string; text: string };

const SLUG = 'observation-peep-doors';
const PATH = `/products/${SLUG}`;
const DOOR_TYPES = ['od', 'pd', 'sp'] as const;
const IMG = '/images/fabrication/observation-doors';

// Workshop photos of Santura observation doors (reference: old site page "Furnace sight or observation door").
// Alt texts are in odPage.gallery, same order.
const GALLERY = [
  `${IMG}/observation-doors-pair-viewing-window.jpg`,
  `${IMG}/observation-door-frame-open-galvanized.jpg`,
  `${IMG}/observation-door-frame-galvanized-front.jpg`,
  `${IMG}/observation-door-flanged-frame-furnace.jpg`,
  `${IMG}/observation-door-components-galvanized.jpg`,
  `${IMG}/observation-doors-galvanized-production-batch.jpg`,
  `${IMG}/observation-doors-stacked-for-dispatch.jpg`,
  `${IMG}/observation-doors-galvanized-batch-closeup.jpg`
];

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'odPage' });
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

export default async function ObservationDoorsPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'odPage' });
  const services = await getTranslations({ locale, namespace: 'services' });
  const categories = await getTranslations({ locale, namespace: 'productCategories' });
  const countries = await getTranslations({ locale, namespace: 'countries' });
  const common = await getTranslations({ locale, namespace: 'common' });
  const nav = await getTranslations({ locale, namespace: 'nav' });
  const productPage = await getTranslations({ locale, namespace: 'productPage' });

  const faq = t.raw('faq') as { q: string; a: string }[];
  const rows = t.raw('specRows') as { label: string; od: string; pd: string; sp: string }[];
  const gallery = t.raw('gallery') as string[];
  const pageUrl = buildAlternates(PATH, locale).canonical;
  const rfqHref = { pathname: '/rfq', query: { category: SLUG } } as const;

  // One link per country page; Belgium and Canada have two language versions, prefer the visitor's language.
  const countryLinks = PHASE1_COUNTRIES.filter((c) => getCountry(c.slug))
    .filter((c, i, all) => {
      const same = all.filter((o) => o.slug === c.slug);
      const pick = same.find((o) => o.locale === locale) ?? same[0];
      return pick === c;
    });

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: t('h1'),
      description: t('metaDescription'),
      url: pageUrl,
      image: GALLERY.slice(0, 4).map((src) => `${siteUrl}${src}`),
      category: categories(`items.${SLUG}.name`),
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
  const chip = 'inline-flex items-center gap-2 rounded-md border border-line bg-white px-3 py-1.5 text-sm text-ink hover:border-brand-500';

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
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={rfqHref} className={btnPrimary}>{t('ctaRfq')}</Link>
              <WhatsAppLink>{common('whatsapp')}</WhatsAppLink>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-line bg-white lg:col-span-2">
            <Image src={GALLERY[0]} alt={gallery[0]} fill priority sizes="(min-width: 1024px) 40vw, 100vw" className="object-contain" />
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <h2 className={h2}>{t('overviewTitle')}</h2>
          <div className="mt-6 space-y-4 leading-relaxed text-ink-body">
            {(t.raw('overview') as string[]).map((p) => <p key={p}>{p}</p>)}
          </div>
          <Link href="/refractory-anchors" className={`mt-5 ${textLink}`}>{t('overviewLink')} →</Link>
        </div>
        <figure className="lg:col-span-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-line bg-white">
            <Image src={GALLERY[1]} alt={gallery[1]} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-contain" />
          </div>
          <figcaption className="mt-2 text-sm text-ink-muted">{t('overviewCaption')}</figcaption>
        </figure>
      </section>

      {/* Types */}
      <section className="bg-surface-alt py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className={h2}>{t('typesTitle')}</h2>
          <ul className="mt-8 grid gap-5 md:grid-cols-3">
            {(t.raw('types') as { title: string; size: string; text: string }[]).map((d) => (
              <li key={d.title} className="rounded-lg border border-line border-t-4 border-t-brand-500 bg-white p-6">
                <h3 className="text-lg font-bold text-ink">{d.title}</h3>
                <p className="mt-1 text-sm font-semibold text-brand-500">{d.size}</p>
                <p className="mt-3 text-sm leading-relaxed text-ink-body">{d.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Construction & materials */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className={h2}>{t('constructionTitle')}</h2>
        <p className="mt-4 max-w-3xl leading-relaxed text-ink-body">{t('constructionIntro')}</p>
        <dl className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {(t.raw('construction') as Item[]).map((c) => (
            <div key={c.title} className="rounded-lg border border-line border-s-2 border-s-brand-500 bg-white p-6">
              <dt className="font-bold text-ink">{c.title}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-ink-body">{c.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Specifications */}
      <section className="bg-surface-alt py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className={h2}>{t('specTitle')}</h2>
          <div className="mt-6 overflow-x-auto rounded-lg border border-line">
            <table className="w-full min-w-[42rem] divide-y divide-line bg-white">
              <thead className="bg-surface-alt">
                <tr>
                  <th scope="col" className={th}>{t('colFeature')}</th>
                  {DOOR_TYPES.map((d) => (
                    <th key={d} scope="col" className={th}>{t(`cols.${d}`)}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {rows.map((r) => (
                  <tr key={r.label}>
                    <th scope="row" className="px-4 py-3 text-start align-top text-sm font-semibold text-ink">{r.label}</th>
                    {DOOR_TYPES.map((d) => (
                      <td key={d} className="px-4 py-3 align-top text-sm leading-relaxed text-ink-body">{r[d]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 max-w-4xl border-s-2 border-brand-500 ps-3 text-sm text-ink-body">{t('specNote')}</p>
        </div>
      </section>

      {/* Applications */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className={h2}>{t('applicationsTitle')}</h2>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {(t.raw('applications') as Item[]).map((a) => (
            <li key={a.title} className={card}>
              <h3 className="font-bold text-ink">{a.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-body">{a.text}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Custom fabrication + process */}
      <section className="bg-surface-alt py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-2">
          <div>
            <h2 className={h2}>{t('fabTitle')}</h2>
            <div className="mt-6 space-y-4 leading-relaxed text-ink-body">
              {(t.raw('fab') as string[]).map((p) => <p key={p}>{p}</p>)}
            </div>
            <p className="mt-6 rounded-lg border-s-4 border-brand-500 bg-white p-5 text-sm leading-relaxed text-ink-body">{t('reference')}</p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-ink">{t('processTitle')}</h3>
            <ol className="mt-6 space-y-4">
              {(t.raw('process') as Item[]).map((s, i) => (
                <li key={s.title} className="flex gap-4 rounded-lg border border-line bg-white p-5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-500 text-sm font-bold text-white">{i + 1}</span>
                  <span>
                    <span className="block font-semibold text-ink">{s.title}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-ink-body">{s.text}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* What we supply */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className={h2}>{t('supplyTitle')}</h2>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {(t.raw('supply') as Item[]).map((o) => (
            <li key={o.title} className={card}>
              <h3 className="font-bold text-ink">{o.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-body">{o.text}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Gallery */}
      <section className="bg-surface-alt py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className={h2}>{t('galleryTitle')}</h2>
          <p className="mt-3 max-w-3xl text-ink-body">{t('galleryText')}</p>
          <ul className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            {GALLERY.map((src, i) => (
              <li key={src}>
                <figure>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-line bg-white">
                    <Image src={src} alt={gallery[i]} fill sizes="(min-width: 768px) 25vw, 50vw" className="object-contain" />
                  </div>
                  <figcaption className="mt-2 text-xs leading-snug text-ink-muted">{gallery[i]}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Related: anchors, services, countries */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className={h2}>{t('relatedTitle')}</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <Link href="/refractory-anchors" className={`${card} block hover:border-brand-500`}>
            <span className="block font-bold text-ink">{categories('items.refractory-anchors.name')}</span>
            <span className="mt-2 block text-sm leading-relaxed text-ink-body">{t('relatedAnchorsText')}</span>
            <span className={`mt-3 ${textLink}`}>→</span>
          </Link>
          {(
            [
              ['stud-welding-solutions', 'relatedSwText'],
              ['pmi-testing', 'relatedPmiText'],
              ['pickling-and-passivation', 'relatedPpText']
            ] as const
          ).map(([slug, key]) => (
            <Link key={slug} href={`/services/${slug}`} className={`${card} block hover:border-brand-500`}>
              <span className="block font-bold text-ink">{services(`items.${slug}.name`)}</span>
              <span className="mt-2 block text-sm leading-relaxed text-ink-body">{t(key)}</span>
              <span className={`mt-3 ${textLink}`}>→</span>
            </Link>
          ))}
        </div>

        <h3 className="mt-12 text-lg font-bold text-ink">{t('countriesTitle')}</h3>
        <p className="mt-2 max-w-3xl text-sm text-ink-body">{t('countriesText')}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {countryLinks.map((c) => (
            <li key={c.slug}>
              <Link href={`/${c.slug}`} locale={c.locale === locale ? undefined : c.locale} hrefLang={c.locale} className={chip}>
                <span className={`fi fi-${c.code.toLowerCase()} rounded-sm`} aria-hidden="true" />
                {countries(`names.${c.code}`)}
              </Link>
            </li>
          ))}
        </ul>
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
