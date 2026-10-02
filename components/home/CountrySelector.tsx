import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { PHASE1_COUNTRIES } from '@/lib/site';
import { getCountry } from '@/content/countries';
import SectionHeading from './SectionHeading';

export default function CountrySelector() {
  const t = useTranslations('countries');
  const products = useTranslations('products');
  const locale = useLocale();

  return (
    <section id="countries" className="scroll-mt-20 bg-slate-50 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />
        <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {PHASE1_COUNTRIES.map((c) => {
            const label = (
              <>
                <span className={`fi fi-${c.code.toLowerCase()} shrink-0 rounded-sm text-2xl shadow-sm`} aria-hidden="true" />
                <span className="min-w-0">
                  <span className="block truncate font-semibold text-navy-900">{t(`names.${c.code}`)}</span>
                  {c.language && <span className="block text-xs text-slate-500">{t(`languages.${c.language}`)}</span>}
                </span>
              </>
            );
            return (
              <li key={`${c.code}-${c.locale}`}>
                {getCountry(c.slug) ? (
                  <Link
                    href={`/${c.slug}`}
                    // Same-language links stay unprefixed; next-intl adds the prefix (and a redirect) when locale is passed.
                    locale={c.locale === locale ? undefined : c.locale}
                    hrefLang={c.locale}
                    className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 transition hover:border-navy-600 hover:shadow-md"
                  >
                    {label}
                  </Link>
                ) : (
                  <div className="flex items-center gap-3 rounded-lg border border-dashed border-slate-200 bg-white/60 px-4 py-3 opacity-70">
                    {label}
                    <span className="ms-auto shrink-0 text-xs text-slate-500">{products('comingSoon')}</span>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
