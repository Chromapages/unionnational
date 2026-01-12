import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);

        // Dynamic parameters
        const title = searchParams.get('title') || 'Union National Tax';
        const subtitle = searchParams.get('subtitle') || 'Modern Tax Strategy';
        const type = searchParams.get('type') || 'website';
        const date = searchParams.get('date');

        // Fonts - fetching Google Fonts dynamically or using local if preferred
        // For simplicity in this implementation, we'll try to use a standard fetch if supported, 
        // or rely on system fonts fallback if fetch fails complexity.
        // In production, best practice is to load font file buffers.

        const fontData = await fetch(
            new URL('https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff')
        ).then((res) => res.arrayBuffer());

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
    } catch (e: any) {
        console.log(`${e.message}`);
        return new Response(`Failed to generate the image`, {
            status: 500,
        });
    }
}
