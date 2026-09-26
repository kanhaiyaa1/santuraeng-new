import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'ar', 'de', 'tr', 'pt-BR', 'es', 'it', 'fr', 'pl', 'nl'],
  defaultLocale: 'en',
  // Default locale (en) has no URL prefix; all others are prefixed, e.g. /de/products.
  localePrefix: 'as-needed',
  localeDetection: true
});

export type AppLocale = (typeof routing.locales)[number];
