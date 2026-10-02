import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

type Props = { locale: string; title: string; intro?: string; jsonLd: object[] };

/** Breadcrumb bar, JSON-LD and H1 header shared by the simple content pages. */
export default async function PageHeader({ locale, title, intro, jsonLd }: Props) {
  const nav = await getTranslations({ locale, namespace: 'nav' });
  const productPage = await getTranslations({ locale, namespace: 'productPage' });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="border-b border-slate-200 bg-white">
        <nav aria-label={productPage('breadcrumb')} className="mx-auto max-w-6xl px-6 py-3 text-sm text-slate-500">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-navy-700">{nav('home')}</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="font-medium text-navy-900">{title}</li>
          </ol>
        </nav>
      </div>
      <section className="bg-gradient-to-br from-navy-900 to-navy-950 text-white">
        <div className="mx-auto max-w-6xl px-6 py-14 sm:py-16">
          <h1 className="max-w-4xl text-3xl font-bold tracking-tight sm:text-5xl">{title}</h1>
          {intro && <p className="mt-5 max-w-3xl text-lg leading-relaxed text-navy-100">{intro}</p>}
        </div>
      </section>
    </>
  );
}
