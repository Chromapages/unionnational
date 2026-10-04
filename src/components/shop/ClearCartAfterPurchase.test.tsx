import { cleanup, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { useCartStore } from "@/store/useCartStore";
import { ClearCartAfterPurchase } from "./ClearCartAfterPurchase";

const purchased = { productId: "book", editionId: "digital", quantity: 1 };
const cartItem = { id: "book::digital", productId: "book", editionId: "digital", slug: "book", title: "Book", price: 27, image: "", format: "digital" };

describe("cart completion", () => {
    beforeEach(() => { localStorage.clear(); useCartStore.getState().clearCart(); });
    afterEach(cleanup);

    it("removes purchased quantities while preserving unrelated and later additions", () => {
        useCartStore.getState().addItem(cartItem);
        useCartStore.getState().addItem(cartItem);
        useCartStore.getState().addItem({ ...cartItem, id: "other::digital", productId: "other" });
        render(<ClearCartAfterPurchase sessionId="cs_quantity" purchasedItems={[purchased]} />);
        expect(useCartStore.getState().items.map(item => [item.id, item.quantity])).toEqual([["book::digital", 1], ["other::digital", 1]]);
    });

    it("does not remove a new cart when the same completed order is revisited", () => {
        useCartStore.getState().addItem(cartItem);
        const firstVisit = render(<ClearCartAfterPurchase sessionId="cs_revisit" purchasedItems={[purchased]} />);
        expect(useCartStore.getState().items).toHaveLength(0);
        firstVisit.unmount();
        useCartStore.getState().addItem(cartItem);
        render(<ClearCartAfterPurchase sessionId="cs_revisit" purchasedItems={[purchased]} />);
        expect(useCartStore.getState().items).toHaveLength(1);
    });

    it("preserves the cart when verified order items are missing", () => {
        useCartStore.getState().addItem(cartItem);
        render(<ClearCartAfterPurchase sessionId="cs_no_items" purchasedItems={[]} />);
        expect(useCartStore.getState().items).toHaveLength(1);
    });
});
