import { getGa4Consent, setGa4Consent, subscribeGa4Consent } from "./ga4-consent";
import { resolveGa4PageContext } from "./page-policy";
import { createGa4Controller } from "./ga4-controller";
import type { Ga4ClientConfig } from "./ga4-config";

type GoogleWindow = Window & { gtag?: (...args: unknown[]) => void; untGa4Layer?: unknown[] };
let runtime: ReturnType<typeof createGa4Controller> | null = null;
let runtimeConfig: Ga4ClientConfig | null = null;
let loaderStarted = false;
let loaderReady = false;
let savingConsent = false;
let pausedAfterSaveFailure = false;
const listeners = new Set<() => void>();
const notify = () => listeners.forEach(listener => listener());

export function haveGa4ToolsLoaded() { return loaderStarted; }
export function subscribeGa4Runtime(callback: () => void) {
    listeners.add(callback);
    const unsubscribe = subscribeGa4Consent(callback);
    return () => { listeners.delete(callback); unsubscribe(); };
}
export function mustIsolateGa4Document(destination: string): boolean {
    if (!loaderStarted || !runtimeConfig || savingConsent) return false;
    const eligible = Boolean(resolveGa4PageContext(destination, runtimeConfig.policy));
    return !eligible || (!getGa4Consent() && !pausedAfterSaveFailure);
}
export function changeGa4Consent(allowed: boolean): boolean {
    savingConsent = true;
    if (!allowed) { runtime?.stop(); stopGa4Collection(); }
    const saved = setGa4Consent(allowed);
    savingConsent = false;
    pausedAfterSaveFailure = !saved;
    if (!saved) { runtime?.stop(); stopGa4Collection(); notify(); }
    return saved;
}
export function stopGa4Collection() {
    if (typeof window === "undefined" || !runtimeConfig) return;
    // Google documents this kill switch; do not send denied-state update pings on withdrawal.
    (window as unknown as Record<string, unknown>)[`ga-disable-${runtimeConfig.measurementId}`] = true;
    const layer = (window as GoogleWindow).untGa4Layer;
    if (layer) layer.length = 0;
}
export function startGa4Runtime(config: Ga4ClientConfig) {
    if (runtime) return runtime;
    if (!getGa4Consent() || !resolveGa4PageContext(window.location.href, config.policy)) return null;
    const browser = window as GoogleWindow;
    // Conflicting vendor tags require review, never overwrite another Google integration.
    if (browser.gtag || browser.untGa4Layer || document.querySelector('script[src*="googletagmanager.com"]')) return null;
    const layer: unknown[] = [];
    browser.untGa4Layer = layer;
    // Only our validated dispatcher calls this closure; legacy global queues are never consumed.
    const command = function (...args: unknown[]) {
        void args;
        if (!getGa4Consent() || !resolveGa4PageContext(window.location.href, config.policy)) return;
        if (!loaderReady && layer.length >= 32) return;
        // Preserve the Google-tag command snippet's arguments-object contract.
        // eslint-disable-next-line prefer-rest-params
        layer.push(arguments);
    };
    runtimeConfig = config;
    runtime = createGa4Controller(config, { consent: getGa4Consent, url: () => window.location.href, send: command, stop: stopGa4Collection });
    if (!runtime.prepare()) return null;
    loaderStarted = true; notify();
    return runtime;
}
export function finishGa4Loading() { loaderReady = true; runtime?.loaded(); }
export function failGa4Loading() { runtime?.stop(); stopGa4Collection(); }
export function notifyGa4Navigation() { runtime?.navigate(); }
export function dispatchGa4Hook(input: unknown) { return runtime?.dispatch(input) ?? false; }
export function isolateGa4Document(destination: string) {
    runtime?.stop(); stopGa4Collection();
    window.location.replace(destination);
}
