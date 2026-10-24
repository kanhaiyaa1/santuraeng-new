'use client';

import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import type Fuse from 'fuse.js';
import { useTranslations } from 'next-intl';
import { Link, useRouter } from '@/i18n/navigation';
import type { SearchEntry } from '@/lib/searchIndex';

const MAX_RESULTS = 8;
const GROUP_ORDER: SearchEntry['type'][] = ['product', 'country', 'page'];
// "SEPL-24", "sepl 24", "SEPL24", "sepl-6" → an exact product code.
const CODE_QUERY = /^sepl[\s-]*0*(\d{1,2})$/i;

export default function SiteSearch({ index }: { index: SearchEntry[] }) {
  const t = useTranslations('search');
  const router = useRouter();
  const id = useId();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const [fuse, setFuse] = useState<Fuse<SearchEntry> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Fuse is only downloaded the first time search is opened.
  useEffect(() => {
    if (!open || fuse) return;
    let cancelled = false;
    import('fuse.js').then(({ default: FuseCtor }) => {
      if (cancelled) return;
      setFuse(
        new FuseCtor(index, {
          keys: [
            { name: 'code', weight: 3 },
            { name: 'title', weight: 2 },
            { name: 'alloys', weight: 1 },
            { name: 'keywords', weight: 1 }
          ],
          threshold: 0.25,
          ignoreLocation: true,
          minMatchCharLength: 2
        })
      );
    });
    return () => {
      cancelled = true;
    };
  }, [open, fuse, index]);

  const results = useMemo(() => {
    const q = query.trim();
    if (!fuse || q.length < 2) return [];
    const code = q.match(CODE_QUERY);
    if (code) {
      const exact = index.filter((e) => e.code?.split(' ')[0] === `SEPL-${code[1].padStart(2, '0')}`);
      if (exact.length) return exact;
    }
    // Keep Fuse's ranking, but list groups in a fixed order so the dropdown is predictable.
    const hits = fuse.search(q, { limit: MAX_RESULTS }).map((r) => r.item);
    return GROUP_ORDER.flatMap((type) => hits.filter((h) => h.type === type));
  }, [fuse, query, index]);

  const close = useCallback((restoreFocus = false) => {
    setOpen(false);
    setQuery('');
    setActive(0);
    if (restoreFocus) buttonRef.current?.focus();
  }, []);

  // "/" opens search from anywhere (unless typing in a field); Escape and outside clicks close it.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      const typing = ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName) || target.isContentEditable;
      if (e.key === '/' && !typing) {
        e.preventDefault();
        setOpen(true);
      } else if (e.key === 'Escape' && open) {
        close(true);
      }
    }
    function onPointer(e: PointerEvent) {
      const target = e.target as Node;
      if (open && !panelRef.current?.contains(target) && !buttonRef.current?.contains(target)) close();
    }
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [open, close]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  function onInputKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!results.length) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => (a + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => (a - 1 + results.length) % results.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      router.push(results[active].href);
      close();
    }
  }

  const listId = `${id}-results`;
  const optionId = (i: number) => `${id}-option-${i}`;
  const showList = query.trim().length >= 2;

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => (open ? close() : setOpen(true))}
        aria-expanded={open}
        aria-controls={`${id}-panel`}
        aria-label={t('open')}
        title={`${t('open')} ( / )`}
        className="flex h-9 w-9 items-center justify-center rounded-md border border-line text-ink-body transition hover:border-brand-500 hover:text-brand-500"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="h-4 w-4" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3.5-3.5" />
        </svg>
      </button>

      {open && (
        <div
          id={`${id}-panel`}
          ref={panelRef}
          className="absolute inset-x-0 top-full border-b border-line bg-white shadow-md"
        >
          <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6">
            <div className="flex items-center gap-3 rounded-md border border-line px-3 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/20">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="h-4 w-4 shrink-0 text-ink-muted" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.5-3.5" />
              </svg>
              <input
                ref={inputRef}
                type="search"
                role="combobox"
                aria-label={t('label')}
                aria-expanded={showList && results.length > 0}
                aria-controls={listId}
                aria-autocomplete="list"
                aria-activedescendant={results.length ? optionId(active) : undefined}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                onKeyDown={onInputKey}
                placeholder={t('placeholder')}
                autoComplete="off"
                className="w-full appearance-none bg-transparent py-2.5 text-sm text-ink placeholder:text-ink-muted focus:outline-none [&::-webkit-search-cancel-button]:hidden"
              />
              <button type="button" onClick={() => close(true)} className="shrink-0 text-xs font-medium text-ink-muted hover:text-brand-500">
                {t('close')}
              </button>
            </div>

            {!showList && <p className="mt-3 text-xs text-ink-muted">{t('hint')}</p>}

            {showList && results.length === 0 && fuse && (
              <p className="mt-3 text-sm text-ink-body" role="status">{t('noResults', { query: query.trim() })}</p>
            )}

            {results.length > 0 && (
              <ul id={listId} role="listbox" aria-label={t('label')} className="mt-3 max-h-[60vh] overflow-y-auto">
                {results.map((r, i) => {
                  const firstOfGroup = i === 0 || results[i - 1].type !== r.type;
                  return (
                    <li key={`${r.type}-${r.href}`} role="presentation">
                      {firstOfGroup && (
                        <p className="px-3 pb-1 pt-3 text-xs font-semibold uppercase tracking-wider text-brand-500">{t(`groups.${r.type}`)}</p>
                      )}
                      <Link
                        id={optionId(i)}
                        role="option"
                        aria-selected={i === active}
                        href={r.href}
                        onClick={() => close()}
                        onMouseEnter={() => setActive(i)}
                        className={`block rounded-md px-3 py-2 ${i === active ? 'bg-surface-alt' : ''}`}
                      >
                        <span className="block text-sm font-semibold text-ink">{r.title}</span>
                        <span className="block text-xs text-ink-muted">{r.subtitle}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      )}
    </>
  );
}
