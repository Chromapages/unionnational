# Construction book CMS copy preparation

This CLI prepares a private editorial proposal. It cannot apply a CMS mutation and rejects `--apply` and every unknown option before fetching or writing. It reads no credentials or environment values and needs no token.

Run from the repository:

```powershell
node scripts/prepare-construction-book-copy.mjs
```

The only network operation is an unauthenticated GET to the fixed Sanity API query for project `p1x9y3wz`, dataset `production`, published product `038a9b49-ee53-4e6a-9897-e9fe51693396`, slug `the-money-making-blueprint-for-construction-companies`. Redirects are refused; a failed read stops without a proposal. The default output is a unique JSON file under `.release-evidence/construction-book-copy`, using the existing private-output guard. `--output` may select another private `.release-evidence` or `.local-backups` subdirectory.

The October 11 preparation obtained a fresh full-document public GET at `2026-10-11T21:01:48.443Z`, confirming revision `aY7Z7554SNEJL0Uz6cbSu3`. Its private proposal is `.release-evidence/construction-book-copy/1791752508454-756e0b33-586e-4b18-b705-4335edc7ad25-proposal.json` with 30 text paths and `cmsMutationPerformed: false`. An earlier sandbox read failed and produced a separate explicit offline proposal from the October 10 projection; use the fresh proposal for review. This observation establishes freshness at capture time only; future application still requires another public read and editorial approval.

For explicit offline preparation:

```powershell
node scripts/prepare-construction-book-copy.mjs --snapshot .omx/security-live-audit-2026-10-10/product-public-baseline.json
```

Snapshots may be a product document, a public query response with `result`, or an envelope with `document` and `capturedAt`. Supplied snapshots are always labeled offline and unverified this run. An unwrapped document has no verified capture timestamp. The October 10 baseline is a historical projection without `_type`; the CLI permits that omission and records the limitation, while rejecting a present type other than `product`. Omitted fields in a projection cannot be checked. A fresh public GET must include the full product document and `_type: product`.

The proposal includes the source document, candidate document, current before values, revision, a commerce/identity SHA-256 and a rollback record. It prepares exactly 30 EN/ES text paths: two short descriptions, ten feature strings, sixteen objective titles/descriptions and two long-description spans. Short copy comes from the current `Shop.Desktop.books.construction` and `Shop.ProductPage.constructionOverview` messages. The long description is the existing manuscript-backed English draft with a faithful Spanish translation, stored literally in the script. English editorial and Spanish language/content approval remain required; generating a proposal is not approval.

The script requires five features and four objectives with safe unique stable keys. Each long-description locale must be one normal Portable Text block with one unmarked span and no annotations. It targets existing block/span keys and never replaces a Portable Text array. Any different structure stops preparation for review. The Sanity patch uses its native `ifRevisionID` precondition, pinned to the observed `_rev`. Every non-copy field and every untouched part of the copy structure must be exactly unchanged in the candidate; the hash includes all supplied identity/commerce fields, including title, cover, author, price, editions, Stripe references and offers. This tool makes no cart, format, availability, checkout or source-copy edits.

Before any separately authorized future application, obtain English/Spanish approval and re-fetch the full published document. Compare revision, keys, Portable Text structure and commerce identity, regenerating the proposal if anything drifted. Preserve the full original privately and apply only the reviewed copy allowlist with a revision precondition. This preparation script intentionally contains no apply path; production CMS writes, provider calls, deploys and pushes require their own authorization.

For rollback, re-fetch and verify the current revision and preserve the post-application document first. Restore only reviewed `before` values against that fresh revision; unset paths listed in `originallyAbsentPaths` instead of storing null. Review rollback editorially because the original copy contains the known manuscript mismatch. Do not restore an entire stale document or replay an old revision.

Scoped self-checks:

```powershell
node --test scripts/prepare-construction-book-copy.test.mjs
```

These use self-contained fixtures with the public historical keys/structure and synthetic old text, plus temporary directories under `.omx/tmp`. They verify the known Portable Text structure and actual EN/ES messages, reject malformed documents and write flags, and prove unrelated fields remain unchanged. A mocked fresh-read test proves the transport is a fixed unauthenticated GET; it does not establish live CMS freshness.
