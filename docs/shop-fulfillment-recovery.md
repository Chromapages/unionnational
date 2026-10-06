# Shop fulfillment recovery and deployment contract

Source was hardened on October 5, 2026. Checkout returns 503 until the private operational store and authenticated receiver contract are configured and confirmed by their owners. No account settings, credentials, purchases or live fulfillment were changed during implementation. Never charge a customer again to recover fulfillment.

## Required configuration

| Setting | Required value and owner evidence |
| --- | --- |
| `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` | Existing server secrets for the same Stripe environment/account. The webhook secret also signs domain-separated order metadata and guest receipts. |
| `SANITY_PAYMENT_DATASET` | Separate private operational dataset matching `[a-z0-9_-]{1,64}`, different from the public catalog dataset. |
| `SANITY_PAYMENT_AUTH_TOKEN` | Separate service token restricted to operational order/audit records. Public catalog tokens and content editors must not mutate payment claims. |
| `SANITY_PAYMENT_PRIVATE_CONFIRMED=true` | Set only after anonymous denial and least-privilege service/editor roles are verified. The flag is an owner attestation; it cannot establish remote ACLs. |
| `SANITY_PAYMENT_MIGRATION_CONFIRMED=true` | Set only after old deterministic/legacy recovery records are safely migrated and reconciled. |
| `GHL_SHOP_PURCHASE_WEBHOOK_URL` | Approved HTTPS receiver with no credentials and only default HTTPS port. |
| `GHL_SHOP_FULFILLMENT_ALLOWED_HOSTS` | Comma-separated exact approved hostnames, without wildcard authorization. |
| `GHL_SHOP_FULFILLMENT_SECRET` | At least 32 characters, shared only with the receiver through the approved secret manager. |
| `GHL_SHOP_FULFILLMENT_CONTRACT_CONFIRMED=true` | Set only after controlled test-mode evidence proves MAC authentication, durable acknowledgement, idempotency, shipping mapping and delivery handling. Generic GHL 200 responses do not meet this contract. |

`/readyz` and shop readiness report missing/invalid gate names. CI uses synthetic configuration for shape checks and cannot certify account settings. Source adds no secret values. Configuring these gates is a required owner operation before production checkout resumes.

## Receiver contract

The sender posts exact JSON bytes over approved HTTPS, rejects redirects and bounds the request to eight seconds. Headers include `X-Idempotency-Key` equal to the verified session ID, `X-UNT-Timestamp` as Unix seconds, and `X-UNT-Signature` as lowercase hex HMAC-SHA256 over `unt-fulfillment:v1:<timestamp>:<exact body bytes>`.

The receiver must compare signatures in constant time, enforce a documented five-minute timestamp window, and durably reserve the idempotency key before delivery or external side effects. Repeated accepted keys return the original acceptance without another delivery; conflicting payloads require review. Return `X-UNT-Acknowledgement: durably-accepted-v1` with 2xx only after the order/job and key are durable. This acknowledges handoff acceptance; receiver delivery completion and alerts remain separate responsibilities. Missing acknowledgement, timeout, redirect or HTTP error is quarantined because acceptance may already have occurred.

Payload version `1` includes verified customer email/name, canonical item identities, price IDs, quantities, fulfillment flags, total in minor units, currency, session ID and `shippingDetails`. Physical recipient/address comes from Stripe `collected_information.shipping_details`; missing address line1/country is held for review. This corrects the former statement that no shipping address was forwarded. Actual receiver mapping remains an owner verification gate.

Order metadata is versioned and HMAC signed. The webhook reconciles its canonical price IDs/quantities/currency with authenticated Stripe line items before handoff. Altered, incomplete, unknown or legacy unsigned items require review. New checkout rejects price drift, inactive/recurring prices, non-USD offers and mismatched configured Stripe product IDs. The cart allows at most 99 units per canonical edition and 200 units total. Actual offer/account mapping still needs owner review.

## Private-store migration

Keep checkout closed while preparing the store. Export old `stripeWebhookIdempotency` records through an authorized process into a protected backup; preserve deterministic IDs, states, event references, attempts and timestamps. Import into the private dataset preserving uncertainty: `pending_review` stays uncertain and old `processing` claims require review. Reconcile random-ID legacy records and duplicate event references before enabling migration confirmation. Never recreate an uncertain old delivery as fresh `pending`.

Verify anonymous reads fail, content-only editors cannot create/patch/delete claims, and the service can atomically claim and record recovery audits. Retain the protected export until provider reconciliation is complete. Removing public records requires the owner's approved migration/retention procedure; the app performs no bulk account migration or deletion. The public content Studio list is not a private-store administration surface. Use the operational CLI or an approved private Studio workspace; never expose its token in the public content workspace.

## Recovery states and CLI

| Status | Meaning | Safe next step |
| --- | --- | --- |
| `processed` | Authenticated durable receiver acceptance was recorded, or an operator reconciled proven acceptance. | Replayed Stripe events repair metadata without reposting. Actual delivery completion belongs to the receiver. |
| `pending_manual` | Configuration is unavailable; no handoff was attempted. | Restore confirmed configuration and verify legacy metadata before resending. New checkout is blocked while configuration is missing. |
| `pending_review` | Delivery may have occurred, or order/shipping data is inconsistent. | Reconcile receiver and Stripe records before changing state. Replays acknowledge without reposting. |
| `processing` | A revision-guarded handler owns the order. | Allow the bounded attempt to finish. Review claims older than ten minutes; never make stale uncertainty automatically retryable. |
| `failed` | No handoff occurred before a provider-read failure, or an operator confirmed nonacceptance. | Resend the original signed event once configuration and order data are verified. |

`node scripts/shop-fulfillment-recovery.mjs --help` contacts no provider. Without arguments the CLI reads at most 100 private backlog records. `--record RECORD_ID --outcome delivered|undelivered|stale-review` previews a transition. Undelivered preview additionally requires `--receiver-confirmed-no-delivery`. No command posts fulfillment, creates checkout/charges, refunds or deletes records.

Applying a preview requires `--apply`, exact reviewed `--revision`, `--operator`, an opaque receiver-log `--evidence` reference and `SHOP_RECOVERY_ALLOW_APPLY=true` in an authorized operational environment. Delivered/undelivered reconciliation rechecks the paid bookstore session. Undelivered refuses a session already marked fulfilled and requires proven receiver nonacceptance. A revision-guarded private transaction records the state and audit together. Delivered reconciliation then repairs Stripe metadata; a separate provider failure cannot erase the durable processed state or permit a duplicate handoff. Operator/evidence flags are attestations and must be substantiated by provider records. Retain review status if acceptance is unknown.

Configure the read-only backlog report in the approved operational monitor. Alert on review/manual orders, stale processing, oldest backlog age and report saturation; monitor actual delivery jobs separately. Source changes have not installed a schedule or alert destination. A capped report must not be treated as the complete backlog.

## Guest receipts and remaining verification

Receipts require an independent signed 24-hour `__Host-` cookie for each order, with HttpOnly, Secure, SameSite=Lax, Path=/ and no Domain. Separate names preserve receipts from simultaneous checkout tabs. Subsequent checkout prunes earlier names, retaining four prior cookies plus the new one; simultaneous requests may temporarily retain additional cookies until the next cleanup. Raw Stripe session queries redirect before rendering into non-authorizing order references used in client props/cart replay guards/optional analytics. Another device or an expired/cleared cookie receives the generic missing-receipt state. Cross-device and legacy support needs authenticated customer verification. Rotating the existing webhook secret invalidates old browser proofs and metadata signatures; reconcile pending orders before rotation.

Local mocked tests prove source behavior. Private ACLs/migration, actual receiver authentication/acknowledgement/idempotency, catalog alignment, monitor installation and controlled test-mode payment/delivery remain owner gates. Passing tests or setting flags does not close those gates.
