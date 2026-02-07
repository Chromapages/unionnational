"use client";

import { Check, Mail, Phone, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import { urlFor } from "@/sanity/lib/image";

interface TeamMemberCardProps {
    name: string;
    title: string;
    image?: any; // Sanity image
    quote: string;
    credentials: string[];
    email: string;
    phone?: string;
    address?: {
        street: string;
        city: string;
        state: string;
        zip: string;
    };
    mapEmbedUrl?: string;
}

export function TeamMemberCard({
    name,
    title,
    image,
    quote,
    credentials,
    email,
    phone,
    address,
    mapEmbedUrl
}: TeamMemberCardProps) {
    const t = useTranslations("ContactPage.TeamMemberCard");

    return (
        <div className="lg:sticky lg:top-32 h-fit space-y-8 p-6 lg:p-0">
            <div className="relative">
                {/* Photo Container */}
                <div className="flex items-start gap-6 mb-8">
                    <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 border-gold-500/30 shrink-0 bg-slate-100">
                        {image ? (
                            <img
                                src={urlFor(image).width(256).height(256).url()}
                                alt={name}
                                className="w-full h-full object-cover object-[center_30%]"
                            />
                        ) : (
                            <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400 text-xs text-center px-1">
                                {name.charAt(0)}
                            </div>
                        )}
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-brand-900 font-heading mb-1">{name}</h3>
                        <p className="text-sm font-medium text-brand-900/60 font-sans mb-4 uppercase tracking-wider">{title}</p>
                        <div className="flex flex-wrap gap-2">
                            {credentials.map((cred, i) => (
                                <span key={i} className="inline-flex items-center px-2 py-1 rounded-md bg-gold-50 text-gold-700 text-xs font-bold border border-gold-200">
                                    {cred}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Quote */}
                <blockquote className="relative mb-10 pl-6 border-l-4 border-gold-500">
                    <p className="text-lg italic text-brand-800 leading-relaxed font-serif">
                        &ldquo;{quote}&rdquo;
                    </p>
                </blockquote>

                <div className="h-px w-full bg-slate-200 mb-10" />

                {/* Contact Details */}
                <div className="space-y-6">
                    <div className="flex items-start gap-4 group">
                        <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-gold-600 shadow-sm group-hover:border-gold-500/50 group-hover:bg-gold-50 transition-all">
                            <MapPin className="w-5 h-5" />
                        </div>
                        <div className="font-sans">
                            <div className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-0.5">
                                {t("officeLabel")}
                            </div>
                            <div className="text-brand-900 text-sm leading-relaxed">
                                {address ? (
                                    <>
                                        {address.street}<br />
                                        {address.city}, {address.state} {address.zip}
                                    </>
                                ) : t("defaultAddress")}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 group">
                        <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-gold-600 shadow-sm group-hover:border-gold-500/50 group-hover:bg-gold-50 transition-all">
                            <Mail className="w-5 h-5" />
                        </div>
                        <div className="font-sans">
                            <div className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-0.5">
                                {t("emailLabel")}
                            </div>
                            <a href={`mailto:${email}`} className="text-brand-900 text-sm hover:text-gold-600 transition-colors">
                                {email}
                            </a>
                        </div>
                    </div>

                    {phone && (
                        <div className="flex items-start gap-4 group">
                            <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-gold-600 shadow-sm group-hover:border-gold-500/50 group-hover:bg-gold-50 transition-all">
                                <Phone className="w-5 h-5" />
                            </div>
                            <div className="font-sans">
                                <div className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-0.5">
                                    {t("phoneLabel")}
                                </div>
                                <a href={`tel:${phone}`} className="text-brand-900 text-sm hover:text-gold-600 transition-colors">
                                    {phone}
                                </a>
                            </div>
                        </div>
                    )}

                    {/* Map Embed */}
                    {mapEmbedUrl && (
                        <div className="pt-4">
                            <div className="w-full aspect-video rounded-xl overflow-hidden border border-slate-200 shadow-inner group/map group">
                                <iframe
                                    src={mapEmbedUrl}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen={false}
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title={t("mapTitle")}
                                    className="grayscale hover:grayscale-0 transition-all duration-500 opacity-80 group-hover/map:opacity-100"
                                ></iframe>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
