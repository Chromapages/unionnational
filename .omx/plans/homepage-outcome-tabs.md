# What you get: tabbed outcome panel

Date: 2026-09-30  
Routes: `/en`, `/es`  
Reference: `C:/Users/ericb/AppData/Local/Temp/codex-clipboard-4b74bfe1-004e-4f5d-b652-51b0c6e4da5f.png`  
Status: implemented and browser-verified on 2026-09-30.

## Design and scope

Replace only the internal three-card content of the homepage's `#outcomes` section with the reference's three selectors and one split detail panel. Keep Outfit headings and Inter body copy from `src/lib/fonts.ts`, the existing section heading, comparison link, footer line, locale-specific container width, and the shared outer spacing system in `src/styles/globals.css`.

The current cards live in `src/components/home/ConsumerHome.tsx`; their translated content lives under `ConsumerHome.outcomes` in both message files. The locale root layout already provides `NextIntlClientProvider`. No existing tab primitive was found in the UI/home component folders, so use native buttons with one small client component rather than adding a dependency or making the entire homepage a client component.

Design-taste direction: preserve the established financial-firm palette and typography; use the reference's open composition, restrained detail, and clear selected state. No decorative animation or image generation is needed.

## Layout

- Three selectors: **Keep more**, **See clearly**, **Decide better**. Tax planning is selected initially.
- Selected selector: dark green surface, light text, gold icon, and gold underline. Inactive selectors: light surface and subtle border. Visible keyboard focus.
- Bordered cream/white panel: selected outcome and supporting copy on the left; recommended service, description, four features, primary link, and two related services on the right.
- Use the existing service titles, descriptions, feature lists, URLs, and locale navigation helper. Add only the short selectors, panel labels, and outcome mottos required by this layout, in English and Spanish.
- Remove the card photographs and numbered card headers. Recreate the reference's right-edge curves with native CSS circles, a gold outline, and a green shape marked decorative and non-interactive.
- Keep service text clear of decoration. Stack the outcome and service areas on narrow screens; tabs remain a three-button horizontal strip with wrapping labels and adequate target height.
- Keep all panel variants in the same CSS grid cell. Inactive panels remain invisible and inert, retaining intrinsic height so switching tabs does not move the following section. Do not use a fixed content height.

## Interaction and accessibility

Use `tablist`, `tab`, and `tabpanel`, associated IDs, `aria-selected`, and one tab stop among the selectors. Selecting or focusing a tab immediately changes the visible panel. Arrow Left/Right wrap, Home goes first, End goes last; native Enter/Space activates buttons. Up/Down retain normal scrolling behavior. Inactive panels must be inert and hidden from assistive technology. Give the visible panel a tab stop before its links.

This follows the [W3C tabs pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/). Existing route links remain real anchors, so the recommended and related services are navigable directly.

## Implementation steps

1. Add `HomeOutcomeTabs.tsx`, using React state/refs, native buttons, existing icons, locale links, and translated strings.
2. Replace the old cards with that leaf component; delete their unused imports and data from `ConsumerHome.tsx`.
3. Add selector/panel labels and mottos to `en.json` and `es.json` while preserving existing service content.
4. Leave one dependency-free Node/browser check using the installed Playwright runtime. Do not run saved tests/build/lint/typecheck under the workspace instructions; inspect the live browser manually.
5. Review screenshots against the reference and check each selected outcome in both languages at 320, 375, 768, 1024, 1440, and 1920px.

## Acceptance

- Three selectors, exactly one selected; one visible and focusable associated panel.
- Each selector shows its matching outcome, service, feature list, correct primary URL, and the other two service links.
- Mouse/touch and keyboard selection work, including wrapped arrow navigation and Home/End.
- Panel and section height remain stable across selections at each checked width.
- No clipping, page overflow, or decorative overlap with text/links at the six widths; enlarged text also checked.
- Outfit/Inter remain the fonts, and section heading styles and boundary gaps remain intact.
- No new dependency, invented result figure, or global styling change.

Expected files: `HomeOutcomeTabs.tsx`, `ConsumerHome.tsx`, the two locale message files, and `scripts/check-home-outcome-tabs.mjs`, plus this plan and a visual verdict record.

## Completion and verification

Implemented with one client leaf, native buttons, existing icon/translation/navigation tools, and no new dependencies. Removed the three-card layout and its unused data/icons. Outfit and Inter, the section heading, container, comparison link, footer copy, and shared section-boundary spacing remain in place.

The detail panel uses native container queries through existing Tailwind support, so its columns and decoration collapse when enlarged text needs more room. Panel variants share one grid cell; inactive variants are invisible, inert, and hidden from assistive technology while contributing to a stable intrinsic height. Selected tab colors apply immediately to avoid faded, low-contrast intermediate states. Container query syntax was checked against [official Tailwind documentation](https://tailwindcss.com/docs/responsive-design#container-queries).

Manual live-browser evidence:

- English and Spanish, all three selections, at 320, 375, 768, 1024, 1440, and 1920px: 36 states checked.
- Exactly one selected tab and visible panel; two inert panels; four features and the correct primary/related service URLs in every state.
- Panel height identical across selections at every checked width. At 1440px both locales use a 515.4px panel.
- Arrow-key wrapping, Home/End, and Tab into the active panel work in both languages. Visible focus outline verified.
- 200% root text enlargement at 1440px: all six outcome states stack correctly with no clipped text; heights remain stable.
- No page overflow, missing translations, or browser runtime errors observed in the checked states.

Evidence folder: `C:/Users/ericb/.codex/visualizations/2026/09/22/01a0cb28-f65b-7510-bc37-04884e495874/outcome-tabs/`. It contains screenshots and `verification.json`. Final visual verdict: `.omx/state/homepage-outcome-tabs/ralph-progress.json`, pass 95. The decorative curves are CSS shapes; no reference image was edited or extra asset downloaded.

### Files changed

- `src/components/home/HomeOutcomeTabs.tsx`: selectors, panel layout, native keyboard behavior.
- `src/components/home/ConsumerHome.tsx`: replaces old cards with the client leaf and removes unused code.
- `src/messages/en.json` and `src/messages/es.json`: selector labels, panel labels, related-services label, and short brand mottos. Existing service content retained.
- `scripts/check-home-outcome-tabs.mjs`: one reusable Node/browser assertion check for the interactive behavior, using installed Playwright and Node's assert module.
- This plan and the visual-verdict record.

The reusable check and build/lint/typecheck/test suites were not executed under the workspace instructions. Verification above used browser inspection. Remaining scope: this was not a full assistive-technology or cross-browser audit; existing third-party chat overlays can appear over the decorative area in screenshots.
