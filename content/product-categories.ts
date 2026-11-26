// Product categories for the header mega menu, the /products overview and the /products/[slug] placeholders.
// Single source of truth for slugs, order and status. `name` / `description` are the English copy;
// every language (English included) is rendered from messages "productCategories.items.<slug>".
// Categories with hasContent: true have their own route (/refractory-anchors, app/[locale]/products/observation-peep-doors, .../foundation-bolts, .../support-plates, .../industrial-stanchions, .../pipe-guides-sleeves, .../counter-weight-systems, .../mineral-wool, .../ceramic-gaskets, .../glass-fibre-sheets, .../calcium-silicate, .../insulation-pins, .../polystyrene-insulation, .../polyisocyanurate-insulation, .../fasteners, .../insulation-accessories, .../steel-fibres, .../trading-division);
// the rest render the noindex "Coming soon" page from /products/[slug].

export type CategoryIcon =
  | 'anchor' | 'door' | 'bolt' | 'plate' | 'stanchion' | 'pipe' | 'weight' | 'wool' | 'gasket'
  | 'sheet' | 'block' | 'pin' | 'foam' | 'panel' | 'fastener' | 'kit' | 'steel' | 'trade';

export type ProductCategory = {
  slug: string;
  name: string;
  description: string;
  hasContent: boolean;
  icon?: CategoryIcon;
};

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  { slug: 'refractory-anchors', name: 'Refractory Anchors', description: 'SEPL anchors for brick, castable, double and ceramic fibre linings.', hasContent: true, icon: 'anchor' },
  { slug: 'steel-fibres', name: 'Steel Fibres', description: 'Melt extract and cold drawn stainless steel fibres for refractory castables.', hasContent: true, icon: 'steel' },
  { slug: 'observation-peep-doors', name: 'Observation / Peep Doors', description: 'Sight and peep doors for furnaces, heaters and boilers.', hasContent: true, icon: 'door' },
  { slug: 'foundation-bolts', name: 'Foundation Bolts', description: 'Anchor and foundation bolts for structures and equipment.', hasContent: true, icon: 'bolt' },
  { slug: 'support-plates', name: 'Support Plates', description: 'Base and support plates made to drawing.', hasContent: true, icon: 'plate' },
  { slug: 'industrial-stanchions', name: 'Industrial Stanchions', description: 'Stanchions and posts for platforms and handrails.', hasContent: true, icon: 'stanchion' },
  { slug: 'pipe-guides-sleeves', name: 'Pipe Guides & Sleeves', description: 'Pipe guides and ring sleeves for fired heaters.', hasContent: true, icon: 'pipe' },
  { slug: 'counter-weight-systems', name: 'Counter-Weight Systems', description: 'Counter-weight assemblies for heater tube support.', hasContent: true, icon: 'weight' },
  { slug: 'mineral-wool', name: 'Mineral Wool', description: 'Rock and mineral wool insulation products.', hasContent: true, icon: 'wool' },
  { slug: 'ceramic-gaskets', name: 'Ceramic Gaskets', description: 'High-temperature ceramic fibre gaskets and seals.', hasContent: true, icon: 'gasket' },
  { slug: 'glass-fibre-sheets', name: 'Glass Fibre Sheets', description: 'Glass fibre sheets, cloth and glass wool.', hasContent: true, icon: 'sheet' },
  { slug: 'calcium-silicate', name: 'Calcium Silicate', description: 'Calcium silicate boards and pipe sections.', hasContent: true, icon: 'block' },
  { slug: 'insulation-pins', name: 'Insulation Pins', description: 'Weld pins and clips for fixing insulation.', hasContent: true, icon: 'pin' },
  { slug: 'polystyrene-insulation', name: 'Polystyrene Insulation', description: 'Expanded and extruded polystyrene insulation.', hasContent: true, icon: 'foam' },
  { slug: 'polyisocyanurate-insulation', name: 'Polyisocyanurate Insulation', description: 'PIR insulation boards and pipe sections.', hasContent: true, icon: 'panel' },
  { slug: 'fasteners', name: 'Fasteners', description: 'Bolts, studs, nuts and rivets in stainless and alloy steels.', hasContent: true, icon: 'fastener' },
  { slug: 'insulation-accessories', name: 'Insulation Accessories', description: 'Bands, clips, washers and other insulation fixings.', hasContent: true, icon: 'kit' },
  { slug: 'trading-division', name: 'Trading Division', description: 'Stainless steel and industrial materials supply.', hasContent: true, icon: 'trade' }
];

/** Where a category links to: the SEPL listing (/refractory-anchors) for anchors, a category page for the rest. */
export function categoryHref(c: ProductCategory) {
  return c.slug === 'refractory-anchors' ? '/refractory-anchors' : `/products/${c.slug}`;
}

/** Categories rendered by the /products/[slug] "Coming soon" template. */
export const PLACEHOLDER_CATEGORIES = PRODUCT_CATEGORIES.filter((c) => !c.hasContent);

/** Category pages with real content under /products (indexable, listed in the sitemap). */
export const CONTENT_CATEGORY_PATHS = PRODUCT_CATEGORIES.filter((c) => c.hasContent && c.slug !== 'refractory-anchors').map(categoryHref);

/** Any category except Refractory Anchors (e.g. for the RFQ ?category= prefill). */
export function getCategory(slug: string) {
  return PRODUCT_CATEGORIES.find((c) => c.slug === slug && c.slug !== 'refractory-anchors');
}

export function getPlaceholderCategory(slug: string) {
  return PLACEHOLDER_CATEGORIES.find((c) => c.slug === slug);
}
