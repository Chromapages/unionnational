import { afterEach, describe, expect, it, vi } from "vitest";
import { createLogger, getTraceId, logger, redactObject } from "./logger";

describe("logger", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("writes structured info logs", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => undefined);

    logger.info("hello", { traceId: "trace-1", userId: "user-1", extra: true });

    const payload = JSON.parse(logSpy.mock.calls[0][0] as string);
    expect(payload).toMatchObject({
      level: "info",
      service: "union-national-tax",
      traceId: "trace-1",
      userId: "[REDACTED]",
      message: "hello",
      extra: true,
    });
    expect(payload.timestamp).toEqual(expect.any(String));
  });

  it("writes structured warning logs", () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => undefined);

    logger.warn("careful");

    const payload = JSON.parse(warnSpy.mock.calls[0][0] as string);
    expect(payload.level).toBe("warn");
    expect(payload.traceId).toBe("unavailable");
    expect(payload.userId).toBeUndefined();
  });

  it("serializes errors without stack traces", () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => undefined);

    logger.error("failed", new Error("boom"), { traceId: "trace-2" });

    const payload = JSON.parse(errorSpy.mock.calls[0][0] as string);
    expect(payload).toMatchObject({
      level: "error",
      message: "failed",
      traceId: "trace-2",
      error: {
        category: "Error",
      },
    });
    expect(payload.error.stack).toBeUndefined();
  });

  it("removes nested contact values, credentials and free-text emails from logs", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => undefined);
    logger.info("lead", {
      traceId: "trace-3",
      contact: { email: "jane@example.test", address: { street: "1 Main St" }, apiKey: "secret-key" },
      detail: [{ password: "secret", note: "reply to jane@example.test" }],
    });
    const line = logSpy.mock.calls[0][0] as string;
    expect(line).not.toContain("jane@example.test");
    expect(line).not.toContain("1 Main St");
    expect(line).not.toContain("secret-key");
    expect(line).not.toContain('"secret"');
    expect(JSON.parse(line).traceId).toBe("trace-3");
  });

  it("reads an incoming trace id or creates one", () => {
    expect(getTraceId(new Headers({ "x-request-id": "trace-header" }))).toBe("trace-header");
    expect(getTraceId(new Headers({ "x-vercel-id": "vercel-trace" }))).toBe("vercel-trace");
    expect(getTraceId()).toEqual(expect.any(String));
  });

  it("does not log receipt capabilities, webhook destinations or provider error text", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => undefined);
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => undefined);
    const session = ["cs", "test", "SyntheticReceiptCapability"].join("_");
    const endpoint = "https://example.test/hooks/private-capability?access_token=synthetic";
    logger.info(`lookup ${session}`, { detail: endpoint });
    logger.error("Provider failed", new Error("Customer Synthetic Person at a private address was rejected"));
    expect(JSON.stringify(logSpy.mock.calls)).not.toContain(session);
    expect(JSON.stringify(logSpy.mock.calls)).not.toContain(endpoint);
    expect(JSON.stringify(errorSpy.mock.calls)).not.toContain("Synthetic Person");
  });

  it("bounds cyclic and oversized log context without breaking the request", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => undefined);
    const context: Record<string, unknown> = { detail: "x".repeat(100_000) };
    context.circular = context;
    expect(() => logger.info("bounded", context)).not.toThrow();
    expect((logSpy.mock.calls[0][0] as string).length).toBeLessThan(6000);
  });

  it("does not accept an arbitrary oversized incoming trace identifier", () => {
    expect(getTraceId(new Headers({ "x-request-id": "x".repeat(2000) }))).toMatch(/^[a-f\d-]{36}$/);
  });

  it("applies the same privacy boundary to every module and traced severity", () => {
    const sinks = ["log", "warn", "error"] as const;
    const spies = sinks.map(sink => vi.spyOn(console, sink).mockImplementation(() => undefined));
    const moduleLogger = createLogger("delivery");
    const context = { email: "audit@example.invalid", receiptSession: "private", status: 503 };
    for (const target of [moduleLogger, moduleLogger.withTrace("trace-private")]) {
      target.debug("attempt", context);
      target.info("attempt", context);
      target.warn("attempt", context);
      target.error("attempt", { sensitiveDetail: "Synthetic Person" }, context);
    }
    logger.debug("standalone", context);
    for (const line of spies.flatMap(spy => spy.mock.calls.map(call => call[0] as string))) {
      expect(line).not.toContain("audit@example.invalid");
      expect(line).not.toContain("Synthetic Person");
      expect(line).not.toContain('"private"');
      expect(JSON.parse(line).status).toBe(503);
    }
    expect(spies[0]).toHaveBeenCalledTimes(5);
    expect(spies[1]).toHaveBeenCalledTimes(2);
    expect(spies[2]).toHaveBeenCalledTimes(2);
  });

  it("keeps logs serializable for primitive arrays, BigInt and nested metadata", () => {
    const output = redactObject({ items: [0, false, null, BigInt(42), "contact audit@example.invalid", { status: 429 }], count: BigInt(1), accepted: true });
    expect(() => JSON.stringify(output)).not.toThrow();
    expect(output).toMatchObject({ count: "[REDACTED]", accepted: true });
    expect(output.items).toEqual([0, false, null, "[REDACTED]", "contact [REDACTED_EMAIL]", { status: 429 }]);
  });

  it("does not mutate prototypes and limits oversized arrays or deep metadata", () => {
    const crafted = JSON.parse('{"__proto__":{"polluted":true},"safe":false}');
    const output = redactObject(crafted);
    expect(Object.getPrototypeOf(output)).toBeNull();
    expect(Object.prototype).not.toHaveProperty("polluted");
    const nested: Record<string, unknown> = {};
    let current = nested;
    for (let depth = 0; depth < 20; depth++) {
      const next: Record<string, unknown> = {};
      current.child = next;
      current = next;
    }
    const redacted = redactObject({ nested, values: Array.from({ length: 1000 }, () => true) });
    expect((redacted.values as unknown[]).length).toBe(50);
    expect(JSON.stringify(redacted)).toContain("REDACTED_COMPLEX");
  });
});
