import { publicEnv } from "@/lib/config/env";

/**
 * Canonical on-site booking destination. It hosts the active Agent CRM calendar
 * and keeps every booking CTA on a URL we control.
 */
export const BOOKING_ROUTE = "/book";

export function normalizeBookingReturnTo(value?: string): string | null {
    if (!value || !/^\/(?:[a-z0-9-]+(?:\/[a-z0-9-]+)*)?\/?(?:#[a-z0-9_-]+)?$/i.test(value)) return null;
    const path = value.replace(/^\/(?:en|es)(?=\/|#|$)/, "") || "/";
    return /^\/book(?:\/|#|$)/.test(path) ? null : path;
}

export function getBookingCtaText(localizedText: string | null | undefined, fallbackText: string) {
    return localizedText?.trim() || fallbackText;
}

function isLegacyContactBookingUrl(url: string) {
    try {
        const canonicalUrl = new URL(publicEnv.baseUrl);
        const parsedUrl = new URL(url, canonicalUrl);
        const hasExplicitOrigin = /^(?:[a-z][a-z\d+.-]*:)?\/\//i.test(url);
        const normalizeHostname = (hostname: string) => hostname.replace(/^www\./i, "").toLowerCase();

        if (
            hasExplicitOrigin
            && normalizeHostname(parsedUrl.hostname) !== normalizeHostname(canonicalUrl.hostname)
        ) {
            return false;
        }

        return /^\/(?:en\/|es\/)?contact\/?$/.test(parsedUrl.pathname);
    } catch {
        return false;
    }
}

/**
 * Retains intentionally configured destinations, but prevents legacy Calendly
 * links from routing visitors to retired or invalid scheduling pages.
 */
export function getBookingHref(configuredUrl?: string | null): string {
    const url = configuredUrl?.trim();

    if (!url) return BOOKING_ROUTE;
    if (isLegacyContactBookingUrl(url)) return BOOKING_ROUTE;

    try {
        const hostname = new URL(url).hostname.toLowerCase();
        if (hostname === "calendly.com" || hostname.endsWith(".calendly.com")) {
            return BOOKING_ROUTE;
        }
    } catch {
        // Relative application routes are valid CTA destinations.
    }

    return url;
}

export function isExternalBookingHref(href: string): boolean {
    try {
        const canonicalUrl = new URL(publicEnv.baseUrl);
        return new URL(href, canonicalUrl).origin !== canonicalUrl.origin;
    } catch {
        return false;
    }
}

export function isCtaAvailabilityActive(text?: string, endDate?: string, now = Date.now()): boolean {
    if (!text?.trim() || !endDate) return false;
    const expiration = Date.parse(`${endDate}T23:59:59.999Z`);
    return Number.isFinite(expiration) && now <= expiration;
}
