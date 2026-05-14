import { afterEach, describe, expect, it, vi } from "vitest";
import { getTraceId, logger } from "./logger";

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
      userId: "user-1",
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
    expect(payload.userId).toBe("anonymous");
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
        name: "Error",
        message: "boom",
      },
    });
    expect(payload.error.stack).toBeUndefined();
  });

  it("reads an incoming trace id or creates one", () => {
    expect(getTraceId(new Headers({ "x-request-id": "trace-header" }))).toBe("trace-header");
    expect(getTraceId(new Headers({ "x-vercel-id": "vercel-trace" }))).toBe("vercel-trace");
    expect(getTraceId()).toEqual(expect.any(String));
  });
});
