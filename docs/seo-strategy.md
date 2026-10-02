# SEO Strategy — Phase 1 Discovery

Reference for every page build, meta tag and country landing page. Company facts and verified references: see `docs/dev-reference.md`.

Confirmed facts to use in copy: founded 1980 · exports to 25+ countries · ISO 9001:2015 certified (URS, UKAS accredited, certificate 136802/A/0001/UK/En, valid to 26 June 2027) · Linde Engineering India approved supplier. Not to use: EEPC membership (awaiting renewal), testimonials or ratings.

## Target Countries (Phase 1)

16 landing pages, 14 countries, 10 languages.

### Category A: English-Primary Pages (local language for nav/CTA/trust only)

| Country | Locale | Primary Keywords | Notes |
|---------|--------|-----------------|-------|
| UAE | ar-AE | refractory anchor manufacturer, castable anchor, ceramic fiber anchors | Verified client: Saudi Refractory Industries Co ⚠ see Note 1 |
| Saudi Arabia | ar-SA | refractory anchors, refractory anchor design, castable anchor, ceramic anchors | Highest CPC ($1.01), Aramco-spec demand |
| Germany | de-DE | refractory anchors, anchor for refractory | 34 Ahrefs variants, buyers search English |
| Turkiye | tr-TR | refractory anchors, refractory anchor spacing | Highest ad competition, $0.67 CPC |
| Brazil | pt-BR | refractory anchors, anchors for refractory, customized refractory anchors | 57 Ahrefs variants (highest), buyers search English |
| Netherlands | nl-NL | refractory anchors, anchor for refractory | Competitor "Silicon Refractory Anchoring Systems" dominates (260 searches) |
| Italy | it-IT | anchors for refractory, anchors refractory | 29 variants |
| France | fr-FR | anchor for refractory, anchor refractory | 26 variants |
| Poland | pl-PL | refractory anchors | Low volume, build for completeness |
| Belgium (NL) | nl-BE | refractory anchors | Smallest market (6 variants) |
| Belgium (FR) | fr-BE | refractory anchors | Trust page for Walloon region |

### Category B: Full Local Language Pages

| Country | Locale | Primary Keywords | Notes |
|---------|--------|-----------------|-------|
| Spain | es-ES | anclajes refractarios, anclas refractarias, anclajes para refractario | Only market with real Spanish volume |
| Mexico | es-MX | anclajes refractarios, anclajes para refractario | CEMEX relationship ⚠ see Note 2 |

### Category C: English with Regional Content

| Country | Locale | Primary Keywords | Notes |
|---------|--------|-----------------|-------|
| UK | en-GB | refractory anchors, ceramic anchors refractory, stainless steel refractory anchors, refractory anchor types | 92 variants, 230 total volume (highest) |
| Canada (EN) | en-CA | ceramic refractory anchors, refractory v anchors, stainless steel refractory anchors | 81 variants, 250 total volume |
| Canada (FR) | fr-CA | ancrage refractaire | Low volume, trust page for Quebec |

## Phase 2 Countries (build after Phase 1 ranks)

United States, Kuwait, Qatar, Oman, Bahrain, Austria, Czechia, Sweden, Finland, Norway

## Phase 3 Countries (expansion)

Chile, Peru, Argentina, Colombia, Romania, Greece, Portugal, Denmark, Switzerland, Iceland

## Cross-Country Keywords (build as standalone pages, not country-specific)

These terms appear across multiple countries and should be separate product/comparison pages:

- castable anchor (SA, UAE, UK, CA: 10-100 each)
- ceramic refractory anchors (UK 20, CA 40)
- ceramic fiber anchors (SA, UAE, UK, CA: 10-100 each)
- stainless steel refractory anchors (UK 20, CA 20)
- refractory anchor types (UK 20, CA 20)
- refractory v anchors (CA 20)
- refractory anchor design (SA 30)
- refractory anchor Aramco standard drawing (SA, low but high intent)

## Secondary Products Keywords (Tier 1 only, build after core anchor pages)

| Product | Primary Keyword | Global Volume | Priority |
|---------|----------------|---------------|----------|
| Insulation Pins | insulation pins | 1k-10k | High |
| Steel Fibres | stainless steel fibres | 100-1k | High |
| B7 Studs | b7 studs | 100-1k | Medium |
| Foundation Bolts | foundation bolts manufacturer | 100-1k | Medium (India-heavy) |

## SEO Rules for Every Page

1. Meta title format: [Product/Topic] | [Country if country page] | Santura Engineering
2. Meta description: under 155 chars, include primary keyword and "manufacturer" or "supplier"
3. H1: one per page, includes primary keyword
4. Hreflang: self-referencing canonical + alternates for all 16 locale versions ⚠ see Note 3
5. Schema: Product schema on product pages, Organization on about, FAQ where applicable, BreadcrumbList on all
6. Internal linking: every product page links to relevant country pages and vice versa
7. Images: alt text includes product name + "refractory anchor" + alloy if applicable
8. No hidden text, no keyword stuffing, no fake reviews, no unverified star ratings
9. Country pages: unique content per country (industries, regions, ports, terminology), NOT name-swapped copies
10. English technical content for Category A countries, local language only for nav/CTA/intro/footer

## Content NOT to Carry Over from Old Site

- Hidden keyword blocks (106 pages)
- Fake star rating schema (14 pages)
- All testimonials and reviews (fake; client will supply real client certificates later)
- Expired certifications (old ISO 116251/A/0001/UK/En, EEPC 2015); use current ISO 9001:2015 certificate 136802/A/0001/UK/En, valid to 26 June 2027
- Contradictory founding year claims (use 1980)
- "50+ countries" and other conflicting counts (use "25+ countries")

## Notes to Resolve

1. **UAE row client:** Saudi Refractory Industries Co is in Al-Khobar, Saudi Arabia (shipping document: P.O. Box 30315, Al-Khobar 31952). It belongs on the Saudi Arabia page. No verified UAE client exists in the reference data.
2. **Mexico row CEMEX:** verified CEMEX supply is Croatia, Spain (Planta de Alcanar) and Czech Republic. No CEMEX Mexico supply is documented. Do not state a Mexico project unless the client confirms one.
3. **Hreflang scope:** the 16 locale codes apply to the country landing pages. Product, guide and industry pages exist in the 10 site languages (`en`, `ar`, `de`, `tr`, `pt-BR`, `es`, `it`, `fr`, `pl`, `nl`) and carry those 10 alternates plus `x-default`. Only pages that are true equivalents should share a hreflang set.
