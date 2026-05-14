import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

// ─── Mock env ───────────────────────────────────────────────────────────────

vi.mock("@/lib/config/env", () => ({
    getEnv: (key: string) => {
        const env: Record<string, string | undefined> = {
            GHL_SCORP_ESTIMATOR_WEBHOOK_URL: "https://ghl.example.com/scorp-estimator",
        };
        return env[key];
    },
}));

vi.mock("@/lib/observability/logger", () => ({
    logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn() },
    getTraceId: () => "test-trace-id",
}));

// ─── Mock GHL forwarding ────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let fetchMock: any;

beforeEach(() => {
    fetchMock = vi.fn();
    globalThis.fetch = fetchMock;
});

// ─── Helpers ────────────────────────────────────────────────────────────────

function buildEstimatorRequest(body: unknown): Request {
    return new Request("https://example.com/api/scorp-estimator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });
}

const validScorpInput = {
    full_name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "5125559876",
    business_name: "Smith Consulting LLC",
    website_url: "https://smithconsulting.com",
    entity_type: "LLC",
    niche_vertical: "CONSTRUCTION",
    state_location: "TX",
    income_subject_to_se_tax: "YES",
    annual_revenue_band: "100K_250K",
    estimated_net_profit_range: "100K_150K",
    current_payroll_status: "NOT_RUNNING_PAYROLL",
    tax_payroll_readiness: "MEDIUM",
    primary_pain_point: "OVERPAYING_TAXES",
    utm_source: "google",
    utm_medium: "cpc",
    utm_campaign: "q2-campaign",
    utm_content: "banner-ad",
    utm_term: "s-corp-calculator",
    referrer_url: "https://google.com",
};

// ─── Tests ──────────────────────────────────────────────────────────────────

describe("POST /api/scorp-estimator", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        fetchMock.mockReset();
    });

    // ── Input validation ────────────────────────────────────────────────────

    it("returns 200 with derived fields when input is valid", async () => {
        fetchMock.mockResolvedValueOnce(
            new Response(JSON.stringify({ success: true }), { status: 200 })
        );

        const req = buildEstimatorRequest(validScorpInput);

        const { POST } = await import("@/app/api/scorp-estimator/route");
        const res = await POST(req as unknown as NextRequest);

        expect(res.status).toBe(200);
        const body = await res.json();
        expect(body.success).toBe(true);
        expect(body.fit_score).toBeDefined();
        expect(body.scorp_fit_level).toBeDefined();
        expect(body.scorp_estimated_savings).toBeDefined();
        expect(body.high_intent_flag).toBeDefined();
        expect(typeof body.fit_score).toBe("number");
        expect(body.fit_score).toBeGreaterThanOrEqual(0);
        expect(body.fit_score).toBeLessThanOrEqual(100);
    });

    it("returns 400 with details when full_name is missing", async () => {
        const invalidInput = { ...validScorpInput, full_name: "" };

        const req = buildEstimatorRequest(invalidInput);

        const { POST } = await import("@/app/api/scorp-estimator/route");
        const res = await POST(req as unknown as NextRequest);

        expect(res.status).toBe(400);
        const body = await res.json();
        expect(body.success).toBe(false);
        expect(body.message).toBe("Invalid input data");
        expect(body.details).toBeDefined();
        expect(Array.isArray(body.details)).toBe(true);
    });

    it("returns 400 when email is not a valid email address", async () => {
        const invalidInput = { ...validScorpInput, email: "not-an-email" };

        const req = buildEstimatorRequest(invalidInput);

        const { POST } = await import("@/app/api/scorp-estimator/route");
        const res = await POST(req as unknown as NextRequest);

        expect(res.status).toBe(400);
    });

    it("returns 400 when phone has fewer than 10 digits", async () => {
        const invalidInput = { ...validScorpInput, phone: "12345" };

        const req = buildEstimatorRequest(invalidInput);

        const { POST } = await import("@/app/api/scorp-estimator/route");
        const res = await POST(req as unknown as NextRequest);

        expect(res.status).toBe(400);
    });

    it("returns 400 when entity_type is not a valid enum value", async () => {
        const invalidInput = { ...validScorpInput, entity_type: "NOT_A_TYPE" };

        const req = buildEstimatorRequest(invalidInput);

        const { POST } = await import("@/app/api/scorp-estimator/route");
        const res = await POST(req as unknown as NextRequest);

        expect(res.status).toBe(400);
    });

    it("returns 400 when annual_revenue_band is invalid", async () => {
        const invalidInput = { ...validScorpInput, annual_revenue_band: "INVALID" };

        const req = buildEstimatorRequest(invalidInput);

        const { POST } = await import("@/app/api/scorp-estimator/route");
        const res = await POST(req as unknown as NextRequest);

        expect(res.status).toBe(400);
    });

    it("returns 400 when required field estimated_net_profit_range is missing", async () => {
        const { estimated_net_profit_range, ...invalidInput } = { ...validScorpInput };

        const req = buildEstimatorRequest(invalidInput);

        const { POST } = await import("@/app/api/scorp-estimator/route");
        const res = await POST(req as unknown as NextRequest);

        expect(res.status).toBe(400);
        const body = await res.json();
        expect(body.success).toBe(false);
    });

    it("returns 400 with multiple validation issues listed", async () => {
        const invalidInput = {
            full_name: "",
            email: "bad-email",
            phone: "1",
            entity_type: "INVALID",
        };

        const req = buildEstimatorRequest(invalidInput);

        const { POST } = await import("@/app/api/scorp-estimator/route");
        const res = await POST(req as unknown as NextRequest);

        expect(res.status).toBe(400);
        const body = await res.json();
        expect(body.details).toBeDefined();
        expect(body.details.length).toBeGreaterThan(1);
    });

    it("accepts optional fields being omitted", async () => {
        const minimalInput = {
            full_name: "Minimal User",
            email: "minimal@example.com",
            phone: "5125551111",
            business_name: "Minimal LLC",
            entity_type: "LLC",
            niche_vertical: "CONSTRUCTION",
            income_subject_to_se_tax: "YES",
            annual_revenue_band: "100K_250K",
            estimated_net_profit_range: "50K_100K",
            current_payroll_status: "NOT_RUNNING_PAYROLL",
            tax_payroll_readiness: "LOW",
            primary_pain_point: "OVERPAYING_TAXES",
        };

        fetchMock.mockResolvedValueOnce(
            new Response(JSON.stringify({ success: true }), { status: 200 })
        );

        const req = buildEstimatorRequest(minimalInput);

        const { POST } = await import("@/app/api/scorp-estimator/route");
        const res = await POST(req as unknown as NextRequest);

        expect(res.status).toBe(200);
        const body = await res.json();
        expect(body.success).toBe(true);
    });

    // ── GHL payload mapping ──────────────────────────────────────────────────

    it("sends correct payload to GHL webhook URL", async () => {
        fetchMock.mockResolvedValueOnce(
            new Response(JSON.stringify({ success: true }), { status: 200 })
        );

        const req = buildEstimatorRequest(validScorpInput);

        const { POST } = await import("@/app/api/scorp-estimator/route");
        await POST(req as unknown as NextRequest);

        expect(fetchMock).toHaveBeenCalledTimes(1);
        const [ghlUrl, ghlOptions] = fetchMock.mock.calls[0];

        expect(ghlUrl).toBe("https://ghl.example.com/scorp-estimator");
        expect(ghlOptions.method).toBe("POST");
        expect(ghlOptions.headers["Content-Type"]).toBe("application/json");
    });

    it("maps full_name correctly to first_name and last_name in GHL payload", async () => {
        fetchMock.mockResolvedValueOnce(
            new Response(JSON.stringify({ success: true }), { status: 200 })
        );

        const req = buildEstimatorRequest(validScorpInput);

        const { POST } = await import("@/app/api/scorp-estimator/route");
        await POST(req as unknown as NextRequest);

        const [, options] = fetchMock.mock.calls[0];
        const ghlBody = JSON.parse(options.body as string);

        expect(ghlBody.first_name).toBe("Jane");
        expect(ghlBody.last_name).toBe("Smith");
    });

    it("maps entity_type, niche_vertical, and annual_revenue_band to GHL payload", async () => {
        fetchMock.mockResolvedValueOnce(
            new Response(JSON.stringify({ success: true }), { status: 200 })
        );

        const req = buildEstimatorRequest(validScorpInput);

        const { POST } = await import("@/app/api/scorp-estimator/route");
        await POST(req as unknown as NextRequest);

        const [, options] = fetchMock.mock.calls[0];
        const ghlBody = JSON.parse(options.body as string);

        expect(ghlBody.entity_type).toBe("LLC");
        expect(ghlBody.niche_vertical).toBe("CONSTRUCTION");
        expect(ghlBody.annual_revenue_band).toBe("100K_250K");
    });

    it("maps estimated_net_profit_range, current_payroll_status, and tax_payroll_readiness", async () => {
        fetchMock.mockResolvedValueOnce(
            new Response(JSON.stringify({ success: true }), { status: 200 })
        );

        const req = buildEstimatorRequest(validScorpInput);

        const { POST } = await import("@/app/api/scorp-estimator/route");
        await POST(req as unknown as NextRequest);

        const [, options] = fetchMock.mock.calls[0];
        const ghlBody = JSON.parse(options.body as string);

        expect(ghlBody.estimated_net_profit_range).toBe("100K_150K");
        expect(ghlBody.current_payroll_status).toBe("NOT_RUNNING_PAYROLL");
        expect(ghlBody.tax_payroll_readiness).toBe("MEDIUM");
    });

    it("maps income_subject_to_se_tax and primary_pain_point to GHL payload", async () => {
        fetchMock.mockResolvedValueOnce(
            new Response(JSON.stringify({ success: true }), { status: 200 })
        );

        const req = buildEstimatorRequest(validScorpInput);

        const { POST } = await import("@/app/api/scorp-estimator/route");
        await POST(req as unknown as NextRequest);

        const [, options] = fetchMock.mock.calls[0];
        const ghlBody = JSON.parse(options.body as string);

        expect(ghlBody.income_subject_to_se_tax).toBe("YES");
        expect(ghlBody.primary_pain_point).toBe("OVERPAYING_TAXES");
    });

    it("includes derived results (fit_score, scorp_fit_level, scorp_estimated_savings) in GHL payload", async () => {
        fetchMock.mockResolvedValueOnce(
            new Response(JSON.stringify({ success: true }), { status: 200 })
        );

        const req = buildEstimatorRequest(validScorpInput);

        const { POST } = await import("@/app/api/scorp-estimator/route");
        await POST(req as unknown as NextRequest);

        const [, options] = fetchMock.mock.calls[0];
        const ghlBody = JSON.parse(options.body as string);

        expect(ghlBody.fit_score).toBeDefined();
        expect(typeof ghlBody.fit_score).toBe("number");
        expect(ghlBody.scorp_fit_level).toBeDefined();
        expect(["LOW_FIT", "POSSIBLE_FIT", "STRONG_CANDIDATE", "HIGH_INTENT_SCORP"]).toContain(
            ghlBody.scorp_fit_level
        );
        expect(ghlBody.scorp_estimated_savings).toBeDefined();
        expect(typeof ghlBody.scorp_estimated_savings).toBe("string");
    });

    it("sets high_intent_flag and urgency_level based on derived logic", async () => {
        fetchMock.mockResolvedValueOnce(
            new Response(JSON.stringify({ success: true }), { status: 200 })
        );

        const req = buildEstimatorRequest(validScorpInput);

        const { POST } = await import("@/app/api/scorp-estimator/route");
        const res = await POST(req as unknown as NextRequest);

        const body = await res.json();
        const [, options] = fetchMock.mock.calls[0];
        const ghlBody = JSON.parse(options.body as string);

        // high_intent_flag should be consistent between response and GHL payload
        expect(body.high_intent_flag).toBe(ghlBody.high_intent_flag);

        // urgency_level should be HIGH when high_intent_flag is true
        expect(ghlBody.urgency_level).toBe(body.high_intent_flag ? "HIGH" : "MEDIUM");
    });

    it("maps UTM tracking fields to GHL payload", async () => {
        fetchMock.mockResolvedValueOnce(
            new Response(JSON.stringify({ success: true }), { status: 200 })
        );

        const req = buildEstimatorRequest(validScorpInput);

        const { POST } = await import("@/app/api/scorp-estimator/route");
        await POST(req as unknown as NextRequest);

        const [, options] = fetchMock.mock.calls[0];
        const ghlBody = JSON.parse(options.body as string);

        expect(ghlBody.utm_source).toBe("google");
        expect(ghlBody.utm_medium).toBe("cpc");
        expect(ghlBody.utm_campaign).toBe("q2-campaign");
        expect(ghlBody.utm_content).toBe("banner-ad");
        expect(ghlBody.utm_term).toBe("s-corp-calculator");
        expect(ghlBody.referrer_url).toBe("https://google.com");
    });

    it("omits empty optional fields from GHL payload", async () => {
        const noOptionalInput = {
            ...validScorpInput,
            utm_source: undefined,
            utm_medium: undefined,
            utm_campaign: undefined,
            utm_content: undefined,
            utm_term: undefined,
            referrer_url: undefined,
            website_url: undefined,
        };

        fetchMock.mockResolvedValueOnce(
            new Response(JSON.stringify({ success: true }), { status: 200 })
        );

        const req = buildEstimatorRequest(noOptionalInput);

        const { POST } = await import("@/app/api/scorp-estimator/route");
        await POST(req as unknown as NextRequest);

        const [, options] = fetchMock.mock.calls[0];
        const ghlBody = JSON.parse(options.body as string);

        expect(ghlBody.utm_source).toBe("");
        expect(ghlBody.utm_medium).toBe("");
        expect(ghlBody.utm_campaign).toBe("");
        expect(ghlBody.utm_content).toBe("");
        expect(ghlBody.utm_term).toBe("");
        expect(ghlBody.referrer_url).toBe("");
    });

    it("sets event_type to SCORP_ESTIMATOR_SUBMITTED in GHL payload", async () => {
        fetchMock.mockResolvedValueOnce(
            new Response(JSON.stringify({ success: true }), { status: 200 })
        );

        const req = buildEstimatorRequest(validScorpInput);

        const { POST } = await import("@/app/api/scorp-estimator/route");
        await POST(req as unknown as NextRequest);

        const [, options] = fetchMock.mock.calls[0];
        const ghlBody = JSON.parse(options.body as string);

        expect(ghlBody.event_type).toBe("SCORP_ESTIMATOR_SUBMITTED");
    });

    it("sets lead_magnet_type to SCORP_ESTIMATOR in GHL payload", async () => {
        fetchMock.mockResolvedValueOnce(
            new Response(JSON.stringify({ success: true }), { status: 200 })
        );

        const req = buildEstimatorRequest(validScorpInput);

        const { POST } = await import("@/app/api/scorp-estimator/route");
        await POST(req as unknown as NextRequest);

        const [, options] = fetchMock.mock.calls[0];
        const ghlBody = JSON.parse(options.body as string);

        expect(ghlBody.lead_magnet_type).toBe("SCORP_ESTIMATOR");
    });

    it("continues to return 200 when GHL webhook fails (graceful degradation)", async () => {
        fetchMock.mockResolvedValueOnce(
            new Response(JSON.stringify({ error: "Server error" }), { status: 500 })
        );

        const req = buildEstimatorRequest(validScorpInput);

        const { POST } = await import("@/app/api/scorp-estimator/route");
        const res = await POST(req as unknown as NextRequest);

        // Route should still return 200 for the estimator calculation itself
        expect(res.status).toBe(200);
        const body = await res.json();
        expect(body.success).toBe(true);
        expect(body.fit_score).toBeDefined();
    });

    it("returns 500 when unexpected error occurs during processing", async () => {
        // Break the module import to force an error
        vi.doMock("@/lib/scorp/calculateFitScore", () => {
            throw new Error("Module broken for testing");
        });

        const req = buildEstimatorRequest(validScorpInput);

        try {
            const { POST } = await import("@/app/api/scorp-estimator/route");
            const res = await POST(req as unknown as NextRequest);

            expect(res.status).toBe(500);
            const body = await res.json();
            expect(body.success).toBe(false);
            expect(body.message).toBe("Failed to process estimate");
        } finally {
            vi.resetModules();
        }
    });
});