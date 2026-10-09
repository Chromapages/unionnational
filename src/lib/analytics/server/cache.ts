import "server-only";
import type { AnalyticsReport } from "../reporting";

export const REPORT_TTL_MS = 15 * 60_000;
export const REPORT_STALE_GRACE_MS = 24 * 60 * 60_000;
export type CachedReport = { report: AnalyticsReport; savedAt: number };
export type ReportCache = {
    read: (key: string, now: number) => CachedReport | undefined;
    write: (key: string, report: AnalyticsReport, now: number) => void;
    delete: (key: string) => void;
};

/** Aggregate DTOs only: no sessions, tokens, denied responses, or raw Google payloads. */
export function createReportCache(maxEntries = 128): ReportCache {
    if (!Number.isInteger(maxEntries) || maxEntries < 1 || maxEntries > 128) throw new Error("Invalid cache bound");
    const entries = new Map<string, CachedReport>();
    return {
        read(key, now) {
            const entry = entries.get(key);
            if (!entry) return undefined;
            if (now < entry.savedAt || now - entry.savedAt > REPORT_TTL_MS + REPORT_STALE_GRACE_MS) {
                entries.delete(key);
                return undefined;
            }
            return structuredClone(entry);
        },
        write(key, report, now) {
            entries.delete(key);
            if (entries.size >= maxEntries) entries.delete(entries.keys().next().value!);
            entries.set(key, { report: structuredClone(report), savedAt: now });
        },
        delete(key) { entries.delete(key); },
    };
}
