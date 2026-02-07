import Link from "next/link";
import { Linkedin, Facebook, Youtube, Instagram, Twitter, Phone, Mail, MapPin } from "lucide-react";
import Image from "next/image";
import { sanityFetch } from "@/sanity/lib/live";
import { SITE_SETTINGS_QUERY, FOOTER_LEGAL_PAGES_QUERY } from "@/sanity/lib/queries";
import { EABadge } from "@/components/ui/EABadge";
import { NewsletterForm } from "@/components/ui/NewsletterForm";
import { getLocale } from "next-intl/server";

export async function Footer() {
    const locale = await getLocale();
    const { data: siteSettings } = await sanityFetch({ query: SITE_SETTINGS_QUERY, params: { locale } });
    const { data: legalPages } = await sanityFetch({ query: FOOTER_LEGAL_PAGES_QUERY, params: { locale } });

    const formatAddress = (address: unknown): string | null => {
        if (!address) return null;
        if (typeof address === "string") {
            const trimmed = address.trim();
            return trimmed.length ? trimmed : null;
        }

        if (typeof address !== "object") return null;

        const a = address as Partial<Record<"street" | "city" | "state" | "zip", unknown>>;
        const street = typeof a.street === "string" ? a.street.trim() : "";
        const city = typeof a.city === "string" ? a.city.trim() : "";
        const state = typeof a.state === "string" ? a.state.trim() : "";
        const zip = typeof a.zip === "string" ? a.zip.trim() : "";

        const line1 = street;
        const cityState = [city, state].filter(Boolean).join(", ");
        const line2 = [cityState, zip].filter(Boolean).join(cityState && zip ? " " : "");

        const joined = [line1, line2].filter(Boolean).join(", ");
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

    const socialLinks = [
        { icon: Linkedin, href: siteSettings?.socialLinks?.linkedin },
        { icon: Facebook, href: siteSettings?.socialLinks?.facebook },
        { icon: Youtube, href: siteSettings?.socialLinks?.youtube },
        { icon: Instagram, href: siteSettings?.socialLinks?.instagram },
        { icon: Twitter, href: siteSettings?.socialLinks?.twitter },
    ].filter(link => link.href);

    // Fallback if no social links are set in CMS
    if (socialLinks.length === 0) {
        if (!siteSettings?.socialLinks?.linkedin) socialLinks.push({ icon: Linkedin, href: "https://www.linkedin.com/in/jason-astwood-ea-lutcf-fscp-8337a476/" });
        if (!siteSettings?.socialLinks?.facebook) socialLinks.push({ icon: Facebook, href: "https://www.facebook.com/UnionNationalTax" });
        if (!siteSettings?.socialLinks?.youtube) socialLinks.push({ icon: Youtube, href: "https://www.youtube.com/@JasonAstwood" });
        if (!siteSettings?.socialLinks?.instagram) socialLinks.push({ icon: Instagram, href: "https://www.instagram.com/unionnationaltax/?hl=en" });
    }

    return (
        <footer className="bg-brand-900 border-t border-brand-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">

                    {/* Column 1: Brand & Bio */}
                    <div className="space-y-6">
                        <Link href="/" className="block relative h-28 w-[400px] mb-6">
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
                        <p className="text-zinc-400 text-sm leading-relaxed max-w-xs">
                            Specialized tax strategies for construction, real estate, and service-based businesses. Keep more of what you earn with proactive planning.
                        </p>
                        <EABadge />
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h3 className="text-white font-bold mb-6 font-heading">Services</h3>
                        <ul className="space-y-3">
                            {['Tax Planning', 'Tax Preparation', 'IRS Resolution', 'Bookkeeping'].map((item) => (
                                <li key={item}>
                                    <Link
                                        href={`/services/${item.toLowerCase().replace(' ', '-')}`}
                                        className="text-zinc-400 hover:text-gold-500 text-sm transition-colors"
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <Link
                                    href="/services"
                                    className="text-gold-500 hover:text-gold-400 text-sm font-medium transition-colors inline-flex items-center gap-1"
                                >
                                    View All Services
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Company */}
                    <div>
                        <h3 className="text-white font-bold mb-6 font-heading">Company</h3>
                        <ul className="space-y-3">
                            {['About', 'Team', 'Blog', 'Contact', 'Shop']
                                .map((item) => (
                                    <li key={item}>
                                        <Link
                                            href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                                            className="text-zinc-400 hover:text-gold-500 text-sm transition-colors"
                                        >
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                        </ul>
                    </div>

                    {/* Column 4: Contact & Newsletter */}
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-white font-bold mb-6 font-heading">Contact Us</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3 text-zinc-400 text-sm group">
                                    <MapPin className="w-4 h-4 mt-1 text-gold-500 shrink-0 group-hover:text-gold-400" />
                                    <span>
                                        {addressText}
                                    </span>
                                </li>
                                <li className="flex items-center gap-3 text-zinc-400 text-sm group">
                                    <Phone className="w-4 h-4 text-gold-500 shrink-0 group-hover:text-gold-400" />
                                    <a href={phoneHref} className="hover:text-white transition-colors">
                                        {phoneText}
                                    </a>
                                </li>
                                <li className="flex items-center gap-3 text-zinc-400 text-sm group">
                                    <Mail className="w-4 h-4 text-gold-500 shrink-0 group-hover:text-gold-400" />
                                    <a href={emailHref} className="hover:text-white transition-colors">
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

                {/* Disclaimer */}
                <div className="pt-8 border-t border-brand-800">
                    <p className="text-zinc-500 text-xs text-center leading-relaxed max-w-4xl mx-auto">
                        <span className="font-semibold text-zinc-400">Disclaimer:</span> The information on this website is for general informational purposes only and does not constitute tax, legal, accounting, or financial advice. Use of this site does not create a professional relationship. Please consult a qualified professional for advice specific to your situation.
                    </p>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 mt-8 border-t border-brand-800 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-zinc-500 text-xs text-center md:text-left">
                        {siteSettings?.copyrightText || `© ${new Date().getFullYear()} Union National Tax. All Rights Reserved.`}
                    </p>

                    {/* Social Icons */}
                    <div className="flex gap-3">
                        {socialLinks.map((social, i) => (
                            <a
                                key={i}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-8 h-8 rounded-full bg-brand-800 border border-brand-700 flex items-center justify-center text-zinc-400 hover:bg-gold-500 hover:text-brand-900 hover:border-gold-500 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
                                aria-label={`Follow us on ${social.icon.displayName || 'social media'}`}
                            >
                                <social.icon className="w-4 h-4" />
                            </a>
                        ))}
                    </div>

                    <div className="flex gap-6 text-xs text-zinc-500">
                        {legalPages?.map((page: any) => (
                            <Link
                                key={page.slug}
                                href={`/legal/${page.slug}`}
                                className="hover:text-gold-500 transition-colors"
                            >
                                {page.title}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
