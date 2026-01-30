"use client";

import { useState } from "react";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { TeamMemberCard } from "./TeamMemberCard";
import { TeamMemberModal } from "./TeamMemberModal";

interface TeamGridProps {
    members: any[];
    title: string;
    subtitle: string;
}

export function TeamGrid({ members, title, subtitle }: TeamGridProps) {
    const [selectedMember, setSelectedMember] = useState<any>(null);

    return (
        <section className="max-w-7xl mx-auto px-6 mb-32">
            <RevealOnScroll className="mb-12 text-center">
                <h2 className="text-3xl font-bold text-brand-900 tracking-tight font-heading mb-4">{title}</h2>
                <p className="text-slate-600 text-lg max-w-2xl mx-auto font-sans">{subtitle}</p>
            </RevealOnScroll>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {members.map((member, index) => (
                    <RevealOnScroll key={member._id} delay={index * 50} className="h-full">
                        <TeamMemberCard
                            member={member}
                            onClick={() => setSelectedMember(member)}
                        />
                    </RevealOnScroll>
                ))}
            </div>

            <TeamMemberModal
                member={selectedMember}
                isOpen={!!selectedMember}
                onClose={() => setSelectedMember(null)}
            />
        </section>
    );
}
