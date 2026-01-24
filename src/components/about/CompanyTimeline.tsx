"use client";

import { motion } from "framer-motion";

interface TimelineEvent {
    year: string;
    title: string;
    description: string;
}

const milestones: TimelineEvent[] = [
    { year: "2015", title: "Founded", description: "Union National Tax established" },
    { year: "2018", title: "EA Certification", description: "Jason becomes Enrolled Agent" },
    { year: "2021", title: "$25M Saved", description: "Milestone: $25M in client tax savings" },
    { year: "2024", title: "1,000+ Clients", description: "Serving 1,000+ business owners" },
    { year: "2025", title: "CFO Services", description: "Launch of Fractional CFO program" },
];

export function CompanyTimeline() {
    return (
        <section className="py-24 bg-white border-y border-slate-100 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-brand-900 font-heading">Our Journey</h2>
                    <p className="text-brand-500 mt-2 font-sans">A decade of excellence in tax strategy.</p>
                </div>

                {/* Desktop Horizontal Timeline */}
                <div className="hidden lg:flex relative items-center justify-between py-12">
                    {/* Connecting Line */}
                    <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-gold-500/10 via-gold-500 to-gold-500/10" />

                    {milestones.map((event, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15, duration: 0.5 }}
                            className="relative z-10 flex flex-col items-center group"
                        >
                            {/* Year - Alternating pos */}
                            <div className={`absolute ${index % 2 === 0 ? '-top-12' : 'top-8'} text-sm font-bold text-gold-600 font-sans`}>
                                {event.year}
                            </div>

                            {/* Node Point */}
                            <div className="w-5 h-5 rounded-full bg-gold-500 border-4 border-white shadow-lg z-20 transition-shadow duration-300 group-hover:shadow-xl group-hover:shadow-gold-500/30" />

                            {/* Content Card - Alternating pos */}
                            <div className={`absolute ${index % 2 === 0 ? 'top-8' : '-top-32'} w-48 text-center`}>
                                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 hover:bg-slate-50/30 hover:border-gold-500/30 hover:shadow-lg transition-[background-color,border-color,box-shadow]">
                                    <h3 className="font-bold text-brand-900 text-sm mb-1">{event.title}</h3>
                                    <p className="text-xs text-slate-500 leading-relaxed">{event.description}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Mobile Vertical Timeline */}
                <div className="lg:hidden relative pl-8 border-l-2 border-gold-500/20 space-y-12">
                    {milestones.map((event, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.4 }}
                            className="relative"
                        >
                            <span className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-gold-500 border-4 border-white shadow-sm" />
                            <span className="text-sm font-bold text-gold-600 block mb-1 font-sans">{event.year}</span>
                            <h3 className="text-lg font-bold text-brand-900 mb-2 font-heading">{event.title}</h3>
                            <p className="text-slate-600 text-sm leading-relaxed font-sans">{event.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
