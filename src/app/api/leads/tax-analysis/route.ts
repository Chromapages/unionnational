import { NextResponse } from 'next/server';

const GHL_WEBHOOK_URL = 'https://services.leadconnectorhq.com/hooks/N5KQjySifAxlxhrrvY8g/webhook-trigger/7558f329-2812-4a3e-ad7e-964208181c78';

export async function POST(request: Request) {
    try {
        const data = await request.json();

        // Validate required fields
        const requiredFields = ['name', 'email', 'phone', 'businessType', 'revenueRange'];
        for (const field of requiredFields) {
            if (!data[field]) {
                return NextResponse.json(
                    { error: `Missing required field: ${field}` },
                    { status: 400 }
                );
            }
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            return NextResponse.json(
                { error: 'Invalid email address' },
                { status: 400 }
            );
        }

        // Log the lead data
        console.log('>>> [TAX ANALYSIS LEAD] New lead captured:', {
            timestamp: new Date().toISOString(),
            name: data.name,
            email: data.email,
            phone: data.phone,
            businessType: data.businessType,
            revenueRange: data.revenueRange,
            source: data.source,
        });

        // Forward to GHL webhook
        try {
            const ghlPayload = {
                name: data.name,
                email: data.email,
                phone: data.phone,
                business_type: data.businessType,
                revenue_range: data.revenueRange,
                source: data.source || 'unt-tax-analysis',
                timestamp: new Date().toISOString(),
            };

            const ghlResponse = await fetch(GHL_WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(ghlPayload),
            });

            if (!ghlResponse.ok) {
                console.error('>>> [TAX ANALYSIS LEAD] GHL webhook error:', ghlResponse.status, ghlResponse.statusText);
                // Don't fail the request — lead is still logged
            } else {
                console.log('>>> [TAX ANALYSIS LEAD] GHL webhook success');
            }
        } catch (webhookError) {
            // Log but don't fail — lead is captured in console
            console.error('>>> [TAX ANALYSIS LEAD] GHL webhook failed:', webhookError);
        }

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('>>> [TAX ANALYSIS LEAD] Error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
