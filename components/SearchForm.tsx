import { useTranslations } from 'next-intl';
import { btnPrimary } from '@/lib/ui';
import { MAX_QUERY_LENGTH } from '@/lib/searchCore';

type Props = {
  /** Localised path of the results page, e.g. "/search" or "/de/search". */
  action: string;
  defaultValue?: string;
  autoFocus?: boolean;
};

/** Plain GET form to /search?q=…, so it works before (and without) JavaScript. */
export default function SearchForm({ action, defaultValue, autoFocus }: Props) {
  const t = useTranslations('search');
  const tp = useTranslations('searchPage');

  return (
    <form action={action} method="get" role="search" className="flex flex-col gap-3 sm:flex-row">
      <label className="flex flex-1 items-center gap-3 rounded-md border border-line bg-white px-3 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/20">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="h-5 w-5 shrink-0 text-ink-muted" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3.5-3.5" />
        </svg>
        <span className="sr-only">{t('label')}</span>
        <input
          type="search"
          name="q"
          defaultValue={defaultValue}
          placeholder={t('placeholder')}
          maxLength={MAX_QUERY_LENGTH}
          autoFocus={autoFocus}
          autoComplete="off"
          className="w-full appearance-none bg-transparent py-3 text-base text-ink placeholder:text-ink-muted focus:outline-none"
        />
      </label>
      <button type="submit" className={btnPrimary}>{tp('submit')}</button>
    </form>
  );
}
