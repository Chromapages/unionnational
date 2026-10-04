# Industries hub simplification

Date: 2026-10-01
Status: implemented and browser-verified.
Scope: hub `/en/industries`, matching ES hub, and destination homes for relocated content.

## Rendered audit

At 1440x1000 the existing hub is 3,732px tall including footer, has one visible H1 but separate hidden desktop/mobile branches, three repeated industry pickers, construction detail, the full four-part Torres narrative and other-industry cards. Its browser title is `Industry-Specific Advisory. | Union National Tax`. Visible booking actions include `Book a Strategy Call`, `Talk to a specialist`, `Discuss your business` and footer `Contact Us`; the last points to `/contact`. Detail routes returned HTTP 200. Saved text inventory includes hero, headings, links, nav, footer and detail-page sections. Existing legacy services links redirect canonically; they are not treated as proven broken.

## Severity-ordered plan

| Severity | Problem / consequence | Files / components | Minimal change | Verification |
|---|---|---|---|---|
| Blocker | Deleting industry detail or proof would orphan useful material | `IndustriesDesktopExperience.tsx`, four industry clients, `ClientInsightSection.tsx` | Reuse existing IndustryExpertise as a fixed industry detail on every destination; move the full Torres section to Construction | All four descriptions, four help areas and four service links per industry remain accessible; Construction retains all four narrative parts |
| High | Repetition and unequal content make the audience unclear | Industries route and desktop experience | One responsive hub with four equal link cards, one short problem statement, three existing Built around keywords and one industry link per card; remove tabs/general expertise intro/other-industries block | Exactly four cards, three areas and one link each, no tab controls or hidden duplicate hub |
| High | Mixed labels/destinations split the booking action | Navbar, sidebar, Footer, hub, ClientInsightSection | Normalize booking on the hub to Header.bookCall and /book; scope shared chrome changes to hub; omit redundant shortened mobile CTA and Contact menu entry there | Every hub booking CTA has canonical label and destination, including menu/footer |
| High | Quote lacks a substantiated result number | ClientInsightSection and locale messages | Add compact mode using existing quote/attribution; explicit pending-client-result placeholder; no fabricated metric | One quote on hub, no narrative or result figure, full story on Construction |
| Medium | Long hero, closing bullets and generic punctuation-heavy title | Existing hub copy and metadata messages | Headline plus sentence; one closing heading/line/button; localized Tax and Advisory by Industry title | One H1, H2/H3 hierarchy and reduced page height |
| Required gate | Rendered accessibility is unverified | Hub and destination routes | Keep existing colors, fonts, logo, components and card/button styles; adjust only concrete failures | Six widths 320/375/768/1024/1440/1920, 200% text, focus, 44x44 targets, contrast, loaded links |
| Optional | More quantitative proof may improve the quote later | Client-owned result placeholder | No new number now; client supplies outcome, time period and evidence | No unverified savings claim introduced |

## Content destination ledger

- Construction description, four help areas, four relevant service links: `/industries/construction` via existing IndustryExpertise.
- Restaurant, Real Estate and E-commerce detailed copy/features/service links: their respective existing routes via the same component.
- Every Built around keyword: the main industry card; also retain alongside its full industry detail.
- Torres introduction, starting point, strategy, planning approach, outcome, quote, attribution and services: Construction via existing ClientInsightSection.
- Duplicate pickers/intros and generic closing bullets: removed as repetition; each industry destination and shared booking action remain.

## Implementation constraints

No new components, dependencies, colors, font families, testimonials or financial figures. Reuse existing card/panel/quote/booking styles. ClientInsightSection gets a compact variant; IndustryExpertise becomes fixed detail without tabs. Unrelated page changes are preserved. Leave one small updated runnable check; don't run build/lint/typecheck/test suites per workspace instructions. New copy is saved in this plan for CMS reuse; no live CMS writes.

## Verification basis

- [W3C contrast minimum](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html): 4.5:1 ordinary text, 3:1 large text.
- [W3C focus appearance](https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance): use visible geometric focus indication with contrast.
- [W3C target size enhanced](https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html): 44x44px user-requested target. This is stricter than WCAG 2.2 AA's target-size minimum.

Before evidence: `industries-simplify-before.json` and `industries-simplify-before.png` in the current visualization directory.

## Implemented result

The hub now renders one responsive layout: short hero, four equal link cards, one compact client quote with a pending-result placeholder, and one closing CTA. Each card has one problem statement, three help areas and one industry-page destination. Removed the tab strip, general expertise intro, other-industry block, full hub narrative and generic closing bullets. Existing brand colors, fonts, logo, card/panel/quote/button components and styles remain. No new components or dependencies were added.

All detailed descriptions, four help areas and four service links now render on their respective industry pages through the existing IndustryExpertise component. The Construction page also renders the full ClientInsightSection, including all four narrative parts, unchanged quote/attribution and services used. The hub's booking links use the existing Header.bookCall label and `/book`; locale prefixes are applied normally. Shared navbar/footer changes are scoped to the hub. Footer targets and the mobile close button meet the requested minimum sizes there. The shared mobile focus effect now waits for its portal to exist, preventing an early-open focus race.

## Final verification

| Check | Result |
|---|---|
| Responsive content | EN/ES at 320, 375, 768, 1024, 1440 and 1920px: four equal-height cards, three areas each, one H1, no tab controls, one quote, no full hub narrative |
| Enlarged text | Corrected column count using the existing container-query pattern; final EN/ES 200% text checks have no content clipping or horizontal overflow |
| Keyboard | Tab visits all four cards in order with 2px outlines; Enter opens the E-commerce destination; menu focus and Escape return pass in EN/ES |
| Mobile targets | Main/header/footer controls measured at 375px, menu controls at 320px: no remaining target below 44x44px; expanded footer links included |
| Text contrast | 67 text samples, minimum 4.69:1. Header gold gradient checked against its darker stop; decorative aria-hidden separators excluded |
| Hero background | Actual rendered pixel sampling with text temporarily transparent: H1 7.77:1, support paragraph 6.14:1 at the brightest background pixels in their rectangles |
| Focus/UI contrast | Card outline 5.30:1, nav focus 6.92:1, gold control boundary 6.42:1 |
| Link destinations | All 22 hub destinations returned HTTP 200; migrated panels contain the four canonical service links each |
| Content homes | Four destination panels have four help areas each; Construction story has all four narrative parts, quote and services |
| Page size | 1440x1000: 3,732px before, 1,967px after including footer; roughly 47% shorter |
| Runtime | No page errors observed during responsive inspection |

Verification is a browser review of the rendered pages, not a full WCAG conformance certification. The result figure still needs client substantiation; its placeholder remains visible. No claims, figures or testimonials were invented. Saved browser check, build, lint, typecheck and test suites were not run, following workspace instructions. No live CMS writes.

## Files changed

- `src/app/[locale]/industries/page.tsx`
- `src/components/industries/IndustriesDesktopExperience.tsx`
- `src/components/industries/ClientInsightSection.tsx`
- `src/app/[locale]/industries/construction/ConstructionIndustryClient.tsx`
- `src/app/[locale]/industries/restaurants/RestaurantIndustryClient.tsx`
- `src/app/[locale]/industries/real-estate/RealEstateIndustryClient.tsx`
- `src/app/[locale]/industries/e-commerce/EcommerceIndustryClient.tsx`
- `src/components/layout/FloatingNavbar.tsx`
- `src/components/ui/MobileSidebar.tsx`
- `src/components/layout/Footer.tsx`
- `src/messages/en.json`, `src/messages/es.json`
- `scripts/check-industry-expertise.mjs` (existing check updated; not executed)
- This plan and `.omx/state/industries-hub-simplification/ralph-progress.json`

## English copy for CMS reuse

Page title: Tax and Advisory by Industry

Hero headline: Advice built for how your industry makes money.

Hero sentence: Tax and financial guidance for the costs, decisions, and obligations your business faces.

Construction problem: Job margins are hard to track.

Restaurant problem: Thin margins are hard to protect.

Real estate problem: Deals reshape your tax picture.

E-commerce problem: Channels complicate margins.

Industry links: See construction advisory; See hospitality advisory; See real estate advisory; See e-commerce advisory.

Closing sentence: Talk through your business, goals, and tax questions.

Booking CTA: Book a Strategy Call

Result placeholder: Result figure: awaiting client substantiation.

## Evidence files

Current visualization artifact directory contains `industries-hub-responsive.json`, `industries-hub-enlarged-final.json`, `industries-hub-contrast-final.json`, `industries-hub-hero-pixel-contrast.json`, `industries-hub-link-status.json`, `industries-hub-content-homes.json`, `industries-hub-targets-final.json`, `industries-hub-menu-targets-final.json`, `industries-hub-keyboard-final.json` and final EN/ES desktop/mobile screenshots.
