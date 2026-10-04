import type { TeamMember } from "@/types/sanity";

export const teamGroups = ["all", "tax", "client", "operations", "leadership"] as const;
export type TeamGroup = typeof teamGroups[number];

const groupPatterns = {
    tax: /tax|account|bookkeep|\bcpa\b|\bea\b|enrolled|fiscal|contab|contador/,
    client: /client|customer|relations|support|cliente|atencion/,
    operations: /operation|sales|marketing|technology|\bcto\b|operacion|ventas|tecnolog/,
    leadership: /founder|chief|\bcto\b|director|fundador/,
};
const normalize = (text: string) => text.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().trim();
type DirectoryMember = Pick<TeamMember, "name" | "role" | "credentials" | "certifications" | "tags" | "isFounder">;

export function matchesTeamMember(member: DirectoryMember, group: TeamGroup, search: string) {
    const expertise = normalize([member.role, member.credentials, ...(member.certifications || []), ...(member.tags || [])].join(" "));
    if (group !== "all" && !(group === "leadership" && member.isFounder) && !groupPatterns[group].test(expertise)) return false;
    const searchable = normalize([member.name, member.role, member.credentials, ...(member.certifications || []), ...(member.tags || [])].join(" "));
    return searchable.includes(normalize(search));
}
