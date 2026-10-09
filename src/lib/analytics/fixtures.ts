import { reportQuerySchema, type AnalyticsReport, type DashboardSnapshot, type ReportRange } from "./reporting";

/** Synthetic development data only. Never use as a fallback for a live report. */
export function createSyntheticDashboardSnapshot(
    range: ReportRange = { from: "2026-09-08", to: "2026-10-05", timezone: "America/Denver" },
): DashboardSnapshot {
    reportQuerySchema.parse({ report: "overview", from: range.from, to: range.to });
    const start = Date.parse(`${range.from}T00:00:00Z`);
    const days = (Date.parse(`${range.to}T00:00:00Z`) - start) / 86_400_000 + 1;
    const rows = Array.from({ length: days }, (_, index) => {
        const date = new Date(start + index * 86_400_000).toISOString().slice(0, 10);
        return { key: date, label: date, values: { sessions: 12 + index % 9, views: 24 + index % 17 } };
    });
    const sessions = rows.reduce((sum, row) => sum + row.values.sessions, 0);
    const views = rows.reduce((sum, row) => sum + row.values.views, 0);
    const report = (key: AnalyticsReport["report"]): AnalyticsReport => ({
        report: key, status: "ready", range: { ...range }, generatedAt: new Date(Date.parse(`${range.to}T00:00:00Z`) + 86_400_000 + 43_200_000).toISOString().replace(".000Z", "Z"),
        collectionStart: range.from, warnings: ["consented_coverage", "key_events_unavailable"],
    });
    return { reports: {
        overview: { ...report("overview"), overview: { activeUsers: Math.round(sessions * 0.7), sessions, views, engagementRate: 0.64 }, comparison: { activeUsers: Math.round(sessions * 0.65), sessions: Math.round(sessions * 0.9), views: Math.round(views * 0.95), engagementRate: 0.61 } },
        trend: { ...report("trend"), rows },
        acquisition: { ...report("acquisition"), rows: [
            { key: "organic", label: "Organic Search", values: { sessions: Math.round(sessions * 0.5) } },
            { key: "direct", label: "Direct", values: { sessions: Math.round(sessions * 0.3) } },
            { key: "referral", label: "Referral", values: { sessions: sessions - Math.round(sessions * 0.5) - Math.round(sessions * 0.3) } },
        ] },
        pages: { ...report("pages"), rows: [
            { key: "about", label: "About UNT", values: { views: Math.round(views * 0.6) } },
            { key: "team", label: "Our team", values: { views: views - Math.round(views * 0.6) } },
        ] },
        ctas: { ...report("ctas"), rows: [
            { key: "strategy_call_cta_activated", label: "Consultation CTA activations", values: { events: 18 } },
        ] },
    } };
}
