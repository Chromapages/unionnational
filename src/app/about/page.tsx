import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { PiggyBank, Building2, ShieldCheck, Linkedin, Award, GraduationCap, Scale, Cpu, Microscope } from "lucide-react";
import { CTASection } from "@/components/home/CTASection";
import { sanityFetch } from "@/sanity/lib/live";
import { ABOUT_PAGE_QUERY } from "@/sanity/lib/queries";
import { PortableText } from "next-sanity";
import * as Icons from "lucide-react";

// Helper for dynamic icons from Sanity
const DynamicIcon = ({ name, className }: { name?: string; className?: string }) => {
    if (!name) return <Scale className={className} />;
    const Icon = (Icons as any)[name] || Icons.Scale;
    return <Icon className={className} />;
};

export default async function AboutPage() {
    const { data: page } = await sanityFetch({ query: ABOUT_PAGE_QUERY });

    return (
        <div className="min-h-screen bg-surface flex flex-col font-sans text-brand-900 antialiased selection:bg-gold-500 selection:text-white overflow-x-hidden">
            <HeaderWrapper />

            <main className="pt-32 pb-20">
                {/* Hero */}
                <section className="max-w-4xl mx-auto px-6 mb-24 text-center">
                    <RevealOnScroll>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gold-200 text-gold-600 text-[10px] font-semibold uppercase tracking-widest mb-6 shadow-sm font-sans">
                            {page?.heroBadge || "About The Firm"}
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-900 tracking-tight mb-8 leading-[1.1] font-heading">
                            {page?.heroTitle || "Modern tax strategy for the digital economy."}
                        </h1>
                        <p className="text-lg text-brand-900 leading-relaxed max-w-2xl mx-auto font-sans">
                            {page?.heroSubtitle || "Union National Tax bridges the gap between complex IRS regulations and the agile needs of modern consultants, creators, and agencies."}
                        </p>
                    </RevealOnScroll>
                </section>

                {/* Stats / Impact (Hardcoded for now as it wasn't in aboutPage schema - could be moved to Sanity later) */}
                <section className="max-w-7xl mx-auto px-6 mb-32">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <RevealOnScroll delay={75} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center">
                            <div className="w-12 h-12 bg-gold-100 text-gold-600 rounded-xl flex items-center justify-center mb-4">
                                <PiggyBank className="w-6 h-6" />
                            </div>
                            <div className="text-3xl font-bold text-brand-900 mb-1 font-sans">$50M+</div>
                            <div className="text-xs text-brand-900 font-medium uppercase tracking-wide font-sans">Client Tax Saved</div>
                        </RevealOnScroll>
                        <RevealOnScroll delay={75} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center">
                            <div className="w-12 h-12 bg-gold-100 text-gold-600 rounded-xl flex items-center justify-center mb-4">
                                <Building2 className="w-6 h-6" />
                            </div>
                            <div className="text-3xl font-bold text-brand-900 mb-1 font-sans">1,200+</div>
                            <div className="text-xs text-brand-900 font-medium uppercase tracking-wide font-sans">Entities Managed</div>
                        </RevealOnScroll>
                        <RevealOnScroll delay={75} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center">
                            <div className="w-12 h-12 bg-gold-100 text-gold-600 rounded-xl flex items-center justify-center mb-4">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <div className="text-3xl font-bold text-brand-900 mb-1 font-sans">15+</div>
                            <div className="text-xs text-brand-900 font-medium uppercase tracking-wide font-sans">Years Experience</div>
                        </RevealOnScroll>
                    </div>
                </section>

                {/* Leadership (Hardcoded for now - likely better as its own Team Member schema if dynamic updates needed heavily) */}
                <section className="max-w-7xl mx-auto px-6 mb-24">
                    <RevealOnScroll className="flex flex-col md:flex-row gap-12 items-start border-t border-slate-200 pt-16">
                        <div className="w-full md:w-1/3">
                            <div className="sticky top-24">
                                <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-lg mb-6">
                                    <img src="https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/N5KQjySifAxlxhrrvY8g/media/65cc3ecf190e877c7eed693d.png" alt="Jason Astwood" className="w-full aspect-[4/5] object-cover transition-all duration-700" />
                                </div>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="font-bold text-brand-900 leading-tight font-heading">Jason Astwood,<br /><span className="text-sm font-normal text-brand-900 font-sans">EA, MBA, FSCP, LUTCF</span></h3>
                                        <p className="text-xs text-gold-600 font-semibold mt-1 font-sans">Fractional CFO / Tax Strategist</p>
                                    </div>
                                    <a href="#" className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-brand-900/60 hover:bg-brand-500 hover:text-white hover:border-brand-500 transition-all">
                                        <Linkedin className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="w-full md:w-2/3">
                            <h3 className="text-2xl font-medium text-brand-900 mb-6 font-heading">Meet the Director</h3>
                            <div className="prose prose-slate text-brand-900 text-sm leading-7 mb-8 font-sans">
                                <p className="mb-4">
                                    As an <strong>IRS Enrolled Agent</strong>* and Financial Services Certified Professional®, Jason is a trusted authority in in taxation, financial strategy, and business growth. He is the author of <em>The S-Corp Playbook</em> and the Director of <strong>Union National Tax</strong>, bringing over two decades of expertise in proactive tax planning, financial management, and compliance.
                                </p>
                                <p className="mb-4">
                                    Jason specializes in helping business owners minimize tax liability, optimize cash flow, and build long-term financial success. His combined expertise as a tax strategist, financial advisor, and Fractional CFO empowers entrepreneurs to scale their businesses with confidence.
                                </p>
                            </div>

                            {/* Enrolled Agent Info Box */}
                            <div className="bg-slate-50 rounded-xl border border-slate-200 p-6 mb-8 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-brand-500/5 rounded-full -mr-8 -mt-8"></div>
                                <div className="flex items-start gap-4 relative z-10">
                                    <div className="w-10 h-10 rounded-lg bg-brand-500 flex items-center justify-center shrink-0 text-white">
                                        <ShieldCheck className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-brand-900 text-sm mb-2 font-heading">*What is an Enrolled Agent?</h4>
                                        <p className="text-xs text-brand-900 leading-relaxed mb-3 font-sans">
                                            An Enrolled Agent (EA) is the <strong>highest credential awarded by the IRS</strong>. Unlike CPAs or attorneys—who are licensed at the state level—EAs are licensed directly by the U.S. Department of the Treasury.
                                        </p>
                                        <p className="text-xs text-brand-900 leading-relaxed mb-3 font-sans">
                                            The EA designation is a federal recognition of specialized expertise in tax law, IRS procedures, and taxpayer representation.
                                        </p>
                                        <p className="text-xs font-medium text-brand-500 font-sans">
                                            Legal Authority: Enrolled Agents are granted unlimited practice rights before the IRS in all 50 states.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Certifications Dynamic List */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {page?.certifications?.map((cert: any, i: number) => (
                                    <div key={i} className="bg-white p-4 rounded-xl border border-slate-100 flex items-center gap-3">
                                        <Award className="w-5 h-5 text-gold-600" />
                                        <div>
                                            <div className="text-xs font-bold text-brand-900 font-sans">{cert.name}</div>
                                            {/* Using generic fallback subtitle since schema only asked for name/logo */}
                                            <div className="text-[10px] text-brand-900/60 font-sans">Certified Professional</div>
                                        </div>
                                    </div>
                                )) || (
                                        // Fallback if no data
                                        <>
                                            <div className="bg-white p-4 rounded-xl border border-slate-100 flex items-center gap-3">
                                                <Award className="w-5 h-5 text-gold-600" />
                                                <div>
                                                    <div className="text-xs font-bold text-brand-900 font-sans">Enrolled Agent (EA)</div>
                                                    <div className="text-[10px] text-brand-900/60 font-sans">Highest IRS Credential</div>
                                                </div>
                                            </div>
                                            <div className="bg-white p-4 rounded-xl border border-slate-100 flex items-center gap-3">
                                                <GraduationCap className="w-5 h-5 text-gold-600" />
                                                <div>
                                                    <div className="text-xs font-bold text-brand-900 font-sans">MBA</div>
                                                    <div className="text-[10px] text-brand-900/60 font-sans">Master of Business Admin</div>
                                                </div>
                                            </div>
                                        </>
                                    )}
                            </div>
                        </div>
                    </RevealOnScroll>
                </section>


                {/* Principles / Values */}
                <section className="max-w-7xl mx-auto px-6 mb-32">
                    <RevealOnScroll className="text-center mb-16">
                        <h2 className="text-sm font-semibold text-gold-600 uppercase tracking-widest mb-3 font-heading">Our Philosophy</h2>
                        <h3 className="text-3xl font-bold text-brand-900 tracking-tight font-heading">Built on core pillars.</h3>
                    </RevealOnScroll>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {page?.values?.map((value: any, i: number) => (
                            <RevealOnScroll key={i} delay={i * 75} className="group bg-white p-8 rounded-2xl border border-slate-200 hover:border-gold-500/30 transition-all duration-300 h-full">
                                <div className="w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-gold-100 transition-colors">
                                    <DynamicIcon name={value.iconName} className="w-6 h-6 text-slate-600 group-hover:text-gold-600 transition-colors" />
                                </div>
                                <h4 className="text-lg font-medium text-brand-900 mb-3 font-heading">{value.title}</h4>
                                <p className="text-sm text-brand-900 leading-relaxed font-sans">{value.description}</p>
                            </RevealOnScroll>
                        )) || (
                                // Fallback
                                <>
                                    <RevealOnScroll className="group bg-white p-8 rounded-2xl border border-slate-200 hover:border-gold-500/30 transition-all duration-300">
                                        <div className="w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-gold-100 transition-colors">
                                            <Scale className="w-6 h-6 text-slate-600 group-hover:text-gold-600 transition-colors" />
                                        </div>
                                        <h4 className="text-lg font-medium text-brand-900 mb-3 font-heading">Compliance First</h4>
                                        <p className="text-sm text-brand-900 leading-relaxed font-sans">We don't deal in "gray areas." Every strategy we deploy is backed by IRS code sections and tax court precedent.</p>
                                    </RevealOnScroll>
                                    <RevealOnScroll delay={75} className="group bg-white p-8 rounded-2xl border border-slate-200 hover:border-gold-500/30 transition-all duration-300">
                                        <div className="w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-gold-100 transition-colors">
                                            <Cpu className="w-6 h-6 text-slate-600 group-hover:text-gold-600 transition-colors" />
                                        </div>
                                        <h4 className="text-lg font-medium text-brand-900 mb-3 font-heading">Tech-Forward</h4>
                                        <p className="text-sm text-brand-900 leading-relaxed font-sans">We integrate Gusto, Quickbooks, and AI-driven analysis to handle the heavy lifting on autopilot.</p>
                                    </RevealOnScroll>
                                    <RevealOnScroll delay={150} className="group bg-white p-8 rounded-2xl border border-slate-200 hover:border-gold-500/30 transition-all duration-300">
                                        <div className="w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-gold-100 transition-colors">
                                            <Microscope className="w-6 h-6 text-slate-600 group-hover:text-gold-600 transition-colors" />
                                        </div>
                                        <h4 className="text-lg font-medium text-brand-900 mb-3 font-heading">Precision</h4>
                                        <p className="text-sm text-brand-900 leading-relaxed font-sans">We use the RCReports™ methodology to find the mathematical "perfect number" for your reasonable compensation.</p>
                                    </RevealOnScroll>
                                </>
                            )}
                    </div>
                </section>

                {/* The Story / Origin (Using CMS content if available, else fallback to hardcoded) */}
                <section className="max-w-7xl mx-auto px-6 mb-32">
                    <RevealOnScroll className="bg-brand-900 rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden">
                        {/* Abstract Glow */}
                        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold-500 opacity-10 rounded-full blur-[100px] pointer-events-none translate-x-1/3 -translate-y-1/3"></div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
                            <div>
                                <h2 className="text-3xl font-bold text-white tracking-tight mb-6 font-heading">Why we started</h2>
                                <div className="space-y-6 text-slate-300 text-sm leading-relaxed font-sans">
                                    {page?.storyContent ? (
                                        <PortableText value={page.storyContent} />
                                    ) : (
                                        <>
                                            <p>In 2018, I sat across from a freelance software engineer named Sarah. She had just made $180,000 in her first year of consulting. She was ecstatic, until I showed her the tax return prepared by her previous generalist accountant.</p>
                                            <p>She owed nearly $30,000 in Self-Employment tax alone. Not income tax—just the tax for the "privilege" of working for herself.</p>
                                            <p>I realized that high-end tax strategies were gatekept behind "Big 4" firms and expensive retainers. <strong>Union National Tax</strong> was built to democratize this knowledge for the modern entrepreneur.</p>
                                        </>
                                    )}
                                </div>
                                <div className="mt-8 pt-8 border-t border-white/10 flex items-center gap-4">
                                    <div className="h-px w-8 bg-gold-500"></div>
                                    <span className="text-white font-medium text-sm font-sans">Jason Astwood, Director</span>
                                </div>
                            </div>

                            {/* ... Image section remains same ... */}
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-tr from-brand-900 via-transparent to-transparent z-10"></div>
                                <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000" alt="Union National Office" className="w-full h-full object-cover rounded-xl opacity-60 mix-blend-overlay border border-white/10" />
                            </div>
                        </div>
                    </RevealOnScroll>
                </section>

                <CTASection />
            </main>

            <Footer />
        </div>
    );
}

