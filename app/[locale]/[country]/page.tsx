import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { buildAlternates } from '@/lib/seo';

type Props = { params: { locale: string; country: string } };

export async function generateMetadata({ params: { locale, country } }: Props): Promise<Metadata> {
  return {
    title: `Santur Aeng in ${country}`,
    alternates: buildAlternates(`/${country}`, locale)
  };
}

export default function CountryPage({ params: { country, locale } }: Props) {
  setRequestLocale(locale);

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold text-gray-900">Serving {country}</h1>
      <p className="mt-4 text-gray-600">
        Add country-specific content, certifications, or logistics details here.
      </p>
    </main>
  );
}
