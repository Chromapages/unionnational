import { NextResponse } from "next/server";

const CANONICAL_PATH = "/api/ghl-intake";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid JSON body" },
      { status: 400 }
    );
  }

  try {
    const canonicalUrl = new URL(CANONICAL_PATH, request.url);

    const response = await fetch(canonicalUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Intake-Proxy": "true",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Proxy failed",
      },
      { status: 502 }
    );
  }
}
