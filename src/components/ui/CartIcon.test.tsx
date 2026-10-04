import { act, fireEvent, render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useCartStore } from "@/store/useCartStore";
import { CartIcon } from "./CartIcon";

vi.mock("next/navigation", () => ({ usePathname: () => "/shop" }));

afterEach(() => {
    act(() => useCartStore.setState({ items: [], totalItems: 0, totalPrice: 0, isOpen: false }));
});

describe("CartIcon", () => {
    it("keeps one live count announcement when items are added and removed", () => {
        render(
            <NextIntlClientProvider locale="en" messages={{ Shop: { Cart: {
                openCart: "Open shopping cart",
                itemCount: "{count, plural, =0 {Shopping cart is empty} one {# item in shopping cart} other {# items in shopping cart}}",
            } } }}>
                <CartIcon />
            </NextIntlClientProvider>
        );

        const status = screen.getByRole("status");
        expect(status).toHaveAttribute("aria-live", "polite");
        expect(status).toHaveTextContent("Shopping cart is empty");

        act(() => useCartStore.setState({ totalItems: 2 }));
        expect(screen.getByRole("status")).toBe(status);
        expect(status).toHaveTextContent("2 items in shopping cart");

        act(() => useCartStore.setState({ totalItems: 0 }));
        expect(screen.getByRole("status")).toBe(status);
        expect(status).toHaveTextContent("Shopping cart is empty");

        const button = screen.getByRole("button", { name: "Open shopping cart" });
        button.focus();
        expect(button).toHaveFocus();
        fireEvent.click(button);
        expect(useCartStore.getState().isOpen).toBe(true);
    });
});
