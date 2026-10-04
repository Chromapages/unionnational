# Shop simplification — 2026-10-02

## Severity-ordered implementation plan

| Priority | Problem / user consequence | Files / components | Minimal change | Verification |
|---|---|---|---|---|
| Blocker | CMS and active Stripe amounts differ; checkout can charge a different total. Retirement has no mapped checkout. | Catalog and Stripe audit; client decisions | Retain catalog prices per client; record mismatches, do not alter commerce amounts or external records. | Read-only comparison of all 24 active configured edition prices. |
| High | Featured book duplication and four browsing systems obscure a seven-book catalog. Separate mobile layout repeats unsupported claims. | Shop route; ShopDesktopExperience | One responsive composition, featured book plus other six, only four goal buttons, no search/sort/show-all. | Seven unique product destinations; keyboard filter/toggle reset; selected checkmark; live results; desktop and 390px. |
| High | Unrelated reviews, fabricated ratings, conflicting delivery/refund/compliance copy mislead readers. | ShopDesktopExperience, ShopFAQ, ProductCard, detail JSON-LD, messages | Remove generic proof and unsupported rating metadata. Display four client-approved FAQ answers, combining choosing and compliance. | Read page and JSON-LD; four answers match approved wording; no ratings or blanket promises. |
| Medium | Inconsistent actions and excessive descriptions hinder comparison. | ShopDesktopExperience; en/es translations | View book on every card; source-derived 15–20 word summaries; same price formatting; actual configured format labels only. Rich has no synopsis, retain transparent placeholder. | Check all book actions and seven prices; confirm four active edition formats for six books; Retirement confirmation notice. |
| Medium | Focus, results announcements, cart count, mobile layout and contrast unverified. | ShopDesktopExperience; CartIcon; ProductHero | Existing brand tokens and typography; three/two/one-column grid; 44px+ controls; visible focus; live cart count. | Manual desktop/390px English/Spanish; native keyboard actions; DOM geometry and computed contrast; reversible add/remove item, no checkout. |
| Optional | No supported book rating counts or sample chapters exist. | Client decision notes | Flag missing proof; do not invent. | Confirm CMS samplePages empty; distinguish scalar ratings from source-backed reviews. |

## Client decisions

Resolved: retain Practical Knowledge. Stronger Businesses. Brighter Tomorrows.; View book throughout; retain catalog prices; approved four FAQ drafts on 2026-10-02 (Spanish translates those answers).

Remaining:
- Pricing blocker: 22/24 configured edition amounts disagree. Five mapped books: CMS PDF $29/audio $27 versus Stripe $19.95; CMS hardcover $39/bundle $59 versus Stripe $39.95/$59.95. Construction PDF/audio $27 matches; construction hardcover/bundle still differ by $0.95. Resolve catalog versus checkout source of truth before launch.
- Rich base catalog price is $59 (not audit's $27–29 range). Kept as requested. Its description is missing; client must supply synopsis.
- Retirement book: base $29, no mapped editions/Stripe price/buy link. Format and checkout availability need confirmation. Do not infer bundle contents from generic format value.
- Delivery and refund operating policy remains unresolved: no published terms/shipping/refund docs; construction product sales copy includes conflicting 30-day/60-day guarantees. Approved FAQ directs readers to team; it does not resolve underlying policy.
- Six books have four active configured formats (PDF, audio, hardcover, bundle). Confirm fulfillment/assets and bundle contents; configuration alone does not prove instant delivery.
- Profitability has real matches (Restaurant Profit Blueprint, construction and growth books); no need for unsupported product filters. S-Corp and Tax Strategy overlap removed with topic chips. Growth/profitability intent overlap remains appropriate for multi-purpose books.
- No sample chapter on any product. Scalar 5 ratings have no counts or verified-purchase source. Construction links a Torres testimonial but verified book purchase is not established; approval/evidence needed before book-specific proof.

## Checks

Regression checks left in ShopDesktopExperience.test.tsx, ProductCard.test.tsx, CartIcon.test.tsx. Not executed per user instruction; no lint/typecheck/build/static analysis. Manual render verification to follow.

## Implemented files

- src/app/[locale]/shop/page.tsx — one responsive Shop composition; removed mobile-only browsing/proof duplication and the generic testimonial fetch; wired the four approved answers.
- src/components/shop/ShopDesktopExperience.tsx — one featured book + six other books, four goal buttons, measured source-derived descriptions, configured format labels, View book actions, one closing booking CTA, preserved CMS logo and approved tagline.
- src/components/shop/ShopFAQ.tsx — reused FAQAccordion, correct H2, no competing contact CTA.
- src/components/shop/ProductHero.tsx — visible focus for edition selection and Add to cart; no price changes.
- src/components/shop/ProductCard.tsx — removed unsupported scalar/default stars from shared related cards.
- src/app/[locale]/shop/[slug]/page.tsx — removed random rating counts, unsupported stock claims and generated offer expiry from Product JSON-LD.
- src/components/ui/CartIcon.tsx — visible focus, localized label and persistent live item count.
- src/components/home/FAQAccordion.tsx — reused brand gold-700/gold-300 to provide contrasting focus on light/dark variants.
- src/messages/en.json and src/messages/es.json — approved FAQs, measured book summaries, book/format/action labels and cart announcements.
- Regression checks: ShopDesktopExperience.test.tsx, ProductCard.test.tsx, CartIcon.test.tsx. Written/updated, not executed per instruction.

## Final manual verification

- Inspected current desktop and 390px before editing: duplicate S-Corp card, six narrow grid cards with seventh hidden, search/topic/sort/goal browsing systems, separate mobile presentation, unrelated service testimonial, seven FAQ questions and two closing CTAs.
- Final English and Spanish: seven unique book cards/destinations; seven uniform View book / Ver libro actions; one H1 and H2/H3 hierarchy; no main search field, sort dropdown, fake format filters or Show all control.
- 1672px: three-column grid; 390px: single-column grid, page scroll width 375px (available content width with scrollbar), no horizontal overflow. All main interactive target rectangles at least 44×44px.
- All four goals exercised: tax 1 grid book; profit 3; finance 3; growth 3. Featured remains above without duplication. Selected checkmark, pressed state, visible keyboard outline, live count and toggle-back-to-all verified. Spanish finance filter returns three and resets to six.
- Computed text-contrast audit found no main text below 4.5:1. Brand dark/white, slate-600/white, gold-900/white and light-gold/dark foreground pairs pass. Goal boundaries use slate-600; focus uses gold-700 against white, gold-300 against dark. Navigation/FAQ native keyboard focus inspected.
- Opened actual S-Corp detail, confirmed four edition choices and Product JSON-LD without aggregateRating, availability or generated expiry. Keyboard Add to cart focus verified. Added one Digital PDF to the previously empty cart, observed live count 1, removed it by keyboard, observed live empty count. Cart restored; no checkout/payment attempted.
- Mobile final footer social targets end at y=731.5; floating cart begins at y=748. No overlap. Closing CTA remains 48px tall in English; extra vertical padding accommodates wrapped translations.
- Fresh final Shop browser console: no errors. Earlier hot-reload missing-message logs preceded addition of translation keys and are resolved. Existing environment warnings (127.0.0.1 Sanity Live CORS, Meta Pixel version/route-transition notices) were not changed.
- Proof: .omx/state/shop-simplification/shop-desktop.jpg, shop-grid.jpg, shop-mobile-footer.jpg. Visual verdict 94/100, pass.
- No lint, typecheck, automated tests, static analysis or build run. No dependencies, products, dates, external records, prices, reviews, sample chapters or legal guarantees added.

## Additional findings outside this design pass

The S-Corp detail still uses original CMS promotional copy and has pre-existing related-service destinations ending in /services/undefined. These do not come from the redesigned Shop listing; they need a separate product-detail content/link pass. The unrelated testimonial is removed from the Shop listing, not deleted from its CMS source.
