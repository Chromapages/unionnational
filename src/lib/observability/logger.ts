type LogLevel = "debug" | "info" | "warn" | "error";

type LogContext = Record<string, unknown> & {
  traceId?: string;
  userId?: string;
};

function serializeError(error: unknown) {
  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
    };
  }

  return error;
}

function write(level: LogLevel, message: string, context: LogContext = {}) {
  const payload = {
    timestamp: new Date().toISOString(),
    level,
    service: "union-national-tax",
    traceId: context.traceId || "unavailable",
    userId: context.userId || "anonymous",
    message,
    ...context,
  };

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
  return (
    headers?.get("x-request-id") ||
    headers?.get("x-vercel-id") ||
    crypto.randomUUID()
  );
}

export type { LogLevel, LogContext };

const EMAIL_REDACT = "[REDACTED_EMAIL]";
const PHONE_REDACT = "[REDACTED_PHONE]";
const NAME_REDACT = "[REDACTED_NAME]";
const SCORE_REDACT = "[REDACTED_SCORE]";
const ID_REDACT = "[REDACTED_ID]";
const TEXT_REDACT = "[REDACTED_TEXT]";

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

export function redactName(value: string): string {
  const parts = value.trim().split(/\s+/);
  if (parts.length === 0) return NAME_REDACT;
  if (parts.length === 1) return parts[0][0] + "***";
  return parts[0][0] + "*** " + parts[parts.length - 1][0] + "***";
}

export function redactScore(value: unknown): unknown {
  if (typeof value === "number") return SCORE_REDACT;
  if (typeof value === "string") {
    const num = parseFloat(value);
    if (!isNaN(num)) return SCORE_REDACT;
  }
  return value;
}

export function redactLeadAnswer(value: unknown): unknown {
  if (typeof value === "string") {
    if (emailRegex.test(value)) return redactEmail(value);
    if (phoneRegex.test(value)) return redactPhone(value);
    if (ssnRegex.test(value)) return redactSSN(value);
    if (itinRegex.test(value)) return redactITIN(value);
    if (value.length > 100) return value.slice(0, 3) + "...";
    return TEXT_REDACT;
  }
  return value;
}

export function redactObject(
  obj: Record<string, unknown>,
  redactionFn: (v: unknown, k: string) => unknown = (v) => v
): Record<string, unknown> {
  const sensitiveKeys = [
    "email",
    "emailAddress",
    "phone",
    "phoneNumber",
    "mobile",
    "ssn",
    "socialSecurity",
    "itin",
    "taxId",
    "name",
    "firstName",
    "lastName",
    "fullName",
    "businessName",
    "company",
    "address",
    "street",
    "city",
    "state",
    "zip",
    "zipCode",
    "score",
    "leadScore",
    "creditScore",
    "answer",
    "response",
    "taxIncome",
    "revenue",
    "profit",
    "sales",
    "dob",
    "dateOfBirth",
    "birthDate",
    "driverLicense",
    "dlNumber",
    "password",
    "passwordHash",
    "token",
    "accessToken",
    "refreshToken",
    "apiKey",
    "secret",
    "authorization",
  ];

  const result: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(obj)) {
    const lowerKey = key.toLowerCase();

    if (sensitiveKeys.some((sk) => lowerKey.includes(sk))) {
      if (lowerKey.includes("email")) {
        result[key] = typeof value === "string" ? redactEmail(value) : value;
      } else if (
        lowerKey.includes("phone") ||
        lowerKey.includes("mobile")
      ) {
        result[key] =
          typeof value === "string" ? redactPhone(value) : value;
      } else if (
        lowerKey.includes("ssn") ||
        lowerKey.includes("socialSecurity")
      ) {
        result[key] =
          typeof value === "string" ? redactSSN(value) : value;
      } else if (lowerKey.includes("itin") || lowerKey.includes("taxId")) {
        result[key] =
          typeof value === "string" ? redactITIN(value) : value;
      } else if (
        lowerKey.includes("name") ||
        lowerKey.includes("first") ||
        lowerKey.includes("last") ||
        lowerKey.includes("full") ||
        lowerKey.includes("company") ||
        lowerKey.includes("business")
      ) {
        result[key] =
          typeof value === "string" ? redactName(value) : value;
      } else if (
        lowerKey.includes("score") ||
        lowerKey.includes("income") ||
        lowerKey.includes("revenue") ||
        lowerKey.includes("profit") ||
        lowerKey.includes("sales")
      ) {
        result[key] = redactScore(value);
      } else {
        result[key] = redactionFn(value, key);
      }
    } else if (Array.isArray(value)) {
      result[key] = value.map((item) =>
        typeof item === "object" && item !== null
          ? redactObject(item as Record<string, unknown>, redactionFn)
          : item
      );
    } else if (typeof value === "object" && value !== null) {
      result[key] = redactObject(value as Record<string, unknown>, redactionFn);
    } else {
      result[key] = value;
    }
  }

  return result;
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