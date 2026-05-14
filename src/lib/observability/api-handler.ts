import { NextResponse } from "next/server";
import { getTraceId, createLogger, redactObject, logger } from "./logger";
import type { LogContext } from "./logger";

export interface ApiHandlerDeps {
  module: string;
  rateLimitMax?: number;
  rateLimitWindowMs?: number;
}

export interface ApiHandlerResult {
  traceId: string;
  log: {
    debug(message: string, context?: LogContext): void;
    info(message: string, context?: LogContext): void;
    warn(message: string, context?: LogContext): void;
    error(message: string, error?: unknown, context?: LogContext): void;
  };
  error: (message: string, err?: unknown, ctx?: LogContext) => void;
  json: <T>(data: T, init?: ResponseInit) => NextResponse;
  rateLimitHeaders: (remaining: number, resetAt: number) => Record<string, string>;
  jsonError: (message: string, status?: number) => NextResponse;
}

export function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  return (
    forwardedFor?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

type RateEntry = {
  count: number;
  resetAt: number;
};

const defaultRateLimitStore = new Map<string, RateEntry>();

export function checkRateLimit(
  ip: string,
  store: Map<string, RateEntry> = defaultRateLimitStore,
  max: number = 60,
  windowMs: number = 60 * 1000
): { limited: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const entry = store.get(ip);

  if (!entry || entry.resetAt <= now) {
    store.set(ip, { count: 1, resetAt: now + windowMs });
    return { limited: false, remaining: max - 1, resetAt: now + windowMs };
  }

  entry.count += 1;

  if (entry.count > max) {
    return { limited: true, remaining: 0, resetAt: entry.resetAt };
  }

  return { limited: false, remaining: max - entry.count, resetAt: entry.resetAt };
}

export function createApiHandler(
  request: Request,
  deps: ApiHandlerDeps
): ApiHandlerResult {
  const traceId = getTraceId(request.headers);
  const log = createLogger(deps.module).withTrace(traceId);

  function safeJson<T>(data: T, init?: ResponseInit): NextResponse {
    return NextResponse.json(data, init);
  }

  function errorResponse(message: string, status = 500): NextResponse {
    log.error(message);
    return NextResponse.json(
      { success: false, error: message },
      { status }
    );
  }

  function rateLimitHeadersFn(
    remaining: number,
    resetAt: number
  ): Record<string, string> {
    const retryAfterMs = Math.max(0, resetAt - Date.now());
    const headers: Record<string, string> = {
      "X-RateLimit-Remaining": String(remaining),
      "X-RateLimit-Reset": String(Math.ceil(resetAt / 1000)),
    };

    if (retryAfterMs > 0) {
      headers["Retry-After"] = String(Math.ceil(retryAfterMs / 1000));
    }

    return headers;
  }

  return {
    traceId,
    log,
    error: (message: string, err?: unknown, ctx?: LogContext) => {
      log.error(message, err, ctx);
    },
    json: safeJson,
    jsonError: errorResponse,
    rateLimitHeaders: rateLimitHeadersFn,
  };
}

export async function parseJsonBody<T = unknown>(
  request: Request,
  log: { warn(message: string, context?: LogContext): void; info(message: string, context?: LogContext): void }
): Promise<{ data: T; raw: unknown; error: null } | { data: null; raw: null; error: NextResponse }> {
  try {
    const raw = await request.json();
    return { data: raw as T, raw, error: null };
  } catch {
    log.warn("Invalid JSON body received");
    return {
      data: null,
      raw: null,
      error: NextResponse.json(
        { success: false, error: "Invalid JSON body" },
        { status: 400 }
      ),
    };
  }
}

export function logRedacted(
  log: { info(message: string, context?: LogContext): void; warn(message: string, context?: LogContext): void },
  event: string,
  data: Record<string, unknown>,
  sensitiveFields?: string[]
): void {
  const redacted = redactObject(data);

  if (sensitiveFields) {
    for (const field of sensitiveFields) {
      const keys = Object.keys(redacted);
      const match = keys.find(
        (k) => k.toLowerCase().includes(field.toLowerCase())
      );
      if (match) {
        redacted[match] = "[REDACTED_FIELD]";
      }
    }
  }

  log.info(event, redacted as LogContext);
}