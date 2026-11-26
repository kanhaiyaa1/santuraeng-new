// Client photos, filed by subject under public/images (shipping, testing, company, products/general).
// Captions/alt text live in messages under "photos.<key>".
const SHIPPING = '/images/shipping';
const TESTING = '/images/testing';
const COMPANY = '/images/company';
const PRODUCTS = '/images/products/general';

export const PHOTOS = {
  cartonsBulk: { src: `${SHIPPING}/bulk-carton-boxes-industrial-packaging-santura.webp`, w: 1448, h: 1086 },
  containerCartons: { src: `${SHIPPING}/export-cartons-shrink-wrapped-shipping-container-santura.webp`, w: 1448, h: 1086 },
  xrfHandheld: { src: `${TESTING}/handheld-xrf-analyzer-stainless-steel-alloy-composition-testing-santura.webp`, w: 941, h: 1672 },
  crateBulk: { src: `${SHIPPING}/industrial-bulk-material-export-packaging-santura.webp`, w: 1536, h: 1024 },
  cartonsDispatch: { src: `${SHIPPING}/industrial-components-carton-packaging-dispatch-santura.webp`, w: 1448, h: 1086 },
  componentsPacked: { src: `${SHIPPING}/industrial-metal-components-packaging-santura.webp`, w: 1536, h: 1024 },
  anchorsWavy: { src: `${PRODUCTS}/industrial-refractory-anchor-santura.webp`, w: 941, h: 1672 },
  anchorsBent: { src: `${PRODUCTS}/industrial-steel-bent-anchor-rods-santura.webp`, w: 1086, h: 1448 },
  tubesStock: { src: `${COMPANY}/industrial-steel-tubes-bulk-warehouse-storage-santura.webp`, w: 1448, h: 1086 },
  wireCoilsStock: { src: `${COMPANY}/industrial-steel-wire-coils-warehouse-storage-santura.webp`, w: 1086, h: 1448 },
  dispatchTeam: { src: `${SHIPPING}/industrial-team-safety-uniforms-shipping-dispatch-santura.webp`, w: 1109, h: 1418 },
  cratesContainer: { src: `${SHIPPING}/industrial-wooden-crates-bulk-material-container-loading-santura.webp`, w: 1448, h: 1086 },
  workerPacking: { src: `${SHIPPING}/industrial-worker-carton-packaging-warehouse-santura.webp`, w: 1086, h: 1448 },
  truckDispatch: { src: `${SHIPPING}/metal-components-bulk-truck-loading-dispatch-santura.webp`, w: 1672, h: 941 },
  containerPallets: { src: `${SHIPPING}/palletized-carton-shipment-loaded-shipping-container-santura.webp`, w: 1086, h: 1448 },
  factoryExterior: { src: `${COMPANY}/santura-engineering-factory-exterior-manufacturing-facility.webp`, w: 1671, h: 941 },
  xrfTesting: { src: `${TESTING}/steel-alloy-composition-xrf-analyzer-quality-testing-santura.webp`, w: 1086, h: 1448 },
  workshopStock: { src: `${COMPANY}/steel-components-workshop-storage-santura.webp`, w: 1086, h: 1448 },
  rodCaliper: { src: `${TESTING}/steel-rod-diameter-vernier-caliper-quality-inspection-santura.webp`, w: 1086, h: 1448 },
  wireXrf: { src: `${TESTING}/steel-wire-alloy-quality-testing-santura.webp`, w: 1536, h: 1024 },
  wireCoilsBulk: { src: `${COMPANY}/steel-wire-coil-bulk-storage-industrial-warehouse-santura.webp`, w: 1672, h: 941 },
  wireCoilsInventory: { src: `${COMPANY}/steel-wire-coil-inventory-industrial-warehouse-santura.webp`, w: 1448, h: 1086 },
  wireCaliper: { src: `${TESTING}/steel-wire-diameter-vernier-caliper-inspection-santura.webp`, w: 1086, h: 1448 },
  cratePacking: { src: `${SHIPPING}/wooden-crate-protective-packaging-industrial-components-santura.webp`, w: 1448, h: 1086 }
} as const;

export type PhotoKey = keyof typeof PHOTOS;

/** Placement of the photos by page. */
export const QUALITY_PHOTOS: PhotoKey[] = ['xrfHandheld', 'xrfTesting', 'wireXrf', 'rodCaliper', 'wireCaliper'];
export const SHIPPING_PHOTOS: PhotoKey[] = ['containerCartons', 'cratesContainer', 'containerPallets', 'factoryExterior'];
export const ABOUT_GALLERY: PhotoKey[] = [
  'dispatchTeam',
  'workshopStock',
  'anchorsWavy',
  'anchorsBent',
  'wireCoilsStock',
  'wireCoilsBulk',
  'wireCoilsInventory',
  'tubesStock',
  'workerPacking',
  'cartonsBulk',
  'cartonsDispatch',
  'componentsPacked',
  'crateBulk',
  'cratePacking',
  'truckDispatch',
  'containerCartons'
];
