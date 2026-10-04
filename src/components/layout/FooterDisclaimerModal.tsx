"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowRight, X } from "lucide-react";

interface FooterDisclaimerModalProps {
    label: string;
    closeLabel: string;
    content: string;
}

export function FooterDisclaimerModal({ label, closeLabel, content }: FooterDisclaimerModalProps) {
    const [isOpen, setIsOpen] = useState(false);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const closeRef = useRef<HTMLButtonElement>(null);
    const dialogRef = useRef<HTMLElement>(null);
    const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);

    useEffect(() => setPortalTarget(document.body), []);

    useEffect(() => {
        if (!isOpen) return;

        const previousOverflow = document.body.style.overflow;
        const backgroundElements = [...document.querySelectorAll<HTMLElement>("header, main, footer")];
        const previousInertStates = backgroundElements.map((element) => ({
            element,
            wasInert: element.hasAttribute("inert"),
        }));
        document.body.style.overflow = "hidden";
        backgroundElements.forEach((element) => element.setAttribute("inert", ""));
        closeRef.current?.focus();

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                event.preventDefault();
                setIsOpen(false);
                return;
            }

            if (event.key !== "Tab") return;

            const focusable = [...(dialogRef.current?.querySelectorAll<HTMLElement>(
                'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
            ) || [])];
            if (focusable.length === 0) {
                event.preventDefault();
                return;
            }

            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.body.style.overflow = previousOverflow;
            document.removeEventListener("keydown", handleKeyDown);
            previousInertStates.forEach(({ element, wasInert }) => {
                if (!wasInert) element.removeAttribute("inert");
            });
            triggerRef.current?.focus();
        };
    }, [isOpen]);

    return (
        <>
            <button
                ref={triggerRef}
                type="button"
                onClick={() => setIsOpen(true)}
                className="inline-flex min-h-11 items-center gap-2 rounded-sm text-sm font-semibold text-zinc-200 underline decoration-gold-500 underline-offset-4 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500"
            >
                {label}
                <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
            </button>

            {isOpen && portalTarget ? createPortal(
                <div className="fixed inset-0 z-[1300] flex items-end justify-center p-4 sm:items-center" role="presentation">
                    <button
                        type="button"
                        aria-label={closeLabel}
                        onClick={() => setIsOpen(false)}
                        className="absolute inset-0 cursor-default bg-black/70"
                    />
                    <section
                        ref={dialogRef}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="footer-disclaimer-title"
                        className="relative z-10 max-h-[calc(100dvh-2rem)] w-full max-w-xl overflow-y-auto rounded-2xl border border-white/10 bg-brand-900 p-6 shadow-2xl sm:p-8"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <h2 id="footer-disclaimer-title" className="font-heading text-2xl font-bold text-white">
                                {label}
                            </h2>
                            <button
                                ref={closeRef}
                                type="button"
                                onClick={() => setIsOpen(false)}
                                data-testid="footer-disclaimer-close"
                                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md text-zinc-200 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500"
                                aria-label={closeLabel}
                            >
                                <X className="h-5 w-5" aria-hidden="true" />
                            </button>
                        </div>
                        <p className="mt-5 break-words text-[0.9375rem] leading-7 text-zinc-200">{content}</p>
                    </section>
                </div>
            , portalTarget) : null}
        </>
    );
}
