import { createHash, randomUUID } from "node:crypto";
import { Redis } from "@upstash/redis";
import { getEnv } from "@/lib/config/env";

const CLAIM_SECONDS = 30;
const COMPLETED_SECONDS = 600;
const MAX_LOCAL_ENTRIES = 1000;
const local = new Map<string, { value: string; expires: number }>();

const CLAIM_SCRIPT = `
local value = redis.call('GET', KEYS[1])
if value == 'done' then return 'duplicate' end
if value then return 'busy' end
redis.call('SET', KEYS[1], ARGV[1], 'EX', ARGV[2])
return 'claimed'`;
const COMPLETE_SCRIPT = `
if redis.call('GET', KEYS[1]) ~= ARGV[1] then return 0 end
redis.call('SET', KEYS[1], 'done', 'EX', ARGV[2])
return 1`;
const RELEASE_SCRIPT = `
if redis.call('GET', KEYS[1]) == ARGV[1] then return redis.call('DEL', KEYS[1]) end
return 0`;

type Claim = { state: "claimed"; complete: () => Promise<void>; release: () => Promise<void> } | { state: "busy" } | { state: "duplicate" };

export function revalidationReplayKey(signature: string, rawBody: string, document: { _id?: string; _rev?: string; _type: string }) {
    // Unsigned delivery headers cannot let a captured signed request evade deduplication.
    const identity = document._id && document._rev
        ? JSON.stringify([document._type, document._id, document._rev])
        : `${signature}\n${rawBody}`;
    return `sanity:revalidate:${createHash("sha256").update(identity).digest("hex")}`;
}

export async function claimRevalidation(key: string): Promise<Claim> {
    const token = `processing:${randomUUID()}`;
    const url = getEnv("UPSTASH_REDIS_REST_URL");
    const credential = getEnv("UPSTASH_REDIS_REST_TOKEN");
    if (url && credential) {
        const redis = new Redis({ url, token: credential, automaticDeserialization: false, retry: { retries: 0 }, signal: () => AbortSignal.timeout(2000) });
        const state = await redis.eval<[string, number], "claimed" | "busy" | "duplicate">(CLAIM_SCRIPT, [key], [token, CLAIM_SECONDS]);
        if (state === "busy") return { state };
        if (state === "duplicate") return { state };
        return {
            state,
            complete: async () => {
                const completed = await redis.eval<[string, number], number>(COMPLETE_SCRIPT, [key], [token, COMPLETED_SECONDS]);
                if (completed !== 1) throw new Error("REVALIDATION_CLAIM_LOST");
            },
            release: async () => { await redis.eval(RELEASE_SCRIPT, [key], [token]); },
        };
    }
    if (process.env.NODE_ENV === "production") throw new Error("REVALIDATION_STORAGE_UNAVAILABLE");

    const now = Date.now();
    for (const [entryKey, entry] of local) if (entry.expires <= now) local.delete(entryKey);
    const previous = local.get(key);
    if (previous) return { state: previous.value === "done" ? "duplicate" : "busy" };
    if (local.size >= MAX_LOCAL_ENTRIES) throw new Error("REVALIDATION_STORAGE_UNAVAILABLE");
    local.set(key, { value: token, expires: now + CLAIM_SECONDS * 1000 });
    return {
        state: "claimed",
        complete: async () => {
            if (local.get(key)?.value !== token) throw new Error("REVALIDATION_CLAIM_LOST");
            local.set(key, { value: "done", expires: Date.now() + COMPLETED_SECONDS * 1000 });
        },
        release: async () => { if (local.get(key)?.value === token) local.delete(key); },
    };
}
