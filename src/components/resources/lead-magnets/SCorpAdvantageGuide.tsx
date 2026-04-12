"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Check, Mail, ArrowRight, ArrowLeft, Send, Zap, Target as TargetIcon, Award, Building2, TrendingUp, Shield } from "lucide-react";

interface Answer {
    questionId: number;
    answer: number;
}

const QUESTIONS = [
    {
        id: 1,
        question: "What's your current annual net business income?",
        options: [
            { label: "Under $50,000", value: 0 },
            { label: "$50,000 - $80,000", value: 1 },
            { label: "$80,000 - $150,000", value: 3 },
            { label: "$150,000 - $300,000", value: 5 },
            { label: "Over $300,000", value: 7 },
        ],
    },
    {
        id: 2,
        question: "How much do you pay in self-employment tax currently?",
        options: [
            { label: "I don't know", value: 0 },
            { label: "Under $5,000", value: 1 },
            { label: "$5,000 - $12,000", value: 3 },
            { label: "$12,000 - $25,000", value: 5 },
            { label: "Over $25,000", value: 7 },
        ],
    },
    {
        id: 3,
        question: "Do you have profits beyond your salary that you take as distributions?",
        options: [
            { label: "No, I take everything as salary", value: 0 },
            { label: "A small amount ($0-20k)", value: 2 },
            { label: "Yes, significant ($20k-50k)", value: 4 },
            { label: "Very significant (over $50k)", value: 6 },
        ],
    },
    {
        id: 4,
        question: "How important is tax optimization to you?",
        options: [
            { label: "I'd rather not think about it", value: 0 },
            { label: "Somewhat important", value: 1 },
            { label: "Very important - I want to minimize taxes legally", value: 3 },
            { label: "Extremely important - it's a top priority", value: 5 },
        ],
    },
    {
        id: 5,
        question: "Are you comfortable with additional paperwork/compliance?",
        options: [
            { label: "No, I want minimal complexity", value: 0 },
            { label: "Some additional is okay", value: 2 },
            { label: "I'm willing to do what's needed", value: 4 },
        ],
    },
];

const BENEFITS = [
    { icon: TrendingUp, title: "Save $8,000-$20,000+ Annually", description: "Most S-Corp owners see this level of savings" },
    { icon: Shield, title: "Reduce SE Tax by 50%", description: "Only pay SE tax on salary, not distributions" },
    { icon: Building2, title: "Separate Business Identity", description: "Stronger legal protection between personal and business" },
    { icon: TargetIcon, title: "Tax Planning Flexibility", description: "More strategies available for optimization" },
];

export function SCorpAdvantageGuide() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    const totalScore = answers.reduce((sum, a) => sum + a.answer, 0);
    const maxScore = QUESTIONS.reduce((sum, q) => sum + Math.max(...q.options.map(o => o.value)), 0);
    const percentage = Math.round((totalScore / maxScore) * 100);

    const getRecommendation = () => {
        if (percentage >= 70) return { label: "Excellent Candidate", color: "text-green-600", bg: "bg-green-100", desc: "You could benefit significantly from S-Corp election" };
        if (percentage >= 50) return { label: "Good Candidate", color: "text-blue-600", bg: "bg-blue-100", desc: "S-Corp likely makes sense for your situation" };
        if (percentage >= 30) return { label: "Maybe", color: "text-amber-600", bg: "bg-amber-100", desc: "Consider consulting to confirm" };
        return { label: "Not Recommended", color: "text-slate-600", bg: "bg-slate-100", desc: "S-Corp may not provide significant benefits now" };
    };

    const handleAnswer = (value: number) => {
        const newAnswers = [...answers];
        newAnswers[currentQuestion] = {
            questionId: QUESTIONS[currentQuestion].id,
            answer: value,
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
        
        console.log("Submitting S-Corp assessment:", { name, email, answers, totalScore, percentage });
        
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setIsComplete(true);
    };

    const recommendation = getRecommendation();
    const currentQ = QUESTIONS[currentQuestion];

    if (isComplete) {
        return (
            <section className="w-full bg-gradient-to-br from-brand-900 via-brand-800 to-brand-900 py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto rounded-3xl">
                <div className="text-center">
                    <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mx-auto mb-6">
                        <Award className="w-10 h-10 text-gold-500" />
                    </div>
                    <h2 className="text-3xl font-black text-white mb-2">Assessment Complete!</h2>
                    <p className="text-slate-300 mb-8">
                        Your personalized guide has been sent to <strong>{email}</strong>
                    </p>

                    <div className={`inline-block px-6 py-3 rounded-full ${recommendation.bg} ${recommendation.color} font-bold text-lg mb-6`}>
                        {recommendation.label}
                    </div>

                    <p className="text-slate-300 mb-8 max-w-md mx-auto">{recommendation.desc}</p>

                    {/* Benefits */}
                    <div className="grid md:grid-cols-2 gap-4 max-w-lg mx-auto mb-8">
                        {BENEFITS.map((benefit, i) => (
                            <div key={i} className="bg-brand-800/50 p-4 rounded-xl border border-brand-700 text-left">
                                <benefit.icon className="w-6 h-6 text-gold-400 mb-2" />
                                <div className="text-white font-bold text-sm">{benefit.title}</div>
                                <div className="text-slate-400 text-xs">{benefit.description}</div>
                            </div>
                        ))}
                    </div>

                    <a href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-gold-500 hover:bg-gold-600 text-brand-900 font-bold rounded-xl transition-all">
                        Get Your Custom Plan <ArrowRight className="w-5 h-5" />
                    </a>
                </div>
            </section>
        );
    }

    return (
        <section className="w-full bg-gradient-to-br from-brand-900 via-brand-800 to-brand-900 py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto rounded-3xl">
            {/* Progress */}
            <div className="mb-8">
                <div className="flex justify-between text-sm font-medium text-slate-400 mb-2">
                    <span>Question {currentQuestion + 1} of {QUESTIONS.length}</span>
                    <span>{Math.round(((currentQuestion) / QUESTIONS.length) * 100)}% complete</span>
                </div>
                <div className="h-2 bg-brand-800 rounded-full overflow-hidden">
                    <motion.div 
                        className="h-full bg-gold-500"
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
                    className="bg-brand-800/50 backdrop-blur rounded-3xl p-8 border border-brand-700"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-gold-500/20 flex items-center justify-center">
                            <Zap className="w-6 h-6 text-gold-400" />
                        </div>
                        <span className="text-slate-400 font-medium">Question {currentQuestion + 1}</span>
                    </div>

                    <h2 className="text-2xl font-bold text-white mb-8">{currentQ.question}</h2>

                    <div className="space-y-3 mb-8">
                        {currentQ.options.map((option, i) => (
                            <button
                                key={i}
                                onClick={() => handleAnswer(option.value)}
                                className={`w-full p-4 rounded-xl border-2 text-left font-medium transition-all ${
                                    answers[currentQuestion]?.answer === option.value
                                        ? "border-gold-500 bg-gold-500/20 text-white"
                                        : "border-brand-600 text-slate-300 hover:border-brand-500 hover:bg-brand-700/50"
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
                            className="flex items-center gap-2 px-6 py-3 text-slate-400 font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:text-white"
                        >
                            <ArrowLeft className="w-4 h-4" /> Previous
                        </button>

                        {currentQuestion === QUESTIONS.length - 1 ? (
                            <button
                                onClick={() => {
                                    const modal = document.getElementById('guide-email-modal');
                                    if (modal) modal.classList.remove('hidden');
                                }}
                                disabled={answers.length !== QUESTIONS.length}
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
            {answers.length === QUESTIONS.length && (
                <div id="guide-email-modal" className="hidden mt-8 bg-white rounded-3xl p-8">
                    <h3 className="text-2xl font-bold text-brand-900 mb-2">Get Your Free Guide</h3>
                    <p className="text-slate-600 mb-6">Enter your email to receive "The S-Corp Advantage" guide with your personalized recommendations.</p>

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
                            {isSubmitting ? "Sending..." : <>Get My Guide <BookOpen className="w-4 h-4" /></>}
                        </button>
                    </form>
                </div>
            )}
        </section>
    );
}
