import { LucideIcon, ShieldCheck, Lock, Clock, Award } from "lucide-react";
import { cn } from "@/lib/utils";

interface TrustBadge {
    icon: LucideIcon;
    label: string;
}

const badges: TrustBadge[] = [
    { icon: ShieldCheck, label: 'EA Licensed' },
    { icon: Lock, label: '256-bit Encryption' },
    { icon: Clock, label: '2hr Avg. Response' },
    { icon: Award, label: 'IRS Representation' },
];

export function TrustBadges({ className }: { className?: string }) {
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
