# Shared service-detail hero reference

## Design read and scope

Trust-first service detail hero based on the supplied S-Corp fit-check reference. DESIGN_VARIANCE: 3; MOTION_INTENSITY: 2; VISUAL_DENSITY: 4. Reuse Outfit/Inter, brand-500/brand-50 and gold tokens, installed Lucide icons, and the site's 94rem container.

Apply through CmsServicePage -> ServicePageTemplate -> ServiceHero to seven canonical details: s-corp-tax-advantage, tax-planning, strategic-bookkeeping, fractional-cfo, payroll-services, new-business-formation, and tax-preparation-and-filing. Dynamic CMS service routes receive the same shared component. Preserve redirects, canonical URLs, service body content, booking destinations, and MobileStickyCta anchor IDs. The separate /scorp-advantage program page is outside this catalog-detail scope.

## Implementation sequence

1. Restyle the shared hero as a dark green desktop split, with headline/subheadline and gold primary CTA on the left and three numbered icon topics plus a conclusion on the right. Use restrained decorative Leaf icons from the existing library.
2. Update the reviewed S-Corp hero to the supplied fit-check headline, highlighted phrase, description, and evaluation-details label. Preserve its existing booking and #included destinations and its financial-claim filtering.
3. Add localized S-Corp review topics: profit, compensation, payroll/compliance, and the reference conclusion. Other services reuse their own first three CMS process steps and comparison conclusion/description.
4. Remove the old hero's unused statistics/media/motion presentation and caller-only props. Reuse the existing headline highlighting and bookingHref helpers, keeping downstream service sections intact.
5. Keep mobile/tablet content stacked; present topic columns only when their available width supports readable copy. Honor visible focus, active/hover states, minimum 44px controls, and reduced-motion preferences.
6. Add one regression check that the reviewed S-Corp content retains its safe booking/FAQ behavior. Do not run suites, lint, typecheck, or build under the standing instruction.

## Success criteria

- Every canonical detail renders the same hero component and visual structure with service-specific content.
- S-Corp shows the reference's fit-check message and all three qualitative review factors, with no invented savings numbers or guarantees.
- All seven pages render in English and Spanish; 390/768/1440px layouts have no horizontal overflow or clipped content.
- Hero CTA IDs and destinations are preserved. Primary controls measure at least 44px; desktop CTA labels fit on one line and keyboard focus is visible.
- White, pale body text, gold accents, icons, and CTA states pass calculated WCAG AA contrast using repository tokens.
- Hero remains server-rendered and visible without animation-driven reveals. No dependencies, new fonts/colors, or external CMS writes.

## Verification limits

Connected design-verification tools are unavailable. Use repository tokens, live DOM measurements, browser interaction, and contrast calculations. Botanical details use existing library glyphs rather than new image assets. Reference typography is adapted to the site's existing type scale. Existing CMS process descriptions remain the source for non-S-Corp hero topics.
