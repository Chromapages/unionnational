"use client";

import { useEffect, useSyncExternalStore } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { isolateGa4Document, mustIsolateGa4Document, subscribeGa4Runtime } from "@/lib/analytics/ga4-client";

export function Ga4Boundary({ children, locale }: { children: React.ReactNode; locale: string }) {
    const path = usePathname() || "/";
    const query = useSearchParams()?.toString() || "";
    const destination = path + (query ? `?${query}` : "");
    const blocked = useSyncExternalStore(subscribeGa4Runtime, () => mustIsolateGa4Document(destination) || mustIsolateGa4Document(window.location.href), () => false);
    useEffect(() => { if (blocked) isolateGa4Document(destination + window.location.hash); }, [blocked, destination]);
    return blocked ? <div role="status" className="min-h-32 p-6 text-brand-900">{locale === "es" ? "Cargando página…" : "Loading page…"}</div> : children;
}
