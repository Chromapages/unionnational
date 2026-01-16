"use client";
import { motion } from "framer-motion";
import { HardHat, TrendingUp, ShieldCheck, Play, ChevronRight } from "lucide-react";
import Link from "next/link";

// Animation Variants
const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2,
        },
    },
};

// Value Prop Card Component
interface ValuePropCardProps {
    icon: React.ElementType;
    title: string;
    description: string;
    delay?: number;
}

const ValuePropCard = ({ icon: Icon, title, description, delay = 0 }: ValuePropCardProps) => (
    <motion.div
        variants={fadeInUp}
        className="group relative bg-white/70 backdrop-blur-md border border-slate-200/50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
        {/* Decorative accent */}
        <div className="absolute top-0 left-6 w-12 h-1 bg-gradient-to-r from-gold-400 to-gold-600 rounded-full" />

        <div className="w-14 h-14 rounded-xl bg-brand-900 text-gold-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
            <Icon className="w-7 h-7" />
        </div>
        <h3 className="text-xl font-bold text-brand-900 mb-2 font-heading">{title}</h3>
        <p className="text-slate-600 leading-relaxed">{description}</p>
    </motion.div>
);

export default function ConstructionVSLClient() {
    // Get current month dynamically
    const currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });

    return (
        <>
            {/* ===== HERO SECTION ===== */}
            <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20">
                {/* Background Elements */}
                <div className="absolute inset-0 bg-gradient-to-b from-brand-900 via-brand-900 to-brand-800" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gold-500/5 rounded-full blur-3xl" />

                {/* Top Badge */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative z-10 mb-8"
                >
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-sm font-bold uppercase tracking-widest">
                        <span className="w-2 h-2 bg-gold-400 rounded-full animate-pulse" />
                        Limited Partner Program
                    </span>
                </motion.div>

                {/* Headline */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    className="relative z-10 text-center max-w-5xl mx-auto mb-8"
                >
                    <motion.h1
                        variants={fadeInUp}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4 font-heading"
                    >
                        Stop Bleeding Cash on{" "}
                        <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                            Job Costing & Labor.
                        </span>
                    </motion.h1>
                    <motion.p
                        variants={fadeInUp}
                        className="text-lg sm:text-xl md:text-2xl text-brand-100/70 max-w-3xl mx-auto leading-relaxed"
                    >
                        The <span className="text-gold-400 font-semibold">"Hybrid CFO + COO"</span> Model used by elite construction firms to fix margins and automate operations.
                    </motion.p>
                </motion.div>

                {/* Video Container */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="relative z-10 w-full max-w-4xl mx-auto mb-10"
                >
                    <div className="relative aspect-video bg-brand-800 rounded-2xl overflow-hidden border border-brand-700/50 shadow-[0_0_60px_rgba(16,185,129,0.15)]">
                        {/* Video Placeholder */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-brand-800 to-brand-900">
                            {/* Play Button */}
                            <button
                                className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gold-500 text-brand-900 flex items-center justify-center hover:bg-gold-400 hover:scale-110 transition-all duration-300 shadow-lg shadow-gold-500/30"
                                aria-label="Play Video"
                            >
                                <Play className="w-8 h-8 md:w-10 md:h-10 ml-1" fill="currentColor" />
                            </button>
                            <p className="mt-4 text-brand-300 text-sm font-medium">Watch the 5-Minute Breakdown</p>
                        </div>

                        {/* Corner Accents (Blueprint aesthetic) */}
                        <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-gold-500/30" />
                        <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-gold-500/30" />
                        <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-gold-500/30" />
                        <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-gold-500/30" />
                    </div>
                </motion.div>

                {/* CTA Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="relative z-10 text-center"
                >
                    <Link
                        href="/construction/apply"
                        className="group inline-flex items-center gap-3 px-8 py-5 md:px-12 md:py-6 bg-emerald-500 text-brand-900 font-bold text-lg md:text-xl rounded-full hover:bg-emerald-400 hover:scale-105 transition-all duration-300 shadow-lg shadow-emerald-500/30"
                    >
                        See If Your Business Qualifies
                        <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    {/* Scarcity Indicator */}
                    <div className="mt-6 flex items-center justify-center gap-2 text-sm text-brand-200">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                        </span>
                        <span>Only <span className="font-bold text-white">3 Partner Spots</span> Remaining for {currentMonth}</span>
                    </div>
                </motion.div>
            </section>

            {/* ===== VALUE PROPS SECTION ===== */}
            <section className="relative py-20 md:py-32 px-6 bg-slate-50">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-50" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23D4AF37\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />

                <div className="relative max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <span className="text-gold-600 font-bold text-sm uppercase tracking-widest mb-4 block">What You Get</span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-900 font-heading">
                            The Complete Financial Command Center
                        </h2>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
                    >
                        <ValuePropCard
                            icon={HardHat}
                            title="Fix Job Costing"
                            description="Know your true profit on every project. No more guessing, no more profit leaks."
                        />
                        <ValuePropCard
                            icon={TrendingUp}
                            title="Boost Net Margins"
                            description="Our clients see 15-25% margin improvements within the first 90 days."
                        />
                        <ValuePropCard
                            icon={ShieldCheck}
                            title="IRS Audit Guard Included"
                            description="Sleep easy knowing your books are bulletproof. Audit defense included."
                        />
                    </motion.div>
                </div>
            </section>

            {/* ===== FINAL CTA SECTION ===== */}
            <section className="relative py-20 md:py-32 px-6 bg-brand-900">
                <div className="absolute inset-0 bg-gradient-to-t from-brand-900 to-brand-800" />
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative max-w-3xl mx-auto text-center"
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 font-heading">
                        Ready to Stop the Cash Bleed?
                    </h2>
                    <p className="text-lg md:text-xl text-brand-200 mb-10 leading-relaxed">
                        Join the elite construction firms that have taken control of their finances. Limited spots available.
                    </p>
                    <Link
                        href="/construction/apply"
                        className="group inline-flex items-center gap-3 px-10 py-5 md:px-14 md:py-6 bg-gold-500 text-brand-900 font-bold text-lg md:text-xl rounded-full hover:bg-gold-400 hover:scale-105 transition-all duration-300 shadow-lg shadow-gold-500/30"
                    >
                        Apply for Partner Program
                        <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>
            </section>
        </>
    );
}
