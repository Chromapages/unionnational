import "server-only";
import { Ratelimit } from "@upstash/ratelimit";
import type { Redis } from "@upstash/redis";
import { createHash, randomUUID } from "node:crypto";
import { ReportingError } from "./ga4-client";

export type ReportQuota = {
    check: (verifiedSubject: string, property: string) => Promise<void>;
    acquire: (property: string) => Promise<() => Promise<void>>;
};

const acquireScript = `
local time = redis.call('TIME')
local now = tonumber(time[1]) * 1000 + math.floor(tonumber(time[2]) / 1000)
redis.call('ZREMRANGEBYSCORE', KEYS[1], '-inf', now)
if redis.call('ZCARD', KEYS[1]) >= 2 then return 0 end
redis.call('ZADD', KEYS[1], now + 10000, ARGV[1])
redis.call('PEXPIRE', KEYS[1], 10000)
return 1`;

async function boundedRedis<T>(operation: Promise<T>): Promise<T> {
    let timer: ReturnType<typeof setTimeout> | undefined;
    try {
        return await Promise.race([operation, new Promise<never>((_, reject) => {
            timer = setTimeout(() => reject(new ReportingError("upstream_unavailable")), 2_000);
        })]);
    } finally { clearTimeout(timer); }
}

/** No local fallback: caller supplies the owner's separately configured shared Redis client. */
export function createSharedReportQuota(redis: Redis): ReportQuota {
    const staffLimit = new Ratelimit({ redis, limiter: Ratelimit.fixedWindow(30, "60 s"), prefix: "unt:analytics:staff:v1", analytics: false, timeout: 2_000 });
    const propertyLimit = new Ratelimit({ redis, limiter: Ratelimit.fixedWindow(120, "60 s"), prefix: "unt:analytics:property:v1", analytics: false, timeout: 2_000 });
    return {
        async check(subject, property) {
            if (!subject || !/^[1-9]\d{0,19}$/.test(property)) throw new ReportingError("reporting_not_configured");
            const subjectKey = createHash("sha256").update(subject).digest("hex");
            for (const [limiter, key] of [[staffLimit, subjectKey], [propertyLimit, property]] as const) {
                const result = await boundedRedis(limiter.limit(key));
                if (result.reason === "timeout") throw new ReportingError("upstream_unavailable");
                if (!result.success) throw new ReportingError("quota_exceeded");
            }
        },
        async acquire(property) {
            if (!/^[1-9]\d{0,19}$/.test(property)) throw new ReportingError("reporting_not_configured");
            const key = `unt:analytics:refresh:v1:${property}`;
            const lease = randomUUID();
            if (await boundedRedis(redis.eval<[string], number>(acquireScript, [key], [lease])) !== 1) throw new ReportingError("quota_exceeded");
            return async () => { await boundedRedis(redis.zrem(key, lease)); };
        },
    };
}
