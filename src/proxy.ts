import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "@/i18n/config";
import { NextRequest, NextResponse } from "next/server";
import { getContentSecurityPolicy } from "@/lib/security/content-security-policy";

const localeMiddleware = createMiddleware({
    locales,
    defaultLocale,
    localePrefix: "always",
    localeDetection: true,
    localeCookie: {
        name: "NEXT_LOCALE",
        sameSite: "lax",
    },
});

export default function proxy(request: NextRequest) {
    const studio = /^\/hq(?:\/|$)/.test(request.nextUrl.pathname);
    const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
    const policy = getContentSecurityPolicy(nonce, studio);
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-nonce", nonce);
    requestHeaders.set("Content-Security-Policy", policy);
    const forwardedRequest = new NextRequest(request, { headers: requestHeaders });
    const localizedAnalytics = request.nextUrl.pathname.match(/^\/(?:en|es)(\/analytics(?:\/.*)?)$/);
    if (localizedAnalytics) {
        const target = new URL(localizedAnalytics[1], request.url);
        const redirect = NextResponse.redirect(target, 307);
        redirect.headers.set("Cache-Control", "private, no-store, max-age=0");
        redirect.headers.set("Content-Security-Policy", policy);
        return redirect;
    }
    const standalone = /^\/(?:hq|analytics|healthz|readyz|scorp-advantage|scorp-estimator)(?:\/|$)/.test(request.nextUrl.pathname);
    const response = standalone ? NextResponse.next({ request: { headers: requestHeaders } }) : localeMiddleware(forwardedRequest);
    response.headers.set("Content-Security-Policy", policy);
    response.headers.set("Cache-Control", "private, no-store, max-age=0");
    return response;
}

export const config = {
    // Dots in CMS slugs are document paths too. Exclude only known assets/metadata.
    matcher: ["/((?!api(?:/|$)|_next(?:/|$)|_vercel(?:/|$)|images(?:/|$)|videos(?:/|$)|fonts(?:/|$)|favicon\\.ico$|robots\\.txt$|sitemap\\.xml$).*)"],
};
