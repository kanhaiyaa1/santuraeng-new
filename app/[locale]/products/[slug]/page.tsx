import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { buildAlternates } from '@/lib/seo';

type Props = { params: { locale: string; slug: string } };

export async function generateMetadata({ params: { locale, slug } }: Props): Promise<Metadata> {
  return {
    title: slug,
    alternates: buildAlternates(`/products/${slug}`, locale)
  };
}

export default function ProductPage({ params: { slug, locale } }: Props) {
  setRequestLocale(locale);

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold text-gray-900">{slug}</h1>
      <p className="mt-4 text-gray-600">
        Fetch this product&apos;s details from Supabase using the <code className="rounded bg-gray-100 px-1 py-0.5">slug</code> param.
      </p>
    </main>
  );
}
