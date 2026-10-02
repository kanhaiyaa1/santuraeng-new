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
    <footer className="bg-navy-950 text-navy-100">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="rounded bg-white p-1">
              <Image src="/images/logo.jpg" alt={SITE.legalName} width={20} height={32} />
            </span>
            <span className="text-lg font-semibold text-white">{SITE.legalName}</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed">{t('tagline')}</p>
          <p className="mt-3 text-xs font-semibold text-white">{common('facts')}</p>
          <p className="mt-4 text-xs text-navy-100/70">
            {t('cin')}: {SITE.cin}
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-white">{t('headOffice')}</h2>
          <address className="mt-3 text-sm not-italic leading-relaxed">
            {SITE.headOffice.lines.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </address>
          <h2 className="mt-6 text-sm font-semibold text-white">{t('works')}</h2>
          <address className="mt-3 text-sm not-italic leading-relaxed">
            {SITE.works.lines.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </address>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-white">{t('contact')}</h2>
          <dl className="mt-3 space-y-3 text-sm">
            <div>
              <dt className="text-navy-100/70">{t('email')}</dt>
              <dd>
                <a href={`mailto:${SITE.generalEmail}`} className="hover:text-white">
                  {SITE.generalEmail}
                </a>
              </dd>
            </div>
            {SITE.contacts.map((c) => (
              <div key={c.name}>
                <dt className="text-navy-100/70">{c.name}</dt>
                <dd>
                  <a href={`tel:${c.tel}`} className="block hover:text-white" dir="ltr">
                    {c.phone}
                  </a>
                  <a href={`mailto:${c.email}`} className="block hover:text-white">
                    {c.email}
                  </a>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-white">{t('hours')}</h2>
          <p className="mt-3 text-sm">{t('hoursValue')}</p>
          <h2 className="mt-6 text-sm font-semibold text-white">{t('quickLinks')}</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-white">
                {nav('home')}
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-white">
                {nav('products')}
              </Link>
            </li>
            <li>
              <Link href="/rfq" className="hover:text-white">
                {nav('rfq')}
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-white">
                {nav('about')}
              </Link>
            </li>
            <li>
              <Link href="/quality" className="hover:text-white">
                {nav('quality')}
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white">
                {nav('contact')}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-6 text-xs text-navy-100/70">
          <p>
            © {year} {SITE.legalName} {t('rights')}
          </p>
          <nav aria-label={t('legal')} className="flex gap-4">
            <Link href="/privacy-policy" className="hover:text-white">
              {nav('privacy')}
            </Link>
            <Link href="/disclaimer" className="hover:text-white">
              {nav('disclaimer')}
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
