import { afterEach, describe, expect, it, vi } from "vitest";
import { checkRateLimit, getClientIp } from "./api-handler";
import { MAX_IN_MEMORY_RATE_LIMIT_ENTRIES } from "../security/rate-limiter";

afterEach(() => vi.useRealTimers());

describe("legacy in-memory API quotas", () => {
  it("preserves counters, remaining values and the caller's store signature", () => {
    vi.useFakeTimers();
    vi.setSystemTime(1000);
    const store = new Map<string, { count: number; resetAt: number }>();
    expect(checkRateLimit("client", store, 2, 1000)).toEqual({ limited: false, remaining: 1, resetAt: 2000 });
    expect(checkRateLimit("client", store, 2, 1000)).toEqual({ limited: false, remaining: 0, resetAt: 2000 });
    expect(checkRateLimit("client", store, 2, 1000)).toEqual({ limited: true, remaining: 0, resetAt: 2000 });
    vi.setSystemTime(2000);
    expect(checkRateLimit("client", store, 2, 1000)).toEqual({ limited: false, remaining: 1, resetAt: 3000 });
  });

  it("caps new keys without evicting live quotas, then prunes expired entries", () => {
    vi.useFakeTimers();
    vi.setSystemTime(1000);
    const store = new Map<string, { count: number; resetAt: number }>();
    for (let index = 0; index < MAX_IN_MEMORY_RATE_LIMIT_ENTRIES; index++) {
      checkRateLimit(`client-${index}`, store, 1, 60_000);
    }
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
