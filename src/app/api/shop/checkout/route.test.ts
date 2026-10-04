import { beforeEach, expect, it, vi } from "vitest";
import type { NextRequest } from "next/server";

const createSession = vi.fn();
vi.mock("@/lib/security/rate-limiter", () => ({ getClientIdentifier: () => "127.0.0.1", checkRateLimit: async () => ({ success: true, remaining: 29, resetTime: Date.now() + 60000 }) }));
vi.mock("@/lib/stripe", () => ({ getStripe: () => ({ checkout: { sessions: { create: createSession } } }) }));
vi.mock("@/lib/config/env", () => ({
    publicEnv: { baseUrl: "https://unt.example.test" },
    getEnv: (key: string) => key === "STRIPE_SECRET_KEY" ? "sk_test_only" : undefined,
}));
vi.mock("@/sanity/lib/client", () => ({
    client: { fetch: async () => [{ _id: "product-1", slug: "book" }] },
}));
vi.mock("@/lib/shop/checkout", async (importOriginal) => ({
    ...await importOriginal<typeof import("@/lib/shop/checkout")>(),
    CHECKOUT_PRODUCTS_QUERY: "test",
    resolveCheckoutItem: () => ({
        productId: "product-1", slug: "book", quantity: 1, stripePriceId: "price_test",
        fulfillmentType: "digital", requiresShipping: false,
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
    createSession.mockReset().mockResolvedValue({ url: "https://checkout.stripe.test/session" });
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
    const response = await POST(new Request("https://unt.example.test/api/shop/checkout", { method: "POST", body: "x".repeat(32_769) }) as NextRequest);
    expect(response.status).toBe(413);
    expect(createSession).not.toHaveBeenCalled();
});
