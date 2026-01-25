"use client";

import { Lock } from "lucide-react";

interface ResultVaultPreviewProps {
    name?: string;
}

export function ResultVaultPreview({ name }: ResultVaultPreviewProps) {
    return (
        <div className="relative h-full w-full overflow-hidden bg-brand-900 p-6 sm:p-8 md:p-10 lg:p-12 text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.15),_transparent_55%)]"></div>
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light"></div>

            <div className="relative z-10 flex h-full flex-col justify-between">
                <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-gold-200">Secure Vault</p>
                    <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold font-heading">
                        Report Locked
                    </h2>
                    <p className="mt-4 text-base text-brand-100/80">
                        {name ? `Prepared for ${name}` : "Your personalized report is generated."}
                    </p>
                </div>

                <div className="relative mt-10 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                    <div className="absolute inset-0 rounded-3xl border border-white/10"></div>
                    <div className="relative filter blur-md">
                        <div className="h-4 w-32 rounded-full bg-white/30"></div>
                        <div className="mt-4 grid grid-cols-2 gap-3">
                            {[0, 1, 2, 3].map((item) => (
                                <div key={item} className="h-16 rounded-2xl bg-white/20"></div>
                            ))}
                        </div>
                        <div className="mt-6 h-20 rounded-2xl bg-white/20"></div>
                    </div>
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-white/10 via-white/5 to-transparent"></div>
                </div>

                <div className="relative mt-8 flex items-center gap-3 rounded-2xl border border-gold-400/40 bg-gold-400/10 px-4 py-3 text-sm font-semibold text-gold-100">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                        <Lock className="h-5 w-5 text-gold-300" />
                    </div>
                    <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-gold-200">Analysis Complete</p>
                        <p className="text-base">Unlock to view full findings</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
