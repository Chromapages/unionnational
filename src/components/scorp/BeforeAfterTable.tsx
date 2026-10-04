// src/components/SCorp/BeforeAfterTable.tsx
import { formatCurrency } from "@/lib/scorp-advantage/calculator";
import { calculateEmploymentTaxComparison } from "@/lib/scorp-advantage/employment-tax";

interface BeforeAfterTableProps {
    netProfit: number;
    salary: number;
    distributions: number;
    savings: number;
}

export function BeforeAfterTable({ netProfit, salary, distributions, savings }: BeforeAfterTableProps) {
    const { selfEmploymentTax: solePropTax, payrollTax: scorpTax } = calculateEmploymentTaxComparison(netProfit, salary);

    const rows = [
        { label: "Net Profit", without: formatCurrency(netProfit), with: formatCurrency(netProfit) },
        { label: "Illustrative W-2 Salary", without: "$0", with: formatCurrency(salary) },
        { label: "Distributions before payroll costs", without: "$0", with: formatCurrency(distributions) },
        { label: "SE / Combined Payroll Tax", without: formatCurrency(solePropTax), with: formatCurrency(scorpTax) },
        { label: "Illustrative Annual Difference", without: "$0", with: formatCurrency(savings) },
    ];

    return (
        <div className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.10)]">
            <div className="grid grid-cols-3 bg-brand-950 text-sm font-bold text-white">
                <div className="p-4 text-slate-300">Comparison</div>
                <div className="p-4 text-slate-300">Without S-Corp</div>
                <div className="p-4 text-gold-400">With S-Corp Structure</div>
            </div>
            {rows.map((row) => (
                <div key={row.label} className="grid grid-cols-3 border-t border-slate-100 text-sm">
                    <div className="p-4 font-semibold text-brand-950">{row.label}</div>
                    <div className="p-4 text-slate-600">{row.without}</div>
                    <div className="bg-gold-500/[0.06] p-4 font-semibold text-brand-950">{row.with}</div>
                </div>
            ))}
        </div>
    );
}
