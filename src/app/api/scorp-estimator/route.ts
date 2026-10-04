import { NextResponse } from "next/server";
import { ScorpEstimatorInputSchema } from "@/lib/scorp/schema";
import { calculateFitScore } from "@/lib/scorp/calculateFitScore";
import { getFitLevel, isHighIntent } from "@/lib/scorp/getFitLevel";
import { calculateSavingsRange } from "@/lib/scorp/calculateSavingsRange";
import { mapToGhlPayload } from "@/lib/scorp/mapToGhlPayload";
import { getEnv } from "@/lib/config/env";
import { getTraceId, logger } from "@/lib/observability/logger";
import { checkRateLimit, contactRateLimitKey } from "@/lib/security/rate-limiter";
import { forwardToGhl, readLeadJson } from "@/lib/intake/shared";

export async function POST(request: Request) {
    const traceId = getTraceId(request.headers);

    try {
        const parsed = await readLeadJson(request);
        if (!parsed.ok) return NextResponse.json({ success: false, message: parsed.error }, { status: parsed.status });
        const body = parsed.value;

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
        const rateLimit = await checkRateLimit(contactRateLimitKey(input.email), 5, 60_000);
        if (!rateLimit.success) return NextResponse.json({ success: false, message: "Too many requests" }, { status: 429 });

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

        let lead_captured = false;
        if (ghlWebhookUrl) {
            try {
                const ghlResponse = await forwardToGhl(ghlPayload, ghlWebhookUrl, input.submission_id);
                lead_captured = ghlResponse.ok;
                if (!lead_captured) logger.warn("S-Corp lead webhook rejected", { traceId, status: ghlResponse.status });
            } catch (error) {
                logger.warn("S-Corp lead delivery unavailable", { traceId, reason: error instanceof Error ? error.name : "unknown" });
            }
        }

        return NextResponse.json({
            success: true,
            lead_captured,
            ...derived,
            message: lead_captured ? "Calculation complete; lead accepted" : "Calculation complete; lead delivery unavailable",
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
