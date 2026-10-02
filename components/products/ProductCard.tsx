import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import type { Product } from '@/content/products';
import { alloySummary, imageAltKind, productTitle } from '@/lib/products';

export default function ProductCard({ product }: { product: Product }) {
  const t = useTranslations('products');
  const pt = useTranslations('productPage');
  const title = productTitle(product);
  const alloys = alloySummary(product);
  const kind = imageAltKind(product);
  const alt = alloys ? pt(`imageAlt.${kind}`, { title, alloys }) : pt(`imageAlt.${kind}Plain`, { title });

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-navy-600 hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] border-b border-slate-100 bg-white">
        {product.images[0] ? (
          <Image
            src={product.images[0]}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-contain p-4"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm font-semibold text-slate-400">{product.code}</div>
        )}
        {product.comingSoon && (
          <span className="absolute start-3 top-3 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-800">
            {t('comingSoon')}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        {product.code && <span className="text-xs font-semibold tracking-wide text-navy-600">{product.code}</span>}
        <h3 className="mt-1 font-bold text-navy-900">{product.name}</h3>
        <div className="mt-3 flex flex-1 items-end justify-between gap-2">
          <span className="rounded-full bg-navy-100 px-2.5 py-1 text-xs font-medium text-navy-700">
            {t(`linings.${product.lining}`)}
          </span>
          <span className="text-sm font-semibold text-brand-500 group-hover:text-brand-600">
            <span className="sr-only">{t('viewProduct')}</span>
            <span aria-hidden="true" className="inline-block rtl:rotate-180">
              →
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}
