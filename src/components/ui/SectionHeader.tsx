import { cn } from "@/lib/utils";

type SectionHeaderProps = {
    label: string;
    heading: string;
    description?: string;
    className?: string;
    dark?: boolean;
    headingId?: string;
};

export function SectionHeader({ label, heading, description, className, dark = false, headingId }: SectionHeaderProps) {
    return (
        <div className={cn("mx-auto max-w-3xl text-center", className)}>
            <span className={cn("mb-4 inline-flex rounded-full border px-4 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.2em]", dark ? "border-gold-500/30 bg-gold-500/10 text-gold-400" : "border-gold-200 bg-gold-50 text-gold-600")}>
                {label}
            </span>
            <h2 id={headingId} className={cn("scroll-mt-[calc(var(--header-height)+1.5rem)] font-heading text-3xl font-bold tracking-tight md:text-4xl", dark ? "text-white" : "text-brand-900")}>
                {heading}
            </h2>
            <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gold-400" />
            {description && <p className={cn("mx-auto mt-5 max-w-2xl text-base leading-relaxed md:text-lg", dark ? "text-white/70" : "text-brand-900/60")}>{description}</p>}
        </div>
    );
}
