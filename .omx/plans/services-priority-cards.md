# Services priority selector: ranked recommendation cards

Date: 2026-09-30  
Routes: `/en/services`, `/es/services`  
Reference: `codex-clipboard-1369aa42-ca34-4476-850d-d76ed46e8e03.png`  
Status: implemented and browser-verified.

## Findings and plan

The active selector is inside `ServicesDesktopExperience.tsx`; it already has four priorities, keyboard navigation, a shared recommendation panel, canonical service routing, and CMS-backed price formatting. Preserve that behavior and the remaining services-page sections. Keep Outfit/Inter and the existing 94rem container.

1. Add the reference's eyebrow and four spacious icon selectors. Use a two-by-two grid on narrow screens and four columns on desktop; retain selected-state semantics and keyboard navigation.
2. Replace the panel's plain introduction with a priority heading/summary and a mint target-icon goal callout.
3. Show three ranked cards: **Start here**, **Also relevant**, **Good for later**. Feature the first card with a dark green header, gold border/button, larger starting price, and relevant support badges. Use light headers and outlined buttons for the other two cards. Remove mobile-only detail accordions so the recommendation content is readable directly.
4. Match the reference's tax selection order: proactive tax planning, S-Corp, tax preparation. Reorder matching locale arrays and use canonical CMS service matching. Prices remain authoritative: the published CMS currently supplies $1,800 for planning, a custom strategy quote for S-Corp, and $595 for filing. Never substitute invented prices or annual package prices. Unknown/non-string prices fall back to a custom quote.
5. Add the “Why these services?” row with a short role for each recommendation and keep the existing individual-service pricing note.
6. Add localized goals, short service taglines/actions, roles, and primary benefits for all four priorities. Retain existing service descriptions where possible and avoid applying year-round support claims to one-time services.

## Implementation and verification

Edit the existing client component and the EN/ES `ServicesPage.Desktop.challenge` messages. No dependency or generic tab component is needed. Reuse icons, locale links, the existing tab handler, and existing CMS pricing/routing logic.

Check every priority in both languages at 320, 375, 768, 1024, 1440, and 1920px: one selected tab, three correctly ranked services, correct links/prices, visible keyboard focus, no overflow/clipping, and usable enlarged text. Preserve other page sections and pricing packages. Leave one small runnable browser check using installed Playwright/Node assert; saved tests/build/lint/typecheck remain unrun per workspace instructions.

Expected files: `ServicesDesktopExperience.tsx`, the two locale message files, one browser check, this plan, and a visual-verdict record.

## Completion evidence

Changed files: `src/components/services/ServicesDesktopExperience.tsx`, `src/messages/en.json`, `src/messages/es.json`, `scripts/check-services-priority.mjs`, this plan, and `.omx/state/services-priority-cards/ralph-progress.json`.

The existing selector now renders the reference's priority/goal introduction, three ranked recommendation cards, and service-role strip. Brand fonts, canonical links, CMS-backed prices, and other services-page sections are preserved. Removed the old mobile detail accordions; no dependencies or shared abstractions were added.

Browser inspection covered both locales, all four priorities, and 320/375/768/1024/1440/1920px, plus 200% text size at 1440px: 56 states. Initial label clipping was corrected with shrinking/wrapping flex labels; the final inspection found no section clipping or page overflow. Keyboard Home/End, arrow wrapping, and Tab into the panel passed in both languages; no browser errors were observed. Tax prices remained $1,800, custom quote, and from $595. Desktop and Spanish mobile screenshots were visually reviewed.

Evidence: `services-priority/verification.json`, `wrapping-verification.json`, and EN/ES desktop/mobile screenshots under the current visualization artifact directory. The saved runnable check and build/lint/typecheck/test suites were not run, per workspace instructions. No CMS document was modified; new interface labels live in the locale message files.
