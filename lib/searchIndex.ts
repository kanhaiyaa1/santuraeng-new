import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { PRODUCTS, productTitle } from '@/content/products';
import { COUNTRIES } from '@/content/countries';

export type SearchEntry = {
  type: 'product' | 'country' | 'page';
  /** Shown as the result title. */
  title: string;
  /** Shown under the title (code, lining type, ...). */
  subtitle: string;
  href: string;
  /** Matched by Fuse but never shown: codes, alloys, names in other languages. */
  code?: string;
  alloys?: string;
  keywords: string;
};

/** "SEPL-06" → "SEPL-06 SEPL06 SEPL 06 SEPL-6 SEPL 6" so any common spelling matches. */
function codeVariants(code: string | null) {
  if (!code) return '';
  const n = code.replace(/^SEPL-?/i, '');
  const short = String(Number(n));
  return [code, `SEPL${n}`, `SEPL ${n}`, `SEPL-${short}`, `SEPL ${short}`].join(' ');
}

// Catalogue shorthand → full alloy names, so "inconel" or "carbon steel" find the products that list "601" or "CS".
const ALLOY_ALIASES: Record<string, string> = {
  CS: 'carbon steel',
  '601': 'Inconel 601',
  '600': 'Inconel 600',
  '800': 'Incoloy 800',
  '800H': 'Incoloy 800H',
  '800H/HT': 'Incoloy 800HT',
  '310SS': '310S 310',
  '253MA': '253 MA',
  C22: 'Hastelloy C22',
  C276: 'Hastelloy C276'
};

function alloyTerms(grades: Iterable<string>) {
  return Array.from(grades, (g) => [g, ALLOY_ALIASES[g.replace(/\s+/g, '')] ?? ''].join(' ')).join(' ');
}

/** Country names in every site language, so "Deutschland" finds Germany on the English site. */
function countryNames(code: string) {
  return Array.from(
    new Set(routing.locales.map((l) => new Intl.DisplayNames([l], { type: 'region' }).of(code) ?? ''))
  ).join(' ');
}

/** Builds the search index for one locale. Runs on the server; the result is sent to the client once per page. */
export async function buildSearchIndex(locale: string): Promise<SearchEntry[]> {
  const [products, productsEn, nav, navEn, countries, countryPage] = await Promise.all([
    getTranslations({ locale, namespace: 'products' }),
    getTranslations({ locale: 'en', namespace: 'products' }),
    getTranslations({ locale, namespace: 'nav' }),
    getTranslations({ locale: 'en', namespace: 'nav' }),
    getTranslations({ locale, namespace: 'countries' }),
    getTranslations({ locale, namespace: 'countryPage' })
  ]);

  const productEntries: SearchEntry[] = PRODUCTS.map((p) => {
    const grades = new Set([...p.alloys.flatMap((a) => a.grades), ...p.alloyTable.map((r) => r.grade)]);
    return {
      type: 'product',
      title: productTitle(p),
      subtitle: products(`linings.${p.lining}`),
      href: `/products/${p.slug}`,
      code: codeVariants(p.code),
      alloys: alloyTerms(grades),
      // The localised catalogue title ("Refrakter Ankrajlar…") lets a search for "anchor" in any language reach products.
      keywords: [p.name, products(`linings.${p.lining}`), productsEn(`linings.${p.lining}`), products('title'), p.material ?? ''].join(' ')
    };
  });

  const countryEntries: SearchEntry[] = COUNTRIES.map((c) => ({
    type: 'country',
    title: countries(`names.${c.code}`),
    subtitle: countryPage('eyebrow', { country: countries(`names.${c.code}`) }),
    href: `/${c.slug}`,
    keywords: [
      countryNames(c.code),
      c.sentenceNameEn,
      c.slug.replace(/-/g, ' '),
      c.keywords.join(' '),
      c.regions.map((r) => r.name).join(' '),
      c.industries.map((i) => i.name).join(' ')
    ].join(' ')
  }));

  const PAGES = [
    ['/', 'home'],
    ['/products', 'products'],
    ['/rfq', 'rfq'],
    ['/about', 'about'],
    ['/quality', 'quality'],
    ['/contact', 'contact'],
    ['/privacy-policy', 'privacy'],
    ['/disclaimer', 'disclaimer']
  ] as const;
  const extra: Partial<Record<(typeof PAGES)[number][1], string>> = {
    quality: 'ISO 9001 certificate PMI EN 10204 3.1 ASTM DIN Linde',
    contact: 'email phone WhatsApp address map Mumbai',
    rfq: 'quote quotation price RFQ'
  };
  const pageEntries: SearchEntry[] = PAGES.map(([href, key]) => ({
    type: 'page',
    title: nav(key),
    subtitle: href,
    href,
    keywords: [navEn(key), extra[key] ?? ''].join(' ')
  }));

  return [...productEntries, ...countryEntries, ...pageEntries];
}
