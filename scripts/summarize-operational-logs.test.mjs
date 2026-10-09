import { strict as assert } from "node:assert";
import { test } from "node:test";
import { spawnSync } from "node:child_process";

test("operational summary aggregates safe counters while dropping sensitive log content", () => {
  const input = [
    JSON.stringify({ event: "request_metric", metric: "shop_checkout_session_created", kind: "counter", value: 1, email: "fixture@example.test", sessionId: "private-fixture-id" }),
    JSON.stringify({ status: "pending_manual", message: "private fixture content" }),
    JSON.stringify({ event: "lead_capacity_warning", category: "delivery", count: 8000, email: "fixture@example.test" }),
    JSON.stringify({ event: "lead_capacity_exhausted", category: "identity", limit: 10000 }),
    "invalid line",
  ].join("\n");
  const result = spawnSync(process.execPath, ["scripts/summarize-operational-logs.mjs"], { input, encoding: "utf8" });
  assert.equal(result.status, 0);
  const summary = JSON.parse(result.stdout);
  assert.equal(summary.metrics.shop_checkout_session_created.total, 1);
  assert.equal(summary.fulfillmentStatusObservations.pending_manual, 1);
  assert.equal(summary.ignoredLines, 1);
  assert.deepEqual(summary.leadCapacityObservations, { lead_capacity_warning: 1, lead_capacity_exhausted: 1 });
  assert.ok(!result.stdout.includes("fixture@example.test"));
  assert.ok(!result.stdout.includes("private-fixture-id"));
  assert.ok(!result.stdout.includes("private fixture content"));
});
test("payment monitoring defaults to a local plan and does not require credentials", () => {
  const result = spawnSync(process.execPath, ["scripts/payment-monitoring-summary.mjs"], { encoding: "utf8", env: { PATH: process.env.PATH, SystemRoot: process.env.SystemRoot } });
  assert.equal(result.status, 0);
  assert.equal(JSON.parse(result.stdout).mode, "local-query-preview");
});
