# Homepage CTA Layout Plan

## Skills Used
- `plan`
- `frontend-design`

## Requirements Summary
- Update the homepage CTA section to match the provided wireframe direction:
  - rounded bordered container
  - badge at top-left
  - primary heading and subheading on the left
  - two stacked CTA buttons on the right
  - bottom divider with supporting text aligned left and right
- Keep the implementation aligned with the existing brand palette already defined in [src/styles/globals.css](D:\WORK\unionnationaltax\unionnational\src\styles\globals.css).
- Avoid accidental regressions on non-homepage pages that currently reuse the same CTA component.

## Current State
- The homepage renders the CTA through [src/app/[locale]/page.tsx](D:\WORK\unionnationaltax\unionnational\src\app\[locale]\page.tsx) at line 165.
- The CTA UI is currently a shared, dark, image-backed section in [src/components/home/CTASection.tsx](D:\WORK\unionnationaltax\unionnational\src\components\home\CTASection.tsx:23).
- That shared component is also reused by `/about`, `/pricing`, and `/team`, so a direct redesign of `CTASection` would affect multiple pages:
  - [src/app/[locale]/about/page.tsx](D:\WORK\unionnationaltax\unionnational\src\app\[locale]\about\page.tsx:92)
  - [src/app/[locale]/pricing/page.tsx](D:\WORK\unionnationaltax\unionnational\src\app\[locale]\pricing\page.tsx:54)
  - [src/app/[locale]/team/page.tsx](D:\WORK\unionnationaltax\unionnational\src\app\[locale]\team\page.tsx:161)

## Recommended Direction
- Treat this as a **homepage-only variant**, not a global CTA redesign.
- Preserve the existing shared CTA defaults for reused pages.
- Introduce a variant or wrapper strategy so the homepage can adopt the new layout without changing `/about`, `/pricing`, or `/team`.

## Design Direction Summary
- Aesthetic: `Editorial premium minimal`
- Visual thesis: A bright, high-contrast card that feels more consultative and structured than promotional.
- Differentiation anchor: The CTA should read like a strategic contact panel, not a typical dark “conversion banner.”

## Implementation Steps
1. Add a homepage-specific CTA rendering path.
   - Preferred option: add a `variant?: "default" | "homepageWireframe"` prop to `CTASection`.
   - Alternative option: create a new `HomepageCTASection` wrapper and keep `CTASection` unchanged.
   - Recommendation: use a variant prop if the shared content model stays identical; use a separate component only if the markup diverges enough to hurt maintainability.

2. Update homepage usage only.
   - In [src/app/[locale]/page.tsx](D:\WORK\unionnationaltax\unionnational\src\app\[locale]\page.tsx:165), pass the homepage-specific variant so only the homepage gets the new layout.
   - Do not change the existing imports/usages on about, pricing, or team unless requested.

3. Rebuild the CTA layout to mirror the wireframe.
   - In [src/components/home/CTASection.tsx](D:\WORK\unionnationaltax\unionnational\src\components\home\CTASection.tsx), replace the homepage branch layout with:
   - outer rounded container with visible dark border on a light background
   - top-left badge pill using the existing gold token family
   - left column for title + subtitle
   - right column with two vertically stacked CTA buttons
   - lower divider row with supporting copy on both sides
   - responsive collapse behavior for tablet/mobile so the buttons stack below content cleanly

4. Simplify visuals for the homepage variant.
   - Remove or bypass the current dark image background, glows, and glass effects for the new homepage branch.
   - Reuse existing theme tokens from [src/styles/globals.css](D:\WORK\unionnationaltax\unionnational\src\styles\globals.css) instead of inventing new colors.
   - Keep brand consistency by using:
   - dark border and text from `brand-*`
   - gold fills from `gold-*`
   - light surface background from `surface` / white / slate neutrals

5. Reconcile CTA copy and button semantics with the new structure.
   - Keep the primary CTA sourced from existing data fields in [src/components/home/CTASection.tsx](D:\WORK\unionnationaltax\unionnational\src\components\home\CTASection.tsx:33-36).
   - Keep the secondary CTA behavior explicit and intentional.
   - Review translation strings in:
   - [src/messages/en.json](D:\WORK\unionnationaltax\unionnational\src\messages\en.json)
   - [src/messages/es.json](D:\WORK\unionnationaltax\unionnational\src\messages\es.json)
   - Only add or update keys if the wireframe requires different footer microcopy, badge phrasing, or second-button language.

6. Tune responsive behavior.
   - Desktop: two-column composition matching the mockup.
   - Tablet: preserve left/right structure if space allows, otherwise move button stack below copy.
   - Mobile: single-column flow with badge, heading, subtitle, buttons, divider, then footer text.
   - Maintain generous tap targets and avoid cramped footer alignment.

7. Verify visually and functionally.
   - Confirm homepage receives the new layout.
   - Confirm about/pricing/team still render the old CTA unchanged.
   - Confirm both CTA links remain keyboard accessible and visually distinct.
   - Confirm no content overflow at narrow widths.

## Acceptance Criteria
- The homepage CTA visually matches the provided wireframe structure.
- The homepage CTA uses a light panel with a visible rounded border instead of the current dark image-backed hero-card style.
- The badge, heading, subheading, two CTA buttons, and bottom divider row all appear in the same overall hierarchy as the mockup.
- The CTA remains responsive and readable on mobile, tablet, and desktop.
- `/about`, `/pricing`, and `/team` are unchanged unless explicitly included in scope.
- Existing CMS-backed CTA title/button fields continue to work.
- Existing i18n fallbacks continue to work for both English and Spanish.

## Risks and Mitigations
- Risk: Shared-component redesign unintentionally changes other pages.
  - Mitigation: gate the new layout behind a homepage-only variant or wrapper.

- Risk: The wireframe’s horizontal composition becomes cramped on smaller breakpoints.
  - Mitigation: explicitly define breakpoint behavior before coding and allow the right button stack to drop below the text block.

- Risk: Existing footer/badge copy may feel mismatched in the cleaner editorial layout.
  - Mitigation: review translation strings and adjust only the microcopy that no longer fits the new presentation.

## Verification Steps
- Run lint for the modified files.
- Run typecheck for the app.
- Load the homepage and inspect the CTA visually.
- Spot-check `/about`, `/pricing`, and `/team` CTA rendering.
- Verify primary and secondary CTA links are still clickable and keyboard focusable.

## Simplification Opportunities
- Prefer deleting the homepage branch’s decorative background image and glow layers rather than restyling them.
- Reuse the existing data shape and translation keys before introducing new props or CMS fields.
- Keep the change isolated to one shared component plus the homepage call site unless implementation proves separation is cleaner.

## Remaining Open Choice
- Implementation should choose between:
  - `CTASection` with a homepage-specific `variant`
  - a new `HomepageCTASection` component
- My recommendation is the `variant` approach first, because the data contract is already sufficient and the requested change is primarily layout/styling, not content modeling.
