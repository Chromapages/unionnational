# Prelaunch SEO audit — 2026-10-12

Mode: AUDIT. Scope: repository review and sampled HTTP responses from the existing development server at `http://localhost:3000`. This is not a production crawl or a launch sign-off.

## Intake and limits

- CONFIRMED / OBSERVED: Next.js App Router, Sanity content, English and Spanish locale routes. Production URLs in sampled metadata use `https://unionnationaltax.com`.
- ASSUMPTION: The primary organic conversion is a qualified tax/advisory inquiry or booking. Confirm before setting performance targets.
- MISSING: Search Console, analytics baseline, keyword/backlink exports, competitor priorities, production hosting verification, migration URL inventory, budget, and launch date. No traffic, ranking, or revenue estimate is made.
- Available capabilities: file read/write, shell, web documentation lookup, browser tooling, and manual HTTP sampling. No dedicated crawler or connected SEO performance data was used.
- Existing uncommitted work was preserved. No CMS content was changed and nothing was published or deployed.

## Findings and actions

Expected effects below are qualitative estimates (INDUSTRY OPINION), not ranking promises. Source and HTTP findings are OBSERVED; search engine rules are DOCUMENTED where linked.

| Priority / status | Issue | Evidence | Expected effect | Effort | Fix / dependency | Owner | Acceptance metric |
|---|---|---|---|---|---|---|---|
| P1 / IMPLEMENTED; HTTP VERIFIED | Blog archive exposed only 12 articles | Before: archive query sliced `[0...$limit]`, caller supplied 12; sitemap advertised 46 English articles. After: `/en/blog` and `/es/blog` each emitted 46 distinct localized article links with HTTP 200. | Restore direct archive discovery and search for older articles | Low | Removed the limit; reuse the current archive. Add crawlable pagination when the catalog grows. | Developer | Both archives expose the current article catalog; every linked article resolves. Full link destination crawl remains outstanding. |
| P1 / IMPLEMENTED; HTTP VERIFIED | Deleted category references could break archive rendering | Uncapping revealed `Cannot read properties of null (reading 'title')` in `BlogCard`. Final sampled archives had one H1, 46 links, and no occurrence of that error. | Prevent older CMS records from breaking the archive | Low | Filter missing referenced categories in archive, recent, featured, detail, and resources queries. | Developer | Deleted-reference regression passes; archive and resource cards render. Automated regression not run. |
| P1 / IMPLEMENTED; fixture verification pending | Industry-guide links consumed projected string slugs as objects, creating `/undefined` paths; all featured playbooks went to S-Corp | Industry page used `chapter.slug.current` and `playbook.slug.current`; query projected strings. `HubHero` had one hardcoded card URL. Current sitemap has no dynamic published hub playbooks/industry guides to exercise the fix. | Correct discovery when hub content is published | Low | Use projected slugs, resolve a chapter's owning published playbook, handle the canonical S-Corp route, omit orphan/missing-slug destinations. | Developer | Fixture cases for generic/S-Corp playbooks and orphan chapters pass; every populated card reaches its intended page. |
| P2 / IMPLEMENTED; HTTP VERIFIED for archive | Blog and hub links omitted locale prefixes | Before: Spanish archive links used `/blog/...`. After: all 46 sampled links use `/es/blog/...`; English uses `/en/blog/...`. Hub navigation sample now emits `/en/hub/...`. | Keep users in their selected language; avoid locale negotiation hops | Low | Reuse existing locale-aware navigation in blog cards/detail and hub cards. | Developer | Spanish and English journeys retain their locale. Article/hub full interactive navigation remains unverified. |
| P1 / OPEN | Spanish blog and hub experiences contain English content | `/es/blog` emitted English description and H1. Sample `/es/blog/s-corp-reasonable-compensation-audit-trap-2026` emitted English article title/body while declaring Spanish alternates. Query falls back to English when Spanish body is absent. | Improve language targeting and Spanish usefulness | Medium | Inventory actual translations, translate shells and approved content, then decide treatment of untranslated URLs. Do not mass-noindex or redirect without explicit approval and rollback plan. | Content owner + developer | Spanish advertised alternates contain approved Spanish primary content; reciprocal language annotations match actual supported variants. |
| P1 / OPEN | Hub links lead to an unavailable playbook | `/en/hub` contains `/en/hub/s-corp-playbook`. That destination returned title `Playbook Not Found`, no H1, and a noindex tag in a streamed HTTP 200 response. Sitemap contains no dynamic published playbooks. | Remove dead-end resource journeys | Low–medium | Publish an approved, useful playbook or conditionally omit links until one is available. Confirm intended hub launch scope. | Content owner + developer | No visible playbook link leads to a missing-content page. |
| P2 / OPEN | Blog CMS metadata overrides are ignored | `BLOG_POST_QUERY` projects only `seo.noIndex`; metadata uses article title/excerpt/featured image despite editor fields for SEO title, description, and social image. | Make editorial SEO controls effective | Low | Project localized SEO values and consume them with existing fallbacks. | Developer | A controlled editor override is reflected in emitted title, description, and social image. |
| P2 / OPEN | Undated posts are presented as newly published; savings claim lacks supporting evidence in template | Card and article use `new Date()` when `publishedAt` is missing. Article sidebar asserts average annual savings of $20K; substantiation was not supplied. Whether posts lack dates is UNKNOWN. | Improve content credibility | Low + editorial review | Require genuine publication dates or omit unknown dates. Substantiate or revise the savings claim; check tax-law accuracy and sources with the content owner. | Content owner + developer | No fabricated publication date; quantitative claims have approved evidence. |
| P2 / OPEN | Service alias relies on streamed redirect | `/en/services/tax-planning` returned HTTP 200 with immediate meta-refresh to `/en/tax-planning`; the final route returned 200 with a service H1. | Cleaner server redirect behavior; no claim that the existing redirect is ignored by Google | Low | Verify production behavior. Prefer a server-side permanent redirect before streaming if this persists. Any expanded redirect map needs approval and rollback. | Developer | Alias returns 301/308 to final 200 URL in production with no loop or chain. |
| P2 / OPEN | Sitemap origin is configurable while most canonical origins are hardcoded | Sitemap uses `publicEnv.baseUrl`; robots and localized canonical helper use fixed production origin. Sampled output currently agrees. Deployment environment is UNKNOWN. | Prevent conflicting URL signals | Low | Verify `NEXT_PUBLIC_BASE_URL=https://unionnationaltax.com` for launch. If configurable origins are required, agree a shared-origin change separately. | Release owner | Robots sitemap reference, sitemap URLs, canonicals, and hreflang use the same approved HTTPS origin. |
| P3 / OPEN | Repeated article H1 and missing article JSON-LD | Sample Spanish article had two matching H1s; `BlogContent` renders CMS `h1` blocks beneath the template H1. No article JSON-LD in inspected template. | Clearer document structure and optional article search appearance support | Low–medium | Review article outlines; keep title in the template and body sections at H2/H3. Add Article markup only from genuine visible dates/authors/content. Multiple H1s alone are not reported as a ranking penalty. | Content owner + developer | Accessible outline; schema validates and matches visible content. |

## What the sample already gets right

OBSERVED:

- `/robots.txt` and `/sitemap.xml` returned 200. Robots allows public crawling and advertises the sitemap; it blocks `/hq/` and `/api/`.
- The sitemap emitted 212 distinct URLs; no duplicate URL was counted. This does not prove all 212 destinations are indexable or return 200.
- Sampled English/Spanish home, contact, pricing, tax-planning, and blog metadata had locale-specific production canonicals and language alternates.
- A deliberately missing route returned 404 with noindex. CMS-dependent missing content can still produce a streamed 200, as observed for the playbook.
- Home/contact emitted CMS-backed AccountingService JSON-LD with the same phone and Orem address. Business accuracy and rich-result eligibility were not independently verified. The separate hardcoded `LocalBusinessSchema` component contains placeholder details but is not rendered by the inspected layout; it is not reported as live schema.

## Launch sequence

1. Developer: review the local diff and run the added regression file plus relevant existing suites when authorized. The workspace prohibits tests, lint, typecheck, and builds absent a direct `npm run build` request. They were not run.
2. Content owner: resolve Spanish content coverage and unavailable hub content before promoting those journeys. Review tax claims, authorship, and dates.
3. Release owner: verify canonical domain, preview protection, CMS global/page noindex settings, production redirects, and a production crawl of sitemap URLs. Do not remove noindex indiscriminately from private, checkout, or preview flows.
4. Developer: inspect child metadata overrides against the global noindex setting in a controlled preview. Several pages explicitly supply `robots: undefined`; Next.js metadata merges shallowly, so inheritance must be tested rather than assumed.
5. Release owner: measure production mobile performance, accessibility, and rendered structured data. Development-server timings are not field Core Web Vitals evidence.
6. Analytics owner: verify consent-respecting inquiry/booking conversion events, verify Search Console ownership, submit the approved production sitemap, and track crawl/index state, impressions, clicks, and qualified leads. Review technical errors immediately after launch; review visibility weekly and conversion trends monthly without treating short-term changes as causal proof.

Rollback for these local code changes: revert only the hunks/files listed below, preserving unrelated existing edits. No URL migration, mass redirect, mass deindexing, CMS mutation, or deployment was performed. Future site-wide changes require an approved URL/content inventory and explicit rollback plan.

## Changed files and simplifications

- `src/app/[locale]/blog/page.tsx`: remove archive limit parameter.
- `src/app/[locale]/blog/[slug]/page.tsx`: reuse locale-aware Link.
- `src/components/blog/BlogCard.tsx`: reuse locale-aware Link.
- `src/components/hub/HubHero.tsx`: consume actual playbook slug and reuse locale-aware Link.
- `src/app/[locale]/hub/industries/[slug]/page.tsx`: correct projected data shape, link intended localized playbook/chapter, omit orphan links.
- `src/sanity/lib/queries/blog-queries.ts`: remove archive cap and filter missing category references.
- `src/sanity/lib/queries/resource-queries.ts`: resolve chapter owner, exclude missing-slug destinations, filter missing blog categories.
- `src/test/seo-resource-links.test.tsx`: five regression cases added, not executed.
- `docs/seo-prelaunch-audit-2026-10-12.md`: this evidence and launch backlog.

No dependencies, navigation abstraction, content generator, or new SEO runtime was added. Showing all 46 current articles is the smallest working archive solution; page weight and future catalog growth remain a reason to implement measured, crawlable pagination later. Chapters attached to multiple published playbooks use the first slug in alphabetical order; review ownership if the same chapter intentionally belongs to multiple guides.

## Official documentation checked

- DOCUMENTED: Google discovers links most reliably through ordinary anchors and recommends connecting important pages with internal links. [SEO link best practices](https://developers.google.com/search/docs/crawling-indexing/links-crawlable).
- DOCUMENTED: Main content determines language; hreflang does not translate content or change language detection. Reciprocal alternates should describe real localized variants. [Localized versions](https://developers.google.com/search/docs/specialty/international/localized-versions).
- DOCUMENTED: Sitemaps should advertise the canonical URLs intended for search. [Build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).
- DOCUMENTED: Google must be able to crawl a page to read its noindex directive. Robots blocking alone is not reliable removal from search. [Block indexing with noindex](https://developers.google.com/search/docs/crawling-indexing/block-indexing).
- DOCUMENTED: Structured data must accurately represent visible content. [Structured data policies](https://developers.google.com/search/docs/appearance/structured-data/sd-policies).
- OBSERVED framework reference: installed Next.js documentation at `node_modules/next/dist/docs/01-app/03-api-reference/04-functions/generate-metadata.md` describes shallow metadata merging; robots/sitemap file conventions were read before edits.

Not checked: automated suites/build, exhaustive crawling, interactive browser navigation, production response behavior, field performance, Search Console, analytics, backlink profile, tax/legal accuracy, or actual Google indexing. This audit is not production readiness certification.
