import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

// Mock getStripe
const mockStripeWebhookConstructEvent = vi.fn();
const mockStripeCheckoutSessionsUpdate = vi.fn();

vi.mock("@/lib/stripe", () => ({
    getStripe: () => ({
        webhooks: { constructEvent: mockStripeWebhookConstructEvent },
        checkout: {
            sessions: { update: mockStripeCheckoutSessionsUpdate },
        },
    }),
}));

vi.mock("@/lib/config/env", () => ({
    getEnv: (key: string) => {
        const env: Record<string, string> = {
            STRIPE_WEBHOOK_SECRET: "whsec_test_secret",
            GHL_SHOP_PURCHASE_WEBHOOK_URL: "https://ghl.example.com/shop-webhook",
        };
        return env[key];
    },
}));

vi.mock("@/lib/observability/api-handler", () => ({
    createApiHandler: () => ({
        log: { info: vi.fn(), warn: vi.fn(), error: vi.fn() },
        json: (body: unknown, opts?: { status?: number }) =>
            new Response(JSON.stringify(body), { status: opts?.status ?? 200 }),
        jsonError: (message: string, status: number) =>
            new Response(JSON.stringify({ error: message }), { status }),
        rateLimitHeaders: () => ({}),
        traceId: "test-trace-id",
    }),
    getClientIp: () => "127.0.0.1",
}));

vi.mock("@/lib/observability/request-metrics", () => ({
    incrementCounter: vi.fn(),
    withLatencyAsync: async (label: string, fn: () => unknown) => fn(),
}));

vi.mock("@/lib/observability/logger", () => ({
    logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn() },
    getTraceId: () => "test-trace-id",
}));

vi.mock("@/sanity/lib/client", () => ({
    client: { fetch: vi.fn() },
    writeClient: {
        fetch: vi.fn().mockResolvedValue(null),
        create: vi.fn().mockResolvedValue({}),
    },
}));

// ─── Fixtures ───────────────────────────────────────────────────────────────

function buildWebhookRequest(body: string, headers: Record<string, string> = {}): Request {
    return new Request("https://example.com/api/shop/webhook", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "stripe-signature": "t=12345,v1=abc_signature",
            ...headers,
        },
        body,
    });
}

const minimalSessionEvent = {
    id: "evt_test123",
    type: "checkout.session.completed",
    data: {
        object: {
            id: "cs_test123",
            amount_total: 4900,
            currency: "usd",
            metadata: {
                items: JSON.stringify([{ p: "prod-1", s: "test-product", sh: false, t: "digital", q: 1 }]),
                fulfillment_status: "pending",
                has_physical: "false",
                has_digital: "true",
                item_count: "1",
            },
            customer_details: {
                email: "test@example.com",
                name: "Test User",
            },
        },
    },
};

const physicalSessionEvent = {
    ...minimalSessionEvent,
    data: {
        object: {
            ...minimalSessionEvent.data.object,
            id: "cs_test_physical",
            amount_total: 7900,
            metadata: {
                ...minimalSessionEvent.data.object.metadata,
                fulfillment_status: "pending",
                has_physical: "true",
                has_digital: "false",
            },
        },
    },
};

// ─── Tests ──────────────────────────────────────────────────────────────────

describe("POST /api/shop/webhook", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockStripeWebhookConstructEvent.mockReset();
        mockStripeCheckoutSessionsUpdate.mockReset();
    });

    it("returns 200 with received:true when Stripe signature is valid and event is processed", async () => {
        mockStripeWebhookConstructEvent.mockReturnValue(minimalSessionEvent);

        // Mock GHL webhook fetch inside fulfillOrder
        global.fetch = vi.fn().mockResolvedValueOnce(
            new Response(JSON.stringify({ ok: true }), { status: 200 })
        );

        const req = buildWebhookRequest(JSON.stringify(minimalSessionEvent));

        const { POST } = await import("@/app/api/shop/webhook/route");
        const res = await POST(req as unknown as NextRequest);

        expect(res.status).toBe(200);
        const body = await res.json();
        expect(body.received).toBe(true);
    });

    it("returns 400 when Stripe signature header is missing", async () => {
        const req = new Request("https://example.com/api/shop/webhook", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(minimalSessionEvent),
        });

        const { POST } = await import("@/app/api/shop/webhook/route");
        const res = await POST(req as unknown as NextRequest);

        expect(res.status).toBe(400);
        const body = await res.json();
        expect(body.error).toContain("signature");
    });

    it("returns 400 when Stripe signature is invalid", async () => {
        mockStripeWebhookConstructEvent.mockImplementation(() => {
            throw new Error("Invalid signature");
        });

        const req = buildWebhookRequest(JSON.stringify(minimalSessionEvent));

        const { POST } = await import("@/app/api/shop/webhook/route");
        const res = await POST(req as unknown as NextRequest);

        expect(res.status).toBe(400);
        const body = await res.json();
        expect(body.error).toContain("Invalid signature");
    });

    it("returns 200 with idempotent:true when event was already processed (idempotency)", async () => {
        mockStripeWebhookConstructEvent.mockReturnValue(minimalSessionEvent);

        // Simulate an already-processed event
        const { writeClient } = await import("@/sanity/lib/client");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
vi.mocked(writeClient.fetch).mockImplementation(() => Promise.resolve({ _id: "existing-id", status: "processed" }) as any);

        const req = buildWebhookRequest(JSON.stringify(minimalSessionEvent));

        const { POST } = await import("@/app/api/shop/webhook/route");
        const res = await POST(req as unknown as NextRequest);

        expect(res.status).toBe(200);
        const body = await res.json();
        expect(body.idempotent).toBe(true);
        // Fulfillment should not have been called
        expect(mockStripeCheckoutSessionsUpdate).not.toHaveBeenCalled();
    });

    it("marks fulfillment_status as processing, then fulfilled when GHL succeeds", async () => {
        mockStripeWebhookConstructEvent.mockReturnValue(minimalSessionEvent);

        global.fetch = vi.fn().mockResolvedValueOnce(
            new Response(JSON.stringify({ ok: true }), { status: 200 })
        );

        const req = buildWebhookRequest(JSON.stringify(minimalSessionEvent));

        const { POST } = await import("@/app/api/shop/webhook/route");
        await POST(req as unknown as NextRequest);

        // Should have been called twice: once to set "processing", once to set "fulfilled"
        const updateCalls = mockStripeCheckoutSessionsUpdate.mock.calls;
        expect(updateCalls.length).toBeGreaterThanOrEqual(2);

        const lastUpdateCall = updateCalls[updateCalls.length - 1];
        const lastMetadata = lastUpdateCall[1]?.metadata;
        expect(lastMetadata?.fulfillment_status).toBe("fulfilled");
    });

    it("marks fulfillment_status as pending_manual when GHL webhook URL is not configured", async () => {
        // Override the env mock for this specific test
        vi.resetModules();
        vi.doMock("@/lib/config/env", () => ({
            getEnv: (key: string) => {
                const env: Record<string, string | undefined> = {
                    STRIPE_WEBHOOK_SECRET: "whsec_test_secret",
                    GHL_SHOP_PURCHASE_WEBHOOK_URL: undefined,
                };
                return env[key];
            },
        }));

        mockStripeWebhookConstructEvent.mockReturnValue(minimalSessionEvent);

        const req = buildWebhookRequest(JSON.stringify(minimalSessionEvent));

        const { POST } = await import("@/app/api/shop/webhook/route");
        await POST(req as unknown as NextRequest);

        // Check that the session was updated with pending_manual status
        const updateCalls = mockStripeCheckoutSessionsUpdate.mock.calls;
        const pendingManualCall = updateCalls[updateCalls.length - 1];
        const metadata = pendingManualCall[1]?.metadata;
        expect(metadata?.fulfillment_status).toBe("pending_manual");
    });

    it("sets fulfillment_status to fulfilled_at when GHL fulfillment succeeds", async () => {
        mockStripeWebhookConstructEvent.mockReturnValue(minimalSessionEvent);

        global.fetch = vi.fn().mockResolvedValueOnce(
            new Response(JSON.stringify({ ok: true }), { status: 200 })
        );

        const req = buildWebhookRequest(JSON.stringify(minimalSessionEvent));

        const { POST } = await import("@/app/api/shop/webhook/route");
        await POST(req as unknown as NextRequest);

        const lastUpdateCall = mockStripeCheckoutSessionsUpdate.mock.calls[mockStripeCheckoutSessionsUpdate.mock.calls.length - 1];
        const metadata = lastUpdateCall[1]?.metadata;
        expect(metadata?.fulfilled_at).toBeDefined();
        expect(metadata?.fulfillment_status).toBe("fulfilled");
    });

    it("does not re-fulfill an already-fulfilled order", async () => {
        const alreadyFulfilledEvent = {
            ...minimalSessionEvent,
            data: {
                object: {
                    ...minimalSessionEvent.data.object,
                    metadata: {
                        ...minimalSessionEvent.data.object.metadata,
                        fulfillment_status: "fulfilled",
                    },
                },
            },
        };

        mockStripeWebhookConstructEvent.mockReturnValue(alreadyFulfilledEvent);

        const req = buildWebhookRequest(JSON.stringify(alreadyFulfilledEvent));

        const { POST } = await import("@/app/api/shop/webhook/route");
        await POST(req as unknown as NextRequest);

        // GHL fetch should NOT have been called
        expect(global.fetch).not.toHaveBeenCalled();
    });

    it("sends correct payload to GHL webhook including hasDigital and hasPhysical flags", async () => {
        mockStripeWebhookConstructEvent.mockReturnValue(physicalSessionEvent);

        const fetchMock = vi.fn().mockResolvedValueOnce(
            new Response(JSON.stringify({ ok: true }), { status: 200 })
        );
        global.fetch = fetchMock;

        const req = buildWebhookRequest(JSON.stringify(physicalSessionEvent));

        const { POST } = await import("@/app/api/shop/webhook/route");
        await POST(req as unknown as NextRequest);

        expect(fetchMock).toHaveBeenCalled();
        const [ghlUrl, ghlOptions] = fetchMock.mock.calls[0];
        expect(ghlUrl).toBe("https://ghl.example.com/shop-webhook");

        const ghlBody = JSON.parse(ghlOptions.body as string);
        expect(ghlBody.event).toBe("shop_purchase_completed");
        expect(ghlBody.email).toBe("test@example.com");
        expect(ghlBody.hasDigital).toBe(true);
        expect(ghlBody.hasPhysical).toBe(true);
        expect(ghlBody.total).toBe(7900);
        expect(ghlBody.currency).toBe("usd");
    });

    it("handles GHL webhook failure and still writes idempotency record", async () => {
        mockStripeWebhookConstructEvent.mockReturnValue(minimalSessionEvent);

        global.fetch = vi.fn().mockResolvedValueOnce(
            new Response(JSON.stringify({ error: "Server error" }), { status: 500 })
        );

        const req = buildWebhookRequest(JSON.stringify(minimalSessionEvent));

        const { POST } = await import("@/app/api/shop/webhook/route");
        const res = await POST(req as unknown as NextRequest);

        // The route still returns 200 even on fulfillment error (graceful degradation)
        expect(res.status).toBe(200);
        const body = await res.json();
        expect(body.received).toBe(true);

        // Idempotency record should still be written
        const { writeClient } = await import("@/sanity/lib/client");
        expect(writeClient.create).toHaveBeenCalled();
    });
});