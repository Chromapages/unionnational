import "server-only";

export type AnalyticsStaff = { subject: string; visibility: "staff" };
export type AnalyticsAccessCode = "auth_not_configured" | "unauthenticated" | "forbidden";

export class AnalyticsAccessError extends Error {
    readonly status: number;
    constructor(readonly code: AnalyticsAccessCode) {
        super("Analytics access is unavailable.");
        this.name = "AnalyticsAccessError";
        this.status = code === "auth_not_configured" ? 503 : code === "unauthenticated" ? 401 : 403;
    }
}

/** Replace only after an approved identity provider verifies sessions and current staff membership. */
export async function requireAnalyticsStaff(): Promise<AnalyticsStaff> {
    throw new AnalyticsAccessError("auth_not_configured");
}
