import { describe, expect, it, vi } from "vitest";
import { createGa4Controller } from "./ga4-controller";
import type { Ga4ClientConfig } from "./ga4-config";

const config: Ga4ClientConfig = { measurementId: "G-FIXTURE123", policy: { origin: "https://example.test", approvedPageKeys: ["about", "team"], campaigns: { sources: [], mediums: [], campaigns: [] } } };
function fixture(allowed = true) {
    const state = { consent: allowed, url: "https://example.test/en/about" };
    const send = vi.fn(), stop = vi.fn();
    return { state, send, stop, controller: createGa4Controller(config, { consent: () => state.consent, url: () => state.url, send, stop }) };
}
describe("single manual GA4 authority", () => {
    it("makes no command or queue before consent and never replays history", () => {
        const f = fixture(false);
        f.controller.prepare(); f.controller.loaded();
        f.controller.dispatch({ event: "strategy_call_cta_activated", funnel: "strategy_call", placement: "about_final_cta", destination_type: "internal" });
        expect(f.send).not.toHaveBeenCalled();
        f.state.url = "https://example.test/es/team"; f.state.consent = true;
        f.controller.prepare(); f.controller.loaded();
        expect(f.send.mock.calls.filter(call => call[1] === "page_view")).toEqual([["event", "page_view", expect.objectContaining({ page_key: "team", locale: "es", send_to: config.measurementId })]]);
    });
    it("deduplicates strict rerenders and safe hash/query changes but counts return navigation", () => {
        const f = fixture(); f.controller.prepare(); f.controller.prepare(); f.controller.loaded(); f.controller.loaded(); f.controller.navigate();
        f.state.url += "#about-founder"; f.controller.navigate();
        f.state.url = "https://example.test/en/team"; f.controller.navigate();
        f.state.url = "https://example.test/en/about"; f.controller.navigate();
        expect(f.send.mock.calls.filter(call => call[0] === "config")).toHaveLength(1);
        expect(f.send.mock.calls.find(call => call[0] === "config")?.[2]).toMatchObject({ send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false });
        expect(f.send.mock.calls.filter(call => call[1] === "page_view")).toHaveLength(3);
    });
    it("rejects conversion-shaped or extra-field events and bounds CTA visibility by navigation", () => {
        const f = fixture(); f.controller.prepare(); f.controller.loaded();
        const viewed = { event: "strategy_call_cta_viewed", funnel: "strategy_call", placement: "about_final_cta" };
        expect(f.controller.dispatch(viewed)).toBe(true); expect(f.controller.dispatch(viewed)).toBe(false);
        expect(f.controller.dispatch({ ...viewed, email: "private@example.test" })).toBe(false);
        expect(f.controller.dispatch({ event: "generate_lead" })).toBe(false);
        expect(f.controller.dispatch({ event: "strategy_call_scheduler_opened", provider: "embedded_scheduler" })).toBe(false);
        expect(f.send.mock.calls.filter(call => call[1] === "strategy_call_cta_viewed")).toHaveLength(1);
    });
    it.each(["https://example.test/en/services", "https://example.test/en/back-taxes-irs-tax-resolution", "https://example.test/en/about?email=private"])("stops permanently before sending on %s", url => {
        const f = fixture(); f.controller.prepare(); f.controller.loaded(); const count = f.send.mock.calls.length;
        f.state.url = url; f.controller.navigate(); expect(f.stop).toHaveBeenCalledOnce();
        f.state.url = "https://example.test/en/about"; f.controller.navigate(); f.controller.loaded();
        expect(f.send).toHaveBeenCalledTimes(count);
    });
    it("stops on revocation while a loader is pending", () => {
        const f = fixture(); f.controller.prepare(); f.state.consent = false; f.controller.loaded();
        expect(f.stop).toHaveBeenCalledOnce();
        expect(f.send.mock.calls.some(call => call[0] === "event")).toBe(false);
    });
});
