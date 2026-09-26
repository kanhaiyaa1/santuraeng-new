import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { buildAlternates } from '@/lib/seo';

type Props = { params: { locale: string } };

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  return {
    title: 'Products',
    description: 'Browse our range of products available for global export.',
    alternates: buildAlternates('/products', locale)
  };
}

export default function ProductsPage({ params: { locale } }: Props) {
  setRequestLocale(locale);

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-3xl font-bold text-gray-900">Products</h1>
      <p className="mt-4 text-gray-600">
        Product listing will be populated from Supabase. Add rows to a{' '}
        <code className="rounded bg-gray-100 px-1 py-0.5">products</code> table and fetch them here.
      </p>
    </main>
  );
}
