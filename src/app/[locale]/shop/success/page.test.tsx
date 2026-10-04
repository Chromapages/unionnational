import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

const retrieve = vi.fn();
const completedCart = vi.hoisted(() => vi.fn());
vi.mock("@/lib/stripe", () => ({ getStripe: () => ({ checkout: { sessions: { retrieve } } }) }));
vi.mock("next-intl/server", () => ({ getTranslations: async () => (key: string) => key }));
vi.mock("@/i18n/navigation", () => ({ Link: ({ children, href }: React.PropsWithChildren<{ href: string }>) => <a href={href}>{children}</a> }));
vi.mock("@/components/shop/ClearCartAfterPurchase", () => ({ ClearCartAfterPurchase: (props: unknown) => { completedCart(props); return <span data-cart-cleared />; } }));
vi.mock("@/components/seo/ShopPurchaseEvent", () => ({ ShopPurchaseEvent: () => <span data-purchase-tracked /> }));

const page = async (sessionId?: string) => {
    const { default: ShopSuccessPage } = await import("./page");
    return renderToStaticMarkup(await ShopSuccessPage({ searchParams: Promise.resolve({ session_id: sessionId }) }));
};

describe("shop success payment states", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        retrieve.mockResolvedValue({
            id: "cs_order", payment_status: "paid", status: "complete",
            amount_total: 4900, currency: "usd",
            metadata: { fulfillment_status: "pending", order_source: "unt_bookstore" },
            line_items: { data: [] },
        });
    });

    it("keeps the cart and tracking untouched when no session can be verified", async () => {
        const html = await page();
        expect(html).toContain("missingTitle");
        expect(html).toContain('id="main-content"');
        expect(html).not.toContain("data-cart-cleared");
        expect(html).not.toContain("data-purchase-tracked");
    });

    it("keeps unpaid and expired sessions out of the purchase state", async () => {
        retrieve.mockResolvedValueOnce({ id: "cs_order", payment_status: "unpaid", status: "open", metadata: { order_source: "unt_bookstore" } });
        const unpaid = await page("cs_order");
        expect(unpaid).toContain("pendingTitle");
        expect(unpaid).not.toContain("data-cart-cleared");
        expect(unpaid).not.toContain("data-purchase-tracked");
        retrieve.mockResolvedValueOnce({ id: "cs_order", payment_status: "unpaid", status: "expired", metadata: { order_source: "unt_bookstore" } });
        const expired = await page("cs_order");
        expect(expired).toContain("expiredTitle");
        expect(expired).not.toContain("data-purchase-tracked");
    });

    it("confirms, clears, and tracks only a paid session", async () => {
        const html = await page("cs_order");
        expect(html).toContain("paidTitle");
        expect(html).toContain("fulfillmentPending");
        expect(html).toContain("data-cart-cleared");
        expect(html).toContain("data-purchase-tracked");
        const { metadata } = await import("./page");
        expect(metadata.robots).toEqual({ index: false, follow: false });
    });

    it("does not clear the cart for an unrelated paid checkout", async () => {
        retrieve.mockResolvedValueOnce({
            id: "cs_other", payment_status: "paid", status: "complete", metadata: { order_source: "another_flow" },
        });
        const html = await page("cs_other");
        expect(html).toContain("missingTitle");
        expect(html).not.toContain("data-cart-cleared");
        expect(html).not.toContain("data-purchase-tracked");
    });

    it("passes verified purchased quantities to cart completion", async () => {
        retrieve.mockResolvedValueOnce({
            id: "cs_order_items", payment_status: "paid", status: "complete", amount_total: 2700,
            metadata: { order_source: "unt_bookstore", items: JSON.stringify([{ p: "book", e: "digital", q: 2 }]) },
            line_items: { data: [] },
        });
        await page("cs_order_items");
        expect(completedCart).toHaveBeenCalledWith({
            sessionId: "cs_order_items", purchasedItems: [{ productId: "book", editionId: "digital", quantity: 2 }],
        });
    });
});
