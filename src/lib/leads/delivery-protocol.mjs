import { createHash } from "node:crypto";

export const LEAD_RECEIPT_PATTERN = /^lead-delivery:v1:[a-f0-9]{64}$/;
export const LEAD_PENDING_RECOVERY_MIN_AGE_MS = 60_000;
export const LEAD_DELIVERY_CAS = `local raw = redis.call('GET', KEYS[1]); if not raw then return 0 end; local old = cjson.decode(raw); if old.owner ~= ARGV[1] or old.state ~= ARGV[2] or old.updatedAt ~= ARGV[3] then return 0 end; redis.call('SET', KEYS[1], ARGV[4]); return 1`;

/** @typedef {{owner:string,payloadHash:string,state:'pending'|'accepted'|'uncertain'|'retry_authorized',updatedAt:string,evidence?:string,operator?:string}} LeadRecord */
/** @param {LeadRecord} record */
export function leadRecordRevision(record) {
    return createHash("sha256").update([record.owner, record.state, record.updatedAt, record.payloadHash].join(":")).digest("hex");
}

/** @param {LeadRecord} record @param {'accepted'|'not_delivered'} decision @param {string} evidence @param {string} operator @returns {LeadRecord | null} */
export function reconciledLeadRecord(record, decision, evidence, operator) {
    if (!["pending", "uncertain"].includes(record.state) || !["accepted", "not_delivered"].includes(decision) || !evidence.trim() || evidence.length > 200 || !/^[a-zA-Z0-9._-]{1,100}$/.test(operator)) return null;
    if (record.state === "pending" && decision === "not_delivered") {
        const started = Date.parse(record.updatedAt);
        if (!Number.isFinite(started) || Date.now() - started < LEAD_PENDING_RECOVERY_MIN_AGE_MS) return null;
    }
    return { ...record, state: decision === "accepted" ? "accepted" : "retry_authorized", evidence, operator, updatedAt: new Date().toISOString() };
}
