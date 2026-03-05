"use client";

import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ComparisonPoint {
    feature: string;
    diy: boolean;
    bigFirm: boolean;
    unionNational: boolean;
}

interface ComparisonTableProps {
    points: ComparisonPoint[];
}

export function ComparisonTable({ points }: ComparisonTableProps) {
    if (!points || points.length === 0) return null;

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                    <tr>
                        <th className="p-4 border-b border-zinc-200 text-sm font-medium text-zinc-500 w-1/3">Feature</th>
                        <th className="p-4 border-b border-zinc-200 text-sm font-bold text-zinc-400 text-center w-1/6">DIY / Software</th>
                        <th className="p-4 border-b border-zinc-200 text-sm font-bold text-zinc-400 text-center w-1/6">Big Firm</th>
                        <th className="p-4 border-b-2 border-brand-900 bg-brand-50 text-sm font-bold text-brand-900 text-center w-1/4 rounded-t-xl">
                            Union National
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {points.map((point, i) => (
                        <tr key={i} className="group hover:bg-zinc-50/50 transition-colors">
                            <td className="p-4 border-b border-zinc-100 text-sm font-medium text-zinc-700">
                                {point.feature}
                            </td>
                            <td className="p-4 border-b border-zinc-100 text-center">
                                {point.diy ? (
                                    <Check className="w-5 h-5 text-emerald-500 mx-auto" />
                                ) : (
                                    <X className="w-5 h-5 text-zinc-300 mx-auto" />
                                )}
                            </td>
                            <td className="p-4 border-b border-zinc-100 text-center">
                                {point.bigFirm ? (
                                    <Check className="w-5 h-5 text-emerald-500 mx-auto" />
                                ) : (
                                    <X className="w-5 h-5 text-zinc-300 mx-auto" />
                                )}
                            </td>
                            <td className={cn(
                                "p-4 border-b border-brand-100 bg-brand-50/50 text-center",
                                i === points.length - 1 ? "rounded-b-xl" : ""
                            )}>
                                {point.unionNational ? (
                                    <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center mx-auto shadow-sm">
                                        <Check className="w-4 h-4 text-white" />
                                    </div>
                                ) : (
                                    <X className="w-5 h-5 text-red-400 mx-auto" />
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
