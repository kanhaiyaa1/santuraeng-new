'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { PRODUCT_CATEGORIES, categoryHref } from '@/content/product-categories';

const CLOSE_DELAY_MS = 150;
const featured = PRODUCT_CATEGORIES[0];
// The grid lists all 18 categories, including Refractory Anchors (also featured on the left, by request).
const others = PRODUCT_CATEGORIES;

function Chevron({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true">
      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.25 4.39a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
    </svg>
  );
}

/** Desktop "Products" mega menu: opens on hover or click, closes on Escape, outside click or navigation. */
export default function ProductMegaMenu() {
  const nav = useTranslations('nav');
  const t = useTranslations('productCategories');
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

  const active = pathname === '/products' || pathname === '/refractory-anchors' || pathname.startsWith('/products/');

  return (
    <div ref={rootRef} onMouseEnter={openNow} onMouseLeave={closeSoon} className="hidden xl:block">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => (open ? close() : openNow())}
        aria-expanded={open}
        aria-controls={`${id}-panel`}
        className={`flex items-center gap-1 py-2 hover:text-brand-500 ${open || active ? 'text-brand-500' : ''}`}
      >
        {nav('products')}
        <Chevron open={open} />
      </button>

      {open && (
        <div id={`${id}-panel`} className="absolute inset-x-0 top-full border-b border-line bg-white shadow-md">
          <div className="mx-auto grid max-w-6xl gap-8 px-6 py-8 lg:grid-cols-4">
            <div className="rounded-lg border border-line border-s-4 border-s-brand-500 bg-surface-alt p-5 lg:col-span-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-500">{t('featured')}</p>
              <Link href={categoryHref(featured)} className="mt-2 block text-lg font-bold text-ink hover:text-brand-500">
                {t(`items.${featured.slug}.name`)}
              </Link>
              <p className="mt-2 text-sm leading-relaxed text-ink-body">{t(`items.${featured.slug}.description`)}</p>
              <Link href={categoryHref(featured)} className="mt-4 inline-block text-sm font-semibold text-brand-500 hover:text-brand-600">
                {t('featuredCta')} →
              </Link>
            </div>

            <div className="lg:col-span-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">{t('allCategories')}</p>
              <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1 lg:grid-cols-3">
                {others.map((c) => (
                  <li key={c.slug}>
                    <Link href={categoryHref(c)} className="group block rounded-md px-2 py-2 hover:bg-surface-alt">
                      <span className="block text-sm font-semibold text-ink group-hover:text-brand-500">{t(`items.${c.slug}.name`)}</span>
                      <span className="block truncate text-xs text-ink-muted">{t(`items.${c.slug}.description`)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
