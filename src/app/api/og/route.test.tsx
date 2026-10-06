import { beforeEach, describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';
import { GET } from './route';
import { checkRateLimit } from '@/lib/security/rate-limiter';

vi.mock('@/lib/security/rate-limiter', () => ({ checkRateLimit: vi.fn() }));
vi.mock('@/lib/config/env', () => ({ getEnv: () => 'synthetic-configured' }));
vi.mock('@/lib/observability/logger', () => ({ logger: { warn: vi.fn() } }));
vi.mock('next/og', () => ({ ImageResponse: class extends Response { constructor(_jsx: unknown, options: ResponseInit) { super('synthetic-image', options); } } }));
const fetchMock = vi.fn();
beforeEach(() => { vi.clearAllMocks(); vi.stubGlobal('fetch', fetchMock); vi.mocked(checkRateLimit).mockResolvedValue({ success: true, remaining: 1, resetTime: Date.now() + 1000 }); });

describe('bounded public OG rendering', () => {
    it('rejects invalid inputs before quota or outbound work', async () => {
        for (const query of [`title=${'a'.repeat(161)}`, 'title=a&title=b', 'type=unknown', 'url=https://example.test', 'date=%00']) {
            expect((await GET(new NextRequest(`https://example.test/api/og?${query}`))).status).toBe(400);
        }
        expect(fetchMock).not.toHaveBeenCalled();
        expect(checkRateLimit).not.toHaveBeenCalled();
    });
    it('enforces durable quota before fetching or rendering', async () => {
        vi.mocked(checkRateLimit).mockResolvedValue({ success: false, remaining: 0, resetTime: Date.now() + 1000 });
        expect((await GET(new NextRequest('https://example.test/api/og'))).status).toBe(429);
        expect(fetchMock).not.toHaveBeenCalled();
    });
    it('bounds font fetch with an abort signal and caps its stream', async () => {
        fetchMock.mockResolvedValue(new Response(new Uint8Array(256 * 1024 + 1)));
        expect((await GET(new NextRequest('https://example.test/api/og'))).status).toBe(503);
        expect(fetchMock.mock.calls[0][1].signal).toBeInstanceOf(AbortSignal);
        fetchMock.mockResolvedValue(new Response(new Uint8Array([1, 2, 3])));
        const response = await GET(new NextRequest('https://example.test/api/og?title=Approved'));
        expect(response.status).toBe(200);
        expect(response.headers.get('cache-control')).toContain('max-age=3600');
    });
});
