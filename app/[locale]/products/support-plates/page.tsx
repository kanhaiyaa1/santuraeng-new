import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { buildAlternates, siteUrl } from '@/lib/seo';
import { SITE } from '@/lib/site';
import { getProduct } from '@/content/products';
import { btnPrimary } from '@/lib/ui';
import WhatsAppLink from '@/components/WhatsAppLink';

type Props = { params: { locale: string } };
type Item = { title: string; text: string };
type PlateType = { key: string; title: string; text: string; points: string[]; alt: string };

const SLUG = 'support-plates';
const PATH = `/products/${SLUG}`;
const CONSOLES = getProduct('sepl-02-brick-supports-consoles');

// PLACEHOLDER IMAGES: no photos of support plates on file yet. Each image area is a line drawing with the
// descriptive alt text from spPage (heroAlt, types[].alt). Replace with <Image> when the client sends photos.
const hatch = (x: number, y: number, w: number, h: number) =>
  Array.from({ length: Math.ceil((w + h) / 8) }, (_, i) => {
    const d = i * 8;
    return <line key={`${x}-${y}-${i}`} x1={x + Math.max(0, d - h)} y1={y + Math.min(h, d)} x2={x + Math.min(w, d)} y2={y + Math.max(0, d - w)} strokeWidth="1" opacity="0.35" />;
  });

const DRAWINGS: Record<string, ReactNode> = {
  refractory: (
    <>
      <rect x="14" y="8" width="8" height="84" fill="currentColor" stroke="none" />
      {hatch(22, 14, 62, 30)}
      <path d="M22 46 H90" strokeWidth="5" />
      <path d="M22 78 L70 48" strokeWidth="4" />
    </>
  ),
  base: (
    <>
      <rect x="48" y="8" width="24" height="62" strokeWidth="3" />
      <rect x="18" y="70" width="84" height="8" fill="currentColor" stroke="none" />
      <path d="M30 60 V92 M90 60 V92" strokeWidth="3" />
      {hatch(10, 78, 100, 16)}
    </>
  ),
  mounting: (
    <>
      <rect x="14" y="20" width="92" height="60" rx="3" strokeWidth="4" />
      {[[28, 34], [92, 34], [28, 66], [92, 66]].map(([cx, cy]) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="5" strokeWidth="3" />)}
      <rect x="44" y="40" width="32" height="20" strokeWidth="2" strokeDasharray="4 3" />
    </>
  ),
  gusset: (
    <>
      <rect x="18" y="8" width="12" height="84" fill="currentColor" stroke="none" />
      <rect x="30" y="26" width="76" height="10" fill="currentColor" stroke="none" opacity="0.5" />
      <path d="M30 36 H66 L30 72 Z" strokeWidth="4" strokeLinejoin="round" />
    </>
  ),
  embed: (
    <>
      <rect x="20" y="22" width="80" height="8" fill="currentColor" stroke="none" />
      {[34, 60, 86].map((x) => <path key={x} d={`M${x} 30 V70 M${x - 6} 70 H${x + 6}`} strokeWidth="4" />)}
      {hatch(10, 30, 100, 56)}
    </>
  )
};

function Drawing({ kind, label, className }: { kind: string; label: string; className: string }) {
  return (
    <svg viewBox="0 0 120 100" role="img" aria-label={label} className={className} fill="none" stroke="currentColor">
      <title>{label}</title>
      {DRAWINGS[kind]}
    </svg>
  );
}

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'spPage' });
  const alternates = buildAlternates(PATH, locale);
  return {
    title: { absolute: t('metaTitle') },
    description: t('metaDescription'),
    alternates,
    openGraph: { title: t('metaTitle'), description: t('metaDescription'), url: alternates.canonical, locale, type: 'website' }
  };
}

export default async function SupportPlatesPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'spPage' });
  const categories = await getTranslations({ locale, namespace: 'productCategories' });
  const services = await getTranslations({ locale, namespace: 'services' });
  const common = await getTranslations({ locale, namespace: 'common' });
  const nav = await getTranslations({ locale, namespace: 'nav' });
  const productPage = await getTranslations({ locale, namespace: 'productPage' });

  const faq = t.raw('faq') as { q: string; a: string }[];
  const types = t.raw('types') as PlateType[];
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
      category: categories(`items.${SLUG}.name`),
      material: 'IS 2062, ASTM A36, ASTM A572 Grade 50, IS 2002, SA 516 Gr 70, SS304, SS310, SS316',
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

  const relatedProducts = [
    { href: '/products/foundation-bolts', name: categories('items.foundation-bolts.name'), text: t('relatedFoundationBolts') },
    { href: '/products/industrial-stanchions', name: categories('items.industrial-stanchions.name'), text: t('relatedStanchions') },
    { href: '/products/pipe-guides-sleeves', name: categories('items.pipe-guides-sleeves.name'), text: t('relatedPipeGuides') },
    { href: '/refractory-anchors', name: categories('items.refractory-anchors.name'), text: t('relatedAnchors') }
  ];
  const relatedServices = [
    ['stud-welding-solutions', 'relatedSwText'],
    ['pmi-testing', 'relatedPmiText'],
    ['pickling-and-passivation', 'relatedPpText']
  ] as const;

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

      {/* Hero (placeholder image) */}
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
          <div className="flex aspect-[4/3] items-center justify-center rounded-lg border border-line bg-white p-10 lg:col-span-2">
            <Drawing kind="base" label={t('heroAlt')} className="h-full w-full text-brand-500" />
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className={h2}>{t('overviewTitle')}</h2>
        <div className="mt-6 grid gap-8 lg:grid-cols-3">
          <div className="space-y-4 leading-relaxed text-ink-body lg:col-span-2">
            {(t.raw('overview') as string[]).map((p) => <p key={p}>{p}</p>)}
          </div>
          <ul className="space-y-4">
            {(t.raw('uses') as Item[]).map((u, i) => (
              <li key={u.title} className="rounded-lg border border-line border-s-4 border-s-brand-500 bg-white p-5">
                <span className="text-xs font-semibold uppercase tracking-wide text-brand-500">{i + 1}</span>
                <span className="mt-1 block font-bold text-ink">{u.title}</span>
                <span className="mt-1 block text-sm leading-relaxed text-ink-body">{u.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Types */}
      <section className="bg-surface-alt py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className={h2}>{t('typesTitle')}</h2>
          <div className="mt-8 space-y-5">
            {types.map((d) => (
              <article key={d.key} id={d.key} className="grid scroll-mt-24 gap-6 rounded-lg border border-line bg-white p-6 md:grid-cols-4">
                <div className="flex aspect-[6/5] items-center justify-center rounded-md border border-line bg-surface-alt p-4">
                  <Drawing kind={d.key} label={d.alt} className="h-full w-full text-brand-500" />
                </div>
                <div className="md:col-span-3">
                  <h3 className="text-xl font-bold text-ink">{d.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink-body">{d.text}</p>
                  <ul className="mt-4 grid gap-x-8 gap-y-2 text-sm leading-relaxed text-ink-body sm:grid-cols-2">
                    {d.points.map((p) => (
                      <li key={p} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" aria-hidden="true" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                  {d.key === 'refractory' && CONSOLES && (
                    <Link href={`/products/${CONSOLES.slug}`} className={`mt-4 ${textLink}`}>
                      <span dir="ltr">{CONSOLES.code}</span> {CONSOLES.name} →
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Materials */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className={h2}>{t('materialsTitle')}</h2>
        <dl className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {(t.raw('materials') as Item[]).map((m) => (
            <div key={m.title} className="rounded-lg border border-line border-t-4 border-t-brand-500 bg-white p-6">
              <dt className="font-bold text-ink">{m.title}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-ink-body">{m.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Specifications */}
      <section className="bg-surface-alt py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className={h2}>{t('specTitle')}</h2>
          <div className="mt-6 overflow-x-auto rounded-lg border border-line">
            <table className="w-full min-w-[28rem] divide-y divide-line bg-white">
              <thead className="bg-surface-alt">
                <tr>
                  <th scope="col" className={th}>{t('colProperty')}</th>
                  <th scope="col" className={th}>{t('colRange')}</th>
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
          <p className="mt-4 border-s-2 border-brand-500 ps-3 text-sm text-ink-body">{t('specNote')}</p>
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

      {/* What we supply */}
      <section className="bg-surface-alt py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className={h2}>{t('supplyTitle')}</h2>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {(t.raw('supply') as Item[]).map((o) => (
              <li key={o.title} className="rounded-lg border border-line border-s-2 border-s-brand-500 bg-white p-6">
                <h3 className="font-bold text-ink">{o.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-body">{o.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Related products + services */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className={h2}>{t('relatedTitle')}</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {relatedProducts.map((r) => (
            <Link key={r.href} href={r.href} className={`${card} block hover:border-brand-500`}>
              <span className="block font-bold text-ink">{r.name}</span>
              <span className="mt-2 block text-sm leading-relaxed text-ink-body">{r.text}</span>
              <span className={`mt-3 ${textLink}`}>→</span>
            </Link>
          ))}
        </div>
        <h3 className="mt-12 text-lg font-bold text-ink">{t('servicesTitle')}</h3>
        <div className="mt-4 grid gap-5 md:grid-cols-3">
          {relatedServices.map(([slug, key]) => (
            <Link key={slug} href={`/services/${slug}`} className={`${card} block hover:border-brand-500`}>
              <span className="block font-bold text-ink">{services(`items.${slug}.name`)}</span>
              <span className="mt-2 block text-sm leading-relaxed text-ink-body">{t(key)}</span>
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
