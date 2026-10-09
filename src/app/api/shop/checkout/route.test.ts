import { afterEach, beforeEach, expect, it, vi } from "vitest";
import type { NextRequest } from "next/server";

const createSession = vi.fn();
const retrievePrice = vi.fn();
const budgets = vi.hoisted(() => ({ identity: "fixture", check: vi.fn() }));
vi.mock("@/lib/security/rate-limiter", () => ({ getClientIdentifier: () => "127.0.0.1", checkRateLimit: budgets.check }));
vi.mock("@/lib/security/lead-ingress", () => ({ leadRequesterKey: () => budgets.identity }));
vi.mock("@/lib/stripe", () => ({ getStripe: () => ({ prices: { retrieve: retrievePrice }, checkout: { sessions: { create: createSession } } }) }));
vi.mock("@/lib/shop/payment-storage", () => ({ getPaymentStorage: () => ({}) }));
vi.mock("@/lib/config/env", () => ({
    publicEnv: { baseUrl: "https://unt.example.test" },
    getEnv: (key: string) => key === "STRIPE_SECRET_KEY" ? "sk_test_only" : key === "STRIPE_WEBHOOK_SECRET" ? "fixture_secret" : key === "GHL_SHOP_PURCHASE_WEBHOOK_URL" ? "https://receiver.example.test/order" : undefined,
}));
vi.mock("@/sanity/lib/client", () => ({
    client: { fetch: async () => [{ _id: "product-1", slug: "book" }] },
}));
vi.mock("@/lib/shop/checkout", async (importOriginal) => ({
    ...await importOriginal<typeof import("@/lib/shop/checkout")>(),
    CHECKOUT_PRODUCTS_QUERY: "test",
    resolveCheckoutItem: () => ({
        productId: "product-1", slug: "book", quantity: 1, stripePriceId: "price_test",
        fulfillmentType: "digital", requiresShipping: false, editionId: "pdf", expectedAmount: 2900, stripeProductId: "prod_fixture",
    }),
}));
vi.mock("@/lib/observability/api-handler", () => ({
    createApiHandler: () => ({
        log: { warn: vi.fn(), error: vi.fn() }, error: vi.fn(),
        json: (body: unknown, options?: { status?: number }) => new Response(JSON.stringify(body), { status: options?.status ?? 200 }),
        rateLimitHeaders: () => ({}), traceId: "trace-test",
    }),
    getClientIp: () => "127.0.0.1",
    checkRateLimit: () => ({ limited: false, remaining: 29, resetAt: Date.now() + 60000 }),
}));
vi.mock("@/lib/observability/request-metrics", () => ({
    incrementCounter: vi.fn(), withLatencyAsync: (_name: string, fn: () => Promise<unknown>) => fn(),
}));

function request(locale?: unknown, returnUrl?: unknown) {
    return new Request("https://unt.example.test/api/shop/checkout", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            items: [{ productId: "product-1", slug: "book", quantity: 1 }],
            locale, returnUrl,
        }),
    }) as NextRequest;
}

beforeEach(() => {
    budgets.identity = "fixture";
    budgets.check.mockReset().mockResolvedValue({ success: true, remaining: 29, resetTime: Date.now() + 60000 });
    createSession.mockReset().mockResolvedValue({ id: "cs_test_checkoutFixture", url: "https://checkout.stripe.test/session" });
    retrievePrice.mockReset().mockResolvedValue({ id: "price_test", product: "prod_fixture", active: true, type: "one_time", currency: "usd", unit_amount: 2900 });
    vi.stubEnv("GHL_SHOP_FULFILLMENT_SECRET", "fixture-only-32-character-minimum-secret");
    vi.stubEnv("GHL_SHOP_FULFILLMENT_ALLOWED_HOSTS", "receiver.example.test");
    vi.stubEnv("GHL_SHOP_FULFILLMENT_CONTRACT_CONFIRMED", "true");
});
afterEach(() => vi.unstubAllEnvs());

it("does not collapse all unknown buyers into a shared thirty-request identity", async () => {
    budgets.identity = "anonymous";
    const { POST } = await import("./route");
    expect((await POST(request("en"))).status).toBe(200);
    expect(budgets.check).toHaveBeenCalledExactlyOnceWith("shop-checkout:global", 120, 60000);
});

it("rejects an exhausted verified buyer before spending global checkout capacity", async () => {
    budgets.check.mockResolvedValue({ success: false, remaining: 0, resetTime: Date.now() + 60000 });
    const { POST } = await import("./route");
    expect((await POST(request("en"))).status).toBe(429);
    expect(budgets.check).toHaveBeenCalledExactlyOnceWith("shop-checkout:fixture", 30, 60000);
    expect(createSession).not.toHaveBeenCalled();
});

it.each(["en", "es"])("returns %s checkout to the same locale", async (locale) => {
    const { POST } = await import("./route");
    expect((await POST(request(locale))).status).toBe(200);
    const options = createSession.mock.calls[0][0];
    expect(options.success_url).toBe(`https://unt.example.test/${locale}/shop/success?session_id={CHECKOUT_SESSION_ID}`);
    expect(options.cancel_url).toBe(`https://unt.example.test/${locale}/shop/cart?checkout=cancelled`);
});

it("rejects an untrusted return target before creating a Stripe session", async () => {
    const { POST } = await import("./route");
    expect((await POST(request("//evil.example.test"))).status).toBe(400);
    expect((await POST(request("es", "https://evil.example.test/checkout"))).status).toBe(400);
    expect(createSession).not.toHaveBeenCalled();
});

it.each([0, false, "", null, {}])("rejects a supplied invalid locale %j", async (locale) => {
    const { POST } = await import("./route");
    expect((await POST(request(locale))).status).toBe(400);
    expect(createSession).not.toHaveBeenCalled();
});

it.each(["{", JSON.stringify({ items: [null] }), JSON.stringify({ items: [{ slug: "book", productId: "product-1", quantity: 1, editionId: {} }] })])("rejects malformed carts before contacting Stripe", async body => {
    const { POST } = await import("./route");
    const response = await POST(new Request("https://unt.example.test/api/shop/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body }) as NextRequest);
    expect(response.status).toBe(400);
    expect(createSession).not.toHaveBeenCalled();
});

it("rejects oversized request bodies before contacting Stripe", async () => {
    const { POST } = await import("./route");
    const response = await POST(new Request("https://unt.example.test/api/shop/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: "x".repeat(32_769) }) as NextRequest);
    expect(response.status).toBe(413);
    expect(createSession).not.toHaveBeenCalled();
});

it("sets a secure buyer receipt cookie and signs versioned server order metadata", async () => {
    const { POST } = await import("./route");
    const response = await POST(request("en"));
    expect(response.headers.get("set-cookie")).toContain("HttpOnly; Secure; SameSite=Lax");
    expect(createSession.mock.calls[0][0].metadata).toMatchObject({ items_version: "1", items_signature: expect.stringMatching(/^[a-f0-9]{64}$/) });
});

it("keeps independent buyer proofs for simultaneous checkout tabs", async () => {
    createSession.mockResolvedValueOnce({ id: "cs_test_firstTab", url: "https://checkout.stripe.test/first" }).mockResolvedValueOnce({ id: "cs_test_secondTab", url: "https://checkout.stripe.test/second" });
    const { POST } = await import("./route");
    const responses = await Promise.all([POST(request("en")), POST(request("en"))]);
    const cookies = responses.map(response => response.headers.get("set-cookie")!);
    expect(cookies.every(cookie => cookie.startsWith("__Host-unt_shop_receipt_"))).toBe(true);
    expect(cookies[0].split("=")[0]).not.toBe(cookies[1].split("=")[0]);
});

it("rejects duplicate rows that exceed the canonical edition quantity before checkout", async () => {
    const { POST } = await import("./route");
    const response = await POST(new Request("https://unt.example.test/api/shop/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ items: [1, 2].map(() => ({ productId: "product-1", slug: "book", quantity: 60 })) }) }) as NextRequest);
    expect(response.status).toBe(400);
    expect(createSession).not.toHaveBeenCalled();
});

it.each([{ currency: "cad" }, { unit_amount: 1 }, { active: false }, { type: "recurring" }, { product: "prod_another" }])("rejects a mismatched Stripe offer %j", async mismatch => {
    retrievePrice.mockResolvedValue({ product: "prod_fixture", active: true, type: "one_time", currency: "usd", unit_amount: 2900, ...mismatch });
    const { POST } = await import("./route");
    expect((await POST(request("en"))).status).toBe(409);
    expect(createSession).not.toHaveBeenCalled();
});
