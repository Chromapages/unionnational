/** Consumer script nonces are generated per request; Studio has isolated compatibility exceptions. */
export function getContentSecurityPolicy(nonce?: string, studio = false, development = process.env.NODE_ENV === "development") {
    const scriptPolicy = studio ? "'unsafe-inline' 'unsafe-eval' https://*.sanity.io" : `'nonce-${nonce}' 'strict-dynamic'${development ? " 'unsafe-eval'" : ""}`;
    const stylePolicy = studio || development ? "'unsafe-inline'" : `'nonce-${nonce}'`;
    return [
        "default-src 'self'",
        `script-src 'self' ${scriptPolicy} https://connect.facebook.net https://link.agent-crm.com https://widgets.leadconnectorhq.com`,
        `style-src 'self' ${stylePolicy} https://fonts.googleapis.com https://fonts.bunny.net https://stcdn.leadconnectorhq.com`,
        // React motion/player styles use attributes; this exception does not authorize style/script elements.
        "style-src-attr 'unsafe-inline'",
        "font-src 'self' https://fonts.gstatic.com https://fonts.bunny.net https://stcdn.leadconnectorhq.com",
        "img-src 'self' data: https: blob:",
        "connect-src 'self' https://*.sanity.io wss://*.sanity.io https://www.facebook.com https://www.google-analytics.com https://analytics.google.com https://backend.leadconnectorhq.com https://services.leadconnectorhq.com https://widgets.leadconnectorhq.com https://stcdn.leadconnectorhq.com https://content.apisystem.tech https://services.msgsndr.com https://link.agent-crm.com" + (development ? " ws://localhost:* ws://127.0.0.1:*" : ""),
        "media-src 'self' https://content.apisystem.tech https://cdn.sanity.io blob:",
        "frame-src 'self' https://*.sanity.io https://www.youtube.com https://player.vimeo.com https://link.agent-crm.com https://www.google.com https://maps.google.com",
        "worker-src 'self' blob:",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self' https://checkout.stripe.com https://link.agent-crm.com",
        "frame-ancestors 'none'",
        ...(development ? [] : ["upgrade-insecure-requests"]),
    ].join("; ") + ";";
}
