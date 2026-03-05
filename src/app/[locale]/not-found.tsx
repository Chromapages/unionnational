import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center bg-brand-900 text-white font-sans">
            <div className="space-y-6 max-w-lg">
                <h1 className="text-8xl font-heading font-black text-gold-500 opacity-20">404</h1>
                <div className="space-y-2">
                    <h2 className="text-3xl font-heading font-bold tracking-tight">Page Not Found</h2>
                    <p className="text-brand-200 text-lg leading-relaxed">
                        The page you are looking for doesn&apos;t exist or has been moved to a new location.
                    </p>
                </div>

                <div className="pt-8">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-8 py-3 bg-gold-500 hover:bg-gold-600 text-brand-900 font-bold rounded-lg transition-all shadow-lg shadow-gold-500/20 group"
                    >
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
