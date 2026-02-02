"use client";
import { motion } from "framer-motion";
import { UtensilsCrossed, Users, BarChart3, Play, ChevronRight, TrendingUp, Check, ArrowRight } from "lucide-react";
import Link from "next/link";
import VideoEmbed from "@/components/ui/VideoEmbed";
import * as LucideIcons from "lucide-react";

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

interface RestaurantVSLClientProps {
    data: any; // Using looser typing for now to match construction pattern
}

// Icon helper function
const getIcon = (iconName: string) => {
    // @ts-ignore - Lucide icon indexing
    return LucideIcons[iconName] || LucideIcons.Check;
};

export default function RestaurantVSLClient({ data }: RestaurantVSLClientProps) {
    // Get current month dynamically
    const currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });

    // Sanity Data Fallbacks
    const heroHeadline = data?.heroHeadline || "Stop Leaking Profit on Food Cost & Labor.";
    const heroSubheadline = data?.heroSubheadline || "The \"Kitchen Command Center\" System used by profitable multi-unit groups to standardize operations.";
    const heroBadge = data?.heroBadge || "Restaurant Partner Program";
    const videoUrl = data?.videoFile?.asset?.url;
    const heroCtaText = data?.heroCtaText || "See If Your Restaurant Qualifies";
    const heroCtaUrl = data?.heroCtaUrl || "/restaurants/apply";

    const valueProps = data?.valuePropositions || [
        { icon: "UtensilsCrossed", title: "Food Cost Controls", description: "Granular tracking of COGS, variance, and waste. Real-time insights into what's actually driving plate cost." },
        { icon: "Users", title: "Labor Optimization", description: "Smart scheduling models that align with revenue curves. Cut overtime and dead hours without sacrificing service." },
        { icon: "BarChart3", title: "Multi-Unit Reporting", description: "One dashboard to rule them all. Compare location performance instantly and spot outliers before they bleed cash." }
    ];

    const testimonial = data?.testimonial || {
        quote: "We were flying blind with 3 locations. Union National gave us the visibility to cut 8% off our prime costs in 4 months.",
        author: "Sarah J.",
        role: "Owner",
        company: "Urban Table Group"
    };

    const ctaHeadline = data?.ctaHeadline || "Ready to run a tight ship?";
    const ctaButtonText = data?.ctaButtonText || "Book Your Discovery Call";
    const urgencyText = data?.urgencyText || `Limited spots for ${currentMonth}`;

    return (
        <>
            {/* ===== HERO SECTION ===== */}
            <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20">
                {/* Background Elements */}
                <div className="absolute inset-0 bg-gradient-to-b from-brand-900 via-brand-900 to-brand-800" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-orange-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gold-500/5 rounded-full blur-3xl" />

                {/* Top Badge */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative z-10 mb-8"
                >
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-bold uppercase tracking-widest">
                        <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
                        {heroBadge}
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
                        {heroHeadline}
                    </motion.h1>
                    <motion.p
                        variants={fadeInUp}
                        className="text-lg sm:text-xl md:text-2xl text-brand-100/70 max-w-3xl mx-auto leading-relaxed"
                    >
                        {heroSubheadline}
                    </motion.p>
                </motion.div>

                {/* Video Container */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="relative z-10 w-full max-w-4xl mx-auto mb-12"
                >
                    {videoUrl ? (
                        <VideoEmbed
                            videoUrl={videoUrl}
                            posterImage={data?.videoPoster?.asset?.url} // Pass optional poster from Sanity
                        />
                    ) : (
                        <div className="aspect-video bg-black/50 rounded-xl flex items-center justify-center border border-white/10 text-white/50">
                            Video Placeholder (Add URL in Sanity)
                        </div>
                    )}
                </motion.div>

                {/* Primary CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="relative z-10 flex flex-col items-center"
                >
                    <Link
                        href={heroCtaUrl}
                        className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-orange-500 text-white font-bold text-lg hover:bg-orange-400 transition-all shadow-lg shadow-orange-500/20 group animate-float"
                    >
                        {heroCtaText}
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <div className="mt-4 flex items-center justify-center gap-2 text-orange-400/80 text-sm font-medium">
                        <div className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
                        {urgencyText}
                    </div>
                </motion.div>
            </section>

            {/* ===== VALUE PROPS SECTION ===== */}
            <section className="bg-slate-50 py-20 relative overflow-hidden">
                <div className="absolute inset-0 opacity-50" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23D4AF37\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <span className="text-gold-600 font-bold text-sm uppercase tracking-widest mb-4 block">What You Get</span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-900 font-heading">
                            Recipe for Financial Success
                        </h2>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
                    >
                        {valueProps.map((prop: any, index: number) => (
                            <ValuePropCard
                                key={index}
                                icon={getIcon(prop.icon)}
                                title={prop.title}
                                description={prop.description}
                                delay={0.2 * index}
                            />
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ===== TESTIMONIAL SECTION ===== */}
            <section className="py-20 bg-slate-50 relative">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="max-w-5xl mx-auto relative"
                    >
                        {/* Executive Card */}
                        <div className="bg-gradient-to-br from-brand-900 to-brand-800 rounded-3xl p-8 md:p-12 lg:p-16 shadow-2xl shadow-brand-900/20 relative overflow-hidden">
                            {/* Decorative Quote Mark Watermark */}
                            <div className="absolute top-0 left-0 text-[200px] md:text-[300px] font-serif text-white/5 leading-none select-none pointer-events-none">
                                "
                            </div>

                            {/* Stars */}
                            <div className="relative z-10 mb-6 flex justify-center md:justify-start text-orange-400 gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                    </svg>
                                ))}
                            </div>

                            {/* Content Grid */}
                            <div className="relative z-10 grid md:grid-cols-[1fr_auto] gap-8 md:gap-12 items-center">
                                {/* Quote */}
                                <div>
                                    <blockquote className="text-xl md:text-2xl lg:text-3xl text-white font-heading leading-tight mb-6">
                                        "{testimonial.quote}"
                                    </blockquote>

                                    {/* Author Info - Mobile */}
                                    <div className="flex items-center gap-4 md:hidden">
                                        {data?.testimonial?.authorImage?.asset?.url ? (
                                            <img
                                                src={data.testimonial.authorImage.asset.url}
                                                alt={testimonial.author}
                                                className="w-14 h-14 rounded-full object-cover border-2 border-orange-400/30"
                                            />
                                        ) : (
                                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center border-2 border-orange-400/30">
                                                <span className="text-white font-bold text-xl">
                                                    {testimonial?.author?.charAt(0) || 'R'}
                                                </span>
                                            </div>
                                        )}
                                        <div>
                                            <p className="font-bold text-white text-lg">{testimonial.author}</p>
                                            <p className="text-sm text-orange-200">{testimonial.role}</p>
                                            <p className="text-xs text-brand-100/60">{testimonial.company}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Author Avatar - Desktop Only */}
                                <div className="hidden md:flex flex-col items-center gap-4">
                                    {data?.testimonial?.authorImage?.asset?.url ? (
                                        <img
                                            src={data.testimonial.authorImage.asset.url}
                                            alt={testimonial.author}
                                            className="w-24 h-24 lg:w-28 lg:h-28 rounded-full object-cover border-4 border-orange-400/30 shadow-xl"
                                        />
                                    ) : (
                                        <div className="w-24 h-24 lg:w-28 lg:h-28 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center border-4 border-orange-400/30 shadow-xl">
                                            <span className="text-white font-bold text-4xl">
                                                {testimonial?.author?.charAt(0) || 'R'}
                                            </span>
                                        </div>
                                    )}
                                    <div className="text-center">
                                        <p className="font-bold text-white text-lg">{testimonial.author}</p>
                                        <p className="text-sm text-orange-200">{testimonial.role}</p>
                                        <p className="text-xs text-brand-100/60">{testimonial.company}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ===== FINAL CTA SECTION ===== */}
            <section className="py-24 bg-brand-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-5" />
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <LuxuryTravelIncentive
                        revenueThreshold="$500K - $3M+"
                        title="The Restaurant Group Retreat"
                        description="Multi-unit operators qualify for our annual hospitality strategy retreats in luxury destinations. Scale your portfolio without losing your sanity."
                    />
                </div>
            </section>
        </>
    );
}

