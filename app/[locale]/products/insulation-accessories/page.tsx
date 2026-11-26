import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { buildAlternates, siteUrl } from '@/lib/seo';
import { SITE } from '@/lib/site';
import { btnPrimary } from '@/lib/ui';
import { getProduct } from '@/content/products';
import WhatsAppLink from '@/components/WhatsAppLink';
import ProductGallery from '@/components/products/ProductGallery';

type Props = { params: { locale: string } };
type Group = { title: string; tag: string; text: string; items: string[] };

const SLUG = 'insulation-accessories';
const PATH = `/products/${SLUG}`;
const SEPL04 = getProduct('sepl-04-scissor-clips');

// Photos already on file (usage rights to be confirmed by the client; see docs/image-inventory.md).
// No photos of banding rolls, springs, screws or installed jacketing yet. Alt texts: iaPage.gallery, same order.
const GALLERY = [
  '/images/fasteners/general/banding-clip-stainless-steel.jpg',
  '/images/fasteners/general/pop-rivets-stainless-steel-group.jpg',
  '/images/fasteners/general/blind-rivet-stainless-steel-side.jpg',
  '/images/fabrication/general/perforated-flat-strip-stainless-steel.jpg',
  '/images/fabrication/general/perforated-angle-brackets-stainless-steel-stack.jpg',
  '/images/fabrication/general/perforated-cylinder-stainless-steel.jpg',
  '/images/products/sepl-04-scissor-clips/sepl-04-scissor-clip-stainless-steel-render.jpg'
];

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'iaPage' });
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

export default async function InsulationAccessoriesPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'iaPage' });
  const categories = await getTranslations({ locale, namespace: 'productCategories' });
  const common = await getTranslations({ locale, namespace: 'common' });
  const nav = await getTranslations({ locale, namespace: 'nav' });
  const productPage = await getTranslations({ locale, namespace: 'productPage' });

  const faq = t.raw('faq') as { q: string; a: string }[];
  const gallery = t.raw('gallery') as string[];
  const groups = t.raw('groups') as Group[];
  const specRows = t.raw('specRows') as { item: string; material: string; sizes: string; temp: string; use: string }[];
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
      material: 'Stainless steel, galvanised steel, aluminium, Monel',
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
    { href: '/products/insulation-pins', name: categories('items.insulation-pins.name'), text: t('relatedPins') },
    { href: '/products/mineral-wool', name: categories('items.mineral-wool.name'), text: t('relatedMineralWool') },
    { href: '/products/calcium-silicate', name: categories('items.calcium-silicate.name'), text: t('relatedCalsil') },
    { href: '/products/glass-fibre-sheets', name: categories('items.glass-fibre-sheets.name'), text: t('relatedGlassFibre') },
    ...(SEPL04 ? [{ href: `/products/${SEPL04.slug}`, name: `${SEPL04.code} ${SEPL04.name}`, text: t('relatedSepl04') }] : []),
    { href: '/products/fasteners', name: categories('items.fasteners.name'), text: t('relatedFasteners') }
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

      {/* Accessory groups */}
      <section className="bg-surface-alt py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className={h2}>{t('groupsTitle')}</h2>
          <p className="mt-3 max-w-3xl text-ink-body">{t('groupsIntro')}</p>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {groups.map((g) => (
              <li key={g.title} className={`${card} flex flex-col`}>
                <h3 className="font-bold text-ink">{g.title}</h3>
                {g.tag && <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-brand-500">{g.tag}</p>}
                <p className="mt-2 text-sm leading-relaxed text-ink-body">{g.text}</p>
                <ul className="mt-3 space-y-2">
                  {g.items.map((it) => (
                    <li key={it} className="flex gap-2 text-sm leading-relaxed text-ink-body">{bullet}<span>{it}</span></li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <div className="mt-8 rounded-lg border-s-4 border-brand-500 bg-white p-6">
            <h3 className="font-bold text-ink">{t('pinsBoxTitle')}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-body">{t('pinsBoxText')}</p>
            <Link href="/products/insulation-pins" className={`mt-3 ${textLink}`}>{t('pinsBoxLink')} →</Link>
          </div>
        </div>
      </section>

      {/* Specification summary */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className={h2}>{t('specTitle')}</h2>
        <div className="mt-6 overflow-x-auto rounded-lg border border-line">
          <table className="w-full min-w-[52rem] divide-y divide-line bg-white">
            <thead className="bg-surface-alt">
              <tr>
                <th scope="col" className={th}>{t('colItem')}</th>
                <th scope="col" className={th}>{t('colMaterial')}</th>
                <th scope="col" className={th}>{t('colSizes')}</th>
                <th scope="col" className={th}>{t('colTemp')}</th>
                <th scope="col" className={th}>{t('colUse')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {specRows.map((r) => (
                <tr key={r.item}>
                  <th scope="row" className={rowTh}>{r.item}</th>
                  <td className={td}>{r.material}</td>
                  <td className={td}>{r.sizes}</td>
                  <td className={td}>{r.temp}</td>
                  <td className={td}>{r.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 border-s-2 border-brand-500 ps-3 text-sm text-ink-body">{t('specNote')}</p>
      </section>

      {/* Selection and installation guidance + materials */}
      <section className="bg-surface-alt py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-2">
          <div className="min-w-0">
            <h2 className={h2}>{t('guideTitle')}</h2>
            <ul className="mt-6 space-y-3">
              {(t.raw('guide') as string[]).map((g) => (
                <li key={g} className="flex gap-3 leading-relaxed text-ink-body">{bullet}<span>{g}</span></li>
              ))}
            </ul>
          </div>
          <div className="min-w-0">
            <h2 className={h2}>{t('materialsTitle')}</h2>
            <ul className="mt-6 flex flex-wrap gap-2">
              {(t.raw('materials') as string[]).map((m) => (
                <li key={m} className="rounded-full border border-line bg-white px-3 py-1 text-sm text-ink">{m}</li>
              ))}
            </ul>
            <div className="mt-8 rounded-lg border-s-4 border-brand-500 bg-white p-6">
              <h3 className="font-bold text-ink">{t('madeTitle')}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-body">{t('madeText')}</p>
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
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
          <p className="mt-6 text-xs text-ink-muted">{t('trademarkNote')}</p>
        </div>
      </section>
    </main>
  );
}
