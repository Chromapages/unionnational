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
        env: ready ? "ok" : "missing_required_values",
      },
      missing,
      timestamp: new Date().toISOString(),
    },
    { status: ready ? 200 : 503 }
  );
}
