import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { breadcrumbJsonLd, formatDate, pageMetadata } from '@/lib/page';
import { SITE } from '@/lib/site';
import PageHeader from '@/components/PageHeader';

type Props = { params: { locale: string } };
type Item = { title: string; text: string };

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
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
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
