"use client";

import { RefObject, useEffect, useRef, useState } from "react";

interface UseIntersectionInViewOptions {
  rootMargin?: string;
  threshold?: number;
  once?: boolean;
}

export function useIntersectionInView<T extends Element>(
  ref: RefObject<T | null>,
  { rootMargin = "0px", threshold = 0, once = false }: UseIntersectionInViewOptions = {}
) {
  const [inView, setInView] = useState(false);
  const hasEnteredRef = useRef(false);

  useEffect(() => {
    const target = ref.current;

    if (!target || (once && hasEnteredRef.current)) {
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      hasEnteredRef.current = true;
      const timeoutId = window.setTimeout(() => setInView(true), 0);
      return () => window.clearTimeout(timeoutId);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          hasEnteredRef.current = true;
          setInView(true);

          if (once) {
            observer.unobserve(entry.target);
          }

          return;
        }

        if (!once) {
          setInView(false);
        }
      },
      { rootMargin, threshold }
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [once, ref, rootMargin, threshold]);

  return inView;
}
