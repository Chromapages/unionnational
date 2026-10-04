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
