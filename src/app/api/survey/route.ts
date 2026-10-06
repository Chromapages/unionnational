import { NextResponse } from "next/server";
import { z } from "zod";
import { checkLeadIngress, checkLeadContact } from "@/lib/security/lead-ingress";
import { getEnv } from "@/lib/config/env";
import { getTraceId, logger } from "@/lib/observability/logger";
import { forwardToGhl, leadFailureStatus, readLeadJson } from "@/lib/intake/shared";
import { getHealthScoreCategory, type HealthScoreCategory } from "@/lib/intake/health-score";

const ContactInput = z.object({
    firstName: z.string().trim().min(1).max(100),
    lastName: z.string().trim().max(100).default(""),
    email: z.string().trim().email().max(254),
    phone: z.string().trim().max(30).default(""),
    answers: z.unknown(),
    lead_magnet_type: z.literal("PROACTIVE_CFO_ASSESSMENT").optional(),
    locale: z.enum(["en", "es"]).default("en"),
    source_page: z.string().max(200).optional(),
    submission_id: z.string().uuid().optional(),
});

const healthOptions: Record<number, number[]> = {
    1: [15, 10, 8, 3, 0], 2: [20, 10, 0, -10], 3: [15, 10, 5, 0, 3],
    4: [15, 10, 5, 0], 5: [12, 8, 4, 0], 6: [12, 8, 3, 0], 7: [11, 6, 0],
};

const cfoOptions: Record<number, Record<string, number>> = {
    1: { under50k: 1, "50k-150k": 2, "150k-500k": 3, "500k-1m": 4, over1m: 5 },
    2: { "sole-prop": 1, "single-llc": 2, "multi-llc": 3, scorp: 4, ccorp: 5 },
    3: { no: 1, sometimes: 2, quarterly: 4, proactive: 5 },
    4: { never: 1, "tax-time": 2, quarterly: 4, monthly: 5 },
    5: { no: 1, standard: 2, most: 4, all: 5 },
};

function trustedScore(answers: unknown, cfo: boolean): number | null {
    if (cfo) {
        if (!Array.isArray(answers) || answers.length !== 5) return null;
        const seen = new Set<number>();
        let total = 0;
        for (const item of answers) {
            if (!item || typeof item !== "object" || Array.isArray(item)) return null;
            const id = item.questionId;
            const answer = item.answer;
            if (!Number.isInteger(id) || seen.has(id) || typeof answer !== "string" || !Object.hasOwn(cfoOptions, id) || !Object.hasOwn(cfoOptions[id], answer)) return null;
            const score = cfoOptions[id][answer];
            if (!Number.isFinite(score)) return null;
            seen.add(id);
            total += score;
        }
        return Math.round(total / 25 * 100);
    }
    if (!answers || typeof answers !== "object" || Array.isArray(answers)) return null;
    const entries = Object.entries(answers);
    if (entries.length !== 7) return null;
    let total = 0;
    const seen = new Set<number>();
    for (const [id, answer] of entries) {
        const numericId = Number(id);
        if (String(numericId) !== id || seen.has(numericId) || !healthOptions[numericId]?.includes(answer as number)) return null;
        seen.add(numericId);
        total += answer as number;
    }
    return Math.max(0, total);
}

type Category = HealthScoreCategory;

const getCategoryLabel = (category: Category): string => {
    const labels: Record<Category, string> = {
        critical: "🚨 Critical Risk (Resolution)",
        stable: "⚠️ Stabilization Needed (Bookkeeping)",
        growth: "🚀 Growth Ready (CFO)",
    };
    return labels[category];
};

export async function POST(request: Request) {
    const traceId = getTraceId(request.headers);
    const ingress = await checkLeadIngress(request);
    if (!ingress.ok) return NextResponse.json({ success: false, error: ingress.error }, { status: ingress.status, headers: ingress.retryAfter ? { "Retry-After": ingress.retryAfter } : undefined });
    const parsed = await readLeadJson(request);
    if (!parsed.ok) return NextResponse.json({ success: false, error: parsed.error }, { status: parsed.status });
    const validation = ContactInput.safeParse(parsed.value);
    if (!validation.success) return NextResponse.json({ success: false, error: "Invalid survey contact or answers" }, { status: 400 });
    const { email, firstName, lastName, phone, answers, lead_magnet_type, locale, source_page, submission_id } = validation.data;
    const cfo = lead_magnet_type === "PROACTIVE_CFO_ASSESSMENT";
    if (!cfo && phone.length < 10) return NextResponse.json({ success: false, error: "Phone is required" }, { status: 400 });
    const score = trustedScore(answers, cfo);
    if (score === null) return NextResponse.json({ success: false, error: "Invalid survey answers" }, { status: 400 });
    const rateLimit = await checkLeadContact(email);
    if (!rateLimit.ok) return NextResponse.json({ success: false, error: rateLimit.error }, { status: rateLimit.status });
    const ghlWebhookUrl = getEnv("GHL_SURVEY_WEBHOOK_URL");
    if (!ghlWebhookUrl) return NextResponse.json({ success: false, error: "Survey capture unavailable" }, { status: 503 });

    const category = getHealthScoreCategory(score);
    const categoryLabel = getCategoryLabel(category);
    const payload = cfo
        ? buildCFOAssessmentPayload({
            email, firstName, lastName, phone, score, locale, source_page, submission_id,
            answers: (answers as Array<{ questionId: number; answer: string }>).map(({ questionId, answer }) => ({
                questionId, answer, score: cfoOptions[questionId][answer],
            })).sort((first, second) => first.questionId - second.questionId),
        })
        : {
            email, phone, firstName, lastName, name: `${firstName} ${lastName}`,
            submission_id,
            customData: {
                financial_health_score: score,
                health_category: category,
                health_category_label: categoryLabel,
                raw_answers: JSON.stringify(answers),
                source: "Financial Health Check Survey",
                locale,
                submitted_at: new Date().toISOString(),
            },
            tags: ["Survey Completed", `Health: ${categoryLabel}`],
        };

    try {
        const response = await forwardToGhl(payload, ghlWebhookUrl, submission_id);
        if (!response.ok) {
            logger.warn("Survey webhook rejected", { traceId, status: response.status });
            return NextResponse.json({ success: false, error: "Survey delivery failed" }, { status: 502 });
        }
        logger.info("Survey accepted", { traceId, score, category });
        return NextResponse.json({ success: true, score, category, categoryLabel });
    } catch (error) {
        logger.error("Survey delivery unavailable", undefined, { traceId, reason: error instanceof Error ? error.name : "unknown" });
        return NextResponse.json({ success: false, error: "Survey delivery unavailable" }, { status: leadFailureStatus(error) });
    }
}

function buildCFOAssessmentPayload({ email, firstName, lastName, phone, answers, score, locale, source_page, submission_id }: {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    answers: Array<{ questionId: number; answer: string | number; score: number }>;
    score: number;
    locale: string;
    source_page?: string;
    submission_id?: string;
}) {
    const revenueBand = answers.find(a => a.questionId === 1)?.answer as string;
    const entityType = answers.find(a => a.questionId === 2)?.answer as string;
    const hasTaxPlan = answers.find(a => a.questionId === 3)?.answer as string;

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
        source_page: source_page || "/proactive-cfo-assessment",
        lead_magnet_type: "PROACTIVE_CFO_ASSESSMENT",
        submitted_at: new Date().toISOString(),
        locale,
        submission_id,
        raw_answers: answers,
        contact: {
            first_name: firstName,
            last_name: lastName,
            email,
            phone,
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
