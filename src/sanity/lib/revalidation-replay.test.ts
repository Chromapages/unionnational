import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";

const fixture = vi.hoisted(() => ({ env: {} as Record<string, string>, eval: vi.fn() }));
vi.mock("@/lib/config/env", () => ({ getEnv: (name: string) => fixture.env[name] }));
vi.mock("@upstash/redis", () => ({ Redis: class { eval = fixture.eval; } }));

describe("CMS revalidation claims", () => {
    beforeEach(() => { vi.resetModules(); fixture.env = {}; fixture.eval.mockReset(); vi.stubEnv("NODE_ENV", "test"); });
    afterEach(() => { vi.unstubAllEnvs(); vi.useRealTimers(); });

    it("allows one owner, distinguishes pending from completed and permits retry after failure", async () => {
        const { claimRevalidation } = await import("./revalidation-replay");
        const [first, concurrent] = await Promise.all([claimRevalidation("synthetic-claim"), claimRevalidation("synthetic-claim")]);
        expect(first.state).toBe("claimed");
        expect(concurrent.state).toBe("busy");
        if (first.state !== "claimed") throw new Error("Expected first claim");
        await first.release();
        const retry = await claimRevalidation("synthetic-claim");
        if (retry.state !== "claimed") throw new Error("Expected retry claim");
        await retry.complete();
        expect((await claimRevalidation("synthetic-claim")).state).toBe("duplicate");
    });

    it("prevents an expired owner from completing or releasing a replacement claim", async () => {
        vi.useFakeTimers();
        const { claimRevalidation } = await import("./revalidation-replay");
        const first = await claimRevalidation("synthetic-expiring");
        if (first.state !== "claimed") throw new Error("Expected first claim");
        vi.advanceTimersByTime(31_000);
        const replacement = await claimRevalidation("synthetic-expiring");
        expect(replacement.state).toBe("claimed");
        await expect(first.complete()).rejects.toThrow("REVALIDATION_CLAIM_LOST");
        await first.release();
        expect((await claimRevalidation("synthetic-expiring")).state).toBe("busy");
    });

    it("fails closed in production when durable storage is absent", async () => {
        vi.stubEnv("NODE_ENV", "production");
        const { claimRevalidation } = await import("./revalidation-replay");
        await expect(claimRevalidation("synthetic-production")).rejects.toThrow("REVALIDATION_STORAGE_UNAVAILABLE");
    });

    it("uses the same Redis claim key across worker instances and completes before acknowledging", async () => {
        fixture.env = { UPSTASH_REDIS_REST_URL: "https://redis.example.test", UPSTASH_REDIS_REST_TOKEN: "synthetic-only" };
        fixture.eval.mockResolvedValueOnce("claimed").mockResolvedValueOnce("busy").mockResolvedValueOnce(1).mockResolvedValueOnce("duplicate");
        const { claimRevalidation } = await import("./revalidation-replay");
        const first = await claimRevalidation("synthetic-shared");
        expect((await claimRevalidation("synthetic-shared")).state).toBe("busy");
        if (first.state !== "claimed") throw new Error("Expected Redis claim");
        await first.complete();
        expect((await claimRevalidation("synthetic-shared")).state).toBe("duplicate");
        expect(fixture.eval.mock.calls.every(call => call[1][0] === "synthetic-shared")).toBe(true);
    });

    it("deduplicates the signed document revision while allowing a new revision", async () => {
        const { revalidationReplayKey } = await import("./revalidation-replay");
        const document = { _type: "blogPost", _id: "synthetic-id", _rev: "synthetic-rev" };
        expect(revalidationReplayKey("signature-one", "body-one", document)).toBe(revalidationReplayKey("signature-two", "body-two", document));
        expect(revalidationReplayKey("signature-one", "body-one", { ...document, _rev: "new-rev" })).not.toBe(revalidationReplayKey("signature-one", "body-one", document));
    });

    it("uses the full signed payload for legacy projections without revision identity", async () => {
        const { revalidationReplayKey } = await import("./revalidation-replay");
        const legacy = { _type: "faq" };
        expect(revalidationReplayKey("signature-one", "body", legacy)).not.toBe(revalidationReplayKey("signature-two", "body", legacy));
        expect(revalidationReplayKey("signature-one", "body", legacy)).toBe(revalidationReplayKey("signature-one", "body", legacy));
    });
});
