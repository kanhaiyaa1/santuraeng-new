// Search logic shared by the header dropdown (client) and the /search results page (server).
// No server-only imports here: this file ships to the browser.
import type Fuse from 'fuse.js';
import type { IFuseOptions } from 'fuse.js';

export type SearchGroup = 'product' | 'service' | 'country' | 'page';

/** What the header dropdown needs. Kept small because it is sent with every page. */
export type SearchEntry = {
  group: SearchGroup;
  /** Shown as the result title. */
  title: string;
  /** Shown under the title in the dropdown (code, lining type, ...). */
  subtitle: string;
  href: string;
  /** Matched by Fuse but never shown: codes, alloys, names in other languages. */
  code?: string;
  alloys?: string;
  keywords: string;
};

/** Full entry used by the results page: adds the snippet text, breadcrumb and related-search terms. */
export type SearchDoc = SearchEntry & {
  description: string;
  breadcrumb: string[];
  /** Terms offered as "Related searches" when this entry is among the top results. */
  related: string[];
};

export const GROUP_ORDER: SearchGroup[] = ['product', 'service', 'country', 'page'];

export const FUSE_OPTIONS: IFuseOptions<SearchEntry> = {
  keys: [
    { name: 'code', weight: 3 },
    { name: 'title', weight: 2 },
    { name: 'alloys', weight: 1 },
    { name: 'keywords', weight: 1 }
  ],
  threshold: 0.25,
  ignoreLocation: true,
  minMatchCharLength: 2,
  includeScore: true
};

// High-value terms shown as "Popular searches" (search queries, so kept in English: buyers search in English).
export const POPULAR_SEARCHES = [
  'V anchors',
  'SS310 anchors',
  'ceramic fiber studs',
  'castable anchors',
  'insulation pins',
  'brick lining anchors',
  'Inconel anchors',
  'refractory anchor types',
  'anchor weight calculator',
  'PMI testing'
] as const;

export const MAX_QUERY_LENGTH = 100;

// "SEPL-24", "sepl 24", "SEPL24", "sepl-6" → an exact product code.
const CODE_QUERY = /^sepl[\s-]*0*(\d{1,2})$/i;

/** Trims, caps the length and rewrites "SS 310" / "310 SS" to "SS310", the spelling the index carries. */
export function normalizeQuery(raw: string) {
  return raw
    .trim()
    .slice(0, MAX_QUERY_LENGTH)
    .replace(/\bss[\s-]*(\d{3})/gi, 'SS$1')
    .replace(/\b(\d{3})[\s-]*ss\b/gi, 'SS$1')
    .replace(/\s+/g, ' ');
}

/** Lower-case words of the query, at least 2 characters, with a plural "s" removed ("anchors" → "anchor"). */
export function queryTerms(query: string) {
  const words = normalizeQuery(query)
    .toLowerCase()
    .split(/[\s,/]+/)
    .map((w) => (w.length > 3 && w.endsWith('s') && !w.endsWith('ss') ? w.slice(0, -1) : w))
    .filter((w) => w.length >= 2);
  return Array.from(new Set(words));
}

/**
 * Ranked results.
 * - One word: Fuse matches it directly. A phrase with a one-letter word ("V anchors") matches the
 *   whole phrase, keeping entries where that letter stands alone.
 * - Several words: entries must match every word (or, if none does, as many words as any entry does).
 *   Rare words weigh more than common ones, so in "SS310 anchors" the grade decides the order, not "anchors".
 *   Whole-phrase matches always qualify and get a bonus.
 */
export function runSearch<T extends SearchEntry>(fuse: Fuse<T>, index: T[], raw: string, limit?: number): T[] {
  const query = normalizeQuery(raw);
  if (query.length < 2) return [];

  const code = query.match(CODE_QUERY);
  if (code) {
    const exact = index.filter((e) => e.code?.split(' ')[0] === `SEPL-${code[1].padStart(2, '0')}`);
    if (exact.length) return exact;
  }

  const phrase = fuse.search(query);
  const words = queryTerms(query);
  const done = (ranked: T[]) => (limit ? ranked.slice(0, limit) : ranked);

  // A one-letter word names an anchor shape ("V anchors", "Y anchor"). Fuzzy matching would let it
  // match any " anchors", so the letter must appear as a word of its own in the title or keywords.
  const letters = query.split(' ').filter((w) => /^\p{L}$/u.test(w));
  if (letters.length && phrase.length) {
    const standalone = letters.map((l) => new RegExp(`(^|[^\\p{L}\\p{N}])${l}([^\\p{L}\\p{N}]|$)`, 'iu'));
    const shaped = phrase.filter((h) => standalone.every((re) => re.test(`${h.item.title} ${h.item.keywords}`)));
    return done((shaped.length ? shaped : phrase).map((h) => h.item));
  }
  if (words.length <= 1) return done(phrase.map((h) => h.item));

  const n = index.length;
  const tally = new Map<T, { count: number; score: number }>();
  for (const word of words) {
    const hits = fuse.search(word);
    const idf = Math.log(1 + n / Math.max(hits.length, 1));
    for (const h of hits) {
      const t = tally.get(h.item) ?? { count: 0, score: 0 };
      t.count += 1;
      t.score += idf * (1 - (h.score ?? 0));
      tally.set(h.item, t);
    }
  }
  for (const h of phrase) {
    const t = tally.get(h.item) ?? { count: 0, score: 0 };
    t.count = words.length;
    t.score += 2 * Math.log(1 + n) * (1 - (h.score ?? 0));
    tally.set(h.item, t);
  }

  const best = Math.max(0, ...Array.from(tally.values(), (t) => t.count));
  return done(
    Array.from(tally.entries())
      .filter(([, t]) => t.count === best)
      .sort((a, b) => b[1].score - a[1].score)
      .map(([entry]) => entry)
  );
}
