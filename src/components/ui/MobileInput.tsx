"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Check, AlertCircle } from "lucide-react";

interface MobileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
    helperText?: string;
    icon?: React.ReactNode;
    inputMode?: "text" | "search" | "none" | "tel" | "url" | "email" | "numeric" | "decimal";
    floatingLabel?: boolean;
}

export function MobileInput({
    label,
    error,
    helperText,
    icon,
    type = "text",
    inputMode,
    floatingLabel = true,
    className = "",
    disabled,
    required,
    ...props
}: MobileInputProps) {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [touched, setTouched] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const hasValue = props.value !== undefined && props.value !== "";
    const isActive = isFocused || hasValue;
    const isPassword = type === "password";
    const inputType = isPassword ? (showPassword ? "text" : "password") : type;

    // Auto-detect inputMode if not provided
    const autoInputMode = inputMode || (() => {
        if (type === "tel" || type === "number") return "numeric";
        if (type === "email") return "email";
        if (type === "url") return "url";
        if (type === "search") return "search";
        return "text";
    })();

    return (
        <div className={`w-full ${className}`}>
            <div
                className={`
                    relative bg-brand-800/50 rounded-xl
                    border transition-all duration-200
                    ${error && touched
                        ? "border-red-500/50 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-500/20"
                        : "border-white/10 focus-within:border-gold-500/50 focus-within:ring-2 focus-within:ring-gold-500/20"
                    }
                    ${disabled ? "opacity-50 cursor-not-allowed" : ""}
                `}
            >
                {/* Floating Label */}
                {floatingLabel && (
                    <label
                        className={`
                            absolute left-12 top-1/2 -translate-y-1/2
                            text-sm text-white/50 font-medium
                            transition-all duration-200 pointer-events-none
                            ${isActive
                                ? "top-2 text-[10px] text-gold-500/80"
                                : ""
                            }
                        `}
                    >
                        {label}
                        {required && <span className="text-red-400 ml-0.5">*</span>}
                    </label>
                )}

                {/* Icon */}
                {icon && (
                    <div className={`
                        absolute left-4 top-1/2 -translate-y-1/2
                        transition-colors duration-200
                        ${isFocused ? "text-gold-500" : "text-white/40"}
                    `}>
                        {icon}
                    </div>
                )}

                {/* Input */}
                <input
                    ref={inputRef}
                    type={inputType}
                    inputMode={autoInputMode}
                    className={`
                        w-full bg-transparent text-white
                        ${floatingLabel
                            ? "pt-6 pb-2 px-4"
                            : "py-4 px-4"
                        }
                        ${icon ? "pl-12" : ""}
                        ${isPassword ? "pr-12" : ""}
                        ${error && touched ? "pr-12" : ""}
                        text-base min-h-[56px]
                        placeholder:text-white/30
                        focus:outline-none
                        disabled:cursor-not-allowed
                        transition-all duration-200
                        rounded-xl
                    `}
                    placeholder={floatingLabel ? undefined : label}
                    disabled={disabled}
                    required={required}
                    onFocus={(e) => {
                        setIsFocused(true);
                        props.onFocus?.(e);
                    }}
                    onBlur={(e) => {
                        setIsFocused(false);
                        setTouched(true);
                        props.onBlur?.(e);
                    }}
                    {...props}
                />

                {/* Password Toggle */}
                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors touch-target"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                )}

                {/* Error Icon */}
                {error && touched && !isPassword && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-red-400">
                        <AlertCircle className="w-5 h-5" />
                    </div>
                )}

                {/* Success Icon */}
                {!error && touched && hasValue && props.pattern && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-green-400">
                        <Check className="w-5 h-5" />
                    </div>
                )}
            </div>

            {/* Error / Helper Text */}
            <AnimatePresence mode="wait">
                {error && touched ? (
                    <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-1.5 text-xs text-red-400 flex items-center gap-1"
                    >
                        <AlertCircle className="w-3 h-3" />
                        {error}
                    </motion.p>
                ) : helperText ? (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-1.5 text-xs text-white/40"
                    >
                        {helperText}
                    </motion.p>
                ) : null}
            </AnimatePresence>
        </div>
    );
}

// Mobile textarea variant
interface MobileTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    error?: string;
    helperText?: string;
    rows?: number;
}

export function MobileTextarea({
    label,
    error,
    helperText,
    rows = 4,
    className = "",
    disabled,
    required,
    ...props
}: MobileTextareaProps) {
    const [isFocused, setIsFocused] = useState(false);
    const [touched, setTouched] = useState(false);

    return (
        <div className={`w-full ${className}`}>
            <label className="block text-sm font-medium text-white/70 mb-2">
                {label}
                {required && <span className="text-red-400 ml-0.5">*</span>}
            </label>

            <div
                className={`
                    relative bg-brand-800/50 rounded-xl
                    border transition-all duration-200
                    ${error && touched
                        ? "border-red-500/50 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-500/20"
                        : "border-white/10 focus-within:border-gold-500/50 focus-within:ring-2 focus-within:ring-gold-500/20"
                    }
                    ${disabled ? "opacity-50 cursor-not-allowed" : ""}
                `}
            >
                <textarea
                    rows={rows}
                    className="
                        w-full bg-transparent text-white
                        p-4 text-base
                        placeholder:text-white/30
                        focus:outline-none
                        disabled:cursor-not-allowed
                        resize-none
                        rounded-xl
                    "
                    disabled={disabled}
                    required={required}
                    onFocus={(e) => {
                        setIsFocused(true);
                        props.onFocus?.(e);
                    }}
                    onBlur={(e) => {
                        setIsFocused(false);
                        setTouched(true);
                        props.onBlur?.(e);
                    }}
                    {...props}
                />
            </div>

            {error && touched && (
                <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {error}
                </p>
            )}
        </div>
    );
}

// Mobile select variant
interface MobileSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    error?: string;
    helperText?: string;
    options: { value: string; label: string }[];
}

export function MobileSelect({
    label,
    error,
    helperText,
    options,
    className = "",
    disabled,
    required,
    ...props
}: MobileSelectProps) {
    const [isFocused, setIsFocused] = useState(false);
    const [touched, setTouched] = useState(false);

    return (
        <div className={`w-full ${className}`}>
            <label className="block text-sm font-medium text-white/70 mb-2">
                {label}
                {required && <span className="text-red-400 ml-0.5">*</span>}
            </label>

            <div
                className={`
                    relative bg-brand-800/50 rounded-xl
                    border transition-all duration-200
                    ${error && touched
                        ? "border-red-500/50 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-500/20"
                        : "border-white/10 focus-within:border-gold-500/50 focus-within:ring-2 focus-within:ring-gold-500/20"
                    }
                    ${disabled ? "opacity-50 cursor-not-allowed" : ""}
                `}
            >
                <select
                    className="
                        w-full bg-transparent text-white
                        py-4 px-4 pr-10 text-base min-h-[56px]
                        focus:outline-none
                        disabled:cursor-not-allowed
                        rounded-xl
                        appearance-none
                        cursor-pointer
                    "
                    disabled={disabled}
                    required={required}
                    onFocus={(e) => {
                        setIsFocused(true);
                        props.onFocus?.(e);
                    }}
                    onBlur={(e) => {
                        setIsFocused(false);
                        setTouched(true);
                        props.onBlur?.(e);
                    }}
                    {...props}
                >
                    {options.map((option) => (
                        <option key={option.value} value={option.value} className="bg-brand-900 text-white">
                            {option.label}
                        </option>
                    ))}
                </select>

                {/* Custom chevron */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/40">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>

            {error && touched && (
                <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {error}
                </p>
            )}
        </div>
    );
}
