import "server-only";
import { z } from "zod";
import { AnalyticsAccessError, requireAnalyticsStaff, type AnalyticsStaff } from "@/lib/auth/analytics-access";
import { reportQuerySchema, type AnalyticsReport, type ReportQuery } from "../reporting";
import { createReportCache, REPORT_TTL_MS, type ReportCache } from "./cache";
import { fetchGa4Report, ReportingError } from "./ga4-client";
import { normalizeReport, REPORT_VERSION } from "./reports";
import type { ReportQuota } from "./quota";
import { ga4PolicySchema } from "../page-policy";

const configurationSchema = z.object({
    property: z.string().regex(/^[1-9]\d{0,19}$/),
    timezone: z.string().refine(timeZone => { try { new Intl.DateTimeFormat("en", { timeZone }); return true; } catch { return false; } }),
    templatesVerified: z.literal(true),
    approvedPageKeys: ga4PolicySchema.shape.approvedPageKeys.min(1),
    collectionStart: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
}).strict();
type ReportingConfiguration = z.infer<typeof configurationSchema>;
type ReportingDependencies = {
    authorize: () => Promise<AnalyticsStaff>;
    configuration: ReportingConfiguration | null;
    getAccessToken: (signal: AbortSignal) => Promise<string>;
    quota: ReportQuota;
    transport?: typeof fetch;
    cache?: ReportCache;
    now?: () => number;
};

export class AnalyticsReportQueryError extends Error {
    constructor() { super("Choose complete dates within 90 days in the property timezone."); }
}

/** Internal-only factory. Injection makes the future provider path testable without fake production identities. */
export function createReportingService(dependencies: ReportingDependencies) {
    const cache = dependencies.cache ?? createReportCache();
    const now = dependencies.now ?? Date.now;
    const inFlight = new Map<string, Promise<AnalyticsReport>>();
    let reportingBlocked = false;

    return async function readReport(input: unknown): Promise<AnalyticsReport> {
        const staff = await dependencies.authorize();
        if (!staff.subject || staff.visibility !== "staff") throw new AnalyticsAccessError("forbidden");
        const query = reportQuerySchema.parse(input);
        const parsedConfiguration = configurationSchema.safeParse(dependencies.configuration);
        const configuration = parsedConfiguration.success ? parsedConfiguration.data : null;
        const finish = async (report: AnalyticsReport) => {
            const current = await dependencies.authorize();
            if (current.subject !== staff.subject || current.visibility !== staff.visibility) throw new AnalyticsAccessError("forbidden");
            if (reportingBlocked) return unavailable("reporting_not_configured");
            return structuredClone(report);
        };
        const unavailable = (code: ReportingError["code"]): AnalyticsReport => ({
            report: query.report, status: code === "reporting_not_configured" ? "not_configured" : "unavailable",
            range: { from: query.from, to: query.to, timezone: configuration?.timezone ?? "Not configured" },
            reason: code, warnings: ["consented_coverage", "key_events_unavailable"],
        });
        if (!configuration || reportingBlocked) {
            return finish(unavailable("reporting_not_configured"));
        }
        const dateParts = Object.fromEntries(new Intl.DateTimeFormat("en", {
            timeZone: configuration.timezone, year: "numeric", month: "2-digit", day: "2-digit",
        }).formatToParts(now()).map(part => [part.type, part.value]));
        const propertyToday = `${dateParts.year}-${dateParts.month}-${dateParts.day}`;
        if (query.to >= propertyToday) throw new AnalyticsReportQueryError();
        // A verified staff identity, never forwarded IP, is charged before every cache read.
        try { await dependencies.quota.check(staff.subject, configuration.property); }
        catch (error) { return finish(unavailable(error instanceof ReportingError ? error.code : "upstream_unavailable")); }
        const key = JSON.stringify([configuration.property, REPORT_VERSION, staff.visibility, configuration.timezone, configuration.approvedPageKeys.toSorted(), query]);
        const cached = cache.read(key, now());
        if (cached && now() - cached.savedAt < REPORT_TTL_MS) return finish(cached.report);
        let refresh = inFlight.get(key);
        if (!refresh) {
            if (inFlight.size >= 2) return finish(unavailable("quota_exceeded"));
            refresh = (async () => {
                const release = await dependencies.quota.acquire(configuration.property);
                const controller = new AbortController();
                let timer: ReturnType<typeof setTimeout> | undefined;
                try {
                    const report = await Promise.race([
                        (async () => {
                            const raw = await fetchGa4Report({
                                property: configuration.property, query, pageKeys: configuration.approvedPageKeys, signal: controller.signal,
                                getAccessToken: dependencies.getAccessToken, transport: dependencies.transport ?? fetch,
                            });
                            const normalized = normalizeReport(raw, query, configuration.timezone, now(), configuration.approvedPageKeys);
                            normalized.reportVersion = REPORT_VERSION;
                            normalized.sourcePeriod = { from: query.from, to: query.to };
                            if (configuration.collectionStart) normalized.collectionStart = configuration.collectionStart;
                            return normalized;
                        })(),
                        new Promise<never>((_, reject) => { timer = setTimeout(() => {
                            controller.abort(); reject(new ReportingError("upstream_unavailable"));
                        }, 8_000); }),
                    ]);
                    if (report.status === "ready" || report.status === "empty") cache.write(key, report, now());
                    return report;
                } finally {
                    clearTimeout(timer);
                    await release().catch(() => undefined); // Lease also expires in shared storage after 10 seconds.
                }
            })().finally(() => { inFlight.delete(key); });
            inFlight.set(key, refresh);
        }
        try { return await finish(await refresh); }
        catch (error) {
            if (error instanceof AnalyticsAccessError) throw error;
            const code = error instanceof ReportingError ? error.code : "upstream_unavailable";
            if (code === "reporting_not_configured") {
                reportingBlocked = true; // Recreate the server adapter only after its grants/configuration are repaired.
                cache.delete(key);
            }
            // Re-read checks the grace window after the upstream deadline, not only before it.
            const stale = code !== "reporting_not_configured" ? cache.read(key, now()) : undefined;
            return finish(stale ? { ...stale.report, status: "stale", reason: code } : unavailable(code));
        }
    };
}

// Intentionally unwired: no env credential reads, Google requests, or local identity bypass.
export const getAnalyticsReport = createReportingService({
    authorize: requireAnalyticsStaff, configuration: null,
    getAccessToken: async () => { throw new ReportingError("reporting_not_configured"); },
    quota: {
        check: async () => { throw new ReportingError("reporting_not_configured"); },
        acquire: async () => { throw new ReportingError("reporting_not_configured"); },
    },
});

const privateHeaders = { "Cache-Control": "private, no-store, max-age=0", "Vary": "Cookie", "X-Content-Type-Options": "nosniff" };
export function createAnalyticsReportHandler(
    read: (query: ReportQuery) => Promise<AnalyticsReport>,
    authorize: () => Promise<AnalyticsStaff> = requireAnalyticsStaff,
) {
    return async (request: Request): Promise<Response> => {
        try {
            await authorize();
            const params = new URL(request.url).searchParams;
            const entries = Array.from(params.entries());
            const parsed = reportQuerySchema.safeParse(Object.fromEntries(entries));
            if (!parsed.success || new Set(entries.map(([name]) => name)).size !== entries.length) {
                return Response.json({ error: { code: "invalid_query", message: "Choose a report and inclusive dates within 90 days." } }, { status: 400, headers: privateHeaders });
            }
            const report = await read(parsed.data);
            await authorize();
            const status = report.status === "not_configured" ? 503 : report.status === "unavailable" ? (report.reason === "quota_exceeded" ? 429 : 503) : 200;
            return Response.json(report, { status, headers: privateHeaders });
        } catch (error) {
            if (error instanceof AnalyticsReportQueryError) {
                return Response.json({ error: { code: "invalid_query", message: error.message } }, { status: 400, headers: privateHeaders });
            }
            const accessError = error instanceof AnalyticsAccessError;
            return Response.json({ error: {
                code: accessError ? error.code : "upstream_unavailable", message: "Analytics reporting is unavailable.",
            } }, { status: accessError ? error.status : 503, headers: privateHeaders });
        }
    };
}
