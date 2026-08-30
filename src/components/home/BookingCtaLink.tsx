"use client";

import { ArrowRight, Calendar } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@/i18n/navigation";
import { BOOKING_ROUTE, isExternalBookingHref } from "@/lib/booking";
import { trackBookingFunnelEvent } from "@/lib/analytics/bookingFunnel";

interface BookingCtaLinkProps {
    href: string;
    label: string;
    openingLabel: string;
    externalLabel: string;
    placement?: string;
    descriptionId?: string;
}

export function BookingCtaLink({ href, label, openingLabel, externalLabel, placement = "global_cta", descriptionId }: BookingCtaLinkProps) {
    const [isNavigating, setIsNavigating] = useState(false);
    const hasTrackedView = useRef(false);
    const hasTrackedActivation = useRef(false);
    const isExternal = isExternalBookingHref(href);
    const stateClass = isNavigating
        ? "bg-gold-400 ring-2 ring-gold-200 pointer-events-none cursor-progress"
        : "bg-gold-500 hover:bg-gold-400 active:bg-gold-600";
    const destination = useMemo(() => {
        const baseDestination = href === BOOKING_ROUTE ? `${BOOKING_ROUTE}?returnTo=%2F%23contact` : href;
        if (typeof window === "undefined") return baseDestination;

        const currentUrl = new URL(window.location.href);
        const bookingUrl = new URL(baseDestination, window.location.origin);
        for (const [key, value] of currentUrl.searchParams) {
            if ((key.startsWith("utm_") || key === "gclid" || key === "fbclid") && !bookingUrl.searchParams.has(key)) {
                bookingUrl.searchParams.set(key, value);
            }
        }

        return isExternal ? bookingUrl.toString() : `${bookingUrl.pathname}${bookingUrl.search}${bookingUrl.hash}`;
    }, [href, isExternal]);

    useEffect(() => {
        const section = document.getElementById("contact");
        if (!section || hasTrackedView.current) return;
        const trackView = () => {
            if (hasTrackedView.current) return;
            hasTrackedView.current = true;
            trackBookingFunnelEvent("strategy_call_cta_viewed", { placement });
        };

        if (typeof IntersectionObserver === "undefined") {
            trackView();
            return;
        }

        const observer = new IntersectionObserver(([entry]) => {
            if (entry?.isIntersecting) {
                trackView();
                observer.disconnect();
            }
        }, { threshold: 0.4 });
        observer.observe(section);
        return () => observer.disconnect();
    }, []);

    return (
        <Link
            href={destination}
            data-analytics="strategy_call_cta"
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            aria-busy={isNavigating || undefined}
            aria-disabled={isNavigating || undefined}
            aria-describedby={descriptionId}
            data-state={isNavigating ? "pending" : "ready"}
            onClick={(event) => {
                if (isNavigating) {
                    event.preventDefault();
                    return;
                }
                if (!hasTrackedActivation.current) {
                    hasTrackedActivation.current = true;
                    trackBookingFunnelEvent("strategy_call_cta_activated", {
                        placement,
                        destination_type: isExternal ? "external" : "internal",
                    });
                }
                setIsNavigating(true);
            }}
            className={`grid min-h-14 w-full touch-manipulation grid-cols-[1fr_auto_1fr] items-center rounded-full px-5 py-3 text-base font-bold tracking-wide text-brand-950 transition-[background-color,box-shadow] duration-150 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-brand-950 focus-visible:outline-offset-[-5px] focus-visible:ring-[3px] focus-visible:ring-gold-300 focus-visible:ring-offset-4 focus-visible:ring-offset-black motion-reduce:transition-none font-heading ${stateClass}`}
        >
            <Calendar className="h-5 w-5 shrink-0 justify-self-start" aria-hidden="true" />
            <span className="min-w-0 text-center">{label}</span>
            <ArrowRight className="h-5 w-5 shrink-0 justify-self-end" aria-hidden="true" />
            {isExternal ? <span className="sr-only">{externalLabel}</span> : null}
            {isNavigating ? <span className="sr-only" role="status">{openingLabel}</span> : null}
        </Link>
    );
}
