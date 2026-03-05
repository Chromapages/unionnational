"use client";

import React, { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface BottomSheetProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
    showHandle?: boolean;
    maxHeight?: string;
    className?: string;
}

export function BottomSheet({
    isOpen,
    onClose,
    children,
    title,
    showHandle = true,
    maxHeight = "70vh",
    className = "",
}: BottomSheetProps) {
    // Handle escape key
    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen) {
                onClose();
            }
        },
        [isOpen, onClose]
    );

    // Handle swipe to close
    const handleDragEnd = (
        _: MouseEvent | TouchEvent | PointerEvent,
        info: { offset: { y: number }; velocity: { y: number } }
    ) => {
        if (info.offset.y > 100 || info.velocity.y > 500) {
            onClose();
        }
    };

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [handleKeyDown]);

    // Prevent body scroll when sheet is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
                        onClick={onClose}
                        aria-hidden="true"
                    />

                    {/* Sheet */}
                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{
                            type: "spring",
                            damping: 25,
                            stiffness: 300,
                        }}
                        drag="y"
                        dragConstraints={{ top: 0, bottom: 0 }}
                        dragElastic={0.2}
                        onDragEnd={handleDragEnd}
                        className={cn(
                            "fixed bottom-0 left-0 right-0 z-50",
                            "bg-brand-950/90 backdrop-blur-2xl rounded-t-[32px]",
                            "border-t border-white/10 shadow-2xl shadow-black/50",
                            "overflow-hidden",
                            className
                        )}
                        style={{
                            maxHeight,
                            paddingBottom: "env(safe-area-inset-bottom)",
                        }}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby={title ? "sheet-title" : undefined}
                    >
                        {/* Handle bar */}
                        {showHandle && (
                            <div className="flex justify-center pt-3 pb-1">
                                <div className="w-10 h-1 bg-white/30 rounded-full" />
                            </div>
                        )}

                        {/* Header */}
                        {(title || showHandle) && (
                            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                                {title && (
                                    <h2
                                        id="sheet-title"
                                        className="text-lg font-semibold text-white font-heading"
                                    >
                                        {title}
                                    </h2>
                                )}
                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-full bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-colors no-tap-highlight touch-target"
                                    aria-label="Close"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        )}

                        {/* Content */}
                        <div
                            className="overflow-y-auto mobile-scrollbar"
                            style={{
                                maxHeight: title ? `calc(${maxHeight} - 120px)` : `calc(${maxHeight} - 60px)`,
                            }}
                        >
                            {children}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

// Variant for quick actions (smaller, no backdrop)
interface QuickSheetProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    className?: string;
}

export function QuickSheet({
    isOpen,
    onClose,
    children,
    className = "",
}: QuickSheetProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 bg-black/40"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: "100%", opacity: 0 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className={`
                            fixed bottom-0 left-0 right-0 z-50
                            bg-brand-900 rounded-t-2xl
                            ${className}
                        `}
                        style={{
                            paddingBottom: "env(safe-area-inset-bottom)",
                        }}
                    >
                        {children}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
