'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { SERVICES } from '@/content/services';

const CLOSE_DELAY_MS = 150;

/** Desktop "Services" dropdown: single column, same behaviour and styling as the Products mega menu. */
export default function ServicesDropdown() {
  const nav = useTranslations('nav');
  const t = useTranslations('services');
  const pathname = usePathname();
  const id = useId();
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>();
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const cancelClose = () => clearTimeout(closeTimer.current);
  const openNow = () => {
    cancelClose();
    setOpen(true);
  };
  const closeSoon = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), CLOSE_DELAY_MS);
  };
  const close = useCallback((restoreFocus = false) => {
    setOpen(false);
    if (restoreFocus) triggerRef.current?.focus();
  }, []);

  useEffect(() => close(), [pathname, close]);
  useEffect(() => () => clearTimeout(closeTimer.current), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close(true);
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) close();
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [open, close]);

  const active = pathname.startsWith('/services/');

  return (
    <div ref={rootRef} onMouseEnter={openNow} onMouseLeave={closeSoon} className="relative hidden xl:block">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => (open ? close() : openNow())}
        aria-expanded={open}
        aria-controls={`${id}-panel`}
        className={`flex items-center gap-1 py-2 hover:text-brand-500 ${open || active ? 'text-brand-500' : ''}`}
      >
        {nav('services')}
        <svg viewBox="0 0 20 20" fill="currentColor" className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true">
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.25 4.39a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
        </svg>
      </button>

      {open && (
        // pt-3 bridges the gap to the panel so the hover isn't lost on the way down.
        <div id={`${id}-panel`} className="absolute start-0 top-full z-50 pt-3">
          <ul className="w-80 rounded-lg border border-line bg-white p-2 shadow-md">
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="group block rounded-md px-3 py-2 hover:bg-surface-alt">
                  <span className="block text-sm font-semibold text-ink group-hover:text-brand-500">{t(`items.${s.slug}.name`)}</span>
                  <span className="block text-xs leading-snug text-ink-muted">{t(`items.${s.slug}.description`)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
