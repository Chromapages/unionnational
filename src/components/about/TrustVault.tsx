"use client";

import { useTranslations } from "next-intl";
import { BadgeCheck, LockKeyhole, ShieldCheck } from "lucide-react";

export function TrustVault() {
    const t = useTranslations('AboutPage.TrustVault');

    const vaultItems = [
        {
            title: t('items.irs.title'),
            description: t('items.irs.description'),
            icon: ShieldCheck,
        },
        {
            title: t('items.encryption.title'),
            description: t('items.encryption.description'),
            icon: LockKeyhole,
        },
        {
            title: t('items.strategists.title'),
            description: t('items.strategists.description'),
            icon: BadgeCheck,
        },
    ];

    return (
        <section className="relative bg-brand-900 py-24 text-white border-t border-white/5">

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_rgba(245,158,11,0.03),_transparent_45%)]" />

            <div className="relative mx-auto max-w-6xl px-6">
                <div className="max-w-2xl">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-500">{t('eyebrow')}</p>
                    <h2 className="mt-4 text-3xl font-semibold text-white font-heading">{t('title')}</h2>
                    <p className="mt-4 text-base text-brand-100/70 max-w-lg">
                        {t('description')}
                    </p>
                </div>

                <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
                    {vaultItems.map((item) => (
                        <div
                            key={item.title}
                            className="rounded-xl border border-white/10 bg-brand-950 p-6 shadow-xl transition-all duration-300 hover:border-gold-500/30"
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gold-500/10 text-gold-500 border border-gold-500/20">
                                <item.icon className="h-5 w-5" />
                            </div>
                            <h3 className="mt-6 text-lg font-semibold font-heading text-white">{item.title}</h3>
                            <p className="mt-3 text-sm text-brand-100/60 leading-relaxed font-sans">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
