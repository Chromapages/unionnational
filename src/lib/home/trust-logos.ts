import type { ClientLogo } from "@/components/contact/ClientLogoStrip";

const assetBase = "https://cdn.sanity.io/images/22h4uolq/production/";
const approvedArtwork = [
    ["Sports Illustrated", "b176c09831343790f94f49ec8d9620b0d5107e43-3840x1002.webp"],
    // Trim only the transparent border so the migrated artwork fills the original slot.
    ["CBS", "6a0f4da2d74823ff377c586be200ca844ee37b57-2400x870.png", "&rect=100,100,2200,670"],
    ["ABC", "0d3d5eb7d0020336a6c503b83e4d3726000e3363-3840x3845.webp"],
] as const;

// The approved homepage sequence is independent of the migrated CMS ordering.
export function mapHomeTrustLogos(value: unknown): ClientLogo[] {
    if (!Array.isArray(value)) return [];

    const logos: ClientLogo[] = [];
    for (const [alt, filename, crop = ""] of approvedArtwork) {
        const url = assetBase + filename;
        if (value.some(logo => logo?.asset?.url === url)) {
            logos.push({ alt, asset: { url: `${url}?w=384&h=112&fit=max&auto=format${crop}` } });
        }
    }
    // The accepted preview used the bundled Fox News Channel artwork, not the migrated SVG.
    if (logos.length) logos.push({ alt: "Fox News Channel", asset: { url: "/images/fox-news-channel.svg" } });
    return logos;
}
