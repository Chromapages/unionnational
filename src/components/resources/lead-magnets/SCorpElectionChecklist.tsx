"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ClipboardCheck, Check, Mail, ArrowRight, ArrowLeft, Send, Building, Users, DollarSign, Clock, Shield } from "lucide-react";

interface Answer {
    questionId: number;
    answer: boolean;
}

const CRITERIA = [
    {
        id: 1,
        question: "Does your business have fewer than 100 shareholders?",
        description: "S-Corps are limited to 100 or fewer shareholders.",
        icon: Users,
        required: true,
    },
    {
        id: 2,
        question: "Are all shareholders US citizens or residents?",
        description: "S-Corps cannot have non-resident alien shareholders.",
        icon: Shield,
        required: true,
    },
    {
        id: 3,
        question: "Do you have only one class of stock?",
        description: "S-Corps cannot have preferred stock or multiple classes.",
        icon: Building,
        required: true,
    },
    {
        id: 4,
        question: "Is your business an eligible entity type?",
        description: "Eligible: LLC, C-Corp, Partnership. Not eligible: Sole Prop (must elect)",
        icon: DollarSign,
        required: true,
    },
    {
        id: 5,
        question: "Do you have $80,000+ in annual business income?",
        description: "S-Corp election makes sense when income exceeds this threshold for tax savings.",
        icon: DollarSign,
        required: false,
    },
    {
        id: 6,
        question: "Do you pay yourself a reasonable salary?",
        description: "You'll need to take a reasonable salary as an employee of your S-Corp.",
        icon: Users,
        required: false,
    },
    {
        id: 7,
        question: "Can you afford the additional compliance costs?",
        description: "S-Corps have more paperwork: Form 1120-S, payroll tax filings, state requirements.",
        icon: Clock,
        required: false,
    },
];

export function SCorpElectionChecklist() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    const eligibleCount = answers.filter(a => a.answer && CRITERIA.find(c => c.id === a.questionId)?.required).length;
    const totalRequired = CRITERIA.filter(c => c.required).length;
    const isEligible = eligibleCount === totalRequired;

    const handleAnswer = (answer: boolean) => {
        const newAnswers = [...answers];
        newAnswers[currentQuestion] = {
            questionId: CRITERIA[currentQuestion].id,
            answer,
        };
        setAnswers(newAnswers);
    };

    const handleNext = () => {
        if (currentQuestion < CRITERIA.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    const handlePrev = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        console.log("Submitting S-Corp eligibility:", { name, email, answers, isEligible });
        
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setIsComplete(true);
    };

    const currentQ = CRITERIA[currentQuestion];
    const CurrentIcon = currentQ.icon;

    if (isComplete) {
        return (
            <section className="w-full bg-white py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto rounded-3xl">
                <div className="text-center">
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${isEligible ? 'bg-green-100' : 'bg-amber-100'}`}>
                        <Check className={`w-10 h-10 ${isEligible ? 'text-green-600' : 'text-amber-600'}`} />
                    </div>
                    <h2 className="text-3xl font-black text-brand-900 mb-2">
                        {isEligible ? "Great News!" : "Almost There!"}
                    </h2>
                    <p className="text-slate-600 mb-8">
                        Your eligibility assessment has been sent to <strong>{email}</strong>
                    </p>

                    <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 max-w-md mx-auto mb-8 text-left">
                        <h3 className="font-bold text-brand-900 mb-4">Your Results:</h3>
                        <div className="space-y-2">
                            {CRITERIA.map((c) => {
                                const answer = answers.find(a => a.questionId === c.id);
                                return (
                                    <div key={c.id} className="flex items-center gap-3">
                                        {answer?.answer ? (
                                            <Check className="w-5 h-5 text-green-500" />
                                        ) : (
                                            <span className="w-5 h-5 rounded-full border-2 border-red-300" />
                                        )}
                                        <span className={answer?.answer ? "text-slate-700" : "text-slate-500"}>
                                            {c.question}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {isEligible ? (
                        <a href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-all">
                            Schedule Your Consultation <ArrowRight className="w-5 h-5" />
                        </a>
                    ) : (
                        <a href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl transition-all">
                            Discuss Your Options <ArrowRight className="w-5 h-5" />
                        </a>
                    )}
                </div>
            </section>
        );
    }

    return (
        <section className="w-full bg-brand-900 py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto rounded-3xl">
            {/* Progress */}
            <div className="mb-8">
                <div className="flex justify-between text-sm font-medium text-slate-400 mb-2">
                    <span>Question {currentQuestion + 1} of {CRITERIA.length}</span>
                    <span>{Math.round(((currentQuestion + 1) / CRITERIA.length) * 100)}% complete</span>
                </div>
                <div className="h-2 bg-brand-800 rounded-full overflow-hidden">
                    <motion.div 
                        className="h-full bg-gold-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentQuestion + 1) / CRITERIA.length) * 100}%` }}
                    />
                </div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentQuestion}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-brand-800/50 backdrop-blur rounded-3xl p-8 border border-brand-700"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-gold-500/20 flex items-center justify-center">
                            <CurrentIcon className="w-6 h-6 text-gold-400" />
                        </div>
                        <span className="text-slate-400 font-medium">
                            Question {currentQuestion + 1}
                            {currentQ.required && <span className="text-red-400 ml-1">*</span>}
                        </span>
                    </div>

                    <h2 className="text-2xl font-bold text-white mb-3">{currentQ.question}</h2>
                    <p className="text-slate-300 mb-8">{currentQ.description}</p>

                    <div className="flex gap-4">
                        <button
                            onClick={() => handleAnswer(true)}
                            className={`flex-1 p-6 rounded-xl border-2 font-bold transition-all ${
                                answers[currentQuestion]?.answer === true
                                    ? "border-green-500 bg-green-500/20 text-white"
                                    : "border-brand-600 text-slate-300 hover:border-brand-500"
                            }`}
                        >
                            ✓ Yes
                        </button>
                        <button
                            onClick={() => handleAnswer(false)}
                            className={`flex-1 p-6 rounded-xl border-2 font-bold transition-all ${
                                answers[currentQuestion]?.answer === false
                                    ? "border-red-500 bg-red-500/20 text-white"
                                    : "border-brand-600 text-slate-300 hover:border-brand-500"
                            }`}
                        >
                            ✗ No
                        </button>
                    </div>

                    <div className="flex justify-between mt-8">
                        <button
                            onClick={handlePrev}
                            disabled={currentQuestion === 0}
                            className="flex items-center gap-2 px-6 py-3 text-slate-400 font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:text-white"
                        >
                            <ArrowLeft className="w-4 h-4" /> Previous
                        </button>

                        {currentQuestion === CRITERIA.length - 1 ? (
                            <button
                                onClick={() => {
                                    // Show email capture
                                    const modal = document.getElementById('scorp-email-modal');
                                    if (modal) modal.classList.remove('hidden');
                                }}
                                disabled={answers.length !== CRITERIA.length}
                                className="flex items-center gap-2 px-8 py-3 bg-gold-500 hover:bg-gold-600 text-brand-900 font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                See Results <Send className="w-4 h-4" />
                            </button>
                        ) : (
                            <button
                                onClick={handleNext}
                                disabled={!answers[currentQuestion]}
                                className="flex items-center gap-2 px-8 py-3 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Next <ArrowRight className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Email Capture */}
            {answers.length === CRITERIA.length && (
                <div id="scorp-email-modal" className="mt-8 bg-white rounded-3xl p-8">
                    <h3 className="text-2xl font-bold text-brand-900 mb-2">See Your Results</h3>
                    <p className="text-slate-600 mb-6">Enter your email to get your personalized S-Corp eligibility report.</p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">First Name</label>
                            <input
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-gold-500 focus:ring-4 focus:ring-gold-500/10 outline-none"
                                placeholder="John"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Business Email</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-gold-500 focus:ring-4 focus:ring-gold-500/10 outline-none"
                                placeholder="john@business.com"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-4 bg-brand-900 hover:bg-brand-800 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {isSubmitting ? "Sending..." : <>Get My Results <Mail className="w-4 h-4" /></>}
                        </button>
                    </form>
                </div>
            )}
        </section>
    );
}
