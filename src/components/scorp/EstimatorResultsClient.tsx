// src/components/SCorp/EstimatorResultsClient.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SavingsResultCard } from "@/components/scorp/SavingsResultCard";
import { formatCurrency } from "@/lib/scorp-advantage/calculator";

type StoredResult = {
    firstName: string;
    businessName: string;
    estimatedNetProfit: number;
    estimatedSavings: number;
    suggestedSalary: number;
    distributions: number;
};

export function EstimatorResultsClient() {
    const [result, setResult] = useState<StoredResult | null | undefined>(undefined);

    useEffect(() => {
        try {
            const stored = sessionStorage.getItem("scorp-estimator-result");
            if (!stored) {
                setResult(null);
                return;
            }

            const parsed = JSON.parse(stored) as StoredResult;
            const values = [parsed.estimatedNetProfit, parsed.estimatedSavings, parsed.suggestedSalary, parsed.distributions];
            setResult(values.every(Number.isFinite) ? parsed : null);
        } catch {
            setResult(null);
        }
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

    if (isLowFit) {
        return (
            <section className="rounded-2xl border border-gray-100 bg-white p-8 shadow-md">
                <p className="text-sm font-bold uppercase tracking-widest text-indigo-600">Structure Review</p>
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 md:text-5xl">
                    Your current profit level may not justify a formal S-Corp election yet.
                </h1>
                <p className="mt-6 text-xl leading-relaxed text-gray-600">
                    Based on your current profit level, a formal S-Corp election may not generate enough savings to offset the added compliance costs yet. But there are other strategies we can explore. Book a free 15-minute discovery call to find out where you stand.
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                    <Link href="/book" className="rounded-lg bg-indigo-600 px-6 py-3 text-center font-semibold text-white hover:bg-indigo-700">
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
                firstName={result.firstName}
                estimatedSavings={result.estimatedSavings}
                netProfit={result.estimatedNetProfit}
                salary={result.suggestedSalary}
                distributions={result.distributions}
            />

            <section className="rounded-2xl border border-gray-100 bg-zinc-950 p-8 text-white shadow-md">
                <p className="text-sm font-bold uppercase tracking-widest text-indigo-200">Next Steps</p>
                <h2 className="mt-4 text-3xl font-bold tracking-tight">Turn the estimate into a documented plan.</h2>
                <p className="mt-4 max-w-2xl text-zinc-300 leading-relaxed">
                    Your estimate points to approximately {formatCurrency(result.estimatedSavings)} in annual self-employment tax savings. The evaluation confirms compensation, structure, payroll readiness, and the implementation path before you make a decision.
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                    <Link href="/book" className="rounded-lg bg-indigo-600 px-6 py-3 text-center font-semibold text-white hover:bg-indigo-700">
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
