"use client";

import { useState, useEffect, useRef } from "react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { TrendingUp, Calculator, Play, X, ArrowRight, CheckCircle2 } from "lucide-react";
import { useVideoPlayer } from "@/hooks/useVideoPlayer";
import { VideoPlayer } from "@/components/ui/VideoPlayer";

// Custom hook for counting numbers with ease-out
const useCounter = (end: number, duration: number = 1000, start: boolean = false) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!start) {
            setCount(0);
            return;
        }

        let startTime: number | null = null;
        let animationFrameId: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / duration, 1);

            // Ease out quart
            const ease = 1 - Math.pow(1 - percentage, 4);

            setCount(end * ease);

            if (progress < duration) {
                animationFrameId = requestAnimationFrame(animate);
            }
        };

        animationFrameId = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrameId);
    }, [end, duration, start]);

    return count;
};

interface VideoHeroProps {
    data?: {
        heroTitle?: string;
        heroSubtitle?: string;
        heroVideoUrl?: string;
        heroCtaText?: string;
        heroCtaUrl?: string;
    };
}

export function VideoHero({ data }: VideoHeroProps) {
    const [income, setIncome] = useState<string>("");
    const [isCalculating, setIsCalculating] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [result, setResult] = useState<{
        savings: number;
        oldTax: number;
        newTax: number;
    } | null>(null);
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    const closeButtonRef = useRef<HTMLButtonElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);

    // Animated savings value
    const animatedSavings = useCounter(result?.savings || 0, 1500, showResult);

    const hlsUrl = data?.heroVideoUrl;
    const modalVideoUrl = data?.heroCtaUrl || hlsUrl;

    // Background video hook
    const { videoRef: bgVideoRef } = useVideoPlayer({
        src: hlsUrl,
        autoPlay: true,
        muted: true,
        loop: true
    });

    useEffect(() => {
        setMounted(true);
    }, []);

    // Accessibility: Focus Management for Modal
    useEffect(() => {
        if (isVideoModalOpen) {
            const handleFocusTrap = (e: KeyboardEvent) => {
                if (e.key === "Tab" && modalRef.current) {
                    const focusableElements = modalRef.current.querySelectorAll(
                        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                    );
                    const firstElement = focusableElements[0] as HTMLElement;
                    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

                    if (e.shiftKey) {
                        if (document.activeElement === firstElement) {
                            e.preventDefault();
                            lastElement.focus();
                        }
                    } else {
                        if (document.activeElement === lastElement) {
                            e.preventDefault();
                            firstElement.focus();
                        }
                    }
                }
                if (e.key === "Escape") setIsVideoModalOpen(false);
            };

            document.addEventListener("keydown", handleFocusTrap);
            setTimeout(() => closeButtonRef.current?.focus(), 100);

            return () => document.removeEventListener("keydown", handleFocusTrap);
        }
    }, [isVideoModalOpen]);

    const handleCalculate = () => {
        if (!income) return;

        setIsCalculating(true);
        setShowResult(false); // Reset to trigger animation restart if needed

        // Simulate calculation delay for UX
        setTimeout(() => {
            const netIncome = parseFloat(income.replace(/,/g, "")) || 0;

            // Simplified S-Corp Logic for Demo
            const oldTax = netIncome * 0.153;
            let salary = netIncome * 0.4;
            if (salary < 40000 && netIncome > 40000) salary = 40000;
            if (netIncome < 40000) salary = netIncome;

            const newTax = salary * 0.153;
            const savings = oldTax - newTax;

            setResult({
                savings: Math.max(0, savings),
                oldTax,
                newTax
            });
            setIsCalculating(false);
            setShowResult(true);
        }, 800);
    };

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
        }).format(val);
    };

    // Staggered animation delays
    const getDelayClass = (index: number) => {
        // Only apply delays on initial mount
        return mounted ? "" : `delay-[${index * 150}ms]`;
    };

    return (
        <section
            className="relative w-full min-h-[85vh] md:min-h-[90vh] lg:min-h-[95vh] flex items-center pt-24 pb-12 overflow-hidden"
            aria-label="Hero Section"
        >
            {/* Video Background */}
            <div className="absolute inset-0 w-full h-full z-0 bg-brand-900">
                <video
                    ref={bgVideoRef}
                    className="absolute inset-0 w-full h-full object-cover opacity-50"
                    playsInline
                    muted
                    loop
                    poster="/images/hero-poster.jpg"
                />
                {/* Overlay: 70% opacity for balanced contrast and video visibility
                    Base layer: 70% opaque bg-brand-900 (#020908 - near black) provides dark foundation
                    Second layer: 70% opaque bg-brand-950 (#010504 - near black) for additional darkening
                    Video at 50% opacity + 70% overlay ensures readable text with visible video movement
                    Aligns with "Digital Vault" design system's "Solid over Translucent" principle */}
                <div className="absolute inset-0 bg-brand-900/70"></div>
                <div className="absolute inset-0 bg-brand-950/70"></div>
            </div>

            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full mb-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

                    {/* Left Column: Content & Calculator (55% width approx) */}
                    <div className="lg:col-span-7 flex flex-col justify-center">
                        <RevealOnScroll className="w-full">
                            {/* Eyebrow */}
                            <div className="flex items-center gap-3 mb-6 animate-in fade-in slide-in-from-left-4 duration-700 ease-out">
                                <span className="h-px w-8 bg-gold-500/70"></span>
                                <p className="text-xs md:text-sm font-bold uppercase tracking-[0.25em] text-gold-400 font-heading">
                                    Your Tax Strategy
                                </p>
                            </div>

                            {/* Headline */}
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] font-bold font-heading tracking-tight mb-6 text-white drop-shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150 fill-mode-forwards">
                                {data?.heroTitle ? (
                                    <>
                                        {data.heroTitle.split('.')[0]}.
                                        <br />
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600">
                                            {data.heroTitle.split('.').slice(1).join('.')}
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        Stop Overpaying.
                                        <br />
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600">
                                            Start Keeping.
                                        </span>
                                    </>
                                )}
                            </h1>

                            {/* Subtitle */}
                            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed font-sans max-w-2xl font-light animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 fill-mode-forwards">
                                {data?.heroSubtitle || "The 'Digital Vault' for your wealth. Institutional-grade tax strategies designed to save high-income earners $20k+ annually."}
                            </p>

                            {/* Calculator & CTA Container */}
                            <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500 fill-mode-forwards">

                                {/* Calculator Card - Enhanced "Command Center" Style */}
                                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-1 max-w-xl shadow-2xl">
                                    <div className="bg-white rounded-lg p-5 sm:p-6 border border-slate-200">
                                        <label
                                            htmlFor="hero-income-input"
                                            className="block text-xs font-bold text-brand-900 uppercase tracking-widest mb-3 font-heading flex items-center justify-between"
                                        >
                                            <span>Estimate Your S-Corp Savings</span>
                                            <span className="text-gold-600/60 hidden sm:inline-block text-[10px]">Confidential Calculation</span>
                                        </label>

                                        <form
                                            className="flex flex-col sm:flex-row gap-3 relative"
                                            onSubmit={(e) => { e.preventDefault(); handleCalculate(); }}
                                        >
                                            <div className="relative flex-1 group/input">
                                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-900/60 font-medium text-lg md:text-xl group-focus-within/input:text-gold-600 transition-colors">$</span>
                                                <input
                                                    id="hero-income-input"
                                                    type="text"
                                                    inputMode="numeric"
                                                    placeholder="Net Income (e.g. 150,000)"
                                                    className="w-full pl-9 pr-4 py-4 bg-slate-50 outline-none text-brand-900 font-bold text-lg placeholder:text-slate-400 rounded-md border border-slate-200 focus:border-gold-500 focus:ring-1 focus:ring-gold-500/50 transition-all font-sans"
                                                    value={income}
                                                    onChange={(e) => setIncome(e.target.value)}
                                                />
                                            </div>
                                            <button
                                                type="submit"
                                                disabled={isCalculating}
                                                className="px-8 py-4 rounded-md text-sm font-bold transition-all flex items-center justify-center gap-2 group shadow-lg shadow-gold-500/20 bg-gold-500 text-brand-900 hover:bg-gold-400 hover:shadow-gold-500/30 font-heading tracking-wide active:scale-[0.98] disabled:opacity-70 disabled:cursor-wait whitespace-nowrap focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500"
                                            >
                                                {isCalculating ? (
                                                    <span className="flex items-center gap-2">
                                                        <span className="w-4 h-4 border-2 border-brand-900/30 border-t-brand-900 rounded-full animate-spin"></span>
                                                        Calculating...
                                                    </span>
                                                ) : (
                                                    <>
                                                        Calculate
                                                        <Calculator className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                                                    </>
                                                )}
                                            </button>
                                        </form>
                                    </div>
                                </div>

                                {/* Mobile Inline Result (Visible < 1024px) */}
                                {(showResult || isCalculating) && (
                                    <div className="lg:hidden animate-in fade-in slide-in-from-top-2 duration-500">
                                        <div className="bg-gradient-to-br from-brand-800 to-brand-900 border border-gold-500/30 rounded-lg p-5 shadow-xl relative overflow-hidden group">
                                            {/* Shimmer overlay */}
                                            {isCalculating && (
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]"></div>
                                            )}

                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-xs font-bold uppercase tracking-wider text-gold-400 font-heading">Potential Savings</span>
                                                <TrendingUp className="w-4 h-4 text-gold-500" />
                                            </div>

                                            {isCalculating ? (
                                                <div className="h-10 w-32 bg-white/10 rounded animate-pulse"></div>
                                            ) : (
                                                <div className="text-4xl font-bold text-white font-heading tracking-tight tabular-nums">
                                                    {formatCurrency(animatedSavings)}
                                                </div>
                                            )}

                                            <div className="mt-3 pt-3 border-t border-white/10 flex justify-between items-center">
                                                <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Estimated Annual Reduction</span>
                                                {!isCalculating && (
                                                    <span className="text-xs text-green-400 font-bold flex items-center gap-1">
                                                        <CheckCircle2 className="w-3 h-3" /> Verified Strategy
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* CTAs Row */}
                                <div className="flex flex-col sm:flex-row gap-4 mt-2">
                                    <button
                                        onClick={() => setIsVideoModalOpen(true)}
                                        aria-label="Watch Strategy Video"
                                        className="bg-brand-900/50 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-md text-sm font-bold hover:bg-white/10 hover:border-white/40 transition-all flex items-center justify-center sm:justify-start gap-4 font-heading tracking-wide group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 w-full sm:w-auto"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-gold-500/10 border border-gold-500/50 flex items-center justify-center text-gold-400 group-hover:bg-gold-500 group-hover:text-brand-900 transition-all shadow-[0_0_15px_rgba(212,175,55,0.1)] group-hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                                            <Play className="w-4 h-4 fill-current ml-0.5" />
                                        </div>
                                        <div className="text-left">
                                            <span className="block text-[10px] text-slate-400 uppercase tracking-wider font-bold">See How It Works</span>
                                            <span className="block text-sm sm:text-base">{data?.heroCtaText || "Watch Strategy Video"}</span>
                                        </div>
                                    </button>
                                </div>

                            </div>
                        </RevealOnScroll>
                    </div>

                    {/* Right Column: Dashboard Card (45% width) - Hidden on mobile/tablet */}
                    <div className="hidden lg:flex lg:col-span-5 relative h-full min-h-[500px] items-center justify-center perspective-[2000px]">
                        <RevealOnScroll className="w-full relative z-10" delay={400}>
                            <div
                                className="relative bg-white rounded-2xl shadow-2xl transform transition-all duration-700 ease-out hover:rotate-y-[2deg] hover:-translate-y-2 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.4)] border border-white/20 ring-1 ring-black/5"
                                style={{
                                    transformStyle: 'preserve-3d',
                                    transform: isCalculating ? 'scale(0.98) rotateY(0deg)' : 'rotateY(-8deg) rotateX(4deg)',
                                }}
                            >
                                {/* Card Header */}
                                <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 rounded-t-2xl">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-brand-900 flex items-center justify-center text-white text-xs font-bold shadow-lg ring-2 ring-white">JA</div>
                                        <div>
                                            <div className="text-sm font-bold text-brand-900 font-heading leading-tight">Jason Astwood</div>
                                            <div className="text-xs text-slate-500 font-medium">Union National Tax</div>
                                        </div>
                                    </div>
                                    <div className="bg-emerald-100/50 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-emerald-200/50 flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                        Active
                                    </div>
                                </div>

                                {/* Card Body */}
                                <div className="p-8">
                                    <div className="mb-8 p-6 rounded-xl bg-gradient-to-br from-brand-50 to-white border border-brand-100 relative overflow-hidden group/card-stat">
                                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover/card-stat:opacity-20 transition-opacity">
                                            <TrendingUp className="w-24 h-24 text-brand-900" />
                                        </div>

                                        <div className="text-xs text-brand-900/70 font-bold uppercase tracking-widest mb-2 flex items-center gap-2 font-heading">
                                            Projected Annual Savings
                                        </div>

                                        {isCalculating ? (
                                            <div className="h-14 w-full bg-slate-200/70 animate-pulse rounded-lg mb-1"></div>
                                        ) : (
                                            <div className="text-5xl font-bold tracking-tight text-brand-900 font-heading tabular-nums bg-clip-text text-transparent bg-gradient-to-r from-brand-900 to-brand-800">
                                                {formatCurrency(animatedSavings)}
                                            </div>
                                        )}

                                        <div className="mt-4 flex items-center gap-2 text-xs font-medium text-emerald-600 bg-emerald-50 w-fit px-2 py-1 rounded border border-emerald-100/50">
                                            <TrendingUp className="w-3 h-3" />
                                            <span>+15.3% retained earnings vs Sole Prop</span>
                                        </div>
                                    </div>

                                    {/* Detailed Breakdown */}
                                    <div className="space-y-5">
                                        <div className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors">
                                            <span className="text-slate-500 font-medium text-sm">Self-Employment Tax</span>
                                            {isCalculating ? (
                                                <div className="h-4 w-20 bg-slate-200 animate-pulse rounded"></div>
                                            ) : (
                                                <span className="font-bold text-red-400 line-through decoration-red-400/30 text-sm">
                                                    {result ? formatCurrency(result.oldTax) : "$0.00"}
                                                </span>
                                            )}
                                        </div>

                                        <div className="w-full h-px bg-slate-100"></div>

                                        <div className="flex items-center justify-between p-3 rounded-lg bg-gold-50/30 border border-gold-100/50">
                                            <span className="text-brand-900 font-bold text-sm">New Liability</span>
                                            {isCalculating ? (
                                                <div className="h-4 w-20 bg-slate-200 animate-pulse rounded"></div>
                                            ) : (
                                                <span className="font-bold text-brand-900 text-sm">
                                                    {result ? formatCurrency(result.newTax) : "$0.00"}
                                                </span>
                                            )}
                                        </div>

                                        {/* Progress Bar */}
                                        <div className="pt-2">
                                            <div className="flex justify-between text-[10px] uppercase font-bold text-slate-400 mb-1.5 tracking-wider">
                                                <span>Tax Efficiency Score</span>
                                                <span className={result ? "text-gold-600" : ""}>{result ? "92/100" : "0/100"}</span>
                                            </div>
                                            <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden shadow-inner">
                                                <div
                                                    className="h-full bg-gradient-to-r from-gold-400 to-gold-600 rounded-full transition-all duration-1000 ease-out relative"
                                                    style={{ width: result ? `${(result.newTax / result.oldTax) * 100}%` : '5%' }}
                                                >
                                                    <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <button className="w-full mt-8 py-4 rounded-lg font-bold text-sm transition-all shadow-sm flex items-center justify-center gap-2 bg-brand-900 text-white hover:bg-brand-800 hover:shadow-lg font-heading group ring-1 ring-white/10">
                                        View Full Analysis
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-gold-500" />
                                    </button>
                                </div>
                            </div>
                        </RevealOnScroll>
                    </div>
                </div>
            </div>

            {/* Video Modal */}
            {isVideoModalOpen && (
                <div
                    ref={modalRef}
                    className="fixed inset-0 z-[100] bg-brand-950/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Video Player"
                    onClick={() => setIsVideoModalOpen(false)}
                >
                    <div
                        className="relative w-full max-w-6xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 animate-in zoom-in-95 duration-300"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            ref={closeButtonRef}
                            onClick={() => setIsVideoModalOpen(false)}
                            aria-label="Close video"
                            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 text-white/70 hover:text-white hover:bg-black/70 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                        >
                            <X className="w-6 h-6" />
                        </button>
                        <VideoPlayer
                            src={modalVideoUrl || ""}
                            autoPlay
                            className="w-full h-full"
                            chapters={[
                                { id: '1', title: 'Introduction', startTime: 0, cta: { text: 'Book a Strategy Call', url: '/contact' } },
                                { id: '2', title: 'The S-Corp Strategy', startTime: 15 },
                                { id: '3', title: 'Calculating Savings', startTime: 45, cta: { text: 'Try Our Calculator', url: '#calculator' } },
                                { id: '4', title: 'Implementation', startTime: 90 },
                                { id: '5', title: 'Next Steps', startTime: 120, cta: { text: 'Get Started Today', url: '/contact' } }
                            ]}
                        />
                    </div>
                </div>
            )}
        </section>
    );
}
