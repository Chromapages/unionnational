import { z } from "zod";

export const GA4_CONSENT_KEY = "unt-ga4-consent";
export const GA4_CONSENT_DENIAL_KEY = "unt-ga4-consent-denied";
export const GA4_CONSENT_TTL_MS = 180 * 24 * 60 * 60 * 1000;
const CHOICE_EVENT = "unt-ga4-consent-choice";
const consentSchema = z.object({
    version: z.literal(1), purpose: z.literal("ga4_analytics"), allowed: z.boolean(),
    grantedAt: z.number().int().nonnegative(), expiresAt: z.number().int().nonnegative(),
}).strict();
let blockedInDocument = false;

function readConsent() {
    if (typeof window === "undefined" || blockedInDocument) return null;
    try {
        if (window.sessionStorage.getItem(GA4_CONSENT_DENIAL_KEY) !== null) return null;
        const parsed = consentSchema.safeParse(JSON.parse(window.localStorage.getItem(GA4_CONSENT_KEY) || "null"));
        if (!parsed.success) return null;
        const now = Date.now(), record = parsed.data;
        if (record.grantedAt > now || record.expiresAt <= now ||
            record.expiresAt > record.grantedAt + GA4_CONSENT_TTL_MS) return null;
        return record;
    } catch { return null; }
}

export function getGa4Consent(): boolean { return readConsent()?.allowed === true; }
export function getGa4ConsentExpiry(): number | null { return readConsent()?.expiresAt ?? null; }

export function setGa4Consent(allowed: boolean): boolean {
    if (typeof window === "undefined") return false;
    blockedInDocument = true;
    let saved = false;
    try {
        const now = Date.now();
        const record = JSON.stringify({
            version: 1, purpose: "ga4_analytics", allowed: allowed === true,
            grantedAt: now, expiresAt: now + GA4_CONSENT_TTL_MS,
        });
        window.localStorage.setItem(GA4_CONSENT_KEY, record);
        if (window.localStorage.getItem(GA4_CONSENT_KEY) !== record) throw new Error("Consent was not saved");
        if (allowed === true) {
            // Only a verified fresh grant may lift a previous failed-save denial fence.
            window.sessionStorage.removeItem(GA4_CONSENT_DENIAL_KEY);
            if (window.sessionStorage.getItem(GA4_CONSENT_DENIAL_KEY) !== null) throw new Error("Consent remains blocked");
        }
        blockedInDocument = false;
        saved = true;
    } catch {
        // Either fallback can survive a reload. If both fail, callers must retain this document
        // and show a save error: browser storage cannot guarantee durable revocation then.
        try { window.localStorage.removeItem(GA4_CONSENT_KEY); } catch { /* Keep the document blocked. */ }
        try { window.sessionStorage.setItem(GA4_CONSENT_DENIAL_KEY, "1"); } catch { /* No persistent guarantee. */ }
    }
    window.dispatchEvent(new Event(CHOICE_EVENT));
    return saved;
}

export function subscribeGa4Consent(callback: () => void): () => void {
    if (typeof window === "undefined") return () => {};
    const storageChanged = (event: StorageEvent) => {
        if (event.key === GA4_CONSENT_KEY || event.key === GA4_CONSENT_DENIAL_KEY || event.key === null) callback();
    };
    window.addEventListener(CHOICE_EVENT, callback);
    window.addEventListener("storage", storageChanged);
    return () => {
        window.removeEventListener(CHOICE_EVENT, callback);
        window.removeEventListener("storage", storageChanged);
    };
}
