"use client";

import { Search, FileText, Settings, ShieldCheck } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";

const steps = [
    {
        id: 1,
        title: "Discovery",
        description: "We analyze your financial situation and identify immediate tax-saving opportunities.",
        icon: Search,
    },
    {
        id: 2,
        title: "Strategy",
        description: "Our team builds a custom tax plan tailored to your specific industry and goals.",
        icon: FileText,
    },
    {
        id: 3,
        title: "Implementation",
        description: "We execute the plan, setting up S-Corps, payroll, and bookkeeping systems.",
        icon: Settings,
    },
    {
        id: 4,
        title: "Review",
        description: "Quarterly check-ins ensure you stay compliant and maximize savings year-round.",
        icon: ShieldCheck,
    },
];

export function ProcessTimeline() {
    return (
        <section className="border-y border-zinc-200 bg-zinc-50 py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <SectionHeader label="How it works" heading="Our Proven Process" description="From initial analysis to ongoing management, we handle the complexity so you can focus on growth." className="mb-10 md:mb-16" />
                <ol className="mx-auto max-w-3xl space-y-4">
                        {steps.map((step, index) => (
                            <li
                                key={step.id}
                                className="flex gap-4 rounded-2xl border border-zinc-200 bg-white p-5 text-left shadow-sm"
                            >
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-900 font-bold">
                                    {index + 1}
                                </div>
                                <div>
                                    <step.icon className="mb-2 h-5 w-5 text-gold-600" strokeWidth={1.75} />
                                    <h3 className="font-heading text-lg font-bold text-brand-900">{step.title}</h3>
                                    <p className="mt-1 text-sm leading-relaxed text-zinc-600">{step.description}</p>
                                </div>
                            </li>
                        ))}
                </ol>
            </div>
        </section>
    );
}
