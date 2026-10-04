# Resources client decisions — 2026-10-01

## Newsletter: functional defect

`ResourcesDesktopExperience` submits to a `mailto:hello@unionnationaltax.com` URL with the entered address in the request body. It opens the visitor's email client; it does not subscribe, persist consent, or confirm delivery. No newsletter subscription API/provider was found in the application. The page retains **Request updates**, explicitly describes the email action, and does not claim a subscription or successful signup. Decide whether to connect a real subscription provider/consent flow or intentionally keep manual requests. No email was sent during verification.

## Overlapping posts: editorial decisions, no deletion

- Entity comparison: [LLC vs S-Corp vs C-Corp](http://localhost:3001/en/blog/llc-vs-s-corp-vs-c-corp-real-tax-impact-2026), [S-Corp vs LLC](http://localhost:3001/en/blog/s-corp-vs-llc-which-saves-more-money), [LLC vs S-Corp](http://localhost:3001/en/blog/llc-vs-s-corp-choosing-right-business-structure-tax-savings), and [Utah contractor comparison](http://localhost:3001/en/blog/s-corp-vs-llc-utah-contractors). Review general-versus-local scope and canonical/merge strategy; preserve URLs until an editorial decision.
- HVAC: `tax-deductions-for-hvac-contractors-a-year-round-guide` and `why-your-hvac-business-overpaid-taxes`. Deductions/documentation versus entity choice/proactive planning; differentiate titles/internal linking.
- Restaurants: `restaurant-tax-secrets-how-qsr-owners-can-protect-the-fica-tip-credit` and `the-no-tax-on-tips-rule-explained-what-qsr-owners-must-do-right-now-to-protect-the-fica-tip`. Review overlapping credit/reporting guidance. `the-2026-restaurant-survival-guide-how-to-protect-your-margins-when-everything-costs-more` is broader operational guidance.

All published posts remain available through the catalog. The default relevance order separates related HVAC/restaurant/entity-comparison clusters. User-selected date or alphabetical sort follows that requested order. One category reference is dangling in CMS and should be repaired; rendering tolerates null category entries.

## Freshness

Latest source date is **May 29, 2026** (`tax-deductions-for-hvac-contractors-a-year-round-guide`), verified against the published catalog. No dates or article text were edited. The hero no longer labels a post latest, and starter selection is relevance-based. Publish a new, reviewed article when ready; do not refresh a date without reviewing the content.

## Checklists, tools, and catalog scope

Published CMS inventory is **46 blog posts and zero playbooks**, rather than 47 real resources. The former fallback “The S-Corp Advantage” was fabricated in the UI and pointed to a hub route with no CMS record; it was removed.

No checklist-titled published posts exist. Implemented inline legacy mobile components include ConstructionTaxChecklist, SCorpElectionChecklist, SCorpSavingsCalculator, TaxHealthScore and JobCostCalculator. Actual assessments exist at `/construction-profitability-assessment`, `/proactive-cfo-assessment`, and `/restaurants/profit-leak-assessment`; the Deduction Finder is marked coming soon. Those components/routes were not deleted. The simplified Resources catalog now presents published articles/guides consistently on desktop and mobile. Decide on a dedicated, accurately named tools/checklist entry path and any required delivery/content approval before promising downloadable tools or checklists in this catalog.

## Presentation implemented

- The latest Start here reference replaces the three starter cards with one lead recommendation plus three supporting rows; six grid cards remain initially (ten unique presentations). Six intent choices curate existing articles; the library still loads up to twelve more at a time.
- One responsive composition and H1; one count of all matching published records; search includes featured posts without duplicating them in the grid.
- Topics backed by actual categories: Tax Strategy, S-Corp, Industries, CFO & Finance, IRS Help and Business Operations. No invented Construction category. The retired Tips & Tricks category stays in source data; cards prefer a more specific category, otherwise show their real Article/Guide type.
- Existing brand palette/type/logo/header and rounded image-card styles retained. No new dependencies, article content, dates or claims.

## Existing article destination repaired

The Spanish three-entity article destination rendered an empty title and metadata because BLOG_POST_QUERY accepted empty translation fields. Its title/excerpt now use the same non-empty fallback as the Resources catalog, and an empty localized body falls back to the existing English block array. This preserves source content and dates; it does not create a translation. Client translation completion remains an editorial task.

The retained extension article (`filing-a-business-tax-extension-it-buys-time-to-file-not-pay`) had one dangling category reference and crashed when the detail page accessed its title. The article renderer now ignores null category entries. The post remains in the catalog; assigning its real CMS category remains a client content task.

