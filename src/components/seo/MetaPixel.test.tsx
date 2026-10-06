import { act, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { MetaPixel, trackMetaEvent } from './MetaPixel';
import { setTrackingChoice } from '@/lib/analytics/privacy';
import { CspNonceProvider } from '@/components/security/CspNonceProvider';

vi.mock('next/navigation', () => ({ usePathname: () => '/en', useSearchParams: () => new URLSearchParams() }));
vi.mock('next/script', () => ({ default: ({ src, nonce }: { src: string; nonce?: string }) => <span data-testid="optional-script" data-src={src} data-nonce={nonce} /> }));
beforeEach(() => { localStorage.clear(); window.history.replaceState({}, '', '/en'); delete (window as Window & { fbq?: unknown }).fbq; });

describe('Meta optional loader', () => {
    it('loads nothing and queues nothing before explicit opt-in', () => {
        render(<MetaPixel />);
        trackMetaEvent('Lead', { source: 'fixture' });
        expect(screen.queryByTestId('optional-script')).toBeNull();
        expect((window as Window & { fbq?: unknown }).fbq).toBeUndefined();
    });
    it('carries the document nonce after opt-in and rejects sensitive event fields', () => {
        setTrackingChoice(true);
        render(<CspNonceProvider nonce="fixture-nonce"><MetaPixel /></CspNonceProvider>);
        expect(screen.getByTestId('optional-script')).toHaveAttribute('data-nonce', 'fixture-nonce');
        const pixel = (window as Window & { fbq?: { queue: unknown[][] } }).fbq!;
        trackMetaEvent('Lead', { email: 'fixture@example.test', content_name: 'fixture@example.test', value: 100 });
        expect(pixel.queue).toEqual([['track', 'Lead', { value: 100 }]]);
        act(() => setTrackingChoice(false));
        expect(screen.queryByTestId('optional-script')).toBeNull();
        trackMetaEvent('Lead');
        expect(pixel.queue).toHaveLength(0);
    });
    it('suppresses optional scripts on receipt and input routes after opt-in', () => {
        setTrackingChoice(true);
        window.history.replaceState({}, '', '/en/shop/success?receipt=order_fixture');
        render(<MetaPixel />);
        expect(screen.queryByTestId('optional-script')).toBeNull();
    });
});
