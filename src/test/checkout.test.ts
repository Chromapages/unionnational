import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { NextRequest } from "next/server";

const mockEnv = vi.hoisted(() => ({
    values: {
        STRIPE_SECRET_KEY: "sk_test_checkout",
        STRIPE_WEBHOOK_SECRET: "whsec_test_secret",
        GHL_SHOP_PURCHASE_WEBHOOK_URL: "https://ghl.example.com/webhook",
    } as Record<string, string | undefined>,
}));

// Minimal mock for the Sanity client
const mockSanityFetch = vi.fn();
vi.mock("@/sanity/lib/client", () => ({
    client: { fetch: mockSanityFetch },
}));

// Mock stripe
const mockStripeCheckoutSessionsCreate = vi.fn();
const mockStripePriceRetrieve = vi.fn();
const mockQuota = vi.fn();
vi.mock("@/lib/shop/payment-storage", () => ({ getPaymentStorage: () => ({}) }));
vi.mock("@/lib/security/lead-ingress", () => ({ leadRequesterKey: () => "fixture-requester" }));
vi.mock("@/lib/security/rate-limiter", () => ({ checkRateLimit: mockQuota }));
vi.mock("@/lib/stripe", () => ({
    getStripe: () => ({
        checkout: {
            sessions: { create: async (options: unknown) => ({ id: "cs_test_regressionFixture", ...await mockStripeCheckoutSessionsCreate(options) }) },
        },
        prices: { retrieve: mockStripePriceRetrieve },
    }),
}));

// Mock env
vi.mock("@/lib/config/env", () => ({
    publicEnv: { baseUrl: "https://example.com" },
    getEnv: (key: string) => {
        return mockEnv.values[key];
    },
}));

// Mock observability
vi.mock("@/lib/observability/api-handler", () => ({
    createApiHandler: () => ({
        log: { info: vi.fn(), warn: vi.fn(), error: vi.fn() },
        error: vi.fn(),
        json: (body: unknown, opts?: { status?: number; headers?: Record<string, string> }) => {
            return new Response(JSON.stringify(body), {
                status: opts?.status ?? 200,
                headers: { "Content-Type": "application/json" },
            });
        },
        jsonError: (message: string, status: number) =>
            new Response(JSON.stringify({ error: message }), { status }),
        rateLimitHeaders: () => ({}),
        traceId: "test-trace-id",
    }),
    getClientIp: () => "127.0.0.1",
    checkRateLimit: () => ({ limited: false, remaining: 30, resetAt: Date.now() + 60000 }),
    parseJsonBody: async () => ({ data: {}, error: null }),
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

// ─── Helpers ────────────────────────────────────────────────────────────────

function buildCheckoutRequest(body: unknown): Request {
    return new Request("https://example.com/api/shop/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });
}

// ─── Tests ──────────────────────────────────────────────────────────────────

describe("POST /api/shop/checkout", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockSanityFetch.mockReset();
        mockStripeCheckoutSessionsCreate.mockReset();
        mockQuota.mockReset().mockResolvedValue({ success: true, remaining: 29, resetTime: Date.now() + 60000 });
        mockStripePriceRetrieve.mockReset().mockImplementation(async (id: string) => ({
            id, active: true, type: "one_time", currency: "usd", product: "prod_fixture",
            unit_amount: id === "price_1T2dAkBBqB7ETKuVZCP3OsnA" ? 2700 : id === "price_1TOlYGBBqB7ETKuVjY3QWF1m" ? 2900 : id === "price_shipping123" ? 5900 : 4900,
        }));
        vi.stubEnv("GHL_SHOP_FULFILLMENT_ALLOWED_HOSTS", "ghl.example.com");
        vi.stubEnv("GHL_SHOP_FULFILLMENT_SECRET", "fixture-only-32-character-minimum-secret");
        vi.stubEnv("GHL_SHOP_FULFILLMENT_CONTRACT_CONFIRMED", "true");
        mockEnv.values.STRIPE_SECRET_KEY = "sk_test_checkout";
        mockEnv.values.STRIPE_WEBHOOK_SECRET = "whsec_test_secret";
        mockEnv.values.GHL_SHOP_PURCHASE_WEBHOOK_URL = "https://ghl.example.com/webhook";
    });
    afterEach(() => vi.unstubAllEnvs());

    it("returns 200 with redirectUrl when cart is valid and checkout succeeds", async () => {
        const mockProduct = {
            _id: "prod-1",
            title: "Test Product",
            slug: "test-product",
            buyLink: null,
            price: 49,
            format: "digital",
            stripePriceId: "price_test123",
            editions: [],
        };

        mockSanityFetch.mockResolvedValueOnce([mockProduct]);
        mockStripeCheckoutSessionsCreate.mockResolvedValueOnce({
            url: "https://checkout.stripe.com/test-session",
        });

        const req = buildCheckoutRequest({
            items: [{ productId: "prod-1", slug: "test-product", quantity: 1 }],
        });

        // Import route handler dynamically so mocks are in place
        const { POST } = await import("@/app/api/shop/checkout/route");
        const res = await POST(req as unknown as NextRequest);

        expect(res.status).toBe(200);
        const body = await res.json();
        expect(body.ok).toBe(true);
        expect(body.code).toBe("STRIPE_CHECKOUT_SESSION_CREATED");
        expect(body.redirectUrl).toBe("https://checkout.stripe.com/test-session");
    });

    it("returns 400 EMPTY_CART when items array is empty", async () => {
        const req = buildCheckoutRequest({ items: [] });

        const { POST } = await import("@/app/api/shop/checkout/route");
        const res = await POST(req as unknown as NextRequest);

        expect(res.status).toBe(400);
        const body = await res.json();
        expect(body.code).toBe("EMPTY_CART");
    });

    it("returns 400 INVALID_CART_ITEM when productId is missing", async () => {
        const req = buildCheckoutRequest({
            items: [{ slug: "test-product", quantity: 1 }],
        });

        const { POST } = await import("@/app/api/shop/checkout/route");
        const res = await POST(req as unknown as NextRequest);

        expect(res.status).toBe(400);
        const body = await res.json();
        expect(body.code).toBe("INVALID_CART_ITEM");
    });

    it("returns 400 INVALID_CART_ITEM when quantity is missing or invalid", async () => {
        const req = buildCheckoutRequest({
            items: [{ productId: "prod-1", slug: "test-product", quantity: 0 }],
        });

        const { POST } = await import("@/app/api/shop/checkout/route");
        const res = await POST(req as unknown as NextRequest);

        expect(res.status).toBe(400);
        const body = await res.json();
        expect(body.code).toBe("INVALID_CART_ITEM");
    });

    it("returns 404 PRODUCT_NOT_FOUND when product does not exist in Sanity", async () => {
        mockSanityFetch.mockResolvedValueOnce([]);

        const req = buildCheckoutRequest({
            items: [{ productId: "prod-nonexistent", slug: "nonexistent", quantity: 1 }],
        });

        const { POST } = await import("@/app/api/shop/checkout/route");
        const res = await POST(req as unknown as NextRequest);

        expect(res.status).toBe(404);
        const body = await res.json();
        expect(body.code).toBe("PRODUCT_NOT_FOUND");
    });

    it("returns 200 with redirectUrl when single item has no Stripe price but has buyLink (external fallback)", async () => {
        const mockProductWithBuyLink = {
            _id: "prod-external",
            title: "External Product",
            slug: "external-product",
            buyLink: "https://external-checkout.example.com/buy",
            price: 4900,
            stripePriceId: undefined,
            editions: [],
        };

        mockSanityFetch.mockResolvedValueOnce([mockProductWithBuyLink]);

        const req = buildCheckoutRequest({
            items: [{ productId: "prod-external", slug: "external-product", quantity: 1 }],
        });

        const { POST } = await import("@/app/api/shop/checkout/route");
        const res = await POST(req as unknown as NextRequest);

        expect(res.status).toBe(200);
        const body = await res.json();
        expect(body.code).toBe("REDIRECT_TO_EXTERNAL_CHECKOUT");
        expect(body.redirectUrl).toBe("https://external-checkout.example.com/buy");
    });

    it("uses a server-approved construction edition mapping while ignoring client offer hints", async () => {
        const productId = "038a9b49-ee53-4e6a-9897-e9fe51693396";
        const slug = "the-money-making-blueprint-for-construction-companies";
        mockSanityFetch.mockResolvedValueOnce([{ _id: productId, title: "The Money-Making Blueprint for Construction Companies", slug, price: 29, editions: [{ _key: "current-digital-key", name: "Digital PDF", price: 29, format: "digital" }] }]);
        mockStripeCheckoutSessionsCreate.mockResolvedValueOnce({ url: "https://checkout.stripe.com/construction-blueprint" });
        const { POST } = await import("@/app/api/shop/checkout/route");
        const res = await POST(buildCheckoutRequest({ items: [{ productId, slug, editionId: "current-digital-key", editionName: "Audiobook", format: "physical", stripePriceId: "price_forged", requiresShipping: true, quantity: 1 }] }) as NextRequest);
        expect(res.status).toBe(200);
        const createCall = mockStripeCheckoutSessionsCreate.mock.calls[0][0];
        expect(createCall.line_items).toEqual([{ price: "price_1TOlYGBBqB7ETKuVjY3QWF1m", quantity: 1 }]);
        expect(createCall.metadata).toMatchObject({ has_digital: "true", has_physical: "false", items_version: "1" });
        expect(createCall.shipping_address_collection).toBeUndefined();
    });

    it("rejects stale construction edition IDs instead of trusting display-format hints", async () => {
        const mockProduct = {
            _id: "038a9b49-ee53-4e6a-9897-e9fe51693396",
            title: "The Moneyâ€‘Making Blueprint for Construction Companies",
            slug: "the-money-making-blueprint-for-construction-companies",
            buyLink: null,
            price: 2900,
            stripePriceId: undefined,
            editions: [
                {
                    _key: "current-digital-key",
                    name: "Digital PDF",
                    price: 29,
                    format: "digital",
                    stripePriceId: undefined,
                },
            ],
        };

        mockSanityFetch.mockResolvedValueOnce([mockProduct]);
        mockStripeCheckoutSessionsCreate.mockResolvedValueOnce({
            url: "https://checkout.stripe.com/construction-blueprint",
        });

        const req = buildCheckoutRequest({
            items: [
                {
                    productId: "038a9b49-ee53-4e6a-9897-e9fe51693396",
                    slug: "the-money-making-blueprint-for-construction-companies",
                    editionId: "old-digital-key",
                    editionName: "Digital PDF",
                    format: "digital",
                    quantity: 1,
                },
            ],
        });

        const { POST } = await import("@/app/api/shop/checkout/route");
        const res = await POST(req as unknown as NextRequest);

        expect(res.status).toBe(409);
        expect((await res.json()).code).toBe("STRIPE_PRICE_MISSING");
        expect(mockStripeCheckoutSessionsCreate).not.toHaveBeenCalled();
    });

    it("rejects a swapped catalog Stripe price instead of overriding it from client format", async () => {
        const mockProduct = {
            _id: "038a9b49-ee53-4e6a-9897-e9fe51693396",
            title: "The Moneyâ€‘Making Blueprint for Construction Companies",
            slug: "the-money-making-blueprint-for-construction-companies",
            buyLink: null,
            price: 2900,
            stripePriceId: undefined,
            editions: [
                {
                    _key: "digital-key",
                    name: "Digital PDF",
                    price: 29,
                    format: "digital",
                    stripePriceId: "price_1T2dAkBBqB7ETKuVZCP3OsnA",
                },
            ],
        };

        mockSanityFetch.mockResolvedValueOnce([mockProduct]);
        mockStripeCheckoutSessionsCreate.mockResolvedValueOnce({
            url: "https://checkout.stripe.com/construction-blueprint",
        });

        const req = buildCheckoutRequest({
            items: [
                {
                    productId: "038a9b49-ee53-4e6a-9897-e9fe51693396",
                    slug: "the-money-making-blueprint-for-construction-companies",
                    editionId: "digital-key",
                    editionName: "Digital PDF",
                    format: "digital",
                    quantity: 1,
                },
            ],
        });

        const { POST } = await import("@/app/api/shop/checkout/route");
        const res = await POST(req as unknown as NextRequest);

        expect(res.status).toBe(409);
        expect((await res.json()).code).toBe("OFFER_UNAVAILABLE");
        expect(mockStripeCheckoutSessionsCreate).not.toHaveBeenCalled();
    });

    it("rejects stale digital catalog price/format despite client digital hints", async () => {
        const mockProduct = {
            _id: "038a9b49-ee53-4e6a-9897-e9fe51693396",
            title: "The MoneyÃ¢â‚¬â€˜Making Blueprint for Construction Companies",
            slug: "the-money-making-blueprint-for-construction-companies",
            buyLink: null,
            price: 2900,
            stripePriceId: undefined,
            editions: [
                {
                    _key: "digital-key",
                    name: "Digital PDF",
                    price: 29,
                    format: "physical",
                    stripePriceId: "price_1T2dAkBBqB7ETKuVZCP3OsnA",
                },
            ],
        };

        mockSanityFetch.mockResolvedValueOnce([mockProduct]);
        mockStripeCheckoutSessionsCreate.mockResolvedValueOnce({
            url: "https://checkout.stripe.com/construction-blueprint-digital",
        });

        const req = buildCheckoutRequest({
            items: [
                {
                    productId: "038a9b49-ee53-4e6a-9897-e9fe51693396",
                    slug: "the-money-making-blueprint-for-construction-companies",
                    editionId: "digital-key",
                    editionName: "Digital PDF",
                    format: "digital",
                    quantity: 1,
                },
            ],
        });

        const { POST } = await import("@/app/api/shop/checkout/route");
        const res = await POST(req as unknown as NextRequest);

        expect(res.status).toBe(409);
        expect((await res.json()).code).toBe("OFFER_UNAVAILABLE");
        expect(mockStripeCheckoutSessionsCreate).not.toHaveBeenCalled();
    });

    it("rejects stale audio catalog price/format despite client audio hints", async () => {
        const mockProduct = {
            _id: "038a9b49-ee53-4e6a-9897-e9fe51693396",
            title: "The MoneyÃ¢â‚¬â€˜Making Blueprint for Construction Companies",
            slug: "the-money-making-blueprint-for-construction-companies",
            buyLink: null,
            price: 2700,
            stripePriceId: undefined,
            editions: [
                {
                    _key: "audio-key",
                    name: "Audiobook",
                    price: 27,
                    format: "digital",
                    stripePriceId: "price_1TOlYGBBqB7ETKuVjY3QWF1m",
                },
            ],
        };

        mockSanityFetch.mockResolvedValueOnce([mockProduct]);
        mockStripeCheckoutSessionsCreate.mockResolvedValueOnce({
            url: "https://checkout.stripe.com/construction-blueprint-audio",
        });

        const req = buildCheckoutRequest({
            items: [
                {
                    productId: "038a9b49-ee53-4e6a-9897-e9fe51693396",
                    slug: "the-money-making-blueprint-for-construction-companies",
                    editionId: "audio-key",
                    editionName: "Audiobook",
                    format: "audio",
                    quantity: 1,
                },
            ],
        });

        const { POST } = await import("@/app/api/shop/checkout/route");
        const res = await POST(req as unknown as NextRequest);

        expect(res.status).toBe(409);
        expect((await res.json()).code).toBe("OFFER_UNAVAILABLE");
        expect(mockStripeCheckoutSessionsCreate).not.toHaveBeenCalled();
    });

    it("rejects a client-created audio offer absent from the server catalog", async () => {
        const mockProduct = {
            _id: "038a9b49-ee53-4e6a-9897-e9fe51693396",
            title: "The Money-Making Blueprint for Construction Companies",
            slug: "the-money-making-blueprint-for-construction-companies",
            buyLink: null,
            price: 2700,
            stripePriceId: undefined,
            editions: [
                {
                    _key: "digital-key",
                    name: "Digital PDF",
                    price: 27,
                    format: "digital",
                    stripePriceId: "price_1TOlYGBBqB7ETKuVjY3QWF1m",
                },
            ],
        };

        mockSanityFetch.mockResolvedValueOnce([mockProduct]);
        mockStripeCheckoutSessionsCreate.mockResolvedValueOnce({
            url: "https://checkout.stripe.com/construction-blueprint-audio",
        });

        const req = buildCheckoutRequest({
            items: [
                {
                    productId: "038a9b49-ee53-4e6a-9897-e9fe51693396",
                    slug: "the-money-making-blueprint-for-construction-companies",
                    editionId: "audio",
                    editionName: "Audiobook",
                    format: "audio",
                    fulfillmentType: "audio",
                    requiresShipping: false,
                    quantity: 1,
                },
            ],
        });

        const { POST } = await import("@/app/api/shop/checkout/route");
        const res = await POST(req as unknown as NextRequest);

        expect(res.status).toBe(409);
        expect((await res.json()).code).toBe("STRIPE_PRICE_MISSING");
        expect(mockStripeCheckoutSessionsCreate).not.toHaveBeenCalled();
    });

    it("returns a clean price-missing response for the unconfigured strategy-call order bump", async () => {
        const mockProduct = {
            _id: "038a9b49-ee53-4e6a-9897-e9fe51693396",
            title: "The Money-Making Blueprint for Construction Companies",
            slug: "the-money-making-blueprint-for-construction-companies",
            buyLink: null,
            price: 2700,
            stripePriceId: undefined,
            editions: [],
            orderBump: {
                _key: "strategy-call",
                name: "30-Min Tax Strategy Call with Jason",
                price: 97,
                format: "service",
                stripePriceId: "price_1STRATEGY_STRATEGY_STRATEGY",
            },
        };

        mockSanityFetch.mockResolvedValueOnce([mockProduct]);

        const req = buildCheckoutRequest({
            items: [
                {
                    productId: "038a9b49-ee53-4e6a-9897-e9fe51693396",
                    slug: "the-money-making-blueprint-for-construction-companies",
                    editionId: "strategy-call",
                    editionName: "30-Min Tax Strategy Call with Jason",
                    format: "service",
                    fulfillmentType: "service",
                    requiresShipping: false,
                    quantity: 1,
                },
            ],
        });

        const { POST } = await import("@/app/api/shop/checkout/route");
        const res = await POST(req as unknown as NextRequest);

        expect(res.status).toBe(409);
        const body = await res.json();
        expect(body.code).toBe("STRIPE_PRICE_MISSING");
        expect(mockStripeCheckoutSessionsCreate).not.toHaveBeenCalled();
    });

    it("returns 409 STRIPE_PRICE_MISSING when no Stripe price is available and no buyLink", async () => {
        const mockProductNoPrice = {
            _id: "prod-noprice",
            title: "No Price Product",
            slug: "no-price-product",
            buyLink: null,
            price: 0,
            stripePriceId: undefined,
            editions: [],
        };

        mockSanityFetch.mockResolvedValueOnce([mockProductNoPrice]);

        const req = buildCheckoutRequest({
            items: [{ productId: "prod-noprice", slug: "no-price-product", quantity: 1 }],
        });

        const { POST } = await import("@/app/api/shop/checkout/route");
        const res = await POST(req as unknown as NextRequest);

        expect(res.status).toBe(409);
        const body = await res.json();
        expect(body.code).toBe("STRIPE_PRICE_MISSING");
    });

    it("returns 503 CHECKOUT_NOT_CONFIGURED when Stripe secret key is missing", async () => {
        mockEnv.values.STRIPE_SECRET_KEY = undefined;

        const mockProduct = {
            _id: "prod-config",
            title: "Configured Product",
            slug: "configured-product",
            buyLink: null,
            price: 49,
            format: "digital",
            stripePriceId: "price_configured123",
            editions: [],
        };

        mockSanityFetch.mockResolvedValueOnce([mockProduct]);

        const req = buildCheckoutRequest({
            items: [{ productId: "prod-config", slug: "configured-product", quantity: 1 }],
        });

        const { POST } = await import("@/app/api/shop/checkout/route");
        const res = await POST(req as unknown as NextRequest);

        expect(res.status).toBe(503);
        const body = await res.json();
        expect(body.code).toBe("CHECKOUT_NOT_CONFIGURED");
        expect(body.message).toContain("Checkout is not configured");
        expect(mockStripeCheckoutSessionsCreate).not.toHaveBeenCalled();
    });

    it("passes shipping metadata when item requires shipping", async () => {
        const mockProduct = {
            _id: "prod-shipping",
            title: "Physical Book",
            slug: "physical-book",
            buyLink: null,
            price: 59,
            format: "physical",
            stripePriceId: "price_shipping123",
            editions: [],
        };

        mockSanityFetch.mockResolvedValueOnce([mockProduct]);
        mockStripeCheckoutSessionsCreate.mockResolvedValueOnce({
            url: "https://checkout.stripe.com/session-shipping",
        });

        const req = buildCheckoutRequest({
            items: [
                {
                    productId: "prod-shipping",
                    slug: "physical-book",
                    quantity: 1,
                    fulfillmentType: "physical",
                    requiresShipping: true,
                },
            ],
        });

        const { POST } = await import("@/app/api/shop/checkout/route");
        const res = await POST(req as unknown as NextRequest);

        expect(res.status).toBe(200);
        expect(mockStripeCheckoutSessionsCreate).toHaveBeenCalled();

        const createCall = mockStripeCheckoutSessionsCreate.mock.calls[0][0];
        expect(createCall.shipping_address_collection).toBeDefined();
        expect(createCall.metadata.has_physical).toBe("true");
    });

    it("returns 400 CART_TOO_LARGE when serialization exceeds the complete metadata budget", async () => {
        // Forty canonical items fit the request limit but exceed the bounded 40-part metadata budget.
        const manyItems = Array.from({ length: 40 }, (_, i) => ({
            productId: `${"p".repeat(180)}${i}`,
            slug: `${"s".repeat(180)}${i}`,
            quantity: 1,
        }));

        mockSanityFetch.mockResolvedValueOnce(
            manyItems.map((item) => ({
                _id: item.productId,
                title: `Product ${item.productId}`,
                slug: item.slug,
                buyLink: null,
                price: 10,
                format: "digital",
                stripePriceId: `price_fixture${manyItems.indexOf(item)}`,
                editions: [],
            }))
        );

        const req = buildCheckoutRequest({ items: manyItems });

        const { POST } = await import("@/app/api/shop/checkout/route");
        const res = await POST(req as unknown as NextRequest);

        expect(res.status).toBe(400);
        const body = await res.json();
        expect(body.code).toBe("CART_TOO_LARGE");
    });

    it("returns 429 when rate limit is exceeded", async () => {
        mockQuota.mockResolvedValueOnce({ success: false, remaining: 0, resetTime: Date.now() + 60000 });
        const req = buildCheckoutRequest({
            items: [{ productId: "prod-rl", slug: "rate-limited", quantity: 1 }],
        });

        const { POST } = await import("@/app/api/shop/checkout/route");
        const res = await POST(req as unknown as NextRequest);

        expect(res.status).toBe(429);
        expect((await res.json()).code).toBe("RATE_LIMITED");
        expect(mockSanityFetch).not.toHaveBeenCalled();
        expect(mockStripeCheckoutSessionsCreate).not.toHaveBeenCalled();
    });
});
