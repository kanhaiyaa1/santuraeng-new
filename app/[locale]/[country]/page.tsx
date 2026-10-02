import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { buildAlternates, buildCountryAlternates, siteUrl } from '@/lib/seo';
import { SITE, qualityArgs, whatsappUrl } from '@/lib/site';
import { truncate } from '@/lib/products';
import { getProduct } from '@/content/products';
import { COUNTRIES, contentFor, getCountry, localized, type Country } from '@/content/countries';

type Props = { params: { locale: string; country: string } };

export const dynamicParams = false;

export function generateStaticParams() {
  return COUNTRIES.map((c) => ({ country: c.slug }));
}

function alternatesFor(country: Country, locale: string) {
  return buildCountryAlternates(`/${country.slug}`, locale, country.hreflang);
}

export async function generateMetadata({ params: { locale, country: slug } }: Props): Promise<Metadata> {
  const country = getCountry(slug);
  if (!country) return {};
  const t = await getTranslations({ locale, namespace: 'countryPage' });
  const names = await getTranslations({ locale, namespace: 'countries' });
  const title = t('metaTitle', { country: names(`names.${country.code}`) });
  const content = contentFor(country, locale);
  const description = truncate(localized(content.metaDescription, locale, content.contentLang).text, 155);
  const alternates = alternatesFor(country, locale);

  return {
    title: { absolute: title },
    description,
    keywords: content.keywords,
    alternates,
    openGraph: { title, description, url: alternates.canonical, locale, type: 'website' }
  };
}

export default async function CountryPage({ params: { locale, country: slug } }: Props) {
  const country = getCountry(slug);
  if (!country) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'countryPage' });
  const names = await getTranslations({ locale, namespace: 'countries' });
  const nav = await getTranslations({ locale, namespace: 'nav' });
  const common = await getTranslations({ locale, namespace: 'common' });
  const productPage = await getTranslations({ locale, namespace: 'productPage' });
  const trust = await getTranslations({ locale, namespace: 'trust' });
  const quality = qualityArgs(locale);

  const titleName = names(`names.${country.code}`);
  const name = locale === 'en' ? country.sentenceNameEn : titleName;
  const content = contentFor(country, locale);
  const contentLang = content.contentLang ?? 'en';
  const hero = localized(content.heroSubheading, locale, contentLang);
  const intro = localized(content.intro, locale, contentLang);
  const pageUrl = alternatesFor(country, locale).canonical;
  // Technical blocks keep their own language (usually English) and LTR direction on other-language pages.
  const en = locale === contentLang ? {} : ({ lang: contentLang, dir: 'ltr' } as const);
  const langAttrs = (lang: string) => (lang === locale ? {} : ({ lang, dir: 'ltr' } as const));

  const spotlight = content.spotlight;
  const products = content.products
    .map((p) => ({ ...p, product: getProduct(p.slug) }))
    .filter((p): p is typeof p & { product: NonNullable<typeof p.product> } => Boolean(p.product));

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE.legalName,
      url: siteUrl,
      logo: `${siteUrl}/images/logo.jpg`,
      foundingDate: String(SITE.foundingYear),
      email: SITE.generalEmail,
      telephone: SITE.contacts[0].tel,
      address: {
        '@type': 'PostalAddress',
        streetAddress: SITE.headOffice.street,
        addressLocality: SITE.headOffice.locality,
        addressRegion: SITE.headOffice.region,
        postalCode: SITE.headOffice.postalCode,
        addressCountry: SITE.headOffice.country
      },
      areaServed: { '@type': 'Country', name: names(`names.${country.code}`), identifier: country.code }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: nav('home'), item: buildAlternates('/', locale).canonical },
        { '@type': 'ListItem', position: 2, name: titleName, item: pageUrl }
      ]
    }
  ];

  const rfqHref = { pathname: '/rfq', query: { country: country.slug } } as const;
  const h2 = 'text-2xl font-bold tracking-tight text-navy-900 sm:text-3xl';

  return (
    <main className="bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="border-b border-slate-200 bg-white">
        <nav aria-label={productPage('breadcrumb')} className="mx-auto max-w-6xl px-6 py-3 text-sm text-slate-500">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-navy-700">{nav('home')}</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="font-medium text-navy-900">{titleName}</li>
          </ol>
        </nav>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-navy-900 to-navy-950 text-white">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
          <p className="flex items-center gap-3 text-sm font-semibold uppercase tracking-wider text-brand-500">
            <span className={`fi fi-${country.code.toLowerCase()} rounded-sm text-lg`} aria-hidden="true" />
            {t('eyebrow', { country: titleName })}
          </p>
          <h1 className="mt-4 max-w-4xl text-3xl font-bold tracking-tight sm:text-5xl">{t('h1', { country: name })}</h1>
          <p {...langAttrs(hero.lang)} className="mt-6 max-w-3xl text-start text-lg leading-relaxed text-navy-100">
            {hero.text}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={rfqHref} className="rounded-md bg-brand-500 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-600">
              {t('rfqButton')}
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-[#25D366] px-6 py-3 text-sm font-semibold text-navy-950 hover:brightness-95"
            >
              {common('whatsapp')}
            </a>
          </div>
          <p className="mt-6 text-sm font-semibold text-white">{common('facts')}</p>
        </div>
      </section>

      {/* Intro + verified client */}
      <section className="py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <p {...langAttrs(intro.lang)} className="text-start text-lg leading-relaxed text-slate-700">
              {intro.text}
            </p>
            {locale !== contentLang && <p className="mt-4 text-sm italic text-slate-500">{t('technicalEnglish')}</p>}
          </div>
          {(content.verifiedClient || content.regionalReferences) && (
            <div className="space-y-6">
              {content.verifiedClient && (
                <aside className="rounded-xl border border-emerald-200 bg-emerald-50 p-6">
                  <h2 className="text-sm font-semibold uppercase tracking-wide text-emerald-800">{t('clientTitle', { country: name })}</h2>
                  <p {...en} className="mt-3 text-start text-lg font-bold text-navy-900">{content.verifiedClient.name}</p>
                  <p {...en} className="mt-1 text-start text-sm text-slate-700">{content.verifiedClient.address}</p>
                  <p className="mt-4 text-xs text-emerald-900/80">{t(content.verifiedClient.evidence === 'client' ? 'clientNoteConfirmed' : 'clientNote')}</p>
                </aside>
              )}
              {content.regionalReferences && (
                <aside className="rounded-xl border border-emerald-200 bg-emerald-50 p-6">
                  <h2 className="text-sm font-semibold uppercase tracking-wide text-emerald-800">{t('referencesTitle')}</h2>
                  <ul {...en} className="mt-3 space-y-3 text-start">
                    {content.regionalReferences.map((r) => (
                      <li key={r.name}>
                        <p className="font-bold text-navy-900">{r.name}</p>
                        <p className="text-sm text-slate-700">{r.location}</p>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-xs text-emerald-900/80">{t('referencesNote')}</p>
                </aside>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Country-specific technical focus */}
      {spotlight && (
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-500">{t('spotlightEyebrow')}</p>
          <div {...en}>
            <h2 className={`mt-2 text-start ${h2}`}>{spotlight.title}</h2>
            <div className="mt-6 max-w-4xl space-y-4 text-start leading-relaxed text-slate-700">
              {spotlight.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            {spotlight.table && (
              <div className="mt-8 overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full min-w-[40rem] divide-y divide-slate-200 bg-white">
                  <thead className="bg-slate-50">
                    <tr>
                      {spotlight.table.head.map((h) => (
                        <th key={h} scope="col" className="px-4 py-3 text-start text-xs font-semibold uppercase tracking-wide text-slate-500">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {spotlight.table.rows.map(([zone, ...cells]) => (
                      <tr key={zone}>
                        <th scope="row" className="px-4 py-3 text-start text-sm font-semibold text-navy-900">{zone}</th>
                        {cells.map((c, i) => (
                          <td key={i} className="px-4 py-3 text-sm text-slate-700">{c}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </section>
      )}

      {/* Industries */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className={h2}>{t('industriesTitle', { country: name })}</h2>
          <p className="mt-2 text-sm text-slate-500">{t('industriesNote')}</p>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {content.industries.map((ind) => (
              <li key={ind.name} {...en} className="rounded-xl border border-slate-200 bg-white p-6 text-start">
                <h3 className="text-lg font-bold text-navy-900">{ind.name}</h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {ind.companies.map((c) => (
                    <li key={c} className="rounded-full bg-navy-100 px-3 py-1 text-xs font-medium text-navy-700">{c}</li>
                  ))}
                </ul>
                <p className="mt-4 text-sm leading-relaxed text-slate-700">{ind.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Regions */}
      <section className="bg-navy-950 py-16 text-white">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{t('regionsTitle')}</h2>
          <dl {...en} className="mt-8 grid gap-x-10 gap-y-6 text-start sm:grid-cols-2">
            {content.regions.map((r) => (
              <div key={r.name} className="border-s-2 border-brand-500 ps-4">
                <dt className="font-semibold">{r.name}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-navy-100">{r.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Products */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className={h2}>{t('productsTitle')}</h2>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map(({ slug: pSlug, reason, product }) => (
              <li key={pSlug}>
                <Link
                  href={`/products/${pSlug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:border-navy-600 hover:shadow-md"
                >
                  <span className="relative block aspect-[4/3] bg-slate-50">
                    {product.images[0] && (
                      <Image src={product.images[0]} alt="" fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-contain p-4" />
                    )}
                  </span>
                  <span className="flex flex-1 flex-col p-5">
                    {product.code && <span className="text-xs font-semibold tracking-wide text-brand-500">{product.code}</span>}
                    <span className="mt-1 font-bold text-navy-900">{product.name}</span>
                    <span {...en} className="mt-2 flex-1 text-start text-sm text-slate-600">{reason}</span>
                    <span className="mt-4 text-sm font-semibold text-navy-700 group-hover:text-brand-500">{t('viewProduct')} →</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Shipping + documents */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <h2 className={h2}>{t('shippingTitle')}</h2>
            <p className="mt-3 text-slate-700">{t('shippingIntro')}</p>
            <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full min-w-[30rem] divide-y divide-slate-200 bg-white">
                <thead className="bg-slate-50">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-start text-xs font-semibold uppercase tracking-wide text-slate-500">{t('destination')}</th>
                    <th scope="col" className="px-4 py-3 text-start text-xs font-semibold uppercase tracking-wide text-slate-500">{t('route')}</th>
                    <th scope="col" className="px-4 py-3 text-start text-xs font-semibold uppercase tracking-wide text-slate-500">{t('transit')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {content.shipping.routes.map((r) => (
                    <tr key={r.destination}>
                      <th scope="row" dir="auto" className="px-4 py-3 text-start text-sm font-semibold text-navy-900">{r.destination}</th>
                      <td dir="auto" className="px-4 py-3 text-sm text-slate-700">{r.route}</td>
                      <td dir="auto" className="whitespace-nowrap px-4 py-3 text-sm text-slate-700">{r.transit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <ul {...en} className="mt-4 space-y-1 text-start text-sm text-slate-600">
              {content.shipping.notes.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-2">
            <h2 className={h2}>{t('qualityTitle')}</h2>
            <ul className="mt-6 space-y-4">
              <li className="rounded-xl border border-slate-200 bg-white p-5">
                <p className="font-bold text-navy-900">{trust('items.iso.title')}</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-700">{trust('items.iso.text', quality.iso)}</p>
              </li>
              <li className="rounded-xl border border-slate-200 bg-white p-5">
                <p className="font-bold text-navy-900">{trust('items.linde.title')}</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-700">{trust('items.linde.text', quality.linde)}</p>
              </li>
            </ul>
            <h2 className={`mt-10 ${h2}`}>{t('documentsTitle')}</h2>
            <ul {...en} className="mt-6 space-y-3 text-start">
              {content.documents.map((d) => (
                <li key={d} className="flex gap-3 text-sm text-slate-700">
                  <span className="mt-0.5 text-emerald-600" aria-hidden="true">✓</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* RFQ CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="rounded-2xl bg-gradient-to-br from-navy-700 to-navy-900 px-8 py-12 text-white sm:px-12">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{t('rfqTitle', { country: name })}</h2>
            <p className="mt-3 max-w-2xl text-navy-100">{t('rfqText')}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={rfqHref} className="rounded-md bg-brand-500 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-600">
                {t('rfqButton')}
              </Link>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-[#25D366] px-6 py-3 text-sm font-semibold text-navy-950 hover:brightness-95"
              >
                {common('whatsapp')}
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
