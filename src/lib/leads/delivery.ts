import "server-only";
import { createHash, randomUUID } from "node:crypto";
import { Redis } from "@upstash/redis";
import { z } from "zod";
import { getEnv } from "@/lib/config/env";
import { logger } from "@/lib/observability/logger";
import { LEAD_DELIVERY_CAS, LEAD_RECEIPT_PATTERN, LEAD_RESERVATION_NX, LEAD_RESERVATION_LIMIT, reconciledLeadRecord } from "./delivery-protocol.mjs";

type State = "pending" | "accepted" | "uncertain" | "retry_authorized";
type RecordState = { owner: string; payloadHash: string; state: State; updatedAt: string; evidence?: string; operator?: string };
const RecordSchema = z.object({ owner: z.string().uuid(), payloadHash: z.string().regex(/^[a-f0-9]{64}$/), state: z.enum(["pending", "accepted", "uncertain", "retry_authorized"]), updatedAt: z.string().datetime(), evidence: z.string().max(200).optional(), operator: z.string().max(100).optional() });
const localStore = new Map<string, RecordState>();
const localIdentities = new Map<string, string>();
let redis: Redis | undefined;

export class LeadDeliveryError extends Error {
    constructor(public readonly status: 409 | 502 | 503 | 504, message: string) { super(message); this.name = "LeadDeliveryError"; }
}

function store() {
    const url = getEnv("UPSTASH_REDIS_REST_URL");
    const token = getEnv("UPSTASH_REDIS_REST_TOKEN");
    if (url && token) {
        redis ??= new Redis({ url, token, retry: false, signal: () => AbortSignal.timeout(2_000) });
        return redis;
    }
    if (process.env.NODE_ENV === "production") throw new LeadDeliveryError(503, "Lead delivery storage is unavailable");
    return null;
}

// Ignore server-generated transport metadata only; retain every answer/contact/identity field.
function stablePayload(value: unknown, path: string[] = []): unknown {
    if (Array.isArray(value)) return value.map((child, index) => stablePayload(child, [...path, String(index)]));
    if (!value || typeof value !== "object") return value;
    const location = path.join(".");
    const transportFields = location === "" ? ["submitted_at", "submittedAt", "timestamp", "last_assessment_date", "submission_id", "submissionId"]
        : location === "meta" ? ["submitted_at", "submittedAt", "user_agent", "userAgent", "submission_id", "submissionId"]
        : location === "tracking" ? ["clientTimestamp", "client_timestamp"] : [];
    return Object.fromEntries(Object.entries(value).filter(([key]) => !transportFields.includes(key)).sort(([a], [b]) => a.localeCompare(b)).map(([key, child]) => [key, stablePayload(child, [...path, key])]));
}
const hash = (value: string) => createHash("sha256").update(value).digest("hex");

async function reserveShared(db: Redis, key: string, value: unknown, category: "identity" | "delivery"): Promise<boolean> {
    const count = await db.eval<unknown[], number>(LEAD_RESERVATION_NX, [key, `lead-capacity:v1:${category}`], [JSON.stringify(value), LEAD_RESERVATION_LIMIT]);
    if (count === -1) {
        logger.warn("Lead reservation capacity exhausted; operator review required", { event: "lead_capacity_exhausted", category, limit: LEAD_RESERVATION_LIMIT });
        throw new LeadDeliveryError(503, "Lead delivery storage is unavailable");
    }
    if (!Number.isInteger(count) || count < 0 || count > LEAD_RESERVATION_LIMIT) throw new LeadDeliveryError(503, "Lead delivery storage is unavailable");
    if (count >= LEAD_RESERVATION_LIMIT * 0.8) logger.warn("Lead reservation capacity reached eighty percent", { event: "lead_capacity_warning", category, count, limit: LEAD_RESERVATION_LIMIT });
    return count > 0;
}

async function reserveIdentity(key: string, payloadHash: string): Promise<void> {
    const db = store();
    let existing: string | undefined;
    if (db) {
        if (await reserveShared(db, key, { payloadHash }, "identity")) return;
        const record = z.object({ payloadHash: z.string().regex(/^[a-f0-9]{64}$/) }).parse(await db.get(key));
        existing = record.payloadHash;
    } else {
        existing = localIdentities.get(key);
        if (!existing) {
            if (localIdentities.size >= LEAD_RESERVATION_LIMIT) throw new LeadDeliveryError(503, "Lead delivery storage is unavailable");
            localIdentities.set(key, payloadHash);
            return;
        }
    }
    if (existing !== payloadHash) throw new LeadDeliveryError(409, "Submission identity was already used for different answers");
}

async function reserve(key: string, record: RecordState): Promise<RecordState> {
    const db = store();
    if (db) {
        if (await reserveShared(db, key, record, "delivery")) return record;
        return RecordSchema.parse(await db.get(key));
    }
    const previous = localStore.get(key);
    if (previous) return previous;
    if (localStore.size >= LEAD_RESERVATION_LIMIT) throw new LeadDeliveryError(503, "Lead delivery storage is unavailable");
    localStore.set(key, record);
    return record;
}

async function update(key: string, old: RecordState, next: RecordState): Promise<boolean> {
    const db = store();
    if (db) return await db.eval<unknown[], number>(LEAD_DELIVERY_CAS, [key], [old.owner, old.state, old.updatedAt, JSON.stringify(next)]) === 1;
    const current = localStore.get(key);
    if (!current || current.owner !== old.owner || current.state !== old.state || current.updatedAt !== old.updatedAt) return false;
    localStore.set(key, next);
    return true;
}

function destination(input: string): string {
    const url = new URL(input);
    const approved = url.hostname === "services.leadconnectorhq.com" || (process.env.NODE_ENV === "test" && url.hostname.endsWith(".test"));
    if (url.protocol !== "https:" || url.username || url.password || url.hash || !approved) throw new LeadDeliveryError(503, "Lead delivery destination is unavailable");
    return url.href;
}

/** Reserve before sending. Ambiguous responses are held until an authorized operator proves an outcome. */
export async function deliverLead(payload: unknown, configuredUrl: string, submissionId?: string, traceId?: string): Promise<Response> {
    const url = destination(configuredUrl);
    const payloadHash = hash(JSON.stringify(stablePayload(payload)));
    const identity = submissionId && z.string().uuid().safeParse(submissionId).success ? submissionId : payloadHash;
    const fields = payload && typeof payload === "object" ? payload as Record<string, unknown> : {};
    // The event namespace survives a receiver rotation; changing a URL must not authorize replay.
    const namespace = String(fields.event_type ?? fields.eventType ?? fields.source_page ?? fields.sourcePage ?? "lead");
    // Identical answers remain quarantined even if a browser reload generates a new UUID.
    const key = `lead-delivery:v1:${hash(namespace + ":" + payloadHash)}`;
    let record: RecordState = { owner: randomUUID(), payloadHash, state: "pending", updatedAt: new Date().toISOString() };
    try {
        if (submissionId) await reserveIdentity(`lead-identity:v1:${hash(namespace + ":" + identity)}`, payloadHash);
        const existing = await reserve(key, record);
        if (existing.payloadHash !== payloadHash) throw new LeadDeliveryError(409, "Submission identity was already used for different answers");
        if (existing.state === "accepted") return new Response(null, { status: 202, headers: { "X-Lead-Receipt": key, "X-Lead-Duplicate": "true" } });
        if (existing.owner !== record.owner) {
            if (existing.state !== "retry_authorized" || !await update(key, existing, record)) {
                throw new LeadDeliveryError(503, "Submission is awaiting delivery review. Your answers are preserved; do not start a new submission.");
            }
        }
    } catch (error) {
        if (error instanceof LeadDeliveryError) throw error;
        throw new LeadDeliveryError(503, "Lead delivery storage is unavailable");
    }
    try {
        const response = await fetch(url, {
            method: "POST", redirect: "error",
            headers: { "Content-Type": "application/json", "X-Submission-Id": identity, ...(traceId ? { "X-Trace-Id": traceId.slice(0, 200) } : {}) },
            body: JSON.stringify(payload), signal: AbortSignal.timeout(8_000),
        });
        const next: RecordState = { ...record, state: response.ok ? "accepted" : "uncertain", updatedAt: new Date().toISOString() };
        void response.body?.cancel().catch(() => undefined);
        if (!await update(key, record, next)) throw new LeadDeliveryError(503, "Submission is awaiting delivery review");
        record = next;
        if (!response.ok) throw new LeadDeliveryError(502, "Submission is awaiting delivery review");
        return new Response(null, { status: response.status, headers: { "X-Lead-Receipt": key } });
    } catch (error) {
        // Never delete or expire a possibly accepted submission and automatically replay it.
        if (record.state === "pending") {
            await update(key, record, { ...record, state: "uncertain", updatedAt: new Date().toISOString() }).catch(() => false);
        }
        logger.warn("Lead delivery requires receiver evidence", { receipt: key, outcome: "uncertain" });
        if (error instanceof LeadDeliveryError) throw error;
        const timeout = !!error && typeof error === "object" && "name" in error && error.name === "TimeoutError";
        throw new LeadDeliveryError(timeout ? 504 : 502, "Submission is awaiting delivery review");
    }
}

/** Server/operator-only recovery, after receiver evidence. No public route calls this function. */
export async function reconcileLeadDelivery(receipt: string, decision: "accepted" | "not_delivered", evidence: string, operator = "server-operator"): Promise<boolean> {
    if (!LEAD_RECEIPT_PATTERN.test(receipt)) return false;
    const db = store();
    const value = db ? await db.get(receipt) : localStore.get(receipt);
    const parsed = RecordSchema.safeParse(value);
    if (!parsed.success || !["pending", "uncertain"].includes(parsed.data.state)) return false;
    const next = reconciledLeadRecord(parsed.data, decision, evidence, operator);
    if (!next) return false;
    const updated = await update(receipt, parsed.data, next);
    if (updated) logger.info("Lead delivery reconciled by operator", { receipt, decision });
    return updated;
}
