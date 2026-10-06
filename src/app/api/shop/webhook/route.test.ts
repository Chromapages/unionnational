import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { NextRequest } from "next/server";
import { buildCheckoutItemsMetadata } from "@/lib/shop/order-metadata";
import { orderMetadataSignature } from "@/lib/shop/fulfillment";
vi.mock("@/lib/security/rate-limiter", () => ({ getClientIdentifier: () => "fixture", checkRateLimit: async () => ({ success: true }) }));
vi.mock("@/lib/security/lead-ingress", () => ({ leadRequesterKey: () => "fixture" }));

const mocks = vi.hoisted(() => ({ session: {} as Record<string, unknown>, delivery: vi.fn(), updates: [] as Record<string, unknown>[] }));
vi.mock("@/lib/config/env", () => ({ getEnv: (name: string) => name === "STRIPE_WEBHOOK_SECRET" ? "test_signature_secret" : name === "GHL_SHOP_PURCHASE_WEBHOOK_URL" ? "https://fulfillment.example.invalid" : undefined }));
vi.mock("@/lib/stripe", () => ({ getStripe: () => ({
    webhooks: { constructEvent: () => ({ id: "evt_test", type: "checkout.session.completed", data: { object: { id: "cs_test_order" } } }) },
    checkout: { sessions: { retrieve: async () => mocks.session, update: vi.fn(), listLineItems: async () => ({ has_more: false, data: [{ currency: "usd", price: { id: "price_test" }, quantity: 1 }] }) } },
}) }));
vi.mock("@/lib/shop/payment-storage", () => ({ getPaymentStorage: () => ({
    createIfNotExists: async () => ({ _id: "order_test", _rev: "r1", status: "pending", updatedAt: new Date().toISOString() }),
    fetch: async () => null,
    patch: () => {
        let fields: Record<string, unknown> = {};
        const patch = {
            ifRevisionId: () => patch,
            set: (value: Record<string, unknown>) => { fields = value; mocks.updates.push(value); return patch; },
            commit: async () => ({ _id: "order_test", _rev: "r2", ...fields }),
        };
        return patch;
    },
}) }));
vi.mock("@/lib/observability/api-handler", () => ({ createApiHandler: () => ({
    traceId: "trace_test", error: vi.fn(), log: { warn: vi.fn(), info: vi.fn() },
    json: (value: unknown) => new Response(JSON.stringify(value)),
    jsonError: (message: string, status: number) => new Response(JSON.stringify({ message }), { status }),
}) }));
vi.mock("@/lib/observability/request-metrics", () => ({ withLatencyAsync: (_name: string, operation: () => unknown) => operation() }));

beforeEach(() => {
    mocks.updates = [];
    mocks.delivery.mockReset().mockResolvedValue(new Response("{}", { status: 200, headers: { "X-UNT-Acknowledgement": "durably-accepted-v1" } }));
    vi.stubEnv("GHL_SHOP_FULFILLMENT_SECRET", "fixture-only-32-character-minimum-secret");
    vi.stubEnv("GHL_SHOP_FULFILLMENT_ALLOWED_HOSTS", "fulfillment.example.invalid");
    vi.stubEnv("GHL_SHOP_FULFILLMENT_CONTRACT_CONFIRMED", "true");
    vi.stubGlobal("fetch", mocks.delivery);
    mocks.session = {
        id: "cs_test_order", payment_status: "paid", amount_total: 3900, currency: "usd",
        customer_details: { email: "buyer@example.test", name: "Test Buyer" },
        collected_information: { shipping_details: { name: "Test Recipient", address: { line1: "100 Test Road", country: "US", postal_code: "00000" } } },
        metadata: (() => { const items = [{ p: "book", s: "book", e: "physical", t: "physical", sh: true, pr: "price_test", q: 1 }]; return { order_source: "unt_bookstore", ...buildCheckoutItemsMetadata(items), items_signature: orderMetadataSignature(items, "test_signature_secret") }; })(),
    };
});
afterEach(() => { vi.unstubAllGlobals(); vi.unstubAllEnvs(); });

const request = () => new Request("https://unt.example.test/api/shop/webhook", { method: "POST", headers: { "stripe-signature": "test" }, body: "{}" }) as NextRequest;

describe("paid-order delivery", () => {
    it("forwards verified shipping recipient and address", async () => {
        const { POST } = await import("./route");
        expect((await POST(request())).status).toBe(200);
        const payload = JSON.parse(mocks.delivery.mock.calls[0][1].body);
        expect(payload.shippingDetails).toEqual((mocks.session.collected_information as { shipping_details: unknown }).shipping_details);
        expect(payload.hasPhysical).toBe(true);
    });

    it("holds physical orders for review when the verified shipping address is missing", async () => {
        mocks.session.collected_information = null;
        const { POST } = await import("./route");
        expect(await (await POST(request())).json()).toMatchObject({ pendingReview: true });
        expect(mocks.delivery).not.toHaveBeenCalled();
        expect(mocks.updates.some(update => update.lastError === "missing_shipping_details")).toBe(true);
    });

    it("reassembles multi-part item metadata for fulfillment", async () => {
        const items = [{ p: "book".repeat(35), s: "book".repeat(35), e: "digital", n: "edition".repeat(25), t: "digital", sh: false, pr: "price_test", q: 1 }];
        mocks.session.metadata = { order_source: "unt_bookstore", ...buildCheckoutItemsMetadata(items)!, items_signature: orderMetadataSignature(items, "test_signature_secret") };
        expect((mocks.session.metadata as Record<string, string>).items_parts).toBeDefined();
        const { POST } = await import("./route");
        expect((await POST(request())).status).toBe(200);
        expect(JSON.parse(mocks.delivery.mock.calls[0][1].body).items).toEqual(items);
    });

    it("quarantines 2xx without durable acknowledgement", async () => {
        mocks.delivery.mockResolvedValue(new Response("{}", { status: 200 }));
        const { POST } = await import("./route");
        expect(await (await POST(request())).json()).toMatchObject({ pendingReview: true });
        expect(mocks.updates.some(update => update.lastError === "missing_durable_acknowledgement")).toBe(true);
    });
    it("rejects an oversized body before constructing an event", async () => {
        const { POST } = await import("./route");
        expect((await POST(new Request("https://fixture.invalid/api/shop/webhook", { method: "POST", headers: { "stripe-signature": "invalid" }, body: "x".repeat(262145) }) as NextRequest)).status).toBe(413);
        expect(mocks.delivery).not.toHaveBeenCalled();
    });
});
