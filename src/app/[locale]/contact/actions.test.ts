import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next/headers", () => ({ headers: async () => new Headers() }));

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
    expect(mocks.rate.mock.calls.map((call) => call[0]).filter((key) => key.startsWith("hashed:"))).toEqual(["hashed:ava@example.test", "hashed:bea@example.test"]);
  });

  it("rejects oversized contact data and message before forwarding", async () => {
    const data = form();
    data.set("firstName", "X".repeat(101));
    data.set("message", "X".repeat(2_001));
    expect((await submitContactForm(null, data)).status).toBe("error");
    expect(mocks.forward).not.toHaveBeenCalled();
  });

  it("stops at unavailable ingress or contact quota without claiming delivery", async () => {
    mocks.rate.mockRejectedValueOnce(new Error("synthetic shared-store outage"));
    expect((await submitContactForm(null, form())).status).toBe("error");
    expect(mocks.forward).not.toHaveBeenCalled();
    mocks.rate.mockImplementation(async (key: string) => ({ success: !key.startsWith("hashed:"), resetTime: Date.now() + 60_000 }));
    expect((await submitContactForm(null, form())).status).toBe("error");
    expect(mocks.forward).not.toHaveBeenCalled();
  });

  it("silently accepts a bot trap without forwarding or spending a contact quota", async () => {
    const data = form(); data.set("_hpt", "synthetic-bot");
    expect(await submitContactForm(null, data)).toEqual({ status: "success" });
    expect(mocks.forward).not.toHaveBeenCalled();
    expect(mocks.rate.mock.calls.some(([key]) => String(key).startsWith("hashed:"))).toBe(false);
  });

  it("requires explicit privacy agreement and rejects uploaded message data", async () => {
    const missingConsent = form(); missingConsent.delete("privacy");
    expect((await submitContactForm(null, missingConsent)).status).toBe("error");
    const attachment = form(); attachment.set("message", new File(["synthetic content"], "synthetic.txt"));
    expect((await submitContactForm(null, attachment)).status).toBe("error");
    expect(mocks.forward).not.toHaveBeenCalled();
  });

  it("preserves a minimal English request and ignores whitespace-only honeypots", async () => {
    const data = form();
    for (const key of ["phone", "message", "locale", "submissionId"]) data.delete(key);
    data.set("goal", "tax-reduction"); data.set("_hpt", "   ");
    expect(await submitContactForm(null, data)).toEqual({ status: "success" });
    expect(mocks.forward.mock.calls[0][0]).toMatchObject({ sourcePage: "/en/contact", intent: { primaryServiceInterest: "TAX_PLANNING", message: undefined } });
    expect(mocks.forward.mock.calls[0][0].contact.phone).toBeUndefined();
    expect(mocks.forward.mock.calls[0][0].business).toBeUndefined();
  });

  it.each([["restaurants", "HOSPITALITY"], ["construction", "CONSTRUCTION"]])("preserves %s context without assigning a service", async (industry, expectedIndustry) => {
    const data = form();
    data.set("industry", industry);
    data.set("goal", "industry-inquiry");
    data.set("sourcePage", "/forged-source");
    data.set("primaryServiceInterest", "FRACTIONAL_CFO");
    expect(await submitContactForm(null, data)).toEqual({ status: "success" });
    const payload = mocks.forward.mock.calls[0][0];
    expect(payload).toMatchObject({
      sourcePage: `/es/industries/${industry}`,
      business: { industry: expectedIndustry },
      intent: { clientType: "business", message: "Please call after 2 p.m." },
      submissionId: data.get("submissionId"),
    });
    expect(payload.intent.primaryServiceInterest).toBeUndefined();
    expect(payload.contact.tags).toBeUndefined();
    expect(payload.business.annual_revenue_band).toBeUndefined();
  });

  it.each([
    ["unrecognized", "industry-inquiry"],
    ["restaurants", "partnership"],
    [undefined, "industry-inquiry"],
  ])("rejects unsupported industry/goal combinations %s / %s", async (industry, goal) => {
    const data = form();
    if (industry) data.set("industry", industry);
    data.set("goal", goal);
    expect((await submitContactForm(null, data)).status).toBe("error");
    expect(mocks.forward).not.toHaveBeenCalled();
  });

  it("contains delivery exceptions without returning provider details to the browser", async () => {
    mocks.forward.mockRejectedValue(new Error("synthetic confidential provider detail"));
    expect(await submitContactForm(null, form())).toEqual({ status: "error", message: "An unexpected error occurred." });
  });
});
