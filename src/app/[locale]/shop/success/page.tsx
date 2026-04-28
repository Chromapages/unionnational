import { Link } from "@/i18n/navigation";
import { CheckCircle2, ShoppingBag, ArrowRight, Mail, Download } from "lucide-react";

export default function ShopSuccessPage() {
    // Note: In a real app, we might verify the session_id here via a Server Component
    // or just show a general success message.
    
    return (
        <main className="min-h-[70vh] flex items-center justify-center py-20 px-4">
            <div className="max-w-2xl w-full text-center">
                {/* Success Icon */}
                <div className="mb-8 flex justify-center">
                    <div className="relative">
                        <div className="absolute inset-0 bg-emerald-100 rounded-full scale-150 animate-pulse blur-xl opacity-50"></div>
                        <div className="relative bg-white p-4 rounded-full shadow-xl border border-emerald-50">
                            <CheckCircle2 className="w-16 h-16 text-emerald-500" />
                        </div>
                    </div>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold text-brand-900 font-heading mb-4">
                    Thank You for Your Order!
                </h1>
                <p className="text-lg text-slate-600 mb-10 max-w-lg mx-auto">
                    Your payment was successful and your resources are being prepared.
                    Check your email for order confirmation and access instructions.
                </p>

                {/* Next Steps Grid */}
                <div className="grid sm:grid-cols-2 gap-4 mb-12">
                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-left">
                        <div className="w-10 h-10 bg-brand-900 text-gold-400 rounded-lg flex items-center justify-center mb-4">
                            <Mail className="w-5 h-5" />
                        </div>
                        <h3 className="font-bold text-brand-900 mb-2">Check Your Email</h3>
                        <p className="text-sm text-slate-500">
                            We've sent a detailed receipt and access links for any digital products to your inbox.
                        </p>
                    </div>
                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-left">
                        <div className="w-10 h-10 bg-brand-900 text-gold-400 rounded-lg flex items-center justify-center mb-4">
                            <Download className="w-5 h-5" />
                        </div>
                        <h3 className="font-bold text-brand-900 mb-2">Digital Delivery</h3>
                        <p className="text-sm text-slate-500">
                            Digital PDFs and Audiobooks are delivered instantly via the link in your email.
                        </p>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href="/shop"
                        className="w-full sm:w-auto px-8 py-4 bg-brand-900 text-gold-400 font-black uppercase tracking-[0.2em] rounded-xl shadow-xl shadow-brand-900/20 hover:bg-brand-800 transition-all flex items-center justify-center gap-2"
                    >
                        <ShoppingBag className="w-5 h-5" />
                        Continue Shopping
                    </Link>
                    <Link
                        href="/"
                        className="w-full sm:w-auto px-8 py-4 bg-white border-2 border-slate-200 text-brand-900 font-bold rounded-xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                    >
                        Return Home
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>

                <div className="mt-16 pt-8 border-t border-slate-100">
                    <p className="text-sm text-slate-400">
                        Need help with your order? <Link href="/contact" className="text-brand-700 font-semibold hover:underline">Contact Support</Link>
                    </p>
                </div>
            </div>
        </main>
    );
}
