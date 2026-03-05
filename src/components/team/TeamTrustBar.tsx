import { Award, GraduationCap, ShieldCheck } from "lucide-react";

const items = [
    {
        label: "EA",
        description: "IRS Enrolled Agent",
        icon: ShieldCheck,
    },
    {
        label: "MBA",
        description: "Business Strategy",
        icon: GraduationCap,
    },
    {
        label: "FSCP",
        description: "Financial Services",
        icon: Award,
    },
];

export function TeamTrustBar() {
    return (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            {items.map((item) => (
                <div
                    key={item.label}
                    className="flex items-center gap-3 rounded-2xl bg-white/5 border border-white/10 px-4 py-3 backdrop-blur-sm"
                >
                    <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400">
                        <item.icon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 text-left">
                        <div className="text-white font-bold tracking-tight font-heading text-base leading-tight">
                            {item.label}
                        </div>
                        <div className="text-[10px] uppercase tracking-widest text-brand-200/70 font-bold truncate">
                            {item.description}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
