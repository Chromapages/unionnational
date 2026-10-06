import { fireEvent, render, screen, waitFor } from "@testing-library/react";
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
vi.mock("@/i18n/navigation", () => ({ Link: ({ onClick, children, ...props }: React.ComponentProps<"a">) => <a {...props} onClick={event => { event.preventDefault(); onClick?.(event); }}>{children}</a> }));

afterEach(() => useCartStore.setState({ items: [], isOpen: false, totalItems: 0, totalPrice: 0 }));

describe("CartSidebar", () => {
    it("restores existing background state and traps focus reentry from outside the drawer", async () => {
        const user = userEvent.setup();
        document.body.style.overflow = "clip";
        render(<><button data-testid="outside" onClick={() => useCartStore.getState().setIsOpen(true)}>Open drawer</button><aside inert>Previously inert</aside><CartSidebar /></>);
        const outside = screen.getByTestId("outside");
        await user.click(outside);
        const close = screen.getByRole("button", { name: "Close shopping cart" });
        outside.focus();
        await user.keyboard("{Tab}");
        expect(close).toHaveFocus();
        outside.focus();
        await user.keyboard("{Shift>}{Tab}{/Shift}");
        expect(screen.getByRole("button", { name: "Continue Shopping" })).toHaveFocus();
        await user.click(close);
        await waitFor(() => expect(outside).toHaveFocus());
        expect(document.body.style.overflow).toBe("clip");
        expect(screen.getByText("Previously inert")).toHaveAttribute("inert");
        document.body.style.overflow = "";
    });
    it("closes the empty drawer through its continue action and overlay", async () => {
        const user = userEvent.setup();
        useCartStore.getState().setIsOpen(true);
        const { container } = render(<CartSidebar />);
        await user.click(screen.getByRole("button", { name: "Continue Shopping" }));
        expect(useCartStore.getState().isOpen).toBe(false);
        useCartStore.getState().setIsOpen(true);
        await screen.findByRole("dialog");
        fireEvent.click(container.querySelector("[data-cart-overlay]")!);
        expect(useCartStore.getState().isOpen).toBe(false);
    });
    it.each([
        { format: "audio", fulfillmentType: "audio", requiresShipping: false, label: "audioEdition", delivery: "Digital delivery" },
        { format: "bundle", fulfillmentType: "bundle", requiresShipping: true, label: "bundleEdition", delivery: "Shipping details" },
        { format: "service", fulfillmentType: "service", requiresShipping: false, label: "serviceEdition", delivery: null },
        { format: "custom", fulfillmentType: undefined, requiresShipping: undefined, label: "resourceEdition", delivery: null },
    ] as const)("preserves configured $format fulfillment without claiming unconfigured delivery", async offer => {
        useCartStore.getState().addItem({ id: "variant", productId: "variant", slug: "the-s-corp-playbook", title: "Approved title — Approved edition", editionName: "Approved edition", price: 20.5, image: "/images/fixture.png", format: offer.format, fulfillmentType: offer.fulfillmentType, requiresShipping: offer.requiresShipping });
        useCartStore.getState().setIsOpen(true);
        const { container } = render(<CartSidebar />);
        expect(await screen.findByRole("dialog")).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "Approved title" })).toBeInTheDocument();
        expect(screen.getByRole("img", { name: "Approved title" })).toBeInTheDocument();
        expect(screen.getByText(offer.label)).toBeInTheDocument();
        expect(screen.getByText("books.scorp.description")).toBeInTheDocument();
        if (offer.delivery) expect(container.querySelector("[data-cart-delivery]")).toHaveTextContent(offer.delivery);
        else expect(container.querySelector("[data-cart-delivery]")).toBeNull();
        expect(container.querySelector("[data-cart-total]")).toHaveAttribute("data-cart-total", "20.5");
    });
    it("decreases quantities, removes a final unit and closes via the full-cart link", async () => {
        const user = userEvent.setup();
        const item = { id: "one", productId: "one", slug: "one", title: "Book without suffix", editionName: "Digital PDF", price: 29, image: "   ", format: "digital" };
        useCartStore.getState().addItem(item);
        useCartStore.getState().addItem(item);
        useCartStore.getState().setIsOpen(true);
        const { container } = render(<CartSidebar />);
        await user.click(screen.getByRole("button", { name: "Decrease quantity for Book without suffix" }));
        expect(container.querySelector("[data-cart-total]")).toHaveAttribute("data-cart-total", "29");
        await user.click(screen.getByRole("button", { name: "Decrease quantity for Book without suffix" }));
        expect(await screen.findByText("Your cart is empty")).toBeInTheDocument();
        useCartStore.getState().addItem(item);
        const fullCart = await screen.findByRole("link", { name: "viewFullCart" });
        fireEvent.click(fullCart);
        expect(useCartStore.getState().isOpen).toBe(false);
    });
    it.each([{ ok: false }, { ok: true }])("retains the cart when checkout lacks a usable redirect %j", async result => {
        vi.mocked(beginCheckout).mockResolvedValueOnce(result);
        useCartStore.getState().addItem({ id: "one", productId: "one", slug: "one", title: "Book", price: 25, image: "", format: "digital" });
        useCartStore.getState().setIsOpen(true);
        render(<CartSidebar />);
        fireEvent.click(screen.getByRole("button", { name: "Proceed to Checkout" }));
        expect(await screen.findByRole("alert")).toHaveTextContent("checkoutError");
        expect(useCartStore.getState().items).toHaveLength(1);
    });
    it("disables repeated submission during checkout and recovers from an exception", async () => {
        let reject!: (error: Error) => void;
        vi.mocked(beginCheckout).mockImplementationOnce(() => new Promise((_resolve, rejected) => { reject = rejected; }));
        useCartStore.getState().addItem({ id: "one", productId: "one", slug: "one", title: "Book", price: 25, image: "", format: "digital" });
        useCartStore.getState().setIsOpen(true);
        render(<CartSidebar />);
        fireEvent.click(screen.getByRole("button", { name: "Proceed to Checkout" }));
        expect(screen.getByRole("button", { name: "startingCheckout" })).toBeDisabled();
        reject(new Error("synthetic checkout outage"));
        expect(await screen.findByRole("alert")).toHaveTextContent("checkoutError");
        expect(screen.getByRole("button", { name: "Proceed to Checkout" })).toBeEnabled();
    });
    it("navigates only after checkout returns a usable success target", async () => {
        const previousHash = window.location.hash;
        vi.mocked(beginCheckout).mockResolvedValueOnce({ ok: true, redirectUrl: "#fixture-checkout" });
        useCartStore.getState().addItem({ id: "one", productId: "one", slug: "one", title: "Book", price: 25, image: "", format: "digital" });
        useCartStore.getState().setIsOpen(true);
        render(<CartSidebar />);
        fireEvent.click(screen.getByRole("button", { name: "Proceed to Checkout" }));
        await waitFor(() => expect(window.location.hash).toBe("#fixture-checkout"));
        expect(screen.queryByRole("alert")).toBeNull();
        expect(useCartStore.getState().items).toHaveLength(1);
        window.location.hash = previousHash;
    });
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
