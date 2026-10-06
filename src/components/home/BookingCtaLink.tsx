"use client";

import { ArrowRight, Calendar } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { BOOKING_ROUTE, getBookingHref, isExternalBookingHref, normalizeBookingReturnTo } from "@/lib/booking";
import { trackBookingFunnelEvent } from "@/lib/analytics/bookingFunnel";

const NAVIGATION_RECOVERY_MS = 10000;

interface BookingCtaLinkProps {
    href: string;
    label: string;
    openingLabel: string;
    externalLabel: string;
    placement?: string;
    descriptionId?: string;
    viewTargetId?: string;
    prominent?: boolean;
    showCalendarIcon?: boolean;
}

export function BookingCtaLink({ href, label, openingLabel, externalLabel, placement = "global_cta", descriptionId, viewTargetId = "contact", prominent = false, showCalendarIcon = true }: BookingCtaLinkProps) {
    const [isNavigating, setIsNavigating] = useState(false);
    const hasTrackedView = useRef(false);
    const hasTrackedActivation = useRef(false);
    const safeDestination = getBookingHref(href);
    const isExternal = isExternalBookingHref(safeDestination);
    const pathname = usePathname();
    const stateClass = isNavigating
        ? "bg-gold-400 ring-2 ring-gold-200 pointer-events-none cursor-progress"
        : prominent
          ? "bg-[linear-gradient(105deg,#e6ba32_0%,#f0cd61_50%,#dfb83e_100%)] hover:brightness-105 active:brightness-95"
          : "bg-gold-500 hover:bg-gold-400 active:bg-gold-600";
    const destination = useMemo(() => {
        const sourcePath = normalizeBookingReturnTo(pathname || "/") || "/";
        const baseDestination = safeDestination === BOOKING_ROUTE
            ? `${BOOKING_ROUTE}?returnTo=${encodeURIComponent(sourcePath === "/" ? "/#contact" : sourcePath)}`
            : safeDestination;
        if (typeof window === "undefined") return baseDestination;

        const currentUrl = new URL(window.location.href);
        const bookingUrl = new URL(baseDestination, window.location.origin);
        for (const [key, value] of currentUrl.searchParams) {
            if (/^(?:utm_(?:source|medium|campaign|content|term)|gclid|fbclid)$/.test(key) && value.length <= 160 && /^[a-zA-Z0-9 _.\-]*$/.test(value) && !bookingUrl.searchParams.has(key)) {
                bookingUrl.searchParams.set(key, value);
            }
        }

        return isExternal ? bookingUrl.toString() : `${bookingUrl.pathname}${bookingUrl.search}${bookingUrl.hash}`;
    }, [safeDestination, isExternal, pathname]);

    useEffect(() => {
        const section = document.getElementById(viewTargetId);
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
    }, [placement, viewTargetId]);

    useEffect(() => {
        if (!isNavigating) return;
        const timer = window.setTimeout(() => setIsNavigating(false), NAVIGATION_RECOVERY_MS);
        const restoreOnPageShow = () => setIsNavigating(false);
        window.addEventListener("pageshow", restoreOnPageShow);
        return () => {
            window.clearTimeout(timer);
            window.removeEventListener("pageshow", restoreOnPageShow);
        };
    }, [isNavigating]);

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
                const navigatesInThisTab = !isExternal && event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;
                if (isNavigating && navigatesInThisTab) {
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
                if (navigatesInThisTab && !event.defaultPrevented) setIsNavigating(true);
            }}
            className={`${prominent ? "flex min-h-16 justify-center gap-3 px-4 py-4 text-base sm:gap-8 sm:px-6 sm:text-xl 2xl:min-h-[5.625rem] 2xl:text-[1.65rem]" : showCalendarIcon ? "grid min-h-14 grid-cols-[1fr_auto_1fr] px-5 py-3 text-base" : "grid min-h-14 grid-cols-[1fr_auto] gap-3 px-6 py-4 text-base"} w-full touch-manipulation items-center rounded-full font-bold tracking-wide text-brand-950 transition-[background-color,box-shadow] duration-150 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-brand-950 focus-visible:outline-offset-[-5px] focus-visible:ring-[3px] focus-visible:ring-gold-300 focus-visible:ring-offset-4 focus-visible:ring-offset-black motion-reduce:transition-none font-heading ${stateClass}`}
        >
            {showCalendarIcon ? <Calendar className={prominent ? "size-6 shrink-0 sm:size-8" : "h-5 w-5 shrink-0 justify-self-start"} aria-hidden="true" /> : null}
            <span className="min-w-0 text-center">{label}</span>
            <ArrowRight className={prominent ? "size-6 shrink-0 sm:size-8" : "h-5 w-5 shrink-0 justify-self-end"} aria-hidden="true" />
            {isExternal ? <span className="sr-only">{externalLabel}</span> : null}
            {isNavigating ? <span className="sr-only" role="status">{openingLabel}</span> : null}
        </Link>
    );
}
