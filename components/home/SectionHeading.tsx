type Props = {
  eyebrow: string;
  title: string;
  subtitle?: string;
};

export default function SectionHeading({ eyebrow, title, subtitle }: Props) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm font-semibold uppercase tracking-wider text-brand-500">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-4 text-lg text-ink-body">{subtitle}</p>}
    </div>
  );
}
