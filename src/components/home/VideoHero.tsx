"use client";

import { useState, useEffect, useRef } from "react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { TrendingUp, Calculator, Play, X } from "lucide-react";
import Hls from "hls.js";

export function VideoHero() {
    const [income, setIncome] = useState<string>("");
    const [result, setResult] = useState<{
        savings: number;
        oldTax: number;
        newTax: number;
    } | null>(null);
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

    const videoRef = useRef<HTMLVideoElement>(null);
    const modalVideoRef = useRef<HTMLVideoElement>(null);

    const hlsUrl = "https://content.apisystem.tech/hls/medias/N5KQjySifAxlxhrrvY8g/media/transcoded_videos/cts-ce33eacf939007ad_,360,480,720,1080,p.mp4.urlset/master.m3u8";

    // Background video HLS
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        if (Hls.isSupported()) {
            const hls = new Hls({ enableWorker: true, lowLatencyMode: true });
            hls.loadSource(hlsUrl);
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                video.play().catch(() => { });
            });
            return () => hls.destroy();
        } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
            video.src = hlsUrl;
            video.addEventListener("loadedmetadata", () => {
                video.play().catch(() => { });
            });
        }
    }, []);

    // Modal video HLS
    useEffect(() => {
        if (!isVideoModalOpen) return;
        const video = modalVideoRef.current;
        if (!video) return;

        let hls: Hls;
        if (Hls.isSupported()) {
            hls = new Hls({ enableWorker: true, lowLatencyMode: true });
            hls.loadSource(hlsUrl);
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                video.play().catch(() => { });
            });
        } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
            video.src = hlsUrl;
            video.addEventListener("loadedmetadata", () => {
                video.play().catch(() => { });
            });
        }
        return () => { if (hls) hls.destroy(); };
    }, [isVideoModalOpen]);

    // Close modal on Escape
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsVideoModalOpen(false);
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, []);

    const handleCalculate = () => {
        const netIncome = parseFloat(income.replace(/,/g, "")) || 0;

        // Simple Estimation Logic
        // 1. Sole Prop SE Tax = 15.3% of Net Income
        const oldTax = netIncome * 0.153;

        // 2. S-Corp Strategy
        // Assumption: Reasonable Salary is ~40% of Net Income (or min $40k if income supports it)
        // This is a marketing estimate, not exact tax advice.
        let salary = netIncome * 0.4;
        if (salary < 40000 && netIncome > 40000) salary = 40000;
        if (netIncome < 40000) salary = netIncome; // No benefit if income is low

        const newTax = salary * 0.153; // SE Tax is only on salary
        const savings = oldTax - newTax;

        setResult({
            savings: Math.max(0, savings),
            oldTax,
            newTax
        });
    };

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
        }).format(val);
    };

    return (
        <section className="relative w-full pt-32 pb-12 mb-0 min-h-[90vh] flex items-center">
            {/* Video Background */}
            <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
                <video
                    ref={videoRef}
                    className="absolute inset-0 w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                />
                {/* Dark Overlay for text readability - Solid Midnight Forest */}
                <div className="absolute inset-0 bg-brand-900/90"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left Content */}
                    <RevealOnScroll>
                        <h1
                            className="text-5xl sm:text-6xl lg:text-[4.5rem] leading-[1.1] font-bold font-heading tracking-tight mb-8 text-white drop-shadow-lg"
                        >
                            Stop Overpaying the IRS. <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-500">We build wealth.</span>
                        </h1>
                        <p className="text-lg text-slate-200 mb-10 leading-relaxed font-sans max-w-xl font-light">
                            Boutique S-Corp specialists and Fractional CFO services for contractors and business owners. Don't just file forms—install a financial system.
                        </p>

                        {/* S-Corp Calculator - Material Card */}
                        <div
                            className="p-1 rounded-md mb-12 relative overflow-hidden group"
                            style={{ maxWidth: '30rem' }}
                        >
                            <div className="relative bg-white border border-slate-200 rounded-md p-6 shadow-sm hover:shadow-md transition-shadow">
                                <label className="block text-xs font-bold text-brand-900 uppercase tracking-widest mb-3 font-heading">Estimate Your Savings</label>
                                <form className="flex items-center gap-3" onSubmit={(e) => { e.preventDefault(); handleCalculate(); }}>
                                    <div className="relative flex-1 group/input">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-900/60 font-medium group-focus-within/input:text-gold-500">$</span>
                                        <input
                                            type="number"
                                            placeholder="Enter Annual Net Income"
                                            className="w-full pl-8 pr-4 py-3.5 bg-white outline-none text-brand-900 font-medium placeholder:text-brand-900/60 rounded-md border border-slate-300 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-all font-sans"
                                            value={income}
                                            onChange={(e) => setIncome(e.target.value)}
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="px-6 py-3.5 rounded-md text-sm font-bold transition-all flex items-center gap-2 group shadow-sm bg-gold-500 text-brand-900 hover:bg-gold-600 font-heading tracking-wide active:scale-95"
                                    >
                                        Calculate
                                        <Calculator className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Watch Video Button */}
                        <button
                            onClick={() => setIsVideoModalOpen(true)}
                            className="bg-transparent border border-white/30 text-white px-8 py-4 rounded-md text-sm font-bold hover:bg-white/10 transition-all flex items-center gap-3 font-heading tracking-wide group"
                        >
                            <div className="w-8 h-8 rounded-full bg-gold-500 flex items-center justify-center text-brand-900 group-hover:scale-110 transition-transform shadow-sm">
                                <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                            </div>
                            Watch 2 Min Intro
                        </button>
                    </RevealOnScroll>

                    {/* Right Visual: Financial Fortress/Dashboard */}
                    <RevealOnScroll className="relative flex items-center justify-center lg:justify-end h-[500px] sm:h-[600px]">
                        {/* Dashboard Card */}
                        <div
                            className="relative z-10 rounded-md shadow-2xl p-6"
                            style={{
                                backgroundColor: 'white',
                                width: '380px',
                                border: '1px solid #e2e8f0',
                                transform: 'perspective(1000px) rotateY(-5deg) rotateX(2deg)',
                                transition: 'transform 0.5s ease-out',
                                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                            }}
                        >
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs bg-brand-900 font-bold"
                                    >
                                        JA
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-brand-900 font-heading">Jason Astwood, EA</div>
                                        <div className="text-xs text-brand-900/60 font-sans font-medium">Union National Tax</div>
                                    </div>
                                </div>
                                <div
                                    className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md font-heading"
                                    style={{ backgroundColor: '#f0fdf4', color: '#15803d' }}
                                >
                                    Active
                                </div>
                            </div>

                            <div className="mb-8 p-5 rounded-md bg-slate-50 border border-slate-100">
                                <div className="text-xs text-brand-900 font-bold uppercase tracking-wider mb-2 flex items-center gap-2 font-heading">
                                    <TrendingUp className="w-4 h-4 text-gold-600" />
                                    Potential Tax Savings
                                </div>
                                <div className="text-4xl font-bold tracking-tight text-brand-900 font-heading">
                                    {result ? formatCurrency(result.savings) : "$0.00"}
                                </div>
                                <div className="text-xs text-brand-900/60 mt-2 font-sans font-medium">Verified S-Corp Strategy</div>
                            </div>

                            <div className="space-y-4 mb-8">
                                <div className="flex items-center justify-between text-sm font-sans">
                                    <span className="text-brand-900 font-medium">Self-Employment Tax</span>
                                    <span className="font-bold text-red-500 line-through decoration-red-500/30">
                                        {result ? formatCurrency(result.oldTax) : "$0.00"}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-sm font-sans">
                                    <span className="text-brand-900 font-medium">New Liability</span>
                                    <span className="font-bold text-brand-600">
                                        {result ? formatCurrency(result.newTax) : "$0.00"}
                                    </span>
                                </div>
                                <div className="w-full h-2 rounded-full mt-2 overflow-hidden bg-slate-100">
                                    <div className="h-full bg-gold-500 rounded-full transition-all duration-1000" style={{ width: result ? `${(result.newTax / result.oldTax) * 100}%` : '0%' }} />
                                </div>
                            </div>

                            <button
                                className="w-full py-3.5 rounded-md font-bold text-sm transition-all shadow-sm flex items-center justify-center gap-2 bg-brand-900 text-white hover:bg-brand-800 hover:shadow-md font-heading"
                            >
                                View Strategy Report
                            </button>
                        </div>


                    </RevealOnScroll>
                </div>
            </div>

            {/* Video Modal */}
            {isVideoModalOpen && (
                <div
                    className="fixed inset-0 z-[100] bg-brand-950/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
                    onClick={() => setIsVideoModalOpen(false)}
                >
                    <div
                        className="relative w-full max-w-6xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setIsVideoModalOpen(false)}
                            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 text-white/70 hover:text-white hover:bg-black/70 transition-all"
                        >
                            <X className="w-6 h-6" />
                        </button>
                        <video
                            ref={modalVideoRef}
                            className="w-full h-full object-contain"
                            controls
                            autoPlay
                            playsInline
                        />
                    </div>
                </div>
            )}
        </section>
    );
}
