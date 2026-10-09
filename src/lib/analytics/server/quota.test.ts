import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { Redis } from "@upstash/redis";
const { limit, policies } = vi.hoisted(() => ({
    limit: vi.fn(), policies: [] as { prefix: string; analytics: boolean; timeout: number }[],
}));
vi.mock("@upstash/ratelimit", () => ({
    Ratelimit: class {
        static fixedWindow = vi.fn(() => "fixed-window");
        limit = limit;
        constructor(options: { prefix: string; analytics: boolean; timeout: number }) { policies.push(options); }
    },
}));
import { createSharedReportQuota } from "./quota";

function fixture() {
    const redis = { eval: vi.fn(async () => 1), zrem: vi.fn(async () => 1) };
    return { redis, quota: createSharedReportQuota(redis as unknown as Redis) };
}

beforeEach(() => { policies.length = 0; limit.mockReset().mockResolvedValue({ success: true }); });
afterEach(() => vi.useRealTimers());

describe("shared reporting quota never falls back to local storage", () => {
    it("hashes verified subject keys, isolates analytics quotas and disables vendor analytics", async () => {
        const { quota } = fixture();
        await quota.check("verified-oidc-subject", "123456");
        expect(limit.mock.calls[0][0]).toMatch(/^[a-f0-9]{64}$/);
        expect(limit.mock.calls[1][0]).toBe("123456");
        expect(policies.map(policy => policy.prefix)).toEqual(["unt:analytics:staff:v1", "unt:analytics:property:v1"]);
        expect(policies.every(policy => policy.analytics === false && policy.timeout === 2_000)).toBe(true);
    });

    it.each([
        { success: false }, { success: true, reason: "timeout" },
    ])("denies exceeded or timed-out shared quotas: %j", async response => {
        limit.mockResolvedValue(response);
        await expect(fixture().quota.check("verified", "123456")).rejects.toMatchObject({ code: response.reason ? "upstream_unavailable" : "quota_exceeded" });
        expect(limit).toHaveBeenCalledTimes(1);
    });

    it("never calls shared storage for absent subject or invalid property", async () => {
        const { quota, redis } = fixture();
        await expect(quota.check("", "123456")).rejects.toMatchObject({ code: "reporting_not_configured" });
        await expect(quota.acquire("123/evil")).rejects.toMatchObject({ code: "reporting_not_configured" });
        expect(limit).not.toHaveBeenCalled();
        expect(redis.eval).not.toHaveBeenCalled();
    });

    it("uses one atomic shared two-slot lease with Redis time and bounded expiry, then releases its exact member", async () => {
        const { quota, redis } = fixture();
        const release = await quota.acquire("123456");
        const [script, keys, members] = redis.eval.mock.calls[0] as unknown as [string, string[], string[]];
        expect(script).toContain("redis.call('TIME')");
        expect(script).toContain("'ZCARD', KEYS[1]) >= 2");
        expect(script).toContain("'PEXPIRE', KEYS[1], 10000");
        expect(keys).toEqual(["unt:analytics:refresh:v1:123456"]);
        await release();
        expect(redis.zrem).toHaveBeenCalledWith(keys[0], members[0]);
    });

    it("denies when shared refresh capacity is unavailable", async () => {
        const { quota, redis } = fixture();
        redis.eval.mockResolvedValue(0);
        await expect(quota.acquire("123456")).rejects.toMatchObject({ code: "quota_exceeded" });
    });

    it("bounds a stalled Redis call instead of treating it as an allowed request", async () => {
        vi.useFakeTimers();
        limit.mockImplementation(() => new Promise(() => undefined));
        const pending = expect(fixture().quota.check("verified", "123456")).rejects.toMatchObject({ code: "upstream_unavailable" });
        await vi.advanceTimersByTimeAsync(2_001);
        await pending;
    });
});
