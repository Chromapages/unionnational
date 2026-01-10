import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { Linkedin, Mail, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { CTASection } from "@/components/home/CTASection";
import { client } from "@/sanity/lib/client";
import { FOUNDER_QUERY, TEAM_MEMBERS_QUERY, TEAM_PAGE_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

// Types
interface TeamMember {
    _id: string;
    name: string;
    role: string;
    credentials?: string;
    description: string;
    image: any;
    linkedinUrl?: string;
    tags?: string[];
}

interface TeamPageData {
    heroBadge: string;
    heroTitle: string;
    heroSubtitle: string;
    founderSectionTitle: string;
    teamSectionTitle: string;
    teamSectionSubtitle: string;
    hiringBadge: string;
    hiringTitle: string;
    hiringDescription: string;
    hiringBenefits: string[];
    hiringCtaText: string;
    hiringCtaUrl: string;
    hiringImage: any;
}

export const revalidate = 60; // Revalidate every 60 seconds

export default async function TeamPage() {
    // Fetch data in parallel
    const [pageSettings, founder, teamMembers] = await Promise.all([
        client.fetch<TeamPageData>(TEAM_PAGE_QUERY),
        client.fetch<TeamMember>(FOUNDER_QUERY),
        client.fetch<TeamMember[]>(TEAM_MEMBERS_QUERY)
    ]);

    // Fallbacks for page settings if not yet set in CMS
    const settings = {
        heroBadge: pageSettings?.heroBadge || "Our People",
        heroTitle: pageSettings?.heroTitle || "The experts behind your strategy.",
        heroSubtitle: pageSettings?.heroSubtitle || "We are a team of CPAs, Enrolled Agents, and financial strategists united by a single mission: preserving wealth for the modern economy.",
        founderSectionTitle: pageSettings?.founderSectionTitle || "Founder & Director",
        teamSectionTitle: pageSettings?.teamSectionTitle || "Our Team",
        teamSectionSubtitle: pageSettings?.teamSectionSubtitle || "Dedicated professionals managing your accounts.",
        hiringBadge: pageSettings?.hiringBadge || "Join the team",
        hiringTitle: pageSettings?.hiringTitle || "Obsessed with details? We're hiring.",
        hiringDescription: pageSettings?.hiringDescription || "We don't hire typical accountants. We hire problem solvers who love the puzzle of the tax code. If you believe in precision over speed and strategy over data entry, you belong here.",
        hiringBenefits: pageSettings?.hiringBenefits || [
            "Fully remote culture",
            "Competitive salary & equity",
            "Continuous education stipend"
        ],
        hiringCtaText: pageSettings?.hiringCtaText || "View Open Positions",
        hiringCtaUrl: pageSettings?.hiringCtaUrl || "#",
        hiringImage: pageSettings?.hiringImage
    };

    return (
        <div className="min-h-screen bg-surface flex flex-col font-sans text-brand-900 antialiased selection:bg-gold-500 selection:text-white overflow-x-hidden">
            <Header />

            <main className="pt-32 pb-20">
                {/* Hero */}
                <section className="max-w-4xl mx-auto px-6 mb-24 text-center">
                    <RevealOnScroll>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gold-200 text-gold-600 text-[10px] font-semibold uppercase tracking-widest mb-6 shadow-sm font-sans">
                            {settings.heroBadge}
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-900 tracking-tight mb-8 leading-[1.1] font-heading">
                            {settings.heroTitle.split("strategy").length > 1 ? (
                                <>
                                    {settings.heroTitle.split("strategy")[0]}
                                    <span className="text-gold-500">strategy</span>
                                    {settings.heroTitle.split("strategy")[1]}
                                </>
                            ) : (
                                settings.heroTitle
                            )}
                        </h1>
                        <p className="text-lg text-brand-900 leading-relaxed max-w-2xl mx-auto font-sans">
                            {settings.heroSubtitle}
                        </p>
                    </RevealOnScroll>
                </section>

                {/* Founder Section */}
                {founder && (
                    <section className="max-w-7xl mx-auto px-6 mb-24">
                        <RevealOnScroll className="mb-10">
                            <h2 className="text-2xl font-bold text-brand-900 tracking-tight font-heading">{settings.founderSectionTitle}</h2>
                            <div className="h-1 w-12 bg-gold-500 mt-4 rounded-full"></div>
                        </RevealOnScroll>

                        <RevealOnScroll delay={75} className="group bg-white rounded-2xl border border-slate-200 p-8 flex flex-col md:flex-row gap-8 items-start hover:border-gold-500/30 transition-all duration-300 shadow-sm max-w-4xl">
                            <div className="relative w-full md:w-56 aspect-[4/5] rounded-xl overflow-hidden shrink-0">
                                {founder.image && (
                                    <img
                                        src={urlFor(founder.image).width(800).url()}
                                        alt={founder.name}
                                        className="w-full h-full object-cover transition-transform duration-[3000ms] ease-out group-hover:scale-110"
                                    />
                                )}
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="text-xl font-bold text-brand-900 font-heading">
                                            {founder.name}{founder.credentials && <span className="text-brand-900/60 font-normal font-sans">, {founder.credentials}</span>}
                                        </h3>
                                        <p className="text-sm text-gold-600 font-medium mb-4 font-sans">{founder.role}</p>
                                    </div>
                                    {founder.linkedinUrl && (
                                        <Link href={founder.linkedinUrl} target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center rounded-full text-brand-900/60 hover:bg-brand-500 hover:text-white transition-all border border-transparent hover:border-brand-500"><Linkedin className="w-4 h-4" /></Link>
                                    )}
                                </div>
                                {founder.description && (
                                    <p className="text-sm text-brand-900 leading-relaxed mb-6 font-sans">
                                        {founder.description}
                                    </p>
                                )}
                                {founder.tags && founder.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {founder.tags.map((tag, i) => (
                                            <span key={i} className="px-2.5 py-1 bg-slate-50 text-brand-900 text-[10px] font-medium uppercase tracking-wide rounded border border-slate-100 font-sans">{tag}</span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </RevealOnScroll>
                    </section>
                )}

                {/* Team Section */}
                {teamMembers && teamMembers.length > 0 && (
                    <section className="max-w-7xl mx-auto px-6 mb-32">
                        <RevealOnScroll className="mb-10">
                            <h2 className="text-2xl font-bold text-brand-900 tracking-tight font-heading">{settings.teamSectionTitle}</h2>
                            <p className="text-brand-900 text-sm mt-2 font-sans">{settings.teamSectionSubtitle}</p>
                        </RevealOnScroll>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {teamMembers.map((member, index) => (
                                <RevealOnScroll key={member._id} delay={75 * (index % 4)} className="group relative bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg hover:shadow-gold-500/10 transition-all duration-300">
                                    <div className="aspect-[4/5] overflow-hidden bg-gradient-to-br from-brand-900/10 to-gold-500/10 relative flex items-center justify-center">
                                        {member.image ? (
                                            <img
                                                src={urlFor(member.image).width(600).url()}
                                                alt={member.name}
                                                className="w-full h-full object-cover transition-transform duration-[3000ms] ease-out group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="w-24 h-24 rounded-full bg-brand-500 flex items-center justify-center text-gold-500 text-2xl font-bold font-sans">
                                                {member.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-5">
                                        <h4 className="font-bold text-brand-900 font-heading">
                                            {member.name}{member.credentials && <span className="text-brand-900/60 font-normal text-sm font-sans">, {member.credentials}</span>}
                                        </h4>
                                        <p className="text-xs text-gold-600 font-medium uppercase tracking-wide mt-1 mb-2 font-sans">{member.role}</p>
                                        {member.description && (
                                            <p className="text-xs text-brand-900 line-clamp-3 font-sans">{member.description}</p>
                                        )}
                                    </div>
                                </RevealOnScroll>
                            ))}
                        </div>
                    </section>
                )}

                {/* Hiring / Culture */}
                <section className="max-w-7xl mx-auto px-6 mb-24">
                    <RevealOnScroll className="bg-white rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden border border-slate-200 shadow-xl">
                        <div className="flex flex-col lg:flex-row gap-12 items-center relative z-10">
                            <div className="flex-1">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-100 border border-gold-200 text-gold-700 text-[10px] font-semibold uppercase tracking-widest mb-6 font-sans">
                                    {settings.hiringBadge}
                                </div>
                                <h2 className="text-3xl font-bold text-brand-900 tracking-tight mb-6 font-heading">
                                    {settings.hiringTitle}
                                </h2>
                                <p className="text-brand-900 text-sm leading-relaxed mb-8 max-w-lg font-sans">
                                    {settings.hiringDescription}
                                </p>
                                <ul className="space-y-4 mb-8">
                                    {settings.hiringBenefits.map((benefit, i) => (
                                        <li key={i} className="flex items-center gap-3 text-brand-900 text-sm font-sans">
                                            <CheckCircle2 className="w-5 h-5 text-gold-600" />
                                            {benefit}
                                        </li>
                                    ))}
                                </ul>
                                <a href={settings.hiringCtaUrl} className="inline-flex items-center gap-2 text-brand-900 font-bold text-sm hover:text-gold-600 transition-colors border-b-2 border-transparent hover:border-gold-600 pb-0.5 font-sans">
                                    {settings.hiringCtaText} <ArrowRight className="w-4 h-4" />
                                </a>
                            </div>
                            <div className="w-full lg:w-1/2">
                                <div className="aspect-video relative rounded-2xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
                                    <img
                                        src={settings.hiringImage ? urlFor(settings.hiringImage).width(800).url() : "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800"}
                                        className="w-full h-full object-cover transition-all duration-700"
                                        alt="Union National Tax Team"
                                    />
                                    <div className="absolute inset-0 bg-brand-900/10 mix-blend-multiply"></div>
                                </div>
                            </div>
                        </div>
                    </RevealOnScroll>
                </section>

                {/* CTA Section */}
                <CTASection />

            </main>

            <Footer />
        </div>
    );
}
