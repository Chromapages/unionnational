import { Link } from "@/i18n/navigation";
import { ArrowDown, ArrowRight, ChartNoAxesColumnIncreasing, FileText, Leaf, UserRound } from "lucide-react";

type ServiceHeroProps = {
    id: string;
    eyebrow: string;
    headline: React.ReactNode;
    subheadline: React.ReactNode;
    primaryCta: { label: string; href: string };
    secondaryCta?: { label: string; href: string };
    primaryCtaId: string;
    reviewItems: { title: string; detail?: string }[];
    reviewSummary: { title: string; detail?: string };
    compactHeadline?: boolean;
};

const reviewIcons = [ChartNoAxesColumnIncreasing, UserRound, FileText];

export function ServiceHero({ id, eyebrow, headline, subheadline, primaryCta, secondaryCta, primaryCtaId, reviewItems, reviewSummary, compactHeadline = false }: ServiceHeroProps) {
    return (
        <section id={id} data-service-hero aria-labelledby={id + "-heading"} className="relative isolate overflow-hidden bg-brand-500 py-10 text-white lg:py-12">
            <div className="pointer-events-none absolute inset-y-0 right-0 -z-10 hidden w-72 overflow-hidden text-brand-300 opacity-15 lg:block" aria-hidden="true">
                <Leaf className="absolute -right-16 -top-20 size-72 rotate-[140deg] fill-current" strokeWidth={1} />
                <Leaf className="absolute -right-12 top-1/3 size-64 rotate-[-35deg] fill-current" strokeWidth={1} />
                <Leaf className="absolute -bottom-24 right-0 size-72 rotate-[140deg] fill-current" strokeWidth={1} />
            </div>
            <div className="mx-auto grid w-full max-w-[94rem] items-start gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-12 lg:px-8">
                <div className="min-w-0">
                    {eyebrow && <p className="flex items-center gap-4 font-heading text-sm font-bold uppercase leading-relaxed tracking-[.14em] text-gold-400"><span className="h-px w-10 shrink-0 bg-gold-400" aria-hidden="true" /><span>{eyebrow}</span></p>}
                    <h1 id={id + "-heading"} className={(eyebrow ? "mt-6 " : "") + "font-heading font-bold leading-[1.08] tracking-[-.04em] " + (compactHeadline ? "text-[clamp(2.25rem,3vw,2.75rem)]" : "text-[clamp(2.25rem,4vw,3.75rem)]")}>{headline}</h1>
                    <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-brand-50 sm:text-xl">{subheadline}</p>
                    <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-4">
                        <Link id={primaryCtaId} href={primaryCta.href} className="inline-flex min-h-14 max-w-full items-center justify-center gap-3 rounded-lg bg-gold-400 px-6 py-3 font-heading text-base font-bold text-brand-950 transition-colors hover:bg-gold-300 active:bg-gold-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-300 motion-reduce:transition-none sm:text-lg"><span className="min-w-0 lg:whitespace-nowrap">{primaryCta.label}</span><ArrowRight className="size-5 shrink-0" aria-hidden="true" /></Link>
                        {secondaryCta && <Link href={secondaryCta.href} className="inline-flex min-h-11 max-w-full items-center gap-3 rounded-sm text-sm font-semibold text-white underline decoration-gold-400 underline-offset-8 hover:text-gold-300 active:text-gold-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-300 sm:text-base"><span className="min-w-0">{secondaryCta.label}</span><ArrowDown className="size-5 shrink-0 text-gold-400" aria-hidden="true" /></Link>}
                    </div>
                </div>
                <div className="min-w-0 border-t border-brand-300/50 pt-8 lg:border-t-0 lg:pt-2">
                    {reviewItems.length > 0 && <ol className="grid gap-6 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-brand-300/50">
                        {reviewItems.map((item, index) => { const Icon = reviewIcons[index] || FileText; return <li key={index + "-" + item.title} className="min-w-0 border-t border-brand-300/50 pt-5 first:border-t-0 first:pt-0 sm:border-t-0 sm:px-5 sm:pt-0 sm:first:pl-0 sm:last:pr-0">
                            <p className="font-heading text-xl font-semibold tabular-nums text-gold-400" aria-hidden="true">{String(index + 1).padStart(2, "0")}</p>
                            <span className="mt-4 flex size-16 items-center justify-center rounded-full bg-brand-400/40 text-brand-50" aria-hidden="true"><Icon className="size-8" strokeWidth={1.5} /></span>
                            <h2 className="mt-5 font-heading text-sm font-bold uppercase leading-snug tracking-[.04em] text-white sm:text-base">{item.title}</h2>
                            {item.detail && <p className="mt-3 text-base leading-relaxed text-brand-50">{item.detail}</p>}
                        </li>; })}
                    </ol>}
                    {reviewSummary.title && <div className="mt-8"><span className="block h-px w-10 bg-gold-400" aria-hidden="true" /><h2 className="mt-5 font-heading text-2xl font-bold leading-tight tracking-tight text-white">{reviewSummary.title}</h2>{reviewSummary.detail && <p className="mt-3 text-base leading-relaxed text-brand-50">{reviewSummary.detail}</p>}</div>}
                </div>
            </div>
        </section>
    );
}
