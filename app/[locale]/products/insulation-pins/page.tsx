import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { buildAlternates, siteUrl } from '@/lib/seo';
import { SITE } from '@/lib/site';
import { getProduct } from '@/content/products';
import { btnPrimary } from '@/lib/ui';
import WhatsAppLink from '@/components/WhatsAppLink';
import ProductGallery from '@/components/products/ProductGallery';

type Props = { params: { locale: string } };
type Item = { title: string; text: string };

const SLUG = 'insulation-pins';
const PATH = `/products/${SLUG}`;
const SEPL24 = getProduct('sepl-24-fiber-stud-anchors');

// Old-site photos of insulation pins plus washer images from the Washers product page. Alt texts: ipPage.gallery.
const GALLERY = [
  '/images/insulation/insulation-pins/insulation-pins-perforated-base-plate.jpg',
  '/images/insulation/insulation-pins/insulation-pins-washers-assortment.jpg',
  '/images/products/washers/anchor-washer-speed-washers-stainless-steel-render.jpg',
  '/images/products/washers/anchor-washer-square-render-orange.jpg',
  '/images/products/washers/anchor-washer-speed-dome-render-blue.jpg',
  '/images/products/washers/anchor-washers-speed-assortment-photo.jpg',
  '/images/insulation/insulation-pins/insulation-pin-perforated-base-plate-red-background.jpg'
];

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'ipPage' });
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

export default async function InsulationPinsPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'ipPage' });
  const categories = await getTranslations({ locale, namespace: 'productCategories' });
  const services = await getTranslations({ locale, namespace: 'services' });
  const common = await getTranslations({ locale, namespace: 'common' });
  const nav = await getTranslations({ locale, namespace: 'nav' });
  const productPage = await getTranslations({ locale, namespace: 'productPage' });

  const faq = t.raw('faq') as { q: string; a: string }[];
  const gallery = t.raw('gallery') as string[];
  const types = t.raw('types') as { title: string; text: string; rows: { label: string; value: string }[] }[];
  const guide = t.raw('guideRows') as { application: string; pin: string; why: string }[];
  const specs = t.raw('specRows') as { label: string; value: string }[];
  const materials = t.raw('materials') as { name: string; use: string; temp: string }[];
  const accessories = t.raw('accessories') as { title: string; text: string; sizes: string }[];
  const steps = t.raw('steps') as Item[];
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
      material: 'SS304, SS316, galvanised carbon steel, aluminium, PVC, nylon',
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
  const td = 'px-4 py-3 align-top text-sm leading-relaxed text-ink-body';
  const textLink = 'inline-block text-sm font-semibold text-brand-500 hover:text-brand-600';
  const bullet = <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" aria-hidden="true" />;

  // Insulation materials the pins are used with; those with a page on this site link to it.
  const compatible = [
    { label: t('compatible.mineralWool'), href: '/products/mineral-wool' },
    { label: t('compatible.glassWool'), href: '/products/glass-fibre-sheets' },
    { label: t('compatible.eps'), href: '/products/polystyrene-insulation' },
    { label: t('compatible.xps'), href: '/products/polystyrene-insulation' },
    { label: t('compatible.puf'), href: null },
    { label: t('compatible.ceramic'), href: SEPL24 ? `/products/${SEPL24.slug}` : null }
  ];

  const related = [
    { href: '/products/mineral-wool', name: categories('items.mineral-wool.name'), text: t('relatedMineralWool') },
    { href: '/products/glass-fibre-sheets', name: categories('items.glass-fibre-sheets.name'), text: t('relatedGlassFibre') },
    { href: '/products/calcium-silicate', name: categories('items.calcium-silicate.name'), text: t('relatedCalsil') },
    { href: '/products/ceramic-gaskets', name: categories('items.ceramic-gaskets.name'), text: t('relatedGaskets') },
    { href: '/refractory-anchors', name: categories('items.refractory-anchors.name'), text: t('relatedAnchors') },
    ...(SEPL24 ? [{ href: `/products/${SEPL24.slug}`, name: `${SEPL24.code} ${SEPL24.name}`, text: t('relatedSepl24') }] : []),
    { href: '/services/stud-welding-solutions', name: services('items.stud-welding-solutions.name'), text: t('relatedSw') },
    { href: '/products/washers', name: t('relatedWashersName'), text: t('relatedWashers') },
    { href: '/products/insulation-accessories', name: categories('items.insulation-accessories.name'), text: t('relatedAccessories') }
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
                <li key={b} className="rounded-full border border-line bg-white px-3 py-1 text-xs font-semibold text-ink">{b}</li>
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
      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-3">
        <div className="min-w-0 lg:col-span-2">
          <h2 className={h2}>{t('overviewTitle')}</h2>
          <div className="mt-6 space-y-4 leading-relaxed text-ink-body">
            {(t.raw('overview') as string[]).map((p) => <p key={p}>{p}</p>)}
          </div>
        </div>
        <aside className="self-start rounded-lg border-s-4 border-brand-500 bg-surface-alt p-6">
          <h3 className="font-bold text-ink">{t('madeTitle')}</h3>
          <ul className="mt-3 space-y-2">
            {(t.raw('made') as string[]).map((m) => (
              <li key={m} className="flex gap-2 text-sm leading-relaxed text-ink-body">{bullet}<span>{m}</span></li>
            ))}
          </ul>
        </aside>
      </section>

      {/* Types by fixing method */}
      <section className="bg-surface-alt py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className={h2}>{t('typesTitle')}</h2>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {types.map((ty, i) => (
              <article key={ty.title} className="flex flex-col rounded-lg border border-line border-t-4 border-t-brand-500 bg-white p-6">
                <span className="text-sm font-bold text-brand-500">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-1 text-xl font-bold text-ink">{ty.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-body">{ty.text}</p>
                <dl className="mt-4 divide-y divide-line border-t border-line text-sm">
                  {ty.rows.map((r) => (
                    <div key={r.label} className="py-2.5">
                      <dt className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{r.label}</dt>
                      <dd className="mt-0.5 leading-relaxed text-ink">{r.value}</dd>
                    </div>
                  ))}
                </dl>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Selection guide */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className={h2}>{t('guideTitle')}</h2>
        <p className="mt-3 max-w-3xl text-ink-body">{t('guideIntro')}</p>
        <div className="mt-6 overflow-x-auto rounded-lg border border-line">
          <table className="w-full min-w-[40rem] divide-y divide-line bg-white">
            <thead className="bg-surface-alt">
              <tr>
                <th scope="col" className={th}>{t('colApplication')}</th>
                <th scope="col" className={th}>{t('colPin')}</th>
                <th scope="col" className={th}>{t('colWhy')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {guide.map((g) => (
                <tr key={g.application}>
                  <th scope="row" className="px-4 py-3 text-start align-top text-sm font-semibold text-ink">{g.application}</th>
                  <td className={`${td} font-semibold text-brand-500`}>{g.pin}</td>
                  <td className={td}>{g.why}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Specifications + materials */}
      <section className="bg-surface-alt py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-5">
          <div className="min-w-0 lg:col-span-2">
            <h2 className={h2}>{t('specTitle')}</h2>
            <div className="mt-6 overflow-x-auto rounded-lg border border-line">
              <table className="w-full divide-y divide-line bg-white">
                <tbody className="divide-y divide-line">
                  {specs.map((r) => (
                    <tr key={r.label}>
                      <th scope="row" className="w-2/5 px-4 py-3 text-start align-top text-sm font-semibold text-ink">{r.label}</th>
                      <td className={td}>{r.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="min-w-0 lg:col-span-3">
            <h2 className={h2}>{t('materialsTitle')}</h2>
            <div className="mt-6 overflow-x-auto rounded-lg border border-line">
              <table className="w-full min-w-[32rem] divide-y divide-line bg-white">
                <thead className="bg-surface-alt">
                  <tr>
                    <th scope="col" className={th}>{t('colMaterial')}</th>
                    <th scope="col" className={th}>{t('colBestFor')}</th>
                    <th scope="col" className={th}>{t('colMaxTemp')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {materials.map((m) => (
                    <tr key={m.name}>
                      <th scope="row" className="px-4 py-3 text-start align-top text-sm font-semibold text-ink">{m.name}</th>
                      <td className={td}>{m.use}</td>
                      <td className={`${td} whitespace-nowrap`}>{m.temp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 border-s-2 border-brand-500 ps-3 text-sm text-ink-body">{t('materialsNote')}</p>
          </div>
        </div>
      </section>

      {/* Accessories */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className={h2}>{t('accessoriesTitle')}</h2>
        <p className="mt-3 max-w-3xl text-ink-body">{t('accessoriesIntro')}</p>
        <ul className="mt-8 grid gap-5 md:grid-cols-3">
          {accessories.map((a) => (
            <li key={a.title} className="flex flex-col rounded-lg border border-line border-s-2 border-s-brand-500 bg-white p-6">
              <h3 className="font-bold text-ink">{a.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-body">{a.text}</p>
              <p className="mt-4 text-xs font-semibold text-brand-500">{a.sizes}</p>
            </li>
          ))}
        </ul>
        <Link href="/products/washers" className={`mt-6 ${textLink}`}>{t('washersLink')} →</Link>
      </section>

      {/* Compatible insulation */}
      <section className="bg-surface-alt py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className={h2}>{t('compatibleTitle')}</h2>
          <p className="mt-3 max-w-3xl text-ink-body">{t('compatibleIntro')}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {compatible.map((c) => (
              <li key={c.label}>
                {c.href ? (
                  <Link href={c.href} className="inline-block rounded-md border border-line bg-white px-3 py-1.5 text-sm font-semibold text-ink hover:border-brand-500 hover:text-brand-500">{c.label}</Link>
                ) : (
                  <span className="inline-block rounded-md border border-line bg-white px-3 py-1.5 text-sm font-semibold text-ink">{c.label}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Installation */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className={h2}>{t('installTitle')}</h2>
        <ol className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title} className={card}>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-500 text-sm font-bold text-white">{i + 1}</span>
              <h3 className="mt-4 font-bold text-ink">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-body">{s.text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-8 rounded-lg border-s-4 border-brand-500 bg-surface-alt p-6">
          <h3 className="font-bold text-ink">{t('spacingTitle')}</h3>
          <ul className="mt-3 space-y-2">
            {(t.raw('spacing') as string[]).map((s) => (
              <li key={s} className="flex gap-2 text-sm leading-relaxed text-ink-body">{bullet}<span>{s}</span></li>
            ))}
          </ul>
        </div>
      </section>

      {/* Technical considerations */}
      <section className="bg-surface-alt py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className={h2}>{t('techTitle')}</h2>
          <ul className="mt-8 grid gap-5 md:grid-cols-3">
            {(t.raw('tech') as Item[]).map((c) => (
              <li key={c.title} className={card}>
                <h3 className="font-bold text-ink">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-body">{c.text}</p>
              </li>
            ))}
          </ul>
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
        <div className="mx-auto max-w-4xl px-6">
          <h2 className={h2}>{t('supplyTitle')}</h2>
          <div className="mt-6 space-y-4 leading-relaxed text-ink-body">
            {(t.raw('supply') as string[]).map((p) => <p key={p}>{p}</p>)}
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className={h2}>{t('relatedTitle')}</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
