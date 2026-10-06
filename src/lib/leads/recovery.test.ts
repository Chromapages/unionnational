import { describe, expect, it, vi } from "vitest";
import { leadRecoveryOptions, runLeadRecovery } from "../../../scripts/reconcile-lead-delivery.mjs";
import { LEAD_DELIVERY_CAS, leadRecordRevision } from "./delivery-protocol.mjs";
const receipt = "lead-delivery:v1:" + "a".repeat(64);
const record = { owner: "d3db602a-72d1-496d-9f43-c3fb3e9c03f1", payloadHash: "b".repeat(64), state: "uncertain" as const, updatedAt: "2026-10-05T00:00:00.000Z" };

describe("operator lead recovery command", () => {
    it("defaults to read-only and never displays payload data", async () => {
        const redis = { get: vi.fn().mockResolvedValue({ ...record, contact: { email: "sentinel@audit.example.test" } }), eval: vi.fn() };
        const write = vi.fn();
        await runLeadRecovery(["--receipt", receipt], { redis, write, env: { NODE_ENV: "test" } });
        expect(redis.eval).not.toHaveBeenCalled();
        expect(write).toHaveBeenCalledOnce();
        expect(String(write.mock.calls[0][0])).not.toContain("sentinel");
        expect(JSON.parse(write.mock.calls[0][0])).toMatchObject({ mode: "dry-run", state: "uncertain", revision: leadRecordRevision(record) });
    });

    it("requires operator/evidence/revision and an explicit apply environment gate", () => {
        expect(() => leadRecoveryOptions(["--receipt", receipt, "--apply"], { NODE_ENV: "test" })).toThrow();
        expect(() => leadRecoveryOptions(["--receipt", receipt, "--apply"], { NODE_ENV: "test", LEAD_RECOVERY_APPLY_APPROVED: "true" })).toThrow();
        expect(() => leadRecoveryOptions(["--receipt", "unsafe-receipt"])).toThrow();
        expect(() => leadRecoveryOptions(["--receipt", receipt, "--unknown", "value"])).toThrow();
    });

    it("uses the shared atomic recovery protocol and rejects stale or concurrent revisions", async () => {
        const redis = { get: vi.fn().mockResolvedValue(record), eval: vi.fn().mockResolvedValue(1) };
        const args = ["--receipt", receipt, "--decision", "not_delivered", "--operator", "synthetic-operator", "--evidence", "synthetic-receiver-evidence", "--revision", leadRecordRevision(record), "--apply"];
        await runLeadRecovery(args, { redis, write: vi.fn(), env: { NODE_ENV: "test", LEAD_RECOVERY_APPLY_APPROVED: "true" } });
        expect(redis.eval).toHaveBeenCalledOnce();
        expect(redis.eval.mock.calls[0][0]).toBe(LEAD_DELIVERY_CAS);
        expect(JSON.parse(redis.eval.mock.calls[0][2][3])).toMatchObject({ state: "retry_authorized", operator: "synthetic-operator" });
        redis.eval.mockReset().mockResolvedValue(0);
        await expect(runLeadRecovery(args, { redis, write: vi.fn(), env: { NODE_ENV: "test", LEAD_RECOVERY_APPLY_APPROVED: "true" } })).rejects.toThrow("concurrently");
        const stale = args.map(value => value === leadRecordRevision(record) ? "f".repeat(64) : value);
        redis.eval.mockClear();
        await expect(runLeadRecovery(stale, { redis, write: vi.fn(), env: { NODE_ENV: "test", LEAD_RECOVERY_APPLY_APPROVED: "true" } })).rejects.toThrow("revision");
        expect(redis.eval).not.toHaveBeenCalled();
    });
});
