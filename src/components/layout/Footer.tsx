import Image from "next/image";
import { unstable_cache } from "next/cache";
import { getLocale, getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { FooterNavigation, type FooterNavigationGroup, type FooterNavigationLink } from "@/components/layout/FooterNavigation";
import { FooterAnalytics } from "@/components/layout/FooterAnalytics";
import { FooterDisclaimerModal } from "@/components/layout/FooterDisclaimerModal";
import { TrackingPreferences } from "@/components/privacy/TrackingPreferences";
import { fetchWithLocale, type SanityLocale } from "@/sanity/lib/client";
import { FOOTER_LEGAL_PAGES_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";

type FooterSettings = {
    companyName?: string;
    address?: unknown;
    phone?: string;
    email?: string;
    logo?: { asset?: { url?: string }; alt?: string };
    logoAlt?: { asset?: { url?: string }; alt?: string };
    socialLinks?: { linkedin?: string; facebook?: string; youtube?: string; instagram?: string; twitter?: string };
    showOfficeAddressInFooter?: boolean;
    credentialVerifiedBy?: string;
    credentialVerifiedAt?: string;
    contactDetailsVerifiedBy?: string;
    contactDetailsVerifiedAt?: string;
    socialLinksVerifiedBy?: string;
    socialLinksVerifiedAt?: string;
    footerCredentialLabel?: string;
    footerCredentialDetail?: string;
    footerDisclaimerSummary?: string;
    copyrightText?: string;
};

const getCachedFooterSettings = (locale: SanityLocale) =>
    unstable_cache(
        () => fetchWithLocale<FooterSettings | null>(SITE_SETTINGS_QUERY, locale),
        ["footer-site-settings", locale],
        { revalidate: 900, tags: ["site-settings"] },
    )();

export const getCachedLegalPages = (locale: SanityLocale) =>
    unstable_cache(
        () => fetchWithLocale<Array<{ slug: string; pageType: string }>>(FOOTER_LEGAL_PAGES_QUERY, locale),
        ["footer-legal-pages", locale],
        { revalidate: 900, tags: ["site-settings"] },
    )();

export async function Footer({ bookingCta = false, compact = false, bookingLabel }: { bookingCta?: boolean; compact?: boolean; bookingLabel?: string } = {}): Promise<React.JSX.Element> {
    const locale = (await getLocale()) as SanityLocale;
    const tFooter = await getTranslations({ locale, namespace: "Footer" });
    const tHeader = await getTranslations({ locale, namespace: "Header" });
    const [siteSettings, legalPages] = await Promise.all([
        getCachedFooterSettings(locale).catch(() => null),
        getCachedLegalPages(locale).catch(() => []),
    ]);
    const termsSlug = legalPages?.find((page) => page.pageType === "terms")?.slug;

    const navigationGroups: FooterNavigationGroup[] = [
        {
            id: "advisory",
            title: tFooter("advisoryTitle"),
            links: [
                { label: tFooter("advisoryLinks.scorp"), href: "/s-corp-tax-advantage" },
                { label: tFooter("advisoryLinks.taxPlanning"), href: "/tax-planning" },
                { label: tFooter("advisoryLinks.bookkeeping"), href: "/strategic-bookkeeping" },
                { label: tFooter("advisoryLinks.fractionalCfo"), href: "/fractional-cfo" },
                {
                    label: tFooter("viewAllServices"),
                    href: "/services",
                    emphasized: true,
                    analyticsEvent: "footer_service_directory_navigate",
                    destinationId: "services_directory",
                    preserveCampaign: true,
                },
            ],
        },
        {
            id: "compliance",
            title: tFooter("complianceTitle"),
            links: [
                { label: tFooter("complianceLinks.taxPrep"), href: "/tax-preparation-and-filing" },
                { label: tFooter("complianceLinks.newBusinessFormation"), href: "/new-business-formation" },
                { label: tFooter("complianceLinks.payroll"), href: "/payroll-services" },
            ],
        },
        {
            id: "company",
            title: tFooter("companyTitle"),
            links: [
                { label: tHeader("about"), href: "/about" },
                { label: tFooter("team"), href: "/team" },
                { label: tFooter("whoWeHelp"), href: "/industries" },
            ],
        },
        {
            id: "resources",
            title: tFooter("resourcesTitle"),
            links: [
                {
                    label: tFooter("resourceCenter"),
                    href: "/resources",
                    analyticsEvent: "footer_resource_navigate",
                    destinationId: "resource_center",
                },
                { label: tHeader("faq"), href: "/faq", analyticsEvent: "footer_resource_navigate", destinationId: "faq" },
                { label: tHeader("shop"), href: "/shop", analyticsEvent: "footer_resource_navigate", destinationId: "shop" },
            ],
        },
    ];

    const legalLinks: FooterNavigationLink[] = [
        {
            label: tFooter("disclaimer"),
            href: "/legal/disclaimer",
            analyticsEvent: "footer_legal_access",
            destinationId: "disclaimer",
        },
        {
            label: tFooter("privacy"),
            href: "/legal/privacy-policy",
            analyticsEvent: "footer_legal_access",
            destinationId: "privacy_policy",
        },
        ...(termsSlug ? [{
            label: tFooter("terms"),
            href: `/legal/${termsSlug}`,
            analyticsEvent: "footer_legal_access",
            destinationId: "terms_of_service",
        }] : []),
    ];

    const rawCopyright = siteSettings?.copyrightText || tFooter("copyrightTextFallback");
    const copyrightCompany = rawCopyright.replace(/^(?:©\s*(?:\{year\}|\d{4})\s*)+/i, "").trim();
    const currentYear = new Date().getFullYear();

    if (compact) return <footer id="site-footer" className="border-t border-white/10 bg-[#071d1a] text-slate-200">
        <FooterAnalytics />
        <div className="mx-auto flex w-full max-w-[94rem] flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] text-sm sm:px-6 lg:px-8">
            <p className="text-sm leading-relaxed">© {currentYear} {copyrightCompany}</p>
            <nav aria-label={tFooter("legalNavigationLabel")}><ul className="flex flex-wrap items-center gap-x-5 gap-y-1">
                {legalLinks.map(link => <li key={link.href}><Link href={link.href} data-footer-event={link.analyticsEvent} data-footer-destination-id={link.destinationId} className="inline-flex min-h-11 items-center rounded-sm text-slate-200 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400">{link.label}</Link></li>)}
                <li><Link href="/contact" data-footer-event="footer_contact_activate" data-footer-destination-id="contact_page" className="inline-flex min-h-11 items-center rounded-sm text-slate-200 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400">{tFooter("contactTitle")}</Link></li>
                <li><TrackingPreferences locale={locale} /></li>
            </ul></nav>
            <FooterDisclaimerModal label={tFooter("readDisclaimer")} closeLabel={tFooter("closeDisclaimer")} content={siteSettings?.footerDisclaimerSummary || tFooter("disclaimerBody")} />
        </div>
    </footer>;

    const tagline =
        tFooter("tagline") !== "tagline"
            ? tFooter("tagline")
            : "Proactive tax and financial guidance for the decisions ahead — not just the year behind.";

    return (
        <footer id="site-footer" className={`border-t border-white/10 bg-[#071d1a] text-slate-300 ${bookingCta ? "[&_a]:min-h-11 [&_a]:min-w-11" : ""}`}>
            <FooterAnalytics />

            <div className="mx-auto w-full max-w-screen-2xl px-4 pt-12 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-6 sm:pt-16 sm:pb-12 lg:px-8">

                {/* 1. Main Content Grid */}
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14 items-start">

                    {/* Left Brand Column */}
                    <div className="flex flex-col lg:col-span-5 xl:col-span-4">
                        <Link
                            href="/"
                            aria-label={tFooter("homeLinkLabel")}
                            className="group flex w-fit items-center gap-3 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-500"
                        >
                            {siteSettings?.logo?.asset?.url ? (
                                <div className="relative h-10 w-44">
                                    <Image
                                        src={siteSettings.logo.asset.url}
                                        alt={siteSettings.companyName || "Union National Tax"}
                                        fill
                                        sizes="176px"
                                        className="object-contain object-left"
                                    />
                                </div>
                            ) : (
                                <>
                                    {/* Gold Square Tile Mark */}
                                    <div
                                        className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#f3e1a0]/70 bg-gradient-to-br from-[#f3db87] via-[#d4af37] to-[#8f7020] p-1.5 shadow-md"
                                        aria-hidden="true"
                                    >
                                        <div className="h-full w-full rounded-sm border border-[#fff6cc]/40 bg-gradient-to-tr from-[#7c5e13]/30 to-transparent" />
                                    </div>
                                    <span className="font-heading text-xl font-bold tracking-tight text-white transition-colors group-hover:text-gold-300">
                                        {siteSettings?.companyName || "Union National Tax"}
                                    </span>
                                </>
                            )}
                        </Link>

                        <p className="mt-4 max-w-sm font-sans text-sm leading-relaxed text-slate-300">
                            {bookingLabel ? tagline.replace(/[—–]/g, "-") : tagline}
                        </p>

                        <div className="mt-6">
                            <Link
                                href={bookingCta ? "/book" : "/contact"}
                                data-footer-event="footer_contact_activate"
                                data-footer-destination-id={bookingCta ? "booking_page" : "contact_page"}
                                className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-[#e2bb58] px-6 py-3 font-sans text-sm font-bold text-brand-950 shadow-sm transition-colors hover:bg-[#ebd074] active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-400 motion-reduce:transition-none"
                            >
                                <span>{bookingLabel || (bookingCta ? tHeader("bookCall") : tFooter("contactTitle"))}</span>
                                <ArrowRight className="h-4 w-4" aria-hidden="true" />
                            </Link>
                        </div>

                    </div>

                    {/* Right 4 Navigation Columns */}
                    <div className="min-w-0 lg:col-span-7 xl:col-span-8">
                        <FooterNavigation
                            groups={navigationGroups}
                            navigationLabel={tFooter("navigationLabel")}
                        />
                    </div>
                </div>

                {/* 2. Bottom Legal Bar & Copyright */}
                <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 font-sans text-xs text-slate-400 sm:mt-16 sm:flex-row sm:pt-8">
                    <p className="text-center sm:text-left">
                        © {currentYear} {copyrightCompany}
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
                        <nav aria-label={tFooter("legalNavigationLabel")}>
                            <ul className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                                {legalLinks.map((link, index) => (
                                    <li key={link.href} className="flex items-center gap-2 sm:gap-3">
                                        <Link
                                            href={link.href}
                                            data-footer-event={link.analyticsEvent}
                                            data-footer-destination-id={link.destinationId}
                                            className="inline-flex min-h-8 items-center rounded-sm text-slate-400 no-underline transition-colors duration-150 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 motion-reduce:transition-none"
                                        >
                                            {link.label}
                                        </Link>
                                        {index < legalLinks.length - 1 ? (
                                            <span className="text-white/20" aria-hidden="true">|</span>
                                        ) : null}
                                    </li>
                                ))}
                            </ul>
                        </nav>
                        <TrackingPreferences locale={locale} />

                        {/* Optional Accessibility Modal Trigger */}
                        <div className="ml-2 hidden sm:block">
                            <FooterDisclaimerModal
                                label={tFooter("readDisclaimer")}
                                closeLabel={tFooter("closeDisclaimer")}
                                content={siteSettings?.footerDisclaimerSummary || tFooter("disclaimerBody")}
                            />
                        </div>
                    </div>
                </div>

            </div>
        </footer>
    );
}
