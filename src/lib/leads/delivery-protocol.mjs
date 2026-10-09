import { createHash } from "node:crypto";

export const LEAD_RECEIPT_PATTERN = /^lead-delivery:v1:[a-f0-9]{64}$/;
export const LEAD_PENDING_RECOVERY_MIN_AGE_MS = 60_000;
export const LEAD_RESERVATION_LIMIT = 10_000;
// ponytail: seed with all existing database keys, conservatively including unrelated data.
// Counters never decrease; archival and exact namespace accounting need an approved replay policy.
export const LEAD_RESERVATION_NX = `
if redis.call('EXISTS', KEYS[1]) == 1 then return 0 end
local raw = redis.call('GET', KEYS[2])
local count = raw and tonumber(raw) or redis.call('DBSIZE')
if raw and (not tonumber(raw) or count < 0 or count ~= math.floor(count)) then return redis.error_reply('Invalid lead capacity accounting') end
if count >= tonumber(ARGV[2]) then return -1 end
redis.call('MSET', KEYS[2], count + 1, KEYS[1], ARGV[1])
return count + 1`;
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
