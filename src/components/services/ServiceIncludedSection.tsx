import { ChartNoAxesColumnIncreasing, CircleDollarSign, FileText, UsersRound } from "lucide-react";
import type { ServicePage } from "@/types/sanity";

export type IncludedPresentation = {
    description: string;
    note: string;
    groups: { heading: string; items: { title: string; detail: string }[] }[];
};

const includedIcons = [FileText, CircleDollarSign, UsersRound, ChartNoAxesColumnIncreasing];

export function ServiceIncludedSection({ id, included, scopeLabel, presentation }: {
    id: string;
    included: ServicePage["included"];
    scopeLabel: string;
    presentation?: IncludedPresentation;
}) {
    const groups = presentation?.groups || [{ heading: included.eyebrow || scopeLabel, items: included.items.map(title => ({ title, detail: "" })) }];
    const description = presentation?.description || included.description;
    let itemNumber = 0;

    return (
        <section id={id} data-service-included aria-labelledby={`${id}-heading`} className="scroll-mt-[calc(var(--header-height)+1.5rem)] bg-gold-50/20 py-10 lg:py-12">
            <div className="mx-auto w-full max-w-[94rem] px-4 sm:px-6 lg:px-8">
                <header className="text-center">
                    <h2 id={`${id}-heading`} className="font-heading text-3xl font-bold leading-[1.12] tracking-[-.025em] text-brand-950 sm:text-4xl lg:text-[2.75rem]">{included.heading}</h2>
                    <span className="mx-auto mt-4 block h-1 w-24 bg-gold-500" aria-hidden="true" />
                    {description && <p className="mx-auto mt-5 max-w-[85ch] font-body text-base leading-relaxed text-slate-700 sm:text-lg">{description}</p>}
                </header>
                <div className="mt-8 space-y-6 sm:mt-10 sm:space-y-7">
                    {groups.map((group, groupIndex) => <div key={groupIndex}>
                        <h3 className="mb-4 flex items-center gap-5 font-heading text-sm font-semibold uppercase tracking-widest text-gold-700"><span>{group.heading}</span><span className="h-px flex-1 bg-gold-200" aria-hidden="true" /></h3>
                        <ul className="grid auto-rows-fr gap-4 md:grid-cols-2 lg:gap-6">
                            {group.items.map((item) => {
                                const number = itemNumber++;
                                const Icon = includedIcons[number % includedIcons.length];
                                return <li key={number} className="flex min-w-0 items-center gap-5 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:gap-7 sm:p-7">
                                    <span className="flex size-16 shrink-0 items-center justify-center rounded-full bg-brand-50/60 text-brand-500 sm:size-20" aria-hidden="true"><Icon className="size-8 sm:size-10" strokeWidth={1.5} /></span>
                                    <div className="min-w-0"><p className="font-heading text-base font-semibold tabular-nums text-gold-700" aria-hidden="true">{String(number + 1).padStart(2, "0")}</p><h4 className="mt-1 font-heading text-xl font-semibold leading-snug tracking-tight text-brand-500 sm:text-2xl">{item.title}</h4>{item.detail && <p className="mt-2 font-body text-base leading-relaxed text-slate-700 sm:text-lg">{item.detail}</p>}</div>
                                </li>;
                            })}
                        </ul>
                    </div>)}
                </div>
                {presentation?.note && <div className="mt-6 flex items-center justify-center gap-6 text-center sm:mt-7"><span className="hidden h-px w-24 shrink-0 bg-gold-200 sm:block" aria-hidden="true" /><p className="font-body text-sm italic leading-relaxed text-slate-700">{presentation.note}</p><span className="hidden h-px w-24 shrink-0 bg-gold-200 sm:block" aria-hidden="true" /></div>}
                {(included.pricing?.headline || included.pricing?.detail) && <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-gold-200 bg-gold-50 p-5 text-center">{included.pricing.headline && <p className="font-heading text-lg font-semibold text-brand-900">{included.pricing.headline}</p>}{included.pricing.detail && <p className="mt-2 font-body text-sm leading-relaxed text-slate-700">{included.pricing.detail}</p>}</div>}
            </div>
        </section>
    );
}
