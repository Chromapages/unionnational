import { HeaderWrapper } from "@/components/layout/HeaderWrapper";

export default async function IntakePage() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            <HeaderWrapper />

            <div className="flex flex-col md:flex-row min-h-screen pt-16">
                {/* LEFT PANEL: The Context & Trust Building (The "Velvet Rope") */}
                <div className="w-full md:w-1/3 bg-brand-900 text-white p-8 md:p-10 flex flex-col justify-between">
                    <div>
                        <div className="text-gold-400 font-bold tracking-widest text-sm mb-6 uppercase">
                            Tax Season 2025
                        </div>
                        <h1 className="text-3xl md:text-4xl font-light mb-6 leading-tight">
                            Let's get you <br />
                            <span className="font-bold text-gold-400">Filed & Protected.</span>
                        </h1>
                        <p className="text-brand-100/80 text-base md:text-lg leading-relaxed mb-8">
                            Welcome to the digital intake. No paper, no stress.
                            Upload your docs, sign the engagement letter, and let our
                            Audit Guard system handle the rest.
                        </p>

                        {/* Progress Indicators (Visual Trust) */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gold-500/20 text-gold-400 flex items-center justify-center font-bold text-sm">1</div>
                                <span className="text-sm font-medium">Basic Info & Triage</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-brand-800 text-brand-400 flex items-center justify-center font-bold text-sm">2</div>
                                <span className="text-sm font-medium text-brand-300">Secure Document Upload</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-brand-800 text-brand-400 flex items-center justify-center font-bold text-sm">3</div>
                                <span className="text-sm font-medium text-brand-300">Digital Signature</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 pt-8 border-t border-brand-800">
                        <p className="text-xs text-brand-400 uppercase tracking-wide mb-2">Secure Connection</p>
                        <div className="flex items-center gap-2 text-gold-400">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                            </svg>
                            <span className="text-sm font-semibold">256-bit Bank Level Encryption</span>
                        </div>
                    </div>
                </div>

                {/* RIGHT PANEL: The GHL Survey Embed */}
                <div className="w-full md:w-2/3 p-4 md:p-12 flex items-center justify-center relative">

                    {/* Decorative Background Blob for Sleekness */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gold-100 rounded-full blur-3xl opacity-50 -z-10"></div>

                    <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl shadow-slate-200/50 p-1 md:p-4 border border-slate-100">

                        {/* 
                          GHL EMBED AREA
                          =============
                          Replace the 'src' URL with your specific GHL Survey embed URL:
                          https://api.leadconnectorhq.com/widget/survey/YOUR_SURVEY_ID_HERE
                          
                          IMPORTANT: Ensure your GHL settings allow iframe embedding.
                          Go to Settings > Sites > [Your Site] > Security Headers and verify X-Frame-Options.
                        */}
                        <iframe
                            src="https://api.leadconnectorhq.com/widget/survey/YOUR_SURVEY_ID_HERE"
                            style={{ width: '100%', height: '700px', border: 'none', borderRadius: '8px' }}
                            id="ghl-survey-iframe"
                            title="Tax Intake Form"
                            scrolling="no"
                            loading="lazy"
                        />

                    </div>
                </div>
            </div>
        </div>
    );
}
