# WEB-INT-20: Home/FAQ source and locale robustness

[Issue #18](https://github.com/Chromapages/unionnational/issues/18). Developer implementation record; not a completed Contentful migration, independent QA PASS or release approval.

## Source/locale matrix

| Surface | EN and ES source | Recovery / preserved behavior |
| --- | --- | --- |
| Home presentation | Sanity `HOME_PAGE_QUERY` and `SITE_SETTINGS_QUERY`; `ConsumerHome` local catalogs | Rejected/missing results remain optional; validate logo collection/records and schema `sameAs` at this route boundary. Keep valid logos and settings. |
| Home metadata | Existing same-locale `ConsumerHome.seo` catalog; Sanity contributes only `seo.noIndex` | Missing/rejected SEO translation reads use the same approved local catalog, never another CMS or the opposite locale. Preserve predecessor fail-closed truthiness: any truthy Home `noIndex` restricts robots, including malformed strings; otherwise inherit global policy. Never emit permissive robots. |
| Home URLs/media | Existing locale guard, EN/ES canonical/alternates, foreground-video then background-video priority | No destination, video/poster, source ownership or presentation-approval changes. |
| FAQ answers/schema | Existing approved `ServicesPage.FAQ` local catalog, not authored Contentful FAQ entries | Keep nonblank string question/answer pairs; share the same validated rows with visible FAQ and schema. Missing/malformed/rejected translations use the existing localized empty state and retain contact access, with no empty FAQ schema. |
| FAQ metadata/route copy | Existing static English metadata/hero/contact copy; localized canonical/alternates and answer/search catalogs | Intentionally unchanged; this ticket supplies no new copy or native-Spanish approval. Global robots remain inherited. |

The prechange matrix was recorded before route edits in local `home-faq-source-before.md`. Current installed Next fetching, metadata and cache guides were read; async params and existing caching behavior remain intact.

## Files and demonstrated defects

Changed: `src/app/[locale]/page.tsx`, its existing adjacent test, `src/app/[locale]/faq/page.tsx`, its adjacent test, and this note. No protected ConsumerHome/FAQSection/FAQAccordion/catalog or tracking files changed. `FAQPageSchema` needed no new repair.

Historical pre-fix guarded fixture reproduction: 13 failures across the Home/FAQ tests. Home: null result-envelope destructuring; missing SEO keys leaking into metadata; non-array/null/malformed logo records crashing the actual logo consumer; non-iterable schema `sameAs`. That run also included an incorrect new expectation that truthy string `"false"` should not restrict indexing; independent QA subsequently rejected that policy change, and the expectation is withdrawn. FAQ: missing/non-array/key-valued item collections, rejected translation read, and incomplete/nonstring rows leaking into UI/schema. Rejected Home SEO reads are also covered by the developer recovery checks; the original combined red case stopped at missing-key failure first. No live CMS corruption is asserted.

Home's old tests only asserted JSX truthiness; replace them with consumer-visible metadata, actual logo-consumer and schema checks. FAQ tests retain answer expansion/search/schema consistency and localized booking destinations; remove obsolete no-CMS mock-call assertions. No wording snapshots or source-text tests were added.

## Historical pre-QA developer verification

On the integration tree before independent QA (these results did not establish resolved-parent indexing correctness):

- Guarded Vitest, four affected/prerequisite files: **33 passed**, exit 0. Home 10, FAQ 9, Footer 12, FAQPageSchema 2. Guard fetch, sockets/TLS, XHR, WebSocket and beacon; mock optional CMS/action/tracking seams.
- Scoped six-file ESLint: exit 0, no diagnostics.
- `tsc --noEmit --incremental false`: exit 0.
- Browser source fixture: 12 EN/ES cases across three Footer variants, malformed Home and mixed/empty FAQ. Actual route functions and ConsumerHome core render; actual logo, FAQ, schema, privacy and disclaimer controls are exercised. FAQ search recovers its empty state; valid rows match schema; valid Home logo survives malformed siblings. All hydrated; no guarded I/O/main-world runtime errors, tracking choice or horizontal overflow at effective 929×917.

Exact commands/results: local `WEB-INT-pr-wave-20261109/{home-faq-red,scoped-tests-final,scoped-eslint-final,typecheck-final}.txt`, `browser-result.json`, `browser-visuals.md` and fixture server/source matrix. Browser framework image/navigation, CMS/cache/header/tracking/booking and unrelated Home sections are mocked/inert; no full Next layout, image optimization, complete Home composition, device, native-Spanish or live-CMS certificate is implied. The browser emulation/context/screenshot tooling limits and fixture-only warnings are recorded, not hidden or repaired in production code.

## Isolated main-based PR prerequisite

Pinned main: `097c693fe548c2c3655ab09f110490a5f6672910`; integration baseline: `a5017f26e5cb1524daeae14f713ff837ed7e462f`. The existing local FAQ route already uses approved catalog rows, whereas pinned main still reads Sanity. Preserve that directly required committed FAQ route/test baseline in #18. Include the committed `src/components/seo/FAQPageSchema.tsx` and `.test.tsx` prerequisite: its public `items` contract lets visible answers and schema share the same rows and removes its separate Sanity read. Its sole application caller is this FAQ route; its existing two behavioral tests passed. These schema files are unchanged by this implementation.

No FAQList, FAQAccordion, localizedAlternates, catalog, Contentful/blog/dependency or Contact/resources/VSL prerequisite is needed from committed local history for these changes. Do not copy the dirty integration tree or four preceding commits into the PR. Lead owns the explicit allowlist/isolated main-based tree; exact exported PR-tree verification remains pending that supplied snapshot and must not be inferred from these integration results.

## Protection and exclusions

Before/after private manifests, exact initial dirty diff and per-ticket delta patches accompany the freeze. Credentials are not copied or published; only private equality checks are retained. No stage/switch/commit/push, CMS/token requests/writes, source/business approvals, commerce/storage changes, weakened validators, real submission/purchase/conversion, merge or deploy. No full build, broad suite or known Sanity 402 re-probe. WEB-INT-06D remains paused; WEB-INT-07 authority remains blocked. Independent p5 QA and lead-owned cutover documentation/publication remain separate.

## Independent indexing finding and bounded correction

Independent p5 stopped verification after reproducing a blocking regression in standalone snapshot `ca275b854dc51582a1fd934ca7eb9d864035bccb`: with an indexable parent and malformed Home `noIndex: "true"`, predecessor metadata resolved to `noindex, nofollow`, while the strict-boolean snapshot resolved to `index, follow`. Truthy `"false"` likewise changed the predecessor's restrictive behavior. This is synthetic source corruption, not a live Sanity assertion. The settled finding is ground truth; its old probe was read but not rerun. Earlier red/green artifacts remain historical and unchanged. p5 stopped before independent browser verification.

Restore only the original Home truthiness condition. No parsing, string special cases, permissive robots, source substitution or new indexing policy. Replace the incorrect strict-boolean test with actual installed Next `accumulateMetadata` resolution of actual Home metadata and parent metadata, following the existing repository resolver-test seam. Assert final `noindex, nofollow` for boolean `true` and malformed strings `"true"`/`"false"` with an indexable parent; when Home restriction is false or absent, assert inherited restrictive parent basic/Googlebot directives, including its preview restriction.

Affected checks after correction, with guarded external seams:

- Home `page.test.tsx` only: **14 passed**, one file, exit 0. No Footer/FAQ/schema tests or browser fixtures rerun.
- ESLint on Home page/test only: exit 0, no diagnostics.
- `tsc --noEmit --incremental false` for the new installed-resolver/Node import contracts: exit 0.
- Installed RTK compacted human CLI output; complete original command/output evidence remains in `indexing-fix-home-tests.txt`, `indexing-fix-home-eslint.txt` and `indexing-fix-types.txt`. No configuration, dependency, Headroom profile or skill installation/change was made.

Correction ownership is only Home page, adjacent test and this note. Preservation remains against the existing private `dev-after.json`, not a refreshed baseline; correction-only manifests and exact delta are under local `WEB-INT-pr-wave-20261109/indexing-fix/`. No Footer/FAQ/schema/catalog/commerce or other protected file is authorized to change. Lead must append/export/publish the corrected isolated PR snapshot; exact new PR-tree verification and p5's bounded independent recheck remain pending. This correction does not claim release readiness.
