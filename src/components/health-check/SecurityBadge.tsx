"use client";

import { Lock, ShieldCheck } from "lucide-react";

export function SecurityBadge() {
    return (
        <div className="flex items-center justify-center gap-3 text-xs font-semibold text-slate-500">
            <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1">
                <Lock className="h-3.5 w-3.5 text-emerald-500" />
                256-bit Encryption
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1">
                <ShieldCheck className="h-3.5 w-3.5 text-brand-900" />
                Secure Vault
            </span>
        </div>
    );
}
