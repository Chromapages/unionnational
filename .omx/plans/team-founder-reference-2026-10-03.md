# Team founder section reference plan

Mode: DESIGN. Scope: existing #founder / FounderSpotlight only, with localized copy and the existing saved browser check. Preserve the team hero, roster, routes, booking flow, fonts, colors and real CMS portrait. No dependencies, new route, generated portrait or fabricated signature.

Reference: C:/Users/ericb/Downloads/ChatGPT Image Oct 3, 2026, 11_29_33 AM.png

## Baseline

Current desktop founder card is 1368x425.5px at 1440px. It has a 224px portrait, four credential badges, a pending-title placeholder, biography disclosure and separate About link. The user reference calls for a larger portrait, three columns, three badges, one gold story action and an attributed perspective column. Existing CMS biography explicitly identifies Jason as founder and IRS Enrolled Agent; EA/MBA/FSCP/LUTCF already render. Use the generic Founder, Union National Tax supplied by this newer reference, without assuming a director or executive title.

## Implementation and evaluation

| Step | Files | Change | Success criteria |
| --- | --- | --- | --- |
| Layout | FounderSpotlight.tsx | Reuse article as pale brand-tinted three-column panel at >=1280px; enlarge real portrait; add divider before perspective | Desktop resembles reference proportions; existing #founder and heading ID retained |
| Identity | FounderSpotlight.tsx, EN/ES messages | EA once beside name if verified; remaining existing credentials as badges; generic founder role | No duplicate badges, new degrees or invented official title |
| Story | FounderSpotlight.tsx, EN/ES messages | Existing native biography disclosure becomes gold summary CTA; use existing About link only if biography unavailable | One story action, genuine accessible biography, >=44px target and visible focus |
| Perspective | FounderSpotlight.tsx, EN/ES messages | User-supplied perspective statement, named attribution, three existing-library icons and supplied principle labels | Reference copy source is user image; no savings claims or fake testimonial; no custom icon paths |
| Responsive/accessibility | Same component | 390px stacked; 768px portrait/bio then full-width perspective; desktop three columns | No clipping at 390/768/1440px, image loaded, logical headings, AA contrast, keyboard disclosure behavior |

Use existing CSS tokens: brand-950/500/50, gold-400/700, slate-700, 4px spacing unit, rounded-xl/2xl. Native Server Component and details/summary need no additional client state or animation. Keep italic quote line-height generous enough for descenders. No synthetic signature overlay; use the actual published portrait.

Before source edits, preserve the current disclosure/roster behavior in the existing saved check; do not run test/build/lint/typecheck suites under the workspace restriction. Verify rendered output directly through the existing browser and persist visual-verdict state before each visual refinement.

## Known content boundary

The perspective statement is supplied by the user's reference and is not independently authenticated as a historic quotation. It is presented as the requested founder perspective, without adding facts or results. Generic founder role is supported by the existing CMS biography; a more specific official title is not inferred.

## Implemented result

Reworked FounderSpotlight into the reference's portrait/biography/perspective composition using existing brand tokens and fonts. EA appears once beside the verified name; MBA, FSCP and LUTCF remain as three badges. The existing real CMS photo is enlarged. The existing biography disclosure is the single gold Read Jason's story action; the redundant About link is now only a fallback when no biography exists. Added the user-supplied perspective and three icon-led principles inside the same section. No signature or new portrait was manufactured.

Native summary needed explicit border-box sizing because its rendered content-box size made the 56px target 80px tall. Final rendered height is 56px.

### Evaluation / success criteria results

| Check | Evidence | Result |
| --- | --- | --- |
| Reference composition | Desktop screenshot compared with supplied image | Pass: large portrait, identity/badges/body/action, divided perspective and three principles |
| Responsive containment | EN and ES at actual 390, 768, 1440px widths | Six states, no clipped founder headings/body/quote/actions/principles |
| Story behavior | Enter opens and closes native disclosure; full existing biography appears | Pass; one action; visible 2px focus outline; 56px button height |
| Color contrast | Existing tokens and computed ancestor backgrounds inspected; WCAG relative-luminance calculation | Labels 4.93:1, body/attribution 7.61:1, CTA 11.21:1, perspective/icons 13.54:1; all pass AA |
| Identity and roster preservation | DOM text, badges, image load and staff count | Jason Astwood, EA; badges MBA/FSCP/LUTCF once each; real image loaded; all 11 staff profiles remain; one H1 |
| Regression artifact | Extended scripts/check-about-consolidation.mjs before component edits | Added native biography keyboard/open/content checks; not executed under workspace restriction |

Changed files: src/components/team/FounderSpotlight.tsx; src/messages/en.json; src/messages/es.json; scripts/check-about-consolidation.mjs; this plan; .omx/state/team-founder-reference/ evidence and verdict.

Simplifications: reused the existing component and native disclosure; consolidated two story actions into one; moved verified EA out of duplicate credential badges; no new dependencies or client-side state.

Remaining content debt: Spanish founder biography and some CMS roster fields still fall back to existing English content. This patch localizes the new reference labels/perspective but does not rewrite or publish CMS biographies. No build/lint/typecheck/test suite or Lighthouse run. No connected token registry was available; existing CSS tokens and rendered computed values were used. No CMS writes or deployment.

Evidence: .omx/state/team-founder-reference/responsive.json, contrast.json and founder-desktop.jpg.
