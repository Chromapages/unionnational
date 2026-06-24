import { ArrowRight, Quote } from "lucide-react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export function SalesLetterSection() {
    return (
        <section className="py-20 lg:py-28 bg-white relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <RevealOnScroll>
                    <div className="text-center mb-12">
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-gold-600">
                            A Letter to the Construction Company Owner
                        </span>
                        <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-black font-heading tracking-tight leading-[1.1] uppercase text-brand-900">
                            The 6 Chapters That Decide Whether You Build Wealth
                        </h2>
                    </div>
                </RevealOnScroll>

                {/* Opening */}
                <RevealOnScroll delay={100}>
                    <p className="text-lg sm:text-xl text-slate-700 leading-relaxed font-light mb-6">
                        There&apos;s a number that lives in the back of every contractor&apos;s mind. It&apos;s the gap between what you thought ownership would look like and what it actually looks like.
                    </p>
                </RevealOnScroll>

                <RevealOnScroll delay={150}>
                    <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-6">
                        You went into business to build something. To make real money. To eventually step back from the tools, the late-night estimating, and the constant worry about whether there&apos;s enough in the account to make payroll on Friday.
                    </p>
                </RevealOnScroll>

                <RevealOnScroll delay={200}>
                    <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-12">
                        But the bank account doesn&apos;t reflect the revenue. The truck keeps breaking. The crew keeps turning over. Every job that goes sideways comes out of your pocket. And the tax bill &mdash; every April &mdash; feels like a punishment for working harder than anyone you know.
                    </p>
                </RevealOnScroll>

                {/* Diagnosis */}
                <RevealOnScroll delay={250}>
                    <h3 className="text-2xl sm:text-3xl font-black font-heading uppercase tracking-tight text-brand-900 mb-6">
                        It&apos;s Not a Work Ethic Problem. It&apos;s a Systems Problem.
                    </h3>
                </RevealOnScroll>

                <RevealOnScroll delay={300}>
                    <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-6">
                        You&apos;re not bad at this. You&apos;re not undercharging. You&apos;re not working too little.
                    </p>
                </RevealOnScroll>

                <RevealOnScroll delay={350}>
                    <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-12">
                        The problem is that the average general contractor runs on a <strong className="font-bold text-brand-900">5&ndash;6% net margin</strong>. Healthy operators hit 8&ndash;10%. The top performers in specialty trades run <strong className="font-bold text-brand-900">15&ndash;25%</strong>. The difference isn&apos;t hustle. It isn&apos;t even talent. <strong className="font-bold text-brand-900">It&apos;s systems.</strong>
                    </p>
                </RevealOnScroll>

                <RevealOnScroll delay={400}>
                    <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-12">
                        The six chapters in this book &mdash; financial foundation, pricing, structure, hiring, operations, and growth &mdash; are the difference between a business that builds wealth and a business that builds you a job you can&apos;t quit.
                    </p>
                </RevealOnScroll>

                {/* Dream Outcome */}
                <RevealOnScroll delay={450}>
                    <h3 className="text-2xl sm:text-3xl font-black font-heading uppercase tracking-tight text-brand-900 mb-6">
                        Picture This: 12 Months From Now
                    </h3>
                </RevealOnScroll>

                <RevealOnScroll delay={500}>
                    <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-6">
                        You sit down on a Sunday afternoon. Your phone isn&apos;t ringing because you hired a PM who&apos;s actually good. Your inbox is empty because the systems catch the problems before they hit you.
                    </p>
                </RevealOnScroll>

                <RevealOnScroll delay={550}>
                    <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-6">
                        You open the books. Revenue is up 18%. Profit is up 60% &mdash; not because you raised prices, but because you stopped losing money on jobs you thought were winners.
                    </p>
                </RevealOnScroll>

                <RevealOnScroll delay={600}>
                    <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-6">
                        You have 3 months of operating cash in the account. The line of credit is paid off. The tax estimate next April is fully covered, set aside monthly, automated.
                    </p>
                </RevealOnScroll>

                <RevealOnScroll delay={650}>
                    <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-12">
                        You take a two-week vacation. The company runs without you. The margin holds. The cash keeps flowing.
                    </p>
                </RevealOnScroll>

                <RevealOnScroll delay={700}>
                    <div className="my-12 border-l-4 border-gold-500 bg-slate-50 p-6 sm:p-8 rounded-r-2xl relative">
                        <Quote className="w-8 h-8 text-gold-500/30 absolute top-4 right-4" />
                        <p className="text-brand-900 font-semibold text-base sm:text-lg italic leading-relaxed">
                            This isn&apos;t fantasy. This is what a contractor with the right systems looks like. The blueprint in this book is exactly how you get there.
                        </p>
                    </div>
                </RevealOnScroll>

                {/* The Math lives in the standalone MathSection — placed earlier in the page (right after the VSL) */}

                <RevealOnScroll delay={750}>
                    <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-12">
                        <strong className="font-bold text-brand-900">Every month you don&apos;t implement the systems in this book, that number gets bigger.</strong> Every month.
                    </p>
                </RevealOnScroll>

                {/* The Cost of Waiting — Option 1 / Option 2 close */}
                <RevealOnScroll delay={800}>
                    <h3 className="text-2xl sm:text-3xl font-black font-heading uppercase tracking-tight text-brand-900 mb-6">
                        The Cost of Waiting
                    </h3>
                </RevealOnScroll>

                <RevealOnScroll delay={850}>
                    <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-6">
                        You have two options.
                    </p>
                </RevealOnScroll>

                <RevealOnScroll delay={900}>
                    <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-6">
                        <strong className="font-bold text-brand-900">Option 1:</strong> Put the book down, close this page, and go back to running your company the way you&apos;ve been running it. The 5% margin stays. The 60-hour weeks stay. The April tax bill stays. The gap between revenue and wealth stays.
                    </p>
                </RevealOnScroll>

                <RevealOnScroll delay={950}>
                    <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-12">
                        <strong className="font-bold text-brand-900">Option 2:</strong> Spend $27 today. Read it on Saturday. Implement one system on Monday. Watch what happens to the next job you estimate.
                    </p>
                </RevealOnScroll>
            </div>
        </section>
    );
}
