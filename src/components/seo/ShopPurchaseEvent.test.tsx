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
afterEach(cleanup);

it("counts one paid order once across remounts and stored refresh state", () => {
    const first = render(<ShopPurchaseEvent orderId="cs_dedupe_a" total={49} />);
    expect(trackMetaEvent).toHaveBeenCalledTimes(1);
    first.unmount();
    render(<ShopPurchaseEvent orderId="cs_dedupe_a" total={49} />);
    expect(trackMetaEvent).toHaveBeenCalledTimes(1);
    localStorage.setItem("shop-purchase:cs_dedupe_b", "1");
    render(<ShopPurchaseEvent orderId="cs_dedupe_b" total={49} />);
    expect(trackMetaEvent).toHaveBeenCalledTimes(1);
});
