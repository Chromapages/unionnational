import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react";
import { NewsletterForm } from "@/components/ui/NewsletterForm";
import { EABadge } from "@/components/ui/EABadge";
import { Link } from "@/i18n/navigation";
import { sanityFetch } from "@/sanity/lib/live";
import { FOOTER_LEGAL_PAGES_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";

export async function Footer() {
    const locale = await getLocale();
    const tFooter = await getTranslations({ locale, namespace: "Footer" });
    const tHeader = await getTranslations({ locale, namespace: "Header" });
    const { data: siteSettings } = await sanityFetch({ query: SITE_SETTINGS_QUERY, params: { locale } });
    const { data: legalPages } = await sanityFetch({ query: FOOTER_LEGAL_PAGES_QUERY, params: { locale } });

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
        if (!trimmed.length) return null;
        return `mailto:${trimmed}`;
    };

    const addressText = formatAddress(siteSettings?.address) || "Utah, United States";
    const phoneText = (typeof siteSettings?.phone === "string" && siteSettings.phone.trim()) || "(801) 555-0123";
    const phoneHref = formatTelHref(siteSettings?.phone) || formatTelHref(phoneText) || "tel:+18015550123";
    const emailText = (typeof siteSettings?.email === "string" && siteSettings.email.trim()) || "hello@unionnationaltax.com";
    const emailHref = formatMailtoHref(siteSettings?.email) || formatMailtoHref(emailText) || "mailto:hello@unionnationaltax.com";
    const complianceLinks = [
        { label: "Tax Filing & Preparation", href: "/services/tax-filing-and-preparation-services" },
        { label: "New Business Formation", href: "/services/new-business-formation" },
    ];

    const companyLinks = [
        { label: tHeader("about"), href: "/about" },
        { label: tHeader("shop"), href: "/shop" },
        { label: tFooter("team"), href: "/team" },
        { label: tHeader("faq"), href: "/faq" },
        { label: tHeader("contact"), href: "/contact" },
        { label: tFooter("privacy"), href: "/legal/privacy-policy" },
        { label: tFooter("terms"), href: "/legal/terms-of-service" },
    ];

    const socialLinks = [
        { icon: Linkedin, href: siteSettings?.socialLinks?.linkedin, label: "LinkedIn" },
        { icon: Facebook, href: siteSettings?.socialLinks?.facebook, label: "Facebook" },
        { icon: Youtube, href: siteSettings?.socialLinks?.youtube, label: "YouTube" },
        { icon: Instagram, href: siteSettings?.socialLinks?.instagram, label: "Instagram" },
        { icon: Twitter, href: siteSettings?.socialLinks?.twitter, label: "Twitter" },
    ].filter((link) => link.href);

    if (socialLinks.length === 0) {
        if (!siteSettings?.socialLinks?.linkedin) {
            socialLinks.push({ icon: Linkedin, href: "https://www.linkedin.com/in/jason-astwood-ea-lutcf-fscp-8337a476/", label: "LinkedIn" });
        }
        if (!siteSettings?.socialLinks?.facebook) {
            socialLinks.push({ icon: Facebook, href: "https://www.facebook.com/UnionNationalTax", label: "Facebook" });
        }
        if (!siteSettings?.socialLinks?.youtube) {
            socialLinks.push({ icon: Youtube, href: "https://www.youtube.com/@JasonAstwood", label: "YouTube" });
        }
        if (!siteSettings?.socialLinks?.instagram) {
            socialLinks.push({ icon: Instagram, href: "https://www.instagram.com/unionnationaltax/?hl=en", label: "Instagram" });
        }
    }

    return (
        <footer className="bg-brand-900 border-t border-brand-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
                    <div className="space-y-6">
                        <Link href="/" className="block relative h-28 w-[400px] max-w-full mb-6">
                            {siteSettings?.logo?.asset?.url ? (
                                <Image
                                    src={siteSettings.logo.asset.url}
                                    alt={siteSettings.logo.alt || siteSettings.companyName || "Union National Tax"}
                                    fill
                                    className="object-contain object-left"
                                />
                            ) : siteSettings?.logoAlt?.asset?.url ? (
                                <Image
                                    src={siteSettings.logoAlt.asset.url}
                                    alt={siteSettings.logoAlt.alt || siteSettings.companyName || "Union National Tax"}
                                    fill
                                    className="object-contain object-left"
                                />
                            ) : (
                                <Image
                                    src="/images/logo.png"
                                    alt="Union National Tax"
                                    fill
                                    className="object-contain object-left brightness-0 invert opacity-90"
                                />
                            )}
                        </Link>
                        <p className="max-w-xs text-sm leading-relaxed text-zinc-400">
                            {tFooter("brandBio")}
                        </p>
                        <EABadge />
                    </div>

                    <div>
                        <h3 className="mb-6 font-heading font-bold text-white uppercase tracking-wider text-xs">{tFooter("complianceTitle")}</h3>
                        <ul className="space-y-3">
                            {complianceLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-zinc-400 transition-colors hover:text-gold-500"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <Link
                                    href="/services"
                                    className="inline-flex items-center gap-1 text-sm font-medium text-gold-500 transition-colors hover:text-gold-400"
                                >
                                    {tFooter("viewAllServices")}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-6 font-heading font-bold text-white uppercase tracking-wider text-xs">{tFooter("companyTitle")}</h3>
                        <ul className="space-y-3">
                            {companyLinks.map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className="text-sm text-zinc-400 transition-colors hover:text-gold-500"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="space-y-8">
                        <div>
                            <h3 className="mb-6 font-heading font-bold text-white uppercase tracking-wider text-xs">{tFooter("contactTitle")}</h3>
                            <ul className="space-y-4">
                                <li className="group flex items-start gap-3 text-sm text-zinc-400">
                                    <MapPin aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-gold-500 group-hover:text-gold-400" />
                                    <span>{addressText}</span>
                                </li>
                                <li className="group flex items-center gap-3 text-sm text-zinc-400">
                                    <Phone aria-hidden="true" className="h-4 w-4 shrink-0 text-gold-500 group-hover:text-gold-400" />
                                    <a href={phoneHref} className="transition-colors hover:text-white">
                                        {phoneText}
                                    </a>
                                </li>
                                <li className="group flex items-center gap-3 text-sm text-zinc-400">
                                    <Mail aria-hidden="true" className="h-4 w-4 shrink-0 text-gold-500 group-hover:text-gold-400" />
                                    <a href={emailHref} className="transition-colors hover:text-white">
                                        {emailText}
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="pt-6 border-t border-brand-800">
                            <NewsletterForm />
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-brand-800">
                    <p className="mx-auto max-w-4xl text-center text-xs leading-relaxed text-zinc-500">
                        <span className="font-semibold text-zinc-400">{tFooter("disclaimerLabel")}</span>{" "}
                        {tFooter("disclaimerBody")}
                    </p>
                </div>

                <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-brand-800 pt-8 md:flex-row">
                    <p className="text-center text-xs text-zinc-500 md:text-left">
                        {siteSettings?.copyrightText || `© ${new Date().getFullYear()} Union National Tax. All Rights Reserved.`}
                    </p>

                    <div className="flex gap-3">
                        {socialLinks.map((social, index) => (
                            <a
                                key={`${social.label}-${index}`}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex h-8 w-8 items-center justify-center rounded-full border border-brand-700 bg-brand-800 text-zinc-400 shadow-sm transition-all hover:-translate-y-0.5 hover:border-gold-500 hover:bg-gold-500 hover:text-brand-900 hover:shadow-md"
                                aria-label={tFooter("followOn", { platform: social.label })}
                            >
                                <social.icon aria-hidden="true" className="h-4 w-4" />
                            </a>
                        ))}
                    </div>

                    <div className="flex gap-6 text-xs text-zinc-500">
                        {(() => {
                            const pages = [...(legalPages || [])];
                            if (!pages.some((page: { slug?: string }) => page.slug === "privacy-policy")) {
                                pages.push({ title: tFooter("privacy"), slug: "privacy-policy" });
                            }

                            return pages.map((page: { title: string; slug: string }) => (
                                <Link
                                    key={page.slug}
                                    href={`/legal/${page.slug}`}
                                    className="transition-colors hover:text-gold-500"
                                >
                                    {page.title}
                                </Link>
                            ));
                        })()}
                    </div>
                </div>
            </div>
        </footer>
    );
}
