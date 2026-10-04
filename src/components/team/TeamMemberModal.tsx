import { X, Linkedin, Mail } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import { useEffect, useRef, useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import { createPortal } from "react-dom";

import { type TeamMember } from "@/types/sanity";
import { memberCredentials } from "./TeamMemberCard";

interface TeamMemberModalProps {
    member: TeamMember | null;
    isOpen: boolean;
    onClose: () => void;
}

const noopSubscribe = () => () => {};

export function TeamMemberModal({ member, isOpen, onClose }: TeamMemberModalProps) {
    const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);
    const t = useTranslations("TeamPage");
    const dialogRef = useRef<HTMLDivElement>(null);
    const closeRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (!isOpen || !mounted || !member) return;
        const previousFocus = document.activeElement as HTMLElement | null;
        const previousOverflow = document.body.style.overflow;
        const backgrounds = [...document.querySelectorAll<HTMLElement>("header,main,footer")].map(element => ({element, inert:element.hasAttribute("inert")}));
        backgrounds.forEach(({element}) => element.setAttribute("inert", ""));
        document.body.style.overflow = 'hidden';
        closeRef.current?.focus();
        const handleKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") { event.preventDefault(); onClose(); return; }
            if (event.key !== "Tab") return;
            const controls = [...(dialogRef.current?.querySelectorAll<HTMLElement>('button,a[href]') || [])];
            const first = controls[0], last = controls[controls.length-1];
            if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
            else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
        };
        document.addEventListener("keydown", handleKey);
        return () => {
            document.removeEventListener("keydown", handleKey);
            document.body.style.overflow = previousOverflow;
            backgrounds.forEach(({element,inert}) => { if (!inert) element.removeAttribute("inert"); });
            if (previousFocus?.isConnected) previousFocus.focus();
        };
    }, [isOpen, mounted, member, onClose]);

    if (!mounted || !isOpen || !member) return null;
    const credentials = memberCredentials(member);
    const role = member.role && !/^trusted expert$/i.test(member.role.trim()) ? member.role.trim() : "";
    const bio = member.description || member.bioShort;

    return createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
            <div aria-hidden="true"
                className="absolute inset-0 bg-brand-900/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="team-profile-heading" className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90dvh] animate-in fade-in zoom-in-95 duration-200">
                <button
                    ref={closeRef}
                    type="button"
                    aria-label={t("profileClose")}
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 flex min-h-11 min-w-11 items-center justify-center p-2 bg-white/50 hover:bg-white rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-700"
                >
                    <X className="w-5 h-5 text-brand-900" />
                </button>

                <div className="flex-1 overflow-y-auto">
                    <div className="flex flex-col md:flex-row">
                        {/* Image Side */}
                        <div className="w-full md:w-5/12 aspect-[4/5] md:aspect-auto relative bg-brand-50">
                            {member.image ? (
                                <img
                                    src={urlFor(member.image).width(600).url()}
                                    alt={member.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-brand-100 text-brand-300">
                                    <span className="text-4xl font-bold">{member.name.charAt(0)}</span>
                                </div>
                            )}
                        </div>

                        {/* Content Side */}
                        <div className="w-full md:w-7/12 p-8 md:p-10 bg-white">
                            <div className="mb-6">
                                <h3 id="team-profile-heading" className="text-3xl font-bold text-brand-900 font-heading mb-1">{member.name.trim()}</h3>
                                {role && <div className="text-slate-700 font-medium font-sans mb-1">{role}</div>}
                                {credentials.length > 0 && <div className="mt-3 flex flex-wrap gap-2">{credentials.map(tag => <span key={tag} className="rounded-xl bg-brand-50 px-3 py-2 text-sm font-semibold text-brand-900">{tag}</span>)}</div>}
                            </div>

                            {bio && <div className="prose prose-sm prose-slate mb-8 font-sans leading-relaxed text-slate-700"><p>{bio}</p></div>}

                            <div className="flex items-center gap-4 mt-auto pt-6 border-t border-slate-100">
                                {member.linkedinUrl && (
                                    <a
                                        href={member.linkedinUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-11 h-11 rounded-full bg-brand-50 hover:bg-brand-900 hover:text-white flex items-center justify-center transition-all text-brand-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-700"
                                        title="LinkedIn Profile"
                                    >
                                        <Linkedin className="w-4 h-4" />
                                    </a>
                                )}
                                <a
                                    href={`mailto:hello@unionnationaltax.com?subject=Inquiry for ${member.name}`}
                                    className="w-11 h-11 rounded-full bg-brand-50 hover:bg-brand-900 hover:text-white flex items-center justify-center transition-all text-brand-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-700"
                                    title="Contact"
                                >
                                    <Mail className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}
