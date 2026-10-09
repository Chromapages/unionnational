# Restaurant and Construction: local rebuild review

Prepared for local review, October 7, 2026. The current user request authorized implementation; the attachment's embedded future-agent prompt was reference material. No commit, push, deployment, production CMS write, provider change, legacy redirect or real lead was performed.

## Implemented

Both existing industry routes now use a server-rendered experience with distinct restaurant and construction content in English and Spanish. Following the user's clarification, the pages bring back and prominently identify the original **Restaurant CFO Partnership** and **Construction CFO Partnership**, rather than presenting generic discussion topics. These names come from the original canonical route metadata at baseline revision `65c4e64`. Service descriptions recover the documented financial-reporting, restaurant cost/menu analysis, construction job-cost/WIP/billing and cash-flow areas without copying guarantees, quantified outcomes, automation promises or fixed cadences. The old client marketing templates were removed.

The pages include recognizable situations, defined CFO service areas, a review/setup/ongoing-guidance explanation, preparation guidance, factual inquiry FAQs and the existing contact form. Homepage, Services and directory highlights now describe the original services directly. No result figures, revenue thresholds, named partner commitments, outcome proof, price/free/duration claims, videos or book modules were carried into these page bodies or their metadata. The historical construction VSL's hybrid CFO/COO model and restaurant VSL's Tax Recovery Program are separate branding/delivery decisions; they are not silently substituted for the canonical CFO offerings.

Each primary CTA reaches its own embedded `#consultation-form`. The reused form has a bounded industry variant, optional phone/question fields, no uploads, an unchecked contact/privacy checkbox and warnings beside free text. The server validates the industry and derives its source page and business context; industry inquiries receive no speculative service classification. Existing general contact behavior remains covered by regression tests. Success means inquiry receipt, not a booked appointment. Existing uncertain-delivery quarantine and idempotency remain enforced.

Two equal discovery cards now appear on the homepage and Services. The directory's first two entries use neutral, descriptive copy. Its compact construction-story CTA now accurately says to explore construction support and no longer targets a removed story anchor; the proof block itself and homepage story anchors remain unchanged.

The restaurant VSL's hero, final and sticky actions now use the localized restaurant inquiry destination regardless of a conflicting CMS CTA URL. Other VSL content/defaults remain unchanged. This repairs the cross-industry action without redirecting or retiring a legacy route.

Broken industry image references were replaced with working existing repository assets: the restaurant illustration and a construction-site photograph. They are local-review candidates; their rights are not inferred from file availability. No client/partner photograph, logo endorsement or fake numeric reporting illustration was added.

## Route matrix

| Route | Local treatment |
| --- | --- |
| `/en/industries/restaurants`, `/es/industries/restaurants` | Rebuilt in place; unique factual metadata and existing canonical/locale alternates retained. |
| `/en/industries/construction`, `/es/industries/construction` | Same; no construction case outcome reused. |
| Homepage and `/services` in EN/ES | Two equal industry discovery cards; existing sections retained. |
| `/industries` in EN/ES | First two entries refreshed; other industries/order preserved. |
| `/vsl/restaurants` in EN/ES | Restaurant-specific CTA correction only; no redirect or indexing change. |
| `/vsl/construction`, generic `/vsl`, application routes | Existing behavior retained; migration and campaign decisions pending. |
| `/book`, `/intake`, general `/contact` | No provider, duration, qualification or destination change. General contact uses its existing default variant. |

Both canonical industries were already in the sitemap, which remains unchanged. Legacy VSL claims, scarcity, booking terms and fallback behavior outside the restaurant action override remain debt, not approved content for the rebuilt pages.

## Files affected

| Responsibility | Exact files |
| --- | --- |
| Existing route wrappers | `src/app/[locale]/industries/restaurants/page.tsx`; `src/app/[locale]/industries/construction/page.tsx`. |
| Retired page bodies | Deleted `src/app/[locale]/industries/restaurants/RestaurantIndustryClient.tsx`; `src/app/[locale]/industries/construction/ConstructionIndustryClient.tsx`. |
| New page foundation/content | `src/components/industries/IndustryServiceExperience.tsx`; its `.test.tsx`; `src/lib/industries/service-content.ts`. |
| Contact variant | `src/components/contact/MultiStepContactForm.tsx`; its `.test.tsx`; `src/app/[locale]/contact/actions.ts`; its `.test.ts`. |
| Form translations | `src/messages/en.json`; `src/messages/es.json`: new `IndustryContact` namespace only; earlier dictionary work preserved. |
| Discovery | `src/components/industries/IndustryDiscovery.tsx`; its `.test.tsx`; `src/components/home/ConsumerHome.tsx`; `src/components/services/ServicesDesktopExperience.tsx`; `src/components/industries/IndustriesDesktopExperience.tsx`. |
| Story-link accuracy | `src/components/industries/ClientInsightSection.tsx`; new `.test.tsx`. |
| Restaurant action override | `src/app/[locale]/vsl/restaurants/RestaurantVSLClient.tsx`; new `.test.tsx`; `src/components/vsl/UnifiedVSLTemplate.tsx`; `src/components/vsl/VSLFinalCta.tsx`. |
| Review artifacts | This document; `.omx/plans/industry-service-rebuild.md`; baseline, commands, logs and screenshots under `.omx/logs/industry-rebuild/`. |

## Verification and success criteria

| Check | Result / evidence |
| --- | --- |
| Tests | Restored-service revision: 43 tests passed in 10 relevant/regression files, including checks for both original CFO service identities and direct service descriptions. The 20 form/action tests also passed independently. Delivery was mocked. `tests-restored-services.log`; exact commands in `verification-commands.ps1`. |
| Types | `npx tsc --noEmit` passed; the final build also checked TypeScript. `types.log`. |
| Lint | Scoped `npm run lint --` across changed TS/TSX files passed with no warnings after the unused test import was removed. `lint-final.log`; contact follow-up lint. |
| Production build | Final restored-service `npm run build` passed with `NEXT_DIST_DIR=.next-industry-build-verified` and workspace-local TEMP/TMP, including TypeScript. `build-restored-services.log`. Default-cache and first sandboxed isolated attempts failed on EPERM; the isolated attempt also lacked DNS access for existing Google fonts. The authorized build with filesystem/network access passed. No provider configuration was changed. |
| Compiled HTTP | All four EN/ES canonical routes return 200, one H1, correct canonical and inquiry anchor; old broken image paths absent. Both optimized hero images return 200. Both legacy industry VSL routes still return 200. `production-checks.json`. No POST was sent. |
| Responsive | Actual rendered widths confirmed separately: 360, 390, 768, 1440px for both industries; scroll width equals client width. Primary CTA 56px; fields/submit 48px; privacy link 44px and checkbox label 64px at 390px. `responsive.json`. |
| Keyboard/forms | Primary links reach the correct local form. Empty submissions focus firstName and announce associated field errors. Spanish validation is localized. Enter expands each native FAQ; visible focus outline confirmed. No real inquiry was delivered. |
| Contrast | Computed site tokens and rendered CSS checked with WCAG luminance arithmetic: body 7.76–8.18:1, field labels 4.69:1, gold labels >=5.03:1, CTA 9.21:1, error text 4.51:1, focus/input border 17.99:1. Dedicated design-registry/contrast services were unavailable. This is scoped local evidence, not certification. `contrast.json`. |
| Regression/preservation | Book feature, tax-resolution sections and booking-calendar tests included. Independent read-only code review found no actionable defects. Baseline records prior dirty work; no changes to dependencies, Next configuration, proxy, sitemap, external settings or secrets were made for this rebuild. Generated industry TypeScript includes are removed after verification. |

Representative screenshots: `restaurants-desktop-1440.png`, `construction-desktop-1440.png`, `restaurants-mobile-390.png`, `construction-mobile-390.png` in `.omx/logs/industry-rebuild/`. The earlier preview process was unavailable at inspection, so a rendered before-image/performance baseline was not collected; source hashes were saved before editing. Native browser inspection was used for the rendered after-state.

No formal screen-reader session, actual 200% browser zoom, Lighthouse/field Core Web Vitals measurement, real webhook receipt, live email, calendar booking or production-host deployment test was performed. The rebuilt page bodies remove the previous Motion marketing templates and optional media dependencies; no numerical performance improvement is claimed. Existing localhost Sanity Live CORS warnings remain; live CMS settings were not changed to suppress them.

## Jason decisions before release

| Decision | Current state / safe default |
| --- | --- |
| Original services and remaining delivery details | User clarified that the original services should be brought back and highlighted. Canonical CFO service identities and documented core financial activities are restored. Confirm current deliverable details, cadence, software integrations, any hybrid CFO/COO or field-operations model and responsible partners; those additional commitments are not asserted. |
| Audience, exclusions and fees | Pending. No revenue band, franchise/startup eligibility, geographic promise, price, free offer, duration or response-time claim appears in the new experience. |
| Primary live journey and receiver mapping | Existing contact form is implemented for local review. Approve it as the live journey and verify the two industry-only payloads in an authorized test account/endpoint before release. No live booking is implied. |
| Process, collaboration and responsibility boundaries | Pending. Current copy asks visitors to confirm scope and secure sharing. Approve actual cadence, bookkeeping/project-manager collaboration and operations/legal boundaries. |
| Proof, team/partner roles and media rights | Omitted from new pages. Obtain current source records, wording, permissions, biographies and asset licenses before adding them. Confirm rights to the two reused hero assets. |
| Legacy traffic, redirects and indexing | Pending campaign/backlink/traffic inventory. No legacy redirect, deletion, noindex or canonical change was activated. Existing legacy marketing and application gates remain separate review work. |
| Measurement and completion definitions | No new tracker or conversion introduced. Approve consented events and supported completion evidence separately; a click, inquiry receipt and calendar readiness are different actions. |

## Review, release and rollback

Local preview: `http://localhost:3460/en/industries/restaurants` and `http://localhost:3460/en/industries/construction`; replace `/en/` with `/es/` for Spanish. The development process is loopback-only and has GA4 tracking disabled. Temporary production verification on port 3461 is stopped after checks. No environment file was edited.

Before any release: approve the content matrix and final copy; verify asset rights; confirm the host/runtime and intended inclusion of separately pending security/service work; exercise CRM delivery with an approved test destination; complete outstanding accessibility/performance checks; then separately authorize commit/push/deployment and any legacy migration. Do not use this local review as proof of lead quality or completed bookings.

Rollback only the scoped rebuild diff. Restore the two old client files from the recorded baseline revision if needed; use saved pre-edit dictionaries/Services source to preserve earlier dirty changes. Never reset or stash the whole checkout. No provider, CMS or redirect rollback is needed because none was changed.
