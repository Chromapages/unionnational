const query = '*[_type == "product" && defined(slug.current) && defined(seo.openGraphImage.asset._ref)][0]{"slug": slug.current, "ref": seo.openGraphImage.asset._ref}';
const url = `https://p1x9y3wz.api.sanity.io/v2026-01-09/data/query/production?query=${encodeURIComponent(query)}`;
try {
    const response = await fetch(url, { signal: AbortSignal.timeout(8000) });
    const { result } = await response.json();
    if (!result) {
        const fallbackQuery = '*[_type == "product" && defined(slug.current)][0]{"slug": slug.current}';
        const fallbackResponse = await fetch(`https://p1x9y3wz.api.sanity.io/v2026-01-09/data/query/production?query=${encodeURIComponent(fallbackQuery)}`, { signal: AbortSignal.timeout(8000) });
        const fallback = await fallbackResponse.json();
        console.log(JSON.stringify({ queryStatus: response.status, configuredImage: false, sampleSlug: fallback.result?.slug || null }));
    } else {
        const [, id, dimensions, extension] = result.ref.split("-");
        const imageUrl = `https://cdn.sanity.io/images/p1x9y3wz/production/${id}-${dimensions}.${extension}?w=1200&h=630`;
        const image = await fetch(imageUrl, { method: "HEAD", signal: AbortSignal.timeout(8000) });
        console.log(JSON.stringify({ queryStatus: response.status, configuredImage: true, slug: result.slug, imageStatus: image.status, contentType: image.headers.get("content-type"), url: imageUrl }));
    }
} catch (error) {
    console.log(`Read failed: ${error instanceof Error ? error.message : String(error)}`);
}
