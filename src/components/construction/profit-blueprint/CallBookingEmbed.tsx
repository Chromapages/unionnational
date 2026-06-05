"use client";

import { Calendar, ExternalLink, Video } from "lucide-react";

// TODO: replace with real Calendly/Cal.com URL for the post-purchase call booking
const CALENDAR_URL = "https://calendly.com/jason-unt/blueprint-call";

export function CallBookingEmbed() {
    return (
        <div className="bg-white rounded-2xl shadow-2xl shadow-brand-900/20 ring-1 ring-gold-500/20 overflow-hidden">
            <div className="p-6 sm:p-8 border-b border-slate-100 bg-gradient-to-br from-gold-50/40 to-white">
                <div className="flex items-center gap-2 mb-3">
                    <Calendar className="w-5 h-5 text-gold-600" />
                    <span className="text-xs font-black uppercase tracking-widest text-gold-700">
                        Book Your Free 15-Minute Call
                    </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black font-heading text-brand-900 mb-2">
                    Now let&apos;s make sure you actually implement it.
                </h3>
                <p className="text-slate-600 text-sm sm:text-base">
                    15 minutes with our team. No pitch. We&apos;ll help you identify the single biggest profit leak in your business and what to do about it.
                </p>
            </div>

            <div className="relative bg-slate-50" style={{ height: "640px" }}>
                <iframe
                    src={CALENDAR_URL}
                    title="Book a call"
                    className="w-full h-full border-0"
                    loading="lazy"
                />
            </div>

            <div className="p-5 border-t border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                    <Video className="w-4 h-4 text-slate-400" />
                    <span>Video call &middot; 15 min &middot; No prep needed</span>
                </div>
                <a
                    href={CALENDAR_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-gold-700 hover:text-gold-800 font-bold"
                >
                    Open in new tab
                    <ExternalLink className="w-3.5 h-3.5" />
                </a>
            </div>
        </div>
    );
}
