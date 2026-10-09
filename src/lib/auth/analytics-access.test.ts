import { describe, expect, it, vi } from "vitest";
import { AnalyticsAccessError, requireAnalyticsStaff } from "./analytics-access";

describe("analytics staff access gate", () => {
    it("stays closed without a separately approved provider, even with misleading environment flags", async () => {
        vi.stubEnv("ANALYTICS_DASHBOARD_ENABLED", "true");
        vi.stubEnv("ANALYTICS_STAFF_EMAIL", "admin@example.test");
        try {
            await expect(requireAnalyticsStaff()).rejects.toMatchObject({ code: "auth_not_configured", status: 503 });
        } finally { vi.unstubAllEnvs(); }
    });

    it("distinguishes configuration, authentication, and membership failures without exposing identities", () => {
        expect(new AnalyticsAccessError("unauthenticated").status).toBe(401);
        expect(new AnalyticsAccessError("forbidden").status).toBe(403);
        expect(new AnalyticsAccessError("auth_not_configured").message).toBe("Analytics access is unavailable.");
    });
});
