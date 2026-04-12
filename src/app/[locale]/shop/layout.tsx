import { CartSidebar } from "@/components/shop/CartSidebar";
import { CartIcon } from "@/components/ui/CartIcon";

export default function ShopLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative min-h-screen">
            {children}
            <CartIcon />
            <CartSidebar />
        </div>
    );
}
