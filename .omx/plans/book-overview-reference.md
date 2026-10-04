# Book coverage section reference plan

Target: shared BookOverview on /en/shop/the-3m-s-to-freedom. Preserve existing brand fonts, section width, source takeaways and other books' content.

1. Center eyebrow, heading and source-derived introduction.
2. Present three existing summary topics in equal cards with native list/H3 structure, icon circles, decorative watermarks, numeric labels and gold outcome labels.
3. Replace the small disclosure with a full-width native details/summary bar. Preserve all four source takeaways, focus and keyboard controls. Keep other books and objectives data-driven, suppress absent content.
4. Verify at320,390,768,1024,1536 and1920px; inspect typography, focus, disclosure contents and overflow. No build/lint/typecheck/test suite run under workspace instruction.

CMS fullDescription and four feature strings were read on2026-10-02. They substantiate higher-value clients consistently, pricing/positioning for margins, tools/action steps for pricing/profitability/cashflow, processes/metrics/people, scalable operations and time freedom. New descriptions are concise paraphrases of that source; original four takeaways remain untouched.

Files: BookOverview.tsx, product detail route (explicit growth-guide flag), EN/ES messages, this plan and visual verdict state. No new dependencies, components or CMS writes.

## Completed and verified

- Centered section introduction; three equal desktop cards with icon circles, restrained watermarks, topic numbers, source-derived descriptions and outcome labels.
- Native full-width takeaways disclosure opens and closes with Enter, shows a visible gold focus outline and preserves all four original CMS strings. No price/cart logic changed.
- Outfit heading and Inter body fonts confirmed in the rendered page. One section H2 with three H3 card headings.
- Checked320,390,768,1024,1536 and1920px: three cards, no horizontal overflow or internal text clipping. Final1024px cards are444px high with24px titles;1536px cards are459px high. Desktop disclosure is97.5px high. Mobile cards stack and grow with content.
- The growth-specific introduction and labels are enabled only for The3M’s to Freedom. Other books retain source-driven content and the existing absent-content guard.
- Changed files: src/components/shop/BookOverview.tsx; src/app/[locale]/shop/[slug]/page.tsx; src/messages/en.json; src/messages/es.json. Plan and visual-verdict records also saved.
- No CMS writes, new components or dependencies. Build, lint, typecheck and suites were not run under the workspace instruction; actual screen-reader speech remains unverified. Existing scripts/check-book-product.mjs retains summary and original-takeaway checks.
- Desktop and mobile screenshots saved as book-overview-reference-desktop.png and book-overview-reference-mobile.png in the task visualization folder. Temporary viewport restored.
