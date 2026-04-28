// src/app/scorp-estimator/results/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { EstimatorResultsClient } from "@/components/scorp/EstimatorResultsClient";

export const metadata: Metadata = {
    title: "Your S-Corp Savings Estimate | Union National Tax",
    description: "Review your personalized S-Corp savings estimate and the next steps for an advisory-led evaluation.",
};

export default function SCorpEstimatorResultsPage() {
    return (
        <main id="main-content" className="min-h-screen bg-gray-50 text-gray-900">
            <header className="border-b border-gray-100 bg-white">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
                    <Link href="/scorp-advantage" className="text-sm font-bold tracking-tight text-gray-900">
                        Union National Tax
                    </Link>
                    <Link href="/book" className="rounded-lg border border-indigo-600 px-4 py-2 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-50">
                        Book Evaluation
                    </Link>
                </div>
            </header>
            <section className="px-6 py-16">
                <div className="mx-auto max-w-6xl">
                    <Suspense fallback={<div className="rounded-2xl bg-white p-8 shadow-md">Loading your estimate...</div>}>
                        <EstimatorResultsClient />
                    </Suspense>
                </div>
            </section>
        </main>
    );
}
