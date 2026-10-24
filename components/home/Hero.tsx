import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { btnPrimary, btnSecondary } from '@/lib/ui';

export default function Hero() {
  const t = useTranslations('hero');
  const cta = useTranslations('cta');
  const common = useTranslations('common');

  return (
    <section className="relative isolate overflow-hidden border-b border-line bg-white">
      <Image
        src="/images/home/hero-process-plant.jpg"
        alt={t('imageAlt')}
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover"
      />
      {/* Light wash so the photo stays visible while the text sits on near-white (mirrored for RTL). */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-white via-white/90 to-white/30 rtl:bg-gradient-to-l" />
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand-500">{t('eyebrow')}</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl lg:text-6xl">
          {t('title')}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-body">{t('subtitle')}</p>
        <p className="mt-5 border-s-2 border-brand-500 ps-3 text-sm font-semibold text-ink">{common('facts')}</p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link href="/rfq" className={btnPrimary}>
            {cta('getQuote')}
          </Link>
          <Link href="/products" className={btnSecondary}>
            {cta('viewProducts')}
          </Link>
        </div>
      </div>
    </section>
  );
}
