"use client";

import { useRouter, usePathname } from "@/i18n/navigation";
import { useTransition } from "react";

export function useNavigationCache() {
  const router = useRouter();
  const pathname = usePathname();
  const [isNavigating, startTransition] = useTransition();

  // Cache duration in milliseconds
  const staleTime = 30 * 1000; // 30 seconds

  return {
    router,
    pathname,
    isNavigating,
    startTransition,
    staleTime,
  };
}
