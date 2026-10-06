import { beforeEach, describe, expect, it, vi } from "vitest";

const info = vi.hoisted(() => vi.fn());
vi.mock("./logger", () => ({ logger: { info } }));

import { incrementCounter, recordLatency, withLatency, withLatencyAsync } from "./request-metrics";

describe("request metric log sink", () => {
  beforeEach(() => info.mockClear());

  it("emits counters and latency with only approved dimensions", async () => {
    await incrementCounter("shop_checkout_session_created", {
      source: "shop-checkout", email: "private@example.test", provider: "stripe", error: "false", status: "200", constructor: "private-label",
    });
    await recordLatency("shop_webhook_fulfill_ms", 12);
    expect(info).toHaveBeenCalledWith("request_metric", {
      event: "request_metric", metric: "shop_checkout_session_created", kind: "counter", value: 1,
      tags: { source: "shop-checkout", provider: "stripe", error: "false", status: "200" },
    });
    expect(JSON.stringify(info.mock.calls)).not.toContain("private@example.test");
    expect(info).toHaveBeenLastCalledWith("request_metric", expect.objectContaining({ kind: "histogram", value: 12 }));
  });

  it("rejects invalid values and arbitrary metric labels", async () => {
    await recordLatency("shop_webhook_fulfill_ms", Number.NaN);
    await recordLatency("shop_webhook_fulfill_ms", -1);
    await incrementCounter("https://private.example.test/capability");
    expect(info).not.toHaveBeenCalled();
  });

  it("preserves sync values and errors while recording latency", () => {
    expect(withLatency("api_operation_ms", () => 42)).toBe(42);
    const error = new Error("operation failed");
    expect(() => withLatency("api_operation_ms", () => { throw error; })).toThrow(error);
    expect(info).toHaveBeenLastCalledWith("request_metric", expect.objectContaining({ tags: { error: "true" } }));
  });

  it("preserves async values and failures", async () => {
    await expect(withLatencyAsync("api_operation_ms", async () => 42)).resolves.toBe(42);
    const error = new Error("operation failed");
    await expect(withLatencyAsync("api_operation_ms", async () => { throw error; })).rejects.toBe(error);
    expect(info).toHaveBeenLastCalledWith("request_metric", expect.objectContaining({ tags: { error: "true" } }));
  });

  it("does not break requests when the log sink fails", async () => {
    info.mockImplementationOnce(() => { throw new Error("sink failed"); });
    await expect(incrementCounter("api_operation_count")).resolves.toBeUndefined();
  });
});
