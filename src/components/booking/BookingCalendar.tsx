"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import Script from "next/script";
import { Link } from "@/i18n/navigation";
import { trackBookingFunnelEvent } from "@/lib/analytics/bookingFunnel";
import { GhlExternalTracking } from "@/components/seo/GhlExternalTracking";

const DEFAULT_GHL_CALENDAR_URL = "https://link.agent-crm.com/widget/booking/sBGopjvf9OdyrfgWqOJx";
const CALENDAR_LOAD_TIMEOUT_MS = 20000;

function resolveCalendarUrl(src?: string, campaignParams: Record<string, string> = {}) {
    const url = new URL(src?.trim() || DEFAULT_GHL_CALENDAR_URL);
    for (const [key, value] of Object.entries(campaignParams)) {
        if (!url.searchParams.has(key)) url.searchParams.set(key, value);
    }
    return url.toString();
}

export const BookingCalendar = ({ src, campaignParams }: { src?: string; campaignParams?: Record<string, string> }) => {
    const t = useTranslations("Booking.calendar");
    const [schedulerState, setSchedulerState] = useState<"loading" | "ready" | "error">("loading");
    const [calendarAttempt, setCalendarAttempt] = useState(0);
    const [calendarHasFocus, setCalendarHasFocus] = useState(false);
    const trackedEvents = useRef(new Set<string>());
    const hasTrackedPageView = useRef(false);
    const calendarUrl = resolveCalendarUrl(src, campaignParams);
    const calendarId = new URL(calendarUrl).pathname.split("/").filter(Boolean).at(-1) || "msgsndr-calendar";
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [activeCalendarUrl, setActiveCalendarUrl] = useState(calendarUrl);
    if (activeCalendarUrl !== calendarUrl) {
        setActiveCalendarUrl(calendarUrl);
        setSchedulerState("loading");
    }
    const markCalendarReady = useCallback(() => {
        setSchedulerState("ready");
        if (!trackedEvents.current.has("opened")) {
            trackedEvents.current.add("opened");
            trackBookingFunnelEvent("strategy_call_scheduler_opened", { provider: "embedded_scheduler" });
        }
    }, []);

    const failCalendar = useCallback((reason: "iframe_load" | "provider_script" | "load_timeout") => {
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
    }, []);

    useEffect(() => {
        if (schedulerState !== "loading") return;
        const timer = window.setTimeout(() => failCalendar("load_timeout"), CALENDAR_LOAD_TIMEOUT_MS);
        return () => window.clearTimeout(timer);
    }, [calendarUrl, calendarAttempt, schedulerState, failCalendar]);

    useEffect(() => {
        if (!hasTrackedPageView.current) {
            hasTrackedPageView.current = true;
            trackBookingFunnelEvent("strategy_call_page_viewed", { page: "booking" });
        }

        const handleProviderReady = (event: MessageEvent) => {
            if (event.origin !== new URL(calendarUrl).origin || event.source !== iframeRef.current?.contentWindow) return;
            if (Array.isArray(event.data) && event.data[0] === "iframeLoaded") markCalendarReady();
        };
        window.addEventListener("message", handleProviderReady);
        const frame = iframeRef.current;
        // The provider resizer can finish before React receives the iframe load event.
        const checkResizedFrame = () => {
            if (frame && Number.parseFloat(frame.style.height) > 0) markCalendarReady();
        };
        const resizeObserver = new MutationObserver(checkResizedFrame);
        if (frame) resizeObserver.observe(frame, { attributes: true, attributeFilter: ["style"] });
        checkResizedFrame();
        return () => { resizeObserver.disconnect(); window.removeEventListener("message", handleProviderReady); };
    }, [calendarUrl, calendarAttempt, markCalendarReady]);

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
                <div className="sr-only" role="status" aria-live="polite">
                    {t("loading")}
                </div>
            ) : null}
            <iframe
                    ref={iframeRef}
                    key={calendarUrl + ":" + calendarAttempt}
                    src={calendarUrl}
                    title={t("iframeTitle")}
                    id={`${calendarId}-calendar`}
                    className="min-h-[600px] w-full border-0 !relative !left-auto !visible !opacity-100 !pointer-events-auto"
                    loading="eager"
                    scrolling="no"
                    tabIndex={schedulerState === "ready" ? 0 : -1}
                    inert={schedulerState === "error"}
                    referrerPolicy="strict-origin-when-cross-origin"
                    onLoad={markCalendarReady}
                    onError={() => failCalendar("iframe_load")}
                />
            <Script
                id="ghl-form-embed"
                src="https://link.agent-crm.com/js/form_embed.js"
                strategy="afterInteractive"
                onError={() => failCalendar("provider_script")}
            />
            {schedulerState === "error" && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white p-6 text-center" role="alert">
                    <p className="text-sm text-slate-600">{t("loadError")}</p>
                    <div className="mt-3 flex flex-wrap justify-center gap-x-5 gap-y-2">
                        <button type="button" onClick={retryCalendar} className="inline-flex min-h-11 items-center font-semibold text-brand-900 underline decoration-gold-600 underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-600">
                            {t("retry")}
                        </button>
                        <Link href="/contact" className="inline-flex min-h-11 items-center font-semibold text-brand-900 underline decoration-gold-600 underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-600">
                        {t("contact")}
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};
