import { Link } from "@/i18n/navigation";
import { CheckCircle2, ShoppingBag, ArrowRight, Mail, Download, Package } from "lucide-react";
import { getStripe } from "@/lib/stripe";
import { ShopPurchaseEvent } from "@/components/seo/ShopPurchaseEvent";
import { ClearCartAfterPurchase } from "@/components/shop/ClearCartAfterPurchase";
import type Stripe from "stripe";

interface SuccessPageProps {
    searchParams: Promise<{ session_id?: string }>;
}

interface MetadataItem {
    t?: string;
    sh?: boolean;
    q?: number;
}

function parseMetadataItems(metadata?: Stripe.Metadata | null): MetadataItem[] {
    if (!metadata?.items) return [];

    try {
        const parsed = JSON.parse(metadata.items);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

export default async function ShopSuccessPage({ searchParams }: SuccessPageProps) {
    const { session_id } = await searchParams;
    let session = null;

    if (session_id) {
        try {
            const stripe = getStripe();
            session = await stripe.checkout.sessions.retrieve(session_id, {
                expand: ["line_items.data.price.product"],
            });
        } catch (error) {
            console.error("Error retrieving Stripe session:", error);
        }
    }

    const customerEmail = session?.customer_details?.email || "your email";
    const amountTotal = session?.amount_total ? (session.amount_total / 100).toFixed(2) : null;
    const currency = session?.currency?.toUpperCase() || "USD";
    const metadataItems = parseMetadataItems(session?.metadata);
    const hasDigital = session?.metadata?.has_digital === "true" || metadataItems.some((item) => item.t === "digital" || item.t === "audio" || item.t === "bundle");
    const hasPhysical = session?.metadata?.has_physical === "true" || metadataItems.some((item) => item.sh === true || item.t === "physical" || item.t === "bundle");

    // Extract items for tracking
    const trackedItems = session?.line_items?.data.map((item: Stripe.LineItem) => ({
        name: item.description || "Shop order item",
        id: typeof item.price?.product === "string" ? item.price.product : item.price?.product?.id || item.price?.id || item.id,
        price: (item.amount_total / 100) / (item.quantity || 1),
        quantity: item.quantity || 1,
    })) || [];

    if (!session) {
        return (
            <main className="min-h-[70vh] flex flex-col items-center justify-center py-20 px-4 bg-slate-50/30">
                <div className="max-w-2xl text-center">
                    <div className="mb-8 flex justify-center">
                        <div className="bg-white p-6 rounded-3xl shadow-xl border border-amber-100">
                            <Package className="w-14 h-14 text-amber-500" />
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-brand-900 font-heading mb-5 tracking-tight">
                        We could not verify this order yet.
                    </h1>
                    <p className="text-lg text-slate-600 mb-8">
                        If you completed payment, check your email for the Stripe receipt or contact order support so we can look it up.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/shop/cart" className="w-full sm:w-auto px-8 py-4 bg-brand-900 text-gold-400 font-black uppercase tracking-[0.16em] rounded-2xl">
                            Return to Cart
                        </Link>
                        <Link href="/contact" className="w-full sm:w-auto px-8 py-4 bg-white border-2 border-slate-200 text-brand-900 font-bold rounded-2xl">
                            Contact Support
                        </Link>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-[70vh] flex flex-col items-center justify-center py-20 px-4 bg-slate-50/30">
            <ClearCartAfterPurchase sessionId={session.id} />
            {session && amountTotal && (
                <ShopPurchaseEvent 
                    orderId={session.id}
                    total={Number(amountTotal)}
                    currency={currency}
                    items={trackedItems}
                />
            )}
            <div className="max-w-3xl w-full text-center">
                {/* Success Icon */}
                <div className="mb-10 flex justify-center">
                    <div className="relative">
                        <div className="absolute inset-0 bg-emerald-100 rounded-full scale-150 animate-pulse blur-2xl opacity-40"></div>
                        <div className="relative bg-white p-6 rounded-3xl shadow-2xl shadow-emerald-500/10 border border-emerald-50">
                            <CheckCircle2 className="w-16 h-16 text-emerald-500" />
                        </div>
                    </div>
                </div>

                <h1 className="text-4xl md:text-6xl font-bold text-brand-900 font-heading mb-6 tracking-tight">
                    Success! Order Confirmed.
                </h1>
                <p className="text-xl text-slate-600 mb-10 max-w-xl mx-auto leading-relaxed">
                    Thank you for choosing Union National. Your payment was processed successfully, 
                    and we&apos;ve sent your receipt to <span className="font-bold text-brand-900">{customerEmail}</span>.
                </p>

                {/* Order Summary Card (Dynamic) */}
                {session && (
                    <div className="mb-12 bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden text-left mx-auto max-w-lg">
                        <div className="bg-brand-900 px-8 py-4 flex justify-between items-center">
                            <span className="text-xs font-black uppercase tracking-[0.2em] text-gold-400">Order Summary</span>
                            <span className="text-xs font-bold text-white/60">ID: {session.id.slice(-8).toUpperCase()}</span>
                        </div>
                        <div className="p-8">
                            <div className="flex justify-between items-center mb-6 pb-6 border-b border-slate-50">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center">
                                        <Package className="w-5 h-5 text-slate-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-brand-900">Total Charged</p>
                                        <p className="text-xs text-slate-500">Secure Payment via Stripe</p>
                                    </div>
                                </div>
                                <span className="text-2xl font-bold text-brand-900">${amountTotal}</span>
                            </div>
                            
                            <div className="space-y-4">
                                {hasDigital && (
                                    <div className="flex gap-4">
                                        <div className="w-8 h-8 bg-gold-50 rounded-full flex items-center justify-center shrink-0">
                                            <Mail className="w-4 h-4 text-gold-600" />
                                        </div>
                                        <p className="text-sm text-slate-600">
                                            Digital access instructions will be sent to <span className="font-semibold">{customerEmail}</span>.
                                        </p>
                                    </div>
                                )}
                                {hasPhysical && (
                                    <div className="flex gap-4">
                                        <div className="w-8 h-8 bg-brand-50 rounded-full flex items-center justify-center shrink-0">
                                            <Package className="w-4 h-4 text-brand-600" />
                                        </div>
                                        <p className="text-sm text-slate-600">
                                            Physical items will be prepared for shipment using the address provided at checkout.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Next Steps Grid */}
                <div className="grid sm:grid-cols-2 gap-4 mb-12 max-w-2xl mx-auto">
                    <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm text-left group hover:border-gold-500/20 transition-all">
                        <div className="w-12 h-12 bg-slate-900 text-gold-400 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                            <Mail className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-brand-900 mb-2">Check Your Email</h3>
                        <p className="text-sm text-slate-500 leading-relaxed">
                            A detailed confirmation and instructions for digital downloads are in your inbox.
                        </p>
                    </div>
                    {hasDigital ? (
                        <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm text-left group hover:border-gold-500/20 transition-all">
                            <div className="w-12 h-12 bg-slate-900 text-gold-400 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                                <Download className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-brand-900 mb-2">Digital Access</h3>
                            <p className="text-sm text-slate-500 leading-relaxed">
                                Your digital fulfillment instructions are tied to this confirmed Stripe order.
                            </p>
                        </div>
                    ) : (
                        <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm text-left group hover:border-gold-500/20 transition-all">
                            <div className="w-12 h-12 bg-slate-900 text-gold-400 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                                <Package className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-brand-900 mb-2">Shipping Prep</h3>
                            <p className="text-sm text-slate-500 leading-relaxed">
                                Your physical order will move into the fulfillment queue after payment confirmation.
                            </p>
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href="/shop"
                        className="w-full sm:w-auto px-10 py-5 bg-brand-900 text-gold-400 font-black uppercase tracking-[0.2em] rounded-2xl shadow-2xl shadow-brand-900/20 hover:bg-brand-800 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3"
                    >
                        <ShoppingBag className="w-5 h-5" />
                        Continue Shopping
                    </Link>
                    <Link
                        href="/"
                        className="w-full sm:w-auto px-10 py-5 bg-white border-2 border-slate-200 text-brand-900 font-bold rounded-2xl hover:bg-slate-50 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3"
                    >
                        Return Home
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>

                <div className="mt-20 pt-8 border-t border-slate-200/60 max-w-xl mx-auto">
                    <p className="text-sm text-slate-400">
                        Need assistance? We&apos;re here to help. <Link href="/contact" className="text-brand-700 font-bold hover:text-gold-600 transition-colors">Contact Order Support</Link>
                    </p>
                </div>
            </div>
        </main>
    );
}

