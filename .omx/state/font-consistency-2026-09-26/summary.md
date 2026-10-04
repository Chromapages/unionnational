# Website typography verification — September 26, 2026

## Changes

- Restored Outfit headings and Inter supporting copy in the new About, Industries, Resources, and Services desktop layouts.
- Consolidated the three public root layouts onto one font loader. The global error document now loads its own stylesheet and the same font variables.
- Disabled Tailwind's default serif family so future reference-based page edits cannot silently introduce a system serif face.
- Removed the font-family override from bold blog text, preserving the surrounding paragraph or heading font.
- Corrected the shared CMS service process headings to Outfit.
- Applied Inter and tabular numerals to the remaining explicit Outfit price, savings, and metric displays.
- Documented the runtime typography contract in the brand design system.

## Verification

- Inspected 115 public route URLs: all 109 declared static public routes across English, Spanish, and the standalone S Corp roots, plus six linked CMS detail-page examples.
- The document font inspection found no unexpected generic font families in visible page text. Code elements and third-party frame contents were excluded.
- Two client-results eyebrow labels intentionally use Inter despite their semantic h2 tags. The incorrect shared service step headings were fixed and rechecked in both locales.
- Nine focused rechecks passed. These resolved a redirect navigation interruption, initially unfinished streamed pages, and a transient local 500 response on the restaurant VSL route. All inspected URLs returned 200 after any redirects/rechecks.
- Checked the four affected layouts in Spanish at 1280 px and 390 px. Both fonts loaded and page-level horizontal overflow was zero in all eight cases.
- Visually reviewed the About before/after layout, Services challenge/package sections, Spanish desktop/mobile samples, and the updated S Corp figures.
- Browser inspection of pricing and S Corp figures confirmed Inter and `font-variant-numeric: tabular-nums`.
- Source review confirmed the shared font options preserve prior behavior and the installed Tailwind parser removes theme tokens set to `initial`.
- No new dependencies or package/config changes. Existing unrelated edits were preserved.

## Verification limits

- No production build, lint, typecheck, or automated test suite was run, following the workspace instruction.
- The global error screen's wiring was reviewed; a production root-layout failure was not deliberately triggered.
- CMS detail templates were sampled, not every CMS record. Third-party iframe styling, image-embedded text, and social-preview images are outside the page-font inspection.
- Raw initial findings remain in `route-audit.json`; resolved cases are recorded separately in `rechecks.json`. Responsive evidence is in `responsive-audit.json` and adjacent screenshots.

## Files changed in this follow-up

### Font loading and defaults

- `src/lib/fonts.ts` (new)
- `src/app/[locale]/layout.tsx`
- `src/app/scorp-estimator/layout.tsx`
- `src/app/scorp-advantage/layout.tsx`
- `src/app/global-error.tsx`
- `src/styles/globals.css`
- `Union National Tax Design System.md`

### Page and content typography

- `src/components/about/AboutDesktopExperience.tsx`
- `src/components/industries/IndustriesDesktopExperience.tsx`
- `src/components/resources/ResourcesDesktopExperience.tsx`
- `src/components/services/ServicesDesktopExperience.tsx`
- `src/components/services/ServicePageTemplate.tsx`
- `src/components/blog/BlogContent.tsx`

### Prices and figures

- `src/components/shop/TransactionCard.tsx`
- `src/components/shop/ProductOfferSelector.tsx`
- `src/components/shop/TrustMetrics.tsx`
- `src/components/pricing/TaxPrepGrid.tsx`
- `src/components/pricing/AdvisoryPricingCards.tsx`
- `src/components/pricing/OptionalServices.tsx`
- `src/components/resources/calculators/CalculatorResultPanel.tsx`
- `src/components/scorp/ScorpEstimatorResult.tsx`
- `src/components/scorp/PricingTierCard.tsx`
- `src/app/scorp-advantage/page.tsx`
- `src/app/[locale]/s-corp-tax-advantage/SCorpAdvantageClient.tsx`
