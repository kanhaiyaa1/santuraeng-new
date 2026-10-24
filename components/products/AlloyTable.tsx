import { useTranslations } from 'next-intl';
import type { Product } from '@/content/products';

export default function AlloyTable({ product }: { product: Product }) {
  const t = useTranslations('productPage');
  const thBase = 'px-4 py-3 text-xs font-semibold uppercase tracking-wide text-ink-muted';
  const th = `${thBase} text-start`;
  const td = 'px-4 py-3 text-sm text-ink-body';

  if (product.alloyTable.length) {
    return (
      <div className="overflow-x-auto rounded-lg border border-line">
        <table className="w-full min-w-[32rem] divide-y divide-line bg-white">
          <thead className="bg-surface-alt">
            <tr>
              <th scope="col" className={th}>{t('grade')}</th>
              <th scope="col" className={th}>{t('maxTemp')}</th>
              <th scope="col" className={th}>{t('typicalUse')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {product.alloyTable.map((r) => (
              <tr key={r.grade}>
                <th scope="row" dir="auto" className={`${td} text-start font-semibold text-ink`}>{r.grade}</th>
                <td dir="auto" className={`${td} whitespace-nowrap`}>{r.maxTemp}</td>
                <td dir="auto" lang="en" className={td}>{r.use}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (product.material) {
    return <p className="text-sm text-ink-body">{product.material}</p>;
  }

  if (!product.alloys.length) {
    return <p className="text-sm text-ink-body">{t('alloysOnRequest')}</p>;
  }

  const forms = product.alloys.map((a) => a.form);
  const grades = Array.from(new Set(product.alloys.flatMap((a) => a.grades)));
  const has = (form: string, grade: string) => product.alloys.some((a) => a.form === form && a.grades.includes(grade));

  if (forms.length === 1) {
    return (
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{t(`forms.${forms[0]}`)}</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {grades.map((g) => (
            <li key={g} className="rounded-md border border-line bg-white px-3 py-1.5 text-sm font-medium text-ink">
              {g}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-line">
      <table className="w-full divide-y divide-line bg-white">
        <thead className="bg-surface-alt">
          <tr>
            <th scope="col" className={th}>{t('grade')}</th>
            {forms.map((f) => (
              <th key={f} scope="col" className={`${thBase} text-center`}>{t(`forms.${f}`)}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {grades.map((g) => (
            <tr key={g}>
              <th scope="row" className={`${td} text-start font-semibold text-ink`}>{g}</th>
              {forms.map((f) => (
                <td key={f} className={`${td} text-center`}>
                  {has(f, g) ? <span className="text-brand-500">✓</span> : <span className="text-line">—</span>}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
