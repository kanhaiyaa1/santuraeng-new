import type { AppLocale } from '@/i18n/routing';

// Country landing page content — one entry per market, written for buyers in that market.
// Technical sections are English (seo-strategy.md rule 10); hero, intro and meta description
// also carry the country's primary-language version.
// Company names describe the market only — they are NOT claims that Santura supplies them.
// Transit times other than Nhava Sheva → Jubail/Dammam are AWAITING CLIENT CONFIRMATION,
// so they are shown as "Quoted per shipment".

/** Text keyed by locale. Falls back to the content language (English unless a variant says otherwise). */
export type LocalizedText = Partial<Record<AppLocale, string>>;

export type CountryContent = {
  /** Language the technical sections are written in. Defaults to English. */
  contentLang?: AppLocale;
  keywords: string[];
  metaDescription: LocalizedText;
  heroSubheading: LocalizedText;
  intro: LocalizedText;
  /** evidence: 'shipping' = our export shipping documents; 'client' = confirmed by the client. */
  verifiedClient?: { name: string; location: string; address: string; evidence: 'shipping' | 'client' };
  /** Verified supply elsewhere in the same region (e.g. CEMEX in Europe). */
  regionalReferences?: { name: string; location: string }[];
  spotlight?: {
    title: string;
    paragraphs: string[];
    table?: { head: string[]; rows: string[][] };
  };
  industries: { name: string; companies: string[]; text: string }[];
  regions: { name: string; text: string }[];
  products: { slug: string; reason: string }[];
  shipping: { routes: { destination: string; route: string; transit: string }[]; notes: string[] };
  documents: string[];
};

export type Country = CountryContent & {
  slug: string;
  code: string;
  /** Regional hreflang tags and the locale each one points to (e.g. ar-SA → /ar/saudi-arabia). */
  hreflang: { tag: string; locale: AppLocale }[];
  /** Name used inside English sentences ("for the UAE"). */
  sentenceNameEn: string;
  /** Separately written content for a locale (e.g. the Quebec page at /fr/canada). */
  variants?: Partial<Record<AppLocale, CountryContent>>;
};

const QUOTED = 'Quoted per shipment';
const PACKING = 'Export packing in seaworthy, fumigated wooden cases.';
// Client-confirmed European supply (dev-reference.md, Client References).
const EUROPE_REFS = [
  { name: 'CEMEX Croatia', location: 'Kiln overhaul supply, 2024–2026' },
  { name: 'CEMEX España', location: 'Planta de Alcanar, Spain' },
  { name: 'CEMEX Czech Republic', location: 'Cement plant maintenance and relining' }
];
const EUROPE_REFS_FR = [
  { name: 'CEMEX Croatia', location: 'Fournitures pour révision de four, 2024–2026' },
  { name: 'CEMEX España', location: 'Planta de Alcanar, Espagne' },
  { name: 'CEMEX Czech Republic', location: 'Maintenance et regarnissage de cimenterie' }
];

export const COUNTRIES: Country[] = [
  {
    slug: 'saudi-arabia',
    code: 'SA',
    hreflang: [{ tag: 'ar-SA', locale: 'ar' }],
    sentenceNameEn: 'Saudi Arabia',
    keywords: ['refractory anchors', 'refractory anchor design', 'castable anchor', 'ceramic anchors'],
    metaDescription: {
      en: 'Refractory anchors for Saudi Arabia since 1980: Aramco-specification and castable anchors made to drawing, shipped to Jubail. Exporting to 25+ countries.',
      ar: 'مراسي حرارية للمملكة العربية السعودية منذ عام 1980: مراسي وفق مواصفات أرامكو ومراسي قابلة للصب حسب الرسم، تُشحن إلى الجبيل. نصدّر إلى أكثر من 25 دولة.'
    },
    heroSubheading: {
      en: 'Castable, ceramic fibre and brick-lining anchors for refinery, petrochemical, cement and steel projects across the Kingdom — including work built to Saudi Aramco specifications — made to your project drawings in Mumbai and shipped to Jubail, Dammam and Jeddah.',
      ar: 'مراسي للبطانات القابلة للصب وبطانات الألياف الخزفية والطوب لمشاريع التكرير والبتروكيماويات والإسمنت والصلب في المملكة، بما فيها المشاريع المنفذة وفق مواصفات أرامكو السعودية، تُصنع حسب رسومات مشروعكم في مومباي وتُشحن إلى الجبيل والدمام وجدة.'
    },
    intro: {
      en: "On Saudi projects the anchor is rarely chosen from a catalogue. For Aramco and SABIC work it is defined by the EPC contractor's refractory drawings and the project material specification, and every consignment is checked against them at receiving inspection in Jubail or Yanbu. We work the same way: we manufacture to your drawing, verify the alloy grade by PMI when the raw material arrives and again at final inspection, and ship with the mill certificates and PMI reports your inspector will ask for.",
      ar: 'في المشاريع السعودية نادراً ما تُختار المرساة من كتالوج. ففي أعمال أرامكو وسابك تحددها رسومات الحراريات الصادرة عن مقاول EPC ومواصفات مواد المشروع، ويُفحص كل شحن وفقها عند الاستلام في الجبيل أو ينبع. ونحن نعمل بالطريقة نفسها: نصنّع حسب رسمكم، ونتحقق من درجة السبيكة بفحص PMI عند وصول المادة الخام ثم عند الفحص النهائي، ونشحن مع شهادات المصنع وتقارير PMI التي سيطلبها مفتشكم.'
    },
    verifiedClient: {
      name: 'Saudi Refractory Industries Co',
      location: 'Al-Khobar, Eastern Province',
      address: 'P.O. Box 30315, Al-Khobar 31952, Kingdom of Saudi Arabia',
      evidence: 'shipping'
    },
    spotlight: {
      title: 'Anchors to Saudi Aramco specifications',
      paragraphs: [
        'Refractory packages on Saudi Aramco projects are governed by Saudi Aramco Engineering Standards (SAES) and Materials System Specifications (SAMSS), with anchor details issued as standard drawings within the contractor’s refractory specification.',
        'Send us the standard drawing or anchor detail together with the applicable material requirement, and we manufacture to it — shape, dimensions, alloy grade, corrugation and weld end — with mill test certificates and PMI reports ready for third-party inspection.',
        'Sub-supplier registration on Aramco projects is handled through your EPC contractor. We provide the company registration and export documents they ask for, including our CIN, GSTIN and Importer-Exporter Code.'
      ]
    },
    industries: [
      {
        name: 'Oil refining and gas processing',
        companies: ['Saudi Aramco', 'SATORP', 'SAMREF', 'YASREF', 'Petro Rabigh'],
        text: "Aramco's refineries at Ras Tanura, Riyadh, Yanbu and Jazan and the joint-venture refineries in Jubail, Yanbu and Rabigh run fired heaters, reformers and sulphur recovery units. Heater radiant walls are commonly anchored with corrugated SS310 Y-type anchors; SRU thermal reactors call for higher alloys."
      },
      {
        name: 'Petrochemicals',
        companies: ['SABIC'],
        text: "SABIC's complexes in Jubail and Yanbu operate ethylene crackers and reformers whose fireboxes use ceramic fibre blanket and modules held by stud-welded fibre anchors and ceramic ferrules."
      },
      {
        name: 'Cement',
        companies: ['Saudi Cement', 'Yamama Cement'],
        text: 'Saudi Cement in the Eastern Province, Yamama Cement near Riyadh and producers in Yanbu, Qassim and the Southern Province run dry-process kilns with castable-lined preheaters, calciners and cooler hoods.'
      },
      {
        name: 'Steel',
        companies: ['Hadeed'],
        text: 'Hadeed (Saudi Iron and Steel Company) in Jubail combines direct reduction with electric arc steelmaking; its reheat furnaces, ladles and reformer linings all depend on anchored castable.'
      },
      {
        name: 'Power and desalination',
        companies: ['Ras Al Khair', 'Shoaiba'],
        text: 'Co-located power and water plants such as Ras Al Khair on the Gulf and Shoaiba on the Red Sea use anchored refractory in boiler casings, ducts and burner walls.'
      },
      {
        name: 'Aluminium',
        companies: ["Ma'aden"],
        text: "The Ma'aden aluminium complex at Ras Al Khair operates anode baking furnaces and casthouse furnaces with brick and castable linings."
      }
    ],
    regions: [
      { name: 'Jubail', text: 'Jubail Industrial City — SABIC complexes, the SATORP refinery and Hadeed steel — served by King Fahd Industrial Port.' },
      { name: 'Ras Al Khair', text: "Ma'aden's minerals and aluminium complex and a major power and desalination plant, north of Jubail." },
      { name: 'Dammam', text: 'King Abdulaziz Port, the main container gateway for Eastern Province deliveries.' },
      { name: 'Al-Khobar', text: 'Base for many refractory contractors in the Eastern Province, and home to our verified client Saudi Refractory Industries Co.' },
      { name: 'Riyadh', text: 'The Riyadh refinery and central-region cement plants, reached from Dammam by rail to the Riyadh dry port or by road.' },
      { name: 'Yanbu', text: 'Yanbu Industrial City on the Red Sea — Aramco, SAMREF and YASREF refineries and petrochemical plants — with King Fahd Industrial Port Yanbu.' },
      { name: 'Rabigh', text: 'The Petro Rabigh integrated refining and petrochemical complex, with King Abdullah Port nearby.' },
      { name: 'Jeddah', text: 'Jeddah Islamic Port, the main Red Sea container gateway for the western region.' }
    ],
    products: [
      { slug: 'sepl-06-split-y-anchors', reason: 'The most widely used castable anchor, suitable for stud and gun welding across heater, duct and reformer linings.' },
      { slug: 'sepl-13-corrugated-v-round-anchors', reason: 'Corrugated round anchors suited to gun welding on large heater and boiler walls.' },
      { slug: 'sepl-07-v-anchors', reason: 'Simple V-anchors for light to very dense castables; combine with steel fibres where thermal shock is expected.' },
      { slug: 'sepl-24-fiber-stud-anchors', reason: 'Stud-welded anchors for ceramic fibre linings in crackers and reformers.' },
      { slug: 'sepl-02-brick-supports-consoles', reason: 'Consoles and brick supports for brick-lined walls in SRU and aluminium furnaces.' }
    ],
    shipping: {
      routes: [
        { destination: 'Jubail · Dammam', route: 'Nhava Sheva → Arabian Gulf', transit: '7–10 days' },
        { destination: 'Jeddah · Yanbu · Rabigh', route: 'Nhava Sheva → Red Sea via Bab-el-Mandeb', transit: QUOTED },
        { destination: 'Riyadh', route: 'Sea to Dammam, then rail or road', transit: QUOTED }
      ],
      notes: [PACKING]
    },
    documents: [
      'Original mill test certificates (EN 10204 3.1) for the wire and plate used',
      'PMI certificate — alloy verified on receipt of raw material and again at final inspection',
      'Hardness and mechanical test reports; corrosion, impact, tensile and proof-load tests where your specification calls for them',
      'All tests open to witnessing by your nominated third-party inspection agency',
      'Chemical test certificate and heat treatment / solution-annealing certificate',
      'Commercial invoice, packing list and Certificate of Origin'
    ]
  },
  {
    slug: 'uae',
    code: 'AE',
    hreflang: [{ tag: 'ar-AE', locale: 'ar' }],
    sentenceNameEn: 'the UAE',
    keywords: ['refractory anchor manufacturer', 'castable anchor', 'ceramic fiber anchors'],
    metaDescription: {
      en: 'Refractory anchor manufacturer since 1980 for UAE refineries, smelters, cement and waste-to-energy plants, via Jebel Ali. Exporting to 25+ countries.',
      ar: 'مصنّع مراسي حرارية منذ عام 1980 لمصافي النفط ومصاهر الألمنيوم ومصانع الإسمنت ومحطات النفايات في الإمارات، عبر جبل علي. نصدّر إلى أكثر من 25 دولة.'
    },
    heroSubheading: {
      en: "Castable anchors and ceramic fibre anchoring systems for the Emirates' refineries, aluminium smelters, cement kilns and waste-to-energy plants — manufactured to drawing in Mumbai and shipped to Jebel Ali, Khalifa Port and Fujairah.",
      ar: 'مراسي قابلة للصب وأنظمة تثبيت بطانات الألياف الخزفية لمصافي النفط ومصاهر الألمنيوم وأفران الإسمنت ومحطات تحويل النفايات إلى طاقة في الإمارات، تُصنع حسب الرسم في مومباي وتُشحن إلى جبل علي وميناء خليفة والفجيرة.'
    },
    intro: {
      en: "Much of the UAE's refractory work happens inside tight shutdown windows — a heater turnaround at Ruwais, a furnace rebuild at an aluminium smelter, a boiler outage at a waste-to-energy plant — and the anchors have to be on site before the lining contractor mobilises. Jebel Ali is one of the most frequently served ports from Nhava Sheva, so we plan production and shipping back from your shutdown date and pack the certificates with the goods.",
      ar: 'تُنفَّذ معظم أعمال الحراريات في الإمارات ضمن فترات توقف قصيرة — صيانة فرن في الرويس، أو إعادة بناء فرن في مصهر ألمنيوم، أو توقف مرجل في محطة لتحويل النفايات إلى طاقة — ويجب أن تصل المراسي إلى الموقع قبل أن يبدأ مقاول البطانة عمله. وبما أن جبل علي من أكثر الموانئ ارتباطاً برحلات من نافا شيفا، نخطط للإنتاج والشحن انطلاقاً من موعد توقفكم ونرفق الشهادات مع البضاعة.'
    },
    spotlight: {
      title: 'Ceramic fibre anchoring for heaters and crackers',
      paragraphs: [
        'Fired heaters at Ruwais and the ethylene crackers of the Borouge complex rely on ceramic fibre linings, which have no structural strength of their own — they depend entirely on the anchor system holding them to the casing.',
        'For blanket linings we supply SEPL-24 fibre studs, stud-welded to the casing and finished with ceramic ferrule washers that break the heat path at the anchor tip. For pre-formed modules, SEPL-25 threaded studs in smooth or corrugated shaft fit pre-welded base nuts — useful in maintenance work where access to the shell is limited.',
        'Alloy choice follows hot-face temperature: SS310S/314 up to 1050 °C, 253MA up to 1100 °C and Inconel 600 up to 1150 °C.'
      ]
    },
    industries: [
      {
        name: 'Oil refining and gas processing',
        companies: ['ADNOC'],
        text: 'The Ruwais refinery — one of the largest single-site refineries in the world — together with the Abu Dhabi refinery and gas processing at Habshan and Ruwais, runs fired heaters, sulphur recovery reactors and waste-heat boilers.'
      },
      {
        name: 'Aluminium',
        companies: ['Emirates Global Aluminium (EGA)'],
        text: 'EGA operates smelters at Jebel Ali and Al Taweelah; anode baking furnace flue walls and casthouse furnaces combine brick and castable linings.'
      },
      {
        name: 'Petrochemicals',
        companies: ['Borouge'],
        text: 'The Borouge polyolefins complex in Ruwais operates ethylene crackers lined with ceramic fibre.'
      },
      {
        name: 'Cement',
        companies: ['National Cement', 'Ras Al Khaimah and Fujairah producers'],
        text: 'National Cement in Dubai and plants in Ras Al Khaimah, Fujairah and Al Ain use castable-lined preheaters, calciners and cooler hoods — demand tied closely to the construction cycle.'
      },
      {
        name: 'Steel',
        companies: ['Emirates Steel Arkan'],
        text: 'Emirates Steel Arkan in Abu Dhabi runs direct-reduction and electric arc steelmaking with reformers, reheat furnaces and ladles.'
      },
      {
        name: 'Waste-to-energy',
        companies: ['Dubai Waste Management Centre', 'Sharjah waste-to-energy plant'],
        text: 'The Warsan plant in Dubai and the Sharjah facility burn municipal waste; incinerator walls are protected by refractory tiles held on shear connectors and by anchored castable.'
      }
    ],
    regions: [
      { name: 'Jebel Ali', text: "Jebel Ali Port and the Jebel Ali Free Zone, EGA's Jebel Ali smelter and a large power and desalination complex — the main entry point for Dubai deliveries." },
      { name: 'Ruwais', text: 'ADNOC Refining and Borouge in the Al Dhafra region, about 240 km west of Abu Dhabi city.' },
      { name: 'Abu Dhabi — Khalifa Port and KEZAD', text: "Khalifa Port and the Khalifa Economic Zones, including EGA Al Taweelah, plus the Mussafah industrial area where Emirates Steel Arkan operates." },
      { name: 'Dubai Industrial City', text: 'Manufacturing district served by road from Jebel Ali Port.' },
      { name: 'Fujairah', text: "The Port of Fujairah on the Gulf of Oman — the UAE's oil storage and bunkering hub — and east-coast cement production." },
      { name: 'Ras Al Khaimah', text: 'Cement and ceramics producers in the northern emirate, served by Saqr Port.' }
    ],
    products: [
      { slug: 'sepl-24-fiber-stud-anchors', reason: 'Stud-welded studs for ceramic fibre blanket in heater and cracker fireboxes.' },
      { slug: 'sepl-25-threaded-studs', reason: 'Threaded studs for fibre modules and bolt-on maintenance repairs.' },
      { slug: 'sepl-06-split-y-anchors', reason: 'The most widely used castable anchor, suitable for stud and gun welding on heater floors, ducts and cement preheaters.' },
      { slug: 'sepl-02-brick-supports-consoles', reason: 'Brick supports and consoles for brick-lined smelter and furnace walls.' },
      { slug: 'sepl-16-shear-connectors', reason: 'Shear connectors that hold refractory tiles on incinerator pipe walls in waste-to-energy boilers.' }
    ],
    shipping: {
      routes: [
        { destination: 'Jebel Ali (Dubai)', route: 'Nhava Sheva → Arabian Gulf', transit: QUOTED },
        { destination: 'Khalifa Port (Abu Dhabi)', route: 'Nhava Sheva → Arabian Gulf', transit: QUOTED },
        { destination: 'Fujairah', route: 'Nhava Sheva → Gulf of Oman (outside the Strait of Hormuz)', transit: QUOTED }
      ],
      notes: ['For Ruwais projects we agree the discharge port and onward trucking with your freight forwarder.', PACKING]
    },
    documents: [
      'Original mill test certificates (EN 10204 3.1) for every alloy supplied',
      'PMI certificate covering incoming raw material and finished anchors',
      'Hardness and mechanical test results; corrosion, impact, tensile and proof-load tests on request',
      "Tests can be witnessed by the contractor or its inspection agency before dispatch",
      'Chemical test certificate and solution-annealing certificate',
      'Commercial invoice, packing list and Certificate of Origin for UAE customs clearance'
    ]
  },
  {
    slug: 'turkiye',
    code: 'TR',
    hreflang: [{ tag: 'tr-TR', locale: 'tr' }],
    sentenceNameEn: 'Türkiye',
    keywords: ['refractory anchors', 'refractory anchor spacing'],
    metaDescription: {
      en: "Refractory anchors since 1980 for Türkiye's cement kilns, steelworks, glass and ceramic furnaces, with spacing guidance. Exporting to 25+ countries.",
      tr: "1980'den beri Türkiye'nin çimento, çelik, cam ve seramik fırınları için refrakter ankrajlar ve ankraj aralığı rehberi. 25'ten fazla ülkeye ihracat."
    },
    heroSubheading: {
      en: "Y-, V- and moveable anchors for Europe's largest cement industry, for the İskenderun and Karabük steelworks and for Türkiye's glass, ceramic and lignite-fired power plants — made to drawing in Mumbai and shipped via Suez to Mersin, İskenderun and the Marmara ports.",
      tr: "Avrupa'nın en büyük çimento sektörü, İskenderun ve Karabük çelik tesisleri ile Türkiye'nin cam, seramik ve linyit yakıtlı santralleri için Y, V ve hareketli ankrajlar — Mumbai'de çizime göre üretilir, Süveyş üzerinden Mersin, İskenderun ve Marmara limanlarına gönderilir."
    },
    intro: {
      en: 'Turkish kiln and furnace engineers specify anchors by pattern as much as by type: spacing, orientation and staggering decide whether a calciner or cooler castable lasts its campaign. We manufacture to your anchor drawing and layout, and the spacing figures below are the starting points our own engineering guidance recommends for a dry-process cement line.',
      tr: 'Türk fırın mühendisleri ankrajı tipi kadar yerleşim düzeniyle de tanımlar: aralık, yönlendirme ve şaşırtmalı yerleşim, bir kalsinatör veya soğutucu dökme astarının kampanyasını tamamlayıp tamamlamayacağını belirler. Ankraj çiziminize ve yerleşim planınıza göre üretim yapıyoruz; aşağıdaki aralık değerleri, kuru prosesli bir çimento hattı için kendi mühendislik rehberimizin önerdiği başlangıç noktalarıdır.'
    },
    spotlight: {
      title: 'Refractory anchor spacing by kiln zone',
      paragraphs: [
        'Spacing tightens where temperature, abrasion and thermal cycling are highest. These are typical starting points for Y- and V-type anchors; confirm them against the castable supplier’s design for each zone.'
      ],
      table: {
        head: ['Zone', 'Temperature', 'Anchor', 'Alloy', 'Spacing'],
        rows: [
          ['Preheater cyclones and risers', '300–900 °C', 'Y-type', 'SS304', '400–500 mm'],
          ['Calciner', '850–1100 °C', 'Y-type', 'SS310', '300–400 mm'],
          ['Kiln transition zone', '1000–1300 °C', 'V-type round, with plastic caps', 'SS310', '250–350 mm'],
          ['Burning zone', '1350–1450 °C', 'Brick lining; anchored castable for repairs', 'Inconel 600 (repairs)', 'Per brick design'],
          ['Nose ring and discharge', '1200–1400 °C', 'Stud-welded', 'Inconel 600', '200–250 mm'],
          ['Cooler hood and walls', '200–1100 °C', 'Y- or V-type', 'SS310', '300–400 mm']
        ]
      }
    },
    industries: [
      {
        name: 'Cement',
        companies: ['OYAK Çimento', 'Akçansa', 'Limak', 'Çimsa', 'Nuh Çimento'],
        text: "Türkiye is Europe's largest cement producer. Plants across the country run preheater towers, calciners, rotary kilns and grate coolers, with relines scheduled around the winter maintenance season."
      },
      {
        name: 'Iron and steel',
        companies: ['İsdemir', 'Kardemir', 'Erdemir'],
        text: 'Blast-furnace steelmaking at İskenderun, Karabük and Ereğli, plus electric arc mills around Aliağa, Dilovası and İskenderun — reheat furnaces, ladles, tundishes and hot blast stoves.'
      },
      {
        name: 'Refining and petrochemicals',
        companies: ['TÜPRAŞ', 'STAR Refinery', 'Petkim'],
        text: 'TÜPRAŞ refineries in İzmit, Aliağa, Kırıkkale and Batman, the STAR refinery and Petkim in Aliağa operate fired heaters and reformers.'
      },
      {
        name: 'Glass',
        companies: ['Şişecam'],
        text: 'Float and container glass furnaces — regenerators, crowns and forehearths — built from brick and castable held by staples, supports and anchors.'
      },
      {
        name: 'Ceramics and tiles',
        companies: ['Bozüyük', 'Çan', 'Eskişehir tile producers'],
        text: 'Tile and sanitaryware producers run roller kilns and dryers with ceramic fibre linings that need stud-welded fibre anchors.'
      },
      {
        name: 'Thermal power and lime',
        companies: ['Afşin-Elbistan', 'Tufanbeyli'],
        text: 'Lignite-fired stations such as Afşin-Elbistan and circulating fluidised bed units like Tufanbeyli in Adana, alongside lime kilns supplying the steel and construction sectors.'
      }
    ],
    regions: [
      { name: 'Marmara — Kocaeli, Gebze, Dilovası, Bursa', text: "The TÜPRAŞ İzmit refinery, Dilovası steel mills and the country's densest cluster of cement, glass and manufacturing plants, with ports at Ambarlı, Gemlik and Kocaeli." },
      { name: 'İskenderun (Hatay)', text: 'İsdemir and electric arc steelmakers on the Gulf of İskenderun, served by the Port of İskenderun.' },
      { name: 'İzmir — Aliağa', text: 'The TÜPRAŞ İzmir and STAR refineries, Petkim and scrap-fed electric arc mills, with the Aliağa and Nemrut port terminals.' },
      { name: 'Adana and Mersin', text: "Cement plants and lignite power in Adana; the Port of Mersin is Türkiye's main Mediterranean container gateway." },
      { name: 'Antalya', text: 'Mediterranean port for southern Anatolian cement and ferroalloy producers.' },
      { name: 'Çorum', text: 'Central Anatolian brick, tile and cement kilns, reached by road from Samsun or Mersin.' }
    ],
    products: [
      { slug: 'sepl-15-moveable-anchors', reason: 'Anchors that move with the lining in rotary kilns, relieving stress during rotation.' },
      { slug: 'sepl-14-multipurpose-anchors', reason: 'Weldable multipurpose anchors that also work as moveable anchors in rotary kilns.' },
      { slug: 'sepl-10-y-anchors-flat', reason: 'Flat Y anchors, double or triple tined, for preheater and calciner castables.' },
      { slug: 'sepl-08-corrugated-bullhorn-anchors', reason: 'Corrugated bullhorn anchors for light and medium density castables in cement and ferrous plants.' },
      { slug: 'sepl-01-brick-staples', reason: 'Brick staples for insulating brick in glass furnaces and steel plant brickwork.' },
      { slug: 'sepl-27-melt-extract-needles', reason: 'Economical melt extract fibres that reinforce castables against thermal shock and flow easily through gunning hoses.' }
    ],
    shipping: {
      routes: [
        { destination: 'Mersin · İskenderun', route: 'Nhava Sheva → Suez Canal → Eastern Mediterranean', transit: QUOTED },
        { destination: 'Ambarlı · Gemlik · Kocaeli', route: 'Via Suez and the Dardanelles to the Sea of Marmara', transit: QUOTED },
        { destination: 'İzmir (Aliağa · Nemrut)', route: 'Via Suez to the Aegean coast', transit: QUOTED }
      ],
      notes: ['For inland plants in Çorum, Adana or Karabük we agree the discharge port with your forwarder for onward trucking.', PACKING]
    },
    documents: [
      'Original mill test certificates (EN 10204 3.1) showing EN designations alongside AISI grades — 1.4301 (304), 1.4845 (310S), 2.4816 (Inconel 600)',
      'PMI certificate for raw material and finished anchors',
      'Hardness and mechanical test reports; corrosion, impact, tensile and proof-load tests on request',
      'Tests open to witnessing by you or your inspection body',
      'Chemical test certificate and solution-annealing certificate',
      'Commercial invoice, packing list and Certificate of Origin for Turkish customs'
    ]
  },
  {
    slug: 'united-kingdom',
    code: 'GB',
    hreflang: [{ tag: 'en-GB', locale: 'en' }],
    sentenceNameEn: 'the United Kingdom',
    keywords: ['refractory anchors', 'ceramic anchors refractory', 'stainless steel refractory anchors', 'refractory anchor types'],
    metaDescription: {
      en: 'Stainless steel refractory anchors and shear connectors since 1980 for UK energy-from-waste, cement, steel and glass plants. Exporting to 25+ countries.'
    },
    heroSubheading: {
      en: 'Shear connectors, boiler-wall anchors and stud-welded fixings for UK energy-from-waste plants, plus stainless steel and ceramic fibre anchors for cement, steel, glass and refinery linings. Made to drawing in Mumbai and shipped to Felixstowe, London Gateway and Southampton.'
    },
    intro: {
      en: 'Energy-from-waste is one of the busiest refractory maintenance markets in the UK. Moving-grate plants run close to continuously and come off line for planned outages, when boiler-wall tiles, castable and anchors are repaired to a fixed return-to-service date. Our work for this market starts from the outage plan: we confirm the anchor or connector drawing and the alloy grade, schedule manufacture back from the shutdown date and send the mill certificates ahead of the goods so they can be reviewed before delivery.'
    },
    regionalReferences: EUROPE_REFS,
    spotlight: {
      title: 'Anchoring for energy-from-waste boilers',
      paragraphs: [
        'In a moving-grate plant the furnace and first boiler pass are lined to protect the membrane-wall tubes from erosion and from the chlorides and alkali salts carried in the flue gas. Two systems are common: refractory tiles hung on stud-welded shear connectors, and castable held by anchors welded to the tube wall.',
        'For tiled walls we make SEPL-16 shear connectors in a range of shapes and sizes, including connectors with aluminium flux for stud welding. For castable on tube walls, SEPL-18 strip corrugated anchors are designed for gun welding onto boiler pipe walls, and SEPL-23 slit studs suit Rapid Arc welding in lightweight castables.',
        'In waste-fired boilers the atmosphere matters as much as the temperature, so the alloy follows your specification. Our alloy reference lists Inconel 601 (up to 1250 °C) for incinerator service, with SS 310S and 253MA for less aggressive zones such as feed chutes and ash discharge.'
      ]
    },
    industries: [
      {
        name: 'Energy-from-waste',
        companies: ['Viridor', 'Veolia', 'enfinium', 'Cory', 'FCC Environment'],
        text: 'Moving-grate plants processing residual municipal and commercial waste, with tiled and castable-lined furnaces and first boiler passes maintained during planned outages.'
      },
      {
        name: 'Cement',
        companies: ['Heidelberg Materials UK', 'Cemex UK', 'Tarmac', 'Breedon'],
        text: 'Dry-process plants at sites such as Ketton, Rugby, Dunbar and Hope, with castable-lined preheaters, calciners, kiln hoods and cooler walls.'
      },
      {
        name: 'Iron and steel',
        companies: ['Tata Steel UK', 'British Steel', 'Celsa', 'Liberty Steel'],
        text: "Port Talbot's move to electric arc steelmaking, British Steel at Scunthorpe and the UK's electric arc mills, with reheat furnaces, ladles and tundishes."
      },
      {
        name: 'Refining',
        companies: ['EET Fuels', 'ExxonMobil', 'Valero', 'Phillips 66'],
        text: 'The Stanlow, Fawley, Pembroke and Humber refineries, whose fired heaters use castable and ceramic fibre linings.'
      },
      {
        name: 'Glass',
        companies: ['NSG Pilkington', 'Encirc', 'Guardian Glass'],
        text: 'Float and container glass furnaces, where brick staples, supports and castable anchors hold regenerator and superstructure insulation.'
      },
      {
        name: 'Biomass and industrial boilers',
        companies: ['Drax'],
        text: 'Biomass-fired and industrial boilers with refractory-lined burner zones, ducts and ash hoppers.'
      }
    ],
    regions: [
      { name: 'Teesside and the Humber', text: 'Energy-from-waste capacity, the Humber refinery and British Steel at Scunthorpe, served through Teesport and Immingham.' },
      { name: 'North West England', text: 'Stanlow refinery, the Runcorn energy-from-waste plant and the St Helens glass cluster, served through Liverpool.' },
      { name: 'South Wales', text: 'Tata Steel Port Talbot, Celsa in Cardiff and the Pembroke refinery.' },
      { name: 'Thames and London', text: 'The Riverside and Belvedere energy-from-waste plants on the Thames, with London Gateway and Tilbury nearby.' },
      { name: 'Southampton and Fawley', text: 'The Fawley refinery and petrochemical complex, next to the Port of Southampton.' },
      { name: 'Midlands and Scotland', text: 'Cement at Rugby, Ketton and Dunbar, and energy-from-waste plants across the Midlands and central Scotland.' }
    ],
    products: [
      { slug: 'sepl-16-shear-connectors', reason: 'Stud-welded connectors that carry refractory tiles on incinerator and boiler pipe walls.' },
      { slug: 'sepl-18-strip-corrugated-anchors', reason: 'Flat corrugated anchors for gun welding onto boiler pipe walls under heavy castable.' },
      { slug: 'sepl-23-slit-stud-anchors', reason: 'Low-cost slit studs for lightweight castables, suited to Rapid Arc welding.' },
      { slug: 'sepl-06-split-y-anchors', reason: 'The standard stainless steel anchor for castable in feed chutes, ducts and cement preheaters.' },
      { slug: 'sepl-24-fiber-stud-anchors', reason: 'Stud-welded anchors for ceramic fibre linings, used with ceramic ferrule washers.' },
      { slug: 'sepl-27-melt-extract-needles', reason: 'Stainless steel fibres that add thermal-shock resistance to repair castables.' }
    ],
    shipping: {
      routes: [
        { destination: 'Felixstowe', route: 'Nhava Sheva → Suez Canal → North Sea', transit: QUOTED },
        { destination: 'London Gateway', route: 'Nhava Sheva → Suez Canal → Thames Estuary', transit: QUOTED },
        { destination: 'Southampton', route: 'Nhava Sheva → Suez Canal → English Channel', transit: QUOTED }
      ],
      notes: ['For plants in the North, Wales or Scotland we agree the port and onward haulage with your forwarder.', PACKING]
    },
    documents: [
      'Original mill test certificates (EN 10204 3.1) for every grade supplied',
      'PMI certificate: alloy verified on receipt of raw material and at final inspection',
      'Hardness and mechanical test reports; corrosion, impact, tensile and proof-load tests on request',
      'Tests open to witnessing by you or your nominated inspection body',
      'Chemical test certificate and solution-annealing certificate',
      'Commercial invoice, packing list and Certificate of Origin for UK customs clearance'
    ]
  },
  {
    slug: 'canada',
    code: 'CA',
    hreflang: [
      { tag: 'en-CA', locale: 'en' },
      { tag: 'fr-CA', locale: 'fr' }
    ],
    sentenceNameEn: 'Canada',
    keywords: ['ceramic refractory anchors', 'refractory v anchors', 'stainless steel refractory anchors'],
    metaDescription: {
      en: "Stainless steel, V and ceramic refractory anchors since 1980 for Canada's aluminium smelters, pulp mills and oil sands. Exporting to 25+ countries."
    },
    heroSubheading: {
      en: "Brick supports, V- and Y-anchors and ceramic fibre anchors for Canada's aluminium smelters, pulp mills, oil sands upgraders and cement plants. Made to drawing in Mumbai and shipped to Montreal, Halifax and Vancouver."
    },
    intro: {
      en: "Canada's primary aluminium smelters sit in Quebec and at Kitimat in British Columbia, and each one runs a steady refractory programme across the pot relining shop, the anode baking furnaces and the casthouse. Buyers in these plants and in the pulp mills and upgraders around them usually work from established anchor drawings. We manufacture to those drawings in the specified stainless steel or nickel alloy, and supply the certificates your receiving inspection expects.",
    },
    spotlight: {
      title: 'Anchoring in aluminium smelters',
      paragraphs: [
        'The reduction cells themselves are lined with carbon cathode blocks, silicon carbide side blocks and insulating brick rather than anchored refractory. Anchors are used across the rest of the smelter: in anode baking furnace flue walls and headwalls, in casthouse melting and holding furnaces and their launders, and in fume and off-gas ducts.',
        'Anode baking furnaces rely on brick supports, consoles and tie-back anchors to hold insulating brick in place through repeated heating and cooling cycles. Casthouse furnaces and launders carry castable on Y- or V-anchors, with the alloy selected for the furnace atmosphere and temperature.',
        'We make brick supports and consoles to your drawing, supply tie-back anchors with a thick base for hanging insulation, and offer V- and Y-anchors in grades from SS 304 to Inconel 601.'
      ]
    },
    industries: [
      {
        name: 'Primary aluminium',
        companies: ['Rio Tinto', 'Alcoa', 'Aluminerie Alouette'],
        text: 'Smelters in Saguenay–Lac-Saint-Jean, on the Côte-Nord, at Bécancour and Deschambault, and at Kitimat, with anode baking furnaces and casthouse furnaces.'
      },
      {
        name: 'Pulp and paper',
        companies: ['Domtar', 'Canfor Pulp', 'Mercer'],
        text: 'Kraft mills operate recovery boilers and lime kilns, both of which use anchored castable in burner zones, hoods and ducts.'
      },
      {
        name: 'Oil sands and refining',
        companies: ['Suncor', 'Canadian Natural', 'Imperial', 'Irving Oil'],
        text: 'Upgraders in the Athabasca region and refineries in Edmonton, Sarnia and Saint John run fired heaters with castable and ceramic fibre linings.'
      },
      {
        name: 'Cement',
        companies: ['Lafarge Canada', 'Heidelberg Materials', 'St Marys Cement', 'McInnis Cement'],
        text: 'Plants in Ontario, Quebec, Alberta and British Columbia with castable-lined preheaters, calciners and coolers.'
      },
      {
        name: 'Steel and base metals',
        companies: ['ArcelorMittal Dofasco', 'Stelco', 'Algoma Steel', 'Vale', 'Glencore'],
        text: 'Steelmaking in Hamilton and Sault Ste. Marie, and nickel and copper smelting in Sudbury and Rouyn-Noranda.'
      }
    ],
    regions: [
      { name: 'Saguenay–Lac-Saint-Jean', text: "Canada's largest concentration of aluminium smelting, around Alma, Jonquière and La Baie." },
      { name: 'Côte-Nord', text: 'The Baie-Comeau and Sept-Îles smelters on the north shore of the St. Lawrence.' },
      { name: 'Bécancour and Deschambault', text: 'Smelters on the St. Lawrence between Montreal and Quebec City, close to the Port of Montreal.' },
      { name: 'Kitimat, British Columbia', text: 'The Kitimat smelter on the Pacific coast, reached through Prince Rupert or Vancouver.' },
      { name: 'Alberta', text: 'Oil sands upgraders near Fort McMurray and the Edmonton refining and petrochemical cluster.' },
      { name: 'Southern Ontario', text: 'Steel in Hamilton, refining and chemicals in Sarnia and cement plants around the Great Lakes.' }
    ],
    products: [
      { slug: 'sepl-02-brick-supports-consoles', reason: 'Brick supports and consoles made to drawing for anode baking furnace walls.' },
      { slug: 'sepl-05-tie-back-anchors', reason: 'Tie-back anchors with a thick base for hanging insulating brick.' },
      { slug: 'sepl-07-v-anchors', reason: 'Refractory V-anchors for casthouse furnace and launder castables.' },
      { slug: 'sepl-08-corrugated-bullhorn-anchors', reason: 'Corrugated anchors for light and medium castables in non-ferrous metal plants.' },
      { slug: 'sepl-24-fiber-stud-anchors', reason: 'Stud-welded anchors for ceramic fibre linings on furnace doors, covers and heaters.' }
    ],
    shipping: {
      routes: [
        { destination: 'Montreal', route: 'Nhava Sheva → Suez Canal → Atlantic → St. Lawrence', transit: QUOTED },
        { destination: 'Halifax', route: 'Nhava Sheva → Suez Canal → Atlantic', transit: QUOTED },
        { destination: 'Vancouver · Prince Rupert', route: 'Nhava Sheva → Pacific', transit: QUOTED }
      ],
      notes: ['For Alberta and inland Quebec sites we agree the port and onward rail or road delivery with your forwarder.', PACKING]
    },
    documents: [
      'Original mill test certificates (EN 10204 3.1) for every grade supplied',
      'PMI certificate: alloy verified on receipt of raw material and at final inspection',
      'Hardness and mechanical test reports; corrosion, impact, tensile and proof-load tests on request',
      'Tests open to witnessing by you or your nominated inspection body',
      'Chemical test certificate and solution-annealing certificate',
      'Commercial invoice, packing list and Certificate of Origin for Canadian customs clearance'
    ],
    variants: {
      fr: {
        contentLang: 'fr',
        keywords: ['ancrage réfractaire', 'ancrages réfractaires', 'ancrage réfractaire inox'],
        metaDescription: {
          fr: 'Ancrages réfractaires inox depuis 1980 pour les alumineries, papetières et cimenteries du Québec. Export vers plus de 25 pays, livraison à Montréal.'
        },
        heroSubheading: {
          fr: "Ancrages réfractaires en acier inoxydable et en alliages de nickel pour les alumineries, les papetières et les cimenteries du Québec, fabriqués selon vos plans à Mumbai et livrés au port de Montréal."
        },
        intro: {
          fr: "Les usines du Québec travaillent le plus souvent à partir de plans d'ancrage établis. Nous fabriquons selon ces plans, dans la nuance d'acier ou d'alliage indiquée, avec contrôle PMI de la matière à la réception et au contrôle final, et nous joignons les certificats d'usine à chaque expédition. Pour toute demande, écrivez-nous en français ou en anglais."
        },
        industries: [
          {
            name: 'Aluminium',
            companies: ['Rio Tinto', 'Alcoa', 'Aluminerie Alouette'],
            text: "Fours de cuisson d'anodes et fours de fonderie : consoles, supports de briques, ancrages en V et en Y."
          },
          {
            name: 'Pâtes et papiers',
            companies: ['Domtar'],
            text: "Chaudières de récupération et fours à chaux, où le béton réfractaire est tenu par des ancrages soudés."
          },
          {
            name: 'Ciment',
            companies: ['Ciment McInnis', 'Lafarge Canada'],
            text: 'Tours de préchauffage, calcinateurs et refroidisseurs garnis de béton réfractaire.'
          }
        ],
        regions: [
          { name: 'Saguenay–Lac-Saint-Jean', text: "La plus forte concentration d'alumineries au Canada, autour d'Alma, de Jonquière et de La Baie." },
          { name: 'Côte-Nord', text: 'Les alumineries de Baie-Comeau et de Sept-Îles.' },
          { name: 'Bécancour et Deschambault', text: 'Alumineries du Saint-Laurent, à proximité du port de Montréal.' },
          { name: 'Montréal et Gaspésie', text: 'Industrie lourde de la région de Montréal et cimenterie de Port-Daniel–Gascons.' }
        ],
        products: [
          { slug: 'sepl-02-brick-supports-consoles', reason: "Consoles et supports de briques fabriqués selon plan pour les fours de cuisson d'anodes." },
          { slug: 'sepl-07-v-anchors', reason: 'Ancrages en V pour les bétons réfractaires des fours de fonderie.' },
          { slug: 'sepl-06-split-y-anchors', reason: "L'ancrage le plus courant pour béton réfractaire, adapté au soudage par goujon." },
          { slug: 'sepl-24-fiber-stud-anchors', reason: 'Goujons soudés pour garnissages en fibre céramique.' }
        ],
        shipping: {
          routes: [{ destination: 'Montréal', route: 'Nhava Sheva → canal de Suez → Atlantique → Saint-Laurent', transit: 'Sur devis' }],
          notes: ['Emballage export en caisses de bois fumigées, adaptées au transport maritime.']
        },
        documents: [
          "Certificats d'usine originaux (EN 10204 3.1)",
          'Certificat PMI : nuance vérifiée à la réception de la matière et au contrôle final',
          'Essais de dureté et essais mécaniques ; essais de corrosion, de résilience, de traction et de charge sur demande',
          "Essais pouvant être suivis par votre organisme d'inspection",
          "Certificat d'analyse chimique et certificat de mise en solution",
          "Facture commerciale, liste de colisage et certificat d'origine"
        ]
      }
    }
  },
  {
    slug: 'germany',
    code: 'DE',
    hreflang: [{ tag: 'de-DE', locale: 'de' }],
    sentenceNameEn: 'Germany',
    keywords: ['refractory anchors', 'anchor for refractory', 'Feuerfestanker'],
    metaDescription: {
      en: 'Refractory anchors since 1980 in 1.4301 to 2.4851 alloys for German steel, cement and chemical plants. EN 10204 3.1 certified, exported to 25+ countries.',
      de: 'Feuerfestanker seit 1980 aus 1.4301 bis 2.4851 für Stahl-, Zement- und Chemieanlagen. Mit EN 10204 3.1 Zeugnissen, Export in über 25 Länder.'
    },
    heroSubheading: {
      en: 'Refractory anchors in austenitic stainless steels and nickel alloys, from 1.4301 to 2.4851, for German steelworks, cement plants, chemical sites and waste incineration plants. Supplied with EN 10204 3.1 certificates and shipped to Hamburg, Bremerhaven or Rotterdam.',
      de: 'Feuerfestanker aus austenitischen Edelstählen und Nickellegierungen, von 1.4301 bis 2.4851, für Stahlwerke, Zementwerke, Chemiestandorte und Müllverbrennungsanlagen in Deutschland. Geliefert mit Abnahmeprüfzeugnis 3.1 nach EN 10204 und verschifft nach Hamburg, Bremerhaven oder Rotterdam.'
    },
    intro: {
      en: 'German specifications usually define the anchor by material number, service temperature and atmosphere before shape. We work to that order: the grade is confirmed against your specification, verified by PMI when the material arrives and again at final inspection, and documented with the original 3.1 mill certificate. Anchors are solution-annealed as standard, and every test can be witnessed by your inspection body.',
      de: 'Deutsche Spezifikationen legen den Anker meist zuerst über Werkstoffnummer, Einsatztemperatur und Atmosphäre fest, erst dann über die Form. Genau so arbeiten wir: Der Werkstoff wird gegen Ihre Spezifikation geprüft, bei Wareneingang und bei der Endkontrolle per PMI verifiziert und mit dem originalen Abnahmeprüfzeugnis 3.1 dokumentiert. Die Anker sind standardmäßig lösungsgeglüht, und alle Prüfungen können von Ihrer Prüfstelle abgenommen werden.'
    },
    regionalReferences: EUROPE_REFS,
    spotlight: {
      title: 'High-temperature alloys for refractory anchors',
      paragraphs: [
        'The anchor tip sits closest to the hot face, so the alloy is chosen for the temperature and atmosphere at the tip rather than at the shell. The table lists the grades we supply most often with their material numbers and guide values for maximum service temperature in oxidising conditions.',
        'Beyond these grades we work in 1.4404 (316L), 1.4550 (347), 1.4762 (446), 800H/HT and the nickel alloys C22 and C276 on request. All anchors are solution-annealed and can be supplied hot-rolled or bright 2B.'
      ],
      table: {
        head: ['Grade', 'Material no. / UNS', 'Density g/cm³', 'Max. service temp.', 'Typical use'],
        rows: [
          ['SS 304 / 304L', '1.4301 / S30400', '7.93', '870 °C', 'Preheaters, inlet zones, coolers'],
          ['SS 309 / 309S', '1.4833 / S30900', '7.98', '980 °C', 'Furnace parts, heat exchangers'],
          ['SS 310 / 310S', '1.4845 / S31000', '7.98', '1150 °C', 'Kilns, calciners, transition zones'],
          ['SS 321', '1.4541 / S32100', '7.92', '870 °C', 'Intermittent heating, exhaust systems'],
          ['SS 330', '1.4864 / N08330', '8.08', '1150 °C', 'Carburising atmospheres'],
          ['253MA', '1.4835 / S30815', '7.80', '1150 °C', 'Cost-effective alternative to nickel alloys'],
          ['Incoloy 800 / 800H', '1.4876 / N08800', '7.94', '1100 °C', 'Reformer furnaces, petrochemical'],
          ['Inconel 600', '2.4816 / N06600', '8.47', '1175 °C', 'Burning zones, nose rings, severe service'],
          ['Inconel 601', '2.4851 / N06601', '8.11', '1250 °C', 'Highest temperatures, incinerators']
        ]
      }
    },
    industries: [
      {
        name: 'Iron and steel',
        companies: ['thyssenkrupp Steel', 'Salzgitter', 'ArcelorMittal', 'Dillinger', 'Saarstahl'],
        text: 'Integrated works in Duisburg, Salzgitter, Bremen, Eisenhüttenstadt and the Saarland, with hot blast stoves, reheat furnaces and ladles, and direct-reduction plants planned under the move to low-carbon steel.'
      },
      {
        name: 'Cement and lime',
        companies: ['Heidelberg Materials', 'Dyckerhoff', 'Holcim Deutschland', 'SCHWENK'],
        text: 'Preheater kilns with castable-lined cyclones, calciners and coolers, and lime shaft and rotary kilns supplying steel and construction.'
      },
      {
        name: 'Chemicals and refining',
        companies: ['BASF', 'MiRO', 'Bayernoil', 'PCK Schwedt', 'TotalEnergies Leuna'],
        text: 'Steam crackers and reformers at Ludwigshafen and in the central German chemical triangle, and refinery fired heaters in Karlsruhe, Bavaria, Schwedt and Leuna.'
      },
      {
        name: 'Waste incineration',
        companies: ['EEW Energy from Waste', 'MVV'],
        text: "Germany's large fleet of waste incineration plants uses tiled and castable-protected boiler walls where alloy choice is driven by chloride corrosion."
      },
      {
        name: 'Glass',
        companies: ['SCHOTT', 'Saint-Gobain', 'Wiegand-Glas'],
        text: 'Special, float and container glass furnaces with brick staples, supports and anchors in regenerators and superstructures.'
      },
      {
        name: 'Aluminium',
        companies: ['TRIMET', 'Speira'],
        text: 'Smelters and rolling operations in Hamburg, Essen, Voerde and Neuss with anode baking and casthouse furnaces.'
      }
    ],
    regions: [
      { name: 'Ruhr and Lower Rhine', text: 'Steel in Duisburg, aluminium in Essen and Voerde, and dense chemical and power infrastructure, reached from Rotterdam by barge or truck.' },
      { name: 'Rhineland', text: 'Refining and chemicals around Cologne and Wesseling, and aluminium rolling in Neuss.' },
      { name: 'Rhine-Neckar', text: 'The BASF Ludwigshafen site and the Mannheim industrial area.' },
      { name: 'Saarland', text: 'Dillinger and Saarstahl steelworks in Dillingen and Völklingen.' },
      { name: 'Lower Saxony and Bremen', text: 'Salzgitter steel and ArcelorMittal Bremen, close to the Bremerhaven container terminal.' },
      { name: 'Central Germany', text: 'The chemical triangle around Leuna, Schkopau and Böhlen, and the refinery at Schwedt.' },
      { name: 'Hamburg', text: 'TRIMET Hamburg and the Port of Hamburg, the main container gateway for northern and eastern Germany.' }
    ],
    products: [
      { slug: 'sepl-25-threaded-studs', reason: 'Our widest alloy range, including 446, 347H, 800H/HT, C22 and C276, for ceramic fibre modules.' },
      { slug: 'sepl-24-fiber-stud-anchors', reason: 'Fibre studs with a published temperature limit for each grade, from carbon steel to Inconel 600.' },
      { slug: 'sepl-06-split-y-anchors', reason: 'The standard castable anchor, suitable for stud and gun welding, in plate grades up to 601.' },
      { slug: 'sepl-13-corrugated-v-round-anchors', reason: 'Corrugated round anchors for gun welding in light, medium and dense castables.' },
      { slug: 'sepl-15-moveable-anchors', reason: 'Anchors that allow lining movement in rotary kilns.' },
      { slug: 'sepl-28-cold-drawn-needles-straight', reason: 'Cold-drawn stainless steel fibres for high-strength castable reinforcement.' }
    ],
    shipping: {
      routes: [
        { destination: 'Hamburg', route: 'Nhava Sheva → Suez Canal → North Sea', transit: QUOTED },
        { destination: 'Bremerhaven', route: 'Nhava Sheva → Suez Canal → North Sea', transit: QUOTED },
        { destination: 'Rotterdam (for the Rhine and Ruhr)', route: 'Nhava Sheva → Suez Canal → North Sea, then barge or truck', transit: QUOTED }
      ],
      notes: [PACKING]
    },
    documents: [
      'Original EN 10204 3.1 mill certificates showing material numbers (1.4301, 1.4845, 2.4816 and so on)',
      'PMI certificate: alloy verified on receipt of raw material and at final inspection',
      'Hardness and mechanical test reports; corrosion, impact, tensile and proof-load tests on request',
      'Third-party testing at NABL-accredited laboratories; all tests open to your inspection body',
      'Chemical analysis certificate and solution-annealing certificate',
      'Commercial invoice, packing list and Certificate of Origin for EU customs clearance'
    ]
  },
  {
    slug: 'spain',
    code: 'ES',
    hreflang: [{ tag: 'es-ES', locale: 'es' }],
    sentenceNameEn: 'Spain',
    keywords: ['refractory anchors', 'anclajes refractarios', 'cement kiln anchors'],
    metaDescription: {
      en: 'Refractory anchors since 1980 for Spanish cement plants, supplied to CEMEX España at Alcanar. Y, V and moveable anchors, exported to 25+ countries.',
      es: 'Anclajes refractarios desde 1980 para cementeras en España, suministrados a CEMEX en Alcanar. Anclajes en Y, V y móviles, exportados a más de 25 países.'
    },
    heroSubheading: {
      en: 'Y-, V- and moveable anchors for preheaters, calciners, kilns and coolers, made to drawing in Mumbai and supplied to CEMEX España at its Alcanar plant. Anchors for refineries, steelworks and tile kilns across Spain are also available, shipped to Valencia, Barcelona and Algeciras.',
      es: 'Anclajes en Y, en V y móviles para precalentadores, calcinadores, hornos y enfriadores, fabricados según plano en Bombay y suministrados a CEMEX España en su planta de Alcanar. También fabricamos anclajes para refinerías, acerías y hornos cerámicos en toda España, con envío a Valencia, Barcelona y Algeciras.'
    },
    intro: {
      en: 'Our reference in Spain is CEMEX España, Planta de Alcanar, on the coast of Tarragona. Supplying a cement plant means working to its maintenance calendar: anchor quantities are confirmed from the relining plan, manufactured to the plant drawing and delivered before the kiln stops. The same approach applies to every Spanish cement plant, and to the refineries, steelworks and ceramic producers that relight after planned outages.',
      es: 'Nuestra referencia en España es CEMEX España, Planta de Alcanar, en la costa de Tarragona. Suministrar a una cementera significa trabajar según su calendario de mantenimiento: las cantidades de anclajes se confirman a partir del plan de reparación, se fabrican según el plano de la planta y se entregan antes de la parada del horno. Aplicamos el mismo método en cualquier cementera española, y en las refinerías, acerías y fabricantes cerámicos que planifican sus paradas.'
    },
    verifiedClient: {
      name: 'CEMEX España',
      location: 'Planta de Alcanar',
      address: 'Planta de Alcanar, Alcanar (Tarragona), Spain',
      evidence: 'client'
    },
    regionalReferences: EUROPE_REFS.filter((r) => r.name !== 'CEMEX España'),
    spotlight: {
      title: 'Anchors for kilns burning alternative fuels',
      paragraphs: [
        'Spanish cement plants burn a growing share of alternative fuels, such as refuse-derived fuel, biomass and used tyres. These fuels bring more chlorine, sulphur and alkalis into the kiln system, where they condense in the preheater, riser duct and calciner. The result is alkali attack on castable and faster corrosion of the anchors behind it.',
        'Where alternative-fuel rates are high, plants typically move preheater and calciner anchors from SS 304 to SS 310/310S or 253MA and specify alkali-resistant castables. Tines should be kept well back from the hot face. In the kiln inlet and transition zone, V-anchors with plastic end caps let the castable expand without cracking at the anchor tip.',
        'We supply the grade your plant specifies, with the mill certificate and PMI report for every heat, so a change of alloy can be verified at goods receipt.'
      ]
    },
    industries: [
      {
        name: 'Cement',
        companies: ['CEMEX España', 'Holcim España', 'Heidelberg Materials Hispania', 'Cementos Molins', 'Cementos Portland Valderrivas'],
        text: 'Integrated plants from Catalonia and Valencia to Andalusia and the Basque Country, with castable-lined preheaters, calciners, kiln hoods and grate coolers.'
      },
      {
        name: 'Refining and petrochemicals',
        companies: ['Repsol', 'Moeve'],
        text: 'Refineries at Tarragona, Cartagena, Bilbao, A Coruña, Puertollano, Algeciras and Huelva, with the petrochemical cluster around Tarragona.'
      },
      {
        name: 'Steel and stainless steel',
        companies: ['ArcelorMittal España', 'Celsa', 'Acerinox'],
        text: 'Integrated steel in Asturias, electric arc mills in Catalonia and the Basque Country, and stainless steel at Algeciras, with reheat furnaces and ladles.'
      },
      {
        name: 'Ceramic tiles',
        companies: ['Castellón tile producers'],
        text: 'The Castellón cluster runs roller kilns and dryers with ceramic fibre linings held by stud-welded fibre anchors.'
      },
      {
        name: 'Glass and lime',
        companies: ['Verallia', 'Vidrala'],
        text: 'Container glass furnaces and lime kilns with brick staples, supports and anchored castable.'
      }
    ],
    regions: [
      { name: 'Catalonia and Tarragona', text: 'CEMEX Alcanar, the Tarragona refinery and chemical cluster, and electric arc steel near Barcelona, served by the ports of Barcelona and Tarragona.' },
      { name: 'Valencia and Castellón', text: 'Cement plants and the Castellón ceramic tile district, served by the Port of Valencia.' },
      { name: 'Andalusia', text: 'The Algeciras and Huelva refineries, Acerinox stainless steel and cement plants, served through Algeciras.' },
      { name: 'Asturias', text: 'Integrated steelmaking at Gijón and Avilés and regional cement plants.' },
      { name: 'Basque Country', text: 'The Bilbao refinery, electric arc steel and cement, served by the Port of Bilbao.' },
      { name: 'Murcia and Castilla-La Mancha', text: 'The Cartagena and Puertollano refineries and cement plants around Madrid.' }
    ],
    products: [
      { slug: 'sepl-06-split-y-anchors', reason: 'The standard preheater and calciner anchor, available in 310/310S and 253MA for alternative-fuel kilns.' },
      { slug: 'sepl-07-v-anchors', reason: 'V-anchors for the kiln inlet and transition zone, with steel fibres advised for thermal shock.' },
      { slug: 'sepl-13-corrugated-v-round-anchors', reason: 'Corrugated round anchors for gun welding across large cyclone and riser surfaces.' },
      { slug: 'sepl-15-moveable-anchors', reason: 'Anchors that move with the lining in rotary kilns during operation.' },
      { slug: 'sepl-30-cold-drawn-needles-wavy', reason: 'Wavy stainless steel fibres that add strength to cooler and burner-pipe castables.' }
    ],
    shipping: {
      routes: [
        { destination: 'Valencia', route: 'Nhava Sheva → Suez Canal → Mediterranean', transit: QUOTED },
        { destination: 'Barcelona · Tarragona', route: 'Nhava Sheva → Suez Canal → Mediterranean', transit: QUOTED },
        { destination: 'Algeciras', route: 'Nhava Sheva → Suez Canal → Mediterranean', transit: QUOTED }
      ],
      notes: ['For Asturias and the Basque Country we agree the port and onward road delivery with your forwarder.', PACKING]
    },
    documents: [
      'Original EN 10204 3.1 mill certificates for every grade supplied',
      'PMI certificate: alloy verified on receipt of raw material and at final inspection',
      'Hardness and mechanical test reports; corrosion, impact, tensile and proof-load tests on request',
      'Tests open to witnessing by the plant or its inspection body',
      'Chemical test certificate and solution-annealing certificate',
      'Commercial invoice, packing list and Certificate of Origin for EU customs clearance'
    ]
  },
  {
    slug: 'mexico',
    code: 'MX',
    hreflang: [{ tag: 'es-MX', locale: 'es' }],
    sentenceNameEn: 'Mexico',
    keywords: ['refractory anchors', 'anclajes refractarios', 'refinery heater anchors'],
    metaDescription: {
      en: 'Refractory anchor manufacturer since 1980: heater and kiln anchors for Monterrey and Tula. CEMEX supplier in Europe, exporting to 25+ countries.',
      es: 'Anclajes refractarios desde 1980 para calentadores y hornos en Monterrey y Tula. Proveedor de CEMEX en Europa, con exportación a más de 25 países.'
    },
    heroSubheading: {
      en: 'Castable and ceramic fibre anchors for refinery heaters, petrochemical furnaces, cement kilns and steelworks from Monterrey to Tula and the Gulf coast. We already supply CEMEX cement plants in Europe, and ship to Manzanillo, Altamira and Veracruz.',
      es: 'Anclajes para concreto refractario y fibra cerámica para calentadores de refinería, hornos petroquímicos, hornos de cemento y acerías, desde Monterrey hasta Tula y la costa del Golfo. Ya suministramos a plantas de CEMEX en Europa, y enviamos a Manzanillo, Altamira y Veracruz.'
    },
    intro: {
      en: 'We know CEMEX through its European operations: we supply its plants in Spain, Croatia and the Czech Republic with kiln anchors for scheduled overhauls. For Mexico we bring that same drawing-based, certificate-backed supply to two corridors. One runs from Monterrey through the Bajío to Tula, combining cement, steel, glass and refining. The other follows the Gulf coast from Altamira to Coatzacoalcos, where refineries and petrochemical complexes run fired heaters and crackers.',
      es: 'Conocemos a CEMEX por sus operaciones en Europa: suministramos anclajes para las reparaciones programadas de hornos en sus plantas de España, Croacia y República Checa. En México llevamos ese mismo suministro, basado en planos y respaldado por certificados, a dos corredores. Uno va de Monterrey al Bajío y a Tula, con cemento, acero, vidrio y refinación. El otro recorre la costa del Golfo, de Altamira a Coatzacoalcos, donde refinerías y complejos petroquímicos operan calentadores a fuego directo y hornos de pirólisis.'
    },
    regionalReferences: EUROPE_REFS,
    spotlight: {
      title: 'Anchors for refinery heater rehabilitation',
      paragraphs: [
        "Mexico's refineries at Cadereyta, Tula, Salamanca, Madero, Minatitlán and Salina Cruz have been through major rehabilitation programmes, and fired heaters are a large part of that work. A typical heater needs three anchoring systems. Radiant walls and roof carry ceramic fibre blanket or modules on stud-welded fibre anchors. The floor and lower walls carry castable on Y- or V-anchors. The convection section, ducts and stack carry lighter castable on corrugated anchors.",
        'Alloy follows zone temperature. Our reference for fibre anchors lists SS 304/304H up to 800 °C, SS 310S/314 up to 1050 °C for radiant sections and Inconel 600 up to 1150 °C for reformers and crackers. Threaded studs with pre-welded base nuts let fibre modules be replaced without re-welding the casing, which saves time during a short turnaround.',
        'For cement plants on the same corridor, we supply the same kiln anchors we make for CEMEX plants in Europe, to your plant drawings.'
      ]
    },
    industries: [
      {
        name: 'Refining',
        companies: ['Pemex'],
        text: 'The national refining system at Cadereyta, Tula, Salamanca, Ciudad Madero, Minatitlán, Salina Cruz and Dos Bocas, with fired heaters, reformers and sulphur recovery units.'
      },
      {
        name: 'Petrochemicals',
        companies: ['Pemex', 'Braskem Idesa'],
        text: 'The Coatzacoalcos complexes (Cangrejera, Morelos, Pajaritos) and the Braskem Idesa ethylene cracker, with ceramic-fibre-lined fireboxes.'
      },
      {
        name: 'Cement',
        companies: ['CEMEX', 'Holcim México', 'Cruz Azul', 'GCC', 'Cementos Fortaleza'],
        text: 'Plants in Nuevo León, Hidalgo, Puebla, Jalisco and Chihuahua, with the densest cluster around Tula and Apaxco north of Mexico City.'
      },
      {
        name: 'Steel',
        companies: ['Ternium', 'DeAcero', 'AHMSA'],
        text: 'Steelmaking in Nuevo León and Coahuila with reheat furnaces, ladles and direct-reduction reformers.'
      },
      {
        name: 'Glass',
        companies: ['Vitro'],
        text: 'Float and container glass furnaces in Monterrey and central Mexico, with brick supports and anchors in regenerators and superstructures.'
      }
    ],
    regions: [
      { name: 'Monterrey, Nuevo León', text: 'The Cadereyta refinery, CEMEX headquarters, Ternium steel and Vitro glass. Reached through the Port of Altamira or overland from US ports.' },
      { name: 'Tula, Hidalgo', text: 'The Miguel Hidalgo refinery, the Tula power plant and a dense cement cluster reaching into Apaxco in the State of Mexico.' },
      { name: 'Bajío (Guanajuato)', text: 'The Salamanca refinery and industrial parks along the Querétaro–León corridor.' },
      { name: 'Tamaulipas coast', text: 'The Ciudad Madero refinery and the Port of Altamira, a common entry point for the Monterrey corridor.' },
      { name: 'Veracruz and Coatzacoalcos', text: 'The Minatitlán refinery and the Coatzacoalcos petrochemical complexes, served by the ports of Veracruz and Coatzacoalcos.' },
      { name: 'Oaxaca and Tabasco', text: 'The Salina Cruz refinery on the Pacific and the Dos Bocas refinery on the Gulf.' }
    ],
    products: [
      { slug: 'sepl-24-fiber-stud-anchors', reason: 'Stud-welded anchors for ceramic fibre blanket on heater radiant walls and roofs.' },
      { slug: 'sepl-25-threaded-studs', reason: 'Bolt-on studs for fibre modules that can be replaced without re-welding.' },
      { slug: 'sepl-06-split-y-anchors', reason: 'The standard castable anchor for heater floors and cement preheaters.' },
      { slug: 'sepl-09-corrugated-h-anchors', reason: 'Hand-welded anchors for light to dense castables in ducts and convection sections.' },
      { slug: 'sepl-15-moveable-anchors', reason: 'Moveable anchors for rotary cement kilns.' }
    ],
    shipping: {
      routes: [
        { destination: 'Manzanillo', route: 'Nhava Sheva → Pacific (transhipment in East Asia)', transit: QUOTED },
        { destination: 'Altamira', route: 'Nhava Sheva → Suez Canal → Atlantic → Gulf of Mexico', transit: QUOTED },
        { destination: 'Veracruz', route: 'Nhava Sheva → Suez Canal → Atlantic → Gulf of Mexico', transit: QUOTED }
      ],
      notes: ['The best port depends on the plant: Altamira for Monterrey and the Gulf, Manzanillo for the Bajío and western Mexico.', PACKING]
    },
    documents: [
      'Original EN 10204 3.1 mill certificates for every grade supplied',
      'PMI certificate: alloy verified on receipt of raw material and at final inspection',
      'Hardness and mechanical test reports; corrosion, impact, tensile and proof-load tests on request',
      'Tests open to witnessing by your nominated inspection body',
      'Chemical test certificate and solution-annealing certificate',
      'Commercial invoice, packing list and Certificate of Origin for Mexican customs'
    ]
  },
  {
    slug: 'brazil',
    code: 'BR',
    hreflang: [{ tag: 'pt-BR', locale: 'pt-BR' }],
    sentenceNameEn: 'Brazil',
    keywords: ['refractory anchors', 'ancoragem refratária', 'pelletizing plant refractory'],
    metaDescription: {
      en: "Refractory anchors since 1980 for Brazil's pelletizing plants, alumina refineries, steelworks and pulp mills. Exporting to 25+ countries.",
      'pt-BR': 'Ancoragens refratárias desde 1980 para pelotização, alumina, siderurgia e celulose no Brasil. Envio a Vitória e Santos, exportação para mais de 25 países.'
    },
    heroSubheading: {
      en: "Anchors for the induration furnaces of Brazil's pelletizing plants, for alumina calciners, ferroalloy and nickel kilns, and for the steelworks and pulp mills around them. Made to drawing in Mumbai and shipped to Vitória, Santos, Itaguaí and São Luís.",
      'pt-BR': 'Ancoragens para os fornos de endurecimento das usinas de pelotização do Brasil, calcinadores de alumina, fornos de ferroligas e níquel, e para as siderúrgicas e fábricas de celulose ao redor. Fabricadas conforme desenho em Mumbai e enviadas a Vitória, Santos, Itaguaí e São Luís.'
    },
    intro: {
      en: "Brazil's mineral processing plants treat refractory as a wear part. Pellet induration machines, alumina calciners and rotary kilns combine high temperature with abrasive dust and constant thermal cycling, so linings are patched and replaced on a fixed maintenance cycle and anchors are ordered in volume. We supply to the plant's drawing and specified grade, and hold to the delivery date the shutdown depends on.",
      'pt-BR': 'As usinas de beneficiamento mineral do Brasil tratam o refratário como peça de desgaste. Fornos de pelotização, calcinadores de alumina e fornos rotativos combinam alta temperatura, poeira abrasiva e ciclos térmicos constantes, por isso os revestimentos são reparados e substituídos em ciclos fixos de manutenção e as ancoragens são compradas em volume. Fornecemos conforme o desenho e a liga especificados pela usina, e cumprimos a data de entrega da qual a parada depende.'
    },
    spotlight: {
      title: 'Anchoring for pelletizing and mineral processing',
      paragraphs: [
        "In a straight-grate pelletizing plant, the induration furnace hood, burner hoods, downcomers and recuperation ducts are lined with dense castable that is exposed to hot, pellet-laden gas. The anchor system has two jobs: to hold a heavy lining overhead, and to keep that lining together as it abrades and cracks. Close anchor spacing, dense corrugated anchors and stainless steel fibre reinforcement in the castable are the usual response.",
        'Alumina calciners, nickel and ferroalloy kilns and lime kilns add rotary and fluidised-bed equipment. In rotary kilns, moveable anchors let the lining shift with the shell. In cyclones and transfer ducts, gun-welded Y- and V-anchors let large areas be relined quickly within the shutdown window.',
        'We make anchors in grades from carbon steel for cold-face work to SS 310/310S and 253MA for hood and burner zones, and supply melt extract and cold-drawn fibres for the castable itself.'
      ]
    },
    industries: [
      {
        name: 'Iron ore pelletizing',
        companies: ['Vale', 'Samarco'],
        text: 'Pelletizing plants at Tubarão in Vitória, Ubu in Espírito Santo and in Minas Gerais, with straight-grate induration furnaces lined with dense anchored castable.'
      },
      {
        name: 'Alumina and aluminium',
        companies: ['Hydro Alunorte', 'Alumar'],
        text: 'Alumina refineries at Barcarena and São Luís with calciners and cyclones, plus smelters with anode baking and casthouse furnaces.'
      },
      {
        name: 'Steel',
        companies: ['Gerdau', 'Usiminas', 'ArcelorMittal Brasil', 'CSN', 'Ternium Brasil'],
        text: 'Integrated and electric arc steelmaking in Minas Gerais, Rio de Janeiro, Espírito Santo and São Paulo, with hot blast stoves, reheat furnaces and ladles.'
      },
      {
        name: 'Nickel, ferroalloys and lime',
        companies: ['Ferroalloy and nickel producers', 'Lime producers'],
        text: 'Rotary kilns and electric furnaces in Goiás, Minas Gerais and Bahia, and lime kilns supplying steel and pulp.'
      },
      {
        name: 'Pulp and paper',
        companies: ['Suzano', 'Klabin', 'Eldorado Brasil'],
        text: 'Large kraft pulp mills with recovery boilers and lime kilns that use anchored castable.'
      },
      {
        name: 'Cement',
        companies: ['Votorantim Cimentos', 'InterCement', 'CSN Cimentos'],
        text: 'Plants across the South-East and North-East with castable-lined preheaters, calciners and coolers.'
      }
    ],
    regions: [
      { name: 'Espírito Santo', text: 'The Tubarão pelletizing complex and ArcelorMittal steel in Vitória, and Samarco at Ubu, served by the Port of Vitória.' },
      { name: 'Minas Gerais', text: 'The Iron Quadrangle mines and pellet plants, steelworks at Ipatinga and Ouro Branco, ferroalloys and pulp.' },
      { name: 'Pará', text: 'Carajás iron ore, and alumina and aluminium at Barcarena, served by Vila do Conde.' },
      { name: 'Maranhão', text: 'The Alumar alumina refinery and smelter at São Luís, and the Itaqui and Ponta da Madeira ports.' },
      { name: 'Rio de Janeiro', text: 'CSN at Volta Redonda and Ternium at Santa Cruz, served by Itaguaí and Rio de Janeiro.' },
      { name: 'São Paulo', text: 'Cement, steel and industrial manufacturing, served by the Port of Santos.' }
    ],
    products: [
      { slug: 'sepl-09-corrugated-h-anchors', reason: 'Hand-welded corrugated anchors for dense castable in induration hoods and ducts.' },
      { slug: 'sepl-06-split-y-anchors', reason: 'Y-anchors for stud and gun welding across large cyclone and duct areas.' },
      { slug: 'sepl-13-corrugated-v-round-anchors', reason: 'Corrugated round anchors for light, medium and heavy castables.' },
      { slug: 'sepl-15-moveable-anchors', reason: 'Moveable anchors for rotary kilns in nickel, ferroalloy and lime service.' },
      { slug: 'sepl-02-brick-supports-consoles', reason: 'Brick supports and consoles made to drawing for brick-lined kilns and furnaces.' },
      { slug: 'sepl-27-melt-extract-needles', reason: 'Stainless steel fibres that improve abrasion and thermal-shock resistance in dense castables.' }
    ],
    shipping: {
      routes: [
        { destination: 'Vitória', route: 'Nhava Sheva → Cape of Good Hope → South Atlantic', transit: QUOTED },
        { destination: 'Santos', route: 'Nhava Sheva → Cape of Good Hope → South Atlantic', transit: QUOTED },
        { destination: 'Itaguaí · Rio de Janeiro', route: 'Nhava Sheva → Cape of Good Hope → South Atlantic', transit: QUOTED },
        { destination: 'São Luís · Vila do Conde', route: 'Nhava Sheva → Atlantic → North Brazil', transit: QUOTED }
      ],
      notes: ['For inland sites in Minas Gerais and Goiás we agree the port and onward delivery with your forwarder.', PACKING]
    },
    documents: [
      'Original EN 10204 3.1 mill certificates for every grade supplied',
      'PMI certificate: alloy verified on receipt of raw material and at final inspection',
      'Hardness and mechanical test reports; corrosion, impact, tensile and proof-load tests on request',
      'Tests open to witnessing by your nominated inspection body',
      'Chemical test certificate and solution-annealing certificate',
      'Commercial invoice, packing list and Certificate of Origin for Brazilian customs'
    ]
  },
  {
    slug: 'italy',
    code: 'IT',
    hreflang: [{ tag: 'it-IT', locale: 'it' }],
    sentenceNameEn: 'Italy',
    keywords: ['refractory anchors', 'ancoraggi refrattari', 'ceramic fiber anchors'],
    metaDescription: {
      en: "Refractory anchors since 1980 for Italy's electric arc steelworks and ceramic roller kilns: fibre studs and castable anchors, exported to 25+ countries.",
      it: 'Ancoraggi refrattari dal 1980 per acciaierie a forno elettrico e forni a rulli ceramici in Italia: prigionieri per fibra, export in oltre 25 paesi.'
    },
    heroSubheading: {
      en: "Castable anchors for Italy's electric arc steelworks, and fibre studs and threaded studs for the ceramic roller kilns of Sassuolo and beyond. Made to drawing in Mumbai with EN 10204 3.1 certificates, and shipped to Genoa, La Spezia, Ravenna and Venice.",
      it: "Ancoraggi per calcestruzzo refrattario per le acciaierie a forno elettrico italiane, e prigionieri per fibra e perni filettati per i forni a rulli del distretto ceramico di Sassuolo e non solo. Prodotti su disegno a Mumbai con certificati EN 10204 3.1 e spediti a Genova, La Spezia, Ravenna e Venezia."
    },
    intro: {
      en: "Italy's two largest users of refractory anchors work in very different ways. The steel industry, most of it electric arc, lines reheat furnaces, ladle preheaters and ducts with dense castable and relines on campaign schedules. The ceramic industry lines its roller kilns with ceramic fibre, where the anchor is a stud with a washer or ferrule. We supply both: castable anchors to the steelworks drawing, and fibre anchoring systems sized to the lining thickness of each kiln.",
      it: "In Italia i due maggiori utilizzatori di ancoraggi refrattari lavorano in modo molto diverso. La siderurgia, in gran parte a forno elettrico, riveste forni di riscaldo, preriscaldatori di siviere e condotti con calcestruzzo denso e rifà i rivestimenti secondo le campagne. L'industria ceramica riveste i forni a rulli con fibra ceramica, dove l'ancoraggio è un prigioniero con rondella o ferrula. Forniamo entrambi: ancoraggi per calcestruzzo su disegno dell'acciaieria e sistemi di fissaggio per fibra dimensionati sullo spessore del rivestimento di ogni forno."
    },
    regionalReferences: EUROPE_REFS,
    spotlight: {
      title: 'Anchors for steelworks and ceramic roller kilns',
      paragraphs: [
        'Electric arc steelworks: walking-beam and pusher reheat furnaces use dense castable on Y- and V-anchors in the walls and roof, with heavier corrugated anchors in the hearth and skid zones. Ladle preheaters and off-gas ducts take repeated thermal shock, so steel fibre reinforcement in the castable is standard practice.',
        "Ceramic roller kilns: the firing zones of tile and sanitaryware kilns are lined with ceramic fibre blanket or modules. SEPL-24 fibre studs are stud-welded to the casing and locked with a washer or ceramic ferrule at the hot face, in grades from SS 304 up to Inconel 600 depending on the zone temperature. SEPL-25 threaded studs with pre-welded base nuts suit module linings and let damaged sections be replaced quickly between production runs.",
        'Backup and insulating layers in both industries can be fixed with dual pin anchors or V-anchors welded to a nut, which screw onto the backup lining.'
      ]
    },
    industries: [
      {
        name: 'Steel',
        companies: ['Arvedi', 'Feralpi', 'Pittini', 'Duferco', 'Acciaierie d’Italia'],
        text: 'Electric arc steelworks in Lombardy, Veneto and Friuli, stainless steel at Terni and integrated steel at Taranto, with reheat furnaces, ladles and preheaters.'
      },
      {
        name: 'Ceramic tiles and sanitaryware',
        companies: ['Marazzi', 'Florim', 'Atlas Concorde', 'Iris Ceramica Group'],
        text: "The Sassuolo district in Emilia-Romagna, Europe's main tile-making cluster, runs roller kilns and dryers lined with ceramic fibre."
      },
      {
        name: 'Kiln and furnace builders',
        companies: ['SACMI', 'System Ceramics'],
        text: 'Italian kiln builders design and supply roller kilns and furnaces worldwide, using fibre anchoring systems in new builds and rebuilds.'
      },
      {
        name: 'Cement',
        companies: ['Buzzi', 'Heidelberg Materials Italia', 'Colacem'],
        text: 'Preheater kilns across the country with castable-lined cyclones, calciners and coolers.'
      },
      {
        name: 'Refining',
        companies: ['Eni', 'Sarlux', 'ISAB', 'API'],
        text: 'Refineries at Sannazzaro, Sarroch, Priolo and Falconara with fired heaters and reformers.'
      },
      {
        name: 'Glass',
        companies: ['Zignago Vetro', 'Vetropack Italia', 'Bormioli Luigi'],
        text: 'Container and tableware glass furnaces with brick staples, supports and anchors.'
      }
    ],
    regions: [
      { name: 'Lombardy', text: 'The Brescia and Bergamo electric arc steel cluster and Arvedi at Cremona, served through Genoa or La Spezia.' },
      { name: 'Emilia-Romagna', text: 'The Sassuolo and Fiorano ceramic district and kiln builders around Imola, served by the Port of Ravenna.' },
      { name: 'Veneto and Friuli', text: 'Electric arc steel and glass around Vicenza, Udine and Osoppo, served by Venice and Trieste.' },
      { name: 'Umbria', text: 'Stainless steel at Terni and cement in central Italy.' },
      { name: 'Puglia', text: 'The Taranto integrated steelworks and its port.' },
      { name: 'Sicily and Sardinia', text: 'The Priolo and Sarroch refineries.' }
    ],
    products: [
      { slug: 'sepl-24-fiber-stud-anchors', reason: 'Stud-welded fibre anchors for roller-kiln blanket linings, graded by zone temperature.' },
      { slug: 'sepl-25-threaded-studs', reason: 'Bolt-on studs for fibre modules, replaceable between production runs.' },
      { slug: 'sepl-06-split-y-anchors', reason: 'Castable anchors for reheat furnace walls, roofs and ducts.' },
      { slug: 'sepl-20-dual-pin-anchors', reason: 'Low-cost anchors for backup layers, hand-welded, bolted or stud-welded.' },
      { slug: 'sepl-21-v-anchor-with-nut', reason: 'V-anchors welded to a nut that screw onto a concrete backup lining.' },
      { slug: 'sepl-29-cold-drawn-needles-hooked', reason: 'Hooked steel fibres for tough, low-cost castable reinforcement in ladle preheaters.' }
    ],
    shipping: {
      routes: [
        { destination: 'Genoa · La Spezia', route: 'Nhava Sheva → Suez Canal → Mediterranean', transit: QUOTED },
        { destination: 'Ravenna · Venice · Trieste', route: 'Nhava Sheva → Suez Canal → Adriatic', transit: QUOTED },
        { destination: 'Taranto', route: 'Nhava Sheva → Suez Canal → Ionian Sea', transit: QUOTED }
      ],
      notes: [PACKING]
    },
    documents: [
      'Original EN 10204 3.1 mill certificates for every grade supplied',
      'PMI certificate: alloy verified on receipt of raw material and at final inspection',
      'Hardness and mechanical test reports; corrosion, impact, tensile and proof-load tests on request',
      'Tests open to witnessing by you or your inspection body',
      'Chemical test certificate and solution-annealing certificate',
      'Commercial invoice, packing list and Certificate of Origin for EU customs clearance'
    ]
  },
  {
    slug: 'france',
    code: 'FR',
    hreflang: [{ tag: 'fr-FR', locale: 'fr' }],
    sentenceNameEn: 'France',
    keywords: ['refractory anchors', 'ancrage réfractaire', 'incinerator refractory anchors'],
    metaDescription: {
      en: "Refractory anchors since 1980 for France's energy-from-waste plants and nuclear-sector incinerators, with full traceability. Exporting to 25+ countries.",
      fr: 'Ancrages réfractaires depuis 1980 pour la valorisation énergétique, les incinérateurs du secteur nucléaire et les cimenteries. Export vers plus de 25 pays.'
    },
    heroSubheading: {
      en: 'Anchors and shear connectors for the furnaces and post-combustion chambers of French energy-from-waste plants, and for incineration and melting furnaces in the nuclear waste sector. Every heat is traceable from mill certificate to PMI report. Shipped to Le Havre, Fos-Marseille and Dunkirk.',
      fr: "Ancrages et connecteurs pour les fours et chambres de post-combustion des unités de valorisation énergétique françaises, et pour les fours d'incinération et de fusion du secteur des déchets nucléaires. Chaque coulée est traçable du certificat matière au rapport PMI. Expédition vers Le Havre, Fos-Marseille et Dunkerque."
    },
    intro: {
      en: "France runs one of Europe's largest fleets of energy-from-waste plants (unités de valorisation énergétique). Many of the older lines are being modernised, and their furnace walls, roofs and post-combustion chambers relined. Nuclear-sector operators also incinerate and melt low-level waste in refractory-lined furnaces, and expect every component to be traceable. Our certificate trail was built for that level of scrutiny: the original mill certificate, a PMI check on receipt and at final inspection, and test records that your inspector can witness.",
      fr: "La France exploite l'un des plus grands parcs d'unités de valorisation énergétique d'Europe. Beaucoup de lignes anciennes sont en cours de modernisation, et leurs parois de four, voûtes et chambres de post-combustion sont regarnies. Les exploitants du secteur nucléaire incinèrent et fondent aussi des déchets de faible activité dans des fours à garnissage réfractaire, et exigent une traçabilité complète de chaque composant. Notre chaîne documentaire répond à ce niveau d'exigence : certificat matière d'origine, contrôle PMI à la réception et au contrôle final, et essais pouvant être suivis par votre inspecteur."
    },
    regionalReferences: EUROPE_REFS,
    spotlight: {
      title: 'Energy-from-waste and nuclear-sector incineration',
      paragraphs: [
        'EU rules require flue gas from waste incineration to be held at 850 °C or more for at least two seconds after the last air injection. That is why the post-combustion chamber above the grate is a large refractory-lined volume, and why it must stay intact for the plant to run within its permit. Its walls and roof are usually castable on stainless steel anchors. The boiler walls below and beside it are protected with tiles on shear connectors or with castable on studs welded to the tubes.',
        'Anchors for the post-combustion chamber and furnace roof are typically SS 310/310S or 253MA Y- and V-anchors. For tube-wall protection we make shear connectors, strip corrugated anchors for gun welding and slit studs for Rapid Arc welding. Inconel 601, which our alloy reference lists up to 1250 °C for incinerator service, is available where chlorides are aggressive.',
        'For incineration and melting furnaces in the nuclear waste sector, we supply anchors to the operator’s drawing and grade with full heat traceability. Components for nuclear-island safety equipment are outside our scope, and we do not claim nuclear-code qualification.'
      ]
    },
    industries: [
      {
        name: 'Energy-from-waste',
        companies: ['Suez', 'Veolia', 'Paprec', 'Urbaser', 'Syctom'],
        text: 'More than a hundred energy-from-waste plants, from large urban sites around Paris, Lyon and Marseille to regional lines, with grate furnaces, post-combustion chambers and tiled boiler walls.'
      },
      {
        name: 'Nuclear waste treatment and fuel cycle',
        companies: ['Orano', 'Cyclife (EDF group)'],
        text: 'Incineration and melting of low-level waste at Marcoule and fuel-cycle operations at La Hague, with refractory-lined furnaces and strict traceability requirements.'
      },
      {
        name: 'Cement and lime',
        companies: ['Vicat', 'Holcim France', 'Heidelberg Materials France', 'Eqiom'],
        text: 'Preheater kilns across the country with castable-lined cyclones, calciners and coolers, and many plants co-processing waste-derived fuels.'
      },
      {
        name: 'Steel and aluminium',
        companies: ['ArcelorMittal France', 'Aluminium Dunkerque', 'Trimet France'],
        text: 'Integrated steel at Dunkirk and Fos-sur-Mer and aluminium smelting at Dunkirk and in the Alps, with reheat furnaces, ladles and casthouse furnaces.'
      },
      {
        name: 'Refining and petrochemicals',
        companies: ['TotalEnergies', 'Petroineos'],
        text: 'Refineries and crackers in Normandy, on the Loire estuary, near Lyon and around the Étang de Berre, with fired heaters and ceramic-fibre-lined fireboxes.'
      },
      {
        name: 'Glass',
        companies: ['Saint-Gobain', 'Verallia', 'Arc'],
        text: 'Flat, container and tableware glass furnaces with brick staples, supports and anchored castable.'
      }
    ],
    regions: [
      { name: 'Île-de-France', text: 'Large urban energy-from-waste plants serving Paris, reached from Le Havre along the Seine corridor.' },
      { name: 'Normandy', text: 'The Gonfreville refinery and petrochemical complex near Le Havre, and the La Hague site in the Cotentin.' },
      { name: 'Hauts-de-France', text: 'ArcelorMittal and Aluminium Dunkerque, served by the Port of Dunkirk.' },
      { name: 'Auvergne-Rhône-Alpes', text: 'The chemical valley south of Lyon, the Feyzin refinery, cement plants and Alpine aluminium.' },
      { name: 'Provence (Fos and Berre)', text: 'Steel at Fos-sur-Mer and refining and petrochemicals around Lavéra and the Étang de Berre, served by Fos-Marseille.' },
      { name: 'Occitanie', text: 'The Marcoule nuclear site on the Rhône and regional cement and energy-from-waste plants.' }
    ],
    products: [
      { slug: 'sepl-06-split-y-anchors', reason: 'Y-anchors in 310/310S and 253MA for post-combustion chamber walls and furnace roofs.' },
      { slug: 'sepl-16-shear-connectors', reason: 'Stud-welded connectors that carry refractory tiles on incinerator pipe walls.' },
      { slug: 'sepl-18-strip-corrugated-anchors', reason: 'Strip anchors for gun welding onto boiler pipe walls under heavy castable.' },
      { slug: 'sepl-23-slit-stud-anchors', reason: 'Slit studs for lightweight castables, suited to Rapid Arc welding.' },
      { slug: 'sepl-07-v-anchors', reason: 'V-anchors for furnace side walls, with steel fibres advised for thermal shock.' },
      { slug: 'sepl-28-cold-drawn-needles-straight', reason: 'Cold-drawn stainless steel fibres that strengthen repair castables.' }
    ],
    shipping: {
      routes: [
        { destination: 'Fos-Marseille', route: 'Nhava Sheva → Suez Canal → Mediterranean', transit: QUOTED },
        { destination: 'Le Havre', route: 'Nhava Sheva → Suez Canal → English Channel', transit: QUOTED },
        { destination: 'Dunkirk', route: 'Nhava Sheva → Suez Canal → North Sea', transit: QUOTED }
      ],
      notes: ['For inland plants we agree the port and onward road or river delivery with your forwarder.', PACKING]
    },
    documents: [
      'Original EN 10204 3.1 mill certificates, traceable to each heat supplied',
      'PMI certificate: alloy verified on receipt of raw material and at final inspection',
      'Hardness and mechanical test reports; corrosion, impact, tensile and proof-load tests on request',
      'Tests open to witnessing by the operator or its inspection body',
      'Chemical test certificate and solution-annealing certificate',
      'Commercial invoice, packing list and Certificate of Origin for EU customs clearance'
    ]
  },
  {
    slug: 'netherlands',
    code: 'NL',
    hreflang: [{ tag: 'nl-NL', locale: 'nl' }],
    sentenceNameEn: 'the Netherlands',
    keywords: ['refractory anchors', 'refractory anchor supplier', 'vuurvaste ankers'],
    metaDescription: {
      en: 'A second source of refractory anchors for Dutch contractors and plants since 1980: drop-in equivalents to your drawings, exported to 25+ countries.',
      nl: 'Een tweede leverancier van vuurvaste ankers sinds 1980: gelijkwaardige ankers op uw tekening voor Nederlandse aannemers. Export naar meer dan 25 landen.'
    },
    heroSubheading: {
      en: 'An alternative source of refractory anchors for Dutch refractory contractors, refineries, chemical plants and steelworks. We make like-for-like equivalents of the anchors you already specify, from your drawings, in the same grades and with EN 10204 3.1 certificates. Shipped to Rotterdam.',
      nl: 'Een alternatieve bron van vuurvaste ankers voor Nederlandse vuurvaste aannemers, raffinaderijen, chemische fabrieken en staalbedrijven. Wij maken gelijkwaardige versies van de ankers die u al voorschrijft, op basis van uw tekeningen, in dezelfde legeringen en met EN 10204 3.1 certificaten. Verscheept naar Rotterdam.'
    },
    intro: {
      en: 'Most Dutch buyers already have an anchor supplier. They come to us for a second one: to add capacity before a large turnaround, to have a fallback when lead times stretch, or to compare price on high-volume anchor types. Because the anchor is already specified, there is nothing to redesign. Send the drawing or the item details, and we manufacture the same shape, dimensions and grade, with the certificates your quality department already expects.',
      nl: 'De meeste Nederlandse inkopers hebben al een ankerleverancier. Zij komen bij ons voor een tweede: om capaciteit toe te voegen vóór een grote stop, om terug te kunnen vallen als levertijden oplopen, of om prijzen te vergelijken voor ankertypen die in grote aantallen worden gebruikt. Omdat het anker al is gespecificeerd, hoeft er niets opnieuw ontworpen te worden. Stuur de tekening of de artikelgegevens, en wij maken dezelfde vorm, afmetingen en legering, met de certificaten die uw kwaliteitsafdeling al verwacht.'
    },
    regionalReferences: EUROPE_REFS,
    spotlight: {
      title: 'A drop-in second source for your anchor specifications',
      paragraphs: [
        'Matching an existing anchor comes down to five points: shape, overall dimensions, material section, surface finish (corrugated or smooth) and the weld end or fixing method. Your drawing defines all five. If you only have a sample or an old catalogue reference, we prepare a drawing for your approval before manufacture.',
        'The grade is matched exactly and proven, not assumed. Each consignment carries the original EN 10204 3.1 mill certificate and a PMI report taken on receipt of raw material and again at final inspection. Anchors are solution-annealed as standard, finished hot-rolled or bright 2B to suit your specification.',
        'A practical way to start is a trial order on one high-volume anchor type, such as a Y-anchor, V-anchor or fibre stud, before a turnaround. That lets your site team compare fit and weld behaviour with the anchors they already use.'
      ]
    },
    industries: [
      {
        name: 'Refractory contractors',
        companies: ['Dutch refractory installers and maintenance contractors'],
        text: 'Contractors installing and maintaining linings across the Rotterdam, Zeeland and Chemelot clusters, who buy anchors in volume for turnarounds.'
      },
      {
        name: 'Refining',
        companies: ['Shell', 'ExxonMobil', 'BP'],
        text: 'The Pernis, Botlek and Europoort refineries in the Port of Rotterdam, with fired heaters, reformers and sulphur recovery units.'
      },
      {
        name: 'Chemicals',
        companies: ['Dow', 'Chemelot site companies', 'Shell Moerdijk'],
        text: 'Crackers and chemical plants at Terneuzen, Geleen and Moerdijk, with ceramic-fibre-lined fireboxes and castable-lined ducts.'
      },
      {
        name: 'Steel',
        companies: ['Tata Steel Nederland'],
        text: 'Integrated steelmaking at IJmuiden, with hot blast stoves, reheat furnaces and ladles.'
      },
      {
        name: 'Waste-to-energy',
        companies: ['AEB Amsterdam', 'AVR', 'HVC', 'Twence'],
        text: 'Waste-to-energy plants in Amsterdam, Rozenburg, Duiven, Alkmaar and Hengelo with tiled and castable-protected boiler walls.'
      }
    ],
    regions: [
      { name: 'Port of Rotterdam', text: 'Refining and chemicals at Pernis, Botlek, Europoort and Maasvlakte, with direct delivery from the container terminals.' },
      { name: 'Zeeland and Moerdijk', text: 'Dow Terneuzen and the Moerdijk chemical site, served from Rotterdam or Antwerp.' },
      { name: 'Chemelot (Limburg)', text: 'The Geleen chemical park, reached from Rotterdam by barge or truck.' },
      { name: 'IJmuiden and Amsterdam', text: 'Tata Steel IJmuiden and waste-to-energy plants around Amsterdam, served through the North Sea Canal ports.' },
      { name: 'East Netherlands', text: 'Waste-to-energy and industrial boilers around Duiven and Hengelo.' }
    ],
    products: [
      { slug: 'sepl-06-split-y-anchors', reason: 'The most widely used castable anchor and a common first trial item.' },
      { slug: 'sepl-07-v-anchors', reason: 'Standard V-anchors in wire grades from carbon steel to 601.' },
      { slug: 'sepl-13-corrugated-v-round-anchors', reason: 'Corrugated round anchors for gun welding on large heater and boiler walls.' },
      { slug: 'sepl-24-fiber-stud-anchors', reason: 'Fibre studs for ceramic fibre linings, with a published temperature limit per grade.' },
      { slug: 'sepl-25-threaded-studs', reason: 'Threaded studs in the widest alloy range, from 304 to C276.' },
      { slug: 'washers', reason: 'Round and square washers, threaded rings and mounting clips to match your existing fixings.' }
    ],
    shipping: {
      routes: [
        { destination: 'Rotterdam', route: 'Nhava Sheva → Suez Canal → North Sea', transit: QUOTED },
        { destination: 'Amsterdam', route: 'Via Rotterdam by barge or truck', transit: QUOTED }
      ],
      notes: ['Rotterdam is also a common entry port for western Germany.', PACKING]
    },
    documents: [
      'Original EN 10204 3.1 mill certificates for every grade supplied',
      'PMI certificate: alloy verified on receipt of raw material and at final inspection',
      'Drawing approval before manufacture when we prepare the drawing from a sample',
      'Hardness and mechanical test reports; corrosion, impact, tensile and proof-load tests on request',
      'Chemical test certificate and solution-annealing certificate',
      'Commercial invoice, packing list and Certificate of Origin for EU customs clearance'
    ]
  },
  {
    slug: 'poland',
    code: 'PL',
    hreflang: [{ tag: 'pl-PL', locale: 'pl' }],
    sentenceNameEn: 'Poland',
    keywords: ['refractory anchors', 'kotwy ogniotrwałe', 'boiler refractory anchors'],
    metaDescription: {
      en: 'Refractory anchors since 1980 for Polish coal, lignite and biomass boilers: studs and strip anchors for CFB boilers. Exporting to 25+ countries.',
      pl: 'Kotwy ogniotrwałe od 1980 r. do polskich kotłów węglowych i biomasowych: kołki i kotwy do cyklonów CFB i ścian szczelnych. Eksport do ponad 25 krajów.'
    },
    heroSubheading: {
      en: "Studs, strip anchors and castable anchors for Poland's coal, lignite and biomass boilers, from circulating fluidised bed units to district-heating stoker boilers, and for the cement, steel and copper plants beside them. Made to drawing in Mumbai and shipped to Gdańsk and Gdynia.",
      pl: 'Kołki, kotwy płaskie i kotwy do betonów ogniotrwałych do polskich kotłów na węgiel kamienny, brunatny i biomasę, od kotłów fluidalnych po kotły rusztowe w ciepłownictwie, a także dla cementowni, hut stali i hut miedzi. Produkowane według rysunku w Mumbaju i wysyłane do Gdańska i Gdyni.'
    },
    intro: {
      en: 'Poland is changing fuel faster than it is changing boilers. Units designed for hard coal or lignite now co-fire or fully fire biomass, and district-heating plants are converting stoker boilers to new fuels. Every one of these changes affects the refractory. Biomass brings alkali and chlorine attack, and fluidised bed units wear their cyclones and loop seals faster. Our anchors for these boilers are made to your drawing, in the alloy your boiler engineer specifies for the new fuel.',
      pl: 'W Polsce paliwo zmienia się szybciej niż kotły. Bloki projektowane na węgiel kamienny lub brunatny współspalają lub w całości spalają biomasę, a ciepłownie przestawiają kotły rusztowe na nowe paliwa. Każda taka zmiana wpływa na wymurówkę: biomasa oznacza korozję alkaliczną i chlorkową, a kotły fluidalne szybciej zużywają cyklony i zamknięcia syfonowe. Nasze kotwy do tych kotłów produkujemy według Państwa rysunku, ze stopu wskazanego przez inżyniera kotła dla nowego paliwa.'
    },
    regionalReferences: EUROPE_REFS,
    spotlight: {
      title: 'Anchoring for coal, lignite and biomass boilers',
      paragraphs: [
        'Circulating fluidised bed (CFB) boilers carry the most refractory. The lower furnace, cyclones, loop seals and return legs are lined with dense, erosion-resistant castable, which on tube walls is held by a close pattern of studs welded to the membrane wall. In cyclones and ducts it is held by Y- or V-anchors on the steel casing. Pulverised-fuel boilers use refractory mainly in burner throats and quarls, and stoker boilers in the grate side walls and ignition arches.',
        'For tube walls we supply strip corrugated anchors designed for gun welding onto boiler pipe walls, slit studs for Rapid Arc welding and shear connectors for tiled protection. For casings and cyclones we supply corrugated round anchors and Y-anchors, with stainless steel fibres to reinforce the castable against erosion and thermal shock.',
        'Fuel sets the alloy. Straight coal firing is often served by SS 304 or 309, while biomass and waste-derived fuels usually justify SS 310/310S, 253MA or higher, as your boiler specification sets out.'
      ]
    },
    industries: [
      {
        name: 'Power generation',
        companies: ['PGE', 'Tauron', 'Enea', 'Orlen'],
        text: "Lignite units at Bełchatów, hard-coal and biomass units at Kozienice and Połaniec, and the supercritical CFB unit at Łagisza."
      },
      {
        name: 'District heating and CHP',
        companies: ['Municipal heating companies', 'Veolia Polska', 'PGE Energia Ciepła'],
        text: 'Hundreds of heating plants with stoker and fluidised bed boilers, many converting from coal to biomass or gas.'
      },
      {
        name: 'Cement and lime',
        companies: ['Heidelberg Materials Polska', 'Holcim Polska', 'CEMEX Polska', 'Grupa Ożarów'],
        text: 'Preheater kilns in Opole, Świętokrzyskie and Lublin provinces with castable-lined cyclones, calciners and coolers.'
      },
      {
        name: 'Steel',
        companies: ['ArcelorMittal Poland', 'CMC Poland', 'Celsa Huta Ostrowiec'],
        text: 'Steelmaking in Dąbrowa Górnicza, Kraków, Zawiercie and Ostrowiec, with reheat furnaces and ladles.'
      },
      {
        name: 'Copper and refining',
        companies: ['KGHM', 'Orlen'],
        text: 'Copper smelting at Głogów and Legnica, and refineries at Płock and Gdańsk with fired heaters.'
      }
    ],
    regions: [
      { name: 'Silesia', text: 'Coal-fired power and CHP, the Łagisza CFB unit, and steel in Dąbrowa Górnicza and Zawiercie.' },
      { name: 'Łódź province', text: 'The Bełchatów lignite power station, one of the largest in Europe.' },
      { name: 'Masovia', text: 'Kozienice power station and the Płock refinery.' },
      { name: 'Świętokrzyskie', text: 'The Połaniec power station with its biomass unit, and cement plants around Ożarów.' },
      { name: 'Opole province', text: 'The Opole power station and the Górażdże cement plant.' },
      { name: 'Lower Silesia', text: 'KGHM copper smelters at Głogów and Legnica.' },
      { name: 'Pomerania', text: 'The Gdańsk refinery and the container terminals at Gdańsk and Gdynia.' }
    ],
    products: [
      { slug: 'sepl-18-strip-corrugated-anchors', reason: 'Strip anchors designed for gun welding onto boiler pipe walls.' },
      { slug: 'sepl-23-slit-stud-anchors', reason: 'Slit studs for Rapid Arc welding in lightweight castables.' },
      { slug: 'sepl-16-shear-connectors', reason: 'Shear connectors for tiled tube-wall protection.' },
      { slug: 'sepl-13-corrugated-v-round-anchors', reason: 'Corrugated round anchors for cyclone and duct casings.' },
      { slug: 'sepl-06-split-y-anchors', reason: 'Y-anchors for loop seals, return legs and cement preheaters.' },
      { slug: 'sepl-27-melt-extract-needles', reason: 'Stainless steel fibres that improve erosion and thermal-shock resistance in CFB castables.' }
    ],
    shipping: {
      routes: [
        { destination: 'Gdańsk', route: 'Nhava Sheva → Suez Canal → North Sea → Baltic', transit: QUOTED },
        { destination: 'Gdynia', route: 'Nhava Sheva → Suez Canal → North Sea → Baltic', transit: QUOTED },
        { destination: 'Southern Poland', route: 'Via Hamburg or a Baltic port, then rail or road', transit: QUOTED }
      ],
      notes: ['For Silesia and southern Poland we agree the port and onward delivery with your forwarder.', PACKING]
    },
    documents: [
      'Original EN 10204 3.1 mill certificates for every grade supplied',
      'PMI certificate: alloy verified on receipt of raw material and at final inspection',
      'Hardness and mechanical test reports; corrosion, impact, tensile and proof-load tests on request',
      'Tests open to witnessing by you or your inspection body',
      'Chemical test certificate and solution-annealing certificate',
      'Commercial invoice, packing list and Certificate of Origin for EU customs clearance'
    ]
  },
  {
    slug: 'belgium',
    code: 'BE',
    hreflang: [
      { tag: 'nl-BE', locale: 'nl' },
      { tag: 'fr-BE', locale: 'fr' }
    ],
    sentenceNameEn: 'Belgium',
    keywords: ['refractory anchors', 'vuurvaste ankers', 'refinery heater anchors'],
    metaDescription: {
      en: 'Refractory anchors since 1980 for the Antwerp refinery and chemical corridor: heater, cracker and incinerator anchors. Exporting to 25+ countries.',
      nl: 'Vuurvaste ankers sinds 1980 voor de raffinaderij- en chemiecorridor van Antwerpen: ankers voor fornuizen en krakers. Export naar meer dan 25 landen.'
    },
    heroSubheading: {
      en: 'Ceramic fibre studs, castable anchors and brick supports for the refineries, crackers and hazardous-waste incinerators of the Port of Antwerp-Bruges, and for the steel and chemical plants along the Scheldt and the Albert Canal. Made to drawing in Mumbai and shipped straight to Antwerp.',
      nl: 'Keramische vezelankers, ankers voor vuurvast beton en steunconsoles voor de raffinaderijen, krakers en verbrandingsovens voor gevaarlijk afval in de haven van Antwerpen-Brugge, en voor de staal- en chemiebedrijven langs de Schelde en het Albertkanaal. Op tekening gemaakt in Mumbai en rechtstreeks naar Antwerpen verscheept.'
    },
    intro: {
      en: "The Port of Antwerp-Bruges hosts one of Europe's largest integrated refining and chemical clusters. Refineries, steam crackers and chemical plants share pipelines and utilities along the Scheldt, and plan their turnarounds years ahead. For refractory buyers in the corridor, the anchor has to be on the quay before the contractor starts. Antwerp is served by regular container services from Nhava Sheva, so we plan manufacture and shipment back from your turnaround date.",
      nl: 'De haven van Antwerpen-Brugge herbergt een van de grootste geïntegreerde raffinage- en chemieclusters van Europa. Raffinaderijen, stoomkrakers en chemische fabrieken delen pijpleidingen en nutsvoorzieningen langs de Schelde en plannen hun onderhoudsstops jaren vooruit. Voor inkopers van vuurvaste materialen in deze corridor moet het anker op de kade liggen voordat de aannemer begint. Antwerpen wordt regelmatig bediend door containerdiensten vanuit Nhava Sheva, dus plannen wij productie en verscheping terug vanaf uw stopdatum.'
    },
    regionalReferences: EUROPE_REFS,
    spotlight: {
      title: 'Anchors for the Antwerp refinery and chemical corridor',
      paragraphs: [
        'Refinery heaters in the corridor use ceramic fibre on the radiant walls and roof, castable on the floor and burner rows, and lighter castable in the convection section and stack. Steam crackers take ceramic fibre modules in high-temperature fireboxes, where the anchor alloy is chosen for the firebox temperature, often up to Inconel 600.',
        'Hazardous-waste incineration at Antwerp uses rotary kilns and post-combustion chambers, a different anchoring problem. Rotary kilns need anchors that move with the lining, and secondary chambers need castable anchors in alloys that can withstand chlorides and acid gases.',
        'We cover all three: fibre studs and threaded studs for heaters and crackers, Y-, V- and moveable anchors for castable and rotary kilns, and brick supports and consoles made to drawing.'
      ]
    },
    industries: [
      {
        name: 'Refining',
        companies: ['TotalEnergies', 'ExxonMobil'],
        text: 'The two Antwerp refineries, with fired heaters, reformers and sulphur recovery units.'
      },
      {
        name: 'Petrochemicals and chemicals',
        companies: ['BASF', 'INEOS', 'Borealis', 'Evonik'],
        text: "Steam crackers and chemical plants on both banks of the Scheldt, including INEOS's new ethane cracker (Project One)."
      },
      {
        name: 'Hazardous-waste incineration',
        companies: ['Indaver'],
        text: 'Rotary kiln incinerators and post-combustion chambers treating industrial and hazardous waste in the port area.'
      },
      {
        name: 'Steel',
        companies: ['ArcelorMittal Belgium', 'Aperam'],
        text: 'Integrated steel at Ghent and stainless steel at Genk and Châtelet, with reheat furnaces and ladles.'
      },
      {
        name: 'Cement and lime',
        companies: ['Holcim Belgique', 'Heidelberg Materials Belgium', 'Carmeuse', 'Lhoist'],
        text: 'Cement and lime kilns in Wallonia and Limburg, including two of the world’s leading lime producers.'
      }
    ],
    regions: [
      { name: 'Port of Antwerp: right bank', text: 'The refineries, BASF and the chemical plants north of the city.' },
      { name: 'Port of Antwerp: left bank', text: 'The Waasland port area with chemical plants and container terminals.' },
      { name: 'Ghent', text: 'ArcelorMittal Gent and the North Sea Port canal zone.' },
      { name: 'Albert Canal and Limburg', text: 'Chemical sites around Geel and Tessenderlo, and Aperam stainless at Genk.' },
      { name: 'Wallonia', text: 'Cement, lime and glass around Mons, Charleroi, Namur and Liège.' }
    ],
    products: [
      { slug: 'sepl-24-fiber-stud-anchors', reason: 'Stud-welded anchors for ceramic fibre on heater radiant walls and roofs.' },
      { slug: 'sepl-25-threaded-studs', reason: 'Threaded studs for cracker fibre modules, up to high nickel alloys.' },
      { slug: 'sepl-06-split-y-anchors', reason: 'Castable anchors for heater floors, burner rows and post-combustion chambers.' },
      { slug: 'sepl-15-moveable-anchors', reason: 'Moveable anchors for rotary kiln incinerators.' },
      { slug: 'sepl-02-brick-supports-consoles', reason: 'Brick supports and consoles made to drawing for brick-lined furnaces.' }
    ],
    shipping: {
      routes: [
        { destination: 'Antwerp', route: 'Nhava Sheva → Suez Canal → North Sea → Scheldt', transit: QUOTED },
        { destination: 'Ghent · Liège', route: 'Via Antwerp by barge or truck', transit: QUOTED }
      ],
      notes: [PACKING]
    },
    documents: [
      'Original EN 10204 3.1 mill certificates for every grade supplied',
      'PMI certificate: alloy verified on receipt of raw material and at final inspection',
      'Hardness and mechanical test reports; corrosion, impact, tensile and proof-load tests on request',
      'Tests open to witnessing by you or your inspection body',
      'Chemical test certificate and solution-annealing certificate',
      'Commercial invoice, packing list and Certificate of Origin for EU customs clearance'
    ],
    variants: {
      fr: {
        contentLang: 'fr',
        keywords: ['ancrage réfractaire', 'ancrages réfractaires', 'ancrage réfractaire Belgique'],
        metaDescription: {
          fr: 'Ancrages réfractaires depuis 1980 pour les fours à chaux, cimenteries, aciéries et verreries de Wallonie. Export vers plus de 25 pays, via Anvers.'
        },
        heroSubheading: {
          fr: "Ancrages réfractaires en acier inoxydable pour les fours à chaux, les cimenteries, les aciéries et les verreries de Wallonie, fabriqués selon vos plans à Mumbai et livrés via le port d'Anvers."
        },
        intro: {
          fr: "La Wallonie concentre une industrie de la chaux et du ciment de premier plan, ainsi que des aciéries inoxydables et des verreries. Nous fabriquons les ancrages selon vos plans et dans la nuance indiquée, avec contrôle PMI de la matière à la réception et au contrôle final, et nous joignons les certificats d'usine à chaque expédition. Pour toute demande, écrivez-nous en français ou en anglais."
        },
        regionalReferences: EUROPE_REFS_FR,
        industries: [
          {
            name: 'Chaux',
            companies: ['Carmeuse', 'Lhoist'],
            text: 'Fours à chaux droits et rotatifs, avec béton réfractaire tenu par des ancrages en Y et en V et ancrages mobiles pour fours rotatifs.'
          },
          {
            name: 'Ciment',
            companies: ['Holcim Belgique', 'Heidelberg Materials Belgium'],
            text: 'Tours de préchauffage, calcinateurs et refroidisseurs garnis de béton réfractaire.'
          },
          {
            name: 'Acier et verre',
            companies: ['Aperam', 'AGC Glass Europe'],
            text: 'Fours de réchauffage, poches et fours verriers, avec agrafes, supports de briques et ancrages.'
          }
        ],
        regions: [
          { name: 'Hainaut', text: 'Cimenteries et chaufours autour de Mons et de Tournai, aciérie inoxydable de Châtelet.' },
          { name: 'Namur et Liège', text: 'Chaux, ciment et verre le long de la Meuse.' }
        ],
        products: [
          { slug: 'sepl-06-split-y-anchors', reason: "L'ancrage le plus courant pour béton réfractaire, adapté au soudage par goujon." },
          { slug: 'sepl-15-moveable-anchors', reason: 'Ancrages mobiles pour fours rotatifs à chaux et à ciment.' },
          { slug: 'sepl-01-brick-staples', reason: 'Agrafes pour briques isolantes des fours verriers et aciéries.' },
          { slug: 'sepl-24-fiber-stud-anchors', reason: 'Goujons soudés pour garnissages en fibre céramique.' }
        ],
        shipping: {
          routes: [{ destination: 'Anvers', route: 'Nhava Sheva → canal de Suez → mer du Nord → Escaut, puis route ou barge', transit: 'Sur devis' }],
          notes: ['Emballage export en caisses de bois fumigées, adaptées au transport maritime.']
        },
        documents: [
          "Certificats d'usine originaux (EN 10204 3.1)",
          'Certificat PMI : nuance vérifiée à la réception de la matière et au contrôle final',
          'Essais de dureté et essais mécaniques ; essais de corrosion, de résilience, de traction et de charge sur demande',
          "Essais pouvant être suivis par votre organisme d'inspection",
          "Certificat d'analyse chimique et certificat de mise en solution",
          "Facture commerciale, liste de colisage et certificat d'origine"
        ]
      }
    }
  }
];

export function getCountry(slug: string): Country | undefined {
  return COUNTRIES.find((c) => c.slug === slug);
}

/** The content shown for a locale: a locale-specific variant if one exists, otherwise the default. */
export function contentFor(country: Country, locale: string): CountryContent {
  return country.variants?.[locale as AppLocale] ?? country;
}

export function localized(text: LocalizedText, locale: string, fallback: AppLocale = 'en'): { text: string; lang: string } {
  const value = text[locale as AppLocale];
  return value ? { text: value, lang: locale } : { text: text[fallback] ?? '', lang: fallback };
}
