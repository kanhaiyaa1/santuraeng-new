type Props = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  tone?: 'light' | 'dark';
};

export default function SectionHeading({ eyebrow, title, subtitle, tone = 'light' }: Props) {
  const dark = tone === 'dark';
  return (
    <div className="max-w-3xl">
      <p className="text-sm font-semibold tracking-wide text-brand-500">{eyebrow}</p>
      <h2 className={`mt-2 text-3xl font-bold tracking-tight sm:text-4xl ${dark ? 'text-white' : 'text-navy-900'}`}>{title}</h2>
      {subtitle && <p className={`mt-4 text-lg ${dark ? 'text-navy-100' : 'text-slate-600'}`}>{subtitle}</p>}
    </div>
  );
}
