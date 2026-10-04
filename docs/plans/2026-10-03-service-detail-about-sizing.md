# Match service-detail sizing to About

Measured About at 390/768/1440px: 94rem (1504px) max container, 16/24/32px horizontal gutters, 40/40/48px section padding, and 30/36/44px main section headings.

Apply those existing values to hero spacing, comparison, optional video/proof, suitability, included and FAQ sections. Keep process sizing, hero headline hierarchy, card layouts, content, anchors and shared closing CTA. FAQ size overrides apply only to service details so shop remains unchanged.

Verify computed sizing and overflow on rendered S-Corp and a generic service at all three widths. No formal suites, lint, typecheck or build under the standing instruction.

Completed: S-Corp and tax planning measured at 390/768/1440px; Spanish bookkeeping at 390/1440px. Main section widths, gutters, padding and headings match About, with no changed-section or document overflow. FAQ overrides are scoped to service details. Screenshot and computed measurements are saved in `.omx/state/service-detail-about-sizing/`. Optional video sizing is source-verified only because inspected routes have no video. Automated checks were not run.

Changed source files: ServicePageContainer.tsx, ServiceHero.tsx, ComparisonSection.tsx, StrategyVideoSection.tsx, QualificationCheckpoint.tsx, ServiceIncludedSection.tsx, ServicePageTemplate.tsx and ShopFAQ.tsx. Reused existing sizing values and removed narrower container caps and service-only FAQ minimum height. No dependencies added.
