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
            className="group relative bg-white rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl hover:shadow-brand-900/10 hover:-translate-y-1 transition-all duration-300 border border-slate-200"
        >
            <div className="aspect-[4/5] overflow-hidden relative bg-brand-50">
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
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-brand-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg transform scale-50 group-hover:scale-100 transition-transform duration-300 delay-75">
                         <Plus className="w-6 h-6 text-brand-900" />
                    </div>
                </div>
            </div>

            <div className="p-6">
                <h3 className="text-xl font-bold text-brand-900 font-heading mb-1 group-hover:text-gold-600 transition-colors">
                    {member.name}
                </h3>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">{member.credentials}</div>
                <p className="text-sm font-medium text-brand-900/70 font-sans">{member.role}</p>
            </div>
        </div>
    );
}
