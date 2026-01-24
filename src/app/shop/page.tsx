import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import { ShopHero } from "@/components/shop/ShopHero";
import { FeaturedProduct } from "@/components/shop/FeaturedProduct";
import { ShopFAQ } from "@/components/shop/ShopFAQ";
import { client } from "@/sanity/lib/client";
import { ALL_PRODUCTS_QUERY, SHOP_PAGE_QUERY } from "@/sanity/lib/queries";
import { ShopClient } from "@/components/shop/ShopClient";
import { ShopTestimonialStrip } from "@/components/shop/ShopTestimonialStrip";
import { RecoveryCTA } from "@/components/shop/RecoveryCTA";

export const revalidate = 60; // Revalidate every minute

type ShopProduct = {
    _id: string;
    title: string;
    slug: string;
    imageUrl: string;
    price: number;
    compareAtPrice?: number;
    shortDescription: string;
    format: string;
    buyLink?: string;
    isFeatured?: boolean;
    badge?: string;
    category?: string;
    rating?: number;
};

export default async function ShopPage() {
    const shopSettings = await client.fetch(SHOP_PAGE_QUERY);
    const products: ShopProduct[] = (await client.fetch(ALL_PRODUCTS_QUERY)) || [];

    // Filter out the featured product from the main grid so it's not duplicated
    const featuredId = shopSettings?.featuredProduct?._id;
    const gridProducts = products.filter((p) => p._id !== featuredId);

    return (
        <div className="min-h-screen bg-brand-900 flex flex-col font-sans text-brand-900 antialiased selection:bg-gold-500 selection:text-white overflow-x-hidden">
            <HeaderWrapper />

            <main id="main-content" className="pb-20">
                <ShopHero
                    title={shopSettings?.heroTitle || "Shop Our Resources"}
                    subtitle={shopSettings?.heroSubtitle || "Expert strategy to optimize your taxes and wealth."}
                />

                <div className="bg-zinc-50 pt-24">
                    {shopSettings?.featuredProduct && (
                        <FeaturedProduct product={shopSettings.featuredProduct} />
                    )}

                    <ShopTestimonialStrip />

                    <div className="pt-24">
                        <ShopClient products={gridProducts} />
                    </div>

                    {shopSettings?.faq && <ShopFAQ items={shopSettings.faq} />}

                    <RecoveryCTA />
                </div>

            </main>

            <Footer />
        </div>
    );
}
