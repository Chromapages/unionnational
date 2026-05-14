import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { getEnv } from "../config/env";

export function getClientIdentifier(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp;
  return "anonymous";
}

export interface RateLimitResult {
  success: boolean;
  resetTime: number;
}

interface RateLimiter {
  check(identifier: string): Promise<RateLimitResult>;
}

/** Upstash Redis-backed rate limiter */
class UpstashRateLimiter implements RateLimiter {
  private ratelimit: Ratelimit;

  constructor() {
    const redis = new Redis({
      url: getEnv("UPSTASH_REDIS_REST_URL")!,
      token: getEnv("UPSTASH_REDIS_REST_TOKEN")!,
    });

    const windowSeconds = Number(getEnv("RL_WINDOW") ?? 60);
    const maxRequests = Number(getEnv("RL_MAX") ?? 100);

    this.ratelimit = new Ratelimit({
      redis,
      limiter: Ratelimit.fixedWindow(maxRequests, `${windowSeconds} s`),
      analytics: false,
      prefix: "ratelimit",
    });
  }

  async check(identifier: string): Promise<RateLimitResult> {
    const result = await this.ratelimit.limit(identifier);
    return {
      success: result.success,
      resetTime: result.reset,
    };
  }
}

/** In-memory fallback for single-instance deployments */
class InMemoryRateLimiter implements RateLimiter {
  private cache = new Map<string, { count: number; resetTime: number }>();

  async check(identifier: string): Promise<RateLimitResult> {
    const now = Date.now();
    const record = this.cache.get(identifier);
    const windowMs = Number(getEnv("RL_WINDOW") ?? 60) * 1000;
    const limit = Number(getEnv("RL_MAX") ?? 100);

    if (!record || now > record.resetTime) {
      const resetTime = now + windowMs;
      this.cache.set(identifier, { count: 1, resetTime });
      return { success: true, resetTime };
    }

    record.count++;
    if (record.count > limit) {
      return { success: false, resetTime: record.resetTime };
    }

    return { success: true, resetTime: record.resetTime };
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
 * The underlying limiter is driven by RL_WINDOW / RL_MAX env vars.
 *
 * @param identifier  Client IP or other tracking identifier
 * @param limit       Ignored (kept for signature compat; configured via RL_MAX)
 * @param windowMs    Ignored (kept for signature compat; configured via RL_WINDOW)
 */
export async function checkRateLimit(
  identifier: string,
  limit = 10,
  windowMs = 60000
): Promise<RateLimitResult> {
  void limit;
  void windowMs;
  return getRateLimiter().check(identifier);
}