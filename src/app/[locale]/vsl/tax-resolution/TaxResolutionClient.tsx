"use client";

import { motion } from "framer-motion";
import { ShieldAlert, Scale, Clock, FileWarning, DollarSign, Phone, ArrowRight, Check, Play, ChevronRight } from "lucide-react";
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
}

const ValuePropCard = ({ icon: Icon, title, description }: ValuePropCardProps) => (
    <motion.div
        variants={fadeInUp}
        className="group relative bg-white/70 backdrop-blur-md border border-slate-200/50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
        <div className="absolute top-0 left-6 w-12 h-1 bg-gradient-to-r from-red-400 to-red-600 rounded-full" />
        <div className="w-14 h-14 rounded-xl bg-brand-900 text-red-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
            <Icon className="w-7 h-7" />
        </div>
        <h3 className="text-xl font-bold text-brand-900 mb-2 font-heading">{title}</h3>
        <p className="text-slate-600 leading-relaxed">{description}</p>
    </motion.div>
);

interface TaxResolutionClientProps {
    data?: any;
    locale?: string;
}

export default function TaxResolutionClient({ data, locale }: TaxResolutionClientProps = {}) {
    const valueProps = [
        { icon: Scale, title: "Offer in Compromise", description: "Settle your tax debt for less than you owe. We negotiate with the IRS to get the best possible settlement." },
        { icon: Clock, title: "Installment Agreements", description: "Set up affordable monthly payment plans that fit your budget and get you back on track." },
        { icon: FileWarning, title: "Penalty Abatement", description: "Remove or reduce IRS penalties that have accumulated over time due to hardship or reasonable cause." },
        { icon: DollarSign, title: "Currently Not Collectible", description: "Temporarily stop collections if you're experiencing financial hardship." }
    ];

    const problems = [
        "IRS audits and examinations",
        "Unpaid tax bills ($10k - $500k+)",
        "Tax liens and levies",
        "Wage garnishment",
        "Bank account levies",
        "Inability to pay"
    ];

    return (
        <>
            {/* ===== HERO SECTION ===== */}
            <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20">
                {/* Background Elements */}
                <div className="absolute inset-0 bg-gradient-to-b from-brand-900 via-brand-900 to-brand-800" />
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold-500/10 rounded-full blur-3xl" />

                {/* Top Badge */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative z-10 mb-8"
                >
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-bold uppercase tracking-widest">
                        <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                        IRS Tax Resolution
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
                        Get Relief From Your Tax Problems
                    </motion.h1>
                    <motion.p
                        variants={fadeInUp}
                        className="text-lg sm:text-xl md:text-2xl text-brand-100/70 max-w-3xl mx-auto leading-relaxed"
                    >
                        We negotiate with the IRS on your behalf to reduce, settle, or eliminate your tax debt. As Enrolled Agents, we can represent you before the IRS.
                    </motion.p>
                </motion.div>

                {/* Video Container */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="relative z-10 w-full max-w-4xl mx-auto mb-12"
                >
                    <div className="aspect-video bg-black/50 rounded-xl flex items-center justify-center border border-white/10">
                        <div className="text-center">
                            <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-4 cursor-pointer hover:bg-red-500/30 transition-colors">
                                <Play className="w-8 h-8 text-red-400 ml-1" />
                            </div>
                            <p className="text-white/50">Video Placeholder</p>
                        </div>
                    </div>
                </motion.div>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="relative z-10 flex flex-col sm:flex-row items-center gap-4"
                >
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gold-500 text-brand-900 font-bold text-lg hover:bg-gold-400 transition-all shadow-lg shadow-gold-500/20 group"
                    >
                        Get Free Consultation
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <a
                        href="tel:+1-800-555-0199"
                        className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white/10 text-white font-bold text-lg hover:bg-white/20 transition-all border border-white/20"
                    >
                        <Phone className="w-5 h-5" />
                        Call Now
                    </a>
                </motion.div>
            </section>

            {/* ===== PROBLEMS WE SOLVE ===== */}
            <section className="bg-white py-20">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-900 font-heading">
                            We Solve IRS Tax Problems
                        </h2>
                        <p className="text-slate-600 mt-4">Don't let tax debt control your life.</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
                        {problems.map((problem, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-center gap-3 bg-slate-50 rounded-xl p-4 border border-slate-200"
                            >
                                <FileWarning className="w-5 h-5 text-red-500 flex-shrink-0" />
                                <span className="text-brand-900 font-medium">{problem}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== VALUE PROPS SECTION ===== */}
            <section className="bg-slate-50 py-20 relative overflow-hidden">
                <div className="absolute inset-0 opacity-50" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23D4AF37\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="text-red-600 font-bold text-sm uppercase tracking-widest mb-4 block">Our Solutions</span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-900 font-heading">
                            Our Resolution Options
                        </h2>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
                    >
                        {valueProps.map((prop, index) => (
                            <ValuePropCard
                                key={index}
                                icon={prop.icon}
                                title={prop.title}
                                description={prop.description}
                            />
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ===== RESULTS ===== */}
            <section className="bg-gradient-to-r from-red-600 to-red-700 py-20">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-heading">
                            What Our Clients Achieve
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                        {[
                            "Average debt reduction: 40-60%",
                            "Most cases resolved in 3-6 months",
                            "Stop wage garnishment immediately",
                            "Remove tax liens from credit"
                        ].map((result, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white/20 backdrop-blur rounded-2xl p-6 text-center"
                            >
                                <p className="text-white font-bold text-lg">{result}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== CTA SECTION ===== */}
            <section className="bg-brand-900 py-20 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-500 rounded-full blur-3xl" />
                </div>
                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 font-heading">
                            Ready to Get Relief?
                        </h2>
                        <p className="text-brand-100/70 text-lg mb-8">
                            Get a free consultation and find out how we can help
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-gold-500 text-brand-900 font-bold text-xl hover:bg-gold-400 transition-all shadow-lg shadow-gold-500/20 group"
                        >
                            Get Started Now
                            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </div>
            </section>
        </>
    );
}
