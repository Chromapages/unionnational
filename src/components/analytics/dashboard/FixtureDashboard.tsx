"use client";

import { useState } from "react";
import { AnalyticsDashboard } from "./AnalyticsDashboard";
import { createSyntheticDashboardSnapshot } from "@/lib/analytics/fixtures";
import { reportKeys, type ReportRange, type ReportStatus } from "@/lib/analytics/reporting";

export function FixtureDashboard() {
    const [snapshot, setSnapshot] = useState(() => createSyntheticDashboardSnapshot());
    const [status, setStatus] = useState<ReportStatus>("ready");
    const shown = structuredClone(snapshot);
    for (const key of reportKeys) {
        shown.reports[key].status = status;
        if (status !== "ready" && status !== "stale") {
            delete shown.reports[key].overview;
            delete shown.reports[key].comparison;
            delete shown.reports[key].rows;
        }
    }
    return <>
        <div className="border-b border-brand-100 bg-white px-4 py-3 text-brand-900 sm:px-6">
            <label className="flex flex-wrap items-center gap-3 text-sm font-semibold">Synthetic fixture availability
                <select value={status} onChange={event => setStatus(event.target.value as ReportStatus)} className="min-h-11 rounded-md border border-brand-400 bg-white px-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-900">
                    {["ready", "empty", "not_configured", "unavailable", "stale"].map(value => <option key={value} value={value}>{value.replaceAll("_", " ")}</option>)}
                </select>
            </label>
        </div>
        <AnalyticsDashboard snapshot={shown} fixture onRangeChange={(range: ReportRange) => setSnapshot(createSyntheticDashboardSnapshot(range))} />
    </>;
}
