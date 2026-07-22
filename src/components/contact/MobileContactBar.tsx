"use client";

import { CalendarCheck, Phone } from "lucide-react";

export function MobileContactBar({ phone }: { phone?: string }) {
    const phoneHref = `tel:${(phone || "(801) 890-1040").replace(/[^\d+]/g, "")}`;
    const scrollToCalendar = (event: React.MouseEvent<HTMLAnchorElement>) => {
        const calendar = document.getElementById("direct-booking-calendar");
        if (!calendar) return;

        event.preventDefault();
        window.history.pushState(null, "", "#direct-booking-calendar");
        calendar.scrollIntoView({
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
            block: "start",
        });
    };

    return (
        <div className="fixed inset-x-0 bottom-0 z-[1150] border-t border-white/10 bg-brand-950/95 p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-2xl backdrop-blur md:hidden" aria-label="Contact actions">
            <div className="mx-auto grid max-w-md grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-2">
                <a href={phoneHref} className="flex min-h-12 min-w-0 items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-white/15 px-1 text-xs font-bold text-white focus-visible:outline-2 focus-visible:outline-gold-400 sm:text-sm"><Phone className="h-4 w-4 shrink-0" aria-hidden="true" />Call Now</a>
                <a href="#direct-booking-calendar" onClick={scrollToCalendar} className="flex min-h-12 min-w-0 items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-gold-500 px-1 text-xs font-bold text-brand-950 focus-visible:outline-2 focus-visible:outline-white sm:text-sm"><CalendarCheck className="h-4 w-4 shrink-0" aria-hidden="true" />Book Free Call</a>
            </div>
        </div>
    );
}
