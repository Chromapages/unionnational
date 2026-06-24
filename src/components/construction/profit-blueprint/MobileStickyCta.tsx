import { ArrowRight } from "lucide-react";

export function MobileStickyCta() {
    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-brand-900 border-t border-brand-800 shadow-2xl shadow-brand-900/40">
            <div
                className="px-4 py-3 flex items-center justify-between gap-3"
                style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom, 0px))" }}
            >
                <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gold-400 leading-tight truncate">
                        The Money-Making Blueprint
                    </p>
                    <p className="text-sm font-black text-white leading-tight">
                        Get It Now · $27
                    </p>
                </div>
                <a
                    href="#book-sales"
                    className="inline-flex items-center gap-1.5 px-5 py-3 bg-gold-500 hover:bg-gold-600 text-white font-black uppercase tracking-wider text-xs rounded-full transition-colors shadow-md shadow-gold-500/20 shrink-0"
                >
                    Get the Blueprint · $27
                    <ArrowRight size={14} />
                </a>
            </div>
        </div>
    );
}
