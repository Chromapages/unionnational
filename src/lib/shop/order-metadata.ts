export type CheckoutMetadataItem = {
    p?: string; s?: string; e?: string; ce?: string | null; n?: string; f?: string;
    t?: string; sh?: boolean; pr?: string; q?: number;
    [key: string]: unknown;
};

const MAX_PARTS = 40; // Leaves room for other session metadata within Stripe's 50-key limit.

export function buildCheckoutItemsMetadata(items: CheckoutMetadataItem[]): Record<string, string> | null {
    const chunks: string[] = [];
    let chunk = "";
    for (const character of JSON.stringify(items)) {
        if (chunk.length + character.length > 500) {
            chunks.push(chunk);
            if (chunks.length >= MAX_PARTS) return null;
            chunk = "";
        }
        chunk += character;
    }
    chunks.push(chunk);
    const metadata: Record<string, string> = { items_version: "1", items: chunks[0] };
    if (chunks.length > 1) {
        metadata.items_parts = String(chunks.length);
        chunks.slice(1).forEach((value, index) => { metadata[`items_${index + 1}`] = value; });
    }
    return metadata;
}

export function parseCheckoutItemsMetadata(metadata?: Record<string, string | undefined> | null): CheckoutMetadataItem[] {
    if (typeof metadata?.items !== "string") return [];
    let serialized = metadata.items;
    if (metadata.items_parts !== undefined) {
        const count = Number(metadata.items_parts);
        if (!/^\d+$/.test(metadata.items_parts) || !Number.isInteger(count) || count < 1 || count > MAX_PARTS) return [];
        for (let index = 1; index < count; index++) {
            const chunk = metadata[`items_${index}`];
            if (typeof chunk !== "string") return [];
            serialized += chunk;
        }
    }
    try {
        const parsed: unknown = JSON.parse(serialized);
        return Array.isArray(parsed) && parsed.every(item => item && typeof item === "object" && !Array.isArray(item)) ? parsed : [];
    } catch {
        return [];
    }
}
