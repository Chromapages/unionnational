import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    status: "ok",
    service: "union-national-tax",
    timestamp: new Date().toISOString(),
  });
}
