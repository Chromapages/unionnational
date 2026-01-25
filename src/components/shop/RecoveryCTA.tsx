"use client";

import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { ArrowRight, MessageSquare } from "lucide-react";
import Link from "next/link";

interface RecoveryCTAProps {
    title?: string;
    subtitle?: string;
    buttonText?: string;
    buttonUrl?: string;
}

export function RecoveryCTA({
    title = "Still have questions about which resource is right for you?",
    subtitle = "Book a free 15-minute call with our team. We'll help you identify the exact tools you need for your specific business stage.",
    buttonText = "Book Your Free Call",
    buttonUrl = "/contact",
}: RecoveryCTAProps) {
    return (
        <section className="max-w-7xl mx-auto px-6 py-24">
            <RevealOnScroll>
                <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-xl shadow-brand-900/5 text-center relative overflow-hidden group">
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-700"></div>
                    
                    <div className="relative z-10 flex flex-col items-center">
                        <div className="w-16 h-16 bg-brand-50 rounded-2xl flex items-center justify-center text-brand-900 mb-8">
                            <MessageSquare className="w-8 h-8" />
                        </div>
                        
                        <h2 className="text-3xl font-bold text-brand-900 mb-4 font-heading">
                            {title}
                        </h2>
                        
                        <p className="text-slate-600 text-lg mb-10 max-w-2xl font-sans">
                            {subtitle}
                        </p>
                        
                        <Link 
                            href={buttonUrl} 
                            className="inline-flex items-center gap-2 bg-brand-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-brand-700 transition-all shadow-lg shadow-brand-900/10"
                        >
                            {buttonText}
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </RevealOnScroll>
        </section>
    );
}
