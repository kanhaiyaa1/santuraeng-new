import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import SectionHeading from './SectionHeading';

const CATEGORIES = [
  { key: 'brick', anchor: 'brick-lining', codes: 'SEPL-01 – SEPL-05', image: '/images/home/categories/sepl-01-brick-staple.jpg' },
  { key: 'castable', anchor: 'castable-lining', codes: 'SEPL-06 – SEPL-19', image: '/images/home/categories/sepl-06-split-y.jpg' },
  { key: 'double', anchor: 'double-lining', codes: 'SEPL-20 – SEPL-23', image: '/images/home/categories/sepl-20-dual-pin.jpg' },
  { key: 'ceramic', anchor: 'ceramic-fiber-lining', codes: 'SEPL-24 – SEPL-26', image: '/images/home/categories/sepl-24-fiber-stud.jpg' }
] as const;

export default function ProductCategories() {
  const t = useTranslations('categories');

  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((c) => (
            <Link
              key={c.key}
              href={`/products#${c.anchor}`}
              className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-navy-600 hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] bg-white">
                <Image
                  src={c.image}
                  alt={t(`items.${c.key}.imageAlt`)}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-contain p-4"
                />
              </div>
              <div className="flex flex-1 flex-col border-t border-slate-100 p-6">
                <span className="text-xs font-semibold tracking-wide text-navy-600">{c.codes}</span>
                <h3 className="mt-2 text-lg font-bold text-navy-900">{t(`items.${c.key}.name`)}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{t(`items.${c.key}.description`)}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-500 group-hover:text-brand-600">
                  {t('viewRange')}
                  <span aria-hidden="true" className="inline-block rtl:rotate-180">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
