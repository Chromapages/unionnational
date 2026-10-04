import { expect, it } from "vitest";
import { matchesTeamMember } from "./teamDirectory";

it("combines overlapping role groups with accent-insensitive credential search", () => {
    const member = { name: "José", role: "Director of Restaurant Operations", certifications: ["QuickBooks Pro Advisor"] };
    expect(matchesTeamMember(member, "operations", "JOSE")).toBe(true);
    expect(matchesTeamMember(member, "leadership", "QuickBooks")).toBe(true);
    expect(matchesTeamMember(member, "tax", "José")).toBe(false);
    expect(matchesTeamMember(member, "operations", "unmatched")).toBe(false);
    expect(matchesTeamMember({ name: "Founder", role: "", isFounder: true }, "leadership", "")).toBe(true);
    expect(matchesTeamMember({ name: "Accountant", role: "Trusted expert", credentials: "CPA" }, "tax", "")).toBe(true);
    expect(matchesTeamMember({ name: "Technologist", role: "Trusted expert", credentials: "CTO" }, "operations", "")).toBe(true);
});
