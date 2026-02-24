"use client";

import { Lock } from "lucide-react";

interface ResultVaultPreviewProps {
    name?: string;
}

export function ResultVaultPreview({ name }: ResultVaultPreviewProps) {
    return (
        <div className="relative h-full w-full overflow-hidden bg-slate-50 p-6 sm:p-8 md:p-10 lg:p-12 text-brand-900 md:border-r md:border-slate-200">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.05),_transparent_55%)]"></div>

            <div className="relative z-10 flex h-full flex-col justify-between">
                <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-gold-600">Secure Vault</p>
                    <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold font-heading">
                        Report Locked
                    </h2>
                    <p className="mt-4 text-base text-slate-600">
                        {name ? `Prepared for ${name}` : "Your personalized report is generated."}
                    </p>
                </div>

                <div className="relative mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="relative filter blur-md">
                        <div className="h-4 w-32 rounded-full bg-slate-100"></div>
                        <div className="mt-4 grid grid-cols-2 gap-3">
                            {[0, 1, 2, 3].map((item) => (
                                <div key={item} className="h-16 rounded-2xl bg-slate-50"></div>
                            ))}
                        </div>
                        <div className="mt-6 h-20 rounded-2xl bg-slate-50"></div>
                    </div>
                </div>

                <div className="relative mt-8 flex items-center gap-3 rounded-2xl border border-gold-500/20 bg-gold-500/5 px-4 py-3 text-sm font-semibold text-brand-900">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm border border-gold-500/20">
                        <Lock className="h-5 w-5 text-gold-600" />
                    </div>
                    <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-gold-600">Analysis Complete</p>
                        <p className="text-base text-brand-900">Unlock to view full findings</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
