import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { createSyntheticDashboardSnapshot } from "@/lib/analytics/fixtures";
import { reportKeys, type ReportStatus } from "@/lib/analytics/reporting";
import { AnalyticsDashboard, formatComparison } from "./AnalyticsDashboard";

afterEach(cleanup);

describe("AnalyticsDashboard", () => {
    it("discloses synthetic values, metric meaning, coverage and disabled live conversions", () => {
        render(<AnalyticsDashboard snapshot={createSyntheticDashboardSnapshot()} fixture />);
        expect(screen.getByText("SYNTHETIC DEVELOPMENT DATA")).toBeInTheDocument();
        expect(screen.getByText(/These are not UNT results/)).toBeInTheDocument();
        expect(screen.getByText("GA4 active users")).toBeInTheDocument();
        expect(screen.getByText(/not all website visitors/, { selector: "dd" })).toBeInTheDocument();
        expect(screen.getByText(/CTA activations are event counts, not leads or confirmed bookings/)).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "Conversions: not configured" })).toBeInTheDocument();
        expect(screen.getAllByText(/2026-09-08 to 2026-10-05 \(inclusive\)/)).toHaveLength(5);
        expect(screen.getByText(/Comparison: 2026-08-11 to 2026-09-07 \(inclusive\)/)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Apply dates" })).toBeDisabled();
        expect(screen.getByRole("img", { name: /Exact sessions and page views appear in the daily values table/ })).toBeInTheDocument();
        expect(screen.getByRole("table", { name: "Daily traffic", hidden: true })).toBeInTheDocument();
    });

    it.each([
        ["empty", "No data returned for this period. This does not establish zero traffic."],
        ["not_configured", "Not configured. Reporting access or configuration is still pending."],
        ["unavailable", "Report unavailable. No values have been substituted."],
    ] as const)("shows %s without substituting fixture metrics", (status, message) => {
        const snapshot = createSyntheticDashboardSnapshot();
        for (const key of reportKeys) snapshot.reports[key].status = status;
        render(<AnalyticsDashboard snapshot={snapshot} fixture />);
        expect(screen.getAllByText(message)).toHaveLength(5);
        expect(screen.queryByText("64.0%")).not.toBeInTheDocument();
        expect(screen.queryByRole("table")).not.toBeInTheDocument();
    });

    it("keeps stale values visible with their timestamps and freshness warning", () => {
        const snapshot = createSyntheticDashboardSnapshot();
        snapshot.reports.overview.status = "stale";
        render(<AnalyticsDashboard snapshot={snapshot} fixture />);
        expect(screen.getByText("Stale report")).toBeInTheDocument();
        expect(screen.getByText(/Showing a previously generated report/)).toBeInTheDocument();
        expect(screen.getByText("64.0%")).toBeInTheDocument();
        expect(screen.getAllByText("2026-10-06T12:00:00Z")).toHaveLength(5);
    });

    it("distinguishes genuine zeros from missing overview and table values", () => {
        const snapshot = createSyntheticDashboardSnapshot();
        snapshot.reports.overview.overview = { activeUsers: 0, sessions: 0, views: 0, engagementRate: 0 };
        snapshot.reports.pages.rows = [{ key: "about", label: "About UNT", values: { views: 0 } }, { key: "team", label: "Our team", values: {} }];
        render(<AnalyticsDashboard snapshot={snapshot} fixture={false} />);
        expect(screen.queryByText("SYNTHETIC DEVELOPMENT DATA")).not.toBeInTheDocument();
        expect(screen.getByText("0.0%")).toBeInTheDocument();
        const table = screen.getByRole("table", { name: "Eligible pages" });
        expect(within(table).getByRole("cell", { name: "0" })).toBeInTheDocument();
        expect(within(table).getByRole("cell", { name: "Not available" })).toBeInTheDocument();
    });

    it("does not invent an overview when a successful response omitted it", () => {
        const snapshot = createSyntheticDashboardSnapshot();
        delete snapshot.reports.overview.overview;
        snapshot.reports.pages.rows = [];
        render(<AnalyticsDashboard snapshot={snapshot} fixture />);
        expect(screen.getByText("Overview values were not returned. Missing data is not zero.")).toBeInTheDocument();
        expect(screen.getByText("No rows returned. Missing data is not zero.")).toBeInTheDocument();
    });

    it("uses supplied comparison dates and never implies a missing upstream comparison", () => {
        const snapshot = createSyntheticDashboardSnapshot();
        snapshot.reports.overview.comparisonRange = { from: "2026-08-10", to: "2026-09-06" };
        const { rerender } = render(<AnalyticsDashboard snapshot={snapshot} fixture />);
        expect(screen.getByText("Comparison: 2026-08-10 to 2026-09-06 (inclusive).")).toBeInTheDocument();
        delete snapshot.reports.overview.comparisonRange;
        rerender(<AnalyticsDashboard snapshot={snapshot} fixture={false} />);
        expect(screen.getByText("Comparison dates were not provided.")).toBeInTheDocument();
        delete snapshot.reports.overview.comparison;
        rerender(<AnalyticsDashboard snapshot={snapshot} fixture />);
        expect(screen.getByText("No comparison was returned for this report.")).toBeInTheDocument();
        expect(screen.queryByText(/^Comparison:/)).not.toBeInTheDocument();
    });

    it("submits bounded dates and presets without fetching or changing the property", () => {
        const onRangeChange = vi.fn();
        render(<AnalyticsDashboard snapshot={createSyntheticDashboardSnapshot()} fixture onRangeChange={onRangeChange} />);
        fireEvent.click(screen.getByRole("button", { name: "Last 7 days" }));
        expect(onRangeChange).toHaveBeenCalledWith({ from: "2026-09-29", to: "2026-10-05", timezone: "America/Denver" });
        fireEvent.change(screen.getByLabelText("From"), { target: { value: "2026-01-01" } });
        fireEvent.click(screen.getByRole("button", { name: "Apply dates" }));
        expect(screen.getByRole("alert")).toHaveTextContent("no more than 90 inclusive days");
        expect(onRangeChange).toHaveBeenCalledTimes(1);
    });

    it("shows every upstream limitation in plain language", () => {
        const snapshot = createSyntheticDashboardSnapshot();
        snapshot.reports.overview.warnings = ["thresholded", "sampled", "data_loss", "processing_delay"];
        snapshot.reports.acquisition.status = "unavailable" as ReportStatus;
        snapshot.reports.acquisition.reason = "quota_exceeded";
        render(<AnalyticsDashboard snapshot={snapshot} fixture />);
        expect(screen.getByText(/Google has withheld some data/)).toBeInTheDocument();
        expect(screen.getByText("This report uses sampled data.")).toBeInTheDocument();
        expect(screen.getByText(/totals may be incomplete/)).toBeInTheDocument();
        expect(screen.getByText(/Google is still processing/)).toBeInTheDocument();
        expect(screen.getByText(/reporting request limit was reached/)).toBeInTheDocument();
    });
});

describe("safe comparisons and fixtures", () => {
    it("never renders infinite change or labels a new baseline as growth", () => {
        expect(formatComparison(12, 0)).toBe("No prior-period baseline");
        expect(formatComparison(0, 0)).toBe("No change (zero baseline)");
        expect(formatComparison(9, 10)).toBe("-10.0%");
        expect(formatComparison(0.64, 0.61, true)).toBe("+3.0 percentage points");
    });

    it("keeps generated daily totals and exact range consistent across reports", () => {
        const range = { from: "2026-03-06", to: "2026-03-12", timezone: "America/Denver" };
        const snapshot = createSyntheticDashboardSnapshot(range);
        const rows = snapshot.reports.trend.rows!;
        expect(rows).toHaveLength(7);
        expect(rows.at(-1)?.key).toBe(range.to);
        expect(rows.reduce((total, row) => total + row.values.sessions!, 0)).toBe(snapshot.reports.overview.overview?.sessions);
        for (const key of reportKeys) expect(snapshot.reports[key].range).toEqual(range);
        expect(() => createSyntheticDashboardSnapshot({ ...range, to: "2026-07-12" })).toThrow(/1–90 days/);
    });
});
