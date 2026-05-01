"use client";

import { ScorpFitLevel } from "@/lib/scorp/schema";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

interface ScorpEstimatorCTAProps {
    fitLevel: ScorpFitLevel;
}

export const ScorpEstimatorCTA = ({ fitLevel }: ScorpEstimatorCTAProps) => {
    const isLowFit = fitLevel === "LOW_FIT";
    
    return (
        <>
            <Link 
                href={isLowFit ? "/book" : "/book"}
                className="w-full sm:w-auto px-6 py-4 md:px-10 md:py-6 bg-gold-500 text-brand-900 font-medium rounded-2xl hover:bg-gold-400 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-gold-500/20 text-base md:text-lg flex items-center justify-center gap-3 group"
            >
                {isLowFit ? "Book Evaluation" : "Book S-Corp Review"}
                <Calendar size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
        </>
    );
};
