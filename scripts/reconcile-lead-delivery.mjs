import { pathToFileURL } from "node:url";
import { Redis } from "@upstash/redis";
import { LEAD_DELIVERY_CAS, LEAD_RECEIPT_PATTERN, leadRecordRevision, reconciledLeadRecord } from "../src/lib/leads/delivery-protocol.mjs";

const HELP = "Usage: node scripts/reconcile-lead-delivery.mjs --receipt lead-delivery:v1:<sha256> [--decision accepted|not_delivered --operator <account-reference> --evidence <redacted-evidence-reference> --revision <sha256> --apply]\nDefault is read-only. Apply additionally requires LEAD_RECOVERY_APPLY_APPROVED=true and existing Redis credentials. A pending sender younger than 60 seconds cannot be marked not_delivered; verified receiver evidence is always required. No CRM request is made.";

/** Parse and validate before looking at credentials or making a storage request.
 * @param {string[]} args
 * @param {Record<string, string | undefined>} env
 */
export function leadRecoveryOptions(args, env = process.env) {
    if (args.includes("--help")) return { help: true };
    const options = { apply: false };
    const known = new Set(["receipt", "decision", "operator", "evidence", "revision"]);
    for (let index = 0; index < args.length; index++) {
        const argument = args[index];
        if (argument === "--apply" && !options.apply) { options.apply = true; continue; }
        const field = argument?.startsWith("--") ? argument.slice(2) : "";
        const value = args[++index];
        if (!known.has(field) || options[field] !== undefined || !value || value.startsWith("--")) throw new Error("Invalid lead recovery arguments; use --help");
        options[field] = value;
    }
    if (!LEAD_RECEIPT_PATTERN.test(options.receipt || "")) throw new Error("A valid hashed lead receipt is required");
    if (options.apply) {
        if (env.LEAD_RECOVERY_APPLY_APPROVED !== "true") throw new Error("Lead recovery apply authorization is not configured");
        if (!["accepted", "not_delivered"].includes(options.decision) || !/^[a-zA-Z0-9._-]{1,100}$/.test(options.operator || "") || !options.evidence?.trim() || options.evidence.length > 200 || !/^[a-f0-9]{64}$/.test(options.revision || "")) throw new Error("Apply requires decision, operator, redacted evidence reference and expected revision");
    }
    return options;
}

/** @param {string[]} args @param {{env?:Record<string,string|undefined>,redis?:{get:(key:string)=>Promise<any>,eval:(script:string,keys:string[],args:string[])=>Promise<any>},write?:(value:string)=>void}} dependencies */
export async function runLeadRecovery(args, { env = process.env, redis, write = console.log } = {}) {
    const options = leadRecoveryOptions(args, env);
    if (options.help) { write(HELP); return; }
    if (!redis) {
        if (!env.UPSTASH_REDIS_REST_URL || !env.UPSTASH_REDIS_REST_TOKEN) throw new Error("Shared lead recovery storage is not configured");
        redis = new Redis({ url: env.UPSTASH_REDIS_REST_URL, token: env.UPSTASH_REDIS_REST_TOKEN, retry: false, signal: () => AbortSignal.timeout(2_000) });
    }
    const record = await redis.get(options.receipt);
    if (!record || !/^[a-f0-9]{64}$/.test(record.payloadHash || "") || !["pending", "uncertain", "accepted", "retry_authorized"].includes(record.state) || !/^[a-f0-9-]{36}$/.test(record.owner || "") || !Number.isFinite(Date.parse(record.updatedAt))) throw new Error("Lead receipt record is missing or invalid");
    const revision = leadRecordRevision(record);
    // Output only state/version metadata. Never display a payload, email, destination or token.
    write(JSON.stringify({ mode: options.apply ? "apply" : "dry-run", receipt: options.receipt, state: record.state, updatedAt: record.updatedAt, revision }));
    if (!options.apply) return;
    if (revision !== options.revision) throw new Error("Lead receipt changed; review its current revision before applying");
    const next = reconciledLeadRecord(record, options.decision, options.evidence, options.operator);
    if (!next) throw new Error("Only pending or uncertain lead receipts can be reconciled");
    const changed = await redis.eval(LEAD_DELIVERY_CAS, [options.receipt], [record.owner, record.state, record.updatedAt, JSON.stringify(next)]);
    if (changed !== 1) throw new Error("Lead receipt changed concurrently; no recovery was applied");
    write(JSON.stringify({ event: "lead_delivery_reconciled", receipt: options.receipt, decision: options.decision, operator: options.operator }));
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    runLeadRecovery(process.argv.slice(2)).catch(() => { console.error("Lead recovery failed; verify arguments, authorization, storage and current receipt state. No CRM replay was attempted."); process.exitCode = 1; });
}
