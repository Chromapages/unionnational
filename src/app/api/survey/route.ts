import { NextResponse } from "next/server";
import { checkRateLimit, getClientIdentifier } from "@/lib/security/rate-limiter";
import { getEnv } from "@/lib/config/env";
import { getTraceId, logger } from "@/lib/observability/logger";

const SCORE_THRESHOLDS = {
    critical: 40,
    stable: 75,
};

type Category = "critical" | "stable" | "growth";

const determineCategory = (score: number): Category => {
    if (score > SCORE_THRESHOLDS.stable) return "growth";
    if (score > SCORE_THRESHOLDS.critical) return "stable";
    return "critical";
};

const getCategoryLabel = (category: Category): string => {
    const labels: Record<Category, string> = {
        critical: "🚨 Critical Risk (Resolution)",
        stable: "⚠️ Stabilization Needed (Bookkeeping)",
        growth: "🚀 Growth Ready (CFO)",
    };
    return labels[category];
};

export async function POST(request: Request) {
    const traceId = getTraceId();
    const identifier = getClientIdentifier(request);
    const rateLimitResult = await checkRateLimit(identifier);
    const ghlWebhookUrl = getEnv("GHL_SURVEY_WEBHOOK_URL");

    if (!ghlWebhookUrl) {
        logger.error("Survey webhook URL not configured", { traceId });
        return NextResponse.json(
            { success: false, error: "Survey submission is not configured" },
            { status: 503 }
        );
    }

    if (!rateLimitResult.success) {
        return NextResponse.json(
            { error: "Too many requests. Please try again later." },
            {
                status: 429,
                headers: {
                    "Retry-After": String(
                        Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000)
                    ),
                },
            }
        );
    }

    try {
        const body = await request.json();
        const { email, firstName, lastName, phone, answers, score: clientScore, lead_magnet_type } = body;

        if (!email || !firstName || !lastName || !phone) {
            return NextResponse.json(
                { success: false, error: "All fields (name, email, phone) are required" },
                { status: 400 }
            );
        }

        const score = typeof clientScore === "number" ? clientScore : 0;

        // Handle Proactive CFO Assessment submission
        if (lead_magnet_type === "PROACTIVE_CFO_ASSESSMENT") {
            const cfoPayload = buildCFOAssessmentPayload({ email, firstName, lastName, phone, answers, score });
            const ghlResponse = await fetch(ghlWebhookUrl!, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(cfoPayload),
            });

            if (!ghlResponse.ok) {
                logger.error("GHL CFO assessment webhook failed", {
                    traceId,
                    status: ghlResponse.status,
                    statusText: ghlResponse.statusText,
                });
                throw new Error("Failed to sync CFO assessment with CRM");
            }

            logger.info("CFO Assessment submitted", { traceId, score });
            return NextResponse.json({ success: true, score });
        }

        // Default: Health/Survey submission
        const category = determineCategory(score);
        const categoryLabel = getCategoryLabel(category);

        const ghlPayload = {
            email,
            phone,
            firstName,
            lastName,
            name: `${firstName} ${lastName}`,
            customData: {
                financial_health_score: score,
                health_category: category,
                health_category_label: categoryLabel,
                raw_answers: JSON.stringify(answers),
                source: "Financial Health Check Survey",
                submitted_at: new Date().toISOString(),
            },
            tags: ["Survey Completed", `Health: ${categoryLabel}`],
        };

        const ghlResponse = await fetch(ghlWebhookUrl!, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(ghlPayload),
        });

        if (!ghlResponse.ok) {
            logger.error("GHL webhook failed", {
                traceId,
                status: ghlResponse.status,
                statusText: ghlResponse.statusText,
            });
            throw new Error("Failed to sync with CRM");
        }

        logger.info("Survey submitted", {
            traceId,
            score,
            category,
        });

        return NextResponse.json({
            success: true,
            score,
            category,
            categoryLabel,
        });
    } catch (error) {
        logger.error("Survey submission error", {
            traceId,
            error: error instanceof Error ? error.message : "Unknown error",
        });
        return NextResponse.json(
            { success: false, error: "Submission failed. Please try again." },
            { status: 500 }
        );
    }
}

function buildCFOAssessmentPayload({ email, firstName, lastName, phone, answers, score }: {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    answers: Array<{ questionId: number; answer: string | number; score: number }>;
    score: number;
}) {
    const revenueBand = answers.find(a => a.questionId === 1)?.answer as string;
    const entityType = answers.find(a => a.questionId === 2)?.answer as string;
    const hasTaxPlan = answers.find(a => a.questionId === 3)?.answer as string;
    const expenseReview = answers.find(a => a.questionId === 4)?.answer as string;
    const deductionLevel = answers.find(a => a.questionId === 5)?.answer as string;

    const revenueBandMap: Record<string, string> = {
        under50k: "UNDER_50K",
        "50k-150k": "50K_150K",
        "150k-500k": "150K_500K",
        "500k-1m": "500K_1M",
        over1m: "OVER_1M",
    };

    const entityMap: Record<string, string> = {
        "sole-prop": "SOLE_PROPRIETORSHIP",
        "single-llc": "LLC_SINGLE",
        "multi-llc": "LLC_MULTI",
        "scorp": "S_CORP",
        "ccorp": "C_CORP",
    };

    const painPointMap: Record<string, string> = {
        no: "NO_TAX_PLAN",
        sometimes: "REACTIVE_TAX",
        quarterly: "LIMITED_STRATEGY",
        proactive: "OPTIMIZED_TAX",
    };

    const highIntent = score >= 60;
    const fitScore = Math.min(100, Math.round(score * 1.2));

    return {
        version: "1.0",
        event_type: "CFO_ASSESSMENT_SUBMITTED",
        source_page: "/proactive-cfo-assessment",
        lead_magnet_type: "PROACTIVE_CFO_ASSESSMENT",
        submitted_at: new Date().toISOString(),
        contact: {
            first_name: firstName,
            last_name: lastName,
            email,
        },
        business: {
            business_name: "",
            niche_vertical: "GENERAL",
            annual_revenue_band: revenueBandMap[revenueBand] ?? "UNKNOWN",
            entity_type: entityMap[entityType] ?? "UNKNOWN",
        },
        intent: {
            primary_service_interest: "FRACTIONAL_CFO",
            primary_pain_point: hasTaxPlan ? painPointMap[hasTaxPlan] ?? "UNCLEAR_NUMBERS" : "NO_TAX_PLAN",
            consultation_type: "CFO_CLARITY_CALL",
            urgency_level: score < 40 ? "HIGH" : score < 60 ? "MEDIUM" : "LOW",
        },
        results: {
            cfo_assessment_score: score,
            high_intent_flag: highIntent,
            fit_score: fitScore,
        },
    };
}
