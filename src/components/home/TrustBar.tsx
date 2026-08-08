import { BadgeCheck, BriefcaseBusiness, Users } from "lucide-react";

export function TrustBar() {
    const proof = [
        { icon: BadgeCheck, label: "IRS Enrolled Agent" },
        { icon: Users, label: "200+ Contractors Served" },
        { icon: BriefcaseBusiness, label: "Proactive, year-round planning" },
    ];

    return (
        <section className="border-b border-slate-200 bg-white py-6" aria-label="Firm credentials">
            <div className="mx-auto grid max-w-screen-xl gap-4 px-4 sm:grid-cols-3 sm:px-6 lg:px-8">
                {proof.map(({ icon: Icon, label }) => <div key={label} className="flex items-center justify-center gap-3 text-sm font-semibold text-brand-900"><Icon className="h-5 w-5 text-gold-700" aria-hidden="true" />{label}</div>)}
            </div>
        </section>
    );
}
