import { NextResponse } from 'next/server';
import { checkRateLimit, getClientIdentifier } from '@/lib/security/rate-limiter';

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
        const data = await request.json();

        // Go High Level Webhook URL for Construction Applications
        const GHL_WEBHOOK_URL = "https://services.leadconnectorhq.com/hooks/N5KQjySifAxlxhrrvY8g/webhook-trigger/0f374f55-c653-49cd-b719-5bc7c1f6bd1b";

        // Send data to Go High Level
        const response = await fetch(GHL_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Failed to sync with CRM');
        }

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error("Webhook Error:", error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
