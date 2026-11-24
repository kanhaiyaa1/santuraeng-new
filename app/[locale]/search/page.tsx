import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Fuse, { type IFuseOptions } from 'fuse.js';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link, getPathname } from '@/i18n/navigation';
import { buildAlternates } from '@/lib/seo';
import { getSearchIndex } from '@/lib/searchIndex';
import {
  FUSE_OPTIONS,
  GROUP_ORDER,
  POPULAR_SEARCHES,
  normalizeQuery,
  queryTerms,
  runSearch,
  type SearchDoc
} from '@/lib/searchCore';
import SearchForm from '@/components/SearchForm';
import PopularSearches from '@/components/PopularSearches';

type Props = { params: { locale: string }; searchParams: { q?: string | string[] } };

const SNIPPET_LENGTH = 180;
const MAX_RELATED = 6;

function readQuery(searchParams: Props['searchParams']) {
  const q = Array.isArray(searchParams.q) ? searchParams.q[0] : searchParams.q;
  return normalizeQuery(q ?? '');
}

export async function generateMetadata({ params: { locale }, searchParams }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'searchPage' });
  const q = readQuery(searchParams);
  const base = buildAlternates('/search', locale).canonical;
  return {
    title: { absolute: q ? t('metaTitleQuery', { query: q }) : t('metaTitle') },
    description: t('metaDescription'),
    // Result pages are thin and endless; keep them out of the index but let crawlers follow the links.
    robots: { index: false, follow: true },
    alternates: { canonical: q ? `${base}?q=${encodeURIComponent(q)}` : base }
  };
}

// One Fuse instance per locale, rebuilt only when the index itself is rebuilt (every request in development).
const fuseCache = new Map<string, { docs: SearchDoc[]; fuse: Fuse<SearchDoc> }>();

async function getFuse(locale: string) {
  const docs = await getSearchIndex(locale);
  const cached = fuseCache.get(locale);
  if (cached && cached.docs === docs) return cached;
  const entry = { docs, fuse: new Fuse(docs, FUSE_OPTIONS as IFuseOptions<SearchDoc>) };
  fuseCache.set(locale, entry);
  return entry;
}

const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** Words to highlight: the query words, plus "310" for "SS310" since snippets write the bare grade. */
function highlightTerms(query: string) {
  const terms = queryTerms(query);
  return Array.from(new Set([...terms, ...terms.flatMap((w) => w.match(/^ss(\d{3})$/)?.[1] ?? [])]));
}

function highlight(text: string, terms: string[]): ReactNode {
  if (!terms.length) return text;
  // Terms are singular ("anchor"), so extend each match to the end of the word ("anchors").
  const parts = text.split(new RegExp(`((?:${terms.map(escapeRegExp).join('|')})[\\p{L}\\p{N}]*)`, 'giu'));
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <mark key={i} className="rounded bg-brand-500/10 px-0.5 font-semibold text-ink">
        {part}
      </mark>
    ) : (
      part
    )
  );
}

/** Up to SNIPPET_LENGTH characters, centred on the first query word when it appears late in the text. */
function snippet(text: string, terms: string[]) {
  if (text.length <= SNIPPET_LENGTH) return text;
  const lower = text.toLowerCase();
  const hits = terms.map((w) => lower.indexOf(w)).filter((i) => i >= 0);
  const first = hits.length ? Math.min(...hits) : 0;
  let start = first > SNIPPET_LENGTH - 60 ? text.lastIndexOf(' ', first - 50) + 1 : 0;
  if (start < 0) start = 0;
  let end = start + SNIPPET_LENGTH;
  if (end < text.length) end = text.lastIndexOf(' ', end);
  return `${start > 0 ? '… ' : ''}${text.slice(start, end).trim()}${end < text.length ? ' …' : ''}`;
}

/**
 * Related searches: index terms (product names, lining types, categories, services, popular searches)
 * that share a word with the query, preferring terms that belong to the top results.
 */
function relatedSearches(query: string, results: SearchDoc[], docs: SearchDoc[]) {
  const words = queryTerms(query);
  const self = query.toLowerCase();
  const pool = new Map<string, string>();
  const add = (term: string) => {
    const key = term.trim().toLowerCase();
    if (key && key !== self && !pool.has(key)) pool.set(key, term.trim());
  };
  POPULAR_SEARCHES.forEach(add);
  docs.forEach((d) => d.related.forEach(add));

  const fromTop = new Set(results.slice(0, 5).flatMap((d) => d.related.map((r) => r.toLowerCase())));
  return Array.from(pool, ([key, term]) => {
    const shared = queryTerms(term).filter((w) => words.includes(w)).length;
    return { term, score: shared * 2 + (fromTop.has(key) ? 3 : 0) };
  })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score || a.term.length - b.term.length)
    .slice(0, MAX_RELATED)
    .map((s) => s.term);
}

export default async function SearchPage({ params: { locale }, searchParams }: Props) {
  setRequestLocale(locale);
  const [t, ts, nav, productPage] = await Promise.all([
    getTranslations({ locale, namespace: 'searchPage' }),
    getTranslations({ locale, namespace: 'search' }),
    getTranslations({ locale, namespace: 'nav' }),
    getTranslations({ locale, namespace: 'productPage' })
  ]);

  const q = readQuery(searchParams);
  const { docs, fuse } = await getFuse(locale);
  const results = q.length >= 2 ? runSearch(fuse, docs, q) : [];
  const groups = GROUP_ORDER.map((group) => ({ group, items: results.filter((r) => r.group === group) })).filter((g) => g.items.length);
  const related = results.length ? relatedSearches(q, results, docs) : [];
  const terms = highlightTerms(q);
  const action = getPathname({ locale, href: '/search' });
  // "›" because some path names contain a slash ("Castable / Concrete Lining"); mirrored for Arabic.
  const crumbSeparator = locale === 'ar' ? ' ‹ ' : ' › ';

  return (
    <main className="bg-white pb-20">
      <div className="border-b border-line bg-white">
        <nav aria-label={productPage('breadcrumb')} className="mx-auto max-w-6xl px-6 py-3 text-sm text-ink-muted">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-brand-500">{nav('home')}</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="font-medium text-ink">{t('h1')}</li>
          </ol>
        </nav>
      </div>

      <section className="border-b border-line bg-surface-alt">
        <div className="mx-auto max-w-4xl px-6 py-12 sm:py-14">
          <h1 className="border-s-4 border-brand-500 ps-5 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {q ? t('h1Query', { query: q }) : t('h1')}
          </h1>
          <div className="mt-6">
            <SearchForm action={action} defaultValue={q} autoFocus={!q} />
          </div>
          {q.length >= 2 && results.length > 0 && (
            <p className="mt-4 text-sm text-ink-muted" role="status">{t('resultCount', { query: q, count: results.length })}</p>
          )}
          {!q && <p className="mt-4 text-sm text-ink-muted">{t('emptyText')}</p>}
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6">
        {q.length >= 2 && results.length === 0 && (
          <div className="mt-12 rounded-lg border border-line bg-surface-alt p-6" role="status">
            <h2 className="text-xl font-bold text-ink">{t('noResultsTitle')}</h2>
            <p className="mt-2 leading-relaxed text-ink-body">{t('noResultsText', { query: q })}</p>
          </div>
        )}

        {groups.map(({ group, items }) => (
          <section key={group} className="mt-12" aria-labelledby={`results-${group}`}>
            <h2 id={`results-${group}`} className="flex items-baseline gap-2 text-xl font-bold text-ink">
              {ts(`groups.${group}`)}
              <span className="text-sm font-normal text-ink-muted">({items.length})</span>
            </h2>
            <ul className="mt-4 divide-y divide-line rounded-lg border border-line bg-white">
              {items.map((r) => (
                <li key={r.href}>
                  <Link href={r.href} className="group block px-5 py-4 transition hover:bg-surface-alt">
                    {r.breadcrumb.length > 0 && (
                      <span className="block text-xs text-ink-muted">{r.breadcrumb.join(crumbSeparator)}</span>
                    )}
                    <span className="mt-1 block font-semibold text-ink group-hover:text-brand-500">{highlight(r.title, terms)}</span>
                    {r.description && (
                      <span className="mt-1 block text-sm leading-relaxed text-ink-body">{highlight(snippet(r.description, terms), terms)}</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}

        {related.length > 0 && <PopularSearches terms={related} title={t('relatedTitle')} className="mt-14" />}
        <PopularSearches className="mt-12" />
      </div>
    </main>
  );
}
