import { describe, expect, it } from "vitest";
import { planRecovery } from "../../../scripts/shop-fulfillment-recovery.mjs";
const record = { _id: `stripeWebhookIdempotency.${"a".repeat(64)}`, _rev: "fixture-rev", status: "pending_review", updatedAt: new Date(0).toISOString() };
describe("audited recovery plans", () => {
    it("never makes ambiguous delivery retryable", () => {
        expect(() => planRecovery(record, "undelivered", 700000, false)).toThrow();
        expect(planRecovery(record, "undelivered", 700000, true)).toMatchObject({ status: "failed" });
        expect(planRecovery(record, "delivered", 700000)).toMatchObject({ status: "processed" });
        expect(() => planRecovery({ ...record, status: "processed" }, "undelivered", 700000, true)).toThrow();
    });
    it("only moves stale processing to review", () => {
        expect(planRecovery({ ...record, status: "processing" }, "stale-review", 700000)).toMatchObject({ status: "pending_review" });
        expect(() => planRecovery({ ...record, status: "processing" }, "stale-review", 1000)).toThrow();
        expect(() => planRecovery(record, "stale-review", 700000)).toThrow();
    });
});
