# Resources simplification

## Audit before editing

Inspected the Resources page route, desktop/mobile hero/catalog/card markup, shared navigation/footer/resourceHref, CMS queries, actual published records and newsletter handler. Rendered EN desktop/mobile before edits. Existing brand: forest green, gold, white/cream, Outfit headings and Inter body, rounded border cards and the shared navbar/logo.

Published inventory: 46 blog posts, no published playbooks, no resourcesPage document. The 47th card is a fabricated fallback playbook whose destination has no CMS record. Latest unchanged date is May 29, 2026. Desktop repeats the HVAC post in hero/featured. Desktop chips are 40px tall; hidden extra-topic controls are smaller. Both responsive compositions produce two H1 elements in the DOM. Newsletter opens a mailto request; it does not subscribe.

## Severity-ordered plan

| Severity | Problem / user consequence | Files / components | Minimal change | Verification |
|---|---|---|---|---|
| Blocker | Fabricated playbook causes a broken destination and inflated count | ResourcesDesktopExperience, resourceHref | Remove fallback; retain published posts/playbooks only; deduplicate by canonical destination | Catalog allocation check; verify existing featured paths |
| High | Duplicate posts/headings obscure the first-visit path | Hero, featured/cards/catalog | Remove hero post. Three existing starter posts, exclude from grid, one visible count, All resources heading | Unique destinations across sections; one H1 and logical H2/H3 |
| High | Many controls and different mobile catalog add friction | ResourcesDesktopExperience, resources/page | One responsive composition; real-category topics; remove More filters, format/list toggles and numbered pages; hidden native sort disclosure; initial 6 grid cards then +12 | Search all records including featured; filters/reset/sort; keyboard Load more and live announcement |
| High | Card excerpts prevent scanning | Card markup | Title/category/read-time only; featured adds one-line source excerpt and consistent Read article link | Render desktop/mobile; no dates or long grid excerpts |
| High | Newsletter implies subscription but only opens email | Newsletter form | Preserve Request updates and mailto behavior; one-line title and single email field; explicit email-client note | Handler inspection and native invalid-email validation; no email sent |
| High | Accessibility unverified | Inputs/buttons/card links/headings | Selected checkmark + aria-pressed, focus rings, 44px targets, existing darker contrast tokens, responsive columns | Rendered targets/contrast, keyboard controls, no overflow, announcements |
| Medium | Advice conversion path only in navbar | Featured block | One soft localized Book a Strategy Call link to /book | Href/focus/target verification |
| Optional | Similar articles compete; latest is stale | Catalog order/editorial notes | Keep all posts/dates; diversify default display; remove latest label | All source dates unchanged; identify overlap families for client review |

## Catalog decisions

- User approved 3 featured + 6 grid cards initially (9 total), Load more adds 12.
- Featured relevance choices: three-entity comparison, handling an IRS notice, general small-business tax planning. All are published posts; use their own titles/excerpts/read times/images.
- Topic chips: Tax Strategy (`tax-strategy`), S-Corp (`s-corp-guide`), Industries (`industry-specific`), CFO & Finance (`cash-flow-and-cfo`, `fractional-cfo-services`), IRS Help (`irs-compliance`), Business Operations (`business-operations`), plus All.
- Search/filter include featured records; featured matches stay in their block and are excluded from grid. Empty searches have an existing styled empty state. One count covers all matching records. Load announcements are visually hidden.
- Existing checklists/calculators are implemented as inline legacy mobile components and separate assessments, not published articles/playbooks. The new catalog promises articles and guides, with no Tools format claim or invented entries.

## Client decisions (not blockers to presentation changes)

1. Connect newsletter to a real subscription provider/consent flow, or intentionally keep email requests. Do not call the current action Subscribe.
2. Review three-entity vs two-entity comparison cluster, HVAC pair, and restaurant-tip-credit pair for editorial differentiation/canonical handling; no deletion here.
3. Publish a fresh, substantiated article. May 29 dates remain unchanged; featured is relevance-based.
4. Decide where existing interactive tools/inline checklists should be exposed as a dedicated path. No published playbooks/checklist posts exist; tools are real but excluded from this article catalog.

## Verification scope

Add a small runnable regression check for catalog deduplication, feature/grid allocation, overlap spacing and category matching before logic edits. Workspace instruction forbids running automated suites/lint/typecheck/build unless requested. Use manual browser checks for EN/ES, desktop/mobile, search/filter/sort/reset/load-more/empty results, contrast, tap targets, keyboard/live status, article/booking destinations and native email validation. Persist visual verdict after rendered iteration.

## Destination repair discovered during verification

The featured three-entity article's Spanish URL exists but renders an empty H1/metadata because BLOG_POST_QUERY uses coalesce on empty translated strings. The catalog query already rejects empty localized titles/excerpts. Apply that existing fallback rule to the detail query and use the available English body when a localized block array is empty. Preserve source content/date; no new translation. Verify a real article's heading/body after navigation. This query serves only article metadata and the article route.

## Completed and verified
- Initial render: 1 H1, 3 featured + 6 grid cards, 1 count, no duplicate destinations.
- Full load: 18, 30, 42, 43 grid records after Enter; 46 unique total destinations. Each batch has a distinct polite announcement, including the final singular batch.
- Filters: Tax Strategy 17, S-Corp 10, Industries 7, CFO/Finance 5, IRS Help 6, Operations 1, All 46. Selected checkmark/aria-pressed and visible 2px focus outline verified.
- Search finds featured-only results, empty search/reset work; A-Z ignores title whitespace and Newest uses source dates.
- EN/ES at 1672/1280/390px: correct columns, no overflow, minimum 44px button targets; single search/email field. Body text 8.18:1, category badge 13.8:1, control borders 4.69:1, hero title 10.56:1 on the lightest gradient stop.
- All three starter article destinations render title/body. The retained extension article renders after a null-category guard. Soft CTA opens /en/book. Newsletter native email validation works; no email request was sent and no subscription is claimed.
- Added runnable resourceCatalog.test.ts regression check; automated suites/lint/typecheck/build were not run under workspace instruction.
- Visual verdict: 97/100. Client decisions are documented in docs/resources-client-decisions.md.

## Changed implementation files

- [Resources page wiring](D:/WORK/WORK/unionnational/src/app/[locale]/resources/page.tsx): one responsive composition; removed redundant mobile layout/category fetch; accurate metadata promise.
- [Resources layout/cards/controls](D:/WORK/WORK/unionnational/src/components/resources/ResourcesDesktopExperience.tsx): simplified hero, topic chips, starter cards, soft CTA, slim grid, load-more and truthful email request.
- [Catalog allocation/filtering](D:/WORK/WORK/unionnational/src/components/resources/resourceCatalog.ts): validation, canonical deduplication, relevance selection, overlap spacing and sorting.
- [Runnable regression check](D:/WORK/WORK/unionnational/src/components/resources/resourceCatalog.test.ts): protects uniqueness, featured/grid allocation, search/category behavior, malformed CMS titles and source dates. Added; not run under workspace instruction.
- [Article query](D:/WORK/WORK/unionnational/src/sanity/lib/queries/blog-queries.ts): available-content fallback for empty translated title/excerpt/body fields.
- [Article detail](D:/WORK/WORK/unionnational/src/app/[locale]/blog/[slug]/page.tsx): tolerates dangling category references.
- [Client decision notes](D:/WORK/WORK/unionnational/docs/resources-client-decisions.md): newsletter, overlap, freshness, tools/checklists and translation/category data follow-up.
