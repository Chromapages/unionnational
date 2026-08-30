"use client";

import type { MouseEvent } from "react";
import { Link } from "@/i18n/navigation";
import { trackBookingFunnelEvent } from "@/lib/analytics/bookingFunnel";
import { ArrowLeft } from "lucide-react";

export function BookingReturnLink({ href, label }: { href: string; label: string }) {
    const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
        const isPlainPrimaryClick = event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;
        let canReturnToSameSiteHistory = false;

        if (isPlainPrimaryClick && document.referrer && window.history.length > 1) {
            try {
                canReturnToSameSiteHistory = new URL(document.referrer).origin === window.location.origin;
            } catch {
                canReturnToSameSiteHistory = false;
            }
        }

        trackBookingFunnelEvent("strategy_call_scheduler_abandoned", {
            method: canReturnToSameSiteHistory ? "history_back" : "fallback_link",
        });

        if (canReturnToSameSiteHistory) {
            event.preventDefault();
            window.history.back();
        }
    };

    return (
        <Link
            href={href}
            data-analytics="strategy_call_scheduler_abandoned"
            onClick={handleClick}
            className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-brand-100 underline decoration-gold-400 underline-offset-4 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {label}
        </Link>
    );
}
