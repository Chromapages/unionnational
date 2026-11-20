import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { readinessChecks } from "@/lib/config/env";
import { GET } from "./route";

describe("configuration readiness", () => {
  beforeEach(() => {
    for (const name of readinessChecks) vi.stubEnv(name, "configured");
    vi.stubEnv("NEXT_PUBLIC_BASE_URL", "https://unt.example.test");
    vi.stubEnv("SHOP_PAYMENTS_ENABLED", undefined);
    vi.stubEnv("STRIPE_SECRET_KEY", undefined);
    vi.stubEnv("STRIPE_WEBHOOK_SECRET", undefined);
    vi.stubEnv("SANITY_PAYMENT_PROJECT_ID", undefined);
    vi.stubEnv("GHL_SHOP_PURCHASE_WEBHOOK_URL", undefined);
  });
  afterEach(() => vi.unstubAllEnvs());

  it("reports unavailable without exposing integration settings or diagnostics", async () => {
    vi.stubEnv("GHL_WEBHOOK_URL", undefined);
    const response = GET();
    expect(response.status).toBe(503);
    expect(await response.json()).toEqual({ status: "not_ready" });
    expect(response.headers.get("Cache-Control")).toBe("no-store");
  });

  it("reports booking-only configuration without asserting payment or provider health", async () => {
    const response = GET();
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ status: "configuration_ready" });
    expect(response.headers.get("Cache-Control")).toBe("no-store");
  });

  it("does not report ready when payments are enabled without their configuration", async () => {
    vi.stubEnv("SHOP_PAYMENTS_ENABLED", "true");
    const response = GET();
    expect(response.status).toBe(503);
    expect(await response.json()).toEqual({ status: "not_ready" });
  });
});
