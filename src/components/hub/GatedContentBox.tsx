"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Lock, Mail, ArrowRight, CheckCircle2 } from "lucide-react";

interface GatedContentBoxProps {
    title?: string;
    description?: string;
    children?: React.ReactNode;
    className?: string;
}

export function GatedContentBox({
    title = "Unlock Advanced Content",
    description = "Enter your email to access this premium chapter section and receive the full playbook PDF.",
    children,
    className
}: GatedContentBoxProps) {
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setIsLoading(true);
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setIsSubmitted(true);
        setIsLoading(false);
    };

    if (isSubmitted) {
        return (
            <div className={cn("rounded-2xl border border-gold-500/30 bg-gold-500/10 p-8 text-center", className)}>
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gold-500/20">
                    <CheckCircle2 className="h-6 w-6 text-gold-400" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-white mb-2">
                    Content Unlocked!
                </h3>
                <p className="text-sm text-white/70 mb-4">
                    Thank you for subscribing. You now have access to this content.
                </p>
                {children && (
                    <div className="mt-6">
                        {children}
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className={cn("rounded-2xl border border-white/10 bg-brand-950/60 p-8", className)}>
            <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-500/20">
                    <Lock className="h-5 w-5 text-gold-400" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-white">{title}</h3>
            </div>
            
            <p className="text-sm text-white/70 mb-6">
                {description}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex gap-2">
                    <div className="relative flex-1">
                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                            className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-sm text-white placeholder:text-white/40 focus:border-gold-500/50 focus:outline-none focus:ring-1 focus:ring-gold-500/50"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="flex items-center gap-2 rounded-xl bg-gold-500 px-5 py-3 text-sm font-semibold text-brand-950 transition-all hover:bg-gold-400 disabled:opacity-50"
                    >
                        {isLoading ? (
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-brand-950 border-t-transparent" />
                        ) : (
                            <>
                                Unlock
                                <ArrowRight className="h-4 w-4" />
                            </>
                        )}
                    </button>
                </div>
                <p className="text-xs text-white/40">
                    We respect your privacy. Unsubscribe at any time.
                </p>
            </form>
        </div>
    );
}

interface GatedPdfButtonProps {
    pdfUrl?: string;
    className?: string;
}

export function GatedPdfButton({ pdfUrl, className }: GatedPdfButtonProps) {
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setIsSubmitted(true);
        setIsLoading(false);

        if (pdfUrl) {
            window.open(pdfUrl, '_blank');
        }
    };

    if (isSubmitted) {
        return (
            <div className={cn("flex items-center gap-2 text-gold-400", className)}>
                <CheckCircle2 className="h-5 w-5" />
                <span className="text-sm font-medium">Check your inbox!</span>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className={cn("flex gap-2", className)}>
            <div className="relative flex-1 max-w-xs">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email for PDF"
                    required
                    className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-white/40 focus:border-gold-500/50 focus:outline-none focus:ring-1 focus:ring-gold-500/50"
                />
            </div>
            <button
                type="submit"
                disabled={isLoading}
                className="flex items-center gap-2 rounded-xl bg-gold-500 px-4 py-2.5 text-sm font-semibold text-brand-950 transition-all hover:bg-gold-400 disabled:opacity-50"
            >
                {isLoading ? (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-brand-950 border-t-transparent" />
                ) : (
                    "Get PDF"
                )}
            </button>
        </form>
    );
}
