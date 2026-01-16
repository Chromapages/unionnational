import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { sanityFetch } from "@/sanity/lib/live";
import { TESTIMONIALS_QUERY } from "@/sanity/lib/queries";
import { TestimonialsCarousel } from "./TestimonialsCarousel";

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

                <div className="relative">
                    <TestimonialsCarousel testimonials={testimonials} />
                </div>
            </div>
        </section>
    );
}
