# UNT pricing local draft scope

Read the complete October 12 implementation plan and ten-offer ledger before implementation. Commercial approval remains pending.

Baseline: branch `fix/live-release-audit-2026-10-10`, HEAD `1c9b50062048fbecfaa169ed68a37af06827842a`, audited `097c693fe548c2c3655ab09f110490a5f6672910`. HEAD changes navigation; existing dirty health-check, book, env, lead delivery, translation and runtime work must be preserved.

Cleanup plan before root edits:
1. Keep regression coverage for service optional sections, FAQ JSON-LD and the IRS content bypass; add offer-boundary/preview tests before replacement.
2. Reuse `pricingTier`; add optional `priceNote`, ordered `pricingPage` references and `pricingOffers` on service/servicePage.included. Keep compatibility fields readable, but never fall back to superseded prices on affected routes.
3. Centralize locale-aware display/cadence and safe CTA handling. Use the ten-offer ledger only behind an explicit server-side development preview flag; label preview pending Jason approval.
4. Render actual selected offers, not inferred Foundation/Growth/Executive tiers. Remove hardcoded tax tables, forced annual cadence and stale comparison prices. Preserve existing CMS scope outside pricing and show all qualifications without hover.
5. Bridge IRS local narrative to the shared pricing page via relatedService route matching (not fabricated IDs). Keep its reviewed disclaimers. Preserve fixed final booking CTA and /fractional-cfo route.
6. Run focused and full tests, lint, build, source credential scan, read-only browser QA and screenshots. All live writes/providers are forbidden.

Reach: pricing route/components, services overview/cards, CMS service pricing + IRS bypass, shared schema/query/type/Studio/revalidation support, EN/ES stale price strings (surgical edits only), fixture/unit/browser tests, local handoff. No homepage/industry redesign, no booking/book/commerce/form changes.

Design: preserve current UNT brand. DESIGN_VARIANCE=3, MOTION_INTENSITY=2, VISUAL_DENSITY=5. No new motion/assets/dependencies needed for this content update.

Published CMS inventory: project `p1x9y3wz`, dataset `production`, 14 pricingTier / 7 service / 7 servicePage / no pricingPage. Read-only public access; drafts cannot be inventoried. Original inventory saved privately under `.omx/tmp/unt-pricing-preview/cms-inventory.json`; it is an inspection snapshot, not an authorized migration backup.

No push/deploy/publish/CMS mutation/Stripe operation or live lead/appointment/charge. Stop at local review readiness.
