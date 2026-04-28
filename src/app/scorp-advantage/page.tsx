// src/app/scorp-advantage/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
    ArrowRight,
    BadgeDollarSign,
    BarChart3,
    Building2,
    Calculator,
    CalendarCheck,
    CheckCircle2,
    ClipboardCheck,
    FileText,
    Landmark,
    LineChart,
    ReceiptText,
    ShieldCheck,
    TrendingUp,
    WalletCards,
} from "lucide-react";
import { AuthorityBadge } from "@/components/scorp/AuthorityBadge";
import { BeforeAfterTable } from "@/components/scorp/BeforeAfterTable";
import { ObjectionAccordion } from "@/components/scorp/ObjectionAccordion";
import { PricingTierCard } from "@/components/scorp/PricingTierCard";
import { ProgramPhaseCard } from "@/components/scorp/ProgramPhaseCard";

export const metadata: Metadata = {
    title: "S-Corp Advantage Program | Union National Tax",
    description: "A structured 3-phase S-Corp evaluation and implementation program for profitable business owners. Entity Evaluation, Compensation Design, and Tax Savings Report.",
};

const painBlocks = [
    {
        icon: Building2,
        title: "Your entity structure may be wrong",
        text: "Most LLCs and sole proprietors overpay because they haven't elected S-Corp status or structured compensation correctly.",
    },
    {
        icon: CalendarCheck,
        title: "Tax planning happens after the damage is done",
        text: "If your advisor only calls at tax season, you're already behind. Strategy must happen throughout the year.",
    },
    {
        icon: BadgeDollarSign,
        title: "You're paying SE tax on money you don't have to",
        text: "Self-employment tax is 15.3%. S-Corp distributions aren't subject to it. The difference can be $10,000-$30,000 per year.",
    },
];

const phases = [
    {
        phase: 1,
        title: "Entity Evaluation",
        bullets: [
            "Qualification checklist review",
            "Current entity audit (sole prop, LLC, C-Corp)",
            "Estimated tax savings projection",
            "Structure risk assessment",
        ],
        deliverable: "Entity Evaluation Report",
    },
    {
        phase: 2,
        title: "Compensation Design",
        bullets: [
            "Reasonable compensation analysis (IRS 9-factor test)",
            "Salary / distribution split model",
            "Accountable plan design (home office, vehicle, phone)",
            "Retirement contribution strategy overlay (Solo 401k / SEP IRA)",
            "Health insurance integration guidance",
        ],
        deliverable: "Compensation Design Blueprint",
    },
    {
        phase: 3,
        title: "Tax Savings Report",
        bullets: [
            "Annual tax savings summary (current vs. S-Corp structure)",
            "5-year savings projection",
            "Implementation roadmap (step-by-step)",
            "Compliance calendar (monthly / quarterly / annual tasks)",
            "Audit-defense summary",
        ],
        deliverable: "Tax Savings Report PDF (8-12 pages, branded)",
    },
];

const pricingTiers = [
    {
        tier: "S-Corp Advantage Evaluation",
        includes: "Phase 1 only - Qualification + Savings Projection",
        price: "Starting at $497",
    },
    {
        tier: "S-Corp Advantage Program",
        includes: "All 3 Phases - Full evaluation, compensation design, and Tax Savings Report",
        price: "Starting at $1,500",
        isHighlighted: true,
    },
    {
        tier: "S-Corp Advantage + Implementation",
        includes: "Full Program + Entity Formation, Form 2553 Filing, Payroll Setup",
        price: "Starting at $2,500",
    },
    {
        tier: "S-Corp Advantage + Annual Advisory",
        includes: "Full Program + Year-Round Tax Planning Retainer (quarterly reviews)",
        price: "Starting at $3,500/yr",
    },
];

const objections = [
    {
        question: "I already have a CPA.",
        answer: "Many business owners do. What they often don't have is proactive planning, year-round visibility, and the specific S-Corp advisory that requires an EA-level credential and specialization.",
    },
    {
        question: "I'm not sure I'm big enough for this.",
        answer: "That's exactly why the evaluation matters. The right answer depends on your net profit, compensation goals, and entity structure - not just revenue size.",
    },
    {
        question: "I don't want to trigger an audit.",
        answer: "The S-Corp Advantage Program is built around IRS compliance - reasonable compensation documentation, proper payroll setup, and audit-defense readiness are core deliverables, not afterthoughts.",
    },
    {
        question: "Is an S-Corp really worth it?",
        answer: "For a business netting $80,000+, the savings routinely exceed the cost of the program in year one. The evaluation will tell you exactly where you stand - no guesswork.",
    },
];

const heroMetrics = [
    { label: "Example annual savings", value: "$17,595", icon: TrendingUp },
    { label: "Five-year projection", value: "$87,975", icon: LineChart },
    { label: "SE tax rate reviewed", value: "15.3%", icon: Calculator },
];

const proofStats = [
    { label: "Program phases", value: "3" },
    { label: "Written deliverables", value: "8-12 pages" },
    { label: "Owner focus", value: "$80K+" },
    { label: "Decision window", value: "10 min" },
];

const operatingChecks = [
    "Entity eligibility and election timing",
    "Reasonable compensation model",
    "Distribution and payroll tax exposure",
    "Quarterly compliance rhythm",
];

export default function SCorpAdvantagePage() {
    return (
        <main id="main-content" className="bg-slate-50 text-brand-950">
            <header className="sticky top-0 z-40 border-b border-white/10 bg-brand-950/95 backdrop-blur-xl">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                    <Link href="/scorp-advantage" className="flex items-center gap-3" aria-label="Union National Tax S-Corp Advantage">
                        <Image src="/images/logo.png" alt="Union National Tax" width={172} height={48} className="h-10 w-auto brightness-0 invert" priority />
                    </Link>
                    <nav aria-label="S-Corp navigation" className="flex items-center gap-3">
                        <Link href="/scorp-estimator" className="hidden rounded-xl border border-white/15 px-4 py-2 text-sm font-bold text-white transition hover:border-gold-500/40 hover:bg-white/10 sm:inline-flex">
                            Free Estimate
                        </Link>
                        <Link href="/book" className="rounded-xl bg-gold-500 px-4 py-2 text-sm font-black text-brand-950 shadow-glow-gold transition hover:bg-gold-400">
                            Book Evaluation
                        </Link>
                    </nav>
                </div>
            </header>

            <section className="relative overflow-hidden bg-brand-950 px-4 pt-20 text-white sm:px-6 lg:px-8">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(212,175,55,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.055)_1px,transparent_1px)] bg-[size:56px_56px] opacity-45" />
                <div className="absolute left-1/2 top-0 h-[620px] w-[620px] -translate-x-1/2 rounded-full bg-gold-500/10 blur-[120px]" />
                <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-slate-50 to-transparent" />

                <div className="relative mx-auto grid max-w-7xl gap-12 pb-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
                    <div className="max-w-4xl">
                        <div className="mb-7 flex items-center gap-3">
                            <span className="h-px w-8 bg-gold-500/70" />
                            <p className="font-heading text-xs font-bold uppercase tracking-[0.25em] text-gold-400">
                                S-Corp Advantage Program
                            </p>
                        </div>
                        <h1 className="font-heading text-5xl font-bold leading-[1.02] tracking-tighter drop-shadow-2xl md:text-7xl">
                            Your Business May Be Overpaying the IRS
                            <span className="block italic text-gold-500">Find Out in 10 Minutes</span>
                        </h1>
                        <p className="mt-8 max-w-3xl text-lg font-light leading-relaxed text-slate-300 md:text-xl">
                            The S-Corp Advantage Program is a structured 3-phase evaluation and implementation process that helps profitable business owners reduce self-employment taxes, design their compensation correctly, and receive a written Tax Savings Report.
                        </p>
                        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                            <Link href="/scorp-estimator" className="group inline-flex min-h-[60px] items-center justify-center gap-3 rounded-xl bg-gold-500 px-8 py-4 text-base font-black text-brand-950 shadow-xl shadow-gold-500/20 transition hover:bg-gold-400 hover:shadow-gold-500/30">
                                Get Your Free S-Corp Savings Estimate
                                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                            </Link>
                            <Link href="/book" className="group inline-flex min-h-[60px] items-center justify-center gap-3 rounded-xl border border-white/15 bg-white/5 px-8 py-4 text-base font-bold text-white backdrop-blur-sm transition hover:border-gold-500/40 hover:bg-white/10">
                                Book your evaluation directly
                                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                            </Link>
                        </div>
                    </div>

                    <aside className="relative rounded-[2rem] border border-white/10 bg-white/[0.05] p-1 shadow-premium backdrop-blur-xl">
                        <div className="rounded-[1.8rem] bg-white p-6 text-brand-950 shadow-2xl">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-950 text-gold-500">
                                        <ReceiptText className="h-5 w-5" aria-hidden="true" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-[0.22em] text-gold-700">Tax Savings Report</p>
                                        <h2 className="font-heading text-xl font-bold tracking-tight">Owner Structure Snapshot</h2>
                                    </div>
                                </div>
                                <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-emerald-700">
                                    Review Ready
                                </span>
                            </div>

                            <div className="mt-6 grid gap-3">
                                {heroMetrics.map((metric) => {
                                    const Icon = metric.icon;

                                    return (
                                        <div key={metric.label} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                            <div>
                                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">{metric.label}</p>
                                                <p className="mt-1 font-heading text-3xl font-bold tracking-tight text-brand-950">{metric.value}</p>
                                            </div>
                                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-gold-500/15 bg-gold-500/10 text-gold-700">
                                                <Icon className="h-5 w-5" aria-hidden="true" />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="mt-5 rounded-2xl border border-brand-900/10 bg-brand-950 p-5 text-white">
                                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.22em] text-gold-400">
                                    <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                                    Advisory checkpoints
                                </div>
                                <div className="mt-4 grid gap-3">
                                    {operatingChecks.map((check) => (
                                        <div key={check} className="flex items-start gap-3 text-sm leading-relaxed text-slate-300">
                                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" aria-hidden="true" />
                                            <span>{check}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </section>

            <section className="relative -mt-8 px-4 sm:px-6 lg:px-8">
                <div className="mx-auto grid max-w-7xl gap-3 rounded-[2rem] border border-slate-200 bg-white p-4 shadow-[0_22px_70px_rgba(15,23,42,0.08)] sm:grid-cols-2 lg:grid-cols-4">
                    {proofStats.map((stat) => (
                        <div key={stat.label} className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                            <p className="font-heading text-3xl font-bold tracking-tight text-brand-950">{stat.value}</p>
                            <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="px-4 py-24 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-12 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
                        <div>
                            <p className="font-heading text-xs font-bold uppercase tracking-[0.22em] text-gold-700">Where overpayment starts</p>
                            <h2 className="mt-4 font-heading text-4xl font-bold leading-[1.05] tracking-tight text-brand-950 md:text-6xl">
                                Your structure should support cash flow, not quietly drain it.
                            </h2>
                        </div>
                        <p className="max-w-2xl text-lg font-light leading-relaxed text-slate-600 lg:ml-auto">
                            S-Corp strategy is not just an election. It is a compensation, payroll, cash-flow, and compliance system that needs a written operating plan.
                        </p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-3">
                        {painBlocks.map((block) => {
                            const Icon = block.icon;

                            return (
                                <article key={block.title} className="group rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-[0_18px_60px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/30 hover:shadow-[0_24px_80px_rgba(212,175,55,0.12)]">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-gold-500/15 bg-gold-500/10 text-gold-700 transition-transform duration-300 group-hover:scale-105 group-hover:bg-gold-500 group-hover:text-brand-950">
                                        <Icon className="h-6 w-6" aria-hidden="true" />
                                    </div>
                                    <h3 className="mt-7 font-heading text-2xl font-bold tracking-tight text-brand-950">{block.title}</h3>
                                    <p className="mt-4 font-light leading-relaxed text-slate-600">{block.text}</p>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="relative overflow-hidden bg-white px-4 py-24 sm:px-6 lg:px-8">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />
                <div className="mx-auto max-w-7xl">
                    <div className="max-w-3xl">
                        <p className="font-heading text-xs font-bold uppercase tracking-[0.22em] text-gold-700">The 3-Phase Program</p>
                        <h2 className="mt-4 font-heading text-4xl font-bold leading-[1.05] tracking-tight text-brand-950 md:text-6xl">
                            A structured path from entity review to implementation clarity.
                        </h2>
                        <p className="mt-6 text-xl font-light leading-relaxed text-slate-600">
                            The program gives you a documented view of savings, compensation, compliance rhythm, and the steps required to operate with stronger financial discipline.
                        </p>
                    </div>
                    <div className="mt-12 grid gap-6 lg:grid-cols-3">
                        {phases.map((phase) => (
                            <ProgramPhaseCard key={phase.phase} {...phase} />
                        ))}
                    </div>
                </div>
            </section>

            <section className="px-4 py-24 sm:px-6 lg:px-8">
                <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
                    <div>
                        <p className="font-heading text-xs font-bold uppercase tracking-[0.22em] text-gold-700">Savings Example</p>
                        <h2 className="mt-4 font-heading text-4xl font-bold leading-[1.05] tracking-tight text-brand-950 md:text-6xl">
                            A concrete example: $17,595 kept in the business.
                        </h2>
                        <p className="mt-6 text-lg font-light leading-relaxed text-slate-600">
                            Michael owns an HVAC company. His S-Corp nets $200,000 after expenses. With a reasonable salary of $85,000 and $115,000 in distributions, he saves $17,595 in payroll taxes. Legally. Every year. Over 5 years: $87,975 kept instead of paid to the IRS.
                        </p>
                        <div className="mt-8 grid gap-3 sm:grid-cols-3">
                            {heroMetrics.map((metric) => (
                                <div key={metric.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                                    <p className="font-heading text-2xl font-bold text-brand-950">{metric.value}</p>
                                    <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">{metric.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <BeforeAfterTable netProfit={200000} salary={85000} distributions={115000} savings={17595} />
                </div>
            </section>

            <section className="relative overflow-hidden bg-brand-950 px-4 py-24 text-white sm:px-6 lg:px-8">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(212,175,55,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.05)_1px,transparent_1px)] bg-[size:56px_56px] opacity-35" />
                <div className="relative mx-auto max-w-7xl">
                    <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
                        <div>
                            <p className="font-heading text-xs font-bold uppercase tracking-[0.22em] text-gold-400">Program Options</p>
                            <h2 className="mt-4 font-heading text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
                                Choose the level of guidance your structure requires.
                            </h2>
                        </div>
                        <p className="max-w-2xl text-lg font-light leading-relaxed text-slate-300 lg:ml-auto">
                            Start with the evaluation when you need clarity. Add implementation or annual advisory when your entity, payroll, and planning cadence need hands-on guidance.
                        </p>
                    </div>
                    <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                        {pricingTiers.map((tier) => (
                            <PricingTierCard key={tier.tier} {...tier} />
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-white px-4 py-24 sm:px-6 lg:px-8">
                <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_420px] lg:items-center">
                    <div>
                        <p className="font-heading text-xs font-bold uppercase tracking-[0.22em] text-gold-700">Advisor-Led Strategy</p>
                        <h2 className="mt-4 font-heading text-4xl font-bold leading-[1.05] tracking-tight text-brand-950 md:text-6xl">Jason Astwood, EA</h2>
                        <p className="mt-6 max-w-3xl text-lg font-light leading-relaxed text-slate-600">
                            Jason Astwood helps profitable business owners connect tax structure to cash flow, compensation, and long-term wealth. His advisory process is built for owners who want clarity, control, and smarter decisions before tax season arrives.
                        </p>
                        <div className="mt-8">
                            <AuthorityBadge />
                        </div>
                        <div className="mt-10 grid gap-4 sm:grid-cols-3">
                            {[
                                { icon: Landmark, label: "IRS credentialed guidance" },
                                { icon: WalletCards, label: "Compensation and cash-flow lens" },
                                { icon: BarChart3, label: "Planning before filing season" },
                            ].map((item) => {
                                const Icon = item.icon;

                                return (
                                    <div key={item.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                                        <Icon className="h-5 w-5 text-gold-700" aria-hidden="true" />
                                        <p className="mt-3 text-sm font-semibold leading-relaxed text-brand-950">{item.label}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 shadow-[0_22px_70px_rgba(15,23,42,0.08)]">
                        <div role="img" aria-label="The S-Corp Playbook book cover" className="mx-auto flex aspect-[3/4] max-w-xs flex-col justify-between rounded-2xl bg-brand-950 p-8 text-white shadow-premium">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-gold-400">Union National Tax</p>
                                <h3 className="mt-8 font-heading text-4xl font-bold tracking-tight">The S-Corp Playbook</h3>
                            </div>
                            <p className="text-sm leading-relaxed text-slate-300">Strategy, compliance, and wealth building for small business owners.</p>
                        </div>
                        <p className="mt-6 text-center text-sm leading-relaxed text-slate-600">
                            Written by your advisor - a published guide to S-Corp strategy, compliance, and wealth building for small business owners.
                        </p>
                    </div>
                </div>
            </section>

            <section className="px-4 py-24 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-4xl">
                    <p className="font-heading text-xs font-bold uppercase tracking-[0.22em] text-gold-700">Common Questions</p>
                    <h2 className="mt-4 font-heading text-4xl font-bold leading-[1.05] tracking-tight text-brand-950 md:text-6xl">
                        Good structure should create clarity, not confusion.
                    </h2>
                    <div className="mt-10">
                        <ObjectionAccordion items={objections} />
                    </div>
                </div>
            </section>

            <section className="bg-white px-4 py-24 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-brand-950 px-6 py-20 text-center text-white shadow-premium sm:rounded-[2.5rem]">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-500 text-brand-950">
                        <ClipboardCheck className="h-7 w-7" aria-hidden="true" />
                    </div>
                    <h2 className="mx-auto mt-8 max-w-4xl font-heading text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
                        Stop Overpaying. Start Keeping More.
                    </h2>
                    <p className="mx-auto mt-6 max-w-3xl text-xl font-light leading-relaxed text-slate-300">
                        Get your personalized S-Corp savings estimate in 10 minutes - or book your evaluation directly with Jason.
                    </p>
                    <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                        <Link href="/scorp-estimator" className="inline-flex min-h-[60px] items-center justify-center gap-3 rounded-xl bg-gold-500 px-8 py-4 text-base font-black text-brand-950 shadow-xl shadow-gold-500/20 transition hover:bg-gold-400">
                            Get My Free Savings Estimate
                            <TrendingUp className="h-5 w-5" aria-hidden="true" />
                        </Link>
                        <Link href="/book" className="inline-flex min-h-[60px] items-center justify-center gap-3 rounded-xl border border-white/15 bg-white/5 px-8 py-4 text-base font-bold text-white transition hover:bg-white/10">
                            Book My Evaluation
                            <FileText className="h-5 w-5" aria-hidden="true" />
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
