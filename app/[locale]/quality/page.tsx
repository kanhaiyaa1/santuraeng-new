import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { breadcrumbJsonLd, formatDate, pageMetadata } from '@/lib/page';
import { SITE } from '@/lib/site';
import PageHeader from '@/components/PageHeader';
import { QUALITY_PHOTOS } from '@/lib/photos';
import PhotoGrid from '@/components/PhotoGrid';

type Props = { params: { locale: string } };
type Item = { title: string; text: string };
type EtchTest = { code: string; title: string; text: string };

// Metal product categories the micro etching test applies to (insulation materials are excluded).
const ETCH_CATEGORIES = [
  'refractory-anchors', 'insulation-pins', 'fasteners', 'foundation-bolts',
  'support-plates', 'pipe-guides-sleeves', 'counter-weight-systems', 'steel-plates'
] as const;

// Codes are language-neutral; the description of each comes from the translation file.
const STANDARDS = [
  { key: 'A240', code: 'ASTM A240' },
  { key: 'A276', code: 'ASTM A276' },
  { key: 'A484', code: 'ASTM A484' },
  { key: 'B166', code: 'ASTM B166' },
  { key: 'B168', code: 'ASTM B168' },
  { key: 'DIN17440', code: 'DIN 17440' }
] as const;

export function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  return pageMetadata(locale, 'qualityPage', '/quality');
}

export default async function QualityPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'qualityPage' });
  const pmi = await getTranslations({ locale, namespace: 'pmiPage' });
  const pc = await getTranslations({ locale, namespace: 'productCategories' });
  const jsonLd = [await breadcrumbJsonLd(locale, '/quality', t('h1'))];

  const h2 = 'text-2xl font-bold tracking-tight text-ink sm:text-3xl';
  const card = 'rounded-lg border border-line bg-white p-6';
  const dt = 'text-xs font-semibold uppercase tracking-wide text-ink-muted';
  const dd = 'mt-1 font-medium text-ink';

  const iso: [string, string, boolean?][] = [
    [t('standard'), SITE.iso.standard],
    [t('certificateNo'), SITE.iso.certificateNo],
    [t('issuer'), `${SITE.iso.issuer} (United Registrar of Systems)`],
    [t('accreditation'), SITE.iso.accreditation],
    [t('validUntil'), formatDate(SITE.iso.validUntil, locale)],
    [t('scope'), SITE.iso.scope, true]
  ];
  // Third element: render left-to-right (codes and year ranges reverse in Arabic otherwise).
  const linde: [string, string, boolean][] = [
    [t('lindeCompany'), SITE.linde.name, true],
    [t('lindeScope'), t('lindeScopeValue'), false],
    [t('lindeCode'), SITE.linde.supplierCode, true],
    [t('lindePeriod'), SITE.linde.period, true]
  ];

  return (
    <main className="bg-white pb-20">
      <PageHeader locale={locale} title={t('h1')} intro={t('intro')} jsonLd={jsonLd} />

      <section className="mx-auto grid max-w-6xl gap-6 px-6 py-16 lg:grid-cols-5">
        <div className={`${card} lg:col-span-3`}>
          <h2 className="text-xl font-bold text-ink">{t('isoTitle')}</h2>
          <dl className="mt-5 grid gap-5 sm:grid-cols-2">
            {iso.map(([k, v, wide]) => (
              <div key={k} className={wide ? 'sm:col-span-2' : undefined}>
                <dt className={dt}>{k}</dt>
                <dd className={dd} dir={k === t('scope') || k === t('certificateNo') ? 'ltr' : undefined}>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className={`${card} lg:col-span-2`}>
          <h2 className="text-xl font-bold text-ink">{t('lindeTitle')}</h2>
          <p className="mt-2 text-sm text-ink-body">{t('lindeText')}</p>
          <dl className="mt-5 space-y-4">
            {linde.map(([k, v, ltr]) => (
              <div key={k}>
                <dt className={dt}>{k}</dt>
                <dd className={dd}>{ltr ? <bdi dir="ltr">{v}</bdi> : v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-surface-alt py-16">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <h2 className={h2}>{t('testingTitle')}</h2>
            <ul className="mt-8 grid gap-5 sm:grid-cols-2">
              {(t.raw('testing') as Item[]).map((i) => (
                <li key={i.title} className={card}>
                  <h3 className="font-bold text-ink">{i.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-body">{i.text}</p>
                </li>
              ))}
            </ul>
            <Link href="/services/pmi-testing" className="mt-6 inline-block text-sm font-semibold text-brand-500 hover:text-brand-600">
              {pmi('pmiLinkFromQuality')} →
            </Link>
          </div>
          <div className="lg:col-span-2">
            <h2 className={h2}>{t('documentsTitle')}</h2>
            <ul className="mt-8 space-y-3">
              {(t.raw('documents') as string[]).map((d) => (
                <li key={d} className="flex gap-3 text-ink-body">
                  <span className="text-brand-500" aria-hidden="true">✓</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mx-auto mt-12 max-w-6xl px-6">
          <h3 className="text-xl font-bold text-ink">{t('photosTitle')}</h3>
          <div className="mt-5">
            <PhotoGrid keys={QUALITY_PHOTOS} cols="sm:grid-cols-3 lg:grid-cols-5" />
          </div>
        </div>
      </section>

      <section id="micro-etching" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-16">
        <h2 className={h2}>{t('etch.title')}</h2>
        <div className="mt-4 max-w-4xl space-y-4 leading-relaxed text-ink-body">
          {(t.raw('etch.intro') as string[]).map((p) => <p key={p}>{p}</p>)}
        </div>

        <h3 className="mt-10 text-xl font-bold text-ink">{t('etch.testsTitle')}</h3>
        <ul className="mt-5 grid gap-5 md:grid-cols-3">
          {(t.raw('etch.tests') as EtchTest[]).map((e) => (
            <li key={e.title} className={card}>
              <p dir="ltr" className="text-xs font-semibold uppercase tracking-wide text-brand-500 rtl:text-end">{e.code}</p>
              <h4 className="mt-2 font-bold text-ink">{e.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-ink-body">{e.text}</p>
            </li>
          ))}
        </ul>

        <h3 className="mt-12 text-xl font-bold text-ink">{t('etch.readingTitle')}</h3>
        <dl className="mt-5 divide-y divide-line overflow-hidden rounded-lg border border-line bg-white">
          {(t.raw('etch.reading') as Item[]).map((r) => (
            <div key={r.title} className="grid gap-1 px-5 py-4 sm:grid-cols-4 sm:gap-6">
              <dt className="font-semibold text-ink">{r.title}</dt>
              <dd className="text-sm leading-relaxed text-ink-body sm:col-span-3">{r.text}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 max-w-4xl text-sm leading-relaxed text-ink-muted">{t('etch.readingNote')}</p>

        <div className="mt-12 grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <h3 className="text-xl font-bold text-ink">{t('etch.productsTitle')}</h3>
            <p className="mt-3 leading-relaxed text-ink-body">{t('etch.productsText')}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {ETCH_CATEGORIES.map((slug) => (
                <li key={slug}>
                  <Link href={slug === 'refractory-anchors' ? '/refractory-anchors' : `/products/${slug}`} className="inline-block rounded-full border border-line bg-white px-3 py-1.5 text-sm text-ink hover:border-brand-500 hover:text-brand-500">
                    {pc(`items.${slug}.name`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border-s-4 border-brand-500 bg-surface-alt p-6 lg:col-span-2">
            <p className="leading-relaxed text-ink-body">{t('etch.requestText')}</p>
            <div className="mt-4 flex flex-col gap-2 text-sm font-semibold">
              <Link href="/services/bright-solution-annealing" className="text-brand-500 hover:text-brand-600">{t('etch.linkBsa')} →</Link>
              <Link href="/services/stud-welding-solutions" className="text-brand-500 hover:text-brand-600">{t('etch.linkSw')} →</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line mx-auto max-w-6xl px-6 py-16">
        <h2 className={h2}>{t('standardsTitle')}</h2>
        <p className="mt-3 text-ink-body">{t('standardsIntro')}</p>
        <div className="mt-6 overflow-x-auto rounded-lg border border-line">
          <table className="w-full divide-y divide-line bg-white">
            <thead className="bg-surface-alt">
              <tr>
                <th scope="col" className="px-4 py-3 text-start text-xs font-semibold uppercase tracking-wide text-ink-muted">{t('standardCol')}</th>
                <th scope="col" className="px-4 py-3 text-start text-xs font-semibold uppercase tracking-wide text-ink-muted">{t('coversCol')}</th>
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
      </section>

      <section className="mx-auto max-w-6xl px-6">
        <div className="rounded-lg border border-dashed border-ink-muted/30 bg-surface-alt p-8">
          <h2 className="text-xl font-bold text-ink">{t('clientCertsTitle')}</h2>
          <p className="mt-2 text-ink-body">{t('clientCertsText')}</p>
        </div>
      </section>
    </main>
  );
}
