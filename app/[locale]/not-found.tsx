import { getLocale, getTranslations } from 'next-intl/server';
import { Link, getPathname } from '@/i18n/navigation';
import { btnPrimary, btnSecondary } from '@/lib/ui';
import SearchForm from '@/components/SearchForm';
import PopularSearches from '@/components/PopularSearches';

/** 404 for every unknown URL under a locale: turns a dead end into search and navigation. */
export default async function NotFound() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: 'notFoundPage' });

  return (
    <main className="bg-white pb-20">
      <section className="border-b border-line bg-surface-alt">
        <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-500">404</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-5xl">{t('title')}</h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-body">{t('text')}</p>
          <div className="mt-8">
            <SearchForm action={getPathname({ locale, href: '/search' })} />
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/" className={btnPrimary}>{t('home')}</Link>
            <Link href="/products" className={btnSecondary}>{t('products')}</Link>
          </div>
        </div>
      </section>
      <div className="mx-auto max-w-3xl px-6">
        <PopularSearches className="mt-12" />
      </div>
    </main>
  );
}
