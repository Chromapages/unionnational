# Shared service process ledger

## Scope and typography

Extend the active hero/suitability redesign to each canonical service's process section. Reproduce the reference's centered header, numbered bordered ledger, icons, review/output subrows, and centered CTA while keeping Outfit headings and Inter body text. No serif fonts, dependencies, or new colors.

## Implementation sequence

1. Extract the inline process presentation into one shared server-rendered ServiceProcessSection, preserving each existing process section ID and step order.
2. Use a bordered responsive grid with one column on mobile, two on tablet, and a ledger layout on desktop. Render exactly the number of CMS steps supplied (schema supports 3-6).
3. Add S-Corp's localized review and output details from the supplied reference, retaining conditional/qualitative wording rather than promising continued savings. Other services retain their own CMS descriptions; absent review/output details are omitted instead of invented.
4. Reuse each page's primary CTA label and normalized destination under the ledger. Preserve meaningful CMS timing labels and omit redundant Step/Phase-style labels.
5. Verify seven canonical services in English/Spanish, responsive geometry, heading fonts, content preservation, focus, contrast, and link targets. Complete the earlier hero and suitability verification in the same pass.

## Success criteria

- All service details use the same brand-font process frame and service-specific steps.
- S-Corp has four complete stages with review and output rows, and a booking CTA beneath them.
- Existing process anchors and booking destinations continue to work; controls are at least 44px and have visible keyboard focus.
- No horizontal/card overflow at 390/768/1440px. The ledger accommodates actual CMS step counts without synthetic cells or clipped content.
- Small gold text uses gold-700; pale panels, body text, icons, and CTA states meet WCAG AA.
- No invented figures, guaranteed savings, fake completion status, or unverified legal thresholds.
- Do not run suites, lint, typecheck, or build under the standing instruction. Reuse the existing financial-claim regression check and perform rendered/manual checks.

## Source verification

The IRS confirms that Form 2553 is used by eligible entities to elect S-corporation treatment: https://www.irs.gov/forms-pubs/about-form-2553. The reference's filing row is conditional on an approved election; the UI does not imply every evaluation results in an election.

## Completed

All three shared sections are implemented across seven canonical services in English and Spanish. Forty-two rendered width/locale combinations passed overflow checks. Long desktop headlines were rechecked and fit two lines. Process review/output rows align through subgrid; mobile/tablet/desktop columns and 56px CTAs were checked. Outfit/Inter, focus, contrast, booking links, existing anchors, and grouped suitability content were verified. Regression coverage was added without running suites, lint, typecheck, or build. Previews and rendered evidence are saved in .omx/state/shared-service-reference/.
