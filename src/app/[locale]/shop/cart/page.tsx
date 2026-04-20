import { Footer } from "@/components/layout/Footer";
import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { CartPageClient } from "@/components/shop/CartPageClient";
import { SHOP_PAGE_QUERY } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";

export default async function ShopCartPage(props: { params: Promise<{ locale: string }> }) {
    const { locale } = await props.params;
    const { data: shopSettings } = await sanityFetch({
        query: SHOP_PAGE_QUERY,
        params: { locale },
    });

    return (
        <div className="min-h-screen bg-slate-50 text-brand-900">
            <HeaderWrapper />
            <main id="main-content">
                <CartPageClient recoveryCta={shopSettings?.recoveryCTA} />
            </main>
            <Footer />
        </div>
    );
}
