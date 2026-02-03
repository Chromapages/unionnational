"use client";

import { useTranslations } from "next-intl";
import { Gauge, Handshake, Target } from "lucide-react";

const icons = {
    precision: Target,
    partnership: Handshake,
    speed: Gauge,
};

export function ValuesBento() {
    const t = useTranslations('AboutPage.ValuesBento');

    const values = [
        {
            key: 'precision',
            title: t('values.precision.title'),
            description: t('values.precision.description'),
            icon: icons.precision,
        },
        {
            key: 'partnership',
            title: t('values.partnership.title'),
            description: t('values.partnership.description'),
            icon: icons.partnership,
        },
        {
            key: 'speed',
            title: t('values.speed.title'),
            description: t('values.speed.description'),
            icon: icons.speed,
        },
    ];

    return (
        <section className="py-24 bg-slate-50">
            <div className="mx-auto max-w-6xl px-6">
                <div className="max-w-2xl">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-600">{t('eyebrow')}</p>
                    <h2 className="mt-4 text-3xl font-semibold text-brand-900 font-heading">{t('title')}</h2>
                </div>

                <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-4 md:grid-rows-2">
                    {/* Primary Video Card - Solid Dark */}
                    <div className="relative overflow-hidden rounded-xl border border-brand-900 bg-brand-900 text-white md:col-span-2 md:row-span-2 shadow-lg group">
                        <div className="absolute inset-0 bg-brand-900 mix-blend-multiply opacity-90" />
                        <video
                            className="absolute inset-0 h-full w-full object-cover opacity-40 mix-blend-luminosity group-hover:opacity-50 transition-opacity duration-700"
                            autoPlay
                            loop
                            muted
                            playsInline
                            poster="https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&q=80&w=1200"
                        >
                            <source src="https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4" type="video/mp4" />
                        </video>

                        <div className="relative z-10 flex h-full flex-col justify-end p-8">
                            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-400">{t('integrityBadge')}</p>
                            <h3 className="mt-3 text-2xl font-semibold font-heading">{t('integrityTitle')}</h3>
                            <p className="mt-3 text-sm text-brand-100/80 leading-relaxed max-w-sm">
                                {t('integrityDescription')}
                            </p>
                        </div>
                    </div>

                    {/* Value Cards - Solid White with Sharp Borders */}
                    {values.map((value, index) => (
                        <div
                            key={value.key}
                            className={`rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow duration-300 ${index === 2 ? "md:col-span-2" : ""
                                }`}
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-50 text-brand-900 mb-6">
                                <value.icon className="h-6 w-6" />
                            </div>
                            <h3 className="text-lg font-semibold text-brand-900 font-heading">{value.title}</h3>
                            <p className="mt-2 text-sm text-slate-600 leading-relaxed font-sans">{value.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
