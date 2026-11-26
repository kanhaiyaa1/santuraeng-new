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

const SLUG = 'pickling-and-passivation';
const PATH = `/services/${SLUG}`;

const STANDARDS = [
  { key: 'a380', code: 'ASTM A380' },
  { key: 'a967', code: 'ASTM A967' },
  { key: 'verify', code: 'ASTM A967 Practice D' }
] as const;

// Product groups and where they link to (fabrication has no page yet, so it goes to the quote form).
const PRODUCT_GROUPS = [
  { key: 'anchors', href: '/refractory-anchors' },
  { key: 'fibres', href: '/products/steel-fibres' },
  { key: 'counterweights', href: '/products/counter-weight-systems' },
  { key: 'fasteners', href: '/products/fasteners' },
  { key: 'fabrication', href: '/rfq' }
] as const;

const EXAMPLE_PRODUCTS = ['sepl-06-split-y-anchors', 'sepl-07-v-anchors', 'sepl-13-corrugated-v-round-anchors', 'sepl-24-fiber-stud-anchors'];

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'ppPage' });
  const alternates = buildAlternates(PATH, locale);
  return {
    title: { absolute: t('metaTitle') },
    description: t('metaDescription'),
    alternates,
    openGraph: { title: t('metaTitle'), description: t('metaDescription'), url: alternates.canonical, locale, type: 'website' }
  };
}

export default async function PicklingPassivationPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'ppPage' });
  const services = await getTranslations({ locale, namespace: 'services' });
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
      serviceType: 'Pickling and passivation',
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
  const processes = [t.raw('pickling'), t.raw('passivation')] as { title: string; points: string[] }[];

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

      {/* 2. What it is: two processes */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className={h2}>{t('whatTitle')}</h2>
        <p className="mt-4 max-w-3xl leading-relaxed text-ink-body">{t('whatIntro')}</p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {processes.map((proc, i) => (
            <div key={proc.title} className="rounded-lg border border-line border-s-4 border-s-brand-500 bg-white p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-500">{i + 1}</p>
              <h3 className="mt-1 text-xl font-bold text-ink">{proc.title}</h3>
              <ul className="mt-4 space-y-2">
                {proc.points.map((pt) => (
                  <li key={pt} className="flex gap-3 text-sm leading-relaxed text-ink-body">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" aria-hidden="true" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Why it matters */}
      <section className="bg-surface-alt py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <h2 className={h2}>{t('whyTitle')}</h2>
            <p className="mt-4 leading-relaxed text-ink-body">{t('whyIntro')}</p>
            <ul className="mt-6 space-y-4">
              {(t.raw('damage') as Item[]).map((d) => (
                <li key={d.title} className="rounded-lg border border-line border-s-2 border-s-brand-500 bg-white p-5">
                  <h3 className="font-bold text-ink">{d.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-body">{d.text}</p>
                </li>
              ))}
            </ul>
            <div className="mt-6 space-y-4 leading-relaxed text-ink-body">
              {(t.raw('whyResult') as string[]).map((p) => <p key={p}>{p}</p>)}
            </div>
          </div>
          <div className="relative aspect-[3/4] overflow-hidden rounded-lg border border-line bg-white lg:col-span-2">
            <Image src="/images/products/general/industrial-steel-bent-anchor-rods-santura.webp" alt="" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      {/* 4. Standards */}
      <section className="mx-auto max-w-6xl px-6 py-16">
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
                  <th scope="row" className="whitespace-nowrap px-4 py-3 text-start align-top text-sm font-semibold text-ink">
                    {s.key === 'verify' && <span className="block text-xs font-medium text-ink-muted">{t('verifyLabel')}</span>}
                    <span dir="ltr">{s.code}</span>
                  </th>
                  <td className="px-4 py-3 text-sm leading-relaxed text-ink-body">{t(`standards.${s.key}`)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. Materials + 6. Methods */}
      <section className="bg-surface-alt py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className={h2}>{t('materialsTitle')}</h2>
          <ul className="mt-6 grid gap-5 md:grid-cols-3">
            {(t.raw('materials') as Item[]).map((m) => (
              <li key={m.title} className={card}>
                <h3 className="font-bold text-ink">{m.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-body">{m.text}</p>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-ink-muted">{t('carbonSteelNote')}</p>

          <h2 className={`mt-14 ${h2}`}>{t('methodsTitle')}</h2>
          <ul className="mt-6 grid gap-5 md:grid-cols-3">
            {(t.raw('methods') as Item[]).map((m) => (
              <li key={m.title} className={card}>
                <h3 className="font-bold text-ink">{m.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-body">{m.text}</p>
              </li>
            ))}
          </ul>
          <p className="mt-4 rounded-md border border-line bg-white p-4 text-sm text-ink-body">{t('methodsNote')}</p>
        </div>
      </section>

      {/* 7. When to specify + 8. Related services */}
      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-2">
        <div>
          <h2 className={h2}>{t('whenTitle')}</h2>
          <ul className="mt-6 space-y-3">
            {(t.raw('when') as string[]).map((w) => (
              <li key={w} className="flex gap-3 leading-relaxed text-ink-body">
                <span className="text-brand-500" aria-hidden="true">✓</span>
                <span>{w}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className={h2}>{t('relatedTitle')}</h2>
          <div className="mt-6 space-y-4">
            <div className={card}>
              <h3 className="font-bold text-ink">{t('relatedBsaTitle')}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-body">{t('relatedBsaText')}</p>
              <Link href="/services/bright-solution-annealing" className={`mt-3 ${textLink}`}>{services('items.bright-solution-annealing.name')} →</Link>
            </div>
            <div className={card}>
              <h3 className="font-bold text-ink">{t('relatedPmiTitle')}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-body">{t('relatedPmiText')}</p>
              <Link href="/services/pmi-testing" className={`mt-3 ${textLink}`}>{services('items.pmi-testing.name')} →</Link>
            </div>
            <Link href="/quality" className={textLink}>{t('qualityLink')} →</Link>
          </div>
        </div>
      </section>

      {/* 9. Products */}
      <section className="bg-surface-alt py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className={h2}>{t('productsTitle')}</h2>
          <ul className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
            {PRODUCT_GROUPS.map((g) => (
              <li key={g.key}>
                <Link href={g.href} className="block h-full rounded-md border border-line bg-white px-4 py-3 text-sm font-semibold text-ink hover:border-brand-500 hover:text-brand-500">
                  {t(`products.${g.key}`)}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-ink-muted">{t('productExamplesLabel')}</p>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
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

      {/* 10. CTA */}
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
