import React from "react";
import { render, cleanup } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { ShopPurchaseEvent } from "./ShopPurchaseEvent";

const { trackMetaEvent } = vi.hoisted(() => ({ trackMetaEvent: vi.fn() }));
vi.mock("./MetaPixel", () => ({ trackMetaEvent }));

beforeEach(() => {
    trackMetaEvent.mockClear();
    localStorage.clear();
});

it("never sends a raw Stripe receipt identifier to optional tracking", () => {
    render(<ShopPurchaseEvent orderId="cs_test_sensitiveCredential" total={49} />);
    expect(trackMetaEvent).not.toHaveBeenCalled();
});
afterEach(cleanup);

it("counts one paid order once across remounts and stored refresh state", () => {
    const first = render(<ShopPurchaseEvent orderId="order_aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" total={49} />);
    expect(trackMetaEvent).toHaveBeenCalledTimes(1);
    first.unmount();
    render(<ShopPurchaseEvent orderId="order_aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" total={49} />);
    expect(trackMetaEvent).toHaveBeenCalledTimes(1);
    localStorage.setItem("shop-purchase:order_bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb", "1");
    render(<ShopPurchaseEvent orderId="order_bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb" total={49} />);
    expect(trackMetaEvent).toHaveBeenCalledTimes(1);
});
