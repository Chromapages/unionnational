import { NextResponse } from "next/server";
import { getMissingReadinessEnv } from "@/lib/config/env";

export function GET() {
  const missing = getMissingReadinessEnv();
  const ready = missing.length === 0;

  return NextResponse.json(
    { status: ready ? "configuration_ready" : "not_ready" },
    { status: ready ? 200 : 503, headers: { "Cache-Control": "no-store" } }
  );
}
