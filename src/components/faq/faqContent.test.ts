import { describe, expect, it } from "vitest";
import { faqAnswerText, normalizeFaqAnswer } from "./faqContent";

const block = (text: string) => ({ _type: "block", _key: text, children: [{ _type: "span", _key: "text", text }] });

describe("FAQ CMS answer boundary", () => {
    it("selects localized blocks and preserves their display content", () => {
        const value = { _type: "localizedBlock", en: [block("Payroll guidance")], es: [block("Guía de nómina")] };
        expect(faqAnswerText(normalizeFaqAnswer(value, "en"))).toBe("Payroll guidance");
        expect(faqAnswerText(normalizeFaqAnswer(value, "es"))).toBe("Guía de nómina");
        expect(normalizeFaqAnswer(value, "es")).toEqual(value.es);
    });

    it("falls back to English when translated content is empty or malformed", () => {
        expect(faqAnswerText(normalizeFaqAnswer({ en: [block("English fallback")], es: [] }, "es"))).toBe("English fallback");
        expect(normalizeFaqAnswer({ en: "Legacy answer", es: { malformed: true } }, "es")).toBe("Legacy answer");
    });

    it("retains searchable text across formatting spans and discards malformed nodes", () => {
        const answer = normalizeFaqAnswer([null, { _type: "block", children: "invalid" }, {
            _type: "block", _key: "valid", children: [null, { _type: "span", _key: "one", text: "Pay", marks: ["strong"] }, { _type: "span", _key: "two", text: "roll compliance" }, { text: 42 }],
            markDefs: [{ _type: "link", _key: "bad", href: 42 }],
        }]);
        expect(faqAnswerText(answer)).toBe("Payroll compliance");
        expect(Array.isArray(answer) && answer[0].children).toHaveLength(2);
        expect(Array.isArray(answer) && answer[0].markDefs).toEqual([]);
    });

    it.each([null, undefined, 42, false, {}, { _type: "localizedBlock" }, [null, { children: null }]])("returns empty content for malformed answer %j", value => {
        expect(normalizeFaqAnswer(value)).toBe("");
    });
});
