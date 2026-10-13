# Remaining UNT website work — October 11 implementation

## Plan and current status

The [execution plan](../.omx/plans/remaining-website-work-2026-10-10.md) was written before implementation. Work remains on `fix/live-release-audit-2026-10-10`, after commit `1c9b500`. Existing logs, test artifacts and TypeScript recovery includes were preserved. No new dependency, commit, push, deployment or production setting change occurred in this implementation.

| Work package | Status | Evidence / remaining limit |
| --- | --- | --- |
| Construction-book copy | Implemented locally in EN/ES | Hero, catalog/related descriptions, cover callouts, three topic cards, two native accordions and description metadata/schema use manuscript-backed copy. Prices, editions, cover, title, author and checkout preserved. Editorial release review and CMS synchronization remain. |
| Assessment answer identity | Fixed technically | Shared recovered questions/weights, `health-check-v1`, numerical answers plus stable option IDs. Q2's two zero-point answers remain distinct; legacy numerical records stay ambiguous. Every option, boundaries, malformed contracts and mocked receiver preservation tested. |
| Assessment interaction/privacy | Improved locally | Focus/step announcements, selected button state, associated field errors, client validation, factual collection notice and existing localized privacy link. Unsupported verification/vault/timing assertions removed. Final contact/consent/privacy policy remains an owner decision. |
| Assessment retry/delivery | Fixed technically with mocks | Bounded client wait; one request during double submission; same UUID/answers on retry; known server-generated `customData.submitted_at` ignored in the shared fingerprint. Financial/option changes remain identity conflicts. Uncertain delivery remains held for reconciliation. Live receiver acceptance is unverified. |
| Assessment result navigation/logging | Fixed technically | Existing locale-aware Link preserves result destination locale. Operational acceptance logs retain trace only, without score/category. Scoring meaning and band-specific advice are unchanged and still require validation. |
| Home/Services assessment promotion | Held | No affirmative Jason scoring/content/contact-flow approval was received. No assessment entry links added. `/health-check` and `/intake` remain separate. Full Spanish assessment copy/flow is still outstanding. |
| Calendar duration | Open provider task | October 11 ordinary-browser checks at 390/1920px still display “Jason's Office Calendar / 45 min”; website retains the approved 30-minute offer. Existing [provider runbook](booking-provider-settings.md) specifies the required correction. Provider access/settings authorization remains required. |

**Local production review:** http://127.0.0.1:3013/en

Book: http://127.0.0.1:3013/en/shop/the-money-making-blueprint-for-construction-companies and the equivalent `/es/` route. Assessment: http://127.0.0.1:3013/en/health-check. These URLs work on this computer while the review server runs; none indicates a public deployment.

## Files changed

| Files | Change / simplification |
| --- | --- |
| `src/messages/en.json`, `src/messages/es.json` | Construction-only storefront description/highlights/overview. Existing next-intl arrays hold five features and four objectives in each locale; unrelated messages preserved. |
| `src/app/[locale]/shop/[slug]/page.tsx` | Pass construction-specific localized arrays into the existing BookOverview. Other books keep CMS defaults. No new override framework or unused long-description section. |
| `src/lib/intake/health-score.ts` | Single recovered question/option/weight source, stable identity validation and shared calculation. |
| `src/components/health-check/useHealthScore.ts` | Reuse shared calculation, removing duplicated category/score logic. |
| `src/components/health-check/HealthCheckSurvey.tsx` | Reuse shared questions; retain selected IDs; send version/source/locale; bound wait at 12 seconds; keep submission identity and answers on failure; truthful self-reported wording. |
| `src/components/health-check/QuestionCard.tsx` | Stable keys/selected identity, aria-pressed/group labeling, announced step and focused heading. |
| `src/components/health-check/SecureLeadCapture.tsx`, `SecureInput.tsx` | Gate invalid client submissions, focus first invalid field, associate errors, disclose contact/answer submission and link existing Privacy Policy. Required fields and contact timing preserved. |
| `src/components/health-check/ResultDashboard.tsx`, `ResultVaultPreview.tsx` | Factual summary/answer labels, focused result heading and locale-aware result links. Existing score-band recommendations remain pending review. |
| `src/components/health-check/SecurityBadge.tsx` | Removed the unused unsupported encryption/identity badge after removing its caller. |
| `src/app/api/survey/route.ts` | Validate version/IDs/weights, preserve option identity and source in customData, retain legacy/CFO contracts, remove result data from operational logs. |
| `src/lib/leads/delivery.ts` | Ignore only the known generated survey timestamp at its exact path; retain answer/contact/score identity protections and uncertain-delivery controls. |
| Seven test files | Expanded health-score, survey API, HealthCheckSurvey, delivery and ProductHero tests; added construction-page and remaining-work browser tests. |
| `docs/booking-provider-settings.md` | Add October 10/11 evidence and explicit provider authorization/release gate. |

Test files: `src/lib/intake/health-score.test.ts`, `src/app/api/survey/route.test.ts`, `src/components/health-check/HealthCheckSurvey.test.tsx`, `src/lib/leads/delivery.test.ts`, `src/components/shop/ProductHero.test.tsx`, `src/app/[locale]/shop/[slug]/page.construction-copy.test.tsx`, `src/test/e2e/remaining-website-work.spec.ts`.

The prior Torres/intake/metadata commit and existing IRS service, rebuilt industries, homepage book placement, approved Torres story and Google review excerpts were preserved. No unsupported Fox logo, testimonial, rating, savings guarantee, new questionnaire or new download offer was added.

## Verification performed

Evidence folder: `.omx/security-live-audit-2026-10-11/`.

| Check | Exact result |
| --- | --- |
| Full unit suite | **1,427 passed; 0 failed/skipped**, 166 test-result files. `unit-results.json`. Includes every recovered option/weight, score boundaries and negative subtotal; legacy/versioned validation; real survey-plus-mocked-dispatch retries; changed-answer conflicts; concurrent/uncertain/storage-failure behavior; client 400/429/500, invalid JSON, false acknowledgement, network/deadline and double-submit cases. |
| Final rubric regression | **60/60 passed** in the targeted health-score rerun after adding an independent fixture for all seven recovered category/weight sets. `score-contract-final.json`. This additional test does not endorse the business rubric. |
| Standalone TypeScript | Passed, exit 0: `npm exec tsc -- --noEmit --incremental false`. |
| Scoped ESLint | Passed, **0 errors/warnings** for changed TS/TSX files and new browser tests. Initial command also listed JSON message files, which ESLint warned were outside its configuration; JSON imports/content were exercised by unit/build checks. |
| Production build | Passed, exit 0: `NEXT_DIST_DIR=.next-remaining-review npm run build`; built-in TypeScript and 86 static pages completed. Compile 105s. Generated review-only tsconfig includes were removed afterward; pre-existing includes retained. |
| Existing browser preservation suite | **20/20 passed** in the combined production run: EN/ES Torres links at 320/390/1920px, phone menu/Escape/focus, desktop keyboard navigation, separate assessment/intake routes, IRS/industry discovery and homepage book/product navigation/canonicals. |
| New browser suite | **8/8 passed** after correcting selectors: EN/ES book at 390/1920px, all card/accordion descriptions and schema offers; zero-choice identity at 320/390px; mocked acceptance/double-submit and mocked rejection/recovery/privacy link. |
| First combined browser attempt | 23 passed, 5 failed. Four failures expected a separate description text element where the actual markup combines title/description in a list item; one matched Next's route announcer alongside the application alert. Corrected selectors, then reran all eight new cases successfully. No application change was required for these failures. |
| Read-only provider rendering | Real public iframe/calendar grid loaded at 390/1920px, state ready, 45-minute duration observed. `booking-readonly.json`. No dates/slots/contact submitted; tracking POSTs blocked. |
| CMS recheck | Published product revision still `aY7Z7554SNEJL0Uz6cbSu3`; base price unchanged; no mutations performed. `cms-recheck.json`. Browser offers still 27/27/39/59, and mocked product tests preserve all commerce props. |
| Visual inspection | Inspected Spanish phone and English desktop screenshots of the corrected cards/open accordions. No horizontal overflow in tested layouts. |

No actual lead, email, calendar reservation, cart/purchase, payment/fulfillment or CMS publication was performed. Browser writes were blocked except explicit local mocked `/api/survey` responses. Public Sanity images and authorized calendar reads were allowed.

## Local timing measurement

Measured loopback HTTP headers/body completion for five sequential requests per route against the production review build. Warm header medians: Home **53ms**, Services **39ms**, English construction product **40ms**, Spanish construction product **37ms**. First Home request took **1,110ms** to headers. Evidence: `.omx/security-live-audit-2026-10-10/local-render-timings.json`, timestamp October 11.

These measurements exclude browser LCP/INP/CLS, Hostinger/network latency and a before/after comparison. They do not establish a public production performance improvement. The committed global blocking-metadata option can still increase waiting on asynchronous metadata; assess on the actual release environment before performance sign-off.

## Release decisions still required

1. **Product:** Jason/designated reviewer signs off the applied manuscript-backed English copy and Spanish equivalents. Decide when to synchronize the published CMS fields. Current storefront messages are authoritative for this known book's overview; CMS still contains the old positioning, including unused long-description content. Any publication must re-fetch the revision and preserve a backup. No mutation flag or price/format availability approval is inferred from tests.
2. **Assessment:** approve the exact recovered weights/bands, unknown/negative treatment, score meaning and service recommendations, contact-before-results/free-offer policy, minimum fields/privacy/consent/follow-up contract, and complete Spanish assessment. Keep promotion held until this clears. Confirm that the real receiver retains the new version/option-ID fields through authorized integration verification.
3. **Delivery migration:** old accepted/uncertain reservations were not rewritten or replayed. A pre-fix timestamp-bearing fingerprint may conflict on retry after this normalization change; retain the safe hold and use existing operator reconciliation with receiver evidence. Legacy numerical zeros cannot be retrospectively identified. Do not start another submission to bypass an uncertain record.
4. **Calendar:** authorized provider operator applies the already approved 30-minute calendar values and checks the resulting public widget/notifications. No parent-page CSS or iframe substitution can change the actual provider slot duration.
5. **Release:** obtain a new instruction for commit/merge/push/deployment and CMS/provider actions. Verify the deployed revision afterward. Keep physical-device/screen-reader/full Spanish assessment, real transaction delivery and hosted Web Vitals as unverified until their acceptance work is performed.

Ready for local code/content review. Remaining approvals and provider/integration work prevent an unconditional production launch sign-off.

The independent reviewer did not return findings before the session changed. The primary agent completed the final source/caller and whitespace review; no independent review sign-off is claimed.

## Rollback

Revert only this task's source hunks/commit after review; retain `1c9b500` unless reverting its specific navigation/metadata behavior deliberately. Remove any future assessment promotion entries first if approval is withdrawn. Never reset/stash unrelated work, reinterpret ambiguous historical answers, delete accepted records or automatically replay uncertain delivery. Restoring the old book copy would reintroduce the known manuscript mismatch; coordinate any rollback with content review.
