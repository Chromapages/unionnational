"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Star } from "lucide-react";
import * as Icons from "lucide-react";
import { useEffect, useState } from "react";

// Dynamic Icon Component
const DynamicIcon = ({ name, className }: { name: string; className?: string }) => {
    // @ts-expect-error - Icons access
    const Icon = Icons[name] || Icons.Briefcase;
    return <Icon className={className} />;
};

interface ServiceSidebarProps {
    title: string;
    icon: string;
    startingPrice?: string;
    features: string[];
    className?: string;
}

export function ServiceSidebar({ title, icon, startingPrice, features, className }: ServiceSidebarProps) {
    const [activeSection, setActiveSection] = useState("");

    useEffect(() => {
        const handleScroll = () => {
            const sections = ["overview", "comparison", "faq"];
            const current = sections.find(section => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    return rect.top >= 0 && rect.top <= 300;
                }
                return false;
            });
            if (current) setActiveSection(current);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 100; // Header offset
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    };

    return (
        <div className={cn("sticky top-24 space-y-8", className)}>
            {/* Main Card */}
            <div className="bg-white rounded-2xl p-6 border border-zinc-200 shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-brand-900 flex items-center justify-center text-white shadow-lg">
                        <DynamicIcon name={icon} className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="font-bold text-brand-900 leading-tight">{title}</h3>
                        {startingPrice && (
                            <p className="text-sm text-zinc-500">{startingPrice}</p>
                        )}
                    </div>
                </div>

                <Link
                    href="/contact"
                    className="w-full py-3 bg-gold-500 text-brand-900 font-bold rounded-xl hover:bg-gold-400 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 mb-6"
                >
                    Get Started
                    <ArrowRight className="w-4 h-4" />
                </Link>

                <div className="space-y-3 mb-6">
                    {features?.slice(0, 4).map((feature, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm text-zinc-600">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{feature}</span>
                        </div>
                    ))}
                </div>

                <div className="pt-6 border-t border-zinc-100 flex items-center justify-between">
                    <div className="flex -space-x-2">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="w-8 h-8 rounded-full bg-zinc-200 border-2 border-white" />
                        ))}
                    </div>
                    <div className="text-right">
                        <div className="flex text-gold-500">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <Star key={i} className="w-3 h-3 fill-current" />
                            ))}
                        </div>
                        <p className="text-xs text-zinc-400 mt-1">Trusted by 500+ businesses</p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="hidden lg:block">
                <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4 px-2">
                    On this page
                </p>
                <ul className="space-y-1">
                    {[
                        { id: "overview", label: "Overview" },
                        { id: "comparison", label: "Why Choose Us" },
                        { id: "faq", label: "FAQ" },
                    ].map((item) => (
                        <li key={item.id}>
                            <button
                                onClick={() => scrollToSection(item.id)}
                                className={cn(
                                    "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                                    activeSection === item.id
                                        ? "bg-brand-50 text-brand-900 font-medium"
                                        : "text-zinc-600 hover:bg-zinc-50 hover:text-brand-900"
                                )}
                            >
                                {item.label}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}
