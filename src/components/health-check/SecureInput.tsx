"use client";

import { CheckCircle2 } from "lucide-react";

interface SecureInputProps {
    id: string;
    label: string;
    type?: string;
    value: string;
    onChange: (value: string) => void;
    error?: string | null;
    isValid?: boolean;
    autoComplete?: string;
}

export function SecureInput({
    id,
    label,
    type = "text",
    value,
    onChange,
    error,
    isValid,
    autoComplete,
}: SecureInputProps) {
    return (
        <div className="relative">
            <input
                id={id}
                type={type}
                value={value}
                onChange={(event) => onChange(event.target.value)}
                placeholder=" "
                autoComplete={autoComplete}
                className={`peer w-full rounded-2xl border px-4 pb-3 pt-5 text-sm font-semibold text-brand-900 outline-none transition bg-white ${
                    error
                        ? "border-red-300 focus:border-red-400 focus:ring-4 focus:ring-red-200/40"
                        : "border-slate-200 focus:border-gold-400 focus:ring-4 focus:ring-gold-400/20"
                }`}
            />
            <label
                htmlFor={id}
                className={`pointer-events-none absolute left-4 top-4 text-xs uppercase tracking-[0.2em] transition-all ${
                    value
                        ? "text-slate-500 -translate-y-3 scale-90"
                        : "text-slate-400 peer-focus:text-slate-500 peer-focus:-translate-y-3 peer-focus:scale-90"
                }`}
            >
                {label}
            </label>
            {isValid && !error && (
                <CheckCircle2 className="absolute right-4 top-4 h-5 w-5 text-emerald-500" />
            )}
            {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
        </div>
    );
}
