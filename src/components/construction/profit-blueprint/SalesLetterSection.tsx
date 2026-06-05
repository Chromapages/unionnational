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
                            The 4 Numbers That Decide Whether You Build Wealth
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
                        The problem is that the average construction company runs on a <strong className="font-bold text-brand-900">3&ndash;5% net margin</strong>. The top 10% run on 15&ndash;20%. The difference isn&apos;t hustle. It isn&apos;t even talent. <strong className="font-bold text-brand-900">It&apos;s systems.</strong>
                    </p>
                </RevealOnScroll>

                <RevealOnScroll delay={400}>
                    <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-12">
                        The four numbers in this book &mdash; job cost, cash flow, estimating margin, and overhead recovery &mdash; are the difference between a business that builds wealth and a business that builds you a job you can&apos;t quit.
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

                {/* The Math */}
                <RevealOnScroll delay={750}>
                    <h3 className="text-2xl sm:text-3xl font-black font-heading uppercase tracking-tight text-brand-900 mb-6">
                        The Math Most Contractors Avoid
                    </h3>
                </RevealOnScroll>

                <RevealOnScroll delay={800}>
                    <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-6">
                        If your company does $1.5M in revenue at a 4% margin, you keep <strong className="font-bold text-brand-900">$60K</strong>. That same revenue at a 12% margin keeps <strong className="font-bold text-brand-900">$180K</strong>. The difference &mdash; <strong className="font-bold text-gold-700">$120K per year</strong> &mdash; is the cost of running your business without systems.
                    </p>
                </RevealOnScroll>

                <RevealOnScroll delay={850}>
                    <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-6">
                        Over five years, that&apos;s $600K. Over ten, $1.2M.
                    </p>
                </RevealOnScroll>

                <RevealOnScroll delay={900}>
                    <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-12">
                        That&apos;s not revenue. That&apos;s profit you earned, generated, and lost &mdash; to jobs you shouldn&apos;t have taken, to estimates that were too low, to overhead that wasn&apos;t allocated, to cash flow timing that forced you to take the next job at any price.
                    </p>
                </RevealOnScroll>

                <RevealOnScroll delay={950}>
                    <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-12">
                        <strong className="font-bold text-brand-900">Every month you don&apos;t implement the systems in this book, that number gets bigger.</strong> Every month.
                    </p>
                </RevealOnScroll>

                {/* Why this book */}
                <RevealOnScroll delay={1000}>
                    <h3 className="text-2xl sm:text-3xl font-black font-heading uppercase tracking-tight text-brand-900 mb-6">
                        Why This Book Works When Most Don&apos;t
                    </h3>
                </RevealOnScroll>

                <RevealOnScroll delay={1050}>
                    <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-6">
                        You&apos;ve probably read books on construction management before. Most of them are written by people who&apos;ve never run a job site. They&apos;re theory. They&apos;re frameworks. They&apos;re not implementation.
                    </p>
                </RevealOnScroll>

                <RevealOnScroll delay={1100}>
                    <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-12">
                        This book is different because it was written from the inside. Every chapter, every checklist, every system comes from real contractors &mdash; owners who went from 4% to 18% margin in 18 months using the exact framework in these pages. It doesn&apos;t matter if you&apos;re a $300K sole operator or a $20M specialty contractor. <strong className="font-bold text-brand-900">The four numbers work the same way. The systems scale.</strong>
                    </p>
                </RevealOnScroll>

                {/* What's inside */}
                <RevealOnScroll delay={1150}>
                    <h3 className="text-2xl sm:text-3xl font-black font-heading uppercase tracking-tight text-brand-900 mb-6">
                        What&apos;s Inside
                    </h3>
                </RevealOnScroll>

                <RevealOnScroll delay={1200}>
                    <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8">
                        The book is organized around the four numbers. Each chapter closes with a 30-day implementation plan and a printable checklist you can hand to your PM on Monday morning.
                    </p>
                </RevealOnScroll>

                <RevealOnScroll delay={1250}>
                    <div className="space-y-6 mb-12">
                        {[
                            {
                                num: "01",
                                title: "Job Cost",
                                body: "How to set up job costing that catches losing jobs in the first two weeks, not the last two. The line items most contractors miss. The weekly cadence that makes it stick.",
                            },
                            {
                                num: "02",
                                title: "Cash Flow",
                                body: "The 13-week cash forecast. The payroll cushion. The way to read a P&L so it tells you what&apos;s coming, not just what happened.",
                            },
                            {
                                num: "03",
                                title: "Estimating",
                                body: "The 6 margin bands by trade. The decision matrix that lets you walk away from bad jobs. The 3 numbers every estimate needs to include before you send it.",
                            },
                            {
                                num: "04",
                                title: "Overhead & Tax",
                                body: "How to allocate overhead to every job. The S-corp tax strategy that saves the average contractor $20K/year. The monthly tax set-aside system that ends the April surprise.",
                            },
                        ].map((chapter) => (
                            <div key={chapter.num} className="flex gap-5 p-5 rounded-2xl bg-slate-50 border border-slate-100">
                                <div className="shrink-0 w-12 h-12 rounded-xl bg-gold-500 text-brand-900 flex items-center justify-center font-black text-base">
                                    {chapter.num}
                                </div>
                                <div>
                                    <h4 className="font-bold text-brand-900 text-lg mb-1.5">
                                        Chapter {chapter.num} &mdash; {chapter.title}
                                    </h4>
                                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                                        {chapter.body}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </RevealOnScroll>

                {/* Closing CTA */}
                <RevealOnScroll delay={1300}>
                    <h3 className="text-2xl sm:text-3xl font-black font-heading uppercase tracking-tight text-brand-900 mb-6">
                        The Cost of Waiting
                    </h3>
                </RevealOnScroll>

                <RevealOnScroll delay={1350}>
                    <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-6">
                        You have two options.
                    </p>
                </RevealOnScroll>

                <RevealOnScroll delay={1400}>
                    <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-6">
                        <strong className="font-bold text-brand-900">Option 1:</strong> Put the book down, close this page, and go back to running your company the way you&apos;ve been running it. The 4% margin stays. The 60-hour weeks stay. The April tax bill stays. The gap between revenue and wealth stays.
                    </p>
                </RevealOnScroll>

                <RevealOnScroll delay={1450}>
                    <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-12">
                        <strong className="font-bold text-brand-900">Option 2:</strong> Spend $27 today. Read it on Saturday. Implement one system on Monday. Watch what happens to the next job you estimate.
                    </p>
                </RevealOnScroll>

                <RevealOnScroll delay={1500}>
                    <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-12">
                        Most of the contractors who bought this book in the last 90 days are running margins they&apos;ve never run before. The ones who finished it? They&apos;re booking strategy calls to talk about the next level &mdash; entity structure, owner compensation, and the kind of wealth planning that turns a profitable business into a transferable asset.
                    </p>
                </RevealOnScroll>

                {/* Final CTA */}
                <RevealOnScroll delay={1550}>
                    <div className="mt-12 pt-12 border-t-2 border-slate-200 text-center">
                        <a
                            href="#book-sales"
                            className="inline-flex items-center gap-2 px-10 py-5 bg-gold-500 hover:bg-gold-600 text-white font-black uppercase tracking-wider text-sm sm:text-base rounded-full transition-colors shadow-lg shadow-gold-500/30"
                        >
                            Choose Your Format Below
                            <ArrowRight size={18} />
                        </a>
                        <p className="mt-5 text-xs text-slate-500 uppercase tracking-wider font-bold">
                            60-Day Money-Back Guarantee &middot; Instant Digital Delivery
                        </p>
                    </div>
                </RevealOnScroll>
            </div>
        </section>
    );
}
