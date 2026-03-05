import { urlFor } from "@/sanity/lib/image";
import { Plus } from "lucide-react";

interface TeamMemberCardProps {
    member: any;
    onClick: () => void;
}

export function TeamMemberCard({ member, onClick }: TeamMemberCardProps) {
    return (
        <div
            onClick={onClick}
            className="group relative flex flex-col h-full bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden cursor-pointer shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 border border-slate-200/60"
        >
            <div className="aspect-[4/5] relative overflow-hidden bg-brand-50">
                {member.image ? (
                    <img
                        src={urlFor(member.image).width(600).url()}
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-brand-300 text-4xl font-bold bg-brand-50">
                        {member.name.charAt(0)}
                    </div>
                )}

                {/* Hover Overlay - Gradient approach for fintech feel */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-brand-900 text-sm font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        View Profile <Plus className="w-4 h-4" />
                    </span>
                </div>
            </div>

            <div className="flex flex-col flex-1 p-6 border-t border-slate-100/50">
                <div className="mb-1">
                    <h3 className="text-lg font-bold text-brand-900 font-heading group-hover:text-gold-600 transition-colors">
                        {member.name}
                    </h3>
                    <p className="text-sm font-medium text-slate-500 font-sans">{member.role}</p>
                </div>

                {member.credentials && (
                    <div className="mt-auto pt-4">
                        <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-brand-900/40 bg-brand-50/50 px-2 py-1 rounded">
                            {member.credentials}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}
