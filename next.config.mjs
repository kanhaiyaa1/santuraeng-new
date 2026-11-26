import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

// Client photos that lived in /images/miscellaneous until 2026-11-26, now filed by subject.
const MOVED_PHOTOS = {
  shipping: [
    'bulk-carton-boxes-industrial-packaging-santura.webp',
    'export-cartons-shrink-wrapped-shipping-container-santura.webp',
    'industrial-bulk-material-export-packaging-santura.webp',
    'industrial-components-carton-packaging-dispatch-santura.webp',
    'industrial-metal-components-packaging-santura.webp',
    'industrial-team-safety-uniforms-shipping-dispatch-santura.webp',
    'industrial-wooden-crates-bulk-material-container-loading-santura.webp',
    'industrial-worker-carton-packaging-warehouse-santura.webp',
    'metal-components-bulk-truck-loading-dispatch-santura.webp',
    'palletized-carton-shipment-loaded-shipping-container-santura.webp',
    'wooden-crate-protective-packaging-industrial-components-santura.webp'
  ],
  testing: [
    'handheld-xrf-analyzer-stainless-steel-alloy-composition-testing-santura.webp',
    'steel-alloy-composition-xrf-analyzer-quality-testing-santura.webp',
    'steel-rod-diameter-vernier-caliper-quality-inspection-santura.webp',
    'steel-wire-alloy-quality-testing-santura.webp',
    'steel-wire-diameter-vernier-caliper-inspection-santura.webp'
  ],
  company: [
    'santura-engineering-factory-exterior-manufacturing-facility.webp',
    'steel-components-workshop-storage-santura.webp',
    'industrial-steel-tubes-bulk-warehouse-storage-santura.webp',
    'industrial-steel-wire-coils-warehouse-storage-santura.webp',
    'steel-wire-coil-bulk-storage-industrial-warehouse-santura.webp',
    'steel-wire-coil-inventory-industrial-warehouse-santura.webp'
  ],
  'products/general': ['industrial-refractory-anchor-santura.webp', 'industrial-steel-bent-anchor-rods-santura.webp']
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    // Standard solution annealing is covered on the Bright Solution Annealing page.
    return [
      { source: '/services/solution-annealing', destination: '/services/bright-solution-annealing', permanent: true },
      {
        source: '/:locale(ar|de|tr|pt-BR|es|it|fr|pl|nl)/services/solution-annealing',
        destination: '/:locale/services/bright-solution-annealing',
        permanent: true
      },
      // Certificate PDFs moved out of the images folder (2026-11-26).
      { source: '/images/certificates/:file*', destination: '/documents/certificates/:file*', permanent: true },
      {
        source: '/images/santura-engineering-factory-tarapur-boisar.jpg',
        destination: '/images/company/santura-engineering-factory-tarapur-boisar.jpg',
        permanent: true
      },
      ...Object.entries(MOVED_PHOTOS).flatMap(([dir, files]) =>
        files.map((f) => ({ source: `/images/miscellaneous/${f}`, destination: `/images/${dir}/${f}`, permanent: true }))
      )
    ];
  }
};

export default withNextIntl(nextConfig);
