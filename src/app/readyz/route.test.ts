import { describe, expect, it, vi } from "vitest";

const missing = vi.hoisted(() => ({ values: [] as string[] }));
vi.mock("@/lib/config/env", () => ({ getMissingReadinessEnv: () => missing.values }));
import { GET } from "./route";

describe("configuration readiness", () => {
  it("reports unavailable without exposing integration settings or diagnostics", async () => {
    missing.values = ["GHL_WEBHOOK_URL", "GHL_SHOP_PURCHASE_WEBHOOK_URL"];
    const response = GET();
    expect(response.status).toBe(503);
    expect(await response.json()).toEqual({ status: "not_ready" });
    expect(response.headers.get("Cache-Control")).toBe("no-store");
  });

  it("reports configured without claiming live provider health", async () => {
    missing.values = [];
    const response = GET();
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ status: "configuration_ready" });
    expect(response.headers.get("Cache-Control")).toBe("no-store");
  });
});
