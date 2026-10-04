# Industry expertise reference layout

Date: 2026-09-30
Status: implemented and browser-verified.
Scope: industry expertise on `/en/industries` and `/es/industries`.

## Read and inventory

Reading this as a financial-advisory page for business owners, with the existing restrained green/gold brand and a photo-led industry selector. Design variance 3, motion intensity 1, visual density 5: match the supplied composition with native CSS/Tailwind and existing icons/fonts.

`IndustriesDesktopExperience.tsx` already has four industry choices, EN/ES copy, photographs, four features and canonical service links per industry. Its expertise block has an extra side note and extensive image-overlay text. The route currently switches to a separate mobile industry-card grid below 1280px. The desktop hero and other-industry cards share the expertise selection state.

## Plan

1. Reuse the existing expertise JSX and data in an exported section component in the same file. Preserve desktop controlled selection; give the mobile instance its own selection. Replace the route's obsolete mobile grid with this same expertise section. Other hero/story/CTA content stays intact.
2. Use a warm-white section, a simple eyebrow/headline/intro, four bordered icon tabs and a single bordered panel. Remove the decorative side note and long image-overlay headline/body; keep only an industry label and gold rule on the photograph. Use a roughly 41/59 photo/details split at sufficient container width.
3. Preserve current meaningful industry copy, existing photographs and route destinations. Keep the feature icons in a two-by-two grid, followed by four relevant-service links and two actions. Keep brand Outfit/Inter. No invented savings claims or new assets/dependencies.
4. Stack the image and details on narrow screens, use two columns for tabs where space permits and one at the smallest width, and wrap content at enlarged text sizes. Retain tab semantics, arrow/Home/End navigation and visible focus; add the panel to sequential keyboard navigation.
5. Inspect all four industries in both languages at 320/375/768/1024/1440/1920px and enlarged text. Verify active panel, links, loaded imagery, overflow/clipping and keyboard selection. Leave one minimal runnable browser check; don't run saved tests/build/lint/typecheck per workspace instructions. Record the screenshot verdict before subsequent UI edits.

Expected files: industries desktop component, industries route, one runnable browser check, this plan and visual-verdict state. This is a layout change; no CMS write or new copy is required.

## Completion

Implemented the reference composition with four selectable industry tabs, a simple photo label, a 41/59 desktop split, two-by-two feature grid, naturally sized service links and the existing two actions. Brand fonts, photographs and meaningful copy were preserved. Removed the side note, redundant overlay paragraphs and the separate mobile card grid. The same section renders responsively in both route branches; React useId supplies unique tab/panel identifiers. Existing desktop hero selection still coordinates with the expertise panel and other-industry cards.

Changed files:
- `src/components/industries/IndustriesDesktopExperience.tsx`
- `src/app/[locale]/industries/page.tsx`
- `scripts/check-industry-expertise.mjs`
- This plan and `.omx/state/industries-expertise-reference/ralph-progress.json`

Browser verification: 56 states across four selections, EN/ES, 320/375/768/1024/1440/1920px and 200% text at 1440px. No clipping, horizontal overflow or browser errors. Keyboard Home/End, arrow wrapping, focus and Tab into the panel passed at every normal breakpoint. All four image URLs returned 200. No duplicate expertise IDs. Desktop hero selection changed the panel correctly and left three correctly filtered other-industry cards. Desktop and Spanish mobile screenshots reviewed against the reference.

Evidence: `industries-verification.json` and `industries-final-{locale}-{width}-{selection}.png` in the current visualization artifact directory. The saved runnable check and build/lint/typecheck/test suites were not executed per workspace instructions. No new text or CMS changes are needed; the shorter photograph treatment intentionally removes previously repeated copy.
