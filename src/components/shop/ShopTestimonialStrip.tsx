import { Quote } from "lucide-react";
import { useTranslations } from "next-intl";

interface ShopTestimonialStripProps {
    testimonials?: Array<{
        quote?: string;
        clientName?: string;
        clientTitle?: string;
        rating?: number;
    }>;
}

export function ShopTestimonialStrip({ testimonials = [] }: ShopTestimonialStripProps) {
    const t = useTranslations("Shop.TestimonialStrip");
    const items = testimonials.filter((testimonial) => testimonial.quote && testimonial.clientName);
    if (!items.length) return null;
    return (
        <section className="max-w-7xl mx-auto px-6 pt-12">
            <div className="rounded-3xl border border-zinc-200 bg-white overflow-hidden shadow-sm">
                <div className="px-6 py-6 md:px-10 md:py-8 border-b border-zinc-100">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <div className="text-xs font-bold uppercase tracking-widest text-zinc-400">{t("eyebrow")}</div>
                            <div className="text-2xl md:text-3xl font-bold text-brand-900 font-heading mt-1">
                                {t("title")}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-zinc-100">
                    {items.map((t, i) => (
                        <div key={i} className="bg-white p-6 md:p-8">
                            <Quote className="w-7 h-7 text-gold-500/25" />
                            <p className="mt-4 text-zinc-700 leading-relaxed font-medium">
                                &quot;{t.quote}&quot;
                            </p>
                            <div className="mt-4 text-xs font-bold uppercase tracking-widest text-zinc-400">
                                {t.clientName}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
