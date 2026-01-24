import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { PiggyBank, Building2, ShieldCheck, Linkedin, Scale, Cpu, Microscope } from "lucide-react";
import { CTASection } from "@/components/home/CTASection";
import { sanityFetch } from "@/sanity/lib/live";
import { ABOUT_PAGE_QUERY } from "@/sanity/lib/queries";
import { PortableText } from "next-sanity";
import * as Icons from "lucide-react";
import { AboutHero } from "@/components/about/AboutHero";
import { MissionStatement } from "@/components/about/MissionStatement";
import { AnimatedStat } from "@/components/about/AnimatedStat";
import { CompanyTimeline } from "@/components/about/CompanyTimeline";
import { ClientLogosSection } from "@/components/about/ClientLogosSection";
import { OriginStorySection } from "@/components/about/OriginStorySection";


// Helper for dynamic icons from Sanity
const DynamicIcon = ({ name, className }: { name?: string; className?: string }) => {
    if (!name) return <Scale className={className} />;
    // @ts-expect-error - Dynamic icon access
    const Icon = Icons[name] || Icons.Scale;
    return <Icon className={className} />;
};

export default async function AboutPage() {
    const { data: page } = await sanityFetch({ query: ABOUT_PAGE_QUERY });

    return (
        <div className="min-h-screen bg-surface flex flex-col font-sans text-brand-900 antialiased selection:bg-gold-500 selection:text-white overflow-x-hidden">
            <HeaderWrapper />

            <main className="pb-20">
                {/* Hero */}
                <AboutHero
                    title={page?.heroTitle || "Modern tax strategy for the digital economy."}
                    subtitle={page?.heroSubtitle || "Union National Tax bridges the gap between complex IRS regulations and the agile needs of modern consultants, creators, and agencies."}
                    badge={page?.heroBadge}
                />

                {/* Leadership / Founder Spotlight */}
                <section className="max-w-7xl mx-auto px-6 py-24">
                    <RevealOnScroll delay={100} className="flex flex-col md:flex-row gap-16 items-start">
                        <div className="w-full md:w-5/12">
                            <div className="sticky top-32">
                                <div className="group relative rounded-2xl overflow-hidden border border-slate-200 shadow-2xl mb-8 transition-[border-color,box-shadow] duration-300 hover:border-gold-500/40 hover:shadow-2xl hover:shadow-brand-900/10">
                                    <div className="absolute inset-0 bg-gradient-to-t from-brand-900/80 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                                    <img
                                        src="https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/N5KQjySifAxlxhrrvY8g/media/65cc3ecf190e877c7eed693d.png"
                                        alt="Jason Astwood"
                                        className="w-full aspect-[4/5] object-cover"
                                    />

                                    {/* Video CTA Overlay */}
                                    <div className="absolute bottom-6 left-6 right-6">
                                        {page?.founderVideoUrl && (
                                            <a
                                                href={page.founderVideoUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 text-white px-5 py-3 rounded-xl w-full hover:bg-gold-500 hover:border-gold-500 hover:text-brand-900 transition-all duration-300 group"
                                            >
                                                <div className="w-8 h-8 rounded-full bg-white text-brand-900 flex items-center justify-center group-hover:bg-brand-900 group-hover:text-gold-500 transition-colors">
                                                    <Icons.Play className="w-3.5 h-3.5 fill-current" />
                                                </div>
                                                <span className="font-bold text-sm">Watch Founder's Intro</span>
                                            </a>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-3xl font-bold text-brand-900 leading-tight font-heading mb-2">Jason Astwood</h3>
                                    <p className="text-gold-600 font-bold mb-4 font-sans">Director & Chief Strategist</p>

                                    <div className="flex flex-wrap gap-2 mb-6">
                                        <span className="px-3 py-1 rounded-full bg-brand-900 text-white text-[10px] font-bold uppercase tracking-wider">EA Licensed</span>
                                        <span className="px-3 py-1 rounded-full bg-brand-100 text-brand-900 text-[10px] font-bold uppercase tracking-wider">MBA</span>
                                        <span className="px-3 py-1 rounded-full bg-gold-100 text-gold-700 text-[10px] font-bold uppercase tracking-wider">FSCP®</span>
                                    </div>

                                    <div className="flex gap-3">
                                        <a href="#" className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-brand-900/60 hover:bg-[#0077b5] hover:text-white hover:border-[#0077b5] transition-all">
                                            <Linkedin className="w-4 h-4" />
                                        </a>
                                        {/* Add other social links if needed */}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full md:w-7/12 pt-8">
                            <h3 className="text-4xl font-bold text-brand-900 mb-8 font-heading">
                                "The tax code wasn't written to punish you. It was written to incentivize you."
                            </h3>
                            <div className="prose prose-lg prose-slate text-brand-600/90 leading-relaxed font-sans mb-12">
                                <p className="mb-6">
                                    As an <strong>IRS Enrolled Agent</strong>* and Financial Services Certified Professional®, Jason is a widely respected authority in taxation, financial strategy, and business growth. He is the author of <em>The S-Corp Playbook</em> and the Director of <strong>Union National Tax</strong>, bringing over two decades of expertise in proactive tax planning.
                                </p>
                                <p className="mb-6">
                                    Most accountants focus on recording history—telling you what you owe after the year is over. Jason focuses on <strong>writing history</strong>. By applying the same sophisticated strategies used by Fortune 500 companies to the modern small business, he helps entrepreneurs keep more of what they earn.
                                </p>
                                <div className="bg-brand-50 p-6 rounded-xl border-l-4 border-gold-500 my-8">
                                    <h4 className="font-bold text-brand-900 mb-2 text-sm uppercase tracking-wide">The Enrolled Agent Difference</h4>
                                    <p className="text-sm">
                                        An Enrolled Agent (EA) is a federally licensed tax practitioner capable of representing taxpayers before the IRS. Adding the FSCP® and LUTCF designations means Jason integrates tax law with holistic financial planning—viewing your business as an asset, not just a liability generator.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </RevealOnScroll>
                </section>

                {/* Stats / Impact */}
                <section className="max-w-7xl mx-auto px-6 py-24">
                    <RevealOnScroll delay={250} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <AnimatedStat
                            value={50000000}
                            prefix="$"
                            suffix="+"
                            label="Client Tax Saved"
                            icon={<PiggyBank className="w-7 h-7" />}
                            delay={0.1}
                        />
                        <AnimatedStat
                            value={1200}
                            suffix="+"
                            label="Entities Managed"
                            icon={<Building2 className="w-7 h-7" />}
                            delay={0.2}
                        />
                        <AnimatedStat
                            value={15}
                            suffix="+"
                            label="Years Experience"
                            icon={<ShieldCheck className="w-7 h-7" />}
                            delay={0.3}
                        />
                    </RevealOnScroll>
                </section>

                {/* Origin Story */}
                <div>
                    <RevealOnScroll delay={400}>
                        <OriginStorySection
                            title="Why we started"
                            signature="Jason Astwood, Director"
                            imageUrl="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000"
                        >
                            {page?.storyContent ? (
                                <PortableText value={page.storyContent} />
                            ) : (
                                <>
                                    <p>
                                        In 2018, I sat across from a freelance software engineer named Sarah. She had just made $180,000 in her first year of consulting.
                                        She was ecstatic, until I showed her the tax return prepared by her previous generalist accountant.
                                    </p>
                                    <p>
                                        She owed nearly $30,000 in Self-Employment tax alone. Not income tax, just the tax for the "privilege" of working for herself.
                                    </p>
                                    <p>
                                        I realized that high-end tax strategies were gatekept behind big firms and expensive retainers. <strong>Union National Tax</strong> was built to
                                        democratize this knowledge for the modern entrepreneur.
                                    </p>
                                </>
                            )}
                        </OriginStorySection>
                    </RevealOnScroll>
                </div>

                {/* Mission Statement */}
                <div className="py-24">
                    <RevealOnScroll delay={550}>
                        <MissionStatement
                            mission={page?.missionStatement || "To democratize elite financial strategies for the modern entrepreneur."}
                            vision="We envision a world where every business owner has the same financial infrastructure as a Fortune 500 company."
                        />
                    </RevealOnScroll>
                </div>

                {/* Company Timeline */}
                <div>
                    <RevealOnScroll delay={700}>
                        <CompanyTimeline />
                    </RevealOnScroll>
                </div>

                
                {/* Principles / Values */}
                <section className="max-w-7xl mx-auto px-6 py-24">
                    <RevealOnScroll delay={850} className="text-center mb-16">
                        <h2 className="text-sm font-semibold text-gold-600 uppercase tracking-widest mb-3 font-heading">Our Philosophy</h2>
                        <h3 className="text-3xl font-bold text-brand-900 tracking-tight font-heading">Built on core pillars.</h3>
                    </RevealOnScroll>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {page?.values?.map((value: any, i: number) => (
                            <RevealOnScroll
                                key={i}
                                delay={950 + i * 120}
                                className="group relative bg-white p-8 rounded-2xl border border-slate-200 hover:bg-slate-50/30 hover:border-gold-500/50 shadow-sm hover:shadow-lg transition-[background-color,border-color,box-shadow] duration-300 h-full overflow-hidden"
                            >
                                <div className="absolute top-6 right-6 text-gold-500/20 font-heading text-2xl font-bold">
                                    {String(i + 1).padStart(2, "0")}
                                </div>
                                <div className="w-14 h-14 bg-gradient-to-br from-brand-900 to-brand-700 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-brand-900/10 group-hover:shadow-gold-500/20 transition-shadow duration-300">
                                    <DynamicIcon name={value.iconName} className="w-7 h-7 text-gold-500" />
                                </div>
                                <h4 className="text-xl font-bold text-brand-900 mb-3 font-heading group-hover:text-gold-600 transition-colors">
                                    {value.title}
                                </h4>
                                <p className="text-sm text-slate-600 leading-relaxed font-sans">{value.description}</p>
                            </RevealOnScroll>
                        )) || (
                                // Fallback
                                <>
                                    <RevealOnScroll delay={950} className="group bg-white p-8 rounded-2xl border border-slate-200 hover:bg-slate-50/30 hover:border-gold-500/50 shadow-sm hover:shadow-lg transition-[background-color,border-color,box-shadow] duration-300 h-full">
                                        <div className="w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-brand-900 transition-colors duration-300">
                                            <Scale className="w-6 h-6 text-slate-600 group-hover:text-gold-500 transition-colors duration-300" />
                                        </div>
                                        <h4 className="text-lg font-medium text-brand-900 mb-3 font-heading group-hover:text-gold-600 transition-colors">Compliance First</h4>
                                        <p className="text-sm text-brand-900 leading-relaxed font-sans">We don't deal in "gray areas." Every strategy we deploy is backed by IRS code sections and tax court precedent.</p>
                                    </RevealOnScroll>
                                    <RevealOnScroll delay={1070} className="group bg-white p-8 rounded-2xl border border-slate-200 hover:bg-slate-50/30 hover:border-gold-500/50 shadow-sm hover:shadow-lg transition-[background-color,border-color,box-shadow] duration-300 h-full">
                                        <div className="w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-brand-900 transition-colors duration-300">
                                            <Cpu className="w-6 h-6 text-slate-600 group-hover:text-gold-500 transition-colors duration-300" />
                                        </div>
                                        <h4 className="text-lg font-medium text-brand-900 mb-3 font-heading group-hover:text-gold-600 transition-colors">Tech-Forward</h4>
                                        <p className="text-sm text-brand-900 leading-relaxed font-sans">We integrate Gusto, Quickbooks, and AI-driven analysis to handle the heavy lifting on autopilot.</p>
                                    </RevealOnScroll>
                                    <RevealOnScroll delay={1190} className="group bg-white p-8 rounded-2xl border border-slate-200 hover:bg-slate-50/30 hover:border-gold-500/50 shadow-sm hover:shadow-lg transition-[background-color,border-color,box-shadow] duration-300 h-full">
                                        <div className="w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-brand-900 transition-colors duration-300">
                                            <Microscope className="w-6 h-6 text-slate-600 group-hover:text-gold-500 transition-colors duration-300" />
                                        </div>
                                        <h4 className="text-lg font-medium text-brand-900 mb-3 font-heading group-hover:text-gold-600 transition-colors">Precision</h4>
                                        <p className="text-sm text-brand-900 leading-relaxed font-sans">We use the RCReports™ methodology to find the mathematical "perfect number" for your reasonable compensation.</p>
                                    </RevealOnScroll>
                                </>
                            )}
                    </div>
                </section>

                {/* Client Logos */}
                <RevealOnScroll delay={1300}>
                    <ClientLogosSection logos={page?.clientLogos} />
                </RevealOnScroll>

                <CTASection />
            </main>

            <Footer />
        </div>
    );
}
