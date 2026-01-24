import { X, Linkedin, Mail } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface TeamMemberModalProps {
    member: any;
    isOpen: boolean;
    onClose: () => void;
}

export function TeamMemberModal({ member, isOpen, onClose }: TeamMemberModalProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!mounted || !isOpen || !member) return null;

    return createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
            <div 
                className="absolute inset-0 bg-brand-900/60 backdrop-blur-sm transition-opacity" 
                onClick={onClose}
            />
            
            <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 bg-white/50 hover:bg-white rounded-full transition-colors"
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
                                <h3 className="text-3xl font-bold text-brand-900 font-heading mb-1">{member.name}</h3>
                                <div className="text-gold-600 font-medium font-sans mb-1">{member.role}</div>
                                {member.credentials && (
                                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">{member.credentials}</div>
                                )}
                            </div>

                            <div className="prose prose-sm prose-slate mb-8 font-sans leading-relaxed text-slate-600">
                                <p>{member.description}</p>
                            </div>

                             <div className="flex items-center gap-4 mt-auto pt-6 border-t border-slate-100">
                                {member.linkedinUrl && (
                                    <a 
                                        href={member.linkedinUrl} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 rounded-full bg-brand-50 hover:bg-brand-900 hover:text-white flex items-center justify-center transition-all text-brand-900"
                                        title="LinkedIn Profile"
                                    >
                                        <Linkedin className="w-4 h-4" />
                                    </a>
                                )}
                                <a 
                                    href={`mailto:hello@unionnationaltax.com?subject=Inquiry for ${member.name}`}
                                    className="w-10 h-10 rounded-full bg-brand-50 hover:bg-brand-900 hover:text-white flex items-center justify-center transition-all text-brand-900"
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
