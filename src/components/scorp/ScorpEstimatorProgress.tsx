"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScorpEstimatorProgressProps {
    currentStep: number;
    totalSteps: number;
    stepTitles: string[];
}

export const ScorpEstimatorProgress = ({ 
    currentStep, 
    totalSteps, 
    stepTitles 
}: ScorpEstimatorProgressProps) => {
    const progress = (currentStep / (totalSteps - 1)) * 100;

    return (
        <div className="w-full mb-8">
            <div className="flex justify-between items-end mb-4">
                <div>
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-gold-600 block mb-1">
                        Step {currentStep + 1} of {totalSteps - 1}
                    </span>
                    <h3 className="text-xl font-semibold text-brand-500 font-heading tracking-tight">
                        {stepTitles[currentStep]}
                    </h3>
                </div>
                <span className="text-sm font-medium text-slate-400 font-body">
                    {Math.round(progress)}% Complete
                </span>
            </div>
            
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: "circOut" }}
                    className="h-full bg-gold-500"
                />
            </div>
        </div>
    );
};
