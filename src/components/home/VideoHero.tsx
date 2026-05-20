"use client";

import { useState, useEffect, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { TrendingUp, Calculator, ArrowRight, CheckCircle2 } from "lucide-react";
import { useTaxCalculator, useCounter, formatCurrency } from "@/hooks/useTaxCalculator";
import { Link } from "@/i18n/navigation";

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
    const t = useTranslations('HomePage.VideoHero');
    const locale = useLocale();
    const [income, setIncome] = useState<string>("");
    const [showResult, setShowResult] = useState(false);
    const [inputError, setInputError] = useState(false);

    const calculationTimeoutRef = useRef<number | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    const { result, isCalculating } = useTaxCalculator({
        income,
        enabled: income.length > 0 && !showResult,
        delay: 600,
    });

    // Animated savings value
    const animatedSavings = useCounter({ end: result?.savings || 0, duration: 1500, start: showResult });

    const primaryCtaUrl = data?.heroCtaUrl || "/book";
    const videoUrl = data?.heroVideoUrl || "https://cdn.pixabay.com/video/2021/08/13/84918-588365261_large.mp4";

    // Set cinematic playback rate
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 0.6;
        }
    }, []);

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (calculationTimeoutRef.current) {
                window.clearTimeout(calculationTimeoutRef.current);
            }
        };
    }, []);

    const handleCalculate = () => {
        if (!income) return;

        if (calculationTimeoutRef.current) {
            window.clearTimeout(calculationTimeoutRef.current);
        }

        setShowResult(false);

        calculationTimeoutRef.current = window.setTimeout(() => {
            setShowResult(true);
            calculationTimeoutRef.current = null;
        }, 600);
    };

    const formatCurrencyLocal = (val: number) => formatCurrency(val, locale);

    // Mask input to only allow numbers and commas, then validate parsing
    const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value;
        // Only allow digits and commas
        const masked = raw.replace(/[^0-9,]/g, "");
        setIncome(masked);
        // Validate that parsing will succeed (non-empty and results in valid number)
        const parsed = parseFloat(masked.replace(/,/g, ""));
        setInputError(masked.length > 0 && (isNaN(parsed) || parsed <= 0));
    };

    return (
        <section
            className="relative w-full min-h-[90dvh] flex items-center pt-20 md:pt-24 pb-safe overflow-hidden bg-brand-900"
            aria-label={t('sectionAriaLabel')}
        >
            {/* Video Background */}
            <div className="absolute inset-0 w-full h-full z-0">
                {videoUrl && (
                    <video
                        ref={videoRef}
                        src={videoUrl}
                        className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale saturate-0"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        poster="https://cdn.pixabay.com/video/2021/08/13/84918-588365261_large.jpg"
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-brand-900/80 via-brand-900/60 to-brand-950"></div>
            </div>

            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-16 md:py-24">
                <div className="max-w-3xl mx-auto text-center">

                    {/* Eyebrow */}
                    <RevealOnScroll>
                        <div className="flex items-center justify-center gap-3 mb-6">
                            <span className="h-px w-8 bg-gold-500/70"></span>
                            <p className="text-xs md:text-sm font-bold uppercase tracking-[0.25em] text-gold-400 font-heading">
                                {t('eyebrow')}
                            </p>
                            <span className="h-px w-8 bg-gold-500/70"></span>
                        </div>
                    </RevealOnScroll>

                    {/* Headline */}
                    <RevealOnScroll delay={100}>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl leading-[1.1] font-bold font-heading tracking-tighter mb-6 text-white">
                            {data?.heroTitle ? (
                                <>
                                    {(() => {
                                        // Try split on period first, then on "Save" keyword
                                        const periodMatch = data.heroTitle.match(/^([^.]+)\.\s*(.*)$/);
                                        if (periodMatch) {
                                            return <>
                                                {periodMatch[1]}.
                                                <br />
                                                <span className="text-gold-500 italic">
                                                    {periodMatch[2]}
                                                </span>
                                            </>;
                                        }
                                        // Try split on "Save" keyword (case insensitive)
                                        const saveMatch = data.heroTitle.match(/^(.*?\b[Ss]ave[d]?\b)\s*(.*)$/);
                                        if (saveMatch) {
                                            return <>
                                                {saveMatch[1]}
                                                <br />
                                                <span className="text-gold-500 italic">
                                                    {saveMatch[2]}
                                                </span>
                                            </>;
                                        }
                                        // Fallback: split at midpoint
                                        const words = data.heroTitle.split(' ');
                                        const midpoint = Math.floor(words.length / 2);
                                        const first = words.slice(0, midpoint).join(' ');
                                        const second = words.slice(midpoint).join(' ');
                                        return <>
                                            {first}
                                            <br />
                                            <span className="text-gold-500 italic">
                                                {second}
                                            </span>
                                        </>;
                                    })()}
                                </>
                            ) : (
                                <>
                                    {t.rich('titlePart1', {
                                        gold: (chunks) => (
                                            <span className="text-gold-500 italic">{chunks}</span>
                                        )
                                    })}
                                </>
                            )}
                        </h1>
                    </RevealOnScroll>

                    {/* Subtitle */}
                    <RevealOnScroll delay={200}>
                        <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed font-sans max-w-2xl mx-auto">
                            {data?.heroSubtitle || t('subtitle')}
                        </p>
                    </RevealOnScroll>

                    {/* Calculator Card */}
                    <RevealOnScroll delay={300}>
                        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-2xl max-w-xl mx-auto border border-slate-100">
                            <label
                                htmlFor="hero-income-input"
                                className="block text-xs font-bold text-brand-900 uppercase tracking-widest mb-4 font-heading text-left"
                            >
                                {t('calculator.title')}
                            </label>

                            <form
                                className="flex flex-col sm:flex-row gap-3"
                                onSubmit={(e) => { e.preventDefault(); handleCalculate(); }}
                            >
                                <div className="relative flex-1 group/input">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-900/60 font-medium text-lg group-focus-within/input:text-gold-600 transition-colors">$</span>
                                    <input
                                        id="hero-income-input"
                                        type="text"
                                        inputMode="decimal"
                                        autoComplete="off"
                                        autoCorrect="off"
                                        spellCheck="false"
                                        placeholder={t('calculator.placeholder')}
                                        className={`w-full pl-9 pr-4 py-4 bg-slate-50 outline-none text-brand-900 font-bold text-base md:text-lg placeholder:text-slate-400 rounded-lg border transition-all font-sans min-h-[56px] ${inputError ? "border-red-500 focus:border-red-500 focus:ring-red-500/50" : "border-slate-200 focus:border-gold-500 focus:ring-1 focus:ring-gold-500/50"}`}
                                        value={income}
                                        onChange={handleIncomeChange}
                                    />
                                    {inputError && (
                                        <p className="mt-2 text-sm text-red-600 text-left">Please enter a valid income amount</p>
                                    )}
                                </div>
                                <button
                                    type="submit"
                                    disabled={isCalculating}
                                    className="px-8 py-4 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 group shadow-lg shadow-gold-500/20 bg-gold-500 text-brand-900 hover:bg-gold-400 hover:shadow-gold-500/30 font-heading tracking-wide active:scale-[0.98] disabled:opacity-70 disabled:cursor-wait whitespace-nowrap min-h-[56px] touch-target-pref"
                                >
                                    {isCalculating ? (
                                        <span className="flex items-center gap-2">
                                            <span className="w-4 h-4 border-2 border-brand-900/30 border-t-brand-900 rounded-full animate-spin"></span>
                                            {t('calculator.calculating')}
                                        </span>
                                    ) : (
                                        <>
                                            {t('calculator.button')}
                                            <Calculator className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </form>

                            {/* Result Display */}
                            {(showResult || isCalculating) && (
                                <div className="mt-6 p-5 bg-gradient-to-br from-brand-50 to-white border border-brand-100 rounded-xl">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-xs font-bold uppercase tracking-wider text-brand-900/70 font-heading">Estimated Tax Savings</span>
                                        <TrendingUp className="w-4 h-4 text-gold-600" />
                                    </div>

                                    {isCalculating ? (
                                        <div className="h-12 w-40 bg-slate-200/70 animate-pulse rounded-lg mx-auto"></div>
                                    ) : (
                                        <div className="text-4xl sm:text-5xl font-bold tracking-tight text-brand-900 font-heading tabular-nums text-center">
                                            {formatCurrencyLocal(animatedSavings)}
                                        </div>
                                    )}

                                    {!isCalculating && result && (
                                        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-center gap-2 text-sm text-emerald-600">
                                            <CheckCircle2 className="w-4 h-4" />
                                            <span className="font-medium">Verified S-Corp strategy available</span>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </RevealOnScroll>

                    {/* Primary CTA Button */}
                    <RevealOnScroll delay={400}>
                        <div className="mt-8">
                            <Link
                                href={primaryCtaUrl}
                                className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-gold-500 text-brand-900 font-black rounded-xl hover:bg-gold-400 transition-all text-lg shadow-xl shadow-gold-500/30 active:scale-[0.98] group"
                            >
                                {data?.heroCtaText || 'Book Your Free Strategy Call'}
                                <ArrowRight size={20} aria-hidden="true" className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <p className="mt-4 text-sm text-slate-400">Free 30-minute consultation • No obligation</p>
                        </div>
                    </RevealOnScroll>

                </div>
            </div>
        </section>
    );
}