import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { Calendar, ExternalLink, Video } from "lucide-react";

const CALENDAR_URL = "https://calendly.com/jason-unt/blueprint-call";

interface Author {
    name: string;
    role: string;
    credentials: string[];
    imageUrl: string;
    bioShort?: string;
}

interface BlueprintAuthorBioProps {
    author?: Author;
}

export function BlueprintAuthorBio({ author }: BlueprintAuthorBioProps) {
    const stats = [
        { value: "$23,420", label: "Avg. Annual Client Tax Savings*" },
        { value: "1,000+", label: "Business Owners Served" },
        { value: "10+", label: "Years in Practice" }
    ];

    const tags = [
        { label: "EA", primary: true, desc: "IRS Enrolled Agent — licensed to represent taxpayers in audits" },
        { label: "MBA", primary: false, desc: "Master of Business Administration" },
        { label: "FSCP", primary: false, desc: "Financial Specialist in Tax Planning" },
        { label: "LUTCF", primary: false, desc: "Life Underwriter Training Council Fellow" }
    ];

    const details = [
        "IRS Enrolled Agent",
        "Est. 2012 - Orem, UT",
        "Licensed in all 50 states"
    ];

    
    return (
        <section
            id="about-author"
            className="scroll-mt-24 py-20 lg:py-28 bg-[#0B1210] text-white px-4 sm:px-6 lg:px-8 border-t border-brand-900/40 relative overflow-hidden"
            aria-label="About the Author"
        >
            <div className="absolute inset-0 z-0 bg-[url('/images/pattern-grid.svg')] bg-repeat opacity-[0.02]" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

                    {/* Left Column: Eyebrow, Portrait, Tags, Details */}
                    <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left">
                        <RevealOnScroll className="w-full">
                            <span className="text-rose-500 font-bold uppercase tracking-widest text-xs mb-6 block font-sans">
                                About the Author
                            </span>
                        </RevealOnScroll>

                        <RevealOnScroll className="w-full" delay={100}>
                            {/* Portrait Photo with Coral/Red Border */}
                            <div className="relative max-w-[320px] w-full aspect-[4/5] overflow-hidden border-[3px] border-rose-500/80 shadow-2xl bg-slate-900 rounded-none mb-6 mx-auto lg:mx-0">
                                <img
                                    src={author?.imageUrl || "/images/jason_astwood.png"}
                                    alt="Jason Astwood"
                                    className="w-full h-full object-cover"
                                    suppressHydrationWarning
                                />
                            </div>
                        </RevealOnScroll>

                        <RevealOnScroll className="w-full" delay={150}>
                            {/* Credentials Chips */}
                            <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-4">
                                {tags.map((tag) => (
                                    <span
                                        key={tag.label}
                                        title={tag.desc}
                                        className={
                                            tag.primary
                                                ? "bg-rose-600 text-white font-bold text-[11px] px-3 py-1 uppercase tracking-wide rounded-none cursor-help"
                                                : "bg-white/5 border border-white/10 text-slate-300 font-bold text-[11px] px-3 py-1 uppercase tracking-wide rounded-none cursor-help"
                                        }
                                    >
                                        {tag.label}
                                    </span>
                                ))}
                            </div>
                            <p className="text-slate-400 text-[10px] leading-relaxed max-w-sm">
                                EA — IRS Enrolled Agent, licensed to represent taxpayers in audits across all 50 states
                            </p>
                        </RevealOnScroll>

                        <RevealOnScroll className="w-full" delay={200}>
                            {/* Meta Information */}
                            <ul className="space-y-2 text-slate-500 font-semibold text-xs tracking-wider uppercase">
                                {details.map((detail, idx) => (
                                    <li key={idx}>
                                        {detail}
                                    </li>
                                ))}
                            </ul>
                        </RevealOnScroll>
                    </div>

                    {/* Right Column: Title, Subtitle, Bio Paragraphs, Statistics, Link */}
                    <div className="lg:col-span-7 flex flex-col">
                        <RevealOnScroll>
                            <h2 className="text-white font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.05] mb-2 uppercase font-heading">
                                Jason Astwood, EA
                            </h2>

                            <span className="text-gold-500 text-xs sm:text-sm font-bold uppercase tracking-wider mb-8 block font-sans">
                                Enrolled Agent · MBA · Founder, Union National Tax
                            </span>
                        </RevealOnScroll>

                        <RevealOnScroll className="space-y-6 text-slate-300 text-base leading-relaxed font-sans max-w-2xl" delay={100}>
                            <p>
                                Jason Astwood is an IRS Enrolled Agent, MBA, and the founder of{" "}
                                <strong className="text-white font-bold">Union National Tax</strong> — a firm built from the ground up to serve contractors, construction companies, and trade businesses. Since 2012, his firm has helped{" "}
                                <strong className="text-white font-bold">1,000+ business owners</strong> save an average of{" "}
                                <strong className="text-white font-bold">$23,420 per year</strong> in taxes through entity structure, owner compensation, and deduction planning.
                            </p>
                            <p>
                                As one of the few federally licensed tax specialists focused exclusively on the construction industry, Jason understands the unique financial challenges contractors face — from job costing and cash flow gaps to crew costs and equipment write-offs. He&apos;s not a generalist who files for flower shops and construction companies alike.{" "}
                                <strong className="text-white font-bold">This is all he does.</strong>
                            </p>
                            <p>
                                As the author of <em className="italic text-slate-200">The S-Corp Playbook</em> and now{" "}
                                <em className="italic text-slate-200">The Money-Making Blueprint for Construction Companies</em>, Jason distills a decade of frontline advisory work into an actionable framework any contractor can implement — whether they&apos;re doing $500K or $10M a year.
                            </p>
                        </RevealOnScroll>

                        <RevealOnScroll className="grid grid-cols-3 gap-4 sm:gap-6 pt-10 border-t border-white/5 mt-10 max-w-xl" delay={150}>
                            {stats.map((stat, idx) => (
                                <div key={idx} className="flex flex-col">
                                    <span className="text-gold-500 text-2xl sm:text-3xl font-black font-heading tracking-tight leading-none">
                                        {stat.value}
                                    </span>
                                    <span className="text-slate-500 font-semibold text-[9px] sm:text-[10px] tracking-wider uppercase leading-snug mt-2">
                                        {stat.label}
                                    </span>
                                </div>
                            ))}
                        </RevealOnScroll>

                        <RevealOnScroll delay={200}>
                            <p className="mt-4 text-slate-500 text-[10px] sm:text-[11px] leading-relaxed max-w-xl">
                                *Methodology: average tax savings figure is calculated from internal advisory engagements completed between 2012–2024. Individual results vary based on entity structure, revenue, deductions, and current IRS regulations. Past performance is not a guarantee of future outcomes.
                            </p>
                        </RevealOnScroll>

                        {/* Next Step: Book a Call */}
                        <div className="mt-10 pt-8 border-t border-white/10 max-w-xl">
                            <h3 className="text-xl font-black text-white mb-3">
                                Want to apply this directly to your business?
                            </h3>
                            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                                Book 30 minutes with Jason. Apply the blueprint to your specific numbers — no pitch, no obligation.
                            </p>
                            <a
                                href={CALENDAR_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-gold-500 hover:bg-gold-400 text-brand-900 font-black uppercase text-xs tracking-wider rounded-full transition-colors"
                            >
                                <Calendar className="w-4 h-4" />
                                Book a Free 15-Min Call
                            </a>
                            <div className="flex items-center gap-4 mt-4 text-[10px] text-slate-500">
                                <div className="flex items-center gap-1.5">
                                    <Video className="w-3.5 h-3.5" />
                                    <span>Video call · 15 min · No prep needed</span>
                                </div>
                                <a
                                    href={CALENDAR_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1 text-gold-600 hover:text-gold-500 font-bold"
                                >
                                    Open in new tab
                                    <ExternalLink className="w-3 h-3" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
