import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useCartStore } from "@/store/useCartStore";
import { beginCheckout } from "@/lib/shop/checkout-client";
import { CartSidebar } from "./CartSidebar";

vi.mock("next-intl", () => ({ useTranslations: () => (key: string, values: Record<string, string | number> = {}) => {
    const copy: Record<string, string> = { title: "Shopping Cart", empty: "Your cart is empty", continueShopping: "Continue Shopping", closeCart: "Close shopping cart", removeItem: "Remove {title} from cart", decreaseQuantity: "Decrease quantity for {title}", increaseQuantity: "Increase quantity for {title}", itemCount: "{count} items in shopping cart", digitalDelivery: "Digital delivery", printDelivery: "Shipping details", included: "Included", checkout: "Proceed to Checkout" };
    return (copy[key] || key).replace(/\{(\w+)\}/g, (_, name: string) => String(values[name] ?? ""));
} }));
vi.mock("@/lib/shop/checkout-client", () => ({ beginCheckout: vi.fn() }));
vi.mock("@/components/seo/MetaPixel", () => ({ trackMetaEvent: vi.fn() }));

afterEach(() => useCartStore.setState({ items: [], isOpen: false, totalItems: 0, totalPrice: 0 }));

describe("CartSidebar", () => {
    it("keeps focus in the empty drawer and returns it after Escape", async () => {
        const user = userEvent.setup();
        render(<><button type="button" onClick={() => useCartStore.getState().setIsOpen(true)}>Open cart</button><CartSidebar /></>);
        const trigger = screen.getByRole("button", { name: "Open cart" });
        await user.click(trigger);
        expect(await screen.findByRole("dialog", { name: "Shopping Cart" })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Close shopping cart" })).toHaveFocus();
        expect(trigger).toHaveAttribute("inert");
        await user.keyboard("{Shift>}{Tab}{/Shift}");
        expect(screen.getByRole("button", { name: "Continue Shopping" })).toHaveFocus();
        await user.keyboard("{Tab}");
        expect(screen.getByRole("button", { name: "Close shopping cart" })).toHaveFocus();
        await user.keyboard("{Escape}");
        await waitFor(() => expect(trigger).toHaveFocus());
        expect(trigger).not.toHaveAttribute("inert");
    });

    it("keeps full-cart controls named and announces checkout failure without closing", async () => {
        const user = userEvent.setup();
        vi.mocked(beginCheckout).mockResolvedValueOnce({ ok: false, message: "Checkout unavailable" });
        useCartStore.getState().addItem({ id: "book", productId: "book", slug: "book", title: "Tax Book", price: 25, image: "", format: "digital" });
        useCartStore.getState().setIsOpen(true);
        render(<CartSidebar />);
        expect(await screen.findByRole("dialog", { name: "Shopping Cart" })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Remove Tax Book from cart" })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Decrease quantity for Tax Book" })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Increase quantity for Tax Book" })).toBeInTheDocument();
        await user.click(screen.getByRole("button", { name: /checkout/i }));
        expect(await screen.findByRole("alert")).toHaveTextContent("Checkout unavailable");
        expect(screen.getByRole("dialog")).toBeInTheDocument();
    });
    it("updates line totals and switches mixed shipping to digital delivery after removal", async () => {
        const user = userEvent.setup();
        useCartStore.getState().addItem({ id: "pdf", productId: "pdf", slug: "pdf", title: "Digital book", price: 29, image: "", format: "digital", fulfillmentType: "digital", requiresShipping: false });
        useCartStore.getState().addItem({ id: "print", productId: "print", slug: "print", title: "Printed book", price: 39, image: "", format: "physical", fulfillmentType: "physical", requiresShipping: true });
        useCartStore.getState().setIsOpen(true);
        const { container } = render(<CartSidebar />);
        expect(await screen.findByRole("dialog", { name: "Shopping Cart" })).toBeInTheDocument();
        expect(container.querySelector("[data-cart-total]")).toHaveAttribute("data-cart-total", "68");
        expect(container.querySelector("[data-cart-delivery]")).toHaveTextContent("Shipping details");
        await user.click(screen.getByRole("button", { name: "Remove Printed book from cart" }));
        expect(container.querySelector("[data-cart-total]")).toHaveAttribute("data-cart-total", "29");
        expect(container.querySelector("[data-cart-delivery]")).toHaveTextContent("Digital delivery");
        await user.click(screen.getByRole("button", { name: "Increase quantity for Digital book" }));
        expect(container.querySelector("[data-cart-line-total]")).toHaveAttribute("data-cart-line-total", "58");
        expect(container.querySelector("[data-cart-total]")).toHaveAttribute("data-cart-total", "58");
    });
});
