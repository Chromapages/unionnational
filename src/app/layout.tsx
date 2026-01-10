import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
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
  title: "Union National Tax",
  description: "Modern tax strategy for the digital economy.",
  icons: {
    icon: "/images/union national tax favicon.svg",
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
      </body>
    </html>
  );
}
