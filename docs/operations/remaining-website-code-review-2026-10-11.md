# Independent review: remaining website work

Date: October 11, 2026. Baseline: `1c9b500`. Scope: local commit only; no push, deployment, CMS mutation, provider change, or production migration was authorized by this review.

## Recommendation

**Approve the scoped local commit after the lead agent's fresh verification passes.** The initial P1 is mitigated and the P2 fixture issue is fixed; no unresolved fixable source finding remains in this scope. Production health-survey delivery remains blocked until the documented migration evidence and owner attestation exist. This is not production readiness or business-rubric approval.

## P2 fixed: CMS self-check fixture is self-contained

The initial `scripts/prepare-construction-book-copy.test.mjs:10` loaded `.omx/security-live-audit-2026-10-10/product-public-baseline.json` during module import. That file is not tracked and is ignored by `.gitignore:53`, causing ENOENT in a clean checkout. The corrected test constructs a representative product locally with synthetic old text, the observed keyed Portable Text structure, commerce fields and five absent Spanish feature paths. Source inspection confirms it no longer imports the ignored snapshot. Regression assertions for revision, keyed structure, rollback absence and field preservation remain. This P2 is closed.

## Initial P1 and mitigation

The initial P1 was at `src/lib/leads/delivery.ts:39`: removing `customData.submitted_at` from the fingerprint changes existing `v1` payload hashes. Added survey source/version fields also change legacy fingerprints. An original UUID fails closed against its old identity hash, but a fresh UUID can derive a new delivery key and miss an old accepted or uncertain reservation. The original new-format tests did not cover this transition.

The mitigation in `src/app/api/survey/route.ts` requires `HEALTH_SURVEY_FINGERPRINT_MIGRATION_CONFIRMED` to equal the literal `true` for general health surveys in production, before contact quota, lead reservations, or provider delivery. CFO submissions retain their independent contract. `src/lib/config/env.ts` also holds readiness for missing, false, or differently cased values. Ingress rate-limit storage can run before this gate; the gate does not claim to prevent every storage operation.

The reviewed regression fixtures seed pre-fix timestamp-bearing accepted/uncertain receipts and identity hashes. Legacy/versioned requests with original/fresh UUIDs return 503 without fetch or delivery-record changes. Exact-value gate fixtures and a synthetic confirmed case cover the intended opt-in. This closes the P1 for a local commit while activation stays blocked. No real setting was changed or legacy receipt migrated. Future attestation requires receiver evidence and preservation/mapping of legacy holds, or proof that affected reservations do not exist; blindly setting the flag, deleting receipts, or replaying uncertainty is not a migration.

## Source review

- Health scoring/API/delivery: reviewed canonical questions, option IDs and weights, numeric legacy compatibility, strict version/ID/value matching, CFO answer validation, server-derived scoring, raw-answer/contact/source preservation, exact-path timestamp normalization, concurrent and uncertain retry controls, and trace-only survey acceptance logging. Ambiguous historical zero answers are not assigned inferred IDs.
- English/Spanish assessment: reviewed the HealthCheck namespaces and survey, question, insight, contact/input, preview, result, and score-hook components. Visible question/help, step/module, capture/validation/pending/failure, result, and privacy strings use localized messages. IDs and numerical weights still come from the canonical contract. Result and privacy links use existing locale-aware navigation; keyboard focus and associated field errors remain present. Metadata uses translated neutral descriptions without the previous timing promise. Existing band advice is translated without claiming owner approval; no promotion was added.
- Construction book: reviewed both local message blocks, route override and associated tests. The existing BookOverview receives this book's localized copy. Other books retain CMS defaults. Hero, catalog/related copy, metadata and schema use the existing shared copy lookup. Product identity, prices, editions, cover, author, Stripe identifiers and commerce handlers are untouched by these changes. Published CMS drift remains explicit.
- CMS preparation: reviewed `scripts/prepare-construction-book-copy.mjs` and its existing private-output helper. The CLI rejects apply/unknown/duplicate flags, accepts only a fixed public GET or explicit offline snapshot, reads no credentials/environment, and has no mutator. It validates target/revision/keyed structure, derives current storefront copy, limits patch paths to copy, pins `ifRevisionID`, preserves original/candidate data, and asserts non-copy preservation. Output is private and exclusive; traversal/symlink output is rejected. Historical snapshots explicitly cannot establish omitted fields or current revision, and future application requires a fresh full-document read. No concrete finding in the visible implementation.

## Evidence and limitations

This independent pass inspected current source, diffs, callers, schema, and test assertions. The lead agent reported 52/52 scoped locale tests and scoped lint passing; this reviewer did not execute them. The lead agent subsequently reported a fresh complete unit run passing, while final type/build/browser verification remains pending and must replace older runs as final evidence. CMS preparation tests/documentation were reviewed; assertions cover copy equality, preservation, malformed structures, rejected flags, offline labeling and the fixed mocked GET. The fixture issue was verified with scoped Git tracking/ignore checks, then its self-contained correction was inspected.

The lead agent also reported a successful preparation-only fresh public GET producing 30 copy paths at revision `aY7Z7554SNEJL0Uz6cbSu3`, with `cmsMutationPerformed: false`. This reviewer did not make that request or independently establish current CMS freshness. The source guard and future-application revision requirements were reviewed.

No provider calls, tests, builds, scans, CMS writes, or recursive agents were run by this reviewer. Browser appearance, physical devices, assistive technology, hosted behavior, real receiver retention, live reservations, and manuscript/editorial approval were not independently verified. The owner-gated scoring/contact policy is a release decision, not a code defect established by this review.

The only file written by this reviewer is this record; no implementation was changed. The reviewed simplifications reuse canonical scoring, localized messages, existing navigation/overview components, and remove unsupported security/verification/timing copy. Remaining risk: migration attestation and external/content acceptance remain unverified and must not be inferred from a local commit.
