import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { buildAlternates } from '@/lib/seo';
import { PRODUCTS, productTitle } from '@/content/products';
import { getCountry } from '@/content/countries';
import { getCategory } from '@/content/product-categories';
import { getService } from '@/content/services';
import RfqForm from '@/components/RfqForm';

type Props = {
  params: { locale: string };
  searchParams: { product?: string | string[]; country?: string | string[]; category?: string | string[]; service?: string | string[] };
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
  const categorySlug = Array.isArray(searchParams.category) ? searchParams.category[0] : searchParams.category;
  const category = categorySlug ? getCategory(categorySlug) : undefined;
  const categories = await getTranslations({ locale, namespace: 'productCategories' });
  const serviceSlug = Array.isArray(searchParams.service) ? searchParams.service[0] : searchParams.service;
  const service = serviceSlug ? getService(serviceSlug) : undefined;
  const services = await getTranslations({ locale, namespace: 'services' });
  const requestedName = product
    ? productTitle(product)
    : category
      ? categories(`items.${category.slug}.name`)
      : service
        ? services(`items.${service.slug}.name`)
        : '';
  const prefix = !product && !category && service ? form('servicePrefix') : form('productPrefix');
  const defaultMessage = requestedName ? `${prefix}: ${requestedName}\n` : '';

  const countrySlug = Array.isArray(searchParams.country) ? searchParams.country[0] : searchParams.country;
  const country = countrySlug ? getCountry(countrySlug) : undefined;
  const names = await getTranslations({ locale, namespace: 'countries' });
  const defaultCountry = country ? names(`names.${country.code}`) : '';

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight text-ink">{t('title')}</h1>
      <p className="mb-8 mt-4 text-ink-body">{t('intro')}</p>
      <RfqForm defaultMessage={defaultMessage} defaultCountry={defaultCountry} />
    </main>
  );
}
