"use client";

import { useState, useEffect, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { TrendingUp, Calculator, ArrowRight, CheckCircle2 } from "lucide-react";
import { useTaxCalculator, useCounter, formatCurrency } from "@/hooks/useTaxCalculator";
import { Link } from "@/i18n/navigation";
import { HeroVideoPlayer } from "@/components/home/HeroVideoPlayer";

interface VideoHeroProps {
    data?: {
        heroTitle?: string;
        heroSubtitle?: string;
        heroVideoUrl?: string;
        heroPlayerVideoUrl?: string;
        heroPlayerPosterUrl?: string;
        heroCtaText?: string;
        heroCtaUrl?: string;
        // Stats surfaced from lower on page
        heroStats?: Array<{ value: string; label: string }>;
    };
}

export const VideoHero = ({ data }: VideoHeroProps): React.JSX.Element => {
    const t = useTranslations('HomePage.VideoHero');
    const locale = useLocale();
    const [income, setIncome] = useState<string>("");
    const [showResult, setShowResult] = useState(false);
    const [inputError, setInputError] = useState(false);

    const { result, isCalculating } = useTaxCalculator({
        income,
        enabled: showResult && !inputError,
        delay: 600,
    });

    // Animated savings value
    const animatedSavings = useCounter({ end: result?.savings || 0, duration: 1500, start: showResult });

    const primaryCtaUrl = data?.heroCtaUrl || "/book";
    const backgroundVideoUrl = data?.heroVideoUrl;
    const playerVideoUrl = data?.heroPlayerVideoUrl || backgroundVideoUrl;
    const videoRef = useRef<HTMLVideoElement>(null);

    // Set cinematic playback rate on the background video
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 0.6;
        }
    }, []);

    // Stats surfaced from lower on page — defaulting to verified numbers
    // TODO (content): Replace with real values from CMS if different
    const heroStats = data?.heroStats?.length
        ? data.heroStats
        : [
              { value: "$23,420", label: "Avg. Annual Savings" },
              { value: "200+", label: "Contractors Served" },
          ];

    const handleCalculate = () => {
        if (!income) return;
        if (inputError) return;
        setShowResult(true);
    };

    const formatCurrencyLocal = (val: number) => formatCurrency(val, locale);

    const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value;
        const masked = raw.replace(/[^0-9,\.]/g, "");
        setIncome(masked);
        const parsed = parseFloat(masked.replace(/,/g, ""));
        setInputError(masked.length > 0 && (isNaN(parsed) || parsed <= 0));
        setShowResult(false);
    };

    return (
        <section
            className="relative w-full min-h-[85dvh] flex items-center pt-20 md:pt-24 pb-12 lg:pb-16 overflow-hidden bg-brand-900"
            aria-label={t('sectionAriaLabel')}
        >
            {/* Video background — plays muted/looped as ambient texture, no user interaction */}
            <div className="absolute inset-0 w-full h-full z-0">
                {backgroundVideoUrl && (
                    <video
                        ref={videoRef}
                        src={backgroundVideoUrl}
                        className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale saturate-0"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                    />
                )}
                {/* Gradient overlay so content stays legible over the video */}
                <div className="absolute inset-0 bg-gradient-to-b from-brand-900/80 via-brand-900/60 to-brand-950" />
            </div>

            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                <div className={playerVideoUrl ? "grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(420px,1.05fr)] lg:items-center xl:gap-14" : undefined}>
                    <div className="max-w-2xl mx-auto lg:mx-0">

                    {/* Eyebrow */}
                    <RevealOnScroll>
                        <div className="flex items-center gap-3 mb-6">
                            <span className="h-px w-8 bg-gold-500/70"></span>
                            <p className="home-eyebrow text-gold-400">
                                {t('eyebrow')}
                            </p>
                            <span className="h-px w-8 bg-gold-500/70"></span>
                        </div>
                    </RevealOnScroll>

                    {/* Headline — references contractors/construction/real estate */}
                    <RevealOnScroll delay={100}>
                        <h1 className="home-hero-heading mb-4 text-white">
                            {data?.heroTitle ? (
                                <>
                                    {(() => {
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
                                    Stop Overpaying the IRS.<br />
                                    <span className="text-gold-500 italic">
                                        Built for Contractors, Real Estate &amp; Business Owners.
                                    </span>
                                </>
                            )}
                        </h1>
                    </RevealOnScroll>

                    {/* Stat line — surfaced from lower on page */}
                    <RevealOnScroll delay={150}>
                        <div className="flex flex-wrap items-center gap-6 mb-8">
                            {heroStats.map((stat, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <span className="text-2xl font-black text-gold-400 font-heading tabular-nums">
                                        {stat.value}
                                    </span>
                                    <span className="text-sm text-slate-400 font-sans">
                                        {stat.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </RevealOnScroll>

                    {/* Subtitle */}
                    <RevealOnScroll delay={200}>
                            <p className="home-supporting-copy mb-10 text-slate-300">
                            {data?.heroSubtitle || t('subtitle')}
                        </p>
                    </RevealOnScroll>

                    {/* Calculator Card */}
                    <RevealOnScroll delay={300}>
                        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-2xl border border-slate-100 max-w-xl">
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
                                        maxLength={16}
                                        placeholder={t('calculator.placeholder')}
                                        aria-invalid={inputError ? 'true' : undefined}
                                        aria-describedby={inputError ? 'hero-income-error' : undefined}
                                        className={`w-full pl-9 pr-4 py-4 bg-slate-50 outline-none text-brand-900 font-bold text-base md:text-lg placeholder:text-slate-400 rounded-lg border transition-all font-sans min-h-[56px] ${inputError ? "border-red-500 focus:border-red-500 focus:ring-red-500/50" : "border-slate-200 focus:border-gold-500 focus:ring-1 focus:ring-gold-500/50"}`}
                                        value={income}
                                        onChange={handleIncomeChange}
                                    />
                                    {inputError && (
                                        <p id="hero-income-error" role="alert" className="mt-2 text-sm text-red-600 text-left">{t("calculator.invalidIncome")}</p>
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
                                <div
                                    aria-live="polite"
                                    aria-atomic="true"
                                    aria-label={t("result.estimatedTaxSavings")}
                                    className="mt-6 p-5 bg-gradient-to-br from-brand-50 to-white border border-brand-100 rounded-xl"
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-xs font-bold uppercase tracking-wider text-brand-900/70 font-heading">{t("result.estimatedTaxSavings")}</span>
                                        <TrendingUp className="w-4 h-4 text-gold-600" />
                                    </div>

                                    {isCalculating ? (
                                        <div aria-busy="true" className="h-12 w-40 bg-slate-200/70 animate-pulse rounded-lg mx-auto"></div>
                                    ) : (
                                        <div className="text-4xl sm:text-5xl font-bold tracking-tight text-brand-900 font-heading tabular-nums text-center">
                                            {formatCurrencyLocal(animatedSavings)}
                                        </div>
                                    )}

                                    {!isCalculating && result && (
                                        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-center gap-2 text-sm text-emerald-600">
                                            <CheckCircle2 className="w-4 h-4" />
                                            <span className="font-medium">{t("result.verifiedStrategy")}</span>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </RevealOnScroll>

                    {/* Primary CTA — centered */}
                    <RevealOnScroll delay={400}>
                        <div className="mt-10 flex max-w-xl flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
                            <Link
                                href={primaryCtaUrl}
                                className="home-hero-primary-cta group inline-flex min-h-[52px] self-start items-center justify-center gap-2.5 whitespace-nowrap rounded-lg border border-gold-400/40 bg-gold-500 px-6 py-3.5 text-base text-brand-950 shadow-md transition-[transform,background-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:bg-gold-600 hover:shadow-lg active:translate-y-0 active:bg-gold-700 active:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-200 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-900 motion-reduce:transform-none motion-reduce:transition-none"
                            >
                                {data?.heroCtaText || t("primaryCta")}
                                <ArrowRight aria-hidden="true" className="h-[1.125rem] w-[1.125rem] shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transform-none motion-reduce:transition-none" />
                            </Link>
                            <p className="text-sm text-slate-400 text-center sm:text-left">
                                {t("primaryCtaNote")}
                            </p>
                        </div>
                    </RevealOnScroll>

                    </div>

                    {playerVideoUrl && (
                        <RevealOnScroll delay={250} className="mx-auto w-full max-w-xl lg:max-w-none">
                            <HeroVideoPlayer
                                src={playerVideoUrl}
                                poster={data?.heroPlayerPosterUrl}
                                ariaLabel={t("playerAriaLabel")}
                                unavailableMessage={t("playerUnavailable")}
                            />
                        </RevealOnScroll>
                    )}
                </div>
            </div>
        </section>
    );
}
