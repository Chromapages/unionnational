# Resources Start here reference

## Plan before implementation

Update the Start here area to the supplied guidance-first reference, preserving the earlier Resources audit's safeguards.

1. Add a Resources eyebrow, “Find the right resource” H2, supporting copy and three compact proof-of-purpose items. Use the existing Outfit/Inter fonts and forest/gold palette; do not add the reference's serif font or a promise of catalog checklists/tools.
2. Add six accessible intent buttons: entity choice, tax burden, IRS help, financial visibility, business growth, industry advice. These select recommendations, not invented CMS categories. Match each browse-topic action to a real category (growth guidance uses the existing finance categories).
3. Show one lead recommendation and three useful existing posts. Use original titles/excerpts/images, source read times, and actual source publication dates. The lead preview and its left-column Read article action form one presentation; only one article link is rendered for that lead post.
4. Move existing library topic chips/count next to All resources below this area. Keep one hero search, one visible count, the tucked-away sort, six initial grid cards and +12 load-more. Exclude every displayed recommendation from the grid, so the initial page has up to ten unique article presentations.
5. Preserve newsletter email-request behavior, navbar, article routes and CMS records. New intent selections clear the current search and reset the library topic to All; subsequent search applies across recommendations/catalog. View-topic actions clear search, filter and move to the library.
6. Extend the existing runnable catalog regression check before recommendation logic edits. Manually check all six intents, filter/search/load-more uniqueness, real dates, article links, focus/44px targets and EN/ES desktop/mobile. Do not run automated suites/build under the workspace instruction; persist visual verdict.

## Files

- ResourcesDesktopExperience.tsx: header, intent chooser, recommendation presentation, library control placement.
- resourceCatalog.ts: source-only curated recommendation selection and category mapping.
- resourceCatalog.test.ts: recommendation membership/order and feature/grid disjointness.

## Content boundaries

Existing posts only; no September date replacement, new titles/claims, generated article art, fake guides or subscription label. The prior client decisions remain applicable. The reference's one lead plus three supporting rows locally replaces the previous three featured cards.

## Completed
Implemented in ResourcesDesktopExperience.tsx and resourceCatalog.ts. Extended the existing resourceCatalog.test.ts check; not run under workspace instructions. Manual EN/ES checks at 1536px and 390px pass: all six intent buttons select existing posts, primary/supporting/grid links stay unique, category browsing filters correctly, targets are at least 44px, focus/announcements work and the actual article destination renders. The industry choice reuses overlap spacing to avoid adjacent restaurant posts. Initial page: four recommendations plus six grid cards (ten unique presentations). Actual date fields remain May 13, May 11, March 13 and May 25 for the default set. Visual verdict: 95/100.
