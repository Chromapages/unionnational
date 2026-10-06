import { getEnv } from "@/lib/config/env";
import { z } from "zod";
import { deliverLead, LeadDeliveryError } from "@/lib/leads/delivery";

export const ApplicationSchema = z.object({
    firstName: z.string().trim().min(1).max(100),
    lastName: z.string().trim().min(1).max(100),
    email: z.string().trim().email().max(254),
    phone: z.string().trim().min(10).max(30),
    companyName: z.string().trim().min(1).max(200),
    revenue: z.enum(["UNDER_100K", "100K_500K", "500K_1M", "1M_3M", "3M_5M", "5M_PLUS"]),
    locale: z.enum(["en", "es"]).default("en"),
    submissionId: z.string().uuid().optional(),
});

export function normalizePhone(phone?: string): string | undefined {
    if (!phone) return undefined;

    const digits = phone.replace(/\D/g, "");
    if (digits.length === 10) return `+1${digits}`;
    if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
    if (phone.trim().startsWith("+") && digits.length >= 10) return `+${digits}`;

    return phone.trim();
}

export async function readLeadJson(request: Request): Promise<
    { ok: true; value: unknown } | { ok: false; status: 400 | 408 | 413 | 415; error: string }
> {
    if (request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !== "application/json") {
        return { ok: false, status: 415, error: "Expected application/json" };
    }
    const reader = request.body?.getReader();
    if (!reader) return { ok: false, status: 400, error: "Invalid JSON body" };
    const decoder = new TextDecoder();
    let body = "";
    let bytes = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const deadline = new Promise<never>((_resolve, reject) => {
        timer = setTimeout(() => {
            reject(new DOMException("Request deadline", "TimeoutError"));
            void reader.cancel().catch(() => undefined);
        }, 5_000);
    });
    try {
        while (true) {
            const { done, value } = await Promise.race([reader.read(), deadline]);
            if (done) break;
            bytes += value.byteLength;
            if (bytes > 32_768) {
                void reader.cancel().catch(() => undefined);
                return { ok: false, status: 413, error: "Request is too large" };
            }
            body += decoder.decode(value, { stream: true });
        }
        return { ok: true, value: JSON.parse(body + decoder.decode()) };
    } catch (error) {
        if (isLeadTimeout(error)) return { ok: false, status: 408, error: "Request timed out" };
        return { ok: false, status: 400, error: "Invalid JSON body" };
    } finally {
        clearTimeout(timer);
        reader.releaseLock();
    }
}

export async function forwardToGhl(payload: unknown, webhookUrl?: string, submissionId?: string, traceId?: string): Promise<Response> {
    const url = webhookUrl ?? getEnv("GHL_WEBHOOK_URL");

    if (!url) {
        throw new Error("GHL_WEBHOOK_URL is not configured");
    }

    return deliverLead(payload, url, submissionId, traceId);
}

export function isLeadTimeout(error: unknown): boolean {
    return !!error && typeof error === "object" && "name" in error && error.name === "TimeoutError";
}

export function leadFailureStatus(error: unknown): 409 | 502 | 503 | 504 {
    return error instanceof LeadDeliveryError ? error.status : isLeadTimeout(error) ? 504 : 502;
}
