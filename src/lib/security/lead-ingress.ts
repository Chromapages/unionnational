import "server-only";
import { createHash } from "node:crypto";
import { isIP } from "node:net";
import { getEnv } from "@/lib/config/env";
import { logger } from "@/lib/observability/logger";
import { checkRateLimit, contactRateLimitKey } from "./rate-limiter";

type LeadGuard = { ok: true } | { ok: false; status: 403 | 429 | 503; error: string; retryAfter?: string };
const WINDOW = 60_000;
const TRUSTED_IP_HEADERS = new Set(["x-real-ip", "x-forwarded-for", "cf-connecting-ip", "true-client-ip"]);

/** Header identity is disabled until operations verifies proxy overwrite at the public ingress. */
export function leadRequesterKey(request: Request): string {
    const header = getEnv("LEAD_TRUSTED_IP_HEADER")?.toLowerCase();
    if (getEnv("LEAD_PROXY_HEADERS_VERIFIED") !== "true" || !header || !TRUSTED_IP_HEADERS.has(header)) return "anonymous";
    const raw = request.headers.get(header);
    const ip = (header === "x-forwarded-for" ? raw?.split(",")[0] : raw)?.trim();
    return ip && isIP(ip) ? createHash("sha256").update(ip).digest("hex") : "anonymous";
}

async function quota(key: string, limit: number): Promise<LeadGuard> {
    try {
        const result = await checkRateLimit(key, limit, WINDOW);
        return result.success ? { ok: true } : {
            ok: false, status: 429, error: "Too many requests. Please try again later.",
            retryAfter: String(Math.max(1, Math.ceil((result.resetTime - Date.now()) / 1000))),
        };
    } catch {
        logger.warn("Lead quota storage unavailable");
        return { ok: false, status: 503, error: "Lead submission is temporarily unavailable" };
    }
}

export async function checkLeadIngress(request: Request): Promise<LeadGuard> {
    const identity = leadRequesterKey(request);
    // Unknown visitors retain the global backstop; unverified headers never grant identities.
    if (identity !== "anonymous") {
        const requester = await quota(`lead-ingress:requester:${identity}`, 20);
        if (!requester.ok) return requester;
    }
    // Reject an exhausted verified caller before spending the shared receiver budget.
    const global = await quota("lead-ingress:global", 120);
    if (!global.ok) return global;
    const origin = request.headers.get("origin");
    let acceptedOrigin = !origin;
    try {
        const allowed = new Set([new URL(request.url).origin]);
        const configured = getEnv("NEXT_PUBLIC_BASE_URL");
        if (configured) allowed.add(new URL(configured).origin);
        acceptedOrigin = !origin || allowed.has(new URL(origin).origin);
    } catch { acceptedOrigin = false; }
    if (!acceptedOrigin || request.headers.get("sec-fetch-site") === "cross-site") {
        return { ok: false, status: 403, error: "Submission origin is not allowed" };
    }
    return { ok: true };
}

export async function checkLeadContact(email: string, limit = 5): Promise<LeadGuard> {
    // The contact budget is independent of the requester and never stores a raw address.
    return quota(contactRateLimitKey(email), limit);
}
