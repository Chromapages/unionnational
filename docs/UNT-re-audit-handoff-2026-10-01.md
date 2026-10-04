# Union National Tax — October 1 re-audit handoff

The local October 1 re-audit was the baseline. Before editing, the branch was `main` at `6e7163e5c19492e5ddbc4a6eb5c8cb6cc82d4475`; all 537 audited source hashes matched. The working tree was already dirty and was preserved. No commit, push, deployment, CMS publication, credential change, live lead submission, calendar booking, purchase, refund, or fulfillment request was made.

**Status rule:** “fixed” means the stated local acceptance check passed. “Partial” means a concrete part passed but an acceptance check or integration remains. “Open” is blocked by a decision. “Unverified” has no sufficient acceptance evidence. A mock does not prove CRM, Stripe, email, or calendar delivery.

## What changed

- **Quality, G01–G03/G40:** repaired Resources and Shop types, missing-image fallback, test typings/lint, and the responsive Services query; corrected generated-output lint ignores, README commands, and quality workflow. Files include `src/app/[locale]/{resources,shop}/page.tsx`, `src/components/shop/ProductCard.tsx`, `src/components/home/ServicesSection.test.tsx`, `eslint.config.mjs`, `README.md`, and `.github/workflows/quality.yml`.
- **Lead capture, G04–G14/G41:** retained the prior G04/G06 contract, mapped visible bands/urgency, forwarded collected fields and locale/book/source IDs, kept rejected submissions retryable, bounded requests and timeouts, used independent contact quotas, redacted logs, and restored root health/readiness routing. Files include `src/lib/ghl/contract.ts`, `src/lib/intake/shared.ts`, the lead API routes, intake/application/contact components, `src/lib/security/rate-limiter.ts`, `src/lib/observability/logger.ts`, `src/middleware.ts`, and `docs/lead-capture-contract-map.md`.
- **Paid orders, G15–G19/G27:** deterministic webhook claim and recoverable states, paid-only confirmation/cart clear/tracking, locale-safe checkout, private transaction cache headers, and a read-only Studio recovery list. The unused blueprint confirmation route now leads to paid-order verification. Files include `src/app/api/shop/{checkout,webhook}/route.ts`, `src/app/[locale]/shop/success/page.tsx`, `src/app/[locale]/construction/profit-blueprint/success/page.tsx`, `src/components/seo/ShopPurchaseEvent.tsx`, `next.config.ts`, `src/sanity/schemaTypes/stripeWebhookIdempotency.ts`, and `docs/shop-fulfillment-recovery.md`.
- **Content and routing, G20–G29/N02–N05:** removed simulated playbook delivery and unsupported proof, added slug-specific playbook routes, CMS recovery/revalidation, localized heads and sitemap, safe book social images and JSON-LD, published Terms mapping, and safe booking returns. Files include `src/components/hub/GatedContentBox.tsx`, `src/components/resources/resourceHref.ts`, `src/app/[locale]/hub/playbooks/[slug]/`, `src/app/api/revalidate/route.ts`, `src/app/sitemap.ts`, `src/lib/seo/localizedAlternates.ts`, `src/app/[locale]/books/[slug]/page.tsx`, `src/components/seo/JsonLd.tsx`, `src/components/layout/Footer.tsx`, and `src/lib/booking.ts`.
- **Locale and access, G30–G38/N01:** localized active Industries, Shop, booking, and service CTA states; removed unproved Shop/blueprint numbers; repaired dialog/cart focus, form errors/step focus, and skip-link focus. Files include `src/messages/{en,es}.json`, `src/components/booking/BookingCalendar.tsx`, `src/components/services/{CmsServicePage,ServiceHero}.tsx`, `src/components/shop/{CartSidebar,ShopDesktopExperience}.tsx`, `src/components/construction/profit-blueprint/ExitIntentChecklist.tsx`, and `src/components/layout/SkipLink.tsx`.

## Gap status

| ID | Status | Acceptance evidence or remaining check |
| --- | --- | --- |
| G01 | fixed | Seven baseline TypeScript errors cleared; missing Shop image fallback checked. |
| G02 | fixed | Original lint error cleared; generated output excluded; final lint has zero errors. |
| G03 | fixed | Responsive Services assertion selects intended mobile/desktop controls. |
| G04 | fixed | Canonical construction payload preserved; mocked intake browser cases pass. |
| G05 | partial | Local `OTHER` value passes; CRM owner meaning/automation remains unconfirmed. |
| G06 | fixed | Intake cannot show success without an acknowledged response; 16 mocked browser cases pass. |
| G07 | partial | Exact visible and nested bands mapped; specialized CRM receiver semantics remain unverified. |
| G08 | open | Nested score max 71 versus High Intent cutoff 75; owner must approve weights/cutoff. |
| G09 | partial | Truthful acknowledgement, timeout and stable IDs tested; CRM deduplication is unverified. |
| G10 | partial | Collected fields/locale/source/book ID survive local validation and mapping; CRM storage is unverified. |
| G11 | partial | Size, validation, score recomputation and quota fixtures pass; distributed abuse guarantees require configured Redis. |
| G12 | fixed | Separate contact identifiers receive separate quotas; spoofed forwarded headers do not select buckets. |
| G13 | fixed | Nested redaction and representative PII-free logs pass synthetic tests. |
| G14 | partial | Raw IP no longer occupies `ip_hash`; receiver hashing and retention contract needs approval. |
| G15 | partial | Failed/uncertain fulfillment remains visible and recoverable manually; live Stripe/Sanity/GHL recovery untested. |
| G16 | partial | Deterministic local event ownership and concurrent retry fixtures pass; GHL idempotency-key contract is unknown. |
| G17 | fixed | Only a paid UNT Shop session confirms, clears cart and tracks purchase in mocked tests; the legacy blueprint route cannot claim confirmation. |
| G18 | fixed | Validated EN/ES checkout return URLs pass mocked tests. |
| G19 | partial | Local order dedupe passes; simultaneous cross-tab analytics can still duplicate. |
| G20 | partial | False email/PDF success removed; configured capture/delivery workflow absent. |
| G21 | partial | Gated chapter text is hidden before unlock; gate purpose and unlock workflow await owner. |
| G22 | partial | Two-title slug fixtures and chapter membership pass; no second published playbook exists to validate live. |
| G23 | fixed | Mocked CMS rejection/null settings retain homepage/footer navigation and fallback content. |
| G24 | fixed | Signed updates invalidate EN/ES trees and footer settings; bad signatures rejected in mocks. |
| G25 | partial | 30 core and 10 dynamic rendered heads pass; unpublished CMS route families and full route inventory remain unverified. |
| G26 | fixed | Active CMS types and noindex filters pass fixtures; live sitemap has 210 unique URLs and no cart/success entries. |
| G27 | fixed | Production checks show cart, success, results and downsell states noindex and no-store; private paths are absent from sitemap. The legacy blueprint route has no-store and redirects to verification without a confirmation claim. |
| G28 | fixed | PNG/JPEG/WebP URL fixtures pass; a real book page uses a reachable 1200×630 local PNG fallback. |
| G29 | fixed | Hostile CMS string cannot close the JSON-LD script in the focused test. |
| G30 | partial | Active Spanish UI and metadata improved; some public CMS Shop/product/FAQ and other funnel content remains English. |
| G31 | partial | Actual `/es/scorp-estimator` journey reaches `/es/s-corp-tax-advantage` and `/es/book`; CMS body translation remains incomplete. |
| G32 | partial | Dialog focus, Escape, errors and retry fixtures pass; manual screen-reader check remains. |
| G33 | partial | Empty cart keyboard trap/recovery passes; full cart at 320px and screen reader remain unchecked. |
| G34 | partial | Contact/application labels and step/errors improved; every active form/control has not had a manual screen-reader pass. |
| G35 | partial | Shared skip link focuses main content in 30 rendered cases; every localized CMS route remains untested. |
| G36 | partial | Embed, thumbnail-only and missing-media fixtures are truthful; published video playback cannot be checked. |
| G37 | partial | Missing/fractional rating fallback and unproved Shop numbers corrected; remaining numeric claim provenance needs owner review. |
| G38 | partial | Reduced-motion/data and retry behavior tested; no verified speech captions/transcript or mobile media budget. |
| G39 | partial | Ten local production timing traces recorded; no agreed budgets, field Web Vitals, or complete media load. |
| G40 | partial | Local type/lint/unit/build gates pass; clean CI and secret-bound readiness remain untested. |
| G41 | partial | Root health returns 200; readiness now returns an honest 503 with missing configuration names. Live provider health and order recovery are unprobed. |
| G42 | partial | Chromium EN/ES mobile/desktop, 320px, text resize, keyboard and mocked conversion checks pass; Firefox/WebKit, real browser zoom and full media matrix not run. |
| G43 | unverified | Pricing, offers, FAQ, and exact Jason review scope need owner signoff. |
| G44 | unverified | No approved public snapshot URL or live integration proof; deployment and submissions were excluded. |
| N01 | fixed | Booking-labelled Shop and CMS service actions use locale-aware booking routes in browser checks. |
| N02 | partial | Public CMS query returned no published Terms record; footer/Shop withhold broken link and map a published slug when available. Approved Terms content is needed. |
| N03 | fixed | Six unsupported blueprint testimonials and numeric proof fallbacks removed; approved home Google/Torres proof preserved. |
| N04 | fixed | Layout title template no longer duplicates the brand; 40 sampled rendered heads show no repeated name. |
| N05 | fixed | Safe same-site booking return context and locale pass unit and browser checks; external/recursive targets rejected. |

## Checks and limits

| Check | Result |
| --- | --- |
| TypeScript | `npx tsc --noEmit --incremental false --pretty false`: exit 0. |
| ESLint | Whole repo: 576 files, 0 errors, 264 warnings. |
| Unit | 392/392 tests passed across 133 suites, with network guard. |
| Production build | `npm run build`: exit 0; Next generated 84 static pages and listed dynamic routes. |
| Intake browser | Exact 16 mocked re-audit cases passed after rerunning two initial hydration timeouts; all POSTs intercepted. |
| Core browser | 30/30 EN/ES 320px/1280px routes 200, no overflow, one main target, working skip focus; 10/10 dynamic head samples passed. |
| Resize | Eight EN/ES core routes at 640px with 200% text size had no document overflow. This is not a real browser zoom test. |
| Production trace | Ten local Chrome traces saved; external CRM/analytics/media hosts blocked except Sanity CDN. Do not infer field performance from these samples. |
| Data/media | Published Terms query 200 with zero records. Real book OG fallback 200, `image/png`, 1200×630. |
| Health/readiness | Final production preview: `/healthz` 200; `/readyz` 503 with missing dependency names, no secret values. |
| Private states | Five production routes returned noindex and no-store; legacy blueprint route redirected to a non-confirmation state; sitemap omitted private paths. |
| Diff | `git diff --check`: exit 0. |

Evidence: `../.omx/state/re-audit-2026-10-01/{vitest-private-final.json,eslint-final-gate.json,browser-review.json,dynamic-heads.json,performance-production.json,lead-browser-check-current.json,readiness-final.json,private-state-check.mjs}` and screenshots beside those files.

## Required decisions and handoff boundary

Owner decisions: G08 scoring; CRM `OTHER` meaning, exact specialized bands, submission-ID handling and IP retention; playbook capture/delivery and gate purpose; GHL payment idempotency and physical shipping contract; approved Spanish CMS copy, media captions, claim sources, pricing/FAQ scope, and Terms content. The payment recovery runbook requires an operator to reconcile uncertain GHL delivery before any replay.

This preview has no `SANITY_AUTH_TOKEN`, `STRIPE_WEBHOOK_SECRET`, the seven lead/shop GHL webhook URLs, or the two Upstash Redis values listed by `/readyz`. Configuration names were checked only; no credential values were read or changed.

**Jason review:** the local code and screenshots are ready for an internal visual review. A remote review handoff still needs an approved, accessible snapshot URL and approved Terms content. **Production launch:** not ready while integration, content, payment recovery, accessibility/media, and owner gates above remain.
