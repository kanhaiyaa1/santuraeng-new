// Product categories for the header mega menu, the /products overview and the /products/[slug] placeholders.
// Single source of truth for slugs, order and status. `name` / `description` are the English copy;
// every language (English included) is rendered from messages "productCategories.items.<slug>".
// Only Refractory Anchors has content today; the other categories render a noindex "Coming soon" page.

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
  { slug: 'observation-peep-doors', name: 'Observation / Peep Doors', description: 'Sight and peep doors for furnaces, heaters and boilers.', hasContent: false, icon: 'door' },
  { slug: 'foundation-bolts', name: 'Foundation Bolts', description: 'Anchor and foundation bolts for structures and equipment.', hasContent: false, icon: 'bolt' },
  { slug: 'support-plates', name: 'Support Plates', description: 'Base and support plates made to drawing.', hasContent: false, icon: 'plate' },
  { slug: 'industrial-stanchions', name: 'Industrial Stanchions', description: 'Stanchions and posts for platforms and handrails.', hasContent: false, icon: 'stanchion' },
  { slug: 'pipe-guides-sleeves', name: 'Pipe Guides & Sleeves', description: 'Pipe guides and ring sleeves for fired heaters.', hasContent: false, icon: 'pipe' },
  { slug: 'counter-weight-systems', name: 'Counter-Weight Systems', description: 'Counter-weight assemblies for heater tube support.', hasContent: false, icon: 'weight' },
  { slug: 'mineral-wool', name: 'Mineral Wool', description: 'Rock and mineral wool insulation products.', hasContent: false, icon: 'wool' },
  { slug: 'ceramic-gaskets', name: 'Ceramic Gaskets', description: 'High-temperature ceramic fibre gaskets and seals.', hasContent: false, icon: 'gasket' },
  { slug: 'glass-fibre-sheets', name: 'Glass Fibre Sheets', description: 'Glass fibre sheets, cloth and glass wool.', hasContent: false, icon: 'sheet' },
  { slug: 'calcium-silicate', name: 'Calcium Silicate', description: 'Calcium silicate boards and pipe sections.', hasContent: false, icon: 'block' },
  { slug: 'insulation-pins', name: 'Insulation Pins', description: 'Weld pins and clips for fixing insulation.', hasContent: false, icon: 'pin' },
  { slug: 'polystyrene-insulation', name: 'Polystyrene Insulation', description: 'Expanded and extruded polystyrene insulation.', hasContent: false, icon: 'foam' },
  { slug: 'polyisocyanurate-insulation', name: 'Polyisocyanurate Insulation', description: 'PIR insulation boards and pipe sections.', hasContent: false, icon: 'panel' },
  { slug: 'fasteners', name: 'Fasteners', description: 'Bolts, studs, nuts and rivets in stainless and alloy steels.', hasContent: false, icon: 'fastener' },
  { slug: 'insulation-accessories', name: 'Insulation Accessories', description: 'Bands, clips, washers and other insulation fixings.', hasContent: false, icon: 'kit' },
  { slug: 'steel-plates', name: 'Steel Plates', description: 'Stainless and alloy steel plates and sheets.', hasContent: false, icon: 'steel' },
  { slug: 'trading-division', name: 'Trading Division', description: 'Stainless steel and industrial materials supply.', hasContent: false, icon: 'trade' }
];

/** Where a category links to: the SEPL listing (/refractory-anchors) for anchors, a category page for the rest. */
export function categoryHref(c: ProductCategory) {
  return c.slug === 'refractory-anchors' ? '/refractory-anchors' : `/products/${c.slug}`;
}

/** Categories that get their own /products/[slug] page (everything except Refractory Anchors). */
export const PLACEHOLDER_CATEGORIES = PRODUCT_CATEGORIES.filter((c) => c.slug !== 'refractory-anchors');

export function getCategory(slug: string) {
  return PLACEHOLDER_CATEGORIES.find((c) => c.slug === slug);
}
