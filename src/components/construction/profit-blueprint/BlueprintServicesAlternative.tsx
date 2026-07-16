import { ArrowRight, Building2, FileText, Handshake } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

const services = [
    {
        title: "Tax Filing & Preparation",
        description: "Keep filing accurate, compliant, and connected to the tax strategy behind your work.",
        href: "/tax-preparation-and-filing",
        icon: FileText,
    },
    {
        title: "New Business Formation",
        description: "Set up the right entity and operating foundation before small decisions become costly ones.",
        href: "/new-business-formation",
        icon: Building2,
    },
];

export function BlueprintServicesAlternative() {
    return (
        <section className="bg-slate-50 pt-12 pb-28 sm:py-16 lg:py-20" aria-labelledby="services-alternative-heading">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <RevealOnScroll>
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:rounded-3xl sm:p-9 lg:p-10">
                        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12">
                            <div>
                                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold-200 bg-gold-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-gold-700">
                                    <Handshake className="h-3.5 w-3.5" />
                                    Hands-on support
                                </div>
                                <h2 id="services-alternative-heading" className="font-heading text-3xl font-black leading-[1.08] tracking-tight text-brand-900 sm:text-4xl">
                                    Rather have an expert handle it with you?
                                </h2>
                                <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
                                    The Blueprint gives you the playbook. If you would rather have an advisor help put it to work, our team applies the same tax structure, profit visibility, and business setup principles directly to your contracting business.
                                </p>
                                <Link
                                    href="/services"
                                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-900 px-5 py-3 text-xs font-black uppercase tracking-wider text-white transition-colors hover:bg-brand-800 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2"
                                >
                                    View All Services
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </div>

                            <div className="grid gap-3 sm:grid-cols-2">
                                {services.map(({ title, description, href, icon: Icon }) => (
                                    <Link
                                        key={href}
                                        href={href}
                                        className="group rounded-xl border border-slate-200 bg-slate-50 p-5 transition-colors hover:border-gold-300 hover:bg-gold-50/50 focus:outline-none focus:ring-2 focus:ring-gold-500"
                                    >
                                        <Icon className="h-5 w-5 text-gold-600" />
                                        <h3 className="mt-4 flex items-center justify-between gap-3 text-base font-black text-brand-900">
                                            {title}
                                            <ArrowRight className="h-4 w-4 shrink-0 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-gold-600" />
                                        </h3>
                                        <p className="mt-2 text-sm leading-relaxed text-slate-500">{description}</p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </RevealOnScroll>
            </div>
        </section>
    );
}
