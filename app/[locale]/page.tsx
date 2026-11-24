import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { buildAlternates, siteUrl } from '@/lib/seo';
import { SITE } from '@/lib/site';
import Hero from '@/components/home/Hero';
import ProductCategories from '@/components/home/ProductCategories';
import TrustSignals from '@/components/home/TrustSignals';
import Industries from '@/components/home/Industries';
import RfqCta from '@/components/home/RfqCta';

type Props = { params: { locale: string } };

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta.home' });
  const alternates = buildAlternates('/', locale);

  return {
    title: { absolute: t('title') },
    description: t('description'),
    alternates,
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: alternates.canonical,
      locale,
      type: 'website',
      images: [{ url: '/images/santura-engineering-factory-tarapur-boisar.jpg', width: 1200, height: 630 }]
    }
  };
}

export default async function HomePage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'nav' });
  const pageUrl = buildAlternates('/', locale).canonical;

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE.legalName,
      url: siteUrl,
      logo: `${siteUrl}/images/santura-engineering-logo.jpg`,
      foundingDate: String(SITE.foundingYear),
      email: SITE.generalEmail,
      telephone: SITE.phone.tel,
      address: {
        '@type': 'PostalAddress',
        streetAddress: SITE.headOffice.street,
        addressLocality: SITE.headOffice.locality,
        addressRegion: SITE.headOffice.region,
        postalCode: SITE.headOffice.postalCode,
        addressCountry: SITE.headOffice.country
      },
      contactPoint: [{ '@type': 'ContactPoint', name: SITE.phone.contact, telephone: SITE.phone.tel, contactType: 'sales' }]
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [{ '@type': 'ListItem', position: 1, name: t('home'), item: pageUrl }]
    }
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero />
      <ProductCategories />
      <TrustSignals />
      <Industries />
      <RfqCta />
    </>
  );
}
