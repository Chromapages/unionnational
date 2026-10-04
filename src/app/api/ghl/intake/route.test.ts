import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { config } = vi.hoisted(() => ({ config: { webhookUrl: "https://crm.example.test/webhook" as string | undefined } }));

vi.mock("next/headers", () => ({ headers: async () => new Headers({ "user-agent": "test" }) }));
vi.mock("@/lib/config/env", () => ({ getEnv: () => config.webhookUrl }));
vi.mock("@/lib/observability/logger", () => ({
    getTraceId: () => "test-trace",
    logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));
vi.mock("@/lib/security/rate-limiter", () => ({
    contactRateLimitKey: (email: string) => email,
    checkRateLimit: async () => ({ success: true, resetTime: Date.now() + 60_000 }),
}));

import { POST } from "./route";

const payload = {
    event_type: "GENERAL_INQUIRY_SUBMITTED",
    contact: { first_name: "Alex", email: "alex@example.com" },
    business: { entity_type: "OTHER", annual_revenue_band: "1M_3M" },
    intent: { lead_magnet_type: "STRATEGY_INTAKE", urgency: "JUST_CURIOUS", preferred_next_step: "EMAIL_SUMMARY_REQUESTED" },
};

const request = () => new Request("http://localhost/api/ghl/intake", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
});

describe("canonical lead intake endpoint", () => {
    const fetchMock = vi.fn();

    beforeEach(() => {
        config.webhookUrl = "https://crm.example.test/webhook";
        vi.stubGlobal("fetch", fetchMock);
    });
    afterEach(() => {
        fetchMock.mockReset();
        vi.unstubAllGlobals();
    });

    it("acknowledges only after CRM accepts the canonical payload", async () => {
        fetchMock.mockResolvedValue(new Response(null, { status: 202 }));
        const response = await POST(request());
        expect(response.status).toBe(200);
        expect(await response.json()).toMatchObject({ success: true });
        const forwarded = JSON.parse(fetchMock.mock.calls[0][1].body);
        expect(forwarded.business).toMatchObject({ entity_type: "OTHER", annual_revenue_band: "1M_3M" });
        expect(forwarded.intent).toMatchObject({ urgency: "JUST_CURIOUS", preferred_next_step: "EMAIL_SUMMARY_REQUESTED" });
    });

    it("does not claim success without a configured webhook", async () => {
        config.webhookUrl = undefined;
        const response = await POST(request());
        expect(response.status).toBe(503);
        expect(await response.json()).toMatchObject({ success: false });
        expect(fetchMock).not.toHaveBeenCalled();
    });

    it.each([400, 429, 500])("does not claim success after CRM status %i", async (status) => {
        fetchMock.mockResolvedValue(new Response(null, { status }));
        const response = await POST(request());
        expect(response.status).toBe(502);
        expect(await response.json()).toMatchObject({ success: false });
    });

    it("does not claim success after a network failure", async () => {
        fetchMock.mockRejectedValue(new TypeError("network failure"));
        const response = await POST(request());
        expect(response.status).toBe(502);
        expect(await response.json()).toMatchObject({ success: false });
    });

    it("rejects malformed and oversized JSON before forwarding", async () => {
        const malformed = new Request("http://localhost/api/ghl/intake", { method: "POST", body: "{" });
        expect((await POST(malformed)).status).toBe(400);
        const large = new Request("http://localhost/api/ghl/intake", { method: "POST", body: JSON.stringify({ padding: "a".repeat(33_000) }) });
        expect((await POST(large)).status).toBe(413);
        expect(fetchMock).not.toHaveBeenCalled();
    });

    it("forwards a stable submission ID and all validated fields without a raw IP", async () => {
        fetchMock.mockResolvedValue(new Response(null, { status: 202 }));
        const submissionId = "e31f71d6-7c1a-4de1-807d-a7332927ae53";
        const lead = {
            ...payload,
            business: { ...payload.business, business_type: "Service-Based", state_location: "Colorado", revenue_range_label: "$1M-$3M" },
            answers: { books_status: "Somewhat behind", interested_in_scorp: true },
            meta: { submission_id: submissionId, source_page: "/intake", locale: "es" },
        };
        const response = await POST(new Request("http://localhost/api/ghl/intake", {
            method: "POST",
            headers: { "x-forwarded-for": "203.0.113.4", "Content-Type": "application/json" },
            body: JSON.stringify(lead),
        }));
        expect(response.status).toBe(200);
        const [, options] = fetchMock.mock.calls[0];
        const forwarded = JSON.parse(options.body);
        expect(forwarded.business).toMatchObject(lead.business);
        expect(forwarded.answers).toMatchObject(lead.answers);
        expect(forwarded.meta).toMatchObject(lead.meta);
        expect(forwarded.meta.ip_hash).toBeUndefined();
        expect(options.headers["X-Submission-Id"]).toBe(submissionId);
        expect(options.signal).toBeInstanceOf(AbortSignal);
    });

    it("returns a retryable timeout without an acknowledgement", async () => {
        fetchMock.mockRejectedValue(new DOMException("deadline", "TimeoutError"));
        const response = await POST(request());
        expect(response.status).toBe(504);
        expect(await response.json()).toMatchObject({ success: false });
    });
});
