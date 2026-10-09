# Back Taxes & IRS Tax Resolution — local review

## Plan and acceptance criteria

1. Reuse the existing service container, typography, palette, locale messages and link component. Add one shared section after the homepage service overview and before the services page support plans. One H2, two concise need descriptions and one primary CTA per section; no competing service-page architecture.
2. Use the existing `/book` consultation calendar. The current contact form offers unrelated goal categories; avoid changing that flow or adding a public tax-information form. Verify the real booking destination without submitting information.
3. Add the exact service title to the existing service navigation inventory and compliance footer, linking to `/services#back-taxes-irs-tax-resolution`. Keep existing routes, metadata, canonical URLs and sitemap entries; no new route or structured-data claims.
4. Use restrained English and Spanish draft copy. Keep the requested English service title exact in both locales. No pricing, deadlines, outcomes, credentials or named IRS programs.
5. Verify EN/ES content, section/anchor navigation and CTA through focused tests. Run scoped lint, project typecheck and production build. Inspect 390/768/1440 layouts, focus, target sizes and computed contrast. Keep all changes local; preserve unrelated security work.

## Content provenance and review status

The user-supplied statement from Jason establishes two needs only: visitors behind on tax filings and visitors owing the IRS money, plus the exact service name. All new supporting language is draft wording for his review.

Repository references were inspected in `src/app/[locale]/vsl/tax-resolution/page.tsx`, `src/components/vsl/VSLPainPoints.tsx`, `src/components/vsl/VSLFaq.tsx`, and `src/data/privacy-policy-content.ts`. These contain procedure references, strong outcome claims or fear-based language without approval evidence available in this task. They were not reused or edited. Their existence does not establish approved service scope.

## Jason's content questions

- Approve or revise the English intro, two need descriptions, scope qualifier, privacy reminder and CTA wording. Approve the Spanish draft and retaining the exact English service name there.
- Which overdue-return services and IRS-balance services does UNT actually provide? Are there limits by taxpayer type, tax year, jurisdiction or case status?
- Does UNT provide IRS representation, and under what engagement and authorization conditions? No representation claims were added.
- Which specific procedures, if any, may be named publicly? No offers in compromise, penalty abatement, installment agreements or audit representation were added.
- Is the existing consultation calendar the appropriate intake destination for these visitors? No free-consultation, pricing, response-time or outcome promise was added.
- What secure channel should be used if tax documents or identifiers are later needed? The section asks visitors not to share sensitive information in public forms and adds no collection fields.

## Verification

### Changes

| File | Change |
| --- | --- |
| `src/components/services/TaxResolutionSection.tsx` | Shared responsive section, semantic H2/H3 headings, two needs, one `/book` CTA, scope qualifier and privacy reminder. Uses existing service container, token colors and routing Link. |
| `src/components/services/TaxResolutionSection.test.tsx` | EN/ES regression coverage for exact title, both needs, one consultation destination, absence of sensitive fields and unsupported claims. |
| `src/components/home/ConsumerHome.tsx` | Section after outcomes and before client reviews. Existing reviews remain general firm reviews, outside the new service section. |
| `src/components/services/ServicesDesktopExperience.tsx` | Same section after individual-service recommendations and before support-plan pricing. No price or plan is attributed to this service. |
| `src/components/layout/navigationData.ts` | Fallback service inventory entry and existing-directory anchor mapping; remains available with partial CMS navigation. |
| `src/components/layout/navigationData.test.ts` | Regression test for service discovery and anchor mapping when CMS data is partial. |
| `src/components/layout/ServicesDropdown.tsx` | Exact service label in Implementation group; new menu link has a minimum 44px target. |
| `src/components/layout/Footer.tsx` | Compliance navigation link to the services anchor. |
| `src/components/layout/FooterNavigation.tsx` | Existing link component accepts a className so only the new footer item receives a minimum 44px target. |
| `src/messages/en.json` | Draft section copy and exact service navigation labels. |
| `src/messages/es.json` | Spanish draft supporting copy; exact English service name retained as requested. |
| `docs/back-taxes-tax-resolution-review.md` | Plan, provenance, content-review questions and verification record. |

### Checks

| Check | Result |
| --- | --- |
| Focused Vitest run | Passed: 7 files, 44 tests. Section, navigation inventory, service menu, footer, services page and booking helpers. |
| Scoped ESLint | Passed with 0 errors and 4 existing hook warnings in FooterNavigation/ServicesDropdown. Unchanged warning sites were not refactored. |
| `npx tsc --noEmit` | Passed. |
| `npm run build` | Passed using the existing Webpack command: compilation, TypeScript and 86/86 generation tasks. No dependencies or build configuration changed for this feature. |
| Production browser checks | Passed all 12 combinations: EN/ES homepage/services at 390, 768 and 1440px. One exact service heading, one primary CTA, one H1 per page, no page or section overflow, no untranslated keys or new form fields. Body copy 16px on mobile and 18px at tablet/desktop; CTA 56px tall. |
| Menu/footer navigation | Desktop Services menu and mobile compliance-footer link reached `/en/services#back-taxes-irs-tax-resolution`, with the section top approximately 112px below the fixed header. New menu link measured 56px tall when wrapped; footer link 44px. |
| CTA | Clicking the production English and Spanish service CTAs opened `/en/book` and `/es/book`, respectively, with the existing Agent CRM iframe at `https://link.agent-crm.com/widget/booking/sBGopjvf9OdyrfgWqOJx`. No dates selected, forms filled or appointments submitted. |
| Keyboard focus | Visible 2px outline on the section CTA and new menu link. CTA reached by Tab from the preceding homepage link. |
| Contrast | Browser-computed colors checked with the WCAG relative-luminance formula: new body text 7.76:1 or higher; CTA 9.21:1; supporting icons 5.30:1; new menu text 14.56:1; footer text 13.44:1. CTA hover/active token pairings calculated at 11.21:1/12.70:1. Dedicated registry/contrast tools were unavailable; existing CSS tokens and browser inspection supplied the evidence. |
| SEO/routing | No new route, metadata, sitemap or structured-data claims. Existing localized homepage/services canonicals retained. |
| Not run | Full unrelated test suites, external scheduler transaction, real lead delivery and live deployment. No CMS mutation, commit, push, deployment or client contact. |

An old development tab briefly reported a missing new translation namespace during hot reload. Fresh navigation and all production EN/ES checks rendered complete copy. Local Sanity live-preview CORS and smooth-scroll warnings are existing preview limitations; no security or CMS settings were changed to suppress them.

Evidence and screenshots are in `.omx/logs/tax-resolution/`: `tests.log`, `lint.log`, `typecheck.log`, `build.log`, `responsive.json`, `navigation.json`, `cta-state-colors.json`, `booking-es.json`, `home-desktop.png`, `services-desktop.png`, `services-mobile.png`. These are local review artifacts.

Local review preview: http://localhost:3456/en/services#back-taxes-irs-tax-resolution. The isolated development server remains available for review; the temporary production-verification server was stopped.

Unrelated security, package-lock, configuration, operational-doc and test changes present at task start remain untouched. Temporary feature-preview type paths added automatically by Next were removed from tsconfig while retaining the pre-existing recovery paths.
