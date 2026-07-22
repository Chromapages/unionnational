"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const messages = {
    intro: {
        title: "Start with Strategy",
        body: "Bookkeeping is the foundation of every major tax-saving move. Let's get yours right.",
        detailLabel: "Recommended for",
        detail: "Growth-stage businesses with $250K+ revenue.",
    },
    standard: {
        title: "See what clean books unlock",
        body: "Monthly visibility gives your tax strategy reliable numbers to work from all year.",
        detailLabel: "Included in every cadence",
        detail: "Reconciled accounts, reporting, and proactive flags.",
    },
    proof: {
        title: "Built for the work ahead",
        body: "Join 200+ businesses using current financial data to make sharper decisions.",
        detailLabel: "What clients value",
        detail: "A close that is measured in days, not weeks.",
    },
} as const;

type StickyMode = keyof typeof messages;

export function BookkeepingStickyCard() {
    const [mode, setMode] = useState<StickyMode>("intro");

    useEffect(() => {
        const targets: Array<[string, StickyMode]> = [
            ["included", "standard"],
            ["bookkeeping-proof", "proof"],
        ];
        const observers = targets.flatMap(([id, nextMode]) => {
            const target = document.getElementById(id);
            if (!target) return [];
            const observer = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting) setMode(nextMode);
            }, { rootMargin: "-35% 0px -55%" });
            observer.observe(target);
            return [observer];
        });

        return () => observers.forEach((observer) => observer.disconnect());
    }, []);

    const message = messages[mode];

    return (
        <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-4">
                <p className="rounded-2xl border border-gold-500/25 bg-gold-500/10 p-5 text-sm leading-relaxed text-brand-950">
                    <span className="font-heading text-2xl font-bold text-gold-400">200+</span> businesses served with current financial data.
                </p>
                <div className="rounded-3xl border border-gold-500/20 bg-brand-950 p-8 shadow-2xl">
                    <h2 className="font-heading text-2xl font-bold tracking-tighter text-white">{message.title}</h2>
                    <p className="mt-6 text-sm leading-relaxed text-slate-300">{message.body}</p>
                    <Link href="/contact" className="mt-8 flex min-h-12 w-full items-center justify-center rounded-xl bg-gold-500 px-5 font-heading font-bold text-brand-900 transition-colors hover:bg-gold-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400">
                        Book a Strategy Call
                    </Link>
                    <div className="mt-6 border-t border-white/10 pt-6">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{message.detailLabel}</p>
                        <p className="mt-1 text-sm font-medium text-white">{message.detail}</p>
                    </div>
                </div>
                <p className="px-2 text-xs leading-relaxed text-slate-500">A current close makes it possible to act on a tax opportunity before the year is over.</p>
            </div>
        </aside>
    );
}
