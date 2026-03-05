"use client";

import { BadgeCheck } from "lucide-react";

interface StrategistProfileProps {
    name?: string;
    title?: string;
    avatarUrl?: string;
}

export function StrategistProfile({
    name = "Union National Strategy Team",
    title = "Verified Tax Strategist",
    avatarUrl,
}: StrategistProfileProps) {
    return (
        <div className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white/80 p-5 backdrop-blur-sm transition-all hover:bg-white hover:shadow-md hover:border-brand-100 cursor-default">
            {avatarUrl ? (
                <img
                    src={avatarUrl}
                    alt={name}
                    className="h-12 w-12 rounded-2xl object-cover shadow-sm transition-transform group-hover:scale-105"
                />
            ) : (
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-900 text-white text-xs font-semibold shadow-sm transition-transform group-hover:scale-105">
                    UN
                </div>
            )}
            <div>
                <div className="flex items-center gap-2 text-sm font-bold text-brand-900 font-heading">
                    {name}
                    <BadgeCheck className="h-4 w-4 text-gold-500" />
                </div>
                <div className="text-xs text-slate-500 font-sans group-hover:text-brand-900/70 transition-colors">
                    {title}
                </div>
            </div>
        </div>
    );
}
