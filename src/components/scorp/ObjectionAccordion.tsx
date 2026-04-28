// src/components/SCorp/ObjectionAccordion.tsx
import { ChevronDown } from "lucide-react";

interface ObjectionAccordionProps {
    items: { question: string; answer: string }[];
}

export function ObjectionAccordion({ items }: ObjectionAccordionProps) {
    return (
        <div className="space-y-4">
            {items.map((item) => (
                <details key={item.question} className="group rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-[0_16px_50px_rgba(15,23,42,0.05)] transition-all open:border-gold-500/25 open:shadow-[0_22px_70px_rgba(212,175,55,0.10)]">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-heading text-lg font-bold text-brand-950">
                        {item.question}
                        <ChevronDown className="h-5 w-5 shrink-0 text-gold-600 transition-transform group-open:rotate-180" aria-hidden="true" />
                    </summary>
                    <p className="mt-4 font-light leading-relaxed text-slate-600">{item.answer}</p>
                </details>
            ))}
        </div>
    );
}
