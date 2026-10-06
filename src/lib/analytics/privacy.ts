const PREFERENCE_KEY = "unt-optional-tracking";
const CHOICE_EVENT = "unt-tracking-choice";
const PREFERENCE_TTL_MS = 180 * 24 * 60 * 60 * 1000;
const CAMPAIGN_KEYS = new Set(["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid", "fbclid"]);
let volatileChoice: boolean | null = null;
let toolsLoaded = false;
// This flag records a load starting, including requests that have not completed.
export function markOptionalToolsLoaded() {
    if (toolsLoaded) return;
    toolsLoaded = true;
    window.dispatchEvent(new Event(CHOICE_EVENT));
}
export function haveOptionalToolsLoaded() { return toolsLoaded; }
export function navigateWithoutOptionalTools(href: string) { window.location.replace(href); }

export function getTrackingChoice(): boolean | null {
    if (typeof window === "undefined") return null;
    try {
        const raw = window.localStorage.getItem(PREFERENCE_KEY);
        if (!raw) return null;
        const preference = JSON.parse(raw);
        if (preference.version !== 1 || typeof preference.allowed !== "boolean" || !Number.isFinite(preference.expiresAt)
            || preference.expiresAt <= Date.now() || preference.expiresAt > Date.now() + PREFERENCE_TTL_MS) return null;
        return preference.allowed;
    } catch { return volatileChoice; }
}

export function setTrackingChoice(allowed: boolean) {
    volatileChoice = allowed;
    if (!allowed) {
        const browser = window as Window & { fbq?: { queue?: unknown[] }; _fbqevq?: unknown[]; dataLayer?: unknown[] };
        for (const queue of [browser.fbq?.queue, browser._fbqevq, browser.dataLayer]) {
            if (Array.isArray(queue)) queue.length = 0;
        }
    }
    try { window.localStorage.setItem(PREFERENCE_KEY, JSON.stringify({ version: 1, allowed, expiresAt: Date.now() + PREFERENCE_TTL_MS })); } catch { /* Choice still applies in this document. */ }
    window.dispatchEvent(new Event(CHOICE_EVENT));
}

export function getTrackingExpiry(): number | null {
    try {
        const record = JSON.parse(window.localStorage.getItem(PREFERENCE_KEY) || 'null');
        return record?.version === 1 && typeof record.expiresAt === 'number' && Number.isFinite(record.expiresAt) ? record.expiresAt : null;
    } catch { return null; }
}

export function subscribeTrackingChoice(callback: () => void) {
    window.addEventListener(CHOICE_EVENT, callback);
    window.addEventListener("storage", callback);
    return () => { window.removeEventListener(CHOICE_EVENT, callback); window.removeEventListener("storage", callback); };
}

export function isTrackingPageAllowed(value: string): boolean {
    try {
        const url = new URL(value, "https://local.invalid");
        const sensitive = url.pathname.toLowerCase().split("/").some((segment) =>
            /assessment|estimator|estimate|intake|profit-blueprint|health-check|tax-savings-analysis/.test(segment)
            || ["apply", "success", "receipt", "checkout", "cart", "contact", "book", "booking", "books", "hq", "api"].includes(segment));
        if (sensitive || url.hash.includes("=")) return false;
        for (const [key, val] of url.searchParams) {
            if (!CAMPAIGN_KEYS.has(key) || val.length > 160 || !/^[a-zA-Z0-9 _.\-]*$/.test(val)) return false;
        }
        return true;
    } catch { return false; }
}

export function canUseOptionalTracking(): boolean {
    return typeof window !== "undefined" && getTrackingChoice() === true && isTrackingPageAllowed(window.location.href);
}
