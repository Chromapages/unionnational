"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ClipboardCheck, Check, Mail, ArrowRight, Send, Download, Building2, Truck, Wrench, Home, Plane, Coffee } from "lucide-react";

interface DeductionItem {
    id: number;
    category: string;
    items: { id: number; label: string; score: number }[];
}

const DEDUCTIONS: DeductionItem[] = [
    {
        id: 1,
        category: "Equipment & Tools",
        items: [
            { id: 1, label: "Power tools & hand tools", score: 1 },
            { id: 2, label: "Heavy equipment (excavators, etc.)", score: 2 },
            { id: 3, label: "Small equipment (saw, drill, etc.)", score: 1 },
            { id: 4, label: "Tool storage (shed, trailer)", score: 1 },
        ],
    },
    {
        id: 2,
        category: "Vehicles & Transportation",
        items: [
            { id: 5, label: "Pickup truck / work vehicle", score: 2 },
            { id: 6, label: "Vehicle mileage tracking", score: 2 },
            { id: 7, label: "Fuel costs", score: 1 },
            { id: 8, label: "Parking & tolls", score: 1 },
        ],
    },
    {
        id: 3,
        category: "Job Site Expenses",
        items: [
            { id: 9, label: "Materials & supplies", score: 2 },
            { id: 10, label: "Subcontractor payments", score: 2 },
            { id: 11, label: "Job site utilities", score: 1 },
            { id: 12, label: "Temporary facilities", score: 1 },
        ],
    },
    {
        id: 4,
        category: "Home Office",
        items: [
            { id: 13, label: "Home office deduction", score: 2 },
            { id: 14, label: "Utilities proportion", score: 1 },
            { id: 15, label: "Internet (business %)", score: 1 },
        ],
    },
    {
        id: 5,
        category: "Insurance & Licensing",
        items: [
            { id: 16, label: "General liability insurance", score: 2 },
            { id: 17, label: "Workers comp insurance", score: 2 },
            { id: 18, label: "Business licenses & permits", score: 1 },
            { id: 19, label: "Bonding & bonding insurance", score: 1 },
        ],
    },
    {
        id: 6,
        category: "Professional Services",
        items: [
            { id: 20, label: "Accounting & bookkeeping", score: 2 },
            { id: 21, label: "Legal fees (business matters)", score: 1 },
            { id: 22, label: "Tax preparation", score: 1 },
        ],
    },
    {
        id: 7,
        category: "Education & Training",
        items: [
            { id: 23, label: "Certifications & licenses", score: 1 },
            { id: 24, label: "Trade show attendance", score: 1 },
            { id: 25, label: "Safety training courses", score: 1 },
        ],
    },
    {
        id: 8,
        category: "Marketing & Business",
        items: [
            { id: 26, label: "Website & online presence", score: 1 },
            { id: 27, label: "Business cards & marketing materials", score: 1 },
            { id: 28, label: "Advertising (Google, Facebook, etc.)", score: 1 },
            { id: 29, label: "Client entertainment/meals", score: 1 },
        ],
    },
];

export function ConstructionTaxChecklist() {
    const [selectedDeductions, setSelectedDeductions] = useState<number[]>([]);
    const [currentCategory, setCurrentCategory] = useState(0);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    const totalItems = DEDUCTIONS.reduce((sum, cat) => sum + cat.items.length, 0);
    const selectedCount = selectedDeductions.length;
    const percentage = Math.round((selectedCount / totalItems) * 100);

    const handleToggle = (itemId: number) => {
        if (selectedDeductions.includes(itemId)) {
            setSelectedDeductions(selectedDeductions.filter(id => id !== itemId));
        } else {
            setSelectedDeductions([...selectedDeductions, itemId]);
        }
    };

    const handleCategoryNext = () => {
        if (currentCategory < DEDUCTIONS.length - 1) {
            setCurrentCategory(currentCategory + 1);
        }
    };

    const handleCategoryPrev = () => {
        if (currentCategory > 0) {
            setCurrentCategory(currentCategory - 1);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        console.log("Submitting construction checklist:", { name, email, selectedDeductions });
        
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setIsComplete(true);
    };

    const getPotentialSavings = () => {
        // Rough estimate: each deduction is worth $500-$5000 on average
        const low = selectedCount * 500;
        const high = selectedCount * 2500;
        return `$${low.toLocaleString()} - $${high.toLocaleString()}`;
    };

    const currentCat = DEDUCTIONS[currentCategory];

    if (isComplete) {
        return (
            <section className="w-full bg-brand-900 py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto rounded-3xl">
                <div className="text-center">
                    <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                        <Check className="w-10 h-10 text-green-600" />
                    </div>
                    <h2 className="text-3xl font-black text-white mb-2">Checklist Complete!</h2>
                    <p className="text-slate-300 mb-8">
                        Your personalized deduction report has been sent to <strong>{email}</strong>
                    </p>

                    <div className="bg-brand-800/50 rounded-2xl p-8 border border-brand-700 max-w-md mx-auto mb-8">
                        <h3 className="text-white font-bold mb-4">Your Results:</h3>
                        <div className="grid grid-cols-2 gap-4 text-center">
                            <div className="bg-brand-900/50 rounded-xl p-4">
                                <div className="text-3xl font-black text-gold-400">{selectedCount}</div>
                                <div className="text-slate-400 text-sm">Deductions Found</div>
                            </div>
                            <div className="bg-brand-900/50 rounded-xl p-4">
                                <div className="text-3xl font-black text-green-400">{percentage}%</div>
                                <div className="text-slate-400 text-sm">Coverage</div>
                            </div>
                        </div>
                        <div className="mt-4 p-4 bg-green-500/20 rounded-xl border border-green-500/30">
                            <div className="text-green-400 font-bold">Potential Savings</div>
                            <div className="text-2xl font-black text-white">{getPotentialSavings()}</div>
                        </div>
                    </div>

                    <a href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-gold-500 hover:bg-gold-600 text-brand-900 font-bold rounded-xl transition-all">
                        Optimize My Deductions <ArrowRight className="w-5 h-5" />
                    </a>
                </div>
            </section>
        );
    }

    return (
        <section className="w-full bg-white py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto rounded-3xl">
            {/* Progress */}
            <div className="mb-8">
                <div className="flex justify-between text-sm font-medium text-slate-500 mb-2">
                    <span>Category {currentCategory + 1} of {DEDUCTIONS.length}</span>
                    <span>{selectedCount} deductions selected</span>
                </div>
                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <motion.div 
                        className="h-full bg-gold-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                    />
                </div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentCategory}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-brand-100 flex items-center justify-center">
                            <Building2 className="w-6 h-6 text-brand-600" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-brand-900">{currentCat.category}</h2>
                            <p className="text-slate-500 text-sm">Check all that apply to your business</p>
                        </div>
                    </div>

                    <div className="space-y-2 mb-8">
                        {currentCat.items.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => handleToggle(item.id)}
                                className={`w-full p-4 rounded-xl border-2 text-left font-medium transition-all flex items-center gap-3 ${
                                    selectedDeductions.includes(item.id)
                                        ? "border-gold-500 bg-gold-50 text-brand-900"
                                        : "border-slate-200 hover:border-slate-300 text-slate-700"
                                }`}
                            >
                                <div className={`w-6 h-6 rounded-md flex items-center justify-center ${
                                    selectedDeductions.includes(item.id)
                                        ? "bg-gold-500 text-white"
                                        : "border-2 border-slate-300"
                                }`}>
                                    {selectedDeductions.includes(item.id) && <Check className="w-4 h-4" />}
                                </div>
                                {item.label}
                            </button>
                        ))}
                    </div>

                    <div className="flex justify-between">
                        <button
                            onClick={handleCategoryPrev}
                            disabled={currentCategory === 0}
                            className="flex items-center gap-2 px-6 py-3 text-slate-500 font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:text-slate-700"
                        >
                            Previous
                        </button>

                        {currentCategory === DEDUCTIONS.length - 1 ? (
                            <button
                                onClick={() => {
                                    const modal = document.getElementById('construction-email-modal');
                                    if (modal) modal.classList.remove('hidden');
                                }}
                                disabled={selectedCount === 0}
                                className="flex items-center gap-2 px-8 py-3 bg-gold-500 hover:bg-gold-600 text-brand-900 font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Get My Report <Send className="w-4 h-4" />
                            </button>
                        ) : (
                            <button
                                onClick={handleCategoryNext}
                                className="flex items-center gap-2 px-8 py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl transition-all"
                            >
                                Next Category <ArrowRight className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Email Capture */}
            {currentCategory === DEDUCTIONS.length - 1 && (
                <div id="construction-email-modal" className="hidden mt-8 bg-brand-900 rounded-3xl p-8">
                    <h3 className="text-2xl font-bold text-white mb-2">Get Your Deduction Report</h3>
                    <p className="text-slate-300 mb-6">Enter your email to receive your complete checklist with potential savings estimate.</p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-slate-300 mb-2">First Name</label>
                            <input
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-brand-700 bg-brand-800 text-white placeholder-slate-500 focus:border-gold-500 focus:ring-4 focus:ring-gold-500/10 outline-none"
                                placeholder="John"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-300 mb-2">Business Email</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-brand-700 bg-brand-800 text-white placeholder-slate-500 focus:border-gold-500 focus:ring-4 focus:ring-gold-500/10 outline-none"
                                placeholder="john@construction.com"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-4 bg-gold-500 hover:bg-gold-600 text-brand-900 font-bold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {isSubmitting ? "Sending..." : <>Get My Report <Download className="w-4 h-4" /></>}
                        </button>
                    </form>
                </div>
            )}
        </section>
    );
}
