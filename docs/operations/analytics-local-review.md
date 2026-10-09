# UNT analytics: local review and activation gates

Eric authorized local implementation and synthetic fixtures. Staff sign-in is deferred; the production guard stays closed. Conservative exclusions are approved for fixtures only. No credentials, dependencies, provider/privacy settings, commits, pushes or deployments were changed.

## Phase results and success criteria

| Phase | Local result | Remaining gate |
| --- | --- | --- |
| Baseline | `main`, HEAD `7301488f962bafa1791762e4fe4140fe3a37abd9`; 46 pre-existing dirty/untracked source hashes preserved. Integration copies saved in `.omx/analytics-implementation-baseline/`. | Preserve unrelated service/security work throughout release. |
| Privacy | Positive candidate registry contains About/Team only. Unknown pages, queries, fragments, campaigns and events are rejected. | Owner approval for live registry. Homepage, Services, tax-resolution, contact, booking, intake, assessments, payments, Studio and dashboard remain excluded. |
| Tracking | Disabled by default, separate purpose consent, fixed sanitized context, manual views and reviewed CTA bridge. | Live privacy/provider acceptance and Google test-property verification. Legacy bundled consent never grants GA4 consent. |
| Conversions | Explicitly unavailable. | Authenticated completion evidence and approved definitions; clicks/readiness are not leads/bookings or a same-user funnel. |
| Staff access | Production guard always returns `auth_not_configured`. | Approved maintained identity integration, membership and revocation/session policy; no fake cookie/header identity. |
| Reporting | Fixed templates, bounded dates, property-timezone validation, auth before cache/delivery, quota/cache/deadline contracts tested through injected transports. | Production Google token/property and shared quota adapters deliberately unwired. No credentials read or live Google report fetched. |
| Dashboard | UNT tokens/components; accessible chart plus table, metadata and honest availability states. | `/analytics` has no reports. Fixture preview requires development, explicit flag and loopback Host; production preview is 404. |
| Release/rollout | Local evidence and rollback instructions. | Hosting validation, live native-GA comparison, credentials/provider/privacy work, push and deployment require separate authorization. |

## Review locally

Preview: `http://localhost:3458/analytics/preview`. All values and dates are invented and labeled. The availability selector exercises ready, empty, unconfigured, unavailable and stale reports; date controls regenerate fixtures without fetching data.

To recreate it, set `ANALYTICS_FIXTURE_PREVIEW=true` and `GA4_TRACKING_ENABLED=false` only in a child development process, then run `node scripts/dev-server.mjs 3458 .next-analytics-fixture`. Do not edit environment files or use preview gating as staff authentication.

## Changed files

| Responsibility | Files |
| --- | --- |
| Contracts, fixtures, privacy | `src/lib/analytics/reporting.ts`, `fixtures.ts`, `page-policy.ts`, `attribution.ts`, `events.ts`, `ga4-consent.ts`; paired tests except fixtures, covered by dashboard tests. |
| Collection runtime | `src/lib/analytics/ga4-config.ts`, `ga4-controller.ts`, `ga4-client.ts`, configuration/controller tests; `src/components/analytics/Ga4Tracking.tsx`, `Ga4Boundary.tsx`, `Ga4Tracking.test.tsx`. |
| Reporting/access | `src/lib/auth/analytics-access.ts` and test; `src/lib/analytics/server/cache.ts`, `reports.ts`, `ga4-client.ts`, `quota.ts`, `service.ts`, quota/service tests; `src/app/api/analytics/report/route.ts` and test. |
| Dashboard | `src/components/analytics/dashboard/AnalyticsDashboard.tsx`, `AnalyticsDashboard.test.tsx`, `FixtureDashboard.tsx`; `src/app/analytics/layout.tsx`, `page.tsx`, `preview/page.tsx`, `preview/page.test.tsx`. |
| Existing integrations | `src/app/[locale]/layout.tsx`, `src/proxy.ts`, `src/proxy.test.ts`, `src/lib/analytics/bookingFunnel.ts`, `footerInteractions.ts`. Existing public vendors and operational queues preserve their behavior. |
| Review artifacts | `unt-analytics-implementation.md`, this document, baseline copies and `.omx/logs/analytics/` evidence. |

## Verification

| Check | Evidence / limitation |
| --- | --- |
| Full coverage | 159 files, 1,286 tests passed before final review fixes. Statements 89.65%, branches 83.71%, functions 86.26%, lines 91.32%. `coverage.log`. |
| Integration recheck | 18 files, 186 tests passed after consent/CTA regressions were added. Final task-deferred navigation check: six tracking tests passed. `tests-final.log`, `review-regressions.log`. |
| Types/lint | TypeScript passed. Repository lint: zero errors, 226 existing warnings. Scoped analytics lint: zero errors, one existing unused layout import warning. `typecheck-final.log`, `lint-repository.log`, `lint-final.log`. |
| Build | Production build passed; repeat after final navigation fix recorded in `build-final.log`. No dependencies installed. |
| Compiled HTTP | `/analytics`: no reports, access unconfigured, noindex. API: 503 `auth_not_configured` despite forged staff cookie/header or property query. Production preview: 404 even with preview flag. Localized alias: 307 to isolated dashboard. Public About: no GA4 loader. Analytics responses private/no-store. `production-checks.json`. |
| Browser | Contained at 320/390/768/1440px; one H1/main; controls >=44px, disclosure 48px; visible keyboard outline, Enter expands daily values; reversed dates announce errors; missing data never becomes zero. |
| Contrast | Computed site CSS + WCAG relative-luminance calculation: observed text >=7.76:1, chart gold 5.30:1 and green 14.56:1 against white, input border 6.65:1. Dedicated token/contrast services unavailable; local evidence is not formal certification. |
| Resources/review | Preview inventory: 95 local assets, no external assets/scripts. Independent review caught expiry and click-order issues; fixes have regression checks. SVG title changed to one string, and a fresh load did not reproduce its hydration error. Browser extension errors are external to the app. |

Screenshots: `.omx/logs/analytics/mobile-390.png` and `desktop-1440.png`. No visual-match score: no dashboard reference image was provided. No formal screen-reader or live Google session was run. Browser interactions and HTTP checks cover local end-to-end behavior; no additional Playwright suite was added.

## Owner decisions before live work

1. **Identity:** provider, staff membership, MFA/session requirements and revocation. Guard remains closed until implemented and reviewed.
2. **Privacy:** pages/events/campaigns, purposes, notice, retention, consent expiry and cookie withdrawal/deletion. The current 180-day choice lifetime is a fixture proposal. Withdrawal stops collection and replaces the document; existing Google cookies are not claimed to be removed. If all browser persistence fails, only the current document can reliably stay paused; the UI reports this without automatic reload.
3. **Google:** fixed property/measurement IDs, verified timezone/collection start, readonly identity, enhanced-measurement/history settings, endpoint/CSP and vendor coexistence review. Manual views require `send_page_view:false` plus independently disabling automatic history-based views in administration.
4. **Infrastructure/reporting:** host runtime and shared quota storage; native GA4 comparison and definitions. Live adapter currently returns one period; missing prior-period comparisons are labeled unavailable. Authenticated dashboard fetching and live comparison wiring are deferred activation work.
5. **Legacy debt:** existing marketing/chat policy does not exclude homepage/Services tax-resolution content. New GA4 registry excludes it; legacy policy was preserved. Resolve coexistence before live activation.

Client activation requires all four flags true: `GA4_TRACKING_ENABLED`, `GA4_PRIVACY_APPROVED`, `GA4_PROPERTY_SETTINGS_CONFIRMED`, `GA4_VENDOR_REVIEW_APPROVED`, plus valid measurement ID, approved origin, page keys and campaigns. None were enabled. Flags alone do not configure staff auth/reporting.

References: [manual views](https://developers.google.com/analytics/devguides/collection/ga4/views), [consent](https://developers.google.com/tag-platform/security/guides/consent), [custom layer](https://developers.google.com/tag-platform/tag-manager/datalayer), [disable control](https://developers.google.com/tag-platform/security/guides/privacy).

## Rollback

Leave live flags off. Remove only the added analytics modules/routes/components and explicit integration imports/calls, using the baseline copies. Do not reset the dirty checkout. Remove only generated analytics TypeScript include paths if Next adds them again; stop only analytics child processes. No provider/credential/deployment rollback is needed.
