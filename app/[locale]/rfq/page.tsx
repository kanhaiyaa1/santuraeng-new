import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { buildAlternates } from '@/lib/seo';
import { PRODUCTS, productTitle } from '@/content/products';
import { getCountry } from '@/content/countries';
import RfqForm from '@/components/RfqForm';

type Props = {
  params: { locale: string };
  searchParams: { product?: string | string[]; country?: string | string[] };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'rfqPage' });
  return {
    title: t('title'),
    description: t('description'),
    alternates: buildAlternates('/rfq', locale)
  };
}

export default async function RfqPage({ params: { locale }, searchParams }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'rfqPage' });
  const form = await getTranslations({ locale, namespace: 'rfqForm' });

  const requested = Array.isArray(searchParams.product) ? searchParams.product[0] : searchParams.product;
  const product = requested ? PRODUCTS.find((p) => p.code === requested || p.slug === requested) : undefined;
  const defaultMessage = product ? `${form('productPrefix')}: ${productTitle(product)}\n` : '';

  const countrySlug = Array.isArray(searchParams.country) ? searchParams.country[0] : searchParams.country;
  const country = countrySlug ? getCountry(countrySlug) : undefined;
  const names = await getTranslations({ locale, namespace: 'countries' });
  const defaultCountry = country ? names(`names.${country.code}`) : '';

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight text-navy-900">{t('title')}</h1>
      <p className="mb-8 mt-4 text-slate-600">{t('intro')}</p>
      <RfqForm defaultMessage={defaultMessage} defaultCountry={defaultCountry} />
    </main>
  );
}
