import type { LiningType, Product } from '@/content/products';
import { PRODUCTS, productTitle } from '@/content/products';

// Anchor ids used by the homepage category cards (/products#brick-lining etc.).
export const LINING_ANCHOR: Record<LiningType, string> = {
  brick: 'brick-lining',
  castable: 'castable-lining',
  double: 'double-lining',
  ceramic: 'ceramic-fiber-lining',
  washers: 'washers',
  fibres: 'steel-fibres'
};

export function alloySummary(p: Product, max = 3): string {
  const grades = p.alloyTable.length ? p.alloyTable.map((r) => r.grade) : p.alloys.flatMap((a) => a.grades);
  const unique = Array.from(new Set(grades));
  if (unique.length) return unique.slice(0, max).join(', ');
  return p.material ?? '';
}

export function imageAltKind(p: Product): 'anchor' | 'fibre' | 'washer' {
  if (p.lining === 'fibres') return 'fibre';
  if (p.lining === 'washers' || p.code === 'SEPL-26') return 'washer';
  return 'anchor';
}

export function relatedProducts(p: Product, limit = 6): Product[] {
  return PRODUCTS.filter((x) => x.lining === p.lining && x.slug !== p.slug).slice(0, limit);
}

export function truncate(text: string, max = 155): string {
  if (text.length < max) return text;
  const cut = text.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(' '))}…`;
}

export { productTitle };
