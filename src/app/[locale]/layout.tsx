import type { Metadata, Viewport } from "next";
import { inter, outfit } from "@/lib/fonts";
import "@/styles/globals.css";
import { LocalBusinessSchema } from "@/components/seo/LocalBusinessSchema";
import { ChatWidget } from "@/components/ChatWidget";
import { ThemeProvider } from "@/lib/theme/ThemeProvider";
import { getSiteSettings } from "@/sanity/lib/getSiteSettings";
import { urlFor } from "@/sanity/lib/image";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { MetaPixel } from "@/components/seo/MetaPixel";
import { ProgressBar } from "@/components/ProgressBar";
import { SanityLive } from "@/sanity/lib/live";
import { SkipLink } from "@/components/layout/SkipLink";
import { headers } from "next/headers";
import { CspNonceProvider } from "@/components/security/CspNonceProvider";
import { TrackingPreferencesGuard } from "@/components/privacy/TrackingPreferences";
import { OptionalTrackingBoundary } from "@/components/privacy/OptionalTrackingBoundary";

const baseUrl = "https://unionnationaltax.com";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0D2E2B",
};

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const params = await props.params;
  const locale = params.locale;
  const siteSettings = await getSiteSettings(locale);
  const seo = siteSettings?.seo;
  const index = seo?.noIndex !== true;
  const companyName = siteSettings?.companyName || "Union National Tax";
  const metaTitle = seo?.metaTitle || companyName;
  const metaDescription =
    seo?.metaDescription ||
    "Modern tax strategy, bookkeeping, and fractional CFO services for digital entrepreneurs and growth-focused businesses.";
  const ogImage = seo?.openGraphImage
    ? urlFor(seo.openGraphImage).width(1200).height(630).url()
    : "/images/og-default.png";

  return {
    metadataBase: new URL(baseUrl),
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      siteName: companyName,
      locale: locale === "es" ? "es_ES" : "en_US",
      type: "website",
      title: metaTitle,
      description: metaDescription,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: [ogImage],
    },
    robots: {
      index,
      follow: index,
      googleBot: {
        index,
        follow: index,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: "/images/Untitled design.svg",
      shortcut: "/images/Untitled design.svg",
      apple: "/images/Untitled design.svg",
    },
  };
}

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const params = await props.params;
  const locale = params.locale;

  const messages = await getMessages();
  const nonce = (await headers()).get("x-nonce") || undefined;
  const t = await getTranslations({ locale, namespace: "Header" });

  return (
    <html lang={locale} className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${outfit.variable} font-body antialiased selection:bg-gold-500 selection:text-white overflow-x-clip`}
        suppressHydrationWarning
      >
        <SkipLink label={t("skipToContent")} />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <CspNonceProvider nonce={nonce}>
          <ThemeProvider>
            <MetaPixel />
            <OptionalTrackingBoundary locale={locale}>{props.children}</OptionalTrackingBoundary>
            <ChatWidget />
            <ProgressBar />
            <SanityLive />
            <TrackingPreferencesGuard />
          </ThemeProvider>
          </CspNonceProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
