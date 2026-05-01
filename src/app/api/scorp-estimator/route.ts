import { NextResponse } from "next/server";
import { ScorpEstimatorInputSchema } from "@/lib/scorp/schema";
import { calculateFitScore } from "@/lib/scorp/calculateFitScore";
import { getFitLevel, isHighIntent } from "@/lib/scorp/getFitLevel";
import { calculateSavingsRange } from "@/lib/scorp/calculateSavingsRange";
import { mapToGhlPayload } from "@/lib/scorp/mapToGhlPayload";

/**
 * S-CORP ESTIMATOR API
 * Performs score calculations and relays precise payloads to GHL.
 */

const GHL_WEBHOOK_URL = process.env.GHL_SCORP_ESTIMATOR_WEBHOOK_URL || "https://services.leadconnectorhq.com/hooks/N5KQjySifAxlxhrrvY8g/webhook-trigger/oTTK7ye73Rp6corJiSCE";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        
        // 1. Validate Input
        const validation = ScorpEstimatorInputSchema.safeParse(body);
        
        if (!validation.success) {
            console.error("❌ Scorp Validation Failed:", validation.error.format());
            return NextResponse.json({ 
                success: false, 
                message: "Invalid input data", 
                details: validation.error.issues 
            }, { status: 400 });
        }

        const input = validation.data;

        // 2. Perform Calculations (Spec-Exact)
        const fit_score = calculateFitScore(input);
        const scorp_fit_level = getFitLevel(fit_score);
        const scorp_estimated_savings = calculateSavingsRange(input);
        const high_intent_flag = isHighIntent(fit_score, input);

        const derived = {
            fit_score,
            scorp_fit_level,
            scorp_estimated_savings,
            high_intent_flag
        };

        // 3. Map to GHL Contract
        const ghlPayload = mapToGhlPayload(input, derived);

        console.log(`✅ Calculated S-Corp Fit: ${scorp_fit_level} (${fit_score}) for ${input.email}`);

        // 4. Relay to GHL
        const ghlResponse = await fetch(GHL_WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(ghlPayload)
        });

        if (!ghlResponse.ok) {
            // Log but don't fail the user experience if it's just a webhook delay
            console.error(`⚠️ GHL Webhook failed: ${ghlResponse.status}`);
        }

        // 5. Return Results to Client
        return NextResponse.json({ 
            success: true, 
            ...derived,
            message: "Calculation complete"
        });

    } catch (error) {
        console.error("🚨 Scorp API Error:", error);
        return NextResponse.json({ 
            success: false, 
            message: "Failed to process estimate" 
        }, { status: 500 });
    }
}
