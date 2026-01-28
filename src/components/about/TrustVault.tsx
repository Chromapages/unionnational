"use client";

import { BadgeCheck, LockKeyhole, ShieldCheck } from "lucide-react";

const vaultItems = [
    {
        title: "IRS Compliant",
        description: "Strategies are mapped to verified IRS code and backed with documentation you can audit at any time.",
        icon: ShieldCheck,
    },
    {
        title: "256-bit Encryption",
        description: "Sensitive financial data is protected with the same encryption standards used by institutional banks.",
        icon: LockKeyhole,
    },
    {
        title: "Vetted Strategists",
        description: "Every advisor is screened, certified, and continuously trained on the latest regulatory updates.",
        icon: BadgeCheck,
    },
];

export function TrustVault() {
    return (
        <section className="relative bg-brand-900 py-24 text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_rgba(255,204,102,0.12),_transparent_45%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,_rgba(15,50,46,0.9),_transparent_50%)]" />
            <div className="relative mx-auto max-w-6xl px-6">
                <div className="max-w-2xl">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-400">The Vault</p>
                    <h2 className="mt-4 text-3xl font-semibold text-white font-heading">Bank-grade security with regulatory clarity.</h2>
                    <p className="mt-4 text-base text-brand-100/80">
                        We operate like a compliance desk, not a boutique agency. Every plan is designed for longevity, auditability, and total confidence.
                    </p>
                </div>

                <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
                    {vaultItems.map((item) => (
                        <div
                            key={item.title}
                            className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition duration-300 hover:border-gold-500/40 hover:bg-white/10"
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-500/10 text-gold-400">
                                <item.icon className="h-5 w-5" />
                            </div>
                            <h3 className="mt-6 text-lg font-semibold font-heading">{item.title}</h3>
                            <p className="mt-3 text-sm text-brand-100/80 leading-relaxed">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
