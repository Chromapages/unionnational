/**
 * Canonical on-site booking destination. It hosts the active Agent CRM calendar
 * and keeps every booking CTA on a URL we control.
 */
export const BOOKING_ROUTE = "/book";

/**
 * Retains intentionally configured destinations, but prevents legacy Calendly
 * links from routing visitors to retired or invalid scheduling pages.
 */
export function getBookingHref(configuredUrl?: string | null): string {
    const url = configuredUrl?.trim();

    if (!url) return BOOKING_ROUTE;

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
