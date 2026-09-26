import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { buildAlternates } from '@/lib/seo';
import NewsletterSignup from '@/components/NewsletterSignup';

type Props = { params: { locale: string } };

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'hero' });

  return {
    title: t('title'),
    description: t('subtitle'),
    alternates: buildAlternates('/', locale),
    openGraph: {
      title: t('title'),
      description: t('subtitle'),
      locale
    }
  };
}

export default function HomePage({ params: { locale } }: Props) {
  setRequestLocale(locale);

  const t = useTranslations('hero');
  const tCta = useTranslations('cta');

  return (
    <main className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-6 py-24 text-center">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">{t('title')}</h1>
      <p className="max-w-2xl text-lg text-gray-600">{t('subtitle')}</p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/rfq"
          className="rounded-md bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-700"
        >
          {tCta('getQuote')}
        </Link>
        <Link
          href="/products"
          className="rounded-md border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          {tCta('viewProducts')}
        </Link>
      </div>
      <div className="mt-8 w-full max-w-sm">
        <NewsletterSignup />
      </div>
    </main>
  );
}
