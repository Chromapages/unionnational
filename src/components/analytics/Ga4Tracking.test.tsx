import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { Ga4ClientConfig } from "@/lib/analytics/ga4-config";
import type { AnchorHTMLAttributes } from "react";

const route = vi.hoisted(() => ({ path: "/en/about", query: "", ready: [] as Array<() => void> }));
vi.mock("next/navigation", () => ({ usePathname: () => route.path, useSearchParams: () => new URLSearchParams(route.query) }));
vi.mock("next/script", () => ({ default: ({ src, nonce, onReady }: { src: string; nonce: string; onReady: () => void }) => {
    route.ready.push(onReady); return <div data-testid="google-script-fixture" data-src={src} data-nonce={nonce} />;
} }));
vi.mock("@/i18n/navigation", () => ({ usePathname: () => route.path, Link: (props: AnchorHTMLAttributes<HTMLAnchorElement>) => <a {...props} /> }));

const config: Ga4ClientConfig = { measurementId: "G-FIXTURE123", policy: { origin: "http://localhost:3000", approvedPageKeys: ["about", "team"], campaigns: { sources: [], mediums: [], campaigns: [] } } };
beforeEach(() => {
    vi.resetModules(); vi.clearAllMocks(); localStorage.clear(); sessionStorage.clear(); route.path = "/en/about"; route.query = ""; route.ready = [];
    vi.doMock("@/lib/analytics/ga4-client", async load => ({ ...await load<object>(), isolateGa4Document: vi.fn() }));
    window.history.replaceState({}, "", "/en/about");
    delete (window as Window & { untGa4Layer?: unknown[] }).untGa4Layer;
    delete (window as Window & { gtag?: unknown }).gtag;
    delete (window as unknown as Record<string, unknown>)["ga-disable-G-FIXTURE123"];
});
afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.useRealTimers(); });

describe("gated GA4 client fixtures", () => {
    it("records the source booking CTA before isolating the excluded destination", async () => {
        const { setGa4Consent } = await import("@/lib/analytics/ga4-consent"); setGa4Consent(true);
        const { Ga4Tracking } = await import("./Ga4Tracking");
        const { BookingCtaLink } = await import("@/components/home/BookingCtaLink");
        const { isolateGa4Document } = await import("@/lib/analytics/ga4-client");
        render(<><BookingCtaLink href="/book" label="Book a call" openingLabel="Opening" externalLabel="External" placement="about_final_cta" /><Ga4Tracking config={config} nonce="fixture" locale="en" /></>);
        act(() => route.ready.forEach(finish => finish()));
        fireEvent.click(screen.getByRole("link", { name: "Book a call" }));
        expect(isolateGa4Document).not.toHaveBeenCalled();
        await act(async () => { await new Promise(resolve => setTimeout(resolve, 0)); });
        const commands = ((window as Window & { untGa4Layer?: IArguments[] }).untGa4Layer || []).map(item => Array.from(item));
        expect(commands.filter(command => command[1] === "strategy_call_cta_activated")).toHaveLength(1);
        expect(isolateGa4Document).toHaveBeenCalledWith(expect.stringContaining("/book"));
    });
    it("rechecks a renewed cross-tab grant before its old expiry timer revokes it", async () => {
        vi.useFakeTimers(); vi.setSystemTime(new Date("2026-10-06T12:00:00Z"));
        const { GA4_CONSENT_KEY, getGa4Consent } = await import("@/lib/analytics/ga4-consent");
        const grant = (duration: number) => localStorage.setItem(GA4_CONSENT_KEY, JSON.stringify({ version: 1, purpose: "ga4_analytics", allowed: true, grantedAt: Date.now(), expiresAt: Date.now() + duration }));
        grant(1000);
        const { Ga4Tracking } = await import("./Ga4Tracking");
        render(<Ga4Tracking config={config} nonce="fixture" locale="en" />);
        act(() => { vi.advanceTimersByTime(500); grant(2000); window.dispatchEvent(new StorageEvent("storage", { key: GA4_CONSENT_KEY })); vi.advanceTimersByTime(600); });
        expect(getGa4Consent()).toBe(true);
        act(() => { vi.advanceTimersByTime(1500); });
        expect(getGa4Consent()).toBe(false);
    });
    it("mounts nothing when activation is off and does not treat legacy consent as GA4 consent", async () => {
        const { Ga4Tracking } = await import("./Ga4Tracking");
        const view = render(<Ga4Tracking config={null} nonce="fixture-nonce" locale="en" />);
        expect(view.container).toBeEmptyDOMElement();
        localStorage.setItem("unt-optional-tracking", JSON.stringify({ version: 1, allowed: true, expiresAt: Date.now() + 5000 }));
        view.rerender(<Ga4Tracking config={config} nonce="fixture-nonce" locale="en" />);
        expect(screen.queryByTestId("google-script-fixture")).toBeNull();
        expect((window as Window & { untGa4Layer?: unknown[] }).untGa4Layer).toBeUndefined();
    });
    it("requires nonce and explicit purpose consent, with a separate bounded Google layer", async () => {
        const { setGa4Consent } = await import("@/lib/analytics/ga4-consent");
        setGa4Consent(true);
        const { Ga4Tracking } = await import("./Ga4Tracking");
        const view = render(<Ga4Tracking config={config} locale="en" />);
        expect(screen.queryByTestId("google-script-fixture")).toBeNull();
        view.rerender(<Ga4Tracking config={config} nonce="fixture-nonce" locale="en" />);
        expect(screen.getByTestId("google-script-fixture")).toHaveAttribute("data-nonce", "fixture-nonce");
        expect(screen.getByTestId("google-script-fixture")).toHaveAttribute("data-src", expect.stringContaining("l=untGa4Layer"));
        const browser = window as Window & { untGa4Layer?: IArguments[]; gtag?: unknown };
        expect(browser.gtag).toBeUndefined();
        expect(browser.untGa4Layer?.length).toBeLessThan(32);
        act(() => route.ready.forEach(finish => finish()));
        const commands = browser.untGa4Layer?.map(command => Array.from(command)) || [];
        expect(commands.filter(command => command[1] === "page_view")).toHaveLength(1);
        expect(commands.find(command => command[0] === "config")?.[2]).toMatchObject({ send_page_view: false, page_location: "http://localhost:3000/en/about", page_referrer: "" });
    });
    it("withholds sensitive page DOM even while a Google loader is pending", async () => {
        const { setGa4Consent } = await import("@/lib/analytics/ga4-consent"); setGa4Consent(true);
        const { Ga4Tracking } = await import("./Ga4Tracking"); const { Ga4Boundary } = await import("./Ga4Boundary");
        const privateRender = vi.fn();
        function PrivatePage() { privateRender(); return <input aria-label="Private fixture" />; }
        const view = render(<><Ga4Boundary locale="en"><p>Eligible fixture</p></Ga4Boundary><Ga4Tracking config={config} nonce="fixture" locale="en" /></>);
        route.path = "/en/contact"; window.history.replaceState({}, "", "/en/contact");
        view.rerender(<><Ga4Boundary locale="en"><PrivatePage /></Ga4Boundary><Ga4Tracking config={config} nonce="fixture" locale="en" /></>);
        expect(privateRender).not.toHaveBeenCalled();
        expect(screen.queryByLabelText("Private fixture")).toBeNull();
        act(() => route.ready.forEach(finish => finish()));
        expect(((window as Window & { untGa4Layer?: IArguments[] }).untGa4Layer || []).map(item => Array.from(item)).some(command => command[0] === "event")).toBe(false);
    });
    it("keeps the document paused and reports a failed preference save without a reload loop", async () => {
        const { setGa4Consent } = await import("@/lib/analytics/ga4-consent"); setGa4Consent(true);
        const { Ga4Tracking } = await import("./Ga4Tracking");
        const { isolateGa4Document } = await import("@/lib/analytics/ga4-client");
        render(<Ga4Tracking config={config} nonce="fixture" locale="en" />);
        vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => { throw new Error("Storage unavailable"); });
        fireEvent.click(screen.getByRole("button", { name: "Keep analytics off" }));
        expect(screen.getByRole("alert")).toHaveTextContent("could not be saved");
        expect(isolateGa4Document).not.toHaveBeenCalled();
        expect((window as unknown as Record<string, unknown>)["ga-disable-G-FIXTURE123"]).toBe(true);
    });
});
