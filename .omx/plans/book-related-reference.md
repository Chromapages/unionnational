# Related books reference plan

Target: shared book detail related-book section. Keep brand fonts and actual CMS products, prices, badges and covers.

1. Use a two-part desktop layout: related section heading plus two large cards on the left, cream guidance panel on the right. Stack at narrow widths.
2. Reuse ProductCard with an explicit related presentation; preserve default catalog behavior. Show actual edition price/format, localized category, full description and View book label. No fabricated card taglines, ratings, badges or products.
3. Replace the existing standalone booking prompt with the reference guidance panel. Use one Book a Strategy Call link to/book and the already-established30-minute/Enrolled Agent/reassurance text. Do not promise Jason specifically unless the booking configuration guarantees him.
4. Verify two existing recommendations(S-Corp29/Construction27), hrefs, focus, meaningful alt text, responsive widths and no clipping. Keep the previous coverage redesign and native disclosure intact. No build/lint/typecheck/suites under workspace instruction.

Files: ProductCard.tsx, product detail route, EN/ES messages, plan and visual verdict. No new components, dependencies or CMS writes.

## Completed

- Reused ProductCard with a related layout; default catalog presentation retained. Larger real covers, CMS badge, actual format/category, full measured description, edition price and View book label now render. Image loading uses the existing Next Image onLoad callback.
- Replaced the detached booking prompt with the cream guidance sidebar. The same Book a Strategy Call label goes to/en/book(and/es/book in Spanish). Existing30-minute/Enrolled Agent and reassurance copy reused; no promise of Jason specifically added.
- Book cards and guidance panel align at the bottom on desktop. Actual PDF prices remain29 for S-Corp and27 for Construction.
- Verified320,390,768,1024,1536 and1920px: two books, no horizontal overflow or internal clipping. CTA is56px tall,80px at320px when its label wraps.
- Both book links were clicked and reached their correct product H1/routes. Card keyboard focus has a visible2px gold outline. Meaningful image alt text and loaded covers confirmed. Outfit/Inter fonts preserved. Spanish mobile CTA/routes and layout also checked.
- Earlier coverage work remains intact: three topic cards and four source takeaways. No checkout, CMS mutation or cart change performed for this task.
- Changed files: src/components/shop/ProductCard.tsx; src/app/[locale]/shop/[slug]/page.tsx; src/messages/en.json; src/messages/es.json. Plan and visual-verdict records also saved.
- Build, lint, typecheck and test suites were not run under workspace instruction. Existing runnable scripts/check-book-product.mjs retains recommendation, placeholder, price and booking destination checks. Actual screen-reader speech remains unverified.
- Screenshots saved as book-related-reference-desktop.png and book-related-reference-mobile.png in the task visualization folder. Viewport restored and preview remains on3001.
