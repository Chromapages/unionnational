import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import { checkRateLimit } from '@/lib/security/rate-limiter';
import { getEnv } from '@/lib/config/env';
import { logger } from '@/lib/observability/logger';

// Shared durable quotas use the Node runtime; rendered image dimensions remain fixed.
export const runtime = 'nodejs';
const FONT_URL = 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff';
const MAX_FONT_BYTES = 256 * 1024;

async function loadFont(): Promise<ArrayBuffer> {
    const response = await fetch(FONT_URL, { signal: AbortSignal.timeout(5000), cache: 'force-cache', next: { revalidate: 86400 } });
    if (!response.ok || !response.body || Number(response.headers.get('content-length') || 0) > MAX_FONT_BYTES) throw new Error('OG font unavailable');
    const reader = response.body.getReader();
    const chunks: Uint8Array[] = [];
    let length = 0;
    try {
        while (true) {
            const chunk = await reader.read();
            if (chunk.done) break;
            length += chunk.value.byteLength;
            if (length > MAX_FONT_BYTES) throw new Error('OG font size limit');
            chunks.push(chunk.value);
        }
    } finally { await reader.cancel().catch(() => {}); }
    if (!length) throw new Error('OG font empty');
    const bytes = new Uint8Array(length);
    let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
    return bytes.buffer;
}

export async function GET(req: NextRequest) {
    try {
        if (req.url.length > 4096) return new Response('Invalid image parameters', { status: 400 });
        const { searchParams } = new URL(req.url);
        const limits: Record<string, number> = { title: 160, subtitle: 240, date: 32, type: 16 };
        for (const [key, value] of searchParams) {
            if (!Object.hasOwn(limits, key) || searchParams.getAll(key).length !== 1 || value.length > limits[key] || /[\u0000-\u001f\u007f]/.test(value)) return new Response('Invalid image parameters', { status: 400 });
        }
        const title = searchParams.get('title') || 'Union National Tax';
        const subtitle = searchParams.get('subtitle') || 'Modern Tax Strategy';
        if (!['website', 'article', 'blog'].includes(searchParams.get('type') || 'website')) return new Response('Invalid image parameters', { status: 400 });
        const date = searchParams.get('date');
        if (process.env.NODE_ENV === 'production' && (!getEnv('UPSTASH_REDIS_REST_URL') || !getEnv('UPSTASH_REDIS_REST_TOKEN'))) return new Response('Image generation temporarily unavailable', { status: 503, headers: { 'Retry-After': '60' } });
        let quota;
        try { quota = await checkRateLimit('og:global', 60, 60000); }
        catch { return new Response('Image generation temporarily unavailable', { status: 503, headers: { 'Retry-After': '60' } }); }
        if (!quota.success) return new Response('Too many image requests', { status: 429, headers: { 'Retry-After': String(Math.max(1, Math.ceil((quota.resetTime - Date.now()) / 1000))) } });
        const fontData = await loadFont();

        return new ImageResponse(
            (
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#0f172a', // brand-900 (approx)
                        backgroundImage: 'radial-gradient(circle at 100% 0%, #d4af37 0%, #0f172a 50%)', // Gold accent
                        color: 'white',
                        fontFamily: '"Inter"',
                    }}
                >
                    {/* Logo / Brand Mark */}
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 40 }}>
                        {/* Using a simple shape/text for logo representation in OG if SVG is tricky to load remotely */}
                        <div style={{
                            padding: '10px 20px',
                            backgroundColor: 'rgba(255,255,255,0.1)',
                            borderRadius: '50px',
                            border: '1px solid rgba(212,175,55,0.3)',
                            color: '#d4af37',
                            fontSize: 20,
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            letterSpacing: '2px',
                        }}>
                            Union National Tax
                        </div>
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            padding: '0 60px',
                        }}
                    >
                        {/* Title */}
                        <div
                            style={{
                                fontSize: 60,
                                fontStyle: 'normal',
                                fontWeight: 'bold',
                                color: 'white',
                                lineHeight: 1.1,
                                marginBottom: 20,
                                textWrap: 'balance',
                            }}
                        >
                            {title}
                        </div>

                        {/* Subtitle / Metadata */}
                        <div
                            style={{
                                fontSize: 28,
                                color: '#94a3b8', // slate-400
                                marginTop: 10,
                            }}
                        >
                            {subtitle}
                        </div>

                        {/* Date if blog post */}
                        {date && (
                            <div
                                style={{
                                    fontSize: 20,
                                    color: '#d4af37', // gold-500
                                    marginTop: 30,
                                    fontWeight: 500
                                }}
                            >
                                {date}
                            </div>
                        )}

                    </div>

                    {/* Footer Decoration */}
                    <div style={{
                        position: 'absolute',
                        bottom: 40,
                        fontSize: 16,
                        color: 'rgba(255,255,255,0.3)',
                        letterSpacing: '1px',
                    }}>
                        unionnationaltax.com
                    </div>
                </div>
            ),
            {
                width: 1200,
                height: 630,
                headers: { 'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400' },
                fonts: [
                    {
                        name: 'Inter',
                        data: fontData,
                        style: 'normal',
                        weight: 700,
                    },
                ],
            },
        );
    } catch {
        logger.warn('OG image generation failed');
        return new Response(`Failed to generate the image`, {
            status: 503,
            headers: { 'Retry-After': '60' },
        });
    }
}
