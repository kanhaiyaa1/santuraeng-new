'use client';

import { useTranslations } from 'next-intl';

export default function WhatsAppButton() {
  const t = useTranslations('common');
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

  if (!number) {
    return null;
  }

  return (
    <a
      href={`https://wa.me/${number}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t('whatsapp')}
      className="fixed bottom-5 ltr:right-5 rtl:left-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-transform hover:scale-105"
    >
      <svg viewBox="0 0 32 32" fill="currentColor" className="h-7 w-7" aria-hidden="true">
        <path d="M16.004 3C9.376 3 4 8.373 4 15c0 2.34.68 4.523 1.86 6.363L4 29l7.83-1.822A11.94 11.94 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3Zm6.995 16.982c-.298.837-1.47 1.535-2.415 1.735-.643.136-1.483.245-4.31-.925-3.617-1.497-5.945-5.166-6.128-5.405-.176-.24-1.468-1.955-1.468-3.73s.928-2.646 1.257-3.008c.298-.327.65-.409.867-.409.217 0 .434.002.623.011.2.01.469-.076.734.56.298.71.91 2.203.99 2.363.08.16.133.352.026.564-.107.213-.16.345-.32.53-.16.187-.336.417-.48.56-.16.16-.328.334-.14.654.19.32.845 1.394 1.813 2.257 1.246 1.113 2.297 1.457 2.617 1.617.32.16.507.133.694-.08.187-.213.8-.933.014-1.113z" />
      </svg>
    </a>
  );
}
