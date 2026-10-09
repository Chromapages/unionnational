import { createAnalyticsReportHandler, getAnalyticsReport } from "@/lib/analytics/server/service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const GET = createAnalyticsReportHandler(getAnalyticsReport);
