import { beforeEach, expect, it, vi } from "vitest";
import { beginCheckout } from "./checkout-client";
import type { CartLineItem } from "./types";

const item: CartLineItem = {
    id: "book", productId: "book", slug: "book", title: "Book",
    price: 49, image: "", format: "digital", quantity: 1,
};

beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue(new Response(JSON.stringify({ ok: true, redirectUrl: "https://stripe.example.test" })));
});

it.each(["en", "es"])("sends the %s page locale into checkout", async (locale) => {
    document.documentElement.lang = locale;
    await beginCheckout([item]);
    const [, options] = vi.mocked(global.fetch).mock.calls[0];
    expect(JSON.parse(String(options?.body)).locale).toBe(locale);
});
