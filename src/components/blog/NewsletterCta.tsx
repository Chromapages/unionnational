"use client";

import { useState } from "react";
import { NewsletterModal } from "@/components/ui/NewsletterModal";
import { Mail } from "lucide-react";

export const NewsletterCta = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className="rounded-3xl border border-brand-100/70 bg-white p-6 shadow-lg shadow-brand-900/5">
                <div className="text-xs font-bold uppercase tracking-[0.3em] text-brand-900/50 font-sans">
                    Weekly Insights
                </div>
                <h3 className="mt-4 text-lg font-semibold text-brand-900 font-heading">
                    Join the tax strategy brief.
                </h3>
                <p className="mt-2 text-sm text-brand-900/60 font-sans mb-6">
                    A short, actionable newsletter built for founders and high earners.
                </p>

                <button
                    onClick={() => setIsOpen(true)}
                    className="w-full h-12 rounded-full bg-brand-900 text-gold-200 text-xs font-bold uppercase tracking-[0.2em] hover:bg-brand-800 transition-all flex items-center justify-center gap-3 group"
                >
                    <Mail className="w-4 h-4 text-gold-500 group-hover:scale-110 transition-transform" />
                    Get the Brief
                </button>
            </div>

            <NewsletterModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </>
    );
};
