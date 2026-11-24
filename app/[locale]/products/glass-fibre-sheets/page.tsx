import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { buildAlternates, siteUrl } from '@/lib/seo';
import { SITE } from '@/lib/site';
import { btnPrimary } from '@/lib/ui';
import WhatsAppLink from '@/components/WhatsAppLink';
import ProductGallery from '@/components/products/ProductGallery';

type Props = { params: { locale: string } };
type Group = { title: string; intro: string; rows: { name: string; text: string; spec: string }[] };

const SLUG = 'glass-fibre-sheets';
const PATH = `/products/${SLUG}`;
const IMG = '/images/insulation/glass-fibre';

// Photos from the old site's "Fibreglass" page (roving, chopped strand mat, fibre close-up). No photos of glass cloth,
// boards or glass wool on file yet; usage rights to be confirmed by the client. Alt texts: gfPage.gallery, same order.
const GALLERY = [
  `${IMG}/glass-fibre-mat-roll.jpg`,
  `${IMG}/glass-fibre-roving-spools.jpg`,
  `${IMG}/glass-fibre-chopped-strands-closeup.jpg`
];

const STANDARDS = ['ASTM C553', 'ASTM C612', 'ASTM C547', 'ASTM C177 / C518', 'ASTM D4389', 'ASTM E84', 'EN 13162', 'EN ISO 1421', 'BS 3958', 'ISO 8142'] as const;

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'gfPage' });
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

export default async function GlassFibrePage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'gfPage' });
  const categories = await getTranslations({ locale, namespace: 'productCategories' });
  const common = await getTranslations({ locale, namespace: 'common' });
  const nav = await getTranslations({ locale, namespace: 'nav' });
  const productPage = await getTranslations({ locale, namespace: 'productPage' });

  const faq = t.raw('faq') as { q: string; a: string }[];
  const gallery = t.raw('gallery') as string[];
  const groups = t.raw('groups') as Group[];
  const compare = t.raw('compareRows') as { label: string; wool: string; cloth: string; board: string }[];
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
      material: 'E-glass, glass wool',
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
    { href: '/products/ceramic-gaskets', name: categories('items.ceramic-gaskets.name'), text: t('relatedGaskets') },
    { href: '/refractory-anchors', name: categories('items.refractory-anchors.name'), text: t('relatedAnchors') }
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
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className={h2}>{t('overviewTitle')}</h2>
        <p className="mt-4 max-w-4xl leading-relaxed text-ink-body">{t('overview')}</p>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {(t.raw('functions') as { title: string; text: string }[]).map((f) => (
            <article key={f.title} className="rounded-lg border border-line border-t-4 border-t-brand-500 bg-white p-6">
              <h3 className="text-xl font-bold text-ink">{f.title}</h3>
              <p className="mt-3 leading-relaxed text-ink-body">{f.text}</p>
            </article>
          ))}
        </div>
        <p className="mt-6 max-w-4xl border-s-2 border-brand-500 ps-3 text-sm leading-relaxed text-ink-body">{t('glassTypes')}</p>
      </section>

      {/* Product groups */}
      {groups.map((g, gi) => (
        <section key={g.title} className={gi % 2 === 0 ? 'bg-surface-alt py-16' : 'py-16'}>
          <div className="mx-auto max-w-6xl px-6">
            <h2 className={h2}>{g.title}</h2>
            <p className="mt-3 max-w-3xl text-ink-body">{g.intro}</p>
            <div className="mt-6 overflow-x-auto rounded-lg border border-line">
              <table className="w-full min-w-[40rem] divide-y divide-line bg-white">
                <thead className="bg-surface-alt">
                  <tr>
                    <th scope="col" className={th}>{t('colProduct')}</th>
                    <th scope="col" className={th}>{t('colDescription')}</th>
                    <th scope="col" className={th}>{t('colSpec')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {g.rows.map((r) => (
                    <tr key={r.name}>
                      <th scope="row" className="w-1/4 px-4 py-3 text-start align-top text-sm font-semibold text-ink">{r.name}</th>
                      <td className={td}>{r.text}</td>
                      <td className={`${td} w-1/3`}>{r.spec}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      ))}

      {/* Comparison */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className={h2}>{t('compareTitle')}</h2>
          <div className="mt-6 overflow-x-auto rounded-lg border border-line">
            <table className="w-full min-w-[44rem] divide-y divide-line bg-white">
              <thead className="bg-surface-alt">
                <tr>
                  <th scope="col" className={th}>{t('colProperty')}</th>
                  <th scope="col" className={th}>{t('colWool')}</th>
                  <th scope="col" className={th}>{t('colCloth')}</th>
                  <th scope="col" className={th}>{t('colBoard')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {compare.map((r) => (
                  <tr key={r.label}>
                    <th scope="row" className="px-4 py-3 text-start align-top text-sm font-semibold text-ink">{r.label}</th>
                    <td className={td}>{r.wool}</td>
                    <td className={td}>{r.cloth}</td>
                    <td className={td}>{r.board}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 border-s-2 border-brand-500 ps-3 text-sm text-ink-body">{t('compareNote')}</p>
        </div>
      </section>

      {/* Characteristics + standards */}
      <section className="bg-surface-alt py-16">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-2">
        <div>
          <h2 className={h2}>{t('traitsTitle')}</h2>
          <ul className="mt-6 space-y-3">
            {(t.raw('characteristics') as string[]).map((c) => (
              <li key={c} className="flex gap-3 leading-relaxed text-ink-body">{bullet}<span>{c}</span></li>
            ))}
          </ul>
        </div>
        <div>
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
      </div>
      </section>

      {/* Applications */}
      <section className="py-16">
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
      <section className="bg-surface-alt py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className={h2}>{t('supplyTitle')}</h2>
          <div className="mt-6 space-y-4 leading-relaxed text-ink-body">
            {(t.raw('supply') as string[]).map((p) => <p key={p}>{p}</p>)}
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className={h2}>{t('relatedTitle')}</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
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
