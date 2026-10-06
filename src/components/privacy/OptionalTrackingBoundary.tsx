"use client";

import { useEffect, useSyncExternalStore } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { getTrackingChoice, haveOptionalToolsLoaded, isTrackingPageAllowed, navigateWithoutOptionalTools, subscribeTrackingChoice } from "@/lib/analytics/privacy";

/** Withhold new page DOM before a full navigation discards optional vendor code. */
export function OptionalTrackingBoundary({ children, locale = "en" }: { children: React.ReactNode; locale?: string }) {
    const pathname = usePathname() || "/";
    const query = useSearchParams()?.toString() || "";
    const destination = `${pathname}${query ? "?" + query : ""}`;
    const blocked = useSyncExternalStore(subscribeTrackingChoice, () => {
        return haveOptionalToolsLoaded() && (getTrackingChoice() !== true || !isTrackingPageAllowed(destination)
            || !isTrackingPageAllowed(window.location.href));
    }, () => false);
    useEffect(() => {
        if (blocked) navigateWithoutOptionalTools(destination + window.location.hash);
    }, [blocked, destination]);
    if (blocked) return <div role="status" className="min-h-32 p-6 text-center text-brand-900">{locale === "es" ? "Cargando página…" : "Loading page…"}</div>;
    return children;
}
