# WEB-INT-21: independent results, November 9, 2026

[Issue #19](https://github.com/Chromapages/unionnational/issues/19) · [QA PR #21](https://github.com/Chromapages/unionnational/pull/21) · [Footer PR #23](https://github.com/Chromapages/unionnational/pull/23) · [Home/FAQ PR #24](https://github.com/Chromapages/unionnational/pull/24)

**Scoped independent verification: PASS after corrections. Release: held.** All application/test implementation is frozen. No merge, deployment, CMS write or live submission/payment/conversion is authorized by this result.

## Exact reviewed trees

- Footer: `2944c557b6548e5613d080f22d079eafe67a17a9`, three changed paths against main `097c693fe548c2c3655ab09f110490a5f6672910`.
- Home/FAQ final head: `f7501a090127314c592cc2cac15a15237a372600`, parent `32144c8f76c45884f4a11082fbadf4d1f487e9f8`, same merge-base main. Eight cumulative paths: Home/FAQ routes and tests, direct FAQPageSchema component/test prerequisite, scoped note and directly affected singleton metadata test.
- The final commit changes only that clean singleton test and the note; production blobs are identical to the browser-verified `32144c8` snapshot.
- Each exported snapshot contains 1,463 expected tracked files and no extras. The 1,254 byte differences from Git blobs per export are only CRLF normalization, not source changes. Existing installed dependencies were linked; no private environment was copied.

The singleton test is an explicit clean-source override. Its separate integration counterpart contains protected preexisting VSL work: it was neither edited nor copied into the PR. The exported test matches its declared clean scratch source. No dirty catalogs, Contact, resources/sitemap, VSL, Contentful/blog or dependency changes entered these PRs.

## Standards / technical execution

Existing verifier p5 independently ran these checks from the exact exported source roots, using source-rooted aliases and a private network guard:

| Snapshot / phase | Exercised checks | Observed result |
| --- | --- | --- |
| Footer `2944c557` | 12 Footer tests; scoped ESLint; full exported-tree `tsc --noEmit --incremental false` | Passed |
| Initial Home/FAQ `ca275b85` | 21 Home/FAQ/schema tests; scoped lint; full exported-tree typecheck | Those checks passed, but the additional resolved-parent probe found the indexing regression below; this head is superseded |
| Corrected Home `32144c8` | 14 affected Home tests using installed Next metadata resolution; scoped lint; full exported-tree typecheck | Passed; prior truthy noindex and inherited restrictive parent directives preserved |
| Final clean singleton contract `f7501a09` | 15 singleton metadata tests; scoped lint; focused test-dependency typecheck | Passed; focused typecheck is not a new full-project typecheck |

Vitest was 4.1.11; installed Next was 16.3.8. Test commands invoked `node node_modules/vitest/vitest.mjs run --no-cache --config` with private root-specific configs `qa19-vitest.mts`, `qa20-vitest.mts`, `qa20-v2-vitest.mts` and `qa-v3-vitest.mts`, selecting only the affected test files. Lint used `node node_modules/eslint/bin/eslint.js` with the declared paths and `--max-warnings 0`. The final focused typecheck used `tsc --project` with `qa-v3-tsconfig.json`, `--noEmit --incremental false`. Complete resolved paths, argv and local outputs remain in private evidence; no private harness/config entered the repository.

No unaffected suites or browser fixtures were repeated for the final test-only commit. No manual broad suite, build or audit was run to reproduce existing CI failures.

### Corrected findings

1. **Indexing regression caught before merge.** Initial Home changed its prior truthy `seo.noIndex` rule to strict boolean true. With malformed `"true"` and an indexable parent, actual installed Next resolution changed from `noindex, nofollow` to `index, follow`; `"false"` also changed previous restrictive behavior. This was synthetic data, not evidence of live CMS corruption. DEV restored the existing truthiness rule without parsing/special cases, replaced the incorrect expectation with resolved-parent regressions, and re-froze. Independent recheck passed for boolean true, malformed truthy strings and restrictive parent inheritance.
2. **Clean-main test contract exposed by configured CI.** Run [42680111516](https://github.com/Chromapages/unionnational/actions/runs/42680111516) for `32144c8` passed lint/typecheck but failed three singleton tests because its bare key-echo translator lacked real next-intl `.has`. DEV repaired the clean exported test, using real catalog-backed translators and installed Next resolution. Literal key-title and query-forwarding assertions were removed, not re-pinned. No production shim or change to the protected local test was made. The final exact exported test passed all 15 cases independently.

The reported failures were treated as reproductions; old probes/suites were not rerun merely to reconfirm them. Original failed/intermediate evidence remains retained.

## Spec / authority review

Existing CMS agent p7 separately reviewed the issue contracts and exact initial commit diffs, without technical execution or application authorship. No content/source-authority or scope violation was identified: no phone UI was invented, the shared Footer legal loader and Shop API remained unchanged, Home stayed Sanity-backed, and FAQ used the approved catalog with shared visible/schema rows. That initial source-only review did not certify effective indexing; p5's execution finding superseded its indexing assurance, and the correction restored prior behavior.

No new commercial, people, translation or legal approval was inferred. The direct FAQ schema prerequisite is explicit; unrelated local migration history was not pushed wholesale.

## Independent local surface proof

P5 independently passed six Footer and six Home/FAQ EN/ES browser-fixture cases at 1024×800 using actual snapshot components. Cases exercised privacy dialogs, legal/contact/booking destinations, valid Home-logo retention, FAQ answer/schema agreement and empty states. Saved reports show hydration and privacy controls passed, zero guarded I/O attempts/page errors, empty privacy-choice storage and no observed horizontal overflow. Lead read the successful report summaries directly.

Standalone Home/FAQ intentionally retains main's older Footer. Its malformed-legal Footer fixture exposed that preexisting Footer failure, so its own Home/FAQ cases used valid Footer inputs rather than importing PR #23's fix. Footer malformed-data recovery is verified separately in PR #23. Review these as separate fixes, not a hidden prerequisite copied into one tree.

Fixtures mock CMS/cache, framework navigation/image, header/tracking and unrelated Home sections. They are not full Next routing/RSC, real-device, assistive-technology, live-provider or native-Spanish certification. Earlier unsuccessful harness attempts remain retained. The report's `serverClosed` flag was misleading on Windows signal termination; child exit events were awaited and port 3359 was independently confirmed available. No production configuration/security change was made to accommodate fixtures.

## Preservation and ownership

DEV p9 was the sole application/test writer; p5 independently verified frozen snapshots and never repaired application files. p7's source/spec review was separate; p4 remained copy-only and p6 received no input.

Integration HEAD/branch remained `a5017f26e5cb1524daeae14f713ff837ed7e462f` / `fix/contentful-migration-integration`. Initial 1,484-file frozen evidence was retained. After the allowed first-wave changes, the 1,488-file manifest was independently verified before/after checks, including unchanged status, real staged index, protected dirty diff and private environment equality.

The final contract repair changed only its integration note; the other 1,487 integration files, including every application file and the original dirty singleton test, stayed exact. The clean test changed only inside its isolated scratch tree and then its explicit PR source override. Protected baselines were not refreshed. This result document is a subsequent declared lead-owned documentation addition, not part of the earlier application delta or a claim that its older status snapshot contains it.

PR commits were constructed with temporary Git indexes and explicit allowlists; no real-index staging, worktree checkout or publishing of the dirty integration tree occurred.

## CI and release limits

The configured pipeline, triggered by PR publication, is separate from local guarded checks. [Run 42674071283](https://github.com/Chromapages/unionnational/actions/runs/42674071283) compiled and typechecked, then failed page-data collection with Sanity HTTP 402; its production dependency audit reported high/critical advisories. The audit output is not an application exploitability assessment. PR #23's pipeline also failed Build and Production dependency audit after passing lint/typecheck/coverage. No billing intervention, forced dependency upgrade, gate suppression or manual workflow rerun was performed.

At the final head check, `f7501a09` CodeQL succeeded and Quality run [42684176278](https://github.com/Chromapages/unionnational/actions/runs/42684176278) was still in progress. Its full CI result is not certified by this record. Dependency remediation and provider/build availability remain separate release work.

`WEB-INT-06D` stays paused, `WEB-INT-07` still requires explicit current commerce source authority, and people/guide/global-source/native-language gates remain. No CMS authoring/publication, dependency removal, real submission/purchase/conversion, merge, deployment or release approval occurred.
