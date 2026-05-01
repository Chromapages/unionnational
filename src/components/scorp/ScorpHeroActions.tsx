"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface ScorpHeroActionsProps {
    estimatorId: string;
}

export const ScorpHeroActions = ({ estimatorId }: ScorpHeroActionsProps) => {
    const scrollToEstimator = () => {
        const element = document.getElementById(estimatorId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-5"
        >
            <button
                id="hero-estimator-btn"
                onClick={scrollToEstimator}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold-500 hover:bg-gold-600 text-brand-900 font-bold rounded-xl shadow-lg shadow-gold-500/20 transition-all group"
            >
                See If You Qualify
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <Link
                id="hero-strategy-call-btn"
                href="/book"
                className="inline-flex items-center justify-center px-8 py-4 border border-white/20 text-white font-bold rounded-xl hover:bg-white/10 transition-all"
            >
                Strategy Call
            </Link>
        </motion.div>
    );
};
