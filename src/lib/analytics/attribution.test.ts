import { describe, expect, it } from "vitest";
import { resolveGa4Attribution } from "./attribution";

const registry = { sources: ["newsletter"], mediums: ["email"], campaigns: ["autumn"] };
describe("reviewed GA4 campaign codes", () => {
    it("maps only approved source, medium and campaign codes", () => {
        expect(resolveGa4Attribution(new URLSearchParams("utm_source=newsletter&utm_medium=email&utm_campaign=autumn"), registry))
            .toEqual({ campaign_source: "newsletter", campaign_medium: "email", campaign_name: "autumn" });
        expect(resolveGa4Attribution(new URLSearchParams(), registry)).toEqual({});
    });
    it.each(["utm_source=newsletter&utm_source=newsletter", "utm_source=newsletter&%75tm_source=newsletter",
        "gclid=fixture", "fbclid=fixture", "utm_term=fixture", "utm_content=fixture", "token=fixture",
        "utm_source=unknown", "utm_source=", "utm_source=person%40example.test", "utm_campaign=tax-debt",
        `utm_campaign=${"a".repeat(200)}`])("rejects unsafe or unreviewed attribution %s", query => {
        expect(resolveGa4Attribution(new URLSearchParams(query), registry)).toBeNull();
    });
    it.each(["person@example.test", "tax-debt", "irs-help", "ssn-123456789", "session-token", "a".repeat(41)])
        ("rejects unsafe configuration code %s even if requested by the registry", source => {
            expect(resolveGa4Attribution(new URLSearchParams({ utm_source: source }), { ...registry, sources: [source] })).toBeNull();
        });
});
