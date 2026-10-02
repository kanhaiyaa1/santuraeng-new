import type { ReactNode } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { qualityArgs } from '@/lib/site';
import SectionHeading from './SectionHeading';

const iconProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  className: 'h-6 w-6',
  'aria-hidden': true
};

const ICONS: Record<string, ReactNode> = {
  cemex: (
    <svg {...iconProps}>
      <path d="M3 21h18M5 21V9l5 3V9l5 3V5h4v16" />
    </svg>
  ),
  sri: (
    <svg {...iconProps}>
      <path d="M3 17l2 4h14l2-4H3zM5 17V9h14v8M9 9V5h6v4" />
    </svg>
  ),
  established: (
    <svg {...iconProps}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </svg>
  ),
  iso: (
    <svg {...iconProps}>
      <circle cx="12" cy="9" r="6" />
      <path d="M8.5 14.2L7 22l5-3 5 3-1.5-7.8" />
    </svg>
  ),
  linde: (
    <svg {...iconProps}>
      <path d="M9 12l2 2 4-4" />
      <rect x="4" y="3" width="16" height="18" rx="2" />
    </svg>
  ),
  testing: (
    <svg {...iconProps}>
      <path d="M12 3l8 3v6c0 4.5-3.4 8.2-8 9-4.6-.8-8-4.5-8-9V6l8-3z" />
      <path d="M8.5 12l2.5 2.5 4.5-5" />
    </svg>
  )
};

const KEYS = ['established', 'iso', 'cemex', 'sri', 'linde', 'testing'] as const;

export default function TrustSignals() {
  const t = useTranslations('trust');
  const args = qualityArgs(useLocale());
  const textArgs = (key: (typeof KEYS)[number]) => (key === 'iso' ? args.iso : key === 'linde' ? args.linde : undefined);

  return (
    <section className="bg-navy-900 py-20 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} tone="dark" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {KEYS.map((key) => (
            <div key={key} className="rounded-xl border border-white/10 bg-white/5 p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-500/15 text-brand-500">
                {ICONS[key]}
              </div>
              <h3 className="mt-5 text-lg font-bold">{t(`items.${key}.title`)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-100">{t(`items.${key}.text`, textArgs(key))}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
