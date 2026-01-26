"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, Mail, CheckCircle2, Loader2, ArrowRight } from "lucide-react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

interface NewsletterModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const NewsletterModal = ({ isOpen, onClose }: NewsletterModalProps) => {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
            // Reset status on close if needed, but keeping it can be nice UX
            if (!isOpen) {
                setTimeout(() => setStatus("idle"), 500);
            }
        };
    }, [isOpen, onClose]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus("loading");

        // Mock API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        setStatus("success");
    };

    if (!isOpen) return null;

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const modalContent = (
        <div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-brand-950/80 backdrop-blur-sm animate-fadeIn"
            onClick={handleBackdropClick}
            role="dialog"
            aria-modal="true"
        >
            <div className="relative w-full max-w-lg bg-brand-900 border border-brand-700/50 rounded-2xl shadow-2xl animate-scaleIn overflow-hidden ring-1 ring-white/10">

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-500/10 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors z-20"
                    aria-label="Close modal"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="relative z-10 p-8 md:p-10 flex flex-col items-center text-center">

                    {status === "success" ? (
                        <div className="animate-scaleIn flex flex-col items-center">
                            <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mb-6 ring-1 ring-emerald-500/20">
                                <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2 font-heading">
                                You're on the list.
                            </h3>
                            <p className="text-slate-400 mb-8 max-w-xs mx-auto font-sans">
                                Keep an eye on your inbox for the latest tax strategies and insights.
                            </p>
                            <button
                                onClick={onClose}
                                className="px-6 py-2.5 bg-brand-800 text-white rounded-lg text-sm font-semibold hover:bg-brand-700 transition-colors border border-white/5"
                            >
                                Close
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold-500/20 to-brand-800 border border-gold-500/20 flex items-center justify-center mb-6 shadow-lg shadow-gold-500/10">
                                <Mail className="w-6 h-6 text-gold-500" />
                            </div>

                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 font-heading tracking-tight">
                                Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">Tax Strategy Brief</span>
                            </h2>

                            <p className="text-slate-400 mb-8 max-w-sm mx-auto font-sans leading-relaxed">
                                A weekly digest of actionable tax strategies for high-earners, delivered straight to your inbox.
                            </p>

                            <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
                                <div className="group relative">
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="w-full bg-brand-950/50 border border-brand-700 rounded-xl px-4 py-3.5 text-white placeholder:text-brand-500 focus:outline-none focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/50 transition-all font-sans"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={status === "loading"}
                                    className="w-full bg-gold-500 text-brand-950 font-bold py-3.5 rounded-xl hover:bg-gold-400 transition-all transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-gold-500/20"
                                >
                                    {status === "loading" ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <>
                                            Subscribe Free <ArrowRight className="w-4 h-4" />
                                        </>
                                    )}
                                </button>

                                <p className="text-xs text-brand-600 font-sans mt-4">
                                    No spam. Unsubscribe at any time.
                                </p>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );

    return typeof window !== "undefined"
        ? createPortal(modalContent, document.body)
        : null;
};
