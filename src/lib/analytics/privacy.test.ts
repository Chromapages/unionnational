import { beforeEach, describe, expect, it } from "vitest";
import { canUseOptionalTracking, setTrackingChoice } from "./privacy";

beforeEach(() => { localStorage.clear(); window.history.replaceState({}, "", "/en"); });
describe("optional tracking permission", () => {
    it("defaults off and follows explicit opt-in and revocation", () => {
        expect(canUseOptionalTracking()).toBe(false);
        setTrackingChoice(true);
        expect(canUseOptionalTracking()).toBe(true);
        setTrackingChoice(false);
        expect(canUseOptionalTracking()).toBe(false);
    });
    it("excludes sensitive routes and credential-bearing query strings even after opt-in", () => {
        setTrackingChoice(true);
        for (const url of ["/en/proactive-cfo-assessment", "/scorp-estimator/results", "/en/shop/success?receipt=order_fixture", "/en/contact", "/en/book", "/en?session_id=fixture", "/en?utm_source=fixture%40example.test", "/en#token=fixture"]) {
            window.history.replaceState({}, "", url);
            expect(canUseOptionalTracking()).toBe(false);
        }
        window.history.replaceState({}, "", "/es/about?utm_source=campaign");
        expect(canUseOptionalTracking()).toBe(true);
    });
});
