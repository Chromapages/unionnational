import type { SanityBlock } from "@/types/sanity";

export type FaqAnswer = string | SanityBlock[];

function isRecord(value: unknown): value is Record<string, unknown> {
    return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function directAnswer(value: unknown): FaqAnswer {
    if (typeof value === "string") return value.trim() ? value : "";
    if (!Array.isArray(value)) return "";

    const blocks: SanityBlock[] = value.flatMap((block, blockIndex) => {
        if (!isRecord(block) || block._type !== "block" || !Array.isArray(block.children)) return [];
        const children: SanityBlock["children"] = block.children.flatMap((child, childIndex) => {
            if (!isRecord(child) || child._type !== "span" || typeof child.text !== "string") return [];
            return [{
                _type: "span" as const,
                _key: typeof child._key === "string" ? child._key : `span-${childIndex}`,
                text: child.text,
                ...(Array.isArray(child.marks) ? { marks: child.marks.filter((mark): mark is string => typeof mark === "string") } : {}),
            }];
        });
        if (!children.some(child => child.text.trim())) return [];

        const markDefs = Array.isArray(block.markDefs) ? block.markDefs.flatMap(definition => {
            if (!isRecord(definition) || typeof definition._key !== "string" || typeof definition._type !== "string") return [];
            if (definition._type === "link" && typeof definition.href !== "string") return [];
            return [{ ...definition, _key: definition._key, _type: definition._type }];
        }) : undefined;

        return [{
            _type: "block" as const,
            _key: typeof block._key === "string" ? block._key : `block-${blockIndex}`,
            children,
            ...(typeof block.style === "string" ? { style: block.style } : {}),
            ...(typeof block.listItem === "string" ? { listItem: block.listItem } : {}),
            ...(typeof block.level === "number" && Number.isFinite(block.level) ? { level: block.level } : {}),
            ...(markDefs ? { markDefs } : {}),
        }];
    });
    return blocks.length > 0 ? blocks : "";
}

/** FAQ_QUERY can return a projected value or its raw localizedBlock fallback. */
export function normalizeFaqAnswer(value: unknown, locale = "en"): FaqAnswer {
    const direct = directAnswer(value);
    if (direct.length > 0) return direct;
    if (!isRecord(value)) return "";

    for (const language of new Set([locale, "en", "es"])) {
        const localized = directAnswer(value[language]);
        if (localized.length > 0) return localized;
    }
    return "";
}

export function faqAnswerText(answer: FaqAnswer): string {
    return typeof answer === "string" ? answer : answer.map(block => block.children.map(child => child.text).join("")).join(" ");
}
