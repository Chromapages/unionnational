# Construction book feature: local review

Status: homepage implemented locally; product-page replacements below are proposals only. No product, price, identifier, edition, checkout, CMS, metadata, consent or analytics changes were applied. No commit, push or deployment.

## Scope and implementation

The supplied handoff and companion are reference material; their embedded future-agent prompt does not override Eric's current request. Current request authorizes the local homepage feature and explicitly reserves product-copy changes for approval.

The English homepage now ends: client results → construction-book feature → closing consultation. The actual consultation heading is “You know the options. Now clarify the next step.” English copy is stored under `ConsumerHome.constructionBook` in the existing message source. Spanish renders no new feature. The square Sanity cover is the same asset observed on the product page and is optimized, lazy-loaded, sized explicitly, and contained without cropping. The feature has one locale-aware internal link and no client script, tracking, form, price or purchase control.

## Proposed product-page replacements — awaiting approval

Product: Sanity document `038a9b49-ee53-4e6a-9897-e9fe51693396`, slug `the-money-making-blueprint-for-construction-companies`. Identity/cover and current copy were verified in the locally rendered CMS-backed product page. Direct public API inspection failed its TLS connection; no credentials were accessed to work around it.

| Existing slot/source | Current rendered copy | Proposed replacement / scope |
| --- | --- | --- |
| `title.en` → product H1 | The Money‑Making Blueprint for Construction Companies | The Money-Making Blueprint for Construction Companies. Preserve identity, slug and all IDs; this only normalizes the supplied title punctuation if approved. |
| `src/messages/en.json`: `Shop.Desktop.books.construction.description` → hero, metadata and existing Product schema description | A contractor-focused guide to job costing, subcontractor compliance, equipment depreciation, cash flow management, and business tax planning. | Replace with the exact proposed short description below after approval. It is currently the display source ahead of CMS `shortDescription.en`; align CMS description separately only with authorization to mutate CMS. |
| `Shop.ProductPage.bookHighlights.construction[0]` | Job costing / Project costs and cash flow. | Job costing / Track project costs and margins. |
| Same `[1]` | Equipment / Equipment depreciation considerations. | Project systems / Plan work and clarify responsibilities. |
| Same `[2]` | Tax planning / Business tax topics for contractors. | Cash flow / Connect billing with upcoming cash needs. |
| CMS `features[0]` → coverage point 01 | Job costing — know which projects make money and which ones bleed | Job costing and estimating to understand project costs and protect margins |
| CMS `features[1]` → coverage point 02 | Equipment depreciation and Section 179 strategy | Project systems for scheduling, subcontractor accountability, and quality control |
| CMS `features[2]` → coverage point 03 | Cash flow management for project-based billing cycles | Cash flow, change orders, and leadership for a growing construction business |
| CMS `features[3]` → first expandable takeaway | Payroll and tax strategy built specifically for contractors | Follow project performance from the original estimate through weekly cost reviews, change orders, and billing. |
| CMS `features[4]` → second expandable takeaway | Margin tracking and overhead alignment for construction operations | Give your team clearer scopes, schedules, quality standards, and responsibilities so fewer decisions depend on the owner. |
| CMS `learningObjectives[0]` | Master Job Costing / Track labor, materials, and overhead per project to know your real profit on every job. | Know your job costs / exact description below. |
| CMS `learningObjectives[1]` | Fix Cash Flow / Manage the gap between job start and payment collection to eliminate the feast-or-famine cash cycle. | Plan your cash needs / exact description below. |
| CMS `learningObjectives[2]` | Reduce Your Tax Bill / Use S-corp structuring, equipment depreciation, and deduction strategy built for the construction industry. | Protect project margins / exact description below. |
| CMS `learningObjectives[3]` | Stay Compliant / Properly classify subcontractors, issue 1099s, and protect your business from IRS penalties. | Build repeatable operations / exact description below. |
| Product-specific author display | Author: Jason Astwood | By Jason Astwood, EA. Do not rename the shared author document merely to alter this page. |
| Product-specific disclosure labels | Read the publisher’s key takeaways / A closer look at what you’ll learn inside. / Read the learning objectives | See how the ideas connect / Connect financial decisions in the office with the work happening on the jobsite. / What you'll learn. Shared defaults must stay unchanged for other books. |
| Question label and existing generic `/faq` link | Have a question? / View our FAQ | Optional label: Questions about the book? Keep “View our FAQ” and its destination unless book-specific FAQs are separately approved and added. Do not apply the appendix's “Read the book FAQs” CTA now. |
| Format selection, Add to cart, selected-edition heading | Choose your format / Add to cart / Your selected edition | Already match the supplied direction; keep them. Proposed helper “Review your selection in the cart.” is optional, copy-only and product-scoped. |
| Official subtitle | No separate field/visible line in this template | Supplied subtitle below needs a separately approved visible slot; do not replace the description with it or change the layout silently. |

`BookOverview` consumes the first three `features` as coverage points and the remaining features as takeaways. Its learning objectives currently come directly from the CMS projection. Most general labels are shared across products, so any approved later implementation must scope their copy to this book rather than alter other books. The precise localized shape of each live feature entry was not confirmed through the failed direct API request; verify that shape in the authorized editor before changing it.

### Exact proposed copy for existing slots
### Product page — cover callouts

Use these three pairs in the existing small callouts beside the book cover.

1. **Job costing**\
   Track project costs and margins.
2. **Project systems**\
   Plan work and clarify responsibilities.
3. **Cash flow**\
   Connect billing with upcoming cash needs.

### Product page — hero

**Category**\
Construction

**H1 / product title**\
The Money-Making Blueprint for Construction Companies

**Official subtitle**\
Systems, Structure & Leadership for Running a Profitable, Scalable Construction Business

**Short description**\
A practical guide for construction-company owners who want a clearer view of job costs, stronger project systems, and less day-to-day firefighting. Learn how to connect estimating, scheduling, cash flow, and leadership across your business.

**Author line**\
By Jason Astwood, EA

**Format selector heading**\
Choose your format

**Purchase button**\
Add to cart

**Selected-edition heading**\
Your selected edition

**Cart helper text**\
Review your selection in the cart.

**Question link label**\
Questions about the book?

**Question link CTA**\
Read the book FAQs

### Product page — overview

**Heading**\
Bring your numbers and your projects together

**Body**\
A busy schedule can make it hard to see where profit is slipping. Labor overruns, unclear scope, delayed billing, and rework all affect what a job earns.

This book connects financial management with day-to-day project execution. It walks through the systems behind estimating, job costing, project kickoffs, subcontractor accountability, quality control, change orders, and cash flow, then shows how clear roles and leadership support growth.

### Product page — existing coverage section

**Section heading**\
What the book covers

**Three numbered highlights**

01 — Job costing and estimating to understand project costs and protect margins

02 — Project systems for scheduling, subcontractor accountability, and quality control

03 — Cash flow, change orders, and leadership for a growing construction business

**Expandable takeaways trigger**\
See how the ideas connect

**Expandable takeaways introduction**\
Connect financial decisions in the office with the work happening on the jobsite.

**Two takeaways**

- Follow project performance from the original estimate through weekly cost reviews, change orders, and billing.
- Give your team clearer scopes, schedules, quality standards, and responsibilities so fewer decisions depend on the owner.

**Learning objectives trigger or heading**\
What you'll learn

**Learning objective 1 — Know your job costs**\
Track labor, materials, subcontractors, equipment, and overhead. Compare actual costs with the estimate and the work still to complete to understand where a project's margin is heading.

**Learning objective 2 — Plan your cash needs**\
Connect billing and collections with payroll, materials, subcontractor payments, and retainage. Use a rolling forecast to spot potential cash gaps and plan ahead.

**Learning objective 3 — Protect project margins**\
Build estimates around a clear scope, realistic production rates, and overhead. Use documented change orders and regular cost reviews to address work that puts the margin at risk.

**Learning objective 4 — Build repeatable operations**\
Create a consistent approach to kickoffs, lookahead schedules, subcontractor coordination, and quality checks. Set clear roles and review team performance as the business grows.


The exact copy above is reproduced from the supplied companion for review, not applied. The book-specific FAQ CTA and separate subtitle slot remain exceptions requiring the decisions noted in the table.

## Optional additions and release blockers

Do not add the companion's overview, practical-material list, audience, author section, book FAQs or closing purchase CTA without a separate decision. Proposed SEO/sharing rewrites and advisory-CTA copy are also held behind product-content approval. Existing offer/schema values, product IDs, canonical and checkout remain unchanged.

Before release: approve and correct the product's unsupported tax-topic/outcome claims; resolve the separately identified price/format mapping discrepancy with the owner. No prices were inferred or reconciled. Edition availability, delivery, refund conditions and checkout operation remain unverified. No cart, order, payment or real lead was submitted.

## Changed files

- `src/components/home/ConstructionBookFeature.tsx`: static feature using existing container, optimized image and locale-aware link.
- `src/components/home/ConsumerHome.tsx`: one import and English-only insertion before `FinalBookingCTA`; previous tax-resolution work preserved.
- `src/messages/en.json`: only the new `ConsumerHome.constructionBook` copy; existing translations preserved.
- `src/components/home/ConstructionBookFeature.test.tsx`: one focused content/route/image/accessibility contract check.
- This review document; local baseline, logs and screenshots in `.omx/logs/construction-book/`.

## Verification and success criteria

| Check | Result |
| --- | --- |
| Tests | Four relevant files, 12 tests passed: book feature, homepage outcomes, booking CTA and tax-resolution section. |
| Lint / types / build | Scoped ESLint and `tsc --noEmit` passed; production build passed. Existing package scripts inspected; no installs or provider writes. |
| Placement and locale | Rendered English feature directly between `client-results` and `contact`; one H1; Spanish checked separately. |
| Responsive layout | No horizontal overflow at 320, 375, 390, 768, 1280 and 1440px. Cover is square, 240px on small mobile and 280px from 640px, with `object-fit: contain`. CTA is 56px tall. |
| Accessibility | Named section and H2, real HTML copy, useful cover alt, one tab-stop CTA, visible 2px focus outline with 4px offset. Computed token contrast: eyebrow 5.03:1, body 7.76:1, heading 18.37:1, CTA 17.07:1; border 6.31:1. Hover/active token pairings also pass. |
| Navigation | Explore link reaches existing English product page; Back restores homepage feature. No checkout action performed. |
| Image / performance | Existing Sanity asset successfully loaded through existing optimized image pipeline. Explicit 1620×1620 intrinsic ratio, responsive sizes, lazy loading, no new preload or client component. |
| Limits | Dedicated design-registry/contrast services unavailable: CSS tokens and rendered DOM plus WCAG luminance arithmetic used. Native browser zoom shortcuts did not change zoom, so actual 200% zoom remains unverified; narrow-viewport reflow was checked. No formal screen-reader session, performance benchmark or checkout test. |

Screenshots: `.omx/logs/construction-book/desktop-1440.png`, `mobile-390.png`. Evidence and preserved-work hashes are kept beside them. A visual similarity score is not claimed because no section mockup was supplied. Existing homepage/layout issues outside this feature were preserved.

Preservation check: 845 existing source/configuration/document files recorded; only `ConsumerHome.tsx` and `en.json` changed. Removing just the new import/insertion/copy block reproduces their starting content exactly. HEAD is unchanged. Browser warnings included existing localhost Sanity Live CORS configuration, shared smooth-scroll guidance and extension errors. The cover generated an LCP advisory when it became the first visible image during restored navigation; it remains intentionally lazy because its normal position is below the fold. No provider configuration was changed to suppress those warnings.
