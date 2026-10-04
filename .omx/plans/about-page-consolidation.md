# About page consolidation

Date: 2026-10-01
Status: layout implemented and browser-verified; three client content decisions remain pending.
Scope: EN/ES About, roster preservation on Team, scoped shared booking chrome and chat overlap.

## Findings and severity-ordered plan

| Severity | Problem / client consequence | Files / components | Minimal change | Verification |
|---|---|---|---|---|
| Blocker | Conflicting founder titles undermine trust | AboutDesktopExperience, About route, aboutPage schema/query | One founder block with an empty client-approved title field; explicit pending placeholder until provided. Preserve existing founder record/photo and credentials | No conflicting or invented title; one founder identity |
| Blocker | Featured people must be selected by the client | AboutDesktopExperience.PersonCard, aboutPage schema/query, Team page | Empty editorial reference list for 3–4 approved team members, four pending slots until selected; full roster retained on Team | All eleven existing non-founder IDs remain on Team; selected records must be present there |
| Blocker | Numeric claims conflict across sources | About hero, CMS approved proof fields, number inventory | Three pending proof slots until one complete client-approved set with source/context is supplied; do not select figures | No unapproved numeric proof; preserve the exact H1 |
| High | Desktop/mobile and founder/leadership/team layouts repeat | About route and AboutDesktopExperience | One responsive five-part layout, one founder mission of two sentences, one featured-team section, one Team link, three approach items, compact closing CTA | One H1, logical headings, no repeated leadership/team/mission blocks at any width |
| High | Initials, generic roles and credential duplication look unfinished | PersonCard | First names consistently where full surnames are unavailable, omit Trusted Expert, retain actual roles only, credentials once as badges | Meaningful name/role image alts; no invented identities/roles; no repeated badges |
| High | Chat and mixed booking actions compete with the next step | FloatingNavbar, MobileSidebar, Footer, ChatWidget, closing CTA | Reuse booking label/route on About; scoped 44px targets; hide chat while About closing CTA is visible | Nav/footer/closing/menu label and route match; visible focus; no mobile CTA overlap |
| Required gate | Layout/contrast/targets were unverified | Rendered About and Team | Preserve existing brand tokens/components, fix concrete measured failures only | 320/375/390/768/1024/1440/1920px, 200% text, contrast, 44px targets, keyboard and roster checks |
| Optional | Full surnames and final proof evidence are missing | Client editorial records | Client may supply verified surnames and approved evidence; do not fill from guesses | Pending labels remain until editorial approval |

## Client decisions (requested asynchronously)

1. Founder title: existing About says **Founder & Principal** and **Director & Chief Strategist**. Published founder CMS additionally says **Founder & Lead Tax Strategist**. None selected by the agent; render pending title.
2. Featured people: proposal for confirmation only is **Sue** (Senior Tax Accountant), **Ron** (published CPA/EA credentials; generic role omitted), **Desi** (Client Relations Director), **Nela** (Senior Bookkeeper). No approval received yet; do not publish this proposed selection. Use four empty pending slots. CMS names currently have surname initials, so first names are the consistent display format until full surnames are supplied.
3. Proof statistics: no approved set supplied. Client must select three figures with scope/date/source; all three About slots stay pending. See [number inventory](about-number-inventory.md) for every collected numeric field and the conflicts.

## Audit evidence

Rendered desktop About is 2,649px tall at 1440x1000; the 390px branch is 13,751px tall. Desktop shows Sue/Jose/Desi leadership, eight further people, four approach items and footer Contact Us. Mobile separately renders a timeline with disputed figures and extra values/trust/FAQ sections. All eleven non-founder CMS members appear on Team. Founder CMS supplies a real photo and EA, MBA, FSCP, LUTCF; only existing credential data will be used, once per badge.

Saved before artifacts: about-rendered-before.json, about-before-1440.png, about-before-390.png, about-before-team.png and about-team-cms-audit.json in the current visualization directory.

## Implementation sequence

1. Add three empty About editorial approval fields (title, featured references, proof set) to the existing schema/query. Fetch the existing founder record; preserve H1 via existing translations. No published CMS writes.
2. Reuse AboutDesktopExperience and its PersonCard for one responsive page. Existing founder and featured portrait frames share one crop, 160x200px size and background; no replacement/invented photos. Keep Team as the home for all omitted people; pending slots are clearly editorial placeholders, not fictitious people.
3. Consolidate to three approach items and one compact booking action. Extend the existing page-scoped booking normalization to About. Protect its closing CTA through the existing ChatWidget visibility observer.
4. Inspect screenshots and browser state, fix measured regressions, preserve one minimal runnable check. Do not run build, lint, typecheck or saved test suites per workspace instructions. Report client decisions separately; never claim they are approved.

## Implementation result

Reused AboutDesktopExperience and its PersonCard for a single five-part layout across all widths. Removed the duplicate founder/mission treatment, leadership section, grouped full roster, mobile timeline, values/trust/FAQ repetition and closing eyebrow/note. The Team page retains all eleven existing non-founder people, and About has one Meet the full team link. No people, titles, statistics, credentials or photographs were invented. Existing founder CMS supplies the actual photo and four credentials, displayed once as badges with the first name Jason. Other portraits remain pending the client-approved selection.

Added empty editorial approval fields to the existing About schema/query: approvedFounderTitle, approvedFeaturedMembers (three to four references), and approvedProofStats (exactly three values, labels and source/approval notes). No defaults select a founder title, people or figures. Missing approvals produce explicit placeholders. Selected people must exist in the full published Team roster; missing references do not render invented cards. The founder and all portrait frames use 160x200px, object-cover/object-top and the same #e8eeec container background. Original photograph pixels are preserved.

Booking labels and /book destinations are normalized on About, including nav, menu, closing and footer. Existing shared chrome remains in use. ChatWidget now observes the About closing section and hides the actual launcher while that section or the footer is visible. No production behavior depends on the Next.js development indicator.

## Verification evidence

| Check | Evidence |
|---|---|
| Responsive layout | EN/ES at 320, 375, 390, 768, 1024, 1440 and 1920px plus 200% text at 1440px: 16 states, no content clipping/horizontal overflow or browser errors |
| Required structure | One exact unchanged H1, one founder card, one team section with four pending slots, three approach items, one closing heading/line/button; logical H2/H3 sequence |
| Identity and credentials | Founder role explicitly pending; first-name format; EA/MBA/FSCP/LUTCF once each as existing-data badges; no Trusted Expert label on About |
| Photo frames | All five frames measured 160x200px with identical background; founder alt reads Jason plus the pending-title status; four team photos are intentionally unselected |
| Roster preservation | All eleven non-founder CMS names matched rendered Team headings; none missing |
| Contrast | Initial photo-placeholder and cream support pairs failed. Existing darker slate token corrected them to 6.96:1 and 7.77:1; remaining measured text pairs passed 4.5:1 normal/3:1 large text thresholds |
| Keyboard and targets | Full-team link and booking CTA show 2px outlines; menu focus and Escape return pass; measured mobile main/header/footer/menu controls meet 44x44px |
| Chat | Real chat-widget loaded at 390px; visibility hidden and data-about-cta-visible true while closing CTA was in view; elementFromPoint hit the CTA, which measured 308x48px |
| Booking | All visible EN About booking actions read Book a Strategy Call and use /en/book; ES uses the same canonical localized label and /es/book |
| Page height | Latest EN 390px page is 4,215px versus 13,751px before, including footer; desktop remains compact and all pending content is reviewable |

Saved check `scripts/check-about-consolidation.mjs` was added but not executed. Build/lint/typecheck/test suites were not run per workspace instructions. This is browser verification, not a complete WCAG certification. Actual four selected portraits and the three final proof values cannot be content-verified until the client supplies approval. No live CMS documents were written.

Artifacts in the current visualization directory: about-responsive-verification.json, about-contrast.json, about-accessibility-final.json, about-targets.json, about-chat-verification.json, about-final-semantics.json, about-final-en-390.png, about-final-en-1440.png and matching ES screenshots. The comprehensive number inventory separately distinguishes published values, rendered values, stale source candidates, prices/dates/technical quantities and scope exclusions.

## Files changed

- src/app/[locale]/about/page.tsx
- src/components/about/AboutDesktopExperience.tsx
- src/sanity/schemaTypes/aboutPage.ts
- src/sanity/lib/queries/team-queries.ts
- src/components/layout/FloatingNavbar.tsx
- src/components/ui/MobileSidebar.tsx
- src/components/ChatWidget.tsx
- src/messages/en.json and src/messages/es.json
- scripts/check-about-consolidation.mjs
- This plan, about-number-inventory.md and .omx/state/about-page-consolidation/ralph-progress.json

## Pending client decisions and CMS instructions

1. Confirm the founder's single official title among the conflicting source titles, or provide the correct title. Populate approvedFounderTitle after approval; the agent has chosen none.
2. Confirm or change the proposed Sue/Ron/Desi/Nela selection. Populate approvedFeaturedMembers using existing member references after approval; the four slots remain empty now. First names consistently avoid unfinished surname initials. Full surnames require verified client data.
3. Confirm one set of three proof values, their exact denominator/scope, date and evidence. Populate approvedProofStats including source notes; all slots remain empty now. The inventory is a list of current numbers, not approval of them.

## English copy available for CMS reuse

Founder mission (two sentences): At Union National Tax, we believe tax preparation is just the baseline. Our mission is to bridge the gap between complex tax code and the needs of modern businesses.

Pending title: Title pending client confirmation

Pending proof: Awaiting client confirmation

Team notice: Featured team selection is awaiting client confirmation. Meet the full team below.

Booking label: Book a Strategy Call

## CTA follow-up: 2026-10-02

At the user's request, replaced the custom About closing block with the homepage's existing FinalBookingCTA. Reused the homepage rhythm wrapper so width, padding and responsive layout match, retained the about-next-step ID for chat protection, and supplied the existing canonical booking label and About analytics placement. Removed duplicate CTA markup; no new component, styling system or copy was introduced.

Browser comparison covered EN/ES at 390, 768, 1440 and 1920px: all eight states matched the homepage heading, component classes, padding and three reassurance items, with no clipping or page errors. Mobile CTA measured 308x56px, retained visible 3px focus and routed to /en/book?returnTo=%2Fabout. The real chat widget is hidden while the CTA is visible. Fixed a discovered timing issue by reusing ChatWidget's mutation observer to wait for the streamed CTA before finishing setup.

Changed files for this follow-up: AboutDesktopExperience.tsx, ChatWidget.tsx, the existing check-about-consolidation.mjs, this record and .omx/state/about-homepage-cta/ralph-progress.json. Saved checks/build/lint/typecheck remain unrun. Founder/team/proof approval placeholders are unchanged. Evidence: about-homepage-cta-verification.json, about-homepage-cta-mobile.json and four EN/ES desktop/mobile screenshots in the current visualization directory.

## Sources for verification thresholds

- [W3C contrast minimum](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)
- [W3C visible focus](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html)
- [W3C target size enhanced](https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html) (44px is the user-requested target)
