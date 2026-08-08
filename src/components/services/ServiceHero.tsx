import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { TrustStack, type TrustStackItem } from "@/components/ui/TrustStack";
import { cn } from "@/lib/utils";
import type { CSSProperties } from "react";

type ServiceHeroProps = {
    eyebrow: string;
    headline: React.ReactNode;
    subheadline: React.ReactNode;
    trustItems: TrustStackItem[];
    primaryCta: { label: string; href: string };
    secondaryCta?: { label: string; href: string };
    microcopy?: string;
    visualAnchor?: React.ReactNode;
    mobileFirst?: boolean;
    primaryCtaId?: string;
    accentColor?: string;
};

export function ServiceHero({
    eyebrow,
    headline,
    subheadline,
    trustItems,
    primaryCta,
    secondaryCta,
    microcopy,
    visualAnchor,
    mobileFirst = false,
    primaryCtaId,
    accentColor,
}: ServiceHeroProps) {
    return (
        <section className={cn("relative overflow-hidden bg-brand-900", mobileFirst ? "px-5 py-8 md:px-6 md:py-16 lg:py-24" : "px-6 py-16 lg:py-24")}>
            <div className="pointer-events-none absolute inset-0 bg-gold-500/5" aria-hidden="true" />
            <div className={cn("relative z-10 mx-auto grid max-w-7xl items-center lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)]", mobileFirst ? "gap-7 md:gap-12" : "gap-12")}>
                <RevealOnScroll>
                    <div className="max-w-3xl">
                        <span className={cn("block text-xs font-bold uppercase text-gold-400", mobileFirst ? "whitespace-nowrap tracking-wide" : "mb-5 tracking-[0.18em]")}>
                            {eyebrow}
                        </span>
                        <h1 className={cn("font-heading font-bold text-white", mobileFirst ? "mt-3 text-3xl leading-tight tracking-tight md:text-5xl lg:text-6xl" : "text-4xl leading-[0.98] tracking-tighter sm:text-5xl lg:text-6xl")}>
                            {headline}
                        </h1>
                        <p className={cn("text-base text-brand-50/80", mobileFirst ? "mt-3 max-w-sm leading-relaxed md:mt-5 md:max-w-2xl md:text-xl" : "mt-5 max-w-2xl leading-relaxed sm:text-xl")}>
                            {subheadline}
                        </p>

                        <TrustStack items={trustItems} ariaLabel="Service trust signals" className={mobileFirst ? "mt-6" : "mt-7"} compactOnMobile={mobileFirst} accentColor={accentColor} />

                        <div className={cn("flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5", mobileFirst ? "mt-6 items-stretch md:items-center" : "mt-8 items-start")}>
                            <Link
                                id={primaryCtaId}
                                href={primaryCta.href}
                                style={accentColor ? ({ "--service-accent": accentColor } as CSSProperties) : undefined}
                                className={cn("inline-flex items-center justify-center gap-3 rounded-md bg-gold-500 px-6 py-3 font-heading font-bold text-brand-900 transition-colors hover:bg-[var(--service-accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400", mobileFirst ? "min-h-12 w-full md:w-auto" : "min-h-11")}
                            >
                                {primaryCta.label}
                                <ArrowRight className="h-5 w-5" aria-hidden="true" />
                            </Link>
                            {secondaryCta && (
                                <a
                                    href={secondaryCta.href}
                                    className={cn("min-h-11 items-center text-sm font-semibold text-white underline decoration-gold-400 underline-offset-4 transition-colors hover:text-gold-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400", mobileFirst ? "hidden md:inline-flex" : "inline-flex")}
                                >
                                    {secondaryCta.label}
                                </a>
                            )}
                        </div>
                        {microcopy && <p className={cn("mt-3 text-xs text-white/50", mobileFirst && "hidden md:block")}>{microcopy}</p>}
                    </div>
                </RevealOnScroll>

                {visualAnchor && <div className="hidden lg:block">{visualAnchor}</div>}
            </div>
        </section>
    );
}
