import readline from "node:readline";

const metrics = new Map();
const outcomes = new Map();
const leadCapacity = { lead_capacity_warning: 0, lead_capacity_exhausted: 0 };
const APPROVED_STATUS = new Set(["pending", "processing", "processed", "failed", "pending_manual", "pending_review"]);
let parsedLines = 0;
let ignoredLines = 0;
for await (const line of readline.createInterface({ input: process.stdin, crlfDelay: Infinity })) {
  if (line.length > 64 * 1024) { ignoredLines += 1; continue; }
  let payload;
  try { payload = JSON.parse(line); } catch { ignoredLines += 1; continue; }
  parsedLines += 1;
  if (Object.hasOwn(leadCapacity, payload.event)) leadCapacity[payload.event] += 1;
  if (payload.event === "request_metric" && /^(?:ghl_intake|shop_checkout|shop_webhook|api)_[a-z0-9_]{1,64}$/.test(payload.metric) && Number.isFinite(payload.value) && payload.value >= 0) {
    if (!metrics.has(payload.metric) && metrics.size >= 128) { ignoredLines += 1; continue; }
    const current = metrics.get(payload.metric) || { observations: 0, total: 0, maximum: 0 };
    metrics.set(payload.metric, { observations: current.observations + 1, total: current.total + payload.value, maximum: Math.max(current.maximum, payload.value) });
  }
  if (APPROVED_STATUS.has(payload.status)) outcomes.set(payload.status, (outcomes.get(payload.status) || 0) + 1);
}
// Values, request bodies, error text, URLs, session/contact IDs, and raw lines
// never leave this local aggregation path.
console.log(JSON.stringify({ event: "operational_log_summary", parsedLines, ignoredLines, metrics: Object.fromEntries(metrics), fulfillmentStatusObservations: Object.fromEntries(outcomes), leadCapacityObservations: leadCapacity }, null, 2));
