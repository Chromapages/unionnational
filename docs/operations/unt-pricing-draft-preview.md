# UNT pricing local draft handoff

Ready for local review only. October 12 amounts remain pending Jason's commercial approval. No commit, push, deployment, CMS write/publication, Stripe change, live lead, appointment or charge was performed.

## Preview

The isolated preview is at `http://127.0.0.1:3012/en/pricing` and `/es/pricing`. Also review `/en/services`, `/es/services`, and both locales of `/fractional-cfo`, `/strategic-bookkeeping`, `/payroll-services`, `/tax-planning`, `/tax-preparation-and-filing`, `/back-taxes-irs-tax-resolution`.

If the preview stops, run from the repository in PowerShell:

```powershell
$env:UNT_PRICING_PREVIEW = '1'
$env:NEXT_DIST_DIR = '.next-unt-pricing-preview'
node node_modules/next/dist/bin/next dev --webpack --hostname 127.0.0.1 --port 3012
```

The flag works only when `NODE_ENV=development`; production builds cannot activate the working-ledger fixture. No `.env` change was made. Fixture identifiers are `fixture:*`, never Sanity document IDs. Preview pages have visible draft labels and `noindex`. Paid offers open the existing inquiry form; discovery booking remains `/book`. The contact form does not automatically consume service context. Inspect existing booking/forms/commerce without submitting transactions.

Next development/build commands automatically append their output directories to `tsconfig.json`. This task removed its own four generated entries while retaining all preexisting local entries; restarting the preview may append them again.

## Scope and architecture

Read the complete local implementation plan and ten-offer ledger at `C:\Users\ericb\Downloads\Union National Tax Pricing and Sanity Implementation Plan.md`. The ledger, rather than the unrelated repository pricing PDF, supplies draft amounts. The October 12 PDF was not independently retrieved.

Started on `fix/live-release-audit-2026-10-10` at `1c9b50062048fbecfaa169ed68a37af06827842a`, one navigation commit after audited `097c693fe548c2c3655ab09f110490a5f6672910`. Kept that newer navigation behavior and unrelated dirty health-check, commerce, env, delivery, docs and runtime work. Both translation files were checked against saved local originals: only the six stale comparison price values changed; all other translation content is identical to its initial local state.

Selected additive architecture:

- Reuse `pricingTier` display strings and `servicePage` content. Optional localized `priceNote` is needed for exclusions, setup disclosure and separate credit rules.
- `pricingPage` owns hero, ordered offer references, FAQ, closing and SEO instead of borrowing `servicesPage`. Missing/duplicate pages and malformed references fail to neutral content; there is no fallback to all legacy tiers.
- `service.pricingOffers[]` and `servicePage.included.pricingOffers[]` share the same projected prices. Compatibility fields remain readable, but affected paths do not restore their superseded prices.
- `pricingPage.irsReviewOffer` explicitly connects the IRS page's existing local narrative to a selected offer. No IRS CMS service was observed, so no nonexistent document is referenced. The IRS selector must also be in ordered offers.
- Schemas, query exports, shared types, Studio entry and signed revalidation support are included. Studio resolves actual documents by type, with uniqueness validation, rather than inventing a singleton ID.

Removed hardcoded tax tables, dormant conflicting tables/benefits/comparison, name-derived tiers, forced three-plan layouts, unconditional implementation fees, annual-label assumptions and stale comparison prices. CMS order, features, translations and actual cadence are respected. All ten offers retain qualifiers, Federal+Utah limits and distinct credits. No payment terms, setup amount, revenue tiers, new inclusions or guarantees were invented.

The local fixture overlay replaces unapproved legacy commercial inclusions/FAQs, the filing hero's audit-protection promise and quarterly process steps on affected non-IRS details. It preserves the IRS narrative/disclaimers. Outside fixture mode, CMS authors must update those fields during a separately authorized migration; frontend support does not itself approve inherited CMS claims. `/fractional-cfo` and its redirect stay. Service final CTAs remain fixed booking CTAs, not CMS closing-destination overrides. Homepage, industry forms, books/commerce, booking implementation and `/health-check` versus `/intake` remain outside this diff.

## Evidence

Private review artifacts are under `.omx/tmp/unt-pricing-preview/`:

| Check | Result |
| --- | --- |
| Full `npm test -- --maxWorkers=2` | 176 files / 1,530 tests passed before final small fixes |
| Final focused pricing/schema/service/revalidation suite | 13 files / 126 tests passed after final fixes |
| `npm run build` with isolated production output | Passed compilation, TypeScript and 86/86 static pages; fixture disabled |
| Additional strict TypeScript check | Passed |
| `npm run lint` | Zero errors, 212 existing/inherited warnings |
| Repository dependency/source guard tests | 15 passed |
| Scoped source credential scan | No findings; final artifact records exact paths |
| Dependency audit, production dependency tree | 11 high, 5 moderate, 0 critical findings in unchanged dependencies; existing mitigation tests do not clear that audit |
| Chrome browser checks | Final frozen run: 10 passed, both locales/four widths, keyboard tabs, CSS 200% zoom, detail/shared prices, safe destinations and redirect |

Earlier browser runs hit cold compilation and intermittent development keyboard/hydration failures. The failing case and eight concurrent views passed diagnostics with no page errors; the exact earlier cause was not confirmed. The final frozen run passed. Browser tests block all submissions and external traffic except read-only public Sanity brand images. Unmodified Sanity Live warns that this localhost origin lacks production CORS permission; no CORS setting was changed. Firefox/WebKit, hosted rendering, production webhook delivery, authenticated Studio editing, live integrations, field/p75 Core Web Vitals, Lighthouse and a comprehensive OWASP audit were not verified.

The whole-repository source guard reports two credential-URL matches inside a preexisting generated unit report for the reserved `unt.example` test host. That artifact was preserved, not suppressed or changed. The scoped scan has no credential findings. No dependency or lockfile changes were made; audit remediation needs its own reviewed scope.

Screenshots: `screenshots/pricing-{en,es}-{320,375,768,1280}.png`, `screenshots/services-{en,es}-1280.png`, `screenshots/payroll-{en,es}-1280.png`, `screenshots/irs-{en,es}-1280.png`. Mobile images show the initial viewport; desktop pricing captures the full page. No reference design was supplied, so visual review checks the preserved UNT brand and the bounded brief, not pixel fidelity. Existing theme/branding were preserved; no theme redesign or imagery generation was added.

The scoped patch is `.omx/tmp/unt-pricing-preview/unt-pricing-local.patch`; its manifest lists every changed file. Translation diffs are relative to their initial local versions, so unrelated dirty edits are excluded. Runtime logs, CMS inspection snapshots and screenshots are review artifacts, not release contents.

## Editor and release holds

Read [exact Sanity editor checklist](./unt-pricing-cms-editor-checklist.md) and [migration/rollback runbook](./unt-pricing-migration-rollback.md). Published-only inventory found 14 pricing records, seven services, seven service pages and no pricing page in `p1x9y3wz/production`. Real observed IDs/revisions are recorded. There is no authenticated draft inventory, no complete restoration backup and no approved offer-ID reuse map. The inspection snapshot is not a migration backup.

Outstanding decisions: Jason's dated offer approval; CPOB identity, payroll/cadence and owner/entity/state limits; payroll setup/additional-run policy; filing complexity and personal-planning boundaries; annual/quarterly planning; credit eligibility/trigger; claims and Spanish copy; paid inquiry context; actual hosting/deployed revision and webhook filter; publication/deployment approver.

Migration remains a proposal: inventory full published/draft originals, make private backups, review bounded field diffs, use existing mutation safeguards plus write-time `ifRevisionID`, prepare only separately authorized drafts and keep publication separate. Rollback must restore compatible code/content while preserving intervening editor changes and original drafts. No migration/rollback executable or mutation was added.
