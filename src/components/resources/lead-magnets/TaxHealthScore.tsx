"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Check, Mail, ArrowRight, ArrowLeft, Send, Download, TrendingUp, AlertTriangle, Building, DollarSign, FileText, Calendar } from "lucide-react";

interface Answer {
    questionId: number;
    answer: string | number;
    score: number;
}

const QUESTIONS = [
    {
        id: 1,
        question: "What's your annual business revenue?",
        options: [
            { label: "Under $50,000", value: "under50k", score: 1 },
            { label: "$50,000 - $150,000", value: "50k-150k", score: 2 },
            { label: "$150,000 - $500,000", value: "150k-500k", score: 3 },
            { label: "$500,000 - $1M", value: "500k-1m", score: 4 },
            { label: "Over $1M", value: "over1m", score: 5 },
        ],
        icon: DollarSign,
    },
    {
        id: 2,
        question: "What type of business structure do you have?",
        options: [
            { label: "Sole Proprietorship", value: "sole-prop", score: 1 },
            { label: "LLC (Single Member)", value: "single-llc", score: 2 },
            { label: "LLC (Multi-Member)", value: "multi-llc", score: 3 },
            { label: "S-Corp", value: "scorp", score: 4 },
            { label: "C-Corp", value: "ccorp", score: 5 },
        ],
        icon: Building,
    },
    {
        id: 3,
        question: "Do you have a written tax plan for the year?",
        options: [
            { label: "No, I file when due", value: "no", score: 1 },
            { label: "I think about taxes occasionally", value: "sometimes", score: 2 },
            { label: "Yes, I review quarterly", value: "quarterly", score: 4 },
            { label: "Yes, I have a proactive tax strategy", value: "proactive", score: 5 },
        ],
        icon: FileText,
    },
    {
        id: 4,
        question: "How often do you review your business expenses?",
        options: [
            { label: "Never", value: "never", score: 1 },
            { label: "At tax time only", value: "tax-time", score: 2 },
            { label: "Quarterly", value: "quarterly", score: 4 },
            { label: "Monthly", value: "monthly", score: 5 },
        ],
        icon: Calendar,
    },
    {
        id: 5,
        question: "Are you currently maximizing business deductions?",
        options: [
            { label: "I don't know what I can deduct", value: "no", score: 1 },
            { label: "I take the standard deductions", value: "standard", score: 2 },
            { label: "I track most expenses", value: "most", score: 4 },
            { label: "Yes, I capture every legitimate deduction", value: "all", score: 5 },
        ],
        icon: TrendingUp,
    },
];

export function TaxHealthScore() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [showResults, setShowResults] = useState(false);

    const totalScore = answers.reduce((sum, a) => sum + a.score, 0);
    const maxScore = QUESTIONS.reduce((sum, q) => sum + Math.max(...q.options.map(o => o.score)), 0);
    const percentage = Math.round((totalScore / maxScore) * 100);

    const handleAnswer = (option: { label: string; value: string; score: number }) => {
        const newAnswers = [...answers];
        newAnswers[currentQuestion] = {
            questionId: QUESTIONS[currentQuestion].id,
            answer: option.value,
            score: option.score,
        };
        setAnswers(newAnswers);
    };

    const handleNext = () => {
        if (currentQuestion < QUESTIONS.length - 1) {
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
        
        // In production, this would send to your API/CRM
        console.log("Submitting assessment:", { name, email, answers, totalScore, percentage });
        
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setIsComplete(true);
    };

    const getScoreLabel = () => {
        if (percentage >= 80) return { label: "Excellent", color: "text-green-600", bg: "bg-green-100" };
        if (percentage >= 60) return { label: "Good", color: "text-blue-600", bg: "bg-blue-100" };
        if (percentage >= 40) return { label: "Needs Work", color: "text-amber-600", bg: "bg-amber-100" };
        return { label: "Critical", color: "text-red-600", bg: "bg-red-100" };
    };

    const scoreLabel = getScoreLabel();
    const currentQ = QUESTIONS[currentQuestion];
    const CurrentIcon = currentQ.icon;

    if (isComplete) {
        return (
            <section className="w-full bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto rounded-3xl">
                <div className="text-center">
                    <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                        <Check className="w-10 h-10 text-green-600" />
                    </div>
                    <h2 className="text-3xl font-black text-brand-900 mb-2">Assessment Complete!</h2>
                    <p className="text-slate-600 mb-8">Your results have been sent to <strong>{email}</strong></p>

                    <div className="bg-white rounded-2xl p-8 border border-slate-200 max-w-md mx-auto mb-8">
                        <div className={`text-5xl font-black ${scoreLabel.color} mb-2`}>{percentage}%</div>
                        <div className={`inline-block px-4 py-1 rounded-full ${scoreLabel.bg} ${scoreLabel.color} font-bold`}>
                            {scoreLabel.label}
                        </div>
                        <p className="text-slate-500 mt-4">
                            Your tax health score is based on {answers.length} responses.
                        </p>
                    </div>

                    <a href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl transition-all">
                        Discuss Your Results <ArrowRight className="w-5 h-5" />
                    </a>
                </div>
            </section>
        );
    }

    return (
        <section className="w-full bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto rounded-3xl">
            {/* Progress */}
            <div className="mb-8">
                <div className="flex justify-between text-sm font-medium text-slate-500 mb-2">
                    <span>Question {currentQuestion + 1} of {QUESTIONS.length}</span>
                    <span>{Math.round(((currentQuestion) / QUESTIONS.length) * 100)}% complete</span>
                </div>
                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <motion.div 
                        className="h-full bg-brand-600"
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentQuestion + 1) / QUESTIONS.length) * 100}%` }}
                    />
                </div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentQuestion}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-brand-100 flex items-center justify-center">
                            <CurrentIcon className="w-6 h-6 text-brand-600" />
                        </div>
                        <span className="text-slate-400 font-medium">Question {currentQuestion + 1}</span>
                    </div>

                    <h2 className="text-2xl font-bold text-brand-900 mb-8">{currentQ.question}</h2>

                    <div className="space-y-3 mb-8">
                        {currentQ.options.map((option, i) => (
                            <button
                                key={i}
                                onClick={() => handleAnswer(option)}
                                className={`w-full p-4 rounded-xl border-2 text-left font-medium transition-all ${
                                    answers[currentQuestion]?.answer === option.value
                                        ? "border-brand-600 bg-brand-50 text-brand-900"
                                        : "border-slate-200 hover:border-slate-300 text-slate-700"
                                }`}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>

                    <div className="flex justify-between">
                        <button
                            onClick={handlePrev}
                            disabled={currentQuestion === 0}
                            className="flex items-center gap-2 px-6 py-3 text-slate-500 font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:text-slate-700"
                        >
                            <ArrowLeft className="w-4 h-4" /> Previous
                        </button>

                        {currentQuestion === QUESTIONS.length - 1 ? (
                            <button
                                onClick={() => setShowResults(true)}
                                disabled={answers.length !== QUESTIONS.length}
                                className="flex items-center gap-2 px-8 py-3 bg-gold-500 hover:bg-gold-600 text-brand-900 font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                See Results <Send className="w-4 h-4" />
                            </button>
                        ) : (
                            <button
                                onClick={handleNext}
                                disabled={!answers[currentQuestion]}
                                className="flex items-center gap-2 px-8 py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Next <ArrowRight className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Email Capture Modal */}
            <AnimatePresence>
                {showResults && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
                    >
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            className="bg-white rounded-3xl p-8 max-w-md w-full"
                        >
                            <h3 className="text-2xl font-bold text-brand-900 mb-2">Get Your Results</h3>
                            <p className="text-slate-600 mb-6">Enter your email to receive your detailed tax health report.</p>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">First Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none"
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
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none"
                                        placeholder="john@business.com"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-4 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    {isSubmitting ? "Sending..." : <>View Results <Mail className="w-4 h-4" /></>}
                                </button>
                            </form>
                            <button
                                onClick={() => setShowResults(false)}
                                className="w-full mt-4 text-slate-500 font-medium hover:text-slate-700"
                            >
                                Skip for now
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
