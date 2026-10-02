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

  const h2 = 'text-2xl font-bold tracking-tight text-navy-900 sm:text-3xl';
  const card = 'rounded-xl border border-slate-200 bg-white p-6';
  const dt = 'text-xs font-semibold uppercase tracking-wide text-slate-500';
  const dd = 'mt-1 font-medium text-navy-900';

  const iso: [string, string, boolean?][] = [
    [t('standard'), SITE.iso.standard],
    [t('certificateNo'), SITE.iso.certificateNo],
    [t('issuer'), `${SITE.iso.issuer} (United Registrar of Systems)`],
    [t('accreditation'), SITE.iso.accreditation],
    [t('validUntil'), formatDate(SITE.iso.validUntil, locale)],
    [t('scope'), SITE.iso.scope, true]
  ];
  const linde: [string, string][] = [
    [t('lindeCompany'), SITE.linde.name],
    [t('lindeScope'), t('lindeScopeValue')],
    [t('lindeCode'), SITE.linde.supplierCode],
    [t('lindePeriod'), SITE.linde.period]
  ];

  return (
    <main className="bg-white pb-20">
      <PageHeader locale={locale} title={t('h1')} intro={t('intro')} jsonLd={jsonLd} />

      <section className="mx-auto grid max-w-6xl gap-6 px-6 py-16 lg:grid-cols-5">
        <div className={`${card} lg:col-span-3`}>
          <h2 className="text-xl font-bold text-navy-900">{t('isoTitle')}</h2>
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
          <h2 className="text-xl font-bold text-navy-900">{t('lindeTitle')}</h2>
          <p className="mt-2 text-sm text-slate-600">{t('lindeText')}</p>
          <dl className="mt-5 space-y-4">
            {linde.map(([k, v]) => (
              <div key={k}>
                <dt className={dt}>{k}</dt>
                <dd className={dd}>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <h2 className={h2}>{t('testingTitle')}</h2>
            <ul className="mt-8 grid gap-5 sm:grid-cols-2">
              {(t.raw('testing') as Item[]).map((i) => (
                <li key={i.title} className={card}>
                  <h3 className="font-bold text-navy-900">{i.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">{i.text}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-2">
            <h2 className={h2}>{t('documentsTitle')}</h2>
            <ul className="mt-8 space-y-3">
              {(t.raw('documents') as string[]).map((d) => (
                <li key={d} className="flex gap-3 text-slate-700">
                  <span className="text-emerald-600" aria-hidden="true">✓</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className={h2}>{t('standardsTitle')}</h2>
        <p className="mt-3 text-slate-700">{t('standardsIntro')}</p>
        <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full divide-y divide-slate-200 bg-white">
            <thead className="bg-slate-50">
              <tr>
                <th scope="col" className="px-4 py-3 text-start text-xs font-semibold uppercase tracking-wide text-slate-500">{t('standardCol')}</th>
                <th scope="col" className="px-4 py-3 text-start text-xs font-semibold uppercase tracking-wide text-slate-500">{t('coversCol')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {STANDARDS.map((s) => (
                <tr key={s.key}>
                  <th scope="row" dir="ltr" className="whitespace-nowrap px-4 py-3 text-start text-sm font-semibold text-navy-900">{s.code}</th>
                  <td className="px-4 py-3 text-sm text-slate-700">{t(`standards.${s.key}`)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6">
        <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8">
          <h2 className="text-xl font-bold text-navy-900">{t('clientCertsTitle')}</h2>
          <p className="mt-2 text-slate-600">{t('clientCertsText')}</p>
        </div>
      </section>
    </main>
  );
}
