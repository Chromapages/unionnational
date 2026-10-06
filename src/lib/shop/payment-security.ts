import { createHmac, timingSafeEqual } from "node:crypto";

export const RECEIPT_COOKIE = "__Host-unt_shop_receipt";
export const RECEIPT_TTL_SECONDS = 24 * 60 * 60;
const MAX_GRANTS = 1;
type Grant = { s: string; e: number };

export function receiptCookieName(reference: unknown) {
    return typeof reference === "string" && /^order_[a-f0-9]{32}$/.test(reference) ? `${RECEIPT_COOKIE}_${reference.slice(6)}` : null;
}

export function oldReceiptCookieNames(header: string | null, currentName: string) {
    const names = header?.split(";").map(value => value.trim().split("=")[0]).filter(name => /^__Host-unt_shop_receipt_[a-f0-9]{32}$/.test(name) && name !== currentName) ?? [];
    return names.slice(0, Math.max(0, names.length - 4));
}

export function isCheckoutSessionId(value: unknown): value is string {
    return typeof value === "string" && /^cs_(?:test|live)_[A-Za-z0-9_]{1,200}$/.test(value);
}

export function purchaseReference(sessionId: string, secret: string): string {
    return `order_${createHmac("sha256", secret).update(`unt-purchase-reference:v1:${sessionId}`).digest("hex").slice(0, 32)}`;
}

function sign(payload: string, secret: string) {
    return createHmac("sha256", secret).update(`unt-guest-receipt:v1:${payload}`).digest("base64url");
}

function grants(value: string | undefined, secret: string, now: number): Grant[] {
    if (!value || value.length > 3000 || !secret) return [];
    const parts = value.split(".");
    if (parts.length !== 2 || !/^[A-Za-z0-9_-]+$/.test(parts[0]) || !/^[A-Za-z0-9_-]{43}$/.test(parts[1])) return [];
    const expected = Buffer.from(sign(parts[0], secret));
    const supplied = Buffer.from(parts[1]);
    if (expected.length !== supplied.length || !timingSafeEqual(expected, supplied)) return [];
    try {
        const parsed = JSON.parse(Buffer.from(parts[0], "base64url").toString("utf8"));
        if (parsed.v !== 1 || !Array.isArray(parsed.g) || parsed.g.length > MAX_GRANTS) return [];
        return parsed.g.filter((g: Grant) => g && isCheckoutSessionId(g.s) && Number.isInteger(g.e) && g.e > now && g.e <= now + RECEIPT_TTL_SECONDS);
    } catch { return []; }
}

export function issueReceiptCookie(sessionId: string, secret: string, now = Math.floor(Date.now() / 1000)) {
    if (!isCheckoutSessionId(sessionId) || !secret) throw new Error("Receipt configuration unavailable");
    const g = [{ s: sessionId, e: now + RECEIPT_TTL_SECONDS }];
    const payload = Buffer.from(JSON.stringify({ v: 1, g })).toString("base64url");
    return `${payload}.${sign(payload, secret)}`;
}

export function receiptSession(value: string | undefined, reference: unknown, secret: string, now = Math.floor(Date.now() / 1000)) {
    if (typeof reference !== "string" || !/^order_[a-f0-9]{32}$/.test(reference)) return null;
    return grants(value, secret, now).find(g => purchaseReference(g.s, secret) === reference)?.s ?? null;
}

export async function readWebhookBody(request: Request, maxBytes = 256 * 1024, timeoutMs = 5000): Promise<Buffer> {
    const length = request.headers.get("content-length");
    if (length && (!/^\d+$/.test(length) || Number(length) > maxBytes)) throw new Error("REQUEST_TOO_LARGE");
    const reader = request.body?.getReader();
    if (!reader) throw new Error("INVALID_BODY");
    let buffer = Buffer.allocUnsafe(Math.min(maxBytes, 8192));
    let total = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const expiresAt = Date.now() + timeoutMs;
    try {
        while (true) {
            const remaining = expiresAt - Date.now();
            if (remaining <= 0) throw new Error("BODY_TIMEOUT");
            const deadline = new Promise<never>((_, reject) => { timer = setTimeout(() => reject(new Error("BODY_TIMEOUT")), remaining); });
            const { value, done } = await Promise.race([reader.read(), deadline]);
            if (timer) clearTimeout(timer);
            if (done) return buffer.subarray(0, total);
            const nextTotal = total + value.byteLength;
            if (nextTotal > maxBytes) throw new Error("REQUEST_TOO_LARGE");
            if (nextTotal > buffer.length) {
                const expanded = Buffer.allocUnsafe(Math.min(maxBytes, Math.max(nextTotal, buffer.length * 2)));
                buffer.copy(expanded, 0, 0, total);
                buffer = expanded;
            }
            buffer.set(value, total);
            total = nextTotal;
        }
    } finally {
        if (timer) clearTimeout(timer);
        void reader.cancel().catch(() => {});
    }
}
