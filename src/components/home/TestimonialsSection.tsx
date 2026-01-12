import Image from "next/image";
import { Star, Quote } from "lucide-react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { sanityFetch } from "@/sanity/lib/live";
import { TESTIMONIALS_QUERY } from "@/sanity/lib/queries";

export async function TestimonialsSection() {
    const { data: testimonials } = await sanityFetch({ query: TESTIMONIALS_QUERY });

    if (!testimonials || testimonials.length === 0) {
        return null;
    }

    return (
        <section className="py-24 bg-brand-900 border-t border-brand-800/50 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold-500/20 via-transparent to-transparent" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <RevealOnScroll className="text-center mb-16">
                    <span className="text-gold-500 font-bold tracking-widest text-sm uppercase mb-3 block font-sans">
                        Client Success Stories
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 font-heading tracking-tight">
                        Trusted by High-Growth <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-500">
                            Business Owners
                        </span>
                    </h2>
                </RevealOnScroll>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial: any, index: number) => (
                        <RevealOnScroll key={testimonial._id} delay={index * 100} className="h-full">
                            <div className="h-full bg-brand-800/30 border border-brand-700/50 p-8 rounded-xl backdrop-blur-sm hover:border-gold-500/30 transition-all duration-300 group flex flex-col">
                                {/* Stars */}
                                <div className="flex gap-1 mb-6">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-4 h-4 ${i < testimonial.rating ? "text-gold-500 fill-gold-500" : "text-brand-700"}`}
                                        />
                                    ))}
                                </div>

                                {/* Quote */}
                                <blockquote className="text-slate-300 leading-relaxed mb-8 flex-1 font-sans italic relative">
                                    <Quote className="absolute -top-4 -left-2 w-8 h-8 text-gold-500/10 rotate-180" />
                                    "{testimonial.quote}"
                                </blockquote>

                                {/* Author */}
                                <div className="flex items-center gap-4 mt-auto pt-6 border-t border-brand-700/50">
                                    {testimonial.image?.asset?.url ? (
                                        <div className="relative w-12 h-12 rounded-full overflow-hidden border border-brand-600">
                                            <Image
                                                src={testimonial.image.asset.url}
                                                alt={testimonial.clientName}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-12 h-12 rounded-full bg-brand-700 flex items-center justify-center text-gold-500 font-bold border border-brand-600">
                                            {testimonial.clientName.charAt(0)}
                                        </div>
                                    )}
                                    <div>
                                        <div className="font-bold text-white text-sm font-heading tracking-wide">
                                            {testimonial.clientName}
                                        </div>
                                        <div className="text-xs text-brand-300 font-sans">
                                            {testimonial.clientTitle}
                                            {testimonial.clientTitle && testimonial.clientCompany && ", "}
                                            {testimonial.clientCompany}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </RevealOnScroll>
                    ))}
                </div>
            </div>
        </section>
    );
}
