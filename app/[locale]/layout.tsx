import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { siteUrl } from '@/lib/seo';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import WhatsAppButton from '@/components/WhatsAppButton';
import Footer from '@/components/Footer';
import 'flag-icons/css/flag-icons.min.css';
import '../globals.css';

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta.home' });

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: t('title'),
      template: '%s | Santura Engineering'
    },
    description: t('description'),
    openGraph: {
      siteName: 'Santura Engineering',
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
      <body className="flex min-h-screen flex-col bg-white text-slate-900 antialiased">
        <NextIntlClientProvider messages={messages}>
          <header className="sticky top-0 z-40 border-b border-white/10 bg-navy-950/95 text-white backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
              <Link href="/" className="flex min-w-0 items-center gap-3">
                <span className="rounded bg-white p-1">
                  <Image src="/images/logo.jpg" alt="Santura Engineering" width={20} height={32} priority />
                </span>
                <span className="truncate text-base font-semibold tracking-tight sm:text-lg">Santura Engineering</span>
              </Link>
              <nav className="flex shrink-0 items-center gap-3 text-sm font-medium text-navy-100 sm:gap-5">
                <Link href="/products" className="hidden hover:text-white sm:inline">
                  {t('products')}
                </Link>
                <Link href="/about" className="hidden hover:text-white md:inline">
                  {t('about')}
                </Link>
                <Link href="/contact" className="hidden hover:text-white md:inline">
                  {t('contact')}
                </Link>
                <Link href="/rfq" className="hidden whitespace-nowrap rounded-md bg-brand-500 px-4 py-2 font-semibold text-white hover:bg-brand-600 sm:inline-block">
                  {t('rfq')}
                </Link>
                <LanguageSwitcher />
              </nav>
            </div>
          </header>
          <div className="flex-1">{children}</div>
          <Footer />
          <WhatsAppButton />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
