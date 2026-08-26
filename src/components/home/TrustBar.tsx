import { Fragment } from "react";
import { BadgeCheck, CalendarCheck, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";

interface TrustItem {
    icon: LucideIcon;
    label: string;
}

export const TrustBar = (): React.JSX.Element => {
    const t = useTranslations("HomeHero");

    const proof: TrustItem[] = [
        { icon: BadgeCheck, label: t("trustCredential") },
        { icon: Users, label: t("trustVolume") },
        { icon: CalendarCheck, label: t("trustExperience") },
    ];

    return (
        <section className="relative isolate bg-white py-5 sm:py-6" aria-label="Firm credentials">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                <ul
                    role="list"
                    className="flex flex-col items-center justify-center gap-3.5 sm:flex-row sm:flex-wrap md:flex-nowrap md:justify-center md:gap-8 lg:gap-12"
                >
                    {proof.map(({ icon: Icon, label }, idx) => (
                        <Fragment key={label}>
                            {idx > 0 && (
                                <li
                                    className="hidden h-4 w-px bg-slate-200 md:block"
                                    aria-hidden="true"
                                    role="presentation"
                                />
                            )}
                            <li className="flex shrink-0 items-center justify-center gap-3 text-center sm:text-left text-sm font-semibold text-brand-900">
                                <Icon className="h-5 w-5 shrink-0 text-gold-700" aria-hidden="true" />
                                <span className="whitespace-nowrap">{label}</span>
                            </li>
                        </Fragment>
                    ))}
                </ul>
            </div>
        </section>
    );
};

