import { Link } from "@/i18n/navigation";
import { ArrowRight, CalendarDays, ChartNoAxesColumnIncreasing, ClipboardCheck, FileText, RefreshCw, Settings } from "lucide-react";
import type { ServicePage } from "@/types/sanity";

export type ProcessDetail = { title?: string; reviewLabel: string; review: string; output: string };
type ServiceProcessSectionProps = {
    id: string;
    process: ServicePage["process"];
    details?: ProcessDetail[];
    outputLabel: string;
    primaryCta: { label: string; href: string };
    ctaHelp: string;
};
const processIcons = [ChartNoAxesColumnIncreasing, ClipboardCheck, Settings, RefreshCw];
const outputIcons = [FileText, CalendarDays, FileText, ChartNoAxesColumnIncreasing];

export function ServiceProcessSection({ id, process, details, outputLabel, primaryCta, ctaHelp }: ServiceProcessSectionProps) {
    const count = process.steps.length;
    const columns = count === 4 ? "lg:grid-cols-4" : count === 5 ? "lg:grid-cols-6" : "lg:grid-cols-3";
    const alignDetailRows = Boolean(details && details.length >= count);
    return (
        <section id={id} data-service-process aria-labelledby={id + "-heading"} className="scroll-mt-[calc(var(--header-height)+1rem)] bg-white py-10 lg:py-12">
            <div className="mx-auto w-full max-w-[94rem] px-4 sm:px-6 lg:px-8">
                <header className="mx-auto max-w-[70rem] text-center">
                    {process.eyebrow && <p className="flex items-center justify-center gap-4 font-heading text-xs font-semibold uppercase tracking-[.18em] text-slate-700 sm:text-sm"><span className="h-px w-10 bg-gold-600" aria-hidden="true" />{process.eyebrow}<span className="h-px w-10 bg-gold-600" aria-hidden="true" /></p>}
                    <h2 id={id + "-heading"} className="mt-4 font-heading text-3xl font-bold uppercase leading-[1.12] tracking-[-.025em] text-brand-950 sm:text-4xl lg:text-[2.75rem]">{process.heading}</h2>
                    {process.description && <p className="mx-auto mt-4 max-w-[65ch] text-base leading-relaxed text-slate-700 sm:text-xl">{process.description}</p>}
                </header>
                <ol className={"mt-8 grid gap-px overflow-hidden rounded-xl border border-slate-200 bg-slate-200 md:grid-cols-2 " + columns}>
                    {process.steps.map((step, index) => {
                        const Icon = processIcons[index % processIcons.length];
                        const OutputIcon = outputIcons[index % outputIcons.length];
                        const detail = details?.[index];
                        const duration = step.duration && !/^(step|phase|stage|paso|etapa)\s*\d+$/i.test(step.duration.trim()) ? step.duration : undefined;
                        const tabletSpan = count % 2 === 1 && index === count - 1 ? "md:col-span-2 " : "";
                        const desktopSpan = count === 5 ? index < 3 ? "lg:col-span-2" : "lg:col-span-3" : "lg:col-span-1";
                        return <li key={index + "-" + step.title} className={"flex min-w-0 flex-col bg-white p-5 sm:p-6 " + tabletSpan + desktopSpan + (alignDetailRows ? " lg:row-span-3 lg:grid lg:grid-rows-subgrid" : "")}>
                            <div>
                            <div className="flex items-center gap-4"><span className="font-heading text-2xl font-bold tabular-nums text-gold-700" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><span className="h-px flex-1 bg-gold-600" aria-hidden="true" /></div>
                            <span className="mt-4 flex size-14 items-center justify-center rounded-full bg-brand-50/40 text-brand-500" aria-hidden="true"><Icon className="size-7" strokeWidth={1.5} /></span>
                            <h3 className="mt-4 font-heading text-xl font-bold leading-snug tracking-tight text-brand-950 sm:text-2xl">{detail?.title || step.title}</h3>
                            {duration && <p className="mt-2 text-xs font-semibold text-slate-700">{duration}</p>}
                            <p className="mt-3 text-base leading-relaxed text-slate-700">{step.description}</p>
                            </div>
                            {detail && <>
                                <div data-process-review className="mt-5 border-t border-slate-200 pt-4"><h4 className="font-heading text-xs font-semibold uppercase tracking-[.12em] text-brand-500">{detail.reviewLabel}</h4><p className="mt-2 text-sm leading-relaxed text-slate-700">{detail.review}</p></div>
                                <div data-process-output className="mt-4 border-t border-slate-200 pt-4"><h4 className="font-heading text-xs font-semibold uppercase tracking-[.12em] text-brand-500">{outputLabel}</h4><p className="mt-2 flex items-start gap-3 rounded-lg bg-brand-50/25 p-3 text-sm leading-relaxed text-brand-900"><OutputIcon className="size-5 shrink-0 text-gold-700" strokeWidth={1.5} aria-hidden="true" /><span className="min-w-0">{detail.output}</span></p></div>
                            </>}
                        </li>;
                    })}
                </ol>
                <div className="mt-6 flex flex-col items-center text-center"><Link href={primaryCta.href} className="inline-flex min-h-14 max-w-full items-center justify-center gap-4 rounded-lg bg-brand-500 px-7 py-3 font-heading text-base font-semibold text-white transition-colors hover:bg-brand-600 active:bg-brand-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-700 motion-reduce:transition-none sm:text-lg"><span className="min-w-0 lg:whitespace-nowrap">{primaryCta.label}</span><ArrowRight className="size-5 shrink-0" aria-hidden="true" /></Link><p className="mt-3 text-sm leading-relaxed text-slate-700">{ctaHelp}</p></div>
            </div>
        </section>
    );
}
