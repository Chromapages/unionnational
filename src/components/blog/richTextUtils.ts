export type HeadingLevel = 2 | 3;

export interface HeadingItem {
    id: string;
    text: string;
    level: HeadingLevel;
}

const normalizeText = (value: string) =>
    value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
        .trim();

export const buildHeadingId = (text: string, slugCounts: Map<string, number>) => {
    const base = normalizeText(text) || "section";
    const currentCount = slugCounts.get(base) ?? 0;
    const nextCount = currentCount + 1;
    slugCounts.set(base, nextCount);
    return currentCount === 0 ? base : `${base}-${nextCount}`;
};

export const getPortableTextHeadings = (value: any[] = []): HeadingItem[] => {
    const slugCounts = new Map<string, number>();
    const headings: HeadingItem[] = [];

    value.forEach((block) => {
        if (block?._type !== "block") return;
        if (block.style !== "h2" && block.style !== "h3") return;

        const text = block.children?.map((child: any) => child.text).join("").trim();
        if (!text) return;

        const id = buildHeadingId(text, slugCounts);
        headings.push({
            id,
            text,
            level: block.style === "h2" ? 2 : 3,
        });
    });

    return headings;
};
