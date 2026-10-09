import { describe, expect, it } from "vitest";
import { isGa4PageContext, resolveGa4PageContext, type Ga4Policy } from "./page-policy";

const policy: Ga4Policy = { origin: "https://unt.example", approvedPageKeys: ["about", "team"],
    campaigns: { sources: ["newsletter"], mediums: ["email"], campaigns: ["autumn"] } };
describe("GA4 positive page registry", () => {
    it.each(["en", "es"] as const)("emits fixed, immutable %s context and strips approved campaigns from locations", locale => {
        const context = resolveGa4PageContext(`https://unt.example/${locale}/about/?utm_source=newsletter#about-team`, policy);
        expect(context).toMatchObject({ page_key: "about", locale, page_location: `https://unt.example/${locale}/about`,
            page_referrer: "", campaign_source: "newsletter" });
        expect(Object.isFrozen(context)).toBe(true);
        expect(isGa4PageContext(context)).toBe(true);
        expect(isGa4PageContext({ ...context })).toBe(false);
    });
    it("normalizes declared anchor changes to the same pageview identity", () => {
        const plain = resolveGa4PageContext("/en/team", policy);
        expect(resolveGa4PageContext("/en/team#founder", policy)).toEqual(plain);
        expect(resolveGa4PageContext("/en/team#team-members", policy)).toEqual(plain);
    });
    it("requires affirmative inclusion; invalid policy fails closed", () => {
        expect(resolveGa4PageContext("/en/about", { ...policy, approvedPageKeys: [] })).toBeNull();
        expect(resolveGa4PageContext("/en/about", { ...policy, origin: "not a URL" })).toBeNull();
        expect(resolveGa4PageContext("/en/about", { ...policy, origin: "https://unt.example/" })).toBeNull();
        expect(resolveGa4PageContext("/en/about", { ...policy, origin: "http://unt.example" })).toBeNull();
        expect(resolveGa4PageContext("/en/about", { ...policy, origin: "http://localhost:3456" })).not.toBeNull();
    });
    const excluded = ["", "services", "back-taxes-irs-tax-resolution", "tax-resolution", "vsl/tax-resolution",
        "irs-resolution", "impuestos-atrasados", "resolucion-de-impuestos", "contact", "book", "booking", "intake", "apply",
        "assessment", "proactive-cfo-assessment", "scorp-estimator", "construction/profit-blueprint", "health-check",
        "tax-savings-analysis", "cart", "checkout", "shop/success", "shop/receipt", "success", "receipt", "payment",
        "hq", "studio", "analytics", "dashboard", "auth/callback", "api", "resources/unknown-cms-page", "new-cms-page"];
    it.each(excluded)("excludes /%s in both locales and without locale", path => {
        for (const prefix of ["/en/", "/es/", "/"]) expect(resolveGa4PageContext(prefix + path, policy)).toBeNull();
    });
    it.each(["/en/about?token=fixture", "/en/about?utm_source=unknown", "/en/about?utm_source=newsletter&utm_source=newsletter",
        "/en/about?gclid=fixture", "/en/about?email=person%40example.test", "/en/about#token=fixture",
        "/en/about#person%40example.test", "/en/about#ssn-123456789", "/en/about#unknown-anchor",
        "/en/about/../team", "/en/contact/../about", "/en/%61bout", "/en//about", "/en/about//", "/en/about/secret",
        "https://other.example/en/about", "https://user:pass@unt.example/en/about", " https://unt.example/en/about",
        "javascript:alert(1)", "/en/about\n", "/en\\about"])("rejects unsafe URL %s", url => {
        expect(resolveGa4PageContext(url, policy)).toBeNull();
    });
});
