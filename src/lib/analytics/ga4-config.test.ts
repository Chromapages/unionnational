import { describe, expect, it } from "vitest";
import { getGa4ClientConfig } from "./ga4-config";

const approved = {
    GA4_TRACKING_ENABLED: "true", GA4_PRIVACY_APPROVED: "true", GA4_PROPERTY_SETTINGS_CONFIRMED: "true", GA4_VENDOR_REVIEW_APPROVED: "true",
    GA4_MEASUREMENT_ID: "G-FIXTURE123", GA4_APPROVED_ORIGIN: "https://example.test", GA4_APPROVED_PAGE_KEYS: "about,team",
};
describe("GA4 activation gates", () => {
    it("defaults off and requires every independent acceptance", () => {
        expect(getGa4ClientConfig({})).toBeNull();
        for (const key of ["GA4_TRACKING_ENABLED", "GA4_PRIVACY_APPROVED", "GA4_PROPERTY_SETTINGS_CONFIRMED", "GA4_VENDOR_REVIEW_APPROVED"]) expect(getGa4ClientConfig({ ...approved, [key]: "false" })).toBeNull();
        expect(getGa4ClientConfig(approved)?.measurementId).toBe("G-FIXTURE123");
    });
    it("does not infer approved pages, campaigns, or credentials", () => {
        expect(getGa4ClientConfig({ ...approved, GA4_APPROVED_PAGE_KEYS: "" })).toBeNull();
        expect(getGa4ClientConfig({ ...approved, GA4_APPROVED_PAGE_KEYS: "home" })).toBeNull();
        expect(getGa4ClientConfig({ ...approved, GA4_APPROVED_CAMPAIGNS: "broken" })).toBeNull();
        expect(getGa4ClientConfig({ ...approved, GA4_MEASUREMENT_ID: "<script>" })).toBeNull();
    });
});
