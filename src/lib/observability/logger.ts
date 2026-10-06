type LogLevel = "debug" | "info" | "warn" | "error";

type LogContext = Record<string, unknown> & {
  traceId?: string;
  userId?: string;
};

function serializeError(error: unknown) {
  // Provider messages can contain customer data and receipt/credential URLs.
  const categories = ["Error", "TypeError", "RangeError", "SyntaxError", "AbortError", "TimeoutError"];
  return { category: error instanceof Error && categories.includes(error.name) ? error.name : "UnknownError" };
}

function write(level: LogLevel, message: string, context: LogContext = {}) {
  const payload = redactObject({
    timestamp: new Date().toISOString(),
    level,
    service: "union-national-tax",
    traceId: context.traceId || "unavailable",
    message,
    ...context,
  });

  const line = JSON.stringify(payload);

  if (level === "error") {
    console.error(line);
    return;
  }

  if (level === "warn") {
    console.warn(line);
    return;
  }

  console.log(line);
}

export const logger = {
  debug(message: string, context?: LogContext) {
    write("debug", message, context);
  },
  info(message: string, context?: LogContext) {
    write("info", message, context);
  },
  warn(message: string, context?: LogContext) {
    write("warn", message, context);
  },
  error(message: string, error?: unknown, context: LogContext = {}) {
    write("error", message, {
      ...context,
      error: serializeError(error),
    });
  },
};

export function getTraceId(headers?: Headers): string {
  const incoming = headers?.get("x-request-id") || headers?.get("x-vercel-id");
  return incoming && /^[a-zA-Z\d:_-]{1,128}$/.test(incoming) ? incoming : crypto.randomUUID();
}

export type { LogLevel, LogContext };

const EMAIL_REDACT = "[REDACTED_EMAIL]";
const PHONE_REDACT = "[REDACTED_PHONE]";

const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
const phoneRegex =
  /(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;
const ssnRegex = /\d{3}[-.\s]?\d{2}[-.\s]?\d{4}/g;
const itinRegex = /\d{3}[-.\s]?\d{2}[-.\s]?\d{4}/g;

export function redactEmail(value: string): string {
  return value.replace(emailRegex, EMAIL_REDACT);
}

export function redactPhone(value: string): string {
  return value.replace(phoneRegex, PHONE_REDACT);
}

export function redactSSN(value: string): string {
  return value.replace(ssnRegex, "[REDACTED_SSN]");
}

export function redactITIN(value: string): string {
  return value.replace(itinRegex, "[REDACTED_ITIN]");
}

export function redactObject(
  obj: Record<string, unknown>,
  redactionFn?: (v: unknown, k: string) => unknown,
  depth = 0,
  seen = new WeakSet<object>(),
): Record<string, unknown> {
  if (depth > 6 || seen.has(obj)) return { omitted: "[REDACTED_COMPLEX]" };
  seen.add(obj);
  const result: Record<string, unknown> = Object.create(null);
  for (const [key, value] of Object.entries(obj).slice(0, 50)) {
    const normalizedKey = key.replace(/[^a-z]/gi, "").toLowerCase();
    if (/(email|phone|mobile|ssn|itin|taxid|name|company|address|street|city|zipcode|dob|birthdate|license|password|token|apikey|secret|authorization|cookie|session|userid|payload|answer|response|income|revenue|profit|sales|score)/.test(normalizedKey)) {
      result[key] = "[REDACTED]";
      continue;
    }
    if (Array.isArray(value)) {
      result[key] = value.slice(0, 50).map((item) =>
        item && typeof item === "object"
          ? redactObject(item as Record<string, unknown>, redactionFn, depth + 1, seen)
          : typeof item === "string"
            ? redactText(item)
            : typeof item === "bigint" ? "[REDACTED]" : item
      );
    } else if (value && typeof value === "object") {
      result[key] = redactObject(value as Record<string, unknown>, redactionFn, depth + 1, seen);
    } else if (typeof value === "string") {
      result[key] = redactText(value);
    } else {
      result[key] = typeof value === "bigint" ? "[REDACTED]" : redactionFn ? redactionFn(value, key) : value;
    }
  }

  return result;
}

function redactText(value: string): string {
  // Bound input before regex work, including nonmatching email-like strings.
  const bounded = value.slice(0, 1000)
    .replace(/https?:\/\/[^\s"'<>]+/gi, "[REDACTED_URL]")
    .replace(/\b(?:cs_(?:test|live)|(?:sk|rk)_(?:test|live)|whsec)_[a-zA-Z\d_]+\b/g, "[REDACTED_CREDENTIAL]")
    .replace(/\bBearer\s+[a-zA-Z\d_.~+/=-]+/gi, "[REDACTED_CREDENTIAL]")
    .replace(/\beyJ[a-zA-Z\d_.-]+/g, "[REDACTED_CREDENTIAL]");
  return redactITIN(redactSSN(redactPhone(redactEmail(bounded))));
}

export function createLogger(module: string) {
  return {
    debug(message: string, context?: LogContext) {
      write("debug", message, { module, ...context });
    },
    info(message: string, context?: LogContext) {
      write("info", message, { module, ...context });
    },
    warn(message: string, context?: LogContext) {
      write("warn", message, { module, ...context });
    },
    error(message: string, error?: unknown, context?: LogContext) {
      write("error", message, { module, ...context, error: serializeError(error) });
    },
    withTrace(traceId: string) {
      return {
        debug(message: string, context?: LogContext) {
          write("debug", message, { module, traceId, ...context });
        },
        info(message: string, context?: LogContext) {
          write("info", message, { module, traceId, ...context });
        },
        warn(message: string, context?: LogContext) {
          write("warn", message, { module, traceId, ...context });
        },
        error(message: string, error?: unknown, context?: LogContext) {
          write("error", message, {
            module,
            traceId,
            ...context,
            error: serializeError(error),
          });
        },
      };
    },
  };
}
