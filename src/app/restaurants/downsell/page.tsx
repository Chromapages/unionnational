import Link from "next/link";
import { CheckCircle2, ArrowRight, BookOpen } from "lucide-react";

export default function RestaurantDownsellPage() {
    return (
        <div className="min-h-screen bg-brand-900 font-sans selection:bg-orange-500 selection:text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">

            {/* Background Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="max-w-xl w-full relative z-10 text-center space-y-8">

                {/* Icon */}
                <div className="w-16 h-16 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mx-auto text-orange-500">
                    <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-4">
                    <h1 className="text-3xl md:text-4xl font-bold text-white font-heading">
                        Application Received
                    </h1>
                    <p className="text-brand-200 text-lg leading-relaxed">
                        Thank you for your interest in the Kitchen Command Center Program.
                    </p>
                </div>

                <div className="bg-brand-800/50 backdrop-blur-sm border border-brand-700/50 rounded-2xl p-6 md:p-8 text-left space-y-6">
                    <p className="text-brand-300">
                        Based on your current revenue stage, our <strong>Elite Partner Program</strong> isn't the best fit for you right now. However, we have resources designed specifically to help you optimize food costs.
                    </p>

                    <div className="flex items-start gap-4 p-4 bg-brand-900/50 rounded-xl border border-brand-700">
                        <div className="shrink-0 p-2 bg-orange-500/10 rounded-lg text-orange-500">
                            <BookOpen className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="font-bold text-white text-sm mb-1">Coming Soon: The Restaurant Profit Playbook</h3>
                            <p className="text-xs text-brand-400">
                                We've added you to our priority list for our upcoming self-paced resources on menu engineering and labor control.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-brand-800 hover:bg-brand-700 text-white font-bold transition-all border border-brand-700 hover:border-brand-600"
                    >
                        Return Home
                    </Link>
                    <Link
                        href="/blog"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-orange-600 hover:bg-orange-500 text-white font-bold transition-all shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_30px_rgba(249,115,22,0.5)]"
                    >
                        Read Free Resources <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

            </div>

            <footer className="absolute bottom-6 text-brand-500 text-xs">
                &copy; {new Date().getFullYear()} Union National Tax.
            </footer>
        </div>
    );
}
