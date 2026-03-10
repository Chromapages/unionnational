import { HeaderWrapper } from "@/components/layout/HeaderWrapper";
import { Footer } from "@/components/layout/Footer";

export default function VSLLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col min-h-screen">
            <HeaderWrapper />
            <main className="flex-1">
                {children}
            </main>
            <Footer />
        </div>
    );
}
