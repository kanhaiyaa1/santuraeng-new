import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { buildAlternates } from '@/lib/seo';
import RfqForm from '@/components/RfqForm';

type Props = { params: { locale: string } };

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  return {
    title: 'Request a Quote',
    description: 'Tell us what you need and our team will respond with a quote.',
    alternates: buildAlternates('/rfq', locale)
  };
}

export default function RfqPage({ params: { locale } }: Props) {
  setRequestLocale(locale);

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold text-gray-900">Request a Quote</h1>
      <p className="mb-8 mt-4 text-gray-600">
        Fill in your details and our team will get back to you with a quote.
      </p>
      <RfqForm />
    </main>
  );
}
