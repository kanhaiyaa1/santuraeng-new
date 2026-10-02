import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function Hero() {
  const t = useTranslations('hero');
  const cta = useTranslations('cta');
  const common = useTranslations('common');

  return (
    <section className="relative isolate overflow-hidden bg-navy-950 text-white">
      <Image
        src="/images/home/hero-process-plant.jpg"
        alt={t('imageAlt')}
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover opacity-70"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950 via-navy-950/85 to-navy-900/30 rtl:bg-gradient-to-l" />
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <p className="text-sm font-semibold tracking-wide text-brand-500">{t('eyebrow')}</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          {t('title')}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-navy-100">{t('subtitle')}</p>
        <p className="mt-4 text-sm font-semibold text-white">{common('facts')}</p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/rfq"
            className="rounded-md bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-500/20 transition hover:bg-brand-600"
          >
            {cta('getQuote')}
          </Link>
          <Link
            href="/products"
            className="rounded-md border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            {cta('viewProducts')}
          </Link>
        </div>
      </div>
    </section>
  );
}
