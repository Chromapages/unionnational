import { urlFor } from "@/sanity/lib/image";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import type { TeamMember } from "@/types/sanity";

export const memberCredentials = (member: TeamMember) => [...new Set(
    (member.credentials ? member.credentials.split(/,|\//) : member.certifications || [])
        .map(tag => tag.trim())
        .filter(tag => tag && tag.toLowerCase() !== member.role?.trim().toLowerCase()),
)];

export function TeamMemberCard({ member, onClick }: { member: TeamMember; onClick: () => void }) {
    const t = useTranslations("TeamPage.directory");
    const name = member.isFounder ? member.name.trim().split(",")[0] : member.name.trim().split(/[\s,]+/)[0];
    const role = member.role && !/^trusted expert$/i.test(member.role.trim()) ? member.role.trim() : "";
    const credentials = memberCredentials(member);
    const specialties = [...new Set((member.tags || []).filter(tag => typeof tag === "string" && tag.trim()).map(tag => tag.trim()))]
        .filter(tag => !credentials.some(credential => credential.toLowerCase() === tag.toLowerCase())).slice(0, 3);
    return <article id={"team-member-" + member._id} tabIndex={-1} className="min-w-0 scroll-mt-28 rounded-xl border border-slate-200 bg-white p-2.5">
        <div className="grid h-full min-w-0 grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)] gap-4">
            <div className="relative min-h-48 overflow-hidden rounded-lg bg-brand-50/60">
                {member.image ? <img src={urlFor(member.image).width(400).url()} alt={role ? name + ", " + role : name} loading="lazy" width={224} height={280} className="absolute inset-0 h-full w-full object-cover object-top" /> : <p className="flex h-full items-center justify-center p-3 text-center text-sm text-slate-700">{t("photoMissing")}</p>}
            </div>
            <div className="flex min-w-0 flex-col py-2 pr-1">
                <h3 className="font-heading text-xl font-bold leading-tight text-brand-950">{name}</h3>
                {role && <p className="mt-2 text-sm leading-snug text-slate-700">{role}</p>}
                {credentials.length > 0 && <div className="mt-3 flex flex-wrap gap-2">{credentials.map(tag => <span key={tag} data-credential className="max-w-full break-words rounded-lg bg-brand-50/60 px-3 py-2 text-xs font-semibold leading-snug text-brand-900">{tag}</span>)}</div>}
                {specialties.length > 0 && <ul className="mt-3 flex flex-wrap gap-2">{specialties.map(tag => <li key={tag} className="max-w-full break-words rounded-lg bg-brand-50/60 px-3 py-2 text-xs leading-snug text-brand-900">{tag}</li>)}</ul>}
                <div className="mt-auto pt-4"><button type="button" onClick={onClick} aria-label={t("profileLabel", { name })} className="inline-flex min-h-11 min-w-11 items-center gap-3 rounded-sm font-heading text-sm font-semibold text-brand-500 hover:text-brand-700 active:text-brand-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-700">{t("viewProfile")}<ArrowRight className="size-4 shrink-0" aria-hidden="true" /></button></div>
            </div>
        </div>
    </article>;
}
