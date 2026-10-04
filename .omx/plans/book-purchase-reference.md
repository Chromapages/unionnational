# Book purchase reference plan

Target: /en/shop/the-3m-s-to-freedom and the shared book detail purchase component. The named What are you trying to solve? heading exists on the Shop page, but the supplied reference clearly depicts the detail purchase area.

1. Reuse ProductHero and ProductOfferSelector; remove their competing outer cards. Use equal desktop columns, a warm cover stage, and source-backed growth benefits below the actual CMS cover. Preserve font-heading, font-sans and font-data.
2. Stack all format choices in full-width rows, with a visible circular selected marker, descriptions, and right-aligned prices. Preserve native radio inputs, keyboard focus and shared selected-edition state.
3. Keep the gold Add to Cart and existing sticky callback. Below it, show only the selected edition's actual contents and configured Stripe checkout, then one FAQ link. No invented rating, review count, delivery timing, shipping coverage or best-value claim.
4. Verify desktop/mobile layout, native arrow selection, all four prices, cart functionality and FAQ destination in the rendered preview. No build, lint, typecheck or suites under the workspace instruction.

Files: ProductHero.tsx, ProductOfferSelector.tsx, EN/ES messages, this plan and visual verdict state. No new components, dependencies or CMS writes.

## Completed

- ProductHero.tsx now uses balanced columns, the actual CMS cover on a warm stage, three source-backed growth highlights, selected edition contents and FAQ support.
- ProductOfferSelector.tsx now uses stacked rows, circular radio markers, right-aligned prices and native keyboard selection. Removed the former secondary card grid.
- src/messages/en.json and src/messages/es.json contain the supporting labels. Existing fonts remain Outfit for headings, Inter for body, and the existing price font.
- Rendered checks: 320, 390, 768, 1024, 1536 and 1920px; no horizontal overflow, one H1, 64px Add to Cart, format row targets at least78px.
- ArrowRight selected audiobook with a visible gold focus outline. All four headline/picker/sticky prices matched29/27/39/59. Hardcover added to cart at39 and verification item removed. PDF selection restored. FAQ href is/en/faq.
- No build, lint, typecheck or suites were run, as instructed. Actual screen-reader speech was not measured. Existing runnable purchase checks remain available in scripts/check-book-product.mjs.
- No CMS writes, new dependencies, fabricated reviews, shipping coverage or delivery timing. Original cover retained instead of fabricating a lifestyle photograph.
- Saved screenshots: book-purchase-reference-desktop.png and book-purchase-reference-mobile.png in the task visualization folder. Temporary viewport restored; preview remains on3001.
