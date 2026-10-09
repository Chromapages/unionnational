# Back Taxes & IRS Tax Resolution — detail-page review

## Plan

- Reuse CmsServicePage and ServicePageTemplate at `/back-taxes-irs-tax-resolution` in EN/ES. Supply local draft content through a typed content override; do not create or publish CMS documents, artificial document IDs or timestamps.
- Add a fit check, three consultation steps, a preparation checklist and FAQs limited to Jason's stated audience, the verified booking flow and safe handling of documents. Specific procedures, representation, pricing, eligibility and results remain unconfirmed.
- Reuse the shared closing CTA with page-specific wording. Preserve default copy and layout on all other pages. Keep all consultation actions on `/book`.
- Update existing section buttons, Services menu and footer to the canonical detail route. Keep the existing directory anchor usable. Add localized metadata, factual schema, sitemap entries and the normal legacy `/services/...` redirect.
- Verify scoped lint, regression tests, TypeScript, production build and EN/ES browser layouts at 390/768/1440px. Check FAQs, focus, contrast, mobile CTA and real navigation without submitting leads. Keep all work local.

## Content review

Jason's statement establishes only overdue filings, IRS balances and the exact service title. The new copy is draft wording; the prior source review remains in `back-taxes-tax-resolution-review.md`. Preparation items ask visitors to consider general topics, not submit tax documents or identifiers. FAQs describe this page's audience, the existing calendar, and document privacy; they make no claims about IRS programs or case outcomes.

Jason should confirm actual service scope, taxpayer/jurisdiction limits, representation and authorization requirements, which IRS procedures may be named, pricing/engagement terms, secure document intake, and suitability of the current calendar. Approve the EN/ES wording and retaining the exact English service title in both locales before publication.

## Verification and changed files

| Files | Change |
| --- | --- |
| `src/app/[locale]/back-taxes-irs-tax-resolution/page.tsx` | New localized canonical detail route using the existing wrapper and metadata helper. |
| `src/lib/services/tax-resolution-content.ts`, `tax-resolution-content.test.ts` | Typed local draft content and presentation, with claim/CTA regression coverage. No fabricated CMS IDs or timestamps. |
| `src/components/services/CmsServicePage.tsx`, `CmsServicePage.test.tsx` | Optional typed content/presentation inputs; existing CMS behavior remains the default. Tests cover metadata, schema and avoiding a CMS fetch for the local draft. |
| `src/components/services/ServicePageTemplate.tsx` | Same hero, fit, process, checklist, FAQ, closing and mobile CTA components; optional copy overrides for the new page. |
| `src/components/home/FinalBookingCTA.tsx` | Optional copy overrides; existing layout, styles and all other pages' default copy are retained. |
| `src/components/shop/ShopFAQ.tsx` | Optional support CTA destination; the new page uses `/book`, other pages retain `/contact`. |
| `src/messages/en.json`, `src/messages/es.json` | Draft detail-page and contextual closing/FAQ copy. |
| `src/components/services/TaxResolutionSection.tsx`, `TaxResolutionSection.test.tsx` | Homepage/services section's single action now says Explore this service and links to the detail page. |
| `src/components/layout/navigationData.ts`, `navigationData.test.ts`, `ServicesDropdown.tsx`, `Footer.tsx` | Canonical service path in menu, active-route handling and footer. |
| `src/app/[locale]/services/[slug]/page.tsx`, `page.test.tsx` | Standard localized alias mapping and regression tests. |
| `src/app/sitemap.ts`, `sitemap.test.ts` | Both localized canonical URLs, without duplicate `/services/...` entries. |
| `next.config.ts` | Three explicit permanent redirects for the bare, EN and ES aliases. Pre-existing unrelated image-path/security changes were preserved. |
| `docs/back-taxes-tax-resolution-detail-review.md` | Plan, scope questions and verification record. |

| Check | Result |
| --- | --- |
| Focused regression tests | 119 tests passed across 13 files; metadata/content recheck passed 8 tests after the branded title adjustment. |
| Scoped lint | Passed with 0 errors and 3 existing hook warnings in ServicesDropdown. |
| TypeScript | `npx tsc --noEmit` passed; final production build also completed its TypeScript check. |
| Production build | `npm run build` passed after the explicit redirects, including 86/86 generation tasks. Build command and dependencies unchanged. |
| Routing and sitemap | Production EN/ES detail pages return 200; localized aliases return direct 308 redirects to their canonical route; both canonical URLs appear in sitemap.xml. Next's component redirect can stream a meta-refresh with 200, so the explicit redirect configuration prevents that ambiguity. |
| Responsive layout | Production EN/ES at 390/768/1440px: one H1, correct localized canonical, no horizontal/content overflow, one complete set of sections, no form fields, no untranslated keys. Hero CTA 56px; secondary hero link 44px. Mobile sticky CTA measured 48px and appeared while reading the checklist. |
| FAQ | All 3 English and all 3 Spanish items expanded with complete answers and announced expanded states. Desktop FAQ targets measured 88px; mobile targets measured 88–96px. |
| Contrast and focus | Minimum measured text contrast 5.02:1 across 75 main-content text/control elements. Translucent backgrounds were resolved from existing CSS tokens and opacity. Mobile hero CTA shows a settled 2px gold outline with 4px offset. Dedicated design-registry tools unavailable; verification used browser styles and WCAG luminance calculations. |
| Booking | The new Spanish FAQ action opened `/es/book` and the existing Agent CRM calendar iframe. All consultation actions resolve to the locale's `/book` path; the final CTA also preserves a return link to the new detail page. No booking information was entered or submitted. |
| Discovery | Clicking Explore this service in the visible homepage section reached `/en/back-taxes-irs-tax-resolution` with the exact service H1. Menu/footer paths are covered by the navigation regression checks. |
| Source boundaries | No procedures, representation promises, prices, reductions, savings, client results, deadlines or new qualifications were added. The new checklist is preparation guidance, not a list of contracted deliverables. |
| Not run | Full unrelated suites, live deployment, CMS publication, real booking/lead submission, and external-provider service suitability assessment. |

Browser evidence is in `.omx/logs/tax-resolution/`: `detail-responsive.json`, `detail-routing.json`, `detail-discovery.json`, `detail-faq-en.json`, `detail-faq-es.json`, `detail-contrast.json`, `detail-focus.json`, `detail-booking.json`, `detail-tests.log`, `detail-metadata-recheck.log`, `detail-lint.log`, `detail-routing-lint.log`, `detail-typecheck.log`, `detail-build.log`, `detail-desktop.png`, `detail-mobile.png`.

All new wording remains a local draft for Jason's review. No commit, push, deployment, CMS mutation, client contact or real lead submission was performed. The existing development preview remains available at http://localhost:3456/en/back-taxes-irs-tax-resolution.
