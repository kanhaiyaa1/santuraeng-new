import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { SITE } from '@/lib/site';

export default function Footer() {
  const t = useTranslations('footer');
  const nav = useTranslations('nav');
  const common = useTranslations('common');
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-surface-footer text-ink-body">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="p-1">
              <Image src="/images/logo.jpg" alt={SITE.legalName} width={20} height={32} />
            </span>
            <span className="text-lg font-semibold text-ink">{SITE.legalName}</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed">{t('tagline')}</p>
          <p className="mt-3 text-xs font-semibold text-ink">{common('facts')}</p>
          <p className="mt-4 text-xs text-ink-muted">
            {t('cin')}: {SITE.cin}
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-ink">{t('headOffice')}</h2>
          <address className="mt-3 text-sm not-italic leading-relaxed">
            {SITE.headOffice.lines.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </address>
          <h2 className="mt-6 text-sm font-semibold text-ink">{t('works')}</h2>
          <address className="mt-3 text-sm not-italic leading-relaxed">
            {SITE.works.lines.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </address>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-ink">{t('contact')}</h2>
          <dl className="mt-3 space-y-3 text-sm">
            <div>
              <dt className="text-ink-muted">{t('email')}</dt>
              <dd>
                <a href={`mailto:${SITE.generalEmail}`} className="hover:text-brand-500">
                  {SITE.generalEmail}
                </a>
              </dd>
            </div>
            {SITE.contacts.map((c) => (
              <div key={c.name}>
                <dt className="text-ink-muted">{c.name}</dt>
                <dd>
                  <a href={`tel:${c.tel}`} className="block hover:text-brand-500" dir="ltr">
                    {c.phone}
                  </a>
                  <a href={`mailto:${c.email}`} className="block hover:text-brand-500">
                    {c.email}
                  </a>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-ink">{t('hours')}</h2>
          <p className="mt-3 text-sm">{t('hoursValue')}</p>
          <h2 className="mt-6 text-sm font-semibold text-ink">{t('quickLinks')}</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-brand-500">
                {nav('home')}
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-brand-500">
                {nav('products')}
              </Link>
            </li>
            <li>
              <Link href="/rfq" className="hover:text-brand-500">
                {nav('rfq')}
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-brand-500">
                {nav('about')}
              </Link>
            </li>
            <li>
              <Link href="/quality" className="hover:text-brand-500">
                {nav('quality')}
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-brand-500">
                {nav('contact')}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-6 text-xs text-ink-muted">
          <p>
            © {year} {SITE.legalName} {t('rights')}
          </p>
          <nav aria-label={t('legal')} className="flex gap-4">
            <Link href="/privacy-policy" className="hover:text-brand-500">
              {nav('privacy')}
            </Link>
            <Link href="/disclaimer" className="hover:text-brand-500">
              {nav('disclaimer')}
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
