import { afterEach, describe, expect, it, vi } from "vitest";
import { AnalyticsAccessError } from "@/lib/auth/analytics-access";
import type { ReportQuery } from "../reporting";
import type { Ga4PageKey } from "../page-policy";
import { createReportCache, REPORT_STALE_GRACE_MS, REPORT_TTL_MS } from "./cache";
import { ReportingError } from "./ga4-client";
import { buildReportRequest, normalizeReport } from "./reports";
import { createReportingService, getAnalyticsReport } from "./service";

const query: ReportQuery = { report: "overview", from: "2026-09-01", to: "2026-09-28" };
const rawOverview = (values = ["12", "20", "30", "0.5"]) => ({
    dimensionHeaders: [], metricHeaders: ["activeUsers", "sessions", "screenPageViews", "engagementRate"].map(name => ({ name })),
    rows: [{ metricValues: values.map(value => ({ value })) }], metadata: { timeZone: "America/Denver" },
});

function fixture() {
    let now = Date.UTC(2026, 9, 6);
    const authorize = vi.fn(async () => ({ subject: "verified-staff-123", visibility: "staff" as const }));
    const quota = { check: vi.fn(async () => undefined), acquire: vi.fn(async () => vi.fn(async () => undefined)) };
    const transport = vi.fn<typeof fetch>().mockImplementation(async () => Response.json(rawOverview()));
    const getAccessToken = vi.fn(async () => "fixture-server-token");
    const cache = createReportCache();
    const dependencies = {
        authorize, quota, transport, getAccessToken, cache, now: () => now,
        configuration: { property: "123456", timezone: "America/Denver", templatesVerified: true as const, approvedPageKeys: ["about", "team"] as Ga4PageKey[] },
    };
    return { ...dependencies, dependencies, advance: (ms: number) => { now += ms; }, read: createReportingService(dependencies) };
}

afterEach(() => vi.useRealTimers());

describe("private aggregate reporting", () => {
    it("production stays blocked and makes no credential or Google request", async () => {
        const fetchSpy = vi.spyOn(globalThis, "fetch");
        await expect(getAnalyticsReport(query)).rejects.toMatchObject({ code: "auth_not_configured" });
        expect(fetchSpy).not.toHaveBeenCalled();
        fetchSpy.mockRestore();
    });

    it("denies service callers before cache, quota, or token access", async () => {
        const f = fixture();
        f.authorize.mockRejectedValue(new AnalyticsAccessError("forbidden"));
        const readCache = vi.spyOn(f.cache, "read");
        await expect(f.read(query)).rejects.toMatchObject({ code: "forbidden" });
        expect(readCache).not.toHaveBeenCalled();
        expect(f.quota.check).not.toHaveBeenCalled();
        expect(f.getAccessToken).not.toHaveBeenCalled();
    });

    it("rechecks membership for cached reads and before delivering refreshed data", async () => {
        const f = fixture();
        await f.read(query);
        f.authorize.mockResolvedValueOnce({ subject: "verified-staff-123", visibility: "staff" }).mockRejectedValueOnce(new AnalyticsAccessError("forbidden"));
        await expect(f.read(query)).rejects.toMatchObject({ code: "forbidden" });
        const other = fixture();
        other.authorize.mockResolvedValueOnce({ subject: "verified-staff-123", visibility: "staff" }).mockRejectedValueOnce(new AnalyticsAccessError("unauthenticated"));
        await expect(other.read(query)).rejects.toMatchObject({ code: "unauthenticated" });
    });

    it.each([
        { ...query, property: "987" }, { ...query, dimensions: ["city"] },
        { ...query, report: "users" }, { ...query, from: "2026-02-30" },
        { ...query, from: "2026-01-01" }, { ...query, to: "2026-08-31" },
    ])("rejects property, arbitrary schema, and date abuse before fetching: %j", async input => {
        const f = fixture();
        await expect(f.read(input)).rejects.toThrow();
        expect(f.transport).not.toHaveBeenCalled();
    });

    it("fails closed for missing property, invalid server property and unknown timezone", async () => {
        const f = fixture();
        for (const configuration of [null, { ...f.configuration, property: "123/../../evil" }, { ...f.configuration, timezone: "Not/AZone" }]) {
            expect((await createReportingService({ ...f.dependencies, configuration })(query)).status).toBe("not_configured");
        }
        expect(f.getAccessToken).not.toHaveBeenCalled();
    });

    it("rejects today and future before quota/cache using the property day rather than the UTC day", async () => {
        const f = fixture();
        // 7 October in UTC is still 6 October in the Denver property.
        const clock = () => Date.UTC(2026, 9, 7, 1, 30);
        const read = createReportingService({ ...f.dependencies, now: clock });
        const readCache = vi.spyOn(f.cache, "read");
        for (const to of ["2026-10-06", "2026-10-07"]) {
            await expect(read({ ...query, from: "2026-10-01", to })).rejects.toThrow("Choose complete dates");
        }
        expect(f.quota.check).not.toHaveBeenCalled();
        expect(readCache).not.toHaveBeenCalled();
        expect(f.getAccessToken).not.toHaveBeenCalled();
        expect((await read({ ...query, from: "2026-10-01", to: "2026-10-05" })).status).toBe("ready");
        const utc = fixture();
        utc.transport.mockImplementation(async () => Response.json({ ...rawOverview(), metadata: { timeZone: "UTC" } }));
        const readUtc = createReportingService({ ...utc.dependencies, now: clock, configuration: { ...utc.configuration, timezone: "UTC" } });
        expect((await readUtc({ ...query, from: "2026-10-01", to: "2026-10-06" })).status).toBe("ready");
    });

    it("returns not_configured for an invalid timezone without substituting a client or machine timezone", async () => {
        const f = fixture();
        const read = createReportingService({ ...f.dependencies, configuration: { ...f.configuration, timezone: "Missing/Zone" } });
        expect(await read({ ...query, from: "2026-10-06", to: "2026-10-07" })).toMatchObject({
            status: "not_configured", range: { timezone: "Not configured" },
        });
        expect(f.quota.check).not.toHaveBeenCalled();
        expect(f.transport).not.toHaveBeenCalled();
    });

    it("uses the fixed property endpoint, manual bounded template, no-store transport and server-only token", async () => {
        const f = fixture();
        const result = await f.read(query);
        expect(result).toMatchObject({ status: "ready", overview: { activeUsers: 12, sessions: 20, views: 30, engagementRate: 0.5 }, sourcePeriod: { from: query.from, to: query.to } });
        const [url, init] = f.transport.mock.calls[0];
        expect(url).toBe("https://analyticsdata.googleapis.com/v1beta/properties/123456:runReport");
        expect(init).toMatchObject({ method: "POST", cache: "no-store", redirect: "error", headers: { Authorization: "Bearer fixture-server-token" } });
        expect(JSON.parse(init!.body as string)).toMatchObject({ limit: "500", returnPropertyQuota: true });
        expect(JSON.stringify(result)).not.toContain("fixture-server-token");
        expect(f.quota.check).toHaveBeenCalledWith("verified-staff-123", "123456");
    });

    it("coalesces concurrent misses, charges every verified read, and caches only normalized aggregates", async () => {
        const f = fixture();
        const results = await Promise.all([f.read(query), f.read(query)]);
        expect(f.transport).toHaveBeenCalledTimes(1);
        expect(f.quota.check).toHaveBeenCalledTimes(2);
        results[0].overview!.views = 999;
        expect((await f.read(query)).overview!.views).toBe(30);
        expect(f.transport).toHaveBeenCalledTimes(1);
        expect(f.quota.check).toHaveBeenCalledTimes(3);
    });

    it("quota storage outages deny even warm-cache reads", async () => {
        const f = fixture();
        await f.read(query);
        f.quota.check.mockRejectedValue(new Error("Redis token and identity details"));
        const result = await f.read(query);
        expect(result).toMatchObject({ status: "unavailable", reason: "upstream_unavailable" });
        expect(result.overview).toBeUndefined();
        expect(JSON.stringify(result)).not.toContain("identity");
    });

    it("keeps actual zero values distinct from empty rows and unavailable responses", async () => {
        const f = fixture();
        f.transport.mockImplementation(async () => Response.json(rawOverview(["0", "0", "0", "0"])));
        expect(await f.read(query)).toMatchObject({ status: "ready", overview: { views: 0, activeUsers: 0 } });
        const empty = fixture();
        empty.transport.mockImplementation(async () => Response.json({ ...rawOverview(), rows: [], rowCount: 0 }));
        expect(await empty.read(query)).toMatchObject({ status: "empty", reason: "empty_period" });
        const failed = fixture();
        failed.transport.mockImplementation(async () => new Response("private error", { status: 500 }));
        expect(await failed.read(query)).toMatchObject({ status: "unavailable", reason: "upstream_unavailable" });
    });

    it.each([401, 403])("never serves stale data for provider permission failure %i", async status => {
        const f = fixture();
        await f.read(query);
        await f.read({ ...query, from: "2026-09-02" });
        f.advance(REPORT_TTL_MS);
        f.transport.mockImplementation(async () => new Response("secret", { status }));
        const result = await f.read(query);
        expect(result.status).toBe("not_configured");
        expect(result.overview).toBeUndefined();
        expect(JSON.stringify(result)).not.toContain("secret");
        expect((await f.read({ ...query, from: "2026-09-02" })).status).toBe("not_configured");
        expect(f.transport).toHaveBeenCalledTimes(3);
    });

    it.each([429, 500])("can serve matching labeled stale aggregates during an authorized provider outage %i", async status => {
        const f = fixture();
        await f.read(query);
        f.advance(REPORT_TTL_MS);
        f.transport.mockImplementation(async () => new Response("secret", { status }));
        expect(await f.read(query)).toMatchObject({ status: "stale", reason: status === 429 ? "quota_exceeded" : "upstream_unavailable", overview: { views: 30 } });
        f.advance(REPORT_STALE_GRACE_MS + 1);
        const expired = await f.read(query);
        expect(expired.status).toBe("unavailable");
        expect(expired.overview).toBeUndefined();
    });

    it("stops an unresponsive token/provider operation at eight seconds", async () => {
        vi.useFakeTimers();
        const f = fixture();
        f.getAccessToken.mockImplementation(() => new Promise(() => undefined));
        const pending = f.read(query);
        await vi.advanceTimersByTimeAsync(8_001);
        expect(await pending).toMatchObject({ status: "unavailable", reason: "upstream_unavailable" });
        expect(f.transport).not.toHaveBeenCalled();
    });

    it("fails closed when shared refresh slots are exhausted", async () => {
        const f = fixture();
        f.quota.acquire.mockRejectedValue(new ReportingError("quota_exceeded"));
        expect(await f.read(query)).toMatchObject({ status: "unavailable", reason: "quota_exceeded" });
        expect(f.getAccessToken).not.toHaveBeenCalled();
    });

    it.each(["NaN", "-1", "9007199254740992"])("rejects malformed or unsafe integer aggregates: %s", async value => {
        const f = fixture();
        f.transport.mockImplementation(async () => Response.json(rawOverview([value, "20", "30", "0.5"])));
        expect((await f.read(query)).status).toBe("unavailable");
    });
});

describe("finite report normalization and cache", () => {
    it("filters every template to reviewed pages and CTA template to known events", () => {
        for (const report of ["overview", "trend", "acquisition", "pages", "ctas"] as const) {
            const request = buildReportRequest({ ...query, report });
            expect(JSON.stringify(request)).toContain("/en/about");
            expect(JSON.stringify(request)).not.toContain("/services");
            if (report === "ctas") expect(JSON.stringify(request)).toContain("strategy_call_cta_activated");
        }
        expect(JSON.stringify(buildReportRequest(query, ["about"]))).not.toContain("/en/team");
    });

    it("drops sensitive/historical path labels and preserves thresholding, sampling and coverage warnings", () => {
        const raw = {
            dimensionHeaders: [{ name: "pagePath" }], metricHeaders: [{ name: "screenPageViews" }],
            rows: ["/en/about", "/en/contact?ssn=123", "<script>private</script>"].map(value => ({ dimensionValues: [{ value }], metricValues: [{ value: "7" }] })),
            metadata: { timeZone: "America/Denver", subjectToThresholding: true, samplingMetadatas: [{ samplesReadCount: "5", samplingSpaceSize: "10" }] },
        };
        const report = normalizeReport(raw, { ...query, report: "pages" }, "America/Denver", Date.now());
        expect(report.rows).toEqual([{ key: "/en/about", label: "About Union National Tax", values: { views: 7 } }]);
        expect(report.warnings).toEqual(expect.arrayContaining(["consented_coverage", "thresholded", "sampled", "data_loss"]));
        expect(JSON.stringify(report)).not.toContain("ssn");
    });

    it("rejects property timezone/schema drift instead of presenting misleading totals", () => {
        expect(() => normalizeReport(rawOverview(), query, "UTC", Date.now())).toThrow("Unexpected report schema");
        expect(() => normalizeReport({ ...rawOverview(), metricHeaders: [] }, query, "America/Denver", Date.now())).toThrow();
    });

    it("flags an '(other)' acquisition bucket as missing coverage rather than fabricating zero sessions", () => {
        const raw = {
            dimensionHeaders: [{ name: "sessionDefaultChannelGroup" }], metricHeaders: [{ name: "sessions" }],
            rows: ["Direct", "(other)"].map(value => ({ dimensionValues: [{ value }], metricValues: [{ value: "17" }] })),
            metadata: { timeZone: "America/Denver" },
        };
        const acquisition = { ...query, report: "acquisition" as const };
        const mixed = normalizeReport(raw, acquisition, "America/Denver", Date.now());
        expect(mixed).toMatchObject({ status: "ready", rows: [{ key: "Direct", values: { sessions: 17 } }] });
        expect(mixed.warnings).toContain("data_loss");
        const onlyOther = normalizeReport({ ...raw, rows: raw.rows.slice(1) }, acquisition, "America/Denver", Date.now());
        expect(onlyOther).toMatchObject({ status: "unavailable", rows: [] });
        expect(onlyOther.warnings).toContain("data_loss");
        expect(onlyOther.overview).toBeUndefined();
    });

    it("bounds cache entries and discards data outside stale grace or when clock moves backward", () => {
        const cache = createReportCache(1);
        const report = normalizeReport(rawOverview(), query, "America/Denver", 1_000);
        cache.write("first", report, 1_000);
        cache.write("second", report, 1_000);
        expect(cache.read("first", 1_001)).toBeUndefined();
        expect(cache.read("second", 1_000 + REPORT_TTL_MS + REPORT_STALE_GRACE_MS + 1)).toBeUndefined();
        cache.write("third", report, 1_000);
        expect(cache.read("third", 999)).toBeUndefined();
    });
});
