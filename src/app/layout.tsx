import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import Script from "next/script";
import "@/styles/globals.css";
import { LocalBusinessSchema } from "@/components/seo/LocalBusinessSchema";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://unionnationaltax.com"),
  title: {
    default: "Union National Tax",
    template: "%s | Union National Tax",
  },
  description: "Modern tax strategy, bookkeeping, and fractional CFO services for digital entrepreneurs and growth-focused businesses.",
  openGraph: {
    siteName: "Union National Tax",
    locale: "en_US",
    type: "website",
    title: "Union National Tax | Modern Tax Strategy",
    description: "Proactive tax strategy and financial infrastructure for the digital economy.",
    images: ["/images/og-default.png"], // Ideally we create this static fallback too
  },
  twitter: {
    card: "summary_large_image",
    title: "Union National Tax",
    description: "Modern tax strategy for the digital economy.",
    // site: "@unionnational" // Add if they have one
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
    apple: "/images/apple-icon.png", // Recommended to add later if missing
  },
};

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
        {children}
        <LocalBusinessSchema />
        <Script
          src="https://widgets.leadconnectorhq.com/loader.js"
          data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
          data-widget-id="6966a53597a4a8bf3f27548a"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
