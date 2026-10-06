import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
const log = vi.hoisted(() => ({ info: vi.fn(), warn: vi.fn(), error: vi.fn(), debug: vi.fn() }));
vi.mock("./logger", async original => {
    const originalModule = await original<typeof import("./logger")>();
    return { ...originalModule, getTraceId: (headers?: Headers) => headers?.get("x-request-id") || "synthetic-generated-trace", createLogger: () => ({ withTrace: () => log }) };
});
import { createApiHandler, getClientIp, parseJsonBody, logRedacted, checkRateLimit } from "./api-handler";
import { MAX_IN_MEMORY_RATE_LIMIT_ENTRIES } from "../security/rate-limiter";
beforeEach(() => Object.values(log).forEach(mock => mock.mockClear()));
afterEach(() => vi.useRealTimers());

describe("API response and logging callbacks", () => {
    it("keeps a request trace, caller status and safe response headers", async () => {
        const request = new Request("https://app.example.test/api/lead", { headers: { "x-request-id": "synthetic-request-trace" } });
        const handler = createApiHandler(request, { module: "synthetic-api" });
        const response = handler.json({ accepted: true }, { status: 202, headers: { "Cache-Control": "private, no-store" } });
        expect(handler.traceId).toBe("synthetic-request-trace");
        expect(response.status).toBe(202); expect(response.headers.get("Cache-Control")).toBe("private, no-store");
        expect(await response.json()).toEqual({ accepted: true });
    });

    it("keeps exception details in server logging while returning only an approved public error", async () => {
        const handler = createApiHandler(new Request("https://app.example.test/api/lead"), { module: "synthetic-api" });
        const fault = new Error("synthetic confidential provider detail");
        handler.error("Synthetic provider failed", fault, { reason: "network" });
        expect(log.error).toHaveBeenCalledWith("Synthetic provider failed", fault, { reason: "network" });
        const response = handler.jsonError("Service temporarily unavailable", 503);
        expect(response.status).toBe(503);
        expect(await response.json()).toEqual({ success: false, error: "Service temporarily unavailable" });
        expect(await handler.jsonError("Synthetic unexpected failure").json()).not.toHaveProperty("stack");
    });

    it("emits a bounded Retry-After only for a future quota reset", () => {
        vi.useFakeTimers(); vi.setSystemTime(100_000);
        const handler = createApiHandler(new Request("https://app.example.test/api/lead"), { module: "synthetic-api" });
        expect(handler.rateLimitHeaders(2, 101_500)).toEqual({ "X-RateLimit-Remaining": "2", "X-RateLimit-Reset": "102", "Retry-After": "2" });
        expect(handler.rateLimitHeaders(0, 99_000)).not.toHaveProperty("Retry-After");
    });

    it("rejects arbitrary requester header text while retaining syntactically valid addresses", () => {
        expect(getClientIp(new Request("https://app.example.test", { headers: { "x-forwarded-for": "untrusted arbitrary key" } }))).toBe("unknown");
        expect(getClientIp(new Request("https://app.example.test", { headers: { "x-real-ip": "192.0.2.8" } }))).toBe("192.0.2.8");
    });

    it("contains malformed JSON without returning source bytes", async () => {
        const valid = new Request("https://app.example.test/api/lead", { method: "POST", body: '{"locale":"es"}' });
        expect(await parseJsonBody(valid, log)).toMatchObject({ data: { locale: "es" }, raw: { locale: "es" }, error: null });
        const invalid = await parseJsonBody(new Request("https://app.example.test/api/lead", { method: "POST", body: "synthetic invalid payload" }), log);
        expect(invalid.data).toBeNull(); expect(invalid.raw).toBeNull();
        expect(invalid.error?.status).toBe(400);
        expect(await invalid.error?.json()).toEqual({ success: false, error: "Invalid JSON body" });
        expect(log.warn).toHaveBeenCalledWith("Invalid JSON body received");
    });

    it("applies a caller's additional private-field policy without losing harmless context", () => {
        logRedacted(log, "Synthetic intake event", { email: "synthetic@audit.example.test", privateHint: "synthetic private text", locale: "es" }, ["hint", "unmatched"]);
        expect(log.info).toHaveBeenCalledWith("Synthetic intake event", expect.objectContaining({ privateHint: "[REDACTED_FIELD]", locale: "es" }));
        expect(JSON.stringify(log.info.mock.calls)).not.toContain("synthetic@audit.example.test");
        logRedacted(log, "Synthetic diagnostic event", { harmlessCount: 2 });
        expect(log.info).toHaveBeenLastCalledWith("Synthetic diagnostic event", { harmlessCount: 2 });
    });
});

describe("legacy in-memory API quotas", () => {
    it("preserves counters, remaining values and the caller's store signature", () => {
        vi.useFakeTimers(); vi.setSystemTime(1000);
        const store = new Map<string, { count: number; resetAt: number }>();
        expect(checkRateLimit("client", store, 2, 1000)).toEqual({ limited: false, remaining: 1, resetAt: 2000 });
        expect(checkRateLimit("client", store, 2, 1000)).toEqual({ limited: false, remaining: 0, resetAt: 2000 });
        expect(checkRateLimit("client", store, 2, 1000)).toEqual({ limited: true, remaining: 0, resetAt: 2000 });
        vi.setSystemTime(2000);
        expect(checkRateLimit("client", store, 2, 1000)).toEqual({ limited: false, remaining: 1, resetAt: 3000 });
    });

    it("caps new keys without evicting live quotas, then prunes expired entries", () => {
        vi.useFakeTimers(); vi.setSystemTime(1000);
        const store = new Map<string, { count: number; resetAt: number }>();
        for (let index = 0; index < MAX_IN_MEMORY_RATE_LIMIT_ENTRIES; index++) checkRateLimit(`client-${index}`, store, 1, 60_000);
        expect(checkRateLimit("overflow", store, 1, 60_000)).toMatchObject({ limited: true, remaining: 0 });
        expect(store.size).toBe(MAX_IN_MEMORY_RATE_LIMIT_ENTRIES);
        expect(checkRateLimit("client-0", store, 1, 60_000).limited).toBe(true);
        vi.setSystemTime(61_000);
        expect(checkRateLimit("replacement", store, 1, 60_000).limited).toBe(false);
        expect(store.size).toBe(1);
    });

    it("does not discard prior counts when a caller changes the legacy policy", () => {
        const store = new Map<string, { count: number; resetAt: number }>();
        for (let index = 0; index < 5; index++) checkRateLimit("client", store, 5, 60_000);
        expect(checkRateLimit("client", store, 1, 60_000).limited).toBe(true);
        expect(checkRateLimit("client", store, 5, 60_000).limited).toBe(true);
    });

    it("rejects invalid IP syntax without selecting a later proxy position", () => {
        expect(getClientIp(new Request("https://example.test", { headers: { "x-forwarded-for": "invalid, 192.0.2.4" } }))).toBe("unknown");
        expect(getClientIp(new Request("https://example.test", { headers: { "x-forwarded-for": "2001:db8::1, 192.0.2.4" } }))).toBe("2001:db8::1");
        expect(getClientIp(new Request("https://example.test", { headers: { "x-real-ip": "invalid" } }))).toBe("unknown");
    });
});
