import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import type { ComponentPropsWithoutRef } from 'react';
import Link from 'next/link';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { TrackingPreferences as PreferencesControl, TrackingPreferencesGuard, useOptionalTracking } from './TrackingPreferences';
import { OptionalTrackingBoundary } from './OptionalTrackingBoundary';
import { getTrackingChoice, markOptionalToolsLoaded, setTrackingChoice } from '@/lib/analytics/privacy';

const route = vi.hoisted(() => ({ path: '/en/about', query: '' }));
vi.mock('next/navigation', () => ({ usePathname: () => route.path, useSearchParams: () => new URLSearchParams(route.query) }));
vi.mock('next/link', () => ({ default: ({ children, ...props }: ComponentPropsWithoutRef<'a'>) => <a {...props}>{children}</a> }));
const realWindow = window;
const reload = vi.fn();
const assign = vi.fn();
const replace = vi.fn();
const originalShowModal = Object.getOwnPropertyDescriptor(HTMLDialogElement.prototype, 'showModal');
const originalClose = Object.getOwnPropertyDescriptor(HTMLDialogElement.prototype, 'close');

function TrackingPreferences(props: ComponentPropsWithoutRef<typeof PreferencesControl>) {
    return <><TrackingPreferencesGuard /><PreferencesControl {...props} /></>;
}

function ToolProbe() {
    const enabled = useOptionalTracking();
    return <p>{enabled ? 'Optional tools active' : 'Optional tools inactive'}</p>;
}

function installNavigationFixture() {
    // The browser Location methods are unforgeable in jsdom. Replace only the
    // window lookup with a proxy; document, events, history and storage stay real.
    const navigation = {
        get href() { return realWindow.location.href; },
        get origin() { return realWindow.location.origin; },
        get hash() { return realWindow.location.hash; },
        reload, assign, replace,
    };
    vi.stubGlobal('window', new Proxy(realWindow, {
        get(target, property) {
            if (property === 'location') return navigation;
            const value = Reflect.get(target, property, target);
            return typeof value === 'function' ? value.bind(target) : value;
        },
    }));
}

beforeEach(() => {
    vi.clearAllMocks();
    route.path = '/en/about'; route.query = '';
    realWindow.history.replaceState({}, '', route.path);
    setTrackingChoice(false); localStorage.clear();
    installNavigationFixture();
    // Simulate the native dialog open/close protocol, including its close event.
    // Escape cancellation is completed by the browser, not custom React code.
    Object.defineProperty(HTMLDialogElement.prototype, 'showModal', { configurable: true, value: vi.fn(function (this: HTMLDialogElement) {
        this.setAttribute('open', ''); this.querySelector<HTMLButtonElement>('button')?.focus();
    }) });
    Object.defineProperty(HTMLDialogElement.prototype, 'close', { configurable: true, value: vi.fn(function (this: HTMLDialogElement) {
        this.removeAttribute('open'); this.dispatchEvent(new Event('close'));
    }) });
});
afterEach(() => {
    cleanup(); vi.useRealTimers(); vi.restoreAllMocks(); vi.unstubAllGlobals();
    if (originalShowModal) Object.defineProperty(HTMLDialogElement.prototype, 'showModal', originalShowModal); else Reflect.deleteProperty(HTMLDialogElement.prototype, 'showModal');
    if (originalClose) Object.defineProperty(HTMLDialogElement.prototype, 'close', originalClose); else Reflect.deleteProperty(HTMLDialogElement.prototype, 'close');
});

describe('real privacy preference behavior', () => {
    it('defaults optional tools off and preserves ordinary links before a vendor load starts', () => {
        render(<><TrackingPreferences /><Link href="/en/contact" onClick={event => event.preventDefault()}>Contact fixture</Link></>);
        fireEvent.click(screen.getByRole('link', { name: 'Contact fixture' }));
        expect(assign).not.toHaveBeenCalled();
        fireEvent.click(screen.getByRole('button', { name: 'Privacy preferences' }));
        expect(screen.getByRole('dialog', { name: 'Optional analytics and chat' })).toBeInTheDocument();
        expect(screen.getByRole('status')).toHaveTextContent('Optional tools are off.');
        expect(getTrackingChoice()).toBeNull();
    });

    it('opens with associated text and restores the opener after native Escape/cancel dismissal', () => {
        render(<TrackingPreferences />);
        const opener = screen.getByRole('button', { name: 'Privacy preferences' });
        fireEvent.click(opener);
        const dialog = screen.getByRole('dialog', { name: 'Optional analytics and chat' });
        expect(dialog).toHaveAttribute('aria-describedby', 'tracking-preference-description');
        expect(screen.getByRole('button', { name: 'Keep optional tools off' })).toHaveFocus();
        fireEvent.keyDown(dialog, { key: 'Escape', code: 'Escape' });
        const cancellation = new Event('cancel', { cancelable: true });
        act(() => { dialog.dispatchEvent(cancellation); if (!cancellation.defaultPrevented) (dialog as HTMLDialogElement).close(); });
        expect(dialog).not.toHaveAttribute('open');
        expect(opener).toHaveFocus();
        expect(reload).not.toHaveBeenCalled();
        fireEvent.click(opener);
        fireEvent.click(screen.getByRole('button', { name: 'Close preferences' }));
        expect(opener).toHaveFocus();
        expect(dialog).not.toHaveAttribute('open');
    });

    it('persists explicit opt-in, closes the dialog and reloads to apply the choice', () => {
        render(<TrackingPreferences />);
        fireEvent.click(screen.getByRole('button', { name: 'Privacy preferences' }));
        fireEvent.click(screen.getByRole('button', { name: 'Enable optional tools' }));
        const preference = JSON.parse(localStorage.getItem('unt-optional-tracking')!);
        expect(preference).toMatchObject({ version: 1, allowed: true });
        expect(preference.expiresAt).toBeGreaterThan(Date.now());
        expect(reload).toHaveBeenCalledTimes(1);
        expect(screen.queryByRole('dialog')).toBeNull();
        expect(screen.getByRole('button', { name: 'Privacy preferences' })).toHaveFocus();
    });

    it('uses localized controls and clears queued events when the visitor declines', () => {
        setTrackingChoice(true);
        const browser = window as Window & { fbq?: { queue: unknown[] }; dataLayer?: unknown[] };
        browser.fbq = { queue: [['synthetic queued event']] };
        browser.dataLayer = [{ event: 'synthetic-event' }];
        render(<TrackingPreferences locale="es" />);
        fireEvent.click(screen.getByRole('button', { name: 'Preferencias de privacidad' }));
        expect(screen.getByRole('dialog', { name: 'Analítica y chat opcionales' })).toBeInTheDocument();
        expect(screen.getByRole('status')).toHaveTextContent('Herramientas opcionales activadas');
        fireEvent.click(screen.getByRole('button', { name: 'Mantener herramientas desactivadas' }));
        expect(getTrackingChoice()).toBe(false);
        expect(browser.fbq.queue).toHaveLength(0); expect(browser.dataLayer).toHaveLength(0);
        expect(reload).toHaveBeenCalledTimes(1);
        delete browser.fbq; delete browser.dataLayer;
    });

    it('tracks opt-in changes but keeps sensitive target routes excluded', () => {
        const view = render(<ToolProbe />);
        expect(screen.getByText('Optional tools inactive')).toBeInTheDocument();
        act(() => setTrackingChoice(true));
        expect(screen.getByText('Optional tools active')).toBeInTheDocument();
        route.path = '/en/contact';
        view.rerender(<ToolProbe />);
        expect(screen.getByText('Optional tools inactive')).toBeInTheDocument();
        route.path = '/en/about'; route.query = 'session_id=synthetic';
        view.rerender(<ToolProbe />);
        expect(screen.getByText('Optional tools inactive')).toBeInTheDocument();
        act(() => setTrackingChoice(false));
        expect(screen.getByText('Optional tools inactive')).toBeInTheDocument();
    });

    it('hard navigates into a sensitive page after optional loading while preserving other navigation', () => {
        setTrackingChoice(true); markOptionalToolsLoaded();
        render(<><TrackingPreferences />
            <Link href="/en/contact" onClick={event => event.preventDefault()}>Sensitive fixture</Link>
            <Link href="/en/services" onClick={event => event.preventDefault()}>General fixture</Link>
            <Link href="https://other.example.test/contact" onClick={event => event.preventDefault()}>External fixture</Link>
            <Link href="/en/contact" target="_blank" onClick={event => event.preventDefault()}>New tab fixture</Link>
            <Link href="/en/contact" download onClick={event => event.preventDefault()}>Download fixture</Link>
        </>);
        const sensitive = screen.getByRole('link', { name: 'Sensitive fixture' });
        for (const modifiers of [{ button: 1 }, { metaKey: true }, { ctrlKey: true }, { shiftKey: true }, { altKey: true }]) fireEvent.click(sensitive, modifiers);
        for (const label of ['General fixture', 'External fixture', 'New tab fixture', 'Download fixture']) fireEvent.click(screen.getByRole('link', { name: label }));
        expect(assign).not.toHaveBeenCalled();
        fireEvent.click(sensitive);
        expect(assign).toHaveBeenCalledWith(new URL('/en/contact', realWindow.location.href).toString());
        expect(assign).toHaveBeenCalledTimes(1);
    });

    it('reloads sensitive history transitions and removes its listeners after unmount', () => {
        setTrackingChoice(true); markOptionalToolsLoaded();
        const removeDocument = vi.spyOn(document, 'removeEventListener');
        const view = render(<TrackingPreferences />);
        fireEvent(window, new PopStateEvent('popstate'));
        expect(reload).not.toHaveBeenCalled();
        realWindow.history.replaceState({}, '', '/en/shop/success?receipt=synthetic-reference');
        fireEvent(window, new PopStateEvent('popstate'));
        expect(reload).toHaveBeenCalledTimes(1);
        view.unmount();
        fireEvent(window, new PopStateEvent('popstate'));
        expect(reload).toHaveBeenCalledTimes(1);
        expect(removeDocument).toHaveBeenCalledWith('click', expect.any(Function), true);
    });

    it('expires opt-in, removes the page boundary and performs a clean document navigation', () => {
        vi.useFakeTimers(); vi.setSystemTime(new Date('2026-10-05T00:00:00Z'));
        localStorage.setItem('unt-optional-tracking', JSON.stringify({ version: 1, allowed: true, expiresAt: Date.now() + 2000 }));
        markOptionalToolsLoaded();
        render(<><TrackingPreferences /><OptionalTrackingBoundary><p>Eligible page fixture</p></OptionalTrackingBoundary></>);
        expect(screen.getByText('Eligible page fixture')).toBeInTheDocument();
        act(() => vi.advanceTimersByTime(2001));
        expect(getTrackingChoice()).toBe(false);
        expect(screen.queryByText('Eligible page fixture')).toBeNull();
        expect(replace).toHaveBeenCalledWith('/en/about');
        expect(JSON.parse(localStorage.getItem('unt-optional-tracking')!).allowed).toBe(false);
    });

    it('checks long-lived choices daily and clears its expiry timer on unmount', () => {
        vi.useFakeTimers(); vi.setSystemTime(new Date('2026-10-05T00:00:00Z'));
        const schedule = vi.spyOn(realWindow, 'setTimeout');
        const cancel = vi.spyOn(realWindow, 'clearTimeout');
        localStorage.setItem('unt-optional-tracking', JSON.stringify({ version: 1, allowed: true, expiresAt: Date.now() + 3 * 86400000 }));
        const view = render(<TrackingPreferences />);
        expect(schedule).toHaveBeenCalledWith(expect.any(Function), 86400000);
        act(() => vi.advanceTimersByTime(86400000));
        expect(getTrackingChoice()).toBe(true);
        const dailyIndexes = schedule.mock.calls.flatMap((call, index) => call[1] === 86400000 ? [index] : []);
        expect(dailyIndexes).toHaveLength(2);
        const activeTimer = schedule.mock.results[dailyIndexes.at(-1)!].value;
        view.unmount(); expect(cancel).toHaveBeenCalledWith(activeTimer);
    });

    it('keeps the current-document choice usable when storage is blocked and fails closed when no record can be read', () => {
        const get = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new DOMException('Synthetic storage blocked', 'SecurityError'); });
        const set = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new DOMException('Synthetic storage quota', 'QuotaExceededError'); });
        render(<TrackingPreferences />);
        fireEvent.click(screen.getByRole('button', { name: 'Privacy preferences' }));
        expect(screen.getByRole('status')).toHaveTextContent('Optional tools are off.');
        fireEvent.click(screen.getByRole('button', { name: 'Enable optional tools' }));
        expect(getTrackingChoice()).toBe(true);
        expect(reload).toHaveBeenCalledTimes(1);
        expect(set).toHaveBeenCalled();
        get.mockRestore(); set.mockRestore();
        act(() => window.dispatchEvent(new StorageEvent('storage', { key: 'unt-optional-tracking' })));
        expect(getTrackingChoice()).toBeNull();
        expect(localStorage.getItem('unt-optional-tracking')).toBeNull();
    });

    it('renders conservative server snapshots without enabling optional scripts', () => {
        setTrackingChoice(true);
        const html = renderToString(<><TrackingPreferences /><ToolProbe /></>);
        expect(html).toContain('Optional tools are off.');
        expect(html).toContain('Optional tools inactive');
        expect(html).not.toContain('<script');
    });
    it.each([
        '{broken-json',
        JSON.stringify({ version: 2, allowed: true, expiresAt: 1 }),
        JSON.stringify({ version: 1, allowed: 'true', expiresAt: 1 }),
        JSON.stringify({ version: 1, allowed: true }),
        JSON.stringify({ version: 1, allowed: true, expiresAt: 'later' }),
        JSON.stringify({ version: 1, allowed: true, expiresAt: 0 }),
    ])('does not enable optional tools from a malformed or expired stored choice (%s)', raw => {
        localStorage.setItem('unt-optional-tracking', raw);
        render(<><TrackingPreferences /><ToolProbe /></>);
        fireEvent.click(screen.getByRole('button', { name: 'Privacy preferences' }));
        expect(screen.getByRole('status')).toHaveTextContent('Optional tools are off.');
        expect(screen.getByText('Optional tools inactive')).toBeInTheDocument();
        expect(getTrackingChoice()).not.toBe(true);
    });
    it('rejects an opt-in with an excessive lifetime and responds to another-tab choice changes', () => {
        localStorage.setItem('unt-optional-tracking', JSON.stringify({ version: 1, allowed: true, expiresAt: Date.now() + 181 * 86400000 }));
        render(<><TrackingPreferences /><ToolProbe /></>);
        expect(screen.getByText('Optional tools inactive')).toBeInTheDocument();
        localStorage.setItem('unt-optional-tracking', JSON.stringify({ version: 1, allowed: true, expiresAt: Date.now() + 86400000 }));
        act(() => window.dispatchEvent(new StorageEvent('storage', { key: 'unt-optional-tracking' })));
        expect(screen.getByText('Optional tools active')).toBeInTheDocument();
        localStorage.removeItem('unt-optional-tracking');
        act(() => window.dispatchEvent(new StorageEvent('storage', { key: 'unt-optional-tracking' })));
        expect(screen.getByText('Optional tools inactive')).toBeInTheDocument();
    });
});
