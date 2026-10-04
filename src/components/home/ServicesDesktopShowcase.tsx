"use client";

import { useState } from "react";
import {
    ArrowRight,
    BarChart3,
    Building2,
    Compass,
    FileText,
    Settings,
    UsersRound,
    type LucideIcon,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { ServiceCard } from "@/lib/services/coreServiceCards";

export interface DesktopOutcome {
    number: string;
    eyebrow: string;
    title: string;
    subtitle: string;
    services: ServiceCard[];
}

interface ServicesDesktopShowcaseProps {
    outcomes: DesktopOutcome[];
    outcomesLabel: string;
    descriptions: Record<string, string>;
    quotes: string[];
    quoteEyebrow: string;
    quoteFooter: string;
    compareEyebrow: string;
    compareDescription: string;
    compareCta: string;
}

const outcomeIcons: LucideIcon[] = [BarChart3, FileText, UsersRound, Settings];
const serviceIcons: Record<string, LucideIcon> = {
    scorp: Building2,
    taxPlanning: BarChart3,
    bookkeeping: FileText,
    fractionalCfo: UsersRound,
    formation: Building2,
    payroll: FileText,
};

export function ServicesDesktopShowcase({
    outcomes,
    outcomesLabel,
    descriptions,
    quotes,
    quoteEyebrow,
    quoteFooter,
    compareEyebrow,
    compareDescription,
    compareCta,
}: ServicesDesktopShowcaseProps) {
    const [selected, setSelected] = useState(0);
    const active = outcomes[selected];

    return (
        <div className="hidden xl:block">
            <div role="group" className="-ml-2 mt-8 grid grid-cols-[1.1fr_1.1fr_1.03fr_1fr]" aria-label={outcomesLabel}>
                {outcomes.map((outcome, index) => {
                    const Icon = outcomeIcons[index] ?? BarChart3;
                    const isActive = selected === index;

                    return (
                        <button
                            key={outcome.number}
                            type="button"
                            aria-pressed={isActive}
                            onClick={() => setSelected(index)}
                            className={`group relative flex min-h-32 items-center gap-3 px-3 text-left transition-colors focus-visible:z-10 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-gold-600 2xl:gap-5 2xl:px-5 ${isActive ? "rounded-t-xl border border-gold-200 bg-[#fffcf7] after:absolute after:inset-x-0 after:bottom-0 after:h-[3px] after:bg-gold-800" : "border-r border-slate-200 hover:bg-gold-50/50 last:border-r-0"}`}
                        >
                            <span className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full ${isActive ? "bg-brand-950 text-gold-200" : "bg-[#faf5eb] text-brand-900"}`} aria-hidden="true">
                                <Icon className="h-8 w-8 stroke-[1.7]" />
                            </span>
                            <span className="min-w-0">
                                <span className="block font-heading text-lg font-bold text-gold-900">{outcome.number}</span>
                                <span className="mt-1 block text-[11px] font-bold uppercase tracking-[0.15em] text-slate-600">{outcome.eyebrow}</span>
                                <span className="mt-1.5 block font-heading text-base font-bold leading-tight text-brand-950">{outcome.title}</span>
                            </span>
                        </button>
                    );
                })}
            </div>

            <div className="mt-2 grid min-h-[31rem] grid-cols-[minmax(0,56.5fr)_minmax(0,43.5fr)] overflow-hidden rounded-xl border border-gold-200 bg-[#fffdfa]">
                <div className="px-11 pb-5 pt-10">
                    <p className="flex items-center gap-4 font-body text-sm font-bold uppercase tracking-[0.17em] text-gold-900">
                        <span>{active.number}</span>
                        <span className="h-px w-9 bg-gold-800" aria-hidden="true" />
                        {active.eyebrow}
                    </p>
                    <h3 aria-live="polite" className="mt-5 max-w-[12ch] font-heading text-[3rem] font-bold leading-[1.02] tracking-tight text-brand-950">{active.title}</h3>
                    <p className="mt-3 max-w-[35rem] text-xl leading-7 text-slate-600">{active.subtitle}</p>

                    <div className="mt-3">
                        {active.services.map((service) => {
                            const Icon = serviceIcons[service.id] ?? FileText;
                            return (
                                <Link
                                    key={service.id}
                                    href={service.exploreLinkHref}
                                    data-analytics="services_section_card_click"
                                    data-service-id={service.id}
                                    data-service-position={service.order}
                                    aria-label={service.exploreLinkLabel}
                                    className="group flex min-h-24 items-center gap-10 border-b border-gold-200 py-3 last:border-b-0 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-gold-600"
                                >
                                    <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-[#faf5eb] text-gold-900" aria-hidden="true">
                                        <Icon className="h-9 w-9 stroke-[1.6]" />
                                    </span>
                                    <span className="min-w-0 flex-1">
                                        <strong className="block font-heading text-xl font-bold text-brand-950">{service.heading}</strong>
                                        <span className="mt-1 block max-w-[25rem] text-base leading-snug text-slate-600">{descriptions[service.id] ?? service.description}</span>
                                    </span>
                                    <ArrowRight className="h-7 w-7 shrink-0 text-gold-900 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden="true" />
                                </Link>
                            );
                        })}
                    </div>
                </div>

                <div className="relative isolate overflow-hidden border-l border-gold-200 bg-[#fffaf3] px-20 pt-14">
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[56%] bg-cover bg-bottom" style={{ backgroundImage: 'url("/images/services-mountain.svg")' }} aria-hidden="true" />
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-600">{quoteEyebrow}</p>
                    <blockquote className="mt-6 max-w-[25rem] font-body text-[1.8rem] italic leading-[1.32] text-brand-950">{quotes[selected]}</blockquote>
                    <p className="mt-9 flex items-center gap-5 text-xs font-bold uppercase tracking-[0.18em] text-slate-600">
                        <span className="h-px w-10 bg-gold-800" aria-hidden="true" />
                        {quoteFooter}
                    </p>
                </div>
            </div>

            <div className="mt-6 flex min-h-28 items-center gap-10 rounded-xl border border-[#dfe6dc] bg-[#f9fbf8] px-6">
                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#faf5eb] text-gold-900" aria-hidden="true">
                    <Compass className="h-9 w-9 stroke-[1.6]" />
                </span>
                <span className="h-14 w-px bg-slate-200" aria-hidden="true" />
                <span className="min-w-0 flex-1">
                    <span className="block text-sm font-bold uppercase tracking-[0.17em] text-gold-900">{compareEyebrow}</span>
                    <span className="mt-1 block text-base text-slate-600">{compareDescription}</span>
                </span>
                <Link href="/services" data-analytics="services_section_compare_all_click" className="group inline-flex min-h-16 shrink-0 items-center gap-4 rounded-lg bg-brand-950 px-7 text-base font-semibold text-white transition-colors hover:bg-brand-900 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-gold-600 focus-visible:ring-offset-2">
                    {compareCta}
                    <ArrowRight className="h-6 w-6 text-gold-300 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden="true" />
                </Link>
            </div>
        </div>
    );
}
