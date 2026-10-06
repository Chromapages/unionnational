import { afterEach, describe, expect, it, vi } from "vitest";
import { checkRateLimit, contactRateLimitKey, getClientIdentifier } from "./rate-limiter";

const mocks = vi.hoisted(() => ({
  env: {} as Record<string, string>,
  limit: vi.fn(),
  construct: vi.fn(),
}));
vi.mock("../config/env", () => ({ getEnv: (key: string) => mocks.env[key] }));
vi.mock("@upstash/redis", () => ({ Redis: class {} }));
vi.mock("@upstash/ratelimit", () => ({
  Ratelimit: class {
    static fixedWindow() { return "test-policy"; }
    constructor(options: unknown) { mocks.construct(options); }
    limit = mocks.limit;
  },
}));

afterEach(() => {
  mocks.env = {};
  mocks.limit.mockReset();
  mocks.construct.mockReset();
  vi.useRealTimers();
});

describe("contact quotas", () => {
  it("keeps independent limits without storing raw email identifiers", async () => {
    const suffix = crypto.randomUUID();
    const first = contactRateLimitKey(` First-${suffix}@example.test `);
    const second = contactRateLimitKey(`second-${suffix}@example.test`);
    expect(first).toBe(contactRateLimitKey(`first-${suffix}@EXAMPLE.TEST`));
    expect(first).not.toContain("example.test");
    expect(first).not.toBe(second);

    expect((await checkRateLimit(first, 2, 60_000)).success).toBe(true);
    expect((await checkRateLimit(first, 2, 60_000)).success).toBe(true);
    expect((await checkRateLimit(first, 2, 60_000)).success).toBe(false);
    expect((await checkRateLimit(second, 2, 60_000)).success).toBe(true);
  });
});

describe("bounded in-memory quotas", () => {
  it("reports actual remaining counts and resets at the expiry boundary", async () => {
    vi.resetModules();
    vi.useFakeTimers();
    vi.setSystemTime(1000);
    const { checkRateLimit: check } = await import("./rate-limiter");
    expect(await check("counter", 2, 1000)).toEqual({ success: true, remaining: 1, resetTime: 2000 });
    expect(await check("counter", 2, 1000)).toEqual({ success: true, remaining: 0, resetTime: 2000 });
    expect(await check("counter", 2, 1000)).toEqual({ success: false, remaining: 0, resetTime: 2000 });
    vi.setSystemTime(2000);
    expect(await check("counter", 2, 1000)).toEqual({ success: true, remaining: 1, resetTime: 3000 });
  });

  it("fails closed at capacity, keeps live quotas, and reclaims expired unique keys", async () => {
    vi.resetModules();
    vi.useFakeTimers();
    vi.setSystemTime(1000);
    const { checkRateLimit: check, MAX_IN_MEMORY_RATE_LIMIT_ENTRIES: capacity } = await import("./rate-limiter");
    for (let index = 0; index < capacity; index++) await check(`key-${index}`, 2, 60_000);
    expect(await check("overflow", 2, 60_000)).toMatchObject({ success: false, remaining: 0 });
    expect((await check("key-0", 2, 60_000)).success).toBe(true);
    expect((await check("key-0", 2, 60_000)).success).toBe(false);
    vi.setSystemTime(61_000);
    expect(await check("replacement", 2, 60_000)).toMatchObject({ success: true, remaining: 1 });
  });

  it("retains independent window policies for the same identifier", async () => {
    vi.resetModules();
    const { checkRateLimit: check } = await import("./rate-limiter");
    expect((await check("policies", 1, 60_000)).success).toBe(true);
    expect((await check("policies", 1, 60_000)).success).toBe(false);
    expect(await check("policies", 2, 60_000)).toMatchObject({ success: true, remaining: 1 });
  });

  it("returns the actual Redis remaining value without issuing a network request", async () => {
    vi.resetModules();
    mocks.env = { UPSTASH_REDIS_REST_URL: "https://redis.example.test", UPSTASH_REDIS_REST_TOKEN: "test-only", ENABLE_UPSTASH: "true" };
    mocks.limit.mockResolvedValue({ success: true, remaining: 7, reset: 12345 });
    const { checkRateLimit: check } = await import("./rate-limiter");
    expect(await check("redis", 10, 60_000)).toEqual({ success: true, remaining: 7, resetTime: 12345 });
  });

  it("rejects the SDK allow-on-timeout result instead of permitting provider work", async () => {
    vi.resetModules();
    mocks.env = { UPSTASH_REDIS_REST_URL: "https://redis.example.test", UPSTASH_REDIS_REST_TOKEN: "test-only", ENABLE_UPSTASH: "true" };
    mocks.limit.mockResolvedValue({ success: true, remaining: 10, reset: 12345, reason: "timeout" });
    const { checkRateLimit: check } = await import("./rate-limiter");
    await expect(check("synthetic", 10, 60_000)).rejects.toThrow("unavailable");
  });

  it("keeps bounded defaults when environment quota values are malformed", async () => {
    vi.resetModules();
    mocks.env = { RL_MAX: "0", RL_WINDOW: "invalid" };
    const { checkRateLimit: check } = await import("./rate-limiter");
    expect(await check("invalid-config")).toMatchObject({ success: true, remaining: 9 });
    for (let index = 1; index < 10; index++) expect((await check("invalid-config")).success).toBe(true);
    expect((await check("invalid-config")).success).toBe(false);
  });

  it("reuses a shared Redis policy while asking storage for each request outcome", async () => {
    vi.resetModules();
    mocks.env = { UPSTASH_REDIS_REST_URL: "https://redis.example.test", UPSTASH_REDIS_REST_TOKEN: "test-only", ENABLE_UPSTASH: "true" };
    mocks.limit.mockResolvedValueOnce({ success: true, remaining: 2, reset: 12345 }).mockResolvedValueOnce({ success: true, remaining: 1, reset: 12345 });
    const { checkRateLimit: check } = await import("./rate-limiter");
    expect(await check("synthetic-policy", 3, 60_000)).toMatchObject({ remaining: 2 });
    expect(await check("synthetic-policy", 3, 60_000)).toMatchObject({ remaining: 1 });
    expect(mocks.construct).toHaveBeenCalledOnce(); expect(mocks.limit).toHaveBeenCalledTimes(2);
  });
});

describe("requester syntax", () => {
  it.each(["203.0.113.9", "2001:db8::1", "::ffff:192.0.2.1"])("accepts the existing first forwarded IP position %s", (ip) => {
    expect(getClientIdentifier(new Request("https://example.test", { headers: { "x-forwarded-for": `${ip}, 192.0.2.2` } }))).toBe(ip);
  });
  it.each(["arbitrary-key", "999.1.1.1", "192.0.2.1:443", "[2001:db8::1]", ", 192.0.2.2"])("fails conservatively for an invalid forwarded candidate %s", (candidate) => {
    expect(getClientIdentifier(new Request("https://example.test", { headers: { "x-forwarded-for": candidate, "x-real-ip": "192.0.2.2" } }))).toBe("anonymous");
  });
  it("validates real-IP only when the forwarded header is absent", () => {
    expect(getClientIdentifier(new Request("https://example.test", { headers: { "x-real-ip": "192.0.2.3" } }))).toBe("192.0.2.3");
    expect(getClientIdentifier(new Request("https://example.test", { headers: { "x-real-ip": "not-an-IP" } }))).toBe("anonymous");
  });
});
