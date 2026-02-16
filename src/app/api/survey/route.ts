import { NextResponse } from 'next/server';
import { checkRateLimit, getClientIdentifier } from '@/lib/security/rate-limiter';

// GHL Webhook URL
const GHL_WEBHOOK_URL = 'https://services.leadconnectorhq.com/hooks/N5KQjySifAxlxhrrvY8g/webhook-trigger/38c1c24e-ba10-44a7-a4b0-61be00786a16';

// Category thresholds (matching GHL Custom Field Options)
const SCORE_THRESHOLDS = {
    critical: 40,
    stable: 75,
};

type Category = 'critical' | 'stable' | 'growth';

const determineCategory = (score: number): Category => {
    if (score > SCORE_THRESHOLDS.stable) return 'growth';
    if (score > SCORE_THRESHOLDS.critical) return 'stable';
    return 'critical';
};

const getCategoryLabel = (category: Category): string => {
    const labels: Record<Category, string> = {
        critical: '🚨 Critical Risk (Resolution)',
        stable: '⚠️ Stabilization Needed (Bookkeeping)',
        growth: '🚀 Growth Ready (CFO)',
    };
    return labels[category];
};

export async function POST(request: Request) {
    const identifier = getClientIdentifier(request);
    const rateLimitResult = checkRateLimit(identifier);

    if (!rateLimitResult.success) {
        return NextResponse.json(
            { error: 'Too many requests. Please try again later.' },
            { status: 429, headers: { 'Retry-After': String(Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000)) } }
        );
    }

    try {
        const body = await request.json();
        const { email, firstName, lastName, phone, answers, score: clientScore } = body;

        // Validate required fields
        if (!email || !firstName || !lastName || !phone) {
            return NextResponse.json(
                { success: false, error: 'All fields (name, email, phone) are required' },
                { status: 400 }
            );
        }

        // Use client-provided score (already calculated from weighted options)
        const score = typeof clientScore === 'number' ? clientScore : 0;
        const category = determineCategory(score);
        const categoryLabel = getCategoryLabel(category);

        // Prepare GHL payload
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
                source: 'Financial Health Check Survey',
                submitted_at: new Date().toISOString(),
            },
            tags: ['Survey Completed', `Health: ${categoryLabel}`],
        };

        // Send to GHL Webhook
        const ghlResponse = await fetch(GHL_WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(ghlPayload),
        });

        if (!ghlResponse.ok) {
            console.error('GHL webhook failed:', await ghlResponse.text());
            throw new Error('Failed to sync with CRM');
        }

        // Return result to frontend
        return NextResponse.json({
            success: true,
            score,
            category,
            categoryLabel,
        });
    } catch (error) {
        console.error('Survey submission error:', error);
        return NextResponse.json(
            { success: false, error: 'Submission failed. Please try again.' },
            { status: 500 }
        );
    }
}
