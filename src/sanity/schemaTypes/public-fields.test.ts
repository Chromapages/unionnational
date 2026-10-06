import { describe, expect, it, vi } from "vitest";

vi.mock("sanity", () => ({ defineField: (field: unknown) => field, defineType: (schema: unknown) => schema }));
import { legalPage } from "./legalPage";
import { siteSettings } from "./siteSettings";
import { playbookChapter } from "./playbookChapter";
import { playbook } from "./playbook";

describe("public CMS authoring boundaries", () => {
    it("does not offer confidential review notes or reviewer identity fields in public documents", () => {
        expect(legalPage.fields.map(field => field.name)).not.toContain("reviewNotes");
        expect(siteSettings.fields.map(field => field.name)).not.toEqual(expect.arrayContaining(["credentialVerifiedBy", "contactDetailsVerifiedBy", "socialLinksVerifiedBy", "legalContentVerifiedBy"]));
        expect(siteSettings.fields.map(field => field.name)).toEqual(expect.arrayContaining(["credentialVerified", "contactDetailsVerified", "socialLinksVerified", "legalContentVerified"]));
    });

    it("models guidance as marketing capture and PDF assets as public resources", () => {
        expect(playbookChapter.fields.map(field => field.name)).not.toContain("gatedContent");
        const prompt = playbookChapter.fields.find(field => field.name === "isGated");
        expect(prompt?.title).toBe("Show Guidance Request");
        expect(prompt?.description).toContain("chapter remains public");
        const resource = playbook.fields.find(field => field.name === "gatedPdf");
        expect(resource?.title).toBe("Public PDF Resource");
        expect(resource?.description).toContain("does not promise email delivery");
    });
});
