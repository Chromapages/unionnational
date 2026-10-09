import { AnalyticsAccessError, requireAnalyticsStaff } from "@/lib/auth/analytics-access";

export default async function AnalyticsPage() {
    try { await requireAnalyticsStaff(); }
    catch (error) {
        if (!(error instanceof AnalyticsAccessError)) throw error;
        return <main id="analytics-content" className="mx-auto max-w-3xl p-6 sm:p-10">
            <p className="font-heading text-sm font-semibold uppercase tracking-wider text-gold-700">Union National Tax</p>
            <h1 className="mt-4 font-heading text-3xl font-bold">Analytics access is not configured</h1>
            <p role="status" className="mt-5 leading-relaxed">Live staff access is blocked until an approved sign-in provider and membership policy are configured. No reports are available here.</p>
        </main>;
    }
    return <main id="analytics-content" className="mx-auto max-w-3xl p-6"><h1 className="font-heading text-3xl font-bold">{process.env.ANALYTICS_DASHBOARD_ENABLED === "true" ? "Analytics reporting is not configured" : "Analytics dashboard is disabled"}</h1><p className="mt-4">Provider setup and reporting access require separate authorization.</p></main>;
}
