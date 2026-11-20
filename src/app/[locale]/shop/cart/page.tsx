import { Footer } from "@/components/layout/Footer";
import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { CartPageClient } from "@/components/shop/CartPageClient";
import { SHOP_PAGE_QUERY } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { paymentsEnabled } from "@/lib/shop/payments-enabled.mjs";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function ShopCartPage(props: { params: Promise<{ locale: string }> }) {
    const { locale } = await props.params;
    if (!paymentsEnabled()) redirect(`/${locale}/contact`);
    const { data: shopSettings } = await sanityFetch({
        query: SHOP_PAGE_QUERY,
        params: { locale },
    }).catch(() => ({ data: null }));

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
