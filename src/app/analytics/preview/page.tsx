import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { FixtureDashboard } from "@/components/analytics/dashboard/FixtureDashboard";

export default async function AnalyticsPreview() {
    if (process.env.NODE_ENV !== "development" || process.env.ANALYTICS_FIXTURE_PREVIEW !== "true") notFound();
    const host = (await headers()).get("host") || "";
    if (!/^(?:localhost|127\.0\.0\.1|\[::1\])(?::\d+)?$/.test(host)) notFound();
    return <FixtureDashboard />;
}
