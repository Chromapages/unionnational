'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { X, Star, Quote } from 'lucide-react';

interface TestimonialModalProps {
    isOpen: boolean;
    onClose: () => void;
    testimonial: {
        _id: string;
        quote: string;
        clientName: string;
        clientTitle?: string;
        clientCompany?: string;
        rating: number;
        image?: {
            asset?: {
                url: string;
            };
        };
    };
}

export const TestimonialModal = ({ isOpen, onClose, testimonial }: TestimonialModalProps) => {
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            // Prevent body scroll when modal is open
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
            onClick={handleBackdropClick}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            <div className="relative w-full max-w-2xl bg-brand-800 border border-brand-700/50 rounded-xl shadow-2xl animate-scaleIn">
                {/* Close Button */}
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-lg bg-brand-700/50 hover:bg-brand-700 text-slate-400 hover:text-white transition-all duration-200 group z-10"
                    aria-label="Close modal"
                >
                    <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
                </button>

                {/* Modal Content */}
                <div className="p-8 md:p-10">
                    {/* Stars */}
                    <div className="flex gap-1 mb-6">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`w-5 h-5 ${i < testimonial.rating
                                        ? 'text-gold-500 fill-gold-500'
                                        : 'text-brand-700'
                                    }`}
                            />
                        ))}
                    </div>

                    {/* Quote */}
                    <blockquote className="text-slate-200 leading-relaxed mb-8 text-lg font-sans relative">
                        <Quote className="absolute -top-6 -left-2 w-10 h-10 text-gold-500/10 rotate-180" />
                        <span className="relative z-10 italic">"{testimonial.quote}"</span>
                    </blockquote>

                    {/* Author */}
                    <div className="flex items-center gap-4 pt-6 border-t border-brand-700/50">
                        {testimonial.image?.asset?.url ? (
                            <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-brand-600 flex-shrink-0">
                                <Image
                                    src={testimonial.image.asset.url}
                                    alt={testimonial.clientName}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        ) : (
                            <div className="w-14 h-14 rounded-full bg-brand-700 flex items-center justify-center text-gold-500 font-bold text-xl border-2 border-brand-600 flex-shrink-0">
                                {testimonial.clientName.charAt(0)}
                            </div>
                        )}
                        <div>
                            <div className="font-bold text-white text-base font-heading tracking-wide">
                                {testimonial.clientName}
                            </div>
                            <div className="text-sm text-brand-300 font-sans">
                                {testimonial.clientTitle}
                                {testimonial.clientTitle && testimonial.clientCompany && ', '}
                                {testimonial.clientCompany}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    // Render modal at body level using portal
    return typeof window !== 'undefined'
        ? createPortal(modalContent, document.body)
        : null;
};
