# Website audit — 4 October 2026

Status: source review and safe remediation completed; release verification remains pending. This report does not certify that the website is bug-free, fully WCAG conformant, or ready to deploy.

## Scope and evidence

Reviewed the public Next.js application, English/Spanish routing, shared components, CMS boundaries, lead/assessment journeys, booking, shop/cart/checkout/fulfillment, security configuration, SEO and deployment readiness. Independent bounded reviews covered functionality, security, SEO and UI. Existing unrelated workspace changes were preserved.

Local browser checks used an isolated Next 16.3.8 development server on port 3111. These are manual observations, not a production build or automated suite. No purchases, booking submissions, CRM messages/leads, credential rotations, commits or deployments were performed.

Your AGENTS.md prohibits running tests, lint, type checks and static analysis unless explicitly requested. The request to include those checks and a production build is still unanswered. Regression fixtures were written but have not been executed. A separately approved installation updated the existing Next dependency.

## Findings and remediation

| Priority | Finding | Action/status | Evidence and remaining limit |
| --- | --- | --- | --- |
| Critical, conditional | Next 16.1.6 falls within the Windows App Router RCE advisory range. Production OS is unknown. | Updated declared/installed Next to 16.3.8. | Matches the official patched security release; local patched dev server runs. Deployment and production build pending. |
| High | Existing Server Action implementation and old Next version intersect the CPU denial-of-service advisory range. | Included in the Next update. | Source/version applicability review; no exploit attempted. |
| High | Checkout edition/price resolution accepted ambiguous or client-influenced offer hints. | Resolver now uses server catalog editions, formats, fulfillment and prices; rejects unknown/ambiguous selections. | Regression fixtures cover forged hints, aliases and language-specific offers; actual Stripe account prices unverified. |
| High | Malformed/oversized checkout input could reach unsafe processing. | Bounded JSON reader; validates cart records, quantities and identities before provider calls. | Fixtures written; endpoint tests pending. |
| High | Single Stripe metadata value imposed a small cart limit. | Bounded, Unicode-safe splitting and shared reconstruction; legacy orders remain readable. | Stripe value/key limits checked against official documentation; fixtures pending. |
| High | Physical-order shipping used the wrong Stripe SDK field and was omitted from fulfillment forwarding. | Reads collected_information.shipping_details, forwards shippingDetails and holds incomplete physical orders for review. | Installed Stripe SDK declarations reviewed; real payment/receiver mapping unverified. |
| High | Purchase confirmation could erase newly added or unpurchased cart items. | Clears only verified purchased quantities, preserves original edition identity, and records handled sessions. | Fixtures pending; storage-disabled reload replay remains a limitation. |
| High | Construction funnel fabricated fallback checkout offers and Spanish prices. | Uses configured CMS/catalog offers; unavailable offers receive a contact path. | Source review; real prices, delivery and language configuration require account verification. |
| High | CMS strings interpolated into JSON-LD could close a script element. | Escapes '<' and separates Service and visible FAQ graph nodes. | Source review and regression fixtures; rendered S-Corp JSON-LD parsed successfully. |
| High | FAQ page crashed on real localized CMS answer objects. | Normalizes strings, localized answer objects and validated rich text before search/render. | Crash reproduced in browser; English and Spanish FAQ now render. English answer-only search and expansion confirmed. |
| Medium | Health survey rapid answers/timers could skip or overwrite questions. | Locks transitions, cancels stale timers, fixes question advancement and shares score thresholds. | Fixtures written; full lead submission not performed. |
| Medium | Estimator ignored the Social Security cap and varied salary assumptions discontinuously. | Shared 2026 employment-tax model; consistent illustrative salary; explicit exclusions. | SSA/IRS rules checked. Formula review and fixtures; model is an illustration, not a net-savings or reasonable-compensation recommendation. |
| Medium | Existing S/C corporations received new-election savings figures; saved old estimates could be relabeled current. | Nonnumeric structure review for existing corps; recomputes saved inputs under current model. | Source review; saved-result fixtures pending. |
| Medium | Estimator result implied successful email delivery without an acknowledgement. | Removed unsupported delivery claims. | Delivery itself remains unverified. |
| Medium | Estimator referral URLs could include sensitive query strings. | Preserves origin/path, strips query/hash, retains explicit campaign fields. | Source review and fixtures pending. |
| Medium | Custom estimator radio controls lacked standard keyboard selection. | Roving tab stops, arrows/Home/End and error associations in structure/financial steps. | Meaningful keyboard fixtures written; full browser wizard validation pending. |
| Medium | Mobile drawer sat below the fixed header. | Raised drawer/overlay above header, preserved focus and keyboard dismissal. | At 390px, close button is 44×44, focused and reachable; Escape closes menu. |
| Medium | Skip link could be hidden behind the header. | Raised focused link; minimum 44px height. | Browser measured 44px, fixed positioning, z-index 1250, Enter transferred focus to main-content. |
| Medium | Booking CTA could stay pending; calendar had no load recovery. | Bounded pending/recovery; preserves iframe data during recovery. | Calendar loaded available dates/time in browser; failure-path fixtures pending. |
| Medium | FAQ categories/search and pricing/video controls lacked complete state/keyboard behavior. | Single category source, rich-text search, keyboard tabs, native seek/volume controls, speed disclosure and lifecycle fixes. | FAQ interaction manually checked; broader media/pricing fixtures pending. |
| Medium | Sitemap could omit content on transient CMS failures or contradict noindex/locales. | Revalidation, failure propagation, singleton flags, attached chapters and product locale eligibility aligned. | Source review; no live Search Console or production sitemap certification. |
| Medium | Foreign playbook chapters and inactive industries could render; CMS errors became false 404s. | Membership/activity constraints; correct failure propagation; canonical redirects. | Fixtures written; dynamic CMS cases remain unexecuted. |
| Medium | In-memory rate-limit maps grew without bounds and reported inaccurate remaining quotas. | Bounded/pruned caches, validated IP syntax and real remaining counts; checkout uses shared Redis-capable limiter. | Distributed configuration/proxy trust unverified. |
| Low | Disclaimer dialog could exceed a short viewport; footer logo omitted responsive image sizing. | Viewport-height scroll boundary and existing 176px logo size hint. | Source inspection; long-content browser fixture pending. |
| Low | FAQ booking CTA routed to raw /contact and lost locale. | Uses shared localized booking route. | EN/ES destination fixtures written. |

## Open risks and configuration work

| Priority | Remaining issue | Required resolution / success criterion |
| --- | --- | --- |
| High | No automated verification of the changed application has run. | Explicitly authorize checks; run the focused suites, type/lint checks and production build, resolve failures, then recheck affected journeys. |
| High | Live site appears to be a different/older deployment from this workspace. | Identify deployed revision/version and hosting OS; deploy only after validation. Public homepage content was compared; production framework version is unknown. |
| High | Legacy CRM workflow capability URLs remain hardcoded. | Move to server environment configuration and rotate exposed capabilities after provider configuration/ownership is established. Values were never printed. |
| High | Real Stripe payment, webhook replay, fulfillment and delivery are unverified. | Controlled Stripe test-mode purchase for each fulfillment type, signed webhook replay/idempotency, address receiver mapping and digital delivery acknowledgement. No live charge should be used as a smoke test. |
| Medium | Booking page promises 30 minutes; live embedded provider calendar shows 45 minutes. | Align provider duration with the advertised strategy call, or approve accurate copy. Screenshot records the discrepancy; no provider setting changed. |
| Medium | Per-email lead limits are bypassable by rotating email addresses; legacy intake uses process-local quotas. | Establish trusted requester identity/proxy policy and shared anti-abuse controls. Do not trust arbitrary forwarded headers. |
| Medium | CSP allows unsafe-inline/unsafe-eval. | Evaluate a nonce/hash policy against rendering, embeds and cache behavior; verify enforcement without breaking journeys. |
| Medium | Localized estimator API still returns heuristic savings bands. | Clearly distinguish/replace heuristic ranges with a validated, disclosed model before using them as tax estimates. |
| Medium | Spanish FAQ hero/CTA and some service headings remain English. | Complete localized copy/CMS content; verify every Spanish journey without accidental locale loss. Normalizer intentionally retains available fallback content. |
| Medium | Contact page publishes $2.3B savings and 5,000+ clients without evidence reviewed in this audit; its response figures vary between 1 hour and 2 business hours. | Supply approved supporting records and align the response promise. These are observed marketing claims, not audit-verified business metrics. |
| Medium | WCAG 2.2 AA has not been fully verified. | Connected token registry and dedicated contrast inspection are unavailable in this session. Audit all computed pairings, focus states, forms/error summaries, captions and screen-reader behavior before approval. No contrast ratio or global compliance claim is fabricated. |
| Medium | Reduced-motion coverage is incomplete outside the homepage video/logo strip. | Review smooth scrolling, drawer/cart springs and construction video autoplay against motion preferences. |
| Medium | Captions/localized video coverage remains unverified. | Confirm complete synchronized captions for all meaningful audio and both locales. English burned-in text observed; it does not establish complete caption coverage. |
| Low | Dormant GHL OAuth helper discards rotated refresh tokens. | Fix persisted rotation before activating this helper. No active getGhlPosts caller found; OAuth was not invoked. |
| Low | Standalone S-Corp routes have separate indexability/canonical policy. | Decide whether these roots are intended indexable funnels or should canonicalize/redirect to localized routes; current policy was preserved. |
| Informational | Isolated preview origin is absent from Sanity Live CORS allowlist. | Expected development-origin warning; no CORS settings expanded. Server CMS content renders. |
| Informational | npm reported locked cleanup directories for old native binaries. | Old running development processes may retain earlier native modules. No unrelated process was killed or directory deleted. Restart the relevant development server when appropriate. |

## Manual browser observations

| Journey | Observation | Limit |
| --- | --- | --- |
| Homepage | Original layout, playing video; no horizontal overflow at 390/768/1440px. | No Core Web Vitals/Lighthouse or full contrast measurement. |
| Mobile navigation | Open, focus close, reachable 44×44 button, Escape closes. | Full screen-reader/device coverage pending. |
| Booking | Calendar loads dates/time; full footer visible. | No appointment submitted; duration mismatch open. |
| Shop | Filters update collection; configured editions render. Hardcover adds at $39, quantity two totals $78, removal restores empty cart. | No checkout session or charge created. |
| FAQ | EN and ES render after reproduced crash; formatted answer expands; answer-only search returns match. | Spanish copy completeness open. |
| Service details | English S-Corp and Spanish Tax Planning render; one H1, six-section Spanish template; mobile has no overflow; computed headline font is Outfit. | Spanish content gaps; all service/locale permutations not individually browser-checked. |
| About/Team/Industries/Resources | Main headings render; mobile has no horizontal overflow. Team search returns one person; keyboard opens Sue profile; Escape restores trigger focus. | Not every card/link/data variant checked. |
| Estimator | Standalone initial form renders with native entity radios and labeled niche selector. | Full results/provider submission and wizard fixtures pending. |
| Contact | Empty first-step selection is blocked with an alert and focus moves to the radio group; selecting a goal advances to the confirmation step. | No personal details entered, no inquiry submitted; business claims and duration mismatch open. |

Saved browser evidence: `.omx/state/full-site-audit/home-desktop.png`, `mobile-menu.png`, `booking-calendar.png`, `service-mobile.png`, `contact-step.png`. The isolated preview was stopped and its audit-only type configuration entries removed after inspection; browser viewport restored.

## Changed source files

This list covers audit edits, not all pre-existing dirty workspace files. Adjacent regression fixtures were added or extended for the critical boundaries and interactions described above; none were run.

| Area | Source files |
| --- | --- |
| Security/runtime | `package.json`; `package-lock.json`; `src/lib/shop/checkout.ts`; `src/lib/security/rate-limiter.ts`; `src/lib/observability/api-handler.ts`; `src/lib/config/env.ts` |
| Checkout/order round trip | `src/app/api/shop/checkout/route.ts`; `src/app/api/shop/webhook/route.ts`; `src/lib/shop/order-metadata.ts`; `src/app/[locale]/shop/success/page.tsx`; `src/components/shop/ClearCartAfterPurchase.tsx`; `src/components/shop/CartPageClient.tsx` |
| Construction funnel | `src/app/[locale]/construction/profit-blueprint/page.tsx`; `src/components/construction/profit-blueprint/BlueprintMoreInfoForm.tsx` |
| Health survey | `src/components/health-check/HealthCheckSurvey.tsx`; `src/components/health-check/QuestionCard.tsx`; `src/app/api/survey/route.ts`; `src/lib/intake/health-score.ts` |
| Estimator rules | `src/lib/scorp-advantage/calculator.ts`; `src/lib/scorp-advantage/employment-tax.ts`; `src/lib/scorp-advantage/referrer.ts`; `src/app/api/ghl-intake/route.ts`; `src/app/scorp-advantage/page.tsx` |
| Estimator UI | `src/components/scorp/BeforeAfterTable.tsx`; `SavingsResultCard.tsx`; `SavingsEstimatorForm.tsx`; `EstimatorPageClient.tsx`; `EstimatorResultsClient.tsx`; `ScorpEstimatorResult.tsx`; `ScorpEstimatorShell.tsx`; `ScorpEstimatorStepStructure.tsx`; `ScorpEstimatorStepFinancials.tsx` (all under the same `src/components/scorp/` directory) |
| Navigation/footer | `src/components/ui/MobileSidebar.tsx`; `src/components/layout/SkipLink.tsx`; `src/components/layout/Footer.tsx`; `src/components/layout/FooterDisclaimerModal.tsx` |
| FAQ | `src/app/[locale]/faq/page.tsx`; `src/components/faq/FAQList.tsx`; `src/components/faq/faqContent.ts`; `src/components/home/FAQAccordion.tsx`; `src/components/ui/FAQAccordion.tsx` |
| Booking/pricing/media | `src/components/home/BookingCtaLink.tsx`; `src/components/booking/BookingCalendar.tsx`; `src/components/pricing/PricingCarousel.tsx`; `src/components/ui/VideoPlayer.tsx`; `src/components/ui/VideoEmbed.tsx`; `src/hooks/useVideoPlayer.ts` |
| SEO routes | `next.config.ts`; `src/app/sitemap.ts`; `src/app/api/revalidate/route.ts`; `src/app/[locale]/layout.tsx`; `src/app/[locale]/page.tsx`; `src/app/[locale]/about/page.tsx`; `src/app/[locale]/resources/page.tsx`; `src/app/[locale]/contact/page.tsx`; `src/app/[locale]/legal/[slug]/page.tsx`; `src/app/[locale]/services/page.tsx`; `src/app/[locale]/services/[slug]/page.tsx`; `src/app/[locale]/hub/s-corp-playbook/[chapter]/page.tsx`; `src/app/[locale]/shop/[slug]/page.tsx` |
| CMS/schema | `src/components/seo/FAQPageSchema.tsx`; `src/components/services/CmsServicePage.tsx`; `src/sanity/lib/queries/resource-queries.ts`; `src/sanity/lib/queries/team-queries.ts`; `src/sanity/lib/queries/shop-queries.ts` |

Audit documents and baseline/evidence are in `docs/plans/2026-10-04-full-website-audit.md`, this report, and `.omx/state/full-site-audit/`.

## Evaluation / success criteria

| Claim | Evidence required before passing | Current status |
| --- | --- | --- |
| Checkout trusts server catalog | Invalid/forged editions rejected, prices/formats/shipping resolved server-side, full paid order round trip | Source repaired; fixtures and provider test pending |
| Public journeys remain usable | Both locales, mobile/tablet/desktop, focus/state and invalid/recovery paths | Representative manual passes; exhaustive coverage pending |
| Search indexing is consistent | Metadata/noindex/canonical/hreflang/sitemap agree for live CMS states | Source aligned; fixtures and production review pending |
| Accessibility meets WCAG 2.2 AA | Measured contrast, keyboard/focus, labels/errors, captions and screen-reader checks | Selected keyboard/target checks pass; full approval withheld |
| Safe release | Passing authorized suites/build; deployed revision/headers/provider config verified | Pending authorization and deployment review |

## Simplifications

Reused the existing bounded JSON reader, shop description guard, shared booking route and rate limiter. Consolidated tax math and score thresholds. Removed fabricated checkout fallbacks, generic cross-edition price assumptions and unsupported delivery statements. No new top-level dependency was introduced; the existing Next security update changed transitive dependencies. No speculative abstraction or bulk cleanup was performed.

## Primary references

- [Next.js September 2026 security release](https://nextjs.org/blog/september-2026-security-release)
- [Windows App Router security advisory](https://github.com/vercel/next.js/security/advisories/GHSA-p293-qw3h-jr36)
- [Server Action CPU denial-of-service advisory](https://github.com/vercel/next.js/security/advisories/GHSA-m99w-x7hq-7vfj)
- [Stripe metadata limits](https://docs.stripe.com/metadata)
- [Next.js JSON-LD guidance](https://nextjs.org/docs/app/guides/json-ld)
- [SSA contribution and benefit base](https://www.ssa.gov/oact/cola/cbb.html)
- [IRS self-employment tax](https://www.irs.gov/taxtopics/tc554)
- [IRS S-Corporation compensation](https://www.irs.gov/businesses/small-businesses-self-employed/s-corporation-compensation-and-medical-insurance-issues)

No deployment, credential or external provider claim should be inferred from a local source fix.
