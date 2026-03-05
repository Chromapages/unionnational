"use client";

import { motion } from "framer-motion";
import { Search, FileText, Settings, ShieldCheck } from "lucide-react";
import { SwipeableCarousel } from "@/components/ui/SwipeableCarousel";

const steps = [
    {
        id: 1,
        title: "Discovery",
        description: "We analyze your financial situation and identify immediate tax-saving opportunities.",
        icon: Search,
    },
    {
        id: 2,
        title: "Strategy",
        description: "Our team builds a custom tax plan tailored to your specific industry and goals.",
        icon: FileText,
    },
    {
        id: 3,
        title: "Implementation",
        description: "We execute the plan, setting up S-Corps, payroll, and bookkeeping systems.",
        icon: Settings,
    },
    {
        id: 4,
        title: "Review",
        description: "Quarterly check-ins ensure you stay compliant and maximize savings year-round.",
        icon: ShieldCheck,
    },
];

export function ProcessTimeline() {
    return (
        <section className="py-24 bg-zinc-50 border-y border-zinc-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold text-brand-900 mb-4 font-heading">
                        Our Proven Process
                    </h2>
                    <p className="text-lg text-zinc-600">
                        From initial analysis to ongoing management, we handle the complexity so you can focus on growth.
                    </p>
                </div>

                <div className="relative">
                    {/* Connecting Line (Desktop only) */}
                    <div className="hidden md:block absolute top-[60px] left-[12%] right-[12%] h-0.5 bg-zinc-200 -z-0" />

                    {/* Mobile: Swipeable Carousel */}
                    <div className="md:hidden">
                        <SwipeableCarousel
                            showDots={true}
                            showArrows={false}
                            gap={16}
                            slideClassName="w-[280px] max-w-[85vw]"
                        >
                            {steps.map((step) => (
                                <div
                                    key={step.id}
                                    className="h-full bg-white rounded-2xl p-8 border border-zinc-200 shadow-sm flex flex-col items-center text-center relative overflow-hidden group min-h-[300px]"
                                >
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-900 to-gold-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <div className="w-12 h-12 rounded-full bg-brand-50 text-brand-900 font-bold flex items-center justify-center mb-6 text-sm border border-brand-100">
                                        Step {step.id}
                                    </div>

                                    <div className="w-20 h-20 rounded-full bg-zinc-50 border border-zinc-100 flex items-center justify-center mb-6 group-hover:bg-gold-50 group-hover:border-gold-200 transition-colors duration-300">
                                        <step.icon className="w-8 h-8 text-brand-900 group-hover:text-gold-600 transition-colors" />
                                    </div>

                                    <h3 className="text-xl font-bold text-brand-900 mb-3">{step.title}</h3>
                                    <p className="text-sm text-zinc-600 leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            ))}
                        </SwipeableCarousel>
                    </div>

                    {/* Desktop: Grid */}
                    <div className="hidden md:grid md:grid-cols-4 md:gap-8">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="relative z-10 flex flex-col items-center text-center group"
                            >
                                <div className="w-24 h-24 rounded-full bg-white border-4 border-zinc-100 flex items-center justify-center mb-6 shadow-sm group-hover:border-gold-100 group-hover:shadow-md transition-all duration-300">
                                    <step.icon className="w-8 h-8 text-brand-900 group-hover:text-gold-600 transition-colors" />
                                </div>
                                <h3 className="text-xl font-bold text-brand-900 mb-3">{step.title}</h3>
                                <p className="text-sm text-zinc-600 leading-relaxed max-w-xs mx-auto">
                                    {step.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
