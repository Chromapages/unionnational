import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { ReactNode } from "react";
import { useCartStore } from "@/store/useCartStore";
import { CartPageClient } from "./CartPageClient";

const checkout = vi.hoisted(() => vi.fn());
vi.mock("next-intl", () => ({ useLocale: () => "en", useTranslations: () => (key: string) => key }));
vi.mock("next/image", () => ({ default: ({ src, alt, sizes }: { src: string; alt: string; sizes?: string }) => <img src={src} alt={alt} sizes={sizes} /> }));
vi.mock("@/i18n/navigation", () => ({ Link: ({ children, href }: { children: ReactNode; href: string }) => <a href={href}>{children}</a>, useRouter: () => ({ push: vi.fn() }) }));
vi.mock("@/lib/shop/checkout-client", () => ({ beginCheckout: checkout }));
vi.mock("@/components/seo/MetaPixel", () => ({ trackMetaEvent: vi.fn() }));

describe("full cart controls", () => {
    beforeEach(() => {
        checkout.mockReset().mockResolvedValue({ ok: false, message: "Please check out with fewer resources." });
        useCartStore.getState().clearCart();
        useCartStore.getState().addItem({ id: "book::digital", productId: "book", slug: "book", title: "Book", price: 27, image: "/book.png", format: "digital" });
    });
    afterEach(cleanup);

    it("announces the actionable checkout failure", async () => {
        render(<CartPageClient />);
        fireEvent.click(screen.getByRole("button", { name: "checkout" }));
        await waitFor(() => expect(screen.getByRole("alert")).toHaveTextContent("Please check out with fewer resources."));
    });

    it("uses 44px quantity controls and a fixed thumbnail sizes hint", () => {
        render(<CartPageClient />);
        expect(screen.getByRole("button", { name: "decreaseQuantity" })).toHaveClass("min-h-11", "min-w-11");
        expect(screen.getByRole("button", { name: "increaseQuantity" })).toHaveClass("min-h-11", "min-w-11");
        expect(screen.getByRole("img", { name: "Book" })).toHaveAttribute("sizes", "80px");
    });
});
