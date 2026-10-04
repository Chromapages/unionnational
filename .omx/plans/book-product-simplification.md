# Book product page: completed plan and verification

Target: The 3M’s to Freedom, /en/shop/the-3m-s-to-freedom. Shared template repairs also apply to other published books. Brand fonts, palette, logo, actual covers, prices and credentials are preserved. No new component or dependency was introduced. No live CMS writes were made.

## Severity-ordered plan and outcome

| Severity | Problem / root cause | User consequence | Affected files / components | Minimal change implemented | Verification |
|---|---|---|---|---|---|
| Blocker | Service queries flatten slug; renderer reads slug.current. | Dead /services/undefined links. | shop-queries.ts, book-queries.ts, RelatedServices.tsx | Align slug projection, accept legacy strings, use existing canonical routing, hide malformed slugs. Remove product service upsells. | Product DOM has zero undefined/null links. Bookkeeping, CFO and tax-planning canonical destinations returned 200. |
| Blocker | Sticky receives base product.price while hero selects edition price. | Buyer sees contradictory purchase prices. | ProductHero.tsx, StickyBuyBar.tsx, commerce.ts, types.ts | One selected edition controls headline, radios, sticky and shared Add to Cart handler, including edition Stripe IDs. | PDF 29, audio 27, hardcover 39, bundle 59 matched picker, headline, sticky and actual cart lines/totals. No checkout was initiated. |
| Blocker | Legacy string features were projected as objects. | Empty Key Takeaways despite four real CMS entries. | Both queries, BookOverview.tsx, FeaturedProduct.tsx | Fetch raw features; normalize with existing extractString; suppress absent content. | Rendered all four original CMS points; three summary bullets derive from publisher copy. Native disclosure replaces the dead tab link. |
| Blocker | Incomplete product appears in automatic recommendations. | Buyer is offered Description coming soon at 59. | commerce.ts, ProductCard.tsx, ShopDesktopExperience.tsx, product route | Shared description guard suppresses incomplete listings and purchase pages. | No Rich book link or placeholder in rendered Shop/product page. Direct incomplete route is noindex and invokes Next not-found fallback; streaming response status is 200. |
| High | Formats lack labelled controls and inclusion detail. | Unclear bundle contents and inaccessible choice. | ProductOfferSelector.tsx, ProductHero.tsx, EN/ES messages | Native radio group; selected check plus text; approved PDF default; format-type order PDF, audio, hardcover, bundle. Only CMS-confirmed contents shown. | ArrowRight selected audio; focus outline visible. Radio targets 94–133px tall across checked widths. |
| High | Three upsell blocks and long publisher notes compete with buying. | Too many decisions and repetition. | Product route, BookOverview.tsx, ProductCard.tsx, EN/ES messages | One measured promise, three source-derived bullets, four original takeaways in disclosure, at most two existing valid recommendations, one soft booking line. Delete duplicate hidden Quick View link. | Three summary bullets, four source points and two related books. One H1 and logical H2/H3 sequence. |
| High | Navbar layer 1200 exceeds cart layers 100/110. | Cart close button is covered. | CartSidebar.tsx | Existing overlay/drawer moved to layers 1300/1310. Existing focus trap retained. | Visible close control above nav, 44px target, focus returned to sticky trigger after close; live status is polite. |
| High | Sticky, chat and footer can overlap purchase controls. | Obstructed buying on mobile or desktop. | StickyBuyBar.tsx, ChatWidget.tsx, CartIcon.tsx, product route | Observe main action below fixed header and footer; reserve bottom space; reuse CTA observer to hide chat near buying; raise cart trigger above sticky. | Sticky button 50px, main button 62px. Floating cart clears sticky. Footer hides bar. Chat hidden when main purchase button is visible. |
| High | Legacy slate500 is #adb5bd in this brand palette. | Related descriptions and cart subtotals are faint. | ProductCard.tsx, CartSidebar.tsx, ProductOfferSelector.tsx | Reuse darker existing slate700 text, slate600 borders and gold800 hover text; visible focus rings. | Body text 8.18:1, gold purchase label 9.21:1, white sticky text 17.99:1, gold focus on white 5.30:1. |
| Medium | Nav/footer book CTA differs from Contact Us. | Inconsistent next step. | FloatingNavbar.tsx, MobileSidebar.tsx, product route | Reuse unified booking label and footer booking variant. | All three rendered English booking links say Book a Strategy Call and resolve to /en/book. |

## Client decisions

- Default format: approved Digital PDF at 29; implemented wherever configured.
- Contents: CMS confirms PDF copy, full audiobook, hardcover, and hardcover plus PDF bundle. Generic Bonuses is not itemized; omitted from displayed contents until the client supplies the real list.
- Takeaways: four actual CMS entries were found and restored. No invented takeaways or new claims. Client may revise CMS wording later.
- Related books: retain the existing valid CMS-ranked pair, The S-Corp Playbook and The Money-Making Blueprint for Construction Companies. A suggested replacement pair of CFO and S-Corp remains an editorial decision; no unapproved substitution made.

## Rendered verification

- Widths: 320, 375, 390, 768, 1024, 1440 and 1920px; no horizontal overflow. One H1 at each width.
- All four edition prices verified against the real cart. Main and sticky Add to Cart share one handler. Verification items removed through the UI; no purchase or payment made.
- Native radio arrow selection and visible focus outline checked. Cart modal closes, returns focus and exposes a polite live status. Actual NVDA/VoiceOver speech remains unverified.
- Three publisher-derived summary bullets and all four original CMS takeaway strings verified.
- Two related destinations, booking and repaired canonical service routes returned 200. Product DOM has no undefined/null link or Contact Us CTA.
- Storefront hides incomplete Rich book; Spanish product page has four radios, PDF29 default and no overflow at390px.
- Sticky/footer clearance, chat protection and cart drawer layering checked visually.
- Runnable checks saved but not executed: scripts/check-book-product.mjs and commerce.test.ts addition. Build, lint, typecheck and suites were not run under the workspace instruction.
- Preview remains on port3001. Temporary viewport override restored.

## Practice sources

- [W3C contrast minimum](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html): normal text minimum4.5:1 and large text3:1; calculate from actual rendered colors.
- [W3C radio group pattern](https://www.w3.org/WAI/ARIA/apg/patterns/radio/): labelled group, one selection and arrow-key navigation; native radios supply platform behavior.

## Files changed for this task

- src/app/[locale]/shop/[slug]/page.tsx
- src/components/shop/ProductHero.tsx
- src/components/shop/ProductOfferSelector.tsx
- src/components/shop/BookOverview.tsx
- src/components/shop/CartSidebar.tsx
- src/components/shop/ProductCard.tsx
- src/components/shop/FeaturedProduct.tsx
- src/components/shop/ShopDesktopExperience.tsx
- src/components/ui/StickyBuyBar.tsx
- src/components/ui/CartIcon.tsx
- src/components/ui/MobileSidebar.tsx
- src/components/ChatWidget.tsx
- src/components/layout/FloatingNavbar.tsx
- src/components/services/RelatedServices.tsx
- src/sanity/lib/queries/shop-queries.ts
- src/sanity/lib/queries/book-queries.ts
- src/lib/shop/commerce.ts
- src/lib/shop/types.ts
- src/lib/shop/commerce.test.ts
- src/messages/en.json
- src/messages/es.json
- scripts/check-book-product.mjs
- .omx/plans/book-product-simplification.md
- .omx/state/book-product-simplification/ralph-progress.json

## Screenshots

- C:/Users/ericb/.codex/visualizations/2026/09/22/01a0cb28-f65b-7510-bc37-04884e495874/book-product-desktop.png
- C:/Users/ericb/.codex/visualizations/2026/09/22/01a0cb28-f65b-7510-bc37-04884e495874/book-product-mobile.png
