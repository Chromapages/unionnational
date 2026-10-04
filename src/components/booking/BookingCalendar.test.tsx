import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { ReactNode } from "react";
import { BookingCalendar } from "./BookingCalendar";

vi.mock("next-intl", () => ({ useTranslations: () => (key: string) => key }));
vi.mock("next/script", () => ({ default: () => null }));
vi.mock("@/i18n/navigation", () => ({ Link: ({ href, children }: { href: string; children: ReactNode }) => <a href={href}>{children}</a> }));
vi.mock("@/components/seo/GhlExternalTracking", () => ({ GhlExternalTracking: () => null }));
vi.mock("@/lib/analytics/bookingFunnel", () => ({ trackBookingFunnelEvent: vi.fn() }));

afterEach(() => { cleanup(); vi.useRealTimers(); });

describe("BookingCalendar provider integration", () => {
    it("offers recovery when the provider never reports readiness", () => {
        vi.useFakeTimers();
        const { container } = render(<BookingCalendar />);
        const frame = screen.getByTitle("iframeTitle");
        act(() => vi.advanceTimersByTime(20000));
        expect(container.querySelector("[data-ghl-calendar]")?.getAttribute("data-scheduler-state")).toBe("error");
        expect(screen.getByRole("button", { name: "retry" })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: "contact" })).toBeInTheDocument();
        fireEvent.load(frame);
        expect(screen.getByTitle("iframeTitle")).toBe(frame);
        expect(screen.queryByRole("alert")).toBeNull();
    });
    it("preserves campaign attribution without putting query text in the iframe ID", () => {
        render(<BookingCalendar campaignParams={{ utm_source: "booking-audit" }} />);
        const frame = screen.getByTitle("iframeTitle") as HTMLIFrameElement;
        expect(frame.id).toBe("sBGopjvf9OdyrfgWqOJx-calendar");
        expect(new URL(frame.src).searchParams.get("utm_source")).toBe("booking-audit");
    });

    it("accepts readiness only from the embedded provider window and origin", () => {
        const { container } = render(<BookingCalendar />);
        const frame = screen.getByTitle("iframeTitle") as HTMLIFrameElement;
        const scheduler = container.querySelector("[data-ghl-calendar]");
        act(() => window.dispatchEvent(new MessageEvent("message", { origin: "https://example.com", source: frame.contentWindow, data: ["iframeLoaded"] })));
        expect(scheduler?.getAttribute("data-scheduler-state")).toBe("loading");
        act(() => window.dispatchEvent(new MessageEvent("message", { origin: "https://link.agent-crm.com", source: frame.contentWindow, data: ["iframeLoaded"] })));
        expect(scheduler?.getAttribute("data-scheduler-state")).toBe("ready");
    });

    it("retains the same iframe and entered provider state after a late load error", () => {
        const { container } = render(<BookingCalendar />);
        const frame = screen.getByTitle("iframeTitle");
        fireEvent.load(frame);
        fireEvent.error(frame);
        expect(screen.getByTitle("iframeTitle")).toBe(frame);
        expect(container.querySelector("[data-ghl-calendar]")?.getAttribute("data-scheduler-state")).toBe("ready");
        expect(screen.queryByRole("alert")).toBeNull();
    });
});
