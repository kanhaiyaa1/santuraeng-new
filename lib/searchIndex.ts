import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { PRODUCTS, productTitle } from '@/content/products';
import { COUNTRIES, contentFor, localized } from '@/content/countries';
import { SERVICES } from '@/content/services';
import { PRODUCT_CATEGORIES, categoryHref } from '@/content/product-categories';
import type { SearchDoc, SearchEntry } from '@/lib/searchCore';

export type { SearchDoc, SearchEntry } from '@/lib/searchCore';

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
// Nickel alloys share the 3-digit pattern of stainless grades but are never written "SS600".
const NOT_STAINLESS = new Set(['600', '601', '625', '800']);

function alloyTerms(grades: Iterable<string>) {
  return Array.from(grades, (g) => {
    const compact = g.replace(/\s+/g, '');
    const num = compact.match(/^(\d{3})/)?.[1];
    // "310" and "310SS" also answer to "SS310", the way buyers usually write it.
    const ss = num && !NOT_STAINLESS.has(num) ? `SS${num}` : '';
    return [g, ALLOY_ALIASES[compact] ?? '', ss].join(' ');
  }).join(' ');
}

/** Country names in every site language, so "Deutschland" finds Germany on the English site. */
function countryNames(code: string) {
  return Array.from(
    new Set(routing.locales.map((l) => new Intl.DisplayNames([l], { type: 'region' }).of(code) ?? ''))
  ).join(' ');
}

// Service pages with full content keep their meta description in their own namespace.
const SERVICE_NAMESPACES: Record<string, string> = {
  'bright-solution-annealing': 'bsaPage',
  'pickling-and-passivation': 'ppPage',
  'pmi-testing': 'pmiPage',
  'stud-welding-solutions': 'swPage'
};

async function buildSearchIndex(locale: string): Promise<SearchDoc[]> {
  const t = (namespace: string, l = locale) => getTranslations({ locale: l, namespace });
  const [products, productsEn, nav, navEn, countries, countryPage, categories, categoriesEn, services, servicesEn, meta] =
    await Promise.all([
      t('products'), t('products', 'en'), t('nav'), t('nav', 'en'), t('countries'), t('countryPage'),
      t('productCategories'), t('productCategories', 'en'), t('services'), t('services', 'en'), t('meta')
    ]);

  const productEntries: SearchDoc[] = PRODUCTS.map((p) => {
    const grades = new Set([...p.alloys.flatMap((a) => a.grades), ...p.alloyTable.map((r) => r.grade)]);
    const lining = products(`linings.${p.lining}`);
    const firstParagraph = p.description.find((b) => b.type === 'paragraph');
    return {
      group: 'product',
      title: productTitle(p),
      subtitle: lining,
      href: `/products/${p.slug}`,
      code: codeVariants(p.code),
      alloys: alloyTerms(grades),
      // The localised catalogue title ("Refrakter Ankrajlar…") lets a search for "anchor" in any language reach products.
      keywords: [p.name, lining, productsEn(`linings.${p.lining}`), products('title'), p.material ?? ''].join(' '),
      description: firstParagraph?.type === 'paragraph' ? firstParagraph.text : '',
      breadcrumb: [nav('home'), nav('products'), lining],
      related: [p.name, lining]
    };
  });

  // Category pages with their own content: richer description and extra search terms.
  const od = await t('odPage');
  const odEn = await t('odPage', 'en');
  const fb = await t('fbPage');
  const fbEn = await t('fbPage', 'en');
  const sp = await t('spPage');
  const spEn = await t('spPage', 'en');
  const st = await t('stPage');
  const stEn = await t('stPage', 'en');
  const pg = await t('pgPage');
  const pgEn = await t('pgPage', 'en');
  const cw = await t('cwPage');
  const cwEn = await t('cwPage', 'en');
  const mw = await t('mwPage');
  const mwEn = await t('mwPage', 'en');
  const cg = await t('cgPage');
  const cgEn = await t('cgPage', 'en');
  const gf = await t('gfPage');
  const gfEn = await t('gfPage', 'en');
  const cs = await t('csPage');
  const csEn = await t('csPage', 'en');
  const ip = await t('ipPage');
  const ipEn = await t('ipPage', 'en');
  const ps = await t('psPage');
  const psEn = await t('psPage', 'en');
  const pir = await t('pirPage');
  const pirEn = await t('pirPage', 'en');
  const fs = await t('fsPage');
  const fsEn = await t('fsPage', 'en');
  const ia = await t('iaPage');
  const iaEn = await t('iaPage', 'en');
  const sf = await t('sfPage');
  const sfEn = await t('sfPage', 'en');
  const td = await t('tdPage');
  const tdEn = await t('tdPage', 'en');
  const categoryExtra: Record<string, { description: string; keywords: string }> = {
    'observation-peep-doors': {
      description: od('subheading'),
      keywords: [od('h1'), odEn('h1'), 'observation door peep door peep hole sight port viewing port sight door furnace door boiler kiln'].join(' ')
    },
    'foundation-bolts': {
      description: fb('subheading'),
      keywords: [fb('h1'), fbEn('h1'), 'anchor bolt foundation bolt L type J type U type plate headed all thread rod F1554 A307 B7 galvanized'].join(' ')
    },
    'support-plates': {
      description: sp('subheading'),
      keywords: [sp('h1'), spEn('h1'), 'base plate support plate refractory support bracket burner block column base plate mounting plate gusset stiffener embed plate IS 2062'].join(' ')
    },
    'industrial-stanchions': {
      description: st('subheading'),
      keywords: [st('h1'), stEn('h1'), 'stanchion handrail post railing ball stanchion guard rail toe plate kick plate platform walkway OSHA'].join(' ')
    },
    'pipe-guides-sleeves': {
      description: pg('subheading'),
      keywords: [pg('h1'), pgEn('h1'), 'pipe guide ring sleeve pipe sleeve penetration sleeve tube support fired heater API 560 SS310 spider guide U-bolt'].join(' ')
    },
    'counter-weight-systems': {
      description: cw('subheading'),
      keywords: [cw('h1'), cwEn('h1'), 'counterweight counter weight reformer tube support lever arm dead weight Graphalloy Linde hydrogen reformer cracker'].join(' ')
    },
    'mineral-wool': {
      description: mw('subheading'),
      keywords: [mw('h1'), mwEn('h1'), 'rockwool rock wool stone wool glass wool fibreglass fiberglass insulation slab roll mattress pipe section'].join(' ')
    },
    'ceramic-gaskets': {
      description: cg('subheading'),
      keywords: [cg('h1'), cgEn('h1'), 'gasket ceramic fibre rope tape paper tadpole door seal spiral wound PTFE graphite non-asbestos flange gasket'].join(' ')
    },
    'glass-fibre-sheets': {
      description: gf('subheading'),
      keywords: [gf('h1'), gfEn('h1'), 'glass fibre fiberglass fibreglass cloth glass cloth tape glass wool board roving E-glass lagging'].join(' ')
    },
    'calcium-silicate': {
      description: cs('subheading'),
      keywords: [cs('h1'), csEn('h1'), 'calcium silicate calsil block board slab pipe section lag ASTM C533 IS 8154 IS 9428 high temperature insulation'].join(' ')
    },
    'insulation-pins': {
      description: ip('subheading'),
      keywords: [ip('h1'), ipEn('h1'), 'insulation pin weld pin stick pin hanger pin CD weld pin cup head pin perforated pin self-adhesive pin speed washer self-locking washer dome cap'].join(' ')
    },
    'polystyrene-insulation': {
      description: ps('subheading'),
      keywords: [ps('h1'), psEn('h1'), 'polystyrene EPS XPS expanded extruded thermocol styrofoam foam board pipe section half shell cold room insulation chilled water'].join(' ')
    },
    'polyisocyanurate-insulation': {
      description: pir('subheading'),
      keywords: [pir('h1'), pirEn('h1'), 'polyisocyanurate PIR polyiso polyurethane PUR rigid foam pipe section half shell board lag cryogenic'].join(' ')
    },
    fasteners: {
      description: fs('subheading'),
      keywords: [fs('h1'), fsEn('h1'), 'fasteners bolts nuts washers studs B7 2H B7M hex bolt stud bolt heavy hex nut nylock U-bolt eye bolt carriage bolt socket head Inconel Monel Duplex Hastelloy stainless steel'].join(' ')
    },
    'insulation-accessories': {
      description: ia('subheading'),
      keywords: [ia('h1'), iaEn('h1'), 'insulation accessories cladding jacketing banding strapping band wing seal buckle expansion spring self-tapping screw pop rivet blind rivet tie wire wire mesh perforated sheet scissor clip tape sealant shoulder stud setback cap'].join(' ')
    },
    'steel-fibres': {
      description: sf('subheading'),
      keywords: [sf('h1'), sfEn('h1'), 'steel fibre steel fiber reinforcement needles melt extract cold drawn hooked wavy corrugated straight SEPL-27 SEPL-28 SEPL-29 SEPL-30 AISI 304 310 446 castable reinforcement'].join(' ')
    },
    'trading-division': {
      description: td('subheading'),
      keywords: [td('h1'), tdEn('h1'), 'stainless steel supplier trading wire rod coils hexagonal bars hex bar square bars flat bars HRAP angles PSQ pump shaft quality bright bars hot rolled bars round bars 304 316 310 mill test certificate EN 10204 3.1 UAE Saudi Arabia'].join(' ')
    }
  };

  const categoryEntries: SearchDoc[] = PRODUCT_CATEGORIES.map((c) => {
    const name = categories(`items.${c.slug}.name`);
    const extra = categoryExtra[c.slug];
    return {
      group: 'product',
      title: name,
      subtitle: nav('products'),
      href: categoryHref(c),
      keywords: [categoriesEn(`items.${c.slug}.name`), categoriesEn(`items.${c.slug}.description`), c.slug.replace(/-/g, ' '), extra?.keywords ?? ''].join(' '),
      description: extra?.description ?? categories(`items.${c.slug}.description`),
      breadcrumb: [nav('home'), nav('products')],
      related: [name]
    };
  });

  const serviceMeta = Object.fromEntries(
    await Promise.all(Object.values(SERVICE_NAMESPACES).map(async (ns) => [ns, (await t(ns))('metaDescription')] as const))
  );
  const serviceEntries: SearchDoc[] = SERVICES.map((s) => {
    const name = services(`items.${s.slug}.name`);
    const ns = SERVICE_NAMESPACES[s.slug];
    const description = s.hasContent && ns ? serviceMeta[ns] : services(`items.${s.slug}.description`);
    return {
      group: 'service',
      title: name,
      subtitle: nav('services'),
      href: `/services/${s.slug}`,
      keywords: [servicesEn(`items.${s.slug}.name`), servicesEn(`items.${s.slug}.description`), s.slug.replace(/-/g, ' ')].join(' '),
      description,
      breadcrumb: [nav('home'), nav('services')],
      related: [name]
    };
  });

  const countryEntries: SearchDoc[] = COUNTRIES.map((c) => {
    const name = countries(`names.${c.code}`);
    return {
      group: 'country',
      title: name,
      subtitle: countryPage('eyebrow', { country: name }),
      href: `/${c.slug}`,
      keywords: [
        countryNames(c.code),
        c.sentenceNameEn,
        c.slug.replace(/-/g, ' '),
        c.keywords.join(' '),
        c.regions.map((r) => r.name).join(' '),
        c.industries.map((i) => i.name).join(' ')
      ].join(' '),
      description: localized(contentFor(c, locale).metaDescription, locale).text,
      breadcrumb: [nav('home')],
      related: []
    };
  });

  const PAGES = [
    ['/', 'home', meta('home.description')],
    ['/products', 'products', categories('overviewMetaDescription')],
    ['/rfq', 'rfq', (await t('rfqPage'))('description')],
    ['/about', 'about', (await t('aboutPage'))('metaDescription')],
    ['/quality', 'quality', (await t('qualityPage'))('metaDescription')],
    ['/contact', 'contact', (await t('contactPage'))('metaDescription')],
    ['/privacy-policy', 'privacy', (await t('privacyPage'))('metaDescription')],
    ['/disclaimer', 'disclaimer', (await t('disclaimerPage'))('metaDescription')]
  ] as const;
  const extra: Partial<Record<(typeof PAGES)[number][1], string>> = {
    quality: 'ISO 9001 certificate PMI EN 10204 3.1 ASTM DIN Linde micro etching A262 intergranular',
    contact: 'email phone WhatsApp address map Mumbai',
    rfq: 'quote quotation price RFQ'
  };
  const pageEntries: SearchDoc[] = PAGES.map(([href, key, description]) => ({
    group: 'page',
    title: nav(key),
    subtitle: href,
    href,
    keywords: [navEn(key), extra[key] ?? ''].join(' '),
    description,
    breadcrumb: href === '/' ? [] : [nav('home')],
    related: []
  }));

  return [...productEntries, ...categoryEntries, ...serviceEntries, ...countryEntries, ...pageEntries];
}

const cache = new Map<string, Promise<SearchDoc[]>>();

/** The full index for one locale. Built once per server process in production; rebuilt per request in development. */
export function getSearchIndex(locale: string): Promise<SearchDoc[]> {
  if (process.env.NODE_ENV !== 'production') return buildSearchIndex(locale);
  let built = cache.get(locale);
  if (!built) {
    built = buildSearchIndex(locale);
    cache.set(locale, built);
  }
  return built;
}

/** The dropdown only needs the matching fields, not snippets or breadcrumbs. */
export function toClientIndex(docs: SearchDoc[]): SearchEntry[] {
  return docs.map(({ group, title, subtitle, href, code, alloys, keywords }) => ({ group, title, subtitle, href, code, alloys, keywords }));
}
