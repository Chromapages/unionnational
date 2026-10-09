"use client";

import Script from "next/script";
import { useEffect, useLayoutEffect, useState, useSyncExternalStore } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { getGa4Consent, getGa4ConsentExpiry, subscribeGa4Consent } from "@/lib/analytics/ga4-consent";
import { resolveGa4PageContext } from "@/lib/analytics/page-policy";
import { changeGa4Consent, failGa4Loading, finishGa4Loading, haveGa4ToolsLoaded, isolateGa4Document, mustIsolateGa4Document, notifyGa4Navigation, startGa4Runtime, subscribeGa4Runtime } from "@/lib/analytics/ga4-client";
import type { Ga4ClientConfig } from "@/lib/analytics/ga4-config";

export function Ga4Tracking({ config, nonce, locale }: { config: Ga4ClientConfig | null; nonce?: string; locale: string }) {
    const path = usePathname();
    const query = useSearchParams()?.toString() || "";
    const consent = useSyncExternalStore(subscribeGa4Consent, getGa4Consent, () => false);
    const load = useSyncExternalStore(subscribeGa4Runtime, haveGa4ToolsLoaded, () => false);
    const [saveError, setSaveError] = useState(false);
    const eligible = Boolean(config && resolveGa4PageContext(`${path}?${query}`, config.policy));
    useLayoutEffect(() => {
        if (config && nonce && consent && eligible) startGa4Runtime(config);
    }, [config, nonce, consent, eligible]);
    useEffect(() => { notifyGa4Navigation(); }, [path, query, consent]);
    useEffect(() => {
        if (!config) return;
        const protect = () => { if (mustIsolateGa4Document(window.location.href)) isolateGa4Document(window.location.href); else notifyGa4Navigation(); };
        const link = (event: MouseEvent) => {
            if (!haveGa4ToolsLoaded() || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
            const anchor = (event.target as Element | null)?.closest<HTMLAnchorElement>("a[href]");
            if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return;
            const target = new URL(anchor.href, window.location.href);
            if (target.origin === window.location.origin && mustIsolateGa4Document(target.href)) {
                // Block client routing, but let source-page CTA handlers record this click first.
                event.preventDefault(); window.setTimeout(() => isolateGa4Document(target.href), 0);
            }
        };
        const unsubscribe = subscribeGa4Consent(protect);
        window.addEventListener("popstate", protect); window.addEventListener("hashchange", protect);
        document.addEventListener("click", link, true);
        return () => { unsubscribe(); window.removeEventListener("popstate", protect); window.removeEventListener("hashchange", protect); document.removeEventListener("click", link, true); };
    }, [config]);
    useEffect(() => {
        if (!consent) return;
        let timer: ReturnType<typeof setTimeout> | undefined;
        const expire = () => {
            // Another tab may have renewed the grant without changing its boolean value.
            const remaining = (getGa4ConsentExpiry() ?? 0) - Date.now();
            if (remaining <= 0) { if (changeGa4Consent(false) && haveGa4ToolsLoaded()) isolateGa4Document(window.location.href); }
            else timer = setTimeout(expire, Math.min(remaining, 86_400_000));
        };
        expire();
        return () => clearTimeout(timer);
    }, [consent]);
    if (!config || !nonce || !eligible) return null;
    const choose = (allowed: boolean) => {
        const saved = changeGa4Consent(allowed);
        setSaveError(!saved);
        if (saved) window.location.reload();
    };
    const es = locale === "es";
    return <>
        {load && consent && <Script id="unt-ga4-loader" nonce={nonce} strategy="afterInteractive" referrerPolicy="no-referrer" src={`https://www.googletagmanager.com/gtag/js?id=${config.measurementId}&l=untGa4Layer`} onReady={finishGa4Loading} onError={failGa4Loading} />}
        <section aria-label={es ? "Preferencias de analítica" : "Analytics preferences"} className="border-t border-brand-100 bg-white p-5 text-brand-900">
            <p className="text-sm leading-relaxed">{es ? "La analítica opcional de Google mide visitas y clics en páginas aprobadas. Esta elección no activa publicidad, marketing ni chat." : "Optional Google analytics measures visits and clicks on approved pages. This choice does not enable advertising, marketing, or chat."}</p>
            <p role="status" className="mt-2 text-sm">{consent ? (es ? "Preferencia de analítica activada." : "Analytics preference enabled.") : (es ? "Preferencia de analítica desactivada." : "Analytics preference off.")}</p>
            {saveError && <p role="alert" className="mt-2 text-sm font-semibold">{es ? "No se pudo guardar la preferencia. La analítica está pausada en esta página; inténtelo de nuevo cuando el almacenamiento del navegador esté disponible." : "The preference could not be saved. Analytics is paused in this page; try again when browser storage is available."}</p>}
            <div className="mt-3 flex flex-wrap gap-3"><button type="button" onClick={() => choose(false)} className="min-h-11 rounded-md border border-brand-500 px-4 font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-900">{es ? "Mantener desactivada" : "Keep analytics off"}</button><button type="button" onClick={() => choose(true)} className="min-h-11 rounded-md bg-brand-500 px-4 font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-900">{es ? "Activar analítica" : "Enable analytics"}</button></div>
        </section>
    </>;
}
