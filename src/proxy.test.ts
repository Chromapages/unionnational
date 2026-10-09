import { describe, expect, it, vi } from 'vitest';
import { NextRequest, NextResponse } from 'next/server';
import proxy, { config } from './proxy';

vi.mock('next-intl/middleware', () => ({ default: () => (request: NextRequest) => NextResponse.rewrite(new URL('/en', request.url), { request: { headers: request.headers } }) }));
describe('nonce forwarding', () => {
    it('keeps analytics outside the public locale layout, including localized aliases', () => {
        const root = proxy(new NextRequest('https://example.test/analytics'));
        expect(root.headers.get('x-middleware-rewrite')).toBeNull();
        const alias = proxy(new NextRequest('https://example.test/es/analytics/preview'));
        expect(alias.headers.get('location')).toBe('https://example.test/analytics/preview');
        expect(alias.headers.get('Cache-Control')).toContain('no-store');
    });
    it('overwrites client nonce headers and forwards matching policies through locale rewriting', () => {
        const request = new NextRequest('https://example.test/en/about', { headers: { 'x-nonce': 'attacker-supplied', 'content-security-policy': "script-src 'unsafe-inline'" } });
        const response = proxy(request);
        const nonce = response.headers.get('x-middleware-request-x-nonce');
        expect(nonce).toBeTruthy();
        expect(nonce).not.toBe('attacker-supplied');
        expect(response.headers.get('Content-Security-Policy')).toContain(`'nonce-${nonce}'`);
        expect(response.headers.get('x-middleware-request-content-security-policy')).toBe(response.headers.get('Content-Security-Policy'));
        const next = proxy(request);
        expect(next.headers.get('x-middleware-request-x-nonce')).not.toBe(nonce);
    });
    it('protects standalone estimator roots without locale redirecting them', () => {
        const response = proxy(new NextRequest('https://example.test/scorp-estimator/results'));
        expect(response.headers.get('x-middleware-rewrite')).toBeNull();
        expect(response.headers.get('Content-Security-Policy')).toContain("'strict-dynamic'");
        expect(response.headers.get('Cache-Control')).toContain('no-store');
    });
    it('includes dotted CMS document slugs while excluding actual asset families', () => {
        const matcher = new RegExp(`^${config.matcher[0]}$`);
        expect(matcher.test('/en/books/edition-1.0')).toBe(true);
        expect(matcher.test('/es/blog/topic.v2')).toBe(true);
        expect(matcher.test('/images/logo.png')).toBe(false);
        expect(matcher.test('/_next/static/chunk.js')).toBe(false);
        const response = proxy(new NextRequest('https://example.test/en/books/edition-1.0'));
        expect(response.headers.get('Content-Security-Policy')).toContain(`'nonce-${response.headers.get('x-middleware-request-x-nonce')}'`);
    });
});
