import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BlueprintCtaProps {
    eyebrow?: string;
    title: string;
    subtitle?: string;
    buttonText?: string;
    buttonHref?: string;
    variant?: "gold" | "dark";
    trustLine?: string;
}

export function BlueprintCta({
    eyebrow,
    title,
    subtitle,
    buttonText = "Get the Blueprint",
    buttonHref = "#book-sales",
    variant = "gold",
    trustLine = "Instant Digital Delivery",
}: BlueprintCtaProps) {
    const isDark = variant === "dark";

    return (
        <section
            className={cn(
                "py-12 lg:py-16 relative overflow-hidden",
                isDark ? "bg-brand-900" : "bg-gold-500"
            )}
        >
            {isDark ? (
                <>
                    <div className="absolute inset-0 bg-[url('/images/pattern-grid.svg')] bg-repeat opacity-[0.03]" />
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold-600/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4" />
                </>
            ) : (
                <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10" />
            )}

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                {eyebrow && (
                    <span
                        className={cn(
                            "inline-block text-xs font-black uppercase tracking-[0.2em] mb-3",
                            isDark ? "text-gold-400" : "text-brand-900"
                        )}
                    >
                        {eyebrow}
                    </span>
                )}
                <h2
                    className={cn(
                        "text-3xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight leading-[1.1] uppercase mb-4",
                        isDark ? "text-white" : "text-brand-900"
                    )}
                >
                    {title}
                </h2>
                {subtitle && (
                    <p
                        className={cn(
                            "text-base sm:text-lg leading-relaxed mb-6 max-w-2xl mx-auto",
                            isDark ? "text-slate-300" : "text-brand-900/80"
                        )}
                    >
                        {subtitle}
                    </p>
                )}
                <a
                    href={buttonHref}
                    className={cn(
                        "inline-flex items-center gap-2 px-8 py-4 font-black uppercase tracking-wider text-sm sm:text-base rounded-full transition-colors shadow-lg",
                        isDark
                            ? "bg-gold-500 hover:bg-gold-600 text-white shadow-gold-500/30"
                            : "bg-brand-900 hover:bg-brand-800 text-white shadow-brand-900/30"
                    )}
                >
                    {buttonText}
                    <ArrowRight size={18} />
                </a>
                {trustLine && (
                    <p
                        className={cn(
                            "mt-4 text-xs uppercase tracking-wider font-bold",
                            isDark ? "text-slate-400" : "text-brand-900/70"
                        )}
                    >
                        {trustLine}
                    </p>
                )}
            </div>
        </section>
    );
}
