// src/components/SCorp/SavingsResultCard.tsx
import { BeforeAfterTable } from "@/components/scorp/BeforeAfterTable";
import { formatCurrency } from "@/lib/scorp-advantage/calculator";

interface SavingsResultCardProps {
    firstName: string;
    estimatedSavings: number;
    netProfit: number;
    salary: number;
    distributions: number;
}

export function SavingsResultCard({ firstName, estimatedSavings, netProfit, salary, distributions }: SavingsResultCardProps) {
    const projection = [1, 2, 3, 4, 5].map((year) => ({
        year,
        value: estimatedSavings * year,
    }));

    return (
        <section className="rounded-2xl border border-gray-100 bg-white p-8 shadow-md">
            <p className="text-sm font-bold uppercase tracking-widest text-indigo-600">Personalized Estimate</p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 md:text-5xl">
                {firstName ? `${firstName}, proper S-Corp structure` : "Proper S-Corp structure"} could create real cash-flow discipline.
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-gray-600">
                Based on your profile, proper S-Corp structure could save you approximately{" "}
                <strong className="font-bold text-gray-900">{formatCurrency(estimatedSavings)}</strong> per year in self-employment taxes.
            </p>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl bg-zinc-950 p-6 text-white">
                    <p className="text-xs font-bold uppercase tracking-widest text-indigo-200">Annual Estimate</p>
                    <p className="mt-3 text-4xl font-bold">{formatCurrency(estimatedSavings)}</p>
                </div>
                <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6">
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Suggested Salary</p>
                    <p className="mt-3 text-3xl font-bold text-gray-900">{formatCurrency(salary)}</p>
                </div>
                <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6">
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Distributions</p>
                    <p className="mt-3 text-3xl font-bold text-gray-900">{formatCurrency(distributions)}</p>
                </div>
            </div>

            <div className="mt-10">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Five-year view</h2>
                <div className="mt-5 grid gap-3 sm:grid-cols-5">
                    {projection.map((item) => (
                        <div key={item.year} className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
                            <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Year {item.year}</p>
                            <p className="mt-2 text-lg font-bold text-gray-900">{formatCurrency(item.value)}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-10">
                <BeforeAfterTable netProfit={netProfit} salary={salary} distributions={distributions} savings={estimatedSavings} />
            </div>
        </section>
    );
}
