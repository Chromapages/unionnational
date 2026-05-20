import { beforeEach, describe, expect, it } from "vitest";
import { useCartStore } from "@/store/useCartStore";

const baseItem = {
    id: "construction::digital",
    productId: "construction",
    editionId: "digital",
    editionName: "Digital PDF",
    slug: "the-money-making-blueprint-for-construction-companies",
    title: "The Money-Making Blueprint - Digital PDF",
    price: 29,
    image: "/images/og-construction.png",
    format: "digital",
};

describe("useCartStore", () => {
    beforeEach(() => {
        useCartStore.getState().clearCart();
    });

    it("refreshes stale line item metadata when an existing item is added again", () => {
        useCartStore.getState().addItem({
            ...baseItem,
            format: "audio",
            editionName: "Audiobook",
            stripePriceId: "price_1T2dAkBBqB7ETKuVZCP3OsnA",
        });

        useCartStore.getState().addItem({
            ...baseItem,
            stripePriceId: "price_1TOlYGBBqB7ETKuVjY3QWF1m",
        });

        expect(useCartStore.getState().items).toEqual([
            expect.objectContaining({
                id: "construction::digital",
                editionName: "Digital PDF",
                format: "digital",
                stripePriceId: "price_1TOlYGBBqB7ETKuVjY3QWF1m",
                quantity: 2,
            }),
        ]);
    });

    it("can remove all cart lines for a product before adding a selected edition", () => {
        useCartStore.getState().addItem(baseItem);
        useCartStore.getState().addItem({
            ...baseItem,
            id: "construction::audio",
            editionId: "audio",
            editionName: "Audiobook",
            format: "audio",
            stripePriceId: "price_1T2dAkBBqB7ETKuVZCP3OsnA",
        });

        useCartStore.getState().removeProductItems("construction");

        expect(useCartStore.getState().items).toEqual([]);
        expect(useCartStore.getState().totalItems).toBe(0);
        expect(useCartStore.getState().totalPrice).toBe(0);
    });
});
