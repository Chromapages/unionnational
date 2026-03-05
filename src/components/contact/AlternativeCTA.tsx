"use client";

import { Phone, CalendarCheck } from "lucide-react";
import { GHLScheduler } from "./GHLScheduler";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

interface AlternativeCTAProps {
    title?: string;
    subtitle?: string;
    calendarUrl?: string;
    phone?: string;
}

export function AlternativeCTA({
    title = "Prefer to schedule directly?",
    subtitle = "Skip the back-and-forth email tag. Book a free 15-minute strategy call with our team.",
    calendarUrl,
    phone = "(555) 123-4567"
}: AlternativeCTAProps) {
    return (
        <section className="bg-slate-50 py-24 border-t border-slate-200">
            <div className="max-w-4xl mx-auto px-6">
                <RevealOnScroll className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-brand-900 text-[10px] font-bold uppercase tracking-widest mb-6 shadow-sm font-sans text-opacity-60">
                        <CalendarCheck className="w-3 h-3 text-gold-500" />
                        Instant Scheduling
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-bold text-brand-900 font-heading mb-4">
                        {title}
                    </h2>
                    <p className="text-brand-900/60 font-sans text-lg max-w-2xl mx-auto">
                        {subtitle}
                    </p>
                </RevealOnScroll>

                <RevealOnScroll delay={100}>
                    {/* Calendar Embed */}
                    {calendarUrl ? (
                        <GHLScheduler calendarUrl={calendarUrl} />
                    ) : (
                        <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center text-slate-400">
                            <p>GoHighLevel Calendar URL not configured in CMS.</p>
                        </div>
                    )}
                </RevealOnScroll>

                <RevealOnScroll delay={200} className="mt-12 text-center">
                    <p className="text-sm font-bold text-brand-900/40 uppercase tracking-widest mb-4 font-sans">
                        Or call us directly
                    </p>
                    <a href={`tel:${phone.replace(/\D/g, '')}`} className="inline-flex items-center gap-3 text-2xl font-bold text-brand-900 hover:text-gold-600 transition-colors font-heading group">
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
