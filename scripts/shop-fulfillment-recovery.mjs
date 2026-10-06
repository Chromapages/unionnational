import { randomUUID } from "node:crypto";
import { parseArgs } from "node:util";
import { pathToFileURL } from "node:url";

export function planRecovery(record, outcome, now = Date.now(), confirmedNoDelivery = false) {
  if (!record || !/^stripeWebhookIdempotency\.[a-f0-9]{64}$/.test(record._id) || typeof record._rev !== "string") throw new Error("Invalid recovery record");
  if (outcome === "stale-review") {
    if (record.status !== "processing" || !Number.isFinite(Date.parse(record.updatedAt)) || now - Date.parse(record.updatedAt) < 600000) throw new Error("Claim is not stale");
    return { status: "pending_review", lastError: "operator_stale_review" };
  }
  if (!["pending_review", "pending_manual", "failed"].includes(record.status)) throw new Error("Record requires review before reconciliation");
  if (outcome === "delivered") return { status: "processed", processedAt: new Date(now).toISOString() };
  if (outcome === "undelivered" && confirmedNoDelivery) return { status: "failed", lastError: "operator_confirmed_no_delivery" };
  throw new Error("Uncertain delivery cannot be made retryable");
}

async function main() {
  const { values } = parseArgs({ options: {
    help: { type: "boolean" }, apply: { type: "boolean" }, record: { type: "string" }, outcome: { type: "string" },
    revision: { type: "string" }, operator: { type: "string" }, evidence: { type: "string" },
    "receiver-confirmed-no-delivery": { type: "boolean" },
  } });
  if (values.help) {
    console.log("Default: bounded private-store backlog report (read only).\nPreview: --record ID --outcome delivered|undelivered|stale-review [--receiver-confirmed-no-delivery].\nApply additionally requires --apply --revision REV --operator ID --evidence RECEIVER_LOG_REFERENCE and SHOP_RECOVERY_ALLOW_APPLY=true. Never posts fulfillment or creates a charge.");
    return;
  }
  const dataset = process.env.SANITY_PAYMENT_DATASET;
  if (!dataset || !/^[a-z0-9_-]{1,64}$/.test(dataset) || dataset === (process.env.NEXT_PUBLIC_SANITY_DATASET || "production")
    || !process.env.SANITY_PAYMENT_AUTH_TOKEN || process.env.SANITY_PAYMENT_PRIVATE_CONFIRMED !== "true" || process.env.SANITY_PAYMENT_MIGRATION_CONFIRMED !== "true") throw new Error("Verified isolated private payment storage is required");
  const { createClient } = await import("@sanity/client");
  const store = createClient({ projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "p1x9y3wz", dataset, token: process.env.SANITY_PAYMENT_AUTH_TOKEN,
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-01-09", useCdn: false, timeout: 8000, maxRetries: 0 });
  if (!values.record) {
    const records = await store.fetch('*[_type == "stripeWebhookIdempotency" && status in $states] | order(updatedAt asc)[0...100]{_id,_rev,status,updatedAt,lastError}', { states: ["pending_manual", "pending_review", "processing", "failed"] });
    console.log(JSON.stringify({ mode: "read-only", limit: 100, records }, null, 2));
    return;
  }
  if (!/^stripeWebhookIdempotency\.[a-f0-9]{64}$/.test(values.record)) throw new Error("Invalid record identifier");
  const record = await store.fetch('*[_id == $id && _type == "stripeWebhookIdempotency"][0]', { id: values.record });
  const changes = planRecovery(record, values.outcome, Date.now(), values["receiver-confirmed-no-delivery"]);
  if (!values.apply) {
    console.log(JSON.stringify({ mode: "dry-run", recordId: record._id, expectedRevision: record._rev, changes, fulfillmentRequests: 0, newCharges: 0 }, null, 2));
    return;
  }
  if (process.env.SHOP_RECOVERY_ALLOW_APPLY !== "true" || values.revision !== record._rev || !/^[A-Za-z0-9_.@-]{1,100}$/.test(values.operator || "")
    || !/^[A-Za-z0-9_:./-]{1,160}$/.test(values.evidence || "")) throw new Error("Apply requires explicit operator evidence, matching revision and the operational apply gate");
  let session;
  let stripe;
  if (values.outcome !== "stale-review") {
    if (!/^evt_[A-Za-z0-9_]{1,200}$/.test(record.stripeEventId || "") || !process.env.STRIPE_SECRET_KEY) throw new Error("Verified paid event unavailable");
    const { default: Stripe } = await import("stripe");
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2026-03-25.dahlia", timeout: 8000, maxNetworkRetries: 0 });
    const event = await stripe.events.retrieve(record.stripeEventId);
    const id = event.data.object.id;
    if (!/^cs_(?:test|live)_[A-Za-z0-9_]{1,200}$/.test(id || "")) throw new Error("Invalid checkout session");
    session = await stripe.checkout.sessions.retrieve(id);
    if (session.payment_status !== "paid" || session.metadata?.order_source !== "unt_bookstore") throw new Error("Verified paid bookstore session required");
    if (values.outcome === "undelivered" && session.metadata?.fulfillment_status === "fulfilled") throw new Error("Already recorded delivery cannot become retryable");
  }
  const timestamp = new Date().toISOString();
  const audit = { _id: `shopRecoveryAudit.${randomUUID()}`, _type: "shopRecoveryAudit", recordId: record._id, priorRevision: record._rev,
    priorStatus: record.status, outcome: values.outcome, operator: values.operator, evidence: values.evidence, updatedAt: timestamp };
  await store.transaction().patch(record._id, patch => patch.ifRevisionId(record._rev).set({ ...changes, updatedAt: timestamp })).create(audit).commit();
  if (values.outcome === "delivered") {
    // Durable processed state prevents a fulfillment replay even if this metadata repair fails.
    await stripe.checkout.sessions.update(session.id, { metadata: { fulfillment_status: "fulfilled", fulfilled_at: timestamp } });
  }
  console.log(JSON.stringify({ mode: "applied", recordId: record._id, auditId: audit._id, status: changes.status, fulfillmentRequests: 0, newCharges: 0 }));
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main().catch(() => { console.error("Recovery failed. No fulfillment or charge was requested; inspect private operational evidence before retrying."); process.exitCode = 1; });
