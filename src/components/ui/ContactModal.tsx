"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, PhoneCall, Mail, MapPin } from "lucide-react";
import { Link } from "@/i18n/navigation";

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
    phoneNumber: string;
    phoneHref: string;
}

export const ContactModal = ({
    isOpen,
    onClose,
    phoneNumber,
    phoneHref,
}: ContactModalProps) => {
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "unset";
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const modalContent = (
        <div
            className="fixed inset-0 z-[1300] flex items-center justify-center p-4 bg-brand-950/80 backdrop-blur-sm"
            onClick={handleBackdropClick}
            role="dialog"
            aria-modal="true"
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative w-full max-w-md bg-brand-900 border border-gold-500/30 rounded-3xl shadow-[0_0_40px_rgba(212,175,55,0.15)] overflow-hidden ring-1 ring-white/10"
            >
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors z-20"
                    aria-label="Close modal"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="relative z-10 p-8 sm:p-10 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center mx-auto mb-6 shadow-inner shadow-gold-500/20">
                        <PhoneCall className="w-8 h-8 text-gold-500" />
                    </div>

                    <h2 className="text-2xl font-bold text-white mb-2 font-heading">
                        Get in Touch
                    </h2>
                    <p className="text-slate-400 mb-8 font-sans text-sm">
                        Ready to optimize your tax strategy? Give us a call or send us an email.
                    </p>

                    <div className="space-y-4">
                        <a
                            href={phoneHref}
                            className="group flex flex-col items-center justify-center p-5 rounded-2xl bg-brand-950/50 border border-gold-500/20 hover:border-gold-500 hover:bg-gold-500/10 transition-all duration-300"
                        >
                            <span className="text-sm font-medium text-slate-400 mb-1 group-hover:text-gold-400 transition-colors">Call us directly</span>
                            <span className="text-2xl font-bold text-white tracking-wide group-hover:text-gold-500 transition-colors">{phoneNumber}</span>
                        </a>

                        <div className="grid grid-cols-2 gap-4">
                            <Link
                                href="/contact"
                                onClick={onClose}
                                className="flex items-center justify-center gap-2 p-4 rounded-xl bg-brand-950/30 border border-slate-700/50 hover:bg-brand-800 hover:border-slate-600 transition-colors text-slate-300 hover:text-white text-sm font-medium"
                            >
                                <Mail className="w-4 h-4 text-slate-400" />
                                Email Us
                            </Link>
                            <Link
                                href="/contact"
                                onClick={onClose}
                                className="flex items-center justify-center gap-2 p-4 rounded-xl bg-brand-950/30 border border-slate-700/50 hover:bg-brand-800 hover:border-slate-600 transition-colors text-slate-300 hover:text-white text-sm font-medium"
                            >
                                <MapPin className="w-4 h-4 text-slate-400" />
                                Location
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );

    return typeof window !== "undefined"
        ? createPortal(modalContent, document.body)
        : null;
};
