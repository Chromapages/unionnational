import { describe, expect, it, vi } from "vitest";
import { AnalyticsAccessError } from "@/lib/auth/analytics-access";
import { AnalyticsReportQueryError, createAnalyticsReportHandler } from "@/lib/analytics/server/service";
import type { AnalyticsReport } from "@/lib/analytics/reporting";
import { GET } from "./route";

const url = "https://unt.example/api/analytics/report?report=overview&from=2026-09-01&to=2026-09-28";
const ready: AnalyticsReport = { report: "overview", status: "ready", range: { from: "2026-09-01", to: "2026-09-28", timezone: "America/Denver" }, warnings: [], overview: { activeUsers: 0, sessions: 0, views: 0, engagementRate: 0 } };
const authorize = async () => ({ subject: "verified-subject", visibility: "staff" as const });

describe("analytics API independently enforces staff access", () => {
    it("rejects direct calls and forged cookies/headers while auth is unconfigured", async () => {
        const response = await GET(new Request(url, { headers: { Cookie: "staff=true", "x-staff-email": "admin@example.test", Authorization: "Bearer fake" } }));
        expect(response.status).toBe(503);
        expect(await response.json()).toMatchObject({ error: { code: "auth_not_configured" } });
        expect(response.headers.get("cache-control")).toContain("private, no-store");
        expect(response.headers.get("access-control-allow-origin")).toBeNull();
    });

    it("never calls service on denial, including malformed unauthorized queries", async () => {
        const read = vi.fn();
        const handler = createAnalyticsReportHandler(read, async () => { throw new AnalyticsAccessError("forbidden"); });
        const response = await handler(new Request(`${url}&property=123`));
        expect(response.status).toBe(403);
        expect(read).not.toHaveBeenCalled();
    });

    it.each(["&property=123", "&dimensions=city", "&report=pages"])("rejects extra fields and duplicate query keys: %s", async suffix => {
        const read = vi.fn(async () => ready);
        const response = await createAnalyticsReportHandler(read, authorize)(new Request(url + suffix));
        expect(response.status).toBe(400);
        expect(read).not.toHaveBeenCalled();
        expect(response.headers.get("cache-control")).toContain("no-store");
    });

    it("returns private aggregate DTOs, with honest HTTP failures and no raw exceptions", async () => {
        const response = await createAnalyticsReportHandler(async () => ready, authorize)(new Request(url));
        expect(response.status).toBe(200);
        expect(await response.json()).toMatchObject({ overview: { views: 0 } });
        const quota = await createAnalyticsReportHandler(async () => ({ ...ready, status: "unavailable", reason: "quota_exceeded" }), authorize)(new Request(url));
        expect(quota.status).toBe(429);
        const failed = await createAnalyticsReportHandler(async () => { throw new Error("Bearer token private-email@example.test"); }, authorize)(new Request(url));
        expect(failed.status).toBe(503);
        expect(await failed.text()).not.toContain("private-email");
    });

    it("rechecks authorization after a read before serializing a response", async () => {
        const auth = vi.fn(authorize).mockResolvedValueOnce({ subject: "verified-subject", visibility: "staff" }).mockRejectedValueOnce(new AnalyticsAccessError("unauthenticated"));
        const response = await createAnalyticsReportHandler(async () => ready, auth)(new Request(url));
        expect(response.status).toBe(401);
        expect(await response.text()).not.toContain("overview");
    });

    it("returns a private invalid-query response when the configured property day is incomplete", async () => {
        const response = await createAnalyticsReportHandler(async () => { throw new AnalyticsReportQueryError(); }, authorize)(new Request(url));
        expect(response.status).toBe(400);
        expect(await response.json()).toMatchObject({ error: { code: "invalid_query", message: "Choose complete dates within 90 days in the property timezone." } });
        expect(response.headers.get("cache-control")).toContain("private, no-store");
    });
});
