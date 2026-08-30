"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { Link } from "@/i18n/navigation";
import { trackBookingFunnelEvent } from "@/lib/analytics/bookingFunnel";
import { GhlExternalTracking } from "@/components/seo/GhlExternalTracking";

const DEFAULT_GHL_CALENDAR_URL = "https://link.agent-crm.com/widget/booking/sBGopjvf9OdyrfgWqOJx";

function resolveCalendarUrl(src?: string, campaignParams: Record<string, string> = {}) {
    const url = new URL(src?.trim() || DEFAULT_GHL_CALENDAR_URL);
    for (const [key, value] of Object.entries(campaignParams)) {
        if (!url.searchParams.has(key)) url.searchParams.set(key, value);
    }
    return url.toString();
}

export const BookingCalendar = ({ src, campaignParams }: { src?: string; campaignParams?: Record<string, string> }) => {
    const [schedulerState, setSchedulerState] = useState<"loading" | "ready" | "error">("loading");
    const [calendarAttempt, setCalendarAttempt] = useState(0);
    const [calendarHasFocus, setCalendarHasFocus] = useState(false);
    const trackedEvents = useRef(new Set<string>());
    const hasTrackedPageView = useRef(false);
    const calendarUrl = resolveCalendarUrl(src, campaignParams);
    const calendarId = calendarUrl.split("/").filter(Boolean).at(-1) || "msgsndr-calendar";

    const failCalendar = (reason: "iframe_load" | "provider_script") => {
        setSchedulerState((state) => {
            // Once the provider is ready, its iframe owns any entered scheduling data.
            // Do not replace it with a host error state after the visitor has begun scheduling.
            if (state !== "loading") return state;

            if (!trackedEvents.current.has("error")) {
                trackedEvents.current.add("error");
                trackBookingFunnelEvent("strategy_call_scheduler_error", { reason });
            }
            return "error";
        });
    };

    useEffect(() => {
        if (!hasTrackedPageView.current) {
            hasTrackedPageView.current = true;
            trackBookingFunnelEvent("strategy_call_page_viewed", { page: "booking" });
        }

        setSchedulerState("loading");
        const timeout = window.setTimeout(() => {
            setSchedulerState((state) => {
                if (state === "loading") {
                    if (!trackedEvents.current.has("error")) {
                        trackedEvents.current.add("error");
                        trackBookingFunnelEvent("strategy_call_scheduler_error", { reason: "load_timeout" });
                    }
                    return "error";
                }
                return state;
            });
        }, 15_000);

        return () => window.clearTimeout(timeout);
    }, [calendarUrl, calendarAttempt]);

    const retryCalendar = () => {
        setSchedulerState("loading");
        setCalendarAttempt((attempt) => attempt + 1);
    };

    return (
        <div
            className={`relative flex h-full min-h-[600px] w-full flex-col ${calendarHasFocus ? "ring-2 ring-inset ring-brand-900" : ""}`}
            data-ghl-calendar
            data-scheduler-state={schedulerState}
            aria-busy={schedulerState === "loading"}
            onFocusCapture={() => setCalendarHasFocus(true)}
            onBlurCapture={() => setCalendarHasFocus(false)}
        >
            <GhlExternalTracking />
            {schedulerState === "loading" ? (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-white p-6 text-center text-sm text-slate-600" role="status" aria-live="polite">
                    Loading available appointment times…
                </div>
            ) : null}
            {schedulerState !== "error" ? (
                <iframe
                    key={calendarAttempt}
                    src={calendarUrl}
                    title="Appointment calendar for a tax strategy call"
                    id={`${calendarId}-calendar`}
                    className="min-h-[600px] w-full border-0"
                    loading="eager"
                    scrolling="no"
                    tabIndex={schedulerState === "loading" ? -1 : 0}
                    referrerPolicy="strict-origin-when-cross-origin"
                    onLoad={() => {
                        setSchedulerState("ready");
                        if (!trackedEvents.current.has("opened")) {
                            trackedEvents.current.add("opened");
                            trackBookingFunnelEvent("strategy_call_scheduler_opened", { provider: "embedded_scheduler" });
                        }
                    }}
                    onError={() => failCalendar("iframe_load")}
                />
            ) : null}
            <Script
                id="ghl-form-embed"
                src="https://link.agent-crm.com/js/form_embed.js"
                strategy="lazyOnload"
                onError={() => failCalendar("provider_script")}
            />
            {schedulerState === "error" && (
                <div className="m-auto max-w-sm p-6 text-center" role="alert">
                    <p className="text-sm text-slate-600">The scheduling calendar could not load. Try again, or contact us to schedule.</p>
                    <div className="mt-3 flex flex-wrap justify-center gap-x-5 gap-y-2">
                        <button type="button" onClick={retryCalendar} className="inline-flex min-h-11 items-center font-semibold text-brand-900 underline decoration-gold-600 underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-600">
                            Try the calendar again
                        </button>
                        <Link href="/contact" className="inline-flex min-h-11 items-center font-semibold text-brand-900 underline decoration-gold-600 underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-600">
                        Contact us to schedule
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};
