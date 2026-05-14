import { NextResponse } from "next/server";
import { ScorpEstimatorInputSchema } from "@/lib/scorp/schema";
import { calculateFitScore } from "@/lib/scorp/calculateFitScore";
import { getFitLevel, isHighIntent } from "@/lib/scorp/getFitLevel";
import { calculateSavingsRange } from "@/lib/scorp/calculateSavingsRange";
import { mapToGhlPayload } from "@/lib/scorp/mapToGhlPayload";
import { getEnv } from "@/lib/config/env";
import { getTraceId, logger } from "@/lib/observability/logger";

export async function POST(request: Request) {
    const traceId = getTraceId();

    try {
        const body = await request.json();

        const validation = ScorpEstimatorInputSchema.safeParse(body);

        if (!validation.success) {
            logger.warn("Scorp validation failed", {
                traceId,
                issues: validation.error.issues,
            });
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid input data",
                    details: validation.error.issues,
                },
                { status: 400 }
            );
        }

        const input = validation.data;

        const fit_score = calculateFitScore(input);
        const scorp_fit_level = getFitLevel(fit_score);
        const scorp_estimated_savings = calculateSavingsRange(input);
        const high_intent_flag = isHighIntent(fit_score, input);

        const derived = {
            fit_score,
            scorp_fit_level,
            scorp_estimated_savings,
            high_intent_flag,
        };

        const ghlPayload = mapToGhlPayload(input, derived);

        logger.info("S-Corp fit calculated", {
            traceId,
            scorp_fit_level,
            fit_score,
        });

        const ghlWebhookUrl = getEnv("GHL_SCORP_ESTIMATOR_WEBHOOK_URL");

        if (ghlWebhookUrl) {
            const ghlResponse = await fetch(ghlWebhookUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(ghlPayload),
            });

            if (!ghlResponse.ok) {
                logger.warn("GHL Webhook failed", {
                    traceId,
                    status: ghlResponse.status,
                });
            }
        }

        return NextResponse.json({
            success: true,
            ...derived,
            message: "Calculation complete",
        });
    } catch (error) {
        logger.error("Scorp estimator error", {
            traceId,
            error: error instanceof Error ? error.message : "Unknown error",
        });
        return NextResponse.json(
            { success: false, message: "Failed to process estimate" },
            { status: 500 }
        );
    }
}