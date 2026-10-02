import type { AppLocale } from '@/i18n/routing';

// Verified facts only — source: docs/dev-reference.md "Verified Company Facts".
export const SITE = {
  legalName: 'Santura Engineering Pvt. Ltd.',
  cin: 'U74200MH2008PTC184443',
  foundingYear: 1980,
  founder: { name: 'Bharat Diwan', jobTitle: 'Production Engineer' },
  exportCountries: '25+',
  iso: {
    standard: 'ISO 9001:2015',
    certificateNo: '136802/A/0001/UK/En',
    issuer: 'URS',
    accreditation: 'UKAS',
    scope: 'Manufacturing and Supply of Refractory Anchors and Soft Components for Heaters',
    validUntil: '2027-06-26'
  },
  // Kept on the site per client instruction (historic approval, counter-weight systems).
  linde: { name: 'Linde Engineering India Pvt Ltd', scope: 'Counter Weight System', supplierCode: '4002580', period: '2009–2012' },
  generalEmail: 'enquiries@santura-eng.com',
  whatsappNumber: '919833222326',
  contacts: [
    { name: 'Nikhil Diwan', phone: '+91 98332 22326', tel: '+919833222326', email: 'nikhil.diwan@santura-eng.com' },
    { name: 'Shravan Diwan', phone: '+91 99309 68116', tel: '+919930968116', email: 'shravandiwan@santura-eng.com' }
  ],
  headOffice: {
    lines: ['BPT Plot No. 200, 201, Quay Street', 'Darukhana, Reay Road', 'Mumbai 400010, Maharashtra, India'],
    street: 'BPT Plot No. 200, 201, Quay Street, Darukhana, Reay Road',
    locality: 'Mumbai',
    region: 'Maharashtra',
    postalCode: '400010',
    country: 'IN'
  },
  works: {
    lines: ['W 74 A, MIDC Tarapur', 'Boisar, Maharashtra 401506, India']
  }
} as const;

export const whatsappUrl = `https://wa.me/${SITE.whatsappNumber}`;

export type CountryPage = {
  code: string;
  slug: string;
  locale: AppLocale;
  language?: 'en' | 'fr' | 'nl';
};

// Phase 1 country landing pages — source: docs/seo-strategy.md.
export const PHASE1_COUNTRIES: CountryPage[] = [
  { code: 'AE', slug: 'uae', locale: 'ar' },
  { code: 'SA', slug: 'saudi-arabia', locale: 'ar' },
  { code: 'DE', slug: 'germany', locale: 'de' },
  { code: 'TR', slug: 'turkiye', locale: 'tr' },
  { code: 'BR', slug: 'brazil', locale: 'pt-BR' },
  { code: 'NL', slug: 'netherlands', locale: 'nl' },
  { code: 'IT', slug: 'italy', locale: 'it' },
  { code: 'FR', slug: 'france', locale: 'fr' },
  { code: 'PL', slug: 'poland', locale: 'pl' },
  { code: 'BE', slug: 'belgium', locale: 'nl', language: 'nl' },
  { code: 'BE', slug: 'belgium', locale: 'fr', language: 'fr' },
  { code: 'ES', slug: 'spain', locale: 'es' },
  { code: 'MX', slug: 'mexico', locale: 'es' },
  { code: 'GB', slug: 'united-kingdom', locale: 'en' },
  { code: 'CA', slug: 'canada', locale: 'en', language: 'en' },
  { code: 'CA', slug: 'canada', locale: 'fr', language: 'fr' }
];

/** Message arguments for the trust.items.iso / trust.items.linde texts. */
export function qualityArgs(locale: string) {
  const date = new Intl.DateTimeFormat(locale === 'en' ? 'en-GB' : locale, { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(SITE.iso.validUntil));
  return {
    iso: { number: SITE.iso.certificateNo, date, scope: SITE.iso.scope },
    linde: { code: SITE.linde.supplierCode, period: SITE.linde.period }
  };
}
