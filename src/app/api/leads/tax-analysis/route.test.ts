import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
// Route contract tests isolate durable dispatch; delivery concurrency/outcome tests cover the real store.
vi.mock("@/lib/leads/delivery", () => ({
    LeadDeliveryError: class extends Error {},
    deliverLead: async (payload: unknown, url: string, id?: string, trace?: string) => fetch(url, {
        method: "POST", body: JSON.stringify(payload), signal: AbortSignal.timeout(8_000),
        headers: { "Content-Type": "application/json", ...(id ? { "X-Submission-Id": id } : {}), ...(trace ? { "X-Trace-Id": trace } : {}) },
    }),
}));

const settings = vi.hoisted(() => ({ url: "https://crm.example.test/tax" as string | undefined, limited: false }));
vi.mock("@/lib/config/env", () => ({ getEnv: () => settings.url }));
vi.mock("@/lib/security/rate-limiter", () => ({
  contactRateLimitKey: (email: string) => email,
  checkRateLimit: async () => ({ success: !settings.limited, resetTime: Date.now() + 60_000 }),
}));
vi.mock("@/lib/observability/logger", () => ({
  getTraceId: () => "trace-test",
  logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

import { POST } from "./route";

const lead = {
  name: "Ava Rivera", email: "ava@example.test", phone: "5550101234",
  businessType: "construction", revenueRange: "$1M-$3M", source: "contractors-page", locale: "es",
  submission_id: "e31f71d6-7c1a-4de1-807d-a7332927ae53",
};
const request = (body: string) => new Request("http://localhost/api/leads/tax-analysis", { method: "POST", headers: { "Content-Type": "application/json" }, body });

describe("tax-analysis delivery", () => {
  const fetchMock = vi.fn();
  beforeEach(() => {
    settings.url = "https://crm.example.test/tax";
    settings.limited = false;
    fetchMock.mockReset();
    vi.stubGlobal("fetch", fetchMock);
  });
  afterEach(() => vi.unstubAllGlobals());

  it("preserves source and exact band after CRM acceptance", async () => {
    fetchMock.mockResolvedValue(new Response(null, { status: 202 }));
    const response = await POST(request(JSON.stringify(lead)));
    expect(response.status).toBe(200);
    const [, options] = fetchMock.mock.calls[0];
    expect(JSON.parse(options.body)).toMatchObject({
      source: lead.source, locale: "es", annual_revenue_band: "1M_3M", submission_id: lead.submission_id,
    });
    expect(options.headers["X-Submission-Id"]).toBe(lead.submission_id);
  });

  it("rejects ambiguous bands, malformed contacts and JSON, oversized input", async () => {
    expect((await POST(request(JSON.stringify({ ...lead, revenueRange: "$1M-$5M" })))).status).toBe(400);
    expect((await POST(request(JSON.stringify({ ...lead, email: "bad" })))).status).toBe(400);
    expect((await POST(request("{"))).status).toBe(400);
    expect((await POST(request(JSON.stringify({ padding: "x".repeat(33_000) })))).status).toBe(413);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("does not acknowledge missing configuration or a rate limit", async () => {
    settings.url = undefined;
    expect((await POST(request(JSON.stringify(lead)))).status).toBe(503);
    settings.url = "https://crm.example.test/tax";
    settings.limited = true;
    expect((await POST(request(JSON.stringify(lead)))).status).toBe(429);
  });

  it.each([400, 429, 500])("does not acknowledge upstream %i", async (status) => {
    fetchMock.mockResolvedValue(new Response(null, { status }));
    expect((await POST(request(JSON.stringify(lead)))).status).toBe(502);
  });

  it.each([
    [new TypeError("network"), 502],
    [new DOMException("deadline", "TimeoutError"), 504],
  ])("keeps transport failure %s retryable", async (error, status) => {
    fetchMock.mockRejectedValue(error);
    expect((await POST(request(JSON.stringify(lead)))).status).toBe(status);
  });
});
