import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { GhlPayloadSchema } from "@/lib/ghl/contract";
import { z } from "zod";

/**
 * GHL INTAKE API
 * Central relay for all website leads to GoHighLevel.
 */

// Webhook Directory (To be expanded)
const WEBHOOKS = {
    SCORP_ESTIMATOR: "https://services.leadconnectorhq.com/hooks/N5KQjySifAxlxhrrvY8g/webhook-trigger/fuFRCBqmiYGcnpXSuhHA",
    DEFAULT: "https://services.leadconnectorhq.com/hooks/N5KQjySifAxlxhrrvY8g/webhook-trigger/fuFRCBqmiYGcnpXSuhHA" // Using provided as fallback
};

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const headerList = await headers();
        
        // 1. Inject Server-Side Metadata (with aggressive defaults)
        const enrichedBody = {
            ...body,
            meta: {
                version: body.meta?.version || "1.0",
                locale: body.meta?.locale || "en",
                submitted_at: body.meta?.submitted_at || new Date().toISOString(),
                user_agent: headerList.get("user-agent") || "unknown",
                ip_hash: headerList.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1",
            }
        };

        // 2. Validate against Contract
        const validation = GhlPayloadSchema.safeParse(enrichedBody);
        
        if (!validation.success) {
            const errorMsg = "GHL Validation Failed";
            console.error(`❌ ${errorMsg}:`, JSON.stringify(validation.error.format(), null, 2));
            return NextResponse.json({ 
                success: false, 
                error: errorMsg,
                details: validation.error.issues.map(e => `${e.path.join('.')}: ${e.message}`) 
            }, { status: 400 });
        }

        const payload = validation.data;
        console.log(`✅ Validated Lead: ${payload.event_type} (${payload.contact.email})`);

        // 3. Routing Logic
        let targetWebhook = WEBHOOKS.DEFAULT;
        if (payload.intent.lead_magnet_type === "SCORP_ESTIMATOR") {
            targetWebhook = WEBHOOKS.SCORP_ESTIMATOR;
        }

        // 4. Relay to GHL
        const ghlResponse = await fetch(targetWebhook, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        if (!ghlResponse.ok) {
            throw new Error(`GHL Webhook failed with status: ${ghlResponse.status}`);
        }

        // 5. Response
        return NextResponse.json({ 
            success: true, 
            message: "Lead successfully synchronized with CRM"
        });

    } catch (error) {
        console.error("🚨 Intake API Error:", error);
        
        // Fail gracefully - don't crash the frontend, but log the error
        return NextResponse.json({ 
            success: false, 
            message: "Failed to process lead intake" 
        }, { status: 500 });
    }
}
