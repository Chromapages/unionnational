import { describe, expect, it, vi } from "vitest";

const missing = vi.hoisted(() => ({ values: [] as string[] }));
vi.mock("@/lib/config/env", () => ({ getMissingReadinessEnv: () => missing.values }));
import { GET } from "./route";

describe("configuration readiness", () => {
  it("reports missing lead and fulfillment configuration without claiming live delivery health", async () => {
    missing.values = ["GHL_WEBHOOK_URL", "GHL_SHOP_PURCHASE_WEBHOOK_URL"];
    const response = GET();
    expect(response.status).toBe(503);
    expect(await response.json()).toMatchObject({
      status: "not_ready",
      missing: missing.values,
      checks: { configuration: "missing_required_values", external_delivery: "not_probed", order_recovery: "not_probed" },
    });
  });

  it("reports configured without claiming live provider health", async () => {
    missing.values = [];
    const response = GET();
    expect(response.status).toBe(200);
    expect(await response.json()).toMatchObject({ status: "ready", checks: { external_delivery: "not_probed" } });
  });
});
