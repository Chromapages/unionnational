import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({ forward: vi.fn(), rate: vi.fn() }));
vi.mock("@/lib/intake/shared", () => ({
  normalizePhone: (phone: string) => phone,
  forwardToGhl: mocks.forward,
}));
vi.mock("@/lib/security/rate-limiter", () => ({
  contactRateLimitKey: (email: string) => `hashed:${email.toLowerCase()}`,
  checkRateLimit: mocks.rate,
}));
vi.mock("@/lib/observability/logger", () => ({
  logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

import { submitContactForm } from "./actions";
import { logger } from "@/lib/observability/logger";

function form(email = "ava@example.test") {
  const data = new FormData();
  for (const [key, value] of Object.entries({
    goal: "partnership", clientType: "business", firstName: "Ava", lastName: "Rivera",
    email, phone: "5550101234", message: "Please call after 2 p.m.", privacy: "true", locale: "es",
    submissionId: "e31f71d6-7c1a-4de1-807d-a7332927ae53",
  })) data.set(key, value);
  return data;
}

describe("contact form delivery", () => {
  beforeEach(() => {
    mocks.forward.mockReset().mockResolvedValue(new Response(null, { status: 202 }));
    mocks.rate.mockReset().mockResolvedValue({ success: true, resetTime: Date.now() + 60_000 });
    vi.mocked(logger.info).mockClear();
  });

  it("forwards the message, client type and Spanish source without logging the email", async () => {
    expect(await submitContactForm(null, form())).toEqual({ status: "success" });
    expect(mocks.forward.mock.calls[0][0]).toMatchObject({
      sourcePage: "/es/contact", meta: { locale: "es" },
      intent: { clientType: "business", message: "Please call after 2 p.m." },
      submissionId: "e31f71d6-7c1a-4de1-807d-a7332927ae53",
    });
    expect(JSON.stringify(vi.mocked(logger.info).mock.calls)).not.toContain("ava@example.test");
  });

  it("uses independent validated contacts for quotas and preserves failure state", async () => {
    mocks.forward.mockResolvedValue(new Response(null, { status: 500 }));
    expect((await submitContactForm(null, form("ava@example.test"))).status).toBe("error");
    expect((await submitContactForm(null, form("bea@example.test"))).status).toBe("error");
    expect(mocks.rate.mock.calls.map((call) => call[0])).toEqual(["hashed:ava@example.test", "hashed:bea@example.test"]);
  });
});
