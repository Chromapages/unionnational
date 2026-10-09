import { afterEach, describe, expect, it, vi } from "vitest";
import AnalyticsPreview from "./page";
vi.mock("next/navigation", () => ({ notFound: () => { throw new Error("NOT_FOUND"); } }));
vi.mock("next/headers", () => ({ headers: async () => new Headers({ host: "localhost:3458" }) }));
vi.mock("@/components/analytics/dashboard/FixtureDashboard", () => ({ FixtureDashboard: () => null }));
afterEach(() => vi.unstubAllEnvs());
describe("synthetic dashboard preview gate", () => {
    it("cannot be enabled in production even with the preview flag", async () => {
        vi.stubEnv("NODE_ENV", "production"); vi.stubEnv("ANALYTICS_FIXTURE_PREVIEW", "true");
        await expect(AnalyticsPreview()).rejects.toThrow("NOT_FOUND");
    });
    it("defaults off in development and requires an explicit fixture flag", async () => {
        vi.stubEnv("NODE_ENV", "development"); vi.stubEnv("ANALYTICS_FIXTURE_PREVIEW", "false");
        await expect(AnalyticsPreview()).rejects.toThrow("NOT_FOUND");
        vi.stubEnv("ANALYTICS_FIXTURE_PREVIEW", "true"); expect(await AnalyticsPreview()).toBeDefined();
    });
});
