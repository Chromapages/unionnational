"use client";

import { useEffect, useLayoutEffect, useRef, useSyncExternalStore } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { canUseOptionalTracking, getTrackingChoice, getTrackingExpiry, haveOptionalToolsLoaded, isTrackingPageAllowed, markOptionalToolsLoaded, setTrackingChoice, subscribeTrackingChoice } from "@/lib/analytics/privacy";

export function useOptionalTracking() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const target = `${pathname || "/"}${searchParams?.toString() ? "?" + searchParams.toString() : ""}`;
    const enabled = useSyncExternalStore(subscribeTrackingChoice, () => {
        return canUseOptionalTracking() && isTrackingPageAllowed(target);
    }, () => false);
    // Layout effects complete before next/script inserts afterInteractive scripts.
    // Marking at load start also covers a request that finishes after navigation.
    useLayoutEffect(() => { if (enabled) markOptionalToolsLoaded(); }, [enabled]);
    return enabled;
}

const COPY = {
    en: { label: "Privacy preferences", title: "Optional analytics and chat", description: "Choose whether to enable optional analytics, marketing tools, and chat on general website pages. Booking and contact forms work with these tools off. You can change this choice here at any time.", allow: "Enable optional tools", deny: "Keep optional tools off", enabled: "Optional tools enabled on eligible pages.", disabled: "Optional tools are off.", close: "Close preferences" },
    es: { label: "Preferencias de privacidad", title: "Analítica y chat opcionales", description: "Elija si desea activar la analítica, las herramientas de marketing y el chat opcionales en las páginas generales del sitio. Las reservas y los formularios de contacto funcionan con estas herramientas desactivadas. Puede cambiar su elección aquí en cualquier momento.", allow: "Activar herramientas opcionales", deny: "Mantener herramientas desactivadas", enabled: "Herramientas opcionales activadas en páginas elegibles.", disabled: "Las herramientas opcionales están desactivadas.", close: "Cerrar preferencias" },
};

export function TrackingPreferencesGuard() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const choice = useSyncExternalStore(subscribeTrackingChoice, getTrackingChoice, () => null);
    useEffect(() => {
        const handleLink = (event: MouseEvent) => {
            if (!haveOptionalToolsLoaded() || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
            const anchor = (event.target as Element | null)?.closest<HTMLAnchorElement>("a[href]");
            if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return;
            const target = new URL(anchor.href, window.location.href);
            if (target.origin === window.location.origin && !isTrackingPageAllowed(target.toString())) {
                event.preventDefault();
                event.stopImmediatePropagation();
                window.location.assign(target.toString());
            }
        };
        const protectHistory = () => { if (haveOptionalToolsLoaded() && !isTrackingPageAllowed(window.location.href)) window.location.reload(); };
        document.addEventListener("click", handleLink, true);
        window.addEventListener("popstate", protectHistory);
        return () => { document.removeEventListener("click", handleLink, true); window.removeEventListener("popstate", protectHistory); };
    }, [pathname, searchParams, choice]);
    useEffect(() => {
        const expiresAt = getTrackingExpiry();
        if (choice !== true || !expiresAt) return;
        let timer: number | undefined;
        const scheduleExpiry = () => {
            const remaining = expiresAt - Date.now();
            if (remaining <= 0) { setTrackingChoice(false); return; }
            timer = window.setTimeout(scheduleExpiry, Math.min(remaining, 86400000));
        };
        scheduleExpiry();
        return () => window.clearTimeout(timer);
    }, [choice]);
    return null;
}

export function TrackingPreferences({ locale = "en" }: { locale?: string }) {
    const copy = COPY[locale === "es" ? "es" : "en"];
    const choice = useSyncExternalStore(subscribeTrackingChoice, getTrackingChoice, () => null);
    const dialogRef = useRef<HTMLDialogElement>(null);
    const openerRef = useRef<HTMLButtonElement>(null);
    // A choice must reload the document to remove previously loaded third-party code.
    function choose(allowed: boolean) {
        setTrackingChoice(allowed);
        dialogRef.current?.close();
        window.location.reload();
    }
    useEffect(() => {
        const dialog = dialogRef.current;
        const restoreFocus = () => openerRef.current?.focus();
        dialog?.addEventListener("close", restoreFocus);
        return () => dialog?.removeEventListener("close", restoreFocus);
    }, []);
    return (
        <>
            <button ref={openerRef} type="button" onClick={() => dialogRef.current?.showModal()} className="inline-flex min-h-11 items-center rounded-md border border-white/15 px-3 text-xs font-semibold text-slate-300 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500">{copy.label}</button>
            <dialog ref={dialogRef} aria-labelledby="tracking-preference-title" aria-describedby="tracking-preference-description" className="m-auto w-[calc(100%-2rem)] max-w-lg rounded-2xl border border-slate-200 bg-white p-6 text-left text-brand-900 shadow-2xl backdrop:bg-black/50">
                <h2 id="tracking-preference-title" className="font-heading text-xl font-bold">{copy.title}</h2>
                <p id="tracking-preference-description" className="mt-3 text-sm leading-relaxed">{copy.description}</p>
                <p className="mt-3 text-sm font-semibold" role="status">{choice === true ? copy.enabled : copy.disabled}</p>
                <div className="mt-5 flex flex-wrap gap-3"><Button type="button" onClick={() => choose(false)}>{copy.deny}</Button><Button type="button" variant="outline" onClick={() => choose(true)}>{copy.allow}</Button></div>
                <Button type="button" variant="ghost" className="mt-3" onClick={() => dialogRef.current?.close()}>{copy.close}</Button>
            </dialog>
        </>
    );
}
