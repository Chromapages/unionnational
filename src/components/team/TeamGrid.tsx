"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Check, Leaf, Search, UsersRound, X } from "lucide-react";
import { TeamMemberCard } from "./TeamMemberCard";
import { TeamMemberModal } from "./TeamMemberModal";
import { matchesTeamMember, teamGroups, type TeamGroup } from "./teamDirectory";

import { type TeamMember } from "@/types/sanity";

interface TeamGridProps {
    members: TeamMember[];
    title: string;
    subtitle: string;
}

export function TeamGrid({ members, title, subtitle }: TeamGridProps) {
    const t = useTranslations("TeamPage.directory");
    const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
    const [group, setGroup] = useState<TeamGroup>("all");
    const [search, setSearch] = useState("");
    const visibleMembers = members.filter(member => matchesTeamMember(member, group, search));
    const focusRing = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-700";
    useEffect(() => {
        const member = members.find(person => window.location.hash === `#team-member-${person._id}`);
        if (!member) return;
        document.getElementById(`team-member-${member._id}`)?.querySelector<HTMLButtonElement>("button")?.focus({ preventScroll: true });
        setSelectedMember(member);
    }, [members]);
    const closeProfile = () => {
        setSelectedMember(null);
        if (window.location.hash.startsWith("#team-member-")) {
            window.history.replaceState(window.history.state, "", window.location.pathname + window.location.search);
        }
    };

    return (
        <section id="team-members" aria-labelledby="team-roster-heading" className="scroll-mt-28 py-10 lg:py-12">
            <div className="@container/roster mx-auto w-full max-w-[94rem] px-4 sm:px-6 lg:px-8">
                <div className="grid items-center gap-6 @min-[64rem]/roster:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
                    <div className="min-w-0">
                        <p className="flex items-center gap-3 font-heading text-sm font-bold uppercase tracking-[.1em] text-gold-700"><span className="h-px w-10 bg-gold-600" aria-hidden="true" />{t("peopleEyebrow")}</p>
                        <h2 id="team-roster-heading" className="mt-4 font-heading text-3xl font-bold leading-[1.12] tracking-[-.025em] text-brand-950 sm:text-4xl lg:text-[2.75rem]">{title}</h2>
                        <p className="mt-3 max-w-[64ch] text-base leading-relaxed text-slate-700 sm:text-xl">{subtitle}</p>
                    </div>
                    <aside aria-labelledby="team-connected-heading" className="relative isolate overflow-hidden rounded-xl bg-brand-50/35 p-6 sm:p-7">
                        <Leaf className="absolute -right-7 top-2 -z-10 size-36 rotate-[-30deg] text-brand-100/60" strokeWidth={1} aria-hidden="true" />
                        <div className="flex min-w-0 items-center gap-5">
                            <span className="flex size-20 shrink-0 items-center justify-center rounded-full bg-brand-50/70 text-brand-500" aria-hidden="true"><UsersRound className="size-10" strokeWidth={1.5} /></span>
                            <div className="min-w-0"><h3 id="team-connected-heading" className="font-heading text-lg font-bold leading-tight text-brand-950"><span className="block">{t("connectedTitleLead")}</span><span className="block">{t("connectedTitleEnd")}</span></h3><p className="mt-2 max-w-[38ch] text-sm leading-relaxed text-slate-700">{t("connectedBody")}</p></div>
                        </div>
                    </aside>
                </div>
                <div className="mt-7 flex flex-wrap items-center gap-4">
                    <div role="group" aria-label={t("filterLabel")} className="flex min-w-0 flex-[1_1_44rem] flex-wrap gap-3">
                        {teamGroups.map(key => <button key={key} type="button" aria-pressed={group === key} aria-controls="team-directory-grid" onClick={() => setGroup(key)} className={`inline-flex min-h-11 items-center justify-center gap-1 rounded-full px-5 py-2 text-sm font-semibold transition-colors active:brightness-95 motion-reduce:transition-none ${focusRing} ${group === key ? "bg-brand-500 text-white hover:bg-brand-600" : "bg-brand-50/50 text-brand-500 hover:bg-brand-50"}`}>{group === key && <Check className="mr-1 size-4 shrink-0" aria-hidden="true" />}{t(`groups.${key}`)}<span>({members.filter(member => matchesTeamMember(member, key, "")).length})</span></button>)}
                    </div>
                    <form role="search" onSubmit={event => event.preventDefault()} className="flex min-h-11 flex-[1_1_16rem] items-center gap-3 rounded-lg border border-slate-600 bg-white px-3 focus-within:outline-2 focus-within:outline-offset-4 focus-within:outline-gold-700 lg:max-w-72">
                        <Search className="size-5 shrink-0 text-brand-500" aria-hidden="true" />
                        <label htmlFor="team-search" className="sr-only">{t("searchLabel")}</label>
                        <input id="team-search" type="search" value={search} onChange={event => setSearch(event.target.value)} placeholder={t("searchPlaceholder")} aria-controls="team-directory-grid" className="min-h-11 min-w-0 flex-1 rounded-sm bg-white text-sm text-brand-950 outline-none placeholder:text-slate-700" />
                        {search && <button type="button" aria-label={t("clearSearch")} onClick={() => { setSearch(""); document.getElementById("team-search")?.focus(); }} className={`flex size-11 shrink-0 items-center justify-center rounded-sm text-brand-500 ${focusRing}`}><X className="size-4" aria-hidden="true" /></button>}
                    </form>
                </div>
                <p role="status" aria-live="polite" aria-atomic="true" className="sr-only">{t("resultCount", { count: visibleMembers.length })}</p>
                <div id="team-directory-grid" data-team-directory className="mt-6 grid auto-rows-fr gap-4 @min-[40rem]/roster:grid-cols-2 @min-[64rem]/roster:grid-cols-3">
                    {visibleMembers.map(member => <TeamMemberCard key={member._id} member={member} onClick={() => setSelectedMember(member)} />)}
                </div>
                {!members.length ? <p className="mt-7 text-base text-slate-700">{t("empty")}</p> : !visibleMembers.length && <div className="mt-6 rounded-xl border border-slate-200 p-6 text-center"><h3 className="font-heading text-xl font-bold text-brand-950">{t("noResults")}</h3><p className="mt-2 text-base text-slate-700">{t("noResultsBody")}</p><button type="button" onClick={() => { setGroup("all"); setSearch(""); }} className={`mt-4 min-h-11 rounded-lg bg-brand-500 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-600 ${focusRing}`}>{t("resetFilters")}</button></div>}
            </div>

            <TeamMemberModal
                member={selectedMember}
                isOpen={!!selectedMember}
                onClose={closeProfile}
            />
        </section>
    );
}
