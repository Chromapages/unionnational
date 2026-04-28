// src/components/SCorp/AuthorityBadge.tsx
import { Award, BadgeCheck, BriefcaseBusiness, ShieldCheck } from "lucide-react";

const badges = [
    { label: "IRS Enrolled Agent", icon: ShieldCheck },
    { label: "LUTCF", icon: BadgeCheck },
    { label: "FSCP", icon: Award },
    { label: "20+ Years", icon: BriefcaseBusiness },
];

export function AuthorityBadge() {
    return (
        <div className="flex flex-wrap gap-3">
            {badges.map((badge) => {
                const Icon = badge.icon;

                return (
                    <div key={badge.label} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-brand-950 shadow-[0_12px_40px_rgba(15,23,42,0.06)]">
                        <Icon className="h-4 w-4 text-gold-600" aria-hidden="true" />
                        {badge.label}
                    </div>
                );
            })}
        </div>
    );
}
