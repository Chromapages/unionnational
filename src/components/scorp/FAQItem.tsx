/**
 * FAQItem - Expandable FAQ accordion component.
 * Extracted from SCorpAdvantageClient for reusability.
 */
import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQItemProps {
    q: string;
    a: string;
}

/**
 * Single FAQ item with expand/collapse animation.
 */
export function FAQItem({ q, a }: FAQItemProps) {
    const [open, setOpen] = useState(false);

    return (
        <div className="border-b border-slate-100 last:border-b-0">
            <button
                onClick={() => setOpen(o => !o)}
                className="w-full flex justify-between items-center gap-4 py-6 text-left group"
                aria-expanded={open}
            >
                <span className="font-bold text-brand-900 font-heading text-lg leading-snug group-hover:text-gold-600 transition-colors">
                    {q}
                </span>
                <span className="shrink-0 w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 group-hover:border-gold-500 group-hover:text-gold-500 transition-all">
                    {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </span>
            </button>
            {open && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="pb-6 text-slate-600 leading-relaxed font-body text-base"
                >
                    {a}
                </motion.div>
            )}
        </div>
    );
}