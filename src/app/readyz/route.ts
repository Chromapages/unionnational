import { NextResponse } from "next/server";
import { getMissingReadinessEnv } from "@/lib/config/env";

export function GET() {
  const missing = getMissingReadinessEnv();
  const ready = missing.length === 0;

  return NextResponse.json(
    {
      status: ready ? "ready" : "not_ready",
      service: "union-national-tax",
      checks: {
        configuration: ready ? "ok" : "missing_required_values",
        external_delivery: "not_probed",
        order_recovery: "not_probed",
      },
      missing,
      timestamp: new Date().toISOString(),
    },
    { status: ready ? 200 : 503 }
  );
}
