import { describe, expect, it, vi } from "vitest";
import nextConfig from "../../next.config";

vi.mock("next-intl/plugin", () => ({ default: () => (config: unknown) => config }));

describe("canonical service redirects in Next config", () => {
    it.each([
        ["/services/tax-filing-and-preparation-services", "/tax-preparation-and-filing"],
        ["/en/services/tax-filing-and-preparation-services", "/en/tax-preparation-and-filing"],
        ["/es/services/tax-filing-and-preparation-services", "/es/tax-preparation-and-filing"],
    ])("sends %s directly to %s", async (source, destination) => {
        const redirects = await nextConfig.redirects?.();
        expect(redirects).toContainEqual({ source, destination, permanent: true });
    });
});

describe("canonical host redirects in Next config", () => {
    it("puts host redirects first with fixed HTTPS destinations, including the root slash", async () => {
        const [directRoot, direct, forwardedRoot, forwarded] = (await nextConfig.redirects?.()) ?? [];
        const redirect = { source: "/:path*", destination: "https://unionnationaltax.com/:path*", statusCode: 301 };
        const root = { source: "/", destination: "https://unionnationaltax.com/", statusCode: 301 };
        const directHas = [{ type: "host", value: "www\\.unionnationaltax\\.com" }];
        const forwardedHas = [{ type: "header", key: "x-forwarded-host", value: expect.any(String) }];
        expect(directRoot).toEqual({ ...root, has: directHas });
        expect(direct).toEqual({ ...redirect, has: directHas });
        expect(forwardedRoot).toEqual({ ...root, has: forwardedHas });
        expect(forwarded).toEqual({ ...redirect, has: forwardedRoot?.has });

        const value = forwarded?.has?.[0]?.value;
        const matcher = new RegExp(`^${value}$`);
        expect(matcher.test("WwW.UnionNationalTax.Com:443, preview.unionnationaltax.com")).toBe(true);
        for (const host of ["unionnationaltax.com", "localhost", "127.0.0.1", "preview.unionnationaltax.com",
            "www.unionnationaltax.com.invalid", "wwwXunionnationaltaxYcom", "www.unionnationaltax.com:8443",
            "unionnationaltax.com, www.unionnationaltax.com"]) {
            expect(matcher.test(host), host).toBe(false);
        }
    });
});
