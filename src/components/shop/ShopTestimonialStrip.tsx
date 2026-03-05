import { Quote, Star } from "lucide-react";

const fallbackTestimonials = [
    {
        quote: "Clear, actionable, and built for real-world tax decisions.",
        author: "Business Owner",
    },
    {
        quote: "The templates saved me hours and paid for themselves instantly.",
        author: "Consultant",
    },
    {
        quote: "Best tax resource I have purchased - structured, compliant, and practical.",
        author: "Agency Founder",
    },
];

interface ShopTestimonialStripProps {
    testimonials?: Array<{
        quote?: string;
        clientName?: string;
        clientTitle?: string;
        rating?: number;
    }>;
}

export function ShopTestimonialStrip({ testimonials = [] }: ShopTestimonialStripProps) {
    const items = testimonials.length > 0
        ? testimonials.map((testimonial) => ({
            quote: testimonial.quote || "",
            author: testimonial.clientName || "Client",
        }))
        : fallbackTestimonials;
    return (
        <section className="max-w-7xl mx-auto px-6 pt-12">
            <div className="rounded-3xl border border-zinc-200 bg-white overflow-hidden shadow-sm">
                <div className="px-6 py-6 md:px-10 md:py-8 border-b border-zinc-100">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <div className="text-xs font-bold uppercase tracking-widest text-zinc-400">Trusted Resources</div>
                            <div className="text-2xl md:text-3xl font-bold text-brand-900 font-heading mt-1">
                                Built for compliance. Designed for speed.
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="flex items-center">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <Star key={i} className="w-4 h-4 fill-gold-400 text-gold-400" />
                                ))}
                            </div>
                            <span className="text-sm font-bold text-brand-900">4.9/5</span>
                            <span className="text-sm text-zinc-400">avg rating</span>
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
                                {t.author}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
