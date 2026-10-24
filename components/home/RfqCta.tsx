import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { btnPrimary } from '@/lib/ui';
import WhatsAppLink from '@/components/WhatsAppLink';

export default function RfqCta() {
  const t = useTranslations('rfq');

  return (
    <section className="bg-surface-alt py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="rounded-lg border border-line border-s-4 border-s-brand-500 bg-white px-8 py-12 sm:px-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">{t('title')}</h2>
            <p className="mt-4 text-lg text-ink-body">{t('text')}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/rfq" className={btnPrimary}>
                {t('button')}
              </Link>
              <WhatsAppLink>{t('whatsapp')}</WhatsAppLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
