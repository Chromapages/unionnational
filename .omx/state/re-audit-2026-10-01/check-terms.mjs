const query = '*[_type == "legalPage" && pageType == "terms" && isPublished == true]{"slug": slug.current, requiresReview}';
const url = `https://p1x9y3wz.api.sanity.io/v2026-01-09/data/query/production?query=${encodeURIComponent(query)}`;
try {
    const response = await fetch(url, { signal: AbortSignal.timeout(8000) });
    const body = await response.json();
    console.log(JSON.stringify({ status: response.status, result: body.result }));
} catch (error) {
    console.log(`Read failed: ${error instanceof Error ? error.message : String(error)}`);
}
