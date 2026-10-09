import "server-only";
import { z } from "zod";
import type { AnalyticsReport, ReportQuery, ReportWarning } from "../reporting";
import { ga4PageRegistry, type Ga4PageKey } from "../page-policy";

export const REPORT_VERSION = "eligible-pages-v1";
// Candidates only. No production adapter is configured; privacy owner approval is a separate gate.
export const REPORT_PAGES: Readonly<Record<string, string>> = Object.fromEntries(Object.values(ga4PageRegistry)
    .flatMap(page => (["en", "es"] as const).map(locale => [page.paths[locale], page.titles[locale]])));
export const REPORT_EVENTS = {
    strategy_call_cta_activated: "Consultation CTA activations",
} as const;
const channels = ["Direct", "Organic Search", "Paid Social", "Organic Social", "Email", "Affiliates", "Referral", "Paid Search", "Organic Video", "Paid Video", "Display", "Cross-network", "Organic Shopping", "Paid Shopping", "Audio", "SMS", "Mobile Push Notifications", "Unassigned"] as const;
const templates = {
    overview: { dimensions: [], metrics: ["activeUsers", "sessions", "screenPageViews", "engagementRate"] },
    trend: { dimensions: ["date"], metrics: ["sessions", "screenPageViews"] },
    acquisition: { dimensions: ["sessionDefaultChannelGroup"], metrics: ["sessions"] },
    pages: { dimensions: ["pagePath"], metrics: ["screenPageViews"] },
    ctas: { dimensions: ["eventName"], metrics: ["eventCount"] },
} as const;

function approvedPaths(pageKeys: readonly Ga4PageKey[]) {
    return pageKeys.flatMap(key => Object.values(ga4PageRegistry[key].paths));
}

export function buildReportRequest(query: ReportQuery, pageKeys: readonly Ga4PageKey[] = ["about", "team"]) {
    const template = templates[query.report];
    const pageFilter = { filter: { fieldName: "pagePath", inListFilter: { values: approvedPaths(pageKeys), caseSensitive: true } } };
    return {
        dateRanges: [{ startDate: query.from, endDate: query.to }],
        dimensions: template.dimensions.map(name => ({ name })),
        metrics: template.metrics.map(name => ({ name })),
        dimensionFilter: query.report === "ctas" ? { andGroup: { expressions: [pageFilter,
            { filter: { fieldName: "eventName", inListFilter: { values: Object.keys(REPORT_EVENTS), caseSensitive: true } } }],
        } } : pageFilter,
        ...(query.report === "trend" ? { orderBys: [{ dimension: { dimensionName: "date" } }] } : {}),
        limit: "500", keepEmptyRows: true, returnPropertyQuota: true,
    };
}

const cell = z.object({ value: z.string().max(256) });
const responseSchema = z.object({
    dimensionHeaders: z.array(z.object({ name: z.string() })).default([]),
    metricHeaders: z.array(z.object({ name: z.string() })),
    rows: z.array(z.object({ dimensionValues: z.array(cell).default([]), metricValues: z.array(cell) })).max(500).default([]),
    rowCount: z.number().int().nonnegative().optional(),
    metadata: z.object({
        timeZone: z.string(), subjectToThresholding: z.boolean().optional(), dataLossFromOtherRow: z.boolean().optional(),
        samplingMetadatas: z.array(z.object({ samplesReadCount: z.string(), samplingSpaceSize: z.string() })).optional(),
        emptyReason: z.string().optional(),
    }),
});

function count(value: string): number {
    if (!/^\d+$/.test(value)) throw new Error("Invalid aggregate");
    const number = Number(value);
    if (!Number.isSafeInteger(number)) throw new Error("Invalid aggregate");
    return number;
}

/** Historical property content is untrusted; labels always come from this finite registry. */
export function normalizeReport(raw: unknown, query: ReportQuery, timezone: string, now: number, pageKeys: readonly Ga4PageKey[] = ["about", "team"]): AnalyticsReport {
    const response = responseSchema.parse(raw);
    const template = templates[query.report];
    if (response.metadata.timeZone !== timezone
        || response.metricHeaders.map(header => header.name).join() !== template.metrics.join()
        || response.dimensionHeaders.map(header => header.name).join() !== template.dimensions.join()) {
        throw new Error("Unexpected report schema");
    }
    const warnings: ReportWarning[] = ["consented_coverage", "processing_delay", "key_events_unavailable"];
    if (response.metadata.subjectToThresholding) warnings.push("thresholded");
    if (response.metadata.samplingMetadatas?.some(sample => sample.samplesReadCount !== sample.samplingSpaceSize)) warnings.push("sampled");
    if (response.metadata.dataLossFromOtherRow || (response.rowCount ?? 0) > 500) warnings.push("data_loss");
    const result: AnalyticsReport = {
        report: query.report, status: response.rows.length ? "ready" : "empty",
        range: { from: query.from, to: query.to, timezone }, generatedAt: new Date(now).toISOString(), warnings,
        ...(!response.rows.length ? { reason: "empty_period" as const } : {}),
    };
    if (query.report === "overview") {
        if (response.rows.length > 1) throw new Error("Unexpected aggregate rows");
        if (response.rows[0]) {
            const values = response.rows[0].metricValues;
            if (values.length !== 4 || response.rows[0].dimensionValues.length !== 0) throw new Error("Incomplete aggregate");
            const rate = values[3].value;
            if (!/^(?:0(?:\.\d+)?|1(?:\.0+)?)$/.test(rate)) throw new Error("Invalid rate");
            result.overview = { activeUsers: count(values[0].value), sessions: count(values[1].value), views: count(values[2].value), engagementRate: Number(rate) };
        }
        return result;
    }
    result.rows = response.rows.flatMap(row => {
        if (row.dimensionValues.length !== 1 || row.metricValues.length !== template.metrics.length) throw new Error("Incomplete row");
        const key = row.dimensionValues[0].value;
        let label: string | undefined;
        if (query.report === "pages" && approvedPaths(pageKeys).some(path => path === key) && Object.hasOwn(REPORT_PAGES, key)) label = REPORT_PAGES[key];
        if (query.report === "ctas" && Object.hasOwn(REPORT_EVENTS, key)) label = REPORT_EVENTS[key as keyof typeof REPORT_EVENTS];
        if (query.report === "acquisition" && channels.some(channel => channel === key)) label = key;
        if (query.report === "trend" && /^\d{8}$/.test(key)) {
            const date = `${key.slice(0, 4)}-${key.slice(4, 6)}-${key.slice(6)}`;
            if (date >= query.from && date <= query.to && new Date(`${date}T00:00:00Z`).toISOString().slice(0, 10) === date) label = date;
        }
        if (!label) {
            if (!warnings.includes("data_loss")) warnings.push("data_loss");
            return [];
        }
        const values = Object.fromEntries(template.metrics.map((metric, index) => [
            metric === "screenPageViews" ? "views" : metric === "eventCount" ? "events" : "sessions", count(row.metricValues[index].value),
        ]));
        return [{ key: query.report === "trend" ? label : key, label, values }];
    });
    if (!result.rows.length && response.rows.length) { result.status = "unavailable"; result.reason = "upstream_unavailable"; }
    return result;
}
