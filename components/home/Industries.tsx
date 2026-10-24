import Image from 'next/image';
import { useTranslations } from 'next-intl';
import SectionHeading from './SectionHeading';

const INDUSTRIES = [
  { key: 'oilGas', image: '/images/home/industries/oil-gas.jpg' },
  { key: 'cement', image: '/images/home/industries/cement.jpg' },
  { key: 'steel', image: '/images/home/industries/steel.jpg' },
  { key: 'power', image: '/images/home/industries/power.jpg' }
] as const;

export default function Industries() {
  const t = useTranslations('industries');

  return (
    <section className="bg-surface-alt py-20">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {INDUSTRIES.map((i) => (
            <article key={i.key} className="overflow-hidden rounded-lg border border-line bg-white">
              <div className="relative aspect-[4/3] bg-surface-alt">
                <Image
                  src={i.image}
                  alt={t(`items.${i.key}.imageAlt`)}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-ink">{t(`items.${i.key}.name`)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-body">{t(`items.${i.key}.description`)}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
