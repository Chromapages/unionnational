"use client";

import { useEffect, useState } from "react";
import { Calculator, TrendingUp, FileSpreadsheet, Gift, ArrowRight, Clock, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Locale = "en" | "es";

interface LimitedBonusCardProps {
    locale: Locale;
}

const BONUS_DEADLINE_ISO = "2026-06-30T23:59:59-04:00"; // Q2 close (America/New_York)

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    expired: boolean;
}

const computeTimeLeft = (target: number): TimeLeft => {
    const diff = target - Date.now();
    if (diff <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    return { days, hours, minutes, seconds, expired: false };
};

const COPY = {
    en: {
        eyebrow: "Limited Q2 Bonus",
        title: "Order Before June 30 — Get the $297 Template Stack Free",
        subtitle: "Three implementation tools Jason built for his private clients. Yours free when you order the blueprint before Q2 close.",
        bonusItems: [
            {
                Icon: FileSpreadsheet,
                name: "Job Costing Spreadsheet",
                desc: "Track direct labor, materials, subs, and equipment per job against contracted price. Reveals the 20% of jobs losing money.",
                value: 99,
            },
            {
                Icon: TrendingUp,
                name: "13-Week Cash Flow Forecast",
                desc: "Rolling 13-week projection with starting cash and variance columns. The survival tool for slow-paying GCs and seasonal swings.",
                value: 129,
            },
            {
                Icon: Calculator,
                name: "Pricing & Margin Calculator",
                desc: "Burden-loaded labor rate, true overhead allocation, target margin floor. The 'do I even want this job?' decision tool.",
                value: 79,
            },
        ],
        valueAnchor: "Total bonus value",
        valueAnchorTotal: "$297",
        stack: "Your stack",
        bookPrice: "Blueprint from $27",
        stackTotalLabel: "Total package",
        stackTotal: "$324+",
        countdownLabel: "Bonus expires in",
        countdownExpired: "Bonus window closed",
        cta: "Claim My Bonus",
        footnote: "Bonus delivered via email within 24 hours of purchase. No code required — included automatically with orders placed before June 30, 2026.",
        units: { days: "Days", hours: "Hrs", minutes: "Min", seconds: "Sec" },
    },
    es: {
        eyebrow: "Bono Limitado del Q2",
        title: "Ordene Antes del 30 de Junio — Reciba el Paquete de Plantillas de $297 Gratis",
        subtitle: "Tres herramientas de implementación que Jason creó para sus clientes privados. Suyas gratis al ordenar el plan antes del cierre del Q2.",
        bonusItems: [
            {
                Icon: FileSpreadsheet,
                name: "Hoja de Cálculo de Costo de Trabajo",
                desc: "Siga mano de obra directa, materiales, subcontratistas y equipo por trabajo contra el precio contratado. Revela el 20% de trabajos que pierden dinero.",
                value: 99,
            },
            {
                Icon: TrendingUp,
                name: "Pronóstico de Flujo de Efectivo a 13 Semanas",
                desc: "Proyección continua de 13 semanas con efectivo inicial y columnas de varianza. La herramienta de supervivencia para contratistas generales con pagos lentos.",
                value: 129,
            },
            {
                Icon: Calculator,
                name: "Calculadora de Precios y Márgenes",
                desc: "Tarifa de mano de obra con carga, asignación real de gastos generales, piso de margen objetivo. La herramienta de decisión '¿quiero este trabajo?'.",
                value: 79,
            },
        ],
        valueAnchor: "Valor total del bono",
        valueAnchorTotal: "$297",
        stack: "Su paquete",
        bookPrice: "Plan desde $27",
        stackTotalLabel: "Paquete total",
        stackTotal: "$324+",
        countdownLabel: "El bono expira en",
        countdownExpired: "Ventana de bono cerrada",
        cta: "Reclamar Mi Bono",
        footnote: "Bono entregado por correo electrónico dentro de las 24 horas posteriores a la compra. Sin código requerido — incluido automáticamente con pedidos realizados antes del 30 de junio de 2026.",
        units: { days: "Días", hours: "Hrs", minutes: "Min", seconds: "Seg" },
    },
} as const;

const formatNumber = (n: number): string => n.toString().padStart(2, "0");

export function LimitedBonusCard({ locale }: LimitedBonusCardProps) {
    const t = COPY[locale];
    const deadlineMs = new Date(BONUS_DEADLINE_ISO).getTime();

    const [timeLeft, setTimeLeft] = useState<TimeLeft>({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        expired: false,
    });
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // mounted is a one-time hydration flag — first render shows placeholders to avoid SSR/client time drift.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
        setTimeLeft(computeTimeLeft(deadlineMs));
        const interval = setInterval(() => {
            setTimeLeft(computeTimeLeft(deadlineMs));
        }, 1000);
        return () => clearInterval(interval);
    }, [deadlineMs]);

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const target = document.getElementById("book-sales");
        if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <section className="py-16 lg:py-20 bg-brand-900 relative overflow-hidden">
            <div className="absolute inset-0 z-0 bg-[url('/images/pattern-grid.svg')] bg-repeat opacity-[0.03]" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold-600/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4" />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-10 lg:mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/10 border border-gold-400/20 mb-5">
                        <Gift className="w-3.5 h-3.5 text-gold-400" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gold-400">
                            {t.eyebrow}
                        </span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-white tracking-tight leading-[1.1] uppercase mb-4">
                        {t.title}
                    </h2>
                    <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-light max-w-2xl mx-auto">
                        {t.subtitle}
                    </p>
                </div>

                {/* Bonus items grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
                    {t.bonusItems.map((item) => {
                        const Icon = item.Icon;
                        return (
                            <div
                                key={item.name}
                                className="relative bg-white/[0.03] border border-gold-400/15 rounded-2xl p-6 backdrop-blur-sm hover:border-gold-400/30 transition-colors"
                            >
                                <div className="flex items-start justify-between gap-3 mb-4">
                                    <div className="w-11 h-11 rounded-xl bg-gold-500/10 border border-gold-400/20 flex items-center justify-center shrink-0">
                                        <Icon className="w-5 h-5 text-gold-400" />
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-500 line-through tabular-nums">
                                        ${item.value}
                                    </span>
                                </div>
                                <h3 className="text-white font-bold text-base mb-2 leading-snug">
                                    {item.name}
                                </h3>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    {item.desc}
                                </p>
                                <div className="mt-4 inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-emerald-400">
                                    <CheckCircle2 className="w-3 h-3" />
                                    <span>Included free</span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Value stack + countdown row */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                    {/* Value stack card */}
                    <div className="lg:col-span-7 bg-gradient-to-br from-gold-500/10 to-gold-600/5 border border-gold-400/20 rounded-2xl p-6 sm:p-8 flex flex-col justify-center">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gold-400 mb-2">
                            {t.valueAnchor}
                        </p>
                        <p className="text-white text-3xl sm:text-4xl font-black mb-6 tabular-nums">
                            {t.valueAnchorTotal}
                        </p>

                        <div className="space-y-2.5 border-t border-gold-400/15 pt-5">
                            <div className="flex items-baseline justify-between gap-3">
                                <span className="text-slate-300 text-sm">{t.bookPrice}</span>
                                <span className="text-white font-bold tabular-nums">$27</span>
                            </div>
                            <div className="flex items-baseline justify-between gap-3">
                                <span className="text-slate-300 text-sm">{t.bonusItems[0].name}</span>
                                <span className="text-slate-400 text-sm line-through tabular-nums">$99</span>
                            </div>
                            <div className="flex items-baseline justify-between gap-3">
                                <span className="text-slate-300 text-sm">{t.bonusItems[1].name}</span>
                                <span className="text-slate-400 text-sm line-through tabular-nums">$129</span>
                            </div>
                            <div className="flex items-baseline justify-between gap-3">
                                <span className="text-slate-300 text-sm">{t.bonusItems[2].name}</span>
                                <span className="text-slate-400 text-sm line-through tabular-nums">$79</span>
                            </div>
                        </div>

                        <div className="mt-5 pt-5 border-t border-gold-400/20 flex items-baseline justify-between gap-3">
                            <span className="text-white text-sm font-black uppercase tracking-wider">{t.stackTotalLabel}</span>
                            <span className="text-gold-400 text-2xl font-black tabular-nums">{t.stackTotal}</span>
                        </div>
                    </div>

                    {/* Countdown + CTA */}
                    <div className="lg:col-span-5 bg-white/[0.04] border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col">
                        <div className="flex items-center gap-2 mb-5">
                            <Clock className="w-4 h-4 text-gold-400" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gold-400">
                                {t.countdownLabel}
                            </span>
                        </div>

                        {/* Countdown boxes — render zeros SSR; hydrate on client to avoid hydration drift */}
                        <div
                            className={cn(
                                "grid grid-cols-4 gap-2 mb-6",
                                timeLeft.expired && "opacity-40"
                            )}
                            suppressHydrationWarning
                        >
                            {[
                                { value: timeLeft.days, label: t.units.days },
                                { value: timeLeft.hours, label: t.units.hours },
                                { value: timeLeft.minutes, label: t.units.minutes },
                                { value: timeLeft.seconds, label: t.units.seconds },
                            ].map((unit) => (
                                <div
                                    key={unit.label}
                                    className="bg-brand-900/60 border border-gold-400/20 rounded-xl py-3 text-center"
                                >
                                    <div className="text-2xl sm:text-3xl font-black text-white tabular-nums leading-none">
                                        {mounted ? formatNumber(unit.value) : "--"}
                                    </div>
                                    <div className="text-[9px] font-black uppercase tracking-widest text-slate-500 mt-1.5">
                                        {unit.label}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {timeLeft.expired ? (
                            <div className="text-center text-slate-400 text-sm font-bold py-4">
                                {t.countdownExpired}
                            </div>
                        ) : (
                            <a
                                href="#book-sales"
                                onClick={handleScroll}
                                className="inline-flex items-center justify-center gap-2 w-full px-6 py-4 bg-gold-500 hover:bg-gold-600 text-white font-black uppercase tracking-wider text-sm rounded-full transition-colors shadow-lg shadow-gold-500/30"
                            >
                                {t.cta}
                                <ArrowRight className="w-4 h-4" />
                            </a>
                        )}
                    </div>
                </div>

                {/* Footnote */}
                <p className="mt-8 text-center text-slate-500 text-xs max-w-2xl mx-auto leading-relaxed">
                    {t.footnote}
                </p>
            </div>
        </section>
    );
}
