import { act, cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { MetaPixel } from '@/components/seo/MetaPixel';
import { OptionalTrackingBoundary } from './OptionalTrackingBoundary';
import { navigateWithoutOptionalTools, setTrackingChoice } from '@/lib/analytics/privacy';

const route = vi.hoisted(() => ({ path: '/en/about', query: '' }));
const pendingScripts = vi.hoisted(() => [] as Array<() => void>);
vi.mock('next/navigation', () => ({ usePathname: () => route.path, useSearchParams: () => new URLSearchParams(route.query) }));
vi.mock('@/lib/analytics/privacy', async (load) => ({ ...await load<object>(), navigateWithoutOptionalTools: vi.fn() }));
vi.mock('next/script', async () => {
    const { useEffect } = await import('react');
    return { default: function DelayedScript({ onLoad }: { onLoad?: () => void }) {
        useEffect(() => { if (onLoad) pendingScripts.push(onLoad); }, [onLoad]);
        return null;
    } };
});
afterEach(cleanup);

describe('optional vendor document isolation', () => {
    it('blocks sensitive children before commit even while the vendor request is still pending', () => {
        localStorage.clear(); route.path = '/en/about'; route.query = '';
        window.history.replaceState({}, '', route.path);
        setTrackingChoice(true);
        const privateRender = vi.fn();
        function PrivatePage() { privateRender(); return <input aria-label="Private fixture" defaultValue="synthetic-private-value" />; }
        const view = render(<><MetaPixel /><OptionalTrackingBoundary><p>Approved public page</p></OptionalTrackingBoundary></>);
        expect(pendingScripts.length).toBeGreaterThan(0);
        route.path = '/en/contact';
        window.history.replaceState({}, '', route.path);
        view.rerender(<><MetaPixel /><OptionalTrackingBoundary><PrivatePage /></OptionalTrackingBoundary></>);
        expect(privateRender).not.toHaveBeenCalled();
        expect(screen.queryByLabelText('Private fixture')).toBeNull();
        act(() => pendingScripts.forEach((finish) => finish()));
        expect(screen.queryByLabelText('Private fixture')).toBeNull();
        expect(navigateWithoutOptionalTools).toHaveBeenCalledWith('/en/contact');
    });
    it('withholds the page immediately on consent revocation after a load has started', () => {
        route.path = '/en/about'; route.query = '';
        window.history.replaceState({}, '', route.path);
        setTrackingChoice(true);
        render(<><MetaPixel /><OptionalTrackingBoundary><p>Page to replace</p></OptionalTrackingBoundary></>);
        expect(screen.getByText('Page to replace')).toBeInTheDocument();
        act(() => setTrackingChoice(false));
        expect(screen.queryByText('Page to replace')).toBeNull();
        expect(screen.getByRole('status')).toHaveTextContent('Loading page');
        expect(navigateWithoutOptionalTools).toHaveBeenCalledWith('/en/about');
    });
});
