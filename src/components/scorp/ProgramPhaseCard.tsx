// src/components/SCorp/ProgramPhaseCard.tsx
import { CheckCircle2, FileText } from "lucide-react";

interface ProgramPhaseCardProps {
    phase: number;
    title: string;
    bullets: string[];
    deliverable: string;
}

export function ProgramPhaseCard({ phase, title, bullets, deliverable }: ProgramPhaseCardProps) {
    return (
        <article className="group relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-[0_18px_60px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/30 hover:shadow-[0_24px_80px_rgba(212,175,55,0.12)]">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-gold-500 via-gold-400 to-transparent opacity-80" />
            <div className="mb-6 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-gold-500/15 bg-gold-500/10 text-lg font-black text-gold-700 transition group-hover:scale-105 group-hover:bg-gold-500 group-hover:text-brand-950">
                    {phase}
                </div>
                <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gold-600">Phase {phase}</p>
                    <h3 className="font-heading text-2xl font-bold tracking-tight text-brand-950">{title}</h3>
                </div>
            </div>
            <ul className="space-y-3">
                {bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3 font-light text-slate-600">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" aria-hidden="true" />
                        <span>{bullet}</span>
                    </li>
                ))}
            </ul>
            <div className="mt-8 flex items-start gap-3 rounded-2xl border border-gold-500/20 bg-gold-500/[0.08] p-4 text-brand-950">
                <FileText className="mt-0.5 h-5 w-5 shrink-0 text-gold-700" aria-hidden="true" />
                <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gold-700">Deliverable</p>
                    <p className="mt-1 font-semibold">{deliverable}</p>
                </div>
            </div>
        </article>
    );
}
