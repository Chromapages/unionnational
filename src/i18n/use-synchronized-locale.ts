"use client";

import { useCallback, useEffect, useRef, useTransition } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

type SupportedLocale = "en" | "es";

const LANGUAGE_SYNC_CHANNEL = "language-sync";
const LANGUAGE_STORAGE_KEY = "union-national-locale";

function isSupportedLocale(value: unknown): value is SupportedLocale {
  return value === "en" || value === "es";
}

function setLocaleCookie(locale: SupportedLocale) {
  document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; samesite=lax`;
}

function setDocumentLanguage(locale: SupportedLocale) {
  document.documentElement.lang = locale;
}

function parseStoredLocale(value: string | null): SupportedLocale | null {
  if (!value) return null;

  try {
    const parsed = JSON.parse(value) as { locale?: unknown };
    return isSupportedLocale(parsed.locale) ? parsed.locale : null;
  } catch {
    return null;
  }
}

export function useSynchronizedLocale() {
  const locale = useLocale() as SupportedLocale;
  const router = useRouter();
  const pathname = usePathname();
  const localeRef = useRef<SupportedLocale>(locale);
  const channelRef = useRef<BroadcastChannel | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    localeRef.current = locale;
    setDocumentLanguage(locale);
  }, [locale]);

  const applyLocale = useCallback(
    (nextLocale: SupportedLocale) => {
      setLocaleCookie(nextLocale);
      setDocumentLanguage(nextLocale);

      if (localeRef.current === nextLocale) {
        return;
      }

      startTransition(() => {
        router.replace(pathname, { locale: nextLocale });
      });
    },
    [pathname, router, startTransition]
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    if ("BroadcastChannel" in window) {
      const channel = new BroadcastChannel(LANGUAGE_SYNC_CHANNEL);
      channelRef.current = channel;

      channel.onmessage = (event: MessageEvent<{ locale?: unknown }>) => {
        const nextLocale = event.data?.locale;
        if (isSupportedLocale(nextLocale)) {
          applyLocale(nextLocale);
        }
      };

      return () => {
        channel.close();
        channelRef.current = null;
      };
    }
  }, [applyLocale]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const browserWindow: Window = window;
    if ("BroadcastChannel" in browserWindow) {
      return;
    }

    const handleStorage = (event: StorageEvent) => {
      if (event.key !== LANGUAGE_STORAGE_KEY) return;

      const nextLocale = parseStoredLocale(event.newValue);
      if (nextLocale) {
        applyLocale(nextLocale);
      }
    };

    browserWindow.addEventListener("storage", handleStorage);
    return () => browserWindow.removeEventListener("storage", handleStorage);
  }, [applyLocale]);

  const syncLocale = useCallback(
    (nextLocale: SupportedLocale) => {
      setLocaleCookie(nextLocale);
      setDocumentLanguage(nextLocale);

      startTransition(() => {
        router.replace(pathname, { locale: nextLocale });
      });

      if (typeof window !== "undefined") {
        if (channelRef.current) {
          channelRef.current.postMessage({ locale: nextLocale });
        }

        try {
          window.localStorage.setItem(
            LANGUAGE_STORAGE_KEY,
            JSON.stringify({ locale: nextLocale, updatedAt: Date.now() })
          );
        } catch {
          // Ignore storage write failures and continue with in-tab navigation.
        }
      }
    },
    [pathname, router, startTransition]
  );

  return {
    locale,
    isPending,
    syncLocale,
  };
}
