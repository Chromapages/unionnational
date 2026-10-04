export function sanitizeReferrerUrl(referrer: string): string | undefined {
    try {
        const url = new URL(referrer);
        return url.protocol === "http:" || url.protocol === "https:" ? url.origin + url.pathname : undefined;
    } catch {
        return undefined;
    }
}
