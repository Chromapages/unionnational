# WEB-INT-21: frozen-diff verification and publication protocol

Tracks [issue #19](https://github.com/Chromapages/unionnational/issues/19), covering [Footer #17](https://github.com/Chromapages/unionnational/issues/17) and [Home/FAQ #18](https://github.com/Chromapages/unionnational/issues/18). This document defines the verification contract; it is not an execution PASS or release approval.

## Ownership and authority

- The restored visible DEV `wG:p9` is the sole application/test writer. Former DEV `wG:p2` is no longer live.
- Existing verifier `wG:p5` independently reviews frozen changes and reports defects; it does not repair application files.
- TPM owns ticket sequencing, documentation and isolated PR commits/pushes. Writer `wG:p4` reviews copy only. No input goes to `wG:p6`.
- The user's November 9 request authorizes scoped tickets, draft PRs and technical implementation. It does not select a commercial source, approve a partial hybrid, authorize CMS changes, merge, deployment, dependency removal or real submissions/payments/conversions.
- Campaign draft authoring (`WEB-INT-06D`) remains paused. No Management-token requests or credential discovery.

## Baseline and allowed changes

The protected integration baseline is branch `fix/contentful-migration-integration`, HEAD `a5017f26e5cb1524daeae14f713ff837ed7e462f`, with 1,484 frozen tracked/nonignored and specifically protected files. Detailed hashes and binary diffs remain in private local evidence, not this repository.

Before implementation, record HEAD, branch, Git status, the exact existing diff and per-file hashes. Protect all pre-existing uncommitted Contact, resources/sitemap, VSL, catalogs, FAQSection/FAQAccordion and tracking work. A credential file may be hashed privately for equality; never publish its values, copied contents or hash in a PR.

Allowed application paths are limited to the ticket manifest:

- Footer component and adjacent tests for #17.
- Home/FAQ route components and adjacent tests for #18.
- FAQ structured-data component/tests only when required by a demonstrated defect.
- Directly scoped change notes. TPM documentation additions use separate owned files.

Any additional dirty application path requires an explicit ownership/scope update before editing. No bulk formatting or incidental cleanup.

## Frozen verification sequence

1. DEV completes both scoped implementations, records the exact allowed delta and its checks, and stops editing.
2. TPM pins the complete implementation snapshot and declares it frozen. No application implementation proceeds while p5 verifies.
3. p5 independently inspects root causes, fixes and affected consumer behavior. Use current source and installed Next.js documentation, not historical task headers.
4. Exercise standard/compact/booking Footer variants and Home/FAQ EN/ES paths as applicable. Include missing data, rejected reads, fulfilled malformed collections/records and meaningful negative identity/locale cases.
5. Run only the affected test files and scoped static checks identified by the implementation manifest. Regression tests must catch consumer-visible defects, not source text, copied values, mock forwarding or incidental wording.
6. For a changed visible surface, observe an actual local surface where feasible. Source-fixture browser evidence must explicitly identify mocked CMS/framework/header/tracking boundaries; it is not a full Next runtime/device/assistive-technology certificate.
7. Guard external network, form delivery, analytics/conversion and payment actions. No real calls, submissions, purchases or conversion events. Fixture credentials must not reach an external API.
8. If a defect is found, return it to DEV with a reproducible case. End verification, permit only that repair, then freeze before a bounded recheck.
9. Compare final protected hashes, status, HEAD and existing diff against the baseline outside the declared delta. Record additions/deletions and any evidence-file changes separately.

## Exact PR snapshot rule

The integration branch is ahead of remote `main` by pre-existing local migration commits and contains separately reviewed dirty work. Do not stage or push that entire tree as a shortcut.

TPM constructs a separate commit tree against the pinned remote-main parent using a temporary Git index and an explicit path allowlist. The real index, worktree branch and HEAD stay untouched. Footer and Home currently share main's baseline. Any already-committed FAQ/structured-data prerequisite needed by #18 must be declared and reviewed as part of that PR; Contentful/blog/dependency or dirty Contact/resources/VSL changes are not incidental prerequisites.

Before pushing, assert that each commit changes only its declared paths and contains no ignored credentials or machine-local evidence. Verify the exact exported PR tree with installed tooling or a guarded local fixture, not only the different integration tree. GitHub CI results remain separate from local results and may encounter unresolved provider/build gates.

Draft PR publication is not merge or deployment authority. Keep production/CMS state unchanged and never imply scoped checks establish whole-site readiness.

## Execution record requirements

The independent result is a separate dated record containing:

- exact PR commit/tree identifiers and implementation manifest;
- commands, versions, exit codes and actual observed outcomes;
- consumer cases exercised and source/runtime seams;
- preservation result and any explicitly allowed differences;
- verified versus developer-reported results;
- unresolved live-CMS, Next runtime/browser/device, native-Spanish and release limitations.

Do not rerun a full build merely to reproduce the known unrelated Sanity HTTP 402. Global indexing, remaining Sanity sources, people/commerce authority and Sanity-backed payment storage remain separate release gates. This protocol does not close `WEB-INT-12`.
