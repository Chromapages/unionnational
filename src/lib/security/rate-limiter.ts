import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { createHash } from "node:crypto";
import { isIP } from "node:net";
import { getEnv } from "../config/env";

export const MAX_IN_MEMORY_RATE_LIMIT_ENTRIES = 10_000;
const CLEANUP_INTERVAL_MS = 1000;

export function getClientIdentifier(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const candidate = (forwarded ? forwarded.split(",")[0] : request.headers.get("x-real-ip"))?.trim();
  // This checks syntax only; the deployment must establish which proxy headers are trusted.
  return candidate && isIP(candidate) ? candidate : "anonymous";
}

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetTime: number;
}

interface RateLimiter {
  check(identifier: string, limit: number, windowMs: number): Promise<RateLimitResult>;
}

/** Upstash Redis-backed rate limiter */
class UpstashRateLimiter implements RateLimiter {
  private redis: Redis;
  private policies = new Map<string, Ratelimit>();

  constructor() {
    this.redis = new Redis({
      url: getEnv("UPSTASH_REDIS_REST_URL")!,
      token: getEnv("UPSTASH_REDIS_REST_TOKEN")!,
    });
  }

  async check(identifier: string, limit: number, windowMs: number): Promise<RateLimitResult> {
    const policy = `${limit}:${windowMs}`;
    let ratelimit = this.policies.get(policy);
    if (!ratelimit) {
      ratelimit = new Ratelimit({
        redis: this.redis,
        limiter: Ratelimit.fixedWindow(limit, `${Math.ceil(windowMs / 1000)} s`),
        analytics: false,
        prefix: `ratelimit:${policy}`,
      });
      this.policies.set(policy, ratelimit);
    }
    const result = await ratelimit.limit(identifier);
    return {
      success: result.success,
      remaining: Math.max(0, result.remaining),
      resetTime: result.reset,
    };
  }
}

/** In-memory fallback for single-instance deployments */
class InMemoryRateLimiter implements RateLimiter {
  private cache = new Map<string, { count: number; resetTime: number }>();
  private nextCleanupAt = 0;

  async check(identifier: string, limit: number, windowMs: number): Promise<RateLimitResult> {
    const now = Date.now();
    if (now >= this.nextCleanupAt) {
      for (const [key, record] of this.cache) {
        if (record.resetTime <= now) this.cache.delete(key);
      }
      this.nextCleanupAt = now + CLEANUP_INTERVAL_MS;
    }
    const key = `${limit}:${windowMs}:${identifier}`;
    const record = this.cache.get(key);

    if (!record || now >= record.resetTime) {
      if (!record && this.cache.size >= MAX_IN_MEMORY_RATE_LIMIT_ENTRIES) {
        // Keep every live quota intact; retry after the next expiry cleanup.
        return { success: false, remaining: 0, resetTime: this.nextCleanupAt };
      }
      const resetTime = now + windowMs;
      this.cache.set(key, { count: 1, resetTime });
      return { success: true, remaining: limit - 1, resetTime };
    }

    record.count = Math.min(record.count + 1, limit + 1);
    if (record.count > limit) {
      return { success: false, remaining: 0, resetTime: record.resetTime };
    }

    return { success: true, remaining: limit - record.count, resetTime: record.resetTime };
  }
}

let _limiter: RateLimiter | null = null;
let _warningLogged = false;

export function createRateLimiter(): RateLimiter {
  if (_limiter) return _limiter;

  const upstashUrl = getEnv("UPSTASH_REDIS_REST_URL");
  const upstashToken = getEnv("UPSTASH_REDIS_REST_TOKEN");
  const enableUpstash = getEnv("ENABLE_UPSTASH");

  const shouldUseUpstash =
    upstashUrl != null &&
    upstashToken != null &&
    (process.env.NODE_ENV === "production" || enableUpstash === "true");

  if (shouldUseUpstash) {
    _limiter = new UpstashRateLimiter();
    _warningLogged = false;
    return _limiter;
  }

  if (!_warningLogged) {
    console.warn(
      "[rate-limiter] Redis not configured — falling back to in-memory rate limiter. " +
        "This is fine for single-instance deployments but not for production multi-instance setups. " +
        "Set UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN, and ENABLE_UPSTASH=true to enable Redis-backed rate limiting."
    );
    _warningLogged = true;
  }

  _limiter = new InMemoryRateLimiter();
  return _limiter;
}

/**
 * Creates and returns the singleton rate limiter instance.
 * Call this at module initialization time; the returned instance
 * is reused for all subsequent calls.
 */
export function getRateLimiter(): RateLimiter {
  return createRateLimiter();
}

/**
 * Backward-compatible async API. All existing API route callers already
 * `await` this function, so making it async is a safe migration.
 * The underlying limiter uses the supplied policy for each route.
 *
 * @param identifier  Client IP or other tracking identifier
 * @param limit       Requests allowed per window
 * @param windowMs    Window length in milliseconds
 */
export async function checkRateLimit(
  identifier: string,
  limit = Number(getEnv("RL_MAX") ?? 10),
  windowMs = Number(getEnv("RL_WINDOW") ?? 60) * 1000
): Promise<RateLimitResult> {
  return getRateLimiter().check(
    identifier,
    Number.isInteger(limit) && limit > 0 ? limit : 10,
    Number.isFinite(windowMs) && windowMs > 0 ? windowMs : 60_000,
  );
}

/** Use validated contact data, never client-controlled forwarding headers, for lead quotas. */
export function contactRateLimitKey(email: string): string {
  return `contact:${createHash("sha256").update(email.trim().toLowerCase()).digest("hex")}`;
}
