import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { ChevronDown, Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react";
import { EABadge } from "@/components/ui/EABadge";
import { Link } from "@/i18n/navigation";
import { sanityFetch } from "@/sanity/lib/live";
import { SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";

type FooterLink = {
    href: string;
    label: string;
    emphasized?: boolean;
};

export async function Footer() {
    const locale = await getLocale();
    const tFooter = await getTranslations({ locale, namespace: "Footer" });
    const tHeader = await getTranslations({ locale, namespace: "Header" });
    const { data: siteSettings } = await sanityFetch({ query: SITE_SETTINGS_QUERY, params: { locale } });

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

    const addressText = formatAddress(siteSettings?.address) || tFooter("fallbackAddress");
    const phoneText = (typeof siteSettings?.phone === "string" && siteSettings.phone.trim()) || tFooter("fallbackPhone");
    const phoneHref = formatTelHref(siteSettings?.phone) || formatTelHref(phoneText) || "tel:+18015550123";
    const emailText = (typeof siteSettings?.email === "string" && siteSettings.email.trim()) || tFooter("fallbackEmail");
    const emailHref = formatMailtoHref(siteSettings?.email) || formatMailtoHref(emailText) || "mailto:hello@unionnationaltax.com";

    const navigationGroups: Array<{ title: string; links: FooterLink[] }> = [
        {
            title: tFooter("advisoryTitle"),
            links: [
                { label: tFooter("advisoryLinks.scorp"), href: "/s-corp-tax-advantage" },
                { label: tFooter("advisoryLinks.taxPlanning"), href: "/tax-planning" },
                { label: tFooter("advisoryLinks.bookkeeping"), href: "/strategic-bookkeeping" },
                { label: tFooter("advisoryLinks.fractionalCfo"), href: "/fractional-cfo" },
                { label: tFooter("viewAllServices"), href: "/services", emphasized: true },
            ],
        },
        {
            title: tFooter("complianceTitle"),
            links: [
                { label: tFooter("complianceLinks.taxPrep"), href: "/tax-preparation-and-filing" },
                { label: tFooter("complianceLinks.newBusinessFormation"), href: "/new-business-formation" },
                { label: tFooter("complianceLinks.payroll"), href: "/payroll-services" },
            ],
        },
        {
            title: tFooter("companyTitle"),
            links: [
                { label: tHeader("about"), href: "/about" },
                { label: tFooter("team"), href: "/team" },
                { label: tHeader("industries"), href: "/industries" },
                { label: tHeader("contact"), href: "/contact" },
            ],
        },
        {
            title: tFooter("resourcesTitle"),
            links: [
                { label: tFooter("resourceCenter"), href: "/resources" },
                { label: tHeader("faq"), href: "/faq" },
                { label: tHeader("shop"), href: "/shop" },
            ],
        },
    ];

    const legalLinks: FooterLink[] = [
        { label: tFooter("disclaimer"), href: "/legal/disclaimer" },
        { label: tFooter("privacy"), href: "/legal/privacy-policy" },
        { label: tFooter("terms"), href: "/legal/terms-of-service" },
    ];

    const configuredSocialLinks = [
        { icon: Linkedin, href: siteSettings?.socialLinks?.linkedin, label: "LinkedIn" },
        { icon: Facebook, href: siteSettings?.socialLinks?.facebook, label: "Facebook" },
        { icon: Youtube, href: siteSettings?.socialLinks?.youtube, label: "YouTube" },
        { icon: Instagram, href: siteSettings?.socialLinks?.instagram, label: "Instagram" },
        { icon: Twitter, href: siteSettings?.socialLinks?.twitter, label: "Twitter" },
    ].filter((link): link is typeof link & { href: string } => Boolean(link.href));

    const socialLinks = configuredSocialLinks.length > 0
        ? configuredSocialLinks
        : [
            { icon: Linkedin, href: "https://www.linkedin.com/in/jason-astwood-ea-lutcf-fscp-8337a476/", label: "LinkedIn" },
            { icon: Facebook, href: "https://www.facebook.com/UnionNationalTax", label: "Facebook" },
            { icon: Youtube, href: "https://www.youtube.com/@JasonAstwood", label: "YouTube" },
            { icon: Instagram, href: "https://www.instagram.com/unionnationaltax/?hl=en", label: "Instagram" },
        ];

    const renderLinkList = (links: FooterLink[]) => (
        <ul className="space-y-1.5">
            {links.map((link) => (
                <li key={link.href}>
                    <Link
                        href={link.href}
                        className={`inline-flex min-h-10 items-center text-sm leading-snug underline-offset-4 transition-colors hover:text-gold-400 hover:underline focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 ${
                            link.emphasized ? "font-semibold text-gold-400" : "text-zinc-300"
                        }`}
                    >
                        {link.label}
                    </Link>
                </li>
            ))}
        </ul>
    );

    return (
        <footer id="site-footer" className="border-t border-white/10 bg-brand-900">
            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
                <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
                    <div className="lg:col-span-4">
                        <Link
                            href="/"
                            aria-label={tFooter("homeLinkLabel")}
                            className="relative block h-16 w-full max-w-[22rem] rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-500"
                        >
                            {siteSettings?.logo?.asset?.url ? (
                                <Image
                                    src={siteSettings.logo.asset.url}
                                    alt={siteSettings.logo.alt || siteSettings.companyName || tFooter("defaultCompanyName")}
                                    fill
                                    className="object-contain object-left"
                                />
                            ) : siteSettings?.logoAlt?.asset?.url ? (
                                <Image
                                    src={siteSettings.logoAlt.asset.url}
                                    alt={siteSettings.logoAlt.alt || siteSettings.companyName || tFooter("defaultCompanyName")}
                                    fill
                                    className="object-contain object-left"
                                />
                            ) : (
                                <Image
                                    src="/images/logo.png"
                                    alt={tFooter("defaultCompanyName")}
                                    fill
                                    className="object-contain object-left brightness-0 invert opacity-90"
                                />
                            )}
                        </Link>

                        <p className="mt-5 max-w-sm text-sm leading-6 text-zinc-300">
                            {tFooter("brandBio")}
                        </p>

                        <EABadge
                            className="mt-5"
                            label={tFooter("credentialLabel")}
                            detail={tFooter("credentialDetail")}
                        />

                        <div className="mt-6 space-y-1 text-sm text-zinc-300">
                            <Link href="/contact" className="group flex min-h-10 items-center gap-3 rounded-sm hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500">
                                <MapPin aria-hidden="true" className="h-4 w-4 shrink-0 text-gold-500" />
                                <span>{addressText}</span>
                            </Link>
                            <a href={phoneHref} className="group flex min-h-10 items-center gap-3 rounded-sm hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500">
                                <Phone aria-hidden="true" className="h-4 w-4 shrink-0 text-gold-500" />
                                <span>{phoneText}</span>
                            </a>
                            <a href={emailHref} className="group flex min-h-10 items-center gap-3 rounded-sm hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500">
                                <Mail aria-hidden="true" className="h-4 w-4 shrink-0 text-gold-500" />
                                <span className="break-all">{emailText}</span>
                            </a>
                        </div>

                        <div className="mt-5 flex flex-wrap gap-2">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 text-zinc-200 transition-all hover:-translate-y-0.5 hover:border-gold-500 hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500"
                                    aria-label={tFooter("followOn", { platform: social.label })}
                                >
                                    <social.icon aria-hidden="true" className="h-5 w-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    <nav aria-label={tFooter("navigationLabel")} className="lg:col-span-8">
                        <div className="hidden grid-cols-4 gap-x-6 md:grid">
                            {navigationGroups.map((group) => (
                                <section key={group.title} aria-labelledby={`footer-${group.title.replace(/\s+/g, "-").toLowerCase()}`}>
                                    <h2 id={`footer-${group.title.replace(/\s+/g, "-").toLowerCase()}`} className="home-eyebrow mb-4 text-white">
                                        {group.title}
                                    </h2>
                                    {renderLinkList(group.links)}
                                </section>
                            ))}
                        </div>

                        <div className="divide-y divide-white/10 border-y border-white/10 md:hidden">
                            {navigationGroups.map((group) => (
                                <details key={group.title} className="group">
                                    <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-white focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 [&::-webkit-details-marker]:hidden">
                                        {group.title}
                                        <ChevronDown aria-hidden="true" className="h-5 w-5 shrink-0 text-gold-500 transition-transform group-open:rotate-180" />
                                    </summary>
                                    <div className="pb-4 pl-1">{renderLinkList(group.links)}</div>
                                </details>
                            ))}
                        </div>
                    </nav>
                </div>

                <div className="mt-10 border-t border-white/10 pt-6">
                    <p className="max-w-3xl text-sm font-normal leading-6 text-zinc-300">
                        <span className="font-semibold text-white">{tFooter("disclaimerLabel")}</span>{" "}
                        {tFooter("disclaimerBody")}
                    </p>
                </div>

                <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-5 text-sm text-zinc-300 sm:flex-row sm:items-center sm:justify-between">
                    <p>{tFooter("copyright", { year: new Date().getFullYear() })}</p>
                    <nav aria-label={tFooter("legalNavigationLabel")}>
                        <ul className="flex flex-wrap gap-x-5 gap-y-1">
                            {legalLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="inline-flex min-h-10 items-center rounded-sm underline-offset-4 transition-colors hover:text-gold-400 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </footer>
    );
}
