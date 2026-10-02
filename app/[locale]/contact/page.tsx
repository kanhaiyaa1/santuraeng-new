import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { siteUrl } from '@/lib/seo';
import { breadcrumbJsonLd, pageMetadata } from '@/lib/page';
import { SITE, whatsappUrl } from '@/lib/site';
import PageHeader from '@/components/PageHeader';
import ContactForm from '@/components/ContactForm';

type Props = { params: { locale: string } };

const MAP_QUERY = encodeURIComponent(`Santura Engineering, ${SITE.headOffice.lines.join(', ')}`);

export function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  return pageMetadata(locale, 'contactPage', '/contact');
}

export default async function ContactPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'contactPage' });
  const footer = await getTranslations({ locale, namespace: 'footer' });

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: t('h1'),
      mainEntity: {
        '@type': 'Organization',
        name: SITE.legalName,
        url: siteUrl,
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
        contactPoint: SITE.contacts.map((c) => ({ '@type': 'ContactPoint', name: c.name, telephone: c.tel, email: c.email, contactType: 'sales' }))
      }
    },
    await breadcrumbJsonLd(locale, '/contact', t('h1'))
  ];

  const card = 'rounded-xl border border-slate-200 bg-white p-6';
  const label = 'text-xs font-semibold uppercase tracking-wide text-slate-500';

  return (
    <main className="bg-slate-50 pb-20">
      <PageHeader locale={locale} title={t('h1')} intro={t('intro')} jsonLd={jsonLd} />

      <div className="mx-auto grid max-w-6xl gap-8 px-6 pt-12 lg:grid-cols-5">
        <div className="space-y-6 lg:col-span-2">
          <section className={card}>
            <h2 className="text-lg font-bold text-navy-900">{SITE.legalName}</h2>
            <p className={`mt-4 ${label}`}>{t('officeTitle')}</p>
            <address className="mt-1 text-sm not-italic leading-relaxed text-slate-700">
              {SITE.headOffice.lines.map((l) => (
                <span key={l} className="block">{l}</span>
              ))}
            </address>
            <p className={`mt-4 ${label}`}>{t('worksTitle')}</p>
            <address className="mt-1 text-sm not-italic leading-relaxed text-slate-700">
              {SITE.works.lines.map((l) => (
                <span key={l} className="block">{l}</span>
              ))}
            </address>
            <p className={`mt-4 ${label}`}>{t('hoursTitle')}</p>
            <p className="mt-1 text-sm text-slate-700">{footer('hoursValue')}</p>
          </section>

          <section className={card}>
            <p className={label}>{t('emailTitle')}</p>
            <dl className="mt-2 space-y-3 text-sm">
              <div>
                <dt className="text-slate-500">{t('generalEmail')}</dt>
                <dd><a href={`mailto:${SITE.generalEmail}`} className="font-medium text-navy-700 hover:text-brand-500">{SITE.generalEmail}</a></dd>
              </div>
              {SITE.contacts.map((c) => (
                <div key={c.email}>
                  <dt className="text-slate-500">{c.name}</dt>
                  <dd><a href={`mailto:${c.email}`} className="font-medium text-navy-700 hover:text-brand-500">{c.email}</a></dd>
                </div>
              ))}
            </dl>
            <p className={`mt-5 ${label}`}>{t('phoneTitle')}</p>
            <ul className="mt-2 space-y-2 text-sm">
              {SITE.contacts.map((c) => (
                <li key={c.tel}>
                  <a href={`tel:${c.tel}`} dir="ltr" className="font-medium text-navy-700 hover:text-brand-500">{c.phone}</a>
                  <span className="text-slate-500"> · {c.name}</span>
                </li>
              ))}
            </ul>
            <p className={`mt-5 ${label}`}>{t('whatsappTitle')}</p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block rounded-md bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-navy-950 hover:brightness-95"
            >
              {t('whatsappText')} · <span dir="ltr">{SITE.contacts[0].phone}</span>
            </a>
          </section>
        </div>

        <div className="space-y-6 lg:col-span-3">
          <section className={card}>
            <h2 className="text-xl font-bold text-navy-900">{t('formTitle')}</h2>
            <div className="mt-4 rounded-lg border border-brand-500/20 bg-brand-50 p-4 text-sm text-navy-900">
              {t('rfqNote')}{' '}
              <Link href="/rfq" className="font-semibold text-brand-600 underline hover:text-brand-500">{t('rfqLink')} →</Link>
            </div>
            <div className="mt-6">
              <ContactForm />
            </div>
          </section>
        </div>
      </div>

      <section className="mx-auto max-w-6xl px-6 pt-8">
        <div className={card}>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="text-xl font-bold text-navy-900">{t('mapTitle')}</h2>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-navy-700 hover:text-brand-500"
            >
              {t('openMap')} →
            </a>
          </div>
          <iframe
            title={t('mapIframeTitle')}
            src={`https://www.google.com/maps?q=${MAP_QUERY}&output=embed`}
            className="mt-4 h-80 w-full rounded-lg border-0 sm:h-96"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </main>
  );
}
