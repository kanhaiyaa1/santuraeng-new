import { useTranslations } from 'next-intl';
import type { Product } from '@/content/products';

export default function AlloyTable({ product }: { product: Product }) {
  const t = useTranslations('productPage');
  const thBase = 'px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500';
  const th = `${thBase} text-start`;
  const td = 'px-4 py-3 text-sm text-slate-700';

  if (product.alloyTable.length) {
    return (
      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full min-w-[32rem] divide-y divide-slate-200 bg-white">
          <thead className="bg-slate-50">
            <tr>
              <th scope="col" className={th}>{t('grade')}</th>
              <th scope="col" className={th}>{t('maxTemp')}</th>
              <th scope="col" className={th}>{t('typicalUse')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {product.alloyTable.map((r) => (
              <tr key={r.grade}>
                <th scope="row" dir="auto" className={`${td} text-start font-semibold text-navy-900`}>{r.grade}</th>
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
    return <p className="text-sm text-slate-700">{product.material}</p>;
  }

  if (!product.alloys.length) {
    return <p className="text-sm text-slate-700">{t('alloysOnRequest')}</p>;
  }

  const forms = product.alloys.map((a) => a.form);
  const grades = Array.from(new Set(product.alloys.flatMap((a) => a.grades)));
  const has = (form: string, grade: string) => product.alloys.some((a) => a.form === form && a.grades.includes(grade));

  if (forms.length === 1) {
    return (
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{t(`forms.${forms[0]}`)}</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {grades.map((g) => (
            <li key={g} className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-navy-900">
              {g}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200">
      <table className="w-full divide-y divide-slate-200 bg-white">
        <thead className="bg-slate-50">
          <tr>
            <th scope="col" className={th}>{t('grade')}</th>
            {forms.map((f) => (
              <th key={f} scope="col" className={`${thBase} text-center`}>{t(`forms.${f}`)}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {grades.map((g) => (
            <tr key={g}>
              <th scope="row" className={`${td} text-start font-semibold text-navy-900`}>{g}</th>
              {forms.map((f) => (
                <td key={f} className={`${td} text-center`}>
                  {has(f, g) ? <span className="text-emerald-600">✓</span> : <span className="text-slate-300">—</span>}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
