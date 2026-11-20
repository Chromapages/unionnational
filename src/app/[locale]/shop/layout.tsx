import { CartSidebar } from "@/components/shop/CartSidebar";
import { CartIcon } from "@/components/ui/CartIcon";
import { paymentsEnabled } from "@/lib/shop/payments-enabled.mjs";

export default function ShopLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative min-h-screen">
            {children}
            {paymentsEnabled() && <><CartIcon /><CartSidebar /></>}
        </div>
    );
}
