// src/app/scorp-estimator/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { Calculator, ShieldCheck } from "lucide-react";
import { EstimatorPageClient } from "@/components/scorp/EstimatorPageClient";

export const metadata: Metadata = {
    title: "S-Corp Savings Estimator | Union National Tax",
    description: "Find out how much you could save with proper S-Corp structure. Get your personalized estimate in under 10 minutes.",
};

export default function SCorpEstimatorPage() {
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
                    <div className="mb-10 max-w-3xl">
                        <div className="inline-flex items-center gap-2 rounded-lg border border-indigo-100 bg-white px-3 py-2 text-sm font-semibold text-indigo-600 shadow-sm">
                            <Calculator className="h-4 w-4" aria-hidden="true" />
                            S-Corp Savings Estimator
                        </div>
                        <h1 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 md:text-6xl">
                            See If Your Structure Is Costing You Money
                        </h1>
                        <p className="mt-6 max-w-2xl text-xl leading-relaxed text-gray-600">
                            Answer a few business-owner focused questions and get a directional estimate of what proper S-Corp structure could mean for your cash flow.
                        </p>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
                        <EstimatorPageClient />
                        <aside className="h-fit rounded-2xl border border-gray-100 bg-white p-6 shadow-md">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-600 text-white">
                                <ShieldCheck className="h-6 w-6" aria-hidden="true" />
                            </div>
                            <h2 className="mt-5 text-xl font-bold tracking-tight text-gray-900">Built for planning, not guesswork.</h2>
                            <p className="mt-3 text-gray-600 leading-relaxed">
                                Your result is a starting point. A formal evaluation reviews reasonable compensation, payroll readiness, entity structure, and implementation steps.
                            </p>
                        </aside>
                    </div>
                </div>
            </section>
        </main>
    );
}
