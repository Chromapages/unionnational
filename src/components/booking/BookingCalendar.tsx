"use client";

import { useState } from "react";
import Script from "next/script";

const DEFAULT_GHL_CALENDAR_URL = "https://link.agent-crm.com/widget/booking/sBGopjvf9OdyrfgWqOJx";

function resolveCalendarUrl(src?: string) {
    const trimmed = src?.trim();
    return trimmed || DEFAULT_GHL_CALENDAR_URL;
}

export const BookingCalendar = ({ src }: { src?: string }) => {
    const [embedError, setEmbedError] = useState(false);
    const calendarUrl = resolveCalendarUrl(src);
    const calendarId = calendarUrl.split("/").filter(Boolean).at(-1) || "msgsndr-calendar";

    return (
        <div className="flex h-full min-h-[600px] w-full flex-col" data-ghl-calendar>
            <iframe
                src={calendarUrl}
                title="Schedule a tax strategy call"
                id={`${calendarId}-calendar`}
                className="min-h-[600px] w-full border-0"
                scrolling="no"
                onError={() => setEmbedError(true)}
            />
            <Script
                id="ghl-form-embed"
                src="https://link.agent-crm.com/js/form_embed.js"
                strategy="afterInteractive"
                onError={() => setEmbedError(true)}
            />
            {embedError && (
                <p className="p-4 text-center text-sm text-slate-600" role="alert">
                    The calendar could not load. Please call our office to schedule.
                </p>
            )}
        </div>
    );
};
