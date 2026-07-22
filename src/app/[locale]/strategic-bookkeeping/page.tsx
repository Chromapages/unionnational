import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";
import { BookkeepingStickyCard } from "@/components/services/BookkeepingStickyCard";
import { MobileStickyCta } from "@/components/services/MobileStickyCta";
import { ServicePageContainer } from "@/components/services/ServicePageContainer";
import { ServiceFAQ } from "@/components/services/ServiceFAQ";
import { ServiceHero } from "@/components/services/ServiceHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Check, CheckCircle2, CalendarCheck, FileText, Search, ShieldCheck, X, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

const processSteps = [
    { title: "Audit", description: "We review your current books, systems, and reporting gaps before we touch a transaction.", icon: Search },
    { title: "Cleanup", description: "We organize historical activity and establish a reliable chart of accounts and documentation trail.", icon: FileText },
    { title: "Monthly cadence", description: "Accounts are reconciled and reports are delivered on a predictable monthly schedule.", icon: CalendarCheck },
    { title: "Quarterly review", description: "We surface trends and tax-planning opportunities while there is still time to act.", icon: ShieldCheck },
];

const contrastPairs = [
    { problem: "Books updated once a year", solution: "Monthly Reconciliation" },
    { problem: "Deductions discovered after they are gone", solution: "Strategic Categorization" },
    { problem: "Cash flow is a guess", solution: "Financial Reporting" },
    { problem: "Audit trail assembled in a panic", solution: "IRS-Ready Docs" },
];

const faqItems = [
    { question: "How is Strategic Bookkeeping different from DIY or QuickBooks-only bookkeeping?", answer: "QuickBooks is a tool, not a monthly operating rhythm. We reconcile the underlying activity, maintain consistent categories, and turn the books into reports your tax strategy can use." },
    { question: "Can you work with the software I already use?", answer: "Yes. We start with your current stack, confirm the right access and integrations, and recommend changes only where they improve reliability or reporting." },
    { question: "Can you help if my books are behind or messy?", answer: "Yes. The audit identifies the cleanup scope first, then we create a plan to bring your accounts current before moving into a monthly cadence." },
    { question: "How long is the engagement?", answer: "The right commitment depends on your cleanup needs and transaction volume. Your audit call will outline the recommended cadence, scope, and a clear starting point." },
    { question: "Will you coordinate with my tax strategy?", answer: "That is the point of Strategic Bookkeeping. Clean, current financial data lets us identify tax-saving opportunities as they happen rather than after the year has closed." },
];

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Strategic Bookkeeping | Union National Tax",
        description: "Accurate, IRS-compliant bookkeeping designed for financial visibility and better business decisions.",
    };
}

export default async function StrategicBookkeepingPage() {
    return (
        <div className="flex min-h-screen flex-col overflow-x-hidden bg-surface font-sans text-brand-900 antialiased selection:bg-gold-500 selection:text-white">
            <HeaderWrapper />

            <main id="main-content" className="flex-1 pb-20 md:pb-0">
                <ServiceHero
                    eyebrow="For businesses earning $250K+"
                    headline={<>Know your numbers every month &mdash; <span className="text-gold-400">not once a year.</span></>}
                    subheadline="Clean, categorized data that reveals tax savings as they happen."
                    trustItems={[
                        { value: "Monthly", label: "reconciliation" },
                        { value: "IRS-ready", label: "docs" },
                        { value: "200+", label: "served" },
                    ]}
                    primaryCta={{ label: "Book a Strategy Call", href: "/contact" }}
                    secondaryCta={{ label: "See what's included", href: "#included" }}
                    microcopy="No commitment &mdash; 20-minute call, free."
                    mobileFirst
                    primaryCtaId="bookkeeping-hero-cta"
                    breadcrumb={<Breadcrumbs variant="dark" className="mb-4" items={[{ label: "Services", href: "/services" }, { label: "Strategic Bookkeeping", href: "/strategic-bookkeeping" }]} />}
                    visualAnchor={
                        <div className="rounded-2xl border border-white/15 bg-white/[0.07] p-6 shadow-2xl backdrop-blur-sm">
                            <div className="flex items-center justify-between border-b border-white/10 pb-4">
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/60">Monthly P&amp;L Snapshot</p>
                                    <p className="mt-1 font-heading text-lg font-bold text-white">April 2026</p>
                                </div>
                                <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-bold text-emerald-300">Reconciled &#10003;</span>
                            </div>
                            <div className="space-y-4 pt-5 text-sm">
                                <div className="flex justify-between text-white/70"><span>Revenue</span><strong className="text-white">$184,200</strong></div>
                                <div className="flex justify-between text-white/70"><span>Operating expenses</span><strong className="text-white">$121,640</strong></div>
                                <div className="flex justify-between border-t border-white/10 pt-4"><span className="font-semibold text-white">Net operating income</span><strong className="text-gold-400">$62,560</strong></div>
                            </div>
                        </div>
                    }
                />

                <section className="bg-white py-8 md:py-16">
                    <ServicePageContainer variant="wide">
                        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16">
                            <section aria-labelledby="bookkeeping-benefits">
                                <div className="rounded-3xl bg-brand-950 p-6 text-white md:p-8">
                                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-400">The cost of waiting</p>
                                    <h2 id="bookkeeping-benefits" className="mt-3 font-heading text-3xl font-bold tracking-tighter md:text-4xl">Why &ldquo;Compliance-Only&rdquo; Bookkeeping Fails</h2>
                                    <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/70 md:text-lg">Compliance-only bookkeeping tells you what happened last April. It never tells you what&apos;s happening right now.</p>
                                    <div className="mt-8 hidden grid-cols-2 gap-x-8 border-b border-white/10 pb-3 text-xs font-bold uppercase tracking-[0.16em] sm:grid">
                                        <p className="text-white/45">Without a monthly rhythm</p>
                                        <p className="text-gold-400">With Strategic Bookkeeping</p>
                                    </div>
                                    <div className="mt-4 space-y-3">
                                        {contrastPairs.map((pair) => (
                                            <div key={pair.solution} className="grid gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:grid-cols-2 sm:gap-8">
                                                <div className="flex items-center gap-2 text-sm leading-snug text-white/45"><X className="h-4 w-4 shrink-0 text-white/40" aria-hidden="true" /><span className="sm:hidden text-[10px] font-bold uppercase tracking-wide text-white/35">Without</span><span className="line-through decoration-white/35">{pair.problem}</span></div>
                                                <div className="flex items-center gap-2 text-sm font-semibold leading-snug text-white"><Check className="h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" /><span className="sm:hidden text-[10px] font-bold uppercase tracking-wide text-gold-400">With</span><span>{pair.solution}</span></div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section>
                            <BookkeepingStickyCard />
                        </div>
                    </ServicePageContainer>
                </section>

                <section aria-labelledby="bookkeeping-process" className="border-y border-zinc-200 bg-zinc-50 py-12 md:py-16">
                    <ServicePageContainer variant="wide">
                        <SectionHeader label="How it works" heading="A reliable monthly rhythm" description="From a focused audit to quarterly insight, every step makes the next one easier." headingId="bookkeeping-process" />
                        <ol className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
                            {processSteps.map((step, index) => (
                                <li key={step.title} className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 font-heading font-bold text-brand-900">{index + 1}</div>
                                    <step.icon className="mb-2 mt-5 h-5 w-5 text-gold-600" strokeWidth={1.75} />
                                    <h3 className="font-heading text-lg font-bold text-brand-900">{step.title}</h3>
                                    <p className="mt-1 max-w-prose text-sm leading-relaxed text-zinc-600">{step.description}</p>
                                </li>
                            ))}
                        </ol>
                    </ServicePageContainer>
                </section>

                <section id="included" aria-labelledby="bookkeeping-standard" className="scroll-mt-[calc(var(--header-height)+1.5rem)] bg-white py-12 md:py-16">
                    <ServicePageContainer variant="wide">
                        <SectionHeader label="What's included" heading="The Union National Standard" description="Your bookkeeping is connected to your tax strategy, so opportunities are visible while they can still be used." headingId="bookkeeping-standard" />
                        <ul className="mt-10 grid gap-4 md:grid-cols-2">
                            {["Bank & Credit Card Reconciliation", "General Ledger Maintenance", "Accounts Payable/Receivable Support", "Custom Financial Reporting", "Sales Tax Compliance Support", "1099 Vendor Management"].map((item) => (
                                <li key={item} className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white px-4 py-3 text-slate-700 shadow-sm"><CheckCircle2 size={19} className="shrink-0 text-gold-500" /><span>{item}</span></li>
                            ))}
                        </ul>
                        <p className="mx-auto mt-6 max-w-prose text-center text-sm leading-relaxed text-slate-600"><strong className="font-semibold text-brand-900">Custom quote based on volume.</strong> Starting at a monthly rate based on transaction volume &mdash; get an exact quote on your audit call.</p>
                    </ServicePageContainer>
                </section>

                <section aria-labelledby="bookkeeping-comparison" className="bg-white py-12 md:py-16">
                    <ServicePageContainer variant="wide">
                        <div className="rounded-3xl bg-brand-900 p-6 text-white md:p-8">
                            <h2 id="bookkeeping-comparison" className="font-heading text-2xl font-bold tracking-tight md:text-3xl">Basic bookkeeping vs. Strategic Bookkeeping</h2>
                            <div className="mt-6 grid gap-4 md:grid-cols-2 md:gap-6">
                                <div className="rounded-2xl border border-white/10 p-6"><h3 className="font-heading font-bold text-white/70">Basic bookkeeping</h3><p className="mt-3 max-w-prose text-sm leading-relaxed text-white/60">Records last year&apos;s activity for compliance after decisions have already been made.</p></div>
                                <div className="rounded-2xl border border-gold-500/40 bg-white/5 p-6"><h3 className="font-heading font-bold text-gold-400">Strategic Bookkeeping</h3><p className="mt-3 max-w-prose text-sm leading-relaxed text-white/80">Delivers current, categorized data that guides decisions and exposes tax opportunities during the year.</p></div>
                            </div>
                        </div>
                    </ServicePageContainer>
                </section>

                <section id="bookkeeping-proof" aria-labelledby="bookkeeping-proof-heading" className="bg-white py-12 md:py-16">
                    <ServicePageContainer variant="wide">
                        <SectionHeader label="Proof in the close" heading="Timely books change the conversation" headingId="bookkeeping-proof-heading" />
                        <article className="mx-auto mt-10 max-w-4xl rounded-3xl border border-gold-200 bg-gold-50 p-6 md:p-8">
                            <p className="max-w-prose font-heading text-xl font-bold leading-snug text-brand-900">A $1.2M contractor reduced its quarterly close from three weeks to three days after a focused cleanup and monthly cadence.</p>
                            <p className="mt-5 text-sm font-semibold text-gold-700">Client result &middot; Construction business</p>
                        </article>
                    </ServicePageContainer>
                </section>

                <section aria-labelledby="bookkeeping-faq" className="bg-white py-12 md:py-16">
                    <ServicePageContainer variant="wide">
                        <SectionHeader label="Questions answered" heading="Bookkeeping FAQs" headingId="bookkeeping-faq" className="mb-10" />
                        <div className="mx-auto max-w-4xl"><ServiceFAQ items={faqItems} /></div>
                    </ServicePageContainer>
                </section>

                <section className="bg-brand-900 px-5 py-12 text-center md:px-6 md:py-20">
                    <div className="mx-auto max-w-2xl">
                        <h2 className="font-heading text-3xl font-bold tracking-tight text-white md:text-4xl">Ready to stop overpaying?</h2>
                        <p className="mt-4 text-base leading-relaxed text-white/70 md:text-lg">Get a bookkeeping system that keeps your numbers current and your tax strategy informed.</p>
                        <Link href="/contact" className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-gold-500 px-6 py-3 font-heading font-bold text-brand-900 transition-colors hover:bg-gold-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400">Book a Strategy Call <ArrowRight className="h-5 w-5" aria-hidden="true" /></Link>
                    </div>
                </section>
            </main>

            <MobileStickyCta anchorId="bookkeeping-hero-cta" href="/contact" label="Book a Strategy Call" />
            <Footer />
        </div>
    );
}
