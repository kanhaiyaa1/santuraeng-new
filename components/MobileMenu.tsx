'use client';

import { useEffect, useId, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { PRODUCT_CATEGORIES, categoryHref } from '@/content/product-categories';
import { SERVICES } from '@/content/services';
import { btnPrimary } from '@/lib/ui';

/** Mobile and tablet navigation (below xl): menu button + panel with Products and Services accordions. */
export default function MobileMenu() {
  const nav = useTranslations('nav');
  const t = useTranslations('productCategories');
  const ts = useTranslations('services');
  const search = useTranslations('search');
  const pathname = usePathname();
  const id = useId();
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
    setProductsOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const link = 'block px-4 py-3 text-base font-medium text-ink hover:text-brand-500';

  return (
    <div className="xl:hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={`${id}-panel`}
        aria-label={open ? t('closeMenu') : t('openMenu')}
        className="flex h-9 w-9 items-center justify-center rounded-md border border-line text-ink-body hover:border-brand-500 hover:text-brand-500"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="h-5 w-5" aria-hidden="true">
          {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
      </button>

      {open && (
        <div id={`${id}-panel`} className="absolute inset-x-0 top-full max-h-[calc(100vh-4rem)] overflow-y-auto border-b border-line bg-white shadow-md">
          <nav className="divide-y divide-line">
            <Link href="/" className={link}>{nav('home')}</Link>
            <div>
              <button
                type="button"
                onClick={() => setProductsOpen((o) => !o)}
                aria-expanded={productsOpen}
                aria-controls={`${id}-products`}
                className="flex w-full items-center justify-between px-4 py-3 text-base font-medium text-ink"
              >
                {nav('products')}
                <svg viewBox="0 0 20 20" fill="currentColor" className={`h-5 w-5 text-ink-muted transition-transform ${productsOpen ? 'rotate-180' : ''}`} aria-hidden="true">
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.25 4.39a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>
              </button>
              {productsOpen && (
                <ul id={`${id}-products`} className="bg-surface-alt pb-2">
                  {PRODUCT_CATEGORIES.map((c, i) => (
                    <li key={c.slug}>
                      <Link
                        href={categoryHref(c)}
                        className={`block px-6 py-2 text-sm hover:text-brand-500 ${i === 0 ? 'font-semibold text-ink' : 'text-ink-body'}`}
                      >
                        {t(`items.${c.slug}.name`)}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div>
              <button
                type="button"
                onClick={() => setServicesOpen((o) => !o)}
                aria-expanded={servicesOpen}
                aria-controls={`${id}-services`}
                className="flex w-full items-center justify-between px-4 py-3 text-base font-medium text-ink"
              >
                {nav('services')}
                <svg viewBox="0 0 20 20" fill="currentColor" className={`h-5 w-5 text-ink-muted transition-transform ${servicesOpen ? 'rotate-180' : ''}`} aria-hidden="true">
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.25 4.39a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>
              </button>
              {servicesOpen && (
                <ul id={`${id}-services`} className="bg-surface-alt pb-2">
                  {SERVICES.map((s) => (
                    <li key={s.slug}>
                      <Link href={`/services/${s.slug}`} className="block px-6 py-2 text-sm text-ink-body hover:text-brand-500">
                        {ts(`items.${s.slug}.name`)}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <Link href="/about" className={link}>{nav('about')}</Link>
            <Link href="/quality" className={link}>{nav('quality')}</Link>
            <Link href="/contact" className={link}>{nav('contact')}</Link>
            <Link href="/search" className={`${link} flex items-center gap-2`}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="h-4 w-4 text-ink-muted" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.5-3.5" />
              </svg>
              {search('open')}
            </Link>
            <div className="p-4">
              <Link href="/rfq" className={`${btnPrimary} w-full`}>{nav('rfq')}</Link>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
