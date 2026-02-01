import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const locales = [
    { code: "en", label: "EN" },
    { code: "es", label: "ES" },
];

export function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const handleSwitch = (newLocale: string) => {
        // next-intl's useRouter.push handles the locale prefixing automatically
        // and ensures the internal state is updated correctly.
        router.push(pathname, { locale: newLocale });
    };

    return (
        <div
            className="flex items-center gap-1 bg-white/10 backdrop-blur-sm rounded-full p-1 border border-white/20"
            role="group"
            aria-label="Language selector"
        >
            {locales.map((loc) => (
                <button
                    key={loc.code}
                    onClick={() => handleSwitch(loc.code)}
                    aria-pressed={locale === loc.code}
                    className={cn(
                        "px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-200 cursor-pointer",
                        locale === loc.code
                            ? "bg-gold-500 text-brand-950 shadow-sm"
                            : "text-brand-200 hover:text-white hover:bg-white/10"
                    )}
                >
                    {loc.label}
                </button>
            ))}
        </div>
    );
}
