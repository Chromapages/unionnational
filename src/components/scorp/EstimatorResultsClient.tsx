// src/components/SCorp/EstimatorResultsClient.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SavingsResultCard } from "@/components/scorp/SavingsResultCard";
import { formatCurrency } from "@/lib/scorp-advantage/calculator";
import { clearEstimatorResult, readEstimatorResult, type EstimatorResult } from "@/lib/scorp-advantage/result-storage";

export function EstimatorResultsClient() {
    const [result, setResult] = useState<EstimatorResult | null | undefined>(undefined);

    useEffect(() => {
        const saved = readEstimatorResult();
        setResult(saved);
        if (!saved) return;
        const expiration = window.setTimeout(() => { clearEstimatorResult(); setResult(null); }, Math.max(0, saved.expiresAt - Date.now()));
        return () => window.clearTimeout(expiration);
    }, []);

    if (result === undefined) {
        return <p role="status" className="rounded-2xl bg-white p-8 text-gray-600 shadow-md">Loading your estimate...</p>;
    }

    if (result === null) {
        return (
            <section className="rounded-2xl border border-gray-100 bg-white p-8 shadow-md">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Start your S-Corp estimate</h1>
                <p className="mt-4 leading-relaxed text-gray-600">We couldn&apos;t find a saved assessment in this browser session.</p>
                <Link href="/scorp-estimator" className="mt-6 inline-flex rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700">
                    Start the assessment
                </Link>
            </section>
        );
    }

    const isLowFit = result.estimatedSavings === 0;
    const isExistingCorporation = result.applicable === false;

    if (isExistingCorporation || isLowFit) {
        return (
            <section className="rounded-2xl border border-gray-100 bg-white p-8 shadow-md">
                <p className="text-sm font-bold uppercase tracking-widest text-indigo-600">Structure Review</p>
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 md:text-5xl">
                    {isExistingCorporation ? "Your corporation calls for a structure review." : "Review the full costs before considering an election."}
                </h1>
                <p className="mt-6 text-xl leading-relaxed text-gray-600">
                    {isExistingCorporation
                        ? "This new-election illustration does not apply to an existing S or C corporation. A review can assess your current compensation, payroll, and entity structure."
                        : "The stated assumptions show no positive employment-tax difference. This comparison does not assess compliance costs or your full tax situation. A review can examine the other factors before you make a decision."}
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                    <Link href="/book" onClick={clearEstimatorResult} className="rounded-lg bg-indigo-600 px-6 py-3 text-center font-semibold text-white hover:bg-indigo-700">
                        Book a Discovery Call
                    </Link>
                    <Link href="/scorp-advantage" className="rounded-lg border border-indigo-600 px-6 py-3 text-center font-semibold text-indigo-600 hover:bg-indigo-50">
                        Review the Program
                    </Link>
                </div>
            </section>
        );
    }

    return (
        <div className="space-y-10">
            <SavingsResultCard
                firstName=""
                estimatedSavings={result.estimatedSavings}
                netProfit={result.suggestedSalary + result.distributions}
                salary={result.suggestedSalary}
                distributions={result.distributions}
            />

            <section className="rounded-2xl border border-gray-100 bg-zinc-950 p-8 text-white shadow-md">
                <p className="text-sm font-bold uppercase tracking-widest text-indigo-200">Next Steps</p>
                <h2 className="mt-4 text-3xl font-bold tracking-tight">Turn the estimate into a documented plan.</h2>
                <p className="mt-4 max-w-2xl text-zinc-300 leading-relaxed">
                    The stated assumptions show a modeled annual employment-tax difference of {formatCurrency(result.estimatedSavings)}, before the excluded factors and costs. An evaluation reviews compensation, structure, payroll readiness, and implementation before you make a decision.
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                    <Link href="/book" onClick={clearEstimatorResult} className="rounded-lg bg-indigo-600 px-6 py-3 text-center font-semibold text-white hover:bg-indigo-700">
                        Book Your S-Corp Evaluation
                    </Link>
                    <Link href="/scorp-advantage" className="rounded-lg border border-white/20 px-6 py-3 text-center font-semibold text-white hover:bg-white/10">
                        Download The S-Corp Playbook (Free)
                    </Link>
                </div>
            </section>
        </div>
    );
}
