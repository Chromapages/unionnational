"use client";

import { useState } from "react";
import { Phone, CalendarCheck, ChevronDown } from "lucide-react";
import { BookingCalendar } from "@/components/booking/BookingCalendar";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { useTranslations } from "next-intl";

interface AlternativeCTAProps {
    title?: string;
    subtitle?: string;
    phone?: string;
    calendarUrl?: string;
}

export function AlternativeCTA({
    title,
    subtitle,
    phone,
    calendarUrl,
}: AlternativeCTAProps) {
    const t = useTranslations("ContactPage.AlternativeCTA");
    const [calendarOpen, setCalendarOpen] = useState(true);

    return (
        <section id="direct-booking" className="scroll-mt-24 bg-slate-50 py-16 sm:py-20 border-t border-slate-200">
            <div className="max-w-6xl mx-auto px-6">
                <RevealOnScroll className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-brand-900 text-[10px] font-bold uppercase tracking-widest mb-6 shadow-sm font-sans text-opacity-60">
                        <CalendarCheck className="w-3 h-3 text-gold-500" />
                        {t("eyebrow")}
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-bold text-brand-900 font-heading mb-4">
                        {title || t("fallbackTitle")}
                    </h2>
                    <p className="text-brand-900/60 font-sans text-lg max-w-2xl mx-auto">
                        {subtitle || t("fallbackSubtitle")}
                    </p>
                </RevealOnScroll>

                <RevealOnScroll delay={100}>
                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
                        <button
                            type="button"
                            onClick={() => setCalendarOpen((open) => !open)}
                            aria-expanded={calendarOpen}
                            aria-controls="direct-booking-calendar"
                            className="flex min-h-14 w-full items-center justify-between gap-4 px-5 py-4 text-left font-bold text-brand-900 transition hover:bg-gold-50 focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-gold-500 sm:px-7"
                        >
                            <span className="flex items-center gap-3"><CalendarCheck className="h-5 w-5 text-gold-600" aria-hidden="true" />{t("seeTimes")}</span>
                            <ChevronDown className={`h-5 w-5 transition-transform motion-reduce:transition-none ${calendarOpen ? "rotate-180" : ""}`} aria-hidden="true" />
                        </button>
                        {calendarOpen && (
                            <div id="direct-booking-calendar" className="min-h-[600px] border-t border-slate-200">
                                <BookingCalendar src={calendarUrl} />
                            </div>
                        )}
                    </div>
                </RevealOnScroll>


                <RevealOnScroll delay={200} className="mt-9 text-center">
                    <p className="text-sm font-bold text-brand-900/40 uppercase tracking-widest mb-4 font-sans">
                        {t("callDirectly")}
                    </p>
                    <a href={`tel:${(phone ?? "").replace(/\D/g, '')}`} className="inline-flex items-center gap-3 text-2xl font-bold text-brand-900 hover:text-gold-600 transition-colors font-heading group">
                        <div className="w-10 h-10 rounded-full bg-gold-500 text-brand-900 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-gold-500/20">
                            <Phone className="w-5 h-5 fill-current" />
                        </div>
                        {phone}
                    </a>
                </RevealOnScroll>
            </div>
        </section>
    );
}
