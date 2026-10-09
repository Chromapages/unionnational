"use client";

import { useId, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { reportQuerySchema, type AnalyticsReport, type DashboardSnapshot, type ReportRange, type ReportRow } from "@/lib/analytics/reporting";

const number = new Intl.NumberFormat("en-US");
const focus = "min-h-11 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-900";
const warnings: Record<AnalyticsReport["warnings"][number], string> = {
    consented_coverage: "Consented eligible pages only; this is not a count of all website visitors.",
    thresholded: "Google has withheld some data because of reporting thresholds.",
    sampled: "This report uses sampled data.",
    data_loss: "Some data is omitted or grouped; totals may be incomplete.",
    processing_delay: "Google is still processing this period. Values may change.",
    key_events_unavailable: "Lead and booking conversions are not configured.",
};

export function formatComparison(current: number, previous: number, rate = false): string {
    if (rate) {
        const points = (current - previous) * 100;
        return points === 0 ? "No change" : `${points > 0 ? "+" : ""}${points.toFixed(1)} percentage points`;
    }
    if (previous === 0) return current === 0 ? "No change (zero baseline)" : "No prior-period baseline";
    const change = (current - previous) / previous * 100;
    return change === 0 ? "No change" : `${change > 0 ? "+" : ""}${change.toFixed(1)}%`;
}

function Metadata({ report }: { report: AnalyticsReport }) {
    return <div className="mt-4 space-y-1 text-sm leading-relaxed text-slate-700">
        <p>{report.range.from} to {report.range.to} (inclusive) · {report.range.timezone}</p>
        <p>Report generated: {report.generatedAt ? <time dateTime={report.generatedAt}>{report.generatedAt}</time> : "Not available"}</p>
        <p>Collection start: {report.collectionStart ?? "Not verified"}</p>
        {report.warnings.length > 0 && <ul className="list-disc space-y-1 pl-5">{report.warnings.map(warning => <li key={warning}>{warnings[warning]}</li>)}</ul>}
    </div>;
}

function ReportSection({ title, report, children }: { title: string; report: AnalyticsReport; children: ReactNode }) {
    const heading = useId();
    const available = report.status === "ready" || report.status === "stale";
    return <section aria-labelledby={heading} className="min-w-0 rounded-xl border border-brand-100 bg-white p-5 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 id={heading} className="font-heading text-2xl font-semibold text-brand-950">{title}</h2>
            {report.status === "stale" && <p role="status" className="rounded-md bg-gold-100 px-3 py-2 text-sm font-semibold text-brand-900">Stale report</p>}
        </div>
        {available ? children : <p role="status" className="mt-5 rounded-md bg-slate-50 p-4 leading-relaxed text-slate-700">{
            report.status === "empty" ? "No data returned for this period. This does not establish zero traffic." :
            report.status === "not_configured" ? "Not configured. Reporting access or configuration is still pending." :
            report.reason === "quota_exceeded" ? "Temporarily unavailable. The reporting request limit was reached." :
            "Report unavailable. No values have been substituted."
        }</p>}
        {report.status === "stale" && <p className="mt-3 text-sm text-slate-700">Showing a previously generated report. It may not reflect current processing.</p>}
        <Metadata report={report} />
    </section>;
}

function DataTable({ rows, caption, columns }: { rows?: ReportRow[]; caption: string; columns: { key: keyof ReportRow["values"]; label: string }[] }) {
    if (!rows?.length) return <p role="status" className="mt-5 text-slate-700">No rows returned. Missing data is not zero.</p>;
    return <div className="mt-5 max-h-96 overflow-auto rounded-md border border-brand-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-900" tabIndex={0} role="region" aria-label={`${caption} table, scrollable`}>
        <table className="w-full text-left text-sm text-slate-700">
            <caption className="sr-only">{caption}</caption>
            <thead className="bg-slate-50 text-brand-900"><tr><th scope="col" className="px-4 py-3 font-semibold">{caption === "Daily traffic" ? "Date" : "Name"}</th>{columns.map(column => <th key={column.key} scope="col" className="whitespace-nowrap px-4 py-3 text-right font-semibold">{column.label}</th>)}</tr></thead>
            <tbody className="divide-y divide-brand-100">{rows.map(row => <tr key={row.key}><th scope="row" className="break-words px-4 py-3 font-medium">{row.label}</th>{columns.map(column => <td key={column.key} className="px-4 py-3 text-right tabular-nums">{row.values[column.key] === undefined ? "Not available" : number.format(row.values[column.key]!)}</td>)}</tr>)}</tbody>
        </table>
    </div>;
}

function Trend({ report }: { report: AnalyticsReport }) {
    const id = useId();
    const rows = report.rows ?? [];
    const complete = rows.length > 0 && rows.every(row => row.values.sessions !== undefined && row.values.views !== undefined);
    const maximum = Math.max(1, ...rows.flatMap(row => [row.values.sessions ?? 0, row.values.views ?? 0]));
    const points = (key: "sessions" | "views") => rows.map((row, index) => `${20 + index / Math.max(1, rows.length - 1) * 760},${160 - (row.values[key] ?? 0) / maximum * 130}`).join(" ");
    return <>
        {complete && <>
            <p className="mt-4 text-sm leading-relaxed text-slate-700">Daily sessions and page views. The vertical scale runs from 0 to {number.format(maximum)}. Daily unique users are not summed.</p>
            <svg viewBox="0 0 800 180" role="img" aria-labelledby={id} className="mt-4 w-full text-brand-500">
                <title id={id}>{`Daily traffic from ${report.range.from} to ${report.range.to}. Exact sessions and page views appear in the daily values table.`}</title>
                <line x1="20" y1="160" x2="780" y2="160" stroke="currentColor" strokeWidth="1" />
                <polyline points={points("sessions")} fill="none" stroke="var(--color-brand-500)" strokeWidth="3" />
                <polyline points={points("views")} fill="none" stroke="var(--color-gold-700)" strokeWidth="3" strokeDasharray="8 5" />
            </svg>
            <p className="text-sm text-slate-700">Solid line: sessions. Dashed line: page views.</p>
        </>}
        <details className="mt-4" open={!complete}>
            <summary className={`flex cursor-pointer items-center rounded-md py-3 font-semibold text-brand-900 ${focus}`}>View daily values</summary>
            <DataTable rows={report.rows} caption="Daily traffic" columns={[{ key: "sessions", label: "Sessions" }, { key: "views", label: "Page views" }]} />
        </details>
    </>;
}

export type AnalyticsDashboardProps = {
    snapshot: DashboardSnapshot;
    fixture: boolean;
    onRangeChange?: (range: ReportRange) => void;
};

export function AnalyticsDashboard({ snapshot, fixture, onRangeChange }: AnalyticsDashboardProps) {
    const { reports } = snapshot;
    const range = reports.overview.range;
    const [from, setFrom] = useState(range.from);
    const [to, setTo] = useState(range.to);
    const [error, setError] = useState("");
    const formId = useId();
    const periodDays = (Date.parse(range.to) - Date.parse(range.from)) / 86_400_000 + 1;
    const comparisonRange = reports.overview.comparison ? reports.overview.comparisonRange ?? (fixture ? {
        from: new Date(Date.parse(range.from) - periodDays * 86_400_000).toISOString().slice(0, 10),
        to: new Date(Date.parse(range.from) - 86_400_000).toISOString().slice(0, 10),
    } : undefined) : undefined;
    const metrics = [
        { key: "activeUsers", label: "GA4 active users", definition: "Users classified as active by GA4 for this exact period; not all website visitors." },
        { key: "sessions", label: "Sessions", definition: "GA4 sessions on eligible, consented pages." },
        { key: "views", label: "Page views", definition: "Page views on eligible, consented pages; repeated views count." },
        { key: "engagementRate", label: "Engagement rate", definition: "The share of GA4 sessions classified as engaged." },
    ] as const;
    function applyRange(nextFrom: string, nextTo: string) {
        if (!reportQuerySchema.safeParse({ report: "overview", from: nextFrom, to: nextTo }).success) {
            setError("Choose valid dates in order, with no more than 90 inclusive days.");
            return;
        }
        setError("");
        setFrom(nextFrom);
        setTo(nextTo);
        onRangeChange?.({ from: nextFrom, to: nextTo, timezone: range.timezone });
    }
    return <div className="min-h-dvh bg-slate-50 font-body text-brand-950">
        <a href="#analytics-content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-10 focus:rounded-md focus:bg-white focus:p-4 focus:outline-2 focus:outline-brand-900">Skip to analytics reports</a>
        <header className="border-b border-brand-100 bg-white px-5 py-5 sm:px-8">
            <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
                <p className="font-heading text-xl font-semibold text-brand-900">Union National Tax</p>
                <p className="text-sm text-slate-700">Analytics · Read-only</p>
            </div>
        </header>
        <main id="analytics-content" className="mx-auto max-w-7xl space-y-6 px-5 py-8 sm:px-8 sm:py-10">
            {fixture && <aside aria-label="Synthetic data disclosure" className="rounded-xl border border-gold-700 bg-gold-50 p-5 text-brand-900"><p className="font-heading font-bold">SYNTHETIC DEVELOPMENT DATA</p><p className="mt-1 text-sm leading-relaxed">Every value and date below is an invented fixture for interface review. These are not UNT results. Live access is blocked; no Google property is connected.</p></aside>}
            <div><h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">Website analytics</h1><p className="mt-3 max-w-3xl leading-relaxed text-slate-700">Traffic and CTA engagement across consented, eligible pages. Sensitive pages are excluded. Reports may be delayed or revised by Google.</p></div>
            <form onSubmit={event => { event.preventDefault(); applyRange(from, to); }} className="rounded-xl border border-brand-100 bg-white p-5 sm:p-6">
                <fieldset disabled={!onRangeChange} aria-describedby={`${formId}-help`}>
                    <legend className="font-heading text-lg font-semibold">Reporting period</legend>
                    <div className="mt-4 flex flex-wrap gap-3">{[7, 28].map(days => <Button key={days} type="button" variant="outline" className={`${focus} border-brand-400 text-brand-900`} onClick={() => applyRange(new Date(Date.parse(`${range.to}T00:00:00Z`) - (days - 1) * 86_400_000).toISOString().slice(0, 10), range.to)}>Last {days} days</Button>)}</div>
                    <div className="mt-4 grid items-end gap-4 sm:grid-cols-[1fr_1fr_auto]">
                        <label className="grid min-w-0 gap-2 text-sm font-semibold" htmlFor={`${formId}-from`}>From<input id={`${formId}-from`} type="date" required value={from} onChange={event => setFrom(event.target.value)} aria-invalid={Boolean(error)} aria-describedby={error ? `${formId}-error` : undefined} className={`min-w-0 max-w-full rounded-md border border-brand-400 bg-white px-3 py-2 font-body text-brand-900 ${focus}`} /></label>
                        <label className="grid min-w-0 gap-2 text-sm font-semibold" htmlFor={`${formId}-to`}>To<input id={`${formId}-to`} type="date" required value={to} onChange={event => setTo(event.target.value)} aria-invalid={Boolean(error)} aria-describedby={error ? `${formId}-error` : undefined} className={`min-w-0 max-w-full rounded-md border border-brand-400 bg-white px-3 py-2 font-body text-brand-900 ${focus}`} /></label>
                        <Button type="submit" className={focus}>Apply dates</Button>
                    </div>
                </fieldset>
                <p id={`${formId}-help`} className="mt-3 text-sm leading-relaxed text-slate-700">Up to 90 inclusive days. Timezone: {range.timezone}.{!onRangeChange && " Date changes are unavailable in this read-only snapshot."}</p>
                {error && <p id={`${formId}-error`} role="alert" className="mt-3 text-sm font-semibold text-brand-900">{error}</p>}
            </form>
            <ReportSection title="Overview" report={reports.overview}>
                {reports.overview.overview ? <>
                    <dl className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">{metrics.map(metric => {
                        const value = reports.overview.overview![metric.key];
                        const previous = reports.overview.comparison?.[metric.key];
                        return <div key={metric.key} className="border-l-2 border-brand-100 pl-4"><dt className="text-sm font-semibold text-slate-700">{metric.label}</dt><dd className="mt-2 font-heading text-3xl font-semibold tabular-nums text-brand-900">{metric.key === "engagementRate" ? `${(value * 100).toFixed(1)}%` : number.format(value)}</dd><dd className="mt-2 text-sm text-slate-700">{previous === undefined ? "Comparison unavailable" : formatComparison(value, previous, metric.key === "engagementRate")}</dd><dd className="mt-3 text-sm leading-relaxed text-slate-700">{metric.definition}</dd></div>;
                    })}</dl>
                    <p className="mt-5 text-sm text-slate-700">{!reports.overview.comparison ? "No comparison was returned for this report." : comparisonRange ? <>Comparison: {comparisonRange.from} to {comparisonRange.to} (inclusive).</> : "Comparison dates were not provided."}</p>
                </> : <p role="status" className="mt-5 text-slate-700">Overview values were not returned. Missing data is not zero.</p>}
            </ReportSection>
            <ReportSection title="Traffic trend" report={reports.trend}><Trend report={reports.trend} /></ReportSection>
            <div className="grid gap-6 lg:grid-cols-2">
                <ReportSection title="Acquisition" report={reports.acquisition}><p className="mt-4 text-sm text-slate-700">Sessions by GA4 session channel group.</p><DataTable rows={reports.acquisition.rows} caption="Acquisition channels" columns={[{ key: "sessions", label: "Sessions" }]} /></ReportSection>
                <ReportSection title="Pages" report={reports.pages}><p className="mt-4 text-sm text-slate-700">Page views by approved page label. Sensitive and unclassified pages are excluded.</p><DataTable rows={reports.pages.rows} caption="Eligible pages" columns={[{ key: "views", label: "Page views" }]} /></ReportSection>
            </div>
            <ReportSection title="CTA engagement" report={reports.ctas}><p className="mt-4 text-sm leading-relaxed text-slate-700">CTA activations are event counts, not leads or confirmed bookings. These independent totals do not form a same-user funnel.</p><DataTable rows={reports.ctas.rows} caption="Approved CTA activations" columns={[{ key: "events", label: "Activations" }]} /></ReportSection>
            <aside className="rounded-xl border border-brand-100 bg-white p-5 text-sm leading-relaxed text-slate-700"><h2 className="font-heading text-lg font-semibold text-brand-900">Conversions: not configured</h2><p className="mt-2">Lead and booking completion reporting requires approved, authenticated completion evidence. CTA clicks and calendar readiness are not conversions.</p></aside>
        </main>
    </div>;
}
