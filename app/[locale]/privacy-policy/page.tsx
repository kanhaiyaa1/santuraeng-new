import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { pageMetadata } from '@/lib/page';
import LegalPage from '@/components/LegalPage';

type Props = { params: { locale: string } };

// Revision date shown on the page; update when the text changes.
const UPDATED = '2026-10-02';

export function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  return pageMetadata(locale, 'privacyPage', '/privacy-policy');
}

export default function PrivacyPolicyPage({ params: { locale } }: Props) {
  setRequestLocale(locale);
  return <LegalPage locale={locale} namespace="privacyPage" pathname="/privacy-policy" updated={UPDATED} />;
}
