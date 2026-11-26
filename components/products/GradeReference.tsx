/**
 * Stainless steel grade reference table (grade family · grades · key properties).
 * Presentation only: pass translated labels and rows, so any page can reuse it with its own copy.
 * Grade codes are shown left-to-right in RTL locales.
 */
export type GradeFamilyRow = { family: string; grades: string; properties: string };

type Props = {
  title: string;
  intro?: string;
  note?: string;
  colFamily: string;
  colGrades: string;
  colProperties: string;
  rows: GradeFamilyRow[];
  headingId?: string;
};

export default function GradeReference({ title, intro, note, colFamily, colGrades, colProperties, rows, headingId }: Props) {
  const th = 'px-4 py-3 text-start text-xs font-semibold uppercase tracking-wide text-ink-muted';
  return (
    <div className="min-w-0">
      <h2 id={headingId} className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">{title}</h2>
      {intro && <p className="mt-3 max-w-3xl text-ink-body">{intro}</p>}
      <div className="mt-6 overflow-x-auto rounded-lg border border-line">
        <table className="w-full min-w-[40rem] divide-y divide-line bg-white">
          <thead className="bg-surface-alt">
            <tr>
              <th scope="col" className={th}>{colFamily}</th>
              <th scope="col" className={th}>{colGrades}</th>
              <th scope="col" className={th}>{colProperties}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rows.map((r) => (
              <tr key={r.family}>
                <th scope="row" className="px-4 py-3 text-start align-top text-sm font-semibold text-ink">{r.family}</th>
                <td className="px-4 py-3 align-top text-sm text-ink-body"><span dir="ltr">{r.grades}</span></td>
                <td className="px-4 py-3 align-top text-sm leading-relaxed text-ink-body">{r.properties}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {note && <p className="mt-4 border-s-2 border-brand-500 ps-3 text-sm text-ink-body">{note}</p>}
    </div>
  );
}
