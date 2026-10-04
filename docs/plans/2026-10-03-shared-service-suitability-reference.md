# Shared service suitability reference

## Scope and design read

Extend the active shared service-detail redesign to the suitability section. Use the supplied S-Corp reference's full-width heading, highlighted phrase, numbered pale cards, circular icons, and centered evaluation link. Reuse the 94rem container, existing fonts/tokens/icons, and 40/48px section padding. DESIGN_VARIANCE: 3; MOTION_INTENSITY: 2; VISUAL_DENSITY: 4.

## Implementation sequence

1. Restyle QualificationCheckpoint consistently for plain and grouped service eligibility content. Preserve original indicators, group labels, exclusions, badges, CTA destinations, and section IDs.
2. Present S-Corp's four supplied indicators with short titles and explanatory descriptions: consistent profit, potential savings, reasonable compensation, ongoing compliance. Clearly state these are indicators, not a final determination.
3. Highlight the S-Corp heading with gold-600, which must pass large-text contrast on white; use gold-700 for other small gold labels.
4. Link the S-Corp evaluation explanation to its existing process section when that section exists. Reuse each other service's existing suitability CTA.
5. Render two card columns at tablet/desktop and one on mobile. Keep the component server-rendered and its semantic heading/list structure accessible.
6. Finish verification of both the shared hero and suitability work across seven canonical pages in English/Spanish. Keep financial-claim filtering and existing booking/anchor behavior protected; do not run suites, lint, typecheck, or build under the standing instruction.

## Success criteria

- S-Corp has all four reference indicators and an accessible highlighted heading, with no numeric savings claims or implied final eligibility decision.
- All service details share the new visual treatment while retaining service-specific content and grouped distinctions.
- Existing section IDs, process anchors, booking destinations, and mobile sticky-CTA integration continue to work.
- 390/768/1440px layouts have no hero/card overflow or clipped controls; interactive targets are at least 44px with visible keyboard focus.
- New light and dark text/accent pairings meet WCAG AA based on calculated token contrast.
- Hero and suitability remain visible without animation-driven reveals. No dependencies, external CMS edits, or changes to campaign/industry pages.
