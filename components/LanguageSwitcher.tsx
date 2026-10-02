'use client';

import type { ChangeEvent } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { routing } from '@/i18n/routing';
import { usePathname, useRouter } from '@/i18n/navigation';

const localeNames: Record<string, string> = {
  en: 'English',
  ar: 'العربية',
  de: 'Deutsch',
  tr: 'Türkçe',
  'pt-BR': 'Português (BR)',
  es: 'Español',
  it: 'Italiano',
  fr: 'Français',
  pl: 'Polski',
  nl: 'Nederlands'
};

export default function LanguageSwitcher() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    router.replace(pathname, { locale: event.target.value });
  }

  return (
    <label className="inline-flex items-center gap-2 text-sm">
      <span className="sr-only">{t('language')}</span>
      <select
        aria-label={t('language')}
        defaultValue={locale}
        onChange={handleChange}
        className="rounded-md border border-white/20 bg-navy-900 px-2 py-1.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
      >
        {routing.locales.map((loc) => (
          <option key={loc} value={loc}>
            {localeNames[loc] ?? loc}
          </option>
        ))}
      </select>
    </label>
  );
}
