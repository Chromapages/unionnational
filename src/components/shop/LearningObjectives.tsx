"use client";

import { motion } from "framer-motion";


interface Objective {
    title: string;
    description: string;
}

interface LearningObjectivesProps {
    objectives?: Objective[];
}

export function LearningObjectives({ objectives: propObjectives }: LearningObjectivesProps) {
    const displayObjectives = propObjectives?.filter((objective) => objective.title && objective.description) || [];

    if (displayObjectives.length === 0) {
        return null;
    }

    return (
        <section id="what-youll-learn" className="scroll-mt-24 py-12 bg-white border-b border-slate-100">
            <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
                <h2 className="text-2xl font-bold text-brand-900 font-heading tracking-tight mb-2">
                    What You&#39;ll Learn
                </h2>
                <p className="text-sm text-slate-500 font-sans mb-8">
                    Practical strategy points pulled directly from this Union National Tax resource.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                    {displayObjectives.map((obj, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.07 }}
                            className="flex flex-col gap-1.5"
                        >
                            <div className="flex items-center gap-3">
                                <div className="h-px w-6 bg-gold-400 shrink-0" />
                                <h3 className="text-base font-bold text-brand-900 font-heading">
                                    {obj.title}
                                </h3>
                            </div>
                            <p className="text-sm text-slate-600 font-sans leading-relaxed pl-9">
                                {obj.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
