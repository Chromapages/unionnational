import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { issueReceiptCookie, purchaseReference } from "@/lib/shop/payment-security";
import { cookies, headers } from "next/headers";
import { getStripe } from "@/lib/stripe";
import { checkRateLimit } from "@/lib/security/rate-limiter";
import ShopSuccessPage from "./page";

const retrieve = vi.fn();
const completedCart = vi.hoisted(() => vi.fn());
let proof: string | undefined;
const secret = "fixture-receipt-secret";
vi.mock("next/headers", () => ({ cookies: vi.fn(async () => ({ get: () => proof ? { value: proof } : undefined })), headers: vi.fn(async () => new Headers()) }));
vi.mock("@/lib/config/env", () => ({ getEnv: () => "fixture-receipt-secret" }));
vi.mock("@/lib/security/rate-limiter", () => ({ getClientIdentifier: () => "fixture", checkRateLimit: vi.fn(async () => ({ success: true })) }));
vi.mock("@/lib/security/lead-ingress", () => ({ leadRequesterKey: () => "fixture" }));
vi.mock("next/navigation", () => ({ redirect: (url: string) => { throw new Error(`REDIRECT:${url}`); } }));
vi.mock("@/lib/stripe", () => ({ getStripe: vi.fn(() => ({ checkout: { sessions: { retrieve } } })) }));
vi.mock("next-intl/server", () => ({ getTranslations: async () => (key: string) => key }));
vi.mock("@/i18n/navigation", () => ({ Link: ({ children, href }: React.PropsWithChildren<{ href: string }>) => <a href={href}>{children}</a> }));
vi.mock("@/components/shop/ClearCartAfterPurchase", () => ({ ClearCartAfterPurchase: (props: unknown) => { completedCart(props); return <span data-cart-cleared />; } }));
vi.mock("@/components/seo/ShopPurchaseEvent", () => ({ ShopPurchaseEvent: () => <span data-purchase-tracked /> }));

const page = async (sessionId?: string) => {
    const { default: ShopSuccessPage } = await import("./page");
    proof = sessionId ? issueReceiptCookie(sessionId, secret) : undefined;
    return renderToStaticMarkup(await ShopSuccessPage({ params: Promise.resolve({ locale: "en" }), searchParams: Promise.resolve({ receipt: sessionId ? purchaseReference(sessionId, secret) : undefined }) }));
};

describe("shop success payment states", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.stubEnv("SHOP_PAYMENTS_ENABLED", "true");
        retrieve.mockResolvedValue({
            id: "cs_test_order", payment_status: "paid", status: "complete",
            amount_total: 4900, currency: "usd",
            metadata: { fulfillment_status: "pending", order_source: "unt_bookstore" },
            line_items: { data: [] },
        });
    });

    afterEach(() => vi.unstubAllEnvs());

    it.each(["en", "es"])("redirects disabled %s receipts to contact without accessing payment dependencies", async (locale) => {
        vi.stubEnv("SHOP_PAYMENTS_ENABLED", undefined);
        const sessionId = "cs_test_disabled";
        proof = issueReceiptCookie(sessionId, secret);
        await expect(ShopSuccessPage({
            params: Promise.resolve({ locale }),
            searchParams: Promise.resolve({ session_id: sessionId, receipt: purchaseReference(sessionId, secret) }),
        })).rejects.toMatchObject({ message: `REDIRECT:/${locale}/contact` });
        expect(cookies).not.toHaveBeenCalled();
        expect(headers).not.toHaveBeenCalled();
        expect(checkRateLimit).not.toHaveBeenCalled();
        expect(getStripe).not.toHaveBeenCalled();
    });

    it("keeps the cart and tracking untouched when no session can be verified", async () => {
        const html = await page();
        expect(html).toContain("missingTitle");
        expect(html).toContain('id="main-content"');
        expect(html).not.toContain("data-cart-cleared");
        expect(html).not.toContain("data-purchase-tracked");
    });

    it("keeps unpaid and expired sessions out of the purchase state", async () => {
        retrieve.mockResolvedValueOnce({ id: "cs_test_order", payment_status: "unpaid", status: "open", metadata: { order_source: "unt_bookstore" } });
        const unpaid = await page("cs_test_order");
        expect(unpaid).toContain("pendingTitle");
        expect(unpaid).not.toContain("data-cart-cleared");
        expect(unpaid).not.toContain("data-purchase-tracked");
        retrieve.mockResolvedValueOnce({ id: "cs_test_order", payment_status: "unpaid", status: "expired", metadata: { order_source: "unt_bookstore" } });
        const expired = await page("cs_test_order");
        expect(expired).toContain("expiredTitle");
        expect(expired).not.toContain("data-purchase-tracked");
    });

    it("confirms, clears, and tracks only a paid session", async () => {
        const html = await page("cs_test_order");
        expect(html).toContain("paidTitle");
        expect(html).toContain("fulfillmentPending");
        expect(html).toContain("data-cart-cleared");
        expect(html).toContain("data-purchase-tracked");
        const { metadata } = await import("./page");
        expect(metadata.robots).toEqual({ index: false, follow: false });
    });

    it("does not clear the cart for an unrelated paid checkout", async () => {
        retrieve.mockResolvedValueOnce({
            id: "cs_test_other", payment_status: "paid", status: "complete", metadata: { order_source: "another_flow" },
        });
        const html = await page("cs_test_other");
        expect(html).toContain("missingTitle");
        expect(html).not.toContain("data-cart-cleared");
        expect(html).not.toContain("data-purchase-tracked");
    });

    it("passes verified purchased quantities to cart completion", async () => {
        retrieve.mockResolvedValueOnce({
            id: "cs_test_order_items", payment_status: "paid", status: "complete", amount_total: 2700,
            metadata: { order_source: "unt_bookstore", items: JSON.stringify([{ p: "book", e: "digital", q: 2 }]) },
            line_items: { data: [] },
        });
        await page("cs_test_order_items");
        expect(completedCart).toHaveBeenCalledWith({
            sessionId: purchaseReference("cs_test_order_items", secret), purchasedItems: [{ productId: "book", editionId: "digital", quantity: 2 }],
        });
    });
    it("redirects raw session credentials before rendering any tracking HTML", async () => {
        const { default: ShopSuccessPage } = await import("./page");
        const id = "cs_test_redirect";
        proof = issueReceiptCookie(id, secret);
        await expect(ShopSuccessPage({ params: Promise.resolve({ locale: "es" }), searchParams: Promise.resolve({ session_id: id }) })).rejects.toThrow(`REDIRECT:/es/shop/success?receipt=${purchaseReference(id, secret)}`);
        expect(retrieve).not.toHaveBeenCalled();
        proof = undefined;
        await expect(ShopSuccessPage({ params: Promise.resolve({ locale: "en" }), searchParams: Promise.resolve({ session_id: "../../balance" }) })).rejects.toThrow("REDIRECT:/en/shop/success");
        expect(retrieve).not.toHaveBeenCalled();
    });
    it("does not call Stripe when another browser has only a receipt reference", async () => {
        const { default: ShopSuccessPage } = await import("./page");
        proof = undefined;
        const html = renderToStaticMarkup(await ShopSuccessPage({ params: Promise.resolve({ locale: "en" }), searchParams: Promise.resolve({ receipt: purchaseReference("cs_test_otherBuyer", secret) }) }));
        expect(html).toContain("missingTitle");
        expect(retrieve).not.toHaveBeenCalled();
    });
});
