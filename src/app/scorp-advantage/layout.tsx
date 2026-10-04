// src/app/scorp-advantage/layout.tsx
import type { Metadata } from "next";
import { inter, outfit } from "@/lib/fonts";
import "@/styles/globals.css";

export const metadata: Metadata = {
    metadataBase: new URL("https://unionnationaltax.com"),
};

export default function SCorpAdvantageLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className="scroll-smooth" suppressHydrationWarning>
            <body className={`${inter.variable} ${outfit.variable} font-body antialiased`} suppressHydrationWarning>
                {children}
            </body>
        </html>
    );
}
