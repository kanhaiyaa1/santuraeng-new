import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { siteUrl } from '@/lib/seo';
import { breadcrumbJsonLd, pageMetadata } from '@/lib/page';
import { SITE } from '@/lib/site';
import PageHeader from '@/components/PageHeader';

type Props = { params: { locale: string } };
type Milestone = { year: string; title: string; text: string };

export function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  return pageMetadata(locale, 'aboutPage', '/about');
}

export default async function AboutPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'aboutPage' });

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: t('h1'),
      mainEntity: {
        '@type': 'Organization',
        name: SITE.legalName,
        url: siteUrl,
        logo: `${siteUrl}/images/logo.jpg`,
        foundingDate: String(SITE.foundingYear),
        founder: { '@type': 'Person', name: SITE.founder.name, jobTitle: SITE.founder.jobTitle },
        address: {
          '@type': 'PostalAddress',
          streetAddress: SITE.headOffice.street,
          addressLocality: SITE.headOffice.locality,
          addressRegion: SITE.headOffice.region,
          postalCode: SITE.headOffice.postalCode,
          addressCountry: SITE.headOffice.country
        }
      }
    },
    await breadcrumbJsonLd(locale, '/about', t('h1'))
  ];

  const h2 = 'text-2xl font-bold tracking-tight text-ink sm:text-3xl';
  const card = 'rounded-lg border border-line bg-white p-6';
  const link = 'mt-4 inline-block text-sm font-semibold text-ink hover:text-brand-500';

  return (
    <main className="bg-white pb-20">
      <PageHeader locale={locale} title={t('h1')} intro={t('intro')} jsonLd={jsonLd} />

      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-16 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <h2 className={h2}>{t('storyTitle')}</h2>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink-body">
            {(t.raw('story') as string[]).map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
        <div className="lg:col-span-2">
          <h2 className={h2}>{t('timelineTitle')}</h2>
          <ol className="mt-6 space-y-6 border-s-2 border-brand-500 ps-6">
            {(t.raw('timeline') as Milestone[]).map((m) => (
              <li key={m.year}>
                <p className="text-sm font-bold text-brand-500"><bdi dir="ltr">{m.year}</bdi></p>
                <p className="font-semibold text-ink">{m.title}</p>
                <p className="text-sm text-ink-body">{m.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-surface-alt py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className={h2}>{t('facilitiesTitle')}</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className={card}>
              <h3 className="text-lg font-bold text-ink">{t('darukhanaTitle')}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-body">{t('darukhanaText')}</p>
              <address className="mt-3 text-sm not-italic text-ink-muted">{SITE.headOffice.lines.join(', ')}</address>
            </div>
            <div className={card}>
              <h3 className="text-lg font-bold text-ink">{t('tarapurTitle')}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-body">{t('tarapurText')}</p>
              <address className="mt-3 text-sm not-italic text-ink-muted">{SITE.works.lines.join(', ')}</address>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-6 py-16 md:grid-cols-2">
        <div className={card}>
          <h2 className="text-xl font-bold text-ink">{t('qualityTitle')}</h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-body">{t('qualityText')}</p>
          <Link href="/quality" className={link}>{t('qualityLink')} →</Link>
        </div>
        <div className={card}>
          <h2 className="text-xl font-bold text-ink">{t('clientsTitle')}</h2>
          <p className="mt-1 text-xs text-ink-muted">{t('clientsNote')}</p>
          <dl className="mt-4 space-y-3">
            <div>
              <dt className="font-semibold text-ink">{t('cemexTitle')}</dt>
              <dd className="text-sm text-ink-body">{t('cemexText')}</dd>
            </div>
            <div>
              <dt className="font-semibold text-ink">{t('sriTitle')}</dt>
              <dd className="text-sm text-ink-body">{t('sriText')}</dd>
            </div>
          </dl>
        </div>
        <div className={card}>
          <h2 className="text-xl font-bold text-ink">{t('productsTitle')}</h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-body">{t('productsText')}</p>
          <Link href="/products" className={link}>{t('productsLink')} →</Link>
        </div>
        <div className={card}>
          <h2 className="text-xl font-bold text-ink">{t('exportTitle')}</h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-body">{t('exportText')}</p>
          <Link href={{ pathname: '/', hash: 'countries' }} className={link}>{t('exportLink')} →</Link>
        </div>
      </section>
    </main>
  );
}
