# UNT pricing: proposed migration and rollback

Status: local implementation handoff, no content writes executed. Commercial approval, authenticated draft inventory and separate migration/publication/deployment authorization are required. See [editor checklist](./unt-pricing-cms-editor-checklist.md) for exact fields and observed IDs/revisions.

## Compatible architecture

Reuse `pricingTier` for the ten shared display offers and `servicePage` for existing pages. Add localized `priceNote` for qualifications/credits, `pricingPage` for ordered offer selection and page copy, and optional `service.pricingOffers[]` / `servicePage.included.pricingOffers[]` for parity across overview/details. The small additional `pricingPage.irsReviewOffer` explicitly selects IRS pricing because no IRS catalog service or service page was observed. It must select an offer also in `offers[]`; do not create a new service ID or infer a match from an English label.

Old fields remain readable during migration, but touched frontend paths fail to neutral inquiry wording when new offer data is missing. They do not restore superseded prices. One CPOB offer is valid. No numeric commerce schema, Stripe product, checkout, CPOB route, comparison matrix or migration executable was added.

## Inventory and backup before a write

1. Record the current local/code release revision and actual deployed revision separately. This local branch started at `1c9b50062048fbecfaa169ed68a37af06827842a`; audited source was `097c693fe548c2c3655ab09f110490a5f6672910`. Neither proves the deployed revision. Preserve unrelated dirty work.
2. Explicitly target project `p1x9y3wz`, dataset `production`; confirm these remain the authorized targets. Use least-privilege authenticated access and a non-CDN raw perspective for inventory. Do not log credentials.
3. Fetch complete originals, not the read-only projected inventory. Include both published and `drafts.` counterparts for every affected actual record; inventory release/version records and incoming references where present. Inspect drafts before deciding offer reuse versus new drafts. Do not overwrite unknown editor work.
4. Record each real `_id`, `_type`, `_rev`, original and proposed allowed field paths in a bounded manifest. New identities must be real editor-generated records recorded after separate authorization; local `fixture:*` IDs must never enter the manifest.
5. Store full backups outside public/served paths, using the existing private output handling. Keep project/dataset, timestamp, originals, missing IDs and expected revisions. Retain original unpublished drafts separately from published documents. The current `.omx/tmp/.../cms-inventory.json` is a partial published-only observation, not a full backup.

## Dry-run proposal

1. Resolve every commercial/editor decision and produce a dated approved ten-offer ledger. Draft fixtures are evidence of proposed rendering, not commercial approval.
2. Review additive schemas, projections, localization and singleton constraints locally. Complete authenticated draft inventory; choose actual offer IDs without repurposing unrelated Foundation/Growth/Executive, BOI, amendment or multi-state records by inference.
3. Produce a field-level diff of the manifest only: chosen offer fields, the single pricing page and selected service/page references plus approved pricing/scope/FAQ parity changes. Preserve unrelated fields, documents, array keys, drafts, routes and analytics identifiers.
4. A future authorized script must reuse `mutationOptions`, `backupForMutation` and `reportMutationFailure` from `scripts/lib/sanity-mutation.mjs`. Preview is the default. Explicit project/dataset flags must match client configuration. The apply gate is `--apply --target=production --project=p1x9y3wz`; this is a future safeguard description, not an instruction to apply now. There is no new migration command to execute.
5. Before any future apply, `backupForMutation` re-reads full originals and rejects stale/missing expected revisions, duplicate/invalid IDs and target/auth changes. It writes a private, exclusive backup under `.local-backups/sanity`. Ensure both draft/published IDs are included in the plan and the inventory client really uses raw perspective; the helper cannot infer counterparts or recover documents omitted from the manifest.
6. Also use revision-conditional patches (`ifRevisionID`) in the write itself. The backup check alone leaves a race between re-read and commit. For separately authorized new drafts, use create-if-absent semantics; do not replace existing records. A revision conflict stops the batch for fresh inventory/review. Never retry by dropping the revision guard.
7. Draft writes and publication are separate approvals/actions. Prepare drafts only when draft mutation is explicitly authorized; do not publish them as a side effect. No production dataset mutation is authorized by this local task.
8. Preview exact EN/ES content and record all values, qualifiers, cadence, credits, references, FAQ/JSON-LD and safe CTA paths. Test missing/duplicate page, unresolved references and fetch failure: neutral content only. Keep IRS local disclaimers and fixed final booking CTA. Confirm services/forms/book commerce regressions with synthetic data; no live submissions or charges.

## Future coordinated release

Choose the compatible release sequence against actual hosting/cache behavior before authorization. The additive schema/query support and approved content need coordination: deploying renderer changes before the new content exists intentionally yields neutral pricing. Do not call that a finished production migration. Record exact deployed code revision, published and draft IDs/revisions, backup locations, approvals and a recovery owner.

The signed revalidation endpoint now accepts `pricingPage`; pricing offers and service records retain broad locale-layout invalidation so references refresh across pricing and service paths. Inspect the real Sanity webhook filter/projection/delivery settings read-only, then authorize any needed webhook change separately. A route allowlist change does not prove a production webhook will send new document types. Never widen webhook access or disable HMAC, rate, replay or draft/version checks.

## Rollback safeguards

1. Pause further content/release operations and record the failing code/content versions. Use the actual hosting rollback mechanism only after separate release authorization; do not assume a deployment tool or revision.
2. Re-inventory current published/draft records and revisions. Compare each manifest field against the post-migration version. If an editor changed a document in the meantime, stop whole-document restore and reconcile only migration-owned fields with that editor's changes.
3. Restore a compatible pair of code and approved content from complete original backups. Use explicit project/dataset targeting, another private backup of the current state and revision-conditional patches. Preserve original drafts and their distinct state. Restoration does not authorize publication of an old draft.
4. Do not delete existing documents or newly created records automatically. Detach only migration-owned references after checking incoming references and intervening edits. Archive/retain records pending a separately approved cleanup decision.
5. Revalidate authorized caches and recheck all changed EN/ES routes, federal-plus-Utah limits, both credit rules, price qualifiers/cadence, final CTA, FAQ/JSON-LD, existing redirects, books/forms and assessment/intake separation. Keep neutral pricing if a trustworthy shared reference cannot be restored.
6. Record what was restored, new revisions, outstanding editor conflicts and all unrun checks. A successful transaction or deployment rollback does not establish rendered parity.

No full draft-inclusive backups, content mutation, webhook change, production release or rollback were performed. Production readiness remains pending commercial sign-off and separately authorized migration/release verification.
