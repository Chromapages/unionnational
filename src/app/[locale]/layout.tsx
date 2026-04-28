import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "@/styles/globals.css";
import { LocalBusinessSchema } from "@/components/seo/LocalBusinessSchema";
import { ChatWidget } from "@/components/ChatWidget";
import { ThemeProvider } from "@/lib/theme/ThemeProvider";
import { getSiteSettings } from "@/sanity/lib/getSiteSettings";
import { urlFor } from "@/sanity/lib/image";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { MetaPixel } from "@/components/seo/MetaPixel";
import { ProgressBar } from "@/components/ProgressBar";
import { SanityLive } from "@/sanity/lib/live";

const inter = Inter({
  subsets: ["latin"],

  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const baseUrl = "https://unionnationaltax.com";

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const params = await props.params;
  const locale = params.locale;
  const siteSettings = await getSiteSettings(locale);
  const seo = siteSettings?.seo;
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
    title: {
      default: metaTitle,
      template: `%s | ${companyName}`,
    },
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
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    alternates: {
      canonical: `https://unionnationaltax.com/${locale === "en" ? "" : locale}`,
      languages: {
        en: "https://unionnationaltax.com",
        es: "https://unionnationaltax.com/es",
      },
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

  return (
    <html lang={locale} className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${outfit.variable} font-body antialiased selection:bg-gold-500 selection:text-white overflow-x-hidden`}
        suppressHydrationWarning
      >
        <MetaPixel />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-gold-500 focus:text-brand-900 focus:px-4 focus:py-2 focus:rounded-lg"
        >
          Skip to content
        </a>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider>
            {props.children}
            <LocalBusinessSchema />
            <ChatWidget />
            <ProgressBar />
            <SanityLive />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
