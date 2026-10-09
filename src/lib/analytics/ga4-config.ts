import "server-only";
import { ga4PolicySchema, type Ga4Policy } from "./page-policy";

export type Ga4ClientConfig = { measurementId: string; policy: Ga4Policy };

/** These gates require separate owner/provider/privacy acceptance; none are enabled here. */
export function getGa4ClientConfig(env: Record<string, string | undefined> = process.env): Ga4ClientConfig | null {
    if (["GA4_TRACKING_ENABLED", "GA4_PRIVACY_APPROVED", "GA4_PROPERTY_SETTINGS_CONFIRMED", "GA4_VENDOR_REVIEW_APPROVED"].some(key => env[key] !== "true")) return null;
    if (!/^G-[A-Z0-9]{6,15}$/.test(env.GA4_MEASUREMENT_ID || "")) return null;
    try {
        const policy = ga4PolicySchema.safeParse({
            origin: env.GA4_APPROVED_ORIGIN,
            approvedPageKeys: (env.GA4_APPROVED_PAGE_KEYS || "").split(",").map(key => key.trim()).filter(Boolean),
            campaigns: JSON.parse(env.GA4_APPROVED_CAMPAIGNS || '{"sources":[],"mediums":[],"campaigns":[]}'),
        });
        if (!policy.success || !policy.data.approvedPageKeys.length) return null;
        return { measurementId: env.GA4_MEASUREMENT_ID!, policy: policy.data };
    } catch { return null; }
}
