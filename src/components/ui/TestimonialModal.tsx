'use client';

import { useEffect, useRef } from 'react';
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
    const dialogRef = useRef<HTMLDivElement>(null);
    const closeButtonRef = useRef<HTMLButtonElement>(null);
    const previousActiveElement = useRef<Element | null>(null);

    // Store the element that had focus before the modal opened
    useEffect(() => {
        if (isOpen) {
            previousActiveElement.current = document.activeElement;
        }
    }, [isOpen]);

    // Focus the close button when modal opens; restore focus on close
    useEffect(() => {
        if (isOpen) {
            // Move focus to close button
            closeButtonRef.current?.focus();
            // Lock body scroll
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
            // Restore focus to the element that opened the modal
            if (previousActiveElement.current instanceof HTMLElement) {
                previousActiveElement.current.focus();
            }
        }
        return () => {
            document.body.style.overflow = '';
            // TestimonialsSection unmounts the dialog when it closes, so the
            // restoration above does not otherwise get a false-state render.
            if (previousActiveElement.current instanceof HTMLElement) {
                previousActiveElement.current.focus();
            }
        };
    }, [isOpen]);

    // Escape key to close
    useEffect(() => {
        if (!isOpen) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
                return;
            }
            // Focus trap
            if (e.key === 'Tab') {
                const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                );
                if (!focusable || focusable.length === 0) return;
                const first = focusable[0];
                const last = focusable[focusable.length - 1];
                if (e.shiftKey) {
                    if (document.activeElement === first) {
                        e.preventDefault();
                        last.focus();
                    }
                } else {
                    if (document.activeElement === last) {
                        e.preventDefault();
                        first.focus();
                    }
                }
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const modalContent = (
        <div
            className="fixed inset-0 z-[1300] flex items-center justify-center p-4 bg-black/70"
            onClick={handleBackdropClick}
        >
            <div
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="testimonial-modal-title"
                className="relative w-full max-w-2xl max-h-[calc(100dvh-2rem)] overflow-y-auto bg-brand-800 border border-brand-700/50 rounded-2xl shadow-2xl"
            >
                {/* Close Button */}
                <button
                    ref={closeButtonRef}
                    type="button"
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 rounded-lg bg-brand-700/50 p-2 text-slate-400 transition-all duration-200 hover:bg-brand-700 hover:text-white focus-visible:outline-2 focus-visible:outline-gold-400 focus-visible:outline-offset-2 group"
                    aria-label="Close testimonial"
                >
                    <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
                </button>

                {/* Modal Content */}
                <div className="p-8 md:p-10">
                    {/* Stars */}
                    <div className="flex gap-1 mb-6" aria-label={`${testimonial.rating ?? 5} out of 5 stars`}>
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`w-5 h-5 ${i < (testimonial.rating ?? 5)
                                        ? 'text-gold-500 fill-gold-500'
                                        : 'text-brand-700'
                                    }`}
                                aria-hidden="true"
                            />
                        ))}
                    </div>

                    {/* Quote */}
                    <blockquote className="text-slate-200 leading-relaxed mb-8 text-lg font-sans relative">
                        <Quote className="absolute -top-6 -left-2 w-10 h-10 text-gold-500/10 rotate-180" aria-hidden="true" />
                        <span className="relative z-10 italic">&ldquo;{testimonial.quote}&rdquo;</span>
                    </blockquote>

                    {/* Author */}
                    <div className="flex items-center gap-4 pt-6 border-t border-brand-700/50">
                        {testimonial.image?.asset?.url ? (
                            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-brand-600 flex-shrink-0">
                                <Image
                                    src={testimonial.image.asset.url}
                                    alt={testimonial.clientName}
                                    width={56}
                                    height={56}
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

    return typeof window !== 'undefined'
        ? createPortal(modalContent, document.body)
        : null;
};
