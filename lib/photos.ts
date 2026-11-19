// Client photos (public/images/miscellaneous). Captions/alt text live in messages under "photos.<key>".
const DIR = '/images/miscellaneous';

export const PHOTOS = {
  cartonsBulk: { src: `${DIR}/bulk-carton-boxes-industrial-packaging-santura.webp`, w: 1448, h: 1086 },
  containerCartons: { src: `${DIR}/export-cartons-shrink-wrapped-shipping-container-santura.webp`, w: 1448, h: 1086 },
  xrfHandheld: { src: `${DIR}/handheld-xrf-analyzer-stainless-steel-alloy-composition-testing-santura.webp`, w: 941, h: 1672 },
  crateBulk: { src: `${DIR}/industrial-bulk-material-export-packaging-santura.webp`, w: 1536, h: 1024 },
  cartonsDispatch: { src: `${DIR}/industrial-components-carton-packaging-dispatch-santura.webp`, w: 1448, h: 1086 },
  componentsPacked: { src: `${DIR}/industrial-metal-components-packaging-santura.webp`, w: 1536, h: 1024 },
  anchorsWavy: { src: `${DIR}/industrial-refractory-anchor-santura.webp`, w: 941, h: 1672 },
  anchorsBent: { src: `${DIR}/industrial-steel-bent-anchor-rods-santura.webp`, w: 1086, h: 1448 },
  tubesStock: { src: `${DIR}/industrial-steel-tubes-bulk-warehouse-storage-santura.webp`, w: 1448, h: 1086 },
  wireCoilsStock: { src: `${DIR}/industrial-steel-wire-coils-warehouse-storage-santura.webp`, w: 1086, h: 1448 },
  dispatchTeam: { src: `${DIR}/industrial-team-safety-uniforms-shipping-dispatch-santura.webp`, w: 1109, h: 1418 },
  cratesContainer: { src: `${DIR}/industrial-wooden-crates-bulk-material-container-loading-santura.webp`, w: 1448, h: 1086 },
  workerPacking: { src: `${DIR}/industrial-worker-carton-packaging-warehouse-santura.webp`, w: 1086, h: 1448 },
  truckDispatch: { src: `${DIR}/metal-components-bulk-truck-loading-dispatch-santura.webp`, w: 1672, h: 941 },
  containerPallets: { src: `${DIR}/palletized-carton-shipment-loaded-shipping-container-santura.webp`, w: 1086, h: 1448 },
  factoryExterior: { src: `${DIR}/santura-engineering-factory-exterior-manufacturing-facility.webp`, w: 1671, h: 941 },
  xrfTesting: { src: `${DIR}/steel-alloy-composition-xrf-analyzer-quality-testing-santura.webp`, w: 1086, h: 1448 },
  workshopStock: { src: `${DIR}/steel-components-workshop-storage-santura.webp`, w: 1086, h: 1448 },
  rodCaliper: { src: `${DIR}/steel-rod-diameter-vernier-caliper-quality-inspection-santura.webp`, w: 1086, h: 1448 },
  wireXrf: { src: `${DIR}/steel-wire-alloy-quality-testing-santura.webp`, w: 1536, h: 1024 },
  wireCoilsBulk: { src: `${DIR}/steel-wire-coil-bulk-storage-industrial-warehouse-santura.webp`, w: 1672, h: 941 },
  wireCoilsInventory: { src: `${DIR}/steel-wire-coil-inventory-industrial-warehouse-santura.webp`, w: 1448, h: 1086 },
  wireCaliper: { src: `${DIR}/steel-wire-diameter-vernier-caliper-inspection-santura.webp`, w: 1086, h: 1448 },
  cratePacking: { src: `${DIR}/wooden-crate-protective-packaging-industrial-components-santura.webp`, w: 1448, h: 1086 }
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
