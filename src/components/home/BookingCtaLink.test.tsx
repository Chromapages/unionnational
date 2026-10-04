import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { ComponentPropsWithoutRef } from "react";
import { BookingCtaLink } from "./BookingCtaLink";

vi.mock("@/i18n/navigation", () => ({
    Link: ({ children, ...props }: ComponentPropsWithoutRef<"a">) => <a {...props}>{children}</a>,
    usePathname: () => "/",
}));
vi.mock("@/lib/analytics/bookingFunnel", () => ({ trackBookingFunnelEvent: vi.fn() }));
afterEach(() => { cleanup(); vi.useRealTimers(); });

describe("BookingCtaLink navigation state", () => {
    const props = { label: "Book", openingLabel: "Opening", externalLabel: "New tab" };
    it("keeps modified and external activations available on the original page", () => {
        const view = render(<BookingCtaLink {...props} href="/book" />);
        fireEvent.click(screen.getByRole("link"), { ctrlKey: true });
        expect(screen.getByRole("link")).toHaveAttribute("data-state", "ready");
        view.rerender(<BookingCtaLink {...props} href="https://example.com/book" />);
        fireEvent.click(screen.getByRole("link"));
        expect(screen.getByRole("link")).toHaveAttribute("data-state", "ready");
    });
    it("recovers when same-tab navigation does not finish", () => {
        vi.useFakeTimers();
        render(<BookingCtaLink {...props} href="/book" />);
        fireEvent.click(screen.getByRole("link"));
        expect(screen.getByRole("link")).toHaveAttribute("data-state", "pending");
        act(() => vi.advanceTimersByTime(10000));
        expect(screen.getByRole("link")).toHaveAttribute("data-state", "ready");
    });
});
