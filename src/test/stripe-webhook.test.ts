import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { NextRequest } from "next/server";
import { buildCheckoutItemsMetadata } from "@/lib/shop/order-metadata";
import { orderMetadataSignature } from "@/lib/shop/fulfillment";
vi.mock("@/lib/security/rate-limiter", () => ({ getClientIdentifier: () => "fixture", checkRateLimit: async () => ({ success: true }) }));
vi.mock("@/lib/security/lead-ingress", () => ({ leadRequesterKey: () => "fixture" }));

type RecordValue = { _id: string; _rev: string; status: string; updatedAt: string; [key: string]: unknown };
const records = new Map<string, RecordValue>();
let revision = 0;
let failProcessedCommit = false;
let session: Record<string, unknown>;
const constructEvent = vi.fn();
const retrieveSession = vi.fn();
const updateSession = vi.fn();
const fetchLegacy = vi.fn();
const settings: Record<string, string | undefined> = {};

vi.mock("@/lib/stripe", () => ({
    getStripe: () => ({
        webhooks: { constructEvent },
        checkout: { sessions: { retrieve: retrieveSession, update: updateSession, listLineItems: async () => ({ has_more: false, data: [{ currency: "usd", price: { id: "price_test" }, quantity: 1 }] }) } },
    }),
}));
vi.mock("@/lib/config/env", () => ({ getEnv: (key: string) => settings[key] }));
vi.mock("@/lib/observability/api-handler", () => ({
    createApiHandler: () => ({
        log: { info: vi.fn(), warn: vi.fn(), error: vi.fn() },
        error: vi.fn(),
        json: (body: unknown) => new Response(JSON.stringify(body), { status: 200 }),
        jsonError: (message: string, status: number) => new Response(JSON.stringify({ error: message }), { status }),
        traceId: "trace-test",
    }),
}));
vi.mock("@/lib/observability/request-metrics", () => ({
    withLatencyAsync: (_name: string, fn: () => Promise<unknown>) => fn(),
}));
const reserve = vi.fn(async (doc: RecordValue) => {
    const existing = records.get(doc._id);
    if (existing) return { ...existing };
    const saved = { ...doc, _rev: `rev-${++revision}` };
    records.set(doc._id, saved);
    return { ...saved };
});
const patch = vi.fn((id: string) => {
    let expectedRevision: string;
    let changes: Record<string, unknown>;
    const chain = {
        ifRevisionId(value: string) { expectedRevision = value; return chain; },
        set(value: Record<string, unknown>) { changes = value; return chain; },
        async commit() {
            if (changes.status === "processed" && failProcessedCommit) throw new Error("storage down after delivery");
            const current = records.get(id);
            if (!current || current._rev !== expectedRevision) throw new Error("revision conflict");
            const saved = { ...current, ...changes, _rev: `rev-${++revision}` };
            records.set(id, saved);
            return { ...saved };
        },
    };
    return chain;
});
vi.mock("@/lib/shop/payment-storage", () => ({ getPaymentStorage: () => ({ createIfNotExists: reserve, patch, fetch: fetchLegacy }) }));

const event = {
    id: "evt_paid", type: "checkout.session.completed",
    data: { object: { id: "cs_test_paid" } },
};
const request = () => new Request("https://example.com/api/shop/webhook", {
    method: "POST", headers: { "stripe-signature": "signed" }, body: "{}",
}) as NextRequest;
const status = () => [...records.values()][0]?.status;

describe("paid shop webhook ownership and recovery", () => {
    beforeEach(() => {
        records.clear();
        revision = 0;
        failProcessedCommit = false;
        vi.clearAllMocks();
        settings.STRIPE_WEBHOOK_SECRET = "whsec_test";
        settings.GHL_SHOP_PURCHASE_WEBHOOK_URL = "https://ghl.example.test/order";
        vi.stubEnv("GHL_SHOP_FULFILLMENT_SECRET", "fixture-only-32-character-minimum-secret");
        vi.stubEnv("GHL_SHOP_FULFILLMENT_ALLOWED_HOSTS", "ghl.example.test");
        vi.stubEnv("GHL_SHOP_FULFILLMENT_CONTRACT_CONFIRMED", "true");
        session = {
            id: "cs_test_paid", payment_status: "paid", status: "complete", amount_total: 4900, currency: "usd",
            customer_details: { email: "buyer@example.test", name: "Buyer" },
            metadata: {
                ...(() => { const items = [{ p: "book", s: "book", e: "pdf", t: "digital", sh: false, pr: "price_test", q: 1 }]; return { ...buildCheckoutItemsMetadata(items), items_signature: orderMetadataSignature(items, "whsec_test") }; })(),
                fulfillment_status: "pending", order_source: "unt_bookstore",
            },
        };
        constructEvent.mockReturnValue(event);
        fetchLegacy.mockResolvedValue(null);
        retrieveSession.mockImplementation(async () => session);
        updateSession.mockImplementation(async (_id, update) => {
            session = { ...session, metadata: update.metadata };
            return session;
        });
        vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("ok", { status: 200, headers: { "X-UNT-Acknowledgement": "durably-accepted-v1" } })));
    });
    afterEach(() => { vi.unstubAllEnvs(); vi.unstubAllGlobals(); });

    it("requires a signed, paid session before any fulfillment", async () => {
        const { POST } = await import("@/app/api/shop/webhook/route");
        expect((await POST(new Request("https://example.com/api/shop/webhook", { method: "POST" }) as NextRequest)).status).toBe(400);
        constructEvent.mockImplementationOnce(() => { throw new Error("bad signature"); });
        expect((await POST(request())).status).toBe(400);
        session.payment_status = "unpaid";
        expect((await POST(request())).status).toBe(200);
        expect(global.fetch).not.toHaveBeenCalled();
        expect(records.size).toBe(0);
    });

    it("ignores a paid checkout from another Stripe flow", async () => {
        session.metadata = { order_source: "other" };
        const { POST } = await import("@/app/api/shop/webhook/route");
        expect((await POST(request())).status).toBe(200);
        expect(global.fetch).not.toHaveBeenCalled();
        expect(records.size).toBe(0);
    });

    it("delivers after asynchronous payment succeeds", async () => {
        constructEvent.mockReturnValueOnce({ ...event, id: "evt_async_paid", type: "checkout.session.async_payment_succeeded" });
        const { POST } = await import("@/app/api/shop/webhook/route");
        expect((await POST(request())).status).toBe(200);
        expect(status()).toBe("processed");
        expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    it("delivers once and treats a replay as idempotent", async () => {
        const { POST } = await import("@/app/api/shop/webhook/route");
        expect((await POST(request())).status).toBe(200);
        expect(status()).toBe("processed");
        expect((await POST(request())).status).toBe(200);
        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(records.size).toBe(1);
        expect([...records.values()][0].stripeSessionId).toBeUndefined();
        expect(session.metadata).toMatchObject({ fulfillment_status: "fulfilled" });
        const [, options] = vi.mocked(global.fetch).mock.calls[0];
        expect((options?.headers as Record<string, string>)["X-Idempotency-Key"]).toBe("cs_test_paid");
        expect(JSON.parse(String(options?.body))).toMatchObject({ sessionId: "cs_test_paid", hasDigital: true, hasPhysical: false });
    });

    it("repairs failed Stripe metadata on replay without reposting fulfillment", async () => {
        updateSession.mockRejectedValueOnce(new Error("Stripe metadata unavailable"));
        const { POST } = await import("@/app/api/shop/webhook/route");
        expect((await POST(request())).status).toBe(503);
        expect(status()).toBe("processed");
        expect(session.metadata).toMatchObject({ fulfillment_status: "pending" });
        expect((await POST(request())).status).toBe(200);
        expect(session.metadata).toMatchObject({ fulfillment_status: "fulfilled" });
        expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    it("quarantines a non-2xx response without blind replay", async () => {
        vi.mocked(global.fetch).mockResolvedValueOnce(new Response("rejected", { status: 503 }));
        const { POST } = await import("@/app/api/shop/webhook/route");
        expect((await POST(request())).status).toBe(200);
        expect(status()).toBe("pending_review");
        expect((await POST(request())).status).toBe(200);
        expect(status()).toBe("pending_review");
        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(retrieveSession).toHaveBeenCalledTimes(2);
    });

    it("allows only one concurrent owner", async () => {
        const { POST } = await import("@/app/api/shop/webhook/route");
        const responses = await Promise.all([POST(request()), POST(request())]);
        expect(responses.map((response) => response.status).sort()).toEqual([200, 503]);
        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(records.size).toBe(1);
    });

    it("does not deliver when storage cannot reserve or claim the order", async () => {
        const { POST } = await import("@/app/api/shop/webhook/route");
        reserve.mockRejectedValueOnce(new Error("storage down"));
        expect((await POST(request())).status).toBe(503);
        patch.mockImplementationOnce(() => { throw new Error("storage down"); });
        expect((await POST(request())).status).toBe(503);
        expect(global.fetch).not.toHaveBeenCalled();
    });

    it("quarantines a delivery whose final storage write fails", async () => {
        const { POST } = await import("@/app/api/shop/webhook/route");
        failProcessedCommit = true;
        expect((await POST(request())).status).toBe(503);
        expect(status()).toBe("processing");
        failProcessedCommit = false;
        const record = [...records.values()][0];
        records.set(record._id, { ...record, updatedAt: new Date(Date.now() - 11 * 60 * 1000).toISOString() });
        expect((await POST(request())).status).toBe(200);
        expect(status()).toBe("pending_review");
        expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    it("keeps missing configuration visible and resumes when configured", async () => {
        const { POST } = await import("@/app/api/shop/webhook/route");
        settings.GHL_SHOP_PURCHASE_WEBHOOK_URL = undefined;
        expect((await POST(request())).status).toBe(503);
        expect(status()).toBe("pending_manual");
        expect(global.fetch).not.toHaveBeenCalled();
        settings.GHL_SHOP_PURCHASE_WEBHOOK_URL = "https://ghl.example.test/order";
        expect((await POST(request())).status).toBe(200);
        expect(status()).toBe("processed");
    });

    it("holds ambiguous network outcomes and stale processing for review", async () => {
        const { POST } = await import("@/app/api/shop/webhook/route");
        vi.mocked(global.fetch).mockRejectedValueOnce(new Error("timeout"));
        expect((await POST(request())).status).toBe(200);
        expect(status()).toBe("pending_review");
        expect((await POST(request())).status).toBe(200);
        expect(global.fetch).toHaveBeenCalledTimes(1);
        records.clear();
        reserve.mockImplementationOnce(async (doc) => {
            const stale = { ...doc, _rev: "stale-rev", status: "processing", updatedAt: new Date(Date.now() - 11 * 60 * 1000).toISOString() };
            records.set(doc._id, stale);
            return stale;
        });
        expect((await POST(request())).status).toBe(200);
        expect(status()).toBe("pending_review");
        expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    it("honors fulfillment recorded by an older deployment", async () => {
        session.metadata = { ...(session.metadata as object), fulfillment_status: "fulfilled" };
        const { POST } = await import("@/app/api/shop/webhook/route");
        expect((await POST(request())).status).toBe(200);
        expect(status()).toBe("processed");
        expect(global.fetch).not.toHaveBeenCalled();
    });

    it("holds ambiguous legacy records for review rather than redelivering", async () => {
        fetchLegacy.mockResolvedValueOnce({ _id: "legacy-random-id" });
        const { POST } = await import("@/app/api/shop/webhook/route");
        expect((await POST(request())).status).toBe(200);
        expect(status()).toBe("pending_review");
        expect(global.fetch).not.toHaveBeenCalled();
    });

    it("holds a paid order with missing item metadata for review", async () => {
        session.metadata = { order_source: "unt_bookstore", items: "[]" };
        const { POST } = await import("@/app/api/shop/webhook/route");
        expect((await POST(request())).status).toBe(200);
        expect(status()).toBe("pending_review");
        expect(global.fetch).not.toHaveBeenCalled();
    });

    it("holds malformed item metadata instead of sending incomplete fulfillment", async () => {
        session.metadata = { order_source: "unt_bookstore", items: '[{"t":"digital","q":1},null]' };
        const { POST } = await import("@/app/api/shop/webhook/route");
        expect((await POST(request())).status).toBe(200);
        expect(status()).toBe("pending_review");
        expect(global.fetch).not.toHaveBeenCalled();
    });
});
