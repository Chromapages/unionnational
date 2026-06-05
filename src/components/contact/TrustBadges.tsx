import { LucideIcon, ShieldCheck, Lock, Clock, Award } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface TrustBadge {
    icon: LucideIcon;
    label: string;
}

export function TrustBadges({ className }: { className?: string }) {
    const t = useTranslations("ContactPage.TrustBadges");
    const badges: TrustBadge[] = [
        { icon: ShieldCheck, label: t("eaLicensed") },
        { icon: Lock, label: t("encryption") },
        { icon: Clock, label: t("avgResponse") },
        { icon: Award, label: t("irsRepresentation") },
    ];

    return (
        <div className={cn("flex flex-wrap gap-3 justify-center", className)}>
            {badges.map((badge, i) => (
                <div
                    key={i}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-white/90 text-xs sm:text-sm font-medium tracking-wide shadow-sm"
                >
                    <badge.icon className="w-4 h-4 text-gold-500" />
                    <span>{badge.label}</span>
                </div>
            ))}
        </div>
    );
}
