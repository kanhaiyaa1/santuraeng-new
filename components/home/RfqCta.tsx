import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { whatsappUrl } from '@/lib/site';

export default function RfqCta() {
  const t = useTranslations('rfq');

  return (
    <section className="bg-navy-950 py-20 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-navy-700 to-navy-900 px-8 py-14 sm:px-14">
          <div className="absolute -end-16 -top-16 h-56 w-56 rounded-full bg-brand-500/20 blur-3xl" aria-hidden="true" />
          <div className="relative max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t('title')}</h2>
            <p className="mt-4 text-lg text-navy-100">{t('text')}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/rfq"
                className="rounded-md bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-500/20 transition hover:bg-brand-600"
              >
                {t('button')}
              </Link>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-[#25D366] px-6 py-3 text-sm font-semibold text-navy-950 transition hover:brightness-95"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 004.74 1.2h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm5.8 14.02c-.24.68-1.42 1.31-1.95 1.36-.5.05-.98.23-3.3-.69-2.8-1.1-4.58-3.97-4.72-4.15-.14-.18-1.13-1.5-1.13-2.86 0-1.36.71-2.03.97-2.31.25-.27.55-.34.73-.34h.53c.17 0 .4-.06.62.48.24.56.8 1.93.87 2.07.07.14.12.3.02.48-.1.18-.14.3-.28.46-.14.16-.29.36-.42.48-.14.14-.28.29-.12.57.16.27.72 1.18 1.54 1.91 1.06.94 1.95 1.24 2.23 1.38.27.14.43.12.59-.07.16-.18.68-.8.86-1.07.18-.27.36-.23.61-.14.25.09 1.6.75 1.87.89.27.14.46.2.52.32.07.11.07.66-.17 1.34z" />
                </svg>
                {t('whatsapp')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
