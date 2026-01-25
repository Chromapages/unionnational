"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

interface Option {
    label: string;
    value: number;
    description?: string;
}

interface QuestionCardProps {
    step: number;
    totalSteps: number;
    question: string;
    description?: string;
    options: Option[];
    selectedValue?: number;
    direction: number;
    onSelect: (value: number) => void;
    onBack: () => void;
}

const slideVariants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 50 : -50,
        opacity: 0,
        filter: "blur(8px)",
    }),
    center: {
        x: 0,
        opacity: 1,
        filter: "blur(0px)",
    },
    exit: (direction: number) => ({
        x: direction < 0 ? 50 : -50,
        opacity: 0,
        filter: "blur(8px)",
    }),
};

export function QuestionCard({
    step,
    totalSteps,
    question,
    description,
    options,
    selectedValue,
    direction,
    onSelect,
    onBack,
}: QuestionCardProps) {
    return (
        <div className="h-full w-full bg-slate-50 p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-center relative overflow-y-auto">
            <motion.div
                key={step}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ opacity: { duration: 0.2 }, x: { type: "spring", stiffness: 300, damping: 30 } }}
                className="w-full max-w-2xl mx-auto"
            >
                <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] font-bold text-slate-400">
                    <span>Question {step}</span>
                    <span className="h-3 w-px bg-slate-300"></span>
                    <span>{totalSteps} total</span>
                </div>

                <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-bold font-heading text-brand-900 leading-tight">
                    {question}
                </h2>
                {description && (
                    <p className="mt-4 text-base sm:text-lg text-slate-500 leading-relaxed">
                        {description}
                    </p>
                )}

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {options.map((option, idx) => {
                        const isSelected = option.value === selectedValue;
                        return (
                            <button
                                key={`${option.label}-${idx}`}
                                onClick={() => onSelect(option.value)}
                                className={`group relative text-left rounded-2xl border-2 px-5 py-4 min-h-[60px] transition-all duration-200 bg-white ${
                                    idx === options.length - 1 && options.length % 2 !== 0 ? "md:col-span-2" : ""
                                } ${
                                    isSelected
                                        ? "border-gold-400 shadow-[0_0_30px_rgba(251,191,36,0.35)] ring-1 ring-gold-400/60"
                                        : "border-slate-200 hover:border-gold-400 hover:shadow-xl hover:shadow-gold-400/10"
                                }`}
                            >
                                <div className="absolute right-4 top-4 h-3 w-3 rounded-full border border-slate-200 bg-white group-hover:border-gold-400">
                                    <div
                                        className={`h-full w-full rounded-full bg-gold-400 transition-transform ${
                                            isSelected ? "scale-100" : "scale-0"
                                        }`}
                                    ></div>
                                </div>
                                <span className="block text-lg font-bold text-brand-900 pr-6">
                                    {option.label}
                                </span>
                                {option.description && (
                                    <span className="mt-2 block text-sm text-slate-500">{option.description}</span>
                                )}
                            </button>
                        );
                    })}
                </div>

                <div className="mt-10 flex justify-start">
                    <button
                        onClick={onBack}
                        className={`flex items-center text-slate-400 hover:text-brand-900 transition-colors text-xs font-bold uppercase tracking-widest ${
                            step === 1 ? "invisible" : ""
                        }`}
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Previous Question
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
