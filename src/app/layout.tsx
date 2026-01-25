import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "@/styles/globals.css";
import { LocalBusinessSchema } from "@/components/seo/LocalBusinessSchema";
import { ChatWidget } from "@/components/ChatWidget";
import { ThemeProvider } from "@/lib/theme/ThemeProvider";
import { getSiteSettings } from "@/sanity/lib/getSiteSettings";
import { urlFor } from "@/sanity/lib/image";

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

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettings();
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
      locale: "en_US",
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
    icons: {
      icon: "/images/union national tax favicon.svg",
      apple: "/images/apple-icon.png",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${outfit.variable} font-body antialiased selection:bg-gold-500 selection:text-white overflow-x-hidden`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          {children}
          <LocalBusinessSchema />
          <ChatWidget />
        </ThemeProvider>
      </body>
    </html>
  );
}
