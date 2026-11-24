// Generated from docs/dev-reference.md (Product Catalog). Single source of truth for product pages.
// Technical text is kept in English (seo-strategy.md rule 10); UI labels live in messages/*.json.

export type LiningType = 'brick' | 'castable' | 'double' | 'ceramic' | 'washers' | 'fibres';
export type SectionType = 'round' | 'flat' | 'various' | 'ceramic';
export type AlloyForm = 'plate' | 'wire' | 'general';

export type DescriptionBlock = { type: 'paragraph'; text: string } | { type: 'list'; items: string[] };

export type Product = {
  code: string | null;
  slug: string;
  name: string;
  lining: LiningType;
  section: SectionType;
  comingSoon: boolean;
  description: DescriptionBlock[];
  alloys: { form: AlloyForm; grades: string[] }[];
  alloyTable: { grade: string; maxTemp: string; use: string }[];
  material: string | null;
  images: string[];
};

export const LINING_ORDER: LiningType[] = ['brick', 'castable', 'double', 'ceramic', 'washers', 'fibres'];

export const PRODUCTS: Product[] = [
  {
    "code": "SEPL-01",
    "slug": "sepl-01-brick-staples",
    "name": "Brick Staples",
    "lining": "brick",
    "section": "round",
    "comingSoon": false,
    "description": [
      {
        "type": "paragraph",
        "text": "Our refractory anchors offer great retention of the insulating brick. For bricks with high density, heavier anchors can be used."
      },
      {
        "type": "paragraph",
        "text": "In the below drawings you can observe sharp and normal ends for the anchors. Sharp ends are used when the anchors is hammered into the brick to secure. Normal ends are used in bricks which have premade holes in them."
      }
    ],
    "alloys": [
      {
        "form": "wire",
        "grades": [
          "CS",
          "304",
          "304H",
          "309",
          "253MA",
          "310SS",
          "314",
          "316",
          "321",
          "330",
          "800",
          "601"
        ]
      }
    ],
    "alloyTable": [],
    "material": null,
    "images": [
      "/images/products/sepl-01-brick-staples/sepl-01-brick-staple-stainless-steel-render-group.jpg",
      "/images/products/sepl-01-brick-staples/sepl-01-brick-staple-u-and-v-types-render.jpg",
      "/images/products/sepl-01-brick-staples/sepl-01-brick-staple-render-yellow.jpg",
      "/images/products/sepl-01-brick-staples/sepl-01-brick-staple-flat-bar-pin-render.jpg",
      "/images/products/sepl-01-brick-staples/sepl-01-brick-staple-v-type-drawing.jpg",
      "/images/products/sepl-01-brick-staples/sepl-01-brick-staple-u-type-drawing.jpg",
      "/images/products/sepl-01-brick-staples/sepl-01-brick-staple-sharp-ends-drawing.jpg",
      "/images/products/sepl-01-brick-staples/sepl-01-brick-staple-round-wire-side.jpg",
      "/images/products/sepl-01-brick-staples/sepl-01-brick-staple-v-shape-round-wire.jpg",
      "/images/products/sepl-01-brick-staples/sepl-01-brick-staple-u-shape-round-wire.jpg"
    ]
  },
  {
    "code": "SEPL-02",
    "slug": "sepl-02-brick-supports-consoles",
    "name": "Brick Supports / Consoles",
    "lining": "brick",
    "section": "flat",
    "comingSoon": false,
    "description": [
      {
        "type": "paragraph",
        "text": "Santura engineering has been making custom refractory anchors according to our customer's requirements. We make sure that the drawings are well understood before taking into manufacturing. They are also called in many names like consoles, brick supports, sharks and support bracket. Santura engineering has year of experience in fabricating and optimizing production workflow to give you the best output."
      }
    ],
    "alloys": [
      {
        "form": "plate",
        "grades": [
          "CS",
          "304",
          "309",
          "253MA",
          "310SS",
          "314",
          "321",
          "330",
          "800",
          "601"
        ]
      }
    ],
    "alloyTable": [],
    "material": null,
    "images": [
      "/images/products/sepl-02-brick-supports-consoles/sepl-02-brick-support-console-render-green.jpg",
      "/images/products/sepl-02-brick-supports-consoles/sepl-02-brick-support-console-render-red.jpg",
      "/images/products/sepl-02-brick-supports-consoles/sepl-02-brick-support-console-render-yellow.jpg",
      "/images/products/sepl-02-brick-supports-consoles/sepl-02-brick-support-console-render-blue.jpg",
      "/images/products/sepl-02-brick-supports-consoles/sepl-02-brick-support-console-render-orange.jpg",
      "/images/products/sepl-02-brick-supports-consoles/sepl-02-brick-support-consoles-stainless-steel-plate.jpg",
      "/images/products/sepl-02-brick-supports-consoles/sepl-02-brick-support-consoles-installed-on-shell.jpg",
      "/images/products/sepl-02-brick-supports-consoles/sepl-02-brick-support-console-drawing-flat.jpg",
      "/images/products/sepl-02-brick-supports-consoles/sepl-02-brick-support-console-drawing-curved.jpg",
      "/images/products/sepl-02-brick-supports-consoles/sepl-02-brick-support-clip-galvanized-eye-lug.jpg"
    ]
  },
  {
    "code": "SEPL-03",
    "slug": "sepl-03-brick-claws",
    "name": "Brick Claws",
    "lining": "brick",
    "section": "flat",
    "comingSoon": false,
    "description": [
      {
        "type": "paragraph",
        "text": "Brick claw refractory anchor gives an even distribution of weight support cross the head of the anchor. They are available upto 80mm wide and 9mm thick. We can offer widths upto 122mm and thickness of 11mm in the straight design. Of course we can make according to our customers designs."
      }
    ],
    "alloys": [
      {
        "form": "plate",
        "grades": [
          "CS",
          "304",
          "309",
          "253MA",
          "310",
          "314",
          "321",
          "330",
          "800",
          "601"
        ]
      }
    ],
    "alloyTable": [],
    "material": null,
    "images": [
      "/images/products/sepl-03-brick-claws/sepl-03-brick-claw-render-red.jpg",
      "/images/products/sepl-03-brick-claws/sepl-03-brick-claw-render-green.jpg",
      "/images/products/sepl-03-brick-claws/sepl-03-brick-claw-hook-render-blue.jpg",
      "/images/products/sepl-03-brick-claws/sepl-03-brick-claw-threaded-stud-render.jpg",
      "/images/products/sepl-03-brick-claws/sepl-03-brick-claws-stainless-steel-pair.jpg",
      "/images/products/sepl-03-brick-claws/sepl-03-brick-claw-threaded-drawing.jpg",
      "/images/products/sepl-03-brick-claws/sepl-03-brick-claw-hook-drawing.jpg",
      "/images/products/sepl-03-brick-claws/sepl-03-brick-claw-galvanized-eye-lug.jpg"
    ]
  },
  {
    "code": "SEPL-04",
    "slug": "sepl-04-scissor-clips",
    "name": "Scissor Clips",
    "lining": "brick",
    "section": "flat",
    "comingSoon": false,
    "description": [
      {
        "type": "paragraph",
        "text": "These refractory anchors are used when the brick is positioned from the wall or ceiling."
      },
      {
        "type": "paragraph",
        "text": "Below you can view the drawings."
      }
    ],
    "alloys": [
      {
        "form": "wire",
        "grades": [
          "CS",
          "304",
          "304H",
          "309",
          "253MA",
          "310SS",
          "314",
          "316",
          "321",
          "330",
          "800",
          "601"
        ]
      }
    ],
    "alloyTable": [],
    "material": null,
    "images": [
      "/images/products/sepl-04-scissor-clips/sepl-04-scissor-clip-render-color.jpg",
      "/images/products/sepl-04-scissor-clips/sepl-04-scissor-clip-stainless-steel-render.jpg",
      "/images/products/sepl-04-scissor-clips/sepl-04-scissor-clip-single-wire-render.jpg",
      "/images/products/sepl-04-scissor-clips/sepl-04-scissor-clip-installed-on-beam-render.jpg",
      "/images/products/sepl-04-scissor-clips/sepl-04-scissor-clip-technical-drawing.jpg"
    ]
  },
  {
    "code": "SEPL-05",
    "slug": "sepl-05-tie-back-anchors",
    "name": "Tie Back Anchors",
    "lining": "brick",
    "section": "round",
    "comingSoon": false,
    "description": [
      {
        "type": "paragraph",
        "text": "Tie back refractory anchors are great for hanging brick insulation on the lining. A thick base helps to give strong support to the refractory material."
      }
    ],
    "alloys": [
      {
        "form": "plate",
        "grades": [
          "CS",
          "304",
          "309",
          "253MA",
          "310",
          "314",
          "321",
          "330",
          "800",
          "601"
        ]
      },
      {
        "form": "wire",
        "grades": [
          "CS",
          "304",
          "304H",
          "309",
          "253MA",
          "310",
          "314",
          "316",
          "321",
          "330",
          "800",
          "601"
        ]
      }
    ],
    "alloyTable": [],
    "material": null,
    "images": [
      "/images/products/sepl-05-tie-back-anchors/sepl-05-tie-back-anchor-threaded-plate-render.jpg",
      "/images/products/sepl-05-tie-back-anchors/sepl-05-tie-back-anchors-threaded-pair-render.jpg",
      "/images/products/sepl-05-tie-back-anchors/sepl-05-tie-back-anchors-bent-pair-render.jpg",
      "/images/products/sepl-05-tie-back-anchors/sepl-05-tie-back-anchor-bent-drawing.jpg",
      "/images/products/sepl-05-tie-back-anchors/sepl-05-tie-back-anchor-threaded-drawing.jpg"
    ]
  },
  {
    "code": "SEPL-06",
    "slug": "sepl-06-split-y-anchors",
    "name": "Split Y Anchors",
    "lining": "castable",
    "section": "flat",
    "comingSoon": false,
    "description": [
      {
        "type": "paragraph",
        "text": "The \"Y\" refractory anchors are the most common anchoring systems which are widely used due to its low cost and availability. These anchors are used from light to dense refractories. They are suitable for Stud/gun welding which decrease a lot of time in installation. Widths greater than 16mm have reduced base."
      },
      {
        "type": "paragraph",
        "text": "Y refractory anchors are usually corrugated to have a higher hold on the refractory. Different types of corrugation can be formed into these anchors. Below you can see the examples of these types of anchors."
      }
    ],
    "alloys": [
      {
        "form": "plate",
        "grades": [
          "CS",
          "304",
          "309",
          "253MA",
          "310SS",
          "314",
          "321",
          "330",
          "800",
          "601"
        ]
      }
    ],
    "alloyTable": [],
    "material": null,
    "images": [
      "/images/products/sepl-06-split-y-anchors/sepl-06-split-y-anchor-flat-render-green.jpg",
      "/images/products/sepl-06-split-y-anchors/sepl-06-split-y-anchor-corrugated-l-render.jpg",
      "/images/products/sepl-06-split-y-anchors/sepl-06-split-y-anchor-flat-pair-render.jpg",
      "/images/products/sepl-06-split-y-anchors/sepl-06-split-y-anchor-straight-pair-render.jpg",
      "/images/products/sepl-06-split-y-anchors/sepl-06-split-y-anchor-twisted-pair-render.jpg",
      "/images/products/sepl-06-split-y-anchors/sepl-06-split-y-anchor-technical-drawing.jpg",
      "/images/products/sepl-06-split-y-anchors/sepl-06-split-y-anchor-corrugated-drawing.jpg",
      "/images/products/sepl-06-split-y-anchors/sepl-06-split-y-anchor-flat-dimension-drawing.jpg",
      "/images/products/sepl-06-split-y-anchors/sepl-06-split-y-anchor-slit-strip-drawing.jpg",
      "/images/products/sepl-06-split-y-anchors/sepl-06-split-y-anchor-corrugated-strip-drawing.jpg"
    ]
  },
  {
    "code": "SEPL-07",
    "slug": "sepl-07-v-anchors",
    "name": "V Anchors",
    "lining": "castable",
    "section": "round",
    "comingSoon": false,
    "description": [
      {
        "type": "paragraph",
        "text": "This V shaped refractory anchor is standard simple anchoring system. They are used for light to very dense refractories. For thermal shock application it is highly advised to use stainless steel fibers into the refractory material. These anchors are designed to use the traditional methods of welding."
      }
    ],
    "alloys": [
      {
        "form": "wire",
        "grades": [
          "CS",
          "304",
          "304H",
          "309",
          "253MA",
          "310S",
          "314",
          "316",
          "321",
          "330",
          "800",
          "601"
        ]
      }
    ],
    "alloyTable": [],
    "material": null,
    "images": [
      "/images/products/sepl-07-v-anchors/sepl-07-v-anchor-round-wire-render-yellow.jpg",
      "/images/products/sepl-07-v-anchors/sepl-07-v-anchor-round-wire-render-teal.jpg",
      "/images/products/sepl-07-v-anchors/sepl-07-v-anchor-corrugated-render-blue.jpg",
      "/images/products/sepl-07-v-anchors/sepl-07-v-anchor-corrugated-legs-render.jpg",
      "/images/products/sepl-07-v-anchors/sepl-07-v-anchor-corrugated-tips-render-teal.jpg",
      "/images/products/sepl-07-v-anchors/sepl-07-v-anchor-y-type-render-yellow.jpg",
      "/images/products/sepl-07-v-anchors/sepl-07-v-anchor-stainless-steel-pair.jpg",
      "/images/products/sepl-07-v-anchors/sepl-07-v-anchors-installed-castable-lining-render.jpg",
      "/images/products/sepl-07-v-anchors/sepl-07-v-anchors-installed-corner-render.jpg",
      "/images/products/sepl-07-v-anchors/sepl-07-v-anchors-installed-lining-blue-render.jpg"
    ]
  },
  {
    "code": "SEPL-08",
    "slug": "sepl-08-corrugated-bullhorn-anchors",
    "name": "Corrugated Bullhorn Anchors",
    "lining": "castable",
    "section": "round",
    "comingSoon": false,
    "description": [
      {
        "type": "paragraph",
        "text": "These refractory anchors are corrugated and are used for light and medium density refractories. These anchors are typically used in cement industries and ferrous/non-ferrous metal industries. Some of these anchors can be used in gun welding system, the rest and manually welded."
      }
    ],
    "alloys": [
      {
        "form": "wire",
        "grades": [
          "CS",
          "304",
          "304H",
          "309",
          "253MA",
          "310S",
          "314",
          "316",
          "321",
          "330",
          "800",
          "601"
        ]
      }
    ],
    "alloyTable": [],
    "material": null,
    "images": [
      "/images/products/sepl-08-corrugated-bullhorn-anchors/sepl-08-corrugated-bullhorn-anchor-stainless-steel-pair.jpg",
      "/images/products/sepl-08-corrugated-bullhorn-anchors/sepl-08-corrugated-bullhorn-anchor-stainless-steel-angled.jpg",
      "/images/products/sepl-08-corrugated-bullhorn-anchors/sepl-08-corrugated-bullhorn-anchor-render-red.jpg",
      "/images/products/sepl-08-corrugated-bullhorn-anchors/sepl-08-corrugated-bullhorn-anchor-render-magenta.jpg",
      "/images/products/sepl-08-corrugated-bullhorn-anchors/sepl-08-corrugated-bullhorn-anchors-installed-lining-render.jpg",
      "/images/products/sepl-08-corrugated-bullhorn-anchors/sepl-08-threaded-stud-welded-casing-diagram.jpg",
      "/images/products/sepl-08-corrugated-bullhorn-anchors/sepl-08-corrugated-bullhorn-anchor-technical-drawing.jpg",
      "/images/products/sepl-08-corrugated-bullhorn-anchors/sepl-08-corrugated-bullhorn-anchor-straight-v-drawing.jpg",
      "/images/products/sepl-08-corrugated-bullhorn-anchors/sepl-08-corrugated-bullhorn-anchor-corrugated-v-drawing.jpg",
      "/images/products/sepl-08-corrugated-bullhorn-anchors/sepl-08-corrugated-bullhorn-anchor-m8-thread-drawing.jpg"
    ]
  },
  {
    "code": "SEPL-09",
    "slug": "sepl-09-corrugated-h-anchors",
    "name": "Corrugated H Anchors",
    "lining": "castable",
    "section": "flat",
    "comingSoon": false,
    "description": [
      {
        "type": "paragraph",
        "text": "These refractory anchors and specially designed for hand welding and can be used from light to dense refractories."
      }
    ],
    "alloys": [
      {
        "form": "wire",
        "grades": [
          "CS",
          "304",
          "304H",
          "309",
          "253MA",
          "310S",
          "314",
          "316",
          "321",
          "330",
          "800",
          "601"
        ]
      }
    ],
    "alloyTable": [],
    "material": null,
    "images": [
      "/images/products/sepl-09-corrugated-h-anchors/sepl-09-corrugated-h-anchor-render-blue.jpg",
      "/images/products/sepl-09-corrugated-h-anchors/sepl-09-corrugated-h-anchor-render-teal-flat.jpg",
      "/images/products/sepl-09-corrugated-h-anchors/sepl-09-corrugated-h-anchor-render-cyan.jpg",
      "/images/products/sepl-09-corrugated-h-anchors/sepl-09-corrugated-h-anchor-render-blue-corrugated.jpg",
      "/images/products/sepl-09-corrugated-h-anchors/sepl-09-corrugated-h-anchor-render-green.jpg",
      "/images/products/sepl-09-corrugated-h-anchors/sepl-09-corrugated-h-anchor-stainless-steel-pair.jpg",
      "/images/products/sepl-09-corrugated-h-anchors/sepl-09-corrugated-h-anchor-stainless-steel-corrugated-pair.jpg",
      "/images/products/sepl-09-corrugated-h-anchors/sepl-09-corrugated-h-anchor-straight-v-drawing.jpg",
      "/images/products/sepl-09-corrugated-h-anchors/sepl-09-corrugated-h-anchor-m8-thread-drawing.jpg",
      "/images/products/sepl-09-corrugated-h-anchors/sepl-09-corrugated-h-anchor-corrugated-v-drawing.jpg"
    ]
  },
  {
    "code": "SEPL-10",
    "slug": "sepl-10-y-anchors-flat",
    "name": "Y Anchors (Flat)",
    "lining": "castable",
    "section": "flat",
    "comingSoon": false,
    "description": [
      {
        "type": "paragraph",
        "text": "These kind of refractory anchors are flat sectioned for different application, mostly from light to medium refractories. They can be made in double and triple tined. They are bent outward from the centre after welding and installation. It is advisable to use reinforcement fibres in your refractory material."
      },
      {
        "type": "paragraph",
        "text": "The anchors can be hand welded or gun welded onto the steel casing. After welding, a backup layer can be pushed over the tines and onto the steel casing. The tines can be bent out, which will increase the transition of the forces in the refractory concrete onto the refractory anchors casing."
      }
    ],
    "alloys": [
      {
        "form": "plate",
        "grades": [
          "CS",
          "304",
          "309",
          "253MA",
          "310S",
          "314",
          "321",
          "330",
          "800",
          "601"
        ]
      }
    ],
    "alloyTable": [],
    "material": null,
    "images": [
      "/images/products/sepl-10-y-anchors-flat/sepl-10-y-anchor-flat-corrugated-pair-render.jpg",
      "/images/products/sepl-10-y-anchors-flat/sepl-10-y-anchor-flat-corrugated-render-blue.jpg",
      "/images/products/sepl-10-y-anchors-flat/sepl-10-y-anchor-flat-render-yellow.jpg",
      "/images/products/sepl-10-y-anchors-flat/sepl-10-y-anchor-flat-wavy-pair-render.jpg",
      "/images/products/sepl-10-y-anchors-flat/sepl-10-y-anchor-flat-straight-pair-render.jpg",
      "/images/products/sepl-10-y-anchors-flat/sepl-10-y-anchor-flat-types-a-b-c-drawing.jpg",
      "/images/products/sepl-10-y-anchors-flat/sepl-10-y-anchor-flat-dimension-drawing.jpg",
      "/images/products/sepl-10-y-anchors-flat/sepl-10-y-anchors-flat-welded-plate-render.jpg",
      "/images/products/sepl-10-y-anchors-flat/sepl-10-y-anchor-flat-installed-lining-render.jpg",
      "/images/products/sepl-10-y-anchors-flat/sepl-10-l-shaped-rod-stainless-steel.jpg"
    ]
  },
  {
    "code": "SEPL-11",
    "slug": "sepl-11-flat-sectioned-anchors",
    "name": "Flat Sectioned Anchors",
    "lining": "castable",
    "section": "flat",
    "comingSoon": false,
    "description": [
      {
        "type": "paragraph",
        "text": "Flat sectioned refractory anchors are flat sectioned for different application, mostly from light to medium refractories. They can be made in double and triple tined. They are bent outward from the centre after welding and installation. It is advisable to use reinforcement fibres in your refractory material."
      },
      {
        "type": "paragraph",
        "text": "The anchors can be hand welded or gun welded onto the steel casing. After welding, a backup layer can be pushed over the tines and onto the steel casing. The tines can be bent out, which will increase the transition of the forces in the refractory concrete onto the refractory anchors casing."
      }
    ],
    "alloys": [
      {
        "form": "plate",
        "grades": [
          "CS",
          "304",
          "309",
          "253MA",
          "310S",
          "314",
          "321",
          "330",
          "800",
          "601"
        ]
      }
    ],
    "alloyTable": [],
    "material": null,
    "images": [
      "/images/products/sepl-11-flat-sectioned-anchors/sepl-11-flat-sectioned-anchor-render-yellow.jpg",
      "/images/products/sepl-11-flat-sectioned-anchors/sepl-11-flat-sectioned-anchor-render-red.jpg",
      "/images/products/sepl-11-flat-sectioned-anchors/sepl-11-flat-sectioned-anchor-corrugated-pair-render.jpg",
      "/images/products/sepl-11-flat-sectioned-anchors/sepl-11-flat-sectioned-anchor-straight-pair-render.jpg",
      "/images/products/sepl-11-flat-sectioned-anchors/sepl-11-flat-sectioned-anchor-slit-pair-render.jpg",
      "/images/products/sepl-11-flat-sectioned-anchors/sepl-11-flat-sectioned-anchor-tapered-pair-render.jpg",
      "/images/products/sepl-11-flat-sectioned-anchors/sepl-11-flat-sectioned-anchors-welded-plate-render.jpg",
      "/images/products/sepl-11-flat-sectioned-anchors/sepl-11-flat-sectioned-anchor-installed-lining-render.jpg"
    ]
  },
  {
    "code": "SEPL-13",
    "slug": "sepl-13-corrugated-v-round-anchors",
    "name": "Corrugated V Round Anchors",
    "lining": "castable",
    "section": "round",
    "comingSoon": false,
    "description": [
      {
        "type": "paragraph",
        "text": "These anchors are round in section and are corrugated to increase the hold power of the refractories. They are suitable for gun welding and are used in light, medium and heavy density or refractory."
      }
    ],
    "alloys": [
      {
        "form": "wire",
        "grades": [
          "CS",
          "304",
          "304H",
          "309",
          "253MA",
          "310S",
          "314",
          "316",
          "321",
          "330",
          "800",
          "601"
        ]
      }
    ],
    "alloyTable": [],
    "material": null,
    "images": [
      "/images/products/sepl-13-corrugated-v-round-anchors/sepl-13-corrugated-v-round-anchor-render-blue.jpg",
      "/images/products/sepl-13-corrugated-v-round-anchors/sepl-13-corrugated-v-round-anchor-render-blue-short.jpg",
      "/images/products/sepl-13-corrugated-v-round-anchors/sepl-13-corrugated-v-round-anchor-render-teal.jpg",
      "/images/products/sepl-13-corrugated-v-round-anchors/sepl-13-corrugated-v-round-anchor-render-blue-wide.jpg",
      "/images/products/sepl-13-corrugated-v-round-anchors/sepl-13-corrugated-v-round-anchor-stainless-steel-pair.jpg",
      "/images/products/sepl-13-corrugated-v-round-anchors/sepl-13-corrugated-v-round-anchor-stainless-steel-corrugated-pair.jpg",
      "/images/products/sepl-13-corrugated-v-round-anchors/sepl-13-corrugated-v-round-anchor-weld-base-drawing.jpg",
      "/images/products/sepl-13-corrugated-v-round-anchors/sepl-13-corrugated-v-round-anchor-corrugated-tip-drawing.jpg",
      "/images/products/sepl-13-corrugated-v-round-anchors/sepl-13-corrugated-v-round-anchor-bent-legs-drawing.jpg",
      "/images/products/sepl-13-corrugated-v-round-anchors/sepl-13-corrugated-v-round-anchor-angled-legs-drawing.jpg"
    ]
  },
  {
    "code": "SEPL-14",
    "slug": "sepl-14-multipurpose-anchors",
    "name": "Multipurpose Anchors",
    "lining": "castable",
    "section": "various",
    "comingSoon": false,
    "description": [
      {
        "type": "paragraph",
        "text": "These anchors are suitable for all types of refractories. It is suitable for traditional welding and is also ideal to use as a movable anchor in rotary kilns. Reinforcement fibres are advisable for thermal shock resistance."
      }
    ],
    "alloys": [
      {
        "form": "wire",
        "grades": [
          "CS",
          "304",
          "304H",
          "309",
          "253MA",
          "310S",
          "314",
          "316",
          "321",
          "330",
          "800",
          "601"
        ]
      }
    ],
    "alloyTable": [],
    "material": null,
    "images": [
      "/images/products/sepl-14-multipurpose-anchors/sepl-14-multipurpose-anchor-stainless-steel-bent.jpg",
      "/images/products/sepl-14-multipurpose-anchors/sepl-14-multipurpose-anchor-corrugated-pair.jpg",
      "/images/products/sepl-14-multipurpose-anchors/sepl-14-multipurpose-anchor-corrugated-side.jpg",
      "/images/products/sepl-14-multipurpose-anchors/sepl-14-multipurpose-anchor-twisted-drawing.jpg",
      "/images/products/sepl-14-multipurpose-anchors/sepl-14-multipurpose-anchor-l-base-drawing.jpg",
      "/images/products/sepl-14-multipurpose-anchors/sepl-14-multipurpose-anchor-corrugated-l-base-drawing.jpg",
      "/images/products/sepl-14-multipurpose-anchors/sepl-14-multipurpose-anchor-twisted-l-base-drawing.jpg",
      "/images/products/sepl-14-multipurpose-anchors/sepl-14-multipurpose-anchor-corrugated-v-drawing.jpg",
      "/images/products/sepl-14-multipurpose-anchors/sepl-14-multipurpose-anchor-twisted-v-drawing.jpg",
      "/images/products/sepl-14-multipurpose-anchors/sepl-14-threaded-stud-welded-casing-diagram.jpg"
    ]
  },
  {
    "code": "SEPL-15",
    "slug": "sepl-15-moveable-anchors",
    "name": "Moveable Anchors",
    "lining": "castable",
    "section": "round",
    "comingSoon": false,
    "description": [
      {
        "type": "paragraph",
        "text": "Moveable refractory anchors are commonly used in rotary kilns where there is movement due to the stress cause in the refractory. There anchors are fixed during the installation, but they become moveable during operations. This allows the refractory anchors to move with the refractory material when it undergoes any movement during the operation; therefore this reduces the stress for the refractory material."
      }
    ],
    "alloys": [
      {
        "form": "general",
        "grades": [
          "CS",
          "309",
          "304",
          "253MA",
          "310",
          "314",
          "321",
          "330",
          "800",
          "601"
        ]
      }
    ],
    "alloyTable": [],
    "material": null,
    "images": [
      "/images/products/sepl-15-moveable-anchors/sepl-15-moveable-anchor-corrugated-pair.jpg",
      "/images/products/sepl-15-moveable-anchors/sepl-15-moveable-anchor-corrugated-side.jpg",
      "/images/products/sepl-15-moveable-anchors/sepl-15-moveable-anchor-three-leg-red-tips.jpg",
      "/images/products/sepl-15-moveable-anchors/sepl-15-moveable-anchor-u-hook-pair.jpg",
      "/images/products/sepl-15-moveable-anchors/sepl-15-moveable-anchor-corrugated-v-pair.jpg",
      "/images/products/sepl-15-moveable-anchors/sepl-15-moveable-anchor-nut-base-drawing.jpg",
      "/images/products/sepl-15-moveable-anchors/sepl-15-moveable-anchor-twisted-drawing.jpg",
      "/images/products/sepl-15-moveable-anchors/sepl-15-moveable-anchor-t-base-drawing.jpg",
      "/images/products/sepl-15-moveable-anchors/sepl-15-moveable-anchor-t-base-angled-drawing.jpg",
      "/images/products/sepl-15-moveable-anchors/sepl-15-moveable-anchor-twisted-t-base-drawing.jpg"
    ]
  },
  {
    "code": "SEPL-16",
    "slug": "sepl-16-shear-connectors",
    "name": "Shear Connectors",
    "lining": "castable",
    "section": "round",
    "comingSoon": false,
    "description": [
      {
        "type": "paragraph",
        "text": "Shear connectors are used to support refractory ceramic tiles in incinerators to protect the pipe walls of the furnace. Santura engineering offers a variety of shapes and sizes of shear connectors with different types of alloys."
      },
      {
        "type": "paragraph",
        "text": "Shear connector with aluminium flux for stud welding"
      }
    ],
    "alloys": [
      {
        "form": "general",
        "grades": [
          "CS",
          "304",
          "304H",
          "309",
          "253MA",
          "310S",
          "314",
          "316",
          "321",
          "330",
          "800",
          "601"
        ]
      }
    ],
    "alloyTable": [],
    "material": null,
    "images": [
      "/images/products/sepl-16-shear-connectors/sepl-16-shear-connector-studs-ceramic-ferrules.jpg",
      "/images/products/sepl-16-shear-connectors/sepl-16-shear-connector-stud-ferrule-render.jpg",
      "/images/products/sepl-16-shear-connectors/sepl-16-shear-connector-three-leg-anchor-render.jpg",
      "/images/products/sepl-16-shear-connectors/sepl-16-shear-connectors-installed-castable-render.jpg",
      "/images/products/sepl-16-shear-connectors/sepl-16-shear-connector-technical-drawing.jpg",
      "/images/products/sepl-16-shear-connectors/sepl-16-shear-connector-threaded-stud-render.jpg"
    ]
  },
  {
    "code": "SEPL-17",
    "slug": "sepl-17-round-y-anchors",
    "name": "Round Y Anchors",
    "lining": "castable",
    "section": "round",
    "comingSoon": true,
    "description": [],
    "alloys": [],
    "alloyTable": [],
    "material": null,
    "images": []
  },
  {
    "code": "SEPL-18",
    "slug": "sepl-18-strip-corrugated-anchors",
    "name": "Strip Corrugated Anchors",
    "lining": "castable",
    "section": "flat",
    "comingSoon": false,
    "description": [
      {
        "type": "paragraph",
        "text": "These refractory anchors are designed for gun welding onto boiler pipe walls. The flat shape gives a stronger support to the concrete in areas where heavy material is used."
      }
    ],
    "alloys": [
      {
        "form": "plate",
        "grades": [
          "CS",
          "304",
          "309",
          "253MA",
          "310S",
          "314",
          "321",
          "330",
          "800",
          "601"
        ]
      }
    ],
    "alloyTable": [],
    "material": null,
    "images": [
      "/images/products/sepl-18-strip-corrugated-anchors/sepl-18-strip-corrugated-anchor-l-base-render.jpg",
      "/images/products/sepl-18-strip-corrugated-anchors/sepl-18-strip-corrugated-anchor-flat-render.jpg",
      "/images/products/sepl-18-strip-corrugated-anchors/sepl-18-strip-corrugated-anchor-wide-render.jpg",
      "/images/products/sepl-18-strip-corrugated-anchors/sepl-18-strip-corrugated-anchor-notched-render.jpg",
      "/images/products/sepl-18-strip-corrugated-anchors/sepl-18-strip-corrugated-anchor-straight-render.jpg",
      "/images/products/sepl-18-strip-corrugated-anchors/sepl-18-strip-corrugated-anchor-straight-drawing.jpg",
      "/images/products/sepl-18-strip-corrugated-anchors/sepl-18-strip-corrugated-anchor-tapered-drawing.jpg",
      "/images/products/sepl-18-strip-corrugated-anchors/sepl-18-strip-corrugated-anchor-curved-drawing.jpg",
      "/images/products/sepl-18-strip-corrugated-anchors/sepl-18-strip-corrugated-anchor-curved-tapered-drawing.jpg",
      "/images/products/sepl-18-strip-corrugated-anchors/sepl-18-strip-corrugated-anchor-flat-y-drawing.jpg"
    ]
  },
  {
    "code": "SEPL-19",
    "slug": "sepl-19-miscellaneous-anchors",
    "name": "Miscellaneous Anchors",
    "lining": "castable",
    "section": "various",
    "comingSoon": false,
    "description": [
      {
        "type": "paragraph",
        "text": "This section contains a selection of common refractory anchors that are used for various applications."
      }
    ],
    "alloys": [
      {
        "form": "plate",
        "grades": [
          "CS",
          "304",
          "309",
          "253MA",
          "310",
          "314",
          "321",
          "330",
          "800",
          "601"
        ]
      },
      {
        "form": "wire",
        "grades": [
          "CS",
          "304",
          "304H",
          "309",
          "253MA",
          "310",
          "314",
          "316",
          "321",
          "330",
          "800",
          "601"
        ]
      }
    ],
    "alloyTable": [],
    "material": null,
    "images": [
      "/images/products/sepl-19-miscellaneous-anchors/sepl-19-miscellaneous-anchor-corrugated-y-render-teal.jpg",
      "/images/products/sepl-19-miscellaneous-anchors/sepl-19-miscellaneous-anchor-corrugated-clip-render-red.jpg",
      "/images/products/sepl-19-miscellaneous-anchors/sepl-19-miscellaneous-anchor-multi-tine-render-green.jpg",
      "/images/products/sepl-19-miscellaneous-anchors/sepl-19-miscellaneous-anchor-y-render-yellow.jpg",
      "/images/products/sepl-19-miscellaneous-anchors/sepl-19-miscellaneous-anchor-multi-tine-render-orange.jpg",
      "/images/products/sepl-19-miscellaneous-anchors/sepl-19-miscellaneous-anchor-flat-hook-bar-render-red.jpg",
      "/images/products/sepl-19-miscellaneous-anchors/sepl-19-miscellaneous-anchor-z-wire-render-yellow.jpg",
      "/images/products/sepl-19-miscellaneous-anchors/sepl-19-miscellaneous-anchor-corrugated-y-render-red.jpg",
      "/images/products/sepl-19-miscellaneous-anchors/sepl-19-miscellaneous-anchor-corrugated-y-clip-render-red.jpg",
      "/images/products/sepl-19-miscellaneous-anchors/sepl-19-miscellaneous-anchor-corrugated-y-render-blue.jpg"
    ]
  },
  {
    "code": "SEPL-20",
    "slug": "sepl-20-dual-pin-anchors",
    "name": "Dual Pin Anchors",
    "lining": "double",
    "section": "round",
    "comingSoon": false,
    "description": [
      {
        "type": "paragraph",
        "text": "The Dual pin anchor is round shaped refractory anchors used in application in backup layer. They are cost effective and versatile. They can be manufactured straight or corrugated for light to medium density refractories. They can be hand welded, bolted or hooked and stud welded to the plate."
      }
    ],
    "alloys": [
      {
        "form": "wire",
        "grades": [
          "CS",
          "304",
          "304H",
          "309",
          "253MA",
          "310S",
          "314",
          "316",
          "321",
          "330",
          "800",
          "601"
        ]
      }
    ],
    "alloyTable": [],
    "material": null,
    "images": [
      "/images/products/sepl-20-dual-pin-anchors/sepl-20-dual-pin-anchor-corrugated-stainless-steel-render.jpg",
      "/images/products/sepl-20-dual-pin-anchors/sepl-20-dual-pin-anchor-corrugated-single-render.jpg",
      "/images/products/sepl-20-dual-pin-anchors/sepl-20-dual-pin-anchor-corrugated-double-render.jpg",
      "/images/products/sepl-20-dual-pin-anchors/sepl-20-dual-pin-anchor-corrugated-long-render.jpg",
      "/images/products/sepl-20-dual-pin-anchors/sepl-20-dual-pin-anchor-straight-l-render.jpg",
      "/images/products/sepl-20-dual-pin-anchors/sepl-20-dual-pin-anchor-straight-pins-render.jpg",
      "/images/products/sepl-20-dual-pin-anchors/sepl-20-dual-pin-anchor-u-loop-render.jpg",
      "/images/products/sepl-20-dual-pin-anchors/sepl-20-dual-pin-anchor-straight-l-drawing.jpg",
      "/images/products/sepl-20-dual-pin-anchors/sepl-20-dual-pin-anchor-corrugated-l-drawing.jpg",
      "/images/products/sepl-20-dual-pin-anchors/sepl-20-dual-pin-anchor-corrugated-l-40mm-drawing.jpg"
    ]
  },
  {
    "code": "SEPL-21",
    "slug": "sepl-21-v-anchor-with-nut",
    "name": "V Anchor with Nut",
    "lining": "double",
    "section": "round",
    "comingSoon": false,
    "description": [
      {
        "type": "paragraph",
        "text": "This system is a V shaped refractory anchor welded onto a nut, which makes it suitable for screw on a concrete backup lining. All most all anchors can be welded onto different sizes of nuts."
      }
    ],
    "alloys": [
      {
        "form": "wire",
        "grades": [
          "CS",
          "304",
          "304H",
          "309",
          "253MA",
          "310S",
          "314",
          "316",
          "321",
          "330"
        ]
      }
    ],
    "alloyTable": [],
    "material": null,
    "images": [
      "/images/products/sepl-21-v-anchor-with-nut/sepl-21-v-anchor-with-nut-corrugated-render-blue.jpg",
      "/images/products/sepl-21-v-anchor-with-nut/sepl-21-v-anchor-with-nut-v-render-purple.jpg",
      "/images/products/sepl-21-v-anchor-with-nut/sepl-21-v-anchor-with-nut-closeup-render.jpg",
      "/images/products/sepl-21-v-anchor-with-nut/sepl-21-v-anchor-with-nut-threaded-stud-render.jpg",
      "/images/products/sepl-21-v-anchor-with-nut/sepl-21-v-anchors-with-nut-stainless-steel-group-render.jpg",
      "/images/products/sepl-21-v-anchor-with-nut/sepl-21-v-anchor-with-nut-wide-v-drawing.jpg",
      "/images/products/sepl-21-v-anchor-with-nut/sepl-21-v-anchor-with-nut-corrugated-drawing.jpg",
      "/images/products/sepl-21-v-anchor-with-nut/sepl-21-v-anchor-with-nut-twisted-drawing.jpg",
      "/images/products/sepl-21-v-anchor-with-nut/sepl-21-v-anchor-with-nut-straight-drawing.jpg",
      "/images/products/sepl-21-v-anchor-with-nut/sepl-21-v-anchor-with-nut-corrugated-tips-drawing.jpg"
    ]
  },
  {
    "code": "SEPL-22",
    "slug": "sepl-22-screw-on-anchors",
    "name": "Screw-on Anchors",
    "lining": "double",
    "section": "round",
    "comingSoon": false,
    "description": [
      {
        "type": "paragraph",
        "text": "This type of refractory anchors is called screw on anchors. The advantage of these anchors is fast installations, low cost and quickly available."
      }
    ],
    "alloys": [
      {
        "form": "wire",
        "grades": [
          "CS",
          "304",
          "304H",
          "309",
          "253MA",
          "310S",
          "314",
          "316",
          "321",
          "330",
          "800",
          "601"
        ]
      }
    ],
    "alloyTable": [],
    "material": null,
    "images": [
      "/images/products/sepl-22-screw-on-anchors/sepl-22-screw-on-anchor-stainless-steel-render.jpg"
    ]
  },
  {
    "code": "SEPL-23",
    "slug": "sepl-23-slit-stud-anchors",
    "name": "Slit Stud Anchors",
    "lining": "double",
    "section": "round",
    "comingSoon": false,
    "description": [
      {
        "type": "paragraph",
        "text": "The Slit Studs are very convenient and cost effective anchors for light weight concretes and are suitable for Rapid Arc Welding."
      }
    ],
    "alloys": [
      {
        "form": "wire",
        "grades": [
          "CS",
          "304",
          "304H",
          "309",
          "253MA",
          "310S",
          "314",
          "316",
          "321",
          "330",
          "800",
          "601"
        ]
      }
    ],
    "alloyTable": [],
    "material": null,
    "images": [
      "/images/products/sepl-23-slit-stud-anchors/sepl-23-slit-stud-anchors-stainless-steel-render.jpg",
      "/images/products/sepl-23-slit-stud-anchors/sepl-23-slit-stud-anchor-plain-drawing.jpg",
      "/images/products/sepl-23-slit-stud-anchors/sepl-23-slit-stud-anchor-threaded-drawing.jpg",
      "/images/products/sepl-23-slit-stud-anchors/sepl-23-slit-stud-anchor-weld-end-drawing.jpg"
    ]
  },
  {
    "code": "SEPL-24",
    "slug": "sepl-24-fiber-stud-anchors",
    "name": "Fiber Stud Anchors",
    "lining": "ceramic",
    "section": "round",
    "comingSoon": false,
    "description": [
      {
        "type": "paragraph",
        "text": "SEPL-24 Fiber Stud Anchors are the primary mechanical fixing used to secure ceramic fiber blanket and module linings against the inner face of furnace shells, fired heater walls, and process vessel casings. The anchor is a cylindrical stud — round in cross-section, dimensionally stable under repeated thermal cycling — that is stud-welded directly to the shell plate in a single arc discharge. No pre-drilling, no threading, no bolts. The result is a fast, consistent, high-density anchor array that holds multiple layers of ceramic fiber insulation firmly against the hot-face without the fibre sagging, peeling, or blowing off under operating draft and pressure fluctuations."
      },
      {
        "type": "paragraph",
        "text": "Each SEPL-24 stud is used in combination with a ceramic ferrule washer that clips onto the exposed stud tip after the fiber layers have been threaded on. The ceramic body of the ferrule breaks the thermal conduction path between the hot-face fiber and the metal stud, eliminating heat-bridging at the anchor point — a problem that causes localised hot spots on the outer shell and accelerates shell corrosion when left unaddressed."
      },
      {
        "type": "paragraph",
        "text": "SEPL-24 Fiber Stud Anchors are drawn and machined from wire rod in the following alloys. Grade selection depends on furnace operating temperature, hot-face atmosphere (oxidising, reducing, carburising, sulphidising), and service life requirement."
      },
      {
        "type": "paragraph",
        "text": "Custom alloys including Alloy 601, Haynes 230, and other high-performance grades are available on request. Contact our technical team with your operating conditions for a grade recommendation."
      },
      {
        "type": "paragraph",
        "text": "The complete SEPL-24 ceramic fiber lining system operates in the following sequence:"
      },
      {
        "type": "list",
        "items": [
          "Shell preparation: The furnace shell or steel casing is cleaned to bare metal in the anchor zones. A stud welding layout is marked based on the anchor pattern density required (typically 400–900 studs/m² depending on blanket weight and operating conditions).",
          "Stud welding: Each SEPL-24 stud is loaded into a stud welding gun. The gun is positioned against the shell, fired, and the stud is welded in under one second via a drawn arc. The weld is full-penetration — the stud becomes an integral part of the shell, not a surface attachment. No special tooling or shell penetration is required.",
          "Fiber impalement: Ceramic fiber blanket strips or pre-cut modules are pierced over the stud array, layer by layer, until the required insulation thickness is achieved. The stud holds the layers in alignment and prevents the blanket from sagging before the ferrule is fitted.",
          "Ferrule fitting: A ceramic ferrule washer is pushed over the stud tip and seated against the outer face of the last fiber layer, locking everything in compression. The ceramic body insulates the metal stud from peak hot-face temperatures and acts as the mechanical retainer for the entire fiber stack.",
          "Optional plastic cap: During transport and construction phases, a plastic cap can be fitted over each stud to protect personnel and the stud tip from damage before the fiber layers are installed."
        ]
      }
    ],
    "alloys": [],
    "alloyTable": [
      {
        "grade": "CS (Carbon Steel)",
        "maxTemp": "Up to 450 °C",
        "use": "Low-temperature insulation, ambient-side anchors"
      },
      {
        "grade": "SS 304 / 304H",
        "maxTemp": "Up to 800 °C",
        "use": "General-purpose medium temperature, non-aggressive atmospheres"
      },
      {
        "grade": "SS 309",
        "maxTemp": "Up to 980 °C",
        "use": "Oxidising atmospheres; intermittent high-temperature cycling"
      },
      {
        "grade": "SS 310S / 314",
        "maxTemp": "Up to 1050 °C",
        "use": "Fired heaters, reformer radiant sections, standard ceramic fiber installations"
      },
      {
        "grade": "253MA",
        "maxTemp": "Up to 1100 °C",
        "use": "High-temperature oxidising service with excellent creep resistance"
      },
      {
        "grade": "SS 316 / 321",
        "maxTemp": "Up to 850 °C",
        "use": "Corrosive or mildly reducing process atmospheres"
      },
      {
        "grade": "SS 330",
        "maxTemp": "Up to 1050 °C",
        "use": "Carburising atmospheres — petrochemical crackers, carbonising furnaces"
      },
      {
        "grade": "Inconel 600 (Alloy 600)",
        "maxTemp": "Up to 1150 °C",
        "use": "High-temperature reformers, ethylene crackers, severe oxidising service"
      },
      {
        "grade": "Incoloy 800 / 800H",
        "maxTemp": "Up to 1150 °C",
        "use": "High-temperature applications with creep loading; hydrogen service"
      }
    ],
    "material": null,
    "images": [
      "/images/products/sepl-24-fiber-stud-anchors/sepl-24-fiber-stud-anchor-threaded-pins-stainless-steel.jpg",
      "/images/products/sepl-24-fiber-stud-anchors/sepl-24-fiber-stud-anchor-l-pin-stainless-steel.jpg",
      "/images/products/sepl-24-fiber-stud-anchors/sepl-24-fiber-stud-anchor-speed-washers-assortment.jpg"
    ]
  },
  {
    "code": "SEPL-25",
    "slug": "sepl-25-threaded-studs",
    "name": "Threaded Studs",
    "lining": "ceramic",
    "section": "round",
    "comingSoon": false,
    "description": [
      {
        "type": "paragraph",
        "text": "SEPL-25 Threaded Studs are used where the anchor needs to penetrate through pre-formed ceramic fiber modules rather than loose blanket. Two shaft variants are available: smooth shaft studs for standard blanket-stack installations and corrugated shaft studs where the undulating surface creates mechanical interlock with the surrounding fiber, reducing the risk of pullout under vibration or pressure surge."
      },
      {
        "type": "paragraph",
        "text": "The knurled tip at the exposed end provides additional grip on the ceramic ferrule washer, preventing it from riding up or spinning loose during operation. Studs are available in both bolt-on (threaded into a pre-welded base nut) and weld-on configurations, making them suited to both new construction and maintenance retrofits where shell access is limited."
      },
      {
        "type": "list",
        "items": [
          "Variants: Smooth shaft, corrugated shaft, knurled-tip",
          "Fixing method: Bolt-on (M10, M12, M16 thread) or stud-welded",
          "Alloys: SS304, SS310, Inconel 600",
          "Applications: Ceramic fiber module installations, FCC unit risers, boiler duct linings, cement preheater cyclones"
        ]
      }
    ],
    "alloys": [
      {
        "form": "general",
        "grades": [
          "304",
          "304L",
          "309",
          "309S",
          "310",
          "310S",
          "316",
          "316L",
          "321",
          "321H",
          "347",
          "347H",
          "446",
          "253MA",
          "601",
          "800",
          "800H/HT",
          "C22",
          "C276"
        ]
      }
    ],
    "alloyTable": [],
    "material": null,
    "images": [
      "/images/products/sepl-25-threaded-studs/sepl-25-threaded-stud-speed-washers-assortment.jpg",
      "/images/products/sepl-25-threaded-studs/sepl-25-threaded-stud-short-render.jpg",
      "/images/products/sepl-25-threaded-studs/sepl-25-threaded-studs-assorted-lengths.jpg",
      "/images/products/sepl-25-threaded-studs/sepl-25-threaded-stud-notched-pin.jpg",
      "/images/products/sepl-25-threaded-studs/sepl-25-threaded-stud-long-pin.jpg"
    ]
  },
  {
    "code": "SEPL-26",
    "slug": "sepl-26-ceramic-ferrule-washers",
    "name": "Ceramic Ferrule Washers",
    "lining": "ceramic",
    "section": "ceramic",
    "comingSoon": true,
    "description": [],
    "alloys": [],
    "alloyTable": [],
    "material": "High-alumina ceramic (Al₂O₃ ≥ 60%)",
    "images": [
      "/images/products/sepl-26-ceramic-ferrule-washers/sepl-26-ceramic-ferrules-and-washers.jpg"
    ]
  },
  {
    "code": "SEPL-27",
    "slug": "sepl-27-melt-extract-needles",
    "name": "Melt Extract Needles",
    "lining": "fibres",
    "section": "round",
    "comingSoon": false,
    "description": [
      {
        "type": "paragraph",
        "text": "Melt extract needles are the most commonly used fibres in the refractory industry, because they are widely accepted and economical. They are offered in wide range of alloys, length and diameters. They have the ability to flow easily through hoses."
      },
      {
        "type": "paragraph",
        "text": "Here are the benefits of reinforcement fibres:"
      },
      {
        "type": "list",
        "items": [
          "High resistance to thermal shocks",
          "Flexible crack limitation",
          "High resistance against bursting",
          "High resistance against vibration",
          "Increased support strength for monolithic cross section"
        ]
      }
    ],
    "alloys": [
      {
        "form": "general",
        "grades": [
          "304",
          "310",
          "446"
        ]
      }
    ],
    "alloyTable": [],
    "material": null,
    "images": [
      "/images/products/sepl-27-melt-extract-needles/sepl-27-melt-extract-stainless-steel-fibres-pile.jpg",
      "/images/products/sepl-27-melt-extract-needles/sepl-27-melt-extract-stainless-steel-fibres-closeup.jpg"
    ]
  },
  {
    "code": "SEPL-28",
    "slug": "sepl-28-cold-drawn-needles-straight",
    "name": "Cold Drawn Needles (Straight)",
    "lining": "fibres",
    "section": "round",
    "comingSoon": false,
    "description": [
      {
        "type": "paragraph",
        "text": "Cold drawn needles are famous for their strength due to the process of cold drawn. Stainless steel cannot be hardened by thermal process such as heat treatment therefore cold drawn process is the solution. They are made from cutting and can be easily integrated with the material. They are widely used in the following sizes: Length- 25-35mm, Diameter- 0.3 to 0.7mm, tensile strength- greater than 650Mpa."
      },
      {
        "type": "paragraph",
        "text": "Here are the benefits of reinforcement fibres:"
      },
      {
        "type": "list",
        "items": [
          "High resistance to thermal shocks",
          "Flexible crack limitation",
          "High resistance against bursting",
          "High resistance against vibration",
          "Increased support strength for monolithic cross section"
        ]
      }
    ],
    "alloys": [],
    "alloyTable": [],
    "material": null,
    "images": [
      "/images/products/sepl-28-cold-drawn-needles-straight/sepl-28-cold-drawn-straight-steel-fibres.jpg",
      "/images/products/sepl-28-cold-drawn-needles-straight/sepl-28-cold-drawn-straight-steel-fibres-pile.jpg"
    ]
  },
  {
    "code": "SEPL-29",
    "slug": "sepl-29-cold-drawn-needles-hooked",
    "name": "Cold Drawn Needles (Hooked)",
    "lining": "fibres",
    "section": "round",
    "comingSoon": false,
    "description": [
      {
        "type": "paragraph",
        "text": "Steel fiber with hooked ends are made using high quality low carbon steel wire. This insures good toughness and low pricing."
      },
      {
        "type": "paragraph",
        "text": "Here are the benefits of reinforcement fibres:"
      },
      {
        "type": "list",
        "items": [
          "High resistance to thermal shocks",
          "Flexible crack limitation",
          "High resistance against bursting",
          "High resistance against vibration",
          "Increased support strength for monolithic cross section"
        ]
      }
    ],
    "alloys": [],
    "alloyTable": [],
    "material": null,
    "images": [
      "/images/products/sepl-29-cold-drawn-needles-hooked/sepl-29-cold-drawn-hooked-steel-fibres-closeup.jpg",
      "/images/products/sepl-29-cold-drawn-needles-hooked/sepl-29-cold-drawn-hooked-steel-fibres-row.jpg"
    ]
  },
  {
    "code": "SEPL-30",
    "slug": "sepl-30-cold-drawn-needles-wavy",
    "name": "Cold Drawn Needles (Wavy)",
    "lining": "fibres",
    "section": "round",
    "comingSoon": false,
    "description": [
      {
        "type": "paragraph",
        "text": "These fibres have the same characteristics as the above needle only that they are corrugated to give the highest strength to the refractories."
      },
      {
        "type": "paragraph",
        "text": "Here are the benefits of reinforcement fibres:"
      },
      {
        "type": "list",
        "items": [
          "High resistance to thermal shocks",
          "Flexible crack limitation",
          "High resistance against bursting",
          "High resistance against vibration",
          "Increased support strength for monolithic cross section"
        ]
      }
    ],
    "alloys": [],
    "alloyTable": [],
    "material": null,
    "images": [
      "/images/products/sepl-30-cold-drawn-needles-wavy/sepl-30-cold-drawn-wavy-steel-fibres-closeup.jpg",
      "/images/products/sepl-30-cold-drawn-needles-wavy/sepl-30-cold-drawn-wavy-steel-fibres-pile.jpg"
    ]
  },
  {
    "code": null,
    "slug": "washers",
    "name": "Washers, Plates & Mounting Clips",
    "lining": "washers",
    "section": "flat",
    "comingSoon": false,
    "description": [
      {
        "type": "paragraph",
        "text": "Santura engineering can provide many types of washers, plates and clips for refractory anchors and general application."
      },
      {
        "type": "paragraph",
        "text": "We can make round and square rings (with and without threads), rectangular rings, threaded rectangular ring and mounting clips which can be pushed over studs to hold the linings in place during installation."
      }
    ],
    "alloys": [
      {
        "form": "general",
        "grades": [
          "CS",
          "304",
          "304L",
          "309",
          "309S",
          "310",
          "310S",
          "316",
          "316L",
          "321",
          "321H",
          "347",
          "347H",
          "446",
          "253MA",
          "800",
          "601"
        ]
      }
    ],
    "alloyTable": [],
    "material": null,
    "images": [
      "/images/products/washers/anchor-washer-round-render-magenta.jpg",
      "/images/products/washers/anchor-washer-u-clip-render-blue.jpg",
      "/images/products/washers/anchor-washer-slotted-clip-render-red.jpg",
      "/images/products/washers/anchor-washer-speed-dome-render-blue.jpg",
      "/images/products/washers/anchor-washer-square-render-orange.jpg",
      "/images/products/washers/anchor-washer-clip-render-green.jpg",
      "/images/products/washers/anchor-washer-flat-ring-render-orange.jpg",
      "/images/products/washers/anchor-washer-speed-washers-stainless-steel-render.jpg",
      "/images/products/washers/anchor-washers-brass-hex-and-round.jpg",
      "/images/products/washers/anchor-washers-speed-assortment-photo.jpg"
    ]
  }
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function productTitle(p: Product): string {
  return p.code ? `${p.code} ${p.name}` : p.name;
}
