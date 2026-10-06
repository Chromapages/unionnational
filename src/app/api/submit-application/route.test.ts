import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
// Route contract tests isolate durable dispatch; delivery concurrency/outcome tests cover the real store.
vi.mock("@/lib/leads/delivery", () => ({
    LeadDeliveryError: class extends Error {},
    deliverLead: async (payload: unknown, url: string, id?: string, trace?: string) => fetch(url, {
        method: "POST", body: JSON.stringify(payload), signal: AbortSignal.timeout(8_000),
        headers: { "Content-Type": "application/json", ...(id ? { "X-Submission-Id": id } : {}), ...(trace ? { "X-Trace-Id": trace } : {}) },
    }),
}));

const settings = vi.hoisted(() => ({
  url: "https://crm.example.test/application" as string | undefined,
  limited: false,
}));
vi.mock("@/lib/config/env", () => ({ getEnv: () => settings.url }));
vi.mock("@/lib/security/rate-limiter", () => ({
  contactRateLimitKey: (email: string) => email,
  checkRateLimit: async () => ({ success: !settings.limited, resetTime: Date.now() + 60_000 }),
}));
vi.mock("@/lib/observability/logger", () => ({
  getTraceId: () => "trace-test",
  logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

import { POST as constructionPost } from "./route";
import { POST as restaurantPost } from "../submit-restaurant-application/route";

const lead = {
  firstName: "Ava", lastName: "Rivera", email: "ava@example.test",
  phone: "5550101234", companyName: "Rivera Builders", revenue: "1M_3M",
  locale: "es", submissionId: "e31f71d6-7c1a-4de1-807d-a7332927ae53",
};

const request = (body: string) => new Request("http://localhost/api/application", {
  method: "POST", headers: { "Content-Type": "application/json" }, body,
});

for (const [name, post, source] of [
  ["construction", constructionPost, "/es/construction/apply"],
  ["restaurant", restaurantPost, "/es/restaurants/apply"],
] as const) {
  describe(`${name} application delivery`, () => {
    const fetchMock = vi.fn();
    beforeEach(() => {
      settings.url = "https://crm.example.test/application";
      settings.limited = false;
      fetchMock.mockReset();
      vi.stubGlobal("fetch", fetchMock);
    });
    afterEach(() => vi.unstubAllGlobals());

    it.each(["UNDER_100K", "100K_500K", "500K_1M", "1M_3M", "3M_5M", "5M_PLUS"])(
      "preserves the exact %s band and collected fields",
      async (revenue) => {
        fetchMock.mockResolvedValue(new Response(null, { status: 202 }));
        const response = await post(request(JSON.stringify({ ...lead, revenue })));
        expect(response.status).toBe(200);
        expect(await response.json()).toMatchObject({ success: true });
        const [, options] = fetchMock.mock.calls[0];
        expect(JSON.parse(options.body)).toMatchObject({ ...lead, revenue, annual_revenue_band: revenue, source_page: source });
        expect(options.headers["X-Submission-Id"]).toBe(lead.submissionId);
        expect(options.signal).toBeInstanceOf(AbortSignal);
      },
    );

    it("rejects invalid, malformed and oversized input", async () => {
      expect((await post(request(JSON.stringify({ ...lead, email: "bad" })))).status).toBe(400);
      expect((await post(request("{"))).status).toBe(400);
      expect((await post(request(JSON.stringify({ padding: "x".repeat(33_000) })))).status).toBe(413);
      expect(fetchMock).not.toHaveBeenCalled();
    });

    it("fails closed for missing configuration and a full quota", async () => {
      settings.url = undefined;
      expect((await post(request(JSON.stringify(lead)))).status).toBe(503);
      settings.url = "https://crm.example.test/application";
      settings.limited = true;
      expect((await post(request(JSON.stringify(lead)))).status).toBe(429);
      expect(fetchMock).not.toHaveBeenCalled();
    });

    it.each([400, 429, 500])("rejects upstream %i without a delivery acknowledgement", async (status) => {
      fetchMock.mockResolvedValue(new Response(null, { status }));
      const response = await post(request(JSON.stringify(lead)));
      expect(response.status).toBe(502);
      expect(await response.json()).toMatchObject({ success: false });
    });

    it.each([
      ["network", new TypeError("network"), 502],
      ["timeout", new DOMException("deadline", "TimeoutError"), 504],
    ])("reports %s failures as retryable", async (_name, error, status) => {
      fetchMock.mockRejectedValue(error);
      const response = await post(request(JSON.stringify(lead)));
      expect(response.status).toBe(status);
      expect(await response.json()).toMatchObject({ success: false });
    });
  });
}
