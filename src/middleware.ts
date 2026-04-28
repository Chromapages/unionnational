import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "@/i18n/config";

export default createMiddleware({
    locales,
    defaultLocale,
    localePrefix: "as-needed",
});

export const config = {
    matcher: ["/((?!api|hq|scorp-advantage|scorp-estimator|_next|_vercel|.*\\..*).*)"],
};
