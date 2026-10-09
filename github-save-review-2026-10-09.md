# GitHub save and push approval — October 9, 2026

Status: PROPOSAL ONLY. Nothing staged, committed or pushed for this request.
Target: Chromapages/unionnational, origin/main. Local branch main, HEAD 65c4e6432f4ebf72dea5b83537c6923bb87c92e9.
Cached origin/main comparison is 0 ahead / 0 behind; no fresh fetch or remote-tip verification has been performed.
Existing construction-book and homepage tax-resolution visual commits are already in HEAD; the manifest below lists the remaining work.

## Summary plan
1. Approve the exact manifest and exclusions below. Approval of Git operations does not approve assessment implementation, live analytics activation, CRM/provider changes or content claims.
2. Recheck the checkout/index and remote tip; preserve every local change. If the file set changes materially, update the manifest before proceeding. Do not reset, clean, stash, force-push or silently replace shared files.
3. Review selected source/docs for credentials and private data without reading .env or customer records. Stage only listed paths explicitly; include the two obsolete industry-client deletions. Never use an unrestricted git add -A.
4. After approval of this plan, run npm run build with an isolated Next output directory (preserving the running dev server) and appropriate scoped unit/type/lint checks against mocks; no live leads, purchases or CRM tests. Recheck generated-file changes afterward. Existing earlier evidence is historical, not a pass for this combined snapshot.
5. Create four reviewable Lore-format commits on main for the groups below, preserving dependency order and keeping shared files coherent. Record actual verification and untested limits in trailers.
6. Verify the staged/committed file lists, then push the final reviewed commits once with git push origin main. Verify the remote branch matches the final commit. Leave excluded files locally; do not delete them.

## Proposed commits
| Commit intent | Changes to save | Evaluation / success criteria |
|---|---|---|
| Keep submission and payment processing bounded | Per-requester/global quota ordering, authenticated webhook/revalidation quotas, atomic Redis reservation capacity, operational counters, generic readiness output, server-only payment access, removal of unused Sanity write client, regression tests and runbooks; lockfile and CI additions. | Approved paths only; mocks/checks pass; accepted/uncertain delivery protections preserved. Provider/retention activation is separate. |
| Restore clear industry and overdue-tax service paths | Restaurant/Construction CFO pages and shared experience; remove superseded clients; fix Restaurant VSL CTAs; add discovery cards/contact variant; tax-resolution section/detail/local EN/ES content, navigation, sitemap and redirects; reusable CTA/FAQ presentation; Sanity image allowlist in shared next.config.ts. | Routes, form variant, links, shared templates and EN/ES remain consistent. Draft content and asset/delivery approvals remain release gates. |
| Make analytics reviewable while live access stays blocked | Fixture dashboard, report/API contracts, access guard, consent/privacy/tracking adapters, quota/cache scaffolding, locale-layout/proxy/CTA integrations, regression tests and local review documentation. | Live auth fails closed, collection defaults off, fixture preview unavailable in production. No provider or privacy setting is enabled by this commit. |
| Preserve assessment recovery before restoration | Financial-health recovery report, restoration proposal and this approval manifest. | Documentation only; seven-question/history contract preserved; no assessment application change or scoring approval implied. |

## Exact proposed manifest
124 file paths total: 63 previously tracked changes (including two deletions) and 61 additions (including this manifest).
M = modify; A = add; D = delete. This is a list for approval, not a staged index.

### Security, operations, dependency and CI follow-ups (30 paths)

| Status | Path |
|---|---|
| M | `.github/workflows/quality.yml` |
| M | `.gitignore` |
| A | `docs/operations/lead-storage-capacity.md` |
| M | `docs/operations/repository-release-security.md` |
| M | `docs/shop-fulfillment-recovery.md` |
| M | `package-lock.json` |
| M | `README.md` |
| M | `scripts/dependency-security.test.mjs` |
| A | `scripts/lead-storage-redis.test.mjs` |
| M | `scripts/summarize-operational-logs.mjs` |
| M | `scripts/summarize-operational-logs.test.mjs` |
| M | `src/app/api/revalidate/route.ts` |
| M | `src/app/api/shop/checkout/route.test.ts` |
| M | `src/app/api/shop/checkout/route.ts` |
| M | `src/app/api/shop/webhook/route.test.ts` |
| M | `src/app/api/shop/webhook/route.ts` |
| M | `src/app/readyz/route.test.ts` |
| M | `src/app/readyz/route.ts` |
| M | `src/lib/leads/delivery-protocol.mjs` |
| M | `src/lib/leads/delivery.test.ts` |
| M | `src/lib/leads/delivery.ts` |
| M | `src/lib/security/lead-ingress.test.ts` |
| M | `src/lib/security/lead-ingress.ts` |
| M | `src/lib/shop/payment-storage.ts` |
| A | `src/sanity/lib/client.test.ts` |
| M | `src/sanity/lib/client.ts` |
| M | `src/test/checkout.test.ts` |
| A | `src/test/e2e/security-oct6.spec.ts` |
| M | `src/test/revalidate-signatures.test.ts` |
| M | `src/test/revalidate.test.ts` |

### Service experiences and shared website components (47 paths)

| Status | Path |
|---|---|
| A | `docs/back-taxes-tax-resolution-detail-review.md` |
| A | `docs/back-taxes-tax-resolution-review.md` |
| A | `docs/industry-rebuild-review.md` |
| M | `next.config.ts` |
| A | `src/app/[locale]/back-taxes-irs-tax-resolution/page.tsx` |
| M | `src/app/[locale]/contact/actions.test.ts` |
| M | `src/app/[locale]/contact/actions.ts` |
| D | `src/app/[locale]/industries/construction/ConstructionIndustryClient.tsx` |
| M | `src/app/[locale]/industries/construction/page.tsx` |
| M | `src/app/[locale]/industries/restaurants/page.tsx` |
| D | `src/app/[locale]/industries/restaurants/RestaurantIndustryClient.tsx` |
| M | `src/app/[locale]/services/[slug]/page.test.tsx` |
| M | `src/app/[locale]/services/[slug]/page.tsx` |
| A | `src/app/[locale]/vsl/restaurants/RestaurantVSLClient.test.tsx` |
| M | `src/app/[locale]/vsl/restaurants/RestaurantVSLClient.tsx` |
| M | `src/app/sitemap.test.ts` |
| M | `src/app/sitemap.ts` |
| M | `src/components/contact/MultiStepContactForm.test.tsx` |
| M | `src/components/contact/MultiStepContactForm.tsx` |
| M | `src/components/home/ConsumerHome.tsx` |
| M | `src/components/home/FinalBookingCTA.tsx` |
| A | `src/components/industries/ClientInsightSection.test.tsx` |
| M | `src/components/industries/ClientInsightSection.tsx` |
| M | `src/components/industries/IndustriesDesktopExperience.tsx` |
| A | `src/components/industries/IndustryDiscovery.test.tsx` |
| A | `src/components/industries/IndustryDiscovery.tsx` |
| A | `src/components/industries/IndustryServiceExperience.test.tsx` |
| A | `src/components/industries/IndustryServiceExperience.tsx` |
| M | `src/components/layout/Footer.tsx` |
| M | `src/components/layout/FooterNavigation.tsx` |
| M | `src/components/layout/navigationData.test.ts` |
| M | `src/components/layout/navigationData.ts` |
| M | `src/components/layout/ServicesDropdown.tsx` |
| M | `src/components/services/CmsServicePage.test.tsx` |
| M | `src/components/services/CmsServicePage.tsx` |
| M | `src/components/services/ServicePageTemplate.tsx` |
| M | `src/components/services/ServicesDesktopExperience.tsx` |
| A | `src/components/services/TaxResolutionSection.test.tsx` |
| A | `src/components/services/TaxResolutionSection.tsx` |
| M | `src/components/shop/ShopFAQ.tsx` |
| M | `src/components/vsl/UnifiedVSLTemplate.tsx` |
| M | `src/components/vsl/VSLFinalCta.tsx` |
| A | `src/lib/industries/service-content.ts` |
| A | `src/lib/services/tax-resolution-content.test.ts` |
| A | `src/lib/services/tax-resolution-content.ts` |
| M | `src/messages/en.json` |
| M | `src/messages/es.json` |

### Analytics local implementation (44 paths)

| Status | Path |
|---|---|
| A | `docs/operations/analytics-local-review.md` |
| M | `src/app/[locale]/layout.tsx` |
| A | `src/app/analytics/layout.tsx` |
| A | `src/app/analytics/page.tsx` |
| A | `src/app/analytics/preview/page.test.tsx` |
| A | `src/app/analytics/preview/page.tsx` |
| A | `src/app/api/analytics/report/route.test.ts` |
| A | `src/app/api/analytics/report/route.ts` |
| A | `src/components/analytics/dashboard/AnalyticsDashboard.test.tsx` |
| A | `src/components/analytics/dashboard/AnalyticsDashboard.tsx` |
| A | `src/components/analytics/dashboard/FixtureDashboard.tsx` |
| A | `src/components/analytics/Ga4Boundary.tsx` |
| A | `src/components/analytics/Ga4Tracking.test.tsx` |
| A | `src/components/analytics/Ga4Tracking.tsx` |
| A | `src/lib/analytics/attribution.test.ts` |
| A | `src/lib/analytics/attribution.ts` |
| M | `src/lib/analytics/bookingFunnel.ts` |
| A | `src/lib/analytics/events.test.ts` |
| A | `src/lib/analytics/events.ts` |
| A | `src/lib/analytics/fixtures.ts` |
| M | `src/lib/analytics/footerInteractions.ts` |
| A | `src/lib/analytics/ga4-client.ts` |
| A | `src/lib/analytics/ga4-config.test.ts` |
| A | `src/lib/analytics/ga4-config.ts` |
| A | `src/lib/analytics/ga4-consent.test.ts` |
| A | `src/lib/analytics/ga4-consent.ts` |
| A | `src/lib/analytics/ga4-controller.test.ts` |
| A | `src/lib/analytics/ga4-controller.ts` |
| A | `src/lib/analytics/page-policy.test.ts` |
| A | `src/lib/analytics/page-policy.ts` |
| A | `src/lib/analytics/reporting.test.ts` |
| A | `src/lib/analytics/reporting.ts` |
| A | `src/lib/analytics/server/cache.ts` |
| A | `src/lib/analytics/server/ga4-client.ts` |
| A | `src/lib/analytics/server/quota.test.ts` |
| A | `src/lib/analytics/server/quota.ts` |
| A | `src/lib/analytics/server/reports.ts` |
| A | `src/lib/analytics/server/service.test.ts` |
| A | `src/lib/analytics/server/service.ts` |
| A | `src/lib/auth/analytics-access.test.ts` |
| A | `src/lib/auth/analytics-access.ts` |
| M | `src/proxy.test.ts` |
| M | `src/proxy.ts` |
| A | `unt-analytics-implementation.md` |

### Assessment recovery and approval record (3 paths)

| Status | Path |
|---|---|
| A | `financial-health-assessment-recovery.md` |
| A | `financial-health-assessment-restoration.md` |
| A | `github-save-review-2026-10-09.md` |

## Proposed exclusions — preserved locally
| Exclusion | Reason |
|---|---|
| 13 changed tracked .omx log/state/metric paths | Runtime evidence, machine-specific state and potentially private operational text; not application source. No content read for this plan. |
| 9 changed/deleted tracked test-results paths | Generated test output; preserve locally, omit both modifications and deletions. |
| tsconfig.json local diff | Only adds .next-recovery-3002-20261004-154447 type-cache paths. Not a functional application change. |
| 8 untracked .omx/analytics-implementation-baseline files | Local preservation copies; not new production modules. |
| 9 untracked .omx/plans files | Local execution drafts/commit-message scratch files. Keep the curated review documents listed above instead. |
| 4,070 untracked .omx/tmp files | Temporary compiled cache/evidence. Do not upload thousands of generated files. |
| Already ignored .env/secrets, node_modules, Next outputs, backups, logs and other generated artifacts | Never included in this manifest; .env and customer records not read. |

Exact tracked exclusions:
- `M .omx/logs/dev-recovery-3001.stderr.log`
- `M .omx/logs/dev-recovery-3001.stdout.log`
- `M .omx/logs/dev-recovery-3002.stderr.log`
- `M .omx/logs/dev-recovery-3002.stdout.log`
- `M .omx/logs/tmux-hook-2026-10-04.jsonl`
- `M .omx/logs/turns-2026-10-04.jsonl`
- `M .omx/metrics.json`
- `M .omx/state/autopilot-state.json`
- `M .omx/state/current-task-baseline.json`
- `M .omx/state/hud-state.json`
- `M .omx/state/notify-hook-state.json`
- `M .omx/state/skill-active-state.json`
- `M .omx/state/tmux-hook-state.json`
- `M test-results/.last-run.json`
- `D test-results/client-results-responsive--01ae6--content-contained-at-375px-chromium/error-context.md`
- `D test-results/client-results-responsive--5b215-d-3-column-layout-at-1024px-chromium/error-context.md`
- `D test-results/client-results-responsive--8306b-ed-1-column-layout-at-768px-chromium/error-context.md`
- `D test-results/client-results-responsive--c8b64-ed-1-column-layout-at-375px-chromium/error-context.md`
- `D test-results/client-results-responsive--cb75f-ed-1-column-layout-at-320px-chromium/error-context.md`
- `D test-results/client-results-responsive--df933--content-contained-at-768px-chromium/error-context.md`
- `D test-results/client-results-responsive--e18a1-d-3-column-layout-at-1280px-chromium/error-context.md`
- `D test-results/client-results-responsive--fc577-d-3-column-layout-at-1440px-chromium/error-context.md`
- `M tsconfig.json`

## Important limits before approval
- This is a broad save of multiple already-local tasks, not a new feature implementation request.
- Current GitHub workflows Quality and Source security run on pushes to main. No repository deployment workflow was found among the two workflow files; connected Hostinger auto-deployment remains unverified. Confirm this consequence before approving a main-branch push if deployment must remain separately blocked. No deployment command/provider setting will be changed.
- Tax-resolution wording remains draft pending Jason's service-scope, EN/ES, calendar and privacy review.
- Industry release still needs content/asset rights, approved live journey and CRM mapping review; no added unsupported proof, partner or fee commitments are authorized.
- Live analytics remains disabled/unwired: identity, provider/property, privacy registry and reporting adapter approvals are outstanding. Saving scaffolding is not activation.
- Financial Health Assessment restoration is not implemented or approved. Only its two recovery/planning documents will be committed.
- Security follow-ups require host/proxy/Redis/private-payment configuration and recovery ownership review; missing configuration can intentionally make submissions/checkout unavailable. Redis reservation counters are conservative and do not decrease; do not delete receipts to free capacity.
- package-lock.json includes existing @emnapi/wasm optional-dependency and source-map-js changes. This plan does not install, upgrade or add dependencies.
- Earlier task reports record passing local checks, but the combined current manifest has not been freshly built/tested. No current test/build pass is claimed here.
- Excluded tracked/generated changes will remain in the working tree after commit. A dirty runtime tree does not mean application files were omitted.

Awaiting user's explicit approval of this manifest, exclusions, validation and main-branch push before any Git mutation.
