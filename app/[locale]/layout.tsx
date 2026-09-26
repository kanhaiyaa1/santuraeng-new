import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Link } from '@/i18n/navigation';
import { siteUrl } from '@/lib/seo';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import WhatsAppButton from '@/components/WhatsAppButton';
import '../globals.css';

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'hero' });

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: t('title'),
      template: '%s | Santur Aeng'
    },
    description: t('subtitle'),
    openGraph: {
      siteName: 'Santur Aeng',
      type: 'website',
      locale
    }
  };
}

export default async function LocaleLayout({ children, params: { locale } }: Props) {
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: 'nav' });
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir}>
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        <NextIntlClientProvider messages={messages}>
          <header className="border-b border-gray-100">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
              <Link href="/" className="text-lg font-semibold">
                Santur Aeng
              </Link>
              <nav className="flex items-center gap-6 text-sm font-medium text-gray-700">
                <Link href="/products">{t('products')}</Link>
                <Link href="/rfq">{t('rfq')}</Link>
                <LanguageSwitcher />
              </nav>
            </div>
          </header>
          {children}
          <WhatsAppButton />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
