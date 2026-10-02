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
    <section className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {INDUSTRIES.map((i) => (
            <article key={i.key} className="group relative isolate flex min-h-[20rem] flex-col justify-end overflow-hidden rounded-xl bg-navy-900">
              <Image
                src={i.image}
                alt={t(`items.${i.key}.imageAlt`)}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="-z-20 object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-950 via-navy-950/70 to-transparent" />
              <div className="p-6 text-white">
                <h3 className="text-lg font-bold">{t(`items.${i.key}.name`)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-100">{t(`items.${i.key}.description`)}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
