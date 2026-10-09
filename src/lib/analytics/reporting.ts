import { z } from "zod";

export const reportKeys = ["overview", "trend", "acquisition", "pages", "ctas"] as const;
export type ReportKey = typeof reportKeys[number];
export type ReportStatus = "ready" | "empty" | "not_configured" | "unavailable" | "stale";
export type ReportWarning = "consented_coverage" | "thresholded" | "sampled" | "data_loss" | "processing_delay" | "key_events_unavailable";
export type ReportReason = "auth_not_configured" | "reporting_not_configured" | "upstream_unavailable" | "quota_exceeded" | "empty_period";

export type ReportRange = { from: string; to: string; timezone: string };
export type ReportOverview = { activeUsers: number; sessions: number; views: number; engagementRate: number };
export type ReportRow = { key: string; label: string; values: { sessions?: number; views?: number; events?: number } };
export type AnalyticsReport = {
    report: ReportKey;
    status: ReportStatus;
    range: ReportRange;
    generatedAt?: string;
    reportVersion?: string;
    sourcePeriod?: { from: string; to: string };
    comparisonRange?: { from: string; to: string };
    collectionStart?: string;
    reason?: ReportReason;
    warnings: ReportWarning[];
    overview?: ReportOverview;
    comparison?: ReportOverview;
    rows?: ReportRow[];
};
export type DashboardSnapshot = { reports: Record<ReportKey, AnalyticsReport> };

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine(value => {
    const parsed = new Date(`${value}T00:00:00Z`);
    return Number.isFinite(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
});
export const reportQuerySchema = z.object({
    report: z.enum(reportKeys),
    from: isoDate,
    to: isoDate,
}).strict().refine(value => {
    const days = (Date.parse(value.to) - Date.parse(value.from)) / 86_400_000 + 1;
    return days >= 1 && days <= 90;
}, { message: "Choose an inclusive range of 1–90 days." });
export type ReportQuery = z.infer<typeof reportQuerySchema>;
