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
                <div className="overflow-hidden motion-reduce:hidden sm:hidden">
                    <div className="flex w-max items-center gap-8 animate-trust-bar-marquee hover:[animation-play-state:paused]">
                        <ul role="list" className="flex shrink-0 items-center gap-8" aria-label="Firm credentials">
                            {proof.map(({ icon: Icon, label }) => (
                                <li key={label} className="flex max-w-[calc(100vw-2rem)] shrink-0 items-center gap-3 text-sm font-semibold text-brand-900">
                                    <Icon className="h-5 w-5 shrink-0 text-gold-700" aria-hidden="true" />
                                    <span className="break-words">{label}</span>
                                </li>
                            ))}
                        </ul>
                        <ul aria-hidden="true" className="flex shrink-0 items-center gap-8">
                            {proof.map(({ icon: Icon, label }) => (
                                <li key={`duplicate-${label}`} className="flex max-w-[calc(100vw-2rem)] shrink-0 items-center gap-3 text-sm font-semibold text-brand-900">
                                    <Icon className="h-5 w-5 shrink-0 text-gold-700" aria-hidden="true" />
                                    <span className="break-words">{label}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <ul
                    role="list"
                    className="hidden flex-col items-center justify-center gap-3.5 motion-reduce:flex sm:flex sm:flex-row sm:flex-wrap md:flex-nowrap md:justify-center md:gap-8 lg:gap-12"
                >
                    {proof.map(({ icon: Icon, label }, idx) => (
                        <li key={label} className="flex max-w-full items-center justify-center gap-3 text-center text-sm font-semibold text-brand-900 sm:text-left">
                            {idx > 0 && (
                                <span
                                    className="hidden h-4 w-px bg-slate-200 md:block"
                                    aria-hidden="true"
                                />
                            )}
                            <Icon className="h-5 w-5 shrink-0 text-gold-700" aria-hidden="true" />
                            <span className="break-words">{label}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};
