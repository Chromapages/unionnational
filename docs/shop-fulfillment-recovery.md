# Shop fulfillment recovery

The Studio **Shop → Fulfillment Recovery** list is read-only. New records use a hash of the Stripe session ID as their document ID and retain the Stripe event ID for lookup. They do not store the raw session ID. No live order reconciliation has been verified.

| Status | Meaning | Next step |
| --- | --- | --- |
| `processed` | GHL returned 2xx and the handoff was recorded. | If Stripe metadata still says pending, resend the original event; the handler repairs metadata without reposting to GHL. |
| `pending_manual` | The GHL URL was missing; no handoff was attempted. | Restore approved configuration, then resend the original event if Stripe's automatic retry window has passed. |
| `pending_review` | Delivery may have happened despite an HTTP error, timeout, stale claim, legacy record, or invalid item data. | Reconcile before any replay. Replays are acknowledged and do not repost while this status remains. |
| `processing` | A handler owns the order. | Allow the bounded request to finish; a stale claim becomes `pending_review`. |
| `failed` | An operator has confirmed no delivery and made the record retryable. | Resend the original signed Stripe event. |

For `pending_review`, use the event ID in Studio to find the event and paid Checkout Session in Stripe. Check the GHL purchase workflow for that session ID. If GHL accepted it, do not resend fulfillment; an authorized operator must reconcile the record and Stripe metadata. If GHL confirms no delivery, an authorized operator can move the record to `failed` through an authenticated operational procedure, then resend the original Stripe event. Do not create a new Checkout Session or charge the customer again. Keep the record in `pending_review` if delivery cannot be determined.

The GHL receiver's use of `X-Idempotency-Key` and physical shipping-address contract are unconfirmed. The current handoff includes the session ID and `hasPhysical` flag, but no shipping address. Confirm those contracts before claiming exactly-once delivery or production-ready physical fulfillment. No public recovery endpoint or Studio mutation action is provided.
