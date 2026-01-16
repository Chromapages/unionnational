"use client";
import { motion } from "framer-motion";
import { Play, ChevronRight, CheckCircle2, Quote, ArrowRight, ShieldCheck, Clock, BarChart3 } from "lucide-react";
import Link from "next/link";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import * as Icons from "lucide-react";

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

// Dynamic Icon Component
const DynamicIcon = ({ name, className }: { name: string; className?: string }) => {
    const Icon = (Icons as any)[name] || Icons.Briefcase;
    return <Icon className={className} />;
};

// Value Prop Card Component
interface ValuePropCardProps {
    title: string;
    index: number;
}

const ValuePropCard = ({ title, index }: ValuePropCardProps) => (
    <motion.div
        variants={fadeInUp}
        className="group relative bg-white/70 backdrop-blur-md border border-slate-200/50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
        {/* Decorative accent */}
        <div className="absolute top-0 left-6 w-12 h-1 bg-gradient-to-r from-gold-400 to-gold-600 rounded-full" />

        <div className="w-14 h-14 rounded-xl bg-brand-900 text-gold-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
            <CheckCircle2 className="w-7 h-7" />
        </div>
        <h3 className="text-xl font-bold text-brand-900 mb-2 font-heading">{title}</h3>
        <p className="text-slate-600 leading-relaxed">Comprehensive execution and support included in your monthly plan.</p>
    </motion.div>
);

interface ServiceDetailClientProps {
    service: any;
    relatedServices: any[];
}

export default function ServiceDetailClient({ service, relatedServices }: ServiceDetailClientProps) {
    // Get current month dynamically for scarcity
    const currentMonth = new Date().toLocaleString('default', { month: 'long' });

    return (
        <>
            {/* ===== HERO SECTION ===== */}
            <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 py-32 bg-brand-900 overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0 bg-gradient-to-b from-brand-900 via-brand-900 to-brand-800" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />

                {/* Content Container */}
                <div className="relative z-10 max-w-5xl mx-auto text-center w-full">

                    {/* Badge */}
                    {service.badge && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="mb-8 flex justify-center"
                        >
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-sm font-bold uppercase tracking-widest">
                                <span className="w-2 h-2 bg-gold-400 rounded-full animate-pulse" />
                                {service.badge}
                            </span>
                        </motion.div>
                    )}

                    {/* Headline */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="mb-12"
                    >
                        <motion.h1
                            variants={fadeInUp}
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 font-heading"
                        >
                            {service.title}
                        </motion.h1>
                        <motion.p
                            variants={fadeInUp}
                            className="text-lg sm:text-xl md:text-2xl text-brand-100/70 max-w-3xl mx-auto leading-relaxed"
                        >
                            {service.shortDescription}
                        </motion.p>
                    </motion.div>

                    {/* Video Container (The VSL Element) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="relative w-full max-w-4xl mx-auto mb-12"
                    >
                        <div className="relative aspect-video bg-brand-800 rounded-2xl overflow-hidden border border-brand-700/50 shadow-[0_0_60px_rgba(212,175,55,0.15)] group cursor-pointer hover:border-gold-500/30 transition-colors">
                            {/* Video Placeholder */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-brand-800 to-brand-900 group-hover:scale-105 transition-transform duration-700">
                                {/* Play Button */}
                                <div
                                    className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gold-500 text-brand-900 flex items-center justify-center group-hover:bg-gold-400 group-hover:scale-110 transition-all duration-300 shadow-lg shadow-gold-500/30 z-20"
                                >
                                    <Play className="w-8 h-8 md:w-10 md:h-10 ml-1" fill="currentColor" />
                                </div>
                                <p className="mt-6 text-brand-300 text-sm font-medium z-20 uppercase tracking-widest">Watch: How It Works</p>

                                {/* Background Icon Faded */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-5">
                                    <DynamicIcon name={service.icon} className="w-64 h-64 text-white" />
                                </div>
                            </div>

                            {/* Corner Accents */}
                            <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-gold-500/30" />
                            <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-gold-500/30" />
                            <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-gold-500/30" />
                            <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-gold-500/30" />
                        </div>
                    </motion.div>

                    {/* Primary CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                    >
                        <Link
                            href="/contact"
                            className="group inline-flex items-center gap-3 px-10 py-5 bg-gold-500 text-brand-900 font-bold text-lg md:text-xl rounded-full hover:bg-gold-400 hover:scale-105 transition-all duration-300 shadow-lg shadow-gold-500/30"
                        >
                            Schedule Your Strategy Session
                            <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                        </Link>

                        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-brand-300">
                            <ShieldCheck className="w-4 h-4 text-emerald-400" />
                            <span>100% Satisfaction Guarantee</span>
                            <span className="mx-2 text-brand-700">|</span>
                            <span>Limited Spots for {currentMonth}</span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ===== VALUE PROPS SECTION ===== */}
            <section className="relative py-24 px-6 bg-slate-50">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <span className="text-gold-600 font-bold text-sm uppercase tracking-widest mb-4 block">Included Features</span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-900 font-heading">
                            Everything You Need to Scale
                        </h2>
                    </motion.div>

                    {/* Features Grid */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {service.features?.map((feature: string, i: number) => (
                            <ValuePropCard key={i} title={feature} index={i} />
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ===== SOCIAL PROOF SECTION ===== */}
            <section className="relative py-24 px-6 bg-white overflow-hidden">
                <RevealOnScroll className="max-w-5xl mx-auto relative z-10 text-center">
                    <Quote className="w-16 h-16 text-gold-500/20 mx-auto mb-8" />
                    <blockquote className="text-3xl md:text-4xl font-bold text-brand-900 leading-tight mb-10 font-heading">
                        "This service completely transformed our financial operations. We finally have clarity and confidence in our numbers."
                    </blockquote>
                    <div className="flex items-center justify-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-brand-900 flex items-center justify-center text-white font-bold text-sm">
                            UN
                        </div>
                        <div className="text-left">
                            <div className="font-bold text-brand-900">Trusted Client</div>
                            <div className="text-sm text-slate-500">Business Owner</div>
                        </div>
                    </div>
                </RevealOnScroll>
            </section>

            {/* ===== FINAL CTA SECTION ===== */}
            <section className="relative py-24 px-6 bg-brand-900">
                <div className="absolute inset-0 bg-gradient-to-t from-brand-900 to-brand-800" />
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative max-w-4xl mx-auto text-center"
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 font-heading">
                        Ready to Optimize Your {service.title}?
                    </h2>
                    <p className="text-lg md:text-xl text-brand-200 mb-10 leading-relaxed max-w-2xl mx-auto">
                        Stop guessing with your finances. Get the professional support you need to grow your business with confidence.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/contact"
                            className="w-full sm:w-auto px-10 py-5 bg-gold-500 text-brand-900 font-bold text-lg rounded-full hover:bg-gold-400 hover:scale-105 transition-all duration-300 shadow-lg shadow-gold-500/30 flex items-center justify-center gap-2"
                        >
                            Book Your Strategy Call
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link
                            href="/services"
                            className="w-full sm:w-auto px-10 py-5 bg-white/10 text-white font-bold text-lg rounded-full hover:bg-white/20 backdrop-blur-sm transition-all flex items-center justify-center"
                        >
                            Explore All Services
                        </Link>
                    </div>
                </motion.div>
            </section>

            {/* ===== RELATED SERVICES ===== */}
            <section className="py-24 px-6 bg-slate-50 border-t border-slate-200">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-brand-900 mb-12 font-heading text-center">Other Services You Might Need</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {relatedServices.map((s: any) => (
                            <Link
                                key={s._id}
                                href={`/services/${s.slug.current}`}
                                className="group bg-white rounded-3xl p-8 border border-slate-200 hover:border-gold-500/30 hover:shadow-xl transition-all flex items-start gap-6"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center shrink-0 group-hover:bg-gold-50 group-hover:text-gold-600 transition-colors">
                                    <DynamicIcon name={s.icon} className="w-8 h-8 text-slate-400 group-hover:text-gold-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-brand-900 mb-2 font-heading group-hover:text-gold-600 transition-colors">{s.title}</h3>
                                    <p className="text-sm text-slate-500 font-sans line-clamp-2">{s.shortDescription}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
