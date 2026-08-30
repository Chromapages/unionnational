import Image from "next/image";
import { unstable_cache } from "next/cache";
import { getLocale, getTranslations } from "next-intl/server";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react";
import { EABadge } from "@/components/ui/EABadge";
import { Link } from "@/i18n/navigation";
import { FooterNavigation, type FooterNavigationGroup, type FooterNavigationLink } from "@/components/layout/FooterNavigation";
import { FooterAnalytics } from "@/components/layout/FooterAnalytics";
import { FooterDisclaimerModal } from "@/components/layout/FooterDisclaimerModal";
import { fetchWithLocale, type SanityLocale } from "@/sanity/lib/client";
import { SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";

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
        { revalidate: 900 },
    )();

export async function Footer() {
    const locale = await getLocale() as SanityLocale;
    const tFooter = await getTranslations({ locale, namespace: "Footer" });
    const tHeader = await getTranslations({ locale, namespace: "Header" });
    const siteSettings = await getCachedFooterSettings(locale);

    const formatAddress = (address: unknown): string | null => {
        if (!address) return null;
        if (typeof address === "string") {
            const trimmed = address.trim();
            return trimmed.length ? trimmed : null;
        }

        if (typeof address !== "object") return null;

        const value = address as Partial<Record<"street" | "city" | "state" | "zip", unknown>>;
        const street = typeof value.street === "string" ? value.street.trim() : "";
        const city = typeof value.city === "string" ? value.city.trim() : "";
        const state = typeof value.state === "string" ? value.state.trim() : "";
        const zip = typeof value.zip === "string" ? value.zip.trim() : "";
        const cityState = [city, state].filter(Boolean).join(", ");
        const line2 = [cityState, zip].filter(Boolean).join(cityState && zip ? " " : "");
        const joined = [street, line2].filter(Boolean).join(", ");

        return joined.length ? joined : null;
    };

    const formatTelHref = (phone: unknown): string | null => {
        if (typeof phone !== "string") return null;
        const trimmed = phone.trim();
        if (!trimmed.length) return null;
        const telSafe = trimmed.replace(/[^\d+]/g, "");
        return telSafe.length ? `tel:${telSafe}` : null;
    };

    const formatMailtoHref = (email: unknown): string | null => {
        if (typeof email !== "string") return null;
        const trimmed = email.trim();
        return trimmed.length ? `mailto:${trimmed}` : null;
    };

    const hasVerifiedCredential = Boolean(siteSettings?.credentialVerifiedBy && siteSettings?.credentialVerifiedAt);
    const hasVerifiedContact = Boolean(siteSettings?.contactDetailsVerifiedBy && siteSettings?.contactDetailsVerifiedAt);
    const addressText = hasVerifiedContact ? formatAddress(siteSettings?.address) : null;
    const phoneText = hasVerifiedContact && typeof siteSettings?.phone === "string" && siteSettings.phone.trim() ? siteSettings.phone.trim() : null;
    const phoneHref = formatTelHref(phoneText);
    const emailText = hasVerifiedContact && typeof siteSettings?.email === "string" && siteSettings.email.trim() ? siteSettings.email.trim() : null;
    const emailHref = formatMailtoHref(emailText);
    const showOfficeAddress = siteSettings?.showOfficeAddressInFooter === true && Boolean(addressText);
    const hasPhoneOrEmail = Boolean(phoneHref) || Boolean(emailHref);

    const navigationGroups: FooterNavigationGroup[] = [
        {
            id: "advisory",
            title: tFooter("advisoryTitle"),
            links: [
                { label: tFooter("advisoryLinks.scorp"), href: "/s-corp-tax-advantage" },
                { label: tFooter("advisoryLinks.taxPlanning"), href: "/tax-planning" },
                { label: tFooter("advisoryLinks.bookkeeping"), href: "/strategic-bookkeeping" },
                { label: tFooter("advisoryLinks.fractionalCfo"), href: "/fractional-cfo" },
                { label: tFooter("viewAllServices"), href: "/services", emphasized: true, analyticsEvent: "footer_service_directory_navigate", destinationId: "services_directory", preserveCampaign: true },
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
            id: "company_industries",
            title: tFooter("companyAndIndustriesTitle"),
            links: [
                { label: tHeader("about"), href: "/about" },
                { label: tFooter("team"), href: "/team" },
                { label: tHeader("industries"), href: "/industries" },
            ],
        },
        {
            id: "resources_shop",
            title: tFooter("resourcesAndShopTitle"),
            links: [
                { label: tFooter("resourceCenter"), href: "/resources", analyticsEvent: "footer_resource_navigate", destinationId: "resource_center" },
                { label: tHeader("faq"), href: "/faq", analyticsEvent: "footer_resource_navigate", destinationId: "faq" },
                { label: tHeader("shop"), href: "/shop", analyticsEvent: "footer_resource_navigate", destinationId: "shop" },
            ],
        },
    ];

    const legalLinks: FooterNavigationLink[] = [
        { label: tFooter("disclaimer"), href: "/legal/disclaimer", analyticsEvent: "footer_legal_access", destinationId: "disclaimer" },
        { label: tFooter("privacy"), href: "/legal/privacy-policy", analyticsEvent: "footer_legal_access", destinationId: "privacy_policy" },
        { label: tFooter("terms"), href: "/legal/terms-of-service", analyticsEvent: "footer_legal_access", destinationId: "terms_of_service" },
    ];

    const configuredSocialLinks = [
        { icon: Linkedin, href: siteSettings?.socialLinks?.linkedin, label: "LinkedIn" },
        { icon: Facebook, href: siteSettings?.socialLinks?.facebook, label: "Facebook" },
        { icon: Youtube, href: siteSettings?.socialLinks?.youtube, label: "YouTube" },
        { icon: Instagram, href: siteSettings?.socialLinks?.instagram, label: "Instagram" },
        { icon: Twitter, href: siteSettings?.socialLinks?.twitter, label: "Twitter" },
    ].filter((link): link is typeof link & { href: string } => Boolean(link.href));

    const socialLinks = siteSettings?.socialLinksVerifiedBy && siteSettings?.socialLinksVerifiedAt
        ? configuredSocialLinks
        : [];
    const copyrightText = (siteSettings?.copyrightText || tFooter("copyrightTextFallback"))
        .replace(/^(?:©\s*(?:\{year\}|\d{4})\s*)+/i, "")
        .trim();

    return (
        <footer id="site-footer" className="border-t border-white/10 bg-brand-900">
            <FooterAnalytics />
            <div className="footer-authority-rail mx-auto w-full max-w-screen-2xl px-4 pt-8 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-6 sm:py-10 lg:px-8 lg:py-12">
                <div className="footer-authority-primary">
                    <div className="max-w-[20rem]">
                        <div className="space-y-3">
                        <Link
                            href="/"
                            aria-label={tFooter("homeLinkLabel")}
                            className="relative block h-12 w-full max-w-[18rem] rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-500"
                        >
                            {siteSettings?.logo?.asset?.url ? (
                                <Image
                                    src={siteSettings.logo.asset.url}
                                    alt=""
                                    fill
                                    className="object-contain object-left"
                                />
                            ) : siteSettings?.logoAlt?.asset?.url ? (
                                <Image
                                    src={siteSettings.logoAlt.asset.url}
                                    alt=""
                                    fill
                                    className="object-contain object-left"
                                />
                            ) : (
                                <Image
                                    src="/images/Untitled design.svg"
                                    alt=""
                                    fill
                                    className="object-contain object-left brightness-0 invert opacity-90"
                                />
                            )}
                        </Link>

                        {hasVerifiedCredential ? (
                            <EABadge
                                compact
                                label={siteSettings?.footerCredentialLabel || tFooter("credentialLabel")}
                                detail={siteSettings?.footerCredentialDetail || tFooter("credentialDetail")}
                            />
                        ) : null}
                        </div>

                        {showOfficeAddress ? (
                            <address className="mt-4 not-italic text-sm text-zinc-300">
                                <Link href="/contact" data-footer-event="footer_contact_activate" data-footer-destination-id="office_details" className="group flex min-h-11 items-center gap-3 rounded-sm hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500">
                                    <MapPin aria-hidden="true" className="h-4 w-4 shrink-0 text-gold-500" />
                                    <span>
                                        <span className="block text-xs font-semibold uppercase tracking-wide text-zinc-400">{tFooter("officeDetails")}</span>
                                        <span className="mt-0.5 block">{addressText}</span>
                                    </span>
                                </Link>
                            </address>
                        ) : null}

                        {hasPhoneOrEmail ? (
                            <address className="mt-4 not-italic">
                                <div className="space-y-2 text-sm text-zinc-300">
                                    {phoneHref && phoneText ? (
                                        <a href={phoneHref} data-footer-event="footer_contact_activate" data-footer-destination-id="phone" className="group -mx-2 flex min-h-12 items-center gap-3 rounded-md px-2 transition-[background-color,color,transform] duration-150 hover:bg-white/5 hover:text-white active:scale-[0.99] active:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 motion-reduce:transition-none">
                                            <Phone aria-hidden="true" className="h-4 w-4 shrink-0 text-gold-500" />
                                            <span className="min-w-0">
                                                <span className="block text-xs font-semibold uppercase tracking-wide text-zinc-400">{tFooter("phoneLabel")}</span>
                                                <span className="mt-0.5 block">{phoneText}</span>
                                            </span>
                                        </a>
                                    ) : null}
                                    {emailHref && emailText ? (
                                        <a href={emailHref} data-footer-event="footer_contact_activate" data-footer-destination-id="email" className="group -mx-2 flex min-h-12 items-center gap-3 rounded-md px-2 transition-[background-color,color,transform] duration-150 hover:bg-white/5 hover:text-white active:scale-[0.99] active:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 motion-reduce:transition-none">
                                            <Mail aria-hidden="true" className="h-4 w-4 shrink-0 text-gold-500" />
                                            <span className="min-w-0">
                                                <span className="block text-xs font-semibold uppercase tracking-wide text-zinc-400">{tFooter("emailLabel")}</span>
                                                <span className="mt-0.5 block break-all">{emailText}</span>
                                            </span>
                                        </a>
                                    ) : null}
                                </div>
                            </address>
                        ) : null}

                        <Link href="/contact" data-footer-event="footer_contact_activate" data-footer-destination-id="contact_page" className="mt-4 inline-flex min-h-11 items-center font-semibold text-zinc-200 underline decoration-gold-500 underline-offset-4 transition-colors duration-150 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 motion-reduce:transition-none">
                            {tFooter("contactTitle")}
                        </Link>

                        {socialLinks.length > 0 ? (
                            <nav aria-label={tFooter("socialNavigationLabel")} className="mt-4">
                                <ul className="flex flex-wrap gap-2">
                                    {socialLinks.map((social) => (
                                        <li key={social.label}>
                                            <a
                                                href={social.href}
                                                data-footer-event="footer_social_exit"
                                                data-footer-destination-id={social.label.toLowerCase()}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex h-11 w-11 items-center justify-center rounded-full border border-zinc-400 bg-white/5 text-zinc-200 transition-colors hover:border-gold-500 hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500"
                                                aria-label={tFooter("followOn", { platform: social.label })}
                                            >
                                                <social.icon aria-hidden="true" className="h-5 w-5" />
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        ) : null}
                    </div>

                    <div className="min-w-0">
                        <FooterNavigation
                            groups={navigationGroups}
                            navigationLabel={tFooter("navigationLabel")}
                        />
                    </div>
                </div>

                <div className="mt-5 border-t border-white/10 pt-3">
                    <FooterDisclaimerModal
                        label={tFooter("readDisclaimer")}
                        closeLabel={tFooter("closeDisclaimer")}
                        content={siteSettings?.footerDisclaimerSummary || tFooter("disclaimerBody")}
                    />
                </div>

                <div className="mt-4 flex flex-col gap-3 border-t border-white/10 pt-4 text-sm text-zinc-300 lg:flex-row lg:items-center lg:justify-between">
                    <nav aria-label={tFooter("legalNavigationLabel")} className="lg:order-2">
                        <ul className="flex flex-col items-start gap-1">
                            {legalLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        data-footer-event={link.analyticsEvent}
                                        data-footer-destination-id={link.destinationId}
                                        className="inline-flex min-h-11 max-w-full items-center rounded-sm text-pretty text-zinc-200 underline decoration-white/20 underline-offset-4 transition-colors duration-150 hover:text-gold-400 hover:decoration-gold-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 motion-reduce:transition-none"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <p className="lg:order-1">© {new Date().getFullYear()} {copyrightText}</p>
                </div>
            </div>
        </footer>
    );
}
