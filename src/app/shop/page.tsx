import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ShopHero } from "@/components/shop/ShopHero";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { FeaturedProduct } from "@/components/shop/FeaturedProduct";
import { ShopFAQ } from "@/components/shop/ShopFAQ";
import { client } from "@/sanity/lib/client";
import { ALL_PRODUCTS_QUERY, SHOP_PAGE_QUERY } from "@/sanity/lib/queries";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export const revalidate = 60; // Revalidate every minute

export default async function ShopPage() {
    const shopSettings = await client.fetch(SHOP_PAGE_QUERY);
    const products = await client.fetch(ALL_PRODUCTS_QUERY) || [];

    // Filter out the featured product from the main grid so it's not duplicated
    const featuredId = shopSettings?.featuredProduct?._id;
    const gridProducts = products.filter((p: any) => p._id !== featuredId);

    return (
        <div className="min-h-screen bg-surface flex flex-col font-sans text-brand-900 antialiased selection:bg-gold-500 selection:text-white overflow-x-hidden">
            <Header />

            <main className="pt-20 pb-20">
                <ShopHero
                    title={shopSettings?.heroTitle || "Shop Our Resources"}
                    subtitle={shopSettings?.heroSubtitle || "Expert strategy to optimize your taxes and wealth."}
                    videoUrl={shopSettings?.heroVideo}
                />

                {/* Social Proof / Stats - Static for now as it builds trust */}
                <section className="border-y border-slate-200 bg-white py-12 mb-32">
                    <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
                        <RevealOnScroll className="text-center">
                            <div className="text-3xl font-bold text-brand-900 mb-1 font-sans">$50M+</div>
                            <div className="text-xs text-brand-900 uppercase tracking-wide font-medium font-sans">Income Protected</div>
                        </RevealOnScroll>
                        <RevealOnScroll delay={75} className="text-center">
                            <div className="text-3xl font-bold text-brand-900 mb-1 font-sans">5,000+</div>
                            <div className="text-xs text-brand-900 uppercase tracking-wide font-medium font-sans">Copies Sold</div>
                        </RevealOnScroll>
                        <RevealOnScroll delay={150} className="text-center">
                            <div className="text-3xl font-bold text-brand-900 mb-1 font-sans">4.9/5</div>
                            <div className="text-xs text-brand-900 uppercase tracking-wide font-medium font-sans">Average Rating</div>
                        </RevealOnScroll>
                        <RevealOnScroll delay={200} className="text-center">
                            <div className="text-3xl font-bold text-brand-900 mb-1 font-sans">100%</div>
                            <div className="text-xs text-brand-900 uppercase tracking-wide font-medium font-sans">Audit Compliant</div>
                        </RevealOnScroll>
                    </div>
                </section>

                {shopSettings?.featuredProduct && (
                    <FeaturedProduct product={shopSettings.featuredProduct} />
                )}

                <ProductGrid products={gridProducts} />

                {shopSettings?.faq && <ShopFAQ items={shopSettings.faq} />}

            </main>

            <Footer />
        </div>
    );
}
