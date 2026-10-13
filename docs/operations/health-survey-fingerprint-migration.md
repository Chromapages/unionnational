# Health assessment delivery fingerprint transition

## Current guard

The new health-check contract preserves option IDs and source path, and normalizes the known generated `customData.submitted_at` timestamp. These changes alter the hashes used for existing `lead-delivery:v1` reservations. Historical records contain hashes, not the original payloads; a fresh UUID can otherwise create a different key and bypass an old accepted/uncertain hold.

Production general health-assessment delivery therefore returns **503 before lead reservation/provider delivery** unless `HEALTH_SURVEY_FINGERPRINT_MIGRATION_CONFIRMED` is exactly `true`. Ingress rate-limit storage may run earlier. Configuration readiness also fails until confirmed. The separate CFO assessment keeps its existing delivery behavior. Local development/mocked tests can exercise the new contract without asserting production migration.

No production flag, reservation or receiver configuration has been changed. The flag is an owner attestation, not proof that migration occurred. Do not enable it solely because local tests pass.

## Required evidence before enabling

1. Identify the production store, receiver and authorized reconciliation operator without exposing credentials.
2. Establish whether any legacy general-survey reservations were persisted. A proven empty legacy population makes the migration vacuous; retain the scoped inventory evidence and timestamp. An uninspected store is unknown.
3. If records exist, preserve them and map original accepted/uncertain submissions to receiver evidence and the new canonical identity/aliases. Do not infer the identity of either legacy zero answer. Some original timestamp-bearing fingerprints cannot be reconstructed without authorized original payload or receiver evidence; keep the guard off if the mapping is incomplete.
4. Keep uncertain deliveries held. Never delete records, reset capacity accounting, generate a new UUID or authorize automatic replay to get around the hold. Follow the existing lead-reconciliation procedure using receiver evidence.
5. Verify same/new UUID and legacy/new-contract retries against those mapped holds in an authorized integration environment. Confirm every contact, answer ID/weight, locale and source is retained and no duplicate receiver submission occurs.
6. Only the authorized owner/operator can attest `HEALTH_SURVEY_FINGERPRINT_MIGRATION_CONFIRMED=true` after that evidence is reviewed. Setting this value is a separately approved production configuration change.
7. Check readiness, rejected/uncertain recovery visibility and controlled delivery acceptance after release. Real lead submission requires separate synthetic-live-test authorization.

## Mocked regression evidence

`src/lib/leads/delivery.test.ts` seeds pre-fix timestamp-bearing accepted and uncertain records plus original UUID identity records. With production migration unconfirmed, original and fresh UUIDs, through both legacy and versioned requests, are blocked; provider calls and stored records remain unchanged. Survey API and readiness tests cover absent/false/invalid attestations and a synthetic confirmed fixture. These fixtures establish the guard, not the actual production inventory or migration.

## Rollback

Keep the guard off when rolling back or when receiver evidence becomes uncertain. Revert only source/configuration changes explicitly approved for rollback. Preserve accepted/uncertain records and investigate conflicts through existing reconciliation; do not rewrite production data as a side effect of a code rollback.
