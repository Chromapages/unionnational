import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { NextRequest } from "next/server";

// ─── Mock env ───────────────────────────────────────────────────────────────

vi.mock("@/lib/config/env", () => ({
    getEnv: (key: string) => {
        const env: Record<string, string | undefined> = {
            GHL_WEBHOOK_URL: "https://ghl.example.com/webhook",
            GHL_SCORP_ESTIMATOR_WEBHOOK_URL: "https://ghl.example.com/scorp-webhook",
        };
        return env[key];
    },
}));

// ─── Mock observability ─────────────────────────────────────────────────────

vi.mock("@/lib/observability/api-handler", () => ({
    createApiHandler: () => ({
        log: { info: vi.fn(), warn: vi.fn(), error: vi.fn() },
        json: (body: unknown, opts?: { status?: number; headers?: Record<string, string> }) =>
            new Response(JSON.stringify(body), { status: opts?.status ?? 200 }),
        rateLimitHeaders: () => ({}),
        traceId: "test-trace-id",
    }),
    getClientIp: () => "127.0.0.1",
    parseJsonBody: async (req: Request) => {
        try {
            const data = await req.json();
            return { data, error: null };
        } catch {
            return { data: null, error: new Response(JSON.stringify({ error: "Bad JSON" }), { status: 400 }) };
        }
    },
    logRedacted: vi.fn(),
}));

vi.mock("@/lib/observability/request-metrics", () => ({
    incrementCounter: vi.fn(),
    withLatencyAsync: async (label: string, fn: () => unknown) => fn(),
}));

vi.mock("@/lib/observability/logger", () => ({
    logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn() },
    getTraceId: () => "test-trace-id",
}));

// ─── Mock GHL forwarding (re-fetchable per test) ─────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let fetchMock: any;

beforeEach(() => {
    fetchMock = vi.fn();
    globalThis.fetch = fetchMock;
});

afterEach(() => {
    vi.restoreAllMocks();
});

// ─── Helpers ────────────────────────────────────────────────────────────────

function buildIntakeRequest(body: unknown): Request {
    return new Request("https://example.com/api/ghl-intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });
}

function minimalPayload(): Record<string, unknown> {
    return {
        version: "1.0",
        eventType: "SCORP_ESTIMATOR_SUBMITTED",
        sourcePage: "scorp-estimator",
        leadMagnetType: "SCORP_ESTIMATOR",
        contact: {
            firstName: "Jane",
            lastName: "Doe",
            email: "jane@example.com",
            phone: "+15125551234",
        },
        business: {
            businessName: "Jane's Consulting LLC",
            entityType: "LLC",
            annualRevenueBand: "500K_1M",
        },
        intent: {
            primaryServiceInterest: "SCORP_STRATEGY",
            consultationType: "SCORP_REVIEW",
            urgencyLevel: "HIGH",
        },
        results: {
            fitScore: 85,
            scorpEstimatedSavings: 25000,
            highIntentFlag: true,
        },
        tracking: {
            utmSource: "google",
            utmMedium: "cpc",
        },
    };
}

describe("POST /api/ghl-intake", () => {
    it("returns 200 and forwards valid payload to GHL webhook", async () => {
        fetchMock.mockResolvedValueOnce(new Response(JSON.stringify({ success: true }), { status: 200 }));

        const req = buildIntakeRequest(minimalPayload());
        const { POST } = await import("@/app/api/ghl-intake/route");
        const res = await POST(req as unknown as NextRequest);

        expect(res.status).toBe(200);
        const body = await res.json();
        expect(body.success).toBe(true);

        // Verify GHL was called with correct structure
        const [, options] = fetchMock.mock.calls[0] as [string, RequestInit];
        const sent = JSON.parse(options.body as string);
        expect(sent.contact.email).toBe("jane@example.com");
        expect(sent.eventType).toBe("SCORP_ESTIMATOR_SUBMITTED");
    });

    it("returns 400 when contact.email is missing", async () => {
        const payload = minimalPayload();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        delete (payload.contact as any).email;

        const req = buildIntakeRequest(payload);
        const { POST } = await import("@/app/api/ghl-intake/route");
        const res = await POST(req as unknown as NextRequest);

        expect(res.status).toBe(400);
        const body = await res.json();
        expect(body.success).toBe(false);
        expect(body.error).toBe("Validation failed");
    });

    it("returns 400 when firstName is missing", async () => {
        const payload = minimalPayload();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        delete (payload.contact as any).firstName;

        const req = buildIntakeRequest(payload);
        const { POST } = await import("@/app/api/ghl-intake/route");
        const res = await POST(req as unknown as NextRequest);

        expect(res.status).toBe(400);
        const body = await res.json();
        expect(body.success).toBe(false);
        expect(body.details.some((d: { path: string }) => d.path === "contact.firstName")).toBe(true);
    });

    it("returns 400 for invalid email format", async () => {
        const payload = minimalPayload();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (payload.contact as any).email = "not-an-email";

        const req = buildIntakeRequest(payload);
        const { POST } = await import("@/app/api/ghl-intake/route");
        const res = await POST(req as unknown as NextRequest);

        expect(res.status).toBe(400);
    });

    it("returns 400 when eventType is empty", async () => {
        const payload = minimalPayload();
        payload.eventType = "";

        const req = buildIntakeRequest(payload);
        const { POST } = await import("@/app/api/ghl-intake/route");
        const res = await POST(req as unknown as NextRequest);

        expect(res.status).toBe(400);
    });

    it("returns 400 for invalid annualRevenueBand enum", async () => {
        const payload = minimalPayload();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (payload.business as any).annualRevenueBand = "INVALID_RANGE";

        const req = buildIntakeRequest(payload);
        const { POST } = await import("@/app/api/ghl-intake/route");
        const res = await POST(req as unknown as NextRequest);

        expect(res.status).toBe(400);
        const body = await res.json();
        expect(body.details.some((d: { path: string }) => d.path.includes("annualRevenueBand"))).toBe(true);
    });

    it("returns 200 for valid payload with invalid nested field", async () => {
        const payload = minimalPayload();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (payload.results as any).fitScore = 200; // invalid, max is 100

        const req = buildIntakeRequest(payload);
        const { POST } = await import("@/app/api/ghl-intake/route");
        const res = await POST(req as unknown as NextRequest);

        expect(res.status).toBe(400);
        const body = await res.json();
        expect(body.details.some((d: { path: string }) => d.path === "results.fitScore")).toBe(true);
    });

    it("returns 200 without calling GHL when honeypot field is present", async () => {
        const payload = { ...minimalPayload(), _hpt: "bot@example.com" };

        const req = buildIntakeRequest(payload);
        const { POST } = await import("@/app/api/ghl-intake/route");
        const res = await POST(req as unknown as NextRequest);

        expect(res.status).toBe(200);
        const body = await res.json();
        expect(body.success).toBe(true);
        // GHL should not be called
        expect(fetchMock).not.toHaveBeenCalled();
    });

    it("returns 200 for whitespace-only honeypot", async () => {
        const payload = { ...minimalPayload(), _hpt: "   " };

        const req = buildIntakeRequest(payload);
        const { POST } = await import("@/app/api/ghl-intake/route");
        const res = await POST(req as unknown as NextRequest);

        expect(res.status).toBe(200);
    });

    it("returns 200 for empty string honeypot", async () => {
        const payload = { ...minimalPayload(), _hpt: "" };

        const req = buildIntakeRequest(payload);
        const { POST } = await import("@/app/api/ghl-intake/route");
        const res = await POST(req as unknown as NextRequest);

        expect(res.status).toBe(200);
    });

    it("returns 200 but still calls GHL webhook when GHL returns 503", async () => {
        fetchMock.mockResolvedValueOnce(new Response("Service Unavailable", { status: 503 }));

        const req = buildIntakeRequest(minimalPayload());
        const { POST } = await import("@/app/api/ghl-intake/route");
        const res = await POST(req as unknown as NextRequest);

        expect(res.status).toBe(502);
        const body = await res.json();
        expect(body.error).toBe("CRM forwarding failed");
    });

    it("returns 502 when GHL network error occurs", async () => {
        fetchMock.mockRejectedValueOnce(new Error("Network failure"));

        const req = buildIntakeRequest(minimalPayload());
        const { POST } = await import("@/app/api/ghl-intake/route");
        const res = await POST(req as unknown as NextRequest);

        expect(res.status).toBe(502);
        const body = await res.json();
        expect(body.error).toBe("CRM forwarding failed");
    });

    it("normalizes 10-digit US phone numbers to E.164 format", async () => {
        fetchMock.mockResolvedValueOnce(new Response(JSON.stringify({ success: true }), { status: 200 }));

        const payload = minimalPayload();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (payload.contact as any).phone = "5125551234";

        const req = buildIntakeRequest(payload);
        const { POST } = await import("@/app/api/ghl-intake/route");
        await POST(req as unknown as NextRequest);

        const [, options] = fetchMock.mock.calls[0] as [string, RequestInit];
        const sent = JSON.parse(options.body as string);
        expect(sent.contact.phone).toBe("+15125551234");
    });

    it("normalizes 11-digit phone starting with 1 to E.164 format", async () => {
        fetchMock.mockResolvedValueOnce(new Response(JSON.stringify({ success: true }), { status: 200 }));

        const payload = minimalPayload();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (payload.contact as any).phone = "15125551234";

        const req = buildIntakeRequest(payload);
        const { POST } = await import("@/app/api/ghl-intake/route");
        await POST(req as unknown as NextRequest);

        const [, options] = fetchMock.mock.calls[0] as [string, RequestInit];
        const sent = JSON.parse(options.body as string);
        expect(sent.contact.phone).toBe("+15125551234");
    });

    it("preserves E.164 phone numbers that already have + prefix", async () => {
        fetchMock.mockResolvedValueOnce(new Response(JSON.stringify({ success: true }), { status: 200 }));

        const payload = minimalPayload();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (payload.contact as any).phone = "+442071234567";

        const req = buildIntakeRequest(payload);
        const { POST } = await import("@/app/api/ghl-intake/route");
        await POST(req as unknown as NextRequest);

        const [, options] = fetchMock.mock.calls[0] as [string, RequestInit];
        const sent = JSON.parse(options.body as string);
        expect(sent.contact.phone).toBe("+442071234567");
    });

    it("sends X-Trace-Id header to GHL", async () => {
        fetchMock.mockResolvedValueOnce(new Response(JSON.stringify({ success: true }), { status: 200 }));

        const req = buildIntakeRequest(minimalPayload());
        const { POST } = await import("@/app/api/ghl-intake/route");
        await POST(req as unknown as NextRequest);

        const [, options] = fetchMock.mock.calls[0] as [string, RequestInit];
        expect(options.headers).toHaveProperty("X-Trace-Id");
    });

    it("returns 200 with error message when JSON body is invalid", async () => {
        const badJson = new Request("https://example.com/api/ghl-intake", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: "{ not valid json",
        });

        const { POST } = await import("@/app/api/ghl-intake/route");
        const res = await POST(badJson as unknown as NextRequest);

        // parseJsonBody returns 400 when JSON is invalid
        expect(res.status).toBe(400);
    });
});