import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { POPULAR_SEARCHES } from '@/lib/searchCore';

type Props = {
  /** Terms to show instead of the default popular list (used for "Related searches"). */
  terms?: readonly string[];
  title?: string;
  className?: string;
};

/** Chips linking to /search?q=…; can be placed on any page. */
export default function PopularSearches({ terms = POPULAR_SEARCHES, title, className = '' }: Props) {
  const t = useTranslations('searchPage');
  if (!terms.length) return null;
  // The default terms are English search queries; mark them so screen readers pronounce them correctly.
  const lang = terms === POPULAR_SEARCHES ? 'en' : undefined;

  return (
    <nav aria-label={title ?? t('popularTitle')} className={className}>
      <h2 className="text-sm font-semibold uppercase tracking-wider text-ink-muted">{title ?? t('popularTitle')}</h2>
      <ul className="mt-4 flex flex-wrap gap-2">
        {terms.map((term) => (
          <li key={term}>
            <Link
              href={{ pathname: '/search', query: { q: term } }}
              className="inline-block rounded-full border border-line bg-white px-3 py-1.5 text-sm text-ink transition hover:border-brand-500 hover:text-brand-500"
            >
              <span lang={lang}>{term}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
