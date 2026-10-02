import { getTranslations } from 'next-intl/server';
import { breadcrumbJsonLd, formatDate } from '@/lib/page';
import PageHeader from '@/components/PageHeader';

type Section = { title: string; body: string[] };

/** Privacy policy / disclaimer layout: numbered sections from a translation namespace. */
export default async function LegalPage({
  locale,
  namespace,
  pathname,
  updated
}: {
  locale: string;
  namespace: 'privacyPage' | 'disclaimerPage';
  pathname: string;
  updated: string;
}) {
  const t = await getTranslations({ locale, namespace });
  const sections = t.raw('sections') as Section[];

  return (
    <main className="bg-white pb-20">
      <PageHeader locale={locale} title={t('h1')} intro={t('intro')} jsonLd={[await breadcrumbJsonLd(locale, pathname, t('h1'))]} />
      <div className="mx-auto max-w-3xl px-6 pt-10">
        <p className="text-sm text-slate-500">{t('updated', { date: formatDate(updated, locale) })}</p>
        {sections.map((s) => (
          <section key={s.title} className="mt-10">
            <h2 className="text-xl font-bold text-navy-900">{s.title}</h2>
            <div className="mt-3 space-y-3 leading-relaxed text-slate-700">
              {s.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
