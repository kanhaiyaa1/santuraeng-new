import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { buildAlternates } from '@/lib/seo';
import { breadcrumbJsonLd } from '@/lib/page';
import { btnPrimary } from '@/lib/ui';
import { SERVICES, getService } from '@/content/services';
import PageHeader from '@/components/PageHeader';

type Props = { params: { locale: string; slug: string } };

export const dynamicParams = false;

// Services with real content have their own dedicated route.
export function generateStaticParams() {
  return SERVICES.filter((s) => !s.hasContent).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params: { locale, slug } }: Props): Promise<Metadata> {
  const service = getService(slug);
  if (!service) return {};
  const t = await getTranslations({ locale, namespace: 'services' });
  const name = t(`items.${slug}.name`);
  return {
    title: { absolute: t('metaTitle', { name }) },
    description: t('metaDescription', { name }),
    alternates: buildAlternates(`/services/${slug}`, locale),
    // "Coming soon" pages stay out of search results until real content is added.
    robots: service.hasContent ? undefined : { index: false, follow: true }
  };
}

export default async function ServicePage({ params: { locale, slug } }: Props) {
  const service = getService(slug);
  if (!service) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'services' });
  const name = t(`items.${slug}.name`);

  return (
    <main className="bg-surface-alt pb-20">
      <PageHeader
        locale={locale}
        title={name}
        intro={t(`items.${slug}.description`)}
        jsonLd={[await breadcrumbJsonLd(locale, `/services/${slug}`, name)]}
      />

      <div className="mx-auto max-w-6xl px-6 pt-10">
        <section className="rounded-lg border border-line bg-white p-8">
          <span className="rounded-full border border-line bg-surface-alt px-3 py-1 text-xs font-semibold text-ink-body">{t('comingSoon')}</span>
          <h2 className="mt-4 text-xl font-bold text-ink">{t('comingSoonTitle')}</h2>
          <p className="mt-2 max-w-2xl text-ink-body">{t('comingSoonText')}</p>
          <div className="mt-6">
            <Link href="/contact" className={btnPrimary}>{t('cta')}</Link>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg font-bold text-ink">{t('otherServices')}</h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {SERVICES.filter((s) => s.slug !== slug).map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="block rounded-md border border-line bg-white px-4 py-3 text-sm font-semibold text-ink hover:border-brand-500 hover:text-brand-500"
                >
                  {t(`items.${s.slug}.name`)}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
