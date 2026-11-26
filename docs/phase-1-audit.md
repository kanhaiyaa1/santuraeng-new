# Phase 1 Audit: Santura Engineering website

Audit date: 26 November 2026. Read-only audit. No code, content, configuration or rules were changed. This report is the only file the audit created.

**Method:**
- **Build:** a production build (`npm run build`), served locally with `next start`.
- **Crawl:** every sitemap URL plus the noindex pages (750 URLs), checking status, title, description, robots, canonical, hreflang, JSON-LD, images, links and H1.
- **Browser checks** (Playwright): RTL, the language switcher, the mega menu and layout at 375 px.
- **Lighthouse:** run on the homepage. Google PageSpeed Insights was unavailable because its daily quota was exhausted.
- **Supabase:** read-only REST probes with the public anon key. No form was submitted, to avoid writing to the live database.
- **External links and staging:** checked with `curl`.

The brief's assumptions differ from the build in four places. The build is what was audited:

| Brief says | Actual build |
|---|---|
| Country URLs such as `/ae`, `/sa`, `/de-de` | `/uae`, `/saudi-arabia`, `/germany` and so on: 14 country slugs, each served in all 10 locales (140 URLs). The "16 pages" are 14 countries plus the second-language versions of Canada (`/fr/canada`) and Belgium (`/fr/belgium`, `/nl/belgium`), with regional hreflang (`fr-CA`, `fr-BE`, `nl-BE`). |
| Locale `pt` | `pt-BR` |
| "Steel Fibres needs to be added to product-categories.ts" | Already added and built |
| "Dark navy colour scheme still in place" | The site uses a light palette. `tailwind.config.ts` says "Light industrial palette (client-approved). No navy or dark section backgrounds." |

---

## Executive summary

Of the 170 checklist items:
- **131 (77%) are done**
- 20 (12%) are partly done
- 19 (11%) are missing

Counting partial items as half, the site is about 83% complete.

**What's ready:**
- **Pages:** every planned core, product, category, service and country page is built with real content. All 754 static pages build without errors, and every crawled URL returns 200.
- **SEO basics:** metadata, canonical/hreflang, sitemap and structured data are solid.
- **Translations:** complete in all 10 locales.
- **Content facts:** ISO details, founding year, contact details and supplier-only wording are correct, and no fake reviews remain.

**What blocks launch** is mostly migration and compliance infrastructure, not page content:
- no `robots.txt`
- none of the 140 documented 301 redirects are implemented
- no GA4 or Search Console, and the old site's Google verification file isn't carried over
- no cookie consent, and the Google Map loads without consent
- form submissions go only to Supabase, with no email alert in the code
- staging runs an older version, with 119 uncommitted local changes

**Estimated work remaining:**
- critical blockers: about 4–6 developer days
- important gaps: about 5–8 days, plus translation review
- the Phase 2 pages (industries, calculator, guides): about 2–3 weeks

---

## Scorecard

| Section | Total items | ✅ Done | ⚠️ Partial | ❌ Missing | % Complete |
|---|---|---|---|---|---|
| 1. Pages inventory | 81 | 75 | 2 | 4 | 93% |
| 2. SEO infrastructure | 22 | 18 | 2 | 2 | 82% |
| 3. Technical infrastructure | 24 | 12 | 6 | 6 | 50% |
| 4. Content quality | 29 | 22 | 6 | 1 | 76% |
| 5. Pre-launch checklist | 14 | 4 | 4 | 6 | 29% |
| **Total** | **170** | **131** | **20** | **19** | **77%** |

Section 1 counts each of the 30 SEPL products and 18 categories as separate items, which raises its percentage.

---

## Critical blockers (must fix before launch)

1. **No `robots.txt`.** There's no `app/robots.ts` and no `public/robots.txt`, so `/robots.txt` returns 404 locally and on staging. Search engines get no sitemap pointer.
2. **301 redirects not implemented.**
   - The old-to-new map exists in `docs/dev-reference.md` (from line 1437): 140 rows covering 132 of the 133 old `.html` pages.
   - None of them is in `next.config.mjs`, so every old URL will return 404 after the domain switch.
   - 29 targets don't exist on the new site: `/industries/*`, `/guides/*`, `/tools/anchor-weight-calculator`, `/about/why-santura`, `/qatar`, `/usa`, `/india`, `/europe` and several `/products/*` pages.
3. **No analytics or Search Console.**
   - There's no GA4 tag (`G-M42MQPQFHB`), no `santura_website_enquiry` event and no Search Console verification.
   - The old site's verification file, `google0d0cee0266be8570.html`, isn't in the new `public/`, so verification is lost at migration.
4. **EU compliance.**
   - There's no cookie consent banner.
   - The Contact page's Google Maps iframe loads automatically (lazy-loaded) instead of click-to-load.
5. **No lead notification.**
   - The RFQ and Contact forms insert rows into Supabase from the browser.
   - Nothing in the code emails Santura when a lead arrives.
   - Unless a Supabase trigger or webhook exists, which isn't in the repo, enquiries can go unseen.
   - The forms weren't live-tested in this audit, to avoid writing test rows.
6. **Staging is out of date.**
   - `santuraeng-new.vercel.app` is up, and its health check returns 200, but it serves an older version: `/images/media-library/…` and `/documents/certificates/…` return 404.
   - 119 local changes are uncommitted.
   - Staging has no noindex. Its canonicals point to santuraeng.com, which limits but doesn't remove the duplicate-content risk.

## Important gaps (should fix before launch)

1. **Long titles.**
   - 291 of 750 pages have titles over 60 characters.
   - All 14 country pages are 72–97 characters, for example "Refractory Anchors Manufacturer & Supplier | United Arab Emirates | Santura Engineering".
   - Category and service pages run 61–92 characters.
2. **Orphaned country pages.** 124 of the 140 country URLs have no internal link anywhere on the site and are reachable only through the sitemap. Only `/canada` and `/united-kingdom` are linked, from two category pages.
3. **Mobile overflow at 375 px.**
   - All 14 country pages (506 px wide) and SEPL-24 (538 px) scroll sideways.
   - On country pages the cause is the "Shipping from Mumbai" grid column (no `min-w-0`) stretching to its table.
   - On SEPL-24 it's the product header column.
4. **Homepage performance** (local Lighthouse, indicative):
   - Mobile: performance 50, accessibility 99, best practices 96, SEO 92. Desktop: performance 66.
   - The 5.5 s Total Blocking Time is mostly "Unattributable" main-thread time, so the local machine probably distorted it. Re-run PageSpeed Insights on the deployed site.
   - The 24 client `.webp` originals are 2.5–4.4 MB each. `next/image` resizes them, but they slow first optimisation and add weight to the repository.
   - There's no favicon, so `/favicon.ico` returns 404.
5. **Translation depth.**
   - All 10 locale files have the same 3,795 keys, with no gaps or untranslated sentences. The docs don't record whether the 9 non-English locales were reviewed by native speakers.
   - SEPL product descriptions (`content/products.ts`) are English-only, so `/de/products/…` and `/ar/products/…` show English paragraphs.
   - Product page titles aren't localized (one title shared by all 10 locales).
6. **Placeholders still live:** SEPL-17 Round Y Anchors and SEPL-26 Ceramic Ferrule Washers are "coming soon" pages, correctly noindex and excluded from the sitemap.
7. **RFQ page** (`/rfq`, all locales) has no JSON-LD and no BreadcrumbList; it's the only inner page without them.
8. **Image rights.** Stock or supplier images need usage confirmation before launch; see 4B.
9. **Supabase RLS not verifiable.**
   - All three tables exist and answer the anon key, but anon `SELECT` returns 0 rows.
   - That fits RLS blocking reads, but it can't be told apart from empty tables without dashboard access.
   - Policies and table definitions aren't in the repo; the only migration is `health_check`.
10. **Mega menu not in the server HTML.**
    - The 18 category links appear only after hovering, so crawlers can't see them in the header.
    - Crawlers can still reach every category through `/products`, which links all 18.
11. **Decisions to confirm with the client:**
    - **Colour scheme:** the brief expects dark navy, but the code documents a client-approved light palette.
    - **Phone number:** the brief lists +91 98332 22326, but the site publishes only +91 99309 68116, per the client instruction recorded in `lib/site.ts`.

## Nice-to-haves (can launch without; Phase 2)

1. **New pages:** industry pages (`/industries/*`), the anchor weight calculator, the alloy comparison guide and the anchor selection guide.
   - The calculator's source exists at `reference/refractory-anchor-weight-calculator.html`.
   - They're also redirect targets. Until they're built, those redirects need temporary targets.
2. **Newsletter signup.** `components/NewsletterSignup.tsx` exists but isn't used on any page, and its text is hard-coded English.
3. **Footer links.** The footer has 12 links (pages, emails, phone); it has no product, service or country links.
4. **More internal links:**
   - Country pages link to 6 products each but to no service pages.
   - The Washers product page doesn't link to any other product.
5. **Alt text on country product cards.** On country pages the 82 product-card photos have `alt=""`. That's acceptable because the card link names the product, but descriptive alt text would add image SEO.
6. **Duplicate files.** 9 groups of byte-identical files are stored in two folders each (see `docs/image-inventory.md`, "Folder restructure").
7. **Brochure:** the client is still preparing the new product brochure.

---

## Full detailed results

### 1A. Core pages: all 10 locales

| Page | Status | Notes |
|---|---|---|
| Homepage | ✅ | 10/10 return 200 |
| About | ✅ | 10/10 |
| Contact | ✅ | 10/10 |
| Quality | ✅ | 10/10 |
| Privacy Policy | ✅ | 10/10 |
| Disclaimer | ✅ | 10/10 |
| Products listing | ✅ | 10/10; links all 18 categories |
| RFQ form | ✅ | 10/10; no JSON-LD/breadcrumb (see gap 7) |

8 × 10 = **80/80 URLs return 200**. `/refractory-anchors` (10 more URLs) is also built.

### 1B. Country landing pages

| Country (brief) | Actual URL | Status | Regional hreflang |
|---|---|---|---|
| UAE | `/uae` | ✅ | ar-AE |
| Saudi Arabia | `/saudi-arabia` | ✅ | ar-SA |
| Germany | `/germany` | ✅ | de-DE |
| Türkiye | `/turkiye` | ✅ | tr-TR |
| Brazil | `/brazil` | ✅ | pt-BR |
| Mexico | `/mexico` | ✅ | es-MX |
| Italy | `/italy` | ✅ | it-IT |
| France | `/france` | ✅ | fr-FR |
| Spain | `/spain` | ✅ | es-ES |
| Canada (EN) | `/canada` | ✅ | en-CA |
| Canada (FR) | `/fr/canada` (separately written Quebec version) | ✅ | fr-CA |
| Poland | `/poland` | ✅ | pl-PL |
| Belgium (NL) | `/nl/belgium` | ✅ | nl-BE |
| Belgium (FR) | `/fr/belgium` (separately written Wallonia version) | ✅ | fr-BE |
| Netherlands | `/netherlands` | ✅ | nl-NL |
| UK | `/united-kingdom` | ✅ | en-GB |

**Unique content:**
- Comparing every pair of country pages, two different countries share at most 18% of their 5-word phrases, mostly the common page frame. The median is 11%.
- Language versions of the same market share 38–40%.
- None is a name-swapped copy.

**hreflang:** 12–13 alternate tags per page: 10 languages, x-default, plus regional tags.

**Meta descriptions:**
- "since 1980" appears in 140/140 country descriptions.
- "25+ countries" appears in 138/140; the remaining 2 say it in the local language.
- In locales other than English and the country's main language, the description falls back to English. This follows the documented rule (seo-strategy rule 10).

**Titles:** all country-page titles are over 60 characters (see gap 1).

### 1C. Product pages (refractory anchors)

| Item | Status | Notes |
|---|---|---|
| SEPL-01 to 11, 13 to 16, 18 to 25, 27 to 30 (27 products) | ✅ | 10 locales each; Product + BreadcrumbList schema |
| Washers | ✅ | 10 locales |
| SEPL-12 | n/a | never used; correctly absent |
| SEPL-17 Round Y Anchors | ⚠️ | "coming soon" page, noindex, not in sitemap |
| SEPL-26 Ceramic Ferrule Washers | ⚠️ | "coming soon" page, noindex, not in sitemap (now has 3 photos) |

30 product slugs × 10 locales = **300 URLs, all return 200**. 280 are indexable.

### 1D. Product category pages

| # | Category | Status | Notes |
|---|---|---|---|
| 1 | Refractory Anchors (`/refractory-anchors`) | ✅ | links all 28 indexable product pages |
| 2 | Observation / Peep Doors | ✅ | 13 photos |
| 3 | Foundation Bolts | ✅ | |
| 4 | Support Plates | ✅ | real content; line drawings only, no photos |
| 5 | Industrial Stanchions | ✅ | |
| 6 | Pipe Guides & Sleeves | ✅ | |
| 7 | Counter-Weight Systems | ✅ | Linde certificate linked |
| 8 | Mineral Wool | ✅ | |
| 9 | Ceramic Gaskets | ✅ | |
| 10 | Glass Fibre Sheets | ✅ | |
| 11 | Calcium Silicate | ✅ | |
| 12 | Insulation Pins | ✅ | |
| 13 | Polystyrene Insulation | ✅ | |
| 14 | Polyisocyanurate Insulation | ✅ | |
| 15 | Fasteners | ✅ | supplier wording verified |
| 16 | Insulation Accessories | ✅ | |
| 17 | Steel Fibres | ✅ | in `product-categories.ts`; links SEPL-27 to 30 |
| 18 | Trading Division | ✅ | supplier/exporter wording verified |

All 18 have `hasContent: true`, Product + FAQPage + BreadcrumbList schema, and no noindex. Steel Plates was removed.

### 1E. Service pages

| Service | Status | Notes |
|---|---|---|
| Bright Solution Annealing | ✅ | Service + FAQPage schema |
| Pickling & Passivation | ✅ | |
| PMI Testing | ✅ | built, no longer a placeholder |
| Stud Welding / Gun Welding | ✅ | built, no longer a placeholder |
| Solution Annealing | ✅ | merged; `/services/solution-annealing` redirects (308) to Bright Solution Annealing in all locales |

### 1F. Pages not yet built

| Page | Status |
|---|---|
| Industry pages (`/industries/*`) | ❌ no route |
| Anchor Weight Calculator (`/tools/anchor-weight-calculator`) | ❌ no route; source HTML in `reference/` |
| Alloy Comparison Guide | ❌ no route |
| Anchor Selection Guide | ❌ no route |

### 2A. Meta tags

| Check | Status | Notes |
|---|---|---|
| Titles under 60 characters | ⚠️ | 459/750 pass; 291 are longer, the longest 97 characters (`/nl/uae`). No page lacks a title. |
| Meta descriptions under 155 characters, with "since 1980" / "25+" where appropriate | ✅ | 0 missing, 0 over 155 |
| No built page has noindex | ✅ | none |
| Placeholder pages have noindex | ✅ | exactly 3 page types: SEPL-17, SEPL-26 and `/search` (30 URLs) |

**Where "since 1980" and "25+" appear in descriptions:**
- all country, category and service pages, and the homepage
- not on SEPL product pages, `/products` or `/refractory-anchors`

**Duplicate titles:** `/disclaimer` and `/nl/disclaimer` share a title, as do `/es/disclaimer` and `/pt-BR/disclaimer`. Product titles are identical across all 10 locales.

### 2B. Hreflang and canonical

| Check | Status | Notes |
|---|---|---|
| Self-referencing canonical + hreflang (`lib/seo.ts`) | ✅ | every page; root canonical is `https://santuraeng.com` |
| x-default points to English | ✅ | all pages except noindex `/search` |
| Country pages have regional hreflang | ✅ | 12–13 tags each |
| Product pages: 10 languages + x-default | ✅ | 11 tags each |

### 2C. Sitemap

| Check | Status | Notes |
|---|---|---|
| `app/sitemap.ts` produces valid XML | ✅ | `/sitemap.xml` returns 200 |
| Total URLs | ✅ | 720: static 90, categories 170, products 280, services 40, countries 140 |
| No noindex pages in sitemap | ✅ | 0 |
| All built pages in sitemap | ✅ | 750 crawled − 30 noindex = 720 |

### 2D. Structured data

| Check | Status | Notes |
|---|---|---|
| Pages with JSON-LD | ✅ | all except `/rfq` |
| Homepage: Organization | ✅ | Organization + BreadcrumbList |
| Product pages: Product | ✅ | 300/300 |
| Country pages | ✅ | Organization + BreadcrumbList; no LocalBusiness (acceptable for an exporter) |
| FAQ schema where there's an FAQ | ✅ | all 18 category pages and 4 service pages |
| No fake review or rating schema | ✅ | no Review or AggregateRating anywhere |
| Breadcrumb on all inner pages | ⚠️ | missing only on `/rfq` |

### 2E. robots.txt

| Check | Status |
|---|---|
| Exists at `/robots.txt` | ❌ returns 404 locally and on staging |
| Points to sitemap | ❌ |
| Doesn't block important paths | ✅ nothing is blocked (no file) |

### 3A. Build and deploy

| Check | Status | Notes |
|---|---|---|
| Build succeeds, zero errors | ✅ | `npm run build` exit 0; lint and types passed |
| Static pages generated | ✅ | 754 |
| No TypeScript errors | ✅ | |
| Staging accessible | ⚠️ | 200 and healthy, but behind local; no noindex on staging |

### 3B. Supabase

| Check | Status | Notes |
|---|---|---|
| Tables `rfq_requests`, `newsletter_subscribers`, `contact_submissions` exist | ✅ | REST returns 200 for each |
| RLS policies set | ⚠️ | anon `SELECT` returns 0 rows (consistent with RLS); policies aren't in the repo |
| Project ID `muxlspfwnkxoctrsrxck` | ✅ | matches `.env.local` |
| Free-tier auto-pause risk | ✅ | `.github/workflows/keep-alive.yml` pings `/api/health` daily; the last 5 runs (21–25 Nov) succeeded |

### 3C. Forms

| Check | Status | Notes |
|---|---|---|
| RFQ form submits to Supabase | ⚠️ | correct insert into `rfq_requests`; not live-tested; no email notification in code |
| Contact form submits | ⚠️ | correct insert into `contact_submissions`; same caveats |
| Newsletter signup | ❌ | component exists but isn't used on any page; English-only strings |
| Validation | ✅ | HTML5 `required` and `type="email"` (RFQ: name, email, country; Contact: name, email, message) |
| Inline success messages | ✅ | inline `role="status"` / `role="alert"`, no redirect |

### 3D. Analytics

| Check | Status |
|---|---|
| GA4 `G-M42MQPQFHB` installed | ❌ no gtag or GA code |
| `santura_website_enquiry` event | ❌ |
| Google Search Console | ❌ no verification meta or file; old verification file not migrated |

### 3E. Compliance

| Check | Status | Notes |
|---|---|---|
| Cookie consent banner | ❌ | none |
| Google Map click-to-load | ❌ | iframe loads automatically (`loading="lazy"`) |
| Privacy policy in 10 languages | ✅ | 10/10 translated |
| No hidden keyword text | ✅ | only responsive `hidden` classes and 4 accessible `sr-only` labels |

### 3F. Performance

| Check | Status | Notes |
|---|---|---|
| Lighthouse 90+ performance / 90+ SEO | ⚠️ | local mobile: performance 50, SEO 92, accessibility 99, best practices 96; desktop: performance 66. Re-test on PageSpeed Insights. |
| All images via `next/image` with sizing | ✅ | no raw `<img>`; but the 24 client `.webp` originals are 2.5–4.4 MB |
| Render-blocking resources | ✅ | none flagged |
| Mobile at 375 px | ⚠️ | 150 pages tested (en + ar); 30 scroll sideways: all 14 country pages and SEPL-24, in both locales |

### 4A. Translations

| Check | Status | Notes |
|---|---|---|
| 10 locale files | ✅ | en, ar, de, tr, pt-BR, es, it, fr, pl, nl |
| English complete | ✅ | 3,795 keys |
| Arabic complete, RTL | ✅ | all keys; `dir="rtl"` on Arabic pages |
| Other 8 locales: quality | ⚠️ | complete with no English left in `messages/`; no record of native review; product descriptions English-only |
| Language switcher | ✅ | 10 options; keeps the current page (`/products/fasteners` → `/de/products/fasteners`) |
| RTL layout | ✅ | checked in earlier page tests at 390 px |

### 4B. Images

| Check | Status | Notes |
|---|---|---|
| No broken image references | ✅ | all 342 media paths in code resolve; no broken image on any crawled page |
| Descriptive alt text | ⚠️ | no image lacks an `alt` attribute. 417 of 499 empty alts on EN pages are gallery thumbnails inside labelled buttons (correct). 82 are decorative: country product cards, 3 service photos and the chrome banner. |
| SEO-friendly filenames | ✅ | none with uppercase, spaces, underscores or camera-style names |
| Categories with no photos | ⚠️ | Support Plates (line drawings only). Thin coverage: Polyisocyanurate (1 photo), SEPL-22 (1), B7 studs (1), SEPL-27 to 30 (2 each). |
| Images to confirm rights for | ⚠️ | see the list below |

Images whose usage rights need confirming:
- all 10 trading-division images (6 old-site mill photos, 2 stock photos, 2 banners)
- 8 home industry photos
- most fastener and insulation images (they look like supplier catalogue photos)
- some fabrication renders
- the media-library stock

See `docs/image-inventory.md`, "Supplier or stock photos".

### 4C. Internal linking

| Check | Status | Notes |
|---|---|---|
| Product pages link to related products | ✅ | all except Washers |
| Category pages link to child products | ✅ | `/refractory-anchors` → 28/28; Steel Fibres → SEPL-27 to 30 |
| Country pages link to products/services | ✅ | 6 products each; no service links |
| No orphan pages | ❌ | 124 of 140 country URLs have no inbound link; all other pages are linked |
| Mega menu has all 18 categories | ✅ | 18 categories plus 4 services, but only rendered on hover (not in server HTML) |
| Footer links complete | ⚠️ | 12 links: Home, About, Products, Quality, Contact, RFQ, Privacy, Disclaimer, 3 emails, phone; no categories, services or countries |

### 4D. External links

| Check | Status | Notes |
|---|---|---|
| TradeIndia linked | ✅ | Trading Division page, 10 locales |
| IndiaMART linked | ✅ | Trading Division page, 10 locales |
| `rel="noopener"` + `target="_blank"` | ✅ | all external links (WhatsApp, Maps, IndiaMART, TradeIndia) |
| No broken external links | ✅ | all 4 destinations return 200 |

### 4E. Content accuracy

| Check | Status | Notes |
|---|---|---|
| No "manufacturer" for fasteners | ✅ | title "Industrial Fasteners Supplier…"; "make/made" only refers to Santura's anchors, fibres and foundation bolts |
| No "manufacturer" for Trading Division | ✅ | "manufacturing" appears once, about Santura's own anchors and fibres |
| ISO 9001:2015 details | ✅ | cert 136802/A/0001/UK/En, URS, UKAS, valid to 26 June 2027, on 160 pages; no other ISO version mentioned. The certificate PDF is now at `public/documents/certificates/` but isn't linked. |
| Founding year 1980 | ✅ | no 2008 founding claim; 2008 appears only in the CIN registration code |
| No fake testimonials | ✅ | no Emaar, Gulf Marine Services or testimonial blocks |
| No fake ratings or review schema | ✅ | |
| Phone numbers on all pages | ⚠️ | +91 99309 68116 on all 750 pages; +91 98332 22326 on none (client instruction in `lib/site.ts`) |
| Email addresses | ✅ | enquiries@, nikhil.diwan@, shravandiwan@santura-eng.com on all 750 pages |

### 5A. 301 redirect map

| Check | Status | Notes |
|---|---|---|
| Redirect map exists | ✅ | `docs/dev-reference.md`, 140 rows (not created as a separate file) |
| Redirects implemented | ❌ | 0 of 140 in `next.config.mjs` |
| All old pages have a target | ⚠️ | 132 of 133 old `.html` pages mapped; the unmapped one is the Google verification file; 29 targets don't exist yet |

### 5B. Planned next builds

| Item | Status |
|---|---|
| Industry pages | ❌ |
| Anchor weight calculator | ❌ |
| Alloy comparison guide | ❌ |
| Anchor selection guide | ❌ |
| 301 redirect map | ⚠️ documented, not implemented |
| GA4 + Search Console | ❌ |

### 5C. Items from the November client meeting

| Item | Status | Notes |
|---|---|---|
| 24 client `.webp` photos placed | ✅ | all 24 used (About gallery, Quality, country shipping sections, homepage hero, service pages); moved out of `miscellaneous/` into shipping, testing, company and products/general |
| Updated certificate checked | ✅ | the current ISO certificate matches the site's details |
| Dark navy colour scheme | ⚠️ | not in place: the site uses the light palette documented as client-approved; confirm which decision stands |
| Client names (CEMEX, Saudi Refractory, Linde) shown | ✅ | CEMEX on European country pages; Saudi Refractory and Linde in trust content; Linde certificate linked |
| New product brochure | ⚠️ | waiting on the client; nothing in the code references a brochure |
