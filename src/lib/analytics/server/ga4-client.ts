import "server-only";
import type { ReportQuery } from "../reporting";
import type { Ga4PageKey } from "../page-policy";
import { buildReportRequest } from "./reports";

export class ReportingError extends Error {
    constructor(readonly code: "reporting_not_configured" | "upstream_unavailable" | "quota_exceeded") {
        super("Analytics reporting is unavailable.");
        this.name = "ReportingError";
    }
}

/** Token acquisition belongs to a separately approved server credential provider. */
export async function fetchGa4Report(options: {
    property: string; query: ReportQuery; pageKeys: readonly Ga4PageKey[]; signal: AbortSignal;
    getAccessToken: (signal: AbortSignal) => Promise<string>; transport: typeof fetch;
}): Promise<unknown> {
    if (!/^[1-9]\d{0,19}$/.test(options.property)) throw new ReportingError("reporting_not_configured");
    const token = await options.getAccessToken(options.signal);
    if (!token || /[\r\n]/.test(token)) throw new ReportingError("reporting_not_configured");
    const response = await options.transport(`https://analyticsdata.googleapis.com/v1beta/properties/${options.property}:runReport`, {
        method: "POST", cache: "no-store", redirect: "error", signal: options.signal,
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify(buildReportRequest(options.query, options.pageKeys)),
    });
    if (response.status === 401 || response.status === 403) throw new ReportingError("reporting_not_configured");
    if (response.status === 429) throw new ReportingError("quota_exceeded");
    if (!response.ok) throw new ReportingError("upstream_unavailable");
    // Bound parsing even if a provider or intermediary returns an unexpectedly large body.
    if (Number(response.headers.get("content-length")) > 1_000_000) throw new ReportingError("upstream_unavailable");
    const reader = response.body?.getReader();
    if (!reader) throw new ReportingError("upstream_unavailable");
    const decoder = new TextDecoder();
    let body = "";
    let bytes = 0;
    try {
        while (true) {
            const part = await reader.read();
            if (part.done) break;
            bytes += part.value.byteLength;
            if (bytes > 1_000_000) throw new ReportingError("upstream_unavailable");
            body += decoder.decode(part.value, { stream: true });
        }
        return JSON.parse(body + decoder.decode());
    } finally {
        await reader.cancel().catch(() => undefined);
        reader.releaseLock();
    }
}
